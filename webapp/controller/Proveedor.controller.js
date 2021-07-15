sap.ui.define([
    "./BaseController",
    "../Services/rest",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (BaseController, services,JSONModel,MessageToast) {
        "use strict";
        var oRouter = null;
        var oView = null;
        return BaseController.extend("upcsdd.controller.Proveedor", {
            onInit: async function () {
                try {
                    oView = this.getView();
                    oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                     let list = [{
                        "name":"Clientes",
                        "path":"Client"
                    },{
                        "name":"Cardex",
                        "path":"Cardex"
                    },{
                        "name":"Proveedores",
                        "path":"Proveedor"
                    },{
                        "name":"Ventas",
                        "path":"Ventas"
                        
                    },{
                        "name":"Reporte",
                        "path":"Reporte"
                        
                    },{
                        "name":"Productos",
                        "path":"Productos"
                        
                    }]; 
                    this.getView().setModel(new JSONModel(list),"modelNavigation"); 
                    oView.setModel(new JSONModel({
                        "Solicitud":{producto:"",cantidad:""}
                }),"modelGlobal");
                    this.onConfigurationInit();
                } catch (error) {
                }
            },
            onConfigurationInit(){
                this.callget();
            },
            callget(){
                services.getReq("proveedor","dev").then(data=>data.json())
                .then(data=>{
                    console.log(data);
                    oView.setModel(new JSONModel(data.data),"modelResources")
                })
                .catch(e=>{
                    console.log(e);
                })
            },
            onItemSelect(oEvent){
                let path = oEvent.getSource().data("custom");
                console.log(path);
                oRouter.navTo(path);
          
            },
            converToprice(price){
                let p = String(price);
                let txt;
                if(p.includes(".")){
                        txt = "S/."+p;
                }
               else{
                   txt="S/."+p+".00";
               }
               return txt;
            },
            onCreatePress:function(){
                var sFrg = "upcsdd.view.Dialog.CreateProduct";
                if (!this.dialogMassive) {
                    this.dialogMassive = sap.ui.xmlfragment("frgCreateProduct", sFrg, this);
                    this.dialogMassive.addStyleClass(
                        "sapUiResponsivePadding--content sapUiResponsivePadding--header sapUiResponsivePadding--footer sapUiResponsivePadding--subHeader"
                    );
                    oView.addDependent(this.dialogMassive);
                }
                this.dialogMassive.open();
            },
            liveChange(text){ 
            },
            createProduct(){
                let data = oView.getModel("modelGlobal").getProperty("/Producto");
                console.log(data);
                let obj = {
                    cost_product:data.pcompra,
                    desc_product:data.producto,
                    id_category:data.categoria,
                    price_product:data.pventa,
                    stock:data.cantidad
                }
                services.postReq("products/",obj,"dev").then(i=>{
                    this.callget();
                    this.dialogMassive.close();
                    this.clearDTO();
                })
                .catch(e=>{
                    console.log(e);
                })
            },
            clearDTO(){
                let data = oView.getModel("modelGlobal").setProperty("/Producto",{})
            },
            requestStock(){

                var sFrg = "upcsdd.view.Dialog.CreateSolictud";
                if (!this.dialogSol) {
                    this.dialogSol = sap.ui.xmlfragment("frgCreateSolicitud", sFrg, this);
                    this.dialogSol.addStyleClass(
                        "sapUiResponsivePadding--content sapUiResponsivePadding--header sapUiResponsivePadding--footer sapUiResponsivePadding--subHeader"
                    );
                    oView.addDependent(this.dialogSol);
                }
                this.dialogSol.open();

                let obj = {
                    "cantidad":"20",
                    "Producto":"Vinos",
                    "fecha":"2021-07-14",
                    "createBy":"launica"
                };
                   
                // console.log("__>");
            },
            createSolicitud(){
              let data =  oView.getModel("modelGlobal").getProperty("/Solicitud");
                console.log(data);
                data.fecha = new Date().toISOString();
                data.user = "MCHAVEZ";
                sap.ui.core.BusyIndicator.show();
              services.postReq("proveedor/create",data,"dev")
                    .then(data=> data.json())
                    .then(data=> {
                        // console.log(data);
                        sap.ui.core.BusyIndicator.hide();
                        this.dialogSol.close();
                        new MessageToast.show(data.payload, {duration: 1500});
                    })
                    .catch(e=>{
                        this.dialogSol.close();
                        oView.setBusy.hide()
                        new MessageToast.show(e);
                    })
            }
        });
    });
