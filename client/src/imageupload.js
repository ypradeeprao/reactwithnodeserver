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
  dragdropHandler2,
} from "./logic";

var video2;
var mycanvasmediaRecorder2;
var mycanvasrecordedChunks2;
var video;
var mycanvasmediaRecorder;
var mycanvasrecordedChunks;
var width, height;
let initframedata = {};
let modifiedframedata = {};
var myTimeout;

function mycanvasrecorderhandleDataAvailable(event) {
  console.log(event.data);
  mycanvasrecordedChunks.push(event.data);
}

function mycanvasrecorderonstop(methodprops) {
  let { htmlid } = methodprops;
  console.log(mycanvasrecordedChunks);
  var mycanvasblob = new Blob(mycanvasrecordedChunks, {
    type: "video/mp4",
  });
  var mycanvasurl = URL.createObjectURL(mycanvasblob);
  var myvideo3 = document.getElementById(htmlid);
  myvideo3.src = mycanvasurl;
}

function mycanvasrecorderhandleDataAvailable2(event) {
  console.log(event.data);
  mycanvasrecordedChunks2.push(event.data);
}

function mycanvasrecorderonstop2(methodprops) {
  let { htmlid } = methodprops;
  console.log(mycanvasrecordedChunks2);
  var mycanvasblob2 = new Blob(mycanvasrecordedChunks2, {
    type: "video/mp4",
  });
  var mycanvasurl2 = URL.createObjectURL(mycanvasblob2);
  var myvideo32 = document.getElementById(htmlid);
  myvideo32.src = mycanvasurl2;
}

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
        //   //console.log(oldstate);
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
            ////console.log(selectedmediasection);
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
    ////console.log(methodprops);
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
    ////console.log(gototimeinsecondsjs);
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
          ////console.log(compstate.mediasectiongallery[i]);
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

  ////console.log(count);

  let mainpanelhtml = [];
  let mainvideogalleryhtml = [];
  let currentTimeDisplayinSeconds = 0;

  if (
    compstate.selectedmediasection.mediastarttimeinsecondsinparent !== undefined
  ) {
    ////console.log(compstate.selectedmediasection.mediastarttimeinsecondsinparent);
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
  ////console.log(parseInt(blockwidth));
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
  ////console.log(methodprops);
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
    //console.log(document.getElementById(videohtmlid).paused);
    //console.log(document.getElementById(videohtmlid).ended);
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
          onClick={() => {
            mycanvasmediaRecorder.stop();
          }}
        >
          stop recorder
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
          onClick={() =>
            handleClick({ type: "addtoselectedtrack", trackorder: 0 })
          }
        >
          Add to First Track
        </div>
        <div
          style={{ padding: "5px" }}
          onClick={() => handleClick({ type: "addanothertrack" })}
        >
          Add Another Track
        </div>
      </div>
    </div>
  );
};

