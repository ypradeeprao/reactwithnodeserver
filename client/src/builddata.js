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
  fetchlistmetadatafromDB,
  gettabledatafromNodejs,
  createtabledataNodejs,
  insertrecordNodejs,
  updaterecordNodejs,
  deleterecordNodejs,
  currenttimeiniso,
} from "./logic";

import { Listdatahtml, Viewdatahtml, Newdatahtml } from "./tablechildmetadata";
import {Richtextareacomp} from "./richtextareacomp";

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

  let Listtablemetadatahtml = () => {
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
              onClick={() =>
                handleClick({
                  type: "viewtablemetadatarecord",
                  name: listtablemetadatajs[i].name,
                })
              }
            >
              {listtablemetadatajs[i].label}
            </div>
          </>
        );
      }
    }
    return <>{tablenamelisthtml}</>;
  };

  let Newtablemetadatahtml = () => {
    let { createtablemetadatalabel, createtablemetadataname } = uistate;
    return (
      <>
        Label
        <input
          onChange={(e) =>
            handleChange({
              type: "createtablemetadatalabel",
              value: e.target.value,
            })
          }
          defaultValue={createtablemetadatalabel}
        />
        Name
        <input
          onChange={(e) =>
            handleChange({
              type: "createtablemetadataname",
              value: e.target.value,
            })
          }
          defaultValue={createtablemetadataname}
        />
        <button
          onClick={() => handleClick({ type: "createtablemetadatarecord" })}
        >
          createtablemetadatarecord
        </button>
        <button
          onClick={() => handleClick({ type: "deletealltablemetadatarecord" })}
        >
          deletealltablemetadatarecord
        </button>
      </>
    );
  };

  let Viewtablemetadatahtml = () => {
    let {
      viewtablemetadata,
      listtablechildmetadata,
      viewtablechildmetadata,
      isshowlisttablechildmetadata,
      selectedchildmetadataname,
    } = compstate;
    let mainpanelhtml = [];
    if (
      viewtablemetadata &&
      viewtablemetadata.name &&
      viewtablemetadata.name !== ""
    ) {
      mainpanelhtml.push(
        <>
          Label
          <input
            onChange={(e) =>
              handleChange({
                type: "updatetablemetadatalabel",
                value: e.target.value,
              })
            }
            defaultValue={viewtablemetadata.label}
          />
          Name
          <input
            onChange={(e) =>
              handleChange({
                type: "updatetablemetadataname",
                value: e.target.value,
              })
            }
            defaultValue={viewtablemetadata.name}
          />
          <button
            onClick={() => handleClick({ type: "updatetablemetadatarecord" })}
          >
            updatetablemetadatarecord
          </button>
          <button
            onClick={() =>
              handleClick({
                type: "deletetablemetadatarecord",
                name: viewtablemetadata.name,
              })
            }
          >
            deletetablemetadatarecord
          </button>
          <div>
            <button
              onClick={() =>
                handleClick({
                  type: "showlisttablecolumnmetadata",
                  name: viewtablemetadata.name,
                })
              }
            >
              showlisttablecolumnmetadata
            </button>

            <button
              onClick={() =>
                handleClick({ type: "showlisttableitemvalidationmetadata" })
              }
            >
              showlisttableitemvalidationmetadata
            </button>

            <button
              onClick={() =>
                handleClick({ type: "showlisttableitemdisplaymetadata" })
              }
            >
              showlisttableitemdisplaymetadata
            </button>
          </div>
          {isshowlisttablechildmetadata === "true" ? (
            <>
              {" "}
              <div>
                <div
                  style={{ display: "flex", width: "100%", flexWrap: "wrap" }}
                >
                  <div style={{ width: "100%" }}>
                    <Newdatahtml
                      columns={[
                        { columnlabel: "Label", columnname: "label" },
                        { columnlabel: "Name", columnname: "name" },
                        {
                          columnlabel: "Type",
                          columnname: "type",
                          columnoptions: [
                            { label: "Text", name: "text" },
                            { label: "Date", name: "date" },
                          ],
                        },
                      ]}
                      type={selectedchildmetadataname}
                      handleClick={(methodprops) =>
                        childhandleClick({
                          ...methodprops,
                          type: "newtablechildmetadata",
                        })
                      }
                      handleChange={(methodprops) =>
                        childhandleChange({
                          ...methodprops,
                          type: "newtablechildmetadata",
                        })
                      }
                    />
                  </div>

                  <div style={{ width: "20%" }}>
                    <Listdatahtml
                      listdata={listtablechildmetadata}
                      columns={[
                        { columnlabel: "Label", columnname: "label" },
                        { columnlabel: "Name", columnname: "name" },
                        {
                          columnlabel: "Type",
                          columnname: "type",
                          columnoptions: [
                            { label: "Text", name: "text" },
                            { label: "Date", name: "date" },
                          ],
                        },
                      ]}
                      type={selectedchildmetadataname}
                      handleClick={(methodprops) =>
                        childhandleClick({
                          ...methodprops,
                          type: "listtablechildmetadata",
                        })
                      }
                      handleChange={(methodprops) =>
                        childhandleChange({
                          ...methodprops,
                          type: "listtablechildmetadata",
                        })
                      }
                    />
                  </div>
                  <div style={{ width: "80%" }}>
                    <Viewdatahtml
                      viewdata={viewtablechildmetadata}
                      columns={[
                        { columnlabel: "Label", columnname: "label" },
                        { columnlabel: "Name", columnname: "name" },
                        {
                          columnlabel: "Type",
                          columnname: "type",
                          columnoptions: [
                            { label: "Text", name: "text" },
                            { label: "Date", name: "date" },
                          ],
                        },
                      ]}
                      buttons={[
                        { columnlabel: "update", columnname: "updatedata" },
                        { columnlabel: "delete", columnname: "deletedata" },
                        { columnlabel: "clone", columnname: "clonedata" },
                      ]}
                      type={selectedchildmetadataname}
                      handleClick={(methodprops) =>
                        childhandleClick({
                          ...methodprops,
                          type: "viewtablechildmetadata",
                        })
                      }
                      handleChange={(methodprops) =>
                        childhandleChange({
                          ...methodprops,
                          type: "viewtablechildmetadata",
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      );
    }
    return <>{mainpanelhtml}</>;
  };

  let Listsitemetadatahtml = () => {
    let { listsitemetadata } = compstate;

    let namelisthtml = [];
    let listsitemetadatajs = JSON.parse(JSON.stringify(listsitemetadata));

    alltypecompconsolelog("listsitemetadata", listsitemetadatajs);

    if (listsitemetadatajs) {
      for (let i = 0; i < listsitemetadatajs.length; i++) {
        namelisthtml.push(
          <>
            <div
              key={listsitemetadatajs[i].name}
              onClick={() =>
                handleClick({
                  type: "viewsitemetadatarecord",
                  name: listsitemetadatajs[i].name,
                })
              }
            >
              {listsitemetadatajs[i].label}
            </div>
          </>
        );
      }
    }
    return <>{namelisthtml}</>;
  };

  let Newsitemetadatahtml = () => {
    let { createsitemetadatalabel, creatsitemetadataname } = uistate;
    return (
      <>
        Label
        <input
          onChange={(e) =>
            handleChange({
              type: "createsitemetadatalabel",
              value: e.target.value,
            })
          }
          defaultValue={createsitemetadatalabel}
        />
        Name
        <input
          onChange={(e) =>
            handleChange({
              type: "createsitemetadataname",
              value: e.target.value,
            })
          }
          defaultValue={creatsitemetadataname}
        />
        <button
          onClick={() => handleClick({ type: "createsitemetadatarecord" })}
        >
          createsitemetadatarecord
        </button>
        <button
          onClick={() => handleClick({ type: "deleteallsitemetadatarecord" })}
        >
          deleteallsitemetadatarecord
        </button>
      </>
    );
  };

  let Viewsitemetadatahtml = () => {
    let mainpanelhtml = [];
    let { viewsitemetadata } = compstate;
    if (
      viewsitemetadata &&
      viewsitemetadata.name &&
      viewsitemetadata.name !== ""
    ) {
      mainpanelhtml.push(
        <>
          Label
          <input
            onChange={(e) =>
              handleChange({
                type: "updatesitemetadatalabel",
                value: e.target.value,
              })
            }
            defaultValue={viewsitemetadata.label}
          />
          Name
          <input
            onChange={(e) =>
              handleChange({
                type: "updatesitemetadataname",
                value: e.target.value,
              })
            }
            defaultValue={viewsitemetadata.name}
          />
          <button
            onClick={() => handleClick({ type: "updatesitemetadatarecord" })}
          >
            updatesitemetadatarecord
          </button>
          <button
            onClick={() => handleClick({ type: "deletesitemetadatarecord" })}
          >
            deletesitemetadatarecord
          </button>
          <div>
            <Newsiteversionmetadatahtml />
          </div>
        </>
      );
    }
    return (
      <>
        {mainpanelhtml}
        <div>
          <Listsiteversionmetadatahtml />
        </div>
      </>
    );
  };

  let Listsiteversionmetadatahtml = () => {
    let { listsiteversionmetadata } = compstate;

    let listhtml = [];
    if (listsiteversionmetadata && listsiteversionmetadata.length > 0) {
      let listsiteversionmetadatajs = JSON.parse(
        JSON.stringify(listsiteversionmetadata)
      );

      alltypecompconsolelog(
        "listsiteversionmetadata",
        listsiteversionmetadatajs
      );

      if (listsiteversionmetadatajs) {
        for (let i = 0; i < listsiteversionmetadatajs.length; i++) {
          listhtml.push(
            <>
              <div
                onClick={() =>
                  handleClick({
                    type: "viewsiteversionmetadatarecord",
                    version: listsiteversionmetadatajs[i].version,
                  })
                }
                key={listsiteversionmetadatajs[i].version}
              >
                {listsiteversionmetadatajs[i].description} -{" "}
                {listsiteversionmetadatajs[i].version} -
                {listsiteversionmetadatajs[i].isactive}
              </div>
              <div></div>
            </>
          );
        }
      }
    }
    return (
      <>
        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ width: "20%" }}>{listhtml}</div>
          <div style={{ width: "80%" }}>
            <Viewsiteversionmetadatahtml />
          </div>
        </div>
      </>
    );
  };

  let Newsiteversionmetadatahtml = () => {
    let { createsitemetadatalabel, creatsitemetadataname } = uistate;
    return (
      <>
        newsiteversionmetadatadescription
        <input
          onChange={(e) =>
            handleChange({
              type: "newsiteversionmetadatadescription",
              value: e.target.value,
            })
          }
        />
        <button
          onClick={() =>
            handleClick({ type: "createsiteversionmetadatarecord" })
          }
        >
          createsiteversionmetadatarecord
        </button>
        <button
          onClick={() =>
            handleClick({ type: "cloneactivesiteversionmetadatarecord" })
          }
        >
          cloneactivesiteversionmetadatarecord
        </button>
        <button
          onClick={() =>
            handleClick({ type: "deleteallsiteversionmetadatarecord" })
          }
        >
          deleteallsiteversionmetadatarecord
        </button>
      </>
    );
  };

  let Viewsiteversionmetadatahtml = () => {
    let mainpanelhtml = [];
    let { viewsiteversionmetadata } = compstate;
    if (
      viewsiteversionmetadata &&
      viewsiteversionmetadata.version &&
      viewsiteversionmetadata.version !== ""
    ) {
      mainpanelhtml.push(
        <>
          description
          <input
            onChange={(e) =>
              handleChange({
                type: "editsiteversionmetadata",
                subtype: "description",
                value: e.target.value,
              })
            }
            defaultValue={viewsiteversionmetadata.description}
          />
          Version
          <input defaultValue={viewsiteversionmetadata.version} />
          <button
            onClick={() =>
              handleClick({
                type: "updatesiteversionmetadatarecord",
                version: viewsiteversionmetadata.version,
              })
            }
          >
            updatesiteversionmetadatarecord
          </button>
          <button
            onClick={() =>
              handleClick({
                type: "deletesiteversionmetadatarecord",
                version: viewsiteversionmetadata.version,
              })
            }
          >
            deletesiteversionmetadatarecord
          </button>
          <button
            onClick={() =>
              handleClick({
                type: "activatesiteversionmetadatarecord",
                version: viewsiteversionmetadata.version,
              })
            }
          >
            activatesiteversionmetadatarecord
          </button>
          <button
            onClick={() =>
              handleClick({
                type: "clonesiteversionmetadatarecord",
                version: viewsiteversionmetadata.version,
              })
            }
          >
            clonesiteversionmetadatarecord
          </button>
          <button
            onClick={() =>
              handleClick({
                type: "showlistsiteversionheaders",
                version: viewsiteversionmetadata.version,
                name: "siteversionheader",
              })
            }
          >
            showlistsiteversionheaders
          </button>
          <button
            onClick={() =>
              handleClick({
                type: "showlistsiteversionpages",
                version: viewsiteversionmetadata.version,
                name: "siteversionpage",
              })
            }
          >
            showlistsiteversionpages
          </button>
          <button
            onClick={() =>
              handleClick({
                type: "showlistsiteversionfooters",
                version: viewsiteversionmetadata.version,
                name: "siteversionfooter",
              })
            }
          >
            showlistsiteversionfooters
          </button>
        </>
      );
    }
    return (
      <>
        {mainpanelhtml}
        <div>
          <Listsiteversionhchildhtml />
        </div>
      </>
    );
  };

  let Listsiteversionhchildhtml = () => {
    let {
      isshowlisttablechildmetadata,
      listtablechildmetadata,
      viewtablechildmetadata,
      selectedchildmetadataname,
    } = compstate;
    console.log(compstate);
    let listdatahtml = [];
    if (
      isshowlisttablechildmetadata === "true" &&
      (selectedchildmetadataname === "siteversionheader" ||
        selectedchildmetadataname === "siteversionfooter" ||
        selectedchildmetadataname === "siteversionpage")
    ) {
      listdatahtml.push(
        <>
          {" "}
          <div>
            <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
              <div style={{ width: "100%" }}>
                <Newdatahtml
                  columns={[
                    { columnlabel: "Label", columnname: "label" },
                    { columnlabel: "Name", columnname: "name" },
                    {
                      columnlabel: "Type",
                      columnname: "type",
                      columnoptions: [
                        { label: "Text", name: "text" },
                        { label: "Date", name: "date" },
                      ],
                    },
                  ]}
                  type={selectedchildmetadataname}
                  handleClick={(methodprops) =>
                    childhandleClick({
                      ...methodprops,
                      type: "newtablechildmetadata",
                    })
                  }
                  handleChange={(methodprops) =>
                    childhandleChange({
                      ...methodprops,
                      type: "newtablechildmetadata",
                    })
                  }
                />
              </div>

              <div style={{ width: "20%" }}>
                <Listdatahtml
                  listdata={listtablechildmetadata}
                  columns={[
                    { columnlabel: "Label", columnname: "label" },
                    { columnlabel: "Name", columnname: "name" },
                    {
                      columnlabel: "Type",
                      columnname: "type",
                      columnoptions: [
                        { label: "Text", name: "text" },
                        { label: "Date", name: "date" },
                      ],
                    },
                  ]}
                  type={selectedchildmetadataname}
                  handleClick={(methodprops) =>
                    childhandleClick({
                      ...methodprops,
                      type: "listtablechildmetadata",
                    })
                  }
                  handleChange={(methodprops) =>
                    childhandleChange({
                      ...methodprops,
                      type: "listtablechildmetadata",
                    })
                  }
                />
              </div>
              <div style={{ width: "80%" }}>
                <Viewdatahtml
                  viewdata={viewtablechildmetadata}
                  columns={[
                    { columnlabel: "Label", columnname: "label" },
                    { columnlabel: "Name", columnname: "name" },
                    {
                      columnlabel: "Type",
                      columnname: "type",
                      columnoptions: [
                        { label: "Text", name: "text" },
                        { label: "Date", name: "date" },
                      ],
                    },
                  ]}
                  buttons={[
                    { columnlabel: "update", columnname: "updatedata" },
                    { columnlabel: "delete", columnname: "deletedata" },
                    { columnlabel: "clone", columnname: "clonedata" },
                    { columnlabel: "build", columnname: "builddata" },
                  ]}
                  type={selectedchildmetadataname}
                  handleClick={(methodprops) =>
                    childhandleClick({
                      ...methodprops,
                      type: "viewtablechildmetadata",
                    })
                  }
                  handleChange={(methodprops) =>
                    childhandleChange({
                      ...methodprops,
                      type: "viewtablechildmetadata",
                    })
                  }
                />
              </div>
            </div>
          </div>
        </>
      );
    }
    return listdatahtml;
  };

  let handleChange = async (methodprops) => {
    let { type, subtype, value } = methodprops;
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
    if (type === "createsitemetadatalabel") {
      uistate.createsitemetadatalabel = value;
      //setUistate({...uistate, createsitemetadatalabel: value });
    }
    if (type === "createsitemetadataname") {
      uistate.createsitemetadataname = value;
      //  setUistate({ ...uistate, createsitemetadataname: value });
    }
    if (type === "updatesitemetadatalabel") {
      uistate.updatesitemetadatalabel = value;
      //setUistate({...uistate, createsitemetadatalabel: value });
    }
    if (type === "updatesitemetadataname") {
      uistate.updatesitemetadataname = value;
      //  setUistate({ ...uistate, createsitemetadataname: value });
    }
    if (type === "newsiteversionmetadatadescription") {
      uistate.newsiteversionmetadatadescription = value;
      //  setUistate({ ...uistate, createsitemetadataname: value });
    }
    if (type === "editsiteversionmetadata") {
      if (uistate.editsiteversionmetadata === undefined) {
        uistate.editsiteversionmetadata = {};
      }
      uistate.editsiteversionmetadata[subtype] = value;
    }

    console.log(uistate);
  };

  let handleClick = async (methodprops) => {
    let {
      viewtype,
      createtablemetadataname,
      createtablemetadatalabel,
      viewtablemetadata,
      viewsitemetadata,
      viewsiteversionmetadata,
      selectedchildmetadataname,
    } = compstate;
    console.log(uistate);
    let { type, name, version } = methodprops;

    if (
      type === "showlistsiteversionheaders" ||
      type === "showlistsiteversionfooters" ||
      type === "showlistsiteversionpages"
    ) {
      let listtablechildmetadata = await fetchlistmetadatafromDB({
        tablename: name,
        conditionexpression: {
          sitename: viewsitemetadata.name,
          siteversion: viewsiteversionmetadata.version,
        },
      });
      Showui({
        isshowlisttablechildmetadata: "true",
        listtablechildmetadata: listtablechildmetadata,
        selectedchildmetadataname: name,
        viewtablechildmetadata: {},
      });
      uistate.newtablechildmetadata = {};
      uistate.edittablechildmetadata = {};
    } else if (type === "viewdatabasemanager") {
      let listtablemetadata = await fetchlistmetadatafromDB({
        tablename: "tablemetadata",
        conditionexpression: {},
      });
      Showui({ viewtype: type, listtablemetadata: listtablemetadata });
    } else if (type === "viewsitemanager") {
      let listtablemetadata = await fetchlistmetadatafromDB({
        tablename: "sitemetadata",
        conditionexpression: {},
      });
      Showui({ viewtype: type, listsitemetadata: listtablemetadata });
    } else if (type === "createtablemetadatarecord") {
      let createtableresp = await insertrecordNodejs({
        tablename: "tablemetadata",
        tabledatalist: [
          {
            label: uistate.createtablemetadatalabel,
            name: uistate.createtablemetadataname,
          },
        ],
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {
        let listtablemetadata = await fetchlistmetadatafromDB({
          tablename: "tablemetadata",
          conditionexpression: {},
        });
        Showui({ listtablemetadata: listtablemetadata, viewtablemetadata: {} });
        uistate.createtablemetadatalabel = "";
        uistate.createtablemetadataname = "";
      } else {
        console.log(createtableresp.message);
      }
    } else if (type === "updatetablemetadatarecord") {
      let createtableresp = await updaterecordNodejs({
        tablename: "tablemetadata",
        conditionexpression: { name: viewtablemetadata.name },
        updateexpression: { label: uistate.upatetablemetadatalabel },
        upsertifnotfound: true,
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {
        let listtablemetadata = await fetchlistmetadatafromDB({
          tablename: "tablemetadata",
          conditionexpression: {},
        });
        if (listtablemetadata && listtablemetadata.length > 0) {
          for (let i = 0; i < listtablemetadata.length; i++) {
            if (viewtablemetadata.name === listtablemetadata[i].name) {
              viewtablemetadata = listtablemetadata[i];
            }
          }
        }
        Showui({
          listtablemetadata: listtablemetadata,
          viewtablemetadata: viewtablemetadata,
        });
      } else {
        console.log(createtableresp.message);
      }
    } else if (type === "deletetablemetadatarecord") {
      let createtableresp = await deleterecordNodejs({
        tablename: "tablemetadata",
        conditionexpression: { name: name },
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {
        let listtablemetadata = await fetchlistmetadatafromDB({
          tablename: "tablemetadata",
          conditionexpression: {},
        });
        Showui({ listtablemetadata: listtablemetadata, viewtablemetadata: {} });
      } else {
        console.log(createtableresp.message);
      }
    } else if (type === "deletealltablemetadatarecord") {
      let createtableresp = await deleterecordNodejs({
        tablename: "tablemetadata",
        conditionexpression: {},
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {
        let listtablemetadata = await fetchlistmetadatafromDB({
          tablename: "tablemetadata",
          conditionexpression: {},
        });
        Showui({ listtablemetadata: listtablemetadata, viewtablemetadata: {} });
      } else {
        console.log(createtableresp.message);
      }
    } else if (type === "viewtablemetadatarecord") {
      let resp = await gettabledatafromNodejs({
        tablename: "tablemetadata",
        conditionexpression: { name: name },
      });
      console.log(resp);
      let viewtablemetadata = {};
      if (resp.issuccess === "true" && resp.data && resp.data.length > 0) {
        viewtablemetadata = resp.data[0];
        Showui({ viewtablemetadata: viewtablemetadata });
      }
    } else if (type === "showlisttablecolumnmetadata") {
      let resp = await gettabledatafromNodejs({
        tablename: "tablecolumnmetadata",
        conditionexpression: { tablename: name },
      });
      console.log(resp);
      if (resp.issuccess === "true") {
        Showui({
          listtablechildmetadata: resp.data,
          isshowlisttablechildmetadata: "true",
          selectedchildmetadataname: "tablecolumnmetadata",
        });
      }
    } else if (type === "showlisttableitemvalidationmetadata") {
      let resp = await gettabledatafromNodejs({
        tablename: "tableitemvalidationmetadata",
        conditionexpression: { tablename: name },
      });
      console.log(resp);
      if (resp.issuccess === "true") {
        Showui({
          listtablechildmetadata: resp.data,
          isshowlisttablechildmetadata: "true",
          selectedchildmetadataname: "tableitemvalidationmetadata",
        });
      }
    } else if (type === "showlisttableitemdisplaymetadata") {
      let resp = await gettabledatafromNodejs({
        tablename: "tableitemdisplaymetadata",
        conditionexpression: { tablename: name },
      });
      console.log(resp);
      if (resp.issuccess === "true") {
        Showui({
          listtablechildmetadata: resp.data,
          isshowlisttablechildmetadata: "true",
          selectedchildmetadataname: "tableitemdisplaymetadata",
        });
      }
    } else if (type === "createsitemetadatarecord") {
      let createsiteresp = await insertrecordNodejs({
        tablename: "sitemetadata",
        tabledatalist: [
          {
            label: uistate.createsitemetadatalabel,
            name: uistate.createsitemetadataname,
          },
        ],
      });
      console.log(createsiteresp);
      if (createsiteresp.issuccess === "true") {
        let listsitemetadata = await fetchlistmetadatafromDB({
          tablename: "sitemetadata",
          conditionexpression: {},
        });
        Showui({
          listsitemetadata: listsitemetadata,
          viewsitemetadata: {},
          viewsiteversionmetadata: {},
          listsiteversionmetadata: [],
        });
        uistate.createsitemetadatalabel = "";
        uistate.createsitemetadataname = "";
      } else {
        console.log(createsiteresp.message);
      }
    } else if (type === "updatesitemetadatarecord") {
      let createsiteresp = await updaterecordNodejs({
        tablename: "sitemetadata",
        conditionexpression: { name: viewsitemetadata.name },
        updateexpression: { label: uistate.updatesitemetadatalabel },
        upsertifnotfound: true,
      });
      console.log(createsiteresp);
      if (createsiteresp.issuccess === "true") {
        let listsitemetadata = await fetchlistmetadatafromDB({
          tablename: "sitemetadata",
          conditionexpression: {},
        });
        if (listsitemetadata && listsitemetadata.length > 0) {
          for (let i = 0; i < listsitemetadata.length; i++) {
            if (viewsitemetadata.name === listsitemetadata[i].name) {
              viewsitemetadata = listsitemetadata[i];
            }
          }
        }
        Showui({
          listsitemetadata: listsitemetadata,
          viewsitemetadata: viewsitemetadata,
          viewsiteversionmetadata: {},
          listsiteversionmetadata: [],
        });
      } else {
        console.log(createsiteresp.message);
      }
    } else if (type === "deletesitemetadatarecord") {
      let createsiteresp = await deleterecordNodejs({
        tablename: "sitemetadata",
        conditionexpression: { name: viewsitemetadata.name },
      });
      console.log(createsiteresp);
      if (createsiteresp.issuccess === "true") {
        let listsitemetadata = await fetchlistmetadatafromDB({
          tablename: "sitemetadata",
          conditionexpression: {},
        });
        Showui({
          listsitemetadata: listsitemetadata,
          viewsitemetadata: {},
          viewsiteversionmetadata: {},
          listsiteversionmetadata: [],
        });
      } else {
        console.log(createsiteresp.message);
      }
    } else if (type === "deleteallsitemetadatarecord") {
      let createsiteresp = await deleterecordNodejs({
        tablename: "sitemetadata",
        conditionexpression: {},
      });
      console.log(createsiteresp);
      if (createsiteresp.issuccess === "true") {
        let listsitemetadata = await fetchlistmetadatafromDB({
          tablename: "sitemetadata",
          conditionexpression: {},
        });
        Showui({
          listsitemetadata: listsitemetadata,
          viewsitemetadata: {},
          viewsiteversionmetadata: {},
          listsiteversionmetadata: [],
        });
      } else {
        console.log(createsiteresp.message);
      }
    } else if (type === "viewsitemetadatarecord") {
      let resp = await gettabledatafromNodejs({
        tablename: "sitemetadata",
        conditionexpression: { name: name },
      });
      console.log(resp);
      let viewsitemetadata = {};
      if (resp.issuccess === "true" && resp.data && resp.data.length > 0) {
        viewsitemetadata = resp.data[0];
      }

      let versionresp = await gettabledatafromNodejs({
        tablename: "siteversionmetadata",
        conditionexpression: { sitename: name },
      });
      console.log(versionresp);

      let listsiteversionmetadata = [];

      if (
        versionresp.issuccess === "true" &&
        versionresp.data &&
        versionresp.data.length > 0
      ) {
        listsiteversionmetadata = versionresp.data;
      }

      Showui({
        viewsitemetadata: viewsitemetadata,
        listsiteversionmetadata: listsiteversionmetadata,
        viewsiteversionmetadata: {},
      });
    } else if (type === "viewsiteversionmetadatarecord") {
      let resp = await gettabledatafromNodejs({
        tablename: "siteversionmetadata",
        conditionexpression: {
          sitename: viewsitemetadata.name,
          version: version,
        },
      });
      console.log(resp);
      let viewsiteversionmetadata = {};
      if (resp.issuccess === "true" && resp.data && resp.data.length > 0) {
        viewsiteversionmetadata = resp.data[0];
      }

      Showui({
        viewsiteversionmetadata: viewsiteversionmetadata,
        isshowlisttablechildmetadata: "false",
        listtablechildmetadata: [],
        selectedchildmetadataname: "",
        viewtablechildmetadata: {},
        newtablechildmetadata: {},
        edittablechildmetadata: {},
      });
    } else if (type === "createsiteversionmetadatarecord") {
      let oldlistsiteversionmetadata = await fetchlistmetadatafromDB({
        tablename: "siteversionmetadata",
        conditionexpression: { sitename: viewsitemetadata.name },
      });
      let lastmaxversion = 0;
      if (oldlistsiteversionmetadata && oldlistsiteversionmetadata.length > 0) {
        for (let i = 0; i < oldlistsiteversionmetadata.length; i++) {
          if (oldlistsiteversionmetadata[i].version > lastmaxversion) {
            lastmaxversion = oldlistsiteversionmetadata[i].version;
          }
        }
      }

      let createsiteresp = await insertrecordNodejs({
        tablename: "siteversionmetadata",
        tabledatalist: [
          {
            sitename: viewsitemetadata.name,
            description: uistate.newsiteversionmetadatadescription,
            version: lastmaxversion + 1,
            isactive: "false",
          },
        ],
      });
      console.log(createsiteresp);
      if (createsiteresp.issuccess === "true") {
        let listsiteversionmetadata = await fetchlistmetadatafromDB({
          tablename: "siteversionmetadata",
          conditionexpression: { sitename: viewsitemetadata.name },
        });
        Showui({
          listsiteversionmetadata: listsiteversionmetadata,
          viewsiteversionmetadata: {},
        });
        uistate.newsiteversionmetadatadescription = "";
      } else {
        console.log(createsiteresp.message);
      }
    } else if (type === "cloneactivesiteversionmetadatarecord") {
      let oldlistsiteversionmetadata = await fetchlistmetadatafromDB({
        tablename: "siteversionmetadata",
        conditionexpression: { sitename: viewsitemetadata.name },
      });
      let lastmaxversion = 0;
      if (oldlistsiteversionmetadata && oldlistsiteversionmetadata.length > 0) {
        for (let i = 0; i < oldlistsiteversionmetadata.length; i++) {
          if (oldlistsiteversionmetadata[i].version > lastmaxversion) {
            lastmaxversion = oldlistsiteversionmetadata[i].version;
          }
        }
      }

      //get currentsiteverionmetadata
      let currentsiteversionmetadata = await fetchlistmetadatafromDB({
        tablename: "siteversionmetadata",
        conditionexpression: {
          sitename: viewsitemetadata.name,
          isactive: "true",
        },
      });

      currentsiteversionmetadata[0].version = lastmaxversion + 1;
      currentsiteversionmetadata[0].isactive = "false";
      delete currentsiteversionmetadata[0].id;
      delete currentsiteversionmetadata[0]._id;
      let createsiteresp = await insertrecordNodejs({
        tablename: "siteversionmetadata",
        tabledatalist: [currentsiteversionmetadata[0]],
      });
      console.log(createsiteresp);
      if (createsiteresp.issuccess === "true") {
        let listsiteversionmetadata = await fetchlistmetadatafromDB({
          tablename: "siteversionmetadata",
          conditionexpression: { sitename: viewsitemetadata.name },
        });
        Showui({
          listsiteversionmetadata: listsiteversionmetadata,
          viewsiteversionmetadata: {},
        });
        uistate.newsiteversionmetadatadescription = "";
      } else {
        console.log(createsiteresp.message);
      }
    } else if (type === "clonesiteversionmetadatarecord") {
      let oldlistsiteversionmetadata = await fetchlistmetadatafromDB({
        tablename: "siteversionmetadata",
        conditionexpression: { sitename: viewsitemetadata.name },
      });
      let lastmaxversion = 0;
      if (oldlistsiteversionmetadata && oldlistsiteversionmetadata.length > 0) {
        for (let i = 0; i < oldlistsiteversionmetadata.length; i++) {
          if (oldlistsiteversionmetadata[i].version > lastmaxversion) {
            lastmaxversion = oldlistsiteversionmetadata[i].version;
          }
        }
      }

      //get currentsiteverionmetadata
      let currentsiteversionmetadata = await fetchlistmetadatafromDB({
        tablename: "siteversionmetadata",
        conditionexpression: {
          sitename: viewsitemetadata.name,
          version: version,
        },
      });
      currentsiteversionmetadata[0].version = lastmaxversion + 1;
      currentsiteversionmetadata[0].isactive = "false";
      delete currentsiteversionmetadata[0].id;
      delete currentsiteversionmetadata[0]._id;
      let createsiteresp = await insertrecordNodejs({
        tablename: "siteversionmetadata",
        tabledatalist: [currentsiteversionmetadata[0]],
      });
      console.log(createsiteresp);
      if (createsiteresp.issuccess === "true") {
        let listsiteversionmetadata = await fetchlistmetadatafromDB({
          tablename: "siteversionmetadata",
          conditionexpression: { sitename: viewsitemetadata.name },
        });
        Showui({
          listsiteversionmetadata: listsiteversionmetadata,
          viewsiteversionmetadata: {},
        });
        uistate.newsiteversionmetadatadescription = "";
      } else {
        console.log(createsiteresp.message);
      }
    } else if (type === "deletesiteversionmetadatarecord") {
      let createsiteresp = await deleterecordNodejs({
        tablename: "siteversionmetadata",
        conditionexpression: {
          sitename: viewsitemetadata.name,
          version: version,
        },
      });
      console.log(createsiteresp);
      if (createsiteresp.issuccess === "true") {
        let listsiteversionmetadata = await fetchlistmetadatafromDB({
          tablename: "siteversionmetadata",
          conditionexpression: { sitename: viewsitemetadata.name },
        });
        Showui({
          listsiteversionmetadata: listsiteversionmetadata,
          viewsiteversionmetadata: {},
        });
      } else {
        console.log(createsiteresp.message);
      }
    } else if (type === "deleteallsiteversionmetadatarecord") {
      let createsiteresp = await deleterecordNodejs({
        tablename: "siteversionmetadata",
        conditionexpression: {
          sitename: viewsitemetadata.name,
        },
      });
      console.log(createsiteresp);
      if (createsiteresp.issuccess === "true") {
        let listsiteversionmetadata = await fetchlistmetadatafromDB({
          tablename: "siteversionmetadata",
          conditionexpression: { sitename: viewsitemetadata.name },
        });
        Showui({ listsiteversionmetadata: listsiteversionmetadata });
      } else {
        console.log(createsiteresp.message);
      }
    } else if (type === "activatesiteversionmetadatarecord") {
      let inactiveoldsiteresp = await updaterecordNodejs({
        tablename: "siteversionmetadata",
        conditionexpression: {
          sitename: viewsitemetadata.name,
          isactive: "true",
        },
        updateexpression: { isactive: "false" },
        upsertifnotfound: false,
      });

      if (inactiveoldsiteresp.issuccess === "true") {
        let createsiteresp = await updaterecordNodejs({
          tablename: "siteversionmetadata",
          conditionexpression: {
            sitename: viewsitemetadata.name,
            version: version,
          },
          updateexpression: { isactive: "true" },
          upsertifnotfound: true,
        });
        console.log(createsiteresp);
        if (createsiteresp.issuccess === "true") {
          let listsiteversionmetadata = await fetchlistmetadatafromDB({
            tablename: "siteversionmetadata",
            conditionexpression: { sitename: viewsitemetadata.name },
          });
          Showui({ listsiteversionmetadata: listsiteversionmetadata });
        } else {
          console.log(createsiteresp.message);
        }
      }
    } else if (type === "updatesiteversionmetadatarecord") {
      let createsiteresp = await updaterecordNodejs({
        tablename: "siteversionmetadata",
        conditionexpression: {
          sitename: viewsitemetadata.name,
          version: version,
        },
        updateexpression: uistate.editsiteversionmetadata,
        upsertifnotfound: false,
      });

      if (createsiteresp.issuccess === "true") {
        let listsiteversionmetadata = await fetchlistmetadatafromDB({
          tablename: "siteversionmetadata",
          conditionexpression: { sitename: viewsitemetadata.name },
        });
        Showui({
          listsiteversionmetadata: listsiteversionmetadata,
          viewsiteversionmetadata: {},
        });
      } else {
        console.log(createsiteresp.message);
      }
    }
  };

  let childhandleChange = async (methodprops) => {
    let { type, name, value } = methodprops;
    alltypecompconsolelog("childhandleChange", methodprops);
    if (type === "newtablechildmetadata") {
      uistate.newtablechildmetadata[name] = value;
      //setUistate({...uistate, createtablemetadatalabel: value });
    }
    if (type === "viewtablechildmetadata") {
      uistate.edittablechildmetadata[name] = value;
      //setUistate({...uistate, createtablemetadatalabel: value });
    }

    console.log(uistate);
  };

  let childhandleClick = async (methodprops) => {
    alltypecompconsolelog("childhandleClick", methodprops);
    let {
      viewtype,
      createtablemetadataname,
      createtablemetadatalabel,
      viewtablemetadata,
      viewtablechildmetadata,
      selectedchildmetadataname,
      viewsitemetadata,
      viewsiteversionmetadata,
    } = compstate;

    console.log(uistate);
    let { type, name, value } = methodprops;
    let siteselectedchildmetadataname = false;
    if (
      selectedchildmetadataname === "siteversionheader" ||
      selectedchildmetadataname === "siteversionfooter" ||
      selectedchildmetadataname === "siteversionpage"
    ) {
      siteselectedchildmetadataname = true;
    }
    if (type === "newtablechildmetadata" && name === "createdata") {
      let createconditionexpression = {};
      if (siteselectedchildmetadataname) {
        createconditionexpression = {
          sitename: viewsitemetadata.name,
          siteversion: viewsiteversionmetadata.version,
        };
      } else {
        createconditionexpression = { tablename: viewtablemetadata.name };
      }

      let newtablechildmetadata = uistate.newtablechildmetadata;
      if (siteselectedchildmetadataname) {
        newtablechildmetadata.sitename = viewsitemetadata.name;
        newtablechildmetadata.siteversion = viewsiteversionmetadata.version;
      } else {
        newtablechildmetadata.tablename = viewtablemetadata.name;
      }
      let createtableresp = await insertrecordNodejs({
        tablename: selectedchildmetadataname,
        tabledatalist: [newtablechildmetadata],
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {
        let resp = await gettabledatafromNodejs({
          tablename: selectedchildmetadataname,
          conditionexpression: createconditionexpression,
        });
        console.log(resp);
        if (resp.issuccess === "true" && resp.data) {
          Showui({ listtablechildmetadata: resp.data });
        }
      } else {
        console.log(createtableresp.message);
      }
    } else if (type === "viewtablechildmetadata" && name === "clonedata") {
      let createconditionexpression = {};
      if (siteselectedchildmetadataname) {
        createconditionexpression = {
          sitename: viewsitemetadata.name,
          siteversion: viewsiteversionmetadata.version,
        };
      } else {
        createconditionexpression = { tablename: viewtablemetadata.name };
      }

      let viewtablechildmetadatajs = JSON.parse(
        JSON.stringify(compstate.viewtablechildmetadata)
      );
      viewtablechildmetadatajs.name =
        viewtablechildmetadatajs.name + currenttimeiniso();
      if (siteselectedchildmetadataname) {
        viewtablechildmetadatajs.sitename = viewsitemetadata.name;
        viewtablechildmetadatajs.siteversion = viewsiteversionmetadata.version;
      } else {
        viewtablechildmetadatajs.tablename = viewtablemetadata.name;
      }
      delete viewtablechildmetadatajs.id;
      delete viewtablechildmetadatajs._id;
      let createtableresp = await insertrecordNodejs({
        tablename: selectedchildmetadataname,
        tabledatalist: [viewtablechildmetadatajs],
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {
        let resp = await gettabledatafromNodejs({
          tablename: selectedchildmetadataname,
          conditionexpression: createconditionexpression,
        });
        console.log(resp);
        if (resp.issuccess === "true" && resp.data) {
          Showui({ listtablechildmetadata: resp.data });
        }
      } else {
        console.log(createtableresp.message);
      }
    } else if (type === "newtablechildmetadata" && name === "deletealldata") {
      let deleteconditionexpression = {};
      if (siteselectedchildmetadataname) {
        deleteconditionexpression = {
          sitename: viewsitemetadata.name,
          siteversion: viewsiteversionmetadata.version,
        };
      } else {
        deleteconditionexpression = { tablename: viewtablemetadata.name };
      }
      let createtableresp = await deleterecordNodejs({
        tablename: selectedchildmetadataname,
        conditionexpression: deleteconditionexpression,
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {
        let resp = await gettabledatafromNodejs({
          tablename: selectedchildmetadataname,
          conditionexpression: deleteconditionexpression,
        });
        if (resp.issuccess === "true" && resp.data) {
          Showui({
            listtablechildmetadata: resp.data,
            viewtablechildmetadata: {},
            newtablechildmetadata: {},
            edittablechildmetadata: {},
          });
        }
      } else {
        console.log(createtableresp.message);
      }
    } else if (type === "listtablechildmetadata" && name === "viewdata") {
      let viewconditionexpression = {};
      if (siteselectedchildmetadataname) {
        viewconditionexpression = {
          sitename: viewsitemetadata.name,
          siteversion: viewsiteversionmetadata.version,
          name: value,
        };
      } else {
        viewconditionexpression = {
          tablename: viewtablemetadata.name,
          name: value,
        };
      }

      let resp = await gettabledatafromNodejs({
        tablename: selectedchildmetadataname,
        conditionexpression: viewconditionexpression,
      });
      console.log(resp);
      let viewtablechildmetadata = {};
      if (resp.issuccess === "true" && resp.data && resp.data.length > 0) {
        viewtablechildmetadata = resp.data[0];
        Showui({
          viewtablechildmetadata: viewtablechildmetadata,
          newtablechildmetadata: {},
          edittablechildmetadata: {},
        });
      }
    } else if (type === "viewtablechildmetadata" && name === "updatedata") {
      let updateconditionexpression = {};
      if (siteselectedchildmetadataname) {
        updateconditionexpression = {
          sitename: viewsitemetadata.name,
          siteversion: viewsiteversionmetadata.version,
          name: viewtablechildmetadata.name,
        };
      } else {
        updateconditionexpression = {
          tablename: viewtablemetadata.name,
          name: viewtablechildmetadata.name,
        };
      }

      let viewconditionexpression = {};
      if (siteselectedchildmetadataname) {
        viewconditionexpression = {
          sitename: viewsitemetadata.name,
          siteversion: viewsiteversionmetadata.version,
        };
      } else {
        viewconditionexpression = { tablename: viewtablemetadata.name };
      }

      let createtableresp = await updaterecordNodejs({
        tablename: selectedchildmetadataname,
        conditionexpression: updateconditionexpression,
        updateexpression: uistate.edittablechildmetadata,
        upsertifnotfound: true,
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {
        let resp = await gettabledatafromNodejs({
          tablename: selectedchildmetadataname,
          conditionexpression: viewconditionexpression,
        });
        console.log(resp);
        if (resp.issuccess === "true") {
          Showui({
            listtablechildmetadata: resp.data,
            viewtablechildmetadata: {},
            newtablechildmetadata: {},
            edittablechildmetadata: {},
          });
        }
      } else {
        console.log(createtableresp.message);
      }
    } else if (type === "viewtablechildmetadata" && name === "deletedata") {
      let updateconditionexpression = {};
      if (siteselectedchildmetadataname) {
        updateconditionexpression = {
          sitename: viewsitemetadata.name,
          siteversion: viewsiteversionmetadata.version,
          name: viewtablechildmetadata.name,
        };
      } else {
        updateconditionexpression = {
          tablename: viewtablemetadata.name,
          name: viewtablechildmetadata.name,
        };
      }

      let viewconditionexpression = {};
      if (siteselectedchildmetadataname) {
        viewconditionexpression = {
          sitename: viewsitemetadata.name,
          siteversion: viewsiteversionmetadata.version,
        };
      } else {
        viewconditionexpression = { tablename: viewtablemetadata.name };
      }

      let createtableresp = await deleterecordNodejs({
        tablename: selectedchildmetadataname,
        conditionexpression: updateconditionexpression,
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {
        let resp = await gettabledatafromNodejs({
          tablename: selectedchildmetadataname,
          conditionexpression: viewconditionexpression,
        });
        console.log(resp);
        if (resp.issuccess === "true") {
          Showui({
            listtablechildmetadata: resp.data,
            viewtablechildmetadata: {},
            newtablechildmetadata: {},
            edittablechildmetadata: {},
          });
        }
      } else {
        console.log(createtableresp.message);
      }
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
          <button onClick={() => handleClick({ type: "viewdatabasemanager" })}>
            viewdatabasemanager
          </button>

          <button onClick={() => handleClick({ type: "viewsitemanager" })}>
            viewsitemanager
          </button>
          <button onClick={() => handleClick({ type: "viewrichtextarea" })}>
          viewrichtextarea
          </button>
        </div>

        {viewtype === "viewdatabasemanager" ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              backgroundColor: "red",
              flexWrap: "wrap",
            }}
          >
            <div style={{ width: "100%", backgroundColor: "yellow" }}>
              <Newtablemetadatahtml />
            </div>
            <div style={{ width: "20%", backgroundColor: "yellow" }}>
              <Listtablemetadatahtml />
            </div>
            <div style={{ width: "80%", backgroundColor: "lightgrey" }}>
              <Viewtablemetadatahtml />
            </div>
          </div>
        ) : (
          <></>
        )}

        {viewtype === "viewsitemanager" ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              backgroundColor: "red",
              flexWrap: "wrap",
            }}
          >
            <div style={{ width: "100%", backgroundColor: "yellow" }}>
              <Newsitemetadatahtml />
            </div>
            <div style={{ width: "20%", backgroundColor: "yellow" }}>
              <Listsitemetadatahtml />
            </div>
            <div style={{ width: "80%", backgroundColor: "lightgrey" }}>
              <Viewsitemetadatahtml />
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default App;
