const express = require("express"); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5001; //Line 3
const path = require("path");
var axios = require("axios");
const mongojs = require("./mongorest.js");
const nodemailerjs = require("./nodemailernode.js");
const twilionodejs = require("./twilionode.js");
const imgbbrestjs = require("./imgbbrest.js");
const fileuploadjs = require("./fileupload.js");
const bodyParser = require("body-parser");
var multer = require("multer");
const fs = require('fs');

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.use(express.static(path.join(__dirname, "build")));

app.get("/react", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/images/:id", (req, res) => {
  var id = req.params.id;
  res.sendFile(path.join(__dirname, "images", id));
});

app.get("/videos/:name/:track", (req, res) => {
  var name = req.params.name;
  var track = req.params.track;
  res.sendFile(path.join(__dirname, "videos", name, track));
});

// create a GET route
app.get("/express_backend", (req, res) => {
  //Line 9
  console.log("express_backend start");
  const jsonContent = JSON.stringify({
    express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT",
  });
  res.end(jsonContent);
  //  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

app.post("/createtable", async (req, res) => {
  console.log("createtabledfd");
  let mongojsresp = await mongojs.createtable(req);

  res.end(JSON.stringify(mongojsresp));
});

app.post("/edittable", async (req, res) => {
  let mongojsresp = await mongojs.edittable(req);
  res.end(JSON.stringify(mongojsresp));
});

app.post("/deletetable", async (req, res) => {
  let mongojsresp = await mongojs.deletetable(req);
  res.end(JSON.stringify(mongojsresp));
});

app.post("/retrieverecords", async (req, res) => {
  var x = await mongojs.retrieverecords(req);
  res.end(JSON.stringify(x));
});

app.post("/insertrecords", async (req, res) => {
  var x = await mongojs.insertrecords(req);
  res.end(JSON.stringify(x));
});

app.post("/editrecords", async (req, res) => {
  var x = await mongojs.editrecords(req);
  res.end(JSON.stringify(x));
});

app.post("/deleterecords", async (req, res) => {
  var x = await mongojs.deleterecords(req);
  res.end(JSON.stringify(x));
});

app.post("/sendmail", async (req, res) => {
  var x = await nodemailerjs.sendmail(req);
  res.end(JSON.stringify({}));
});

app.post("/sendmobilemessage", async (req, res) => {
  var x = await twilionodejs.sendmobilemessage(req);
  res.end(JSON.stringify(x));
});

app.post("/getuploadimagerequestjson", async (req, res) => {
  var x = await imgbbrestjs.getpostrequestjson(req);
  res.end(JSON.stringify(x));
});

app.post("/fileupload", async (req, res) => {
  var x = await fileuploadjs.fileupload(req, res);
  res.end(JSON.stringify(x));
});

app.post("/uploadFile", async (req, res) => {
  var x = await fileuploadjs.fileupload(req, res);
  res.end(JSON.stringify(x));
});

app.post("/videoupload", async (req, res) => {
  console.log("videoupload");
  var x = await fileuploadjs.videoupload(req, res);
  res.end(JSON.stringify(x));
});

app.post("/uploadImage", async (req, res) => {
  imageUpload(req, res, function (err) {
    if (err) {
      // res.send(err)
    } else {
      //   res.send("Success, Image uploaded!")
    }
  });
});


app.get("/videofour/:foldername/:filename", function (req, res) {
  // Ensure there is a range given for the video
  var foldername = req.params.foldername;
  var filename = req.params.filename;

  const range = req.headers.range;
  console.log(range);
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = path.join(__dirname, "videos",
  foldername, filename)
  const videoSize = fs.statSync("bigbuck.mp4").size;
  console.log(videoSize);
  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  console.log(start);
  console.log(end);

  // Create headers
  const contentLength = end - start + 1;
  console.log(contentLength);
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  console.log(headers);
  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});