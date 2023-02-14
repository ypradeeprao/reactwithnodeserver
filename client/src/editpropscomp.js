/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  alltypecompconsolelog, allowDrop, dragstart, dragEnter,
  dragLeave, getdroppedtemplateareaitem,

} from "./logic";
import {
  templateareaitemDragpanelmetadataInitMap,
  iconmetadataBasic, tablenameMap, querypaneltabelcolumnvaluetypeMap,
  popularstylesjs, textmetadataBasic, buttonmetadataBasic, imagemetadataBasic, inputoutputfieldmetadataInit,
  inputoutputfieldmetadataInitislinkedcolumn, inputoutputfieldmetadataInitquerypaneltabelcolumnfilter,
  inputoutputfieldmetadataInitquerypaneltabelcolumnsort, inputoutputfieldmetadataInitquerypaneltabelcolumnquery,
  inputoutputfieldmetadataInitquerypaneltabelname, inputoutputfieldmetadataInittablebuttonmetadata,
  inputoutputfieldmetadataInittablecolumnmetadata, inputoutputfieldmetadataInittablelayoutmetdata
  , inputoutputfieldmetadataInittablequerymetdata
} from "./constants";
import {
  Alltypetemplateareaitemcomp,
  Draggabletemplateareaitemhtml, DraggablefavouriteuiconfigsTemplateareaitemshtml
} from "./templateareaitem";

import { Alltypecomp } from "./templateareaitemsectioncolumn";
const { useState, useEffect, createRef } = React;



function ChangeTypepropshtml(props) {
  let { metadata, handleChange, handleClick, sitestatedata } = props;
  if (
    metadata.type === "text" ||
    metadata.type === "button" ||
    metadata.type === "icon" ||
    metadata.type === "inputoutputfield" ||
    metadata.type === "image"
  ) {
    return (
      <div>
        <div>Type</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.type}
            onChange={(e) =>
              handleChange({
                type: "type",
                subtype: "",
                nextsubtype: "",
                e,
              })
            }
            list="alltypecomptype"
          />
          <datalist id="alltypecomptype">
            <option value="text" />
            <option value="button" />
            <option value="icon" />
            <option value="image" />
            <option value="inputoutputfield" />
            <option value="inputoutputfieldquerypaneltabelname" />
            <option value="inputoutputfieldquerypaneltabelcolumnsort" />
            <option value="inputoutputfieldquerypaneltabelcolumnquery" />
            <option value="inputoutputfieldquerypaneltabelcolumnfilter" />
            <option value="inputoutputfieldtablelayoutmetadata" />
            <option value="inputoutputfieldtablequerymetadata" />
            <option value="inputoutputfieldtablebuttonmetadata" />
            <option value="inputoutputfieldtablecolumnmetadata" />
          </datalist>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ height: "200px", overflow: "auto" }}>
          <Draggabletemplateareaitemhtml />
          <DraggablefavouriteuiconfigsTemplateareaitemshtml
            favouriteuiconfigslistmetadata={
              sitestatedata.favouriteuiconfigslistmetadata
            }
          />
        </div>
        <div
          style={{
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
              type: "droptemplateareaitemtypeprepost",
              e,
              preposttext: "pre",
            })
          }
        >
          Drop here to change or add ui section
        </div>

        <div>Type</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.type}
            onChange={(e) =>
              handleChange({
                type: "templateareaitemtype",
                subtype: "",
                nextsubtype: "",
                e,
              })
            }
            list="alltypecomptype"
          />
          <datalist id="alltypecomptype">
            <option value="navbartemplateareaitem" />
            <option value="utilbartemplateareaitem" />
            <option value="imagecardtemplateareaitem" />
            <option value="imagepanelgallerytemplateareaitem" />
            <option value="imagegallerytemplateareaitem" />
            <option value="addresscardtemplateareaitem" />
            <option value="recordlisttemplateareaitem" />
            <option value="cardtemplateareaitem" />
            <option value="progresscardlisttemplateareaitem" />
            <option value="carasoultemplateareaitem" />
            <option value="contactusformtemplateareaitem" />
            <option value="socialbartemplateareaitem" />
          </datalist>
        </div>
      </div>
    );
  }
}

function Hidewhenpropshtml(props) {
  let { metadata, handleChange } = props;

  return (
    <div>
      <div>hidewhenconditiontext</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.hidewhenconditiontext}
          onChange={(e) =>
            handleChange({
              type: "hidewhenconditiontext",
              subtype: "",
              nextsubtype: "",
              e,
            })
          }
        />
      </div>
    </div>
  );
}

function TemplateareaitemSectioncolumnClickchangeTypepropshtml(props) {
  let { metadata, handleChange, handleClick, showpropstype } = props;

  let onclickchangevar = "";
  if (showpropstype === "showclickprops") {
    onclickchangevar = "onclick";
  }
  if (showpropstype === "showchangeprops") {
    onclickchangevar = "onchange";
  }

  let popupmetadatatypeOptions = [];
  for (let i in templateareaitemDragpanelmetadataInitMap) {
    popupmetadatatypeOptions.push(<option value={i} />);
  }

  if (
    metadata[onclickchangevar] === undefined ||
    metadata[onclickchangevar] === ""
  ) {
    metadata[onclickchangevar] = {};
  }

  return (
    <div>
      <div>Type</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata[onclickchangevar].type}
          onChange={(e) =>
            handleChange({
              type: onclickchangevar,
              subtype: "type",
              nextsubtype: "",
              e,
            })
          }
          list="type"
        />
        <datalist id="type">
          <option value="openpopup" />
          <option value="updatealltypecompstatedataandopenpopup" />
          <option value="openselect" />
          <option value="redirect" />
          <option value="updatesitestatedata" />
          <option value="updatesitestatedataandrefreshui" />
          <option value="updatebrowserlocalstoragedata" />
          <option value="updatebrowserlocalstoragedataandrefreshallui" />
          <option value="resetbrowserlocalstoragedata" />
          <option value="resetbrowserlocalstoragedataandrefreshallui" />
          <option value="updatetemplateareaitemstatedata" />
          <option value="updatetemplateareaitemstatedataandrefreshui" />
          <option value="modifydatabase" />
          <option value="modifydatabaseandrefreshui" />
          <option value="modifydatabaseandrefreshparentui" />
          <option value="modifydatabaseandrefreshallui" />
          <option value="modifydatabaseandredirect" />
        </datalist>
      </div>

      {metadata[onclickchangevar] &&
        (metadata[onclickchangevar].type === "redirect" ||
          metadata[onclickchangevar].type === "modifydatabaseandredirect") ? (
        <>
          <div>redirecttype</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].redirecttype}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttype",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttype"
            />
            <datalist id="redirecttype">
              <option value="page" />
              <option value="url" />
            </datalist>
          </div>

          <div>redirecttositetablename</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].redirecttositetablename}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttositetablename",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttositetablename"
            />
            <datalist id="redirecttositetablename">
              <option value="sitemetadata" />
              <option value="vendorsitemetadata" />
            </datalist>
          </div>

          <div>redirecttositename</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].redirecttositename}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttositename",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttositename"
            />
            <datalist id="redirecttositename">
              <option value="admin" />
              <option value="home" />
            </datalist>
          </div>

          <div>redirecttopage</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].redirecttopage}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttopage",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttopage"
            />
            <datalist id="redirecttopage">
              <option value="page" />
              <option value="url" />
            </datalist>
          </div>

          <div>redirecttourl</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].redirecttourl}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttourl",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttourl"
            />
            <datalist id="redirecttourl">
              <option value="page" />
              <option value="url" />
            </datalist>
          </div>

          <div>redirecttosearchdatastring</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={
                metadata[onclickchangevar].redirecttosearchdatastring
              }
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttosearchdatastring",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttosearchdatastring"
            />
            <datalist id="redirecttosearchdatastring">
              <option value="a={b}&&c={d}" />
            </datalist>
          </div>

          <div>redirecttohashdatastring</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].redirecttohashdatastring}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttohashdatastring",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttohashdatastring"
            />
            <datalist id="redirecttohashdatastring">
              <option value="a={b}&&c={d}" />
            </datalist>
          </div>
        </>
      ) : (
        <></>
      )}

      {metadata[onclickchangevar] &&
        (metadata[onclickchangevar].type === "openpopup" ||
          metadata[onclickchangevar].type ===
          "updatealltypecompstatedataandopenpopup") ? (
        <>
          <div>PopupSide</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].popupside}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "popupside",
                  nextsubtype: "",
                  e,
                })
              }
              list="popupside"
            />
            <datalist id="popupside">
              <option value="left" />
              <option value="right" />
              <option value="center" />
              <option value="dropdown" />
            </datalist>
          </div>

          <div>PopupMetadatatype</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].popupmetadatatype}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "popupmetadatatype",
                  nextsubtype: "",
                  e,
                })
              }
              list="popupmetadatatype"
            />
            <datalist id="popupmetadatatype">
              {popupmetadatatypeOptions}
            </datalist>
          </div>
          <div
            style={{
              width: "100%",
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
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

function Templateareaitemlistbeforeafterloadpropshtml(props) {
  let { metadata, handleChange, handleClick, showpropstype } = props;

  let onclickchangevar = "";
  if (showpropstype === "showbeforeafterloadprops") {
    onclickchangevar = "onbeforeafterload";
  }

  let popupmetadatatypeOptions = [];
  for (let i in templateareaitemDragpanelmetadataInitMap) {
    popupmetadatatypeOptions.push(<option value={i} />);
  }

  if (
    metadata[onclickchangevar] === undefined ||
    metadata[onclickchangevar] === ""
  ) {
    metadata[onclickchangevar] = {};
  }

  return (
    <div>
      <div>Type</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata[onclickchangevar].type}
          onChange={(e) =>
            handleChange({
              type: onclickchangevar,
              subtype: "type",
              nextsubtype: "",
              e,
            })
          }
          list="type"
        />
        <datalist id="type">
          <option value="checkifandshowalert" />
          <option value="checkifandshowpopup" />
          <option value="checkifandredirect" />
        </datalist>
      </div>

      {metadata[onclickchangevar] &&
        metadata[onclickchangevar].type === "checkifandshowalert" ? (
        <>
          <div>checkifconditionreplacetext</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={
                metadata[onclickchangevar].checkifconditionreplacetext
              }
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "checkifconditionreplacetext",
                  nextsubtype: "",
                  e,
                })
              }
              list="checkifconditionreplacetext"
            />
            <datalist id="checkifconditionreplacetext">
              <option value="ISBLANK()" />
            </datalist>
          </div>

          <div>checkifalertreplacetext</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].checkifalertreplacetext}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "checkifalertreplacetext",
                  nextsubtype: "",
                  e,
                })
              }
              list="checkifalertreplacetext"
            />
            <datalist id="checkifalertreplacetext">
              <option value="test" />
            </datalist>
          </div>
        </>
      ) : (
        <></>
      )}

      {metadata[onclickchangevar] &&
        metadata[onclickchangevar].type === "checkifandredirect" ? (
        <>
          <div>checkifconditionreplacetext</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={
                metadata[onclickchangevar].checkifconditionreplacetext
              }
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "checkifconditionreplacetext",
                  nextsubtype: "",
                  e,
                })
              }
              list="checkifconditionreplacetext"
            />
            <datalist id="checkifconditionreplacetext">
              <option value="ISBLANK()" />
            </datalist>
          </div>

          <div>redirecttype</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].redirecttype}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttype",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttype"
            />
            <datalist id="redirecttype">
              <option value="page" />
              <option value="url" />
            </datalist>
          </div>

          <div>redirecttositetablename</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].redirecttositetablename}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttositetablename",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttositetablename"
            />
            <datalist id="redirecttositetablename">
              <option value="sitemetadata" />
              <option value="vendorsitemetadata" />
            </datalist>
          </div>

          <div>redirecttositename</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].redirecttositename}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttositename",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttositename"
            />
            <datalist id="redirecttositename">
              <option value="admin" />
              <option value="home" />
            </datalist>
          </div>

          <div>redirecttopage</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].redirecttopage}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttopage",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttopage"
            />
            <datalist id="redirecttopage">
              <option value="page" />
              <option value="url" />
            </datalist>
          </div>

          <div>redirecttourl</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].redirecttourl}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttourl",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttourl"
            />
            <datalist id="redirecttourl">
              <option value="page" />
              <option value="url" />
            </datalist>
          </div>

          <div>redirecttosearchdatastring</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={
                metadata[onclickchangevar].redirecttosearchdatastring
              }
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttosearchdatastring",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttosearchdatastring"
            />
            <datalist id="redirecttosearchdatastring">
              <option value="a={b}&&c={d}" />
            </datalist>
          </div>

          <div>redirecttohashdatastring</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].redirecttohashdatastring}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "redirecttohashdatastring",
                  nextsubtype: "",
                  e,
                })
              }
              list="redirecttohashdatastring"
            />
            <datalist id="redirecttohashdatastring">
              <option value="a={b}&&c={d}" />
            </datalist>
          </div>
        </>
      ) : (
        <></>
      )}

      {metadata[onclickchangevar] &&
        metadata[onclickchangevar].type === "checkifandshowpopup" ? (
        <>
          <div>checkifconditionreplacetext</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={
                metadata[onclickchangevar].checkifconditionreplacetext
              }
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "checkifconditionreplacetext",
                  nextsubtype: "",
                  e,
                })
              }
              list="checkifconditionreplacetext"
            />
            <datalist id="checkifconditionreplacetext">
              <option value="ISBLANK()" />
            </datalist>
          </div>

          <div>PopupSide</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].popupside}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "popupside",
                  nextsubtype: "",
                  e,
                })
              }
              list="popupside"
            />
            <datalist id="popupside">
              <option value="left" />
              <option value="right" />
              <option value="center" />
              <option value="dropdown" />
            </datalist>
          </div>

          <div>PopupMetadatatype</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={metadata[onclickchangevar].popupmetadatatype}
              onChange={(e) =>
                handleChange({
                  type: onclickchangevar,
                  subtype: "popupmetadatatype",
                  nextsubtype: "",
                  e,
                })
              }
              list="popupmetadatatype"
            />
            <datalist id="popupmetadatatype">
              {popupmetadatatypeOptions}
            </datalist>
          </div>
          <div
            style={{
              width: "100%",
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
        </>
      ) : (
        <></>
      )}
    </div>
  );
}


