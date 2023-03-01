import React, { Component, useState, useEffect, createRef } from "react";
import { dragdropHandler2 } from "./logic";
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
} from "./logic";

window.jsPDF = window.jspdf.jsPDF;
let html2canvas;
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
    viewsectioncolumn: {},
    sectioncolumnsarray: [
      {
        type: "div",
        innerhtml: "Test",
        style: { backgroundColor: "red", display: "inline-flex" },
        order: 0,
      },
      {
        type: "div",
        innerhtml: "Test1",
        style: { backgroundColor: "yellow", display: "inline-flex" },
        order: 1,
      },
    ],
    editsectioncolumnsstyleinputvalues: {
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
    addsectioncolumnsobject: {
      general: [
        {
          type: "div",
          innerhtml: "Paragraph",
          name:"Paragraph",
          style: { display: "inline-flex", padding: "5px" },
          order: 0,
          sectioncolumnmetadata: {
            type: "div",
            innerhtml: "Paragraph",
            style: {width:"100%"},
            order: "",
          },
        },
        {
          type: "div",
          innerhtml: "Underline Heading",
          name:"UnderlineHeading",
          style: { display: "inline-flex", padding: "5px" },
          order: 1,
          sectioncolumnmetadata: {
            type: "div",
            innerhtml: "Underline Heading",
            style: {
              paddingBottom:"5px",
              borderBottom:"1px solid black",
              width:"100%",
              fontWeight:"bold",
              fontSize:"30px"
            },
            order: "",
          },
        },
        {
          type: "div",
          innerhtml: "Underline SubHeading",
          name:"UnderlineSubHeading",
          style: { display: "inline-flex", padding: "5px" },
          order: 2,
          sectioncolumnmetadata: {
            type: "div",
            innerhtml: "Underline SubHeading",
            style: {
              paddingBottom:"5px",
              borderBottom:"1px solid black",
              width:"100%",
              fontWeight:"bold",
              fontSize:"20px"
            },
            order: "",
          },
        },
      ],
      text: [
        {
          type: "div",
          innerhtml: "Paragraph",
          name:"Paragraph",
          style: { display: "inline-flex", padding: "5px" },
          order: 0,
          sectioncolumnmetadata: {
            type: "div",
            innerhtml: "Paragraph",
            style: {},
            order: "",
          },
        },
        {
          type: "div",
          innerhtml: "Inline text",
          name:"Inlinetext",
          style: { display: "inline-flex", padding: "5px" },
          order: 1,
          sectioncolumnmetadata: {
            type: "div",
            innerhtml: "Inline text sample",
            style: {
              display: "inline-flex",
            },
            order: "",
          },
        },
        {
          type: "div",
          innerhtml: "Heading",
          name:"Heading",
          style: { display: "inline-flex", padding: "5px" },
          order: 2,
          sectioncolumnmetadata: {
            type: "div",
            innerhtml: "Heading",
            style: {
              display: "inline-flex",
              fontSize: "50px",
              fontWeight: "bold",
            },
            order: "",
          },
        },
        {
          type: "div",
          innerhtml: "Subheading",
          name:"Subheading",
          style: { display: "inline-flex", padding: "5px" },
          order: 3,
          sectioncolumnmetadata: {
            type: "div",
            innerhtml: "Subheading",
            style: {
              display: "inline-flex",
              fontSize: "30px",
              fontWeight: "bold",
            },
            order: "",
          },
        },
        {
          type: "div",
          innerhtml: "Quote",
          name:"Quote",
          style: { display: "inline-flex", padding: "5px" },
          order: 4,
          sectioncolumnmetadata: {
            type: "div",
            innerhtml: "'Quote'",
            style: {
              display: "inline-flex",
              fontWeight: "bold",
            },
            order: "",
          },
        },
        {
          type: "div",
          innerhtml: "Underlinetext",
          name:"Underlinetext",
          style: { display: "inline-flex", padding: "5px" },
          order: 5,
          sectioncolumnmetadata: {
            type: "div",
            innerhtml: "Underlinetext",
            style: {
              display: "inline-flex",
              textDecoration: "underline",
            },
            order: "",
          },
        },
        {
          type: "div",
          innerhtml: "Heighlightedtext",
          name:"Heighlightedtext",
          style: { display: "inline-flex", padding: "5px" },
          order: 6,
          sectioncolumnmetadata: {
            type: "div",
            innerhtml: "Heighlightedtext",
            style: {
              display: "inline-flex",
              backgroundColor: "#FFFF00",
            },
            order: "",
          },
        },
        {
          type: "div",
          innerhtml: "Boldtext",
          name:"Boldtext",
          style: { display: "inline-flex", padding: "5px" },
          order: 7,
          sectioncolumnmetadata: {
            type: "div",
            innerhtml: "Boldtext",
            style: {
              display: "inline-flex",
              fontWeight: "bold",
            },
            order: "",
          },
        },
      ],
    },
    editsectioncolumnsstyleobject: {
      general: [
        {
          type: "div",
          innerhtml: "bgbrown",
          name:"bgbrown",
          style: { display: "inline-flex", backgroundColor: "brown" },
          order: 0,
          assignstyle: { backgroundColor: "brown" },
        },
        {
          type: "div",
          innerhtml: "bgblue",
          name:"bgblue",
          style: { display: "inline-flex", backgroundColor: "blue" },
          order: 1,
          assignstyle: { backgroundColor: "blue" },
        },
        {
          type: "div",
          innerhtml: "colororange",
          name:"colororange",
          style: { display: "inline-flex", color: "orange" },
          order: 2,
          assignstyle: { color: "orange" },
        },
        {
          type: "div",
          innerhtml: "bold",
          name:"bold",
          style: { display: "inline-flex", fontWeight: "bold" },
          order: 3,
          assignstyle: { fontWeight: "bold" },
        },
      ],
      padding: [
        {
          type: "div",
          innerhtml: "auto",
          name:"auto",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { paddingLeft: "initial",paddingRight: "initial",
          paddingTop: "initial",paddingBottom: "initial" },
        },
        {
          type: "div",
          innerhtml: "10px",
          name:"10px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { paddingLeft: "10px",paddingRight: "10px",
          paddingTop: "10px",paddingBottom: "10px" },
        },
        {
          type: "div",
          innerhtml: "20px",
          name:"20px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { paddingLeft: "20px",paddingRight: "20px",
          paddingTop: "20px",paddingBottom: "20px" },
        },
        {
          type: "div",
          innerhtml: "30px",
          name:"30px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { paddingLeft: "30px",paddingRight: "30px",
          paddingTop: "30px",paddingBottom: "30px" },
        },
      ],
      margin: [
        {
          type: "div",
          innerhtml: "auto",
          name:"auto",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { marginLeft: "initial",marginRight: "initial",
          marginTop: "initial",marginBottom: "initial" },
        },
        {
          type: "div",
          innerhtml: "10px",
          name:"10px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { marginLeft: "10px",marginRight: "10px",
          marginTop: "10px",marginBottom: "10px" },
        },
        {
          type: "div",
          innerhtml: "20px",
          name:"20px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { marginLeft: "20px",marginRight: "20px",
          marginTop: "20px",marginBottom: "20px" },
        },
        {
          type: "div",
          innerhtml: "30px",
          name:"30px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { marginLeft: "30px",marginRight: "30px",
          marginTop: "30px",marginBottom: "30px" },
        },


      ],
      paddinghorizontal: [
        {
          type: "div",
          innerhtml: "auto",
          name:"auto",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { paddingLeft: "initial", paddingRight: "initial" },
        },
        {
          type: "div",
          innerhtml: "10px",
          name:"10px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { paddingLeft: "10px", paddingRight: "10px" },
        },
        {
          type: "div",
          innerhtml: "20px",
          name:"20px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { paddingLeft: "20px", paddingRight: "20px" },
        },
        {
          type: "div",
          innerhtml: "30px",
          name:"30px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { paddingLeft: "30px", paddingRight: "30px" },
        },
      ],
      marginhorizontal: [
        {
          type: "div",
          innerhtml: "auto",
          name:"auto",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { marginLeft: "initial", marginRight: "initial" },
        },
        {
          type: "div",
          innerhtml: "10px",
          name:"10px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { marginLeft: "10px", marginRight: "10px" },
        },
        {
          type: "div",
          innerhtml: "20px",
          name:"20px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { marginLeft: "20px", marginRight: "20px" },
        },
        {
          type: "div",
          innerhtml: "30px",
          name:"30px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { marginLeft: "30px", marginRight: "30px" },
        },


      ],
      paddingvertical: [
        {
          type: "div",
          innerhtml: "auto",
          name:"auto",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { paddingTop: "initial", paddingBottom: "initial" },
        },
        {
          type: "div",
          innerhtml: "10px",
          name:"10px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { paddingTop: "10px", paddingBottom: "10px" },
        },
        {
          type: "div",
          innerhtml: "20px",
          name:"20px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { paddingTop: "20px", paddingBottom: "20px" },
        },
        {
          type: "div",
          innerhtml: "30px",
          name:"30px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { paddingTop: "30px", paddingBottom: "30px" },
        },
      ],
      marginvertical: [
        {
          type: "div",
          innerhtml: "auto",
          name:"auto",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { marginTop: "initial", marginBottom: "initial" },
        },
        {
          type: "div",
          innerhtml: "10px",
          name:"10px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { marginTop: "10px", marginBottom: "10px" },
        },
        {
          type: "div",
          innerhtml: "20px",
          name:"20px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { marginTop: "20px", marginBottom: "20px" },
        },
        {
          type: "div",
          innerhtml: "30px",
          name:"30px",
          style: { display: "inline-flex",  },
          order: 0,
          assignstyle: { marginTop: "30px", marginBottom: "30px" },
        },


      ],
      color: [
        {
          type: "div",
          innerhtml: "colorblue",
          name:"colorblue",
          style: { display: "inline-flex", color: "blue" },
          order: 0,
          assignstyle: { color: "blue" },
        },
      ],

      bgcolor: [
        {
          type: "div",
          innerhtml: "blue",
           name:"blue",
          style: { display: "inline-flex", backgroundColor: "blue" },
          order: 0,
          assignstyle: { backgroundColor: "blue" },
        },
        {
          type: "div",
          innerhtml: "yellow",
          name:"yellow",
          style: { display: "inline-flex", backgroundColor: "yellow" },
          order: 1,
          assignstyle: { backgroundColor: "yellow" },
        },
      ],
      font: [
        {
          type: "div",
          innerhtml: "bold",
          name:"bold",
          style: { display: "inline-flex", fontWeight: "bold" },
          order: 0,
          assignstyle: { fontWeight: "bold" },
        },
        {
          type: "div",
          innerhtml: "normal",
          name:"normal",
          style: { display: "inline-flex", fontWeight: "normal" },
          order: 1,
          assignstyle: { fontWeight: "normal" },
        },
      ],
      fontsize: [
        {
          type: "div",
          innerhtml: "10px",
            name:"10px",
          style: { display: "inline-flex", fontSize: "10px" },
          order: 0,
          assignstyle: { fontSize: "10px" },
        },
        {
          type: "div",
          innerhtml: "20px",
          name:"20px",
          style: { display: "inline-flex", fontSize: "20px" },
          order: 1,
          assignstyle: { fontSize: "20px" },
        },
      ],
      fontfamily: [
        {
          type: "div",
          innerhtml: "times",
          name:"times",
          style: { display: "inline-flex", fontFamily: "times" },
          order: 0,
          assignstyle: { fontFamily: "times" },
        },
        {
          type: "div",
          innerhtml: "courier",
          name:"courier",
          style: { display: "inline-flex", fontFamily: "courier" },
          order: 0,
          assignstyle: { fontFamily: "courier" },
        },
      ],
      align: [
        {
          type: "div",
          innerhtml: "left",
            name:"left",
          style: { display: "inline-flex", textAlign: "left" },
          order: 0,
          assignstyle: { textAlign: "left" },
        },
        {
          type: "div",
          innerhtml: "center",
          name:"center",
          style: { display: "inline-flex", textAlign: "center" },
          order: 1,
          assignstyle: { textAlign: "center" },
        },
        {
          type: "div",
          innerhtml: "right",
          name:"right",
          style: { display: "inline-flex", textAlign: "right" },
          order: 2,
          assignstyle: { textAlign: "right" },
        },
      ],
      width: [
        {
          type: "div",
          innerhtml: "auto",
          name:"auto",
          style: { display: "inline-flex" },
          order: 0,
          assignstyle: { width: "initial" },
        },
        {
          type: "div",
          innerhtml: "100px",
          name:"100px",
          style: { display: "inline-flex" },
          order: 1,
          assignstyle: { width: "100px", overflow: "auto" },
        },
        {
          type: "div",
          innerhtml: "200px",
          name:"200px",
          style: { display: "inline-flex" },
          order: 2,
          assignstyle: { width: "200px", overflow: "auto" },
        },
        {
          type: "div",
          innerhtml: "25%",
          name:"25%",
          style: { display: "inline-flex" },
          order: 3,
          assignstyle: { width: "25%", overflow: "auto" },
        },
        {
          type: "div",
          innerhtml: "50%",
          name:"50%",
          style: { display: "inline-flex" },
          order: 4,
          assignstyle: { width: "50%", overflow: "auto" },
        },
        {
          type: "div",
          innerhtml: "100%",
          name:"100%",
          style: { display: "inline-flex" },
          order: 5,
          assignstyle: { width: "100%", overflow: "auto" },
        },
        {
          type: "div",
          innerhtml: "50vh",
          name:"50vh",
          style: { display: "inline-flex" },
          order: 6,
          assignstyle: { width: "50vh", overflow: "auto" },
        },
        {
          type: "div",
          innerhtml: "100vh",
          name:"100vh",
          style: { display: "inline-flex" },
          order: 7,
          assignstyle: { width: "100vh", overflow: "auto" },
        },
      ],
      height: [
        {
          type: "div",
          innerhtml: "auto",
          name:"auto",
          style: { display: "inline-flex" },
          order: 0,
          assignstyle: { height: "initial" },
        },
        {
          type: "div",
          innerhtml: "100px",
          name:"100px",
          style: { display: "inline-flex" },
          order: 1,
          assignstyle: { height: "100px", overflow: "auto" },
        },
        {
          type: "div",
          innerhtml: "200px",
          name:"200px",
          style: { display: "inline-flex" },
          order: 2,
          assignstyle: { height: "200px", overflow: "auto" },
        },
        {
          type: "div",
          innerhtml: "25%",
          name:"25%",
          style: { display: "inline-flex" },
          order: 3,
          assignstyle: { height: "25%", overflow: "auto" },
        },
        {
          type: "div",
          innerhtml: "50%",
          name:"50%",
          style: { display: "inline-flex" },
          order: 4,
          assignstyle: { height: "50%", overflow: "auto" },
        },
        {
          type: "div",
          innerhtml: "100%",
          name:"100%",
          style: { display: "inline-flex" },
          order: 5,
          assignstyle: { height: "100%", overflow: "auto" },
        },
        {
          type: "div",
          innerhtml: "50vh",
          name:"50vh",
          style: { display: "inline-flex" },
          order: 6,
          assignstyle: { height: "50vh", overflow: "auto" },
        },
        {
          type: "div",
          innerhtml: "100vh",
          name:"100vh",
          style: { display: "inline-flex" },
          order: 7,
          assignstyle: { height: "100vh", overflow: "auto" },
        },
      ],
    },

    editsectioncolumnstyletype: "general",
    showaddsectioncolumnpanel: true,
  });
  const [uistate, setUistate] = useState({
    editsectioncolumn: {},
  });

  useEffect(() => {
    alltypecompconsolelog("sitecomp-useeffect");

      fetchAllsiteversionpageDatafromDB();
   
  }, []);

