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
  timedisplayfromSecondsfromstart,
  dragdropHandler2
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
    // currentTimeDisplayinSeconds: 0,
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

    updatetime();
  };

  function updatetime() {
    setTimeout(() => {
      setCount((oldstate) => {
        let myvideo1 = document.getElementById("videoPlayer");

        if (myvideo1 && myvideo1.currentTime && !myvideo1.ended) {
          oldstate = parseInt(myvideo1.currentTime);
        }

        return oldstate;
      });

      setCompstate((oldstate) => {
        //   console.log(oldstate);
        let { mediasectiongallery, selectedmediasection } = oldstate;
        let myvideo1 = document.getElementById("videoPlayer");

        if (myvideo1 && myvideo1.ended) {
          let newselectedmediasection = {};
          for (let i = 0; i < mediasectiongallery.length; i++) {
            if (
              selectedmediasection.mediaendtimeinsecondsinparent ===
              mediasectiongallery[i].mediastarttimeinsecondsinparent
            ) {
              newselectedmediasection = mediasectiongallery[i];
            }
          }

          if (newselectedmediasection && newselectedmediasection.filename) {
            myvideo1.src =
              "/videofour/" +
              newselectedmediasection.foldername +
              "/" +
              newselectedmediasection.filename;
            myvideo1.play();
            oldstate.selectedmediasection = newselectedmediasection;
            //console.log(selectedmediasection);
          } else {
            oldstate.selectedmediasection = {};
          }
        }

        return oldstate;
      });
      updatetime();
    }, 100);
  }

  let Showui = async (methodprops) => {
    //console.log(methodprops);
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
          //console.log(compstate.mediasectiongallery[i]);
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

  //console.log(count);

  let mainpanelhtml = [];
  let mainvideogalleryhtml = [];
  let currentTimeDisplayinSeconds = 0;

  if (
    compstate.selectedmediasection.mediastarttimeinsecondsinparent !== undefined
  ) {
    //console.log(compstate.selectedmediasection.mediastarttimeinsecondsinparent);
    currentTimeDisplayinSeconds =
      count + compstate.selectedmediasection.mediastarttimeinsecondsinparent;
  }

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
          {compstate.selectedmediasection.label}-
          {compstate.selectedmediasection.foldername}-
          {compstate.selectedmediasection.filename}
          <Videoprogressbarhtml
            totalwidth={500}
            mediatotaldurationinseconds={
              compstate.selectedmedia.totaldurationinseconds
            }
            videohtmlid={"videoPlayer"}
            gototimelocal={gototimelocal}
            currentTimeDisplayinSeconds={currentTimeDisplayinSeconds}
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

let Videoprogressbarhtml = (methodprops) => {
  const [currentTime, setcurrentTime] = useState(0);

  useEffect(() => {}, []);

  let {
    totalwidth,
    mediatotaldurationinseconds,
    videohtmlid,

    gototimelocal,
    currentTimeDisplayinSeconds,
  } = methodprops;

  let mainpanelhtml = [];

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
          {currentTimeDisplayinSeconds}/{mediatotaldurationinseconds}
        </div>
      </div>
    </div>
  );
};

