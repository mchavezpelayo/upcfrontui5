sap.ui.define([
], function (require, factory) {
    'use strict';
    const URL = "http://34.203.218.85:5000/api/";
    return {
        getReq (path){
            return new Promise((resolve, reject) => {
                fetch(URL+path)
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

