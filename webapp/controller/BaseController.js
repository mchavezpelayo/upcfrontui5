sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";
		return Controller.extend("upcsdd.controller.BaseController", {
			run(){
				// let list = [{
				// 	"name":"Clientes",
				// 	"path":"Client"
				// },{
				// 	"name":"Cardex",
				// 	"path":"Cardex"
				// },{
				// 	"name":"Proveedores",
				// 	"path":"Proveedor"
				// },{
				// 	"name":"Venta",
				// 	"path":"Venta"
					
				// },{
				// 	"name":"Reporte",
				// 	"path":"Reporte"
					
				// }]; 
				// this.getView().setModel(new JSONModel(list),"modelNavigation");
				console.log("_------------------------------_");
				console.log(this);
                
            }
		});
	});
