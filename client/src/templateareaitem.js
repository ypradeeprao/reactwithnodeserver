/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  alltypecompconsolelog, replacedynamictext, dragdropHandler, sortArray,
  templateareaitemconsolelog, gettabledatafromDatabase, allowDrop, dragstart, dragEnter,
  dragLeave, getdroppedtemplateareaitem, alltypecompChangeHandler, alltypecompClickHandler,
  gettabledatafromDatabaseUsingSectionMetadata, inserttabledatainDatabase
} from "./logic";
import {
  iconmetadataAdd,
  iconmetadataThumsup, iconmetadataThumsdown, iconmetadatamakeDraggable, iconmetadataDrag,
  templateareaitemDragpanelmetadataInitMap, sectionmetadataInitBlank, iconmetadataEdit,
  templateareaitemlistdragpanelmetadataInit, iconmetadatacircleDrag, navbarmetadataInit
} from "./constants";
import { Alltypecomp } from "./templateareaitemsectioncolumn";
import { Templateareaitemsectioncomp } from "./templateareaitemsection";
import { Editpropscomp } from "./editpropscomp";
const { useState, useEffect, createRef } = React;

export let Draggabletemplateareaitemhtml = (methodprops) => {
  // let{parenthandleClick, parenthandleChange} = methodprops;
  let mainpanelHtml = [];
  mainpanelHtml.push(
    <Templateareaitemsectioncomp
      datatype="templateareaitemsection"
      draggablefortemplatebuilder={true}
      sitestatedata={{}}
      templateareaitemstatedata={{}}
      sectionmetadata={templateareaitemlistdragpanelmetadataInit}
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

export let DraggablefavouriteuiconfigsTemplateareaitemshtml = (methodprops) => {
  let mainpanelHtml = [];
  let { favouriteuiconfigslistmetadata } = methodprops;
  let sectioncolumnItems = {};
  sectioncolumnItems["0"] = {
    type: "text",
    dragtemplatename: "",
    dragtemplatetype: "",
    innerText: "Favourites- Templateareaitems",
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
      configmetadatatype !== "text" &&
      configmetadatatype !== "button" &&
      configmetadatatype !== "icon" &&
      configmetadatatype !== "inputoutputfield" &&
      configmetadatatype !== "image"
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
      dragtemplatetype: "favouritetemplateareaitem",
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

export let DraggableTableColumnButtonmetadatalisthtml = (methodprops) => {
  let mainpanelHtml = [];
  alltypecompconsolelog("DraggableTableColumnButtonmetadatalisthtml-render");
  alltypecompconsolelog(methodprops);
  let {
    tablecolumnbuttonmetadatalist,
    parenthandleClick,
    parenthandleChange,
    columnbuttontype,
  } = methodprops;
  if (
    tablecolumnbuttonmetadatalist &&
    tablecolumnbuttonmetadatalist.length > 0
  ) {
    let tablecolumnbuttonmetadatalistSectionitems = {};
    for (let i = 0; i < tablecolumnbuttonmetadatalist.length; i++) {
      tablecolumnbuttonmetadatalistSectionitems[i] = {
        type: "text",
        dragtemplatename: tablecolumnbuttonmetadatalist[i].data.name,
        dragtemplatetype: columnbuttontype,
        innerText: tablecolumnbuttonmetadatalist[i].data.label,
        innerTextstyle: {},
        style: {
          fontSize: "20px",
          padding: "10px",
          // width: "100%",
        },
        imgicon: { style: {} },
        overtext: {},
        onclick: {},
        onchange: {},
        inputoutputfieldprops: {},
        order: i,
      };
    }

    tablecolumnbuttonmetadatalistSectionitems[
      tablecolumnbuttonmetadatalist.length
    ] = {
      type: "text",
      dragtemplatename: "blankrow",
      dragtemplatetype: columnbuttontype,
      innerText: "blankrow",
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
      order: tablecolumnbuttonmetadatalist.length,
    };

    let tablecolumnmetadatalistSectionmetadata = {
      items: tablecolumnbuttonmetadatalistSectionitems,
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
        sectionmetadata={tablecolumnmetadatalistSectionmetadata}
        modetype="normal"
        parenthandleClick={(props) =>
          parenthandleClick({
            ...props,
            sectiontype: columnbuttontype,
          })
        }
        parenthandleChange={(props) =>
          parenthandleChange({
            ...props,
            sectiontype: columnbuttontype,
          })
        }
      />
    );
  }
  return mainpanelHtml;
};

function Navbarhtml(props) {
  let handleClick = async (methodprops) => { };

  let handleChange = async (methodprops) => {
    let { type, order } = methodprops;
  };

  let fromchildhandleClick = async (methodprops) => {
    alltypecompconsolelog("Navbarhtml-fromchildhandleClick");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;
    // let templatemetadatajs = JSON.parse(JSON.stringify(props.templatemetadata));

    let lstobjitemfromparentjs = props.lstobjitemfromparent;
    if (type === "savefromtemplateareaitemsectioncomp") {
      if (
        methodprops.sectiontype === "firstleftsectionmetadata" ||
        methodprops.sectiontype === "firstcentersectionmetadata" ||
        methodprops.sectiontype === "firstrightsectionmetadata" ||
        methodprops.sectiontype === "secondleftsectionmetadata" ||
        methodprops.sectiontype === "secondrightsectionmetadata"
      ) {
        lstobjitemfromparentjs[methodprops.sectiontype] =
          methodprops.sectionmetadata;
        props.parenthandleClick({
          type: "savefromnavbarhtml",
          lstobj: lstobjitemfromparentjs,
        });
      }
    } else if (type === "executeclickfromsectioncolumn") {
      props.parenthandleClick({
        ...methodprops,
        type: "executeclickfromtemplateareaitem",
      });
    } else if (
      type === "executeonpopupparent" ||
      type === "executeonsiteparent"
    ) {
      props.parenthandleClick({
        ...methodprops,
      });
    }
  };

  let fromchildhandleChange = async (methodprops) => {
    alltypecompconsolelog("Navbarhtml-fromchildhandleChange");
    let { type, order } = methodprops;
    alltypecompconsolelog(methodprops);

    if (type === "executechangefromsectioncolumn") {
      props.parenthandleChange({
        ...methodprops,
        type: "executechangefromtemplateareaitem",
      });
    } else if (
      type === "executeonpopupparent" ||
      type === "executeonsiteparent"
    ) {
      props.parenthandleChange({
        ...methodprops,
      });
    }
  };

  let { lstobjitemfromparent, templateareaitemstatedata } = props;
  let { orientation, listitemwidth } = props.templatemetadata.items;
  let {
    firstleftsectionmetadata,
    firstcentersectionmetadata,
    firstrightsectionmetadata,
    secondleftsectionmetadata,
    secondrightsectionmetadata,
  } = lstobjitemfromparent;

  let { modetype } = props;
  let mainpanelHtml = [];

  if (orientation === "leftnav" || orientation === "rightnav") {
    mainpanelHtml.push(
      <>
        <Templateareaitemsectioncomp
          datatype="templateareaitemsection"
          draggablefortemplatebuilder={false}
          sitestatedata={props.sitestatedata}
          templateareaitemstatedata={templateareaitemstatedata}
          sectionmetadata={firstleftsectionmetadata}
          modetype={modetype}
          parenthandleClick={(props) =>
            fromchildhandleClick({
              ...props,
              sectiontype: "firstleftsectionmetadata",
            })
          }
          parenthandleChange={(props) =>
            fromchildhandleChange({
              ...props,
              sectiontype: "firstleftsectionmetadata",
            })
          }
        />
      </>
    );
  } else {
    mainpanelHtml.push(
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Templateareaitemsectioncomp
            datatype="templateareaitemsection"
            draggablefortemplatebuilder={false}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={templateareaitemstatedata}
            sectionmetadata={firstleftsectionmetadata}
            modetype={modetype}
            parenthandleClick={(props) =>
              fromchildhandleClick({
                ...props,
                sectiontype: "firstleftsectionmetadata",
              })
            }
            parenthandleChange={(props) =>
              fromchildhandleChange({
                ...props,
                sectiontype: "firstleftsectionmetadata",
              })
            }
          />
          <Templateareaitemsectioncomp
            datatype="templateareaitemsection"
            draggablefortemplatebuilder={false}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={templateareaitemstatedata}
            sectionmetadata={firstcentersectionmetadata}
            modetype={modetype}
            parenthandleClick={(props) =>
              fromchildhandleClick({
                ...props,
                sectiontype: "firstcentersectionmetadata",
              })
            }
            parenthandleChange={(props) =>
              fromchildhandleChange({
                ...props,
                sectiontype: "firstcentersectionmetadata",
              })
            }
          />
          <Templateareaitemsectioncomp
            datatype="templateareaitemsection"
            draggablefortemplatebuilder={false}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={templateareaitemstatedata}
            sectionmetadata={firstrightsectionmetadata}
            modetype={modetype}
            parenthandleClick={(props) =>
              fromchildhandleClick({
                ...props,
                sectiontype: "firstrightsectionmetadata",
              })
            }
            parenthandleChange={(props) =>
              fromchildhandleChange({
                ...props,
                sectiontype: "firstrightsectionmetadata",
              })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Templateareaitemsectioncomp
            datatype="templateareaitemsection"
            draggablefortemplatebuilder={false}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={templateareaitemstatedata}
            sectionmetadata={secondleftsectionmetadata}
            modetype={modetype}
            parenthandleClick={(props) =>
              fromchildhandleClick({
                ...props,
                sectiontype: "secondleftsectionmetadata",
              })
            }
            parenthandleChange={(props) =>
              fromchildhandleChange({
                ...props,
                sectiontype: "secondleftsectionmetadata",
              })
            }
          />
          <Templateareaitemsectioncomp
            datatype="templateareaitemsection"
            draggablefortemplatebuilder={false}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={templateareaitemstatedata}
            sectionmetadata={secondrightsectionmetadata}
            modetype={modetype}
            parenthandleClick={(props) =>
              fromchildhandleClick({
                ...props,
                sectiontype: "secondrightsectionmetadata",
              })
            }
            parenthandleChange={(props) =>
              fromchildhandleChange({
                ...props,
                sectiontype: "secondrightsectionmetadata",
              })
            }
          />
        </div>
      </>
    );
  }
  return <>{mainpanelHtml}</>;
}

function Recorddatahtml(props) {
  const [compstate, setCompstate] = useState({
    modetype: props.modetype,
    currenttab: "",
    showui: false,
    lstobjitemfromparent: JSON.parse(
      JSON.stringify(props.lstobjitemfromparent)
    ),
  });

  useEffect(() => { }, []);



  useEffect(() => {
    alltypecompconsolelog("Recorddatahtml-useeffect");
    fetchRangecolumndatafromDB({});
  }, []);

  async function fetchRangecolumndatafromDB(methodprops) {
    alltypecompconsolelog("Recorddatahtml-fetchRangecolumndatafromDB");
    templateareaitemconsolelog(
      props.templatemetadata,
      "Recorddatahtml",
      methodprops
    );
    templateareaitemconsolelog(
      props.templatemetadata,
      "fetchTableQueryMetadatafromDB",
      props
    );

    let { showonlyifrangecolumnvalue } = props.templateareaitemstatedata;

    let {
      dbgroupbyrangecolumndatatablename,
      dbgroupbyrangecolumndatatablecolumnname,
      dbgroupbyrangecolumndatacurrenttablecolumnvalue,
    } = props.templatemetadata.items;

    dbgroupbyrangecolumndatatablename = replacedynamictext({
      replacetext: dbgroupbyrangecolumndatatablename,
      sitestatedata: props.sitestatedata,
      templateareaitemstatedata: props.templateareaitemstatedata,
      parentalltypecompstatedata: {},
      tabledata: {},
    });

    alltypecompconsolelog(
      "dbgroupbyrangecolumndatatablename",
      dbgroupbyrangecolumndatatablename
    );
    dbgroupbyrangecolumndatatablecolumnname = replacedynamictext({
      replacetext: dbgroupbyrangecolumndatatablecolumnname,
      sitestatedata: props.sitestatedata,
      templateareaitemstatedata: props.templateareaitemstatedata,
      parentalltypecompstatedata: {},
      tabledata: {},
    });
    alltypecompconsolelog(
      "dbgroupbyrangecolumndatatablecolumnname",
      dbgroupbyrangecolumndatatablecolumnname
    );
    dbgroupbyrangecolumndatacurrenttablecolumnvalue = replacedynamictext({
      replacetext: dbgroupbyrangecolumndatacurrenttablecolumnvalue,
      sitestatedata: props.sitestatedata,
      templateareaitemstatedata: props.templateareaitemstatedata,
      parentalltypecompstatedata: {},
      tabledata: {},
    });
    alltypecompconsolelog(
      "dbgroupbyrangecolumndatacurrenttablecolumnvalue",
      dbgroupbyrangecolumndatacurrenttablecolumnvalue
    );

    if (
      showonlyifrangecolumnvalue !== undefined &&
      showonlyifrangecolumnvalue !== ""
    ) {
      if (
        dbgroupbyrangecolumndatatablename !== undefined &&
        dbgroupbyrangecolumndatatablename !== "" &&
        dbgroupbyrangecolumndatatablecolumnname !== undefined &&
        dbgroupbyrangecolumndatatablecolumnname !== "" &&
        showonlyifrangecolumnvalue !== undefined &&
        showonlyifrangecolumnvalue !== "" &&
        dbgroupbyrangecolumndatacurrenttablecolumnvalue !== undefined &&
        dbgroupbyrangecolumndatacurrenttablecolumnvalue !== ""
      ) {
        let idrangestr =
          "vrt-" +
          dbgroupbyrangecolumndatatablename +
          "-" +
          dbgroupbyrangecolumndatatablecolumnname +
          "-" +
          showonlyifrangecolumnvalue +
          "-" +
          dbgroupbyrangecolumndatacurrenttablecolumnvalue;
        let existingvaluerangetrackingcolumnrecorddataparams = {
          tablename: "valuerangetrackingcolumnrecorddata",
          id: idrangestr,
          idoperator: "equalsto",
          orgname: props.sitestatedata.orgdata.data.orgname,
        };
        alltypecompconsolelog(
          "existingvaluerangetrackingcolumnrecorddataparams",
          existingvaluerangetrackingcolumnrecorddataparams
        );

        let existingvaluerangetrackingcolumnrecorddatalist =
          await gettabledatafromDatabase(
            existingvaluerangetrackingcolumnrecorddataparams
          );
        alltypecompconsolelog(
          "existingvaluerangetrackingcolumnrecorddatalist",
          existingvaluerangetrackingcolumnrecorddatalist
        );
        if (
          existingvaluerangetrackingcolumnrecorddatalist &&
          existingvaluerangetrackingcolumnrecorddatalist.length > 0
        ) {
          await showui({});
        }
      }
    } else {
      await showui({});
    }
  }

  let showui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: true });
  };
  let hideui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));
    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: false });
  };

  let handleClick = async (methodprops) => {
    alltypecompconsolelog("Recorddatahtml-handleClick");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;

    let { lstobjitemfromparent } = compstate;
    let { favouriteuiconfigslistmetadata } = props.sitestatedata;
    let {
      highlightpanelsectionmetadata,
      highlightpanelbuttonsectionmetadata,
      tabpanellabelsectionmetadata,
      tabpanelcontentsectionmetadata,
      detailpanelsectionmetadata,
    } = lstobjitemfromparent;

    let currenttab = "";
    let alltabs = [];

    if (Object.keys(tabpanellabelsectionmetadata).length > 0) {
      for (let j in tabpanellabelsectionmetadata.items) {
        alltabs.push(tabpanellabelsectionmetadata.items[j].innerText);
      }
      currenttab = alltabs[0];
      if (compstate.currenttab !== "") {
        currenttab = compstate.currenttab;
      }
    }

    if (type === "makemodetypebuild") {
      await hideui({
        modetype: "build",
      });
      await showui({
        modetype: "build",
      });
    } else if (type === "savebuilduichanges") {
      props.parenthandleClick({
        type: "savefromrecorddatahtml",
        lstobj: compstate.lstobjitemfromparent,
      });
    } else if (type === "cancelbuilduichanges") {
      props.parenthandleClick({
        type: "savefromrecorddatahtml",
        lstobj: JSON.parse(JSON.stringify(props.lstobjitemfromparent)),
      });
    } else if (type === "executeallowdroptemplateareaitem") {
      allowDrop(methodprops.e);
    } else if (type === "executedragstarttemplateareaitem") {
      dragstart(methodprops.e);
    } else if (type === "executedragentertemplateareaitem") {
      dragEnter(methodprops.e);
    } else if (type === "executedragleavetemplateareaitem") {
      dragLeave(methodprops.e);
    } else if (
      type === "droptemplateareaitemprepost" &&
      currenttab &&
      currenttab !== ""
    ) {
      methodprops.favouriteuiconfigslistmetadata =
        favouriteuiconfigslistmetadata;
      let droppedtemplateareaitem = getdroppedtemplateareaitem(methodprops);
      alltypecompconsolelog(droppedtemplateareaitem);
      compstate.lstobjitemfromparent.tabpanelcontentsectionmetadata[
        currenttab
      ] = droppedtemplateareaitem;

      alltypecompconsolelog(tabpanelcontentsectionmetadata);
      await hideui({
        lstobjitemfromparent: compstate.lstobjitemfromparent,
      });
      await showui({
        lstobjitemfromparent: compstate.lstobjitemfromparent,
      });
    } else if (
      type === "selecttemplateareaitemprepost" &&
      currenttab &&
      currenttab !== ""
    ) {
      let popupmetadata =
        templateareaitemDragpanelmetadataInitMap[methodprops.e.target.value];

      alltypecompconsolelog(popupmetadata);
      compstate.lstobjitemfromparent.tabpanelcontentsectionmetadata[
        currenttab
      ] = popupmetadata;

      alltypecompconsolelog(tabpanelcontentsectionmetadata);
      await hideui({
        lstobjitemfromparent: compstate.lstobjitemfromparent,
      });
      await showui({
        lstobjitemfromparent: compstate.lstobjitemfromparent,
      });
    }
  };

  let handleChange = async (methodprops) => {
    alltypecompconsolelog("Recorddatahtml-handleChange");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;

    let currenttab = "";
    let alltabs = [];

    let { lstobjitemfromparent } = compstate;
    let {
      highlightpanelsectionmetadata,
      highlightpanelbuttonsectionmetadata,
      tabpanellabelsectionmetadata,
      tabpanelcontentsectionmetadata,
      detailpanelsectionmetadata,
    } = lstobjitemfromparent;

    if (Object.keys(tabpanellabelsectionmetadata).length > 0) {
      for (let j in tabpanellabelsectionmetadata.items) {
        alltabs.push(tabpanellabelsectionmetadata.items[j].innerText);
      }
      currenttab = alltabs[0];
      if (compstate.currenttab !== "") {
        currenttab = compstate.currenttab;
      }
    }

    if (type === "changecurrenttabcontentmetadatatype") {
      tabpanelcontentsectionmetadata[currenttab] =
        templateareaitemDragpanelmetadataInitMap[methodprops.e.target.value];

      await hideui({
        lstobjitemfromparent: lstobjitemfromparent,
      });
      await showui({
        lstobjitemfromparent: lstobjitemfromparent,
      });
    }
  };

  let fromchildhandleClick = async (methodprops) => {
    alltypecompconsolelog("Recorddatahtml-fromchildhandleClick");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;
    let { lstobjitemfromparent } = compstate;

    let {
      highlightpanelsectionmetadata,
      highlightpanelbuttonsectionmetadata,
      tabpanellabelsectionmetadata,
      tabpanelcontentsectionmetadata,
      detailpanelsectionmetadata,
    } = lstobjitemfromparent;

    let currenttab = "";
    let alltabs = [];

    if (Object.keys(tabpanellabelsectionmetadata).length > 0) {
      for (let j in tabpanellabelsectionmetadata.items) {
        alltabs.push(tabpanellabelsectionmetadata.items[j].innerText);
      }
      currenttab = alltabs[0];
      if (compstate.currenttab !== "") {
        currenttab = compstate.currenttab;
      }
    }

    if (type === "savefromtemplateareaitemsectioncomp") {
      if (methodprops.sectiontype === "searchpanelsectionmetadata") {
        compstate.lstobjitemfromparent.searchpanelsectionmetadata =
          methodprops.sectionmetadata;
      }
      if (methodprops.sectiontype === "searchpanelbuttonsectionmetadata") {
        compstate.lstobjitemfromparent.searchpanelbuttonsectionmetadata =
          methodprops.sectionmetadata;
      }
      if (methodprops.sectiontype === "highlightpanelsectionmetadata") {
        compstate.lstobjitemfromparent.highlightpanelsectionmetadata =
          methodprops.sectionmetadata;
      }
      if (methodprops.sectiontype === "highlightpanelbuttonsectionmetadata") {
        compstate.lstobjitemfromparent.highlightpanelbuttonsectionmetadata =
          methodprops.sectionmetadata;
      }
      if (methodprops.sectiontype === "tabpanellabelsectionmetadata") {
        compstate.lstobjitemfromparent.tabpanellabelsectionmetadata =
          methodprops.sectionmetadata;
      }
      if (methodprops.sectiontype === "tabpanelcontentsectionmetadata") {
        compstate.lstobjitemfromparent.tabpanelcontentsectionmetadata[
          currenttab
        ] = methodprops.sectionmetadata;
      }
      if (methodprops.sectiontype === "detailpanelsectionmetadata") {
        compstate.lstobjitemfromparent.detailpanelsectionmetadata =
          methodprops.sectionmetadata;
      }

      await hideui({
        lstobjitemfromparent: compstate.lstobjitemfromparent,
      });
      await showui({
        lstobjitemfromparent: compstate.lstobjitemfromparent,
      });
    }
    if (methodprops.sectiontype === "tabpanelcontentsectionmetadata") {
      if (type === "savefromtemplateareaitem") {
        compstate.lstobjitemfromparent.tabpanelcontentsectionmetadata[
          currenttab
        ] = methodprops.templatemetadata;

        await hideui({
          lstobjitemfromparent: compstate.lstobjitemfromparent,
        });
        await showui({
          lstobjitemfromparent: compstate.lstobjitemfromparent,
        });
      }
    }
    if (type === "executeclickfromsectioncolumn") {
      if (methodprops.sectiontype === "tabpanellabelsectionmetadata") {
        await hideui({
          currenttab: methodprops.sectioncolumnmetadata.innerText,
        });
        await showui({
          currenttab: methodprops.sectioncolumnmetadata.innerText,
        });
      } else {
        props.parenthandleClick({
          ...methodprops,
          type: "executeclickfromtemplateareaitem",
        });
      }
    } else if (
      type === "executeonpopupparent" ||
      type === "executeonsiteparent"
    ) {
      props.parenthandleClick({
        ...methodprops,
      });
    }
  };

  let fromchildhandleChange = async (methodprops) => {
    alltypecompconsolelog("Recorddatahtml-fromchildhandleChange");
    let { type, order } = methodprops;
    alltypecompconsolelog(methodprops);

    if (type === "executechangefromsectioncolumn") {
      props.parenthandleChange({
        ...methodprops,
        type: "executechangefromtemplateareaitem",
      });
    } else if (
      type === "executeonpopupparent" ||
      type === "executeonsiteparent"
    ) {
      props.parenthandleChange({
        ...methodprops,
      });
    }
  };

  alltypecompconsolelog("Recorddatahtml-render");
  alltypecompconsolelog(compstate);
  alltypecompconsolelog(props);
  if (compstate.showui !== true) {
    return <></>;
  } else {
    let mainpanelHtml = [];
    let elementbuildiconsHtml = [];

    let currenttab = "",
      alltabs = [];
    let { modetype } = compstate;
    let { templateareaitemstatedata } = props;
    let {
      lstobj,
      orientation,

      searchpanelsectionwidth,
      searchpanelbuttonsectionwidth,
      highlightpanelsectionwidth,
      highlightpanelbuttonsectionwidth,
      tabpanellabelsectionwidth,
      tabpanelcontentsectionwidth,
      detailpanelsectionwidth,
    } = props.templatemetadata.items;

    let {
      searchpanelsectionmetadata,
      searchpanelbuttonsectionmetadata,
      highlightpanelsectionmetadata,
      highlightpanelbuttonsectionmetadata,
      tabpanellabelsectionmetadata,
      tabpanelcontentsectionmetadata,
      detailpanelsectionmetadata,
    } = compstate.lstobjitemfromparent;

    if (modetype === "build") {
      if (searchpanelsectionmetadata === undefined) {
        searchpanelsectionmetadata = sectionmetadataInitBlank;
      }
      if (searchpanelbuttonsectionmetadata === undefined) {
        searchpanelbuttonsectionmetadata = sectionmetadataInitBlank;
      }
      //   if(highlightpanelsectionmetadata === undefined){
      //     highlightpanelsectionmetadata = sectionmetadataInitBlank;
      //   }
      //   if(highlightpanelbuttonsectionmetadata === undefined){
      //     highlightpanelbuttonsectionmetadata = sectionmetadataInitBlank;
      //   }
      //   if(tabpanellabelsectionmetadata === undefined){
      //     tabpanellabelsectionmetadata = sectionmetadataInitBlank;
      //   }
      //   if(tabpanelcontentsectionmetadata === undefined){
      //     tabpanelcontentsectionmetadata = sectionmetadataInitBlank;
      //   }
      //   if(detailpanelsectionmetadata === undefined){
      //     detailpanelsectionmetadata = sectionmetadataInitBlank;
      //   }
    }

    let searchpanelsectionmetadatahtml = [];
    if (
      searchpanelsectionmetadata &&
      Object.keys(searchpanelsectionmetadata).length > 0 &&
      searchpanelsectionwidth !== "0%" &&
      (templateareaitemstatedata.showonlysearchpanel === "true" ||
        modetype === "build")
    ) {
      searchpanelsectionmetadatahtml.push(
        <div style={{ width: searchpanelsectionwidth }}>
          <Templateareaitemsectioncomp
            datatype="templateareaitemsection"
            draggablefortemplatebuilder={false}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={templateareaitemstatedata}
            sectionmetadata={searchpanelsectionmetadata}
            modetype={modetype}
            parenthandleClick={(props) =>
              fromchildhandleClick({
                ...props,
                sectiontype: "searchpanelsectionmetadata",
              })
            }
            parenthandleChange={(props) =>
              fromchildhandleChange({
                ...props,
                sectiontype: "searchpanelsectionmetadata",
              })
            }
          />
        </div>
      );
    }

    let searchpanelbuttonsectionmetadatahtml = [];
    if (
      searchpanelbuttonsectionmetadata &&
      Object.keys(searchpanelbuttonsectionmetadata).length > 0 &&
      searchpanelbuttonsectionwidth !== "0%" &&
      (templateareaitemstatedata.showonlysearchpanel === "true" ||
        modetype === "build")
    ) {
      searchpanelbuttonsectionmetadatahtml.push(
        <div style={{ width: searchpanelbuttonsectionwidth }}>
          <Templateareaitemsectioncomp
            datatype="templateareaitemsection"
            draggablefortemplatebuilder={false}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={templateareaitemstatedata}
            sectionmetadata={searchpanelbuttonsectionmetadata}
            modetype={modetype}
            parenthandleClick={(props) =>
              fromchildhandleClick({
                ...props,
                sectiontype: "searchpanelbuttonsectionmetadata",
              })
            }
            parenthandleChange={(props) =>
              fromchildhandleChange({
                ...props,
                sectiontype: "searchpanelbuttonsectionmetadata",
              })
            }
          />
        </div>
      );
    }

    let highlightpanelsectionmetadatahtml = [];
    if (
      Object.keys(highlightpanelsectionmetadata).length > 0 &&
      highlightpanelsectionwidth !== "0%" &&
      templateareaitemstatedata.showonlysearchpanel !== "true"
    ) {
      highlightpanelsectionmetadatahtml.push(
        <div style={{ width: highlightpanelsectionwidth }}>
          <Templateareaitemsectioncomp
            datatype="templateareaitemsection"
            draggablefortemplatebuilder={false}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={templateareaitemstatedata}
            sectionmetadata={highlightpanelsectionmetadata}
            modetype={modetype}
            parenthandleClick={(props) =>
              fromchildhandleClick({
                ...props,
                sectiontype: "highlightpanelsectionmetadata",
              })
            }
            parenthandleChange={(props) =>
              fromchildhandleChange({
                ...props,
                sectiontype: "highlightpanelsectionmetadata",
              })
            }
          />
        </div>
      );
    }

    let highlightpanelbuttonsectionmetadatahtml = [];
    if (
      Object.keys(highlightpanelbuttonsectionmetadata).length > 0 &&
      highlightpanelbuttonsectionwidth !== "0%" &&
      templateareaitemstatedata.showonlysearchpanel !== "true"
    ) {
      highlightpanelbuttonsectionmetadatahtml.push(
        <div style={{ width: highlightpanelbuttonsectionwidth }}>
          <Templateareaitemsectioncomp
            datatype="templateareaitemsection"
            draggablefortemplatebuilder={false}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={templateareaitemstatedata}
            sectionmetadata={highlightpanelbuttonsectionmetadata}
            modetype={modetype}
            parenthandleClick={(props) =>
              fromchildhandleClick({
                ...props,
                sectiontype: "highlightpanelbuttonsectionmetadata",
              })
            }
            parenthandleChange={(props) =>
              fromchildhandleChange({
                ...props,
                sectiontype: "highlightpanelbuttonsectionmetadata",
              })
            }
          />
        </div>
      );
    }

    let detailpanelsectionmetadatahtml = [];
    if (
      Object.keys(detailpanelsectionmetadata).length > 0 &&
      detailpanelsectionwidth !== "0%" &&
      templateareaitemstatedata.showonlysearchpanel !== "true"
    ) {
      detailpanelsectionmetadatahtml.push(
        <div style={{ width: detailpanelsectionwidth }}>
          <Templateareaitemsectioncomp
            datatype="templateareaitemsection"
            draggablefortemplatebuilder={false}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={props.templateareaitemstatedata}
            sectionmetadata={detailpanelsectionmetadata}
            modetype={modetype}
            parenthandleClick={(props) =>
              fromchildhandleClick({
                ...props,
                sectiontype: "detailpanelsectionmetadata",
              })
            }
            parenthandleChange={(props) =>
              fromchildhandleChange({
                ...props,
                sectiontype: "detailpanelsectionmetadata",
              })
            }
          />
        </div>
      );
    }

    let tabpanellabelsectionmetadatahtml = [];

    if (
      Object.keys(tabpanellabelsectionmetadata).length > 0 &&
      tabpanellabelsectionwidth !== "0%" &&
      templateareaitemstatedata.showonlysearchpanel !== "true"
    ) {
      for (let j in tabpanellabelsectionmetadata.items) {
        alltabs.push(tabpanellabelsectionmetadata.items[j].innerText);
      }
      currenttab = alltabs[0];
      if (compstate.currenttab !== "") {
        currenttab = compstate.currenttab;
      }
      tabpanellabelsectionmetadatahtml.push(
        <div style={{ width: tabpanellabelsectionwidth }}>
          <Templateareaitemsectioncomp
            datatype="templateareaitemsection"
            draggablefortemplatebuilder={false}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={templateareaitemstatedata}
            sectionmetadata={tabpanellabelsectionmetadata}
            modetype={modetype}
            parenthandleClick={(props) =>
              fromchildhandleClick({
                ...props,
                sectiontype: "tabpanellabelsectionmetadata",
              })
            }
            parenthandleChange={(props) =>
              fromchildhandleChange({
                ...props,
                sectiontype: "tabpanellabelsectionmetadata",
              })
            }
          />
        </div>
      );
    }

    let currenttabcontentmetadatahtml = [];
    let currenttabcontentmetadata;

    if (
      modetype === "build" &&
      currenttab !== "" &&
      currenttab !== undefined &&
      templateareaitemstatedata.showonlysearchpanel !== "true"
    ) {
      let popupmetadatatypeOptions = [];
      for (let i in templateareaitemDragpanelmetadataInitMap) {
        popupmetadatatypeOptions.push(<option value={i} />);
      }

      currenttabcontentmetadatahtml.push(
        <>
          <div>Currenttabcontentmetadatatype</div>
          <div>
            <input
              style={{ width: "100%" }}
              // defaultValue={metadata.onclick.popupmetadatatype}
              onChange={(e) =>
                handleClick({
                  type: "selecttemplateareaitemprepost",

                  e,
                })
              }
              list="currenttabcontentmetadatatype"
            />
            <datalist id="currenttabcontentmetadatatype">
              {popupmetadatatypeOptions}
            </datalist>
          </div>
        </>
      );

      currenttabcontentmetadatahtml.push(
        <div style={{ height: "200px", overflow: "auto" }}>
          <Draggabletemplateareaitemhtml />
          <DraggablefavouriteuiconfigsTemplateareaitemshtml
            favouriteuiconfigslistmetadata={
              props.sitestatedata.favouriteuiconfigslistmetadata
            }
          />
        </div>
      );

      currenttabcontentmetadatahtml.push(
        <div
          style={{
            width: tabpanelcontentsectionwidth,
            backgroundColor: "yellow",
            height: "50px",
          }}
          draggable={"true"}
          onDragOver={(e) =>
            handleClick({ e, type: "executeallowdroptemplateareaitem" })
          }
          onDragEnter={(e) =>
            handleClick({ e, type: "executedragentertemplateareaitem" })
          }
          onDragLeave={(e) =>
            handleClick({ e, type: "executedragleavetemplateareaitem" })
          }
          onDrop={(e) =>
            handleClick({
              type: "droptemplateareaitemprepost",
              e,
              preposttext: "pre",
            })
          }
        >
          Drop here to change or add ui section
        </div>
      );
    }

    if (
      tabpanelcontentsectionmetadata &&
      Object.keys(tabpanelcontentsectionmetadata).length > 0 &&
      templateareaitemstatedata.showonlysearchpanel !== "true"
    ) {
      currenttabcontentmetadata = tabpanelcontentsectionmetadata[currenttab];

      if (
        currenttabcontentmetadata &&
        Object.keys(currenttabcontentmetadata).length > 0
      ) {
        currenttabcontentmetadatahtml.push(
          <div style={{ width: tabpanelcontentsectionwidth }}>
            <Alltypetemplateareaitemcomp
              isparenttablelayoutmetadatafield="false"
              parentalltypecompstatedata={props.parentalltypecompstatedata}
              sitestatedata={props.sitestatedata}
              templatemetadata={currenttabcontentmetadata}
              modetype={modetype}
              draggable={false}
              parenthandleClick={(methodprops) =>
                fromchildhandleClick({
                  ...methodprops,
                  sectiontype: "tabpanelcontentsectionmetadata",
                })
              }
              parenthandleChange={(methodprops) =>
                fromchildhandleChange({
                  ...methodprops,
                  sectiontype: "tabpanelcontentsectionmetadata",
                })
              }
            />
          </div>
        );
      }
    }

    alltypecompconsolelog(currenttab);

    let flexstyle = {
      display: "inline-flex",
      flexWrap: "wrap",
      width: "100%",
    };

    if (orientation === "withtoptabpanel" || orientation === "withlefttabpanel") {
      mainpanelHtml.push(
        <>
          <div style={flexstyle}>
            {searchpanelsectionmetadatahtml}
            {searchpanelbuttonsectionmetadatahtml}
            {highlightpanelsectionmetadatahtml}
            {highlightpanelbuttonsectionmetadatahtml}
            {tabpanellabelsectionmetadatahtml}
            {currenttabcontentmetadatahtml}
          </div>
        </>
      );
    }
    if (
      orientation === "withrighttabpanel" ||
      orientation === "withbottomtabpanel"
    ) {
      mainpanelHtml.push(
        <>
          <div style={flexstyle}>
            {searchpanelsectionmetadatahtml}
            {searchpanelbuttonsectionmetadatahtml}
            {highlightpanelsectionmetadatahtml}
            {highlightpanelbuttonsectionmetadatahtml}
            {currenttabcontentmetadatahtml}
            {tabpanellabelsectionmetadatahtml}
          </div>
        </>
      );
    }
    if (orientation === "withouttabpanel") {
      mainpanelHtml.push(
        <>
          <div style={flexstyle}>
            {searchpanelsectionmetadatahtml}
            {searchpanelbuttonsectionmetadatahtml}
            {highlightpanelsectionmetadatahtml}
            {highlightpanelbuttonsectionmetadatahtml}
            {detailpanelsectionmetadatahtml}
          </div>
        </>
      );
    }

    if (orientation === "listitem") {
      mainpanelHtml.push(
        <>
          <div style={flexstyle}>
            {searchpanelsectionmetadatahtml}
            {searchpanelbuttonsectionmetadatahtml}
            {highlightpanelsectionmetadatahtml}
            {highlightpanelbuttonsectionmetadatahtml}
          </div>
        </>
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
            parenthandleChange={(props) => { }}
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
            metadata={iconmetadataThumsup}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "savebuilduichanges" })
            }
            parenthandleChange={(props) => { }}
          />

          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataThumsdown}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "cancelbuilduichanges" })
            }
            parenthandleChange={(props) => { }}
          />
        </>
      );
    }

    return (
      <>
        {mainpanelHtml}
        {elementbuildiconsHtml}
      </>
    );
  }
}

