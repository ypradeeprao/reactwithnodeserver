import axios from "axios";
import React, { useState, useEffect } from "react";

var video;
var mycanvas1stream;
var mycanvas1mediaRecorder;
var mycanvas1mediaRecorderchunks=[];
var mycanvas3mediaRecorder;
var myctx3;
var mycanvas3recordedChunks;
// mycanvas1mediaRecorder.ondataavailable = (e) => {
//     alert();
//     mycanvas1mediaRecorderchunks.push(e.data);
//   };



export let Imageupload = (props) => {
  const [file, setFile] = useState();

  useEffect(() => {
 
  fetchRangecolumndatafromDB({});




  var mycanvas3 = document.getElementById("mycanvas3");
 myctx3 = mycanvas3.getContext("2d");
// draw a white background
// myctx3.fillStyle = "white";
// myctx3.fillRect(0, 0, mycanvas3.width, mycanvas3.height);
// myctx3.fillStyle = "black";
// myctx3.font = "30px Arial";
// myctx3.fillText("Hello World", 10, 50);

const mycanvas3stream = mycanvas3.captureStream(25);
 mycanvas3recordedChunks = [];
var options = {};
mycanvas3mediaRecorder = new MediaRecorder(mycanvas3stream, options);

mycanvas3mediaRecorder.ondataavailable = mycanvas3handleDataAvailable;
mycanvas3mediaRecorder.start();
// Chrome requires we draw on the canvas while recording
//mycanvas3mediaRecorder.onstart = mycanvas3animationLoop;

mycanvas3mediaRecorder.onstop = (evt) => mycanvas3download();
}, []);





// function mycanvas3animationLoop() {
//   // draw nothing, but still draw
//   myctx3.globalAlpha = 0;
//   myctx3.fillRect(0, 0, 1, 1);
//   // while we're recording
//   if (mycanvas3mediaRecorder.state !== "inactive") {
//     requestAnimationFrame(mycanvas3animationLoop);
//   }
// }
// wait for the stop event to export the final video
// the dataavailable can fire before


function mycanvas3handleDataAvailable(event) {
  mycanvas3recordedChunks.push(event.data);
}

function mycanvas3download() {
  
  var mycanvas3blob = new Blob(mycanvas3recordedChunks, {
    type: "video/webm"
  });
  var mycanvas3url = URL.createObjectURL(mycanvas3blob);
  // exporting to a video element for that demo
  // the downloaded video will still not work in some programs
  // For this one would need to fix the markers using something like ffmpeg.
  var myvideo3 = document.getElementById('myvideo3');
  myvideo3.src = mycanvas3url;
  // hack to make the video seekable in the browser
  // see https://stackoverflow.com/questions/38443084/
//   myvideo3.onloadedmetadata = (evt) => {
//     myvideo3.currentTime = 10e6;
//     myvideo3.addEventListener("seeked", () => myvideo3.currentTime = 0, {
//       once: true
//     })
//   }
}

// setTimeout(() => {
  
//  // mycanvas3mediaRecorder.stop();
// }, 10000);
// console.log("please wait while recording (10s)");



//const canvas;

let fetchRangecolumndatafromDB = async() =>{
  // let mycanvas1 = document.getElementById("mycanvas1");
// video = document.querySelector('video');

 //mycanvas1stream = mycanvas1.captureStream();
//video.srcObject = stream;
//mycanvas1mediaRecorder = new MediaRecorder(mycanvas1stream);


 // mycanvas1mediaRecorder.start();

video = document.getElementById("myvideo1");

//let video2 = document.getElementById("myvideo2");
//console.log(video);

//video2.src = "https://jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v";

video.addEventListener(
  "play",
  () => {
    width = video.width;
    height = video.height;
    timerCallback();
  },
  false
);

}


  function handleChangefile(event) {
    setFile(event.target.files[0]);
  }

  const handleSubmit2 = async (file) => {
    const file2 = document.querySelector("#myfile").files[0];
    //console.log(await toBase64(file2));

    //  fs.readFile('./assets/video.mp4', async function (err, data) {
    //   if (err) {
    //       throw err;
    //   }
    //   //console.log(data);
    //   var movie_data = data;

    //   var i,
    //       j,
    //       temparray,
    //       chunk = 1000000,
    //       index = 0;
    //   for (i = 0, j = movie_data.length; i < j; i += chunk, index++) {
    //       temparray = movie_data.slice(i, i + chunk);
    //       fs.writeFileSync(`./output/${index}.mp4`, temparray, 'binary');
    //   }

    // console.log("Uploading file...");
    // const API_ENDPOINT = "http://localhost:5000/uploadFile";
    // const request = new XMLHttpRequest();
    // const formData = new FormData();

    // request.open("POST", API_ENDPOINT, true);
    // request.onreadystatechange = () => {
    //   if (request.readyState === 4 && request.status === 200) {
    //     console.log(request.responseText);
    //   }
    // };
    // formData.append("file", file);
    // request.send(formData);
  };

  function handleSubmit3(event) {
    doLoad();
    document
      .getElementById("audio-upload")
      .addEventListener("change", changeHandler);
  }

  function handleSubmit(event) {
    doLoad();
    event.preventDefault();
    console.log(file);
    const url = "/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  var  width, height,videoStream;
  let videorecordedBlobs = [];



  function doLoad() {
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
  }

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
    // let c1 = document.getElementById("mycanvas1");
    // let ctx1 = c1.getContext("2d");

    // ctx1.drawImage(video, 0, 0, width, height);


    let c3 = document.getElementById("mycanvas3");
    let ctx3 = c3.getContext("2d");
    ctx3.drawImage(video, 0, 0, width, height);

    // const frame = ctx1.getImageData(0, 0, width, height);
    // console.log(frame);
    // console.log(width);
    // console.log(height);
    // const l = frame.data.length / 4;

    // for (let i = 0; i < l; i++) {
    //   const grey =
    //     (frame.data[i * 4 + 0] +
    //       frame.data[i * 4 + 1] +
    //       frame.data[i * 4 + 2]) /
    //     3;

    //   frame.data[i * 4 + 0] = grey;
    //   frame.data[i * 4 + 1] = grey;
    //   frame.data[i * 4 + 2] = grey;
    // }
   // ctx1.putImageData(frame, 0, 0);


   //  videoStream = c1.captureStream(30);
   // videoStream.getVideoTracks()[0].requestFrame();
  
 //  var mediaRecorder = new MediaRecorder(videoStream);
//   var chunks = [];
//   mediaRecorder.ondataavailable = audiohandleDataAvailable;

// mediaRecorder.onstop = function(e) {
//   var blob = new Blob(videorecordedBlobs, { 'type' : 'video/mp4' }); // other types are available such as 'video/webm' for instance, see the doc for more info
//   videorecordedBlobs = [];
//    var videoURL = URL.createObjectURL(blob);
//    video.src = videoURL;
//  };
// mediaRecorder.start();

    return;
  }


  
  function audiohandleDataAvailable(event) {
  
    if (event.data && event.data.size > 0) {
      videorecordedBlobs.push(event.data);
    }
    console.log(videorecordedBlobs);
}


  let downloadrecordaudioclickhanlder = async (methodprops) => {
    try {
        const blob = new Blob(videorecordedBlobs, { type: "video/mp4" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "audio.mp4";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    } catch (e) {
    }
};

  let handleChange = (methodprops) => {
    let { e } = methodprops;
    <Imageupload maxfilesize="200000" />;
    let { maxfilesize } = props;
    console.log(e.target.files);
    let files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let fileitem = files[i];
        console.log(fileitem.name);
        console.log(fileitem.size);
        console.log(fileitem.type);
        let name = "";
        let size = "";

        if (fileitem.type === "image/jpeg" || fileitem.type === "image/jpg") {
          name = fileitem.name;
          name = name.replace(".jpg", "");
          name = name.replace(".jpeg", "");
        }

        console.log(name);

        if (maxfilesize && parseInt(maxfilesize) < fileitem.size) {
          alert("file size limit is " + maxfilesize);
        }
      }
    }
  };

  function changeHandler({ target }) {
    // Make sure we have files to use
    if (!target.files.length) return;

    // Create a blob that we can use as an src for our audio element
    const urlObj = URL.createObjectURL(target.files[0]);

    // Create an audio element
    const audio = document.createElement("video");

    // Clean up the URL Object after we are done with it
    audio.addEventListener("load", () => {
      URL.revokeObjectURL(urlObj);
    });

    // Append the audio element
    document.body.appendChild(audio);

    // Allow us to control the audio
    audio.controls = "true";

    // Set the src and start loading the audio from the file
    audio.src = urlObj;

    document.getElementById("my-video").src = urlObj;
  }

  let mainpanelhtml = [];
  mainpanelhtml.push(
    <div style={{ width: "100%" }}>
        ----------------

        <h1 onClick={()=>{mycanvas3mediaRecorder.stop();}}>Lets test mediaRecorder</h1>

<canvas id="mycanvas3"  width="480" height="270" style={{border:"1px solid #d3d3d3"}}>
  Your browser does not support the HTML canvas tag.
</canvas>
<video controls id="myvideo3"></video>

        --------

+++++++

<video
        id="myvideo1"
        controls="true"
        width="480"
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

      {/* <canvas id="mycanvas1" width="480" height="270"></canvas> */}

      {/* <video
        id="myvideo2"
        controls="true"
        width="480"
        height="270"
        crossorigin="anonymous"
      >
      
      </video> */}

++++
{/* 
      <div>
        <label for="audio-upload">Upload an audio file:</label>
      </div>
      <div>
        <input id="audio-upload" type="file" />
      </div>

      <form>
        <h1>React File Uploadd</h1>
        <input type="file" id="myfile" onChange={handleChangefile} />
        <div type="submit" onClick={handleSubmit2}>
          Upload
        </div>
        <div type="submit" onClick={handleSubmit3}>
          Upload
        </div>
        <div onClick={downloadrecordaudioclickhanlder}>download audio</div>

      </form>

      <video
        id="my-video"
        controls="true"
        width="480"
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

      <canvas id="my-canvas" width="480" height="270"></canvas>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleChange({ e: e })}
      />

      <form action="/videoupload" enctype="multipart/form-data" method="POST">
        <span>Upload Profile Picture:</span>
        <input type="file" name="mypic" required /> <br />
        <input type="submit" value="submit" />
      </form> */}
    </div>
  );
  return mainpanelhtml;
};
