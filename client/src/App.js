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
  gettabledatafromNodejs
} from "./logic";

let callBackendAPI = async () => {
  fetch("/createtable", {
    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify({
      tablename: "bow2",
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Request-Headers": "*",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

  // const response = await fetch('/createtable');
  //     const body = await response.json();
  //     console.log(body);
  //     if (response.status !== 200) {
  //       throw Error(body.message)
  //     }
  //     return body;
};

function App() {
  // Declare a new state variable, which we'll call "count"

  const [compstate, setCompstate] = useState(0);

  useEffect(() => {
    alltypecompconsolelog("sitecomp-useeffect");

    fetchsitestatedatafromDB();
    //  fetchAllsiteversionpageDatafromDB();
  }, []);

  async function fetchsitestatedatafromDB(methodprops) {
    alltypecompconsolelog("sitecomp-fetchsitestatedatafromDB");
    alltypecompconsolelog(methodprops);
   
    setCompstate({ listtablemetadata: [], showui: "true" });
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
    let mainpanelhtml = [];
    let listtablemetadatajs = JSON.parse(JSON.stringify(listtablemetadata));
    listtablemetadatajs.push({
      label: "test table label",
      name: "test table name",
    });
    alltypecompconsolelog("listtablemetadata", listtablemetadatajs);

    if (listtablemetadatajs) {
      for (let i = 0; i < listtablemetadatajs.length; i++) {
        mainpanelhtml.push(<div>{listtablemetadatajs[i].label}</div>);
      }
    }
    return <>{mainpanelhtml}</>;
  };

  let Sitemanagerhtml = () => {
    return "Sitemanagerhtml";
  };

  let handleClick = async (methodprops) => {
    let { viewtype } = compstate;
    let { type } = methodprops;
    if (type === "callBackendAPI") {
      await gettabledatafromNodejs()
        .then((res) => {
           console.log(res);
          console.log(res.body);
          console.log(res.json());
        })
        .catch((err) => console.log(err));

        let resp =  await gettabledatafromNodejs();
        console.log(resp);
        console.log(resp.body);
          console.log(resp.json());

    } else {
      Showui({ viewtype: type });
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