let fetchAllsiteversionpageDatafromDB = async () =>{


  let listtablechildmetadata = await fetchlistmetadatafromDB({
    tablename: "bookdata",
    conditionexpression: {
      name: "test",
   },
  });
  console.log(listtablechildmetadata);
  let sectioncolumnsarrayjs = [];
  if(listtablechildmetadata && listtablechildmetadata[0] && listtablechildmetadata[0].data){
    sectioncolumnsarrayjs = listtablechildmetadata[0].data;
  }
  Showui({
    sectioncolumnsarray:sectioncolumnsarrayjs
  });
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

  let handleSelect = async (methodprops) => {
    console.log(methodprops);
    let { type, subtype, value,e } = methodprops;
    if (type === "selecttextinsectioncolumn" && subtype === "innerhtml") {
       
      console.log(`You selected: ${e.target.innerHTML}`); 
      console.log(`You selected: ${e.target.selectionStart}`);
      console.log(`You selected: ${e.target.selectionEnd}`);
    }
    
  };

  let handleChange = async (methodprops) => {
    console.log(methodprops);
    console.log(uistate);
    let { viewsectioncolumn } = compstate;
    let { type, subtype, value } = methodprops;
    if (type === "editsectioncolumn" && subtype == "innerhtml") {
      uistate.editsectioncolumn.innerhtml = value;
    }
    if (type === "editsectioncolumnstyleinputvalue") {
      uistate.editsectioncolumnstyleinputvalue = value;
    }
  };

  let handleClick = async (methodprops) => {
    let {name, order, type, value, preposttext } = methodprops;
    let {
      sectioncolumnsarray,
      addsectioncolumnsobject,
      editsectioncolumnsstyleobject,
      editsectioncolumnsstyleinputvalues,
      editsectioncolumnstyletype,
      showaddsectioncolumnpanel,
      addsectioncolumnpaneltype,
    } = compstate;

    console.log(methodprops);
    console.log(uistate);
    

    if (type == "sectioncolumnhandleclick") {
      let viewsectioncolumn = {};
      for (let i = 0; i < sectioncolumnsarray.length; i++) {
        let sectioncolumnarrayitem = sectioncolumnsarray[i];
        if (sectioncolumnarrayitem.order === order) {
          viewsectioncolumn = sectioncolumnarrayitem;
        }
      }

      Showui({
        viewsectioncolumn: viewsectioncolumn,
        isshoweditsectioncolumnstyles: true,
        showaddsectioncolumnpanel: false,
      });
      uistate.editsectioncolumn = viewsectioncolumn;
      setUistate(uistate);
    } else if (type === "showeditsectioncolumnstyles") {
      Showui({
        isshoweditsectioncolumnstyles: true,
        showaddsectioncolumnpanel: false,
      });
    } else if (type === "updatetoserver") {
      let createtableresp = await updaterecordNodejs({
        tablename: "bookdata",
        conditionexpression: { name: "test" },
        updateexpression: { data: sectioncolumnsarray },
        upsertifnotfound: true,
      });
      console.log(createtableresp);
      if (createtableresp.issuccess === "true") {
      }
    }
    else if (type === "generatepdf") {
     
      var doc = new window.jsPDF();          
      var elementHandler = {
        '#ignorePDF': function (element, renderer) {
          return true;
        }
      };
      var source = window.document.getElementsByTagName("body")[0];
      doc.fromHTML(
          source,
          15,
          15,
          {
            'width': 180,'elementHandlers': elementHandler
          });
      
      doc.output("dataurlnewwindow");
      
    }
    else if (type === "addsectioncolumn") {
      Showui({
        showaddsectioncolumnpanel: true,
        addsectioncolumnpaneltype: "general",
        isshoweditsectioncolumnstyles: false,
      });
    } else if (type === "addsectioncolumnpanelitemhandleclick") {
      let addingsubobject = {};
      if (
        showaddsectioncolumnpanel === true &&
        addsectioncolumnpaneltype &&
        addsectioncolumnpaneltype !== ""
      ) {
        for (
          let j = 0;
          j < addsectioncolumnsobject[addsectioncolumnpaneltype].length;
          j++
        ) {
          let addsectioncolumnoptionsitem = JSON.parse(
            JSON.stringify(
              addsectioncolumnsobject[addsectioncolumnpaneltype][j]
            )
          );
          if (addsectioncolumnoptionsitem.name === name) {
            addingsubobject = addsectioncolumnoptionsitem.sectioncolumnmetadata;
          }
        }
      }

      let sectioncolumnarrayjs = JSON.parse(
        JSON.stringify(sectioncolumnsarray)
      );
      console.log(sectioncolumnarrayjs);
      sectioncolumnarrayjs = dragdropHandler2({
        changingobjectarray: sectioncolumnarrayjs,
        subobject: addingsubobject,
        operationtype: "add",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });

      Showui({
        sectioncolumnsarray: sectioncolumnarrayjs,
        viewsectioncolumn: {},
      });
      uistate.editsectioncolumn = {};
      setUistate(uistate);
    } else if (type === "duplicatesectioncolumn") {
      let viewsectioncolumnitemjs = {};
      for (let i = 0; i < sectioncolumnsarray.length; i++) {
        let sectioncolumnarrayitem = sectioncolumnsarray[i];
        if (
          sectioncolumnarrayitem.order === compstate.viewsectioncolumn.order
        ) {
          viewsectioncolumnitemjs = sectioncolumnsarray[i];
        }
      }

      let changingobjectarray = dragdropHandler2({
        changingobjectarray: sectioncolumnsarray,
        subobject: viewsectioncolumnitemjs,
        operationtype: "add",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });
      console.log(changingobjectarray);

      Showui({
        sectioncolumnsarray: changingobjectarray,
        viewsectioncolumn: {},
        isshoweditsectioncolumnstyles: false,
      });
      uistate.editsectioncolumn = {};
      setUistate(uistate);
    } else if (type === "deletesectioncolumn") {
      let viewsectioncolumnitemjs = {};
      for (let i = 0; i < sectioncolumnsarray.length; i++) {
        let sectioncolumnarrayitem = sectioncolumnsarray[i];
        if (
          sectioncolumnarrayitem.order === compstate.viewsectioncolumn.order
        ) {
          viewsectioncolumnitemjs = sectioncolumnsarray[i];
        }
      }

      let changingobjectarray = dragdropHandler2({
        changingobjectarray: sectioncolumnsarray,
        subobject: viewsectioncolumnitemjs,
        operationtype: "delete",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });
      console.log(changingobjectarray);

      Showui({
        sectioncolumnsarray: changingobjectarray,
        viewsectioncolumn: {},
        isshoweditsectioncolumnstyles: false,
      });
      uistate.editsectioncolumn = {};
      setUistate(uistate);
    } else if (type === "dropsectioncolumn") {
      var draggedcomporder = methodprops.e.dataTransfer.getData("order");

      sectioncolumnsarray = dragdropHandler2({
        changingobjectarray: sectioncolumnsarray,
        subobject: {},
        operationtype: "swap",
        preposttext: methodprops.preposttext,
        draggedcomporder: parseInt(draggedcomporder),
        neworder: methodprops.order,
      });

      Showui({
        sectioncolumnsarray: sectioncolumnsarray,
        viewsectioncolumn: {},
        isshoweditsectioncolumnstyles: false,
      });
      uistate.editsectioncolumn = {};
      setUistate(uistate);
    } else if (type === "savefromeditsectioncolumn") {
      let viewsectioncolumn = {};
      for (let i = 0; i < sectioncolumnsarray.length; i++) {
        let sectioncolumnarrayitem = sectioncolumnsarray[i];
        if (
          sectioncolumnarrayitem.order === compstate.viewsectioncolumn.order
        ) {
          sectioncolumnsarray[i] = uistate.editsectioncolumn;
        }
      }

      Showui({
        sectioncolumnsarray: sectioncolumnsarray,
        viewsectioncolumn: {},
        isshoweditsectioncolumnstyles: false,
      });
      uistate.editsectioncolumn = {};
      setUistate(uistate);
    } else if (type === "showineditsectioncolumnstyles") {
      Showui({ viewsectioncolumn: uistate.editsectioncolumn });
    } else if (type === "handleclickfromeditsectioncolumnstyle") {
      let editsectioncolumnstyleitemjs = {};
      for (
        let j = 0;
        j < editsectioncolumnsstyleobject[editsectioncolumnstyletype].length;
        j++
      ) {
        if (
          editsectioncolumnsstyleobject[editsectioncolumnstyletype][j].name ===
          name
        ) {
          editsectioncolumnstyleitemjs =
            editsectioncolumnsstyleobject[editsectioncolumnstyletype][j];
        }
      }
      let sectioncolumnarrayjs = JSON.parse(
        JSON.stringify(sectioncolumnsarray)
      );
      let viewsectioncolumnitemjs = {};
      for (let i = 0; i < sectioncolumnarrayjs.length; i++) {
        let sectioncolumnarrayitem = sectioncolumnarrayjs[i];
        if (
          sectioncolumnarrayitem.order === compstate.viewsectioncolumn.order
        ) {
          sectioncolumnarrayjs[i] = compstate.viewsectioncolumn;
              console.log(editsectioncolumnstyleitemjs);
          let returnedTarget = Object.assign(
            {},
            sectioncolumnarrayjs[i].style,
            editsectioncolumnstyleitemjs.assignstyle
          );

          if (editsectioncolumnstyletype === "general") {
            returnedTarget = editsectioncolumnstyleitemjs.assignstyle;
          }

          sectioncolumnarrayjs[i].style = returnedTarget;
          console.log(returnedTarget);
          viewsectioncolumnitemjs = sectioncolumnarrayjs[i];
        }
      }

      Showui({
        sectioncolumnsarray: sectioncolumnarrayjs,
        viewsectioncolumn: viewsectioncolumnitemjs,
      });
      uistate.editsectioncolumn = viewsectioncolumnitemjs;
      setUistate(uistate);
    } else if (type === "editsectioncolumnstyletype") {
      Showui({ editsectioncolumnstyletype: value });
    } else if (type === "addsectioncolumnpaneltype") {
      Showui({ addsectioncolumnpaneltype: value });
    } else if (type === "savefromeditsectioncolumnstylesinputvalue") {
      if (
        editsectioncolumnstyletype &&
        editsectioncolumnstyletype !== "" &&
        editsectioncolumnsstyleinputvalues[editsectioncolumnstyletype] &&
        uistate.editsectioncolumnstyleinputvalue &&
        uistate.editsectioncolumnstyleinputvalue !== ""
      ) {
        let currenteditsectioncolumnstyleobject =
          editsectioncolumnsstyleinputvalues[editsectioncolumnstyletype];
        let editsectioncolumnstyleinputobject = {};
        editsectioncolumnstyleinputobject[
          currenteditsectioncolumnstyleobject.paramname
        ] = uistate.editsectioncolumnstyleinputvalue;

        let sectioncolumnarrayjs = JSON.parse(
          JSON.stringify(sectioncolumnsarray)
        );
        let viewsectioncolumnitemjs = {};
        for (let i = 0; i < sectioncolumnarrayjs.length; i++) {
          let sectioncolumnarrayitem = sectioncolumnarrayjs[i];
          if (
            sectioncolumnarrayitem.order === compstate.viewsectioncolumn.order
          ) {
            sectioncolumnarrayjs[i] = compstate.viewsectioncolumn;

            let returnedTarget = Object.assign(
              {},
              sectioncolumnarrayjs[i].style,
              editsectioncolumnstyleinputobject
            );

            sectioncolumnarrayjs[i].style = returnedTarget;
            console.log(returnedTarget);
            viewsectioncolumnitemjs = sectioncolumnarrayjs[i];
          }
        }

        Showui({
          sectioncolumnsarray: sectioncolumnarrayjs,
          viewsectioncolumn: viewsectioncolumnitemjs,
        });
        uistate.editsectioncolumn = viewsectioncolumnitemjs;
        setUistate(uistate);
      }
    } else if (type === "executeallowdrop") {
      allowDrop(methodprops.e);
    } else if (type === "executedragstart") {
      dragstart(methodprops.e);
    } else if (type === "executedragenter") {
      dragEnter(methodprops.e);
    } else if (type === "executedragleave") {
      dragLeave(methodprops.e);
    }
  };

  // let Editpanel = (methodprops) => {
  //   let { viewsectioncolumn } = compstate;

  //   let mainpanelhtml = [];

  //   if (viewsectioncolumn && Object.keys(viewsectioncolumn).length > 0) {
  //     mainpanelhtml.push(
  //       <textarea
  //         style={{ width: "90%", height: "50px", padding: "10px" }}
  //         defaultValue={viewsectioncolumn.innerhtml}
  //         onChange={(e) =>
  //           handleChange({
  //             type: "editsectioncolumn",
  //             subtype: "innerhtml",
  //             value: e.target.value,
  //           })
  //         }
  //       />
  //     );
  //   }

  //   return <div style={{ padding: "0px", width: "100%" }}>{mainpanelhtml}</div>;
  // };

  let Editcontentpanel = (methodprops) => {
    let { viewsectioncolumn } = compstate;

    let mainpanelhtml = [];

    if (viewsectioncolumn && Object.keys(viewsectioncolumn).length > 0) {
      mainpanelhtml.push(
        <Itemhtml
          iscontenteditable={true}
          item={viewsectioncolumn}
          oninputjs={(e) =>
            handleChange({
              type: "editsectioncolumn",
              subtype: "innerhtml",
              value: e.target.innerHTML,
            })
          }

          onselectjs={(e) =>
            handleSelect({
              type: "selecttextinsectioncolumn",
              subtype: "innerhtml",
              value: e.target.innerHTML,
              e:e
            })
          }
        />
      );
    }

    return <div style={{ padding: "0px", width: "100%" }}>{mainpanelhtml}</div>;
  };

  let Addsectioncolumnhtml = (methodprops) => {
    let {
      showaddsectioncolumnpanel,
      addsectioncolumnpaneltype,
      addsectioncolumnsobject,
    } = compstate;

    let mainpanelhtml = [];

    if (
      showaddsectioncolumnpanel === true &&
      addsectioncolumnpaneltype &&
      addsectioncolumnpaneltype !== ""
    ) {
      for (
        let j = 0;
        j < addsectioncolumnsobject[addsectioncolumnpaneltype].length;
        j++
      ) {
        let addsectioncolumnoptionsitem = JSON.parse(
          JSON.stringify(addsectioncolumnsobject[addsectioncolumnpaneltype][j])
        );

        addsectioncolumnoptionsitem.style.height = "initial";

        mainpanelhtml.push(
          <Itemhtml
            item={addsectioncolumnoptionsitem}
            onclickjs={() =>
              handleClick({
                type: "addsectioncolumnpanelitemhandleclick",
                name: addsectioncolumnoptionsitem.name,
              })
            }
          />
        );
      }
    }

    return <>{mainpanelhtml}</>;
  };

  let Editsectioncolumnstyleshtml = (methodprops) => {
    let {
      isshoweditsectioncolumnstyles,
      viewsectioncolumn,
      editsectioncolumnsstyleobject,
      editsectioncolumnsstyleinputvalues,
      editsectioncolumnstyletype,
    } = compstate;
    let { editsectioncolumn } = uistate;
    let mainpanelhtml = [];

    if (
      isshoweditsectioncolumnstyles === true &&
      editsectioncolumnstyletype &&
      editsectioncolumnstyletype !== ""
    ) {
      for (
        let j = 0;
        j < editsectioncolumnsstyleobject[editsectioncolumnstyletype].length;
        j++
      ) {
        let editsectioncolumnstylesitem = JSON.parse(
          JSON.stringify(
            editsectioncolumnsstyleobject[editsectioncolumnstyletype][j]
          )
        );
        let viewsectioncolumnitemjs = JSON.parse(
          JSON.stringify(viewsectioncolumn)
        );
        let editsectioncolumnitemjs = JSON.parse(
          JSON.stringify(editsectioncolumn)
        );

        if (
          false &&
          editsectioncolumnstyletype !== "align" &&
          editsectioncolumnstyletype !== "width" &&
          editsectioncolumnstyletype !== "height"
        ) {
          editsectioncolumnstylesitem.innerhtml =
            viewsectioncolumnitemjs.innerhtml;
          if (
            editsectioncolumnitemjs &&
            Object.keys(editsectioncolumnitemjs).length > 0
          ) {
            editsectioncolumnstylesitem.innerhtml =
              editsectioncolumnitemjs.innerhtml;
          }
        }
        editsectioncolumnstylesitem.style.height = "initial";

        mainpanelhtml.push(
          <div style={{ padding: "5px", display: "inline-flex" }}>
            <Itemhtml
              item={editsectioncolumnstylesitem}
              onclickjs={() =>
                handleClick({
                  type: "handleclickfromeditsectioncolumnstyle",
                  name: editsectioncolumnstylesitem.name,
                })
              }
            />
          </div>
        );
      }
    }

    return <>{mainpanelhtml}</>;
  };

  let Editsectioncolumnstylesinputhtml = (methodprops) => {
    let {
      isshoweditsectioncolumnstyles,
      viewsectioncolumn,
      editsectioncolumnsstyleobject,
      editsectioncolumnsstyleinputvalues,
      editsectioncolumnstyletype,
    } = compstate;
    let { editsectioncolumn } = uistate;
    let mainpanelhtml = [];

    if (
      isshoweditsectioncolumnstyles === true &&
      editsectioncolumnstyletype &&
      editsectioncolumnstyletype !== ""
    ) {
      let editsectioncolumnstylesinputoptionshtml = [];

      let currenteditsectioncolumnstyleobject =
        editsectioncolumnsstyleinputvalues[editsectioncolumnstyletype];
      if (
        currenteditsectioncolumnstyleobject &&
        currenteditsectioncolumnstyleobject.options
      ) {
        for (
          let j = 0;
          j < currenteditsectioncolumnstyleobject.options.length;
          j++
        ) {
          editsectioncolumnstylesinputoptionshtml.push(
            <option value={currenteditsectioncolumnstyleobject.options[j]} />
          );
        }
      }

      mainpanelhtml.push(
        <>
          <input
            style={{ width: "20%" }}
            onChange={(e) =>
              handleChange({
                type: "editsectioncolumnstyleinputvalue",
                value: e.target.value,
              })
            }
            list="editsectioncolumnsstyleinputvalues"
          />
          <datalist id="editsectioncolumnsstyleinputvalues">
            {editsectioncolumnstylesinputoptionshtml}
          </datalist>
          <div
            style={{ padding: "10px", display: "inline" }}
            onClick={() =>
              handleClick({
                type: "savefromeditsectioncolumnstylesinputvalue",
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
    let {
      item,
      onclickjs,
      onchangejs,
      onselectjs,
      oninputjs,
      iscontenteditable,
      draggable,
    } = methodprops;

    let mainpanelhtml = [];
    if (item && item.innerhtml) {
      mainpanelhtml.push(
        <div
          style={{ ...item.style }}
          data-type={"rteitem"}
          data-order={item.order}
          data-dragtemplatename={item.dragtemplatename}
          data-dragtemplatetype={item.dragtemplatetype}
          draggable={draggable}
          onDragOver={(e) =>
            handleClick({ e, type: "executeallowdrop", order: item.order, name:item.name })
          }
          onDragStart={(e) =>
            handleClick({ e, type: "executedragstart", order: item.order, name:item.name })
          }
          onDragEnter={(e) =>
            handleClick({ e, type: "executedragenter", order: item.order , name:item.name})
          }
          onDragLeave={(e) =>
            handleClick({ e, type: "executedragleave", order: item.order , name:item.name})
          }
          onDrop={(e) =>
            handleClick({
              type: "dropsectioncolumn",
              order: item.order,
               name:item.name,
              e,
              preposttext: "pre",
            })
          }
        >
          <div
            onSelect={onselectjs}
            onClick={onclickjs}
            onInput={oninputjs}
            contentEditable={iscontenteditable}
            dangerouslySetInnerHTML={{ __html: item.innerhtml }}
          >
            {/* {item.innerhtml} */}
          </div>
        </div>
      );
    }

    return <>{mainpanelhtml}</>;
  };

  let Arrayhtml = (methodprops) => {
    let { sectioncolumnsarray, selecteditemorder } = compstate;

    console.log(sectioncolumnsarray);
    let mainpanelhtml = [];
    for (let i = 0; i < sectioncolumnsarray.length; i++) {
      let sectioncolumnarrayitem = sectioncolumnsarray[i];
      mainpanelhtml.push(
        <Itemhtml
          draggable={true}
          item={sectioncolumnarrayitem}
          onclickjs={() =>
            handleClick({
              type: "sectioncolumnhandleclick",
              order: sectioncolumnarrayitem.order,
            })
          }
        />
      );
    }
    return <>{mainpanelhtml}</>;
  };

  let {
    sectioncolumnsarray,
    showaddsectioncolumnpanel,
    isshoweditsectioncolumnstyles,
    editsectioncolumnstyletype,
  } = compstate;
  console.log(compstate);
  console.log(uistate);
  return (
    <>
     



      <div style={{ height: "60vh", overflow: "auto" }}>
      <div style={{ display: "flex", flexWrap:"wrap" }}>
        <Arrayhtml sectioncolumnsarray={sectioncolumnsarray} />
        </div>
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
          <div
                onClick={() =>
                  handleClick({ type: "updatetoserver" })
                }
              >
                Updatetoserver
              </div>

              <div
                onClick={() =>
                  handleClick({ type: "generatepdf" })
                }
              >
                generatepdf
              </div>
              <div id="content">
   tet
</div>

          <div style={{ display: "flex", flexWrap:"wrap"}}>
          <Editcontentpanel />
          </div>

          {isshoweditsectioncolumnstyles !== true ? (
            <>
              <div onClick={() => handleClick({ type: "addsectioncolumn" })}>
                addsectioncolumn
              </div>
            </>
          ) : (
            <></>
          )}

          {isshoweditsectioncolumnstyles === true ? (
            <>
              <div
                onClick={() =>
                  handleClick({ type: "savefromeditsectioncolumn" })
                }
              >
                OK
              </div>
              <div
                onClick={() =>
                  handleClick({ type: "showineditsectioncolumnstyles" })
                }
              >
                showineditsectioncolumnstyles
              </div>
              <div
                onClick={() => handleClick({ type: "duplicatesectioncolumn" })}
              >
                duplicate
              </div>
              <div onClick={() => handleClick({ type: "deletesectioncolumn" })}>
                deletesectioncolumn
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {showaddsectioncolumnpanel === true ? (
          <>
            <div style={{ width: "50%", height: "100%", overflow: "auto" }}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div
                  style={{ padding: "10px" }}
                  onClick={() =>
                    handleClick({
                      type: "addsectioncolumnpaneltype",
                      value: "general",
                    })
                  }
                >
                  general
                </div>
                <div
                  style={{ padding: "10px" }}
                  onClick={() =>
                    handleClick({
                      type: "addsectioncolumnpaneltype",
                      value: "text",
                    })
                  }
                >
                  text
                </div>
                <div
                  style={{ padding: "10px" }}
                  onClick={() =>
                    handleClick({
                      type: "addsectioncolumnpaneltype",
                      value: "image",
                    })
                  }
                >
                  image
                </div>
                <div
                  style={{ padding: "10px" }}
                  onClick={() =>
                    handleClick({
                      type: "addsectioncolumnpaneltype",
                      value: "video",
                    })
                  }
                >
                  video
                </div>
                <div
                  style={{ padding: "10px" }}
                  onClick={() =>
                    handleClick({
                      type: "addsectioncolumnpaneltype",
                      value: "icon",
                    })
                  }
                >
                  icon
                </div>
                <div
                  style={{ padding: "10px" }}
                  onClick={() =>
                    handleClick({
                      type: "addsectioncolumnpaneltype",
                      value: "input",
                    })
                  }
                >
                  input
                </div>
                <div
                  style={{ padding: "10px" }}
                  onClick={() =>
                    handleClick({
                      type: "addsectioncolumnpaneltype",
                      value: "url",
                    })
                  }
                >
                  url
                </div>
              </div>

              <Addsectioncolumnhtml />
            </div>
          </>
        ) : (
          <></>
        )}

        {isshoweditsectioncolumnstyles === true ? (
          <>
            <div
              style={{
                width: "50%",
                height: "100%",
                overflow: "auto",
                display: "flex",
                 flexWrap:"wrap"
              }}
            >
              <div style={{ width: "30%", height: "100%", overflow: "auto" }}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div
                    style={
                      editsectioncolumnstyletype === "general"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "general",
                      })
                    }
                  >
                    General
                  </div>
                  <div
                    style={
                      editsectioncolumnstyletype === "color"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "color",
                      })
                    }
                  >
                    color
                  </div>
                  <div
                    style={
                      editsectioncolumnstyletype === "bgcolor"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "bgcolor",
                      })
                    }
                  >
                    bgcolor
                  </div>
                  <div
                    style={
                      editsectioncolumnstyletype === "padding"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "padding",
                      })
                    }
                  >
                    padding
                  </div>
                  <div
                    style={
                      editsectioncolumnstyletype === "margin"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "margin",
                      })
                    }
                  >
                    margin
                  </div>
                  <div
                    style={
                      editsectioncolumnstyletype === "paddinghorizontal"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "paddinghorizontal",
                      })
                    }
                  >
                    paddingH
                  </div>
                  <div
                    style={
                      editsectioncolumnstyletype === "marginhorizontal"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "marginhorizontal",
                      })
                    }
                  >
                    marginH
                  </div>
                  <div
                    style={
                      editsectioncolumnstyletype === "paddingvertical"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "paddingvertical",
                      })
                    }
                  >
                    paddingV
                  </div>
                  <div
                    style={
                      editsectioncolumnstyletype === "marginvertical"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "marginvertical",
                      })
                    }
                  >
                    marginV
                  </div>
                  <div
                    style={
                      editsectioncolumnstyletype === "font"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "font",
                      })
                    }
                  >
                    font
                  </div>
                  <div
                    style={
                      editsectioncolumnstyletype === "fontsize"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "fontsize",
                      })
                    }
                  >
                    fontsize
                  </div>
                  <div
                    style={
                      editsectioncolumnstyletype === "fontfamily"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "fontfamily",
                      })
                    }
                  >
                    fontfamily
                  </div>

                  <div
                    style={
                      editsectioncolumnstyletype === "align"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "align",
                      })
                    }
                  >
                    align
                  </div>

                  <div
                    style={
                      editsectioncolumnstyletype === "width"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "width",
                      })
                    }
                  >
                    width
                  </div>

                  <div
                    style={
                      editsectioncolumnstyletype === "height"
                        ? { padding: "10px", backgroundColor: "grey" }
                        : { padding: "10px" }
                    }
                    
                    onClick={() =>
                      handleClick({
                        type: "editsectioncolumnstyletype",
                        value: "height",
                      })
                    }
                  >
                    height
                  </div>
                </div>
              </div>
              <div style={{ width: "70%", height: "100%", overflow: "auto" }}>
                <div>
                  <Editsectioncolumnstyleshtml />
                </div>
                <div>
                  <Editsectioncolumnstylesinputhtml />
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
