import React, { Component, useState, useEffect, createRef } from "react";
import {dragdropHandler2} from "./logic";
import {
  alltypecompconsolelog, replacedynamictext, gettabledatafromDatabase, alltypecompClickHandler,
  allowDrop, dragstart, dragEnter, dragLeave, inserttabledatainDatabase
} from "./logic";

function createMarkup() {
  return { __html: "First &middot; Second" };
}

function MyComponent() {
  return (
    <div dangerouslySetInnerHTML={{ __html: "First &middot; Secoffnd" }} />
  );
}

export function Richtextareacomp() {
  const [compstate, setCompstate] = useState({
    viewitem: {},
    htmlarray: [
      {
        type: "div",
        innerhtml: "Test",
        style: { backgroundColor: "red" },
        order: 0,
      },
      {
        type: "div",
        innerhtml: "Test1",
        style: { backgroundColor: "yellow" },
        order: 1,
      },
    ],
    popularstylesinputoptions: {
      color: {
        paramname: "color",
        options: ["red", "blue", "yellow", "green"],
      },
      bgcolor: {
        paramname: "backgroundColor",
        options: ["red", "blue", "yellow", "green"],
      },
      fontsize: { paramname: "fontSize", options: ["10px", "20px", "30px"] },
      height: {
        paramname: "height",
        options: ["50px", "100px", "25%", "50%", "100%", "50vh", "100vh"],
      },
      width: {
        paramname: "width",
        options: ["50px", "100px", "25%", "50%", "100%", "50vw", "100vw"],
      },
    },
    popularstyles: {
      general: [
        {
          type: "div",
          innerhtml: "Test",
          style: { backgroundColor: "brown" },
          order: 0,
        },
        {
          type: "div",
          innerhtml: "Test1",
          style: { backgroundColor: "blue" },
          order: 1,
        },
        {
          type: "div",
          innerhtml: "Test",
          style: { color: "orange" },
          order: 2,
        },
        {
          type: "div",
          innerhtml: "Test",
          style: { fontWeight: "bold" },
          order: 3,
        },
      ],
      color: [
        {
          type: "div",
          innerhtml: "Test",
          style: { color: "blue" },
          order: 0,
        },
      ],

      bgcolor: [
        {
          type: "div",
          innerhtml: "Test",
          style: { backgroundColor: "blue" },
          order: 0,
        },
        {
          type: "div",
          innerhtml: "Test",
          style: { backgroundColor: "yellow" },
          order: 1,
        },
      ],
      font: [
        {
          type: "div",
          innerhtml: "Test",
          style: { fontWeight: "bold" },
          order: 0,
        },
        {
          type: "div",
          innerhtml: "Test",
          style: { fontWeight: "normal" },
          order: 1,
        },
      ],
      fontsize: [
        {
          type: "div",
          innerhtml: "Test",
          style: { fontSize: "10px" },
          order: 0,
        },
        {
          type: "div",
          innerhtml: "Test",
          style: { fontSize: "20px" },
          order: 1,
        },
      ],
      align: [
        {
          type: "div",
          innerhtml: "Test",
          style: { textAlign: "left" },
          order: 0,
        },
        {
          type: "div",
          innerhtml: "Test",
          style: { textAlign: "center" },
          order: 1,
        },
        {
          type: "div",
          innerhtml: "Test",
          style: { textAlign: "right" },
          order: 2,
        },
      ],
      height: [
        {
          type: "div",
          innerhtml: "100px",
          style: { height: "100px", overflow: "auto" },
          order: 0,
        },
        {
          type: "div",
          innerhtml: "200px",
          style: { height: "200px", overflow: "auto" },
          order: 1,
        },
        {
          type: "div",
          innerhtml: "25%",
          style: { height: "25%", overflow: "auto" },
          order: 2,
        },
        {
          type: "div",
          innerhtml: "50%",
          style: { height: "50%", overflow: "auto" },
          order: 3,
        },
        {
          type: "div",
          innerhtml: "100%",
          style: { height: "100%", overflow: "auto" },
          order: 4,
        },
        {
          type: "div",
          innerhtml: "50vh",
          style: { height: "50vh", overflow: "auto" },
          order: 2,
        },
        {
          type: "div",
          innerhtml: "100vh",
          style: { height: "100vh", overflow: "auto" },
          order: 5,
        },
      ],
    },

    selectedpopularstyletype: "general",
  });
  const [uistate, setUistate] = useState({
    edititem: {},
  });

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

  let handleChange = async (methodprops) => {
    console.log(methodprops);
    console.log(uistate);
    let { viewitem } = compstate;
    let { type, subtype, value } = methodprops;
    if (type === "edititem" && subtype == "innerhtml") {
      uistate.edititem.innerhtml = value;
    }
    if (type === "popularstylesinputvalue") {
      uistate.popularstylesinputvalue = value;
    }
  };

  let handleClick = async (methodprops) => {
    let { order, type, value } = methodprops;
    let {
      htmlarray,
      popularstyles,
      popularstylesinputoptions,
      selectedpopularstyletype,
    } = compstate;

    console.log(methodprops);
    console.log(uistate);
    if (type == "selectitem") {
      let viewitem = {};
      for (let i = 0; i < htmlarray.length; i++) {
        let htmlarrayitem = htmlarray[i];
        if (htmlarrayitem.order === order) {
          viewitem = htmlarrayitem;
        }
      }

      Showui({ viewitem: viewitem, isshowotherstyles: true });
      uistate.edititem = viewitem;
      setUistate(uistate);
    } else if (type === "showotherstyles") {
      Showui({ isshowotherstyles: true });
    } 
    else if (type === "duplicatehtmlitem") {
     
      let viewitemjs = {};
      for (let i = 0; i < htmlarray.length; i++) {
        let htmlarrayitem = htmlarray[i];
        if (htmlarrayitem.order === compstate.viewitem.order) {
          viewitemjs = htmlarray[i] ;
        }
      }

      let changingobjectarray = dragdropHandler2({
        changingobjectarray: htmlarray,
        subobject: viewitemjs,
        operationtype: "add",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });
   console.log(changingobjectarray);

      Showui({ htmlarray: changingobjectarray, viewitem: {}, isshowotherstyles: false });
      uistate.edititem = {};
      setUistate(uistate);
    } 
    else if (type === "deletehtmlitem") {
     
      let viewitemjs = {};
      for (let i = 0; i < htmlarray.length; i++) {
        let htmlarrayitem = htmlarray[i];
        if (htmlarrayitem.order === compstate.viewitem.order) {
          viewitemjs = htmlarray[i] ;
        }
      }

      let changingobjectarray = dragdropHandler2({
        changingobjectarray: htmlarray,
        subobject: viewitemjs,
        operationtype: "delete",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });
   console.log(changingobjectarray);

      Showui({ htmlarray: changingobjectarray, viewitem: {}, isshowotherstyles: false });
      uistate.edititem = {};
      setUistate(uistate);
    } 
    else if (type === "addhtmlitem") {
    }
    else if (type === "savefromedititem") {
      let viewitem = {};
      for (let i = 0; i < htmlarray.length; i++) {
        let htmlarrayitem = htmlarray[i];
        if (htmlarrayitem.order === compstate.viewitem.order) {
          htmlarray[i] = uistate.edititem;
        }
      }

      Showui({ htmlarray: htmlarray, viewitem: {}, isshowotherstyles: false });
      uistate.edititem = {};
      setUistate(uistate);
    } else if (type === "showinpopularstyles") {
      Showui({ viewitem: uistate.edititem });
    } else if (type === "savefrompopularstyles") {
      let popularstylesitemjs = {};
      for (let j = 0; j < popularstyles[selectedpopularstyletype].length; j++) {
        if (popularstyles[selectedpopularstyletype][j].order === order) {
          popularstylesitemjs = popularstyles[selectedpopularstyletype][j];
        }
      }
      let htmlarrayjs = JSON.parse(JSON.stringify(htmlarray));
      let viewitemjs = {};
      for (let i = 0; i < htmlarrayjs.length; i++) {
        let htmlarrayitem = htmlarrayjs[i];
        if (htmlarrayitem.order === compstate.viewitem.order) {
          htmlarrayjs[i] = compstate.viewitem;

          let returnedTarget = Object.assign(
            {},
            htmlarrayjs[i].style,
            popularstylesitemjs.style
          );

          if (selectedpopularstyletype === "general") {
            returnedTarget = popularstylesitemjs.style;
          }

          htmlarrayjs[i].style = returnedTarget;
          console.log(returnedTarget);
          viewitemjs = htmlarrayjs[i];
        }
      }

      Showui({
        htmlarray: htmlarrayjs,
        viewitem: viewitemjs,
      });
      uistate.edititem = viewitemjs;
      setUistate(uistate);
    } else if (type === "selectpopularstyletype") {
      Showui({ selectedpopularstyletype: value });
    } else if (type === "savefrompopularstylesinputvalue") {
      if (
        selectedpopularstyletype &&
        selectedpopularstyletype !== "" &&
        popularstylesinputoptions[selectedpopularstyletype] &&
        uistate.popularstylesinputvalue &&
        uistate.popularstylesinputvalue != ""
      ) {
        let currentpopularstylesinputoptions =
          popularstylesinputoptions[selectedpopularstyletype];
        let popularstylesinputvalueobject = {};
        popularstylesinputvalueobject[
          currentpopularstylesinputoptions.paramname
        ] = uistate.popularstylesinputvalue;

        let htmlarrayjs = JSON.parse(JSON.stringify(htmlarray));
        let viewitemjs = {};
        for (let i = 0; i < htmlarrayjs.length; i++) {
          let htmlarrayitem = htmlarrayjs[i];
          if (htmlarrayitem.order === compstate.viewitem.order) {
            htmlarrayjs[i] = compstate.viewitem;

            let returnedTarget = Object.assign(
              {},
              htmlarrayjs[i].style,
              popularstylesinputvalueobject
            );

            htmlarrayjs[i].style = returnedTarget;
            console.log(returnedTarget);
            viewitemjs = htmlarrayjs[i];
          }
        }

        Showui({
          htmlarray: htmlarrayjs,
          viewitem: viewitemjs,
        });
        uistate.edititem = viewitemjs;
        setUistate(uistate);
      }
    }
    else if (type === "executeallowdrop") {
      allowDrop(methodprops.e);
    } else if (type === "executedragstart" ) {
      dragstart(methodprops.e);
    } else if (type === "executedragenter" ) {
      dragEnter(methodprops.e);
    } else if (type === "executedragleave") {
      dragLeave(methodprops.e);
    }
  };

  let Editpanel = (methodprops) => {
    let { viewitem } = compstate;

    let mainpanelhtml = [];

    if (viewitem && Object.keys(viewitem).length > 0) {
      mainpanelhtml.push(
        <textarea
          style={{ width: "90%", height: "50px", padding: "10px" }}
          defaultValue={viewitem.innerhtml}
          onChange={(e) =>
            handleChange({
              type: "edititem",
              subtype: "innerhtml",
              value: e.target.value,
            })
          }
        />
      );
    }

    return <div style={{ padding: "0px", width: "100%" }}>{mainpanelhtml}</div>;
  };

  let Editcontentpanel = (methodprops) => {
    let { viewitem } = compstate;

    let mainpanelhtml = [];

    if (viewitem && Object.keys(viewitem).length > 0) {
   
      mainpanelhtml.push(
        <Itemhtml
        iscontenteditable={true}
          item={viewitem}
          oninputjs={(e) =>
            handleChange({
              type: "edititem",
              subtype: "innerhtml",
              value: e.target.innerHTML,
            })
          }
        />
      );
    }

    return <div style={{ padding: "0px", width: "100%" }}>{mainpanelhtml}</div>;
  };

  let Popularstyleshtml = (methodprops) => {
    let {
      isshowotherstyles,
      viewitem,
      popularstyles,
      popularstylesinputoptions,
      selectedpopularstyletype,
    } = compstate;
    let { edititem } = uistate;
    let mainpanelhtml = [];

    if (
      isshowotherstyles === true &&
      selectedpopularstyletype &&
      selectedpopularstyletype !== ""
    ) {
      for (let j = 0; j < popularstyles[selectedpopularstyletype].length; j++) {
        let popularstylesitem = JSON.parse(
          JSON.stringify(popularstyles[selectedpopularstyletype][j])
        );
        let viewitemjs = JSON.parse(JSON.stringify(viewitem));
        let edititemjs = JSON.parse(JSON.stringify(edititem));

        popularstylesitem.innerhtml = viewitemjs.innerhtml;
        if (edititemjs && Object.keys(edititemjs).length > 0) {
          popularstylesitem.innerhtml = edititemjs.innerhtml;
        }
        popularstylesitem.style.height = undefined;

        mainpanelhtml.push(
          <Itemhtml
            item={popularstylesitem}
            onclickjs={() =>
              handleClick({
                type: "savefrompopularstyles",
                order: popularstylesitem.order,
              })
            }
          />
        );
      }
    }

    return <>{mainpanelhtml}</>;
  };

  let Popularstylesinputhtml = (methodprops) => {
    let {
      isshowotherstyles,
      viewitem,
      popularstyles,
      popularstylesinputoptions,
      selectedpopularstyletype,
    } = compstate;
    let { edititem } = uistate;
    let mainpanelhtml = [];

    if (
      isshowotherstyles === true &&
      selectedpopularstyletype &&
      selectedpopularstyletype !== ""
    ) {
      let popularstylesinputoptionshtml = [];

      let currentpopularstylesinputoptions =
        popularstylesinputoptions[selectedpopularstyletype];
      if (
        currentpopularstylesinputoptions &&
        currentpopularstylesinputoptions.options
      ) {
        for (
          let j = 0;
          j < currentpopularstylesinputoptions.options.length;
          j++
        ) {
          popularstylesinputoptionshtml.push(
            <option value={currentpopularstylesinputoptions.options[j]} />
          );
        }
      }

      mainpanelhtml.push(
        <>
          <input
            style={{ width: "20%" }}
            onChange={(e) =>
              handleChange({
                type: "popularstylesinputvalue",
                value: e.target.value,
              })
            }
            list="popularstylesinputoptions"
          />
          <datalist id="popularstylesinputoptions">
            {popularstylesinputoptionshtml}
          </datalist>
          <div
            style={{ padding: "10px", display: "inline" }}
            onClick={() =>
              handleClick({
                type: "savefrompopularstylesinputvalue",
                value: "align",
              })
            }
          >
            OK
          </div>
        </>
      );
    }

    return <>{mainpanelhtml}</>;
  };

  let Itemhtml = (methodprops) => {
    let { item, onclickjs, onchangejs, oninputjs, iscontenteditable,draggable } = methodprops;

    let mainpanelhtml = [];
    if (item && item.innerhtml) {
      mainpanelhtml.push(
       



<div
          style={{ ...item.style, display: "inline-block" }}
          data-type={"rteitem"}
          data-order={item.order}
          data-dragtemplatename={item.dragtemplatename}
          data-dragtemplatetype={item.dragtemplatetype}
          draggable={draggable}
          onDragOver={(e) =>
            handleClick({ e, type: "executeallowdrop", order: item.order })
          }
          onDragStart={(e) =>
            handleClick({ e, type: "executedragstart", order: item.order })
          }
          onDragEnter={(e) =>
            handleClick({ e, type: "executedragenter", order: item.order })
          }
          onDragLeave={(e) =>
            handleClick({ e, type: "executedragleave", order: item.order })
          }
          onDrop={(e) =>
            handleClick({
              type: "dropalltypecompprepost",
              order: item.order,
              e,
              preposttext: "pre",
            })
          }
        >
         

          <div
          style={item.style}
          onClick={onclickjs}
          onInput={oninputjs}
          contentEditable={iscontenteditable}
           dangerouslySetInnerHTML={{__html: item.innerhtml}} 
        >
          {/* {item.innerhtml} */}
        </div>



        </div>



      );
    }

    return <>{mainpanelhtml}</>;
  };

  let Arrayhtml = (methodprops) => {
    let { htmlarray, selecteditemorder } = compstate;

    console.log(htmlarray);
    let mainpanelhtml = [];
    for (let i = 0; i < htmlarray.length; i++) {
      let htmlarrayitem = htmlarray[i];
      mainpanelhtml.push(
        <Itemhtml
        draggable={true}
          item={htmlarrayitem}
          onclickjs={() =>
            handleClick({ type: "selectitem", order: htmlarrayitem.order })
          }
        />
      );
    }
    return <>{mainpanelhtml}</>;
  };

  let { htmlarray, selecteditemorder } = compstate;
  console.log(compstate);
  console.log(uistate);
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: '<b>testt</b>'}} />

      <div style={{ height: "60vh", overflow: "auto" }}>
        <Arrayhtml htmlarray={htmlarray} />
      </div>

      <div
        style={{
          height: "30vh",
          overflow: "auto",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: "50%", height: "100%", overflow: "auto" }}>
          {/* <Editpanel/> */}

