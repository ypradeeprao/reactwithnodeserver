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
  deleterecordNodejs
} from "./logic";

import {Listdatahtml, Viewdatahtml, Newdatahtml} from "./tablechildmetadata";


function App() {
  // Declare a new state variable, which we'll call "count"

  const [compstate, setCompstate] = useState({});
  const [uistate, setUistate] = useState({});

  useEffect(() => {
    alltypecompconsolelog("sitecomp-useeffect");


    //  fetchAllsiteversionpageDatafromDB();
    Showui({ listtablemetadata: [], viewtablemetadata: {} });
  }, []);

  async function fetchtablemetadatafromDB(methodprops) {
    alltypecompconsolelog("sitecomp-fetchtablemetadatafromDB");
    alltypecompconsolelog(methodprops);
    let listtablemetadata = [];
    let resp = await gettabledatafromNodejs({ tablename: "tablemetadata", conditionexpression: {} });
    console.log(resp);
    if (resp.issuccess === "true") {
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


 


  let Listtablemetadatahtml = () => {
    let { listtablemetadata } = compstate;

    let mainpanelhtml = [];
    let tablenamelisthtml = [];
    let listtablemetadatajs = JSON.parse(JSON.stringify(listtablemetadata));

    alltypecompconsolelog("listtablemetadata", listtablemetadatajs);

    if (listtablemetadatajs) {
      for (let i = 0; i < listtablemetadatajs.length; i++) {
        tablenamelisthtml.push(<>
          <div key={listtablemetadatajs[i].name} onClick={() => handleClick({ type: "viewtablemetadatarecord", name: listtablemetadatajs[i].name })}>{listtablemetadatajs[i].label}</div>


        </>);
      }
    }
    return <>

      {tablenamelisthtml}
    </>;
  };

  let Newtablemetadatahtml = () => {
    let { createtablemetadatalabel, createtablemetadataname } = uistate;
    return <>
      Label<input onChange={(e) => handleChange({ type: "createtablemetadatalabel", value: e.target.value })} defaultValue={createtablemetadatalabel} />
      Name<input onChange={(e) => handleChange({ type: "createtablemetadataname", value: e.target.value })} defaultValue={createtablemetadataname} />
      <button onClick={() => handleClick({ type: "createtablemetadatarecord" })}>
        createtablemetadatarecord
      </button>
      <button onClick={() => handleClick({ type: "deletealltablemetadatarecord" })}>
        deletealltablemetadatarecord
      </button>

    </>;
  }

  let Viewtablemetadatahtml = () => {
    let { viewtablemetadata, listtablecolumnmetadata, showlisttablecolumnmetadata } = compstate;
    let mainpanelhtml = [];
    if (viewtablemetadata && viewtablemetadata.name && viewtablemetadata.name !== "") {
      mainpanelhtml.push(<>

        Label<input onChange={(e) => handleChange({ type: "updatetablemetadatalabel", value: e.target.value })} defaultValue={viewtablemetadata.label} />
        Name<input onChange={(e) => handleChange({ type: "updatetablemetadataname", value: e.target.value })} defaultValue={viewtablemetadata.name} />
        <button onClick={() => handleClick({ type: "updatetablemetadatarecord" })}>
          updatetablemetadatarecord
        </button>
        <button onClick={() => handleClick({ type: "deletetablemetadatarecord", name: viewtablemetadata.name })}>
          deletetablemetadatarecord
        </button>
        <div>
          <button onClick={() => handleClick({ type: "showlisttablecolumnmetadata" })}>
            showlisttablecolumnmetadata
          </button>

          <button onClick={() => handleClick({ type: "showlisttableitemvalidationmetadata" })}>
            showlisttableitemvalidationmetadata
          </button>

          <button onClick={() => handleClick({ type: "showlisttableitemdisplaymetadata" })}>
            showlisttableitemdisplaymetadata
          </button>




        </div>

        {showlisttablecolumnmetadata === "true"?<> <div>
          <Listdatahtml listdata={listtablecolumnmetadata} type="tablecolumnmetadata" 
          handleClick={(methodprops)=>childhandleClick({...methodprops,changetype:"tablecolumnmetadata"})} 
          handleChange={(methodprops)=>childhandleChange({...methodprops,changetype:"tablecolumnmetadata"})} 
           />
           <Newdatahtml 
           columns={["label","name"]} type="tablecolumnmetadata" 
           handleClick={(methodprops)=>childhandleClick({...methodprops,changetype:"tablecolumnmetadata"})} 
           handleChange={(methodprops)=>childhandleChange({...methodprops,changetype:"tablecolumnmetadata"})} 
           />
        </div></>:<></>} 
       


      </>);
    }
    return <>{mainpanelhtml}</>
  }

  let Sitemanagerhtml = () => {
    return "Sitemanagerhtml";
  };


  let handleChange = async (methodprops) => {
    let { type, value } = methodprops;
    if (type === "createtablemetadatalabel") {
      uistate.createtablemetadatalabel = value;
      //setUistate({...uistate, createtablemetadatalabel: value });
    }
    if (type === "createtablemetadataname") {
      uistate.createtablemetadataname = value;
      //  setUistate({ ...uistate, createtablemetadataname: value });
    }
    if (type === "updatetablemetadatalabel") {
      uistate.upatetablemetadatalabel = value;
      //setUistate({...uistate, createtablemetadatalabel: value });
    }
    if (type === "updatetablemetadataname") {
      uistate.updatetablemetadataname = value;
      //  setUistate({ ...uistate, createtablemetadataname: value });
    }
    console.log(uistate);
  }


  let handleClick = async (methodprops) => {
    let { viewtype, createtablemetadataname, createtablemetadatalabel, viewtablemetadata } = compstate;
    console.log(uistate);
    let { type, name } = methodprops;

    if (type === "createtablemetadatarecord") {
      let createtableresp = await insertrecordNodejs({
        tablename: "tablemetadata",
        tabledatalist: [{ label: uistate.createtablemetadatalabel, name: uistate.createtablemetadataname }]
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {


        let listtablemetadata = await fetchtablemetadatafromDB();
        Showui({ listtablemetadata: listtablemetadata, viewtablemetadata: {} });
        uistate.createtablemetadatalabel = "";
        uistate.createtablemetadataname = "";
      }
      else {
        console.log(createtableresp.message);
      }
    }
    else if (type === "updatetablemetadatarecord") {
      let createtableresp = await updaterecordNodejs({
        tablename: "tablemetadata",
        conditionexpression: { name: viewtablemetadata.name },
        updateexpression: { label: uistate.upatetablemetadatalabel },
        upsertifnotfound: true,
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {


        let listtablemetadata = await fetchtablemetadatafromDB();
        if (listtablemetadata && listtablemetadata.length > 0) {
          for (let i = 0; i < listtablemetadata.length; i++) {
            if (viewtablemetadata.name === listtablemetadata[i].name) {
              viewtablemetadata = listtablemetadata[i];
            }
          }
        }
        Showui({ listtablemetadata: listtablemetadata, viewtablemetadata: viewtablemetadata });
      }
      else {
        console.log(createtableresp.message);
      }
    }
    else if (type === "deletetablemetadatarecord") {
      let createtableresp = await deleterecordNodejs({
        tablename: "tablemetadata",
        conditionexpression: { name: name }
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {


        let listtablemetadata = await fetchtablemetadatafromDB();
        Showui({ listtablemetadata: listtablemetadata, viewtablemetadata: {} });
      }
      else {
        console.log(createtableresp.message);
      }
    }
    else if (type === "deletealltablemetadatarecord") {
      let createtableresp = await deleterecordNodejs({
        tablename: "tablemetadata",
        conditionexpression: {}
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {


        let listtablemetadata = await fetchtablemetadatafromDB();
        Showui({ listtablemetadata: listtablemetadata, viewtablemetadata: {} });
      }
      else {
        console.log(createtableresp.message);
      }
    }
    else if (type === "viewtablemetadatarecord") {

      let resp = await gettabledatafromNodejs({ tablename: "tablemetadata", conditionexpression: { name: name } });
      console.log(resp);
      let viewtablemetadata = {};
      if (resp.issuccess === "true" && resp.data && resp.data.length > 0) {
        viewtablemetadata = resp.data[0];
        Showui({ viewtablemetadata: viewtablemetadata });
      }

    }
    else if (type === "showlisttablecolumnmetadata") {

      let resp = await gettabledatafromNodejs({ tablename: "tablecolmnmetadata", conditionexpression: { tablename: name } });
      console.log(resp);
      if (resp.issuccess === "true" ) {
        Showui({ listtablecolumnmetadata: resp.data, showlisttablecolumnmetadata:"true" });
      }

    }
    else {
      let listtablemetadata = await fetchtablemetadatafromDB();
      Showui({ viewtype: type, listtablemetadata: listtablemetadata });
    }

  };

  let childhandleChange = async (methodprops) => {
    let { type, value } = methodprops;
    if (type === "createtablemetadatalabel") {
      uistate.createtablemetadatalabel = value;
      //setUistate({...uistate, createtablemetadatalabel: value });
    }
    if (type === "createtablemetadataname") {
      uistate.createtablemetadataname = value;
      //  setUistate({ ...uistate, createtablemetadataname: value });
    }
    if (type === "updatetablemetadatalabel") {
      uistate.upatetablemetadatalabel = value;
      //setUistate({...uistate, createtablemetadatalabel: value });
    }
    if (type === "updatetablemetadataname") {
      uistate.updatetablemetadataname = value;
      //  setUistate({ ...uistate, createtablemetadataname: value });
    }
    console.log(uistate);
  }


  let childhandleClick = async (methodprops) => {
    let { viewtype, createtablemetadataname, createtablemetadatalabel, viewtablemetadata } = compstate;
    console.log(uistate);
    let { type, name } = methodprops;

    if (type === "createtablemetadatarecord") {
      let createtableresp = await insertrecordNodejs({
        tablename: "tablemetadata",
        tabledatalist: [{ label: uistate.createtablemetadatalabel, name: uistate.createtablemetadataname }]
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {


        let listtablemetadata = await fetchtablemetadatafromDB();
        Showui({ listtablemetadata: listtablemetadata, viewtablemetadata: {} });
        uistate.createtablemetadatalabel = "";
        uistate.createtablemetadataname = "";
      }
      else {
        console.log(createtableresp.message);
      }
    }
    else if (type === "updatetablemetadatarecord") {
      let createtableresp = await updaterecordNodejs({
        tablename: "tablemetadata",
        conditionexpression: { name: viewtablemetadata.name },
        updateexpression: { label: uistate.upatetablemetadatalabel },
        upsertifnotfound: true,
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {


        let listtablemetadata = await fetchtablemetadatafromDB();
        if (listtablemetadata && listtablemetadata.length > 0) {
          for (let i = 0; i < listtablemetadata.length; i++) {
            if (viewtablemetadata.name === listtablemetadata[i].name) {
              viewtablemetadata = listtablemetadata[i];
            }
          }
        }
        Showui({ listtablemetadata: listtablemetadata, viewtablemetadata: viewtablemetadata });
      }
      else {
        console.log(createtableresp.message);
      }
    }
    else if (type === "deletetablemetadatarecord") {
      let createtableresp = await deleterecordNodejs({
        tablename: "tablemetadata",
        conditionexpression: { name: name }
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {


        let listtablemetadata = await fetchtablemetadatafromDB();
        Showui({ listtablemetadata: listtablemetadata, viewtablemetadata: {} });
      }
      else {
        console.log(createtableresp.message);
      }
    }
    else if (type === "deletealltablemetadatarecord") {
      let createtableresp = await deleterecordNodejs({
        tablename: "tablemetadata",
        conditionexpression: {}
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {


        let listtablemetadata = await fetchtablemetadatafromDB();
        Showui({ listtablemetadata: listtablemetadata, viewtablemetadata: {} });
      }
      else {
        console.log(createtableresp.message);
      }
    }
    else if (type === "viewtablemetadatarecord") {

      let resp = await gettabledatafromNodejs({ tablename: "tablemetadata", conditionexpression: { name: name } });
      console.log(resp);
      let viewtablemetadata = {};
      if (resp.issuccess === "true" && resp.data && resp.data.length > 0) {
        viewtablemetadata = resp.data[0];
        Showui({ viewtablemetadata: viewtablemetadata });
      }

    }
    else {
      let listtablemetadata = await fetchtablemetadatafromDB();
      Showui({ viewtype: type, listtablemetadata: listtablemetadata });
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
          <div style={{ display: "flex", width: "100%", backgroundColor: "red", flexWrap: "wrap" }}>
            <div style={{ width: "100%", backgroundColor: "yellow" }}>
              <Newtablemetadatahtml />
            </div>
            <div style={{ width: "20%", backgroundColor: "yellow" }}>
              <Listtablemetadatahtml />
            </div>
            <div style={{ width: "80%", backgroundColor: "blue" }}>
              <Viewtablemetadatahtml />
            </div>
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
