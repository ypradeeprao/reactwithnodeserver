var http = require('http');
const fs = require('fs');
var formidable = require('formidable');

const fileupload = async function(req){
    console.log(req.files);
    let resp = {issuccess:"true", message:"cannot be deleted from frontend"};
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
     console.log("infileparse");
    });
    return resp;
  }


  const fileread = async function(req){
    console.log(req.files);
    let resp = {issuccess:"true", message:"cannot be deleted from frontend"};
    try {
      const data = fs.readFileSync('/test.txt', 'utf8');
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    
    return resp;
  }



  module.exports ={
    fileupload
 }
 