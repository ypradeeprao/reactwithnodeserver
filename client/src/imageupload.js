import axios from "axios";
import React, { useState } from "react";

export let Imageupload = (props) => {
  const [file, setFile] = useState();
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

  var video, width, height,videoStream;
  let videorecordedBlobs = [];



  function doLoad() {
    video = document.getElementById("my-video");

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
    if (video.paused || video.ended) {
      return;
    }
    computeFrame();
    setTimeout(() => {
      timerCallback();
    }, 16); // roughly 60 frames per second
  };

  function computeFrame() {
    let c1 = document.getElementById("my-canvas");
    let ctx1 = c1.getContext("2d");

    ctx1.drawImage(video, 0, 0, width, height);
    const frame = ctx1.getImageData(0, 0, width, height);
    const l = frame.data.length / 4;

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
    ctx1.putImageData(frame, 0, 0);


     videoStream = c1.captureStream(30);
   // videoStream.getVideoTracks()[0].requestFrame();
  
   var mediaRecorder = new MediaRecorder(videoStream);
   var chunks = [];
   mediaRecorder.ondataavailable = audiohandleDataAvailable;

// mediaRecorder.onstop = function(e) {
//   var blob = new Blob(videorecordedBlobs, { 'type' : 'video/mp4' }); // other types are available such as 'video/webm' for instance, see the doc for more info
//   videorecordedBlobs = [];
//    var videoURL = URL.createObjectURL(blob);
//    video.src = videoURL;
//  };
 mediaRecorder.start();

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
      </form>
    </div>
  );
  return mainpanelhtml;
};