let Videoimageprogressbarhtml = (methodprops) => {
  const [currentTime, setcurrentTime] = useState(0);

  useEffect(() => {}, []);

  let {
    totalwidth,
    mediatotaldurationinseconds,
    videohtmlid,

    gototimelocal,
    currentTimeDisplayinSeconds,
    cutcurrentplayingtimeinseconds,
    cutstarttimeinseconds,
    cutendtimeinseconds,
    handleClick,
  } = methodprops;

  let mainpanelhtml = [];

  let blockwidth = totalwidth / mediatotaldurationinseconds;
  //console.log(methodprops);
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

  let cuttimestartblockprops = {
    width: "5px",
    height: "25px",
    backgroundColor: "grey",
    // borderRadius: "50%",
    textAlign: "center",
    cursor: "pointer",
  };

  let cuttimebetweenblockprops = {
    width: parseInt(blockwidth),
    height: "10px",
    backgroundColor: "lightblue",
    textAlign: "center",
    overflow: "hidden",
    cursor: "pointer",
  };

  for (let i = 0; i < mediatotaldurationinseconds; i++) {
    let blockprops = {};
    if (i === currentTimeDisplayinSeconds) {
      blockprops = currenttimeblockprops;
    } else if (i === cutstarttimeinseconds || i == cutendtimeinseconds) {
      blockprops = cuttimestartblockprops;
    } else if (i > cutstarttimeinseconds && i < cutendtimeinseconds) {
      blockprops = cuttimebetweenblockprops;
    } else {
      blockprops = normalblockprops;
    }

    mainpanelhtml.push(
      <div
        style={blockprops}
        title={i}
        onClick={() =>
          handleClick({
            type: "gototime",
            htmlid: videohtmlid,
            timeinseconds: i,
          })
        }
      >
        .
      </div>
    );
  }
  if (document.getElementById(videohtmlid)) {
    console.log(document.getElementById(videohtmlid).paused);
    console.log(document.getElementById(videohtmlid).ended);
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
        {document.getElementById(videohtmlid) ? (
          <>{document.getElementById(videohtmlid).paused}-test</>
        ) : (
          <>test2</>
        )}
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
          {currentTimeDisplayinSeconds}/{mediatotaldurationinseconds}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          style={{ padding: "5px" }}
          onClick={() =>
            handleClick({
              type: "startcutting",
              htmlid: videohtmlid,
              value: currentTimeDisplayinSeconds,
            })
          }
        >
          startcutting
        </div>
        <div
          style={{ padding: "5px" }}
          onClick={() =>
            handleClick({
              type: "stopcutting",
              htmlid: videohtmlid,
              value: currentTimeDisplayinSeconds,
            })
          }
        >
          stopcutting
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => handleClick({ type: "clearcurrentcutting" })}
        >
          Clear current cutting
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => handleClick({ type: "clearallcuttingsinthisvideo" })}
        >
          Clear all cuttings in this video
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => handleClick({ type: "addtoselectedtrack" })}
        >
          Add to Selected Track
        </div>
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
    //console.log(mycanvasrecordedChunks);
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
        //console.log(currentVideouploadingStatus);

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
    // let canvas = document.createElement("canvas");
    // let myvideo3 = document.getElementById("myvideo3");
    // let image = "";

    // myvideo3.addEventListener("seeked", function () {
    //   canvas.width = 1920;
    //   canvas.height = 1080;

    //   let ctx = canvas.getContext("2d");
    //   ctx.drawImage(myvideo3, 0, 0, canvas.width, canvas.height);

    //   image = canvas.toDataURL("image/jpeg");
    //   document.getElementById("myImg").src = image;
    // });

    // myvideo3.currentTime = 3;
    let c3 = document.getElementById("mycanvas");
    let image = "";
    image = c3.toDataURL("image/jpeg");
    document.getElementById("myImg").src = image;
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
      drawVideoonCanvas();
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
      // await uploadvideo({
      //   medianame: medianame,
      //   mediasectionname: mediasectionname,
      //   starttimeinseconds: starttimeinseconds,
      //   endtimeinseconds: endtimeinseconds,
      //   totaldurationinseconds: totaldurationinseconds,
      // });
      //console.log(currentVideouploadingStatus);
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
    //console.log(mycanvasrecordedChunks);
    mycanvasrecordedChunks.push(event.data);
  }

  function mycanvasrecorderonstop() {
    //console.log(mycanvasrecordedChunks);
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
    ////console.log("x: " + x + " y: " + y);
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

  async function drawVideoonCanvas() {
    let c4 = document.getElementById("mycanvas2");
    let ctx4 = c4.getContext("2d");
    let initframe2 = ctx4.getImageData(0, 0, width, height);
    //console.log(initframe2);

    let c3 = document.getElementById("mycanvas");
    let ctx3 = c3.getContext("2d");
    ctx3.drawImage(video, 0, 0, width, height);

    var isgreyoutpixels = document.getElementById("isgreyoutpixels").checked;
    var isdefaultpixels = document.getElementById("isdefaultpixels").checked;
    var istransparentpixels = document.getElementById(
      "istransparentpixels"
    ).checked;
    var iswatermarkimage = document.getElementById("iswatermarkimage").checked;
    var iswatermarktext = document.getElementById("iswatermarktext").checked;

    let initframe = ctx3.getImageData(0, 0, width, height);
    //  console.log(initframe);
    const l = initframe.data.length / 4;
    // console.log(width);300
    //  console.log(height);270
    // console.log(l);81000
    let rownumber = 0;
    let columnnumber = 0;
    for (let i = 0; i < l; i++) {
      if (istransparentpixels == true) {
        initframe.data[i * 4 + 3] = 0;
      }

      if (isgreyoutpixels == true && isdefaultpixels !== true) {
        const grey =
          (initframe.data[i * 4 + 0] +
            initframe.data[i * 4 + 1] +
            initframe.data[i * 4 + 2]) /
          3;

        initframe.data[i * 4 + 0] = grey;
        initframe.data[i * 4 + 1] = grey;
        initframe.data[i * 4 + 2] = grey;
        // console.log(i);
        if (
          rownumber > 200 &&
          columnnumber > 200 &&
          !(
            initframe2.data[i * 4 + 0] === 0 &&
            initframe2.data[i * 4 + 1] === 0 &&
            initframe2.data[i * 4 + 2] === 0 &&
            initframe2.data[i * 4 + 3] === 0
          )
        ) {
          //  if(initframe2.data[i * 4 + 0] !== undefined && initframe2.data[i * 4 + 0] !== ""){
          initframe.data[i * 4 + 0] = initframe2.data[i * 4 + 0];
          // }
          // if(initframe2.data[i * 4 + 1]!== undefined && initframe2.data[i * 4 + 1] !== ""){
          initframe.data[i * 4 + 1] = initframe2.data[i * 4 + 1];
          //  }
          ////  if(initframe2.data[i * 4 + 2] !== undefined && initframe2.data[i * 4 + 2] !== ""){
          initframe.data[i * 4 + 2] = initframe2.data[i * 4 + 2];
          // }
          //  if(initframe2.data[i * 4 + 3]!== undefined && initframe2.data[i * 4 + 3] !== ""){
          initframe.data[i * 4 + 3] = initframe2.data[i * 4 + 3];
          // }
        }
      }

      columnnumber = columnnumber + 1;
      if (columnnumber === width) {
        columnnumber = 0;
        rownumber = rownumber + 1;
      }
    }

    ctx3.putImageData(initframe, 0, 0);
    if (iswatermarktext == true) {
      ctx3.fillText("Testtest", width - 50, height - 20);
    }

    if (iswatermarkimage == true) {
      // ctx3.putImageData(img.src, 0, 0);
    }
  }

  function drawImageonCanvas(event) {
    let c3 = document.getElementById("mycanvas2");

    let ctx3 = c3.getContext("2d");
    let img = new Image(); //.src
    img.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";

    img.onload = function () {
      ctx3.drawImage(img, width - 100, height - 100, 100, 100);
      let initframe = ctx3.getImageData(0, 0, width, height);
      //console.log(initframe);
    };
    // img.src = "https://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png";
  }

  async function gototimelocal(methodprops) {
    let { gototimeinseconds } = methodprops;
    let gototimeinsecondsjs = parseInt(gototimeinseconds);
    let myvideo1 = document.getElementById("myvideo3");
    myvideo1.src = "";
    // setTimeout(async () => {
    //   for (let i = 0; i < compstate.mediasectiongallery.length; i++) {
    //     if (
    //       gototimeinsecondsjs >
    //         compstate.mediasectiongallery[i].mediastarttimeinsecondsinparent &&
    //       gototimeinsecondsjs <
    //         compstate.mediasectiongallery[i].mediaendtimeinsecondsinparent
    //     ) {
    //       console.log(compstate.mediasectiongallery[i]);
    //       let durationfrommediasectionstarttimeinsecons =
    //         gototimeinsecondsjs -
    //         compstate.mediasectiongallery[i].mediastarttimeinsecondsinparent;
    //       await Showui({
    //         selectedmediasection: compstate.mediasectiongallery[i],
    //       });
    //       let myvideo1 = document.getElementById("videoPlayer");
    //       myvideo1.src =
    //         "/videofour/" +
    //         compstate.mediasectiongallery[i].foldername +
    //         "/" +
    //         compstate.mediasectiongallery[i].filename;
    //       myvideo1.currentTime = durationfrommediasectionstarttimeinsecons;
    //       //if(myvideo1.playing){
    //       myvideo1.play();
    //       // }
    //     }
    //   }
    // }, 1000);
  }

  let currentVideouploadingStatus = "initial";

  let mainpanelhtml = [];
  mainpanelhtml.push(
    <div style={{ width: "100%" }}>
      {/* <Videogalleryhtml /> */}
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

      <canvas
        id="mycanvas2"
        width="300"
        height="270"
        style={{ border: "1px solid #d3d3d3" }}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>

      <video controls id="myvideo3"></video>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          style={{ padding: "5px" }}
          onClick={() => {
            startautouploadvideo();
          }}
        >
          startautouploadvideo
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => {
            drawImageonCanvas();
          }}
        >
          drawImageonCanvas
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => {
            //  colorpixels();
          }}
        >
          defaultpixels
          <input type="checkbox" id="isdefaultpixels" />
        </div>

        <div style={{ padding: "5px" }}>
          greyoutPixels
          <input type="checkbox" id="isgreyoutpixels"></input>
        </div>

        <div style={{ padding: "5px" }}>
          istransparentpixels
          <input type="checkbox" id="istransparentpixels"></input>
        </div>

        <div style={{ padding: "5px" }}>
          iswatermarktext
          <input type="checkbox" id="iswatermarktext"></input>
        </div>

        <div style={{ padding: "5px" }}>
          iswatermarkimage
          <input type="checkbox" id="iswatermarkimage"></input>
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => {
            //  colorpixels();
          }}
        >
          withbackground
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => {
            //  colorpixels();
          }}
        >
          animoji
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => {
            //  colorpixels();
          }}
        >
          male voice
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => {
            //  colorpixels();
          }}
        >
          female voice
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => {
            //  colorpixels();
          }}
        >
          tvchannel
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => {
            //  colorpixels();
          }}
        >
          realestate
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => {
            downloadvideo();
          }}
        >
          downloadvideo
        </div>

        <div
          style={{ padding: "5px" }}
          onClick={() => {
            getimagefromvideoattime();
          }}
        >
          getimagefromvideoattime
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        <Videoimageprogressbarhtml
          totalwidth={500}
          mediatotaldurationinseconds={100}
          currentTimeDisplayinSeconds={10}
          videohtmlid={"myvideo3"}
          gototimelocal={gototimelocal}
        />
      </div>

      <img id="myImg" alt="test" width="300" height="270"></img>
    </div>
  );
  return mainpanelhtml;
};

