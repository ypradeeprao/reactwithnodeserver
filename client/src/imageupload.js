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
let initframedata = {};
let modifiedframedata = {};
let firstclick = true;
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

   // ctx1.putImageData(frame, 0, 0);

    return;
  }

  function mycanvas3handleDataAvailable(event) {
    console.log(video.currentTime);
    mycanvas3recordedChunks.push(event.data);
    console.log(mycanvas3recordedChunks);
  }

  function getCursorPosition(event) {
    const canvas = document.querySelector("canvas");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    let myctx = canvas.getContext("2d");

    const clickedpointframedata = myctx.getImageData(x, y, 1, 1);
    console.log(clickedpointframedata);

    const frame = myctx.getImageData(0, 0, width, height);
    if (initframedata && Object.keys(initframedata).length > 0) {
    } else {
      initframedata = frame;
    }

    modifiedframedata = myctx.getImageData(0, 0, width, height);
    console.log(frame);
    console.log(JSON.parse(JSON.stringify(frame)));
    console.log(width);
    console.log(height);
    const l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
      const grey =
        (frame.data[i * 4 + 0] +
          frame.data[i * 4 + 1] +
          frame.data[i * 4 + 2]) /
        3;

      let ismatching = false;
      if (
        clickedpointframedata &&
        clickedpointframedata.data &&
        clickedpointframedata.data[0] > frame.data[i * 4 + 0] - 30 &&
        clickedpointframedata.data[0] < frame.data[i * 4 + 0] + 30 &&
        clickedpointframedata.data[1] > frame.data[i * 4 + 1] - 30 &&
        clickedpointframedata.data[1] < frame.data[i * 4 + 1] + 30 &&
        clickedpointframedata.data[2] > frame.data[i * 4 + 2] - 30 &&
        clickedpointframedata.data[2] < frame.data[i * 4 + 2] + 30 &&
        clickedpointframedata.data[3] > frame.data[i * 4 + 3] - 30 &&
        clickedpointframedata.data[3] < frame.data[i * 4 + 3] + 30
      ) {
        ismatching = true;
      }

      if (ismatching === true) {
        modifiedframedata.data[i * 4 + 0] = 255;
        modifiedframedata.data[i * 4 + 1] = 255;
        modifiedframedata.data[i * 4 + 2] = 255;
      }
    }
    //   if(firstclick == true){
    myctx.putImageData(modifiedframedata, 0, 0);
    firstclick = false;
    //   }
    //  else{
    //   firstclick = true;
    //  myctx.putImageData(initframedata, 0, 0);
    //   modifiedframedata = initframedata;
    //   }
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
    var myblobfile = new File([mycanvas3blob], "sample.mp4", {
      type: "video/mp4",
    });

    const url = "/videoupload";
    var formData = new FormData();
    formData.append("mypic", myblobfile);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (e) => uploadprogressHandler({ e: e }),
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  function uploadprogressHandler(methodprops) {
    let { e } = methodprops;
    let { loaded, total } = e;
    let percent = (loaded / total) * 100;
    let roundedpercent = Math.round(percent);
    console.log(roundedpercent);
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

  function getimagefromvideoattime() {
    let canvas = document.createElement("canvas");
    let myvideo3 = document.getElementById("myvideo3");
    let image = "";

    myvideo3.addEventListener("seeked", function () {
      canvas.width = 1920;
      canvas.height = 1080;

      let ctx = canvas.getContext("2d");
      ctx.drawImage(myvideo3, 0, 0, canvas.width, canvas.height);

      image = canvas.toDataURL("image/jpeg");
      document.getElementById("myImg").src = image;
    });

    myvideo3.currentTime = 3;
  }

  function doubledownloadvideo() {
    let mycanvas3recordedChunksdouble = [];
    for (let i = 0; i < mycanvas3recordedChunks.length; i++) {
      mycanvas3recordedChunksdouble.push(mycanvas3recordedChunks[i]);
    }
    for (let i = 0; i < mycanvas3recordedChunks.length; i++) {
      mycanvas3recordedChunksdouble.push(mycanvas3recordedChunks[i]);
    }
    var mycanvas3blob = new Blob(mycanvas3recordedChunksdouble, {
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

  function handleChangefile(event) {
    let targetfile = event.target.files[0];
    console.log(targetfile);

    var fr = new FileReader();
    fr.onload = function () {
      var data = fr.result;
      var array = new Int8Array(data);
      var uint8ClampedArray = new Uint8ClampedArray(data);
      console.log(data);
      console.log(array);
      console.log(uint8ClampedArray);
      // output.value = JSON.stringify(array, null, '  ');
      // window.setTimeout(ReadFile, 1000);
    };
    fr.readAsArrayBuffer(targetfile);

    const urlObj = URL.createObjectURL(targetfile);
    console.log(urlObj);
    let videoupload = document.getElementById("myvideo1");
    videoupload.src = urlObj;
  }

  let mainpanelhtml = [];
  mainpanelhtml.push(
    <div style={{ width: "100%" }}>
      <input id="videoupload" type="file" onChange={handleChangefile} />

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
        onMouseDown={(e) => getCursorPosition(e)}
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

      <div
        onClick={() => {
          doubledownloadvideo();
        }}
      >
        doubledownloadvideo
      </div>

      <div
        onClick={() => {
          getimagefromvideoattime();
        }}
      >
        getimagefromvideoattime
      </div>

      <img id="myImg" alt="test" width="300" height="270"></img>
    </div>
  );
  return mainpanelhtml;
};