////////////////////

let Utiltemplateareaitem = (props) => {
  alltypecompconsolelog("Utiltemplateareaitem-render");
  alltypecompconsolelog(props);

  let {
    lstobjitemfromparent,
    templateareaitemstatedata,
    templatemetadata,
    modetype,
    parenthandleClick,
    parenthandleChange,
  } = props;
  let elementHtml = [];

  if (templatemetadata.type === "navbartemplateareaitem") {
    elementHtml.push(
      <Navbarhtml
        parentalltypecompstatedata={props.parentalltypecompstatedata}
        sitestatedata={props.sitestatedata}
        lstobjitemfromparent={lstobjitemfromparent}
        templateareaitemstatedata={templateareaitemstatedata}
        templatemetadata={templatemetadata}
        modetype={modetype}
        parenthandleClick={(props) => parenthandleClick(props)}
        parenthandleChange={(props) => parenthandleChange(props)}
      />
    );
  }
  if (templatemetadata.type === "utilbartemplateareaitem") {
    // elementHtml.push(
    //   <Utilbarhtml
    //     parentalltypecompstatedata={props.parentalltypecompstatedata}
    //     sitestatedata={props.sitestatedata}
    //     lstobjitemfromparent={lstobjitemfromparent}
    //     templateareaitemstatedata={templateareaitemstatedata}
    //     templatemetadata={templatemetadata}
    //     modetype={modetype}
    //     parenthandleClick={(props) => parenthandleClick(props)}
    //     parenthandleChange={(props) => parenthandleChange(props)}
    //   />
    // );
  }
  if (templatemetadata.type === "imagecardtemplateareaitem") {
    // elementHtml.push(
    //   <Imagepanelgalleryhtml
    //     parentalltypecompstatedata={props.parentalltypecompstatedata}
    //     sitestatedata={props.sitestatedata}
    //     lstobjitemfromparent={lstobjitemfromparent}
    //     templateareaitemstatedata={templateareaitemstatedata}
    //     templatemetadata={templatemetadata}
    //     modetype={modetype}
    //     parenthandleClick={(props) => parenthandleClick(props)}
    //     parenthandleChange={(props) => parenthandleChange(props)}
    //   />
    // );
  }

  if (templatemetadata.type === "imagepanelgallerytemplateareaitem") {
    // elementHtml.push(
    //   <Imagepanelgalleryhtml
    //     parentalltypecompstatedata={props.parentalltypecompstatedata}
    //     sitestatedata={props.sitestatedata}
    //     lstobjitemfromparent={lstobjitemfromparent}
    //     templateareaitemstatedata={templateareaitemstatedata}
    //     templatemetadata={templatemetadata}
    //     modetype={modetype}
    //     parenthandleClick={(props) => parenthandleClick(props)}
    //     parenthandleChange={(props) => parenthandleChange(props)}
    //   />
    // );
  }

  if (templatemetadata.type === "imagegallerytemplateareaitem") {
    // elementHtml.push(
    //   <Imagegalleryhtml
    //     parentalltypecompstatedata={props.parentalltypecompstatedata}
    //     sitestatedata={props.sitestatedata}
    //     lstobjitemfromparent={lstobjitemfromparent}
    //     templateareaitemstatedata={templateareaitemstatedata}
    //     templatemetadata={templatemetadata}
    //     modetype={modetype}
    //     parenthandleClick={(props) => parenthandleClick(props)}
    //     parenthandleChange={(props) => parenthandleChange(props)}
    //   />
    // );
  }

  if (templatemetadata.type === "addresscardtemplateareaitem") {
    // elementHtml.push(
    //   <Addresscardtemplateareaitemhtml
    //     parentalltypecompstatedata={props.parentalltypecompstatedata}
    //     sitestatedata={props.sitestatedata}
    //     lstobjitemfromparent={lstobjitemfromparent}
    //     templateareaitemstatedata={templateareaitemstatedata}
    //     templatemetadata={templatemetadata}
    //     modetype={modetype}
    //     parenthandleClick={(props) => parenthandleClick(props)}
    //     parenthandleChange={(props) => parenthandleChange(props)}
    //   />
    // );
  }

  if (templatemetadata.type === "recordlisttemplateareaitem") {
    elementHtml.push(
      <Recorddatahtml
        parentalltypecompstatedata={props.parentalltypecompstatedata}
        sitestatedata={props.sitestatedata}
        lstobjitemfromparent={lstobjitemfromparent}
        templateareaitemstatedata={templateareaitemstatedata}
        templatemetadata={templatemetadata}
        modetype={modetype}
        parenthandleClick={(props) => parenthandleClick(props)}
        parenthandleChange={(props) => parenthandleChange(props)}
      />
    );
  }

  if (templatemetadata.type === "cardtemplateareaitem") {
    // elementHtml.push(
    //   <Cardtemplateareaitemhtml
    //     parentalltypecompstatedata={props.parentalltypecompstatedata}
    //     sitestatedata={props.sitestatedata}
    //     lstobjitemfromparent={lstobjitemfromparent}
    //     templateareaitemstatedata={templateareaitemstatedata}
    //     templatemetadata={templatemetadata}
    //     modetype={modetype}
    //     parenthandleClick={(props) => parenthandleClick(props)}
    //     parenthandleChange={(props) => parenthandleChange(props)}
    //   />
    // );
  }

  if (templatemetadata.type === "progresscardlisttemplateareaitem") {
    // elementHtml.push(
    //   <Progresscardlisthtml
    //     parentalltypecompstatedata={props.parentalltypecompstatedata}
    //     sitestatedata={props.sitestatedata}
    //     lstobjitemfromparent={lstobjitemfromparent}
    //     templateareaitemstatedata={templateareaitemstatedata}
    //     templatemetadata={templatemetadata}
    //     modetype={modetype}
    //     parenthandleClick={(props) => parenthandleClick(props)}
    //     parenthandleChange={(props) => parenthandleChange(props)}
    //   />
    // );
  }

  if (templatemetadata.type === "contactusformtemplateareaitem") {
    // elementHtml.push(
    //   <Contactusformhtml
    //     parentalltypecompstatedata={props.parentalltypecompstatedata}
    //     sitestatedata={props.sitestatedata}
    //     lstobjitemfromparent={lstobjitemfromparent}
    //     templateareaitemstatedata={templateareaitemstatedata}
    //     templatemetadata={templatemetadata}
    //     modetype={modetype}
    //     parenthandleClick={(props) => parenthandleClick(props)}
    //     parenthandleChange={(props) => parenthandleChange(props)}
    //   />
    // );
  }

  if (templatemetadata.type === "socialbartemplateareaitem") {
    // elementHtml.push(
    //   <Socialbarhtml
    //     parentalltypecompstatedata={props.parentalltypecompstatedata}
    //     sitestatedata={props.sitestatedata}
    //     lstobjitemfromparent={lstobjitemfromparent}
    //     templateareaitemstatedata={templateareaitemstatedata}
    //     templatemetadata={templatemetadata}
    //     modetype={modetype}
    //     parenthandleClick={(props) => parenthandleClick(props)}
    //     parenthandleChange={(props) => parenthandleChange(props)}
    //   />
    // );
  }

  if (templatemetadata.type === "carasoultemplateareaitem") {
    // elementHtml.push(
    //   <Carasoulhtml
    //     parentalltypecompstatedata={props.parentalltypecompstatedata}
    //     sitestatedata={props.sitestatedata}
    //     lstobjitemfromparent={lstobjitemfromparent}
    //     templateareaitemstatedata={templateareaitemstatedata}
    //     templatemetadata={templatemetadata}
    //     modetype={modetype}
    //     parenthandleClick={(props) => parenthandleClick(props)}
    //     parenthandleChange={(props) => parenthandleChange(props)}
    //   />
    // );
  }
  return elementHtml;
};

