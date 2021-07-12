sap.ui.define([
	"./BaseController"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController) {
		"use strict";
		return BaseController.extend("upcsdd.controller.Home", {
			onInit: function () {
               this.run();         
			}
		});
	});
