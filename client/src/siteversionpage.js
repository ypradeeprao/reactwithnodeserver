/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  alltypecompconsolelog,
  dragdropHandler,
  sortArray,
  gettabledatafromDatabase,
  inserttabledatainDatabase,
  onbeforeafterLoadHandler,
  resettabledatainDatabase,
  updatetabledatainDatabase,
  updatestandardcolumndata,
} from "./logic";
import {
  iconmetadataAdd,
  iconmetadataEdit,
  iconmetadataDrag,
  iconmetadataThumsup,
  templateareaitemsectioncolumnlistdragpanelmetadataInit,
  templateareaitemlistmetadataInit,
  iconmetadataSave,
  iconmetadataBasic,
  iconmetadataUndo,
  iconmetadataRedo,
} from "./constants";
import {
  Templateareaitemlistcomp,
  Alltypetemplateareaitemcomp,
  Draggabletemplateareaitemhtml,
  DraggablefavouriteuiconfigsTemplateareaitemshtml,
} from "./templateareaitem";

import { Alltypecomp } from "./templateareaitemsectioncolumn";
import { Templateareaitemsectioncomp } from "./templateareaitemsection";
import { Popuphtml } from "./templateareaitemsectioncolumn";
import { Editpropscomp } from "./editpropscomp";
const { useState, useEffect, createRef } = React;

let Templatearealisthtml = (methodprops) => {
  alltypecompconsolelog("Templatearealisthtml-render");
  let {
    templatearealistmetadata,
    sitestatedata,
    modetype,
    parenthandleClick,
    parenthandleChange,
  } = methodprops;

  let templateareaitemlistmetadataArray = [];
  let templateareaitemlistmetadataArraySorted = [];
  if (Object.keys(templatearealistmetadata.items).length > 0) {
    for (let i in templatearealistmetadata.items) {
      templateareaitemlistmetadataArray.push(templatearealistmetadata.items[i]);
    }
    templateareaitemlistmetadataArraySorted = sortArray(
      templateareaitemlistmetadataArray,
      "order",
      "integer"
    );
  }

  let mainpanelHtml = [];
  for (let i = 0; i < templateareaitemlistmetadataArraySorted.length; i++) {
    mainpanelHtml.push(
      <Templateareaitemlistcomp
        sitestatedata={JSON.parse(JSON.stringify(sitestatedata))}
        templateareaitemlistmetadata={JSON.parse(
          JSON.stringify(templateareaitemlistmetadataArraySorted[i])
        )}
        modetype={modetype === "build" ? "buildicon" : "normal"}
        parenthandleClick={(props) => parenthandleClick(props)}
        parenthandleChange={(props) => parenthandleChange(props)}
      />
    );
  }

  return mainpanelHtml;
};