function TemplateareaitemSectioncolumnClickchangeModifydatabasedatapropshtml(
  props
) {
  let { metadata, handleChange, compstate, showpropstype } = props;

  let onclickchangevar = "";
  if (showpropstype === "showclickprops") {
    onclickchangevar = "onclick";
  }
  if (showpropstype === "showchangeprops") {
    onclickchangevar = "onchange";
  }

  let tablenameoptions = [];

  for (let i in tablenameMap) {
    tablenameoptions.push(
      <option label={tablenameMap[i].label} value={tablenameMap[i].name} />
    );
  }

  let modifydatabasedatahtml = [];

  if (
    metadata[onclickchangevar] &&
    metadata[onclickchangevar].modifydatabasedata
  ) {
    let modifydatabasedata = metadata[onclickchangevar].modifydatabasedata;
    for (
      let i = 0;
      i < metadata[onclickchangevar].modifydatabasedata.length;
      i++
    ) {
      modifydatabasedatahtml.push(
        <div style={{ width: "100%" }}>
          <div
            style={{ width: "100%" }}
            onClick={(e) =>
              handleChange({
                type: "modifydatabasedata",
                subtype: i,
                nextsubtype: "modifydatabasedataselectcolumn",
                e,
              })
            }
          >
            {i} - {modifydatabasedata[i].type} -
            {modifydatabasedata[i].tablename}
          </div>
          <div
            style={{ width: "100%" }}
            onClick={(e) =>
              handleChange({
                type: "modifydatabasedata",
                subtype: i,
                nextsubtype: "modifydatabasedataassigncolumnsdataselectcolumn",
                e,
              })
            }
          >
            (assigncolumnsdata)
          </div>

          <div
            style={{ width: "100%" }}
            onClick={(e) =>
              handleChange({
                type: "modifydatabasedata",
                subtype: i,
                nextsubtype: "deletecolumn",
                e,
              })
            }
          >
            delete
          </div>
        </div>
      );
    }
  }

  modifydatabasedatahtml.push(
    <>
      <div
        onClick={(e) =>
          handleChange({
            type: "modifydatabasedata",
            subtype: "",
            nextsubtype: "addcolumn",
            e,
          })
        }
      >
        addmodifydatabasedatacolumn
      </div>
    </>
  );

  let selectedmodifydatabasedatahtml = [];
  if (compstate.modifydatabasedataselectcolumn !== undefined) {
    selectedmodifydatabasedatahtml.push(
      <>
        <div>
          <div>modifydatabasedatatype</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={compstate.modifydatabasedatatype}
              onBlur={(e) =>
                handleChange({
                  type: "modifydatabasedata",
                  subtype: "",
                  nextsubtype: "modifydatabasedatatype",
                  e,
                })
              }
              list="modifydatabasedatatype"
            />
            <datalist id="modifydatabasedatatype">
              <option value="insert" />
              <option value="update" />
              <option value="upsert" />
              <option value="delete" />
              <option value="deletewithquery" />
            </datalist>
          </div>
        </div>

        <div>
          <div>modifydatabasedatatablename</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={compstate.modifydatabasedatatablename}
              onBlur={(e) =>
                handleChange({
                  type: "modifydatabasedata",
                  subtype: "",
                  nextsubtype: "modifydatabasedatatablename",
                  e,
                })
              }
              list="modifydatabasedatatablename"
            />
            <datalist id="modifydatabasedatatablename">
              {tablenameoptions}
            </datalist>
          </div>
        </div>

        <div>
          <div>deletewithquerybeginswith</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={
                compstate.modifydatabasedatadeletewithquerybeginswith
              }
              onBlur={(e) =>
                handleChange({
                  type: "modifydatabasedata",
                  subtype: "",
                  nextsubtype: "modifydatabasedatadeletewithquerybeginswith",
                  e,
                })
              }
              list="modifydatabasedatadeletewithquerybeginswith"
            />
            <datalist id="modifydatabasedatadeletewithquerybeginswith">
              <option value="sr-account" />
            </datalist>
          </div>
        </div>

        <div>
          <div>initialassignmentarraytype</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={
                compstate.modifydatabasedatainitialassignmentarraytype
              }
              onBlur={(e) =>
                handleChange({
                  type: "modifydatabasedata",
                  subtype: "",
                  nextsubtype: "modifydatabasedatainitialassignmentarraytype",
                  e,
                })
              }
              list="modifydatabasedatainitialassignmentarraytype"
            />
            <datalist id="modifydatabasedatainitialassignmentarraytype">
              <option value="templateareaitemstatedata" />
              <option value="sitestatedata" />
            </datalist>
          </div>
        </div>

        <div>
          <div>initialassignmentarraysubtype</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={
                compstate.modifydatabasedatainitialassignmentarraysubtype
              }
              onBlur={(e) =>
                handleChange({
                  type: "modifydatabasedata",
                  subtype: "",
                  nextsubtype:
                    "modifydatabasedatainitialassignmentarraysubtype",
                  e,
                })
              }
              list="modifydatabasedatainitialassignmentarraysubtype"
            />
            <datalist id="modifydatabasedatainitialassignmentarraysubtype">
              <option value="uirepeatrecorddata" />
              <option value="signedindbuserdata" />
              <option value="signedinvendordbuserdata" />
              <option value="orgdata" />
            </datalist>
          </div>
        </div>

        <div
          onClick={(e) =>
            handleChange({
              type: "modifydatabasedata",
              subtype: "",
              nextsubtype: "updatecolumn",
              e,
            })
          }
        >
          update
        </div>
      </>
    );
  }

  return (
    <div>
      <div>modifydatabasedata</div>
      <div>
        {modifydatabasedatahtml}

        {selectedmodifydatabasedatahtml}
      </div>
    </div>
  );
}

function TemplateareaitemSectioncolumnClickchangeAssigncolumnsdatapropshtml(
  props
) {
  let { metadata, handleChange, handleClick, compstate, showpropstype } = props;

  let onclickchangevar = "";
  if (showpropstype === "showclickprops") {
    onclickchangevar = "onclick";
  }
  if (showpropstype === "showchangeprops") {
    onclickchangevar = "onchange";
  }

  let assigncolumnsdatahtml = [];
  let selectedassigncolumnsdatahtml = [];
  if (compstate.modifydatabasedataassigncolumnsdataselectcolumn !== undefined) {
    let assigncolumnsdata = {};
    for (
      let i = 0;
      i < metadata[onclickchangevar].modifydatabasedata.length;
      i++
    ) {
      if (i === compstate.modifydatabasedataassigncolumnsdataselectcolumn) {
        assigncolumnsdata =
          compstate.metadata[onclickchangevar].modifydatabasedata[i]
            .assigncolumnsdata;
      }
    }

    for (let i in assigncolumnsdata) {
      assigncolumnsdatahtml.push(
        <div style={{ width: "100%" }}>
          <div
            style={{ width: "100%" }}
            onClick={(e) =>
              handleClick({
                type: "assigncolumnsdataselectcolumn",
                subtype: i,
                nextsubtype: "",
                e,
              })
            }
          >
            {i} - {assigncolumnsdata[i].tovalue}
          </div>

          <div
            style={{ width: "100%" }}
            onClick={(e) =>
              handleChange({
                type: "assigncolumnsdata",
                subtype: i,
                nextsubtype: "deletecolumn",
                e,
              })
            }
          >
            delete
          </div>
        </div>
      );
    }

    assigncolumnsdatahtml.push(
      <>
        <div
          onClick={(e) =>
            handleChange({
              type: "assigncolumnsdata",
              subtype: "",
              nextsubtype: "addcolumn",
              e,
            })
          }
        >
          addcolumn
        </div>
      </>
    );

    if (
      compstate.assigncolumnsdataselectcolumn !== "" &&
      compstate.assigncolumnsdataselectcolumn !== undefined
    ) {
      selectedassigncolumnsdatahtml.push(
        <>
          <div>
            <div>toname</div>
            <div>
              <input
                style={{ width: "100%" }}
                defaultValue={compstate.toname}
                onBlur={(e) =>
                  handleChange({
                    type: "assigncolumnsdata",
                    subtype: "",
                    nextsubtype: "toname",
                    e,
                  })
                }
                list="toname"
              />
            </div>
          </div>

          <div>tovalue</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={compstate.tovalue}
              onBlur={(e) =>
                handleChange({
                  type: "assigncolumnsdata",
                  subtype: "",
                  nextsubtype: "tovalue",
                  e,
                })
              }
            />
          </div>

          <div
            onClick={(e) =>
              handleChange({
                type: "assigncolumnsdata",
                subtype: "",
                nextsubtype: "updatecolumn",
                e,
              })
            }
          >
            update
          </div>
        </>
      );
    }
  }

  return (
    <div>
      <div>
        {assigncolumnsdatahtml}
        {selectedassigncolumnsdatahtml}
      </div>
    </div>
  );
}

function TemplateareaitemSectioncolumnClickchangeUpdatestatedatapropshtml(
  props
) {
  let { metadata, handleChange, handleClick, compstate, showpropstype } = props;

  let onclickchangevar = "";
  if (showpropstype === "showclickprops") {
    onclickchangevar = "onclick";
  }
  if (showpropstype === "showchangeprops") {
    onclickchangevar = "onchange";
  }

  let tablecolumnoptions = [];

  if (
    metadata[onclickchangevar].modifydatabasetablename &&
    metadata[onclickchangevar].modifydatabasetablename !== ""
  ) {
    let tablecolumns =
      tablenameMap[metadata[onclickchangevar].modifydatabasetablename].fields;
    for (let i in tablecolumns) {
      tablecolumnoptions.push(
        <option label={tablecolumns[i].label} value={tablecolumns[i].name} />
      );
    }
  }

  let updatestatedatahtml = [];

  if (
    metadata[onclickchangevar] &&
    metadata[onclickchangevar].updatestatedata
  ) {
    let updatestatedata = metadata[onclickchangevar].updatestatedata;
    for (let i in metadata[onclickchangevar].updatestatedata) {
      updatestatedatahtml.push(
        <div style={{ width: "100%" }}>
          <div
            style={{ width: "100%" }}
            onClick={(e) =>
              handleClick({
                type: "updatestatedataselectcolumn",
                subtype: i,
                nextsubtype: "",
                e,
              })
            }
          >
            {i} - {updatestatedata[i].tovalue}
          </div>

          <div
            style={{ width: "100%" }}
            onClick={(e) =>
              handleChange({
                type: "updatestatedata",
                subtype: i,
                nextsubtype: "deletecolumn",
                e,
              })
            }
          >
            delete
          </div>
        </div>
      );
    }
  }

  updatestatedatahtml.push(
    <>
      <div
        onClick={(e) =>
          handleChange({
            type: "updatestatedata",
            subtype: "",
            nextsubtype: "addcolumn",
            e,
          })
        }
      >
        addcolumn
      </div>
    </>
  );

  let selectedupdatestatedatahtml = [];
  if (
    compstate.updatestatedataselectcolumn !== "" &&
    compstate.updatestatedataselectcolumn !== undefined
  ) {
    selectedupdatestatedatahtml.push(
      <>
        <div>
          <div>toname</div>
          <div>
            <input
              style={{ width: "100%" }}
              defaultValue={compstate.toname}
              onBlur={(e) =>
                handleChange({
                  type: "updatestatedata",
                  subtype: "",
                  nextsubtype: "toname",
                  e,
                })
              }
              list="toname"
            />
            <datalist id="toname">{tablecolumnoptions}</datalist>
          </div>
        </div>

        <div>tovalue</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={compstate.tovalue}
            onBlur={(e) =>
              handleChange({
                type: "updatestatedata",
                subtype: "",
                nextsubtype: "tovalue",
                e,
              })
            }
          />
        </div>

        <div
          onClick={(e) =>
            handleChange({
              type: "updatestatedata",
              subtype: "",
              nextsubtype: "updatecolumn",
              e,
            })
          }
        >
          update
        </div>
      </>
    );
  }

  return (
    <div>
      <div>updatestatedata</div>
      <div>
        {updatestatedatahtml}
        {selectedupdatestatedatahtml}
      </div>
    </div>
  );
}

