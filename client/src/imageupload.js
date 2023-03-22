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
  const [count, setCount] = useState(0);
  const [compstate, setCompstate] = useState({
    showui: "false",
    mediagallery: [],
    mediasectiongallery: [],
    selectedmediasection: {},
    mediastarttimeinsecondsinparent: "",
    mediaendtimeinsecondsinparent: "",
    selectedmedia: {
      totaldurationinseconds: 33,
    },
    currentTimeDisplayinSeconds:0
  });

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async (methodprops) => {
    let mediagalleryjs = await fetchlistmetadatafromDB({
      tablename: "media",
      conditionexpression: {},
    });

    if (mediagalleryjs && mediagalleryjs.length > 0) {
      await Showui({ mediagallery: mediagalleryjs });
    }

    // let mediasectiongalleryjs = await fetchlistmetadatafromDB({
    //   tablename: "mediasection",
    //   conditionexpression: {},
    // });

    // if (mediasectiongalleryjs && mediasectiongalleryjs.length > 0) {
    //   setmediasectiongallery(mediasectiongalleryjs);
    // }

    updatetime();
  };

  function updatetime() {
  

    setTimeout(() => {
      setCount((count) => count + 100);


      setCompstate((oldstate) => {
        console.log(oldstate.currentTimeDisplayinSeconds);
        let {mediasectiongallery, selectedmediasection, currentTimeDisplayinSeconds} = oldstate;
        let myvideo1 = document.getElementById("videoPlayer");
        
        if (myvideo1 && myvideo1.ended) {
        //  playnextmediasection({});

          for (let i = 0; i < mediasectiongallery.length; i++) {
      if (selectedmediasection.mediaendtimeinsecondsinparent ===
         mediasectiongallery[i].mediastarttimeinsecondsinparent) {
          myvideo1.dataset.mediaendtimeinsecondsinparent = mediasectiongallery[i].mediaendtimeinsecondsinparent;
          myvideo1.src =
            "/videofour/" +
            mediasectiongallery[i].foldername +
            "/" +
            mediasectiongallery[i].filename;
          myvideo1.play();
          selectedmediasection = compstate.mediasectiongallery[i];
         
      }
    }

        }

        if (
          myvideo1 &&
          myvideo1.currentTime
        ) {
          oldstate.currentTimeDisplayinSeconds =
          currentTimeDisplayinSeconds + parseInt(myvideo1.currentTime);
        }


        return oldstate;
      });
      updatetime();
    }, 1000);
  }

  let Showui = async (methodprops) => {
    console.log(methodprops);
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: "true" });
  };
  let Hideui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: "false" });
  };

  async function showMediasectionshtml(methodprops) {
    let { medianame } = methodprops;
    let selectedmedia = {};
    for (let i = 0; i < compstate.mediagallery.length; i++) {
      if (medianame === compstate.mediagallery[i].name) {
        selectedmedia = compstate.mediagallery[i];
      }
    }

    let mediasectiongalleryjs = await fetchlistmetadatafromDB({
      tablename: "mediasection",
      conditionexpression: {
        medianame: medianame,
      },
    });

    if (mediasectiongalleryjs && mediasectiongalleryjs.length > 0) {
      await Showui({
        mediasectiongallery: mediasectiongalleryjs,
        selectedmedia: selectedmedia,
      });
    }
  }

  async function playnextmediasection(methodprops) {
    console.log(compstate);
    let myvideo1 = document.getElementById("videoPlayer");
    let mediaendtimeinsecondsinparent =
      myvideo1.dataset.mediaendtimeinsecondsinparent;

    // for (let i = 0; i < compstate.mediasectiongallery.length; i++) {
    //   if (mediaendtimeinsecondsinparent ===
    //      compstate.mediasectiongallery[i].mediastarttimeinsecondsinparent) {
    //       myvideo1.dataset.mediaendtimeinsecondsinparent = compstate.mediasectiongallery[i].mediaendtimeinsecondsinparent;
    //       myvideo1.src =
    //         "/videofour/" +
    //         compstate.mediasectiongallery[i].foldername +
    //         "/" +
    //         compstate.mediasectiongallery[i].filename;
    //       myvideo1.play();

    //       await Showui({
    //         selectedmediasection:compstate.mediasectiongallery[i],
    //         });
    //   }
    // }
  }

  async function updatevideosrclocal(methodprops) {
    let { mediactionsectionname } = methodprops;
    for (let i = 0; i < compstate.mediasectiongallery.length; i++) {
      if (mediactionsectionname === compstate.mediasectiongallery[i].name) {
        let myvideo1 = document.getElementById("videoPlayer");
        myvideo1.dataset.mediaendtimeinsecondsinparent =
          compstate.mediasectiongallery[i].mediaendtimeinsecondsinparent;
        myvideo1.src =
          "/videofour/" +
          compstate.mediasectiongallery[i].foldername +
          "/" +
          compstate.mediasectiongallery[i].filename;
        myvideo1.play();

        await Showui({
          selectedmediasection: compstate.mediasectiongallery[i],
          mediastarttimeinsecondsinparent: 1,
          mediaendtimeinsecondsinparent: 2,

          // mediastarttimeinsecondsinparent:compstate.mediasectiongallery[i].mediastarttimeinsecondsinparent,
          //   mediaendtimeinsecondsinparent:compstate.mediasectiongallery[i].mediaendtimeinsecondsinparent
        });
      }
    }
  }

  async function gototimelocal(methodprops) {
    let { gototimeinseconds } = methodprops;
    let gototimeinsecondsjs = parseInt(gototimeinseconds);
    //console.log(gototimeinsecondsjs);
    let myvideo1 = document.getElementById("videoPlayer");
    myvideo1.src = "";
    setTimeout(async () => {
      for (let i = 0; i < compstate.mediasectiongallery.length; i++) {
        if (
          gototimeinsecondsjs >
            compstate.mediasectiongallery[i].mediastarttimeinsecondsinparent &&
          gototimeinsecondsjs <
            compstate.mediasectiongallery[i].mediaendtimeinsecondsinparent
        ) {
          console.log(compstate.mediasectiongallery[i]);
          let durationfrommediasectionstarttimeinsecons =
            gototimeinsecondsjs -
            compstate.mediasectiongallery[i].mediastarttimeinsecondsinparent;
          await Showui({
            selectedmediasection: compstate.mediasectiongallery[i],
          });
          let myvideo1 = document.getElementById("videoPlayer");
          myvideo1.src =
            "/videofour/" +
            compstate.mediasectiongallery[i].foldername +
            "/" +
            compstate.mediasectiongallery[i].filename;
          myvideo1.currentTime = durationfrommediasectionstarttimeinsecons;
          //if(myvideo1.playing){
          myvideo1.play();
          // }
        }
      }
    }, 1000);
  }

  console.log(count);
  let mainpanelhtml = [];
  let mainvideogalleryhtml = [];

  if (compstate.showui != "true") {
    return <></>;
  } else {
    for (let i = 0; i < compstate.mediagallery.length; i++) {
      mainvideogalleryhtml.push(
        <div
          onClick={() =>
            showMediasectionshtml({
              medianame: compstate.mediagallery[i].name,
            })
          }
        >
          {compstate.mediagallery[i].label}
        </div>
      );
    }

    let mainsectionvideogalleryhtml = [];
    for (let i = 0; i < compstate.mediasectiongallery.length; i++) {
      mainsectionvideogalleryhtml.push(
        <div
          onClick={() =>
            updatevideosrclocal({
              mediactionsectionname: compstate.mediasectiongallery[i].name,
            })
          }
        >
          {compstate.mediasectiongallery[i].label}-
          {compstate.mediasectiongallery[i].foldername}-
          {compstate.mediasectiongallery[i].filename}
        </div>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          height: "700px",
          overflow: "auto",
          flexWrap: "wrap",
        }}
      >
        {/* <Timer /> */}
        <div style={{ width: "100%", overflow: "auto" }}>
          <video
            id="videoPlayer"
            width="500"
            height="500"
            controls={false}
            muted="muted"
            autoplay
          ></video>
        </div>
        <div style={{ width: "100%", overflow: "auto" }}>
          <Videoprogressbarhtml
            totalwidth={500}
            mediatotaldurationinseconds={compstate.selectedmedia.totaldurationinseconds}
            mediastarttimeinsecondsinparent={
              compstate.selectedmediasection.mediastarttimeinsecondsinparent
            }
            mediaendtimeinsecondsinparent={
              compstate.selectedmediasection.mediaendtimeinsecondsinparent
            }
            videohtmlid={"videoPlayer"}
            gototimelocal={gototimelocal}
            currentTimeDisplayinSeconds={compstate.currentTimeDisplayinSeconds}
            playnextmediasection={(methodprops) =>
              playnextmediasection(methodprops)
            }
          />
        </div>
        <div style={{ width: "30%", overflow: "auto" }}>
          <b>media</b>
          {mainvideogalleryhtml}
        </div>
        <div style={{ width: "70%", overflow: "auto" }}>
          <b>mediasection</b>
          {mainsectionvideogalleryhtml}
        </div>
      </div>
    );
  }
};

