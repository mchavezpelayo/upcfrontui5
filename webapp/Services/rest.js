sap.ui.define([
], function (require, factory) {
    'use strict';
    const URL = "https://jsonplaceholder.typicode.com/todos/1";
    return {
        getReq (){
            return new Promise((resolve, reject) => {
                fetch(URL)
                    .then(i => resolve(i))
                    .catch(e => reject(e))
            })
        },
        postReq(path,body){
            let headers = new Headers({'content-type':'application/json'})
               return new Promise((resolve, reject) => {
                fetch(URL+path,{
                    method:"POST",
                    headers,
                    body: JSON.stringify(body)
                })
                    .then(i => resolve(i))
                    .catch(e => reject(e))
            })
        }
    }
});