function Templateareaitemsectioncolumnlabelpropshtml(props) {
  let { metadata, handleChange } = props;

  if (metadata.innerTextstyle === undefined || metadata.innerTextstyle === "") {
    metadata.innerTextstyle = {};
  }
  return (
    <div>
      <div>innerText</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.innerText}
          onChange={(e) =>
            handleChange({ type: "innerText", subtype: "", nextsubtype: "", e })
          }
        />
      </div>

      <div>fontSize</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.innerTextstyle.fontSize}
          onChange={(e) =>
            handleChange({
              type: "innerTextstyle",
              subtype: "fontSize",
              nextsubtype: "",
              e,
            })
          }
          list="fontSize"
        />
        <datalist id="fontSize">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div>fontWeight</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.innerTextstyle.fontWeight}
          onChange={(e) =>
            handleChange({
              type: "innerTextstyle",
              subtype: "fontWeight",
              nextsubtype: "",
              e,
            })
          }
          list="fontWeight"
        />
        <datalist id="fontWeight">
          <option value="normal" />
          <option value="bold" />
        </datalist>
      </div>

      <div>textAlign</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.innerTextstyle.textAlign}
          onChange={(e) =>
            handleChange({
              type: "innerTextstyle",
              subtype: "textAlign",
              nextsubtype: "",
              e,
            })
          }
          list="textAlign"
        />
        <datalist id="textAlign">
          <option value="left" />
          <option value="center" />
          <option value="right" />
        </datalist>
      </div>

      <div>fontStyle</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.innerTextstyle.fontStyle}
          onChange={(e) =>
            handleChange({
              type: "innerTextstyle",
              subtype: "fontStyle",
              nextsubtype: "",
              e,
            })
          }
          list="fontStyle"
        />
        <datalist id="fontStyle">
          <option value="normal" />
          <option value="italic" />
          <option value="oblique" />
          <option value="initial" />
          <option value="inherit" />
        </datalist>
      </div>

      <div> color</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.innerTextstyle.color}
          onChange={(e) =>
            handleChange({
              type: "innerTextstyle",
              subtype: "color",
              nextsubtype: "",
              e,
            })
          }
          list="color"
        />
        <datalist id="color">
          <option value="white" />
          <option value="black" />
        </datalist>
        <input
          type="color"
          style={{ width: "100%" }}
          defaultValue={metadata.innerTextstyle.color}
          onChange={(e) =>
            handleChange({
              type: "innerTextstyle",
              subtype: "color",
              nextsubtype: "",
              e,
            })
          }
        />
      </div>

      <div> paddingH</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.innerTextstyle.paddingLeft}
          onChange={(e) =>
            handleChange({
              type: "innerTextstyle",
              subtype: "paddingH",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingLeft</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.innerTextstyle.paddingLeft}
          onChange={(e) =>
            handleChange({
              type: "innerTextstyle",
              subtype: "paddingLeft",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingRight</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.innerTextstyle.paddingRight}
          onChange={(e) =>
            handleChange({
              type: "innerTextstyle",
              subtype: "paddingRight",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingV</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.innerTextstyle.paddingTop}
          onChange={(e) =>
            handleChange({
              type: "innerTextstyle",
              subtype: "paddingV",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> borderstyle</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="borderstyle"
          defaultValue={metadata.innerTextstyle.border}
          onChange={(e) =>
            handleChange({
              type: "innerTextstyle",
              subtype: "borderstyle",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="borderstyle">
          <option value="circle" />
          <option value="square" />
          <option value="2px solid grey" />
        </datalist>
      </div>

      <div> borderRadius</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="borderRadius"
          defaultValue={metadata.innerTextstyle.borderRadius}
          onChange={(e) =>
            handleChange({
              type: "innerTextstyle",
              subtype: "borderRadius",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="borderRadius">
          <option value="5%" />
          <option value="10%" />
          <option value="25%" />
          <option value="50%" />
        </datalist>
      </div>
    </div>
  );
}

function Templateareaitemsectioncolumniconpropshtml(props) {
  let { metadata, handleChange } = props;

  return (
    <div>
      <div>type</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.imgicon.type}
          onChange={(e) =>
            handleChange({ type: "imgicon", subtype: "type", e })
          }
          list="type"
        />
        <datalist id="type">
          <option value="localimage" />
          <option value="globalurl" />
          <option value="vendorimgicon" />
        </datalist>
      </div>

      <div>desktopvendor</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.imgicon.desktopvendor}
          onChange={(e) =>
            handleChange({ type: "imgicon", subtype: "desktopvendor", e })
          }
          list="desktopvendor"
        />
        <datalist id="desktopvendor">
          <option value="fontawesome" />
          <option value="google" />
        </datalist>
      </div>

      <div>name</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.imgicon.name}
          onChange={(e) =>
            handleChange({ type: "imgicon", subtype: "name", e })
          }
          list="name"
        />
        <datalist id="name">
          <option value="close" />
          <option value="cloud" />
        </datalist>
      </div>

      <div>position</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.imgicon.position}
          onChange={(e) =>
            handleChange({ type: "imgicon", subtype: "position", e })
          }
          list="position"
        />
        <datalist id="position">
          <option value="pre" />
          <option value="post" />
        </datalist>
      </div>

      <div>fontSize</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.imgicon.style.fontSize}
          onChange={(e) =>
            handleChange({
              type: "imgicon",
              subtype: "style",
              nextsubtype: "fontSize",
              e,
            })
          }
          list="fontSize"
        />
        <datalist id="fontSize">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> color</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.imgicon.style.color}
          onChange={(e) =>
            handleChange({
              type: "imgicon",
              subtype: "style",
              nextsubtype: "color",
              e,
            })
          }
          list="color"
        />
        <datalist id="color">
          <option value="white" />
          <option value="black" />
        </datalist>
        <input
          type="color"
          style={{ width: "100%" }}
          defaultValue={metadata.imgicon.style.color}
          onChange={(e) =>
            handleChange({
              type: "imgicon",
              subtype: "style",
              nextsubtype: "color",
              e,
            })
          }
        />
      </div>

      <div> backgroundColor</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.imgicon.style.backgroundColor}
          onChange={(e) =>
            handleChange({
              type: "imgicon",
              subtype: "style",
              nextsubtype: "backgroundColor",
              e,
            })
          }
          list="backgroundColor"
        />
        <datalist id="backgroundColor">
          <option value="white" />
          <option value="black" />
        </datalist>
        <input
          type="color"
          style={{ width: "100%" }}
          defaultValue={metadata.imgicon.style.backgroundColor}
          onChange={(e) =>
            handleChange({
              type: "imgicon",
              subtype: "style",
              nextsubtype: "backgroundColor",
              e,
            })
          }
        />
      </div>

      <div> paddingH</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.imgicon.style.paddingH}
          onChange={(e) =>
            handleChange({
              type: "imgicon",
              subtype: "style",
              nextsubtype: "paddingH",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingLeft</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.imgicon.style.paddingLeft}
          onChange={(e) =>
            handleChange({
              type: "imgicon",
              subtype: "style",
              nextsubtype: "paddingLeft",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingRight</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.imgicon.style.paddingRight}
          onChange={(e) =>
            handleChange({
              type: "imgicon",
              subtype: "style",
              nextsubtype: "paddingRight",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingV</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.imgicon.style.paddingTop}
          onChange={(e) =>
            handleChange({
              type: "imgicon",
              subtype: "style",
              nextsubtype: "paddingV",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> borderstyle</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="borderstyle"
          defaultValue={metadata.imgicon.style.border}
          onChange={(e) =>
            handleChange({
              type: "imgicon",
              subtype: "style",
              nextsubtype: "borderstyle",
              e,
            })
          }
        />
        <datalist id="borderstyle">
          <option value="circle" />
          <option value="square" />
          <option value="2px solid grey" />
        </datalist>
      </div>

      <div> borderRadius</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="borderRadius"
          defaultValue={metadata.imgicon.style.borderRadius}
          onChange={(e) =>
            handleChange({
              type: "imgicon",
              subtype: "style",
              nextsubtype: "borderRadius",
              e,
            })
          }
        />
        <datalist id="borderRadius">
          <option value="5%" />
          <option value="10%" />
          <option value="25%" />
          <option value="50%" />
        </datalist>
      </div>
    </div>
  );
}

function Templateareaitemsectioncolumnimagepropshtml(props) {
  let { metadata, handleChange } = props;

  return (
    <div>
      <div>type</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.imgicon.type}
          onChange={(e) =>
            handleChange({ type: "imgicon", subtype: "type", e })
          }
          list="type"
        />
        <datalist id="type">
          <option value="localimage" />
          <option value="globalurl" />
          <option value="vendorimgicon" />
        </datalist>
      </div>

      <div>url</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.imgicon.name}
          onChange={(e) =>
            handleChange({ type: "imgicon", subtype: "name", e })
          }
        />
      </div>

      <div> width</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="width"
          defaultValue={metadata.style.width}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "width",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="width">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> height</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="height"
          defaultValue={metadata.style.height}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "height",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> objectfit</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="objectfit"
          defaultValue={metadata.style.objectFit}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "objectFit",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="objectfit">
          <option value="contain" />
          <option value="cover" />
        </datalist>
      </div>

      <div> filter</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="filter"
          defaultValue={metadata.style.filter}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "filter",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="filter">
          <option value="blur(1px)" />
          <option value="blur(2px)" />
          <option value="blur(3px)" />
          <option value="contrast(50%)" />
          <option value="contrast(100%)" />
          <option value="contrast(180%)" />
          <option value="grayscale(50%)" />
          <option value="grayscale(100%)" />
          <option value="saturate(3)" />
          <option value="saturate(7)" />
        </datalist>
      </div>

      <div> opacity</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="opacity"
          defaultValue={metadata.style.opacity}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "opacity",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="opacity">
          <option value="0.5" />
          <option value="1.0" />
        </datalist>
      </div>

      <div> paddingH</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.style.paddingLeft}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "paddingH",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingLeft</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.style.paddingLeft}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "paddingLeft",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingRight</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.style.paddingRight}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "paddingRight",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingV</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.style.paddingTop}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "paddingV",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> borderstyle</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="borderstyle"
          defaultValue={metadata.style.border}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "borderstyle",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="borderstyle">
          <option value="circle" />
          <option value="square" />
          <option value="2px solid grey" />
        </datalist>
      </div>

      <div> borderRadius</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="borderRadius"
          defaultValue={metadata.style.borderRadius}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "borderRadius",
              nextsubtype: "",
              e,
            })
          }
        />
        <datalist id="borderRadius">
          <option value="5%" />
          <option value="10%" />
          <option value="25%" />
          <option value="50%" />
        </datalist>
      </div>
    </div>
  );
}

function Templateareaitemsectioncolumnimageovertextpropshtml(props) {
  let { metadata, handleChange } = props;

  return (
    <div>
      <div>innerText</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.overtext.innerText}
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "innerText",
              nextsubtype: "",
              e,
            })
          }
        />
      </div>

      <div>position</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.overtext.position}
          onChange={(e) =>
            handleChange({ type: "overtext", subtype: "position", e })
          }
          list="position"
        />
        <datalist id="position">
          <option value="pre" />
          <option value="post" />
        </datalist>
      </div>

      <div>fontSize</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.overtext.style.fontSize}
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "fontSize",
              e,
            })
          }
          list="fontSize"
        />
        <datalist id="fontSize">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div>fontWeight</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.overtext.style.fontWeight}
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "fontWeight",
              e,
            })
          }
          list="fontWeight"
        />
        <datalist id="fontWeight">
          <option value="normal" />
          <option value="bold" />
        </datalist>
      </div>

      <div>fontStyle</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.overtext.style.fontStyle}
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "fontStyle",
              e,
            })
          }
          list="fontStyle"
        />
        <datalist id="fontStyle">
          <option value="normal" />
          <option value="italic" />
          <option value="oblique" />
          <option value="initial" />
          <option value="inherit" />
        </datalist>
      </div>

      <div> color</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.overtext.style.color}
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "color",
              e,
            })
          }
          list="color"
        />
        <datalist id="color">
          <option value="white" />
          <option value="black" />
        </datalist>
        <input
          type="color"
          style={{ width: "100%" }}
          defaultValue={metadata.overtext.style.color}
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "color",
              e,
            })
          }
        />
      </div>

      <div> backgroundColor</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.overtext.style.backgroundColor}
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "backgroundColor",
              e,
            })
          }
          list="backgroundColor"
        />
        <datalist id="backgroundColor">
          <option value="white" />
          <option value="black" />
        </datalist>
        <input
          type="color"
          style={{ width: "100%" }}
          defaultValue={metadata.overtext.style.backgroundColor}
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "backgroundColor",
              e,
            })
          }
        />
      </div>

      <div> textAlign</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="textAlign"
          defaultValue={metadata.overtext.style.textAlign}
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "textAlign",
              e,
            })
          }
        />
        <datalist id="textAlign">
          <option value="center" />
          <option value="left" />
          <option value="right" />
        </datalist>
      </div>

      <div> width</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="width"
          defaultValue={metadata.overtext.style.width}
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "width",
              e,
            })
          }
        />
        <datalist id="width">
          <option value="100%" />
          <option value="20px" />
        </datalist>
      </div>

      <div> left</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          defaultValue={metadata.overtext.style.left}
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "left",
              e,
            })
          }
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> top</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "top",
              e,
            })
          }
          defaultValue={metadata.overtext.style.top}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> right</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "right",
              e,
            })
          }
          defaultValue={metadata.overtext.style.right}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> bottom</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "bottom",
              e,
            })
          }
          defaultValue={metadata.overtext.style.bottom}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingH</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "paddingH",
              e,
            })
          }
          defaultValue={metadata.overtext.style.paddingH}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingLeft</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "paddingLeft",
              e,
            })
          }
          defaultValue={metadata.overtext.style.paddingLeft}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingRight</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "paddingRight",
              e,
            })
          }
          defaultValue={metadata.overtext.style.paddingRight}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingV</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "paddingV",
              e,
            })
          }
          defaultValue={metadata.overtext.style.paddingTop}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> borderstyle</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="borderstyle"
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "borderstyle",
              e,
            })
          }
          defaultValue={metadata.overtext.style.border}
        />
        <datalist id="borderstyle">
          <option value="circle" />
          <option value="square" />
          <option value="2px solid grey" />
        </datalist>
      </div>

      <div> borderRadius</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="borderRadius"
          onChange={(e) =>
            handleChange({
              type: "overtext",
              subtype: "style",
              nextsubtype: "borderRadius",
              e,
            })
          }
          defaultValue={metadata.overtext.style.borderRadius}
        />
        <datalist id="borderRadius">
          <option value="25%" />
          <option value="50%" />
          <option value="10px" />
        </datalist>
      </div>
    </div>
  );
}

