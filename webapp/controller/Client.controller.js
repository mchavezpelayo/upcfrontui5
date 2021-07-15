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
        return BaseController.extend("upcsdd.controller.Client", {
            onInit: async function () {
                try {
                    // let data = await services.getReq();
                    // console.log(data);
                     // let data = await services.getReq();
                    // console.log(data);
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
            }
        });
    });