async function drawVideoonCanvas(methodprops) {
  let { videohtmlid, initcanvashtmlid, finalcanvashtmlid } = methodprops;
  var isgreyoutpixels = document.getElementById("isgreyoutpixels").checked;
  var isdefaultpixels = document.getElementById("isdefaultpixels").checked;
  var istransparentpixels = document.getElementById(
    "istransparentpixels"
  ).checked;
  var iswatermarkimage = document.getElementById("iswatermarkimage").checked;
  var iswatermarktext = document.getElementById("iswatermarktext").checked;

  let drawvideo = document.getElementById(videohtmlid);
  let drawwidth = drawvideo.width;
  let drawheight = drawvideo.height;

  let c3 = document.getElementById(initcanvashtmlid);
  let ctx3 = c3.getContext("2d");
  ctx3.drawImage(drawvideo, 0, 0, drawwidth, drawheight);
  //console.log(drawwidth);
  //console.log(drawheight);

  let c4 = document.getElementById(finalcanvashtmlid);
  let ctx4 = c4.getContext("2d");
  let initframe2 = ctx4.getImageData(0, 0, drawwidth, drawheight);
  ////console.log(initframe2);

  let initframe = ctx3.getImageData(0, 0, drawwidth, drawheight);
  //  //console.log(initframe);
  const l = initframe.data.length / 4;
  // //console.log(drawwidth);300
  //  //console.log(drawheight);270
  // //console.log(l);81000
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
      // //console.log(i);
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
    if (columnnumber === drawwidth) {
      columnnumber = 0;
      rownumber = rownumber + 1;
    }
  }

  ctx3.putImageData(initframe, 0, 0);
  if (iswatermarktext == true) {
    ctx3.fillText("Testtest", drawwidth - 50, drawheight - 20);
  }

  if (iswatermarkimage == true) {
    // ctx3.putImageData(img.src, 0, 0);
  }
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
    mycanvasmediaRecorder.onstop = (evt) =>
      mycanvasrecorderonstop({ htmlid: "myvideo3" });
  };

  async function uploadvideo(methodprops) {
    let {
      medianame,
      mediasectionname,
      starttimeinseconds,
      endtimeinseconds,
      totaldurationinseconds,
    } = methodprops;
    ////console.log(mycanvasrecordedChunks);
    var mycanvasblob = new Blob(mycanvasrecordedChunks, {
      type: "video/mp4",
    });
    var mycanvasurl = URL.createObjectURL(mycanvasblob);
    ////console.log(video.currentTime);
    let filenamenodejs =
      medianame +
      "foldername" +
      starttimeinseconds +
      "to" +
      endtimeinseconds +
      ".mp4";
    let filename = starttimeinseconds + "to" + endtimeinseconds + ".mp4";

    ////console.log(filenamenodejs);
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
        ////console.log(response);

        currentVideouploadingStatus = "isuploadingsuccess";
        ////console.log(currentVideouploadingStatus);

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
        ////console.log(`failed: ${error.message}`);

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
    ////console.log(roundedpercent);
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
    ////console.log(targetfile);

    var fr = new FileReader();
    fr.onload = function () {
      var data = fr.result;
      var array = new Int8Array(data);
      var uint8ClampedArray = new Uint8ClampedArray(data);
      ////console.log(data);
      ////console.log(array);
      ////console.log(uint8ClampedArray);
      // output.value = JSON.stringify(array, null, '  ');
      // window.setTimeout(ReadFile, 1000);
    };
    fr.readAsArrayBuffer(targetfile);

    const urlObj = URL.createObjectURL(targetfile);
    ////console.log(urlObj);
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
    ////console.log(createmediaresp);

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
    ////console.log(createmediauploadresp);

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
    ////console.log(methodprops);

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
    ////console.log(updatemediaresp);

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
    ////console.log(updatemediasectionresp);
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
    ////console.log(methodprops);
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
      ////console.log(currentVideouploadingStatus);
      ////console.log(parseInt(video.duration));
      ////console.log(parseInt(video.currentTime));
      if (parseInt(video.duration) < starttimeinseconds) {
        currentVideouploadingStatus = "finisheduploading";
        return;
      }
    } else if (currentVideouploadingStatus === "initial") {
      mycanvasrecordedChunks = [];
      mycanvasmediaRecorder.start();
      video.play();
      currentVideouploadingStatus = "playing";
      ////console.log(currentVideouploadingStatus);
    } else if (currentVideouploadingStatus === "playing") {
      console.log(mycanvasmediaRecorder.status);
      console.log(mycanvasrecordedChunks);
      drawVideoonCanvas({
        videohtmlid: "myvideo1",
        initcanvashtmlid: "mycanvas",
        finalcanvashtmlid: "mycanvas2",
      });
      if (parseInt(video.currentTime) === endtimeinseconds) {
        video.pause();
        mycanvasmediaRecorder.stop();
        currentVideouploadingStatus = "paused";
      }

      if (video.ended) {
        currentVideouploadingStatus = "ended";
      }
      ////console.log(currentVideouploadingStatus);
    } else if (currentVideouploadingStatus === "paused") {
      if (parseInt(video.currentTime) === endtimeinseconds) {
        currentVideouploadingStatus = "startuploading";
      }
      ////console.log(currentVideouploadingStatus);
    } else if (video.ended && currentVideouploadingStatus === "playing") {
      if (mycanvasmediaRecorder.state !== "inactive") {
        mycanvasmediaRecorder.stop();
      }
      currentVideouploadingStatus = "startuploading";
      endtimeinseconds = parseInt(video.currentTime);
      totaldurationinseconds = parseInt(video.currentTime) - starttimeinseconds;
      ////console.log(currentVideouploadingStatus);
    } else if (currentVideouploadingStatus === "ended") {
      if (mycanvasmediaRecorder.state !== "inactive") {
        mycanvasmediaRecorder.stop();
      }
      currentVideouploadingStatus = "startuploading";
      endtimeinseconds = parseInt(video.currentTime);
      totaldurationinseconds = parseInt(video.currentTime) - starttimeinseconds;

      ////console.log(currentVideouploadingStatus);
    } else if (currentVideouploadingStatus === "startuploading") {
      // await uploadvideo({
      //   medianame: medianame,
      //   mediasectionname: mediasectionname,
      //   starttimeinseconds: starttimeinseconds,
      //   endtimeinseconds: endtimeinseconds,
      //   totaldurationinseconds: totaldurationinseconds,
      // });
      ////console.log(currentVideouploadingStatus);
      return;
    } else if (
      currentVideouploadingStatus === "isuploadingfailed" ||
      currentVideouploadingStatus === "finisheduploading"
    ) {
      ////console.log(currentVideouploadingStatus);
      return;
    } else if (currentVideouploadingStatus === "isuploadingsuccess") {
      ////console.log(currentVideouploadingStatus);
      return;
      // if (video.ended) {
      //   currentVideouploadingStatus = "finisheduploading";
      //   currentrecordingendtime = 0;
      // } else {
      //   currentVideouploadingStatus = "initial";
      //   currentrecordingendtime = currentrecordingendtime + 10;
      // }
    } else {
      ////console.log(currentVideouploadingStatus);
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

  function greoutSimilarPixels(event) {
    const canvas = document.querySelector("canvas");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    //////console.log("x: " + x + " y: " + y);
    let myctx = canvas.getContext("2d");

    const clickedpointframedata = myctx.getImageData(x, y, 1, 1);
    ////console.log(clickedpointframedata);

    const frame = myctx.getImageData(0, 0, width, height);
    if (initframedata && Object.keys(initframedata).length > 0) {
    } else {
      initframedata = frame;
    }

    modifiedframedata = myctx.getImageData(0, 0, width, height);
    ////console.log(frame);
    ////console.log(JSON.parse(JSON.stringify(frame)));
    ////console.log(width);
    ////console.log(height);
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

  function drawImageonCanvas(event) {
    let c3 = document.getElementById("mycanvas2");

    let ctx3 = c3.getContext("2d");
    let img = new Image(); //.src
    img.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";

    img.onload = function () {
      ctx3.drawImage(img, width - 100, height - 100, 100, 100);
      let initframe = ctx3.getImageData(0, 0, width, height);
      ////console.log(initframe);
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
    //       //console.log(compstate.mediasectiongallery[i]);
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
  console.log(mycanvasrecordedChunks);
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
    ////console.log("File(s) dropped");
    let files = [];
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          ////console.log(`… file[${i}].name = ${file.name}`);
          ////console.log(file);
          files.push({ type: "file", file: file });
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        ////console.log(`… file[${i}].name = ${file.name}`);
        ////console.log(file);
        files.push({ type: "file", file: file });
      });
    }

    dropHandler({ files: files });
  }

  function dragOverHandler(ev) {
    ////console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  async function handleChangefile(event) {
    let files = [];
    let targetfile = event.target.files[0];
    ////console.log(targetfile);
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
  //       //console.log(compstate.mediasectiongallery[i]);
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

function Mediatrackitemhtml(props) {
  let {
    listmediatrack,
    alltrackscurrentplayingtimeinseconds,
    trackviewtype,
    centisecn,
    secn,
    min,
    hr,
    parenthandleClick,
  } = props;

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
  let hrdisplay = hr.toString().padStart(2, "0");
  let mindisplay = min.toString().padStart(2, "0");
  let secdisplay = secn.toString().padStart(2, "0");
  let centisecndisplay = centisecn.toString().padStart(2, "0");
  let title = "";
  let titledisplay = ".";

  let itemstyle = {};
  itemstyle = centiSecondStyle;
  if (trackviewtype === "hours") {
    if (min === 0) {
      itemstyle = hourStyle;
      titledisplay = hrdisplay + ":" + mindisplay + ":00:00";
    } else {
      titledisplay = ".";
    }

    title = hrdisplay + ":" + mindisplay + ":00:00";
  } else if (trackviewtype === "minutes") {
    if (secn === 0) {
      itemstyle = minuteStyle;
      titledisplay = hrdisplay + ":" + mindisplay + ":" + secdisplay + ":00";
      if (min === 0) {
        itemstyle = hourStyle;
      }
    } else {
      titledisplay = ".";
    }

    title = hrdisplay + ":" + mindisplay + ":" + secdisplay + ":00";
  } else {
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
      hrdisplay + ":" + mindisplay + ":" + secdisplay + ":" + centisecndisplay;
  }

  let istrackitemnotexiststyle = {
    height: "50px",
    backgroundColor: "yellow",
    marginTop: "20px",
    marginBottom: "20px",
  };
  let istrackitemexistsevenstyle = {
    height: "50px",
    backgroundColor: "lightblue",
    marginTop: "20px",
    marginBottom: "20px",
  };
  let istrackitemexistsoddstyle = {
    height: "50px",
    backgroundColor: "green",
    marginTop: "20px",
    marginBottom: "20px",
  };

  let mediatrackduration = 0;
  let mainpanelhtml = [];
  let trackitemHtml = [];

  if (listmediatrack && listmediatrack.length > 0) {
    for (let mt = 0; mt < listmediatrack.length; mt++) {
      let trackitems = listmediatrack[mt].items;
      let trackstyle = {};
      trackstyle = istrackitemnotexiststyle;
      let trackitemshtml = [];
      let trackitemstyle = {};
      let existingmediatrackorder = undefined;
      let existingmediatrackitemorder = undefined;
      trackitemstyle = istrackitemnotexiststyle;
      if (trackitems && trackitems.length > 0) {
        for (let mti = 0; mti < trackitems.length; mti++) {
          if (
            trackitems[mti].starttimeinsecondsinmediatrack !== undefined &&
            trackitems[mti].starttimeinsecondsinmediatrack <=
              alltrackscurrentplayingtimeinseconds &&
            trackitems[mti].endtimeinsecondsinmediatrack !== undefined &&
            trackitems[mti].endtimeinsecondsinmediatrack >
              alltrackscurrentplayingtimeinseconds
          ) {
            mediatrackduration =
              trackitems[mti].endtimeinsecondsinmediatrack -
              trackitems[mti].starttimeinsecondsinmediatrack;
            existingmediatrackorder = listmediatrack[mt].order;
            existingmediatrackitemorder = trackitems[mti].order;
            if (mti % 2 === 0) {
              trackitemstyle = istrackitemexistsevenstyle;
            } else {
              trackitemstyle = istrackitemexistsoddstyle;
            }
          }
        }
      }

      trackitemHtml.push(
        <div
          style={trackitemstyle}
          onClick={() => {
            parenthandleClick({
              type: "selecttrackitem",
              trackorder: existingmediatrackorder,
              trackitemorder: existingmediatrackitemorder,
              alltrackscurrentplayingtimeinseconds:
                alltrackscurrentplayingtimeinseconds,
            });
          }}
        ></div>
      );
    }
  }

  mainpanelhtml.push(
    <div
      style={
        {
          // padding: "1px",
        }
      }
      title={title}
      id={title}
    >
      <div
        style={{
          ...itemstyle,
          height: "30px",
          borderRight: "1px solid black",
        }}
        onClick={() => {
          parenthandleClick({
            type: "selecttrackattime",
            alltrackscurrentplayingtimeinseconds:
              alltrackscurrentplayingtimeinseconds,
          });
        }}
      >
        {titledisplay}
      </div>
      {trackitemHtml}
    </div>
  );

  return <>{mainpanelhtml}</>;
}

function Mediatrackhtml(props) {
  const [compstate, setCompstate] = useState({
    showui: "true",

    maximumnoofcentisecondspersec: 100,
  });

  let Showui = async (methodprops) => {
    ////console.log(methodprops);
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));
    ////console.log(methodpropsjs);
    // await setCompstate({ ...compstatejs, ...methodpropsjs, showui: "true" });
    await setCompstate({ ...compstate, ...methodprops, showui: "true" });
  };
  let Hideui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodprops, showui: "false" });
  };

  let handleClick = async (methodprops) => {
    let { parenthandleClick } = props;
    parenthandleClick(methodprops);
  };
  let childhandleClick = async (methodprops) => {
    let { parenthandleClick } = props;
    let { type, value } = methodprops;

    parenthandleClick(methodprops);
  };
  //console.log(props);
  let mainpanelhtml = [];

  let itemstyle = {};

  let maximumduarationoftrackinseconds = 100;
  let maxiumumduarationoftrackinhours = 1;

  maximumduarationoftrackinseconds =
    props.compstate.maximumduarationoftrackinseconds;
  maxiumumduarationoftrackinhours =
    parseInt(maximumduarationoftrackinseconds / (60 * 60)) + 1;
  let {
    listmediatrack,
    trackviewtype,
    fromHours,
    toHours,
    fromMinutes,
    toMinutes,
  } = props.compstate;
  let { maximumnoofcentisecondspersec } = compstate;
  let gotohoursHtml = [];
  let gotominutesHtml = [];
  let gotosecondsHtml = [];

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
        {min}
      </div>
    );
  }
  for (let secn = 0; secn < 60; secn++) {
    gotosecondsHtml.push(
      <div
        style={{ padding: "10px" }}
        onClick={() =>
          handleClick({
            type: "gotoseconds",
            value: secn,
          })
        }
      >
        {secn}
      </div>
    );
  }

  let alltrackscurrentplayingtimeinseconds = 0;
  let trackHtml = [];

  let trackbuttonsitemHtml = [];

  if (listmediatrack && listmediatrack.length > 0) {
    for (let mt = 0; mt < listmediatrack.length; mt++) {
      trackbuttonsitemHtml.push(
        <div
          style={{
            height: "50px",
            backgroundColor: "yellow",
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{ paddingLeft: "2px", paddingRight: "2px" }}
            onClick={() =>
              handleClick({
                type: "addtoselectedtrack",
                trackorder: listmediatrack[mt].order,
              })
            }
          >
            <i class="fa fa-plus"></i>
          </div>

          <div
            style={{ paddingLeft: "2px", paddingRight: "2px" }}
            onClick={() =>
              handleClick({
                type: "playselectedtrack",
                trackorder: listmediatrack[mt].order,
              })
            }
          >
            <i class="fa fa-play"></i>
          </div>

          <div
            style={{ paddingLeft: "2px", paddingRight: "2px" }}
            onClick={() =>
              handleClick({
                type: "removetrack",
                order: listmediatrack[mt].order,
              })
            }
          >
            <i class="fa fa-remove"></i>
          </div>

          <div
            style={{ paddingLeft: "2px", paddingRight: "2px" }}
            onClick={() =>
              handleClick({
                type: "removeselectedtrackitem",
                order: listmediatrack[mt].order,
              })
            }
          >
            <i class="fa fa-trash"></i>
          </div>
        </div>
      );
    }
  }

  let trackbuttonsHtml = [];
  trackbuttonsHtml.push(
    <>
      <div>
        <div
          style={{
            height: "30px",
          }}
        ></div>
        {trackbuttonsitemHtml}
      </div>
    </>
  );

  for (let hr = fromHours; hr < toHours; hr++) {
    for (let min = fromMinutes; min < toMinutes; min++) {
      if (trackviewtype === "hours") {
        trackHtml.push(
          <>
            <Mediatrackitemhtml
              listmediatrack={listmediatrack}
              alltrackscurrentplayingtimeinseconds={
                alltrackscurrentplayingtimeinseconds
              }
              trackviewtype={trackviewtype}
              hr={hr}
              min={min}
              secn={0}
              centisecn={0}
              parenthandleClick={childhandleClick}
            />
          </>
        );

        alltrackscurrentplayingtimeinseconds =
          alltrackscurrentplayingtimeinseconds + 60;
      } else {
        for (let secn = 0; secn < 60; secn++) {
          if (trackviewtype === "minutes") {
            trackHtml.push(
              <>
                <Mediatrackitemhtml
                  listmediatrack={listmediatrack}
                  alltrackscurrentplayingtimeinseconds={
                    alltrackscurrentplayingtimeinseconds
                  }
                  trackviewtype={trackviewtype}
                  hr={hr}
                  min={min}
                  secn={secn}
                  centisecn={0}
                  parenthandleClick={childhandleClick}
                />
              </>
            );

            alltrackscurrentplayingtimeinseconds =
              alltrackscurrentplayingtimeinseconds + 1;
          } else {
            for (
              let centisecn = 0;
              centisecn < maximumnoofcentisecondspersec;
              centisecn++
            ) {
              trackHtml.push(
                <>
                  <Mediatrackitemhtml
                    listmediatrack={listmediatrack}
                    alltrackscurrentplayingtimeinseconds={
                      alltrackscurrentplayingtimeinseconds
                    }
                    trackviewtype={trackviewtype}
                    hr={hr}
                    min={min}
                    secn={secn}
                    centisecn={centisecn}
                    parenthandleClick={childhandleClick}
                  />
                </>
              );

              alltrackscurrentplayingtimeinseconds =
                alltrackscurrentplayingtimeinseconds + 0.01;
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
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            width: "10%",
            height: "400px",
            overflow: "auto",
          }}
        >
          {trackbuttonsHtml}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            width: "90%",
            height: "400px",
            overflow: "auto",
          }}
        >
          {trackHtml}
        </div>
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
        Minutes
        {gotominutesHtml}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          overflow: "auto",
        }}
      >
        Seconds
        {gotosecondsHtml}
      </div>
    </div>
  );
  return <div>{mainpanelhtml}</div>;
}

