import axios from "axios";
import React, { useState, useEffect } from "react";

import {
  alltypecompconsolelog,
  replacedynamictext,
  gettabledatafromDatabase,
  alltypecompClickHandler,
  allowDrop,
  dragstart,
  dragEnter,
  dragLeave,
  inserttabledatainDatabase,
  fetchlistmetadatafromDB,
  createtabledataNodejs,
  insertrecordNodejs,
  updaterecordNodejs,
  deleterecordNodejs,
  currenttimeinseconds,
} from "./logic";

var video;
var mycanvasmediaRecorder;
var mycanvasrecordedChunks;
var width, height;
let initframedata = {};
let modifiedframedata = {};

let Videogalleryhtml = (props) => {
  const [mediagallery, setmediagallery] = useState([]);
  const [mediasectiongallery, setmediasectiongallery] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let mediagalleryjs = await fetchlistmetadatafromDB({
      tablename: "media",
      conditionexpression: {},
    });

    if (mediagalleryjs && mediagalleryjs.length > 0) {
      setmediagallery(mediagalleryjs);
    }

    let mediasectiongalleryjs = await fetchlistmetadatafromDB({
      tablename: "mediasection",
      conditionexpression: {},
    });

    if (mediasectiongalleryjs && mediasectiongalleryjs.length > 0) {
      setmediasectiongallery(mediasectiongalleryjs);
    }

    // var mycanvasblob = new Blob(mycanvasrecordedChunks, {
    //   type: "video/mp4",
    // });
    // var mycanvasurl = URL.createObjectURL(mycanvasblob);
   // var myvideo4 = document.getElementById("myvideo4");
   // myvideo4.src = mycanvasurl;

  }

  let mainpanelhtml = [];
  let mainvideogalleryhtml = [];
  for (let i = 0; i < mediagallery.length; i++) {
    mainvideogalleryhtml.push(<div>{mediagallery[i].label}</div>);
  }

  let mainsectionvideogalleryhtml = [];
  for (let i = 0; i < mediasectiongallery.length; i++) {
    mainsectionvideogalleryhtml.push(
      <div>
        {mediasectiongallery[i].label}-{mediasectiongallery[i].foldername}-
        {mediasectiongallery[i].filename}
      </div>
    );
  }
let videosrc = "/videofour/samplemedianame1679239077/0to10.mp4";
  return (
    <div style={{ display: "flex", height: "300px", overflow: "auto" }}>
      <div style={{ width: "30%", overflow: "auto" }}>
      <b>media</b>
        {mainvideogalleryhtml}
        <b>mediasection</b>
        {mainsectionvideogalleryhtml}
      </div>
      <div style={{ width: "70%", overflow: "auto" }}>
      <video id="videoPlayer" width="650" controls muted="muted" autoplay>
      <source src={videosrc} type="video/mp4" />
    </video>
      </div>
    </div>
  );
};

