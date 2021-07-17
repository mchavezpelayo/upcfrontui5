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
        var oView= null;
        return BaseController.extend("upcsdd.controller.Client", {
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
                    this.getView().setModel(new JSONModel([]),"modelGlobal");
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
                services.getReq("clients/").then(data=>data.json())
                .then(data=>{
                    console.log(data.clients);
                    oView.getModel("modelGlobal").setProperty("/clientes",data.clients) 
                })
                .catch(e=>{
                    console.log(e);
                })
            },
            returnTrim(txt){
                return String(txt).trim();
            },
            parserDate(date){
               return new Date(date).toISOString().split("T")[0]
            }
            
        });
    });