export function Videoeditor() {
  const [videoclipcurrenttime, setVideoclipcurrenttime] = useState(0);
  const [playingmediatrackitem, setPlayingmediatrackitem] = useState({});
  const [playingmediatrack, setPlayingmediatrack] = useState({
    mediatrack: {},
    mediatrackitem: {},
  });
  const [compstate, setCompstate] = useState({
    showui: "true",
    mediauploadgallery: [],
    selectedmediaupload: {},
    mediacutgallery: [],
    selectedmediacut: {},
    mediafinalgallery: [],
    selectedmediafinal: {},

    listmediatrack: [{ order: 0, items: [] }],

    selectedmediatrack: {},
    cutstarttimeinseconds: undefined,
    cutendtimeinseconds: undefined,
    maximumduarationoftrackinseconds: 3600,
    trackviewtype: "hours",
    fromHours: 0,
    toHours: 1,
    fromMinutes: 0,
    toMinutes: 60,
  });

  useEffect(() => {
    doInit();
  }, []);

  let doInit = async () => {
    video2 = document.getElementById("myvideo1");
    // width = video.width;
    //  height = video.height;

    var mycanvas2 = document.getElementById("mycanvas12");
    const mycanvasstream2 = mycanvas2.captureStream();
    mycanvasrecordedChunks2 = [];
    var options2 = {};
    mycanvasmediaRecorder2 = new MediaRecorder(mycanvasstream2, options2);
    mycanvasmediaRecorder2.ondataavailable =
      mycanvasrecorderhandleDataAvailable2;
    mycanvasmediaRecorder2.onstop = (evt) =>
      mycanvasrecorderonstop2({ htmlid: "videofinalhtmlid" });
  };

  let fetchData = async (methodprops) => {
    var mycanvas = document.getElementById("mycanvas12");
    const mycanvasstream = mycanvas.captureStream();
    mycanvasrecordedChunks = [];
    var options = {};
    mycanvasmediaRecorder = new MediaRecorder(mycanvasstream, options);
    mycanvasmediaRecorder.ondataavailable = mycanvasrecorderhandleDataAvailable;
    mycanvasmediaRecorder.onstop = (evt) =>
      mycanvasrecorderonstop({ htmlid: "videofinalhtmlid" });

    // updatetime();
  };

  async function updatetime2() {
    console.log(mycanvasrecordedChunks);
    console.log(mycanvasmediaRecorder.status);
    try {
      mycanvasmediaRecorder.start();
    } catch (e) {}
    drawVideoonCanvas({
      videohtmlid: "videocliphtmlid",
      initcanvashtmlid: "mycanvas12",
      finalcanvashtmlid: "mycanvas123",
    });

    setTimeout(() => {
      updatetime2();
    }, 100);
  }

  async function startautouploadvideo() {
    autouploadvideo({ htmlid: "videocliphtmlid" });
  }

  async function autouploadvideo(methodprops) {
    console.log(currentVideouploadingStatus2);
    let {
      medianame,
      mediasectionname,
      starttimeinseconds,
      endtimeinseconds,
      totaldurationinseconds,
      htmlid,
    } = methodprops;

    let videocurrenttimeinseconds = 0;

    let videoupload = document.getElementById(htmlid);
    if (currentVideouploadingStatus2 === "initial") {
      mycanvasrecordedChunks2 = [];
      mycanvasmediaRecorder2.start();

      videoupload.play();
      currentVideouploadingStatus2 = "playing";
      ////console.log(currentVideouploadingStatus);
      console.log(mycanvasmediaRecorder2.status);
    } else if (currentVideouploadingStatus2 === "playing") {
      console.log(mycanvasmediaRecorder2.status);
      drawVideoonCanvas({
        videohtmlid: htmlid,
        initcanvashtmlid: "mycanvas12",
        finalcanvashtmlid: "mycanvas123",
      });
      ////console.log(currentVideouploadingStatus);

      if (videoupload.ended) {
        currentVideouploadingStatus2 = "ended";
      }
    } else if (currentVideouploadingStatus2 === "paused") {
    } else if (
      videoupload.ended &&
      currentVideouploadingStatus2 === "playing"
    ) {
      if (mycanvasmediaRecorder2.state !== "inactive") {
        mycanvasmediaRecorder2.stop();
      }
      currentVideouploadingStatus2 = "startuploading";
      //endtimeinseconds = parseInt(video.currentTime);
      //totaldurationinseconds = parseInt(video.currentTime) - starttimeinseconds;
      ////console.log(currentVideouploadingStatus);
    } else if (currentVideouploadingStatus2 === "ended") {
      if (mycanvasmediaRecorder2.state !== "inactive") {
        mycanvasmediaRecorder2.stop();
      }
      currentVideouploadingStatus2 = "startuploading";

      ////console.log(currentVideouploadingStatus);
    } else if (currentVideouploadingStatus2 === "startuploading") {
      return;
    } else if (
      currentVideouploadingStatus2 === "isuploadingfailed" ||
      currentVideouploadingStatus2 === "finisheduploading"
    ) {
      ////console.log(currentVideouploadingStatus);
      return;
    } else if (currentVideouploadingStatus2 === "isuploadingsuccess") {
      ////console.log(currentVideouploadingStatus);
      return;
      // if (video.ended) {
      //   currentVideouploadingStatus = "finisheduploading";
      //   currentrecordingendtime = 0;
      // } else {
      //   currentVideouploadingStatus = "initial";
      //   currentrecordingendtime = currentrecordingendtime + 10;
      // }
    } else {
      ////console.log(currentVideouploadingStatus);
    }

    setTimeout(() => {
      autouploadvideo({
        htmlid: htmlid,
      });
    }, 16);
  }

  async function playtrackitem(methodprops) {
    let {
      medianame,
      mediasectionname,
      starttimeinseconds,
      endtimeinseconds,
      totaldurationinseconds,
      // htmlid,
      listmediatrack,
      //  selectedmediatrack,

      // playtrackstatus,
      alltrackscurrentplayingtimeinseconds,
    } = methodprops;
    console.log(methodprops);
    let videocurrenttimeinseconds = 0;

    //
    for (let i = 0; i < listmediatrack.length; i++) {
      let selectedmediatrack = listmediatrack[i];
      console.log(selectedmediatrack.playtrackstatus);
      if (
        selectedmediatrack &&
        Object.keys(selectedmediatrack).length > 0 &&
        selectedmediatrack.items &&
        Object.keys(selectedmediatrack.items).length > 0
      ) {
        let playtrackstatus = selectedmediatrack.playtrackstatus;

        if (playtrackstatus === "initial") {
          console.log(methodprops);
          playtrackstatus = "createvideoelements";
        } else if (playtrackstatus === "createvideoelements") {
          const divfinalvideohtmlidvideo = document.createElement("video");
          divfinalvideohtmlidvideo.controls = true;
          divfinalvideohtmlidvideo.muted = false;
          divfinalvideohtmlidvideo.height = 240; // in px
          divfinalvideohtmlidvideo.width = 320; // in px
          divfinalvideohtmlidvideo.id =
            "divfinalvideohtmlid" + selectedmediatrack.order;
          document
            .getElementById("divfinalvideohtmlid")
            .appendChild(divfinalvideohtmlidvideo);

          playtrackstatus = "addsourcetovideos";
        } else if (playtrackstatus === "addsourcetovideos") {
          let currenttimemediatrackitem = {};

          //currenttimemediatrackitem if previousplayingitem
          for (let j = 0; j < selectedmediatrack.items.length; j++) {
            if (
              selectedmediatrack.previousplayingitem &&
              Object.keys(selectedmediatrack.previousplayingitem).length > 0
            ) {
              if (
                selectedmediatrack.previousplayingitem.order + 1 ==
                selectedmediatrack.items[j].order
              ) {
                currenttimemediatrackitem = selectedmediatrack.items[j];
              }
            }
          }

          //currenttimemediatrackitem if not previousplayingitem
          if (
            currenttimemediatrackitem &&
            Object.keys(currenttimemediatrackitem).length > 0
          ) {
          } else {
            for (let j = 0; j < selectedmediatrack.items.length; j++) {
              if (
                selectedmediatrack.items[j].starttimeinsecondsinmediatrack <=
                  alltrackscurrentplayingtimeinseconds &&
                selectedmediatrack.items[j].endtimeinsecondsinmediatrack >
                  alltrackscurrentplayingtimeinseconds
              ) {
                currenttimemediatrackitem = selectedmediatrack.items[j];
              }
            }
          }

          //if currenttimemediatrackitem
          if (
            currenttimemediatrackitem &&
            Object.keys(currenttimemediatrackitem).length > 0
          ) {
            let urlObj2 = URL.createObjectURL(
              currenttimemediatrackitem.mediauploadobject.file
            );
            document.getElementById(
              "divfinalvideohtmlid" + selectedmediatrack.order
            ).src = urlObj2;
            selectedmediatrack.playingitem = currenttimemediatrackitem;
            playtrackstatus = "setvideoplayingtime";
          } else {
            selectedmediatrack.playingitem = {};
            //   selectedmediatrack.previousplayingitem = {};
            playtrackstatus = "trackended";
          }
        } else if (playtrackstatus === "setvideoplayingtime") {
          let issetvideoplayingtime = true;

          for (let j = 0; j < selectedmediatrack.items.length; j++) {
            if (
              selectedmediatrack.items[j].starttimeinsecondsinmediatrack <=
                alltrackscurrentplayingtimeinseconds &&
              selectedmediatrack.items[j].endtimeinsecondsinmediatrack >
                alltrackscurrentplayingtimeinseconds &&
              document.getElementById(
                "divfinalvideohtmlid" + selectedmediatrack.order
              )
            ) {
              let differencesecondsinmediatrack =
                alltrackscurrentplayingtimeinseconds -
                selectedmediatrack.items[j].starttimeinsecondsinmediatrack;
              let currenttimeinmediaupload =
                selectedmediatrack.items[j].cutstarttimeinsecondsinmediaupload +
                differencesecondsinmediatrack;

              let currenttimeinmediauploadinteger = parseInt(
                currenttimeinmediaupload * 10000000000
              );

              let listmediatrackcurrenttimeinteger = document.getElementById(
                "divfinalvideohtmlid" + selectedmediatrack.order
              ).currentTime;
              listmediatrackcurrenttimeinteger = parseInt(
                listmediatrackcurrenttimeinteger * 10000000000
              );

              console.log(listmediatrackcurrenttimeinteger);

              console.log(currenttimeinmediauploadinteger);
              if (
                listmediatrackcurrenttimeinteger !==
                currenttimeinmediauploadinteger
              ) {
                issetvideoplayingtime = false;
              }
            }
          }

          if (issetvideoplayingtime == false) {
            for (let j = 0; j < selectedmediatrack.items.length; j++) {
              if (
                selectedmediatrack.items[j].starttimeinsecondsinmediatrack <=
                  alltrackscurrentplayingtimeinseconds &&
                selectedmediatrack.items[j].endtimeinsecondsinmediatrack >
                  alltrackscurrentplayingtimeinseconds
              ) {
                let differencesecondsinmediatrack =
                  alltrackscurrentplayingtimeinseconds -
                  selectedmediatrack.items[j].starttimeinsecondsinmediatrack;
                let currenttimeinmediaupload =
                  selectedmediatrack.items[j]
                    .cutstarttimeinsecondsinmediaupload +
                  differencesecondsinmediatrack;
                console.log(currenttimeinmediaupload);
                document.getElementById(
                  "divfinalvideohtmlid" + selectedmediatrack.order
                ).currentTime = currenttimeinmediaupload;
              }
            }
          } else {
            playtrackstatus = "startplaying";
          }
        } else if (playtrackstatus === "startplaying") {
          console.log(
            document.getElementById(
              "divfinalvideohtmlid" + listmediatrack[i].order
            ).currentTime
          );
          // debugger;

          playtrackstatus = "playing";
        } else if (playtrackstatus === "playing") {
          let playingitem = selectedmediatrack.playingitem;

          if (playingitem) {
            let listmediatrackcurrenttimeinteger = document.getElementById(
              "divfinalvideohtmlid" + selectedmediatrack.order
            ).currentTime;

            if (
              //   playingitem.starttimeinsecondsinmediatrack <=
              //    alltrackscurrentplayingtimeinseconds &&
              playingitem.cutendtimeinsecondsinmediaupload >
              listmediatrackcurrenttimeinteger
            ) {
              console.log(playingitem.starttimeinsecondsinmediatrack);
              console.log(playingitem.endtimeinsecondsinmediatrack);
              console.log(alltrackscurrentplayingtimeinseconds);
            } else {
              console.log(playingitem.starttimeinsecondsinmediatrack);
              console.log(playingitem.endtimeinsecondsinmediatrack);
              console.log(alltrackscurrentplayingtimeinseconds);

              try {
                document
                  .getElementById(
                    "divfinalvideohtmlid" + selectedmediatrack.order
                  )
                  .pause();
              } catch (e) {}
              selectedmediatrack.previousplayingitem = playingitem;
              selectedmediatrack.playingitem = {};
              playtrackstatus = "findnextitem";
              // return ;
            }
          }
        } else if (playtrackstatus === "findnextitem") {
          let isfindnextitem = {};

          //currenttimemediatrackitem if previousplayingitem
          for (let j = 0; j < selectedmediatrack.items.length; j++) {
            if (
              selectedmediatrack.previousplayingitem &&
              Object.keys(selectedmediatrack.previousplayingitem).length > 0
            ) {
              if (
                selectedmediatrack.previousplayingitem.order + 1 ==
                selectedmediatrack.items[j].order
              ) {
                isfindnextitem = selectedmediatrack.items[j];
              }
            }
          }

          if (isfindnextitem && Object.keys(isfindnextitem).length > 0) {
            playtrackstatus = "addsourcetovideos";
          } else {
            playtrackstatus = "trackended";
          }
        }
        selectedmediatrack.playtrackstatus = playtrackstatus;
      }
    }

    let isanytrackinitial = false;
    let isanytrackcreatevideoelements = false;
    let isanytrackaddsourcetovideos = false;
    let isanytracksetvideoplayingtime = false;
    let isanytrackstartplaying = false;
    let isanytrackplaying = false;
    let isanytrackfindnextitem = false;
    let isanytrackended = false;

    for (let i = 0; i < listmediatrack.length; i++) {
      if (listmediatrack[i].playtrackstatus == "initial") {
        isanytrackinitial = true;
      }
      if (listmediatrack[i].playtrackstatus == "createvideoelements") {
        isanytrackcreatevideoelements = true;
      }
      if (listmediatrack[i].playtrackstatus == "addsourcetovideos") {
        isanytrackaddsourcetovideos = true;
      }
      if (listmediatrack[i].playtrackstatus == "setvideoplayingtime") {
        isanytracksetvideoplayingtime = true;
      }
      if (listmediatrack[i].playtrackstatus == "startplaying") {
        isanytrackstartplaying = true;
      }
      if (listmediatrack[i].playtrackstatus == "playing") {
        isanytrackplaying = true;
      }
      if (listmediatrack[i].playtrackstatus == "findnextitem") {
        isanytrackfindnextitem = true;
      }
      if (listmediatrack[i].playtrackstatus == "trackended") {
        isanytrackended = true;
      }
    }

    console.log(isanytrackinitial);
    console.log(isanytrackcreatevideoelements);
    console.log(isanytrackaddsourcetovideos);
    console.log(isanytracksetvideoplayingtime);
    console.log(isanytrackstartplaying);
    console.log(isanytrackplaying);
    console.log(isanytrackfindnextitem);
    console.log(isanytrackended);

    if (
      isanytrackinitial === false &&
      isanytrackcreatevideoelements === false &&
      isanytrackaddsourcetovideos === false &&
      isanytracksetvideoplayingtime === false &&
      isanytrackstartplaying === false &&
      isanytrackplaying === true &&
      isanytrackfindnextitem === false &&
      isanytrackended === true
    ) {
      for (let i = 0; i < listmediatrack.length; i++) {
        if (
          document.getElementById(
            "divfinalvideohtmlid" + listmediatrack[i].order
          ) &&
          document.getElementById(
            "divfinalvideohtmlid" + listmediatrack[i].order
          ).playing != true
        ) {
          try {
            document
              .getElementById("divfinalvideohtmlid" + listmediatrack[i].order)
              .play();
          } catch (e) {}
        }
      }
      alltrackscurrentplayingtimeinseconds =
        alltrackscurrentplayingtimeinseconds + 16 / 1000;
    } else if (
      isanytrackinitial === false &&
      isanytrackcreatevideoelements === false &&
      isanytrackaddsourcetovideos === false &&
      isanytracksetvideoplayingtime === false &&
      isanytrackstartplaying === false &&
      isanytrackplaying === true &&
      isanytrackfindnextitem === false &&
      isanytrackended === false
    ) {
      for (let i = 0; i < listmediatrack.length; i++) {
        if (
          document.getElementById(
            "divfinalvideohtmlid" + listmediatrack[i].order
          ) &&
          document.getElementById(
            "divfinalvideohtmlid" + listmediatrack[i].order
          ).playing != true
        ) {
          try {
            document
              .getElementById("divfinalvideohtmlid" + listmediatrack[i].order)
              .play();
          } catch (e) {}
        }
      }
      alltrackscurrentplayingtimeinseconds =
        alltrackscurrentplayingtimeinseconds + 16 / 1000;
    } else {
      for (let i = 0; i < listmediatrack.length; i++) {
        if (
          document.getElementById(
            "divfinalvideohtmlid" + listmediatrack[i].order
          ) &&
          document.getElementById(
            "divfinalvideohtmlid" + listmediatrack[i].order
          ).playing == true
        ) {
          try {
            document
              .getElementById("divfinalvideohtmlid" + listmediatrack[i].order)
              .pause();
          } catch (e) {}
        }
      }
    }

    if (
      isanytrackinitial === false &&
      isanytrackcreatevideoelements === false &&
      isanytrackaddsourcetovideos === false &&
      isanytracksetvideoplayingtime === false &&
      isanytrackstartplaying === false &&
      isanytrackplaying === false &&
      isanytrackfindnextitem === false &&
      isanytrackended === true
    ) {
      clearTimeout(myTimeout);
    } else {
      myTimeout = setTimeout(() => {
        playtrackitem({
          listmediatrack: listmediatrack,
          // selectedmediatrack: selectedmediatrack,
          // playtrackstatus: playtrackstatus,
          alltrackscurrentplayingtimeinseconds:
            alltrackscurrentplayingtimeinseconds,
        });
      }, 16);
    }
  }

  async function updatetime() {
    setTimeout(() => {
      setVideoclipcurrenttime((oldstate) => {
        let myvideo1 = document.getElementById("videocliphtmlid");

        if (myvideo1 && myvideo1.currentTime && !myvideo1.ended) {
          oldstate = parseInt(myvideo1.currentTime);
        }

        return oldstate;
      });

      setPlayingmediatrackitem((oldstate) => {
        ////console.log(oldstate);
        //  console.log(oldstate);
        if (oldstate && Object.keys(oldstate).length > 0) {
          drawVideoonCanvas({
            videohtmlid: "videocliphtmlid",
            initcanvashtmlid: "mycanvas12",
            finalcanvashtmlid: "mycanvas123",
          });

          let cutendtimeinsecondsinmediaupload =
            oldstate.cutendtimeinsecondsinmediaupload;

          let myvideo1 = document.getElementById("videocliphtmlid");
          console.log(cutendtimeinsecondsinmediaupload);
          // //console.log(myvideo1.currentTime);
          //  //console.log(myvideo1.paused);

          if (
            myvideo1 &&
            myvideo1.currentTime &&
            !myvideo1.paused &&
            !myvideo1.ended
          ) {
            if (cutendtimeinsecondsinmediaupload < myvideo1.currentTime) {
              myvideo1.pause();

              if (mycanvasmediaRecorder.state !== "inactive") {
                mycanvasmediaRecorder.stop();
              }

              oldstate = {};
            }
          }
        }
        return oldstate;
      });

      setPlayingmediatrack((oldstate) => {
        if (
          oldstate &&
          oldstate.mediatrack &&
          Object.keys(oldstate.mediatrack).length > 0
        ) {
          let { mediatrack, currentmediatrackitemorder, status } = oldstate;

          //console.log(oldstate);
          if (status === "startplaytrack") {
            status = "playnexttrackitem";
          } else if (status === "playnexttrackitem") {
            currentmediatrackitemorder = currentmediatrackitemorder + 1;
            let currentmediatrackitem = {};
            if (mediatrack && mediatrack.items.length > 0) {
              for (let mti = 0; mti < mediatrack.items.length; mti++) {
                if (
                  currentmediatrackitemorder === mediatrack.items[mti].order
                ) {
                  currentmediatrackitem = mediatrack.items[mti];
                }
              }
            }
            if (
              currentmediatrackitem &&
              currentmediatrackitem.mediauploadobject &&
              currentmediatrackitem.mediauploadobject.file
            ) {
              status = "playingtrackitem";

              // mycanvasrecordedChunks = [];

              //   mycanvasmediaRecorder.start();

              playVideo({
                htmlid: "videocliphtmlid",
                file: currentmediatrackitem.mediauploadobject.file,
                currentTimeDisplayinSeconds:
                  currentmediatrackitem.cutstarttimeinsecondsinmediaupload,
              });
            } else {
              //  let myvideo1 = document.getElementById("videocliphtmlid");
              //  myvideo1.src = "";
              // status = "endedtrack";
            }
          } else if (status === "playingtrackitem") {
            let currentmediatrackitem = {};
            if (mediatrack && mediatrack.items.length > 0) {
              for (let mti = 0; mti < mediatrack.items.length; mti++) {
                if (
                  currentmediatrackitemorder === mediatrack.items[mti].order
                ) {
                  currentmediatrackitem = mediatrack.items[mti];
                }
              }
            }

            let myvideo1 = document.getElementById("videocliphtmlid");
            if (
              myvideo1 &&
              myvideo1.currentTime &&
              !myvideo1.paused &&
              !myvideo1.ended
            ) {
              if (
                currentmediatrackitem.cutendtimeinsecondsinmediaupload <
                myvideo1.currentTime
              ) {
                myvideo1.src = "";
                status = "playnexttrackitem";
              }
            } else if (myvideo1 && myvideo1.ended) {
              status = "endedtrackitem";
            } else if (myvideo1 && myvideo1.paused) {
              // status = "pausedtrackitem";
            }
          } else if (status === "endedtrackitem") {
            if (mycanvasmediaRecorder.state !== "inactive") {
              mycanvasmediaRecorder.stop();
            }
            status = "playnexttrackitem";
            currentmediatrackitemorder = currentmediatrackitemorder + 1;
          } else if (status === "pausedtrackitem") {
          } else if (status === "endedtrack") {
            if (mycanvasmediaRecorder.state !== "inactive") {
              // alert();
              //   mycanvasmediaRecorder.stop();
            }
          }
          oldstate.status = status;
          oldstate.currentmediatrackitemorder = currentmediatrackitemorder;
        }
        return oldstate;
      });

      // drawVideoonCanvas({
      //   videohtmlid: "videocliphtmlid",
      //   initcanvashtmlid: "mycanvas",
      //   finalcanvashtmlid: "mycanvas2",
      // });

      updatetime();
    }, 100);
  }

  let Showui = async (methodprops) => {
    ////console.log(methodprops);
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));
    ////console.log(methodpropsjs);
    // await setCompstate({ ...compstatejs, ...methodpropsjs, showui: "true" });
    await setCompstate({ ...compstate, ...methodprops, showui: "true" });
  };
  let Hideui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodprops, showui: "false" });
  };

  async function dropHandler(methodprops) {
    ////console.log("File(s) dropped");
    let { files } = methodprops;
    let { mediauploadgallery } = compstate;

    //let targetfile = selectedmediaupload.file;
    ////console.log(targetfile);

    ////console.log(mediauploadgallery);
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        mediauploadgallery.push(files[i]);
      }
    }
    await Hideui({});
    await Showui({ mediauploadgallery: mediauploadgallery });
    doInit();
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

    playVideo({
      htmlid: "videocliphtmlid",
      currentTimeDisplayinSeconds: 0,
      file: selectedmediaupload.file,
    });

    // if (selectedmediaupload.file) {
    //   let targetfile = selectedmediaupload.file;
    //   ////console.log(targetfile);

    //   var fr = new FileReader();
    //   fr.onload = function () {
    //     var data = fr.result;
    //     var array = new Int8Array(data);
    //     var uint8ClampedArray = new Uint8ClampedArray(data);

    //     const urlObj = URL.createObjectURL(targetfile);
    //     let videoupload = document.getElementById("videocliphtmlid");
    //     videoupload.src = urlObj;

    //   };
    //   fr.readAsArrayBuffer(targetfile);

    // }

    // if (selectedmediaupload.file) {
    //   var fr = new FileReader();
    //   fr.onload = function () {
    //     var data = fr.result;
    //     var array = new Int8Array(data);
    //     var uint8ClampedArray = new Uint8ClampedArray(data);
    //   };
    //   fr.readAsArrayBuffer(selectedmediaupload.file);

    //   const urlObj = URL.createObjectURL(selectedmediaupload.file);
    //   let videoupload = document.getElementById("videocliphtmlid");
    //   videoupload.src = urlObj;
    //   // videoupload.play();
    //   // mycanvasrecordedChunks = [];
    //   // mycanvasmediaRecorder.start();
    //   // updatetime2();
    //   //autouploadvideo({});
    // }
  }

  async function playVideo(methodprops) {
    let { htmlid, currentTimeDisplayinSeconds, ispause, file } = methodprops;
    console.log(methodprops);
    if (file) {
      var fr = new FileReader();
      fr.onload = function () {
        var data = fr.result;
        var array = new Int8Array(data);
        var uint8ClampedArray = new Uint8ClampedArray(data);

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
      };
      fr.readAsArrayBuffer(file);

      const urlObj = URL.createObjectURL(file);
      let videoupload = document.getElementById(htmlid);
      videoupload.src = urlObj;
    }
  }

  async function handleClick(methodprops) {
    let { type, value, htmlid, timeinseconds, order } = methodprops;

    let {
      mediauploadgallery,
      selectedmediaupload,
      listmediatrack,
      selectedmediatrack,
      cutstarttimeinseconds,
      currentTimeDisplayinSeconds,

      cutendtimeinseconds,
    } = compstate;
  }
  async function childhandleClick(methodprops) {
    console.log(methodprops);
    let { type, value, htmlid, timeinseconds, order, trackorder } = methodprops;

    let {
      mediauploadgallery,
      selectedmediaupload,
      listmediatrack,
      selectedmediatrack,
      cutstarttimeinseconds,
      currentTimeDisplayinSeconds,

      cutendtimeinseconds,
      trackviewtype,
      fromHoursscrollintoview,
      fromHours,
      toHours,
      fromMinutes,
      toMinutes,
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
          file: selectedmediaupload.file,
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
      console.log(selectedmediaupload);
      // setTimeout(async () => {
      playVideo({
        htmlid: htmlid,
        currentTimeDisplayinSeconds: cutstarttimeinseconds,
        file: selectedmediaupload.file,
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
        file: selectedmediaupload.file,
      });
    } else if (type === "addtoselectedtrack") {
      // find track to add items
      let maximumduarationoftrackinseconds = 0;
      let selectedmediatrack = {};
      if (listmediatrack && listmediatrack.length > 0) {
        for (let mt = 0; mt < listmediatrack.length; mt++) {
          if (trackorder === listmediatrack[mt].order) {
            selectedmediatrack = listmediatrack[mt];
          }
        }
      }

      // prepare mediatrackitem
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

      // add to track
      let sectioncolumnarrayjs = selectedmediatrack.items;
      //console.log(sectioncolumnarrayjs);
      sectioncolumnarrayjs = dragdropHandler2({
        changingobjectarray: sectioncolumnarrayjs,
        subobject: mediatrackitem,
        operationtype: "add",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });

      // set starttimeinsecondsinmediatrack,endtimeinsecondsinmediatrack,
      //durationmediatrackitem
      for (let i = 0; i < sectioncolumnarrayjs.length; i++) {
        let durationmediatrackitem =
          sectioncolumnarrayjs[i].cutendtimeinsecondsinmediaupload -
          sectioncolumnarrayjs[i].cutstarttimeinsecondsinmediaupload;
        if (i == 0) {
          sectioncolumnarrayjs[i].starttimeinsecondsinmediatrack = 0;
          sectioncolumnarrayjs[i].endtimeinsecondsinmediatrack =
            durationmediatrackitem;
        }
        if (
          sectioncolumnarrayjs[i - 1] &&
          sectioncolumnarrayjs[i] &&
          sectioncolumnarrayjs[i - 1].endtimeinsecondsinmediatrack
        ) {
          sectioncolumnarrayjs[i].starttimeinsecondsinmediatrack =
            sectioncolumnarrayjs[i - 1].endtimeinsecondsinmediatrack;
          sectioncolumnarrayjs[i].endtimeinsecondsinmediatrack =
            sectioncolumnarrayjs[i].starttimeinsecondsinmediatrack +
            durationmediatrackitem;
        }
        maximumduarationoftrackinseconds =
          sectioncolumnarrayjs[i].endtimeinsecondsinmediatrack;
      }
      selectedmediatrack.items = sectioncolumnarrayjs;

      // update mediatrack
      if (listmediatrack && listmediatrack.length > 0) {
        for (let mt = 0; mt < listmediatrack.length; mt++) {
          if (trackorder === listmediatrack[mt].order) {
            listmediatrack[mt].items = selectedmediatrack.items;
          }
        }
      }

      await Hideui({});
      await Showui({
        listmediatrack: listmediatrack,
        cutstarttimeinseconds: undefined,
        cutendtimeinseconds: undefined,
        maximumduarationoftrackinseconds: maximumduarationoftrackinseconds,
      });

      playVideo({
        htmlid: "videocliphtmlid",
        currentTimeDisplayinSeconds: cutendtimeinseconds,
        ispause: true,
        file: selectedmediaupload.file,
      });
    } else if (type === "addanothertrack") {
      let maximumduarationoftrackinseconds = 0;
      let selectedmediatrack = { order: "", items: [] };

      let sectioncolumnarrayjs = listmediatrack;
      //console.log(sectioncolumnarrayjs);
      listmediatrack = dragdropHandler2({
        changingobjectarray: sectioncolumnarrayjs,
        subobject: selectedmediatrack,
        operationtype: "add",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });

      await Hideui({});
      await Showui({
        listmediatrack: listmediatrack,
      });

      playVideo({
        htmlid: "videocliphtmlid",
        currentTimeDisplayinSeconds: videoclipcurrenttime,
        ispause: true,
        file: selectedmediaupload.file,
      });
    } else if (type === "removetrack") {
      let maximumduarationoftrackinseconds = 0;
      let selectedmediatrack = { order: order, items: [] };

      let sectioncolumnarrayjs = listmediatrack;
      //console.log(sectioncolumnarrayjs);

      listmediatrack = dragdropHandler2({
        changingobjectarray: sectioncolumnarrayjs,
        subobject: selectedmediatrack,
        operationtype: "delete",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });

      await Hideui({});
      await Showui({
        listmediatrack: listmediatrack,
      });

      playVideo({
        htmlid: "videocliphtmlid",
        currentTimeDisplayinSeconds: videoclipcurrenttime,
        ispause: true,
        file: selectedmediaupload.file,
      });
    } else if (type === "selecttrackitem") {
      let selectedmediatrack = {};
      if (listmediatrack && listmediatrack.length > 0) {
        for (let mt = 0; mt < listmediatrack.length; mt++) {
          if (methodprops.trackorder === listmediatrack[mt].order) {
            selectedmediatrack = listmediatrack[mt];
          }
        }
      }
      //console.log(selectedmediatrack);

      let selectedmediatrackitem = {};
      if (selectedmediatrack && selectedmediatrack.items.length > 0) {
        for (let mti = 0; mti < selectedmediatrack.items.length; mti++) {
          if (
            methodprops.trackitemorder === selectedmediatrack.items[mti].order
          ) {
            selectedmediatrackitem = selectedmediatrack.items[mti];
          }
        }
      }
      if (listmediatrack && listmediatrack.length > 0) {
        for (let mt = 0; mt < listmediatrack.length; mt++) {
          listmediatrack[mt].playtrackstatus = "initial";
        }
      }

      let playtrackitemprops = {
        listmediatrack: listmediatrack,
        selectedmediatrack: selectedmediatrack,
        // playtrackstatus: "initial",
        alltrackscurrentplayingtimeinseconds:
          methodprops.alltrackscurrentplayingtimeinseconds,
      };
      console.log(playtrackitemprops);
      clearTimeout(myTimeout);
      mycanvasrecordedChunks2 = [];
      document.getElementById("divfinalvideohtmlid").innerHTML = "";
      document.getElementById("divofinalcanvashtmlid").innerHTML = "";
      const divofinalcanvashtmlidvideo = document.createElement("canvas");
      divofinalcanvashtmlidvideo.height = 240; // in px
      divofinalcanvashtmlidvideo.width = 320; // in px

      document
        .getElementById("divofinalcanvashtmlid")
        .appendChild(divofinalcanvashtmlidvideo);

      playtrackitem(playtrackitemprops);
    } else if (type === "playselectedtrack") {
      let selectedmediatrack = {};
      if (listmediatrack && listmediatrack.length > 0) {
        for (let mt = 0; mt < listmediatrack.length; mt++) {
          if (methodprops.trackorder === listmediatrack[mt].order) {
            listmediatrack[mt].playtrackstatus = "initial";
            selectedmediatrack = listmediatrack[mt];
          }
        }
      }
      //console.log(selectedmediatrack);
      let playtrackitemprops = {
        listmediatrack: listmediatrack,
        selectedmediatrack: selectedmediatrack,
        playtrackstatus: "initial",
        alltrackscurrentplayingtimeinseconds: 0,
      };
      console.log(playtrackitemprops);
      clearTimeout(myTimeout);
      mycanvasrecordedChunks2 = [];
      document.getElementById("divfinalvideohtmlid").innerHTML = "";
      document.getElementById("divofinalcanvashtmlid").innerHTML = "";
      const divofinalcanvashtmlidvideo = document.createElement("canvas");
      divofinalcanvashtmlidvideo.height = 240; // in px
      divofinalcanvashtmlidvideo.width = 320; // in px

      document
        .getElementById("divofinalcanvashtmlid")
        .appendChild(divofinalcanvashtmlidvideo);

      playtrackitem(playtrackitemprops);
    } else if (type === "selecttrackattime") {
      if (listmediatrack && listmediatrack.length > 0) {
        for (let mt = 0; mt < listmediatrack.length; mt++) {
          if (methodprops.trackorder === listmediatrack[mt].order) {
            listmediatrack[mt].playtrackstatus = "initial";
          }
        }
      }

      clearTimeout(myTimeout);
      mycanvasrecordedChunks2 = [];
      document.getElementById("divfinalvideohtmlid").innerHTML = "";
      document.getElementById("divofinalcanvashtmlid").innerHTML = "";
      const divofinalcanvashtmlidvideo = document.createElement("canvas");
      divofinalcanvashtmlidvideo.height = 240; // in px
      divofinalcanvashtmlidvideo.width = 320; // in px

      document
        .getElementById("divofinalcanvashtmlid")
        .appendChild(divofinalcanvashtmlidvideo);

      playtrackitem({
        listmediatrack: listmediatrack,
        selectedmediatrack: {},
        //  playtrackstatus: "initial",
        alltrackscurrentplayingtimeinseconds:
          methodprops.alltrackscurrentplayingtimeinseconds,
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
        file: selectedmediaupload.file,
      });
    } else if (type === "clearallcuttingsinthisvideo") {
      let updatedmediatrackgallery = [];
      for (let i = 0; i < listmediatrack.length; i++) {
        if (
          listmediatrack[i].mediauploadobject.file.name !==
          selectedmediaupload.file.name
        ) {
          updatedmediatrackgallery.push(listmediatrack[i]);
        }
      }

      await Hideui({});
      await Showui({
        listmediatrack: updatedmediatrackgallery,
        cutstarttimeinseconds: undefined,
        cutendtimeinseconds: undefined,
      });

      playVideo({
        htmlid: "videocliphtmlid",
        currentTimeDisplayinSeconds: videoclipcurrenttime,
        ispause: true,
        file: selectedmediaupload.file,
      });
    } else if (type === "settrackviewtype") {
      if (value === "seconds") {
        await Hideui({});
        await Showui({
          trackviewtype: value,
          fromHours: 0,
          toHours: 1,
          fromMinutes: 0,
          toMinutes: 1,
          maximumnoofcentisecondspersec: 100,
        });
      } else {
        await Hideui({});
        await Showui({
          trackviewtype: value,
          fromHours: 0,
          toHours: 1,
          fromMinutes: 0,
          toMinutes: 60,
        });
      }
      playVideo({
        htmlid: "videocliphtmlid",
        currentTimeDisplayinSeconds: videoclipcurrenttime,
        ispause: true,
        file: selectedmediaupload.file,
      });
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
    } else if (type === "gotominutes") {
      if (trackviewtype == "seconds") {
        await Hideui({});

        await Showui({
          fromHours: fromHours,
          toHours: fromHours + 1,
          fromMinutes: value,
          toMinutes: value + 1,
        });
      } else {
        let elem = document.getElementById(
          fromHoursscrollintoview.toString().padStart(2, "0") +
            ":" +
            value.toString().padStart(2, "0") +
            ":00:00"
        );
        elem.scrollIntoView();
      }
    } else if (type === "gotoseconds") {
      let elem = document.getElementById(
        fromHours.toString().padStart(2, "0") +
          ":" +
          fromMinutes.toString().padStart(2, "0") +
          ":" +
          value.toString().padStart(2, "0") +
          ":00"
      );
      elem.scrollIntoView();
    }
  }

  let currentVideouploadingStatus2 = "initial";
  let {
    mediauploadgallery,

    cutstarttimeinseconds,
    cutendtimeinseconds,
  } = compstate;

  if (compstate.showui != "true") {
    return <></>;
  } else {
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
    //console.log(compstate);

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: 1200,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{ padding: "5px" }}
          onClick={() => {
            startautouploadvideo();
          }}
        >
          startautouploadvideo
        </div>

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
            width="470"
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
              handleClick={childhandleClick}
            />
          </div>
        </div>
        <div
          style={{
            padding: "5px",
            display: "flex",
            flexWrap: "wrap",
          }}
          id="divfinalvideohtmlid"
        ></div>
        <div
          style={{
            padding: "5px",
            display: "flex",
            flexWrap: "wrap",
          }}
          id="divofinalcanvashtmlid"
        ></div>
        <div style={{ width: "100%" }}>
          <video controls id="videofinalhtmlid"></video>
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
        <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
          <canvas
            id="mycanvas12"
            width="470"
            height="270"
            //  onMouseDown={(e) => greoutSimilarPixels(e)}
            style={{ border: "1px solid #d3d3d3" }}
          >
            Your browser does not support the HTML canvas tag.
          </canvas>

          <canvas
            id="mycanvas123"
            width="470"
            height="270"
            // onMouseDown={(e) => greoutSimilarPixels(e)}
            style={{ border: "1px solid #d3d3d3" }}
          >
            Your browser does not support the HTML canvas tag.
          </canvas>
        </div>
        <div style={{ width: "1000px", height: "500px", overflow: "auto" }}>
          <Mediatrackhtml
            compstate={compstate}
            parenthandleClick={childhandleClick}
          />
        </div>
      </div>
    );
  }
}
