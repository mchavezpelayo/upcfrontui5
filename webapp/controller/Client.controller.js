sap.ui.define([
    "./BaseController",
    "../Services/rest",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (BaseController, services,JSONModel,MessageBox) {
        "use strict";
        var oRouter = null;
        var oView= null;
        var bucket =null;
        var that = null;
        return BaseController.extend("upcsdd.controller.Client", {
            onInit: async function () {
                try {
                    that=this;
                    oView = this.getView();
                    oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                         bucket=[];
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
                    oView.getModel("modelGlobal").setProperty("/cliente",{Nombres:"",TipoDoc:"",NumDoc:"",Telefono:"",Email:""})
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
            },
            onRowPress(){
                // bucket.push(oEvent)
                // console.log();

            },
            onUpdatePress(){
               let oItemSelected = this.byId("tblClientes").getSelectedItems();
               if(oItemSelected.length>1){
                return MessageBox.information("Solo puede actualizar un registro a la vez");
                
               }
               else{
                    let dataModal = oItemSelected[0].getBindingContext("modelGlobal").getObject()
                    oView.getModel("modelGlobal").setProperty("/cliente",dataModal);
                }
                var sFrg = "upcsdd.view.Dialog.EditarClient";
                if (!this.dialogEdit) {
                    this.dialogEdit = sap.ui.xmlfragment("frgEditClient", sFrg, this);
                    this.dialogEdit.addStyleClass(
                        "sapUiResponsivePadding--content sapUiResponsivePadding--header sapUiResponsivePadding--footer sapUiResponsivePadding--subHeader"
                    );
                    oView.addDependent(this.dialogEdit);
                }
                this.dialogEdit.open();
            },
            onPressClose(){
                this.dialogEdit.close();
            },
            editarCliente(){
                let client = oView.getModel("modelGlobal").getProperty("/cliente")
                client.Estado="Activo";
                services.putReq("clients/",client)
                .then(data=>{ 
                    this.dialogEdit.close();
                    that.callget();
                })
                .catch(e=>{
                    MessageBox.information(JSON.stringify(e));
        
                })

                console.log(client);
            },
            onCreatePress(){
                
                var sFrg = "upcsdd.view.Dialog.CreateClient";
                if (!this.dialogCreate) {
                    this.dialogCreate = sap.ui.xmlfragment("frgEditClient", sFrg, this);
                    this.dialogCreate.addStyleClass(
                        "sapUiResponsivePadding--content sapUiResponsivePadding--header sapUiResponsivePadding--footer sapUiResponsivePadding--subHeader"
                    );
                    oView.addDependent(this.dialogCreate);
                }
                this.dialogCreate.open();
            },
            onCreateClient(){
                let client = oView.getModel("modelGlobal").getProperty("/cliente")
                client.Estado="Activo";
                services.postReq("clients/",client)
                .then(data=>{ 
                    this.dialogCreate.close();
                    that.callget();
                })
                .catch(e=>{
                    MessageBox.information(JSON.stringify(e));
        
                })

                console.log(client);
            }
            
        });
    });
