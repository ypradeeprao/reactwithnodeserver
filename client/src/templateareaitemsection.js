/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { alltypecompconsolelog, replacedynamictext, dragdropHandler, sortArray } from "./logic";
import {
  buttonmetadataBasic, inputoutputfieldmetadataInittablecolumnrefmetadata,
  inputoutputfieldmetadataInittablebuttonrefmetadata, blankrowmetadataInit,
  templateareaitemSectioncolumnDragpanelmetadataInitMap, iconmetadataAdd,
  iconmetadataThumsup, iconmetadataThumsdown, iconmetadatamakeDraggable, iconmetadataDrag
} from "./constants";
import { Alltypecomp } from "./templateareaitemsectioncolumn";
import { Editpropscomp } from "./editpropscomp";
const { useState, useEffect, createRef } = React;



export function Templateareaitemsectioncomp(props) {
  alltypecompconsolelog("Templateareaitemsectioncomp-render");
  alltypecompconsolelog(props);
  const [compstate, setCompstate] = useState({
    showui: true,
    showbuildpropsui: false,
    showcolumnsdraggable: false,
    sectionmetadata: JSON.parse(JSON.stringify(props.sectionmetadata)),
    sectionmetadataU: {},
  });

  let updateCompstateandRefresh = async (methodprops) => {
    alltypecompconsolelog(
      "Templateareaitemsectioncomp-updateCompstateandRefresh"
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
    alltypecompconsolelog(
      "Templateareaitemsectioncomp-updateCompstateandRefresh"
    );
    alltypecompconsolelog(methodprops);
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({
      ...compstatejs,
      ...methodpropsjs,
      showui: true,
    });
  };

  let handleClick = async (methodprops) => {
    alltypecompconsolelog("Templateareaitemsectioncomp-handleClick");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;
    if (type === "showbuildui") {
      updateCompstateandRefresh({
        showbuildpropsui: true,
        showcolumnsdraggable: false,
        sectionmetadata: compstate.sectionmetadata,
      });
    } else if (type === "makecolumnsdraggable") {
      updateCompstateandRefresh({
        showbuildpropsui: false,
        showcolumnsdraggable: true,
        sectionmetadata: compstate.sectionmetadata,
      });
    } else if (type === "canceldonotsavedraggable") {
      updateCompstateandRefresh({
        sectionmetadata: JSON.parse(JSON.stringify(props.sectionmetadata)),
        showbuildpropsui: false,
        showcolumnsdraggable: false,
      });
    } else if (type === "savedraggable") {
      props.parenthandleClick({
        type: "savefromtemplateareaitemsectioncomp",
        sectionmetadata: compstate.sectionmetadata,
      });
    } else if (type === "addsectioncolumn") {
      let sectionmetadatajs = compstate.sectionmetadata;
      sectionmetadatajs.items = dragdropHandler({
        changingobject: sectionmetadatajs.items,
        addingsubobject: buttonmetadataBasic,
        operationtype: "add",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });

      props.parenthandleClick({
        type: "savefromtemplateareaitemsectioncomp",
        sectionmetadata: sectionmetadata,
      });
    }
  };

  let handleChange = async (methodprops) => {
    let { type, order } = methodprops;
  };

  let fromchildhandleClick = async (methodprops) => {
    alltypecompconsolelog("Templateareaitemsectioncomp-fromchildhandleClick");
    alltypecompconsolelog(methodprops);
    let { type, order } = methodprops;
    let { favouriteuiconfigslistmetadata } = props.sitestatedata;
    if (type === "showbuildui") {
      updateCompstateandRefresh({
        showbuildpropsui: true,
        showcolumnsdraggable: false,
        sectionmetadata: compstate.sectionmetadata,
      });
    } else if (type === "draftsavefromeditpropscomp") {
      await updateCompstate({
        sectionmetadata: JSON.parse(JSON.stringify(methodprops.metadata)),
        showcolumnsdraggable: false,
        sectionmetadataU: JSON.parse(JSON.stringify(methodprops.metadata)),
      });
      //  props.parenthandleClick({ type: "savefromsection" });
    } else if (type === "savefromeditpropscomp") {
      props.parenthandleClick({
        type: "savefromtemplateareaitemsectioncomp",
        sectionmetadata: JSON.parse(JSON.stringify(methodprops.metadata)),
      });
    } else if (type === "cancelfromeditpropscomp") {
      updateCompstateandRefresh({
        sectionmetadata: JSON.parse(JSON.stringify(props.sectionmetadata)),
        showbuildpropsui: false,
        showcolumnsdraggable: false,
      });
    } else if (type === "deletesectionitem") {
      let sectionmetadatajs = compstate.sectionmetadata;
      sectionmetadatajs.items = dragdropHandler({
        changingobject: sectionmetadatajs.items,
        addingsubobject: {},
        operationtype: "delete",
        preposttext: "",
        draggedcomporder: "",
        neworder: methodprops.metadata.order,
      });

      props.parenthandleClick({
        type: "savefromtemplateareaitemsectioncomp",
        sectionmetadata: JSON.parse(JSON.stringify(sectionmetadatajs)),
      });
    } else if (type === "savefromalltypecomp") {
      let sectionmetadatajs = compstate.sectionmetadata;
      for (let i in sectionmetadatajs.items) {
        if (sectionmetadatajs.items[i].order === methodprops.metadata.order) {
          sectionmetadatajs.items[i] = methodprops.metadata;
          props.parenthandleClick({
            type: "savefromtemplateareaitemsectioncomp",
            sectionmetadata: JSON.parse(JSON.stringify(sectionmetadatajs)),
          });
        }
      }
    } else if (type === "deletesectioncolumn") {
      let sectionmetadatajs = compstate.sectionmetadata;
      sectionmetadatajs.items = dragdropHandler({
        changingobject: sectionmetadatajs.items,
        addingsubobject: {},
        operationtype: "delete",
        preposttext: "",
        draggedcomporder: "",
        neworder: methodprops.metadata.order,
      });

      props.parenthandleClick({
        type: "savefromtemplateareaitemsectioncomp",
        sectionmetadata: JSON.parse(JSON.stringify(sectionmetadatajs)),
      });
    } else if (type === "duplicatesectioncolumn") {
      let sectionmetadatajs = compstate.sectionmetadata;
      let newsectioncolumnjs = JSON.parse(JSON.stringify(methodprops.metadata));
      newsectioncolumnjs.order = "";

      sectionmetadatajs.items = dragdropHandler({
        changingobject: sectionmetadatajs.items,
        addingsubobject: newsectioncolumnjs,
        operationtype: "add",
        preposttext: "",
        draggedcomporder: "",
        neworder: "",
      });

      props.parenthandleClick({
        type: "savefromtemplateareaitemsectioncomp",
        sectionmetadata: JSON.parse(JSON.stringify(sectionmetadatajs)),
      });
    } else if (type === "executeclickfromalltypecomp") {
      props.parenthandleClick({
        type: "executeclickfromsectioncolumn",
        sectioncolumnmetadata: methodprops.metadata,
        templateareaitemstatedata: methodprops.templateareaitemstatedata,
      });
    } else if (
      type === "dropsectioncolumnprepost" &&
      props.draggablefortemplatebuilder !== true
    ) {
      var draggedcomporder = methodprops.e.dataTransfer.getData("order");
      var draggedcompdragtemplatename =
        methodprops.e.dataTransfer.getData("dragtemplatename");
      var draggedcompdragtemplatetype =
        methodprops.e.dataTransfer.getData("dragtemplatetype");
      alltypecompconsolelog(draggedcompdragtemplatename);
      alltypecompconsolelog(draggedcompdragtemplatetype);
      alltypecompconsolelog(draggedcomporder);
      alltypecompconsolelog(methodprops);

      if (
        draggedcompdragtemplatename !== undefined &&
        draggedcompdragtemplatename !== ""
      ) {
        alltypecompconsolelog(props.templateareaitemstatedata);

        if (
          draggedcompdragtemplatetype === "tablecolumnmetadatafromserver" ||
          draggedcompdragtemplatetype === "tablebuttonmetadatafromserver" ||
          draggedcompdragtemplatetype ===
          "globaltablecolumnmetadatafromserver" ||
          draggedcompdragtemplatetype === "globaltablebuttonmetadatafromserver"
        ) {
          let addingsubobjectjs = {};
          if (
            draggedcompdragtemplatetype === "tablecolumnmetadatafromserver" &&
            draggedcompdragtemplatename !== "blankrow"
          ) {
            addingsubobjectjs =
              inputoutputfieldmetadataInittablecolumnrefmetadata;
            addingsubobjectjs.inputoutputfieldprops.refname =
              draggedcompdragtemplatename;
            addingsubobjectjs.inputoutputfieldprops.refobjectname = "";
          }
          if (
            draggedcompdragtemplatetype ===
            "globaltablecolumnmetadatafromserver" &&
            draggedcompdragtemplatename !== "blankrow"
          ) {
            addingsubobjectjs =
              inputoutputfieldmetadataInittablecolumnrefmetadata;
            addingsubobjectjs.inputoutputfieldprops.refname =
              draggedcompdragtemplatename;
            addingsubobjectjs.inputoutputfieldprops.refobjectname = "global";
          }
          if (
            draggedcompdragtemplatetype === "tablebuttonmetadatafromserver" &&
            draggedcompdragtemplatename !== "blankrow"
          ) {
            addingsubobjectjs =
              inputoutputfieldmetadataInittablebuttonrefmetadata;
            addingsubobjectjs.inputoutputfieldprops.refname =
              draggedcompdragtemplatename;
            addingsubobjectjs.inputoutputfieldprops.refobjectname = "";
          }
          if (
            draggedcompdragtemplatetype ===
            "globaltablebuttonmetadatafromserver" &&
            draggedcompdragtemplatename !== "blankrow"
          ) {
            addingsubobjectjs =
              inputoutputfieldmetadataInittablebuttonrefmetadata;
            addingsubobjectjs.inputoutputfieldprops.refname =
              draggedcompdragtemplatename;
            addingsubobjectjs.inputoutputfieldprops.refobjectname = "global";
          }

          if (draggedcompdragtemplatename === "blankrow") {
            addingsubobjectjs = blankrowmetadataInit;
          }

          let sectionmetadatajs = compstate.sectionmetadata;
          sectionmetadatajs.items = dragdropHandler({
            changingobject: sectionmetadatajs.items,
            addingsubobject: addingsubobjectjs,
            operationtype: "add",
            preposttext: methodprops.preposttext,
            draggedcomporder: "",
            neworder: methodprops.order,
          });

          updateCompstateandRefresh({
            sectionmetadata: JSON.parse(JSON.stringify(sectionmetadatajs)),
            showbuildpropsui: false,
            showcolumnsdraggable: true,
          });
        }

        if (draggedcompdragtemplatetype === "templateareaitemsetioncolumn") {
          let sectionmetadatajs = compstate.sectionmetadata;
          sectionmetadatajs.items = dragdropHandler({
            changingobject: sectionmetadatajs.items,
            addingsubobject:
              templateareaitemSectioncolumnDragpanelmetadataInitMap[
              draggedcompdragtemplatename
              ],
            operationtype: "add",
            preposttext: methodprops.preposttext,
            draggedcomporder: "",
            neworder: methodprops.order,
          });

          updateCompstateandRefresh({
            sectionmetadata: JSON.parse(JSON.stringify(sectionmetadatajs)),
            showbuildpropsui: false,
            showcolumnsdraggable: true,
          });
        }
        if (
          draggedcompdragtemplatetype === "favouritetemplateareaitemsetioncolumn"
        ) {
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
          alltypecompconsolelog("currentfavouriteuiconfig");
          alltypecompconsolelog(currentfavouriteuiconfig);
          let sectionmetadatajs = compstate.sectionmetadata;
          sectionmetadatajs.items = dragdropHandler({
            changingobject: sectionmetadatajs.items,
            addingsubobject: currentfavouriteuiconfig,
            operationtype: "add",
            preposttext: methodprops.preposttext,
            draggedcomporder: "",
            neworder: methodprops.order,
          });

          updateCompstateandRefresh({
            sectionmetadata: JSON.parse(JSON.stringify(sectionmetadatajs)),
            showbuildpropsui: false,
            showcolumnsdraggable: true,
          });
        }
      } else if (
        draggedcomporder &&
        draggedcomporder !== "" &&
        methodprops.order !== parseInt(draggedcomporder)
      ) {
        alltypecompconsolelog(draggedcomporder);
        alltypecompconsolelog(methodprops.order);
        alltypecompconsolelog(parseInt(draggedcomporder));
        let sectionmetadatajs = compstate.sectionmetadata;
        sectionmetadatajs.items = dragdropHandler({
          changingobject: sectionmetadatajs.items,
          addingsubobject: {},
          operationtype: "swap",
          preposttext: methodprops.preposttext,
          draggedcomporder: parseInt(draggedcomporder),
          neworder: methodprops.order,
        });

        updateCompstateandRefresh({
          sectionmetadata: JSON.parse(JSON.stringify(sectionmetadatajs)),
          showbuildpropsui: false,
          showcolumnsdraggable: true,
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
    let { type, order } = methodprops;
    alltypecompconsolelog("Templateareaitemsectioncomp-fromchildhandleChange");
    alltypecompconsolelog(methodprops);

    if (type === "executechangefromalltypecomp") {
      props.parenthandleChange({
        type: "executechangefromsectioncolumn",
        sectioncolumnmetadata: methodprops.metadata,
        value: methodprops.value,
        valuesubtypename: methodprops.valuesubtypename,
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

  let Templateareaitemsectioncomphtml = (methodprops) => {
    alltypecompconsolelog("Templateareaitemsectioncomphtml-render");
    alltypecompconsolelog(compstate.sectionmetadata);
    let sectionmetadataArray = [];
    let sectionmetadataArraySorted = [];
    alltypecompconsolelog("compstate");
    alltypecompconsolelog(compstate);
    if (
      compstate.sectionmetadata &&
      compstate.sectionmetadata.items &&
      Object.keys(compstate.sectionmetadata.items).length > 0
    ) {
      for (let i in compstate.sectionmetadata.items) {
        sectionmetadataArray.push(sectionmetadata.items[i]);
      }
      sectionmetadataArraySorted = sortArray(
        sectionmetadataArray,
        "order",
        "integer"
      );
    }

    let sectionitemHtml = [];
    let issectioncolumndraggable = compstate.showcolumnsdraggable;
    if (props.draggablefortemplatebuilder === true) {
      issectioncolumndraggable = true;
    }
    for (let i = 0; i < sectionmetadataArraySorted.length; i++) {
      let sectionmetadataArraySortedvar = sectionmetadataArraySorted[i];

      if (
        props.modetype === "normal" &&
        sectionmetadataArraySorted[i].type === "inputoutputfield" &&
        sectionmetadataArraySorted[i].inputoutputfieldprops.type ===
        "tablecolumnmetadatafieldref" &&
        (sectionmetadataArraySorted[i].inputoutputfieldprops.refobjectname ===
          undefined ||
          sectionmetadataArraySorted[i].inputoutputfieldprops.refobjectname ===
          "") &&
        props.templateareaitemstatedata &&
        props.templateareaitemstatedata.tablecolumnmetadatalistfromserver &&
        props.templateareaitemstatedata.tablecolumnmetadatalistfromserver
          .length > 0
      ) {
        for (
          let j = 0;
          j <
          props.templateareaitemstatedata.tablecolumnmetadatalistfromserver
            .length;
          j++
        ) {
          if (
            props.templateareaitemstatedata.tablecolumnmetadatalistfromserver[j]
              .data.name ===
            sectionmetadataArraySorted[i].inputoutputfieldprops.refname
          ) {
            sectionmetadataArraySortedvar = JSON.parse(
              JSON.stringify(
                props.templateareaitemstatedata
                  .tablecolumnmetadatalistfromserver[j].data.metadata
              )
            );
          }
        }
      }

      if (
        props.modetype === "normal" &&
        sectionmetadataArraySorted[i].type === "inputoutputfield" &&
        sectionmetadataArraySorted[i].inputoutputfieldprops.type ===
        "tablecolumnmetadatafieldref" &&
        sectionmetadataArraySorted[i].inputoutputfieldprops.refobjectname ===
        "global" &&
        props.templateareaitemstatedata &&
        props.templateareaitemstatedata
          .globaltablecolumnmetadatalistfromserver &&
        props.templateareaitemstatedata.globaltablecolumnmetadatalistfromserver
          .length > 0
      ) {
        for (
          let j = 0;
          j <
          props.templateareaitemstatedata
            .globaltablecolumnmetadatalistfromserver.length;
          j++
        ) {
          if (
            props.templateareaitemstatedata
              .globaltablecolumnmetadatalistfromserver[j].data.name ===
            sectionmetadataArraySorted[i].inputoutputfieldprops.refname
          ) {
            sectionmetadataArraySortedvar = JSON.parse(
              JSON.stringify(
                props.templateareaitemstatedata
                  .globaltablecolumnmetadatalistfromserver[j].data.metadata
              )
            );
          }
        }
      }

      if (
        props.modetype === "normal" &&
        sectionmetadataArraySorted[i].type === "inputoutputfield" &&
        sectionmetadataArraySorted[i].inputoutputfieldprops.type ===
        "tablebuttonmetadatafieldref" &&
        (sectionmetadataArraySorted[i].inputoutputfieldprops.refobjectname ===
          undefined ||
          sectionmetadataArraySorted[i].inputoutputfieldprops.refobjectname ===
          "") &&
        props.templateareaitemstatedata &&
        props.templateareaitemstatedata.tablebuttonmetadatalistfromserver &&
        props.templateareaitemstatedata.tablebuttonmetadatalistfromserver
          .length > 0
      ) {
        for (
          let j = 0;
          j <
          props.templateareaitemstatedata.tablebuttonmetadatalistfromserver
            .length;
          j++
        ) {
          if (
            props.templateareaitemstatedata.tablebuttonmetadatalistfromserver[j]
              .data.name ===
            sectionmetadataArraySorted[i].inputoutputfieldprops.refname
          ) {
            sectionmetadataArraySortedvar = JSON.parse(
              JSON.stringify(
                props.templateareaitemstatedata
                  .tablebuttonmetadatalistfromserver[j].data.metadata
              )
            );
          }
        }
      }

      if (
        props.modetype === "normal" &&
        sectionmetadataArraySorted[i].type === "inputoutputfield" &&
        sectionmetadataArraySorted[i].inputoutputfieldprops.type ===
        "tablebuttonmetadatafieldref" &&
        sectionmetadataArraySorted[i].inputoutputfieldprops.refobjectname ===
        "global" &&
        props.templateareaitemstatedata &&
        props.templateareaitemstatedata
          .globaltablebuttonmetadatalistfromserver &&
        props.templateareaitemstatedata.globaltablebuttonmetadatalistfromserver
          .length > 0
      ) {
        for (
          let j = 0;
          j <
          props.templateareaitemstatedata
            .globaltablebuttonmetadatalistfromserver.length;
          j++
        ) {
          if (
            props.templateareaitemstatedata
              .globaltablebuttonmetadatalistfromserver[j].data.name ===
            sectionmetadataArraySorted[i].inputoutputfieldprops.refname
          ) {
            sectionmetadataArraySortedvar = JSON.parse(
              JSON.stringify(
                props.templateareaitemstatedata
                  .globaltablebuttonmetadatalistfromserver[j].data.metadata
              )
            );
          }
        }
      }

      if (
        props.modetype === "normal" &&
        sectionmetadataArraySorted[i].type === "inputoutputfield" &&
        (sectionmetadataArraySorted[i].inputoutputfieldprops.type ===
          "tablecolumnmetadatafieldref" ||
          sectionmetadataArraySorted[i].inputoutputfieldprops.type ===
          "tablebuttonmetadatafieldref")
      ) {
        sectionmetadataArraySortedvar.order =
          sectionmetadataArraySorted[i].order;

        alltypecompconsolelog("sectionmetadataArraySortedvar", sectionmetadataArraySortedvar);

        if (
          sectionmetadataArraySortedvar.inputoutputfieldprops &&
          sectionmetadataArraySorted[i].inputoutputfieldprops.inputmode !==
          undefined &&
          sectionmetadataArraySorted[i].inputoutputfieldprops.inputmode !== ""
        ) {
          sectionmetadataArraySortedvar.inputoutputfieldprops.inputmode =
            sectionmetadataArraySorted[i].inputoutputfieldprops.inputmode;
        }

        if (
          sectionmetadataArraySorted[i].inputoutputfieldprops.hidelabel !==
          undefined &&
          sectionmetadataArraySorted[i].inputoutputfieldprops.hidelabel !== ""
        ) {
          sectionmetadataArraySortedvar.inputoutputfieldprops.hidelabel =
            sectionmetadataArraySorted[i].inputoutputfieldprops.hidelabel;
        }

        if (
          sectionmetadataArraySorted[i].innerText !== undefined &&
          sectionmetadataArraySorted[i].innerText !== ""
        ) {
          sectionmetadataArraySortedvar.innerText =
            sectionmetadataArraySorted[i].innerText;
        }

        if (
          sectionmetadataArraySorted[i].inputoutputfieldprops.label !==
          undefined &&
          sectionmetadataArraySorted[i].inputoutputfieldprops.label !== ""
        ) {
          sectionmetadataArraySortedvar.inputoutputfieldprops.label =
            sectionmetadataArraySorted[i].inputoutputfieldprops.label;
        }

        if (
          sectionmetadataArraySorted[i].inputoutputfieldprops.srctypedefault !==
          undefined &&
          sectionmetadataArraySorted[i].inputoutputfieldprops.srctypedefault !==
          ""
        ) {
          sectionmetadataArraySortedvar.inputoutputfieldprops.srctypedefault =
            sectionmetadataArraySorted[i].inputoutputfieldprops.srctypedefault;
        }

        if (
          sectionmetadataArraySorted[i].inputoutputfieldprops.srcvaluedefault !==
          undefined &&
          sectionmetadataArraySorted[i].inputoutputfieldprops.srcvaluedefault !==
          ""
        ) {
          sectionmetadataArraySortedvar.inputoutputfieldprops.srcvaluedefault =
            sectionmetadataArraySorted[i].inputoutputfieldprops.srcvaluedefault;
        }

        if (
          sectionmetadataArraySorted[i].inputoutputfieldprops
            .srcdisplayvaluedefault !== undefined &&
          sectionmetadataArraySorted[i].inputoutputfieldprops
            .srcdisplayvaluedefault !== ""
        ) {
          sectionmetadataArraySortedvar.inputoutputfieldprops.srcdisplayvaluedefault =
            sectionmetadataArraySorted[
              i
            ].inputoutputfieldprops.srcdisplayvaluedefault;
        }

        if (
          sectionmetadataArraySortedvar.inputoutputfieldprops &&
          sectionmetadataArraySorted[i].inputoutputfieldprops.orientation !==
          undefined &&
          sectionmetadataArraySorted[i].inputoutputfieldprops.orientation !== ""
        ) {
          sectionmetadataArraySortedvar.inputoutputfieldprops.orientation =
            sectionmetadataArraySorted[i].inputoutputfieldprops.orientation;
        }

        if (
          sectionmetadataArraySorted[i].inputoutputfieldprops.imagewidth !==
          undefined &&
          sectionmetadataArraySorted[i].inputoutputfieldprops.imagewidth !== ""
        ) {
          sectionmetadataArraySortedvar.inputoutputfieldprops.imagewidth =
            sectionmetadataArraySorted[i].inputoutputfieldprops.imagewidth;
        }

        if (
          sectionmetadataArraySorted[i].inputoutputfieldprops.imageheight !==
          undefined &&
          sectionmetadataArraySorted[i].inputoutputfieldprops.imageheight !== ""
        ) {
          sectionmetadataArraySortedvar.inputoutputfieldprops.imageheight =
            sectionmetadataArraySorted[i].inputoutputfieldprops.imageheight;
        }

        if (
          sectionmetadataArraySorted[i].inputoutputfieldprops.imageobjectfit !==
          undefined &&
          sectionmetadataArraySorted[i].inputoutputfieldprops.imageobjectfit !==
          ""
        ) {
          sectionmetadataArraySortedvar.inputoutputfieldprops.imageobjectfit =
            sectionmetadataArraySorted[i].inputoutputfieldprops.imageobjectfit;
        }
        if (
          sectionmetadataArraySorted[i].hidewhenconditiontext !== undefined &&
          sectionmetadataArraySorted[i].hidewhenconditiontext !== ""
        ) {
          sectionmetadataArraySortedvar.hidewhenconditiontext =
            sectionmetadataArraySorted[i].hidewhenconditiontext;
        }

        if (
          sectionmetadataArraySorted[i].style !== undefined &&
          sectionmetadataArraySorted[i].style !== "" &&
          Object.keys(sectionmetadataArraySorted[i].style).length > 0
        ) {
          sectionmetadataArraySortedvar.style =
            sectionmetadataArraySorted[i].style;
        }

        if (
          sectionmetadataArraySorted[i].onclick !== undefined &&
          sectionmetadataArraySorted[i].onclick !== "" &&
          Object.keys(sectionmetadataArraySorted[i].onclick).length > 0
        ) {
          sectionmetadataArraySortedvar.onclick =
            sectionmetadataArraySorted[i].onclick;
        }

        if (
          sectionmetadataArraySorted[i].onchange !== undefined &&
          sectionmetadataArraySorted[i].onchange !== "" &&
          Object.keys(sectionmetadataArraySorted[i].onchange).length > 0
        ) {
          sectionmetadataArraySortedvar.onchange =
            sectionmetadataArraySorted[i].onchange;
        }
      }

      alltypecompconsolelog("sectionmetadataArraySortedvar");
      alltypecompconsolelog(sectionmetadataArraySortedvar);
      alltypecompconsolelog(props);

      let hidewhenconditionvalue = false;

      if (
        props.modetype === "normal" &&
        sectionmetadataArraySortedvar.hidewhenconditiontext !== undefined &&
        sectionmetadataArraySortedvar.hidewhenconditiontext !== ""
      ) {
        hidewhenconditionvalue = replacedynamictext({
          replacetext: sectionmetadataArraySortedvar.hidewhenconditiontext,
          sitestatedata: props.sitestatedata,
          templateareaitemstatedata: props.templateareaitemstatedata,
          parentalltypecompstatedata: {},
          tabledata: {},
        });
      }

      alltypecompconsolelog("hidewhenconditionvalue");
      alltypecompconsolelog(
        sectionmetadataArraySortedvar.hidewhenconditiontext
      );
      alltypecompconsolelog(hidewhenconditionvalue);

      if (hidewhenconditionvalue !== true && hidewhenconditionvalue !== "true") {
        sectionitemHtml.push(
          <Alltypecomp
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={props.templateareaitemstatedata}
            draggable={issectioncolumndraggable}
            metadata={sectionmetadataArraySortedvar}
            modetype={props.modetype}
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

  let { showbuildpropsui, sectionmetadata, showcolumnsdraggable, showui } =
    compstate;
  if (showui !== true) {
    return <></>;
  } else {
    let elementHtml = [];
    let elementbuildiconsHtml = [];
    elementHtml.push(<Templateareaitemsectioncomphtml />);
    if (modetype === "build") {
      elementbuildiconsHtml.push(
        <>
          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={iconmetadataAdd}
            modetype="normal"
            parenthandleClick={(props) =>
              handleClick({ type: "addsectioncolumn" })
            }
            parenthandleChange={(props) => { }}
          />

          {showcolumnsdraggable === true ? (
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

          {showcolumnsdraggable !== true ? (
            <Alltypecomp
              sitestatedata={{}}
              draggable={false}
              metadata={iconmetadatamakeDraggable}
              modetype="normal"
              parenthandleClick={(props) =>
                handleClick({ type: "makecolumnsdraggable" })
              }
              parenthandleChange={(props) => { }}
            />
          ) : (
            <></>
          )}

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
              metadata={sectionmetadata}
              parenthandleClick={(props) => fromchildhandleClick(props)}
              parenthandleChange={(props) => fromchildhandleChange(props)}
            />
          </div>
        </div>
      );
    }

    let mainpanelHtml = [];
    if (modetype === "build") {
      mainpanelHtml.push(<>{elementHtml}</>);
      mainpanelHtml.push(<>{elementbuildiconsHtml}</>);
      if (showbuildpropsui) {
        mainpanelHtml.push(<>{editpropshtml}</>);
      }
    } else if (modetype === "buildicon") {
      mainpanelHtml.push(<>{elementHtml}</>);
    } else if (modetype === "normal" && showbuildpropsui === false) {
      mainpanelHtml.push(<>{elementHtml}</>);
    }

    return (
      <div
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          ...sectionmetadata.style,
        }}
        // onClick={() => onclick()}
        data-type={datatype}
        data-order={dataorder}
      >
        {mainpanelHtml}
      </div>
    );
  }
}