/////////////////////////

function Uisortfilterpanelhtml(methodprops) {

  let {
    sitestatedata,
    templateareaitemstatedata,
    recordlistdatafromdb,
    sortbyname,
    filterbyobject,
    templatemetadata,
    parenthandleClick,
  } = methodprops;
  let {
    dbfilterpanelsectionmetadata,
    dbsortpanelsectionmetadata,
    dbuisortpanelsectionwidth,
    dbuifilterpanelsectionwidth,
    isdatafromserver,
    isdatafromlocalcomponent,

    dbshowsortpanel,
    dbshowfilterpanel,
    islayoutmetadatafromserver,
  } = templatemetadata.items;

  let mainpanelHtml = [];
  // uifilterpanel

  mainpanelHtml.push(
    <Uifilterpanelhtml
      sitestatedata={sitestatedata}
      templateareaitemstatedata={templateareaitemstatedata}
      recordlistdatafromdb={recordlistdatafromdb}
      dbshowfilterpanel={dbshowfilterpanel}
      dbfilterpanelsectionmetadata={dbfilterpanelsectionmetadata}
      filterbyobject={filterbyobject}
      parenthandleChange={(props) =>
        parenthandleClick({
          ...props,
        })
      }
    />
  );

  // uisortpanel

  mainpanelHtml.push(
    <Uisortpanelhtml
      sitestatedata={sitestatedata}
      templateareaitemstatedata={templateareaitemstatedata}
      recordlistdatafromdb={recordlistdatafromdb}
      dbshowsortpanel={dbshowsortpanel}
      dbsortpanelsectionmetadata={dbsortpanelsectionmetadata}
      sortbyname={sortbyname}
      parenthandleChange={(props) =>
        parenthandleClick({
          ...props,
        })
      }
    />
  );

  return mainpanelHtml;
}

function Uisortpanelhtml(methodprops) {
  let {
    dbshowsortpanel,
    recordlistdatafromdb,
    dbsortpanelsectionmetadata,
    sortbyname,
    dbuisortpanelsectionwidth,
    parenthandleChange,
  } = methodprops;
  let mainpanelHtml = [];
  if (
    dbshowsortpanel === "true" &&
    dbsortpanelsectionmetadata &&
    Object.keys(dbsortpanelsectionmetadata).length > 0
  ) {
    let options = [];
    options.push(<option label="" value="" />);

    for (let i in dbsortpanelsectionmetadata.items) {
      if (
        dbsortpanelsectionmetadata.items[i].type === "inputoutputfield" &&
        dbsortpanelsectionmetadata.items[i].inputoutputfieldprops.type ===
        "querypaneltabelcolumnsort"
      ) {
        options.push(
          <option
            label={
              dbsortpanelsectionmetadata.items[i].inputoutputfieldprops
                .querypaneltabelcolumnname
            }
            value={
              dbsortpanelsectionmetadata.items[i].inputoutputfieldprops
                .querypaneltabelcolumnname
            }
          />
        );
      }
    }

    mainpanelHtml.push(
      <div style={{ width: dbuisortpanelsectionwidth }}>
        Sort By:
        <select
          defaultValue={sortbyname}
          onChange={(e) =>
            parenthandleChange({
              type: "sortbychange",
              value: e.target.value,
            })
          }
        >
          {options}
        </select>
      </div>
    );
  }

  return mainpanelHtml;
}

function Uifilterpanelhtml(methodprops) {
  let {
    recordlistdatafromdb,
    dbshowfilterpanel,
    dbfilterpanelsectionmetadata,
    filterbyobject,
    dbuifilterpanelsectionwidth,
    parenthandleChange,
  } = methodprops;
  let mainpanelHtml = [];
  if (
    dbshowfilterpanel === "true" &&
    dbfilterpanelsectionmetadata &&
    Object.keys(dbfilterpanelsectionmetadata).length > 0
  ) {
    let filterfieldsectionhtml = [];

    for (let i in dbfilterpanelsectionmetadata.items) {
      let filtersectionfield = dbfilterpanelsectionmetadata.items[i];
      if (
        filtersectionfield.type === "inputoutputfield" &&
        filtersectionfield.inputoutputfieldprops.type ===
        "querypaneltabelcolumnfilter"
      ) {
        let filterfieldsectionitemhtml = [];
        let selectfilterbyobjectfieldvalues = [];
        if (
          filterbyobject &&
          Object.keys(filterbyobject).length > 0 &&
          filtersectionfield.inputoutputfieldprops.querypaneltabelcolumnname &&
          filterbyobject[
          filtersectionfield.inputoutputfieldprops.querypaneltabelcolumnname
          ] &&
          filterbyobject[
            filtersectionfield.inputoutputfieldprops.querypaneltabelcolumnname
          ].length > 0
        ) {
          selectfilterbyobjectfieldvalues =
            filterbyobject[
            filtersectionfield.inputoutputfieldprops.querypaneltabelcolumnname
            ];
        }
        filterfieldsectionitemhtml.push(
          <div>
            {
              filtersectionfield.inputoutputfieldprops
                .querypaneltabelcolumnname
            }
          </div>
        );
        // 1234

        let filterfieldvalue =
          filtersectionfield.inputoutputfieldprops.querypaneltabelcolumnvalue;
        let isshowalldynamicvalues =
          filtersectionfield.inputoutputfieldprops.querypaneltabelcolumnshowalldynamicvalues;
        let filterfieldvaluearray = filterfieldvalue.split(",");

        if (isshowalldynamicvalues === "true") {
          for (let rdbi = 0; rdbi < recordlistdatafromdb.length; rdbi++) {
            filterfieldvaluearray.push(recordlistdatafromdb[rdbi].data[filtersectionfield.inputoutputfieldprops.querypaneltabelcolumnname]);
          }
        }





        for (let i = 0; i < filterfieldvaluearray.length; i++) {
          if (filterfieldvaluearray[i] && filterfieldvaluearray[i] !== "") {
            let isfilterexists = false;
            for (let j = 0; j < selectfilterbyobjectfieldvalues.length; j++) {
              if (
                selectfilterbyobjectfieldvalues[j] &&
                filterfieldvaluearray[i] &&
                selectfilterbyobjectfieldvalues[j] === filterfieldvaluearray[i]
              ) {
                isfilterexists = true;
              }
            }

            filterfieldsectionitemhtml.push(
              <div>
                <input
                  type="checkbox"
                  defaultChecked={isfilterexists}
                  // onChange={(e) =>
                  //   handleClick({
                  //     type: "filterbychange",
                  //     columnname:
                  //       filtersectionfield.inputoutputfieldprops
                  //         .querypaneltabelcolumnname,
                  //     columnvalue: filterfieldvaluearray[i],
                  //   })
                  // }

                  onChange={(e) =>
                    parenthandleChange({
                      type: "filterbychange",
                      columnname:
                        filtersectionfield.inputoutputfieldprops
                          .querypaneltabelcolumnname,
                      columnvalue: filterfieldvaluearray[i],
                    })
                  }
                />
                {filterfieldvaluearray[i]}{" "}
              </div>
            );
          }
        }

        filterfieldsectionhtml.push(<div>{filterfieldsectionitemhtml}</div>);
      }
    }

    mainpanelHtml.push(
      <div style={{ width: dbuifilterpanelsectionwidth }}>
        Filter By:
        <div style={{ display: "flex" }}>
          {filterfieldsectionhtml}
        </div>
      </div>
    );
  }

  return mainpanelHtml;
}

export function Buildtablequerymetadatapanelhtml(props) {
  alltypecompconsolelog("Buildtablequerymetadatapanelhtml-render");
  alltypecompconsolelog(props);

  let fromchildhandleClick = async (methodprops) => {
    alltypecompconsolelog(
      "Buildtablequerymetadatapanelhtml-fromchildhandleClick"
    );
    alltypecompconsolelog(methodprops);
    let { type } = methodprops;

    let templatemetadatajs = JSON.parse(JSON.stringify(props.templatemetadata));

    if (
      type === "savefromtemplateareaitemsectioncomp" &&
      methodprops.sectiontype === "dbquerypaneltablenamesectionmetadata"
    ) {
      templatemetadatajs.items.dbquerypaneltablenamesectionmetadata =
        methodprops.sectionmetadata;

      let tablefield = {};
      for (let i in methodprops.sectionmetadata.items) {
        if (
          methodprops.sectionmetadata.items[i].inputoutputfieldprops.type ===
          "querypaneltablename"
        ) {
          tablefield = methodprops.sectionmetadata.items[i];
        }
      }

      for (let i in templatemetadatajs.items
        .dbquerypanelbeginswithtablecolumnssectionmetadata.items) {
        if (
          templatemetadatajs.items
            .dbquerypanelbeginswithtablecolumnssectionmetadata.items[i]
            .inputoutputfieldprops.type === "querypanelcolumnquery"
        ) {
          templatemetadatajs.items.dbquerypanelbeginswithtablecolumnssectionmetadata.items[
            i
          ].inputoutputfieldprops.querypaneltablename =
            tablefield.inputoutputfieldprops.querypaneltablename;

          templatemetadatajs.items.dbquerypanelbeginswithtablecolumnssectionmetadata.items[
            i
          ].inputoutputfieldprops.querypaneltablelabel =
            tablefield.inputoutputfieldprops.querypaneltablelabel;
        }
      }

      for (let i in templatemetadatajs.items
        .dbquerypanelfilterbytablecolumnssectionmetadata.items) {
        if (
          templatemetadatajs.items
            .dbquerypanelfilterbytablecolumnssectionmetadata.items[i]
            .inputoutputfieldprops.type === "querypanelcolumnquery"
        ) {
          templatemetadatajs.items.dbquerypanelfilterbytablecolumnssectionmetadata.items[
            i
          ].inputoutputfieldprops.querypaneltablename =
            tablefield.inputoutputfieldprops.querypaneltablename;

          templatemetadatajs.items.dbquerypanelfilterbytablecolumnssectionmetadata.items[
            i
          ].inputoutputfieldprops.querypaneltablelabel =
            tablefield.inputoutputfieldprops.querypaneltablelabel;
        }
      }

      // await updateCompstate({
      //   templatemetadata: templatemetadatajs,
      //   showbuildpropsui: false,
      // });

      props.parenthandleClick({
        type: "savefrombuildtablequerymetadatapanelhtml",
        templatemetadata: templatemetadatajs,
      });
    } else if (
      type === "savefromtemplateareaitemsectioncomp" &&
      methodprops.sectiontype ===
      "dbquerypanelbeginswithtablecolumnssectionmetadata"
    ) {
      templatemetadatajs.items.dbquerypanelbeginswithtablecolumnssectionmetadata =
        methodprops.sectionmetadata;

      props.parenthandleClick({
        type: "savefrombuildtablequerymetadatapanelhtml",
        templatemetadata: templatemetadatajs,
      });
    } else if (
      type === "savefromtemplateareaitemsectioncomp" &&
      methodprops.sectiontype ===
      "dbquerypanelfilterbytablecolumnssectionmetadata"
    ) {
      templatemetadatajs.items.dbquerypanelfilterbytablecolumnssectionmetadata =
        methodprops.sectionmetadata;

      props.parenthandleClick({
        type: "savefrombuildtablequerymetadatapanelhtml",
        templatemetadata: templatemetadatajs,
      });
    } else if (
      type === "savefromtemplateareaitemsectioncomp" &&
      methodprops.sectiontype === "dbfilterpanelsectionmetadata"
    ) {
      templatemetadatajs.items.dbfilterpanelsectionmetadata =
        methodprops.sectionmetadata;

      props.parenthandleClick({
        type: "savefrombuildtablequerymetadatapanelhtml",
        templatemetadata: templatemetadatajs,
      });
    } else if (
      type === "savefromtemplateareaitemsectioncomp" &&
      methodprops.sectiontype === "dbsortpanelsectionmetadata"
    ) {
      templatemetadatajs.items.dbsortpanelsectionmetadata =
        methodprops.sectionmetadata;

      props.parenthandleClick({
        type: "savefrombuildtablequerymetadatapanelhtml",
        templatemetadata: templatemetadatajs,
      });
    }
  };

  let fromchildhandleChange = async (methodprops) => {
    alltypecompconsolelog(
      "Buildtablequerymetadatapanelhtml-fromchildhandleChange"
    );
    alltypecompconsolelog(methodprops);
  };

  let {
    sitestatedata,
    templateareaitemstatedata,
    templatemetadata,
    modetype,
    parenthandleClick,
    parenthandleChange,
  } = props;

  let mainpanelHtml = [];
  mainpanelHtml.push(
    <Buildtablequerypanelhtml
      sitestatedata={sitestatedata}
      templateareaitemstatedata={templateareaitemstatedata}
      templatemetadata={templatemetadata}
      modetype={modetype}
      parenthandleClick={(props) => fromchildhandleClick({ ...props })}
      parenthandleChange={(props) => fromchildhandleChange({ ...props })}
    />
  );
  mainpanelHtml.push(
    <Buildtablefilterpanelhtml
      sitestatedata={sitestatedata}
      templateareaitemstatedata={templateareaitemstatedata}
      templatemetadata={templatemetadata}
      modetype={modetype}
      parenthandleClick={(props) => fromchildhandleClick({ ...props })}
      parenthandleChange={(props) => fromchildhandleChange({ ...props })}
    />
  );
  mainpanelHtml.push(
    <Buildtablesortpanelhtml
      sitestatedata={sitestatedata}
      templateareaitemstatedata={templateareaitemstatedata}
      templatemetadata={templatemetadata}
      modetype={modetype}
      parenthandleClick={(props) => fromchildhandleClick({ ...props })}
      parenthandleChange={(props) => fromchildhandleChange({ ...props })}
    />
  );
  return mainpanelHtml;
}

function Builddatafromlocalcomphtml(props) {
  const [compstate, setCompstate] = useState({
    showui: false,
    templatemetadata: JSON.parse(JSON.stringify(props.templatemetadata)),
  });

  let showui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: true });
  };
  let hideui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: false });
  };

  let handleClick = async (methodprops) => {
    alltypecompconsolelog("builddatafromlocalcomphtml-fromchildhandleClick");
    alltypecompconsolelog(methodprops);
    let { type } = methodprops;

    let templatemetadatajs = JSON.parse(
      JSON.stringify(compstate.templatemetadata)
    );
    let columnsarray = [];
    if (
      templatemetadatajs.items.datafromlocalcomponent &&
      templatemetadatajs.items.datafromlocalcomponent.columnsarray
    ) {
      columnsarray =
        templatemetadatajs.items.datafromlocalcomponent.columnsarray;
    }

    let dataarray = [];
    if (
      templatemetadatajs.items.datafromlocalcomponent &&
      templatemetadatajs.items.datafromlocalcomponent.dataarray
    ) {
      dataarray = templatemetadatajs.items.datafromlocalcomponent.dataarray;
    }

    if (type === "addcolumn") {
      columnsarray.push("testcolumn");
      if (templatemetadatajs.items.datafromlocalcomponent === undefined) {
        templatemetadatajs.items.datafromlocalcomponent = {};
      }

      templatemetadatajs.items.datafromlocalcomponent.columnsarray =
        columnsarray;

      await hideui({});
      await showui({
        templatemetadata: templatemetadatajs,
      });
    }

    if (type === "addrow") {
      dataarray.push({});
      if (templatemetadatajs.items.datafromlocalcomponent === undefined) {
        templatemetadatajs.items.datafromlocalcomponent = {};
      }

      templatemetadatajs.items.datafromlocalcomponent.dataarray = dataarray;

      await hideui({});
      await showui({
        templatemetadata: templatemetadatajs,
      });
    }

    if (type === "saverows") {
      props.parenthandleClick({
        type: "savefrombuilddatafromlocalhtml",
        templatemetadata: templatemetadatajs,
      });
    }
  };

  let handleChange = async (methodprops) => {
    alltypecompconsolelog("builddatafromlocalcomphtml-fromchildhandleChange");
    alltypecompconsolelog(methodprops);

    let { type } = methodprops;

    let templatemetadatajs = JSON.parse(
      JSON.stringify(compstate.templatemetadata)
    );
    let columnsarray = [];
    if (templatemetadatajs.items.datafromlocalcomponent.columnsarray) {
      columnsarray =
        templatemetadatajs.items.datafromlocalcomponent.columnsarray;
    }

    let dataarray = [];
    if (templatemetadatajs.items.datafromlocalcomponent.dataarray) {
      dataarray = templatemetadatajs.items.datafromlocalcomponent.dataarray;
    }

    if (type === "columnvaluechange") {
      for (let i = 0; i < columnsarray.length; i++) {
        if (methodprops.columnindex === i) {
          columnsarray[i] = methodprops.value;
        }
      }

      await hideui({});
      await showui({
        templatemetadata: templatemetadatajs,
      });
    }

    if (type === "datarowvaluechange") {
      if (dataarray.length > 0) {
        for (let i = 0; i < dataarray.length; i++) {
          let datarowhtml = [];
          for (let j = 0; j < columnsarray.length; j++) {
            if (i === methodprops.rowindex && j === methodprops.columnindex) {
              dataarray[i][j] = methodprops.value;
            }
          }
        }
      }

      await hideui({});
      await showui({
        templatemetadata: templatemetadatajs,
      });
    }
  };

  alltypecompconsolelog("Builddatafromlocalcomphtml-render", compstate);

  let { templatemetadata } = compstate;
  let { datafromlocalcomponent, isdatafromlocalcomponent } =
    templatemetadata.items;

  let columnsarray = [];
  if (datafromlocalcomponent && datafromlocalcomponent.columnsarray) {
    columnsarray = datafromlocalcomponent.columnsarray;
  }

  let dataarray = [];
  if (datafromlocalcomponent && datafromlocalcomponent.dataarray) {
    dataarray = datafromlocalcomponent.dataarray;
  }

  let mainpanelHtml = [];
  let columnshtml = [];

  let datahtml = [];

  if (columnsarray.length > 0) {
    for (let i = 0; i < columnsarray.length; i++) {
      columnshtml.push(
        <th>
          <input
            value={columnsarray[i]}
            onChange={(e) =>
              handleChange({
                type: "columnvaluechange",
                columnindex: i,
                value: e.target.value,
              })
            }
          />
        </th>
      );
    }
  }

  if (dataarray.length > 0) {
    for (let i = 0; i < dataarray.length; i++) {
      let datarowhtml = [];
      for (let j = 0; j < columnsarray.length; j++) {
        datarowhtml.push(
          <td>
            <input
              value={dataarray[i][j]}
              onChange={(e) =>
                handleChange({
                  type: "datarowvaluechange",
                  columnindex: j,
                  rowindex: i,
                  value: e.target.value,
                })
              }
            />
          </td>
        );
      }
      datahtml.push(<tr>{datarowhtml}</tr>);
    }
  }

  mainpanelHtml.push(
    <>
      <div onClick={() => handleClick({ type: "addcolumn" })}>Add column</div>
      <div onClick={() => handleClick({ type: "addrow" })}>Add row</div>
      <div onClick={() => handleClick({ type: "saverows" })}>Save rows</div>
      <table>
        <tr>{columnshtml}</tr>
        {datahtml}
      </table>
    </>
  );

  return mainpanelHtml;
}

