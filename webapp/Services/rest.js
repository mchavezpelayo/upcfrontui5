sap.ui.define([
], function (require, factory) {
    'use strict';
    const URL = "http://34.203.218.85:5000/api/";
    const URLDEV = "http://34.203.218.85:6000/api/"
    return {
        getReq (path,env="prd"){
            let u;
            if(env=="prd"){
                u = URL;
            }
            else{
                u=URLDEV;
            }
            return new Promise((resolve, reject) => {
                fetch(u+path)
                    .then(i => resolve(i))
                    .catch(e => reject(e))
            })
        },
        postReq(path,body,env="prd"){
            let u;
            if(env=="prd"){
                u = URL;
            }
            else{
                u=URLDEV;
            }
            let headers = new Headers({'content-type':'application/json'})
               return new Promise((resolve, reject) => {
                fetch(u+path,{
                    method:"POST",
                    headers,
                    body: JSON.stringify(body)
                })
                    .then(i => resolve(i))
                    .catch(e => reject(e))
            })
        },
        putReq(path,body,env="prd"){
            let u;
            if(env=="prd"){
                u = URL;
            }
            else{
                u=URLDEV;
            }
            let headers = new Headers({'content-type':'application/json'})
               return new Promise((resolve, reject) => {
                fetch(u+path+body.Id,{
                    method:"PUT",
                    headers,
                    body: JSON.stringify(body)
                })
                    .then(i => resolve(i))
                    .catch(e => reject(e))
            })
        }

    }
});