function Inputoutputfieldpropshtml(props) {
  let { metadata, handleChange, handleClick } = props;
  let mainpanelHtml = [];
  if (
    metadata.type === "inputoutputfield" &&
    metadata.inputoutputfieldprops.type === "querypaneltablename"
  ) {
    let options = [];

    for (let i in tablenameMap) {
      options.push(
        <option label={tablenameMap[i].label} value={tablenameMap[i].name} />
      );
    }
    mainpanelHtml.push(
      <div>
        <div>Table</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.querypaneltablename}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "querypaneltablename",
                nextsubtype: "",
                e,
              })
            }
            list="querypaneltablename"
          />
          <datalist id="querypaneltablename">{options}</datalist>
        </div>
      </div>
    );
  } else if (
    metadata.type === "inputoutputfield" &&
    metadata.inputoutputfieldprops.type === "querypanelcolumnquery"
  ) {
    let querypaneltabelcolumnvaluetypeoptions = [];
    for (let i in querypaneltabelcolumnvaluetypeMap) {
      querypaneltabelcolumnvaluetypeoptions.push(
        <option
          label={querypaneltabelcolumnvaluetypeMap[i].label}
          value={querypaneltabelcolumnvaluetypeMap[i].name}
        />
      );
    }

    let querypaneltabelcolumnvaluetypefieldsoptions = [];
    let querypaneltabelcolumnvaluetype =
      metadata.inputoutputfieldprops.querypaneltabelcolumnvaluetype;
    if (
      querypaneltabelcolumnvaluetype &&
      querypaneltabelcolumnvaluetypeMap[querypaneltabelcolumnvaluetype] &&
      querypaneltabelcolumnvaluetypeMap[querypaneltabelcolumnvaluetype].fields
    ) {
      let valuetypetablefields =
        querypaneltabelcolumnvaluetypeMap[querypaneltabelcolumnvaluetype]
          .fields;
      for (let i in valuetypetablefields) {
        querypaneltabelcolumnvaluetypefieldsoptions.push(
          <option
            label={valuetypetablefields[i].label}
            value={valuetypetablefields[i].name}
          />
        );
      }
    }

    let options = [];
    if (tablenameMap[metadata.inputoutputfieldprops.querypaneltablename]) {
      let tablefields =
        tablenameMap[metadata.inputoutputfieldprops.querypaneltablename].fields;

      if (tablefields) {
        for (let i in tablefields) {
          options.push(
            <option label={tablefields[i].label} value={tablefields[i].name} />
          );
        }
      }
    }

    mainpanelHtml.push(
      <div>
        <div>Table</div>
        <div>{metadata.inputoutputfieldprops.querypaneltablelabel}</div>

        <div>Column</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={
              metadata.inputoutputfieldprops.querypaneltabelcolumnname
            }
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "querypaneltabelcolumnname",
                nextsubtype: "",
                e,
              })
            }
            list="querypaneltabelcolumnname"
          />
          <datalist id="querypaneltabelcolumnname">{options}</datalist>
        </div>

        <div>Condition</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={
              metadata.inputoutputfieldprops.querypaneltabelcolumncondition
            }
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "querypaneltabelcolumncondition",
                nextsubtype: "",
                e,
              })
            }
            list="querypaneltabelcolumncondition"
          />
          <datalist id="querypaneltabelcolumncondition">
            <option value="beginswith" />
            <option value="equalsto" />
            <option value="contains" />
          </datalist>
        </div>

        <div>Add Dynamic values</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={
              metadata.inputoutputfieldprops.querypaneltabelcolumnvaluetype
            }
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "querypaneltabelcolumnvaluetype",
                nextsubtype: "",
                e,
              })
            }
            list="querypaneltabelcolumnvaluetype"
          />
          <datalist id="querypaneltabelcolumnvaluetype">
            {querypaneltabelcolumnvaluetypeoptions}
          </datalist>
        </div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={
              metadata.inputoutputfieldprops.querypaneltabelcolumnvaluetypefield
            }
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "querypaneltabelcolumnvaluetypefield",
                nextsubtype: "",
                e,
              })
            }
            list="querypaneltabelcolumnvaluetypefield"
          />
          <datalist id="querypaneltabelcolumnvaluetypefield">
            {querypaneltabelcolumnvaluetypefieldsoptions}
          </datalist>
        </div>
        <div
          onClick={(e) =>
            handleChange({
              type: "addquerypaneltabelcolumnvalue",
              subtype: "",
              nextsubtype: "",
              e,
            })
          }
        >
          Add
        </div>

        <div>Value</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={
              metadata.inputoutputfieldprops.querypaneltabelcolumnvalue
            }
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "querypaneltabelcolumnvalue",
                nextsubtype: "",
                e,
              })
            }
            list="querypaneltabelcolumnvalue"
          />
          <datalist id="querypaneltabelcolumnvalue">
            <option value="blank" />
            <option value="nonblank" />
          </datalist>
        </div>
      </div>
    );
  } else if (
    metadata.type === "inputoutputfield" &&
    metadata.inputoutputfieldprops.type === "querypaneltabelcolumnfilter"
  ) {
    let options = [];
    if (tablenameMap[metadata.inputoutputfieldprops.querypaneltablename]) {
      let tablefields =
        tablenameMap[metadata.inputoutputfieldprops.querypaneltablename].fields;

      if (tablefields) {
        for (let i in tablefields) {
          options.push(
            <option label={tablefields[i].label} value={tablefields[i].name} />
          );
        }
      }
    }

    mainpanelHtml.push(
      <div>


        <div>Column</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={
              metadata.inputoutputfieldprops.querypaneltabelcolumnname
            }
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "querypaneltabelcolumnname",
                nextsubtype: "",
                e,
              })
            }
            list="querypaneltabelcolumnname"
          />
          <datalist id="querypaneltabelcolumnname">{options}</datalist>
        </div>



        <div>Value</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={
              metadata.inputoutputfieldprops.querypaneltabelcolumnvalue
            }
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "querypaneltabelcolumnvalue",
                nextsubtype: "",
                e,
              })
            }
            list="querypaneltabelcolumnvalue"
          />
          <datalist id="querypaneltabelcolumnvalue">
            <option value="blank" />
            <option value="nonblank" />
          </datalist>
        </div>

        <div>querypaneltabelcolumnshowalldynamicvalues</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={
              metadata.inputoutputfieldprops.querypaneltabelcolumnshowalldynamicvalues
            }
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "querypaneltabelcolumnshowalldynamicvalues",
                nextsubtype: "",
                e,
              })
            }
            list="querypaneltabelcolumnshowalldynamicvalues"
          />
          <datalist id="querypaneltabelcolumnshowalldynamicvalues">
            <option value="true" />
            <option value="false" />
          </datalist>
        </div>

      </div>
    );
  } else if (
    metadata.type === "inputoutputfield" &&
    metadata.inputoutputfieldprops.type === "querypaneltabelcolumnsort"
  ) {
    let options = [];
    if (tablenameMap[metadata.inputoutputfieldprops.querypaneltablename]) {
      let tablefields =
        tablenameMap[metadata.inputoutputfieldprops.querypaneltablename].fields;

      if (tablefields) {
        for (let i in tablefields) {
          options.push(
            <option label={tablefields[i].label} value={tablefields[i].name} />
          );
        }
      }
    }

    mainpanelHtml.push(
      <div>
        <div>Column</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={
              metadata.inputoutputfieldprops.querypaneltabelcolumnname
            }
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "querypaneltabelcolumnname",
                nextsubtype: "",
                e,
              })
            }
            list="querypaneltabelcolumnname"
          />
          <datalist id="querypaneltabelcolumnname">{options}</datalist>
        </div>

      </div>



    );
  } else if (metadata.type === "inputoutputfield") {
    mainpanelHtml.push(
      <div>
        <div>Orientation</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.orientation}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "orientation",
                nextsubtype: "",
                e,
              })
            }
            list="orientation"
          />
          <datalist id="orientation">
            <option value="horizontal" />
            <option value="vertical" />
          </datalist>
        </div>

        <div>InputMode</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.inputmode}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "inputmode",
                nextsubtype: "",
                e,
              })
            }
            list="inputmode"
          />
          <datalist id="inputmode">
            <option value="true" />
            <option value="false" />
          </datalist>
        </div>

        <div>placeholder</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.placeholder}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "placeholder",
                nextsubtype: "",
                e,
              })
            }
          />
        </div>

        <div>defaultvalue</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.defaultvalue}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "defaultvalue",
                nextsubtype: "",
                e,
              })
            }
          />
        </div>

        <div>recordlookuptablename</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.recordlookuptablename}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "recordlookuptablename",
                nextsubtype: "",
                e,
              })
            }
          />
        </div>

        <div>recordlookupdisplaycolumnname</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={
              metadata.inputoutputfieldprops.recordlookupdisplaycolumnname
            }
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "recordlookupdisplaycolumnname",
                nextsubtype: "",
                e,
              })
            }
          />
        </div>

        <div>Type</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.type}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "type",
                nextsubtype: "",
                e,
              })
            }
            list="type"
          />
          <datalist id="type">
            <option value="text" />
            <option value="select" />
            <option value="image" />
            <option value="icon" />
            <option value="checkbox" />
            <option value="url" />
            <option value="date" />
            <option value="datetime" />
            <option value="relativedatetime" />
            <option value="islinkedcolumn" />
          </datalist>
        </div>

        <div>srctypedefault</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.srctypedefault}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "srctypedefault",
                nextsubtype: "",
                e,
              })
            }
            list="srctypedefault"
          />
          <datalist id="srctypedefault">
            <option value="url" />
            <option value="fontawesome" />
          </datalist>
        </div>

        <div>srcvaluedefault</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.srcvaluedefault}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "srcvaluedefault",
                nextsubtype: "",
                e,
              })
            }
            list="srcvaluedefault"
          />
          <datalist id="srcvaluedefault">
            <option value="cloud" />
            <option value="close" />
          </datalist>
        </div>

        <div>srcdisplayvaluedefault</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.srcdisplayvaluedefault}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "srcdisplayvaluedefault",
                nextsubtype: "",
                e,
              })
            }
            list="srcdisplayvaluedefault"
          />
          <datalist id="srcdisplayvaluedefault"></datalist>
        </div>

        <div>refname</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.refname}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "refname",
                nextsubtype: "",
                e,
              })
            }
            list="refname"
          />
          <datalist id="refname"></datalist>
        </div>

        <div>refobjectname</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.refobjectname}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "refobjectname",
                nextsubtype: "",
                e,
              })
            }
            list="rerefobjectnamefname"
          />
          <datalist id="refobjectname"></datalist>
        </div>
      </div>
    );

    if (
      metadata.inputoutputfieldprops.inputmode === "true" &&
      metadata.inputoutputfieldprops.type === "select"
    ) {
      let selectoptionshtml = [];
      for (let i in metadata.inputoutputfieldprops.options) {
        selectoptionshtml.push(
          <>
            <input
              style={{ width: "35%" }}
              defaultValue={i}
              onChange={(e) =>
                handleChange({
                  type: "inputoutputfieldprops",
                  subtype: "",
                  nextsubtype: "",
                  action: "editselectoptionvalue",
                  actionparam: i,
                  e,
                })
              }
            />

            <input
              style={{ width: "35%" }}
              defaultValue={metadata.inputoutputfieldprops.options[i]}
              onChange={(e) =>
                handleChange({
                  type: "inputoutputfieldprops",
                  subtype: "",
                  nextsubtype: "",
                  action: "editselectoptionlabel",
                  actionparam: i,
                  e,
                })
              }
            />

            <div
              style={{ width: "30%", display: "inline-block" }}
              onClick={(e) =>
                handleChange({
                  type: "inputoutputfieldprops",
                  subtype: "",
                  nextsubtype: "",
                  action: "deleteselectoption",
                  actionparam: i,
                  e,
                })
              }
            >
              delete
            </div>
          </>
        );
      }
      mainpanelHtml.push(
        <>
          <div>SelectOptions</div>
          <div style={{ width: "100%", overflow: "hidden" }}>
            {selectoptionshtml}
          </div>

          <div
            style={{ width: "100%" }}
            onClick={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "",
                nextsubtype: "",
                action: "addselectoption",
                e,
              })
            }
          >
            Add Option
          </div>
        </>
      );
    }

    mainpanelHtml.push(
      <div>
        <div>hidelabel</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.hidelabel}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "hidelabel",
                nextsubtype: "",
                e,
              })
            }
            list="hidelabel"
          />
          <datalist id="hidelabel">
            <option value="true" />
            <option value="false" />
          </datalist>
        </div>

        <div>imagewidth</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.imagewidth}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "imagewidth",
                nextsubtype: "",
                e,
              })
            }
            list="imagewidth"
          />
          <datalist id="imagewidth">
            <option value="100%" />
            <option value="50%" />
          </datalist>
        </div>

        <div>imageheight</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.imageheight}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "imageheight",
                nextsubtype: "",
                e,
              })
            }
            list="imageheight"
          />
          <datalist id="imageheight">
            <option value="100%" />
            <option value="50%" />
          </datalist>
        </div>

        <div>imageobjectfit</div>
        <div>
          <input
            style={{ width: "100%" }}
            defaultValue={metadata.inputoutputfieldprops.imageobjectfit}
            onChange={(e) =>
              handleChange({
                type: "inputoutputfieldprops",
                subtype: "imageobjectfit",
                nextsubtype: "",
                e,
              })
            }
            list="imageobjectfit"
          />
          <datalist id="imageobjectfit">
            <option value="contain" />
            <option value="cover" />
          </datalist>
        </div>
      </div>
    );
  }
  return mainpanelHtml;
}

function Totalstylepropshtml(props) {
  let { metadata, handleChange } = props;
  if (metadata.style === undefined || metadata.style === "") {
    metadata.style = {};
  }
  return (
    <div>
      <div>width</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.width}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "width",
              nextsubtype: "",
              e,
            })
          }
          list="width"
        />
        <datalist id="width">
          <option value="25%" />
          <option value="50%" />
          <option value="100%" />
          <option value="100px" />
        </datalist>
      </div>

      <div>height</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.height}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "height",
              nextsubtype: "",
              e,
            })
          }
          list="height"
        />
        <datalist id="height">
          <option value="25%" />
          <option value="50%" />
          <option value="100%" />
          <option value="100px" />
        </datalist>
      </div>

      <div>overflow</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.overflow}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "overflow",
              nextsubtype: "",
              e,
            })
          }
          list="overflow"
        />
        <datalist id="overflow">
          <option value="auto" />
          <option value="scroll" />
          <option value="hidden" />
        </datalist>
      </div>

      <div>textAlign</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.textAlign}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "textAlign",
              nextsubtype: "",
              e,
            })
          }
          list="textAlign"
        />
        <datalist id="textAlign">
          <option value="left" />
          <option value="center" />
          <option value="right" />
        </datalist>
      </div>

      <div>fontSize</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.fontSize}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "fontSize",
              nextsubtype: "",
              e,
            })
          }
          list="fontSize"
        />
        <datalist id="fontSize">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div>fontWeight</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.fontWeight}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "fontWeight",
              nextsubtype: "",
              e,
            })
          }
          list="fontWeight"
        />
        <datalist id="fontWeight">
          <option value="normal" />
          <option value="bold" />
        </datalist>
      </div>

      <div>fontStyle</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.fontStyle}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "fontStyle",
              nextsubtype: "",
              e,
            })
          }
          list="fontStyle"
        />
        <datalist id="fontStyle">
          <option value="normal" />
          <option value="italic" />
          <option value="oblique" />
          <option value="initial" />
          <option value="inherit" />
        </datalist>
      </div>

      <div> color</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.color}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "color",
              nextsubtype: "",
              e,
            })
          }
          list="color"
        />
        <datalist id="color">
          <option value="white" />
          <option value="black" />
        </datalist>
        <input
          type="color"
          style={{ width: "100%" }}
          defaultValue={metadata.style.color}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "color",
              nextsubtype: "",
              e,
            })
          }
        />
      </div>

      <div> paddingH</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "paddingH",
              nextsubtype: "",
              e,
            })
          }
          defaultValue={metadata.style.paddingH}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingLeft</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "paddingLeft",
              nextsubtype: "",
              e,
            })
          }
          defaultValue={metadata.style.paddingLeft}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingRight</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "paddingRight",
              nextsubtype: "",
              e,
            })
          }
          defaultValue={metadata.style.paddingRight}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> paddingV</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "paddingV",
              nextsubtype: "",
              e,
            })
          }
          defaultValue={metadata.style.paddingTop}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> marginH</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "marginH",
              nextsubtype: "",
              e,
            })
          }
          defaultValue={metadata.style.marginLeft}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> marginV</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="padding"
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "marginV",
              nextsubtype: "",
              e,
            })
          }
          defaultValue={metadata.style.marginTop}
        />
        <datalist id="padding">
          <option value="10px" />
          <option value="20px" />
        </datalist>
      </div>

      <div> borderstyle</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="borderstyle"
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "borderstyle",
              nextsubtype: "",
              e,
            })
          }
          defaultValue={metadata.style.border}
        />
        <datalist id="borderstyle">
          <option value="circle" />
          <option value="square" />
          <option value="2px solid grey" />
        </datalist>
      </div>

      <div> borderRadius</div>
      <div>
        <input
          style={{ width: "100%" }}
          list="borderRadius"
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "borderRadius",
              nextsubtype: "",
              e,
            })
          }
          defaultValue={metadata.style.borderRadius}
        />
        <datalist id="borderRadius">
          <option value="5%" />
          <option value="10%" />
          <option value="25%" />
          <option value="50%" />
        </datalist>
      </div>
    </div>
  );
}

function Flexstylepropshtml(props) {
  let { metadata, handleChange } = props;

  return (
    <div>
      <div>display</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.display}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "display",
              nextsubtype: "",
              e,
            })
          }
          list="display"
        />
        <datalist id="display">
          <option value="flex" />
          <option value="inline-block" />
          <option value="block" />
          <option value="inline" />
        </datalist>
      </div>

      <div>flexDirection</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.flexDirection}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "flexDirection",
              nextsubtype: "",
              e,
            })
          }
          list="flexDirection"
        />
        <datalist id="flexDirection">
          <option value="row" />
          <option value="column" />
        </datalist>
      </div>

      <div>justifyContent</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.justifyContent}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "justifyContent",
              nextsubtype: "",
              e,
            })
          }
          list="justifyContent"
        />
        <datalist id="justifyContent">
          <option value="flex-start" />
          <option value="flex-end" />
          <option value="space-between" />
        </datalist>
      </div>

      <div>alignItems</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.alignItems}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "alignItems",
              nextsubtype: "",
              e,
            })
          }
          list="alignItems"
        />
        <datalist id="alignItems">
          <option value="flex-start" />
          <option value="flex-end" />
          <option value="space-between" />
        </datalist>
      </div>
    </div>
  );
}

function Backgroundstylepropshtml(props) {
  let { metadata, handleChange } = props;

  return (
    <div>
      <div>color</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.backgroundColor}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "backgroundColor",
              nextsubtype: "",
              e,
            })
          }
          list="backgroundColor"
        />
        <datalist id="backgroundColor">
          <option value="white" />
          <option value="black" />
        </datalist>
        <input
          type="color"
          style={{ width: "100%" }}
          defaultValue={metadata.style.backgroundColor}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "backgroundColor",
              nextsubtype: "",
              e,
            })
          }
        />
      </div>

      <div>Image</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.backgroundImage}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "backgroundImage",
              nextsubtype: "",
              e,
            })
          }
        />
      </div>

      <div>ImageRepeat</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.backgroundRepeat}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "backgroundRepeat",
              nextsubtype: "",
              e,
            })
          }
          list="backgroundRepeat"
        />
        <datalist id="backgroundRepeat">
          <option value="repeat" />
          <option value="no-repeat" />
        </datalist>
      </div>

      <div>Size</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.style.backgroundSize}
          onChange={(e) =>
            handleChange({
              type: "style",
              subtype: "backgroundSize",
              nextsubtype: "",
              e,
            })
          }
          list="backgroundSize"
        />
        <datalist id="backgroundSize">
          <option value="100%" />
          <option value="cover" />
          <option value="contain" />
        </datalist>
      </div>
    </div>
  );
}

///////////////