function Buildtablequerypanelhtml(methodprops) {
  let {
    templatemetadata,
    modetype,
    parenthandleClick,
    parenthandleChange,
    sitestatedata,
    templateareaitemstatedata,
  } = methodprops;
  let {
    dbquerypanelsectionwidth,
    dbquerypaneltablenamesectionmetadata,
    dbquerypanelbeginswithtablecolumnssectionmetadata,
    dbquerypanelfilterbytablecolumnssectionmetadata,
    dbfilterpanelsectionwidth,
    dbfilterpanelsectionmetadata,
    dbsortpanelsectionwidth,
    dbsortpanelsectionmetadata,
    dbshowsortpanel,
    dbshowfilterpanel,
  } = templatemetadata.items;

  let mainpanelHtml = [];

  if (
    dbquerypaneltablenamesectionmetadata &&
    Object.keys(dbquerypaneltablenamesectionmetadata).length > 0
  ) {
    mainpanelHtml.push(
      <div style={{ fontWeight: "bold" }}>Query Panel - beginswith</div>
    );
    mainpanelHtml.push(
      <div style={{ width: dbquerypanelsectionwidth }}>
        <Templateareaitemsectioncomp
          sitestatedata={methodprops.sitestatedata}
          templateareaitemstatedata={methodprops.templateareaitemstatedata}
          datatype="templateareaitemsection"
          draggablefortemplatebuilder={false}
          sectionmetadata={dbquerypaneltablenamesectionmetadata}
          modetype={modetype}
          parenthandleClick={(props) =>
            parenthandleClick({
              ...props,
              sectiontype: "dbquerypaneltablenamesectionmetadata",
            })
          }
          parenthandleChange={(props) =>
            parenthandleChange({
              ...props,
              sectiontype: "dbquerypaneltablenamesectionmetadata",
            })
          }
        />
      </div>
    );
  }

  if (
    dbquerypanelbeginswithtablecolumnssectionmetadata &&
    Object.keys(dbquerypanelbeginswithtablecolumnssectionmetadata).length > 0
  ) {
    for (let i in dbquerypanelbeginswithtablecolumnssectionmetadata.items) {
      if (
        dbquerypanelbeginswithtablecolumnssectionmetadata.items[i]
          .inputoutputfieldprops &&
        dbquerypanelbeginswithtablecolumnssectionmetadata.items[i]
          .inputoutputfieldprops.type === "querypanelcolumnquery"
      ) {
        alltypecompconsolelog(
          dbquerypanelbeginswithtablecolumnssectionmetadata
        );
      }
    }

    mainpanelHtml.push(
      <div style={{ width: dbquerypanelsectionwidth }}>
        <Templateareaitemsectioncomp
          datatype="templateareaitemsection"
          draggablefortemplatebuilder={false}
          sitestatedata={methodprops.sitestatedata}
          templateareaitemstatedata={methodprops.templateareaitemstatedata}
          sectionmetadata={dbquerypanelbeginswithtablecolumnssectionmetadata}
          modetype={modetype}
          parenthandleClick={(props) =>
            parenthandleClick({
              ...props,
              sectiontype: "dbquerypanelbeginswithtablecolumnssectionmetadata",
            })
          }
          parenthandleChange={(props) =>
            parenthandleChange({
              ...props,
              sectiontype: "dbquerypanelbeginswithtablecolumnssectionmetadata",
            })
          }
        />
      </div>
    );
  }

  if (
    dbquerypanelfilterbytablecolumnssectionmetadata &&
    Object.keys(dbquerypanelfilterbytablecolumnssectionmetadata).length > 0
  ) {
    mainpanelHtml.push(
      <div style={{ fontWeight: "bold" }}>Query Panel - fitler</div>
    );
    for (let i in dbquerypanelfilterbytablecolumnssectionmetadata.items) {
      if (
        dbquerypanelfilterbytablecolumnssectionmetadata.items[i]
          .inputoutputfieldprops &&
        dbquerypanelfilterbytablecolumnssectionmetadata.items[i]
          .inputoutputfieldprops.type === "querypanelcolumnquery"
      ) {
        alltypecompconsolelog(dbquerypanelfilterbytablecolumnssectionmetadata);
      }
    }

    mainpanelHtml.push(
      <div style={{ width: dbquerypanelsectionwidth }}>
        <Templateareaitemsectioncomp
          datatype="templateareaitemsection"
          draggablefortemplatebuilder={false}
          sitestatedata={methodprops.sitestatedata}
          templateareaitemstatedata={methodprops.templateareaitemstatedata}
          sectionmetadata={dbquerypanelfilterbytablecolumnssectionmetadata}
          modetype={modetype}
          parenthandleClick={(props) =>
            parenthandleClick({
              ...props,
              sectiontype: "dbquerypanelfilterbytablecolumnssectionmetadata",
            })
          }
          parenthandleChange={(props) =>
            parenthandleChange({
              ...props,
              sectiontype: "dbquerypanelfilterbytablecolumnssectionmetadata",
            })
          }
        />
      </div>
    );
  }

  return mainpanelHtml;
}

function Buildtablefilterpanelhtml(methodprops) {
  let { templatemetadata, modetype, parenthandleClick, parenthandleChange } =
    methodprops;
  let {
    dbquerypanelsectionwidth,
    dbquerypaneltablenamesectionmetadata,
    dbquerypanelbeginswithtablecolumnssectionmetadata,
    dbquerypanelfilterbytablecolumnssectionmetadata,
    dbfilterpanelsectionwidth,
    dbfilterpanelsectionmetadata,
    dbsortpanelsectionwidth,
    dbsortpanelsectionmetadata,
    dbshowsortpanel,
    dbshowfilterpanel,
  } = templatemetadata.items;

  let mainpanelHtml = [];

  if (
    dbshowfilterpanel === "true" &&
    dbfilterpanelsectionmetadata &&
    Object.keys(dbfilterpanelsectionmetadata).length > 0
  ) {
    mainpanelHtml.push(<div style={{ fontWeight: "bold" }}>Filter Panel</div>);
    mainpanelHtml.push(
      <div style={{ width: dbfilterpanelsectionwidth }}>
        <Templateareaitemsectioncomp
          datatype="templateareaitemsection"
          draggablefortemplatebuilder={false}
          sitestatedata={methodprops.sitestatedata}
          templateareaitemstatedata={methodprops.templateareaitemstatedata}
          sectionmetadata={dbfilterpanelsectionmetadata}
          modetype={modetype}
          parenthandleClick={(props) =>
            parenthandleClick({
              ...props,
              sectiontype: "dbfilterpanelsectionmetadata",
            })
          }
          parenthandleChange={(props) =>
            parenthandleChange({
              ...props,
              sectiontype: "dbfilterpanelsectionmetadata",
            })
          }
        />
      </div>
    );
  }

  return mainpanelHtml;
}

function Buildtablesortpanelhtml(methodprops) {
  let { templatemetadata, modetype, parenthandleClick, parenthandleChange } =
    methodprops;
  let {
    dbquerypanelsectionwidth,
    dbquerypaneltablenamesectionmetadata,
    dbquerypanelbeginswithtablecolumnssectionmetadata,
    dbquerypanelfilterbytablecolumnssectionmetadata,
    dbfilterpanelsectionwidth,
    dbfilterpanelsectionmetadata,
    dbsortpanelsectionwidth,
    dbsortpanelsectionmetadata,
    dbshowsortpanel,
    dbshowfilterpanel,
  } = templatemetadata.items;

  let mainpanelHtml = [];

  if (
    dbshowsortpanel === "true" &&
    dbsortpanelsectionmetadata &&
    Object.keys(dbsortpanelsectionmetadata).length > 0
  ) {
    mainpanelHtml.push(<div style={{ fontWeight: "bold" }}>Sort Panel</div>);
    mainpanelHtml.push(
      <div style={{ width: dbsortpanelsectionwidth }}>
        <Templateareaitemsectioncomp
          datatype="templateareaitemsection"
          draggablefortemplatebuilder={false}
          sitestatedata={methodprops.sitestatedata}
          templateareaitemstatedata={methodprops.templateareaitemstatedata}
          sectionmetadata={dbsortpanelsectionmetadata}
          modetype={modetype}
          parenthandleClick={(props) =>
            parenthandleClick({
              ...props,
              sectiontype: "dbsortpanelsectionmetadata",
            })
          }
          parenthandleChange={(props) =>
            parenthandleChange({
              ...props,
              sectiontype: "dbsortpanelsectionmetadata",
            })
          }
        />
      </div>
    );
  }
  return mainpanelHtml;
}