let Navutiltemplatearealisthtml = () => {
  alltypecompconsolelog("sitecomp-Navutiltemplatearealisthtml");
  let {
    modetype,
    homesiteversionpagetemplatedata,
    currentsiteversionpagetemplatedata,
    parenthandleClick,
    parenthandleChange,
  } = methodprops;

  let homesiteversionpagetemplatearealistmetadata,
    currenttemplatearealistmetadata;

  if (homesiteversionpagetemplatedata && homesiteversionpagetemplatedata.data) {
    homesiteversionpagetemplatearealistmetadata =
      homesiteversionpagetemplatedata.data.metadata;
  }

  if (
    currentsiteversionpagetemplatedata &&
    currentsiteversionpagetemplatedata.data
  ) {
    currenttemplatearealistmetadata =
      currentsiteversionpagetemplatedata.data.metadata;
  }
  alltypecompconsolelog(
    "currenttemplatearealistmetadata",
    currenttemplatearealistmetadata
  );
  let mainpanelHtml = [];
  let isnavbarcompexists = false;
  if (currentsiteversionpagetemplatedata && currenttemplatearealistmetadata) {
    for (let i in currenttemplatearealistmetadata.items) {
      let currenttemplateareaitemlist =
        currenttemplatearealistmetadata.items[i];
      for (let j in currenttemplateareaitemlist.items) {
        if (
          currenttemplateareaitemlist.items[j].type === "navbartemplateareaitem"
        ) {
          isnavbarcompexists = true;
        }
      }
    }
    alltypecompconsolelog("isnavbarcompexists", isnavbarcompexists);
    if (
      isnavbarcompexists === false &&
      homesiteversionpagetemplatedata &&
      homesiteversionpagetemplatearealistmetadata
      //  && modetype === "normal"
    ) {
      for (let i in homesiteversionpagetemplatearealistmetadata.items) {
        let homesiteversionpagetemplateareaitemlist =
          homesiteversionpagetemplatearealistmetadata.items[i];
        alltypecompconsolelog(
          "homesiteversionpagetemplateareaitemlist",
          homesiteversionpagetemplateareaitemlist
        );
        for (let j in homesiteversionpagetemplateareaitemlist.items) {
          if (
            homesiteversionpagetemplateareaitemlist.items[j].type ===
              "navbartemplateareaitem" ||
            homesiteversionpagetemplateareaitemlist.items[j].type ===
              "utilbartemplateareaitem"
          ) {
            alltypecompconsolelog(
              "homesiteversionpagetemplateareaitemlist.items[j].type",
              homesiteversionpagetemplateareaitemlist.items[j].type
            );

            mainpanelHtml.push(
              <Alltypetemplateareaitemcomp
                isparenttablelayoutmetadatafield="false"
                parentalltypecompstatedata={{}}
                sitestatedata={props.sitestatedata}
                templatemetadata={
                  homesiteversionpagetemplateareaitemlist.items[j]
                }
                modetype="normal"
                draggable="false"
                parenthandleClick={(props) =>
                  fromchildhandleClick({ ...props })
                }
                parenthandleChange={(props) =>
                  fromchildhandleChange({ ...props })
                }
              />
            );
          }
        }
      }
    }
  }

  return mainpanelHtml;
};

