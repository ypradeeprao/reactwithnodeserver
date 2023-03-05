var http = require('http');
const fs = require('fs');
const path = require("path")
var formidable = require('formidable');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {

      // Uploads is the Upload_folder_name
      cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now()+".jpg")
  }
})

const maxSize = 1 * 1000 * 1000;


const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: 'images', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname 
          //+ '_' + Date.now() 
           + path.extname(file.originalname))
          // file.fieldname is name of the field (image)
          // path.extname get the uploaded file extension
  }
});

var upload = multer({ 
  storage: imageStorage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb){
  
      // Set the filetypes, it is optional
      var filetypes = /jpeg|jpg|png/;
      var mimetype = filetypes.test(file.mimetype);

      var extname = filetypes.test(path.extname(
                  file.originalname).toLowerCase());
      
      if (mimetype && extname) {
          return cb(null, true);
      }
    
      cb("Error: File upload only supports the "
              + "following filetypes - " + filetypes);
    } 

// mypic is the name of file attribute
}).single("mypic"); 






var imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
}) 


const fileupload = async function(req,res){
  console.log(req);
    console.log(req.file);
    console.log(req.files);
    console.log(req.body);
    console.log(req.body.file);
    console.log(req.body.files);
    console.log(req.body.formData);
    console.log(req.formData);
    // let resp = {issuccess:"true", message:"cannot be deleted from frontend"};
    // var form = new formidable.IncomingForm();
    // form.parse(req, function (err, fields, files) {
    //  console.log("infileparse");
    // });
   // return resp;

    upload(req,res,function(err) {
      if(err) {
       // res.send(err)
      }
      else {
       //   res.send("Success, Image uploaded!")
      }
  })

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
 