function Alltypetemplateareaitemgetdata(props) {
  const [compstate, setCompstate] = useState({
    showui: false,
    sortbyobject: "",
    filterbyobject: {},
    recordlistdatafromdb: {},
    searchpanelrecordlistdatafromdb: {},
    searchpanelchangevalue: "",
    templateareaitemstatedata: { onclickdata: {}, onchangedata: {} },
    tablelayoutmetadatafromserver: {},
  });
  let [recordlistdatafromdbU, setRecordlistdatafromdbU] = useState([]);

  useEffect(() => {
    alltypecompconsolelog("Alltypetemplateareaitemgetdata-useeffect");
    fetchLayoutMetadatafromDB({});
  }, []);

  async function fetchLayoutMetadatafromDB(methodprops) {
    alltypecompconsolelog(
      "Alltypetemplateareaitemgetdata-fetchLayoutMetadatafromDB"
    );
    templateareaitemconsolelog(
      props.templatemetadata,
      "Alltypetemplateareaitemgetdata-fetchLayoutMetadatafromDB",
      methodprops
    );
    templateareaitemconsolelog(
      props.templatemetadata,
      "Alltypetemplateareaitemgetdata-fetchLayoutMetadatafromDB",
      props
    );

    let {
      tablelayoutmetadatafromserver,
      templateareaitemstatedata,
      searchpanelchangevalue,
      dbuisearchpanelidbeginswith,
      dbuisearchpaneltablename,
    } = methodprops;
    let {
      islayoutmetadatafromserver,
      layoutmetadatafromservertablename,
      layoutmetadatafromservertype,
      layoutmetadatafromserversubtype,
    } = props.templatemetadata.items;

    if (
      islayoutmetadatafromserver === "true" &&
      layoutmetadatafromservertablename !== undefined &&
      layoutmetadatafromservertablename !== "" &&
      layoutmetadatafromservertype !== undefined &&
      layoutmetadatafromservertype !== ""
    ) {
      let tablelayoutdataparams = {
        tablename: "tablelayoutmetadata",
        id: "tl-",
        idoperator: "beginswith",
        orgname: props.sitestatedata.orgdata.data.orgname,
      };

      layoutmetadatafromservertablename = replacedynamictext({
        replacetext: layoutmetadatafromservertablename,
        sitestatedata: props.sitestatedata,
        templateareaitemstatedata: {},
        parentalltypecompstatedata: {},
        tabledata: {},
      });

      layoutmetadatafromservertype = replacedynamictext({
        replacetext: layoutmetadatafromservertype,
        sitestatedata: props.sitestatedata,
        templateareaitemstatedata: {},
        parentalltypecompstatedata: {},
        tabledata: {},
      });

      layoutmetadatafromserversubtype = replacedynamictext({
        replacetext: layoutmetadatafromserversubtype,
        sitestatedata: props.sitestatedata,
        templateareaitemstatedata: {},
        parentalltypecompstatedata: {},
        tabledata: {},
      });
      templateareaitemconsolelog(
        props.templatemetadata,
        "layoutmetadatafromservertablename",
        layoutmetadatafromservertablename
      );
      templateareaitemconsolelog(
        props.templatemetadata,
        "layoutmetadatafromservertype",
        layoutmetadatafromservertype
      );
      templateareaitemconsolelog(
        props.templatemetadata,
        "layoutmetadatafromserversubtype",
        layoutmetadatafromserversubtype
      );

      // let recordtypename = "";
      // recordtypename = replacedynamictext({
      //     replacetext: "{urlsearchdataparams.recordtypename}",
      //     sitestatedata: props.sitestatedata,
      //     templateareaitemstatedata: {},
      //     parentalltypecompstatedata: {},
      //     tabledata: {}

      // });

      if (
        layoutmetadatafromservertablename &&
        layoutmetadatafromservertablename !== ""
      ) {
        tablelayoutdataparams.id = "tl-" + layoutmetadatafromservertablename;
        tablelayoutdataparams.idoperator = "beginswith";
      }

      let defaultlayoutmetadatafromserver = {};
      let profilelayoutmetadatafromserver = {};
      let subtypelayoutmetadatafromserver = {};

      let tablelayoutdata = await gettabledatafromDatabase(
        tablelayoutdataparams
      );
      templateareaitemconsolelog(
        props.templatemetadata,
        "tablelayoutdataparams",
        tablelayoutdataparams
      );
      templateareaitemconsolelog(
        props.templatemetadata,
        "tablelayoutdata",
        tablelayoutdata
      );
      if (tablelayoutdata.length >= 0) {
        for (let i = 0; i < tablelayoutdata.length; i++) {
          if (
            tablelayoutdata[i].data.isdefaultforall === "true" &&
            tablelayoutdata[i].data.type === layoutmetadatafromservertype &&
            (tablelayoutdata[i].data.subtype === "" ||
              tablelayoutdata[i].data.subtype === undefined)
          ) {
            defaultlayoutmetadatafromserver = tablelayoutdata[i];
          }
          let dbuser = {};
          if (
            props.sitestatedata.signedindbuserdata &&
            props.sitestatedata.signedindbuserdata.id
          ) {
            dbuser = props.sitestatedata.signedindbuserdata;
          }
          if (
            props.sitestatedata.signedinvendordbuserdata &&
            props.sitestatedata.signedinvendordbuserdata.id
          ) {
            dbuser = props.sitestatedata.signedinvendordbuserdata;
          }
          if (
            tablelayoutdata[i].data.defaultforprofileid !== undefined &&
            tablelayoutdata[i].data.defaultforprofileid !== "" &&
            tablelayoutdata[i].data.defaultforprofileid === dbuser.data.profileid
          ) {
            profilelayoutmetadatafromserver = tablelayoutdata[i];
          }
          if (
            layoutmetadatafromserversubtype !== undefined &&
            layoutmetadatafromserversubtype !== "" &&
            tablelayoutdata[i].data.subtype === layoutmetadatafromserversubtype
          ) {
            subtypelayoutmetadatafromserver = tablelayoutdata[i];
          }
        }

        templateareaitemconsolelog(
          props.templatemetadata,
          "defaultlayoutmetadatafromserver",
          defaultlayoutmetadatafromserver
        );
        templateareaitemconsolelog(
          props.templatemetadata,
          "profilelayoutmetadatafromserver",
          profilelayoutmetadatafromserver
        );
        templateareaitemconsolelog(
          props.templatemetadata,
          "subtypelayoutmetadatafromserver",
          subtypelayoutmetadatafromserver
        );

        if (tablelayoutmetadatafromserver === undefined) {
          tablelayoutmetadatafromserver = defaultlayoutmetadatafromserver;
        }

        if (
          profilelayoutmetadatafromserver &&
          Object.keys(profilelayoutmetadatafromserver).length > 0
        ) {
          tablelayoutmetadatafromserver = profilelayoutmetadatafromserver;
        }

        if (
          subtypelayoutmetadatafromserver &&
          Object.keys(subtypelayoutmetadatafromserver).length > 0
        ) {
          tablelayoutmetadatafromserver = subtypelayoutmetadatafromserver;
        }

        templateareaitemconsolelog(
          props.templatemetadata,
          "tablelayoutmetadatafromserver",
          tablelayoutmetadatafromserver
        );

        await fetchTableColumnMetadatafromDB({
          tablelayoutmetadatafromserver: tablelayoutmetadatafromserver,
          templateareaitemstatedata: templateareaitemstatedata,
          searchpanelchangevalue: searchpanelchangevalue,
          dbuisearchpanelidbeginswith: dbuisearchpanelidbeginswith,
          dbuisearchpaneltablename: dbuisearchpaneltablename,
        });
      }
    } else {
      await fetchTableColumnMetadatafromDB({
        tablelayoutmetadatafromserver: {},
        templateareaitemstatedata: templateareaitemstatedata,
        searchpanelchangevalue: searchpanelchangevalue,
        dbuisearchpanelidbeginswith: dbuisearchpanelidbeginswith,
        dbuisearchpaneltablename: dbuisearchpaneltablename,
      });
    }
  }

  async function fetchTableColumnMetadatafromDB(methodprops) {
    alltypecompconsolelog(
      "Alltypetemplateareaitemgetdata-fetchTableColumnMetadatafromDB"
    );
    templateareaitemconsolelog(
      props.templatemetadata,
      "fetchTableColumnMetadatafromDB",
      methodprops
    );
    templateareaitemconsolelog(
      props.templatemetadata,
      "fetchTableColumnMetadatafromDB",
      props
    );
    let {
      tablelayoutmetadatafromserver,
      templateareaitemstatedata,
      searchpanelchangevalue,
      dbuisearchpanelidbeginswith,
      dbuisearchpaneltablename,
    } = methodprops;

    let { islayoutmetadatafromserver, layoutmetadatafromservertablename } =
      props.templatemetadata.items;

    if (props.isparenttablelayoutmetadatafield === "true") {
      layoutmetadatafromservertablename = replacedynamictext({
        replacetext: "{urlsearchdataparams.tablename}",
        sitestatedata: props.sitestatedata,
        templateareaitemstatedata: {},
        parentalltypecompstatedata: {},
        tabledata: {},
      });
    } else {
      layoutmetadatafromservertablename = replacedynamictext({
        replacetext: layoutmetadatafromservertablename,
        sitestatedata: props.sitestatedata,
        templateareaitemstatedata: {},
        parentalltypecompstatedata: {},
        tabledata: {},
      });
    }

    if (
      layoutmetadatafromservertablename !== undefined &&
      layoutmetadatafromservertablename !== ""
    ) {
      let globaltablecolumndataparams = {
        tablename: "tablecolumnmetadata",
        id: "tc-global",
        idoperator: "beginswith",
        orgname: props.sitestatedata.orgdata.data.orgname,
      };
      let globaltablecolumndatalist = await gettabledatafromDatabase(
        globaltablecolumndataparams
      );
      let globaltablecolumnmetadatalistfromserver = [];
      if (globaltablecolumndatalist && globaltablecolumndatalist.length > 0) {
        globaltablecolumnmetadatalistfromserver = globaltablecolumndatalist;
      }

      let tablecolumndataparams = {
        tablename: "tablecolumnmetadata",
        id: "tc-",
        idoperator: "beginswith",
        orgname: props.sitestatedata.orgdata.data.orgname,
      };

      if (
        layoutmetadatafromservertablename &&
        layoutmetadatafromservertablename !== ""
      ) {
        tablecolumndataparams.id = "tc-" + layoutmetadatafromservertablename;
        tablecolumndataparams.idoperator = "beginswith";
      }

      let tablecolumndatalist = await gettabledatafromDatabase(
        tablecolumndataparams
      );

      templateareaitemconsolelog(
        props.templatemetadata,
        "tablecolumndatalist",
        tablecolumndatalist
      );
      if (tablecolumndatalist.length >= 0) {
        templateareaitemconsolelog(
          props.templatemetadata,
          "tablecolumndatalist",
          tablecolumndatalist
        );
        await fetchTableButtonMetadatafromDB({
          tablelayoutmetadatafromserver: tablelayoutmetadatafromserver,
          tablecolumnmetadatalistfromserver: tablecolumndatalist,
          globaltablecolumnmetadatalistfromserver:
            globaltablecolumnmetadatalistfromserver,
          templateareaitemstatedata: templateareaitemstatedata,
          searchpanelchangevalue: searchpanelchangevalue,
          dbuisearchpanelidbeginswith: dbuisearchpanelidbeginswith,
          dbuisearchpaneltablename: dbuisearchpaneltablename,
        });
      }
    } else {
      await fetchTableButtonMetadatafromDB({
        tablelayoutmetadatafromserver: tablelayoutmetadatafromserver,
        tablecolumnmetadatalistfromserver: [],
        globaltablecolumnmetadatalistfromserver: [],
        templateareaitemstatedata: templateareaitemstatedata,
        searchpanelchangevalue: searchpanelchangevalue,
        dbuisearchpanelidbeginswith: dbuisearchpanelidbeginswith,
        dbuisearchpaneltablename: dbuisearchpaneltablename,
      });
    }
  }

  async function fetchTableButtonMetadatafromDB(methodprops) {
    alltypecompconsolelog(
      "Alltypetemplateareaitemgetdata-fetchTableButtonMetadatafromDB"
    );
    templateareaitemconsolelog(
      props.templatemetadata,
      "fetchTableButtonMetadatafromDB",
      methodprops
    );
    templateareaitemconsolelog(
      props.templatemetadata,
      "fetchTableButtonMetadatafromDB",
      props
    );

    let {
      tablelayoutmetadatafromserver,
      templateareaitemstatedata,
      tablecolumnmetadatalistfromserver,
      globaltablecolumnmetadatalistfromserver,
      searchpanelchangevalue,
      dbuisearchpanelidbeginswith,
      dbuisearchpaneltablename,
    } = methodprops;

    let { islayoutmetadatafromserver, layoutmetadatafromservertablename } =
      props.templatemetadata.items;

    if (props.isparenttablelayoutmetadatafield === "true") {
      layoutmetadatafromservertablename = replacedynamictext({
        replacetext: "{urlsearchdataparams.tablename}",
        sitestatedata: props.sitestatedata,
        templateareaitemstatedata: {},
        parentalltypecompstatedata: {},
        tabledata: {},
      });
    } else {
      layoutmetadatafromservertablename = replacedynamictext({
        replacetext: layoutmetadatafromservertablename,
        sitestatedata: props.sitestatedata,
        templateareaitemstatedata: {},
        parentalltypecompstatedata: {},
        tabledata: {},
      });
    }

    if (
      layoutmetadatafromservertablename !== undefined &&
      layoutmetadatafromservertablename !== ""
    ) {
      let tablebuttondataparams = {
        tablename: "tablebuttonmetadata",
        id: "tb-",
        idoperator: "beginswith",
        orgname: props.sitestatedata.orgdata.data.orgname,
      };

      let globaltablebuttondataparams = {
        tablename: "tablebuttonmetadata",
        id: "tb-global",
        idoperator: "beginswith",
        orgname: props.sitestatedata.orgdata.data.orgname,
      };

      let globaltablebuttondatalist = await gettabledatafromDatabase(
        globaltablebuttondataparams
      );
      templateareaitemconsolelog(
        props.templatemetadata,
        "globaltablebuttondatalist",
        globaltablebuttondataparams
      );
      templateareaitemconsolelog(
        props.templatemetadata,
        "globaltablebuttondatalist",
        globaltablebuttondatalist
      );
      let globaltablebuttonmetadatalistfromserver = [];
      if (globaltablebuttondatalist && globaltablebuttondatalist.length > 0) {
        globaltablebuttonmetadatalistfromserver = globaltablebuttondatalist;
      }

      if (
        layoutmetadatafromservertablename &&
        layoutmetadatafromservertablename !== ""
      ) {
        tablebuttondataparams.id = "tb-" + layoutmetadatafromservertablename;
        tablebuttondataparams.idoperator = "beginswith";
      }

      let tablebuttondatalist = await gettabledatafromDatabase(
        tablebuttondataparams
      );
      let tablebuttonmetadatalistfromserver = [];
      if (tablebuttondatalist && tablebuttondatalist.length > 0) {
        tablebuttonmetadatalistfromserver = tablebuttondatalist;
      }

      templateareaitemconsolelog(
        props.templatemetadata,
        "tablebuttondatalist",
        tablebuttondatalist
      );

      await fetchTableQueryMetadatafromDB({
        tablelayoutmetadatafromserver: tablelayoutmetadatafromserver,
        tablecolumnmetadatalistfromserver: tablecolumnmetadatalistfromserver,
        globaltablecolumnmetadatalistfromserver:
          globaltablecolumnmetadatalistfromserver,
        tablebuttonmetadatalistfromserver: tablebuttonmetadatalistfromserver,
        globaltablebuttonmetadatalistfromserver:
          globaltablebuttonmetadatalistfromserver,
        templateareaitemstatedata: templateareaitemstatedata,
        searchpanelchangevalue: searchpanelchangevalue,
        dbuisearchpanelidbeginswith: dbuisearchpanelidbeginswith,
        dbuisearchpaneltablename: dbuisearchpaneltablename,
      });
    } else {
      await fetchTableQueryMetadatafromDB({
        tablelayoutmetadatafromserver: tablelayoutmetadatafromserver,
        tablecolumnmetadatalistfromserver: tablecolumnmetadatalistfromserver,
        globaltablecolumnmetadatalistfromserver:
          globaltablecolumnmetadatalistfromserver,
        tablebuttonmetadatalistfromserver: [],
        globaltablebuttonmetadatalistfromserver: [],
        templateareaitemstatedata: templateareaitemstatedata,
        searchpanelchangevalue: searchpanelchangevalue,
        dbuisearchpanelidbeginswith: dbuisearchpanelidbeginswith,
        dbuisearchpaneltablename: dbuisearchpaneltablename,
      });
    }
  }

  async function fetchTableQueryMetadatafromDB(methodprops) {
    alltypecompconsolelog(
      "Alltypetemplateareaitemgetdata-fetchTableQueryMetadatafromDB"
    );
    templateareaitemconsolelog(
      props.templatemetadata,
      "fetchTableQueryMetadatafromDB",
      methodprops
    );
    templateareaitemconsolelog(
      props.templatemetadata,
      "fetchTableQueryMetadatafromDB",
      props
    );

    let {
      tablelayoutmetadatafromserver,
      templateareaitemstatedata,
      tablecolumnmetadatalistfromserver,
      globaltablecolumnmetadatalistfromserver,
      tablebuttonmetadatalistfromserver,
      globaltablebuttonmetadatalistfromserver,
      searchpanelchangevalue,
      dbuisearchpanelidbeginswith,
      dbuisearchpaneltablename,
    } = methodprops;

    let {
      datafromserverselectlisttablequerybeginswith,
      datafromserverselectlisttablequerydefaultname,
    } = props.templatemetadata.items;

    datafromserverselectlisttablequerybeginswith = replacedynamictext({
      replacetext: datafromserverselectlisttablequerybeginswith,
      sitestatedata: props.sitestatedata,
      templateareaitemstatedata: {},
      parentalltypecompstatedata: {},
      tabledata: {},
    });

    if (
      datafromserverselectlisttablequerybeginswith !== undefined &&
      datafromserverselectlisttablequerybeginswith !== ""
    ) {
      let tablequerydataparams = {
        tablename: "tablequerymetadata",
        id: "tq-" + datafromserverselectlisttablequerybeginswith,
        idoperator: "beginswith",
        orgname: props.sitestatedata.orgdata.data.orgname,
      };

      templateareaitemconsolelog(
        props.templatemetadata,
        "tablequerydataparams",
        tablequerydataparams
      );
      let tablequerydatalist = await gettabledatafromDatabase(
        tablequerydataparams
      );

      templateareaitemconsolelog(
        props.templatemetadata,
        "tablequerydatalist",
        tablequerydatalist
      );
      if (tablequerydatalist.length >= 0) {
        templateareaitemconsolelog(
          props.templatemetadata,
          "tablequerydatalist",
          tablequerydatalist
        );
        await fetchRecordlistdatafromDB({
          tablelayoutmetadatafromserver: tablelayoutmetadatafromserver,
          tablecolumnmetadatalistfromserver: tablecolumnmetadatalistfromserver,
          globaltablecolumnmetadatalistfromserver:
            globaltablecolumnmetadatalistfromserver,
          tablebuttonmetadatalistfromserver: tablebuttonmetadatalistfromserver,
          globaltablebuttonmetadatalistfromserver:
            globaltablebuttonmetadatalistfromserver,
          tablequerymetadatalistfromserver: tablequerydatalist,
          templateareaitemstatedata: templateareaitemstatedata,
          searchpanelchangevalue: searchpanelchangevalue,
          dbuisearchpanelidbeginswith: dbuisearchpanelidbeginswith,
          dbuisearchpaneltablename: dbuisearchpaneltablename,
        });
      }
    } else {
      await fetchRecordlistdatafromDB({
        tablelayoutmetadatafromserver: tablelayoutmetadatafromserver,
        tablecolumnmetadatalistfromserver: tablecolumnmetadatalistfromserver,
        globaltablecolumnmetadatalistfromserver:
          globaltablecolumnmetadatalistfromserver,
        tablebuttonmetadatalistfromserver: tablebuttonmetadatalistfromserver,
        globaltablebuttonmetadatalistfromserver:
          globaltablebuttonmetadatalistfromserver,
        tablequerymetadatalistfromserver: [],
        templateareaitemstatedata: templateareaitemstatedata,
        searchpanelchangevalue: searchpanelchangevalue,
        dbuisearchpanelidbeginswith: dbuisearchpanelidbeginswith,
        dbuisearchpaneltablename: dbuisearchpaneltablename,
      });
    }
  }

  async function fetchRecordlistdatafromDB(methodprops) {
    alltypecompconsolelog(
      "Alltypetemplateareaitemgetdata-fetchRecordlistdatafromDB"
    );
    templateareaitemconsolelog(
      props.templatemetadata,
      "fetchRecordlistdatafromDB",
      methodprops
    );

    let {
      templateareaitemstatedata,
      tablelayoutmetadatafromserver,
      tablecolumnmetadatalistfromserver,
      globaltablecolumnmetadatalistfromserver,
      tablebuttonmetadatalistfromserver,
      tablequerymetadatalistfromserver,
      globaltablebuttonmetadatalistfromserver,
      searchpanelchangevalue,
      dbuisearchpanelidbeginswith,
      dbuisearchpaneltablename,
    } = methodprops;
    let {
      isdatafromserver,
      isdatafromlocalcomponent,
      datafromlocalcomponent,
      datafromserverselectlisttablequerydefaultname,
    } = props.templatemetadata.items;
    let currenttablequerymetadatafromserver = {};
    if (
      templateareaitemstatedata === undefined ||
      templateareaitemstatedata === ""
    ) {
      templateareaitemstatedata = { onclickdata: {}, onchangedata: {} };
    }

    if (isdatafromserver === "true") {
      if (tablequerymetadatalistfromserver.length > 0) {
        currenttablequerymetadatafromserver =
          tablequerymetadatalistfromserver[0];
        for (let i = 0; i < tablequerymetadatalistfromserver.length; i++) {
          if (
            tablequerymetadatalistfromserver[i].data.name ===
            datafromserverselectlisttablequerydefaultname
          ) {
            currenttablequerymetadatafromserver =
              tablequerymetadatalistfromserver[i];
          }
        }
      }
      let datafromDatabaseUsingSectionMetadata =
        await gettabledatafromDatabaseUsingSectionMetadata({
          templatemetadata: props.templatemetadata,
          sitestatedata: props.sitestatedata,
          parentalltypecompstatedata: props.parentalltypecompstatedata,
          currenttablequerymetadatafromserver:
            currenttablequerymetadatafromserver,
          searchpanelchangevalue: searchpanelchangevalue,
          dbuisearchpanelidbeginswith: dbuisearchpanelidbeginswith,
          dbuisearchpaneltablename: dbuisearchpaneltablename,
        });
      let recordlistdatafromdb =
        datafromDatabaseUsingSectionMetadata.recordlistdatafromdb;
      let searchpanelrecordlistdatafromdb =
        datafromDatabaseUsingSectionMetadata.searchpanelrecordlistdatafromdb;

      templateareaitemconsolelog(
        props.templatemetadata,
        "recordlistdatafromdb",
        recordlistdatafromdb
      );
      await hideui({});
      await showui({
        recordlistdatafromdb: recordlistdatafromdb,
        recordlistdatafromdbU: recordlistdatafromdb,
        searchpanelrecordlistdatafromdb: searchpanelrecordlistdatafromdb,
        searchpanelchangevalue: searchpanelchangevalue,
        templateareaitemstatedata: templateareaitemstatedata,
        tablelayoutmetadatafromserver: tablelayoutmetadatafromserver,
        tablecolumnmetadatalistfromserver: tablecolumnmetadatalistfromserver,
        globaltablecolumnmetadatalistfromserver:
          globaltablecolumnmetadatalistfromserver,
        tablebuttonmetadatalistfromserver: tablebuttonmetadatalistfromserver,
        globaltablebuttonmetadatalistfromserver:
          globaltablebuttonmetadatalistfromserver,
        tablequerymetadatalistfromserver: tablequerymetadatalistfromserver,
      });
    } else if (isdatafromlocalcomponent === "true") {
      let recordlistdatafromdb = [];
      let columnsarray = [];
      if (datafromlocalcomponent && datafromlocalcomponent.columnsarray) {
        columnsarray = datafromlocalcomponent.columnsarray;
      }

      let dataarray = [];
      if (datafromlocalcomponent && datafromlocalcomponent.dataarray) {
        dataarray = datafromlocalcomponent.dataarray;
      }

      if (dataarray.length > 0) {
        for (let i = 0; i < dataarray.length; i++) {
          let recordlistdatafromdbvar = { data: {} };
          for (let j = 0; j < columnsarray.length; j++) {
            recordlistdatafromdbvar.data[columnsarray[j]] = dataarray[i][j];
          }

          recordlistdatafromdb.push(recordlistdatafromdbvar);
        }
      }

      templateareaitemconsolelog(
        props.templatemetadata,
        "datafromlocalcomponent",
        recordlistdatafromdb
      );
      await hideui({});

      await showui({
        recordlistdatafromdb: recordlistdatafromdb,
        recordlistdatafromdbU: recordlistdatafromdb,
        searchpanelrecordlistdatafromdb: [],
        searchpanelchangevalue: searchpanelchangevalue,
        templateareaitemstatedata: templateareaitemstatedata,
        tablelayoutmetadatafromserver: tablelayoutmetadatafromserver,
        tablecolumnmetadatalistfromserver: tablecolumnmetadatalistfromserver,
        globaltablecolumnmetadatalistfromserver:
          globaltablecolumnmetadatalistfromserver,
        tablebuttonmetadatalistfromserver: tablebuttonmetadatalistfromserver,
        globaltablebuttonmetadatalistfromserver:
          globaltablebuttonmetadatalistfromserver,
        tablequerymetadatalistfromserver: tablequerymetadatalistfromserver,
      });
    } else {
      await hideui({});
      await showui({
        recordlistdatafromdb: [],
        recordlistdatafromdbU: [],
        searchpanelrecordlistdatafromdb: [],
        searchpanelchangevalue: searchpanelchangevalue,
        templateareaitemstatedata: templateareaitemstatedata,
        tablelayoutmetadatafromserver: tablelayoutmetadatafromserver,
        tablecolumnmetadatalistfromserver: tablecolumnmetadatalistfromserver,
        globaltablecolumnmetadatalistfromserver:
          globaltablecolumnmetadatalistfromserver,
        tablebuttonmetadatalistfromserver: tablebuttonmetadatalistfromserver,
        globaltablebuttonmetadatalistfromserver:
          globaltablebuttonmetadatalistfromserver,
        tablequerymetadatalistfromserver: tablequerymetadatalistfromserver,
      });
    }
  }

  let showui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: true });
  };
  let hideui = async (methodprops) => {
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({ ...compstatejs, ...methodpropsjs, showui: false });
  };

  let handleClick = async (methodprops) => {
    alltypecompconsolelog("Alltypetemplateareaitemgetdata-handleClick");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;
    if (type === "sortbychange") {
      let sortbyobject = { name: methodprops.value, type: "asc" };
      await hideui({ sortbyobject: sortbyobject });
      await showui({ sortbyobject: sortbyobject });
    }
    if (type === "searchpanelchangevalue") {
      await fetchLayoutMetadatafromDB({
        searchpanelchangevalue: methodprops.value,
        dbuisearchpanelidbeginswith: methodprops.dbuisearchpanelidbeginswith,
        dbuisearchpaneltablename: methodprops.dbuisearchpaneltablename,
      });
    }
    if (type === "filterbychange") {
      let filterbyobject = compstate.filterbyobject;

      let columnname = methodprops.columnname;
      let columnvalue = methodprops.columnvalue;
      let existingcolumnvalues = [];
      let existingcolumnvaluesU = [];
      let isalreadyexists = false;
      if (filterbyobject) {
        existingcolumnvalues = filterbyobject[columnname];
      }

      if (existingcolumnvalues && existingcolumnvalues.length > 0) {
        for (let i = 0; i < existingcolumnvalues.length; i++) {
          if (existingcolumnvalues[i] === columnvalue) {
            isalreadyexists = true;
          }
          else {
            existingcolumnvaluesU.push(existingcolumnvalues[i]);
          }
        }
      }

      if (isalreadyexists === true) {
        filterbyobject[columnname] = existingcolumnvaluesU;
      }
      else {
        existingcolumnvaluesU.push(columnvalue);
        filterbyobject[columnname] = existingcolumnvaluesU;
      }


      alltypecompconsolelog(filterbyobject);
      await hideui({ filterbyobject: filterbyobject });
      await showui({ filterbyobject: filterbyobject });
    }
  };

  let handleChange = async (methodprops) => {
    alltypecompconsolelog("Alltypetemplateareaitemgetdata-handleChange");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;
  };

  let fromchildhandleClick = async (methodprops) => {
    alltypecompconsolelog(
      "Alltypetemplateareaitemgetdata-fromchildhandleClick"
    );
    alltypecompconsolelog(methodprops);
    let { type, order, lstobjindex, sectioncolumnmetadata } = methodprops;
    let { templateareaitemstatedata } = compstate;

    let templatemetadatajs = JSON.parse(JSON.stringify(props.templatemetadata));
    let {
      listobj,
      orientation,
      listitemwidth,
      isdatafromserver,
      isdatafromlocalcomponent,
    } = templatemetadatajs.items;

    if (type === "savefrombuilddatafromlocalhtml") {
      props.parenthandleClick({
        type: "savefromalltypetemplateareaitemgetdata",
        templatemetadata: methodprops.templatemetadata,
      });
    } else if (type === "savefrombuildtablequerymetadatapanelhtml") {
      props.parenthandleClick({
        type: "savefromalltypetemplateareaitemgetdata",
        templatemetadata: methodprops.templatemetadata,
      });
    } else if (
      type === "savefromtemplateareaitemsectioncomp" &&
      methodprops.sectiontype === "listbuttonpanelsectionmetadata"
    ) {
      templatemetadatajs.items.listbuttonpanelsectionmetadata =
        methodprops.sectionmetadata;

      props.parenthandleClick({
        type: "savefromalltypetemplateareaitemgetdata",
        templatemetadata: templatemetadatajs,
      });
    } else if (
      type === "executeclickfromtemplateareaitem" ||
      type === "executeclickfromsectioncolumn"
    ) {
      if (
        sectioncolumnmetadata &&
        sectioncolumnmetadata.onclick &&
        (sectioncolumnmetadata.onclick.type ===
          "updatetemplateareaitemstatedata" ||
          sectioncolumnmetadata.onclick.type ===
          "updatetemplateareaitemstatedataandrefreshui" ||
          sectioncolumnmetadata.onclick.type === "modifydatabase" ||
          sectioncolumnmetadata.onclick.type === "modifydatabaseandrefreshui" ||
          sectioncolumnmetadata.onclick.type ===
          "modifydatabaseandrefreshparentui" ||
          sectioncolumnmetadata.onclick.type === "redirect" ||
          sectioncolumnmetadata.onclick.type === "updatesitestatedata" ||
          sectioncolumnmetadata.onclick.type ===
          "updatesitestatedataandrefreshui" ||
          sectioncolumnmetadata.onclick.type ===
          "updatebrowserlocalstoragedata" ||
          sectioncolumnmetadata.onclick.type ===
          "updatebrowserlocalstoragedataandrefreshallui" ||
          sectioncolumnmetadata.onclick.type ===
          "resetbrowserlocalstoragedata" ||
          sectioncolumnmetadata.onclick.type ===
          "resetbrowserlocalstoragedataandrefreshallui" ||
          sectioncolumnmetadata.onclick.type ===
          "modifydatabaseandrefreshallui" ||
          sectioncolumnmetadata.onclick.type === "modifydatabaseandredirect" ||
          sectioncolumnmetadata.onclick.type ===
          "passselectedsearchdatatoparentui")
      ) {
        methodprops.templateareaitemstatedata.onchangedata =
          templateareaitemstatedata.onchangedata;
        let clickhandlerresult = await alltypecompClickHandler({
          ...methodprops,
          sitestatedata: props.sitestatedata,
          parentalltypecompstatedata: props.parentalltypecompstatedata,
        });

        if (clickhandlerresult.result.issuccess === "true") {
          templateareaitemstatedata =
            clickhandlerresult.templateareaitemstatedata;
          if (
            sectioncolumnmetadata.onclick.type ===
            "updatetemplateareaitemstatedataandrefreshui"
          ) {
            await fetchLayoutMetadatafromDB({
              templateareaitemstatedata: templateareaitemstatedata,
            });
          }
          if (
            sectioncolumnmetadata.onclick.type === "modifydatabaseandrefreshui"
          ) {
            await fetchLayoutMetadatafromDB({});
          }

          if (
            sectioncolumnmetadata.onclick.type ===
            "modifydatabaseandrefreshparentui"
          ) {
            props.parenthandleClick({
              ...methodprops,
              // type: "executeclickfromalltypetemplateareaitemgetdata",
              type: "executeonpopupparent",
              templatemetadata: templatemetadatajs,
              sitestatedata: clickhandlerresult.sitestatedata,
              isupdatesitestatedata: false,
              isrefreshsiteparent: false,
              isredirect: false,
              isrefreshcompparent: true,
            });
          }

          if (
            sectioncolumnmetadata.onclick.type ===
            "passselectedsearchdatatoparentui"
          ) {
            props.parenthandleClick({
              ...methodprops,
              // type: "executeclickfromalltypetemplateareaitemgetdata",
              type: "executeonpopupparent",
              templatemetadata: templatemetadatajs,
              sitestatedata: clickhandlerresult.sitestatedata,
              isupdatesitestatedata: false,
              isrefreshsiteparent: false,
              isredirect: false,
              isrefreshcompparent: true,
              selecteduirepeatrecorddata:
                templateareaitemstatedata.uirepeatrecorddata,
            });
          }
          if (
            sectioncolumnmetadata.onclick.type === "redirect" ||
            sectioncolumnmetadata.onclick.type === "modifydatabaseandredirect"
          ) {
            props.parenthandleClick({
              ...methodprops,
              type: "executeonsiteparent",
              sitestatedata: clickhandlerresult.sitestatedata,
              isupdatesitestatedata: false,
              isrefreshsiteparent: false,
              isredirect: true,
              isrefreshcompparent: false,
            });
          }
          if (sectioncolumnmetadata.onclick.type === "updatesitestatedata") {
            props.parenthandleClick({
              ...methodprops,
              type: "executeonsiteparent",
              sitestatedata: clickhandlerresult.sitestatedata,
              isupdatesitestatedata: true,
              isrefreshsiteparent: false,
              isrefreshcompparent: false,
              isredirect: false,
            });
          }
          if (
            sectioncolumnmetadata.onclick.type ===
            "updatesitestatedataandrefreshui"
          ) {
            props.parenthandleClick({
              ...methodprops,
              type: "executeonsiteparent",
              sitestatedata: clickhandlerresult.sitestatedata,
              isupdatesitestatedata: true,
              isrefreshsiteparent: false,
              isrefreshcompparent: false,
              isredirect: true,
            });
          }
          if (
            sectioncolumnmetadata.onclick.type ===
            "modifydatabaseandrefreshallui" ||
            sectioncolumnmetadata.onclick.type ===
            "updatebrowserlocalstoragedataandrefreshallui" ||
            sectioncolumnmetadata.onclick.type ===
            "resetbrowserlocalstoragedataandrefreshallui"
          ) {
            props.parenthandleClick({
              ...methodprops,
              type: "executeonsiteparent",
              sitestatedata: clickhandlerresult.sitestatedata,
              isupdatesitestatedata: false,
              isrefreshsiteparent: true,
              isrefreshcompparent: false,
              isredirect: false,
            });
          }
        } else {
          alert(clickhandlerresult.result.message);
        }
      } else {
        alltypecompconsolelog(templateareaitemstatedata);
        alltypecompconsolelog(methodprops);
        props.parenthandleClick({
          ...methodprops,
          type: "executeclickfromalltypetemplateareaitemgetdata",
          templatemetadata: templatemetadatajs,
        });
      }
    } else if (type === "executeonsiteparent") {
      props.parenthandleClick({
        ...methodprops,
      });
    } else if (type === "executeonpopupparent") {
      await fetchLayoutMetadatafromDB({});
    } else {
      if (isdatafromserver === "true" || isdatafromlocalcomponent === "true") {
        for (let i in listobj) {
          if (
            type === "savefromnavbarhtml" ||
            type === "savefromutilbarhtml" ||
            type === "savefromimagepanelgalleryhtml" ||
            type === "savefromimagegallerytemplateareaitemhtml" ||
            type === "savefromaddresscardtemplateareaitemhtml" ||
            type === "savefromrecorddatahtml" ||
            type === "savefromcardtemplateareaitemhtml" ||
            type === "savefromprogresscardlisthtml" ||
            type === "savefromcontactusformhtml" ||
            type === "savefromsocialbarhtml" ||
            type === "savefromcarasoulhtml"
          ) {
            templatemetadatajs.items.listobj[i] = JSON.parse(
              JSON.stringify(methodprops.lstobj)
            );
            props.parenthandleClick({
              type: "savefromalltypetemplateareaitemgetdata",
              templatemetadata: JSON.parse(JSON.stringify(templatemetadatajs)),
            });
          }
        }
      } else {
        for (let i in listobj) {
          if (i === lstobjindex) {
            if (
              type === "savefromnavbarhtml" ||
              type === "savefromutilbarhtml" ||
              type === "savefromimagepanelgalleryhtml" ||
              type === "savefromimagegallerytemplateareaitemhtml" ||
              type === "savefromaddresscardtemplateareaitemhtml" ||
              type === "savefromrecorddatahtml" ||
              type === "savefromcardtemplateareaitemhtml" ||
              type === "savefromprogresscardlisthtml" ||
              type === "savefromcontactusformhtml" ||
              type === "savefromsocialbarhtml" ||
              type === "savefromcarasoulhtml"
            ) {
              templatemetadatajs.items.listobj[i] = JSON.parse(
                JSON.stringify(methodprops.lstobj)
              );
              props.parenthandleClick({
                type: "savefromalltypetemplateareaitemgetdata",
                templatemetadata: templatemetadatajs,
              });
            }
          }
        }
      }
    }

    alltypecompconsolelog(templateareaitemstatedata);

    alltypecompconsolelog(
      "Alltypetemplateareaitemgetdata-fromchildhandleClick-exit"
    );
  };

  let fromchildhandleChange = async (methodprops) => {
    alltypecompconsolelog(
      "Alltypetemplateareaitemgetdata-fromchildhandleChange"
    );
    alltypecompconsolelog(methodprops);

    let { type, order, lstobjindex, sectioncolumnmetadata } = methodprops;
    let { templateareaitemstatedata } = compstate;
    let templatemetadatajs = JSON.parse(JSON.stringify(props.templatemetadata));
    let { listobj, orientation, listitemwidth } = templatemetadatajs.items;

    if (
      sectioncolumnmetadata &&
      sectioncolumnmetadata.onchange &&
      sectioncolumnmetadata.onchange.type === "updatetemplateareaitemstatedata"
    ) {
      let changehandlerresult = await alltypecompChangeHandler({
        ...methodprops,
        sitestatedata: props.sitestatedata,
        templateareaitemstatedata: templateareaitemstatedata,
      });
      templateareaitemstatedata = changehandlerresult.templateareaitemstatedata;
    } else if (
      sectioncolumnmetadata &&
      sectioncolumnmetadata.onchange &&
      sectioncolumnmetadata.onchange.type ===
      "updatetemplateareaitemstatedataandrefreshui"
    ) {
      let changehandlerresult = await alltypecompChangeHandler({
        ...methodprops,
        sitestatedata: props.sitestatedata,
        templateareaitemstatedata: templateareaitemstatedata,
      });
      templateareaitemstatedata = changehandlerresult.templateareaitemstatedata;
      // await hideui({});
      // await showui({
      //     templateareaitemstatedata: templateareaitemstatedata,
      // });

      await fetchLayoutMetadatafromDB({
        templateareaitemstatedata: templateareaitemstatedata,
      });
    } else if (type === "executechangefromtemplateareaitem") {
      // for (let j = 0; j < recordlistdatafromdbU.length; j++) {
      //     if (
      //         methodprops.recorddata &&
      //         recordlistdatafromdbU[j].id === methodprops.recorddata.id
      //     ) {
      //         recordlistdatafromdbU[j] = methodprops.recorddata;
      //     }
      // }

      props.parenthandleChange({
        ...methodprops,
        type: "executechangefromalltypetemplateareaitemgetdata",
        templatemetadata: templatemetadatajs,

        listobj: listobj,
      });
    } else if (type === "executeonsiteparent") {
      props.parenthandleChange({
        ...methodprops,
      });
    }

    alltypecompconsolelog(templateareaitemstatedata);

    alltypecompconsolelog(
      "Alltypetemplateareaitemgetdata-fromchildhandleChange-exit"
    );
  };

  if (compstate.showui !== true) {
    return <></>;
  } else {
    templateareaitemconsolelog(
      props.templatemetadata,
      "Alltypetemplateareaitemgetdata-render",
      compstate
    );
    templateareaitemconsolelog(
      props.templatemetadata,
      "Alltypetemplateareaitemgetdata-render",
      props
    );

    let mainpanelHtml = [];
    let { modetype, templatemetadata, isparenttablelayoutmetadatafield } =
      props;

    let templatemetadataui = JSON.parse(JSON.stringify(props.templatemetadata));
    let modetypeui = modetype;

    let {
      filterbyobject,
      sortbyobject,
      recordlistdatafromdb,
      searchpanelrecordlistdatafromdb,
      searchpanelchangevalue,
      templateareaitemstatedata,
      tablelayoutmetadatafromserver,
      tablebuttonmetadatalistfromserver,
      globaltablebuttonmetadatalistfromserver,
      tablecolumnmetadatalistfromserver,
      globaltablecolumnmetadatalistfromserver,
    } = compstate;
    let {
      dbfilterpanelsectionmetadata,
      dbsortpanelsectionmetadata,
      dbuisortpanelsectionwidth,
      dbuifilterpanelsectionwidth,
      isdatafromserver,
      isdatafromlocalcomponent,
      dbshowsortpanel,
      dbshowfilterpanel,

      islayoutmetadatafromserver,
    } = templatemetadata.items;

    if (
      islayoutmetadatafromserver === "true" &&
      modetypeui === "normal" &&
      Object.keys(tablelayoutmetadatafromserver).length > 0 &&
      tablelayoutmetadatafromserver.data.metadata &&
      Object.keys(tablelayoutmetadatafromserver.data.metadata).length > 0
    ) {
      templatemetadataui = tablelayoutmetadatafromserver.data.metadata;
      //   modetypeui = "normal";
    }


    let {
      listobj,
      orientation,
      listitemwidth,
      listbuttonpanelsectionwidth,
      listbuttonpanelsectionmetadata,
      headingtext,
      dbuisearchpanelsectionwidth,
      dbuisearchpanelidbeginswith,
      dbuisearchpaneltablename,
      dbshowsearchpanel,
      dbisgroupbyrangecolumndata,
      dbgroupbyrangecolumndatashowrangevaluelist,
      dbgroupbyrangecolumndataheading,
      dbgroupbyrangecolumndatatablename,
      dbgroupbyrangecolumndatatablecolumnname,
      dbgroupbyrangecolumndatacurrenttablecolumnvalue,
    } = templatemetadataui.items;

    let flexstyle = {
      display: "inline-flex",
      flexWrap: "wrap",
      width: "100%",
    };

    let Lstobjhtml = [];
    let Searchlstobjhtml = [];

    let tablecolumnmetadatalisthtml = [];
    let tablebuttonmetadatalisthtml = [];
    let listbuttonpanelsectionmetadatahtml = [];
    let uisortfilterpanelsectionmetadatahtml = [];
    let uisearchpanelhtml = [];
    if (dbshowsearchpanel === "true") {
      uisearchpanelhtml.push(
        <div style={{ width: dbuisearchpanelsectionwidth }}>
          <input
            defaultvalue={searchpanelchangevalue}
            onBlur={(e) =>
              handleClick({
                type: "searchpanelchangevalue",
                value: e.target.value,
                dbuisearchpanelidbeginswith: dbuisearchpanelidbeginswith,
                dbuisearchpaneltablename: dbuisearchpaneltablename,
              })
            }
          />
        </div>
      );
    }

    //filter / sort data
    let sortbyname = "";
    if (sortbyobject && Object.keys(sortbyobject).length > 0) {
      sortbyname = sortbyobject.name;
    }

    let recordlistdataArray = [];
    let recordlistdataArraySorted = [];
    let recordlistdataArraySortedFiltered = [];
    if (isdatafromserver === "true") {
      // get records
      recordlistdataArray = recordlistdatafromdb;

      // sort records
      if (sortbyname !== "") {
        recordlistdataArraySorted = sortArray(
          recordlistdataArray,
          "data." + sortbyname,
          "string"
        );
      } else {
        recordlistdataArraySorted = recordlistdataArray;
      }
      alltypecompconsolelog(recordlistdataArraySorted);

      if (filterbyobject && Object.keys(filterbyobject).length > 0) {
        for (let j = 0; j < recordlistdataArraySorted.length; j++) {
          let ismatching = true;
          for (let i in filterbyobject) {
            if (filterbyobject[i] && filterbyobject[i].length > 0) {

              if (
                !filterbyobject[i].includes(
                  recordlistdataArraySorted[j].data[i]
                )
              ) {
                ismatching = false;
              }
            }
          }

          if (ismatching === true) {
            recordlistdataArraySortedFiltered.push(
              recordlistdataArraySorted[j]
            );
          }
        }
      } else {
        recordlistdataArraySortedFiltered = recordlistdataArraySorted;
      }

      // add test record if no record existing when building ui
      if (
        modetypeui === "build" &&
        recordlistdataArraySortedFiltered.length === 0
      ) {
        recordlistdataArraySortedFiltered.push({
          orgname: "test",
          id: "test",
          data: {},
        });
      }
    }
    if (isdatafromlocalcomponent === "true") {
      // get records
      recordlistdataArraySortedFiltered = recordlistdatafromdb;
    }

    // UI section

    // draggable columns buttons in build mode
    if (
      tablecolumnmetadatalistfromserver &&
      tablecolumnmetadatalistfromserver.length > 0
    ) {
      templateareaitemstatedata.tablecolumnmetadatalistfromserver = JSON.parse(
        JSON.stringify(tablecolumnmetadatalistfromserver)
      );
      if (isparenttablelayoutmetadatafield === "true" && modetype === "build") {
        tablecolumnmetadatalisthtml.push(
          <b>
            <br />
            draggable columns
            <br />
          </b>
        );
        tablecolumnmetadatalisthtml.push(
          <DraggableTableColumnButtonmetadatalisthtml
            tablecolumnbuttonmetadatalist={tablecolumnmetadatalistfromserver}
            columnbuttontype="tablecolumnmetadatafromserver"
          />
        );
      }
    }

    if (
      globaltablecolumnmetadatalistfromserver &&
      globaltablecolumnmetadatalistfromserver.length > 0
    ) {
      templateareaitemstatedata.globaltablecolumnmetadatalistfromserver =
        JSON.parse(JSON.stringify(globaltablecolumnmetadatalistfromserver));
      if (isparenttablelayoutmetadatafield === "true" && modetype === "build") {
        tablecolumnmetadatalisthtml.push(
          <b>
            <br />
            global draggable columns
            <br />
          </b>
        );
        tablecolumnmetadatalisthtml.push(
          <DraggableTableColumnButtonmetadatalisthtml
            tablecolumnbuttonmetadatalist={
              globaltablecolumnmetadatalistfromserver
            }
            columnbuttontype="globaltablecolumnmetadatafromserver"
          />
        );
      }
    }

    if (
      tablebuttonmetadatalistfromserver &&
      tablebuttonmetadatalistfromserver.length > 0
    ) {
      templateareaitemstatedata.tablebuttonmetadatalistfromserver = JSON.parse(
        JSON.stringify(tablebuttonmetadatalistfromserver)
      );
      if (isparenttablelayoutmetadatafield === "true" && modetype === "build") {
        tablebuttonmetadatalisthtml.push(
          <b>
            <br />
            draggable buttons
            <br />
          </b>
        );
        tablebuttonmetadatalisthtml.push(
          <DraggableTableColumnButtonmetadatalisthtml
            tablecolumnbuttonmetadatalist={tablebuttonmetadatalistfromserver}
            columnbuttontype="tablebuttonmetadatafromserver"
          />
        );
      }
    }

    if (
      globaltablebuttonmetadatalistfromserver &&
      globaltablebuttonmetadatalistfromserver.length > 0
    ) {
      templateareaitemstatedata.globaltablebuttonmetadatalistfromserver =
        JSON.parse(JSON.stringify(globaltablebuttonmetadatalistfromserver));
      if (isparenttablelayoutmetadatafield === "true" && modetype === "build") {
        tablebuttonmetadatalisthtml.push(
          <b>
            <br />
            global draggable buttons
            <br />
          </b>
        );
        tablebuttonmetadatalisthtml.push(
          <DraggableTableColumnButtonmetadatalisthtml
            tablecolumnbuttonmetadatalist={
              globaltablebuttonmetadatalistfromserver
            }
            columnbuttontype="globaltablebuttonmetadatafromserver"
          />
        );
      }
    }

    // list button panel

    if (
      listbuttonpanelsectionmetadata &&
      Object.keys(listbuttonpanelsectionmetadata).length > 0 &&
      listbuttonpanelsectionwidth !== "0%"
    ) {
      listbuttonpanelsectionmetadatahtml.push(
        <div style={{ width: listbuttonpanelsectionwidth }}>
          <Templateareaitemsectioncomp
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={templateareaitemstatedata}
            datatype="templateareaitemsection"
            draggablefortemplatebuilder={false}
            sectionmetadata={listbuttonpanelsectionmetadata}
            modetype={modetypeui}
            parenthandleClick={(props) =>
              fromchildhandleClick({
                ...props,
                sectiontype: "listbuttonpanelsectionmetadata",
              })
            }
            parenthandleChange={(props) =>
              fromchildhandleChange({
                ...props,
                sectiontype: "listbuttonpanelsectionmetadata",
              })
            }
          />
        </div>
      );
    }

    // build table query html

    let buildlstobjdatahtml = [];
    if (modetype === "build" && isdatafromserver === "true") {
      buildlstobjdatahtml.push(
        <Buildtablequerymetadatapanelhtml
          sitestatedata={props.sitestatedata}
          templateareaitemstatedata={templateareaitemstatedata}
          templatemetadata={templatemetadata}
          modetype={modetype}
          parenthandleClick={(props) => fromchildhandleClick({ ...props })}
          parenthandleChange={(props) => fromchildhandleChange({ ...props })}
        />
      );
    }

    if (modetype === "build" && isdatafromlocalcomponent === "true") {
      buildlstobjdatahtml.push(
        <Builddatafromlocalcomphtml
          sitestatedata={props.sitestatedata}
          templateareaitemstatedata={templateareaitemstatedata}
          templatemetadata={templatemetadata}
          modetype={modetype}
          parenthandleClick={(props) => fromchildhandleClick({ ...props })}
          parenthandleChange={(props) => fromchildhandleChange({ ...props })}
        />
      );
    }

    if (isdatafromserver === "true" || isdatafromlocalcomponent === "true") {
      if (
        templatemetadataui.type !== "utilbartemplateareaitem" &&
        templatemetadataui.type !== "navbartemplateareaitem" &&
        isdatafromserver === "true"
      ) {
        uisortfilterpanelsectionmetadatahtml.push(
          <Uisortfilterpanelhtml
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={templateareaitemstatedata}
            recordlistdatafromdb={recordlistdatafromdb}
            templatemetadata={templatemetadata}
            sortbyname={sortbyname}
            filterbyobject={filterbyobject}
            parenthandleClick={(props) => handleClick({ ...props })}
            parenthandleChange={(props) => fromchildhandleChange({ ...props })}
          />
        );
      }

      // add lstobjitemhtml  to ui
      let listobjitem = {};
      for (let i in listobj) {
        listobjitem = listobj[i];
      }

      let searchfilterarraylenth = searchpanelrecordlistdatafromdb.length;
      if (
        searchfilterarraylenth > 0 &&
        searchpanelchangevalue !== "" &&
        searchpanelchangevalue !== undefined
      ) {
        if (
          modetypeui === "build" ||
          templatemetadataui.type === "carasoultemplateareaitem" ||
          templatemetadataui.type === "utilbartemplateareaitem" ||
          templatemetadataui.type === "navbartemplateareaitem"
        ) {
          searchfilterarraylenth = 1;
        }
        templateareaitemconsolelog(
          props.templatemetadata,
          "searchfilterarraylenth",
          searchfilterarraylenth
        );

        for (let j = 0; j < searchfilterarraylenth; j++) {
          templateareaitemstatedata.uirepeatrecorddata = JSON.parse(
            JSON.stringify(searchpanelrecordlistdatafromdb[j])
          );
          templateareaitemstatedata.showonlysearchpanel = "true";
          templateareaitemstatedata.isdatafromserver = "true";
          templateareaitemstatedata.lstobjindex = j;
          templateareaitemconsolelog(
            props.templatemetadata,
            "templateareaitemstatedata",
            templateareaitemstatedata
          );
          Searchlstobjhtml.push(
            <div style={{ width: listitemwidth }}>
              <Utiltemplateareaitem
                parentalltypecompstatedata={props.parentalltypecompstatedata}
                sitestatedata={props.sitestatedata}
                templatemetadata={templatemetadataui}
                lstobjitemfromparent={listobjitem}
                templateareaitemstatedata={JSON.parse(
                  JSON.stringify(templateareaitemstatedata)
                )}
                modetype={modetypeui}
                parenthandleClick={(props) =>
                  fromchildhandleClick({ ...props, lstobjindex: j })
                }
                parenthandleChange={(props) =>
                  fromchildhandleChange({ ...props, lstobjindex: j })
                }
              />
            </div>
          );
        }
      }

      let filterarraylenth = recordlistdataArraySortedFiltered.length;
      if (
        filterarraylenth > 0 &&
        (searchpanelchangevalue === "" || searchpanelchangevalue === undefined)
      ) {
        if (
          modetypeui === "build" ||
          templatemetadataui.type === "carasoultemplateareaitem" ||
          templatemetadataui.type === "utilbartemplateareaitem" ||
          templatemetadataui.type === "navbartemplateareaitem"
        ) {
          filterarraylenth = 1;
        }
        templateareaitemconsolelog(
          props.templatemetadata,
          "dbisgroupbyrangecolumndata",
          dbisgroupbyrangecolumndata
        );
        templateareaitemconsolelog(
          props.templatemetadata,
          "dbgroupbyrangecolumndatashowrangevaluelist",
          dbgroupbyrangecolumndatashowrangevaluelist
        );
        templateareaitemconsolelog(
          props.templatemetadata,
          "dbisgroupbyrangecolumndata",
          dbisgroupbyrangecolumndata
        );

        if (
          dbisgroupbyrangecolumndata === "true" &&
          dbgroupbyrangecolumndatashowrangevaluelist &&
          dbgroupbyrangecolumndatashowrangevaluelist !== ""
        ) {
          let dbgroupbyrangecolumndatashowrangevaluelistsplit =
            dbgroupbyrangecolumndatashowrangevaluelist.split(",");
          templateareaitemconsolelog(
            props.templatemetadata,
            "dbgroupbyrangecolumndatashowrangevaluelistsplit",
            dbgroupbyrangecolumndatashowrangevaluelistsplit
          );
          for (
            let rv = 0;
            rv < dbgroupbyrangecolumndatashowrangevaluelistsplit.length;
            rv++
          ) {
            if (
              dbgroupbyrangecolumndatashowrangevaluelistsplit[rv] &&
              dbgroupbyrangecolumndatashowrangevaluelistsplit[rv] !== ""
            ) {
              let showonlyifrangecolumnvalue =
                dbgroupbyrangecolumndatashowrangevaluelistsplit[rv];
              templateareaitemconsolelog(
                props.templatemetadata,
                "showonlyifrangecolumnvalue",
                showonlyifrangecolumnvalue
              );
              templateareaitemstatedata.showonlyifrangecolumnvalue =
                showonlyifrangecolumnvalue;
              let dbgroupbyrangecolumndataheadingU = replacedynamictext({
                replacetext: dbgroupbyrangecolumndataheading,
                sitestatedata: props.sitestatedata,
                templateareaitemstatedata: templateareaitemstatedata,
                parentalltypecompstatedata: {},
                tabledata: {},
              });

              Lstobjhtml.push(
                <div style={{ width: "100%" }}>
                  {dbgroupbyrangecolumndataheadingU}
                </div>
              );

              for (let j = 0; j < filterarraylenth; j++) {
                templateareaitemstatedata.uirepeatrecorddata = JSON.parse(
                  JSON.stringify(recordlistdataArraySortedFiltered[j])
                );
                templateareaitemstatedata.isdatafromserver = "true";
                templateareaitemstatedata.showonlysearchpanel = "false";
                templateareaitemstatedata.lstobjindex = j;
                Lstobjhtml.push(
                  <div style={{ width: listitemwidth }} data-id="testte">
                    <Utiltemplateareaitem
                      parentalltypecompstatedata={
                        props.parentalltypecompstatedata
                      }
                      sitestatedata={props.sitestatedata}
                      templatemetadata={templatemetadataui}
                      lstobjitemfromparent={listobjitem}
                      templateareaitemstatedata={JSON.parse(
                        JSON.stringify(templateareaitemstatedata)
                      )}
                      modetype={modetypeui}
                      parenthandleClick={(props) =>
                        fromchildhandleClick({ ...props, lstobjindex: j })
                      }
                      parenthandleChange={(props) =>
                        fromchildhandleChange({ ...props, lstobjindex: j })
                      }
                    />
                  </div>
                );
              }
            }
          }
        } else {
          for (let j = 0; j < filterarraylenth; j++) {
            templateareaitemstatedata.uirepeatrecorddata = JSON.parse(
              JSON.stringify(recordlistdataArraySortedFiltered[j])
            );
            templateareaitemstatedata.isdatafromserver = "true";
            templateareaitemstatedata.showonlysearchpanel = "false";
            templateareaitemstatedata.lstobjindex = j;
            Lstobjhtml.push(
              <div style={{ width: listitemwidth }} data-id="testte">
                <Utiltemplateareaitem
                  parentalltypecompstatedata={props.parentalltypecompstatedata}
                  sitestatedata={props.sitestatedata}
                  templatemetadata={templatemetadataui}
                  lstobjitemfromparent={listobjitem}
                  templateareaitemstatedata={JSON.parse(
                    JSON.stringify(templateareaitemstatedata)
                  )}
                  modetype={modetypeui}
                  parenthandleClick={(props) =>
                    fromchildhandleClick({ ...props, lstobjindex: j })
                  }
                  parenthandleChange={(props) =>
                    fromchildhandleChange({ ...props, lstobjindex: j })
                  }
                />
              </div>
            );
          }
        }
      }
    } else {
      if (
        templatemetadataui.type === "carasoultemplateareaitem" ||
        templatemetadataui.type === "utilbartemplateareaitem"
      ) {
        let listobjmax = 0;
        for (let i in listobj) {
          if (listobjmax === 0) {
            templateareaitemstatedata.uirepeatrecorddata = {};
            templateareaitemstatedata.isdatafromserver = "false";
            templateareaitemstatedata.showonlysearchpanel = "false";
            templateareaitemstatedata.lstobjindex = i;
            Lstobjhtml.push(
              <>
                <Utiltemplateareaitem
                  parentalltypecompstatedata={props.parentalltypecompstatedata}
                  sitestatedata={props.sitestatedata}
                  templatemetadata={templatemetadataui}
                  lstobjitemfromparent={listobj[i]}
                  templateareaitemstatedata={templateareaitemstatedata}
                  modetype={modetypeui}
                  parenthandleClick={(props) =>
                    fromchildhandleClick({ ...props, lstobjindex: i })
                  }
                  parenthandleChange={(props) =>
                    fromchildhandleChange({ ...props, lstobjindex: i })
                  }
                />
              </>
            );
            listobjmax = listobjmax + 1;
          }
        }
      } else {
        for (let i in listobj) {
          templateareaitemstatedata.uirepeatrecorddata = {};
          templateareaitemstatedata.isdatafromserver = "false";
          templateareaitemstatedata.showonlysearchpanel = "false";
          templateareaitemstatedata.lstobjindex = i;
          Lstobjhtml.push(
            <>
              <Utiltemplateareaitem
                parentalltypecompstatedata={props.parentalltypecompstatedata}
                sitestatedata={props.sitestatedata}
                templatemetadata={templatemetadataui}
                lstobjitemfromparent={listobj[i]}
                templateareaitemstatedata={templateareaitemstatedata}
                modetype={modetypeui}
                parenthandleClick={(props) =>
                  fromchildhandleClick({ ...props, lstobjindex: i })
                }
                parenthandleChange={(props) =>
                  fromchildhandleChange({ ...props, lstobjindex: i })
                }
              />
            </>
          );
        }
      }
    }

    mainpanelHtml.push(
      <div style={flexstyle}>
        {Searchlstobjhtml}
        {Lstobjhtml}
      </div>
    );

    headingtext = replacedynamictext({
      replacetext: headingtext,
      sitestatedata: props.sitestatedata,
      templateareaitemstatedata: templateareaitemstatedata,
      parentalltypecompstatedata: {},
      tabledata: {},
    });

    return (
      <>
        {headingtext}
        {tablecolumnmetadatalisthtml}
        {tablebuttonmetadatalisthtml}
        {listbuttonpanelsectionmetadatahtml}
        {buildlstobjdatahtml}
        {uisortfilterpanelsectionmetadatahtml}
        {uisearchpanelhtml}

        {mainpanelHtml}
      </>
    );
  }
}

