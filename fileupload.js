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

const maxSize = 100 * 1000 * 1000;


const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: function (req, file, cb) {
    console.log(file);
    let originalname = file.originalname;
    let mimetype = file.mimetype;
    let foldername = "";
    let filename="";

    if(originalname && originalname !== ""){
     let originalnamesplit = originalname.split("foldername");
     if(originalnamesplit && originalnamesplit.length > 0){
      foldername = originalnamesplit[0];
      filename = originalnamesplit[1];
     }
    }
    console.log(foldername);
    console.log(filename);
    const path = `./videos/`+foldername;
    fs.mkdirSync(path, { recursive: true });

    cb(null, path)
  },
    filename: (req, file, cb) => {
     console.log(file);


     console.log(file);
     let originalname = file.originalname;
     let mimetype = file.mimetype;
     let foldername = "";
     let filename="";
 
     if(originalname && originalname !== ""){
      let originalnamesplit = originalname.split("foldername");
      if(originalnamesplit && originalnamesplit.length > 0){
       foldername = originalnamesplit[0];
       filename = originalnamesplit[1];

        // if(mimetype && mimetype.includes("mp4")){
          filename = filename;
        // }
      }
     }
    


        cb(null, 
          filename)
          //+ '_' + Date.now() 
         //  + path.extname(file.originalname))
          // file.fieldname is name of the field (image)
          // path.extname get the uploaded file extension
  }
});



var upload = multer({ 
  storage: imageStorage,
  limits: { fileSize: maxSize },
  }).single("mypic"); 


// var upload = multer({ 
//   storage: imageStorage,
//   limits: { fileSize: maxSize },
//   fileFilter: function (req, file, cb){
//     console.log(req.FormData);
//     console.log(req.formData);
//       // Set the filetypes, it is optional
//       var filetypes = /jpeg|jpg|png|mp4/;
//       var mimetype = filetypes.test(file.mimetype);

//       var extname = filetypes.test(path.extname(
//                   file.originalname).toLowerCase());
      
//       if (mimetype && extname) {
//           return cb(null, true);
//       }
    
//       cb("Error: File upload only supports the "
//               + "following filetypes - " + filetypes);
//     } 

// // mypic is the name of file attribute
// }).single("mypic"); 


const videoStorage = multer.diskStorage({
  destination: 'videos', // Destination to store video 
  filename: (req, file, cb) => {
      cb(null, file.fieldname 
       // + '_' + Date.now() 
       + path.extname(file.originalname))
  }
});



const videoUpload = multer({
  storage: videoStorage,
  limits: {
  fileSize: 10000000 // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
       return cb(new Error('Please upload a video'))
    }
    cb(undefined, true)
 }
})


const fileupload = async function(req,res){
  
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

  const videoupload = async function(req,res){
    // console.log(req);
    //   console.log(req.file);
    //   console.log(req.files);
    //   console.log(req.body);
    //   console.log(req.body.file);
    //   console.log(req.body.files);
    //   console.log(req.body.formData);
       console.log(req.body);
       console.log(req.file);
       console.log(req.mypic);
      // let resp = {issuccess:"true", message:"cannot be deleted from frontend"};
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
       console.log("infileparse");
      // console.log(files);
      });
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
    //console.log(req.files);
    let resp = {issuccess:"true", message:"cannot be deleted from frontend"};
    try {
      const data = fs.readFileSync('/test.txt', 'utf8');
    //  console.log(data);
    } catch (err) {
      console.error(err);
    }
    
    return resp;
  }



  module.exports ={
    fileupload,
    videoupload
 }
 