function Recordlistdatapropshtml(props) {
  let { metadata, handleChange } = props;

  return (
    <div>
      <div>headingtext</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.headingtext}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "headingtext",
              nextsubtype: "",
              e,
            })
          }
          list="headingtext"
        />
        <datalist id="headingtext"></datalist>
      </div>
      <div>Orientation</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.orientation}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "orientation",
              nextsubtype: "",
              e,
            })
          }
          list="orientation"
        />
        <datalist id="orientation">
          <option value="withtoptabpanel" />
          <option value="withbottomtabpanel" />
          <option value="withlefttabpanel" />
          <option value="withrighttabpanel" />
          <option value="withouttabpanel" />
          <option value="listitem" />
        </datalist>
      </div>
      <div>listbuttonpanelsectionwidth</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.listbuttonpanelsectionwidth}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "listbuttonpanelsectionwidth",
              nextsubtype: "",
              e,
            })
          }
          list="listbuttonpanelsectionwidth"
        />
        <datalist id="listbuttonpanelsectionwidth">
          <option value="25%" />
          <option value="33%" />
          <option value="50%" />
          <option value="100%" />
        </datalist>
      </div>
      <div>listitemwidth</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.listitemwidth}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "listitemwidth",
              nextsubtype: "",
              e,
            })
          }
          list="listitemwidth"
        />
        <datalist id="listitemwidth">
          <option value="25%" />
          <option value="33%" />
          <option value="50%" />
          <option value="100%" />
        </datalist>
      </div>
      <div>searchpanelsectionwidth</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.searchpanelsectionwidth}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "searchpanelsectionwidth",
              nextsubtype: "",
              e,
            })
          }
          list="searchpanelsectionwidth"
        />
        <datalist id="searchpanelsectionwidth">
          <option value="25%" />
          <option value="33%" />
          <option value="50%" />
          <option value="100%" />
        </datalist>
      </div>
      <div>searchpanelbuttonsectionwidth</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.searchpanelbuttonsectionwidth}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "searchpanelbuttonsectionwidth",
              nextsubtype: "",
              e,
            })
          }
          list="searchpanelbuttonsectionwidth"
        />
        <datalist id="searchpanelbuttonsectionwidth">
          <option value="25%" />
          <option value="33%" />
          <option value="50%" />
          <option value="100%" />
        </datalist>
      </div>
      <div>highlightpanelsectionwidth</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.highlightpanelsectionwidth}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "highlightpanelsectionwidth",
              nextsubtype: "",
              e,
            })
          }
          list="highlightpanelsectionwidth"
        />
        <datalist id="highlightpanelsectionwidth">
          <option value="25%" />
          <option value="33%" />
          <option value="50%" />
          <option value="100%" />
        </datalist>
      </div>
      <div>highlightpanelbuttonsectionwidth</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.highlightpanelbuttonsectionwidth}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "highlightpanelbuttonsectionwidth",
              nextsubtype: "",
              e,
            })
          }
          list="highlightpanelbuttonsectionwidth"
        />
        <datalist id="highlightpanelbuttonsectionwidth">
          <option value="25%" />
          <option value="33%" />
          <option value="50%" />
          <option value="100%" />
        </datalist>
      </div>
      <div>tabpanellabelsectionwidth</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.tabpanellabelsectionwidth}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "tabpanellabelsectionwidth",
              nextsubtype: "",
              e,
            })
          }
          list="tabpanellabelsectionwidth"
        />
        <datalist id="tabpanellabelsectionwidth">
          <option value="25%" />
          <option value="33%" />
          <option value="50%" />
          <option value="100%" />
        </datalist>
      </div>
      <div>tabpanelcontentsectionwidth</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.tabpanelcontentsectionwidth}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "tabpanelcontentsectionwidth",
              nextsubtype: "",
              e,
            })
          }
          list="tabpanelcontentsectionwidth"
        />
        <datalist id="tabpanelcontentsectionwidth">
          <option value="25%" />
          <option value="33%" />
          <option value="50%" />
          <option value="100%" />
        </datalist>
      </div>
      <div>detailpanelsectionwidth</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.detailpanelsectionwidth}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "detailpanelsectionwidth",
              nextsubtype: "",
              e,
            })
          }
          list="detailpanelsectionwidth"
        />
        <datalist id="detailpanelsectionwidth">
          <option value="25%" />
          <option value="33%" />
          <option value="50%" />
          <option value="100%" />
        </datalist>
      </div>
      <div>dbuifilterpanelsectionwidth</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.dbuifilterpanelsectionwidth}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbuifilterpanelsectionwidth",
              nextsubtype: "",
              e,
            })
          }
          list="dbuifilterpanelsectionwidth"
        />
        <datalist id="dbuifilterpanelsectionwidth">
          <option value="25%" />
          <option value="33%" />
          <option value="50%" />
          <option value="100%" />
        </datalist>
      </div>
      <div>dbuisortpanelsectionwidth</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.dbuisortpanelsectionwidth}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbuisortpanelsectionwidth",
              nextsubtype: "",
              e,
            })
          }
          list="dbuisortpanelsectionwidth"
        />
        <datalist id="dbuisortpanelsectionwidth">
          <option value="25%" />
          <option value="33%" />
          <option value="50%" />
          <option value="100%" />
        </datalist>
      </div>
      <div>dbshowfilterpanel</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.dbshowfilterpanel}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbshowfilterpanel",
              nextsubtype: "",
              e,
            })
          }
          list="dbshowfilterpanel"
        />
        <datalist id="dbshowfilterpanel">
          <option value="true" />
          <option value="false" />
        </datalist>
      </div>
      <div>dbshowsortpanel</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.dbshowsortpanel}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbshowsortpanel",
              nextsubtype: "",
              e,
            })
          }
          list="dbshowsortpanel"
        />
        <datalist id="dbshowsortpanel">
          <option value="true" />
          <option value="false" />
        </datalist>
      </div>
      1234
      <div>dbisgroupbyrangecolumndata</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.dbisgroupbyrangecolumndata}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbisgroupbyrangecolumndata",
              nextsubtype: "",
              e,
            })
          }
          list="dbisgroupbyrangecolumndata"
        />
        <datalist id="dbisgroupbyrangecolumndata">
          <option value="true" />
          <option value="false" />
        </datalist>
      </div>
      <div>dbgroupbyrangecolumndatashowrangevaluelist</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={
            metadata.items.dbgroupbyrangecolumndatashowrangevaluelist
          }
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbgroupbyrangecolumndatashowrangevaluelist",
              nextsubtype: "",
              e,
            })
          }
          list="dbgroupbyrangecolumndatashowrangevaluelist"
        />
        <datalist id="dbgroupbyrangecolumndatashowrangevaluelist">
          <option value="1,10,100,1000" />
        </datalist>
      </div>
      <div>dbgroupbyrangecolumndataheading</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.dbgroupbyrangecolumndataheading}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbgroupbyrangecolumndataheading",
              nextsubtype: "",
              e,
            })
          }
          list="dbgroupbyrangecolumndataheading"
        />
        <datalist id="dbgroupbyrangecolumndataheading">
          <option value="true" />
          <option value="false" />
        </datalist>
      </div>
      <div>dbgroupbyrangecolumndatatablename</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.dbgroupbyrangecolumndatatablename}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbgroupbyrangecolumndatatablename",
              nextsubtype: "",
              e,
            })
          }
          list="dbgroupbyrangecolumndatatablename"
        />
        <datalist id="dbgroupbyrangecolumndatatablename">
          <option value="true" />
          <option value="false" />
        </datalist>
      </div>
      <div>dbgroupbyrangecolumndatatablecolumnname</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.dbgroupbyrangecolumndatatablecolumnname}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbgroupbyrangecolumndatatablecolumnname",
              nextsubtype: "",
              e,
            })
          }
          list="dbgroupbyrangecolumndatatablecolumnname"
        />
        <datalist id="dbgroupbyrangecolumndatatablecolumnname">
          <option value="true" />
          <option value="false" />
        </datalist>
      </div>
      <div>dbgroupbyrangecolumndatacurrenttablecolumnvalue</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={
            metadata.items.dbgroupbyrangecolumndatacurrenttablecolumnvalue
          }
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbgroupbyrangecolumndatacurrenttablecolumnvalue",
              nextsubtype: "",
              e,
            })
          }
          list="dbgroupbyrangecolumndatacurrenttablecolumnvalue"
        />
        <datalist id="dbgroupbyrangecolumndatacurrenttablecolumnvalue">
          <option value="true" />
          <option value="false" />
        </datalist>
      </div>
      <div>dbshowsearchpanel</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.dbshowsearchpanel}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbshowsearchpanel",
              nextsubtype: "",
              e,
            })
          }
          list="dbshowsearchpanel"
        />
        <datalist id="dbshowsearchpanel">
          <option value="true" />
          <option value="false" />
        </datalist>
      </div>
      <div>dbuisearchpanelsectionwidth</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.dbuisearchpanelsectionwidth}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbuisearchpanelsectionwidth",
              nextsubtype: "",
              e,
            })
          }
          list="dbuisearchpanelsectionwidth"
        />
        <datalist id="dbuisearchpanelsectionwidth">
          <option value="25%" />
          <option value="33%" />
          <option value="50%" />
          <option value="100%" />
        </datalist>
      </div>
      <div>dbuisearchpaneltablename</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.dbuisearchpaneltablename}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbuisearchpaneltablename",
              nextsubtype: "",
              e,
            })
          }
          list="dbuisearchpaneltablename"
        />
        <datalist id="dbuisearchpaneltablename">
          <option value="searchcolumnrecorddata" />
          <option value="hashtaggedcolumnrecorddata" />
        </datalist>
      </div>
      <div>dbuisearchpanelidbeginswith</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.dbuisearchpanelidbeginswith}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "dbuisearchpanelidbeginswith",
              nextsubtype: "",
              e,
            })
          }
          list="dbuisearchpanelidbeginswith"
        />
        <datalist id="dbuisearchpanelidbeginswith">
          <option value="25%" />
        </datalist>
      </div>
    </div>
  );
}

function TemplateareaitemIsfromDatabasepropshtml(props) {
  let { metadata, handleChange } = props;

  return (
    <div>
      <div>isdatafromlocalcomponent</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.isdatafromlocalcomponent}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "isdatafromlocalcomponent",
              nextsubtype: "",
              e,
            })
          }
          list="isdatafromlocalcomponent"
        />
        <datalist id="isdatafromlocalcomponent">
          <option value="true" />
          <option value="false" />
        </datalist>
      </div>

      <div>isdatafromserver</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.isdatafromserver}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "isdatafromserver",
              nextsubtype: "",
              e,
            })
          }
          list="isdatafromserver"
        />
        <datalist id="isdatafromserver">
          <option value="true" />
          <option value="false" />
        </datalist>
      </div>

      <div>datafromserverselectlisttablequerydefaultname</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={
            metadata.items.datafromserverselectlisttablequerydefaultname
          }
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "datafromserverselectlisttablequerydefaultname",
              nextsubtype: "",
              e,
            })
          }
          list="datafromserverselectlisttablequerydefaultname"
        />
        <datalist id="datafromserverselectlisttablequerydefaultname"></datalist>
      </div>

      <div>datafromserverselectlisttablequerybeginswith</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={
            metadata.items.datafromserverselectlisttablequerybeginswith
          }
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "datafromserverselectlisttablequerybeginswith",
              nextsubtype: "",
              e,
            })
          }
          list="datafromserverselectlisttablequerybeginswith"
        />
        <datalist id="datafromserverselectlisttablequerybeginswith"></datalist>
      </div>

      <div>islayoutmetadatafromserver</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.islayoutmetadatafromserver}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "islayoutmetadatafromserver",
              nextsubtype: "",
              e,
            })
          }
          list="islayoutmetadatafromserver"
        />
        <datalist id="islayoutmetadatafromserver">
          <option value="true" />
          <option value="false" />
        </datalist>
      </div>

      <div>layoutmetadatafromservertablename</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.layoutmetadatafromservertablename}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "layoutmetadatafromservertablename",
              nextsubtype: "",
              e,
            })
          }
          list="layoutmetadatafromservertablename"
        />
        <datalist id="layoutmetadatafromservertablename">
          <option value="list" />
          <option value="record" />
        </datalist>
      </div>

      <div>layoutmetadatafromservertype</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.layoutmetadatafromservertype}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "layoutmetadatafromservertype",
              nextsubtype: "",
              e,
            })
          }
          list="layoutmetadatafromservertype"
        />
        <datalist id="layoutmetadatafromservertype">
          <option value="list" />
          <option value="new" />
          <option value="edit" />
          <option value="view" />
        </datalist>
      </div>

      <div>layoutmetadatafromserversubtype</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.items.layoutmetadatafromserversubtype}
          onChange={(e) =>
            handleChange({
              type: "items",
              subtype: "layoutmetadatafromserversubtype",
              nextsubtype: "",
              e,
            })
          }
          list="layoutmetadatafromserversubtype"
        />
        <datalist id="layoutmetadatafromserversubtype"></datalist>
      </div>
    </div>
  );
}

function TemplateareaitemsectioncolumnuivaluefromDatabasepropshtml(props) {
  let { metadata, handleChange } = props;

  return (
    <div>
      <div>uivaluefromdatabasetablename</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.uivaluefromdatabasetablename}
          onChange={(e) =>
            handleChange({
              type: "uivaluefromdatabasetablename",
              subtype: "",
              nextsubtype: "",
              e,
            })
          }
        />
      </div>

      <div>uivaluefromdatabasetablecolumnname</div>
      <div>
        <input
          style={{ width: "100%" }}
          defaultValue={metadata.uivaluefromdatabasetablecolumnname}
          onChange={(e) =>
            handleChange({
              type: "uivaluefromdatabasetablecolumnname",
              subtype: "",
              nextsubtype: "",
              e,
            })
          }
        />
      </div>
    </div>
  );
}

function Popularstyleshtml(methodprops) {
  let mainpanelHtml = [];
  let popularstylesitemhtml = [];
  let { metadata, handleChange } = methodprops;

  let popularstyles = {};
  if (metadata.type === "cardtemplateareaitem") {
    popularstyles = JSON.parse(
      JSON.stringify(popularstylesjs[metadata.items.cardtemplateareaitemtype])
    );
  } else {
    popularstyles = JSON.parse(JSON.stringify(popularstylesjs[metadata.type]));
  }

  //popular style html
  for (let i in popularstyles) {
    if (
      metadata.type === "text" ||
      metadata.type === "icon" ||
      metadata.type === "image" ||
      metadata.type === "button"
    ) {
      mainpanelHtml.push(
        <div
          onClick={(e) =>
            handleChange({
              type: "setpopularstyle",
              value: popularstyles[i],
            })
          }
          style={{
            backgroundColor: "white",
            padding: "10px",
            border: "2px solid grey",
          }}
        >
          <Alltypecomp
            sitestatedata={{}}
            draggable={false}
            metadata={popularstyles[i]}
            modetype="normal"
            parenthandleClick={() => { }}
            parenthandleChange={() => { }}
          />
        </div>
      );
    } else {
      mainpanelHtml.push(
        <div
          onClick={(e) =>
            handleChange({
              type: "setpopularstyle",
              value: popularstyles[i],
            })
          }
          style={{
            backgroundColor: "white",
            padding: "10px",
            border: "2px solid grey",
          }}
        >
          <Alltypetemplateareaitemcomp
            isparenttablelayoutmetadatafield="false"
            parentalltypecompstatedata={{}}
            sitestatedata={{}}
            templatemetadata={popularstyles[i]}
            modetype="normal"
            draggable={false}
            parenthandleClick={() => { }}
            parenthandleChange={() => { }}
          />
        </div>
      );
    }
  }

  return mainpanelHtml;
}

//////////////