export function Alltypetemplateareaitemcomp(props) {
  const [compstate, setCompstate] = useState({
    modetype: props.modetype,
    showbuildpropsui: false,
    templatemetadata: JSON.parse(JSON.stringify(props.templatemetadata)),
    showui: true,
  });

  let updateCompstateandRefresh = async (methodprops) => {
    alltypecompconsolelog(
      "Alltypetemplateareaitemcomp-updateCompstateandRefresh"
    );
    alltypecompconsolelog(methodprops);
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({
      ...compstatejs,
      ...methodpropsjs,
      showui: false,
    });
    await setCompstate({
      ...compstatejs,
      ...methodpropsjs,
      showui: true,
    });
  };

  let updateCompstate = async (methodprops) => {
    alltypecompconsolelog("Alltypetemplateareaitemcomp-updateCompstate");
    alltypecompconsolelog(methodprops);
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({
      ...compstatejs,
      ...methodpropsjs,
    });
  };

  let handleClick = async (methodprops) => {
    alltypecompconsolelog("Alltypetemplateareaitemcomp-handleClick");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;
    let { draggable } = props;

    if (type === "makemodetypebuild") {
      props.parenthandleClick({
        type: "makemodetypebuildfromtemplateareaitem",
        templatemetadata: compstate.templatemetadata,
      });
    } else if (type === "savebuilduichanges") {
      props.parenthandleClick({
        type: "savefromtemplateareaitem",
        templatemetadata: compstate.templatemetadata,
      });
    } else if (type === "cancelbuilduichanges") {
      props.parenthandleClick({
        type: "savefromtemplateareaitem",
        templatemetadata: JSON.parse(JSON.stringify(props.templatemetadata)),
      });
    } else if (type === "showbuildui") {
      await updateCompstate({
        showbuildpropsui: true,
      });
    } else if (type === "addcarasoulitem") {
      compstate.templatemetadata.items.listobj = dragdropHandler({
        changingobject: compstate.templatemetadata.items.listobj,
        //addingsubobject: { textsectionmetadata: carasoulmetadataItemInit },
        operationtype: "add",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });

      props.parenthandleClick({
        type: "savefromtemplateareaitem",
        templatemetadata: compstate.templatemetadata,
      });
    } else if (type === "deletecarasoulitem") {
      compstate.templatemetadata.items.listobj = dragdropHandler({
        changingobject: compstate.templatemetadata.items.listobj,
        addingsubobject: {},
        operationtype: "delete",
        preposttext: "",
        draggedcomporder: "",
        neworder: compstate.sectionIndex,
      });
      props.parenthandleClick({
        type: "savefromtemplateareaitem",
        templatemetadata: compstate.templatemetadata,
      });
    } else if (type === "droptemplateareaitemprepost") {
      props.parenthandleClick({
        ...methodprops,
        type: "droptemplateareaitemprepost",
      });
    } else if (type === "executeallowdrop" && draggable) {
      allowDrop(methodprops.e);
    } else if (type === "executedragstart" && draggable) {
      dragstart(methodprops.e);
    } else if (type === "executedragenter" && draggable) {
      dragEnter(methodprops.e);
    } else if (type === "executedragleave" && draggable) {
      dragLeave(methodprops.e);
    } else if (
      type === "executeonmouseenter" &&
      modetype === "build" &&
      draggable === false
    ) {
    } else if (
      type === "executeonmouseleave" &&
      modetype === "build" &&
      draggable === false &&
      showbuildpropsui === false
    ) {
    }
  };

  let handleChange = async (methodprops) => {
    let { type, order } = methodprops;
  };

  let fromchildhandleClick = async (methodprops) => {
    alltypecompconsolelog("Alltypetemplateareaitemcomp-fromchildhandleClick");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;
    let templatemetadatajs = JSON.parse(
      JSON.stringify(compstate.templatemetadata)
    );
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    if (type === "draftsavefromeditpropscomp") {
      // await updateCompstate({
      //   templatemetadata: methodprops.metadata,
      // });
      await setCompstate({
        ...compstatejs,
        templatemetadata: {},
        showui: false,
      });
      await setCompstate({
        ...compstatejs,
        templatemetadata: methodprops.metadata,
        showui: true,
      });
    } else if (type === "cancelfromeditpropscomp") {
      await updateCompstateandRefresh({
        templatemetadata: JSON.parse(JSON.stringify(props.templatemetadata)),
        showbuildpropsui: false,
      });
    } else if (type === "deletefromeditpropscomp") {
      props.parenthandleClick({
        type: "deletetemplateareaitem",
        templatemetadata: props.templatemetadata,
      });
    } else if (type === "duplicatefromeditpropscomp") {
      props.parenthandleClick({
        type: "duplicatetemplateareaitem",
        templatemetadata: props.templatemetadata,
      });
    } else if (type === "addtofavouritesfromeditpropscomp") {
      let dbuser = {};
      if (
        props.sitestatedata.signedindbuserdata &&
        props.sitestatedata.signedindbuserdata.id
      ) {
        dbuser = props.sitestatedata.signedindbuserdata;
      }
      if (
        props.sitestatedata.signedinvendordbuserdata &&
        props.sitestatedata.signedinvendordbuserdata.id
      ) {
        dbuser = props.sitestatedata.signedinvendordbuserdata;
      }

      let favouriteuiconfigslist = [];
      favouriteuiconfigslist.push({
        id: "fv-" + dbuser.id + "-" + methodprops.name,
        orgname: props.sitestatedata.orgdata.data.name,
        data: { metadata: props.templatemetadata, name: methodprops.name },
      });
      await inserttabledatainDatabase({
        tablename: "favouriteuiconfigs",
        tabledatalist: favouriteuiconfigslist,
      });

      // props.parenthandleClick({
      //     type: "savefromtemplateareaitem",
      //     templatemetadata: props.templatemetadata,
      // });

      props.parenthandleClick({
        type: "executeonsiteparent",
        sitestatedata: {},
        isupdatesitestatedata: false,
        isrefreshsiteparent: true,
        isredirect: false,
        isrefreshcompparent: false,
      });
    } else if (type === "addtolayoutfromeditpropscomp") {
      let tablelayoutmetadatalist = [];
      tablelayoutmetadatalist.push({
        data: {
          metadata: props.templatemetadata,
          type: methodprops.addtolayouttype,
          tablename: methodprops.addtolayouttablename,
          name: methodprops.addtolayoutname,
          profileid: methodprops.addtolayoutprofileid,
        },
      });
      await inserttabledatainDatabase({
        tablename: "tablelayoutmetadata",
        tabledatalist: tablelayoutmetadatalist,
      });

      props.parenthandleClick({
        type: "executeonsiteparent",
        sitestatedata: {},
        isupdatesitestatedata: false,
        isrefreshsiteparent: true,
        isredirect: false,
        isrefreshcompparent: false,
      });
    } else if (
      type === "savefromnavbarhtml" ||
      type === "savefromutilbarhtml" ||
      type === "savefromimagepanelgalleryhtml" ||
      type === "savefromimagegallerytemplateareaitemhtml" ||
      type === "savefromaddresscardtemplateareaitemhtml" ||
      type === "savefromalltypetemplateareaitemgetdata" ||
      type === "savefromcardtemplateareaitemhtml" ||
      type === "savefromprogresscardlisthtml" ||
      type === "savefromcontactusformhtml" ||
      type === "savefromsocialbarhtml" ||
      type === "savefromcarasoulhtml"
    ) {
      // await updateCompstateandRefresh({
      //   templatemetadata: JSON.parse(JSON.stringify(methodprops.templatemetadata)),
      //   showbuildpropsui: false,
      // });
      templatemetadatajs = JSON.parse(
        JSON.stringify(methodprops.templatemetadata)
      );
      alltypecompconsolelog(templatemetadatajs);

      await setCompstate({
        ...compstatejs,
        templatemetadata: {},
        showui: false,
      });
      await setCompstate({
        ...compstatejs,
        templatemetadata: templatemetadatajs,
        showui: true,
      });
    } else if (type === "savefromeditpropscomp") {
      props.parenthandleClick({
        type: "savefromtemplateareaitem",
        templatemetadata: JSON.parse(JSON.stringify(methodprops.metadata)),
      });
    } else if (type === "executeclickfromalltypetemplateareaitemgetdata") {
      props.parenthandleClick({
        ...methodprops,
        type: "executeclickfromalltypetemplateareaitemcomp",
      });
    } else if (
      type === "executeonpopupparent" ||
      type === "executeonsiteparent"
    ) {
      props.parenthandleClick({
        ...methodprops,
      });
    }
  };

  let fromchildhandleChange = async (methodprops) => {
    alltypecompconsolelog("Alltypetemplateareaitemcomp-fromchildhandleChange");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;
    if (type === "executechangefromalltypetemplateareaitemgetdata") {
      props.parenthandleChange({
        ...methodprops,
        type: "executechangefromalltypetemplateareaitemcomp",
      });
    } else if (
      type === "executeonpopupparent" ||
      type === "executeonsiteparent"
    ) {
      props.parenthandleChange({
        ...methodprops,
      });
    }
  };

  let { draggable, onclick, onchange, onmouseover, onmouseout, ondrop } = props;

  let { showbuildpropsui, templatemetadata, modetype } = compstate;
  alltypecompconsolelog("Alltypetemplateareaitemcomp-render");
  alltypecompconsolelog(compstate);

  if (compstate.showui === false) {
    return <></>;
  } else {
    let elementHtml = [];

    elementHtml.push(
      <Alltypetemplateareaitemgetdata
        isparenttablelayoutmetadatafield={
          props.isparenttablelayoutmetadatafield
        }
        parentalltypecompstatedata={props.parentalltypecompstatedata}
        sitestatedata={props.sitestatedata}
        templatemetadata={templatemetadata}
        modetype={modetype}
        sectiontype=""
        parenthandleClick={(props) => fromchildhandleClick(props)}
        parenthandleChange={(props) => fromchildhandleChange(props)}
      />
    );

    let elementbuildiconsHtml = [];
    if (modetype === "buildicon") {
      elementHtml.push(
        <>
          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataEdit}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "makemodetypebuild" })
            }
            parenthandleChange={(props) => { }}
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
            metadata={iconmetadatacircleDrag}
            modetype="normal"
            parenthandleClick={(props) => handleClick({ type: "showbuildui" })}
            parenthandleChange={(props) => { }}
          />
          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataThumsup}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "savebuilduichanges" })
            }
            parenthandleChange={(props) => { }}
          />

          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataThumsdown}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "cancelbuilduichanges" })
            }
            parenthandleChange={(props) => { }}
          />
        </>
      );

      if (templatemetadata.type === "carasoultemplateareaitem") {
        elementbuildiconsHtml.push(
          <>
            <Alltypecomp
              sitestatedata={{}}
              draggable={false}
              metadata={iconmetadataAdd}
              modetype="normal"
              parenthandleClick={(props) =>
                handleClick({ type: "addcarasoulitem" })
              }
              parenthandleChange={(props) => { }}
            />
            <Alltypecomp
              sitestatedata={{}}
              draggable={false}
              //   metadata={iconmetadataClose}
              modetype="normal"
              parenthandleClick={(props) =>
                handleClick({ type: "deletecarasoulitem" })
              }
              parenthandleChange={(props) => { }}
            />
          </>
        );
      }
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
              metadata={templatemetadata}
              parenthandleClick={(props) => fromchildhandleClick(props)}
              parenthandleChange={(props) => fromchildhandleChange(props)}
            />
          </div>
        </div>
      );
    }

    let mainpanelHtml = [];
    if (modetype === "buildicon") {
      mainpanelHtml.push(<>{elementHtml}</>);
      mainpanelHtml.push(<>{elementbuildiconsHtml}</>);
    } else if (modetype === "build") {
      mainpanelHtml.push(<>{elementHtml}</>);
      if (showbuildpropsui) {
        mainpanelHtml.push(<>{editpropshtml}</>);
      }
      mainpanelHtml.push(<>{elementbuildiconsHtml}</>);
    } else if (modetype === "normal") {
      mainpanelHtml.push(<>{elementHtml}</>);
    }

    if (draggable === true) {
      return (
        <div
          style={{ ...templatemetadata.style, display: "inline-block" }}
          //  onClick={() => onclick()}
          data-type={templatemetadata.type}
          data-order={templatemetadata.order}
          // onKeyUp={(e) =>
          //     handleClick({
          //         e,
          //         type: "executekeyup",
          //         order: templatemetadata.order,
          //     })
          // }
          // onMouseEnter={(e) =>
          //     handleClick({
          //         e,
          //         type: "executeonmouseenter",
          //         order: templatemetadata.order,
          //     })
          // }

          // onMouseLeave={(e) =>
          //     handleClick({
          //         e,
          //         type: "executeonmouseleave",
          //         order: templatemetadata.order,
          //     })
          // }

          draggable={draggable}
          onDragOver={(e) =>
            handleClick({
              e,
              type: "executeallowdrop",
              order: templatemetadata.order,
            })
          }
          onDragStart={(e) =>
            handleClick({
              e,
              type: "executedragstart",
              order: templatemetadata.order,
            })
          }
          onDragEnter={(e) =>
            handleClick({
              e,
              type: "executedragenter",
              order: templatemetadata.order,
            })
          }
          onDragLeave={(e) =>
            handleClick({
              e,
              type: "executedragleave",
              order: templatemetadata.order,
            })
          }
          onDrop={(e) =>
            handleClick({
              type: "droptemplateareaitemprepost",
              order: templatemetadata.order,
              e,
              preposttext: "pre",
            })
          }
        >
          {mainpanelHtml}
        </div>
      );
    } else {
      let templateareaitembuildstyle = {};
      if (modetype === "build") {
        templateareaitembuildstyle = {
          padding: "20px",
          border: "5px solid lightblue",
        };
      }
      return (
        <div
          style={{
            ...templatemetadata.style,
            display: "inline-block",
            ...templateareaitembuildstyle,
          }}
          // onClick={() => onclick()}
          data-type={templatemetadata.type}
          data-order={templatemetadata.order}
        // onKeyUp={(e) =>
        //     handleClick({
        //         e,
        //         type: "executekeyup",
        //         order: templatemetadata.order,
        //     })
        // }

        // onMouseEnter={(e) =>
        //     handleClick({
        //         e,
        //         type: "executeonmouseenter",
        //         order: templatemetadata.order,
        //     })
        // }

        // onMouseLeave={(e) =>
        //     handleClick({
        //         e,
        //         type: "executeonmouseleave",
        //         order: templatemetadata.order,
        //     })
        // }
        >
          {mainpanelHtml}
        </div>
      );
    }
  }
}



