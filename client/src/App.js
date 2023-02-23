/* eslint-disable no-unused-vars */
import React, { Component, useState, useEffect, createRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  alltypecompconsolelog,
  gettabledatafromDatabase,
  alltypecompChangeHandler,
  alltypecompClickHandler,
  getbrowserLocalstorage,
  gettabledatafromNodejs,
  createtabledataNodejs,
  insertrecordNodejs,
  updaterecordNodejs,
  deleterecordNodejs,
  currenttimeiniso,
} from "./logic";
import { Sitecomp } from "./sitecomp";

import { Listdatahtml, Viewdatahtml, Newdatahtml } from "./tablechildmetadata";

function App() {
  // Declare a new state variable, which we'll call "count"

  const [compstate, setCompstate] = useState({});
  const [uistate, setUistate] = useState({
    newtablechildmetadata: {},
    edittablechildmetadata: {},
  });

  useEffect(() => {
    alltypecompconsolelog("sitecomp-useeffect");

    //  fetchAllsiteversionpageDatafromDB();
    Showui({ listtablemetadata: [], viewtablemetadata: {} });
  }, []);

  async function fetchlistmetadatafromDB(methodprops) {
    alltypecompconsolelog("sitecomp-fetchlistmetadatafromDB");
    alltypecompconsolelog(methodprops);
    let { tablename, conditionexpression } = methodprops;
    let listmetadata = [];
    let resp = await gettabledatafromNodejs({
      tablename: tablename,
      conditionexpression: conditionexpression,
    });
    console.log(resp);
    if (resp.issuccess === "true") {
      listmetadata = resp.data;
      //  Showui({  listtablemetadata: listtablemetadata });
    }

    return listmetadata;
  }

  let Showui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: "true" });
  };
  let Hideui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: "false" });
  };

  let Builddatahtml = () => {
    let { listtablemetadata } = compstate;

    let mainpanelhtml = [];
    let tablenamelisthtml = [];
    let listtablemetadatajs = JSON.parse(JSON.stringify(listtablemetadata));

    alltypecompconsolelog("listtablemetadata", listtablemetadatajs);

    if (listtablemetadatajs) {
      for (let i = 0; i < listtablemetadatajs.length; i++) {
        tablenamelisthtml.push(
          <>
            <div
              key={listtablemetadatajs[i].name}
              // onClick={() =>
              //   handleClick({
              //     type: "viewtablemetadatarecord",
              //     name: listtablemetadatajs[i].name,
              //   })
              // }
            >
              {listtablemetadatajs[i].label}
            </div>
          </>
        );
      }
    }
    return <>{tablenamelisthtml}</>;
  };

  
  


  let { viewtype, showui } = compstate;
  alltypecompconsolelog("compstate", compstate);

  if (showui !== "true") {
    return <></>;
  } else {
    return (
      <>
       
       <Sitecomp />

      
      </>
    );
  }
}

export default App;