let Currentsiteversionpagelisthtml = (methodprops) => {
    let mainpanelHtml = [];
    let { samesitepagenamelist, parenthandleClick, parenthandleChange } =
      methodprops;
    let sectioncolumnItems = {};
  
    for (let i = 0; i < samesitepagenamelist.length; i++) {
      sectioncolumnItems[i + 3] = {
        type: "text",
        dragtemplatename: samesitepagenamelist[i].id,
        dragtemplatetype: "samesitepagenamelist",
        innerText: samesitepagenamelist[i].data.label,
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
  
        onclick: {
          redirecttopage: "",
          redirecttosearchdatastring: "",
          redirecttype: "",
          type: "redirect",
        },
        onchange: {},
        inputoutputfieldprops: {},
        order: i + 3,
      };
    }
  
    let templateareasection = {
      items: sectioncolumnItems,
      type: "templateareaitemsection",
      style: {},
      order: "",
    };
  
    mainpanelHtml.push(<div style={{ width: "100%" }}>Pages</div>);
    mainpanelHtml.push(
      <div style={{ width: "100%" }}>
        <input
          style={{ width: "100%" }}
          onBlur={(e) =>
            parenthandleChange({
              type: "createpagenamechange",
              value: e.target.value,
            })
          }
        />
      </div>
    );
    mainpanelHtml.push(
      <div
        style={{ width: "100%" }}
        onClick={() => parenthandleClick({ type: "createpagebutton" })}
      >
        Create Page
      </div>
    );
    mainpanelHtml.push(
      <Templateareaitemsectioncomp
        datatype="templateareaitemsection"
        draggablefortemplatebuilder={false}
        sitestatedata={{}}
        templateareaitemstatedata={{}}
        sectionmetadata={templateareasection}
        modetype="normal"
        parenthandleClick={(props) =>
          parenthandleClick({
            ...props,
            sectiontype: "samesitepagenamelist",
          })
        }
        parenthandleChange={(props) =>
          parenthandleChange({
            ...props,
            sectiontype: "samesitepagenamelist",
          })
        }
      />
    );
    return mainpanelHtml;
  };
  

  let Draggabletemplateareaitemsectioncolumnshtml = () => {
    let mainpanelHtml = [];
    mainpanelHtml.push(
      <Templateareaitemsectioncomp
        datatype="templateareaitemsection"
        draggablefortemplatebuilder={true}
        sitestatedata={{}}
        templateareaitemstatedata={{}}
        sectionmetadata={templateareaitemsectioncolumnlistdragpanelmetadataInit}
        modetype="normal"
      //   parenthandleClick={(props) =>
      //     fromchildhandleClick({
      //       ...props,
      //       sectiontype: "templateareaitemlistdragitems",
      //     })
      //   }
      //   parenthandleChange={(props) =>
      //     fromchildhandleChange({
      //       ...props,
      //       sectiontype: "templateareaitemlistdragitems",
      //     })
      //   }
      />
    );
    return mainpanelHtml;
  };
  
  
  
  
  let DraggablefavouriteuiconfigsSectioncolumnshtml = (methodprops) => {
    let mainpanelHtml = [];
    let { favouriteuiconfigslistmetadata } = methodprops;
  
    let sectioncolumnItems = {};
    sectioncolumnItems["0"] = {
      type: "text",
      dragtemplatename: "",
      dragtemplatetype: "",
      innerText: "Favourites-Columns",
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
    };
    let favouriteuiconfigslistmetadatafiltered = [];
    for (let i = 0; i < favouriteuiconfigslistmetadata.length; i++) {
      let configmetadatatype = "";
      if (
        favouriteuiconfigslistmetadata[i].data &&
        favouriteuiconfigslistmetadata[i].data.metadata
      ) {
        configmetadatatype = favouriteuiconfigslistmetadata[i].data.metadata.type;
      }
      if (
        configmetadatatype === "text" ||
        configmetadatatype === "button" ||
        configmetadatatype === "icon" ||
        configmetadatatype === "inputoutputfield" ||
        configmetadatatype === "image"
      ) {
        favouriteuiconfigslistmetadatafiltered.push(
          favouriteuiconfigslistmetadata[i]
        );
      }
    }
  
    for (let i = 0; i < favouriteuiconfigslistmetadatafiltered.length; i++) {
      sectioncolumnItems[i + 1] = {
        type: "text",
        dragtemplatename: favouriteuiconfigslistmetadatafiltered[i].id,
        dragtemplatetype: "favouritetemplateareaitemsetioncolumn",
        innerText: favouriteuiconfigslistmetadatafiltered[i].data.name,
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
        order: i + 1,
      };
    }
  
    let templateareasection = {
      items: sectioncolumnItems,
      type: "templateareaitemsection",
      style: {},
      order: "",
    };
  
    mainpanelHtml.push(
      <Templateareaitemsectioncomp
        datatype="templateareaitemsection"
        draggablefortemplatebuilder={true}
        sitestatedata={{}}
        templateareaitemstatedata={{}}
        sectionmetadata={templateareasection}
        modetype="normal"
      //   parenthandleClick={(props) =>
      //     fromchildhandleClick({
      //       ...props,
      //       sectiontype: "templateareaitemlistpages",
      //     })
      //   }
      //   parenthandleChange={(props) =>
      //     fromchildhandleChange({
      //       ...props,
      //       sectiontype: "templateareaitemlistpages",
      //     })
      //   }
      />
    );
    return mainpanelHtml;
  };
  