<Editcontentpanel />
          <div onClick={() => handleClick({ type: "savefromedititem" })}>
            OK
          </div>
          <div onClick={() => handleClick({ type: "showinpopularstyles" })}>
            showinpopularstyles
          </div>
          <div onClick={() => handleClick({ type: "duplicatehtmlitem" })}>
            duplicate
          </div>
          <div onClick={() => handleClick({ type: "deletehtmlitem" })}>
          deletehtmlitem
          </div>
          Editcontentpanel
        </div>
        <div style={{ width: "50%", height: "100%", overflow: "auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div
              style={{ padding: "10px" }}
              onClick={() =>
                handleClick({
                  type: "selectpopularstyletype",
                  value: "general",
                })
              }
            >
              General
            </div>
            <div
              style={{ padding: "10px" }}
              onClick={() =>
                handleClick({ type: "selectpopularstyletype", value: "color" })
              }
            >
              color
            </div>
            <div
              style={{ padding: "10px" }}
              onClick={() =>
                handleClick({
                  type: "selectpopularstyletype",
                  value: "bgcolor",
                })
              }
            >
              bgcolor
            </div>
            <div
              style={{ padding: "10px" }}
              onClick={() =>
                handleClick({ type: "selectpopularstyletype", value: "font" })
              }
            >
              font
            </div>
            <div
              style={{ padding: "10px" }}
              onClick={() =>
                handleClick({
                  type: "selectpopularstyletype",
                  value: "fontsize",
                })
              }
            >
              fontsize
            </div>
            <div
              style={{ padding: "10px" }}
              onClick={() =>
                handleClick({ type: "selectpopularstyletype", value: "align" })
              }
            >
              align
            </div>

            <div
              style={{ padding: "10px" }}
              onClick={() =>
                handleClick({ type: "selectpopularstyletype", value: "height" })
              }
            >
              height
            </div>
          </div>
          
          <Popularstyleshtml />
          <Popularstylesinputhtml />
        </div>
      </div>
    </>
  );
}
