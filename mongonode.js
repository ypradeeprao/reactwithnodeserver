const { MongoClient } = require("mongodb");
// Replace the following with values for your environment.
const username = encodeURIComponent("pradeepsfdc07");
const password = encodeURIComponent("kNnbEPhCucFW9ZiX");
const clusterUrl = "cluster0.tzahxl5.mongodb.net";
const authMechanism = "DEFAULT";
// Replace the following with your MongoDB deployment's connection string.
const url =
  `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
 
  const client = new MongoClient(url);






const createtable = async function(req){
    let resp = {issuccess:"true", message:""};
  
    let {tablename, tabledatalist} = req.body;
   console.log(tablename);

  
    try {
      const database = client.db("insertDB");
      const haiku = database.collection("haiku");
      // create a document to insert
      const doc = {
        title: "Record of a Shriveled Datum",
        content: "No bytes, no problem. Just insert a document, in MongoDB",
      }
      const result = await haiku.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  



      return resp;
  }

  
  const edittable = async function(req){
    let resp = {issuccess:"true", message:""};
  
    let {oldtablename, tablename } = req.body;
    
    let edittablejson = {
        "dataSource": "Cluster0",
        "database": "sampledb1",
        "collection": tablename,
        "documents": [{"sampleid":"sampleid"}]
    }
  
    
    let insertmanyconfig = JSON.parse(JSON.stringify(config));
    insertmanyconfig.url = insertmanyconfigurl;
    insertmanyconfig.data = edittablejson;
  
  
      await axios(insertmanyconfig)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
          resp.issuccess = true;
          resp.data = [];
          resp.message = '';
      })
      .catch(function (error) {
          console.log(error);
          resp.issuccess = false;
          resp.data = [];
          resp.message = error;
      });


      let deletetablejson = {
        "dataSource": "Cluster0",
        "database": "sampledb1",
        "collection": tablename,
        "filter": { "sampleid": "sampleid" }
    }
      let deletesampleconfig = JSON.parse(JSON.stringify(config));
      deletesampleconfig.url = deletemanyconfigurl;
      deletesampleconfig.data = deletetablejson;
     
      if(resp.issuccess == true){
      await axios(deletesampleconfig)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
          resp.issuccess = true;
          resp.data = [];
          resp.message = '';
      })
      .catch(function (error) {
          console.log(error);
          resp.issuccess = false;
          resp.data = [];
          resp.message = error;
      });
      }
  
      return resp;
  }

const insertrecords = async function(req){
  let resp = {issuccess:"true", message:""};

  let {tablename, tabledatalist} = req.body;
  
  let insertrecordsjson = {
      "dataSource": "Cluster0",
      "database": "sampledb1",
      "collection": tablename,
      "documents": tabledatalist
  }

  
  let insertmanyconfig = JSON.parse(JSON.stringify(config));
  insertmanyconfig.url = insertmanyconfigurl;
  insertmanyconfig.data = insertrecordsjson;


    await axios(insertmanyconfig)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });

    return resp;
}







module.exports ={
    insertrecords,createtable,edittable
}