let Videoprogressbarhtml = (methodprops) => {
  const [currentTime, setcurrentTime] = useState(0);

  useEffect(() => {
    updatetime();
  }, []);

  function updatetime() {
    let myvideo1 = document.getElementById("myvideo1");
    setcurrentTime(myvideo1.currentTime);
    setTimeout(() => {
      updatetime();
    }, 1000);
  }

  let { totalwidth, numberofseconds, gototime } = methodprops;
  let mainpanelhtml = [];
  // console.log(currentTime);
  let blockwidth = totalwidth / numberofseconds;
  let normalblockprops = {
    width: blockwidth,
    height: "5px",
    backgroundColor: "grey",
    textAlign: "center",
    overflow: "hidden",
  };
  let currenttimeblockprops = {
    width: "25px",
    height: "25px",
    backgroundColor: "grey",
    borderRadius: "50%",
    textAlign: "center",
  };
  for (let i = 0; i < numberofseconds; i++) {
    let blockprops = {};
    if (i === parseInt(currentTime)) {
      blockprops = currenttimeblockprops;
    } else {
      blockprops = normalblockprops;
    }

    mainpanelhtml.push(
      <div
        style={blockprops}
        title={i}
        onClick={() => gototime({ currentTime: i })}
      >
        .
      </div>
    );
  }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {mainpanelhtml}
      </div>
      <div
        style={{
          display: "flex",
          rowGap: "10px",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{ padding: "5px" }}
          onClick={() => {
            document.getElementById("myvideo1").play();
          }}
        >
          <i class="fa fa-play"></i>
        </div>
        <div
          style={{ padding: "5px" }}
          onClick={() => {
            document.getElementById("myvideo1").pause();
          }}
        >
          <i class="fa fa-pause"></i>
        </div>
        <div
          style={{ padding: "5px" }}
          onClick={() => {
            document.getElementById("myvideo1").currentTime = 0;
            document.getElementById("myvideo1").play();
          }}
        >
          <i class="fa fa-fast-backward"></i>
        </div>
        <div
          style={{ padding: "5px" }}
          onClick={() => {
            document.getElementById("myvideo1").currentTime = currentTime - 10;
          }}
        >
          <i class="fa fa-rotate-left"></i>
        </div>
        <div
          style={{ padding: "5px" }}
          onClick={() => {
            document.getElementById("myvideo1").currentTime = currentTime + 10;
          }}
        >
          <i class="fa fa-rotate-right"></i>
        </div>
        <div style={{ padding: "5px" }}>{currentTime}</div>
      </div>
    </div>
  );
};