export let Templatearealistcomp = (props) => {
  const [compstate, setCompstate] = useState({
    showui: false,
    modetype: props.modetype,
    siteversionpagetemplatedata: {},
    homesiteversionpagetemplatedata: {},
    currentsiteversionpagetemplatedata: {},
    templatearealiststatedata: { onchangedata: {}, onclickdata: {} },
  });

  useEffect(() => {
    alltypecompconsolelog("Templatearealistcomp-useeffect");

    //  resettabledatainDatabase();
    fetchsiteversionpageDatafromDB();
    //  fetchAllsiteversionpageDatafromDB();
  }, []);

  let showui = async (methodprops) => {
    alltypecompconsolelog("showui", methodprops);
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: true });
  };
  let hideui = async (methodprops) => {
    alltypecompconsolelog("hideui", methodprops);
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: false });
  };

  async function fetchsiteversionpageDatafromDB(methodprops) {
    alltypecompconsolelog(
      "Templatearealistcomp-fetchsiteversionpageDatafromDB",
      props
    );

    let {
      sitestatedata,
      sitetemplatemetadataid,
      siteversionpagemetadataid,
      vendorsiteversionpagemetadataid,
    } = props;
    let { orgdata, urldata } = sitestatedata;

    if (
      methodprops &&
      methodprops.vendorsiteversionpagemetadataid &&
      methodprops.vendorsiteversionpagemetadataid !== ""
    ) {
      vendorsiteversionpagemetadataid =
        methodprops.vendorsiteversionpagemetadataid;
    }

    let siteversionpagetemplatedataparams = {};
    if (siteversionpagemetadataid && siteversionpagemetadataid !== "") {
      siteversionpagetemplatedataparams = {
        tablename: "siteversionpagemetadata",
        id: siteversionpagemetadataid,
        idoperator: "beginswith",
        orgname: orgdata.data.orgname,
      };
    }

    if (
      vendorsiteversionpagemetadataid &&
      vendorsiteversionpagemetadataid !== ""
    ) {
      siteversionpagetemplatedataparams = {
        tablename: "vendorsiteversionpagemetadata",
        id: vendorsiteversionpagemetadataid,
        idoperator: "beginswith",
        orgname: orgdata.data.orgname,
      };
    }

    if (sitetemplatemetadataid && sitetemplatemetadataid !== "") {
      siteversionpagetemplatedataparams = {
        tablename: "sitetemplatemetadata",
        id: sitetemplatemetadataid,
        idoperator: "beginswith",
        orgname: orgdata.data.orgname,
      };
    }

    let homesiteversionpagetemplatedata = {};
    let currentsiteversionpagetemplatedata = {};

    let siteversionpagetemplatedata = await gettabledatafromDatabase(
      siteversionpagetemplatedataparams
    );
    alltypecompconsolelog(siteversionpagetemplatedata);
    if (siteversionpagetemplatedata.length <= 0) {
      alert("no home page exists");
    } else {
      if (props.modetype === "normal") {
        let clickhandlerresult = await onbeforeafterLoadHandler({
          siteversionpagetemplatedata: siteversionpagetemplatedata[0],
          sitestatedata: sitestatedata,
        });
        let openpopup = false,
          popupside = "",
          popupmetadata = {};
        if (clickhandlerresult.result.checkifconditionreplacetext === "true") {
          if (
            clickhandlerresult.result.checkifalertreplacetext !== "" &&
            clickhandlerresult.result.checkifalertreplacetext !== undefined
          ) {
            alert(clickhandlerresult.result.checkifalertreplacetext);

            await showui({
              ...methodprops,
              openpopup: openpopup,
              popupside: popupside,
              popupmetadata: popupmetadata,
              siteversionpagetemplatedata: siteversionpagetemplatedata[0],
            });
          } else if (clickhandlerresult.result.showpopup === "true") {
            openpopup = true;
            popupside =
              siteversionpagetemplatedata[0].data.metadata.onbeforeafterload
                .popupside;
            popupmetadata =
              siteversionpagetemplatedata[0].data.metadata.onbeforeafterload
                .popupmetadata;

            await showui({
              ...methodprops,
              openpopup: openpopup,
              popupside: popupside,
              popupmetadata: popupmetadata,
              siteversionpagetemplatedata: siteversionpagetemplatedata[0],
            });
          } else if (clickhandlerresult.result.redirect === "true") {
            props.parenthandleClick({
              type: "executeonsiteparent",
              sitestatedata: clickhandlerresult.sitestatedata,
              isupdatesitestatedata: false,
              isrefreshsiteparent: false,
              isredirect: true,
              isrefreshcompparent: false,
            });
          }
        } else {
          await showui({
            ...methodprops,
            openpopup: openpopup,
            popupside: popupside,
            popupmetadata: popupmetadata,
            siteversionpagetemplatedata: siteversionpagetemplatedata[0],
          });
        }
      } else {
        let samesitepagenamelist = [];
        if (
          vendorsiteversionpagemetadataid &&
          vendorsiteversionpagemetadataid !== "" &&
          siteversionpagetemplatedata[0].data.parentid
        ) {
          let samesiteversionpagetemplatedataparams = {
            tablename: "vendorsiteversionpagemetadata",
            id: "vstvp-" + siteversionpagetemplatedata[0].data.parentid,
            idoperator: "beginswith",
            orgname: orgdata.data.orgname,
          };
          samesitepagenamelist = await gettabledatafromDatabase(
            samesiteversionpagetemplatedataparams
          );
          for (let i = 0; i < samesitepagenamelist.length; i++) {
            if (samesitepagenamelist[i].data.tabname === "home") {
              homesiteversionpagetemplatedata = samesitepagenamelist[i];
            }
          }

          alltypecompconsolelog("samesitepagenamelist" + samesitepagenamelist);
        }

        await showui({
          ...methodprops,
          openpopup: false,
          popupside: "",
          popupmetadata: {},
          siteversionpagetemplatedata: siteversionpagetemplatedata[0],
          samesitepagenamelist: samesitepagenamelist,
          homesiteversionpagetemplatedata: homesiteversionpagetemplatedata,
          currentsiteversionpagetemplatedata: siteversionpagetemplatedata[0],
        });
      }
    }
  }

  let handleClick = async (methodprops) => {
    alltypecompconsolelog("Templatearealistcomp-handleClick");
    alltypecompconsolelog(methodprops);

    let { type, order } = methodprops;
    let {
      draggable,
      sitetemplatemetadataid,
      siteversionpagemetadataid,
      vendorsiteversionpagemetadataid,
    } = props;
    let { siteversionpagetemplatedata } = compstate;

    let tablename = "siteversionpage";

    if (sitetemplatemetadataid && sitetemplatemetadataid !== "") {
      tablename = "sitetemplatemetadata";
    }

    if (siteversionpagemetadataid && siteversionpagemetadataid !== "") {
      tablename = "siteversionpagemetadata";
    }

    if (
      vendorsiteversionpagemetadataid &&
      vendorsiteversionpagemetadataid !== ""
    ) {
      tablename = "vendorsiteversionpagemetadata";
    }

    let templatearealistmetadatajs = {};
    if (siteversionpagetemplatedata.data.metadata) {
      templatearealistmetadatajs = JSON.parse(
        JSON.stringify(siteversionpagetemplatedata.data.metadata)
      );
    }
    if (siteversionpagetemplatedata.data.metadata) {
      templatearealistmetadatajs = JSON.parse(
        JSON.stringify(siteversionpagetemplatedata.data.metadata)
      );
    }

    if (type === "resettabledatainDatabase") {
      await resettabledatainDatabase();
      await hideui({});
    } else if (type === "showbuildui") {
      await hideui({});
      await showui({ showbuildpropsui: true });
    } else if (type === "makemodetypebuild") {
      await hideui({});
      await showui({ modetype: "build" });
    } else if (type === "makemodetypenormalandpublish") {
      let siteversionpagetemplatedatalist = [];
      siteversionpagetemplatedatalist.push(siteversionpagetemplatedata);

      alltypecompconsolelog(siteversionpagetemplatedatalist);
      updatetabledatainDatabase({
        tablename: tablename,
        tabledatalist: siteversionpagetemplatedatalist,
      });
      await hideui({});
      await showui({
        modetype: "normal",
      });
    } else if (type === "makemodetypebuildicon") {
      await hideui({});
      await showui({
        modetype: "buildicon",
      });
    } else if (type === "addtemplateareaitem") {
      templatearealistmetadatajs.items = dragdropHandler({
        changingobject: templatearealistmetadatajs.items,
        addingsubobject: templateareaitemlistmetadataInit,
        operationtype: "add",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });

      siteversionpagetemplatedata.data.metadata = templatearealistmetadatajs;
      await hideui({});
      await showui({
        siteversionpagetemplatedata: siteversionpagetemplatedata,
      });
    } else if (type === "executeundo") {
    } else if (type === "executeredo") {
    }
  };

  let fromchildhandleClick = async (methodprops) => {
    alltypecompconsolelog("Templatearealistcomp-fromchildhandleClick");
    alltypecompconsolelog(methodprops);
    let { type, order, sectioncolumnmetadata } = methodprops;

    let {
      siteversionpagetemplatedata,
      currentsiteversionpagetemplatedata,
      samesitepagenamelist,
    } = compstate;

    let templatearealistmetadatajs = {};
    if (siteversionpagetemplatedata.data.metadata) {
      templatearealistmetadatajs = JSON.parse(
        JSON.stringify(siteversionpagetemplatedata.data.metadata)
      );
    }
    if (siteversionpagetemplatedata.data.metadata) {
      templatearealistmetadatajs = JSON.parse(
        JSON.stringify(siteversionpagetemplatedata.data.metadata)
      );
    }

    if (type === "savefromeditpropscomp") {
      siteversionpagetemplatedata.data.metadata = methodprops.metadata;

      await hideui({ siteversionpagetemplatedata: {} });
      await showui({
        siteversionpagetemplatedata: siteversionpagetemplatedata,
        showbuildpropsui: false,
      });
    } else if (type === "deletetemplatearea") {
      templatearealistmetadatajs.items = dragdropHandler({
        changingobject: templatearealistmetadatajs.items,
        addingsubobject: {},
        operationtype: "delete",
        preposttext: "",
        draggedcomporder: "",
        neworder: methodprops.templateareametadata.order,
      });

      siteversionpagetemplatedata.data.metadata = templatearealistmetadatajs;

      await hideui({ siteversionpagetemplatedata: {} });
      await showui({
        siteversionpagetemplatedata: siteversionpagetemplatedata,
      });
    } else if (type === "savefromtemplatearea") {
      for (let i in templatearealistmetadatajs.items) {
        if (
          templatearealistmetadatajs.items[i].order ===
          methodprops.templateareaitemlistmetadata.order
        ) {
          templatearealistmetadatajs.items[i] =
            methodprops.templateareaitemlistmetadata;
        }
      }
      alltypecompconsolelog(templatearealistmetadatajs);

      siteversionpagetemplatedata.data.metadata = templatearealistmetadatajs;
      await hideui({ siteversionpagetemplatedata: {} });
      await showui({
        siteversionpagetemplatedata: siteversionpagetemplatedata,
      });
    } else if (
      type === "executeonsiteparent" ||
      type === "executeclickfromsectioncolumn"
    ) {
      if (
        methodprops.sectiontype === "samesitepagenamelist" &&
        methodprops.sectioncolumnmetadata.dragtemplatename &&
        methodprops.sectioncolumnmetadata.dragtemplatename !== ""
      ) {
        let vendorsiteversionpagemetadataid =
          methodprops.sectioncolumnmetadata.dragtemplatename;
        await hideui({});
        await fetchsiteversionpageDatafromDB({
          vendorsiteversionpagemetadataid: vendorsiteversionpagemetadataid,
        });
      } else if (
        type === "executeonsiteparent" &&
        props.isparentalltypecomp === "true" &&
        methodprops.isredirect === true
      ) {
        let pagename = methodprops.sitestatedata.urldata.tabname;
        let pageid = "";
        for (let i = 0; i < samesitepagenamelist.length; i++) {
          if (samesitepagenamelist[i].data.tabname === pagename) {
            pageid = samesitepagenamelist[i].id;
          }
        }
        if (pageid && pageid !== "") {
          await hideui({});
          await fetchsiteversionpageDatafromDB({
            vendorsiteversionpagemetadataid: pageid,
          });
        }
      } else {
        props.parenthandleClick(methodprops);
      }
    } else if (type === "createpagebutton") {
      let createpagename =
        compstate.templatearealiststatedata.onchangedata["createpagename"];
      if (createpagename && createpagename !== "") {
        let insertlist = [];
        let insertobject = {};

        insertobject.data = {};
        insertobject.data.name = createpagename;
        insertobject.data.label = createpagename;
        insertobject.data.tabname = createpagename;
        insertobject.data.parentid =
          currentsiteversionpagetemplatedata.data.parentid;
        insertlist.push(insertobject);

        let tabledatalistmodifiedlist = await updatestandardcolumndata({
          modifytype: "insert",
          tablename: "vendorsiteversionpagemetadata",
          tabledatalist: insertlist,
          tabledatalistOld: [],
          sitestatedata: props.sitestatedata,

          tablemetadata: {},
          templateareaitemstatedata: {},
        });

        let lrinsertresult = await inserttabledatainDatabase({
          tablename: "vendorsiteversionpagemetadata",
          tabledatalist: tabledatalistmodifiedlist,
        });
        alltypecompconsolelog("lrinsertresult", lrinsertresult);
        if (lrinsertresult.issuccess !== "true") {
        }
      }
    }
  };

  let fromchildhandleChange = async (methodprops) => {
    alltypecompconsolelog("Templatearealistcomp-fromchildhandleChange");
    alltypecompconsolelog(methodprops);

    let { sectioncolumnmetadata, type } = methodprops;

    if (
      (type === "executechangefromtemplatearea" ||
        type === "executechangefromsectioncolumn") &&
      sectioncolumnmetadata &&
      sectioncolumnmetadata.onchange &&
      (sectioncolumnmetadata.onchange.type === "updatesitestatedata" ||
        sectioncolumnmetadata.onchange.type ===
          "updatesitestatedataandrefreshui")
    ) {
      props.parenthandleChange(methodprops);
    } else if (type === "executeonsiteparent") {
      props.parenthandleChange(methodprops);
    } else if (type === "createpagenamechange") {
      let createpagename = methodprops.value;
      compstate.templatearealiststatedata.onchangedata["createpagename"] =
        createpagename;
      await showui({
        templatearealiststatedata: compstate.templatearealiststatedata,
      });
    }
  };

  if (compstate.showui !== true) {
    return <></>;
  } else {
    let elementHtml = [];
    let elementbuildiconsHtml = [];
    let {
      modetype,
      siteversionpagetemplatedata,
      openpopup,
      popupside,
      popupmetadata,
      showbuildpropsui,
      samesitepagenamelist,
      homesiteversionpagetemplatedata,
      currentsiteversionpagetemplatedata
    } = compstate;

    let templatearealistmetadata = {};

    if (
      siteversionpagetemplatedata &&
      siteversionpagetemplatedata.data &&
      siteversionpagetemplatedata.data.metadata
    ) {
      templatearealistmetadata = siteversionpagetemplatedata.data.metadata;
    }
    alltypecompconsolelog("Templatearealistcomp-render");
    alltypecompconsolelog(compstate);

    let popuphtml = [];
    if (openpopup === true) {
      popuphtml.push(
        <Popuphtml
          popupside={popupside}
          popupmetadata={popupmetadata}
          parentalltypecompstatedata={{}}
          sitestatedata={props.sitestatedata}
          modetype={modetype}
          showalltypecomppopupinbuildmode={false}
          sideofCursorclickX="left"
          sideofCursorclickY="top"
          parenthandleClick={(props) => fromchildhandleClick(props)}
          parenthandleChange={(props) => fromchildhandleChange(props)}
        />
      );
    }

    let editpropshtml = [];
    if (showbuildpropsui) {
      editpropshtml.push(
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "fixed",
              left: "10%",
              top: "200px",
              width: "700px",
              height: "400px",
              overflow: "auto",
              backgroundColor: "white",
              border: "1px solid grey",
              zIndex: 999,
            }}
          >
            <Editpropscomp
              sitestatedata={props.sitestatedata}
              metadata={templatearealistmetadata}
              parenthandleClick={(props) => fromchildhandleClick(props)}
              parenthandleChange={(props) => fromchildhandleChange(props)}
            />
          </div>
        </div>
      );
    }

    if (modetype === "buildicon") {
      elementbuildiconsHtml.push(
        <>
          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataEdit}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "makemodetypebuild" })
            }
            parenthandleChange={(props) => {}}
          />

          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataSave}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "makemodetypenormalandpublish" })
            }
            parenthandleChange={(props) => {}}
          />

          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataBasic}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "resettabledatainDatabase" })
            }
            parenthandleChange={(props) => {}}
          />

          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataBasic}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "resettabledatainDatabase" })
            }
            parenthandleChange={(props) => {}}
          />
        </>
      );
    }

    if (modetype === "build") {
      elementbuildiconsHtml.push(
        <>
          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataAdd}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "addtemplateareaitem" })
            }
            parenthandleChange={(props) => {}}
          />
          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataThumsup}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "makemodetypebuildicon" })
            }
            parenthandleChange={(props) => {}}
          />
          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataUndo}
            modetype="normal"
            parenthandleClick={(props) => handleClick({ type: "executeundo" })}
            parenthandleChange={(props) => {}}
          />
          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataRedo}
            modetype="normal"
            parenthandleClick={(props) => handleClick({ type: "executeredo" })}
            parenthandleChange={(props) => {}}
          />

          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataDrag}
            modetype="normal"
            parenthandleClick={(props) => handleClick({ type: "showbuildui" })}
            parenthandleChange={(props) => {}}
          />
        </>
      );
    }
    if (
      modetype === "normal" &&
      props.sitestatedata &&
      props.sitestatedata.urldata &&
      props.sitestatedata.urldata.tabname ===
        "buildvendorsiteversionpagemetadata"
    ) {
      elementbuildiconsHtml.push(
        <>
          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataEdit}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "makemodetypebuild" })
            }
            parenthandleChange={(props) => {}}
          />
        </>
      );
    }

    let templatearealiststyle = templatearealistmetadata.style;

    if (modetype === "buildicon") {
      elementHtml.push(
        <>
          <div>{elementbuildiconsHtml}</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              ...templatearealiststyle,
            }}
          >
            <Templatearealisthtml
              templatearealistmetadata={templatearealistmetadata}
              sitestatedata={props.sitestatedata}
              modetype={modetype}
              parenthandleClick={fromchildhandleClick}
              parenthandleChange={fromchildhandleChange}
            />
          </div>
        </>
      );
    } else if (modetype === "build") {
      elementHtml.push(
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              ...templatearealiststyle,
            }}
          >
            <div style={{ width: "20%", height: "100vh", overflow: "auto" }}>
              <div>{elementbuildiconsHtml}</div>
              <Draggabletemplateareaitemsectioncolumnshtml />
              <Draggabletemplateareaitemhtml />

              <DraggablefavouriteuiconfigsSectioncolumnshtml
                favouriteuiconfigslistmetadata={
                  props.sitestatedata.favouriteuiconfigslistmetadata
                }
              />
              <DraggablefavouriteuiconfigsTemplateareaitemshtml
                favouriteuiconfigslistmetadata={
                  props.sitestatedata.favouriteuiconfigslistmetadata
                }
              />
              <Currentsiteversionpagelisthtml
                samesitepagenamelist={samesitepagenamelist}
                parenthandleClick={fromchildhandleClick}
                parenthandleChange={fromchildhandleChange}
              />
            </div>
            <div
              style={{
                width: "80%",
                height: "100vh",
                overflow: "auto",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Templatearealisthtml
                templatearealistmetadata={templatearealistmetadata}
                sitestatedata={props.sitestatedata}
                modetype={modetype}
                parenthandleClick={fromchildhandleClick}
                parenthandleChange={fromchildhandleChange}
              />
            </div>
          </div>
        </>
      );
      if (showbuildpropsui) {
        elementHtml.push(<>{editpropshtml}</>);
      }
    } else if (modetype === "normal") {
      if (
        props.sitestatedata &&
        props.sitestatedata.urldata &&
        props.sitestatedata.urldata.tabname ===
          "buildvendorsiteversionpagemetadata" &&
        samesitepagenamelist &&
        samesitepagenamelist.length > 0
      ) {
        elementHtml.push(
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                ...templatearealiststyle,
              }}
            >
              <div style={{ width: "20%", height: "100vh", overflow: "auto" }}>
                <div>{elementbuildiconsHtml}</div>
                <Currentsiteversionpagelisthtml
                  samesitepagenamelist={samesitepagenamelist}
                  parenthandleClick={fromchildhandleClick}
                  parenthandleChange={fromchildhandleChange}
                />
              </div>
              <div style={{ width: "80%", height: "100vh", overflow: "auto" }}>
                <Navutiltemplatearealisthtml
                  parenthandleClick={fromchildhandleClick}
                  parenthandleChange={fromchildhandleChange}
                modetype={modetype}
                homesiteversionpagetemplatedata={homesiteversionpagetemplatedata}
                currentsiteversionpagetemplatedata={currentsiteversionpagetemplatedata}
                />

                <Templatearealisthtml
                  templatearealistmetadata={templatearealistmetadata}
                  sitestatedata={props.sitestatedata}
                  modetype={modetype}
                  parenthandleClick={fromchildhandleClick}
                  parenthandleChange={fromchildhandleChange}
                />
              </div>
            </div>
          </>
        );
      } else {
        elementHtml.push(
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                ...templatearealiststyle,
              }}
            >
               <Navutiltemplatearealisthtml
                  parenthandleClick={fromchildhandleClick}
                  parenthandleChange={fromchildhandleChange}
                modetype={modetype}
                homesiteversionpagetemplatedata={homesiteversionpagetemplatedata}
                currentsiteversionpagetemplatedata={currentsiteversionpagetemplatedata}
                />

              <Templatearealisthtml
                templatearealistmetadata={templatearealistmetadata}
                sitestatedata={props.sitestatedata}
                modetype={modetype}
                parenthandleClick={fromchildhandleClick}
                parenthandleChange={fromchildhandleChange}
              />
            </div>
          </>
        );
      }
      elementHtml.push(<>{popuphtml}</>);
    }

    return <>{elementHtml}</>;
  }
};
