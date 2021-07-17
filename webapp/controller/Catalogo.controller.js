sap.ui.define([
    "./BaseController",
    "../Services/rest",
    "sap/ui/model/json/JSONModel","sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (BaseController, services,JSONModel,MessageBox) {
        "use strict";
        var oRouter = null;
        var oView = null;
        return BaseController.extend("upcsdd.controller.Main", {
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
                        "name":"Venta",
                        "path":"Venta"
                        
                    },{
                        "name":"Reporte",
                        "path":"Reporte"
                        
                    },{
                        "name":"Productos",
                        "path":"Productos"
                        
                    }]; 
                    this.getView().setModel(new JSONModel(list),"modelNavigation");
                    this.getView().setModel(new JSONModel({}),"ListProduct");
                    oView.getModel("ListProduct").setProperty("/cant",0);
                    oView.getModel("ListProduct").setProperty("/resumenVenta",[]);
                    oView.setModel(new JSONModel([]),"Temp");
                  this.callget();
                } catch (error) {
                }
            },
            onConfigurationInit(){
            },
            onItemSelect(oEvent){
                let path = oEvent.getSource().data("custom");
                console.log(path);
                oRouter.navTo(path);
                // debugger;
            },
            callget(){
                services.getReq("products/").then(data=>data.json())
                .then(data=>{
                    console.log(data);
                    oView.getModel("ListProduct").setProperty("/catalogo",data.products)
                    // oView.setModel(new JSONModel(data.products),"modelResources")
                })
                .catch(e=>{
                    console.log(e);
                })
            },
            onRowPress(oEvent){
                let local = [];
                let tmp = oView.getModel("Temp");
                // oSelectedItem.getBindingContext("ListProduct").setProperty("resumenVenta",[])
                var rowSelect = oView.byId("tablaCatalogo")._aSelectedPaths; //select rows
                // seleccionamos el modelo
                var oSelectedItem = oEvent.getParameter("listItem");
                //seleccionamos el object
                // let obj =  oSelectedItem.getBindingContext("ListProduct").getProperty();
                
                // var sFrg = "upcsdd.view.Dialog.CompraProducto";
                // if (!this.dialogoCantidad) {
                //     this.dialogoCantidad = sap.ui.xmlfragment("frgCompraProducto", sFrg, this);
                //     this.dialogoCantidad.addStyleClass(
                //         "sapUiResponsivePadding--content sapUiResponsivePadding--header sapUiResponsivePadding--footer sapUiResponsivePadding--subHeader"
                //     );
                //     oView.addDependent(this.dialogoCantidad);
                // }
                // this.dialogoCantidad.open();


                rowSelect.map((o,i)=>{

                  let obj = oSelectedItem.getBindingContext("ListProduct").getObject(o);
                  obj.stock=1;
                        local.push(obj);
                }) 
                oView.getModel("ListProduct").setProperty("/resumenVenta",local);
                oView.getModel("ListProduct").setProperty("/cant",rowSelect.length);
            },
            openResumen(){
                //open dialog
                var sFrg = "upcsdd.view.Dialog.ResumenVenta";
                if (!this.dialogResumen) {
                    this.dialogResumen = sap.ui.xmlfragment("frgResumenVenta", sFrg, this);
                    this.dialogResumen.addStyleClass(
                        "sapUiResponsivePadding--content sapUiResponsivePadding--header sapUiResponsivePadding--footer sapUiResponsivePadding--subHeader"
                    );
                    oView.addDependent(this.dialogResumen);
                }
                this.dialogResumen.open();
            },
            createSolicitud(){
                let that = this;
                let data =  oView.getModel("ListProduct").getProperty("/resumenVenta");
                console.log(data);
                let valor = 0  
                data.map(i=>{
                    valor += (i.cost_product * i.stock)
                })

                MessageBox.show("El monto Total es S/"+valor+".00",{
                    title:"Resumen de pago",
                    icon: MessageBox.Icon.INFORMATION,
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				    emphasizedAction: MessageBox.Action.YES,
				    onClose: function (oAction) { 
                        // console.log(oAction);
                        if(oAction=="YES"){
                            // oView.setBusy(true);
                            // call api
                            that.dialogResumen.close(); 
                            // console.log("....");
                        }

                     }
                    
                })
            }

        });
    });