export let Imageupload = (props) => {
  useEffect(() => {
    doInit({});
  }, []);

  let doInit = async () => {
    video = document.getElementById("myvideo1");
    width = video.width;
    height = video.height;

    var mycanvas = document.getElementById("mycanvas");
    const mycanvasstream = mycanvas.captureStream(25);
    mycanvasrecordedChunks = [];
    var options = {};
    mycanvasmediaRecorder = new MediaRecorder(mycanvasstream, options);
    mycanvasmediaRecorder.ondataavailable = mycanvasrecorderhandleDataAvailable;
    mycanvasmediaRecorder.onstop = (evt) => mycanvasrecorderonstop();
  };

  async function uploadvideo(methodprops) {
    let {
      medianame,
      mediasectionname,
      starttimeinseconds,
      endtimeinseconds,
      totaldurationinseconds,
    } = methodprops;
    console.log(mycanvasrecordedChunks);
    var mycanvasblob = new Blob(mycanvasrecordedChunks, {
      type: "video/mp4",
    });
    var mycanvasurl = URL.createObjectURL(mycanvasblob);
    console.log(video.currentTime);
    let filenamenodejs =
      medianame +
      "foldername" +
      starttimeinseconds +
      "to" +
      endtimeinseconds +
      ".mp4";
    let filename = starttimeinseconds + "to" + endtimeinseconds + ".mp4";

    console.log(filenamenodejs);
    var myblobfile = new File([mycanvasblob], filenamenodejs, {
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

    await axios
      .post(url, formData, config)
      .then((response) => {
        console.log(response);

        currentVideouploadingStatus = "isuploadingsuccess";
        console.log(currentVideouploadingStatus);

        updatevideolocationstatusindatabase({
          status: currentVideouploadingStatus,
          percentagecompleted: 100,
          medianame: medianame,
          mediasectionname: mediasectionname,
          starttimeinseconds: starttimeinseconds,
          endtimeinseconds: endtimeinseconds,
          totaldurationinseconds: totaldurationinseconds,
          filename: filename,
          foldername: medianame,
        });
      })
      .catch((error) => {
        console.log(`failed: ${error.message}`);

        currentVideouploadingStatus = "isuploadingfailed";

        updatevideolocationstatusindatabase({
          status: currentVideouploadingStatus,
          percentagecompleted: 0,
          medianame: medianame,
          mediasectionname: mediasectionname,
          starttimeinseconds: starttimeinseconds,
          endtimeinseconds: endtimeinseconds,
          totaldurationinseconds: totaldurationinseconds,
          filename: filename,
          foldername: medianame,
        });
      });
  }

  function downloadvideo() {
    var mycanvasblob = new Blob(mycanvasrecordedChunks, {
      type: "video/mp4",
    });
    var mycanvasurl = URL.createObjectURL(mycanvasblob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = mycanvasurl;
    a.download = "sample.mp4";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(mycanvasurl);
    }, 100);
  }

  function uploadprogressHandler(methodprops) {
    let { e } = methodprops;
    let { loaded, total } = e;
    let percent = (loaded / total) * 100;
    let roundedpercent = Math.round(percent);
    console.log(roundedpercent);
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

  function gototime(methodprops) {
    let { currentTime } = methodprops;
    video.currentTime = currentTime;
    console.log(video.duration);
  }

  async function startautouploadvideo() {
    let currenttimeinsecondsjs = currenttimeinseconds();
    let medianame = "samplemedianame" + currenttimeinsecondsjs;
    let medialabel = "samplemedialabel" + currenttimeinsecondsjs;
    let mediaid = "samplemediaid" + currenttimeinsecondsjs;
    let mediauploadname = "samplemediauploadname" + currenttimeinsecondsjs;
    let mediasectionname = "samplemediasectionname" + currenttimeinsecondsjs;

    let createmediaprops = {
      id: mediaid,
      label: medialabel,
      name: medianame,
      firstaudiovediomediasectionname: "",
      firstvediomediasectionname: "",
      firstaudiomediasectionname: "",
      totaldurationinseconds: 0,
    };
    let createmediaresp = await insertrecordNodejs({
      tablename: "media",
      tabledatalist: [createmediaprops],
    });
    console.log(createmediaresp);

    let createmediauploadprops = {
      id: mediauploadname,
      label: mediauploadname,
      name: mediauploadname,
      sourcelocationtype: "",
      sourcelocationurl: "",
      lastsuccesfulluploadingstarttimeinseconds: 0,
      lastsuccesfulluploadingendtimeinseconds: 0,
      percentagecompleted: 0,
      eachvideosectiondurationinseconds: 10,
      medianame: medianame,
      status: "notstarted", ///failed/success/started/paused/resumed
    };
    let createmediauploadresp = {};

    if (createmediaresp.issuccess === "true") {
      createmediauploadresp = await insertrecordNodejs({
        tablename: "mediaupload",
        tabledatalist: [createmediauploadprops],
      });
    }
    console.log(createmediauploadresp);

    let createmediasectionprops = {
      id: mediasectionname,
      label: mediasectionname,
      name: mediasectionname,
      medianame: medianame,
      type: "video", //audio/audiovedio,
      mediastarttimeinsecondsinparent: 0,
      mediaendtimeinsecondsinparent: 10,
      totaldurationinseconds: 10,
      status: "notstarted", ///failed/success/started/paused/resumed
      percentagecompleted: 0,
      foldername: "",
      filename: "",
    };
    let createmediasectionresp = {};
    if (createmediauploadresp.issuccess === "true") {
      createmediasectionresp = await insertrecordNodejs({
        tablename: "mediasection",
        tabledatalist: [createmediasectionprops],
      });
    }

    if (createmediasectionresp.issuccess === "true") {
      currentVideouploadingStatus = "initial";
      autouploadvideo({
        medianame: medianame,
        mediasectionname: mediasectionname,
        starttimeinseconds: 0,
        endtimeinseconds: 10,
        totaldurationinseconds: 10,
      });
    }
  }

  async function updatevideolocationstatusindatabase(methodprops) {
    let {
      status,
      percentagecompleted,
      medianame,
      mediasectionname,
      starttimeinseconds,
      endtimeinseconds,
      totaldurationinseconds,
      filename,
      foldername,
    } = methodprops;
    console.log(methodprops);
    let updatemediasectionresp = await updaterecordNodejs({
      tablename: "mediasection",
      conditionexpression: {
        medianame: medianame,
        name: mediasectionname,
      },
      updateexpression: {
        status: status,
        percentagecompleted: percentagecompleted,
        foldername: foldername,
        filename: filename,
      },
      upsertifnotfound: true,
    });
    console.log(updatemediasectionresp);
    if (
      updatemediasectionresp.issuccess === "true" &&
      status === "isuploadingsuccess"
    ) {
      if (parseInt(video.duration) <= endtimeinseconds) {
        currentVideouploadingStatus = "finisheduploading";
        return;
      }

      let currenttimeinsecondsjs = currenttimeinseconds();
      let mediasectionnamenew =
        "samplemediasectionname" + currenttimeinsecondsjs;

      let createmediasectionprops = {
        id: mediasectionnamenew,
        label: mediasectionnamenew,
        name: mediasectionnamenew,
        medianame: medianame,
        type: "video", //audio/audiovedio,
        mediastarttimeinsecondsinparent: endtimeinseconds,
        mediaendtimeinsecondsinparent:
          endtimeinseconds + totaldurationinseconds,
        totaldurationinseconds: totaldurationinseconds,
        status: "notstarted", ///failed/success/started/paused/resumed
        percentagecompleted: 0,
        foldername: "",
        filename: "",
      };
      let createmediasectionresp = {};
      createmediasectionresp = await insertrecordNodejs({
        tablename: "mediasection",
        tabledatalist: [createmediasectionprops],
      });

      if (createmediasectionresp.issuccess === "true") {
        currentVideouploadingStatus = "initial";

        autouploadvideo({
          medianame: medianame,
          mediasectionname: mediasectionnamenew,
          starttimeinseconds: endtimeinseconds,
          endtimeinseconds: endtimeinseconds + totaldurationinseconds,
          totaldurationinseconds: totaldurationinseconds,
        });
      }
    }
  }

  async function autouploadvideo(methodprops) {
    console.log(methodprops);
    let {
      medianame,
      mediasectionname,
      starttimeinseconds,
      endtimeinseconds,
      totaldurationinseconds,
    } = methodprops;

    let videocurrenttimeinseconds = 0;
    if (video && video.currentTime) {
      videocurrenttimeinseconds = parseInt(video.currentTime);
    }

    console.log(currentVideouploadingStatus);
    console.log(video.currentTime);
    console.log(parseInt(video.currentTime));
    console.log(videocurrenttimeinseconds);

    console.log(starttimeinseconds);

    // if (video.playing) {
    //   currentVideouploadingStatus = "playing";
    // }

    if (
      videocurrenttimeinseconds !== starttimeinseconds &&
      currentVideouploadingStatus === "initial"
    ) {
      video.currentTime = starttimeinseconds;
      console.log(currentVideouploadingStatus);
      console.log(parseInt(video.duration));
      console.log(parseInt(video.currentTime));
      if (parseInt(video.duration) < starttimeinseconds) {
        currentVideouploadingStatus = "finisheduploading";
        return;
      }
    } else if (currentVideouploadingStatus === "initial") {
      mycanvasrecordedChunks = [];
      mycanvasmediaRecorder.start();
      video.play();
      currentVideouploadingStatus = "playing";
      console.log(currentVideouploadingStatus);
    } else if (currentVideouploadingStatus === "playing") {
      let c3 = document.getElementById("mycanvas");
      let ctx3 = c3.getContext("2d");
      ctx3.drawImage(video, 0, 0, width, height);
      if (parseInt(video.currentTime) === endtimeinseconds) {
        video.pause();
        mycanvasmediaRecorder.stop();
        currentVideouploadingStatus = "paused";
      }

      if (video.ended) {
        currentVideouploadingStatus = "ended";
      }
      console.log(currentVideouploadingStatus);
    } else if (currentVideouploadingStatus === "paused") {
      if (parseInt(video.currentTime) === endtimeinseconds) {
        currentVideouploadingStatus = "startuploading";
      }
      console.log(currentVideouploadingStatus);
    } else if (video.ended && currentVideouploadingStatus === "playing") {
      if (mycanvasmediaRecorder.state !== "inactive") {
        mycanvasmediaRecorder.stop();
      }
      currentVideouploadingStatus = "startuploading";
      endtimeinseconds = parseInt(video.currentTime);
      totaldurationinseconds = parseInt(video.currentTime) - starttimeinseconds;
      console.log(currentVideouploadingStatus);
    } else if (currentVideouploadingStatus === "ended") {
      if (mycanvasmediaRecorder.state !== "inactive") {
        mycanvasmediaRecorder.stop();
      }
      currentVideouploadingStatus = "startuploading";
      endtimeinseconds = parseInt(video.currentTime);
      totaldurationinseconds = parseInt(video.currentTime) - starttimeinseconds;

      console.log(currentVideouploadingStatus);
    } else if (currentVideouploadingStatus === "startuploading") {
      await uploadvideo({
        medianame: medianame,
        mediasectionname: mediasectionname,
        starttimeinseconds: starttimeinseconds,
        endtimeinseconds: endtimeinseconds,
        totaldurationinseconds: totaldurationinseconds,
      });
      console.log(currentVideouploadingStatus);
      return;
    } else if (
      currentVideouploadingStatus === "isuploadingfailed" ||
      currentVideouploadingStatus === "finisheduploading"
    ) {
      console.log(currentVideouploadingStatus);
      return;
    } else if (currentVideouploadingStatus === "isuploadingsuccess") {
      console.log(currentVideouploadingStatus);
      return;
      // if (video.ended) {
      //   currentVideouploadingStatus = "finisheduploading";
      //   currentrecordingendtime = 0;
      // } else {
      //   currentVideouploadingStatus = "initial";
      //   currentrecordingendtime = currentrecordingendtime + 10;
      // }
    } else {
      console.log(currentVideouploadingStatus);
    }

    setTimeout(() => {
      autouploadvideo({
        medianame: medianame,
        mediasectionname: mediasectionname,
        starttimeinseconds: starttimeinseconds,
        endtimeinseconds: endtimeinseconds,
        totaldurationinseconds: totaldurationinseconds,
      });
    }, 16);
  }

  function mycanvasrecorderhandleDataAvailable(event) {
    mycanvasrecordedChunks.push(event.data);
  }

  function mycanvasrecorderonstop() {
    var mycanvasblob = new Blob(mycanvasrecordedChunks, {
      type: "video/mp4",
    });
    var mycanvasurl = URL.createObjectURL(mycanvasblob);
    var myvideo3 = document.getElementById("myvideo3");
    myvideo3.src = mycanvasurl;
  }

  function greoutSimilarPixels(event) {
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

    myctx.putImageData(modifiedframedata, 0, 0);
  }

  let currentrecordingendtime = 10;
  let currentVideouploadingStatus = "initial";

  let mainpanelhtml = [];
  mainpanelhtml.push(
    <div style={{ width: "100%" }}>
      <Videogalleryhtml />
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
        id="mycanvas"
        width="300"
        height="270"
        onMouseDown={(e) => greoutSimilarPixels(e)}
        style={{ border: "1px solid #d3d3d3" }}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>

      <video controls id="myvideo3"></video>

      <div
        onClick={() => {
          startautouploadvideo();
        }}
      >
        startautouploadvideo
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
          getimagefromvideoattime();
        }}
      >
        getimagefromvideoattime
      </div>

      <div
        onClick={() => {
          gototime();
        }}
      >
        gototime
      </div>

      <Videoprogressbarhtml
        totalwidth={1000}
        numberofseconds={33}
        gototime={gototime}
      />
      <img id="myImg" alt="test" width="300" height="270"></img>
    </div>
  );
  return mainpanelhtml;
};
