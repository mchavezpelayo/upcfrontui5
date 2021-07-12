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
                    services.getReq("products/").then(data=>data.json())
                    .then(data=>{
                        console.log(data);
                        oView.setModel(new JSONModel(data.products),"modelResources")
                    })
                    .catch(e=>{
                        console.log(e);
                    })
                } catch (error) {
                }
            },
            onConfigurationInit(){
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
            }
        });
    });