export function Editpropscomp(props) {
  // alltypecompconsolelog(props);
  // Declare a new state variable, which we'll call "count"
  const [compstate, setCompstate] = useState({
    showpopular: false,
    showpropstype: "showstyleprops",
    metadata: JSON.parse(JSON.stringify(props.metadata)),
  });

  let handleChange = (methodprops) => {
    alltypecompconsolelog("Editpropscomp-handleChange");
    alltypecompconsolelog(methodprops);
    let { e, type, subtype, nextsubtype, action, actionparam } = methodprops;
    let metadata = compstate.metadata;
    let { showpropstype } = compstate;
    let onclickchangevar = "";
    if (showpropstype === "showclickprops") {
      onclickchangevar = "onclick";
    }
    if (showpropstype === "showchangeprops") {
      onclickchangevar = "onchange";
    }
    if (showpropstype === "showbeforeafterloadprops") {
      onclickchangevar = "onbeforeafterload";
    }

    if (metadata.style === undefined || metadata.style === "") {
      metadata.style = {};
    }

    alltypecompconsolelog(metadata);

    if (nextsubtype === "toname") {
      compstate.toname = e.target.value;
    } else if (nextsubtype === "tovalue") {
      compstate.tovalue = e.target.value;
    } else if (type === "assigncolumnsdata") {
      for (
        let i = 0;
        i < metadata[onclickchangevar].modifydatabasedata.length;
        i++
      ) {
        if (i === compstate.modifydatabasedataassigncolumnsdataselectcolumn) {
          let existingcolumnsdata =
            compstate.metadata[onclickchangevar].modifydatabasedata[i]
              .assigncolumnsdata;

          if (nextsubtype === "addcolumn") {
            if (existingcolumnsdata === undefined || existingcolumnsdata === "") {
              existingcolumnsdata = { samplecolumnname: {} };
              existingcolumnsdata.samplecolumnname["tovalue"] = "";
              compstate.metadata[onclickchangevar].modifydatabasedata[
                i
              ].assigncolumnsdata = existingcolumnsdata;
            } else {
              existingcolumnsdata.samplecolumnname = {};
              existingcolumnsdata.samplecolumnname["tovalue"] = "";
              compstate.metadata[onclickchangevar].modifydatabasedata[
                i
              ].assigncolumnsdata = existingcolumnsdata;
            }

            props.parenthandleClick({
              type: "draftsavefromeditpropscomp",
              metadata: compstate.metadata,
            });
          }
          if (nextsubtype === "deletecolumn") {
            delete compstate.metadata[onclickchangevar].modifydatabasedata[i]
              .assigncolumnsdata[subtype];
            props.parenthandleClick({
              type: "draftsavefromeditpropscomp",
              metadata: compstate.metadata,
            });
          }

          if (nextsubtype === "updatecolumn") {
            delete compstate.metadata[onclickchangevar].modifydatabasedata[i]
              .assigncolumnsdata[compstate.assigncolumnsdataselectcolumn];
            compstate.metadata[onclickchangevar].modifydatabasedata[
              i
            ].assigncolumnsdata[compstate.toname] = {
              tovalue: compstate.tovalue,
            };

            props.parenthandleClick({
              type: "draftsavefromeditpropscompandrefreshui",
              metadata: compstate.metadata,
            });
          }
        }
      }

      alltypecompconsolelog(compstate);
    } else if (type === "updatestatedata") {
      let existingcolumnsdata =
        compstate.metadata[onclickchangevar].updatestatedata;
      if (nextsubtype === "addcolumn") {
        if (existingcolumnsdata === undefined || existingcolumnsdata === "") {
          existingcolumnsdata = { samplecolumnname: {} };
          existingcolumnsdata.samplecolumnname["tovalue"] = "";
          compstate.metadata[onclickchangevar].updatestatedata =
            existingcolumnsdata;
        } else {
          existingcolumnsdata.samplecolumnname = {};
          existingcolumnsdata.samplecolumnname["tovalue"] = "";
          compstate.metadata[onclickchangevar].updatestatedata =
            existingcolumnsdata;
        }

        //  setCompstate(compstate);
        props.parenthandleClick({
          type: "draftsavefromeditpropscomp",
          metadata: compstate.metadata,
        });
      }
      if (nextsubtype === "deletecolumn") {
        delete compstate.metadata[onclickchangevar].updatestatedata[subtype];
        props.parenthandleClick({
          type: "draftsavefromeditpropscomp",
          metadata: compstate.metadata,
        });
      }

      if (nextsubtype === "updatecolumn") {
        delete compstate.metadata[onclickchangevar].updatestatedata[
          compstate.updatestatedataselectcolumn
        ];
        compstate.metadata[onclickchangevar].updatestatedata[compstate.toname] =
        {
          tovalue: compstate.tovalue,
        };

        props.parenthandleClick({
          type: "draftsavefromeditpropscompandrefreshui",
          metadata: compstate.metadata,
        });
      }

      alltypecompconsolelog(compstate);
    } else if (type === "modifydatabasedata") {
      let existingmodifydatabasedata =
        compstate.metadata[onclickchangevar].modifydatabasedata;
      if (nextsubtype === "addcolumn") {
        if (
          existingmodifydatabasedata === undefined ||
          existingmodifydatabasedata === ""
        ) {
          existingmodifydatabasedata = [];
          existingmodifydatabasedata.push({
            type: "insert",
            tablename: "dbuser",
            initialassignmentarraytype: "",
            initialassignmentarraysubtype: "",
            deletewithquerybeginswith: "",
            assigncolumnsdata: {},
          });
          compstate.metadata[onclickchangevar].modifydatabasedata =
            existingmodifydatabasedata;
        } else {
          existingmodifydatabasedata =
            compstate.metadata[onclickchangevar].modifydatabasedata;
          existingmodifydatabasedata.push({
            type: "insert",
            tablename: "dbuser",
            initialassignmentarraytype: "",
            initialassignmentarraysubtype: "",
            deletewithquerybeginswith: "",
            assigncolumnsdata: {},
          });
          compstate.metadata[onclickchangevar].modifydatabasedata =
            existingmodifydatabasedata;
        }

        //  setCompstate(compstate);
        props.parenthandleClick({
          type: "draftsavefromeditpropscomp",
          metadata: compstate.metadata,
        });
      } else if (nextsubtype === "deletecolumn") {
        let newmodifydatabasedata = [];
        for (
          let i = 0;
          i < compstate.metadata[onclickchangevar].modifydatabasedata.length;
          i++
        ) {
          if (i !== subtype) {
            newmodifydatabasedata.push(
              compstate.metadata[onclickchangevar].modifydatabasedata[i]
            );
          }
        }
        compstate.metadata[onclickchangevar].modifydatabasedata =
          newmodifydatabasedata;
        props.parenthandleClick({
          type: "draftsavefromeditpropscomp",
          metadata: compstate.metadata,
        });
      } else if (nextsubtype === "updatecolumn") {
        let newmodifydatabasedata = [];
        for (
          let i = 0;
          i < compstate.metadata[onclickchangevar].modifydatabasedata.length;
          i++
        ) {
          if (i !== compstate.modifydatabasedataselectcolumn) {
            newmodifydatabasedata.push(
              compstate.metadata[onclickchangevar].modifydatabasedata[i]
            );
          } else {
            newmodifydatabasedata.push({
              type: compstate.modifydatabasedatatype,
              tablename: compstate.modifydatabasedatatablename,
              initialassignmentarraytype:
                compstate.modifydatabasedatainitialassignmentarraytype,
              initialassignmentarraysubtype:
                compstate.modifydatabasedatainitialassignmentarraysubtype,
              deletewithquerybeginswith:
                compstate.modifydatabasedatadeletewithquerybeginswith,
            });
          }
        }

        compstate.metadata[onclickchangevar].modifydatabasedata =
          newmodifydatabasedata;
        props.parenthandleClick({
          type: "draftsavefromeditpropscompandrefreshui",
          metadata: compstate.metadata,
        });
      } else if (nextsubtype === "modifydatabasedataselectcolumn") {
        compstate[nextsubtype] = subtype;
        for (
          let i = 0;
          i < compstate.metadata[onclickchangevar].modifydatabasedata.length;
          i++
        ) {
          if (i === subtype) {
            compstate.modifydatabasedatatype =
              compstate.metadata[onclickchangevar].modifydatabasedata[i].type;
            compstate.modifydatabasedatatablename =
              compstate.metadata[onclickchangevar].modifydatabasedata[
                i
              ].tablename;
            compstate.modifydatabasedatainitialassignmentarraytype =
              compstate.metadata[onclickchangevar].modifydatabasedata[
                i
              ].initialassignmentarraytype;
            compstate.modifydatabasedatainitialassignmentarraysubtype =
              compstate.metadata[onclickchangevar].modifydatabasedata[
                i
              ].initialassignmentarraysubtype;
            compstate.modifydatabasedatadeletewithquerybeginswith =
              compstate.metadata[onclickchangevar].modifydatabasedata[
                i
              ].deletewithquerybeginswith;
          }
        }
        setCompstate(compstate);
      } else if (
        nextsubtype === "modifydatabasedataassigncolumnsdataselectcolumn"
      ) {
        compstate[nextsubtype] = subtype;
        setCompstate(compstate);
      } else {
        compstate[nextsubtype] = e.target.value;
      }

      alltypecompconsolelog(compstate);
    } else if (
      type === "addquerypaneltabelcolumnvalue" &&
      metadata.inputoutputfieldprops.querypaneltabelcolumnvaluetype !== "" &&
      metadata.inputoutputfieldprops.querypaneltabelcolumnvaluetype !==
      undefined &&
      metadata.inputoutputfieldprops.querypaneltabelcolumnvaluetypefield !==
      "" &&
      metadata.inputoutputfieldprops.querypaneltabelcolumnvaluetypefield !==
      undefined
    ) {
      if (
        metadata.inputoutputfieldprops.querypaneltabelcolumnvalue === undefined
      ) {
        metadata.inputoutputfieldprops.querypaneltabelcolumnvalue = "";
      }
      metadata.inputoutputfieldprops.querypaneltabelcolumnvalue =
        metadata.inputoutputfieldprops.querypaneltabelcolumnvalue +
        "{" +
        metadata.inputoutputfieldprops.querypaneltabelcolumnvaluetype +
        "." +
        metadata.inputoutputfieldprops.querypaneltabelcolumnvaluetypefield +
        "}";
      delete metadata.inputoutputfieldprops.querypaneltabelcolumnvaluetype;
      delete metadata.inputoutputfieldprops.querypaneltabelcolumnvaluetypefield;
    } else if (type === "favouritename") {
      compstate.favouritename = e.target.value;
      setCompstate(compstate);
    } else if (
      type === "addtolayouttype" ||
      type === "addtolayouttablename" ||
      type === "addtolayoutname" ||
      type === "addtolayoutprofileid"
    ) {
      compstate[type] = e.target.value;
      setCompstate(compstate);
    } else if (type === "onclick") {
      if (metadata.onclick === undefined || metadata.onclick === "") {
        metadata.onclick = {};
      }
      metadata.onclick[subtype] = e.target.value;
      if (subtype === "type" && e.target.value === "openselect") {
        let popupmetadata =
          templateareaitemDragpanelmetadataInitMap[
          "quicklinkscardtemplateareaitem"
          ];
        metadata.onclick["popupmetadatatype"] =
          "quicklinkscardtemplateareaitem";
        metadata.onclick["popupmetadata"] = popupmetadata;
        metadata.onclick["popupside"] = "dropdown";
      }
      if (subtype === "popupmetadatatype") {
        let popupmetadata =
          templateareaitemDragpanelmetadataInitMap[e.target.value];
        metadata.onclick["popupmetadata"] = popupmetadata;
      }
    } else if (type === "onchange") {
      if (metadata.onchange) {
        metadata.onchange[subtype] = e.target.value;
      } else {
        metadata.onchange = {};
        metadata.onchange[subtype] = e.target.value;
      }
    } else if (type === "onbeforeafterload") {
      if (
        metadata.onbeforeafterload === undefined ||
        metadata.onbeforeafterload === ""
      ) {
        metadata.onbeforeafterload = {};
      }
      metadata.onbeforeafterload[subtype] = e.target.value;
      if (subtype === "type" && e.target.value === "openselect") {
        let popupmetadata =
          templateareaitemDragpanelmetadataInitMap[
          "quicklinkscardtemplateareaitem"
          ];
        metadata.onbeforeafterload["popupmetadatatype"] =
          "quicklinkscardtemplateareaitem";
        metadata.onbeforeafterload["popupmetadata"] = popupmetadata;
        metadata.onbeforeafterload["popupside"] = "dropdown";
      }
      if (subtype === "popupmetadatatype") {
        let popupmetadata =
          templateareaitemDragpanelmetadataInitMap[e.target.value];
        metadata.onbeforeafterload["popupmetadata"] = popupmetadata;
      }
    } else if (type === "setpopularstyle") {
      metadata.type = methodprops.value.type;
      metadata.style = methodprops.value.style;
      metadata.innerText = methodprops.value.innerText;
      metadata.innerTextstyle = methodprops.value.innerTextstyle;
      metadata.overtext = methodprops.value.overtext;
      metadata.imgicon = methodprops.value.imgicon;
      metadata.inputoutputfieldprops = methodprops.value.inputoutputfieldprops;
      metadata.items = methodprops.value.items;
    } else if (type === "innerText") {
      metadata.innerText = e.target.value;
    } else if (type === "name") {
      metadata.name = e.target.value;
    } else if (type === "type") {
      // metadata.type = e.target.value;
      let typechangemetadataInit = {};
      if (e.target.value === "text") {
        typechangemetadataInit = textmetadataBasic;
      }
      if (e.target.value === "button") {
        typechangemetadataInit = buttonmetadataBasic;
      }
      if (e.target.value === "icon") {
        typechangemetadataInit = iconmetadataBasic;
      }
      if (e.target.value === "image") {
        typechangemetadataInit = imagemetadataBasic;
      }
      if (e.target.value === "inputoutputfield") {
        typechangemetadataInit = inputoutputfieldmetadataInit;
      }
      if (e.target.value === "inputoutputfieldquerypaneltabelname") {
        typechangemetadataInit =
          inputoutputfieldmetadataInitquerypaneltabelname;
      }
      if (e.target.value === "inputoutputfieldquerypaneltabelcolumnsort") {
        typechangemetadataInit =
          inputoutputfieldmetadataInitquerypaneltabelcolumnsort;
      }
      if (e.target.value === "inputoutputfieldquerypaneltabelcolumnquery") {
        typechangemetadataInit =
          inputoutputfieldmetadataInitquerypaneltabelcolumnquery;
      }
      if (e.target.value === "inputoutputfieldquerypaneltabelcolumnfilter") {
        typechangemetadataInit =
          inputoutputfieldmetadataInitquerypaneltabelcolumnfilter;
      }
      if (e.target.value === "inputoutputfieldtablelayoutmetadata") {
        typechangemetadataInit = inputoutputfieldmetadataInittablelayoutmetdata;
      }

      if (e.target.value === "inputoutputfieldtablequerymetadata") {
        typechangemetadataInit = inputoutputfieldmetadataInittablequerymetdata;
      }

      if (e.target.value === "inputoutputfieldtablebuttonmetadata") {
        typechangemetadataInit =
          inputoutputfieldmetadataInittablebuttonmetadata;
      }

      if (e.target.value === "inputoutputfieldtablecolumnmetadata") {
        typechangemetadataInit =
          inputoutputfieldmetadataInittablecolumnmetadata;
      }

      if (typechangemetadataInit.type && typechangemetadataInit.type !== "") {
        metadata.type = typechangemetadataInit.type;
        metadata.style = typechangemetadataInit.style;
        metadata.innerText = typechangemetadataInit.innerText;
        metadata.innerTextstyle = typechangemetadataInit.innerTextstyle;
        metadata.overtext = typechangemetadataInit.overtext;
        metadata.imgicon = typechangemetadataInit.imgicon;
        metadata.inputoutputfieldprops =
          typechangemetadataInit.inputoutputfieldprops;

        alltypecompconsolelog(metadata);
      }
    } else if (type === "templateareaitemtype") {
      let rettemplateareaitem =
        templateareaitemDragpanelmetadataInitMap[e.target.value];

      if (rettemplateareaitem.type && rettemplateareaitem.type !== "") {
        metadata.items = rettemplateareaitem.items;
        metadata.style = rettemplateareaitem.style;
        metadata.type = rettemplateareaitem.type;
      }
    } else if (type === "overtext" && subtype === "innerText") {
      metadata.overtext.innerText = e.target.value;
    } else if (
      type === "overtext" &&
      subtype === "style" &&
      nextsubtype === "borderstyle"
    ) {
      if (e.target.value === "circle") {
        metadata.overtext.style.border = "2px solid grey";
        metadata.overtext.style.borderRadius = "50%";
      } else if (e.target.value === "square") {
        metadata.overtext.style.border = "2px solid grey";
        metadata.overtext.style.borderRadius = "";
      } else {
        metadata.overtext.style.border = e.target.value;
        metadata.overtext.style.borderRadius = "";
      }
    } else if (
      type === "overtext" &&
      subtype === "style" &&
      nextsubtype === "paddingH"
    ) {
      metadata.overtext.style.paddingLeft = e.target.value;
      metadata.overtext.style.paddingRight = e.target.value;
    } else if (
      type === "overtext" &&
      subtype === "style" &&
      (nextsubtype === "paddingLeft" || nextsubtype === "paddingRight")
    ) {
      metadata.overtext.style[nextsubtype] = e.target.value;
    } else if (
      type === "overtext" &&
      subtype === "style" &&
      nextsubtype === "paddingV"
    ) {
      metadata.overtext.style.paddingTop = e.target.value;
      metadata.overtext.style.paddingBottom = e.target.value;
    } else if (type === "overtext" && subtype === "style") {
      metadata.overtext.style[nextsubtype] = e.target.value;
    } else if (type === "overtext" && subtype !== "style") {
      if (subtype === "name") {
        metadata.overtext["class"] = "fa fa-" + e.target.value;
      }
      metadata.overtext[subtype] = e.target.value;
    } else if (
      type === "imgicon" &&
      subtype === "style" &&
      nextsubtype === "borderstyle"
    ) {
      if (e.target.value === "circle") {
        metadata.imgicon.style.border = "2px solid grey";
        metadata.imgicon.style.borderRadius = "50%";
      } else if (e.target.value === "square") {
        metadata.imgicon.style.border = "2px solid grey";
        metadata.imgicon.style.borderRadius = "";
      } else {
        metadata.imgicon.style.border = e.target.value;
        metadata.imgicon.style.borderRadius = "";
      }
    } else if (
      type === "imgicon" &&
      subtype === "style" &&
      nextsubtype === "paddingH"
    ) {
      metadata.imgicon.style.paddingLeft = e.target.value;
      metadata.imgicon.style.paddingRight = e.target.value;
    } else if (
      type === "imgicon" &&
      subtype === "style" &&
      (nextsubtype === "paddingLeft" || nextsubtype === "paddingRight")
    ) {
      metadata.imgicon.style[nextsubtype] = e.target.value;
    } else if (
      type === "imgicon" &&
      subtype === "style" &&
      nextsubtype === "paddingV"
    ) {
      metadata.imgicon.style.paddingTop = e.target.value;
      metadata.imgicon.style.paddingBottom = e.target.value;
    } else if (type === "imgicon" && subtype === "style") {
      metadata.imgicon.style[nextsubtype] = e.target.value;
    } else if (type === "imgicon" && subtype !== "style") {
      if (subtype === "name") {
        metadata.imgicon["class"] = "fa fa-" + e.target.value;
      }
      metadata.imgicon[subtype] = e.target.value;
    } else if (type === "style" && subtype === "borderstyle") {
      if (e.target.value === "circle") {
        metadata.style.border = "2px solid grey";
        metadata.style.borderRadius = "50%";
      } else if (e.target.value === "square") {
        metadata.style.border = "2px solid grey";
        metadata.style.borderRadius = "";
      } else {
        metadata.style.border = e.target.value;
        metadata.style.borderRadius = "";
      }
    } else if (type === "style" && subtype === "backgroundImage") {
      metadata.style.backgroundImage = e.target.value;
      if (
        metadata.style.backgroundImage &&
        !metadata.style.backgroundImage.includes("url(")
      ) {
        metadata.style.backgroundImage = "url(" + e.target.value + ")";
      }
    } else if (type === "style" && subtype === "paddingH") {
      metadata.style.paddingLeft = e.target.value;
      metadata.style.paddingRight = e.target.value;
    } else if (
      type === "style" &&
      (subtype === "paddingLeft" || subtype === "paddingRight")
    ) {
      metadata.style[subtype] = e.target.value;
    } else if (type === "style" && subtype === "paddingV") {
      metadata.style.paddingTop = e.target.value;
      metadata.style.paddingBottom = e.target.value;
    } else if (type === "style" && subtype === "marginH") {
      metadata.style.marginLeft = e.target.value;
      metadata.style.marginRight = e.target.value;
    } else if (type === "style" && subtype === "marginV") {
      metadata.style.marginTop = e.target.value;
      metadata.style.marginBottom = e.target.value;
    } else if (type === "style") {
      metadata.style[subtype] = e.target.value;
    } else if (type === "innerTextstyle" && subtype === "borderstyle") {
      if (
        metadata.innerTextstyle === undefined ||
        metadata.innerTextstyle === ""
      ) {
        metadata.innerTextstyle = {};
      }
      if (e.target.value === "circle") {
        metadata.innerTextstyle.border = "2px solid grey";
        metadata.innerTextstyle.borderRadius = "50%";
      } else if (e.target.value === "square") {
        metadata.innerTextstyle.border = "2px solid grey";
        metadata.innerTextstyle.borderRadius = "";
      } else {
        metadata.innerTextstyle.border = e.target.value;
        metadata.innerTextstyle.borderRadius = "";
      }
    } else if (type === "innerTextstyle" && subtype === "backgroundImage") {
      if (
        metadata.innerTextstyle === undefined ||
        metadata.innerTextstyle === ""
      ) {
        metadata.innerTextstyle = {};
      }

      metadata.innerTextstyle.backgroundImage = e.target.value;
      if (
        metadata.innerTextstyle.backgroundImage &&
        !metadata.innerTextstyle.backgroundImage.includes("url(")
      ) {
        metadata.innerTextstyle.backgroundImage = "url(" + e.target.value + ")";
      }
    } else if (type === "innerTextstyle" && subtype === "paddingH") {
      if (
        metadata.innerTextstyle === undefined ||
        metadata.innerTextstyle === ""
      ) {
        metadata.innerTextstyle = {};
      }
      metadata.innerTextstyle.paddingLeft = e.target.value;
      metadata.innerTextstyle.paddingRight = e.target.value;
    } else if (
      type === "innerTextstyle" &&
      (subtype === "paddingLeft" || subtype === "paddingRight")
    ) {
      if (
        metadata.innerTextstyle === undefined ||
        metadata.innerTextstyle === ""
      ) {
        metadata.innerTextstyle = {};
      }
      metadata.innerTextstyle[subtype] = e.target.value;
    } else if (type === "innerTextstyle" && subtype === "paddingV") {
      if (
        metadata.innerTextstyle === undefined ||
        metadata.innerTextstyle === ""
      ) {
        metadata.innerTextstyle = {};
      }
      metadata.innerTextstyle.paddingTop = e.target.value;
      metadata.innerTextstyle.paddingBottom = e.target.value;
    } else if (type === "innerTextstyle") {
      if (
        metadata.innerTextstyle === undefined ||
        metadata.innerTextstyle === ""
      ) {
        metadata.innerTextstyle = {};
      }
      metadata.innerTextstyle[subtype] = e.target.value;
    } else if (type === "inputoutputfieldprops") {
      if (action === "editselectoptionvalue") {
        let selectoptions = metadata.inputoutputfieldprops["options"];
        let selectoptionsU = {};
        for (let i in selectoptions) {
          if (i === actionparam) {
            selectoptionsU[e.target.value] = selectoptions[i];
          } else {
            selectoptionsU[i] = selectoptions[i];
          }
        }

        metadata.inputoutputfieldprops["options"] = selectoptionsU;
      } else if (action === "editselectoptionlabel") {
        let selectoptions = metadata.inputoutputfieldprops["options"];
        let selectoptionsU = {};
        for (let i in selectoptions) {
          if (i === actionparam) {
            selectoptionsU[i] = e.target.value;
          } else {
            selectoptionsU[i] = selectoptions[i];
          }
        }
        metadata.inputoutputfieldprops["options"] = selectoptionsU;
      } else if (action === "deleteselectoption") {
        let selectoptions = metadata.inputoutputfieldprops["options"];
        let selectoptionsU = {};
        for (let i in selectoptions) {
          if (i !== actionparam) {
            selectoptionsU[i] = selectoptions[i];
          }
        }
        metadata.inputoutputfieldprops["options"] = selectoptionsU;
      } else if (action === "addselectoption") {
        let selectoptions = metadata.inputoutputfieldprops["options"];
        selectoptions["sample"] = "Sample";
        metadata.inputoutputfieldprops["options"] = selectoptions;
      } else {
        if (subtype === "querypaneltablename" && tablenameMap[e.target.value]) {
          metadata.inputoutputfieldprops["querypaneltablelabel"] =
            tablenameMap[e.target.value].label;
        }
        if (
          subtype === "querypaneltabelcolumnname" &&
          tablenameMap[metadata.inputoutputfieldprops.querypaneltablename]
        ) {
          // let tablefields =
          //   tablenameMap[metadata.inputoutputfieldprops.querypaneltablename]
          //     .fields;
          // metadata.inputoutputfieldprops["querypaneltabelcolumnlabel"] =
          //   tablefields[e.target.value].label;
        }
        if (subtype === "type" && e.target.value === "select") {
          metadata.inputoutputfieldprops["options"] = { sample: "Sample" };
        }
        if (subtype === "type" && e.target.value === "islinkedcolumn") {
          metadata.inputoutputfieldprops =
            inputoutputfieldmetadataInitislinkedcolumn.inputoutputfieldprops;
          metadata.onclick = inputoutputfieldmetadataInitislinkedcolumn.onclick;
        }
        metadata.inputoutputfieldprops[subtype] = e.target.value;
      }
    } else if (type === "items") {
      metadata.items[subtype] = e.target.value;
      if (
        subtype === "orientation" &&
        (e.target.value === "leftimage" || e.target.value === "rightimage")
      ) {
        metadata.items.textsectionwidth = "50%";
        metadata.items.imagesectionwidth = "50%";
      }
      if (
        subtype === "orientation" &&
        (e.target.value === "topimage" || e.target.value === "bottomimage")
      ) {
        metadata.items.textsectionwidth = "100%";
        metadata.items.imagesectionwidth = "100%";
      }
      if (
        metadata.type === "recordlisttemplateareaitem" &&
        subtype === "orientation" &&
        (e.target.value === "withlefttabpanel" ||
          e.target.value === "withrighttabpanel")
      ) {
        metadata.items.tabpanellabelsectionwidth = "20%";
        metadata.items.tabpanelcontentsectionwidth = "80%";
      }

      if (
        metadata.type === "recordlisttemplateareaitem" &&
        subtype === "orientation" &&
        (e.target.value === "withtoptabpanel" ||
          e.target.value === "withbottomtabpanel")
      ) {
        metadata.items.tabpanellabelsectionwidth = "100%";
        metadata.items.tabpanelcontentsectionwidth = "100%";
      }

      if (
        metadata.type === "recordlisttemplateareaitem" &&
        subtype === "orientation" &&
        e.target.value === "listitem"
      ) {
        metadata.items.searchpanelsectionwidth = "60%";
        metadata.items.searchpanelbuttonsectionwidth = "40%";
        metadata.items.highlightpanelsectionwidth = "60%";
        metadata.items.highlightpanelbuttonsectionwidth = "40%";
      }

      if (
        metadata.type === "recordlisttemplateareaitem" &&
        subtype === "orientation" &&
        e.target.value === "withouttabpanel"
      ) {
        metadata.items.tabpanellabelsectionwidth = "0%";
        metadata.items.tabpanelcontentsectionwidth = "0%";
      }
    } else if (
      type === "uivaluefromdatabasetablename" ||
      type === "uivaluefromdatabasetablecolumnname" ||
      type === "hidewhenconditiontext"
    ) {
      metadata[type] = e.target.value;
    } else {
      metadata.style[type] = e.target.value;
    }

    // props.parenthandleClick({
    //     type: "draftsavefromeditpropscomp",
    //     metadata: metadata,
    // });
  };

  let handleClick = async (methodprops) => {
    alltypecompconsolelog("Editpropscomp-handleClick");
    alltypecompconsolelog(methodprops);
    let { type, showpropstype } = methodprops;
    let { favouriteuiconfigslistmetadata } = props.sitestatedata;
    let metadata = compstate.metadata;

    let onclickchangevar = "";
    if (compstate.showpropstype === "showclickprops") {
      onclickchangevar = "onclick";
    }
    if (compstate.showpropstype === "showchangeprops") {
      onclickchangevar = "onchange";
    }

    if (type === "executeallowdroptemplateareaitem") {
      allowDrop(methodprops.e);
    } else if (type === "executedragstarttemplateareaitem") {
      dragstart(methodprops.e);
    } else if (type === "executedragentertemplateareaitem") {
      dragEnter(methodprops.e);
    } else if (type === "executedragleavetemplateareaitem") {
      dragLeave(methodprops.e);
    } else if (type === "droptemplateareaitemprepost") {
      methodprops.favouriteuiconfigslistmetadata =
        favouriteuiconfigslistmetadata;
      let droppedtemplateareaitem = getdroppedtemplateareaitem(methodprops);
      alltypecompconsolelog(droppedtemplateareaitem);

      metadata.onclick["popupmetadatatype"] = droppedtemplateareaitem.type;
      metadata.onclick["popupmetadata"] = droppedtemplateareaitem;
      setCompstate(compstate);
    } else if (type === "droptemplateareaitemtypeprepost") {
      methodprops.favouriteuiconfigslistmetadata =
        favouriteuiconfigslistmetadata;
      let droppedtemplateareaitem = getdroppedtemplateareaitem(methodprops);
      alltypecompconsolelog(droppedtemplateareaitem);
      alltypecompconsolelog(metadata);
      if (droppedtemplateareaitem.type && droppedtemplateareaitem.type !== "") {
        metadata.items = droppedtemplateareaitem.items;
        metadata.items.islayoutmetadatafromserver = "false";
        metadata.items.isdatafromserver = "false";
        metadata.items.isdatafromlocalcomponent = "false";

        metadata.style = droppedtemplateareaitem.style;
        metadata.type = droppedtemplateareaitem.type;
      }
      setCompstate(compstate);
      // props.parenthandleClick({
      //     type: "savefromeditpropscomp",
      //     metadata: metadata,
      // });
    } else if (type === "assigncolumnsdataselectcolumn") {
      for (
        let i = 0;
        i < metadata[onclickchangevar].modifydatabasedata.length;
        i++
      ) {
        if (i === compstate.modifydatabasedataassigncolumnsdataselectcolumn) {
          let assigncolumnsdata =
            compstate.metadata[onclickchangevar].modifydatabasedata[i]
              .assigncolumnsdata;
          compstate.assigncolumnsdataselectcolumn = methodprops.subtype;
          compstate.toname = methodprops.subtype;
          compstate.tovalue = assigncolumnsdata[methodprops.subtype].tovalue;
          setCompstate(compstate);
        }
      }
    } else if (type === "updatestatedataselectcolumn") {
      let updatestatedata =
        compstate.metadata[onclickchangevar].updatestatedata;
      compstate.updatestatedataselectcolumn = methodprops.subtype;
      compstate.toname = methodprops.subtype;
      compstate.tovalue = updatestatedata[methodprops.subtype].tovalue;
      setCompstate(compstate);
    } else if (type === "showorhidepopular") {
      if (compstate.showpopular) {
        compstate.showpopular = false;
        setCompstate(compstate);
      } else {
        compstate.showpopular = true;
        setCompstate(compstate);
      }
    } else if (type === "savefromeditpropscomp") {
      props.parenthandleClick({
        type: "savefromeditpropscomp",
        metadata: metadata,
      });
    } else if (type === "cancelfromeditpropscomp") {
      props.parenthandleClick({ type: "cancelfromeditpropscomp" });
    } else if (type === "deletefromeditpropscomp") {
      props.parenthandleClick({ type: "deletefromeditpropscomp" });
    } else if (type === "duplicatefromeditpropscomp") {
      props.parenthandleClick({ type: "duplicatefromeditpropscomp" });
    } else if (type === "addtofavouritesfromeditpropscomp") {
      props.parenthandleClick({
        type: "addtofavouritesfromeditpropscomp",
        name: compstate.favouritename,
      });
    } else if (type === "addtolayoutfromeditpropscomp") {
      props.parenthandleClick({
        type: "addtolayoutfromeditpropscomp",
        addtolayouttype: compstate.addtolayouttype,
        addtolayouttablename: compstate.addtolayouttablename,
        addtolayoutname: compstate.addtolayoutname,
        addtolayoutprofileid: compstate.addtolayoutprofileid,
      });
    } else if (type === "executeclickfromeditpropscomp") {
      props.parenthandleClick({ type: "executeclickfromeditpropscomp" });
    } else if (type === "showprops") {
      compstate.showpropstype = showpropstype;
      setCompstate(compstate);
    }
  };

  let { showpopular, showpropstype, metadata } = compstate;

  alltypecompconsolelog("Editpropscomprender");
  alltypecompconsolelog(metadata);
  alltypecompconsolelog(compstate);

  let stylepropshtml = [];
  if (
    metadata.type === "text" ||
    metadata.type === "blankrow" ||
    metadata.type === "button" ||
    metadata.type === "icon" ||
    metadata.type === "inputoutputfield"
  ) {
    stylepropshtml.push(
      <>
        <div
          onClick={() =>
            handleClick({
              type: "deletefromeditpropscomp",
            })
          }
        >
          Delete Element
        </div>
        <div
          onClick={() =>
            handleClick({
              type: "duplicatefromeditpropscomp",
            })
          }
        >
          Duplicate Element
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "executeclickfromeditpropscomp",
            })
          }
        >
          Execute Click
        </div>
      </>
    );

    stylepropshtml.push(
      <>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showclickprops",
            })
          }
        >
          Click
        </div>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showchangeprops",
            })
          }
        >
          Change
        </div>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showstyleprops",
            })
          }
        >
          Style
        </div>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showbackgroundstyleprops",
            })
          }
        >
          Background
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showlabelprops",
            })
          }
        >
          Label
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showiconprops",
            })
          }
        >
          Icon
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showinputoutputfieldprops",
            })
          }
        >
          inputoutputfield
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showpopularprops",
            })
          }
        >
          Popular
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showtypeprops",
            })
          }
        >
          type
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showhidewhenprops",
            })
          }
        >
          hidewhen
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showfavouriteprops",
            })
          }
        >
          Favourite
        </div>
      </>
    );
    stylepropshtml.push(
      <>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype:
                "showtemplateareaitemsectioncolumnuivaluefromdatabaseprops",
            })
          }
        >
          uivaluefromdatabase
        </div>
      </>
    );
  }

  if (metadata.type === "image") {
    stylepropshtml.push(
      <>
        <div
          onClick={() =>
            handleClick({
              type: "deletefromeditpropscomp",
            })
          }
        >
          Delete Element
        </div>
        <div
          onClick={() =>
            handleClick({
              type: "duplicatefromeditpropscomp",
            })
          }
        >
          Duplicate Element
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "executeclickfromeditpropscomp",
            })
          }
        >
          Execute Click
        </div>
      </>
    );

    stylepropshtml.push(
      <>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showimageprops",
            })
          }
        >
          Image
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showovertextprops",
            })
          }
        >
          Overtext
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showpopularprops",
            })
          }
        >
          Popular
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showtypeprops",
            })
          }
        >
          Type
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showhidewhenprops",
            })
          }
        >
          hidewhen
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showfavouriteprops",
            })
          }
        >
          Favourite
        </div>
      </>
    );
    stylepropshtml.push(
      <>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype:
                "showtemplateareaitemsectioncolumnuivaluefromdatabaseprops",
            })
          }
        >
          uivaluefromdatabase
        </div>
      </>
    );
  }

  if (metadata.type === "templateareaitemsection") {
    stylepropshtml.push(
      <>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showstyleprops",
            })
          }
        >
          Style
        </div>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showbackgroundstyleprops",
            })
          }
        >
          Background
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showflexprops",
            })
          }
        >
          Flex
        </div>
      </>
    );
  }

  if (
    metadata.type === "navbartemplateareaitem" ||
    metadata.type === "utilbartemplateareaitem" ||
    metadata.type === "imagecardtemplateareaitem" ||
    metadata.type === "imagepanelgallerytemplateareaitem" ||
    metadata.type === "imagegallerytemplateareaitem" ||
    metadata.type === "addresscardtemplateareaitem" ||
    metadata.type === "recordlisttemplateareaitem" ||
    metadata.type === "cardtemplateareaitem" ||
    metadata.type === "progresscardlisttemplateareaitem" ||
    metadata.type === "carasoultemplateareaitem" ||
    metadata.type === "contactusformtemplateareaitem" ||
    metadata.type === "socialbartemplateareaitem"
  ) {
    stylepropshtml.push(
      <>
        <div
          onClick={() =>
            handleClick({
              type: "deletefromeditpropscomp",
            })
          }
        >
          Delete Element
        </div>
        <div
          onClick={() =>
            handleClick({
              type: "duplicatefromeditpropscomp",
            })
          }
        >
          Duplicate Element
        </div>
      </>
    );

    stylepropshtml.push(
      <>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showstyleprops",
            })
          }
        >
          Style
        </div>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showbackgroundstyleprops",
            })
          }
        >
          Background
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showtypeprops",
            })
          }
        >
          type
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showgeneraltemplateareaitemprops",
            })
          }
        >
          general
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showpopularprops",
            })
          }
        >
          Popular
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showtemplateareaitemdatabaseprops",
            })
          }
        >
          database
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showhidewhenprops",
            })
          }
        >
          hidewhen
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showfavouriteprops",
            })
          }
        >
          Favourite
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showaddtolayoutprops",
            })
          }
        >
          Add to layout
        </div>
      </>
    );
  }

  if (metadata.type === "templateareaitemlist") {
    stylepropshtml.push(
      <>
        <div
          onClick={() =>
            handleClick({
              type: "deletefromeditpropscomp",
            })
          }
        >
          Delete Element
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showstyleprops",
            })
          }
        >
          Style
        </div>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showbackgroundstyleprops",
            })
          }
        >
          Background
        </div>
      </>
    );
  }

  if (metadata.type === "templatearealist") {
    stylepropshtml.push(
      <>
        <div
          onClick={() =>
            handleClick({
              type: "showprops",
              showpropstype: "showbeforeafterloadprops",
            })
          }
        >
          onbeforeafterload
        </div>
      </>
    );
  }

  if (showpropstype === "showstyleprops") {
    stylepropshtml.push(
      <>
        {" "}
        <b>Totalstylepropshtml:</b>
        <Totalstylepropshtml
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      </>
    );
  }

  if (showpropstype === "showflexprops") {
    stylepropshtml.push(
      <>
        {" "}
        <b>Flex:</b>
        <Flexstylepropshtml
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      </>
    );
  }

  if (showpropstype === "showbackgroundstyleprops") {
    stylepropshtml.push(
      <>
        <b>Backgroundprops:</b>
        <Backgroundstylepropshtml
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      </>
    );
  }

  if (showpropstype === "showlabelprops") {
    stylepropshtml.push(
      <>
        <b>Labelprops:</b>
        <Templateareaitemsectioncolumnlabelpropshtml
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      </>
    );
  }

  if (showpropstype === "showiconprops") {
    stylepropshtml.push(
      <>
        <b>imgiconprops:</b>
        <Templateareaitemsectioncolumniconpropshtml
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      </>
    );
  }

  if (showpropstype === "showinputoutputfieldprops") {
    stylepropshtml.push(
      <>
        <b>Inputoutputfieldprops:</b>
        <Inputoutputfieldpropshtml
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      </>
    );
  }

  if (showpropstype === "showtypeprops") {
    stylepropshtml.push(
      <>
        <b>Typeprops:</b>
        <ChangeTypepropshtml
          sitestatedata={props.sitestatedata}
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      </>
    );
  }

  if (showpropstype === "showfavouriteprops") {
    stylepropshtml.push(
      <>
        <div>Name</div>
        <div>
          <input
            style={{ width: "100%" }}
            onChange={(e) =>
              handleChange({ type: "favouritename", subtype: "", e })
            }
          />
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "addtofavouritesfromeditpropscomp",
            })
          }
        >
          Add to favourites
        </div>
      </>
    );
  }

  if (showpropstype === "showhidewhenprops") {
    stylepropshtml.push(
      <>
        <b>hidewhenprops:</b>
        <Hidewhenpropshtml
          sitestatedata={props.sitestatedata}
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      </>
    );
  }

  if (showpropstype === "showaddtolayoutprops") {
    stylepropshtml.push(
      <>
        <div>addtolayouttype</div>
        <div>
          <input
            style={{ width: "100%" }}
            onChange={(e) =>
              handleChange({ type: "addtolayouttype", subtype: "", e })
            }
          />
        </div>

        <div>addtolayouttablename</div>
        <div>
          <input
            style={{ width: "100%" }}
            onChange={(e) =>
              handleChange({ type: "addtolayouttablename", subtype: "", e })
            }
          />
        </div>

        <div>addtolayoutname</div>
        <div>
          <input
            style={{ width: "100%" }}
            onChange={(e) =>
              handleChange({ type: "addtolayoutname", subtype: "", e })
            }
          />
        </div>

        <div>addtolayoutprofileid</div>
        <div>
          <input
            style={{ width: "100%" }}
            onChange={(e) =>
              handleChange({ type: "addtolayoutprofileid", subtype: "", e })
            }
          />
        </div>

        <div
          onClick={() =>
            handleClick({
              type: "addtolayoutfromeditpropscomp",
            })
          }
        >
          Add to Layout
        </div>
      </>
    );
  }

  let onclickchangevar = "";
  if (showpropstype === "showclickprops") {
    onclickchangevar = "onclick";
  }
  if (showpropstype === "showchangeprops") {
    onclickchangevar = "onchange";
  }

  if (showpropstype === "showbeforeafterloadprops") {
    stylepropshtml.push(
      <>
        <b>beforeafterloadprops:</b>
        <Templateareaitemlistbeforeafterloadpropshtml
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
          showpropstype={showpropstype}
        />
      </>
    );
  }

  if (showpropstype === "showclickprops" || showpropstype === "showchangeprops") {
    stylepropshtml.push(
      <>
        <b>Clickchangeprops:</b>
        <TemplateareaitemSectioncolumnClickchangeTypepropshtml
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
          showpropstype={showpropstype}
        />
      </>
    );
  }

  if (
    (showpropstype === "showclickprops" || showpropstype === "showchangeprops") &&
    metadata[onclickchangevar] &&
    (metadata[onclickchangevar].type === "modifydatabase" ||
      metadata[onclickchangevar].type === "modifydatabaseandrefreshui" ||
      metadata[onclickchangevar].type === "modifydatabaseandrefreshparentui" ||
      metadata[onclickchangevar].type === "modifydatabaseandrefreshallui" ||
      metadata[onclickchangevar].type === "modifydatabaseandredirect")
  ) {
    stylepropshtml.push(
      <>
        <TemplateareaitemSectioncolumnClickchangeModifydatabasedatapropshtml
          compstate={compstate}
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
          showpropstype={showpropstype}
        />

        <TemplateareaitemSectioncolumnClickchangeAssigncolumnsdatapropshtml
          compstate={compstate}
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
          showpropstype={showpropstype}
        />
      </>
    );
  }

  if (
    (showpropstype === "showclickprops" || showpropstype === "showchangeprops") &&
    metadata[onclickchangevar] &&
    (metadata[onclickchangevar].type ===
      "updatealltypecompstatedataandopenpopup" ||
      metadata[onclickchangevar].type === "updatesitestatedata" ||
      metadata[onclickchangevar].type === "updatesitestatedataandrefreshui" ||
      metadata[onclickchangevar].type === "updatebrowserlocalstoragedata" ||
      metadata[onclickchangevar].type ===
      "updatebrowserlocalstoragedataandrefreshallui" ||
      metadata[onclickchangevar].type === "updatetemplateareaitemstatedata" ||
      metadata[onclickchangevar].type ===
      "updatetemplateareaitemstatedataandrefreshui")
  ) {
    stylepropshtml.push(
      <>
        <TemplateareaitemSectioncolumnClickchangeUpdatestatedatapropshtml
          compstate={compstate}
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
          showpropstype={showpropstype}
        />
      </>
    );
  }

  if (showpropstype === "showimageprops") {
    stylepropshtml.push(
      <>
        <b>Imageprops:</b>
        <Templateareaitemsectioncolumnimagepropshtml
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      </>
    );
  }

  if (showpropstype === "showovertextprops") {
    stylepropshtml.push(
      <>
        <b>Overtextprops:</b>
        <Templateareaitemsectioncolumnimageovertextpropshtml
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      </>
    );
  }

  if (showpropstype === "showtemplateareaitemdatabaseprops") {
    stylepropshtml.push(
      <>
        {" "}
        <b>Database:</b>
        <TemplateareaitemIsfromDatabasepropshtml
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      </>
    );
  }

  if (
    showpropstype === "showtemplateareaitemsectioncolumnuivaluefromdatabaseprops"
  ) {
    stylepropshtml.push(
      <>
        <b>uivaluefromdatabase:</b>
        <TemplateareaitemsectioncolumnuivaluefromDatabasepropshtml
          metadata={metadata}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      </>
    );
  }

  if (showpropstype === "showgeneraltemplateareaitemprops") {
    stylepropshtml.push(
      <>
        {metadata.type === "imagepanelgallerytemplateareaitem" ||
          metadata.type === "imagecardtemplateareaitem" ||
          metadata.type === "imagegallerytemplateareaitem" ||
          metadata.type === "addresscardtemplateareaitem" ||
          metadata.type === "cardtemplateareaitem" ? (
          <>
            <b>Imagepanelgalleryprops:</b>
            {/* <Imagepanelgallerypropshtml
                metadata={metadata}
                handleClick={handleClick}
                handleChange={handleChange}
              /> */}
          </>
        ) : (
          <></>
        )}

        {metadata.type === "recordlisttemplateareaitem" ? (
          <>
            <b>Recordlistdataprops:</b>
            <Recordlistdatapropshtml
              metadata={metadata}
              handleClick={handleClick}
              handleChange={handleChange}
            />
          </>
        ) : (
          <></>
        )}

        {metadata.type === "progresscardlisttemplateareaitem" ? (
          <>
            <b>Progresscardlistprops:</b>
            {/* <Progresscardlistpropshtml
                metadata={metadata}
                handleClick={handleClick}
                handleChange={handleChange}
              /> */}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }

  if (showpropstype === "showpopularprops") {
    if (
      metadata.type === "text" ||
      metadata.type === "button" ||
      metadata.type === "icon" ||
      metadata.type === "inputoutputfield" ||
      metadata.type === "image"
    ) {
      stylepropshtml.push(
        <>
          <Popularstyleshtml metadata={metadata} handleChange={handleChange} />
        </>
      );
    } else {
      stylepropshtml.push(
        <>
          <div
            style={{ position: "relative" }}
            onClick={(e) => handleClick({ type: "showorhidepopular", e })}
          >
            Popular
            {showpopular ? (
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  left: "0px",
                  top: "100%",
                  border: "1px solid grey",

                  height: "400px",
                  overflow: "auto",
                }}
              >
                <Popularstyleshtml
                  metadata={metadata}
                  handleChange={handleChange}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      );
    }
  }

  return (
    <div
      style={{
        color: "black",
        backgroundColor: "white",
        fontWeight: "normal",
        fontSize: "20px",
      }}
    >
      <div onClick={(e) => handleClick({ type: "savefromeditpropscomp", e })}>
        {" "}
        OK
      </div>
      <div onClick={(e) => handleClick({ type: "cancelfromeditpropscomp", e })}>
        {" "}
        Cancel
      </div>

      {stylepropshtml}
    </div>
  );
}

  /////////////////