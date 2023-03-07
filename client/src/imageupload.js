import axios from "axios";
import React, { useState, useEffect } from "react";

var video;
var mycanvas1stream;
var mycanvas1mediaRecorder;
var mycanvas1mediaRecorderchunks = [];
var mycanvas3mediaRecorder;
var myctx3;
var mycanvas3recordedChunks;
var width, height, videoStream;
let videorecordedBlobs = [];

export let Imageupload = (props) => {
  const [file, setFile] = useState();

  useEffect(() => {
    fetchRangecolumndatafromDB({});
  }, []);

  let fetchRangecolumndatafromDB = async () => {
    video = document.getElementById("myvideo1");

    video.addEventListener(
      "play",
      () => {
        width = video.width;
        height = video.height;
        timerCallback();
      },
      false
    );

    var mycanvas3 = document.getElementById("mycanvas3");
    myctx3 = mycanvas3.getContext("2d");

    const mycanvas3stream = mycanvas3.captureStream(25);
    mycanvas3recordedChunks = [];
    var options = {};
    mycanvas3mediaRecorder = new MediaRecorder(mycanvas3stream, options);

    mycanvas3mediaRecorder.ondataavailable = mycanvas3handleDataAvailable;
    mycanvas3mediaRecorder.start();

    mycanvas3mediaRecorder.onstop = (evt) => mycanvas3download();
  };

  let timerCallback = () => {
    console.log(mycanvas1stream);
    console.log(mycanvas1mediaRecorderchunks);
    if (video.paused || video.ended) {
      return;
    }
    computeFrame();
    setTimeout(() => {
      timerCallback();
    }, 16); // roughly 60 frames per second
  };

  function computeFrame() {
    let c3 = document.getElementById("mycanvas3");
    let ctx3 = c3.getContext("2d");
    ctx3.drawImage(video, 0, 0, width, height);

    return;
  }

  function mycanvas3handleDataAvailable(event) {
    mycanvas3recordedChunks.push(event.data);
  }

  function mycanvas3download() {
    var mycanvas3blob = new Blob(mycanvas3recordedChunks, {
      type: "video/mp4",
    });
    var mycanvas3url = URL.createObjectURL(mycanvas3blob);
    var myvideo3 = document.getElementById("myvideo3");
    myvideo3.src = mycanvas3url;
   
  }

  function uploadvideo() {

  

    var mycanvas3blob = new Blob(mycanvas3recordedChunks, {
        type: "video/mp4",
      });
      var mycanvas3url = URL.createObjectURL(mycanvas3blob);
      var myblobfile = new File([mycanvas3blob], "sample.mp4", {type:"video/mp4"});
 
 
      const url = "/videoupload";
    var formData = new FormData();
    formData.append('mypic', myblobfile);

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
  onUploadProgress: progressEvent => console.log(progressEvent.loaded)
};
axios.post(url, formData, config).then((response) => {
  console.log(response.data);
});


  }

  function downloadvideo() {
    var mycanvas3blob = new Blob(mycanvas3recordedChunks, {
        type: "video/mp4",
      });
      var mycanvas3url = URL.createObjectURL(mycanvas3blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = mycanvas3url;
      a.download = "sample.mp4";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(mycanvas3url);
      }, 100);  
  }




  let mainpanelhtml = [];
  mainpanelhtml.push(
    <div style={{ width: "100%" }}>
      <video
        id="myvideo1"
        controls="true"
        width="300"
        height="270"
        crossorigin="anonymous"
      >
        <source
          src="https://jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm"
          type="video/webm"
        />
        <source
          src="https://jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v"
          type="video/mp4"
        />
      </video>

    

      <canvas
        id="mycanvas3"
        width="300"
        height="270"
        style={{ border: "1px solid #d3d3d3" }}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>

      <video controls id="myvideo3"></video>

        <div
        onClick={() => {
          mycanvas3mediaRecorder.stop();
        }}
      >
       showcanvasinvideo
      </div>

      <div
        onClick={() => {
            uploadvideo();
        }}
      >
       upload
      </div>


      <div
        onClick={() => {
            downloadvideo();
        }}
      >
       downloadvideo
      </div>


    </div>
  );
  return mainpanelhtml;
};