//////////////

function Templateareaitemlistcomp(props) {
  const [compstate, setCompstate] = useState({
    showbuildpropsui: false,
    showtemplateareaitemdraggable: false,
    builditemorder: "",
    templateareaitemlistmetadata: JSON.parse(
      JSON.stringify(props.templateareaitemlistmetadata)
    ),
  });

  let updateCompstate = async (methodprops) => {
    alltypecompconsolelog("Templateareaitemlistcomp-updateCompstate");
    alltypecompconsolelog(methodprops);
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({
      ...compstatejs,
      ...methodpropsjs,
    });
  };

  let handleClick = async (methodprops) => {
    alltypecompconsolelog("Templateareaitemlistcomp-handleClick");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;

    if (type === "showbuildui") {
      await updateCompstate({
        showbuildpropsui: true,
        builditemorder: "",
        showtemplateareaitemdraggable: false,
      });
    } else if (type === "maketemplateareaitemsdraggable") {
      await updateCompstate({
        showbuildpropsui: false,
        builditemorder: "",
        showtemplateareaitemdraggable: true,
      });
    } else if (type === "canceldonotsavedraggable") {
      props.parenthandleClick({
        type: "savefromtemplatearea",
        templateareaitemlistmetadata: props.templateareaitemlistmetadata,
      });
    } else if (type === "savedraggable") {
      props.parenthandleClick({
        type: "savefromtemplatearea",
        templateareaitemlistmetadata: compstate.templateareaitemlistmetadata,
      });
    } else if (type === "addtemplateareaitem") {
      let templateareaitemlistmetadatajs =
        compstate.templateareaitemlistmetadata;

      templateareaitemlistmetadatajs.items = dragdropHandler({
        changingobject: templateareaitemlistmetadatajs.items,
        addingsubobject: navbarmetadataInit,
        operationtype: "add",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });

      props.parenthandleClick({
        type: "savefromtemplatearea",
        templateareaitemlistmetadata: JSON.parse(
          JSON.stringify(templateareaitemlistmetadatajs)
        ),
      });
    }
  };

  let handleChange = async (methodprops) => {
    let { type, order } = methodprops;
  };

  let fromchildhandleClick = async (methodprops) => {
    alltypecompconsolelog("Templateareaitemlistcomp-fromchildhandleClick");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;
    let { favouriteuiconfigslistmetadata } = props.sitestatedata;

    if (type === "draftsavefromeditpropscomp") {
      await updateCompstate({
        builditemorder: "",
        templateareaitemlistmetadata: methodprops.metadata,
        showtemplateareaitemdraggable: false,
      });
    } else if (type === "savefromeditpropscomp") {
      props.parenthandleClick({
        type: "savefromtemplatearea",
        templateareaitemlistmetadata: methodprops.metadata,
      });
    } else if (type === "deletefromeditpropscomp") {
      props.parenthandleClick({
        type: "deletetemplatearea",
        templateareametadata: props.templateareaitemlistmetadata,
      });
    } else if (type === "cancelfromeditpropscomp") {
      await updateCompstate({
        builditemorder: "",
        templateareaitemlistmetadata: JSON.parse(
          JSON.stringify(props.templateareaitemlistmetadata)
        ),
        showbuildpropsui: false,
        showtemplateareaitemdraggable: false,
      });
    } else if (type === "makemodetypebuildfromtemplateareaitem") {
      await updateCompstate({
        showbuildpropsui: false,
        builditemorder: methodprops.templatemetadata.order,
        showtemplateareaitemdraggable: false,
      });
    } else if (type === "savefromtemplateareaitem") {
      let templateareaitemlistmetadatajs =
        compstate.templateareaitemlistmetadata;
      for (let i in templateareaitemlistmetadatajs.items) {
        if (
          templateareaitemlistmetadatajs.items[i].order ===
          methodprops.templatemetadata.order
        ) {
          templateareaitemlistmetadatajs.items[i] =
            methodprops.templatemetadata;

          props.parenthandleClick({
            type: "savefromtemplatearea",
            templateareaitemlistmetadata: JSON.parse(
              JSON.stringify(templateareaitemlistmetadatajs)
            ),
          });
        }
      }
    } else if (type === "executeclickfromalltypetemplateareaitemcomp") {
      props.parenthandleClick({
        ...methodprops,
        type: "executeclickfromtemplatearea",
        templateareaitemlistmetadata: JSON.parse(
          JSON.stringify(compstate.templateareaitemlistmetadata)
        ),
      });
    } else if (
      type === "executeonpopupparent" ||
      type === "executeonsiteparent"
    ) {
      props.parenthandleClick({
        ...methodprops,
      });
    } else if (type === "deletetemplateareaitem") {
      let templateareaitemlistmetadatajs =
        compstate.templateareaitemlistmetadata;
      templateareaitemlistmetadatajs.items = dragdropHandler({
        changingobject: templateareaitemlistmetadatajs.items,
        addingsubobject: {},
        operationtype: "delete",
        preposttext: "",
        draggedcomporder: "",
        neworder: methodprops.templatemetadata.order,
      });

      props.parenthandleClick({
        type: "savefromtemplatearea",
        templateareaitemlistmetadata: JSON.parse(
          JSON.stringify(templateareaitemlistmetadatajs)
        ),
      });
    } else if (type === "duplicatetemplateareaitem") {
      let templateareaitemlistmetadatajs =
        compstate.templateareaitemlistmetadata;

      let newtemplateareaitemjs = JSON.parse(
        JSON.stringify(methodprops.templatemetadata)
      );
      newtemplateareaitemjs.order = "";

      templateareaitemlistmetadatajs.items = dragdropHandler({
        changingobject: templateareaitemlistmetadatajs.items,
        addingsubobject: newtemplateareaitemjs,
        operationtype: "add",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });

      props.parenthandleClick({
        type: "savefromtemplatearea",
        templateareaitemlistmetadata: JSON.parse(
          JSON.stringify(templateareaitemlistmetadatajs)
        ),
      });
    } else if (type === "droptemplateareaitemprepost") {
      var draggedcomporder = methodprops.e.dataTransfer.getData("order");

      var draggedcompdragtemplatename =
        methodprops.e.dataTransfer.getData("dragtemplatename");
      var draggedcompdragtemplatetype =
        methodprops.e.dataTransfer.getData("dragtemplatetype");

      alltypecompconsolelog(draggedcomporder);
      alltypecompconsolelog(draggedcompdragtemplatename);
      alltypecompconsolelog(draggedcompdragtemplatetype);
      alltypecompconsolelog(methodprops);

      if (
        draggedcompdragtemplatename !== undefined &&
        draggedcompdragtemplatename !== ""
      ) {
        if (draggedcompdragtemplatetype === "templateareaitem") {
          let templateareaitemlistmetadatajs =
            compstate.templateareaitemlistmetadata;

          templateareaitemlistmetadatajs.items = dragdropHandler({
            changingobject: templateareaitemlistmetadatajs.items,
            addingsubobject:
              templateareaitemDragpanelmetadataInitMap[
              draggedcompdragtemplatename
              ],
            operationtype: "add",
            preposttext: methodprops.preposttext,
            draggedcomporder: "",
            neworder: methodprops.order,
          });

          await updateCompstate({
            builditemorder: "",
            templateareaitemlistmetadata: JSON.parse(
              JSON.stringify(templateareaitemlistmetadatajs)
            ),
            showbuildpropsui: false,
            showtemplateareaitemdraggable: true,
          });

          // props.parenthandleClick({type:"savefromtemplatearea",
          // templateareaitemlistmetadata: JSON.parse(JSON.stringify(templateareaitemlistmetadatajs)) });
        }
        if (draggedcompdragtemplatetype === "favouritetemplateareaitem") {
          let templateareaitemlistmetadatajs =
            compstate.templateareaitemlistmetadata;
          let currentfavouriteuiconfig = {};
          for (let i = 0; i < favouriteuiconfigslistmetadata.length; i++) {
            if (
              favouriteuiconfigslistmetadata[i].id ===
              draggedcompdragtemplatename
            ) {
              currentfavouriteuiconfig =
                favouriteuiconfigslistmetadata[i].data.metadata;
            }
          }
          templateareaitemlistmetadatajs.items = dragdropHandler({
            changingobject: templateareaitemlistmetadatajs.items,
            addingsubobject: currentfavouriteuiconfig,
            operationtype: "add",
            preposttext: methodprops.preposttext,
            draggedcomporder: "",
            neworder: methodprops.order,
          });

          await updateCompstate({
            builditemorder: "",
            templateareaitemlistmetadata: JSON.parse(
              JSON.stringify(templateareaitemlistmetadatajs)
            ),
            showbuildpropsui: false,
            showtemplateareaitemdraggable: true,
          });

          // props.parenthandleClick({type:"savefromtemplatearea",
          // templateareaitemlistmetadata: JSON.parse(JSON.stringify(templateareaitemlistmetadatajs)) });
        }
      } else if (
        draggedcomporder &&
        draggedcomporder !== "" &&
        methodprops.order !== parseInt(draggedcomporder)
      ) {
        if (methodprops.order !== parseInt(draggedcomporder)) {
          let templateareaitemlistmetadatajs =
            compstate.templateareaitemlistmetadata;
          templateareaitemlistmetadatajs.items = dragdropHandler({
            changingobject: templateareaitemlistmetadatajs.items,
            addingsubobject: {},
            operationtype: "swap",
            preposttext: methodprops.preposttext,
            draggedcomporder: parseInt(draggedcomporder),
            neworder: methodprops.order,
          });

          props.parenthandleClick({
            type: "savefromtemplatearea",
            templateareaitemlistmetadata: JSON.parse(
              JSON.stringify(templateareaitemlistmetadatajs)
            ),
          });
        }
      }
    }
  };

  let fromchildhandleChange = async (methodprops) => {
    alltypecompconsolelog("Templateareaitemlistcomp-fromchildhandleChange");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;
    if (type === "executechangefromalltypetemplateareaitemcomp") {
      props.parenthandleChange({
        ...methodprops,
        type: "executechangefromtemplatearea",
        templateareaitemlistmetadata: JSON.parse(
          JSON.stringify(compstate.templateareaitemlistmetadata)
        ),
      });
    } else if (
      type === "executeonpopupparent" ||
      type === "executeonsiteparent"
    ) {
      props.parenthandleChange({
        ...methodprops,
      });
    }
  };

  let Templateareaitemlistcomphtml = (methodprops) => {
    let templateareaitemlistmetadataArray = [];
    let templateareaitemlistmetadataArraySorted = [];
    if (Object.keys(compstate.templateareaitemlistmetadata.items).length > 0) {
      for (let i in compstate.templateareaitemlistmetadata.items) {
        templateareaitemlistmetadataArray.push(
          templateareaitemlistmetadata.items[i]
        );
      }
      templateareaitemlistmetadataArraySorted = sortArray(
        templateareaitemlistmetadataArray,
        "order",
        "integer"
      );
    }

    let sectionitemHtml = [];

    for (let i = 0; i < templateareaitemlistmetadataArraySorted.length; i++) {
      alltypecompconsolelog(templateareaitemlistmetadataArraySorted[i]);

      if (
        templateareaitemlistmetadataArraySorted[i].type ===
        "navbartemplateareaitem" ||
        templateareaitemlistmetadataArraySorted[i].type ===
        "utilbartemplateareaitem" ||
        templateareaitemlistmetadataArraySorted[i].type ===
        "imagecardtemplateareaitem" ||
        templateareaitemlistmetadataArraySorted[i].type ===
        "imagepanelgallerytemplateareaitem" ||
        templateareaitemlistmetadataArraySorted[i].type ===
        "imagegallerytemplateareaitem" ||
        templateareaitemlistmetadataArraySorted[i].type ===
        "addresscardtemplateareaitem" ||
        templateareaitemlistmetadataArraySorted[i].type ===
        "recordlisttemplateareaitem" ||
        templateareaitemlistmetadataArraySorted[i].type ===
        "cardtemplateareaitem" ||
        templateareaitemlistmetadataArraySorted[i].type ===
        "progresscardlisttemplateareaitem" ||
        templateareaitemlistmetadataArraySorted[i].type ===
        "contactusformtemplateareaitem" ||
        templateareaitemlistmetadataArraySorted[i].type ===
        "socialbartemplateareaitem" ||
        templateareaitemlistmetadataArraySorted[i].type ===
        "carasoultemplateareaitem"
      ) {
        let templatteitemmodetype = props.modetype;
        if (
          compstate.builditemorder !== "" &&
          compstate.builditemorder ===
          templateareaitemlistmetadataArraySorted[i].order
        ) {
          templatteitemmodetype = "build";
        }
        sectionitemHtml.push(
          <Alltypetemplateareaitemcomp
            isparenttablelayoutmetadatafield="false"
            parentalltypecompstatedata={{}}
            sitestatedata={props.sitestatedata}
            templatemetadata={templateareaitemlistmetadataArraySorted[i]}
            modetype={templatteitemmodetype}
            draggable={compstate.showtemplateareaitemdraggable}
            parenthandleClick={(props) => fromchildhandleClick({ ...props })}
            parenthandleChange={(props) => fromchildhandleChange({ ...props })}
          />
        );
      }
    }

    return <>{sectionitemHtml}</>;
  };

  let {
    datatype,
    dataorder,
    draggable,
    onclick,
    onchange,
    onmouseover,
    onmouseout,
    ondrop,
    modetype,
  } = props;

  let {
    showbuildpropsui,
    templateareaitemlistmetadata,
    showtemplateareaitemdraggable,
  } = compstate;
  alltypecompconsolelog("Templateareaitemlistcomp-render");
  alltypecompconsolelog(compstate);
  alltypecompconsolelog(props);

  let elementHtml = [];
  elementHtml.push(<Templateareaitemlistcomphtml />);

  let elementbuildiconsHtml = [];

  if (modetype === "buildicon") {
    elementbuildiconsHtml.push(
      <>
        {showtemplateareaitemdraggable === true ? (
          <>
            <Alltypecomp
              sitestatedata={{}}
              draggable={false}
              metadata={iconmetadataThumsup}
              modetype="normal"
              parenthandleClick={(props) =>
                handleClick({ type: "savedraggable" })
              }
              parenthandleChange={(props) => { }}
            />
            <Alltypecomp
              sitestatedata={{}}
              draggable={false}
              metadata={iconmetadataThumsdown}
              modetype="normal"
              parenthandleClick={(props) =>
                handleClick({ type: "canceldonotsavedraggable" })
              }
              parenthandleChange={(props) => { }}
            />
          </>
        ) : (
          <></>
        )}

        {showtemplateareaitemdraggable !== true ? (
          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadatamakeDraggable}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "maketemplateareaitemsdraggable" })
            }
            parenthandleChange={(props) => { }}
          />
        ) : (
          <></>
        )}
        <Alltypecomp
          sitestatedata={{}}
          draggable={false}
          metadata={iconmetadataAdd}
          modetype="normal"
          parenthandleClick={(props) =>
            handleClick({ type: "addtemplateareaitem" })
          }
          parenthandleChange={(props) => { }}
        />
        <Alltypecomp
          sitestatedata={{}}
          draggable={false}
          metadata={iconmetadataDrag}
          modetype="normal"
          parenthandleClick={(props) => handleClick({ type: "showbuildui" })}
          parenthandleChange={(props) => { }}
        />
      </>
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
            metadata={templateareaitemlistmetadata}
            parenthandleClick={(props) => fromchildhandleClick(props)}
            parenthandleChange={(props) => fromchildhandleChange(props)}
          />
        </div>
      </div>
    );
  }

  let mainpanelHtml = [];
  if (modetype === "buildicon") {
    mainpanelHtml.push(<>{elementHtml}</>);
    mainpanelHtml.push(<>{elementbuildiconsHtml}</>);
    if (showbuildpropsui) {
      mainpanelHtml.push(<>{editpropshtml}</>);
    }
  } else if (modetype === "normal" && showbuildpropsui === false) {
    mainpanelHtml.push(<>{elementHtml}</>);
  }

  return (
    <div
      style={{
        ...templateareaitemlistmetadata.style,
        display: "inline-flex",
        alignContent: "flex-start",
        flexWrap: "wrap",
      }}
      //  onClick={() => onclick()}
      data-type={datatype}
      data-order={dataorder}
    >
      {mainpanelHtml}
    </div>
  );
}