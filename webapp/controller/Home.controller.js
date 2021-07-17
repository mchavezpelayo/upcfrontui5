sap.ui.define([
	"./BaseController"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController) {
		"use strict";
		var oRouter = null;
		return BaseController.extend("upcsdd.controller.Home", {
			onInit: function () {
            //    this.run();   
			oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			console.log("HHH");      
			},
			toAdmin(){
				oRouter.navTo("Main");
			},
			toProducts(){
				oRouter.navTo("Catalogo");
			}
		});
	});
