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
  deleterecordNodejs
} from "./logic";


function App() {
  // Declare a new state variable, which we'll call "count"

  const [compstate, setCompstate] = useState({});
  const [uistate, setUistate] = useState({});

  useEffect(() => {
    alltypecompconsolelog("sitecomp-useeffect");

  
    //  fetchAllsiteversionpageDatafromDB();
    Showui({listtablemetadata:[]  });
  }, []);

  async function fetchtablemetadatafromDB(methodprops) {
    alltypecompconsolelog("sitecomp-fetchtablemetadatafromDB");
    alltypecompconsolelog(methodprops);
     let listtablemetadata =[];
    let resp =  await gettabledatafromNodejs({tablename:"tablemetadata"});
        console.log(resp);
        if(resp.issuccess === "true"){
          listtablemetadata = resp.data;
        //  Showui({  listtablemetadata: listtablemetadata });
        }
  
   return listtablemetadata;
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

  let Codemanagerhtml = () => {
    return "codemanagerhtml";
  };

  let Databasehtml = () => {
    let { listtablemetadata } = compstate;
    let {createtablemetadatalabel, createtablemetadataname} = uistate;
    let mainpanelhtml = [];
    let tablenamelisthtml = [];
    let listtablemetadatajs = JSON.parse(JSON.stringify(listtablemetadata));
   
    alltypecompconsolelog("listtablemetadata", listtablemetadatajs);

    if (listtablemetadatajs) {
      for (let i = 0; i < listtablemetadatajs.length; i++) {
        tablenamelisthtml.push(<>
        <div key={listtablemetadatajs[i].name}>{listtablemetadatajs[i].label}</div>
        <button onClick={() => handleClick({ type: "deletetablemetadatarecord", name:listtablemetadatajs[i].name })}>
        deletetablemetadatarecord
              </button>
              </>);
      }
    }
    return <>
    Label<input onChange={(e)=>handleChange({type:"createtablemetadatalabel", value:e.target.value})} defaultValue={createtablemetadatalabel} />
    Name<input onChange={(e)=>handleChange({type:"createtablemetadataname", value:e.target.value})} defaultValue={createtablemetadataname} />
    <button onClick={() => handleClick({ type: "createtablemetadatarecord" })}>
    createtablemetadatarecord
          </button>
    {tablenamelisthtml}
    </>;
  };

  let Sitemanagerhtml = () => {
    return "Sitemanagerhtml";
  };
  let handleChange = async (methodprops) => {
    let { type, value } = methodprops;
    if(type === "createtablemetadatalabel"){
      uistate.createtablemetadatalabel = value;
      //setUistate({...uistate, createtablemetadatalabel: value });
    }
    if(type === "createtablemetadataname"){
      uistate.createtablemetadataname = value;
    //  setUistate({ ...uistate, createtablemetadataname: value });
    }
    console.log(uistate);
  }


  let handleClick = async (methodprops) => {
    let { viewtype, createtablemetadataname, createtablemetadatalabel } = compstate;
    console.log(uistate);
    let { type, name } = methodprops;
    if (type === "createtablemetadatarecord") {
      let createtableresp =  await insertrecordNodejs({tablename:"tablemetadata",
       tabledatalist:[{label:uistate.createtablemetadatalabel, name:uistate.createtablemetadataname}]});
      console.log(createtableresp);
      if(createtableresp.issuccess === "true"){


        let listtablemetadata = await fetchtablemetadatafromDB();
        Showui({  listtablemetadata:listtablemetadata});
      }
      else{
        console.log(createtableresp.message);
      }
    }
    else if (type === "deletetablemetadatarecord") {
      let createtableresp =  await deleterecordNodejs({tablename:"tablemetadata",
      conditionexpression:{ name:name}});
      console.log(createtableresp);
      if(createtableresp.issuccess === "true"){


        let listtablemetadata = await fetchtablemetadatafromDB();
        Showui({  listtablemetadata:listtablemetadata});
      }
      else{
        console.log(createtableresp.message);
      }
    }
     else {
      let listtablemetadata = await fetchtablemetadatafromDB();
      Showui({ viewtype: type , listtablemetadata:listtablemetadata});
    }

  };

  let { viewtype, showui } = compstate;
  alltypecompconsolelog("compstate", compstate);

  if (showui !== "true") {
    return <></>;
  } else {
    return (
      <>
        <div>
          <button onClick={() => handleClick({ type: "viewcodemanager" })}>
            viewcodemanager
          </button>

          <button onClick={() => handleClick({ type: "viewdatabasemanager" })}>
            viewdatabasemanager
          </button>

          <button onClick={() => handleClick({ type: "viewsitemanager" })}>
            viewsitemanager
          </button>

          <button onClick={() => handleClick({ type: "callBackendAPI" })}>
            callBackendAPI
          </button>
        </div>

        {viewtype === "viewcodemanager" ? (
          <div>
            <Codemanagerhtml />
          </div>
        ) : (
          <></>
        )}

        {viewtype === "viewdatabasemanager" ? (
          <div>
            <Databasehtml />
          </div>
        ) : (
          <></>
        )}

        {viewtype === "viewsitemanager" ? (
          <div>
            <Sitemanagerhtml />
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default App;