export function Timer() {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(1);
  useEffect(() => {
    settime();
  }, []); // <- add empty brackets here

  let settime = () => {
    setTimeout(() => {
      console.log(count);
      setCount((count) => count + 100);
      settime();
    }, 1000);
  };

  let handleClick = () => {
    setCount((count) => 100);
  };

  return <div onClick={handleClick}>I've renderedd {count} times!</div>;
}
let Videoprogressbarhtml = (methodprops) => {
  const [currentTime, setcurrentTime] = useState(0);

  useEffect(() => {
   // updatetime();
  }, []);

  function updatetime() {
    let { videohtmlid, playnextmediasection, mediaendtimeinsecondsinparent } =
      methodprops;
    if (mediaendtimeinsecondsinparent) {
      console.log(mediaendtimeinsecondsinparent);
    }
    let myvideo1 = document.getElementById(videohtmlid);
    console.log(methodprops);
    if (myvideo1 && myvideo1.ended) {
      playnextmediasection({
        mediaendtimeinsecondsinparent: mediaendtimeinsecondsinparent,
      });
      return;
    } else if (myvideo1 && myvideo1.currentTime) {
      setcurrentTime(myvideo1.currentTime);
    }
    setTimeout(() => {
      updatetime();
    }, 200);
  }

  let {
    totalwidth,
    mediatotaldurationinseconds,
    videohtmlid,
    mediastarttimeinsecondsinparent,
    gototimelocal,
    currentTimeDisplayinSeconds
  } = methodprops;
  let mainpanelhtml = [];
  let myvideo1 = document.getElementById(videohtmlid);

  //let currentTimeDisplayinSeconds = "";
  let totalTimeDisplayinSeconds = "";

  // if (
  //   myvideo1 &&
  //   myvideo1.currentTime &&
  //   mediastarttimeinsecondsinparent !== undefined
  // ) {
  //   currentTimeDisplayinSeconds =
  //     mediastarttimeinsecondsinparent + parseInt(myvideo1.currentTime);
  // }
  console.log(currentTimeDisplayinSeconds);
  console.log(mediastarttimeinsecondsinparent);
  if (mediatotaldurationinseconds) {
    totalTimeDisplayinSeconds = parseInt(mediatotaldurationinseconds);
  }

  let blockwidth = totalwidth / mediatotaldurationinseconds;
  //console.log(parseInt(blockwidth));
  let normalblockprops = {
    width: parseInt(blockwidth),
    height: "10px",
    backgroundColor: "grey",
    textAlign: "center",
    overflow: "hidden",
    cursor: "pointer",
  };
  let currenttimeblockprops = {
    width: "25px",
    height: "25px",
    backgroundColor: "grey",
    borderRadius: "50%",
    textAlign: "center",
    cursor: "pointer",
  };

  for (let i = 0; i < mediatotaldurationinseconds; i++) {
    let blockprops = {};
    if (i === currentTimeDisplayinSeconds) {
      blockprops = currenttimeblockprops;
    } else {
      blockprops = normalblockprops;
    }

    mainpanelhtml.push(
      <div
        style={blockprops}
        title={i}
        onClick={() =>
          gototimelocal({
            gototimeinseconds: i,
          })
        }
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
            document.getElementById(videohtmlid).play();
          }}
        >
          <i class="fa fa-play"></i>
        </div>
        <div
          style={{ padding: "5px" }}
          onClick={() => {
            document.getElementById(videohtmlid).pause();
          }}
        >
          <i class="fa fa-pause"></i>
        </div>
        <div
          style={{ padding: "5px" }}
          onClick={() => {
            document.getElementById(videohtmlid).currentTime = 0;
            document.getElementById(videohtmlid).play();
          }}
        >
          <i class="fa fa-fast-backward"></i>
        </div>
        <div
          style={{ padding: "5px" }}
          onClick={() => {
            document.getElementById(videohtmlid).currentTime = currentTime - 10;
          }}
        >
          <i class="fa fa-rotate-left"></i>
        </div>
        <div
          style={{ padding: "5px" }}
          onClick={() => {
            document.getElementById(videohtmlid).currentTime = currentTime + 10;
          }}
        >
          <i class="fa fa-rotate-right"></i>
        </div>
        <div style={{ padding: "5px" }}>
          {currentTimeDisplayinSeconds}/{totalTimeDisplayinSeconds}
        </div>
      </div>
    </div>
  );
};