export function Mediauploadhtml(props) {
  let { dropHandler } = props;

  async function dropHandlerLocal(ev) {
    //console.log("File(s) dropped");
    let files = [];
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          //console.log(`… file[${i}].name = ${file.name}`);
          //console.log(file);
          files.push({ type: "file", file: file });
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        //console.log(`… file[${i}].name = ${file.name}`);
        //console.log(file);
        files.push({ type: "file", file: file });
      });
    }

    dropHandler({ files: files });
  }

  function dragOverHandler(ev) {
    //console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  async function handleChangefile(event) {
    let files = [];
    let targetfile = event.target.files[0];
    //console.log(targetfile);
    files.push({ type: "file", file: targetfile });

    dropHandler({ files: files });
  }

  return (
    <div>
      <input id="videoupload" type="file" onChange={handleChangefile} />
      <div
        style={{
          height: "100px",
          backgroundColor: "yellow",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        id="drop_zone"
        onDrop={dropHandlerLocal}
        onDragOver={dragOverHandler}
      >
        <p>
          Drag one or more files to this <i>drop zone</i>.
        </p>
      </div>
    </div>
  );
}

async function gototimelocal(methodprops) {
  let { htmlid, timeinseconds } = methodprops;

  let myvideo1 = document.getElementById(htmlid);
  myvideo1.src = "";
  setTimeout(async () => {
    myvideo1.currentTime = timeinseconds;
    if (myvideo1.playing) {
      myvideo1.play();
    }
  }, 1000);

  // setTimeout(async () => {
  //   for (let i = 0; i < compstate.mediasectiongallery.length; i++) {
  //     if (
  //       gototimeinsecondsjs >
  //         compstate.mediasectiongallery[i].mediastarttimeinsecondsinparent &&
  //       gototimeinsecondsjs <
  //         compstate.mediasectiongallery[i].mediaendtimeinsecondsinparent
  //     ) {
  //       console.log(compstate.mediasectiongallery[i]);
  //       let durationfrommediasectionstarttimeinsecons =
  //         gototimeinsecondsjs -
  //         compstate.mediasectiongallery[i].mediastarttimeinsecondsinparent;
  //       await Showui({
  //         selectedmediasection: compstate.mediasectiongallery[i],
  //       });
  //       let myvideo1 = document.getElementById("videoPlayer");
  //       myvideo1.src =
  //         "/videofour/" +
  //         compstate.mediasectiongallery[i].foldername +
  //         "/" +
  //         compstate.mediasectiongallery[i].filename;
  //       myvideo1.currentTime = durationfrommediasectionstarttimeinsecons;
  //       //if(myvideo1.playing){
  //       myvideo1.play();
  //       // }
  //     }
  //   }
  // }, 1000);
}

function Mediatrackhtml(props) {
  const [compstate, setCompstate] = useState({
    showui: "true",
    trackviewtype: "hours",
    fromHours: 0,
    toHours: 1,
    fromMinutes: 0,
    toMinutes: 60,
    maximumnoofcentisecondspersec: 100,
  });

  let Showui = async (methodprops) => {
    //console.log(methodprops);
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));
    //console.log(methodpropsjs);
    // await setCompstate({ ...compstatejs, ...methodpropsjs, showui: "true" });
    await setCompstate({ ...compstate, ...methodprops, showui: "true" });
  };
  let Hideui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: "false" });
  };

  let handleClick = async (methodprops) => {
    let { type, value } = methodprops;
    let { fromHours, trackviewtype,fromHoursscrollintoview } = compstate;
    if (type === "settrackviewtype") {
      await Hideui({});
      if (value === "seconds") {
        // limit for loop iterations
        await Showui({
          trackviewtype: value,
          fromHours: 0,
          toHours: 1,
          fromMinutes: 0,
          toMinutes: 1,
          maximumnoofcentisecondspersec: 100,
        });
      } else {
        await Showui({ trackviewtype: value });
      }
    } else if (type === "gotohours") {
      if (trackviewtype == "seconds") {
        await Hideui({});

        await Showui({
          fromHours: value,
          toHours: value + 1,
          fromMinutes: 0,
          toMinutes: 1,
        });
      } else {
        await Showui({
          fromHoursscrollintoview: value,
           });
        let elem = document.getElementById(
          value.toString().padStart(2, "0") + ":00:00:00"
        );
        elem.scrollIntoView();
      }
    } 
    else if (type === "gotominutes") {
      if (trackviewtype == "seconds") {
        await Hideui({});

      await Showui({
        fromHours: fromHours,
        toHours: fromHours + 1,
        fromMinutes: value,
        toMinutes: value + 1,
      });
      }
      else{
      
       let elem = document.getElementById(fromHoursscrollintoview.toString().padStart(2, "0")+":"+value.toString().padStart(2, "0")+":00:00");
       elem.scrollIntoView();

     }
    }
    else if (type === "gotoseconds") {
     
      
       let elem = document.getElementById(fromHours.toString().padStart(2, "0")+":"+fromMinutes.toString().padStart(2, "0")+":"+value.toString().padStart(2, "0")+":00");
       elem.scrollIntoView();

     
    }
    
  };
  console.log(props);
  let mainpanelhtml = [];
  let trackHtml = [];

  let centiSecondStyle = {
    backgroundColor: "yellow",
    height: "10px",
  };
  let secondStyle = {
    backgroundColor: "yellow",
    height: "30px",
  };
  let minuteStyle = {
    backgroundColor: "green",
    height: "50px",
  };
  let hourStyle = {
    backgroundColor: "red",
    height: "50px",
  };
  let itemstyle = {};

  let maximumduarationoftrackinseconds = 100;
  let maxiumumduarationoftrackinhours = 1;

  maximumduarationoftrackinseconds =
    props.compstate.maximumduarationoftrackinseconds;
  maxiumumduarationoftrackinhours =
    parseInt(maximumduarationoftrackinseconds / (60*60)) + 1;
  let { mediatrackitemgallery } = props.compstate;
  let {
    trackviewtype,
    fromHours,
    toHours,
    fromMinutes,
    toMinutes,
    maximumnoofcentisecondspersec,
    
  } = compstate;
  let gotohoursHtml = [];
  let gotominutesHtml = [];
  let gotosecondsHtml = [];
  let title = "";
  let titledisplay = ".";
  if (trackviewtype !== "seconds") {
    toHours = maxiumumduarationoftrackinhours;
  }

  let trackviewtypeHtml = [];

  trackviewtypeHtml.push(
    <div
      style={{ padding: "10px" }}
      onClick={() =>
        handleClick({
          type: "settrackviewtype",
          value: "seconds",
        })
      }
    >
      seconds
    </div>
  );

  trackviewtypeHtml.push(
    <div
      style={{ padding: "10px" }}
      onClick={() =>
        handleClick({
          type: "settrackviewtype",
          value: "minutes",
        })
      }
    >
      minutes
    </div>
  );

  trackviewtypeHtml.push(
    <div
      style={{ padding: "10px" }}
      onClick={() =>
        handleClick({
          type: "settrackviewtype",
          value: "hours",
        })
      }
    >
      hours
    </div>
  );

  for (let hr = 0; hr < maxiumumduarationoftrackinhours; hr++) {
    gotohoursHtml.push(
      <div
        style={{ padding: "10px" }}
        onClick={() =>
          handleClick({
            type: "gotohours",
            value: hr,
          })
        }
      >
        {hr}hrs
      </div>
    );
  }

  for (let min = 0; min < 60; min++) {
    gotominutesHtml.push(
      <div
        style={{ padding: "10px" }}
        onClick={() =>
          handleClick({
            type: "gotominutes",
            value: min,
          })
        }
      >
        {min}minutes
      </div>
    );
  }
  for (let secn = 0; secn < 60; secn++) {
    gotominutesHtml.push(
      <div
        style={{ padding: "10px" }}
        onClick={() =>
          handleClick({
            type: "gotoseconds",
            value: secn,
          })
        }
      >
        {secn}seconds
      </div>
    );
  }

 
  let totalsecondsfrombegining = 0;
   let totalcentisecondsfrombegining = 0;
   let mediatrackduration = 0;
   let istrackexists = false;
   let trackstyle = {};
   let istracknotexistsevenstyle = {height:"30px", backgroundColor:"yellow", marginTop:"20px",marginBottom:"20px"};
   let istrackexistsevenstyle = {height:"30px", backgroundColor:"lightblue", marginTop:"20px",marginBottom:"20px"};
   let istrackexistsoddstyle={height:"30px", backgroundColor:"green", marginTop:"20px",marginBottom:"20px"};


   
  for (let hr = fromHours; hr < toHours; hr++) {
    let hrdisplay = hr.toString().padStart(2, "0");

    for (let min = fromMinutes; min < toMinutes; min++) {
      trackstyle = istracknotexistsevenstyle;
      let mindisplay = min.toString().padStart(2, "0");
      if (trackviewtype === "hours") {
       
        itemstyle = centiSecondStyle;

        if (min === 0) {
          itemstyle = hourStyle;
          titledisplay = hrdisplay + ":" + mindisplay + ":00:00";
        } else {
          titledisplay = ".";
        }

        title = hrdisplay + ":" + mindisplay + ":00:00";
        let scrollIntoViewid = hr + "hrs" + min + "mins";
       
         if(mediatrackitemgallery && mediatrackitemgallery.length > 0){
           for (let mti = 0; mti < mediatrackitemgallery.length; mti++) {
            
            if(mediatrackitemgallery[mti].starttimeinsecondsinmediatrack !== undefined
              && mediatrackitemgallery[mti].starttimeinsecondsinmediatrack <= totalsecondsfrombegining
              &&mediatrackitemgallery[mti].endtimeinsecondsinmediatrack !== undefined
              && mediatrackitemgallery[mti].endtimeinsecondsinmediatrack > totalsecondsfrombegining
              ){
                istrackexists = true;
                mediatrackduration = mediatrackitemgallery[mti].endtimeinsecondsinmediatrack-
                mediatrackitemgallery[mti].starttimeinsecondsinmediatrack;
                if(mti%2 === 0){
                  trackstyle = istrackexistsevenstyle;
                }
                else{
                  trackstyle = istrackexistsoddstyle;
                }
            }
          }
        }
       

        trackHtml.push(
          <div
            style={{
             
             // padding: "1px",
            
            }}
            title={title}
            id={title}
          >
              <div style={{ ...itemstyle,height:"30px",   borderRight: "1px solid black",}}>
              {titledisplay}
              </div>
              <div style={trackstyle}>
             
              </div>
            
             
          </div>
        );
        totalsecondsfrombegining = totalsecondsfrombegining+60;
      } else {
        for (let secn = 0; secn < 60; secn++) {
          trackstyle = istracknotexistsevenstyle;
          let secdisplay = secn.toString().padStart(2, "0");
          if (trackviewtype === "minutes") {
            let scrollIntoViewid = hr + "hrs" + min + "mins";
            itemstyle = centiSecondStyle;

             istrackexists = false;
   
            if(mediatrackitemgallery && mediatrackitemgallery.length > 0){
               for (let mti = 0; mti < mediatrackitemgallery.length; mti++) {
                
                if(mediatrackitemgallery[mti].starttimeinsecondsinmediatrack !== undefined
                  && mediatrackitemgallery[mti].starttimeinsecondsinmediatrack <= totalsecondsfrombegining
                  &&mediatrackitemgallery[mti].endtimeinsecondsinmediatrack !== undefined
                  && mediatrackitemgallery[mti].endtimeinsecondsinmediatrack > totalsecondsfrombegining
                  ){
                    istrackexists = true;
                    mediatrackduration = mediatrackitemgallery[mti].endtimeinsecondsinmediatrack-
                    mediatrackitemgallery[mti].starttimeinsecondsinmediatrack;
                
                    if(mti%2 === 0){
                      trackstyle = istrackexistsevenstyle;
                    }
                    else{
                      trackstyle = istrackexistsoddstyle;
                    }
                }
              }
            }


            if (secn === 0) {
              itemstyle = minuteStyle;
              titledisplay =
                hrdisplay + ":" + mindisplay + ":" + secdisplay + ":00";
              if (min === 0) {
                itemstyle = hourStyle;
              }
            } else {
              titledisplay = ".";
            }

            title = hrdisplay + ":" + mindisplay + ":" + secdisplay + ":00";
            trackHtml.push(
              <div
                style={{
                
                }}
                title={title}
                id={title}
              >
              <div style={{ ...itemstyle,height:"30px",   borderRight: "1px solid black",}}>
              {titledisplay}
              </div>


              <div style={trackstyle}>
           
              </div>

              </div>
            );
            totalsecondsfrombegining = totalsecondsfrombegining+1;
          } else {
            for (
              let centisecn = 0;
              centisecn < maximumnoofcentisecondspersec;
              centisecn++
            ) {
              trackstyle = istracknotexistsevenstyle;
              let centisecndisplay = centisecn.toString().padStart(2, "0");
              itemstyle = centiSecondStyle;


               istrackexists = false;
   
              if(mediatrackitemgallery && mediatrackitemgallery.length > 0){
                 for (let mti = 0; mti < mediatrackitemgallery.length; mti++) {
                  
                  if(mediatrackitemgallery[mti].starttimeinsecondsinmediatrack !== undefined
                    && mediatrackitemgallery[mti].starttimeinsecondsinmediatrack <= (totalsecondsfrombegining)
                    &&mediatrackitemgallery[mti].endtimeinsecondsinmediatrack !== undefined
                    && mediatrackitemgallery[mti].endtimeinsecondsinmediatrack > (totalsecondsfrombegining)
                    ){
                      istrackexists = true; 
                      mediatrackduration = mediatrackitemgallery[mti].endtimeinsecondsinmediatrack-
                      mediatrackitemgallery[mti].starttimeinsecondsinmediatrack;
                  
                       if(mti%2 === 0){
                        trackstyle = istrackexistsevenstyle;
                      }
                      else{
                        trackstyle = istrackexistsoddstyle;
                      }
                  }
                }
              }


              if (centisecn === 0) {
                titledisplay =
                  hrdisplay +
                  ":" +
                  mindisplay +
                  ":" +
                  secdisplay +
                  ":" +
                  centisecndisplay;
                itemstyle = secondStyle;
                if (secn === 0) {
                  itemstyle = minuteStyle;
                  if (min === 0) {
                    itemstyle = hourStyle;
                  }
                }
              } else {
                titledisplay = ".";
              }

              title =
                hrdisplay +
                ":" +
                mindisplay +
                ":" +
                secdisplay +
                ":" +
                centisecndisplay;
              trackHtml.push(
                <div
                  style={{
                  
                  }}
                  title={title}
                  id={title}
                >
                

                  <div style={{ ...itemstyle,height:"30px",   borderRight: "1px solid black",}}>
                  {titledisplay}
                  </div>
    
    
                  <div style={trackstyle}>
           
                  </div>

                  

                </div>
              );

              totalsecondsfrombegining = totalsecondsfrombegining+0.01;
            }
          }
        }
      }

    }
  }

  mainpanelhtml.push(
    <div style={{}}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          overflow: "auto",
        }}
      >
        {trackviewtype}
        {trackviewtypeHtml}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          height: "200px",
          overflow: "auto",
        }}
      >
        {trackHtml}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          overflow: "auto",
        }}
      >
        {gotohoursHtml}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          overflow: "auto",
        }}
      >
        {gotominutesHtml}
      </div>
    </div>
  );
  return <div>{mainpanelhtml}</div>;
}

