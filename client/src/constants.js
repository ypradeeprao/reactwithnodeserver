//////// templateareasectioncolumn

export let basicmetadataInit = {
    type: "",
  
    innerText: "",
    innerTextstyle: {},
    inputoutputfieldprops: {},
    style: {},
    imgicon: {
      style: {},
    },
    overtext: {},
    uivaluefromdatabasetablename: "",
    uivaluefromdatabasetablecolumnname: "",
  
    onclick: {},
    onchange: {},
  };
  
  export let blankrowmetadataInit = {
    type: "blankrow",
    innerText: "",
    innerTextstyle: {},
    style: {
      width: "100%",
    },
    imgicon: { style: {} },
    overtext: {},
    uivaluefromdatabasetablename: "",
    uivaluefromdatabasetablecolumnname: "",
    onclick: {},
    onchange: {},
  };
  
  
  ///////////Icons
  
  export let iconmetadataBasic = JSON.parse(
    JSON.stringify(basicmetadataInit)
  );
  iconmetadataBasic.type = "icon";
  iconmetadataBasic.imgicon = {
    position: "pre",
    type: "icon",
    url: "",
    desktopvendor: "fontawesome",
    mobileappvendor: "",
    name: "plus",
    class: "fa fa-plus",
    style: {
      padding: "5px",
      color: "grey",
    },
  };
  iconmetadataBasic.onclick = { type: "parentexecute", props: {} };
  
  
  
  export let iconmetadataAdd = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadataAdd.imgicon.name = "plus";
  iconmetadataAdd.imgicon.class = "fa fa-plus";
  
  
  export let iconmetadataSave = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadataSave.imgicon.name = "save";
  iconmetadataSave.imgicon.class = "fa fa-save";
  
  
  export let iconmetadatamakeDraggable = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadatamakeDraggable.imgicon.name = "handup";
  iconmetadatamakeDraggable.imgicon.class = "fa fa-hand-o-up";
  
  
  export let iconmetadataThumsup = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadataThumsup.imgicon.name = "thumbsup";
  iconmetadataThumsup.imgicon.class = "fa fa-thumbs-o-up";
  
  
  export let iconmetadataThumsdown = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadataThumsdown.imgicon.name = "thumbsdown";
  iconmetadataThumsdown.imgicon.class = "fa fa-thumbs-o-down";
  
  
  export let iconmetadataDrag = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadataDrag.imgicon.name = "gripvertical";
  iconmetadataDrag.imgicon.class = "fa fa-ellipsis-v";
  
  export let iconmetadataUndo = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadataUndo.imgicon.name = "undo";
  iconmetadataUndo.imgicon.class = "fa fa-undo";
  
  export let iconmetadataRedo = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadataRedo.imgicon.name = "repeat";
  iconmetadataRedo.imgicon.class = "fa fa-repeat";
  
  
  export let iconmetadataEdit = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadataEdit.imgicon.name = "edit";
  iconmetadataEdit.imgicon.class = "fa fa-pencil";
  
  
  export let iconmetadatacircleDrag = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadatacircleDrag.imgicon.name = "gripvertical";
  iconmetadatacircleDrag.imgicon.class = "fa fa-ellipsis-v";
  
  
  export let iconmetadatacircleClose = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadatacircleClose.imgicon.name = "close";
  iconmetadatacircleClose.imgicon.class = "fa fa-close";
  
  
  
  export let iconmetadataDrop = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadataDrop.imgicon.name = "close";
  iconmetadataDrop.imgicon.class = "fa fa-close";
  
  
  export let iconmetadatabasiccircle = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadatabasiccircle.imgicon.style.border = "2px solid grey";
  iconmetadatabasiccircle.imgicon.style.borderRadius = "50%";
  
  
  export let iconmetadatabasicsquare = JSON.parse(
    JSON.stringify(iconmetadataBasic)
  );
  iconmetadatabasicsquare.imgicon.style.border = "2px solid grey";
  iconmetadatabasicsquare.imgicon.style.borderRadius = "50%";
  
  
  export let iconpopularstylesjs = {
    basic: iconmetadataBasic,
    basiccircle: iconmetadatabasiccircle,
    basicsquare: iconmetadatabasicsquare,
  };
  
  
  
  
  
  /////////////texts
  
  
  
  export let textmetadataBasic = {
    type: "text",
    innerText: "h1 text",
    innerTextstyle: {},
    inputoutputfieldprops: {},
    style: {
      fontSize: "20px",
    },
    imgicon: { style: {} },
    overtext: {},
    uivaluefromdatabasetablename: "",
    uivaluefromdatabasetablecolumnname: "",
    onclick: {},
    onchange: {},
  };
  
  
  export let textmetadataBasich1 = JSON.parse(
    JSON.stringify(textmetadataBasic)
  );
  textmetadataBasich1.style.fontSize = "30px";
  
  
  
  export let textmetadataBasicBold = JSON.parse(
    JSON.stringify(textmetadataBasic)
  );
  textmetadataBasicBold.style.fontWeight = "bold";
  
  
  
  export let textmetadataBasicUpper = JSON.parse(
    JSON.stringify(textmetadataBasic)
  );
  textmetadataBasicUpper.style.textTransform = "uppercase";
  
  
  export let textmetadataBasicLower = JSON.parse(
    JSON.stringify(textmetadataBasic)
  );
  textmetadataBasicLower.style.textTransform = "lowercase";
  
  
  export let textmetadataBasicCapital = JSON.parse(
    JSON.stringify(textmetadataBasic)
  );
  textmetadataBasicCapital.style.textTransform = "capitalize";
  
  
  export let textmetadataBasicGreen = JSON.parse(
    JSON.stringify(textmetadataBasic)
  );
  textmetadataBasicGreen.style.color = "green";
  
  
  
  export let textmetadataBasicBGRed = JSON.parse(
    JSON.stringify(textmetadataBasic)
  );
  textmetadataBasicBGRed.style.backgroundColor = "red";
  
  
  export let textmetadataBasicUnderline = JSON.parse(
    JSON.stringify(textmetadataBasic)
  );
  textmetadataBasicUnderline.style.textDecorationLine = "underline";
  
  
  
  export let textmetadataBasicOverline = JSON.parse(
    JSON.stringify(textmetadataBasic)
  );
  textmetadataBasicOverline.style.textDecorationLine = "overline";
  
  
  export let textmetadataBasicLinethrough = JSON.parse(
    JSON.stringify(textmetadataBasic)
  );
  textmetadataBasicLinethrough.style.textDecorationLine = "line-through";
  textmetadataBasicLinethrough.style.textDecorationThickness = "25%";
  
  
  export let textmetadataBasicLinethroughred = JSON.parse(
    JSON.stringify(textmetadataBasic)
  );
  textmetadataBasicLinethroughred.style.textDecorationLine = "line-through";
  textmetadataBasicLinethroughred.style.textDecorationColor = "red";
  
  
  export let textpopularstylesjs = {
    textmetadataBasich1: textmetadataBasich1,
    textmetadataBasicBold: textmetadataBasicBold,
    textmetadataBasicUpper: textmetadataBasicUpper
  };
  
  
  /////////////buttons
  
  export let buttonmetadataBasic = {
    type: "button",
    imgicon: {
      type: "imgicon",
      url: "",
      desktopvendor: "fontawesome",
      mobileappvendor: "",
      name: "",
      class: "",
      position: "post",
      style: {
        fontSize: "20px",
        padding: "5px",
        color: "grey",
      },
    },
    overtext: {
      innerText: "",
      style: {},
    },
  
    innerText: "button1",
    innerTextstyle: {},
    style: {
      padding: "5px",
      textAlign: "center",
      display: "inline-block",
      boxSizing: "border-box",
    },
    uivaluefromdatabasetablename: "",
    uivaluefromdatabasetablecolumnname: "",
    onclick: {},
    onchange: {},
    onmouseover: {},
    onmouseout: {},
  };
  
  
  export let buttonmetadataBasicBorder = JSON.parse(
    JSON.stringify(buttonmetadataBasic)
  );
  buttonmetadataBasicBorder.style = {
    textAlign: "center",
    boxStyle: "border-box",
    display: "inline-block",
    border: "1px solid grey"
  };
  
  
  export let buttonmetadataBasicBorderBgbutton = JSON.parse(
    JSON.stringify(buttonmetadataBasic)
  );
  buttonmetadataBasicBorderBgbutton.style = {
    backgroundColor: "lightblue",
    fontSize: "20px",
    padding: "5px",
    border: "0px solid white",
  
    textAlign: "center",
    boxStyle: "border-box",
    display: "inline-block",
    boxSizing: "border-box",
  };
  
  
  export let buttonmetadataBasicBorderBgbuttonborder = JSON.parse(
    JSON.stringify(buttonmetadataBasicBorderBgbutton)
  );
  buttonmetadataBasicBorderBgbuttonborder.style = {
    color: "white",
    border: "2px solid grey",
  };
  
  
  export let buttonmetadataBasicBorderIconborder = JSON.parse(
    JSON.stringify(buttonmetadataBasicBorderBgbutton)
  );
  buttonmetadataBasicBorderIconborder.imgicon.name = "cloud";
  buttonmetadataBasicBorderIconborder.imgicon.class = "fa fa-cloud";
  
  
  export let buttonmetadataBasicBorderPreiconborder = JSON.parse(
    JSON.stringify(buttonmetadataBasicBorderBgbutton)
  );
  buttonmetadataBasicBorderPreiconborder.imgicon.name = "cloud";
  buttonmetadataBasicBorderPreiconborder.imgicon.class = "fa fa-cloud";
  
  
  
  export let buttonpopularstylesjs = {
    buttonmetadataBasicBorder: buttonmetadataBasicBorder,
    buttonmetadataBasicBorderBgbutton: buttonmetadataBasicBorderBgbutton,
    buttonmetadataBasicBorderIconborder: buttonmetadataBasicBorderIconborder,
    buttonmetadataBasicBorderPreiconborder: buttonmetadataBasicBorderPreiconborder
  };
  
  
  
  ///////////// images
  
  export let imagemetadataBasic = {
    type: "image",
    imgicon: {
      type: "url",
      name: "https://www.w3schools.com/images/w3schools_green.jpg",
    },
    overtext: {
      innerText: "",
      style: {},
    },
  
    innerText: "",
    innerTextstyle: {},
    style: {
      width: "100px",
      height: "100px",
    },
    uivaluefromdatabasetablename: "",
    uivaluefromdatabasetablecolumnname: "",
    onclick: {},
    onchange: {},
    onmouseover: {},
  
    onmouseout: {},
  };
  
  
  export let imagepopularstylesjs = {
    imagemetadataBasic: imagemetadataBasic
  };
  
  
  
  //////////// inputoutputfield
  export let inputoutputfieldmetadataInit = {
    type: "inputoutputfield",
    name: "",
    innerText: "",
    innerTextstyle: {},
    style: {
      fontSize: "20px",
    },
    imgicon: { style: {} },
    overtext: {},
    uivaluefromdatabasetablename: "",
    uivaluefromdatabasetablecolumnname: "",
    onclick: {},
    onchange: {},
  
    inputoutputfieldprops: {
      type: "text",
      inputmode: "true",
      orientation: "horizontal",
      value: "testets",
      placeholder: "Search..",
      querypaneltabelcolumncondition: "",
  
    },
  };
  
  
  
  export let inputoutputfieldmetadataInitquerypaneltabelname = JSON.parse(
    JSON.stringify(inputoutputfieldmetadataInit)
  );
  inputoutputfieldmetadataInitquerypaneltabelname.innerText = "Table Name";
  inputoutputfieldmetadataInitquerypaneltabelname.inputoutputfieldprops = {
    inputmode: "false",
    type: "querypaneltablename",
    querypaneltablelabel: "dbuser",
    querypaneltablename: "dbuser",
    querypaneltabelcolumnlabel: "",
    querypaneltabelcolumnname: "",
    querypaneltabelcolumnvalue: "",
    databasecondition: "",
    orientation: "vertical",
    placeholder: "Search..",
    value: "",
    querypaneltabelcolumncondition: ""
  };
  
  
  
  export let inputoutputfieldmetadataInitquerypaneltabelcolumnsort = JSON.parse(
    JSON.stringify(inputoutputfieldmetadataInitquerypaneltabelname)
  );
  inputoutputfieldmetadataInitquerypaneltabelcolumnsort.innerText = "Column";
  inputoutputfieldmetadataInitquerypaneltabelcolumnsort.inputoutputfieldprops.type = "querypaneltabelcolumnsort";
  inputoutputfieldmetadataInitquerypaneltabelcolumnsort.inputoutputfieldprops.querypaneltabelcolumnlabel = "Id";
  inputoutputfieldmetadataInitquerypaneltabelcolumnsort.inputoutputfieldprops.querypaneltabelcolumnname = "Id";
  
  
  
  export let inputoutputfieldmetadataInitquerypaneltabelcolumnquery = JSON.parse(
    JSON.stringify(inputoutputfieldmetadataInitquerypaneltabelname)
  );
  inputoutputfieldmetadataInitquerypaneltabelcolumnquery.innerText = "Column";
  inputoutputfieldmetadataInitquerypaneltabelcolumnquery.inputoutputfieldprops.type = "querypanelcolumnquery";
  inputoutputfieldmetadataInitquerypaneltabelcolumnquery.inputoutputfieldprops.querypaneltabelcolumnlabel = "Id";
  inputoutputfieldmetadataInitquerypaneltabelcolumnquery.inputoutputfieldprops.querypaneltabelcolumnname = "Id";
  inputoutputfieldmetadataInitquerypaneltabelcolumnquery.inputoutputfieldprops.querypaneltabelcolumnvalue = "ct-dbu-admin";
  inputoutputfieldmetadataInitquerypaneltabelcolumnquery.inputoutputfieldprops.querypaneltabelcolumncondition = "beginswith";
  
  
  
  export let inputoutputfieldmetadataInitquerypaneltabelcolumnfilter = JSON.parse(
    JSON.stringify(inputoutputfieldmetadataInitquerypaneltabelname)
  );
  inputoutputfieldmetadataInitquerypaneltabelcolumnfilter.innerText = "Column";
  inputoutputfieldmetadataInitquerypaneltabelcolumnfilter.inputoutputfieldprops.type = "querypaneltabelcolumnfilter";
  inputoutputfieldmetadataInitquerypaneltabelcolumnfilter.inputoutputfieldprops.querypaneltabelcolumnlabel = "Name";
  inputoutputfieldmetadataInitquerypaneltabelcolumnfilter.inputoutputfieldprops.querypaneltabelcolumnname = "Name";
  inputoutputfieldmetadataInitquerypaneltabelcolumnfilter.inputoutputfieldprops.querypaneltabelcolumnvalue = "pradeep";
  inputoutputfieldmetadataInitquerypaneltabelcolumnfilter.inputoutputfieldprops.querypaneltabelcolumncondition = "beginswith";
  
  
  export let inputoutputfieldmetadataInittablebuttonmetadata = JSON.parse(
    JSON.stringify(inputoutputfieldmetadataInit)
  );
  inputoutputfieldmetadataInittablebuttonmetadata.inputoutputfieldprops.type = "tablebuttonmetadatafield";
  inputoutputfieldmetadataInittablebuttonmetadata.inputoutputfieldprops.defaultvalue = buttonmetadataBasic;
  
  
  
  export let inputoutputfieldmetadataInittablecolumnmetadata = JSON.parse(
    JSON.stringify(inputoutputfieldmetadataInit)
  );
  inputoutputfieldmetadataInittablecolumnmetadata.inputoutputfieldprops.type = "tablecolumnmetadatafield";
  inputoutputfieldmetadataInittablecolumnmetadata.inputoutputfieldprops.defaultvalue = inputoutputfieldmetadataInit;
  
  
  export let inputoutputfieldmetadataInittablebuttonrefmetadata = JSON.parse(
    JSON.stringify(inputoutputfieldmetadataInit)
  );
  inputoutputfieldmetadataInittablebuttonrefmetadata.inputoutputfieldprops.type = "tablebuttonmetadatafieldref";
  inputoutputfieldmetadataInittablebuttonrefmetadata.inputoutputfieldprops.refname = "";
  inputoutputfieldmetadataInittablebuttonrefmetadata.inputoutputfieldprops.refobjectname = "";
  
  
  export let inputoutputfieldmetadataInittablecolumnrefmetadata = JSON.parse(
    JSON.stringify(inputoutputfieldmetadataInit)
  );
  inputoutputfieldmetadataInittablecolumnrefmetadata.inputoutputfieldprops.type = "tablecolumnmetadatafieldref";
  inputoutputfieldmetadataInittablecolumnrefmetadata.inputoutputfieldprops.refname = "";
  inputoutputfieldmetadataInittablecolumnrefmetadata.inputoutputfieldprops.refobjectname = "";
  
  export let inputoutputfieldmetadataInitislinkedcolumn = {
    type: "inputoutputfield",
    innerText: "Account",
    innerTextstyle: {},
    style: {
      fontSize: "20px",
    },
    imgicon: {
      style: {},
    },
    overtext: {},
    uivaluefromdatabasetablename: "uirepeatrecorddata",
    uivaluefromdatabasetablecolumnname: "accountid",
    onclick: {
      type: "openpopup",
      popupside: "center",
      popupmetadatatype: "recordlistdatanormaltable",
      popupmetadata: {
        items: {
          listobj: {
            0: {
              highlightpanelsectionmetadata: {},
              highlightpanelbuttonsectionmetadata: {},
              searchpanelsectionmetadata: {
                items: {
                  0: {
                    type: "button",
                    imgicon: {
                      type: "imgicon",
                      url: "",
                      desktopvendor: "fontawesome",
                      mobileappvendor: "",
                      name: "",
                      class: "",
                      position: "post",
                      style: {
                        padding: "5px",
                        color: "grey",
                      },
                    },
                    overtext: {
                      innerText: "",
                      style: {},
                    },
                    innerText: "Companyname",
                    innerTextstyle: {},
                    style: {
                      padding: "5px",
                      textAlign: "center",
                      display: "inline-block",
                      boxSizing: "border-box",
                    },
                    uivaluefromdatabasetablename: "listdisplaycolumndata",
                    uivaluefromdatabasetablecolumnname: "companyname",
                    onclick: {},
                    onchange: {},
                    onmouseover: {},
                    onmouseout: {},
                    order: 0,
                  },
                },
                type: "templateareaitemsection",
                style: {
                  width: "100%",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                },
                order: "",
              },
              searchpanelbuttonsectionmetadata: {
                items: {
                  0: {
                    type: "button",
                    imgicon: {
                      type: "imgicon",
                      url: "",
                      desktopvendor: "fontawesome",
                      mobileappvendor: "",
                      name: "",
                      class: "",
                      position: "post",
                      style: {
                        padding: "5px",
                        color: "grey",
                      },
                    },
                    overtext: {
                      innerText: "",
                      style: {},
                    },
                    innerText: "Select",
                    innerTextstyle: {},
                    style: {
                      padding: "5px",
                      textAlign: "center",
                      display: "inline-block",
                      boxSizing: "border-box",
                    },
                    uivaluefromdatabasetablename: "",
                    uivaluefromdatabasetablecolumnname: "",
                    onclick: {
                      type: "passselectedsearchdatatoparentui",
                    },
                    onchange: {},
                    onmouseover: {},
                    onmouseout: {},
                    order: 0,
                  },
                },
                type: "templateareaitemsection",
                style: {
                  width: "100%",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  border: "2px solid grey",
                  borderRadius: "",
                },
                order: "",
              },
              tabpanellabelsectionmetadata: {},
              tabpanelcontentsectionmetadata: {},
              detailpanelsectionmetadata: {},
              firstleftsectionmetadata: {},
              firstcentersectionmetadata: {},
              firstrightsectionmetadata: {},
              secondleftsectionmetadata: {},
              secondrightsectionmetadata: {},
            },
          },
          orientation: "listitem",
          listitemwidth: "100%",
          searchpanelsectionwidth: "80%",
          searchpanelbuttonsectionwidth: "20%",
          highlightpanelsectionwidth: "0%",
          highlightpanelbuttonsectionwidth: "0%",
          tabpanellabelsectionwidth: "0%",
          tabpanelcontentsectionwidth: "0%",
          detailpanelsectionwidth: "0%",
          listbuttonpanelsectionwidth: "0%",
          listbuttonpanelsectionmetadata: {},
          dbquerypanelsectionwidth: "100%",
          dbquerypaneltablenamesectionmetadata: {},
          dbquerypanelbeginswithtablecolumnssectionmetadata: {},
          dbquerypanelfilterbytablecolumnssectionmetadata: {},
          dbfilterpanelsectionwidth: "100%",
          dbfilterpanelsectionmetadata: {},
          dbuifilterpanelsectionwidth: "0%",
          dbsortpanelsectionwidth: "0%",
          dbsortpanelsectionmetadata: {},
          dbuisortpanelsectionwidth: "100%",
          dbuisearchpanelsectionwidth: "100%",
          dbuisearchpanelidbeginswith: "sr-account-",
          dbuisearchpaneltablename: "searchcolumnrecorddata",
          dbshowsearchpanel: "true",
          dbshowsortpanel: "false",
          dbshowfilterpanel: "false",
          isdatafromserver: "true",
          isdatafromlocalcomponent: "false",
          islayoutmetadatafromserver: "false",
        },
        type: "recordlisttemplateareaitem",
        style: {
          width: "100%",
          paddingLeft: "20px",
          paddingRight: "20px",
        },
        order: 1,
      },
    },
    onchange: {
      type: "updatetemplateareaitemstatedata",
      updatestatedata: {
        accountid: {
          tovalue: "",
        },
      },
    },
    inputoutputfieldprops: {
      type: "islinkedcolumn",
      inputmode: "true",
      defaultvalue: "",
      recordlookuptablename: "account",
      recordlookupdisplaycolumnname: "companyname",
    },
  };
  
  
  
  //////////////////templateareaitemsection
  
  export let templateareaitemSectioncolumnDragpanelmetadataInitMap = {
    text: textmetadataBasic,
    image: imagemetadataBasic,
    icon: iconmetadataBasic,
    inputoutputfield: inputoutputfieldmetadataInit,
  };
  
  
  
  export let sectionmetadataInit = {
    items: {
      0: { ...inputoutputfieldmetadataInit, order: 0 },
    },
    type: "templateareaitemsection",
    style: {},
    order: "",
  };
  
  
  export let sectionmetadataInitBlank = {
    items: {},
    type: "templateareaitemsection",
    style: {},
    order: "",
  };
  
  
  export let querypaneltablenamesectionmetadataInit = {
    items: {
      0: { ...inputoutputfieldmetadataInitquerypaneltabelname, order: 0 },
    },
    type: "templateareaitemsection",
    style: { width: "100%", justifyContent: "flex-start", padding: "10px" },
    order: "",
  };
  
  
  
  export let querypanelbeginswithtablecolumnssectionmetadataInit = {
    items: {
      0: { ...inputoutputfieldmetadataInitquerypaneltabelcolumnquery, order: 0 },
    },
    type: "templateareaitemsection",
    style: { width: "100%", justifyContent: "flex-start", padding: "10px" },
    order: "",
  };
  
  
  
  export let querypanelfilterbytablecolumnssectionmetadataInit = {
    items: {
      0: { ...inputoutputfieldmetadataInitquerypaneltabelcolumnquery, order: 0 },
    },
    type: "templateareaitemsection",
    style: { width: "100%", justifyContent: "flex-start", padding: "10px" },
    order: "",
  };
  
  
  
  export let filterpanelsectionmetadataInit = {
    items: {
      0: { ...inputoutputfieldmetadataInitquerypaneltabelcolumnfilter, order: 0 },
    },
    type: "templateareaitemsection",
    style: { width: "100%", justifyContent: "flex-start", padding: "10px" },
    order: "",
  };
  
  
  export let sortpanelsectionmetadataInit = {
    items: {
      0: { ...inputoutputfieldmetadataInitquerypaneltabelcolumnsort, order: 0 },
    },
    type: "templateareaitemsection",
    style: { width: "100%", justifyContent: "flex-start", padding: "10px" },
    order: "",
  };
  
  
  
  export let highlightpanelsectionmetadataInit = {
    items: {
      0: { ...inputoutputfieldmetadataInit, order: 0 },
      1: { ...inputoutputfieldmetadataInit, order: 1 },
    },
    type: "templateareaitemsection",
    style: {
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      // overflow: "auto",
    },
    order: "",
  };
  
  
  export let buttonpanelsectionmetadataInit = {
    items: {
      0: { ...buttonmetadataBasic, order: 0 },
      1: { ...buttonmetadataBasic, order: 1 },
    },
    type: "templateareaitemsection",
    style: {
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "center",
      border: "2px solid grey",
      borderRadius: "",
      //   overflow: "auto",
    },
    order: "",
  };
  
  
  export let tabpanellabelsectionmetadataInit = {
    items: {
      0: { ...buttonmetadataBasic, order: 0 },
      1: { ...buttonmetadataBasic, order: 1 },
    },
    type: "templateareaitemsection",
    style: {
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      border: "2px solid grey",
      borderRadius: "",
      // overflow: "auto",
    },
    order: "",
  };
  
  
  export let tabpanelcontentsectionmetadataInit = {
    contactinfo: {
      items: {
        0: { ...buttonmetadataBasic, order: 0 },
        1: { ...buttonmetadataBasic, order: 1 },
      },
      type: "templateareaitemsection",
      style: {
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        border: "2px solid grey",
        borderRadius: "",
        // overflow: "auto",
      },
      order: "",
    },
    addressinfo: {
      items: {
        0: { ...buttonmetadataBasic, order: 0 },
        1: { ...buttonmetadataBasic, order: 1 },
      },
      type: "templateareaitemsection",
      style: {
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        border: "2px solid grey",
        borderRadius: "",
        // overflow: "auto",
      },
      order: "",
    },
  };
  
  
  export let detailpanelsectionmetadataInit = {
    items: {
      0: { ...inputoutputfieldmetadataInit, order: 0 },
      1: { ...inputoutputfieldmetadataInit, order: 1 },
    },
    type: "templateareaitemsection",
    style: {
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      border: "2px solid grey",
      borderRadius: "",
      //  overflow: "auto",
    },
    order: "",
  };
  
  
  ///////////////////////////////// templateareaitem
  
  
  
  
  export let navbarmetadataInit = {
    items: {
      listobj: {
        0: {
          highlightpanelsectionmetadata: {},
          highlightpanelbuttonsectionmetadata: {},
          searchpanelsectionmetadata: {},
          searchpanelbuttonsectionmetadata: {},
          tabpanellabelsectionmetadata: {},
          tabpanelcontentsectionmetadata: {},
          detailpanelsectionmetadata: {},
          firstleftsectionmetadata: { ...sectionmetadataInit },
          firstcentersectionmetadata: { ...sectionmetadataInitBlank },
          firstrightsectionmetadata: { ...sectionmetadataInit },
          secondleftsectionmetadata: { ...sectionmetadataInit },
          secondrightsectionmetadata: { ...sectionmetadataInit },
        },
      },
  
      orientation: "topnav",
      listitemwidth: "100%",
      searchpanelsectionwidth: "0%",
      searchpanelbuttonsectionwidth: "0%",
      highlightpanelsectionwidth: "0%",
      highlightpanelbuttonsectionwidth: "0%",
      tabpanellabelsectionwidth: "0%",
      tabpanelcontentsectionwidth: "0%",
      detailpanelsectionwidth: "0%",
      listbuttonpanelsectionwidth: "0%",
      listbuttonpanelsectionmetadata: {},
  
      dbquerypanelsectionwidth: "0%",
      dbquerypaneltablenamesectionmetadata: {},
      dbquerypanelbeginswithtablecolumnssectionmetadata: {},
      dbquerypanelfilterbytablecolumnssectionmetadata: {},
      dbfilterpanelsectionwidth: "0%",
      dbfilterpanelsectionmetadata: {},
      dbuifilterpanelsectionwidth: "0%",
      dbsortpanelsectionwidth: "0%",
      dbsortpanelsectionmetadata: {},
      dbuisortpanelsectionwidth: "0%",
      dbuisearchpanelsectionwidth: "0%",
      dbuisearchpanelidbeginswith: "",
      dbuisearchpaneltablename: "",
      dbshowsearchpanel: "false",
      dbshowsortpanel: "false",
      dbshowfilterpanel: "false",
      isdatafromserver: "false",
      isdatafromlocalcomponent: "false",
      islayoutmetadatafromserver: "false",
    },
  
    type: "navbartemplateareaitem",
    style: { backgroundColor: "white", width: "100%" },
    order: "",
  };
  
  
  export let navbarpopularstylesjs = {};
  
  export let recordlisttemplateareaitemmetadataInit = {
    items: {
      listobj: {
        0: {
          highlightpanelsectionmetadata: highlightpanelsectionmetadataInit,
          highlightpanelbuttonsectionmetadata: buttonpanelsectionmetadataInit,
          searchpanelsectionmetadata: highlightpanelsectionmetadataInit,
          searchpanelbuttonsectionmetadata: buttonpanelsectionmetadataInit,
          tabpanellabelsectionmetadata: tabpanellabelsectionmetadataInit,
          tabpanelcontentsectionmetadata: tabpanelcontentsectionmetadataInit,
          detailpanelsectionmetadata: detailpanelsectionmetadataInit,
          firstleftsectionmetadata: {},
          firstcentersectionmetadata: {},
          firstrightsectionmetadata: {},
          secondleftsectionmetadata: {},
          secondrightsectionmetadata: {},
        },
      },
      orientation: "withtoptabpanel",
      listitemwidth: "100%",
      searchpanelsectionwidth: "100%",
      searchpanelbuttonsectionwidth: "100%",
      highlightpanelsectionwidth: "100%",
      highlightpanelbuttonsectionwidth: "100%",
      tabpanellabelsectionwidth: "100%",
      tabpanelcontentsectionwidth: "100%",
      detailpanelsectionwidth: "100%",
      listbuttonpanelsectionwidth: "100%",
      listbuttonpanelsectionmetadata: buttonpanelsectionmetadataInit,
  
      dbquerypanelsectionwidth: "100%",
      dbquerypaneltablenamesectionmetadata:
        querypaneltablenamesectionmetadataInit,
      dbquerypanelbeginswithtablecolumnssectionmetadata:
        querypanelbeginswithtablecolumnssectionmetadataInit,
      dbquerypanelfilterbytablecolumnssectionmetadata:
        querypanelfilterbytablecolumnssectionmetadataInit,
      dbfilterpanelsectionwidth: "100%",
      dbfilterpanelsectionmetadata: filterpanelsectionmetadataInit,
      dbuifilterpanelsectionwidth: "100%",
      dbsortpanelsectionwidth: "100%",
      dbsortpanelsectionmetadata: sortpanelsectionmetadataInit,
      dbuisortpanelsectionwidth: "100%",
      dbuisearchpanelsectionwidth: "0%",
      dbuisearchpanelidbeginswith: "",
      dbuisearchpaneltablename: "",
      dbshowsearchpanel: "false",
      dbshowsortpanel: "true",
      dbshowfilterpanel: "true",
      isdatafromserver: "false",
      isdatafromlocalcomponent: "false",
      islayoutmetadatafromserver: "false",
    },
    type: "recordlisttemplateareaitem",
    style: {
      width: "100%",
      paddingLeft: "20px",
      paddingRight: "20px",
      // overflow: "auto",
    },
    order: 1,
  };
  
  
  export let recordlisttemplateareaitemmetadataInitwithouttab = JSON.parse(
    JSON.stringify(recordlisttemplateareaitemmetadataInit)
  );
  recordlisttemplateareaitemmetadataInitwithouttab.items.orientation =
    "withouttabpanel";
  
  
    export let recordlisttemplateareaitemmetadataInitlistitem = JSON.parse(
    JSON.stringify(recordlisttemplateareaitemmetadataInit)
  );
  recordlisttemplateareaitemmetadataInitlistitem.items.orientation = "listitem";
  
  
  export let recordlisttemplateareaitemmetadataInitwithlefttab = JSON.parse(
    JSON.stringify(recordlisttemplateareaitemmetadataInit)
  );
  recordlisttemplateareaitemmetadataInitwithlefttab.items.orientation =
    "withlefttabpanel";
  
  
    export let recordlisttemplateareaitemmetadataInitwithrighttab = JSON.parse(
    JSON.stringify(recordlisttemplateareaitemmetadataInit)
  );
  recordlisttemplateareaitemmetadataInitwithrighttab.items.orientation =
    "withrighttabpanel";
  
  
    export let recordlisttemplateareaitemmetadataInitnormaltable = JSON.parse(
    JSON.stringify(recordlisttemplateareaitemmetadataInit)
  );
  recordlisttemplateareaitemmetadataInitnormaltable.items.orientation =
    "listitem";
  
  recordlisttemplateareaitemmetadataInitnormaltable.items.searchpanelsectionwidth =
    "80%";
  recordlisttemplateareaitemmetadataInitnormaltable.items.searchpanelbuttonsectionwidth =
    "20%";
  
  recordlisttemplateareaitemmetadataInitnormaltable.items.highlightpanelsectionwidth =
    "80%";
  recordlisttemplateareaitemmetadataInitnormaltable.items.highlightpanelbuttonsectionwidth =
    "20%";
  
  
    export let recordlistdatapopularstylesjs = {
    0: recordlisttemplateareaitemmetadataInit,
    1: recordlisttemplateareaitemmetadataInitwithouttab,
    2: recordlisttemplateareaitemmetadataInitlistitem,
    3: recordlisttemplateareaitemmetadataInitwithlefttab,
    4: recordlisttemplateareaitemmetadataInitwithrighttab,
  };
  
  
  export let inputoutputfieldmetadataInittablelayoutmetdata = JSON.parse(
    JSON.stringify(inputoutputfieldmetadataInit)
  );
  inputoutputfieldmetadataInittablelayoutmetdata.inputoutputfieldprops.type = "templateareaitem";
  inputoutputfieldmetadataInittablelayoutmetdata.inputoutputfieldprops.defaultvalue = recordlisttemplateareaitemmetadataInitnormaltable;
  
  
  export let inputoutputfieldmetadataInittablequerymetdata = JSON.parse(
    JSON.stringify(inputoutputfieldmetadataInit)
  );
  inputoutputfieldmetadataInittablequerymetdata.inputoutputfieldprops.type = "templateareaitemquery";
  inputoutputfieldmetadataInittablequerymetdata.inputoutputfieldprops.defaultvalue = recordlisttemplateareaitemmetadataInitnormaltable;
  
  
  
  
  
  ///////////////////////// templatearea
  
  
  export let templateareaitemsectioncolumnlistdragpanelmetadataInit = {
    items: {
      0: {
        type: "text",
        dragtemplatename: "",
        dragtemplatetype: "",
        innerText: "Sectioncolumns",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
          fontWeight: "bold",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 0,
      },
      1: {
        type: "inputoutputfield",
        innerText: "",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {
          type: "text",
          inputmode: "true",
          orientation: "horizontal",
          value: "testets",
          placeholder: "Search..",
        },
        order: 1,
      },
      2: {
        type: "text",
        dragtemplatename: "text",
        dragtemplatetype: "templateareaitemsetioncolumn",
        innerText: "Text",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 2,
      },
      3: {
        type: "text",
        dragtemplatename: "image",
        dragtemplatetype: "templateareaitemsetioncolumn",
        innerText: "Image",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 3,
      },
      4: {
        type: "text",
        dragtemplatename: "icon",
        dragtemplatetype: "templateareaitemsetioncolumn",
        innerText: "Icon",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 4,
      },
      5: {
        type: "text",
        dragtemplatename: "inputoutputfield",
        dragtemplatetype: "templateareaitemsetioncolumn",
        innerText: "Inputoutputfield",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 5,
      },
    },
    type: "templateareaitemsection",
    style: {},
    order: "",
  };
  
  export let templateareaitemlistdragpanelmetadataInit = {
    items: {
      0: {
        type: "text",
        dragtemplatename: "",
        dragtemplatetype: "",
        innerText: "Templateareaitems",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
          fontWeight: "bold",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 0,
      },
      1: {
        type: "inputoutputfield",
        innerText: "",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {
          type: "text",
          inputmode: "true",
          orientation: "horizontal",
          value: "testets",
          placeholder: "Search..",
        },
        order: 1,
      },
      2: {
        type: "text",
        dragtemplatename: "navbartemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Navbar",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 2,
      },
      4: {
        type: "text",
        dragtemplatename: "imagecardtemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Imagecard",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 4,
      },
      5: {
        type: "text",
        dragtemplatename: "imagepanelgallerytemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Imagepanelgallery",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 5,
      },
      6: {
        type: "text",
        dragtemplatename: "progresscardlisttemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Progresscardlist",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 6,
      },
      7: {
        type: "text",
        dragtemplatename: "carasoultemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Carasoul",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 7,
      },
      8: {
        type: "text",
        dragtemplatename: "contactusformtemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Contactusform",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 8,
      },
      9: {
        type: "text",
        dragtemplatename: "socialbartemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Socialbar",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 9,
      },
      10: {
        type: "text",
        dragtemplatename: "quicklinkscardtemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Quicklinks",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 9,
      },
      11: {
        type: "text",
        dragtemplatename: "imagegallerytemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Imagegallery",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 11,
      },
      12: {
        type: "text",
        dragtemplatename: "addresscardtemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Addresscard",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 12,
      },
      13: {
        type: "text",
        dragtemplatename: "textgallerycardtemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Text gallery",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 13,
      },
      14: {
        type: "text",
        dragtemplatename: "workinghourscardtemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Working Hours",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 14,
      },
      15: {
        type: "text",
        dragtemplatename: "recordlisttemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "Record data",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 14,
      },
      16: {
        type: "text",
        dragtemplatename: "recordlistdatainput",
        dragtemplatetype: "templateareaitem",
        innerText: "Record data Input",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 15,
      },
      17: {
        type: "text",
        dragtemplatename: "recordlistdatanormaltable",
        dragtemplatetype: "templateareaitem",
        innerText: "Record data List",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 15,
      },
      18: {
        type: "text",
        dragtemplatename: "utilbartemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "utilbar",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 18,
      },
      19: {
        type: "text",
        dragtemplatename: "signuppanelcardtemplateareaitem",
        dragtemplatetype: "templateareaitem",
        innerText: "signuppanel",
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: 19,
      },
    },
    type: "templateareaitemsection",
    style: {},
    order: "",
  };
  
  
  
  export let templateareaitemlistmetadataInit = {
    items: {
      0: { ...navbarmetadataInit, order: 0 },
    },
    type: "templateareaitemlist",
    style: { backgroundColor: "white", width: "100%", border: "2px solid grey" },
    order: 0,
  };
  
  
  export let templatearealistmetadataInit = {
    items: {
      0: {
        items: {
          0: { ...navbarmetadataInit, order: 0 },
        },
        type: "templateareaitemlist",
        style: {
          backgroundColor: "white",
          width: "50%",
          border: "2px solid grey",
        },
        order: 0,
      },
    },
    type: "templatearealist",
    style: { backgroundColor: "white", width: "100%", border: "2px solid grey" },
    order: "",
  };
  
  
  /////////////////////////Sitecomp
  
  //////////////////Editpropscomp
  
  export let tablenameMap = {
    tablemetadata: {
      label: "tablemetadata",
      name: "tablemetadata",
      fields: {
        id: {
          label: "Id",
          name: "id",
          type: "text",
        },
        label: {
          label: "Label",
          name: "label",
          type: "text",
        },
        name: {
          label: "Name",
          name: "name",
          type: "text",
        },
      },
    },
    tablecolumnmetadata: {
      label: "tablecolumnmetadata",
      name: "tablecolumnmetadata",
      fields: {
        id: {
          label: "Id",
          name: "id",
          type: "text",
        },
        label: {
          label: "Label",
          name: "label",
          type: "text",
        },
        name: {
          label: "Name",
          name: "name",
          type: "text",
        },
        tablename: {
          label: "Tablename",
          name: "tablename",
          type: "text",
        },
      },
    },
    tablebuttonmetadata: {
      label: "tablebuttonmetadata",
      name: "tablebuttonmetadata",
      fields: {
        id: {
          label: "Id",
          name: "id",
          type: "text",
        },
        label: {
          label: "Label",
          name: "label",
          type: "text",
        },
        name: {
          label: "Name",
          name: "name",
          type: "text",
        },
        tablename: {
          label: "Tablename",
          name: "tablename",
          type: "text",
        },
      },
    },
    org: {
      label: "Org",
      name: "org",
      fields: {
        id: {
          label: "Id",
          name: "id",
          type: "text",
        },
        name: {
          label: "Name",
          name: "name",
          type: "text",
        },
  
        phone: {
          label: "phone",
          name: "phone",
          type: "text",
        },
        email: {
          label: "email",
          name: "email",
          type: "text",
        },
        logourl: {
          label: "logourl",
          name: "logourl",
          type: "text",
        },
      },
    },
  };
  
  let sectionpopularstylesjs = {};
  let inputoutputfieldpopularstylesjs = {};
  
  let templateareaitemlistpopularstylesjs = {};
  
  export let popularstylesjs = {};
  
  popularstylesjs["text"] = textpopularstylesjs;
  popularstylesjs["button"] = buttonpopularstylesjs;
  popularstylesjs["icon"] = iconpopularstylesjs;
  popularstylesjs["image"] = imagepopularstylesjs;
  popularstylesjs["navbartemplateareaitem"] = navbarpopularstylesjs;
  popularstylesjs["recordlisttemplateareaitem"] = recordlistdatapopularstylesjs;
  popularstylesjs["templateareaitemsection"] = sectionpopularstylesjs;
  popularstylesjs["inputoutputfield"] = inputoutputfieldpopularstylesjs;
  popularstylesjs["inputoutputfield"] = inputoutputfieldpopularstylesjs;
  popularstylesjs["templateareaitemlist"] = templateareaitemlistpopularstylesjs;
  
  //////////////
  
  
  
  export let querypaneltabelcolumnvaluetypeMap = {
    signedindbuserdata: {
      label: "signedindbuserdata",
      name: "signedindbuserdata",
      fields: {
        id: {
          label: "Id",
          name: "id",
          type: "text",
        },
        firstname: {
          label: "firstname",
          name: "firstname",
          type: "text",
        },
        lastname: {
          label: "lastname",
          name: "lastname",
          type: "text",
        },
        name: {
          label: "Name",
          name: "name",
          type: "text",
        },
  
        phone: {
          label: "phone",
          name: "phone",
          type: "text",
        },
        email: {
          label: "email",
          name: "email",
          type: "text",
        },
      },
    },
    signedinvendordbuserdata: {
      label: "signedinvendordbuserdata",
      name: "signedinvendordbuserdata",
      fields: {
        id: {
          label: "Id",
          name: "id",
          type: "text",
        },
        firstname: {
          label: "firstname",
          name: "firstname",
          type: "text",
        },
        lastname: {
          label: "lastname",
          name: "lastname",
          type: "text",
        },
        name: {
          label: "Name",
          name: "name",
          type: "text",
        },
  
        phone: {
          label: "phone",
          name: "phone",
          type: "text",
        },
        email: {
          label: "email",
          name: "email",
          type: "text",
        },
      },
    },
  
    profiledata: {
      label: "profiledata",
      name: "profiledata",
      fields: {
        id: {
          label: "Id",
          name: "id",
          type: "text",
        },
  
        name: {
          label: "Name",
          name: "name",
          type: "text",
        },
      },
    },
    urldata: {
      label: "urldata",
      name: "urldata",
      fields: {
        tabname: {
          label: "tabname",
          name: "tabname",
          type: "text",
        },
        subtabname: {
          label: "subtabname",
          name: "subtabname",
          type: "text",
        },
        action: {
          label: "action",
          name: "action",
          type: "text",
        },
      },
    },
    urlsearchdataparams: {
      label: "urlsearchdataparams",
      name: "urlsearchdataparams",
      fields: {},
    },
    urlhashdataparams: {
      label: "urlhashdataparams",
      name: "urlhashdataparams",
      fields: {},
    },
    sitestatedata: {
      label: "sitestatedata",
      name: "sitestatedata",
      fields: {},
    },
  };
  
  
  export let templateareaitemDragpanelmetadataInitMap = {
    navbartemplateareaitem: navbarmetadataInit,
  
    recordlisttemplateareaitem: recordlisttemplateareaitemmetadataInit,
  
    recordlistdatanormaltable: recordlisttemplateareaitemmetadataInitnormaltable,
    recordlistdata: recordlisttemplateareaitemmetadataInit,
  };