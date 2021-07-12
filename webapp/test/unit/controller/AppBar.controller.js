/*global QUnit*/

sap.ui.define([
	"upcsdd/controller/AppBar.controller"
], function (Controller) {
	"use strict";

	QUnit.module("AppBar Controller");

	QUnit.test("I should test the AppBar controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
