var axios = require('axios');


let clustername = "Cluster0";
let databasename = "sampledb1";
var data = JSON.stringify({
    "collection": "samplecollection1",
    "database": databasename,
    "dataSource": clustername,
    "projection": {
        "_id": "63dc364a3ace6b16ecfd539e"
    }
});
            
var config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-eculy/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'hR1ddMRYtMV0n38QhuFSdtjbAnUYk1iX1o70lbZOJ6B1EBJoxXKLx82dGQTCYP98',
    },
    data: data
};

var retrievemanyconfigurl = 'https://data.mongodb-api.com/app/data-eculy/endpoint/data/v1/action/find';
var insertmanyconfigurl = 'https://data.mongodb-api.com/app/data-eculy/endpoint/data/v1/action/insertMany';
var editmanyconfigurl = 'https://data.mongodb-api.com/app/data-eculy/endpoint/data/v1/action/updateMany';
var deletemanyconfigurl = 'https://data.mongodb-api.com/app/data-eculy/endpoint/data/v1/action/deleteMany';



const createtable = async function(req){
    let resp = {issuccess:"true", message:""};
  
    let {tablename, tabledatalist} = req.body;
    
    let createtablejson = {
        "dataSource": clustername,
        "database": databasename,
        "collection": tablename,
        "documents": [{"sampleid":"sampleid"}]
    }
  
    
    let insertmanyconfig = JSON.parse(JSON.stringify(config));
    insertmanyconfig.url = insertmanyconfigurl;
    insertmanyconfig.data = createtablejson;
  
  
      await axios(insertmanyconfig)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
          resp.issuccess = "true";
          resp.data = [];
          resp.message = '';
      })
      .catch(function (error) {
          console.log(error);
          resp.issuccess = "false";
          resp.data = [];
          resp.message = error;
      });


      let deletetablejson = {
        "dataSource": clustername,
        "database": databasename,
        "collection": tablename,
        "filter": { "sampleid": "sampleid" }
    }
      let deletesampleconfig = JSON.parse(JSON.stringify(config));
      deletesampleconfig.url = deletemanyconfigurl;
      deletesampleconfig.data = deletetablejson;
     
      if(resp.issuccess === "true"){
      await axios(deletesampleconfig)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
          resp.issuccess = "true";
          resp.data = [];
          resp.message = '';
      })
      .catch(function (error) {
          console.log(error);
          resp.issuccess = "false";
          resp.data = [];
          resp.message = error;
      });
      }
  
      return resp;
  }

  const edittable = async function(req){
    let resp = {issuccess:"true", message:"cannot be edited from frontend"};
    return resp;
  }


  const deletetable = async function(req){
    let resp = {issuccess:"true", message:"cannot be deleted from frontend"};
    return resp;
  }

  const retrieverecords = async function(req){
    console.log("retrieverecords-req");
    console.log(req);
    let resp = {issuccess:"true", message:""};
  
    let {tablename, conditionexpression,columns, sortby,sortbytype, limit} = req.body;
    let sortexpression ={};
    if(sortby && sortby != "" && sortbytype != "desc"){
        sortexpression[sortby] = 1;
    }

    if(sortby && sortby != "" && sortbytype == "desc"){
        sortexpression[sortby] = -1;
    }

  
    let limitvalue = 50000;
   if(limit && limit != ""){
    limitvalue = limit;
   }

   let columnsvalue = {};
   if(columns && columns != "" 
   && columns.length > 0){
   for(let i=0; i<columns.length; i++){
    columnsvalue[columns[i]] = 1;
   }
   }
    let recordsjson = {
        "dataSource": clustername,
        "database": databasename,
        "collection": tablename,
        "filter": conditionexpression,
        "projection": columnsvalue,
        "sort":sortexpression,
        "limit":limitvalue
     
    }
  
    
    let insertmanyconfig = JSON.parse(JSON.stringify(config));
    insertmanyconfig.url = retrievemanyconfigurl;
    insertmanyconfig.data = recordsjson;
  
  
      await axios(insertmanyconfig)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
          resp.issuccess = "true";
          resp.data = response.data.documents;
      })
      .catch(function (error) {
          console.log(error);
          resp.issuccess = "false";
          resp.message = error;
      });
  
      console.log("retrieverecords-resp");
      console.log(resp);
      return resp;
  }

const insertrecords = async function(req){
    console.log("insertrecords-req");
    console.log(req);
  let resp = {issuccess:"true", message:""};

  let {tablename, tabledatalist} = req.body;
  
  let recordsjson = {
      "dataSource": clustername,
      "database": databasename,
      "collection": tablename,
      "documents": tabledatalist
  }

  
  let insertmanyconfig = JSON.parse(JSON.stringify(config));
  insertmanyconfig.url = insertmanyconfigurl;
  insertmanyconfig.data = recordsjson;


    await axios(insertmanyconfig)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        resp.issuccess = "true";
        resp.data = response.data.insertedIds;
        resp.message = '';
    })
    .catch(function (error) {
        console.log(error);
        resp.issuccess = "false";
        resp.data = [];
        resp.message = error;
    });

    console.log("insertrecords-resp");
    console.log(resp);
    return resp;
}

const editrecords = async function(req){
    let resp = {issuccess:"true", message:""};
  
    let {tablename, conditionexpression, updateexpression, upsertifnotfound} = req.body;
    
    let recordsjson = {
        "dataSource": clustername,
        "database": databasename,
        "collection": tablename,
        "filter": conditionexpression,
        "update": { "$set": updateexpression },
      "upsert":upsertifnotfound
    }
  
    
    let insertmanyconfig = JSON.parse(JSON.stringify(config));
    insertmanyconfig.url = editmanyconfigurl;
    insertmanyconfig.data = recordsjson;
  
  
      await axios(insertmanyconfig)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
          console.log(error);
      });
  
      return resp;
  }

  const deleterecords = async function(req){
    let resp = {issuccess:"true", message:""};
  
    let {tablename, conditionexpression, updateexpression, upsertifnotfound} = req.body;
    
    let recordsjson = {
        "dataSource": clustername,
        "database": databasename,
        "collection": tablename,
        "filter": conditionexpression
     
    }
  
    
    let insertmanyconfig = JSON.parse(JSON.stringify(config));
    insertmanyconfig.url = deletemanyconfigurl;
    insertmanyconfig.data = recordsjson;
  
  
   

      await axios(insertmanyconfig)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
          resp.issuccess = "true";
          resp.data = [];
          resp.message = '';
      })
      .catch(function (error) {
          console.log(error);
          resp.issuccess = "false";
          resp.data = [];
          resp.message = error;
      });

  
      return resp;
  }

module.exports ={
   createtable,edittable,deletetable,
   retrieverecords, insertrecords,editrecords,deleterecords
}



