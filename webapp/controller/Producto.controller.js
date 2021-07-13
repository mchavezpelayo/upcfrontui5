sap.ui.define([
    "./BaseController",
    "../Services/rest",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (BaseController, services,JSONModel) {
        "use strict";
        var oRouter = null;
        var oView = null;
        return BaseController.extend("upcsdd.controller.Producto", {
            onInit: async function () {
                try {
                    // let data = await services.getReq();
                    // console.log(data);
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
                        "name":"Venta",
                        "path":"Venta"
                        
                    },{
                        "name":"Reporte",
                        "path":"Reporte"
                        
                    },{
                        "name":"Productos",
                        "path":"Producto"
                        
                    }]; 
                    this.getView().setModel(new JSONModel(list),"modelNavigation");
                   
                    oView.setModel(new JSONModel({"Producto":{categoria:"",pventa:"",cantidad:"",pcompra:"",producto:""}}),"modelGlobal");
                    this.onConfigurationInit();
                } catch (error) {
                }
            },
            onConfigurationInit(){
                this.callget();
            },
            callget(){
                services.getReq("products/").then(data=>data.json())
                .then(data=>{
                    console.log(data);
                    oView.setModel(new JSONModel(data.products),"modelResources")
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
                // return text.toLocaleUpperCase();
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
                services.postReq("products/",obj).then(i=>{
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
            }
        });
    });
