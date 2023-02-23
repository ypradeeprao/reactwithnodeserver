import React, { Component, useState, useEffect, createRef } from "react";

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
    popularstyles: [
      {
        type: "div",
        innerhtml: "Test",
        style: { backgroundColor: "brown",  },
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
        style: {  color: "orange" },
        order: 2,
      },
      {
        type: "div",
        innerhtml: "Test",
        style: {  fontWeight: "bold" },
        order: 3,
      },
    ],
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
  };

  let handleClick = async (methodprops) => {
    let { order, type } = methodprops;
    let { htmlarray, popularstyles } = compstate;

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
    } else if (type === "savefromedititem") {
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
    } else if (type === "previewfromedititem") {
      Showui({ viewitem: uistate.edititem });
    } else if (type === "savefrompreviewitem") {
      let popularstylesitemjs = {};
      for (let j = 0; j < popularstyles.length; j++) {
        if (popularstyles[j].order === order) {
          popularstylesitemjs = popularstyles[j];
        }
      }
      let htmlarrayjs = JSON.parse(JSON.stringify(htmlarray));
      for (let i = 0; i < htmlarrayjs.length; i++) {
        let htmlarrayitem = htmlarrayjs[i];
        if (htmlarrayitem.order === compstate.viewitem.order) {
          htmlarrayjs[i] = compstate.viewitem;
         

          let returnedTarget = Object.assign(
            {},
            htmlarrayjs[i].style,
            popularstylesitemjs.style
          );

          htmlarrayjs[i].style = returnedTarget;
          console.log(returnedTarget);
        }
      }

      Showui({
        htmlarray: htmlarrayjs,
        viewitem: {},
        isshowotherstyles: false,
      });
      uistate.edititem = {};
      setUistate(uistate);
    }
  };

  let Editpanel = (methodprops) => {
    let { viewitem } = compstate;

    let mainpanelhtml = [];

    if (viewitem && Object.keys(viewitem).length > 0) {
      mainpanelhtml.push(
        <Itemhtml
          iscontenteditable={true}
          item={viewitem}
          onchangejs={(e) =>
            handleChange({
              type: "edititem",
              subtype: "innerhtml",
              value: e.target.innerHTML,
            })
          }
        />
      );
    }

    return <>{mainpanelhtml}</>;
  };

  let PreviewotherstylesPanel = (methodprops) => {
    let { isshowotherstyles, viewitem, popularstyles } = compstate;
    let { edititem } = uistate;
    let mainpanelhtml = [];
    if (isshowotherstyles === true) {
      for (let j = 0; j < popularstyles.length; j++) {
        let popularstylesitem = JSON.parse(JSON.stringify(popularstyles[j]));
        popularstylesitem.innerhtml = viewitem.innerhtml;
        if (edititem && Object.keys(edititem).length > 0) {
          popularstylesitem.innerhtml = edititem.innerhtml;
        }
        mainpanelhtml.push(
          <Itemhtml
            item={popularstylesitem}
            onclickjs={() =>
              handleClick({
                type: "savefrompreviewitem",
                order: popularstyles[j].order,
              })
            }
          />
        );
      }
    }

    return <>{mainpanelhtml}</>;
  };

  let Itemhtml = (methodprops) => {
    let { item, onclickjs, onchangejs, iscontenteditable } = methodprops;

    let mainpanelhtml = [];
    if (item && item.innerhtml) {
      mainpanelhtml.push(
        <div
          style={item.style}
          onClick={onclickjs}
          onInput={onchangejs}
          contentEditable={iscontenteditable}
        >
          {item.innerhtml}
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
      {/* <div dangerouslySetInnerHTML={{__html: '<b>testt</b>'}} /> */}

      <div style={{ height: "70vh", overflow: "auto" }}>
        <Arrayhtml htmlarray={htmlarray} />
      </div>

      <div
        style={{
          height: "20vh",
          overflow: "auto",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: "50%", height: "20vh", overflow: "auto" }}>
          <Editpanel
            htmlarray={htmlarray}
            selecteditemorder={selecteditemorder}
          />
          <div onClick={() => handleClick({ type: "savefromedititem" })}>
            OK
          </div>
          <div onClick={() => handleClick({ type: "previewfromedititem" })}>
            Preview
          </div>
        </div>
        <div style={{ width: "50%", height: "20vh", overflow: "auto" }}>
          <PreviewotherstylesPanel />
        </div>
      </div>
    </>
  );
}