export function Videoeditor() {
  const [videoclipcurrenttime, setVideoclipcurrenttime] = useState(0);
  const [videofinalcurrenttime, setVideofinalcurrenttime] = useState(0);
  const [compstate, setCompstate] = useState({
    showui: "true",
    mediauploadgallery: [],
    selectedmediaupload: {},
    mediacutgallery: [],
    selectedmediacut: {},
    mediafinalgallery: [],
    selectedmediafinal: {},
    mediatrackgallery: [],
    selectedmediatrack: {},
    mediatrackitemgallery: [],
    selectedmediatrackitem: {},
    cutstarttimeinseconds: undefined,
    cutendtimeinseconds: undefined,
    maximumduarationoftrackinseconds:3600
  });

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async (methodprops) => {
    updatetime();
  };

  function updatetime() {
    setTimeout(() => {
      setVideoclipcurrenttime((oldstate) => {
        let myvideo1 = document.getElementById("videocliphtmlid");

        if (myvideo1 && myvideo1.currentTime && !myvideo1.ended) {
          oldstate = parseInt(myvideo1.currentTime);
        }

        return oldstate;
      });

      updatetime();
    }, 100);
  }

  let Showui = async (methodprops) => {
    //console.log(methodprops);
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));
    //console.log(methodpropsjs);
    // await setCompstate({ ...compstatejs, ...methodpropsjs, showui: "true" });
    await setCompstate({ ...compstate, ...methodprops, showui: "true" });
  };
  let Hideui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: "false" });
  };

  async function dropHandler(methodprops) {
    //console.log("File(s) dropped");
    let { files } = methodprops;
    let { mediauploadgallery } = compstate;

    //console.log(mediauploadgallery);
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        mediauploadgallery.push(files[i]);
      }
    }
    await Hideui({});
    await Showui({ mediauploadgallery: mediauploadgallery });
  }

  async function selectMediaUpload(methodprops) {
    let { name } = methodprops;

    let { mediauploadgallery, selectedmediaupload } = compstate;

    for (let i = 0; i < mediauploadgallery.length; i++) {
      if (
        mediauploadgallery[i].type === "file" &&
        mediauploadgallery[i].file.name === name
      ) {
        selectedmediaupload = mediauploadgallery[i];
      }
    }

    await Hideui({});
    await Showui({ selectedmediaupload: selectedmediaupload });
    if (selectedmediaupload.file) {
      var fr = new FileReader();
      fr.onload = function () {
        var data = fr.result;
        var array = new Int8Array(data);
        var uint8ClampedArray = new Uint8ClampedArray(data);
      };
      fr.readAsArrayBuffer(selectedmediaupload.file);

      const urlObj = URL.createObjectURL(selectedmediaupload.file);
      let videoupload = document.getElementById("videocliphtmlid");
      videoupload.src = urlObj;
    }
  }

  async function playVideo(methodprops) {
    let { htmlid, currentTimeDisplayinSeconds, ispause } = methodprops;
    let {
      mediauploadgallery,
      selectedmediaupload,
      mediatrackitemgallery,
      cutstarttimeinseconds,
      cutendtimeinseconds,
    } = compstate;
    if (selectedmediaupload.file) {
      var fr = new FileReader();
      fr.onload = function () {
        var data = fr.result;
        var array = new Int8Array(data);
        var uint8ClampedArray = new Uint8ClampedArray(data);
      };
      fr.readAsArrayBuffer(selectedmediaupload.file);

      const urlObj = URL.createObjectURL(selectedmediaupload.file);
      let videoupload = document.getElementById(htmlid);
      videoupload.src = urlObj;

      setTimeout(async () => {
        // alert(currentTimeDisplayinSeconds);
        let myvideo11 = document.getElementById(htmlid);
        myvideo11.currentTime = currentTimeDisplayinSeconds;
        if (!myvideo11.playing && ispause !== true) {
          myvideo11.play();
        }
        if (ispause === true) {
          myvideo11.pause();
        }
      }, 1000);
    }
  }

  async function handleClick(methodprops) {
    //console.log(methodprops);
    let { type, value, htmlid, timeinseconds } = methodprops;

    let {
      mediauploadgallery,
      selectedmediaupload,
      mediatrackitemgallery,
      cutstarttimeinseconds,
      currentTimeDisplayinSeconds,

      cutendtimeinseconds,
    } = compstate;
    if (type === "gototime") {
      await Hideui({});
      //setTimeout(async () => {
      await Showui({});
      //  }, 0);

      setTimeout(async () => {
        playVideo({
          htmlid: "videocliphtmlid",
          currentTimeDisplayinSeconds: timeinseconds,
        });
      }, 500);
    } else if (type === "startcutting") {
      let myvideo1 = document.getElementById(htmlid);
      let cutstarttimeinseconds = myvideo1.currentTime;
      await Hideui({});
      await Showui({
        cutstarttimeinseconds: cutstarttimeinseconds,
        currentTimeDisplayinSeconds: cutstarttimeinseconds,
      });
      // setTimeout(async () => {
      playVideo({
        htmlid: "videocliphtmlid",
        currentTimeDisplayinSeconds: cutstarttimeinseconds,
      });
      //  }, 500);
    } else if (type === "stopcutting") {
      let myvideo1 = document.getElementById(htmlid);
      let cutendtimeinseconds = myvideo1.currentTime;
      await Hideui({});
      await Showui({
        cutendtimeinseconds: cutendtimeinseconds,
        currentTimeDisplayinSeconds: cutendtimeinseconds,
      });

      playVideo({
        htmlid: "videocliphtmlid",
        currentTimeDisplayinSeconds: cutendtimeinseconds,
        ispause: true,
      });
    } else if (type === "addtoselectedtrack") {
      let mediatrackitem = {};
      for (let i = 0; i < mediauploadgallery.length; i++) {
        if (
          mediauploadgallery[i].type === "file" &&
          mediauploadgallery[i].file.name === selectedmediaupload.file.name
        ) {
          mediatrackitem.mediauploadobject = mediauploadgallery[i];
        }
      }

      mediatrackitem.cutstarttimeinsecondsinmediaupload = cutstarttimeinseconds;
      mediatrackitem.cutendtimeinsecondsinmediaupload = cutendtimeinseconds;
    //  mediatrackitemgallery.push(mediatrackitem);
  let maximumduarationoftrackinseconds = 0;
      let sectioncolumnarrayjs = JSON.parse(
        JSON.stringify(mediatrackitemgallery)
      );
      console.log(sectioncolumnarrayjs);
      sectioncolumnarrayjs = dragdropHandler2({
        changingobjectarray: sectioncolumnarrayjs,
        subobject: mediatrackitem,
        operationtype: "add",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });

 for(let i=0; i<sectioncolumnarrayjs.length; i++){
  let durationmediatrackitem = sectioncolumnarrayjs[i].cutendtimeinsecondsinmediaupload-sectioncolumnarrayjs[i].cutstarttimeinsecondsinmediaupload;
  if(i == 0){
    sectioncolumnarrayjs[i].starttimeinsecondsinmediatrack = 0;
    sectioncolumnarrayjs[i].endtimeinsecondsinmediatrack = durationmediatrackitem;
  }
if(sectioncolumnarrayjs[i-1] && 
  sectioncolumnarrayjs[i]&&
  sectioncolumnarrayjs[i-1].endtimeinsecondsinmediatrack 
   ){
    sectioncolumnarrayjs[i].starttimeinsecondsinmediatrack = sectioncolumnarrayjs[i-1].endtimeinsecondsinmediatrack;
    sectioncolumnarrayjs[i].endtimeinsecondsinmediatrack = sectioncolumnarrayjs[i].starttimeinsecondsinmediatrack+durationmediatrackitem;
  }
  maximumduarationoftrackinseconds =  sectioncolumnarrayjs[i].endtimeinsecondsinmediatrack;
 }


      await Hideui({});
      await Showui({
        mediatrackitemgallery: sectioncolumnarrayjs,
        cutstarttimeinseconds: undefined,
        cutendtimeinseconds: undefined,
        maximumduarationoftrackinseconds:maximumduarationoftrackinseconds
      });

      playVideo({
        htmlid: "videocliphtmlid",
        currentTimeDisplayinSeconds: videoclipcurrenttime,
        ispause: true,
      });
    } else if (type === "clearcurrentcutting") {
      await Hideui({});
      await Showui({
        cutstarttimeinseconds: undefined,
        cutendtimeinseconds: undefined,
        currentTimeDisplayinSeconds: videoclipcurrenttime,
      });

      playVideo({
        htmlid: "videocliphtmlid",
        currentTimeDisplayinSeconds: videoclipcurrenttime,
        ispause: true,
      });
    } else if (type === "clearallcuttingsinthisvideo") {
      let updatedmediatrackitemgallery = [];
      for (let i = 0; i < mediatrackitemgallery.length; i++) {
        if (
          mediatrackitemgallery[i].mediauploadobject.file.name !==
          selectedmediaupload.file.name
        ) {
          updatedmediatrackitemgallery.push(mediatrackitemgallery[i]);
        }
      }

      await Hideui({});
      await Showui({
        mediatrackitemgallery: updatedmediatrackitemgallery,
        cutstarttimeinseconds: undefined,
        cutendtimeinseconds: undefined,
      });

      playVideo({
        htmlid: "videocliphtmlid",
        currentTimeDisplayinSeconds: videoclipcurrenttime,
        ispause: true,
      });
    }
  }
  async function childhandleClick(methodprops) {}
  let {
    mediauploadgallery,

    cutstarttimeinseconds,
    cutendtimeinseconds,
  } = compstate;
  let mediauploadedFileshtml = [];
  for (let i = 0; i < mediauploadgallery.length; i++) {
    mediauploadedFileshtml.push(
      <div
        onClick={() =>
          selectMediaUpload({ name: mediauploadgallery[i].file.name })
        }
      >
        {mediauploadgallery[i].file.name}
      </div>
    );
  }
  console.log(compstate);

  if (compstate.showui != "true") {
    return <></>;
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: 1200,
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: 200, height: "400px", padding: "5px" }}>
          <Mediauploadhtml dropHandler={dropHandler} />
          {mediauploadedFileshtml}
        </div>
        <div
          style={{
            width: 470,
            height: "400px",
            padding: "5px",
            overflow: "auto",
          }}
        >
          <video
            id="videocliphtmlid"
            controls="true"
            width="100%"
            height="270"
            crossorigin="anonymous"
          ></video>

          <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            <Videoimageprogressbarhtml
              totalwidth={400}
              mediatotaldurationinseconds={100}
              currentTimeDisplayinSeconds={videoclipcurrenttime}
              cutstarttimeinseconds={cutstarttimeinseconds}
              cutendtimeinseconds={cutendtimeinseconds}
              videohtmlid={"videocliphtmlid"}
              gototimelocal={() => gototimelocal({ htmlid: "videocliphtmlid" })}
              handleClick={handleClick}
            />
          </div>
        </div>
        <div style={{ width: 470, height: "400px", padding: "5px" }}>
          <video
            id="videofinalhtmlid"
            controls="true"
            width="100%"
            height="270"
            crossorigin="anonymous"
          ></video>
        </div>
        <div style={{ width: "800px", height: "300px", overflow:"auto" }}>
          <Mediatrackhtml
            compstate={compstate}
           
            parenthandleClick={childhandleClick}
          />
        </div>
      </div>
    );
  }
}