function gototime(methodprops) {
  let { currentTime, videohtmlid } = methodprops;
  let myvideo1 = document.getElementById(videohtmlid);
  myvideo1.currentTime = currentTime;
  //console.log(myvideo1.duration);
}

function updatevideosrc(methodprops) {
  let { src, videohtmlid } = methodprops;
  let myvideo1 = document.getElementById(videohtmlid);
  myvideo1.src = src;
  myvideo1.play();
}

export let Imageupload = (props) => {
  useEffect(() => {
    doInit({});
  }, []);

  let doInit = async () => {
    video = document.getElementById("myvideo1");
    width = video.width;
    height = video.height;

    var mycanvas = document.getElementById("mycanvas");
    const mycanvasstream = mycanvas.captureStream();
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
    //console.log(video.currentTime);
    let filenamenodejs =
      medianame +
      "foldername" +
      starttimeinseconds +
      "to" +
      endtimeinseconds +
      ".mp4";
    let filename = starttimeinseconds + "to" + endtimeinseconds + ".mp4";

    //console.log(filenamenodejs);
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
      maxBodyLength: 10000000,
      maxContentLength: 10000000,
      emulateJSON: true,
      onUploadProgress: (e) => uploadprogressHandler({ e: e }),
    };

    await axios
      .post(url, formData, config)
      .then((response) => {
        //console.log(response);

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
        //console.log(`failed: ${error.message}`);

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
    //console.log(roundedpercent);
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
    //console.log(targetfile);

    var fr = new FileReader();
    fr.onload = function () {
      var data = fr.result;
      var array = new Int8Array(data);
      var uint8ClampedArray = new Uint8ClampedArray(data);
      //console.log(data);
      //console.log(array);
      //console.log(uint8ClampedArray);
      // output.value = JSON.stringify(array, null, '  ');
      // window.setTimeout(ReadFile, 1000);
    };
    fr.readAsArrayBuffer(targetfile);

    const urlObj = URL.createObjectURL(targetfile);
    //console.log(urlObj);
    let videoupload = document.getElementById("myvideo1");
    videoupload.src = urlObj;
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
      totaldurationinseconds: 0,
    };
    let createmediaresp = await insertrecordNodejs({
      tablename: "media",
      tabledatalist: [createmediaprops],
    });
    //console.log(createmediaresp);

    let createmediauploadprops = {
      id: mediauploadname,
      label: mediauploadname,
      name: mediauploadname,
      sourcelocationtype: "",
      sourcelocationurl: "",
      lastsuccesfulluploadingstarttimeinseconds: 0,
      lastsuccesfulluploadingendtimeinseconds: 0,
      percentagecompleted: 0,
      eachvideosectiondurationinseconds: 60,
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
    //console.log(createmediauploadresp);

    let createmediasectionprops = {
      id: mediasectionname,
      label: mediasectionname,
      name: mediasectionname,
      medianame: medianame,
      type: "video", //audio/audiovedio,
      mediastarttimeinsecondsinparent: 0,
      mediaendtimeinsecondsinparent: 60,
      totaldurationinseconds: 60,
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
        endtimeinseconds: 60,
        totaldurationinseconds: 60,
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
    //console.log(methodprops);

    let updatemediaexpression = {};
    let updatemediasectionexpression = {};

    let mediajs = await fetchlistmetadatafromDB({
      tablename: "media",
      conditionexpression: {
        name: medianame,
      },
    });

    if (mediajs && mediajs.length > 0) {
      updatemediaexpression.totaldurationinseconds =
        mediajs[0].totaldurationinseconds + totaldurationinseconds;
    }

    let updatemediaresp = await updaterecordNodejs({
      tablename: "media",
      conditionexpression: {
        name: medianame,
      },
      updateexpression: updatemediaexpression,
      upsertifnotfound: false,
    });
    //console.log(updatemediaresp);

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
        mediaendtimeinsecondsinparent: endtimeinseconds,
        totaldurationinseconds: totaldurationinseconds,
      },
      upsertifnotfound: false,
    });
    //console.log(updatemediasectionresp);
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
    //console.log(methodprops);
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

    //console.log(currentVideouploadingStatus);
    //console.log(video.currentTime);
    //console.log(parseInt(video.currentTime));
    //console.log(videocurrenttimeinseconds);

    //console.log(starttimeinseconds);

    // if (video.playing) {
    //   currentVideouploadingStatus = "playing";
    // }

    if (
      videocurrenttimeinseconds !== starttimeinseconds &&
      currentVideouploadingStatus === "initial"
    ) {
      video.currentTime = starttimeinseconds;
      //console.log(currentVideouploadingStatus);
      //console.log(parseInt(video.duration));
      //console.log(parseInt(video.currentTime));
      if (parseInt(video.duration) < starttimeinseconds) {
        currentVideouploadingStatus = "finisheduploading";
        return;
      }
    } else if (currentVideouploadingStatus === "initial") {
      mycanvasrecordedChunks = [];
      mycanvasmediaRecorder.start();
      video.play();
      currentVideouploadingStatus = "playing";
      //console.log(currentVideouploadingStatus);
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
      //console.log(currentVideouploadingStatus);
    } else if (currentVideouploadingStatus === "paused") {
      if (parseInt(video.currentTime) === endtimeinseconds) {
        currentVideouploadingStatus = "startuploading";
      }
      //console.log(currentVideouploadingStatus);
    } else if (video.ended && currentVideouploadingStatus === "playing") {
      if (mycanvasmediaRecorder.state !== "inactive") {
        mycanvasmediaRecorder.stop();
      }
      currentVideouploadingStatus = "startuploading";
      endtimeinseconds = parseInt(video.currentTime);
      totaldurationinseconds = parseInt(video.currentTime) - starttimeinseconds;
      //console.log(currentVideouploadingStatus);
    } else if (currentVideouploadingStatus === "ended") {
      if (mycanvasmediaRecorder.state !== "inactive") {
        mycanvasmediaRecorder.stop();
      }
      currentVideouploadingStatus = "startuploading";
      endtimeinseconds = parseInt(video.currentTime);
      totaldurationinseconds = parseInt(video.currentTime) - starttimeinseconds;

      //console.log(currentVideouploadingStatus);
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
      //console.log(currentVideouploadingStatus);
      return;
    } else if (currentVideouploadingStatus === "isuploadingsuccess") {
      //console.log(currentVideouploadingStatus);
      return;
      // if (video.ended) {
      //   currentVideouploadingStatus = "finisheduploading";
      //   currentrecordingendtime = 0;
      // } else {
      //   currentVideouploadingStatus = "initial";
      //   currentrecordingendtime = currentrecordingendtime + 10;
      // }
    } else {
      //console.log(currentVideouploadingStatus);
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
    console.log(mycanvasrecordedChunks);
    mycanvasrecordedChunks.push(event.data);
  }

  function mycanvasrecorderonstop() {
    console.log(mycanvasrecordedChunks);
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
    //console.log("x: " + x + " y: " + y);
    let myctx = canvas.getContext("2d");

    const clickedpointframedata = myctx.getImageData(x, y, 1, 1);
    //console.log(clickedpointframedata);

    const frame = myctx.getImageData(0, 0, width, height);
    if (initframedata && Object.keys(initframedata).length > 0) {
    } else {
      initframedata = frame;
    }

    modifiedframedata = myctx.getImageData(0, 0, width, height);
    //console.log(frame);
    //console.log(JSON.parse(JSON.stringify(frame)));
    //console.log(width);
    //console.log(height);
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

      <img id="myImg" alt="test" width="300" height="270"></img>
    </div>
  );
  return mainpanelhtml;
};
