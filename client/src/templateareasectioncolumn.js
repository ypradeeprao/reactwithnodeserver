/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  alltypecompconsolelog, replacedynamictext, gettabledatafromDatabase, alltypecompClickHandler,
  allowDrop, dragstart, dragEnter, dragLeave, inserttabledatainDatabase
} from "./logic";
import { Templatearealistcomp } from "./templatearea";
import { Alltypetemplateareaitemcomp, Buildtablequerymetadatapanelhtml } from "./templateareaitem";
import { Editpropscomp } from "./editpropscomp";
const { useState, useEffect, createRef } = React;



function Textcomphtml(props) {
  let { metadata, modetype, sitestatedata, templateareaitemstatedata } = props;
  alltypecompconsolelog("Textcomphtml-render");
  alltypecompconsolelog(props);

  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.hidelabel === "true"
  ) {
    return <></>;
  }

  let innerText = metadata.innerText;

  innerText = replacedynamictext({
    replacetext: innerText,
    sitestatedata: sitestatedata,
    templateareaitemstatedata: templateareaitemstatedata,
    parentalltypecompstatedata: {},
    tabledata: {},
  });
  return (
    <>
      {metadata.type === "blankrow" && modetype === "normal" ? (
        <>{innerText}</>
      ) : (
        <></>
      )}
      {metadata.type === "blankrow" && modetype !== "normal" ? (
        <>blankrow</>
      ) : (
        <></>
      )}

      {metadata.imgicon &&
        metadata.imgicon.desktopvendor &&
        metadata.imgicon.desktopvendor === "fontawesome" &&
        metadata.imgicon.position === "pre" &&
        metadata.imgicon.name &&
        metadata.imgicon.name !== "post" ? (
        <i class={metadata.imgicon.class} style={metadata.imgicon.style}></i>
      ) : (
        <></>
      )}

      {innerText && innerText !== "" ? (
        <div style={{ ...metadata.innerTextstyle, display: "inline-block" }}>
          {metadata.inputoutputfieldprops &&
            metadata.inputoutputfieldprops.type === "querypanelcolumnquery" ? (
            <>{metadata.order}-</>
          ) : (
            <></>
          )}
          {metadata.inputoutputfieldprops &&
            metadata.inputoutputfieldprops.type ===
            "querypaneltabelcolumnfilter" ? (
            <>{metadata.order}-</>
          ) : (
            <></>
          )}
          {metadata.inputoutputfieldprops &&
            metadata.inputoutputfieldprops.type === "querypaneltabelcolumnsort" ? (
            <>{metadata.order}-</>
          ) : (
            <></>
          )}

          {metadata.inputoutputfieldprops &&
            metadata.inputoutputfieldprops.hidelabel === "true" ? (
            <></>
          ) : (
            <> {innerText}</>
          )}
        </div>
      ) : (
        <>
          {modetype === "build" &&
            (metadata.type === "text" || metadata.type === "button") ? (
            "blankvalue"
          ) : (
            <></>
          )}
        </>
      )}

      {metadata.imgicon &&
        metadata.imgicon.desktopvendor &&
        metadata.imgicon.desktopvendor === "fontawesome" &&
        metadata.imgicon.position === "post" &&
        metadata.imgicon.name &&
        metadata.imgicon.name !== "post" ? (
        <i class={metadata.imgicon.class} style={metadata.imgicon.style}></i>
      ) : (
        <></>
      )}
    </>
  );
}
function Inputcomphtml(props) {
  alltypecompconsolelog("Inputcomphtml-render");
  alltypecompconsolelog(props);
  let {
    metadata,
    parenthandleChange,
    parenthandleMouseup,
    // parenthandleClick,
    //  parenthandleBlur,
    defaultvaluefromserver,
  } = props;
  let { type, options, placeholder } = metadata.inputoutputfieldprops;
  let optionshtml = [];
  if (options) {
    for (let i in options) {
      optionshtml.push(<option value={i}>{options[i]}</option>);
    }
  }



  let defaultvaluefromservertype = "",
    defaultvaluefromservervalue = "",
    defaultvaluefromserverdisplayvalue = "",
    defaultvaluefromserverstreet1 = "",
    defaultvaluefromserverstreet2 = "",
    defaultvaluefromservercity = "",
    defaultvaluefromserverstate = "",
    defaultvaluefromservercountry = "",
    defaultvaluefromserverzipcode = "",
    defaultvaluefromserverlattitude = "",
    defaultvaluefromserverlongitude = "";

  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srcstreet1default &&
    metadata.inputoutputfieldprops.srcstreet1default !== ""
  ) {
    defaultvaluefromserverstreet1 = metadata.inputoutputfieldprops.srcstreet1default;
  }
  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srcstreet2default &&
    metadata.inputoutputfieldprops.srcstreet2default !== ""
  ) {
    defaultvaluefromserverstreet2 = metadata.inputoutputfieldprops.srcstreet2default;
  }
  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srccitydefault &&
    metadata.inputoutputfieldprops.srccitydefault !== ""
  ) {
    defaultvaluefromservercity = metadata.inputoutputfieldprops.srccitydefault;
  }
  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srcstatedefault &&
    metadata.inputoutputfieldprops.srcstatedefault !== ""
  ) {
    defaultvaluefromserverstate = metadata.inputoutputfieldprops.srcstatedefault;
  }
  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srccountrydefault &&
    metadata.inputoutputfieldprops.srccountrydefault !== ""
  ) {
    defaultvaluefromservercountry = metadata.inputoutputfieldprops.srccountrydefault;
  }
  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srczipcodedefault &&
    metadata.inputoutputfieldprops.srczipcodedefault !== ""
  ) {
    defaultvaluefromserverzipcode = metadata.inputoutputfieldprops.srczipcodedefault;
  }

  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srclattitudedefault &&
    metadata.inputoutputfieldprops.srclattitudedefault !== ""
  ) {
    defaultvaluefromserverlattitude = metadata.inputoutputfieldprops.srclattitudedefault;
  }

  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srclongitudedefault &&
    metadata.inputoutputfieldprops.srclongitudedefault !== ""
  ) {
    defaultvaluefromserverlongitude = metadata.inputoutputfieldprops.srclongitudedefault;
  }




  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srctypedefault &&
    metadata.inputoutputfieldprops.srctypedefault !== ""
  ) {
    defaultvaluefromservertype = metadata.inputoutputfieldprops.srctypedefault;
  }

  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srcvaluedefault &&
    metadata.inputoutputfieldprops.srcvaluedefault !== ""
  ) {
    defaultvaluefromservervalue =
      metadata.inputoutputfieldprops.srcvaluedefault;
  }
  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srcdisplayvaluedefault &&
    metadata.inputoutputfieldprops.srcdisplayvaluedefault !== ""
  ) {
    defaultvaluefromserverdisplayvalue =
      metadata.inputoutputfieldprops.srcdisplayvaluedefault;
  }




  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.street1 !== undefined &&
    defaultvaluefromserver.street1 !== ""
  ) {
    defaultvaluefromserverstreet1 = defaultvaluefromserver.street1;
  }

  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.street2 !== undefined &&
    defaultvaluefromserver.street2 !== ""
  ) {
    defaultvaluefromserverstreet2 = defaultvaluefromserver.street2;
  }
  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.city !== undefined &&
    defaultvaluefromserver.city !== ""
  ) {
    defaultvaluefromservercity = defaultvaluefromserver.city;
  }
  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.state !== undefined &&
    defaultvaluefromserver.state !== ""
  ) {
    defaultvaluefromserverstate = defaultvaluefromserver.state;
  }
  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.country !== undefined &&
    defaultvaluefromserver.country !== ""
  ) {
    defaultvaluefromservercountry = defaultvaluefromserver.country;
  }
  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.zipcode !== undefined &&
    defaultvaluefromserver.zipcode !== ""
  ) {
    defaultvaluefromserverzipcode = defaultvaluefromserver.zipcode;
  }

  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.lattitude !== undefined &&
    defaultvaluefromserver.lattitude !== ""
  ) {
    defaultvaluefromserverlattitude = defaultvaluefromserver.lattitude;
  }

  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.longitude !== undefined &&
    defaultvaluefromserver.longitude !== ""
  ) {
    defaultvaluefromserverlongitude = defaultvaluefromserver.longitude;
  }




  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.srctype !== undefined &&
    defaultvaluefromserver.srctype !== ""
  ) {
    defaultvaluefromservertype = defaultvaluefromserver.srctype;
  }

  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.srcvalue !== undefined &&
    defaultvaluefromserver.srcvalue !== ""
  ) {
    defaultvaluefromservervalue = defaultvaluefromserver.srcvalue;
  }

  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.srcdisplayvalue !== undefined &&
    defaultvaluefromserver.srcdisplayvalue !== ""
  ) {
    defaultvaluefromserverdisplayvalue = defaultvaluefromserver.srcdisplayvalue;
  }

  let localdefaultvaluefromserver = "";
  if (
    (metadata.inputoutputfieldprops.type === "datetime" ||
      metadata.inputoutputfieldprops.type === "relativedatetime") &&
    defaultvaluefromserver &&
    defaultvaluefromserver !== ""
  ) {
    let localdatedefaultvaluefromserver = new Date(defaultvaluefromserver);

    let y = localdatedefaultvaluefromserver.getFullYear();

    let mo = localdatedefaultvaluefromserver.getMonth();
    mo = mo + 1;
    if (mo < 10) {
      mo = "0" + mo;
    }

    let d1 = localdatedefaultvaluefromserver.getDate();
    if (d1 < 10) {
      d1 = "0" + d1;
    }

    let h = localdatedefaultvaluefromserver.getHours();
    if (h < 10) {
      h = "0" + h;
    }

    let m = localdatedefaultvaluefromserver.getMinutes();
    if (m < 10) {
      m = "0" + m;
    }

    let s = localdatedefaultvaluefromserver.getSeconds();
    if (s < 10) {
      s = "0" + s;
    }

    localdefaultvaluefromserver =
      y + "-" + mo + "-" + d1 + "T" + h + ":" + m + ":" + s;
  }

  if (
    metadata.inputoutputfieldprops.type === "date" &&
    defaultvaluefromserver &&
    defaultvaluefromserver !== ""
  ) {
    let localdatedefaultvaluefromserver = new Date(defaultvaluefromserver);

    let y = localdatedefaultvaluefromserver.getFullYear();

    let mo = localdatedefaultvaluefromserver.getMonth();
    mo = mo + 1;
    if (mo < 10) {
      mo = "0" + mo;
    }

    let d1 = localdatedefaultvaluefromserver.getDate();
    if (d1 < 10) {
      d1 = "0" + d1;
    }

    localdefaultvaluefromserver = y + "-" + mo + "-" + d1;
  }

  return (
    <>
      {type === "text" ? (
        <input
          placeholder={placeholder}
          defaultValue={defaultvaluefromserver}
          style={{ width: "100%" }}
          onChange={(e) => parenthandleChange({ value: e.target.value })}
        />
      ) : (
        <></>
      )}

      {type === "email" ? (
        <input
          placeholder={placeholder}
          defaultValue={defaultvaluefromserver}
          style={{ width: "100%" }}
          //   onChange={(e) => parenthandleChange({ value: e.target.value })}
          onBlur={(e) => parenthandleChange({ value: e.target.value })}

        />
      ) : (
        <></>
      )}


      {type === "mediaarray" ? (
        <textarea
          placeholder={placeholder}
          defaultValue={defaultvaluefromserver}
          style={{ width: "100%" }}
          //   onChange={(e) => parenthandleChange({ value: e.target.value })}
          onBlur={(e) => parenthandleChange({ value: e.target.value })}
          onMouseUp={(e) => parenthandleMouseup({ value: e.target.value })}
        > remind me to be here to morrow </textarea>
      ) : (
        <></>
      )}

      {type === "location" ? (<>
        <input
          placeholder={placeholder}
          defaultValue={defaultvaluefromserverstreet1}
          style={{ width: "100%" }}
          //   onChange={(e) => parenthandleChange({ value: e.target.value })}
          //  onBlur={(e) => parenthandleChange({ value: e.target.value })}
          onChange={(e) =>
            parenthandleChange({
              defaultvaluefromserver: defaultvaluefromserver,
              valuesubtypename: "street1",
              value: e.target.value,
            })
          }
        />
        <input
          placeholder={placeholder}
          defaultValue={defaultvaluefromserverstreet2}
          style={{ width: "100%" }}
          //   onChange={(e) => parenthandleChange({ value: e.target.value })}
          //  onBlur={(e) => parenthandleChange({ value: e.target.value })}
          onChange={(e) =>
            parenthandleChange({
              defaultvaluefromserver: defaultvaluefromserver,
              valuesubtypename: "street2",
              value: e.target.value,
            })
          }
        />

        <input
          placeholder={placeholder}
          defaultValue={defaultvaluefromservercity}
          style={{ width: "100%" }}
          //   onChange={(e) => parenthandleChange({ value: e.target.value })}
          //  onBlur={(e) => parenthandleChange({ value: e.target.value })}
          onChange={(e) =>
            parenthandleChange({
              defaultvaluefromserver: defaultvaluefromserver,
              valuesubtypename: "city",
              value: e.target.value,
            })
          }
        />

        <input
          placeholder={placeholder}
          defaultValue={defaultvaluefromserverstate}
          style={{ width: "100%" }}
          //   onChange={(e) => parenthandleChange({ value: e.target.value })}
          //  onBlur={(e) => parenthandleChange({ value: e.target.value })}
          onChange={(e) =>
            parenthandleChange({
              defaultvaluefromserver: defaultvaluefromserver,
              valuesubtypename: "state",
              value: e.target.value,
            })
          }
        />


        <input
          placeholder={placeholder}
          defaultValue={defaultvaluefromservercountry}
          style={{ width: "100%" }}
          //   onChange={(e) => parenthandleChange({ value: e.target.value })}
          //  onBlur={(e) => parenthandleChange({ value: e.target.value })}
          onChange={(e) =>
            parenthandleChange({
              defaultvaluefromserver: defaultvaluefromserver,
              valuesubtypename: "country",
              value: e.target.value,
            })
          }
        />


        <input
          placeholder={placeholder}
          defaultValue={defaultvaluefromserverzipcode}
          style={{ width: "100%" }}
          //   onChange={(e) => parenthandleChange({ value: e.target.value })}
          //  onBlur={(e) => parenthandleChange({ value: e.target.value })}
          onChange={(e) =>
            parenthandleChange({
              defaultvaluefromserver: defaultvaluefromserver,
              valuesubtypename: "zipcode",
              value: e.target.value,
            })
          }
        />

        <input
          placeholder={placeholder}
          defaultValue={defaultvaluefromserverlattitude}
          style={{ width: "100%" }}
          //   onChange={(e) => parenthandleChange({ value: e.target.value })}
          //  onBlur={(e) => parenthandleChange({ value: e.target.value })}
          onChange={(e) =>
            parenthandleChange({
              defaultvaluefromserver: defaultvaluefromserver,
              valuesubtypename: "lattitude",
              value: e.target.value,
            })
          }
        />


        <input
          placeholder={placeholder}
          defaultValue={defaultvaluefromserverlongitude}
          style={{ width: "100%" }}
          //   onChange={(e) => parenthandleChange({ value: e.target.value })}
          //  onBlur={(e) => parenthandleChange({ value: e.target.value })}
          onChange={(e) =>
            parenthandleChange({
              defaultvaluefromserver: defaultvaluefromserver,
              valuesubtypename: "longitude",
              value: e.target.value,
            })
          }
        />




      </>) : (
        <></>
      )}

      {type === "date" ? (
        <input
          type="date"
          defaultValue={localdefaultvaluefromserver}
          style={{ width: "100%" }}
          onChange={(e) => parenthandleChange({ value: e.target.value })}
        />
      ) : (
        <></>
      )}

      {type === "datetime" || type === "relativedatetime" ? (
        <input
          type="datetime-local"
          defaultValue={localdefaultvaluefromserver}
          style={{ width: "100%" }}
          onChange={(e) => parenthandleChange({ value: e.target.value })}
        />
      ) : (
        <></>
      )}

      {type === "checkbox" ? (
        <input
          type="checkbox"
          placeholder={placeholder}
          defaultChecked={defaultvaluefromserver}
          style={{ width: "100%" }}
          onChange={(e) =>
            parenthandleChange({ value: String(e.target.checked) })
          }
        />
      ) : (
        <></>
      )}

      {type === "url" ? (
        <>
          type
          <input
            defaultValue={defaultvaluefromservertype}
            style={{ width: "100%" }}
            onChange={(e) =>
              parenthandleChange({
                defaultvaluefromserver: defaultvaluefromserver,
                valuesubtypename: "srctype",
                value: e.target.value,
              })
            }
            list="defaultvaluefromservertype"
          />
          <datalist id="defaultvaluefromservertype">
            <option value="externalurl" />
            <option value="internalurl" />
          </datalist>
          value
          <input
            defaultValue={defaultvaluefromservervalue}
            style={{ width: "100%" }}
            onChange={(e) =>
              parenthandleChange({
                defaultvaluefromserver: defaultvaluefromserver,
                valuesubtypename: "srcvalue",
                value: e.target.value,
              })
            }
          />
          displayvalue
          <input
            defaultValue={defaultvaluefromserverdisplayvalue}
            style={{ width: "100%" }}
            onChange={(e) =>
              parenthandleChange({
                defaultvaluefromserverdisplayvalue:
                  defaultvaluefromserverdisplayvalue,
                valuesubtypename: "srcdisplayvalue",
                value: e.target.value,
              })
            }
          />
        </>
      ) : (
        <></>
      )}

      {type === "image" ? (
        <>
          type
          <input
            placeholder={placeholder}
            defaultValue={defaultvaluefromservertype}
            style={{ width: "100%" }}
            onChange={(e) =>
              parenthandleChange({
                defaultvaluefromserver: defaultvaluefromserver,
                valuesubtypename: "srctype",
                value: e.target.value,
              })
            }
            list="defaultvaluefromservertype"
          />
          <datalist id="defaultvaluefromservertype">
            <option value="url" />
          </datalist>
          value
          <input
            placeholder={placeholder}
            defaultValue={defaultvaluefromservervalue}
            style={{ width: "100%" }}
            onChange={(e) =>
              parenthandleChange({
                defaultvaluefromserver: defaultvaluefromserver,
                valuesubtypename: "srcvalue",
                value: e.target.value,
              })
            }
          />
        </>
      ) : (
        <></>
      )}

      {type === "icon" ? (
        <>
          type
          <input
            placeholder={placeholder}
            defaultValue={defaultvaluefromservertype}
            style={{ width: "100%" }}
            onChange={(e) =>
              parenthandleChange({
                defaultvaluefromserver: defaultvaluefromserver,
                valuesubtypename: "srctype",
                value: e.target.value,
              })
            }
            list="defaultvaluefromservertype"
          />
          <datalist id="defaultvaluefromservertype">
            <option value="fontawesome" />
            <option value="google" />
          </datalist>
          value
          <input
            placeholder={placeholder}
            defaultValue={defaultvaluefromservervalue}
            style={{ width: "100%" }}
            onChange={(e) =>
              parenthandleChange({
                defaultvaluefromserver: defaultvaluefromserver,
                valuesubtypename: "srcvalue",
                value: e.target.value,
              })
            }
            list="defaultvaluefromservervalue"
          />
          <datalist id="defaultvaluefromservervalue">
            <option value="cloud" />
            <option value="close" />
          </datalist>
        </>
      ) : (
        <></>
      )}

      {type === "rating" ? (
        <>
          {defaultvaluefromserver && defaultvaluefromserver < 1 ? (
            <div onClick={() => parenthandleChange({ value: 1 })}>
              <i class="fa fa-star-o"></i>
            </div>
          ) : (
            <></>
          )}
          {defaultvaluefromserver && defaultvaluefromserver >= 1 ? (
            <div onClick={() => parenthandleChange({ value: 1 })}>
              <i class="fa fa-star"></i>
            </div>
          ) : (
            <></>
          )}
          {defaultvaluefromserver && defaultvaluefromserver < 2 ? (
            <div onClick={() => parenthandleChange({ value: 2 })}>
              <i class="fa fa-star-o"></i>
            </div>
          ) : (
            <></>
          )}
          {defaultvaluefromserver && defaultvaluefromserver >= 2 ? (
            <div onClick={() => parenthandleChange({ value: 2 })}>
              <i class="fa fa-star"></i>
            </div>
          ) : (
            <></>
          )}
          {defaultvaluefromserver && defaultvaluefromserver < 3 ? (
            <div onClick={() => parenthandleChange({ value: 3 })}>
              <i class="fa fa-star-o"></i>
            </div>
          ) : (
            <></>
          )}
          {defaultvaluefromserver && defaultvaluefromserver >= 3 ? (
            <div onClick={() => parenthandleChange({ value: 3 })}>
              <i class="fa fa-star"></i>
            </div>
          ) : (
            <></>
          )}
          {defaultvaluefromserver && defaultvaluefromserver < 4 ? (
            <div onClick={() => parenthandleChange({ value: 4 })}>
              <i class="fa fa-star-o"></i>
            </div>
          ) : (
            <></>
          )}
          {defaultvaluefromserver && defaultvaluefromserver >= 4 ? (
            <div onClick={() => parenthandleChange({ value: 4 })}>
              <i class="fa fa-star"></i>
            </div>
          ) : (
            <></>
          )}
          {defaultvaluefromserver && defaultvaluefromserver < 5 ? (
            <div onClick={() => parenthandleChange({ value: 5 })}>
              <i class="fa fa-star-o"></i>
            </div>
          ) : (
            <></>
          )}
          {defaultvaluefromserver && defaultvaluefromserver >= 5 ? (
            <div onClick={() => parenthandleChange({ value: 5 })}>
              <i class="fa fa-star"></i>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}

      {type === "select" ? (
        <select
          defaultValue={defaultvaluefromserver}
          style={{ width: "100%" }}
          onChange={(e) => parenthandleChange({ value: e.target.value })}
        >
          {optionshtml}
        </select>
      ) : (
        <></>
      )}
    </>
  );
}

function Recordlookuphtml(props) {
  alltypecompconsolelog("Recordlookuphtml-render");
  alltypecompconsolelog(props);
  const [compstate, setCompstate] = useState({
    showui: true,
    displaycolumnvalue: "",
  });

  useEffect(() => {
    alltypecompconsolelog("Recordlookuphtml-useeffect");
    fetchRecordlistdatafromDB({});
  }, []);

  async function fetchRecordlistdatafromDB(methodprops) {
    alltypecompconsolelog(
      "Recordlookuphtml-fetchRecordlistdatafromDB",
      methodprops
    );

    let recorddatalistparams = {
      tablename: props.tablename,
      id: props.recordid,
      idoperator: "equalsto",
      orgname: props.orgname,
    };
    alltypecompconsolelog(
      "Recordlookuphtml-recorddatalistparams",
      recorddatalistparams
    );
    let recorddatalist = await gettabledatafromDatabase(recorddatalistparams);
    alltypecompconsolelog("Recordlookuphtml-recorddatalist", recorddatalist);
    let displaycolumnvalue = "";
    if (recorddatalist && recorddatalist.length > 0) {
      displaycolumnvalue = recorddatalist[0].data[props.displaycolumnname];
      setCompstate({ displaycolumnvalue: displaycolumnvalue });
    }
  }

  let { inputmode } = props;

  let { displaycolumnvalue } = compstate;
  let clearhtml = [];
  if (
    inputmode === "true" &&
    (displaycolumnvalue === undefined || displaycolumnvalue === "")
  ) {
    displaycolumnvalue = "Click to Select";
  }

  return <>{displaycolumnvalue}</>;
}

function timeDifference(methodprops) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  let currentdatetime = Date.now();
  let checkdatetime = new Date(methodprops.checkdatetime);
  var elapsed = currentdatetime - checkdatetime;
  let rettext = "";
  let isfuturedate = false;

  if (elapsed < 0) {
    isfuturedate = true;
    elapsed = Math.abs(elapsed);
  }

  if (isfuturedate === false) {
    if (elapsed < msPerMinute) {
      rettext = Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      rettext = Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      rettext = Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      rettext = "approximately " + Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      rettext =
        "approximately " + Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      rettext =
        "approximately " + Math.round(elapsed / msPerYear) + " years ago";
    }
  } else {
    if (elapsed < msPerMinute) {
      rettext = Math.round(elapsed / 1000) + " seconds after";
    } else if (elapsed < msPerHour) {
      rettext = Math.round(elapsed / msPerMinute) + " minutes after";
    } else if (elapsed < msPerDay) {
      rettext = Math.round(elapsed / msPerHour) + " hours after";
    } else if (elapsed < msPerMonth) {
      rettext =
        "approximately " + Math.round(elapsed / msPerDay) + " days after";
    } else if (elapsed < msPerYear) {
      rettext =
        "approximately " + Math.round(elapsed / msPerMonth) + " months after";
    } else {
      rettext =
        "approximately " + Math.round(elapsed / msPerYear) + " years after";
    }
  }

  return rettext;
}

function Outputcomphtml(props) {
  alltypecompconsolelog("Outputcomphtml-render");
  alltypecompconsolelog(props);

  let {
    metadata,

    defaultvaluefromserver,
  } = props;

  let defaultvaluefromservertype = "",
    defaultvaluefromservervalue = "",
    defaultvaluefromserverdisplayvalue = "",
    defaultvaluefromserverstreet1 = "",
    defaultvaluefromserverstreet2 = "",
    defaultvaluefromservercity = "",
    defaultvaluefromserverstate = "",
    defaultvaluefromservercountry = "",
    defaultvaluefromserverzipcode = "",
    defaultvaluefromserverlattitude = "",
    defaultvaluefromserverlongitude = "";

  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srcstreet1default &&
    metadata.inputoutputfieldprops.srcstreet1default !== ""
  ) {
    defaultvaluefromserverstreet1 = metadata.inputoutputfieldprops.srcstreet1default;
  }
  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srcstreet2default &&
    metadata.inputoutputfieldprops.srcstreet2default !== ""
  ) {
    defaultvaluefromserverstreet2 = metadata.inputoutputfieldprops.srcstreet2default;
  }
  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srccitydefault &&
    metadata.inputoutputfieldprops.srccitydefault !== ""
  ) {
    defaultvaluefromservercity = metadata.inputoutputfieldprops.srccitydefault;
  }
  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srcstatedefault &&
    metadata.inputoutputfieldprops.srcstatedefault !== ""
  ) {
    defaultvaluefromserverstate = metadata.inputoutputfieldprops.srcstatedefault;
  }
  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srccountrydefault &&
    metadata.inputoutputfieldprops.srccountrydefault !== ""
  ) {
    defaultvaluefromservercountry = metadata.inputoutputfieldprops.srccountrydefault;
  }
  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srczipcodedefault &&
    metadata.inputoutputfieldprops.srczipcodedefault !== ""
  ) {
    defaultvaluefromserverzipcode = metadata.inputoutputfieldprops.srczipcodedefault;
  }

  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srclattitudedefault &&
    metadata.inputoutputfieldprops.srclattitudedefault !== ""
  ) {
    defaultvaluefromserverlattitude = metadata.inputoutputfieldprops.srclattitudedefault;
  }

  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srclongitudedefault &&
    metadata.inputoutputfieldprops.srclongitudedefault !== ""
  ) {
    defaultvaluefromserverlongitude = metadata.inputoutputfieldprops.srclongitudedefault;
  }






  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srctypedefault &&
    metadata.inputoutputfieldprops.srctypedefault !== ""
  ) {
    defaultvaluefromservertype = metadata.inputoutputfieldprops.srctypedefault;
  }

  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srcvaluedefault &&
    metadata.inputoutputfieldprops.srcvaluedefault !== ""
  ) {
    defaultvaluefromservervalue =
      metadata.inputoutputfieldprops.srcvaluedefault;
  }

  if (
    metadata.inputoutputfieldprops &&
    metadata.inputoutputfieldprops.srcdisplayvaluedefault &&
    metadata.inputoutputfieldprops.srcdisplayvaluedefault !== ""
  ) {
    defaultvaluefromserverdisplayvalue =
      metadata.inputoutputfieldprops.srcdisplayvaluedefault;
  }

  let imagestyle = {};

  if (metadata.inputoutputfieldprops.type === "image") {
    imagestyle.objectFit = metadata.inputoutputfieldprops.imageobjectfit;
    imagestyle.width = metadata.inputoutputfieldprops.imagewidth;
    imagestyle.height = metadata.inputoutputfieldprops.imageheight;
  }

  let localdatevalue = "",
    localtimevalue = "",
    localdatetimevalue = "",
    relativelocaldatetimevalue = "";
  if (
    metadata.inputoutputfieldprops.type === "date" &&
    defaultvaluefromserver &&
    defaultvaluefromserver !== ""
  ) {
    let localdefaultvaluefromserver = new Date(defaultvaluefromserver);
    localdatevalue = localdefaultvaluefromserver.toLocaleDateString();
    localtimevalue = localdefaultvaluefromserver.toLocaleTimeString();
    localdatetimevalue = localdefaultvaluefromserver.toLocaleString();
  }

  if (
    metadata.inputoutputfieldprops.type === "datetime" &&
    defaultvaluefromserver &&
    defaultvaluefromserver !== ""
  ) {
    let localdefaultvaluefromserver = new Date(defaultvaluefromserver);
    localdatevalue = localdefaultvaluefromserver.toLocaleDateString();
    // localtimevalue = localdefaultvaluefromserver.toLocaleTimeString();
    localdatetimevalue = localdefaultvaluefromserver.toLocaleString();
  }

  if (
    metadata.inputoutputfieldprops.type === "relativedatetime" &&
    defaultvaluefromserver &&
    defaultvaluefromserver !== ""
  ) {
    relativelocaldatetimevalue = timeDifference({
      checkdatetime: defaultvaluefromserver,
    });
  }



  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.street1 !== undefined &&
    defaultvaluefromserver.street1 !== ""
  ) {
    defaultvaluefromserverstreet1 = defaultvaluefromserver.street1;
  }

  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.street2 !== undefined &&
    defaultvaluefromserver.street2 !== ""
  ) {
    defaultvaluefromserverstreet2 = defaultvaluefromserver.street2;
  }
  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.city !== undefined &&
    defaultvaluefromserver.city !== ""
  ) {
    defaultvaluefromservercity = defaultvaluefromserver.city;
  }
  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.state !== undefined &&
    defaultvaluefromserver.state !== ""
  ) {
    defaultvaluefromserverstate = defaultvaluefromserver.state;
  }
  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.country !== undefined &&
    defaultvaluefromserver.country !== ""
  ) {
    defaultvaluefromservercountry = defaultvaluefromserver.country;
  }
  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.zipcode !== undefined &&
    defaultvaluefromserver.zipcode !== ""
  ) {
    defaultvaluefromserverzipcode = defaultvaluefromserver.zipcode;
  }

  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.lattitude !== undefined &&
    defaultvaluefromserver.lattitude !== ""
  ) {
    defaultvaluefromserverlattitude = defaultvaluefromserver.lattitude;
  }

  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.longitude !== undefined &&
    defaultvaluefromserver.longitude !== ""
  ) {
    defaultvaluefromserverlongitude = defaultvaluefromserver.longitude;
  }





  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.srctype !== undefined &&
    defaultvaluefromserver.srctype !== ""
  ) {
    defaultvaluefromservertype = defaultvaluefromserver.srctype;
  }


  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.srcvalue !== undefined &&
    defaultvaluefromserver.srcvalue !== ""
  ) {
    defaultvaluefromservervalue = defaultvaluefromserver.srcvalue;
  }

  if (
    defaultvaluefromserver &&
    defaultvaluefromserver.srcdisplayvalue !== undefined &&
    defaultvaluefromserver.srcdisplayvalue !== ""
  ) {
    defaultvaluefromserverdisplayvalue = defaultvaluefromserver.srcdisplayvalue;
  }

  let iconclass = "";
  if (defaultvaluefromservervalue && defaultvaluefromservervalue !== "") {
    iconclass = "fa fa-" + defaultvaluefromservervalue;
  }

  return (
    <>
      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type !== "email" &&
        metadata.inputoutputfieldprops.type !== "mediaarray" &&
        metadata.inputoutputfieldprops.type !== "location" &&
        metadata.inputoutputfieldprops.type !== "checkbox" &&
        metadata.inputoutputfieldprops.type !== "image" &&
        metadata.inputoutputfieldprops.type !== "url" &&
        metadata.inputoutputfieldprops.type !== "date" &&
        metadata.inputoutputfieldprops.type !== "datetime" &&
        metadata.inputoutputfieldprops.type !== "relativedatetime" &&
        metadata.inputoutputfieldprops.type !== "icon" &&
        metadata.inputoutputfieldprops.type !== "rating" ? (
        <>{defaultvaluefromserver}</>
      ) : (
        <> </>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "email" ? (
        <>{defaultvaluefromserver}</>
      ) : (
        <> </>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "mediaarray" ? (
        <>{defaultvaluefromserver}</>
      ) : (
        <> </>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "location" ? (
        <>
          {defaultvaluefromserverstreet1 && defaultvaluefromserverstreet1 !== "" ? <div>{defaultvaluefromserverstreet1}</div> : <></>}
          {defaultvaluefromserverstreet2 && defaultvaluefromserverstreet2 !== "" ? <div>{defaultvaluefromserverstreet2}</div> : <></>}
          {defaultvaluefromservercity && defaultvaluefromservercity !== "" ? <div>{defaultvaluefromservercity}</div> : <></>}
          {defaultvaluefromserverstate && defaultvaluefromserverstate !== "" ? <div>{defaultvaluefromserverstate}</div> : <></>}
          {defaultvaluefromservercountry && defaultvaluefromservercountry !== "" ? <div>{defaultvaluefromservercountry}</div> : <></>}
          {defaultvaluefromserverzipcode && defaultvaluefromserverzipcode !== "" ? <div>{defaultvaluefromserverzipcode}</div> : <></>}
          {defaultvaluefromserverlattitude && defaultvaluefromserverlattitude !== "" ? <div>{defaultvaluefromserverlattitude}</div> : <></>}
          {defaultvaluefromserverlongitude && defaultvaluefromserverlongitude !== "" ? <div>{defaultvaluefromserverlongitude}</div> : <></>}
        </>
      ) : (
        <> </>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "checkbox" ? (
        <>
          <input
            type="checkbox"
            defaultChecked={defaultvaluefromserver}
            style={{ width: "100%" }}
          />
        </>
      ) : (
        <> </>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "date" ? (
        <>{localdatevalue}</>
      ) : (
        <> </>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "datetime" ? (
        <>{localdatetimevalue}</>
      ) : (
        <> </>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "relativedatetime" ? (
        <>{relativelocaldatetimevalue}</>
      ) : (
        <> </>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "image" &&
        defaultvaluefromservertype &&
        defaultvaluefromservertype !== "" &&
        defaultvaluefromservervalue &&
        defaultvaluefromservervalue !== "" ? (
        <>
          <img
            draggable={false}
            src={defaultvaluefromservervalue}
            style={imagestyle}
            alt=""
          />
        </>
      ) : (
        <> </>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "icon" &&
        defaultvaluefromservertype === "fontawesome" &&
        defaultvaluefromservervalue &&
        defaultvaluefromservervalue !== "" ? (
        <>
          <i
            class={iconclass}
          //   style={metadata.imgicon.style}
          ></i>
        </>
      ) : (
        <> </>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "rating" &&
        defaultvaluefromserver &&
        defaultvaluefromserver !== "" ? (
        <>
          {defaultvaluefromserver && defaultvaluefromserver < 1 ? <i class="fa fa-star-o"></i> : <></>}
          {defaultvaluefromserver && defaultvaluefromserver >= 1 ? <i class="fa fa-star"></i> : <></>}
          {defaultvaluefromserver && defaultvaluefromserver < 2 ? <i class="fa fa-star-o"></i> : <></>}
          {defaultvaluefromserver && defaultvaluefromserver >= 2 ? <i class="fa fa-star"></i> : <></>}
          {defaultvaluefromserver && defaultvaluefromserver < 3 ? <i class="fa fa-star-o"></i> : <></>}
          {defaultvaluefromserver && defaultvaluefromserver >= 3 ? <i class="fa fa-star"></i> : <></>}
          {defaultvaluefromserver && defaultvaluefromserver < 4 ? <i class="fa fa-star-o"></i> : <></>}
          {defaultvaluefromserver && defaultvaluefromserver >= 4 ? <i class="fa fa-star"></i> : <></>}
          {defaultvaluefromserver && defaultvaluefromserver < 5 ? <i class="fa fa-star-o"></i> : <></>}
          {defaultvaluefromserver && defaultvaluefromserver >= 5 ? <i class="fa fa-star"></i> : <></>}
        </>
      ) : (
        <> </>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "url" &&
        defaultvaluefromservertype === "externalurl" &&
        defaultvaluefromservervalue &&
        defaultvaluefromservervalue !== "" ? (
        <>
          <a href={defaultvaluefromservervalue}>
            {defaultvaluefromserverdisplayvalue}
          </a>
        </>
      ) : (
        <> </>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "querypaneltablename" ? (
        <>{metadata.inputoutputfieldprops.querypaneltablelabel}</>
      ) : (
        <></>
      )}
      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "querypanelcolumnquery" ? (
        <>
          {/* {metadata.inputoutputfieldprops.querypaneltabelcolumnlabel} &#40; */}
          {metadata.inputoutputfieldprops.querypaneltabelcolumnname}&#41; -
          {metadata.inputoutputfieldprops.querypaneltabelcolumncondition}-
          {metadata.inputoutputfieldprops.querypaneltabelcolumnvalue}
        </>
      ) : (
        <></>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "querypaneltabelcolumnfilter" ? (
        <>
          {/* {metadata.inputoutputfieldprops.querypaneltabelcolumnlabel} &#40; */}
          {metadata.inputoutputfieldprops.querypaneltabelcolumnname}&#41; -
          {metadata.inputoutputfieldprops.querypaneltabelcolumnvalue}
        </>
      ) : (
        <></>
      )}

      {metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.type === "querypaneltabelcolumnsort" ? (
        <>
          {/* {metadata.inputoutputfieldprops.querypaneltabelcolumnlabel}*/} &#40;
          {metadata.inputoutputfieldprops.querypaneltabelcolumnname}&#41;
        </>
      ) : (
        <></>
      )}
    </>
  );
}

function Imagecomphtml(props) {
  let {
    metadata,
    sitestatedata,
    templateareaitemstatedata,
    defaultvaluefromservertype,
    defaultvaluefromserver,
    defaultvaluefromservervalue,
  } = props;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: metadata.style.height,
        display: "inline-block",
      }}
    >
      {defaultvaluefromservertype &&
        defaultvaluefromservertype !== "" &&
        defaultvaluefromservervalue &&
        defaultvaluefromservervalue !== "" ? (
        <>
          <img
            draggable={false}
            src={defaultvaluefromservervalue}
            // style={imagestyle}
            alt=""
          />
        </>
      ) : (
        <>
          {metadata.imgicon.type === "url" ? (
            <img
              draggable={false}
              src={defaultvaluefromserver}
              alt=""
              style={{
                ...metadata.style,
                position: "absolute",
                left: "0px",
                width: "100%",
              }}
            />
          ) : (
            <></>
          )}
        </>
      )}

      <div
        style={{
          ...metadata.overtext.style,
          position: "absolute",
          left: "0px",
          width: "100%",
          display: "inline-block",
        }}
      >
        {metadata.overtext.innerText}
      </div>
    </div>
  );
}

function Popuphtml(props) {
  let popupscreenhtmlstyle = {};

  let popupwindowhtmlstyle = {};
  let {
    metadata,
    sitestatedata,
    modetype,
    showalltypecomppopupinbuildmode,
    sideofCursorclickX,
    sideofCursorclickY,
    parentalltypecompstatedata,
    popupside,
    popupmetadata,
  } = props;
  let modetypelocal = "normal";
  if (modetype === "buildicon") {
    modetypelocal = "normal";
  }
  if (modetype === "build") {
    modetypelocal = "build";
  }
  if (showalltypecomppopupinbuildmode === true) {
    modetypelocal = "build";
  }

  if (popupside === "left") {
    popupscreenhtmlstyle = {
      border: "1px solid grey",
      zIndex: 999,
      backgroundColor: "grey",
    };

    popupwindowhtmlstyle = {
      backgroundColor: "white",
      border: "1px solid grey",
      opacity: 1,
    };

    popupscreenhtmlstyle.width = "100%";
    popupscreenhtmlstyle.height = "100%";
    popupscreenhtmlstyle.opacity = 0.9;
    popupscreenhtmlstyle.position = "fixed";
    popupscreenhtmlstyle.top = "0px";
    popupscreenhtmlstyle.left = "0px";
    popupwindowhtmlstyle.left = "0px";
    popupwindowhtmlstyle.height = "100%";
    // popupwindowhtmlstyle.overflow = "auto";
    popupwindowhtmlstyle.position = "fixed";
    popupwindowhtmlstyle.top = "0px";
    popupwindowhtmlstyle.width = "250px";
  }
  if (popupside === "right") {
    popupscreenhtmlstyle = {
      border: "1px solid grey",
      zIndex: 999,
      backgroundColor: "grey",
    };

    popupwindowhtmlstyle = {
      backgroundColor: "white",
      border: "1px solid grey",
      opacity: 1,
    };

    popupscreenhtmlstyle.width = "100%";
    popupscreenhtmlstyle.height = "100%";
    popupscreenhtmlstyle.opacity = 0.9;
    popupscreenhtmlstyle.position = "fixed";
    popupscreenhtmlstyle.top = "0px";
    popupscreenhtmlstyle.left = "0px";
    popupwindowhtmlstyle.right = "0px";
    popupwindowhtmlstyle.height = "100%";
    //  popupwindowhtmlstyle.overflow = "auto";
    popupwindowhtmlstyle.position = "fixed";
    popupwindowhtmlstyle.top = "0px";
    popupwindowhtmlstyle.width = "250px";
  }
  if (popupside === "center") {
    popupscreenhtmlstyle = {
      border: "1px solid grey",
      zIndex: 999,
      backgroundColor: "grey",
    };

    popupwindowhtmlstyle = {
      backgroundColor: "white",
      border: "1px solid grey",
      opacity: 1,
    };

    popupscreenhtmlstyle.width = "100%";
    popupscreenhtmlstyle.height = "100%";
    popupscreenhtmlstyle.opacity = 0.9;
    popupscreenhtmlstyle.position = "fixed";
    popupscreenhtmlstyle.top = "0px";
    popupscreenhtmlstyle.left = "0px";
    popupwindowhtmlstyle.top = "10%";
    popupwindowhtmlstyle.bottom = "10%";
    popupwindowhtmlstyle.left = "20%";
    popupwindowhtmlstyle.width = "60%";
    popupwindowhtmlstyle.position = "fixed";
    popupwindowhtmlstyle.top = "0px";
    popupwindowhtmlstyle.width = "500px";
    //   popupwindowhtmlstyle.overflow = "auto";
  }

  if (popupside === "dropdown") {
    popupscreenhtmlstyle = {
      border: "1px solid grey",
      zIndex: 999,
      backgroundColor: "grey",
    };

    popupwindowhtmlstyle = {
      backgroundColor: "white",
      border: "1px solid grey",
      opacity: 1,
    };

    // popupscreenhtmlstyle.width = "100%";
    // popupscreenhtmlstyle.height = "100%";
    popupscreenhtmlstyle.opacity = 1;
    popupscreenhtmlstyle.position = "relative";

    // popupwindowhtmlstyle.top = "0px";
    //popupwindowhtmlstyle.bottom = "10%";

    // popupwindowhtmlstyle.width = "60%";
    popupwindowhtmlstyle.position = "absolute";
    // popupwindowhtmlstyle.top= "0px";
    popupwindowhtmlstyle.maxWidth = "500px";
    popupwindowhtmlstyle.maxHeight = "500px";

    if (sideofCursorclickX === "left") {
      popupscreenhtmlstyle.left = "0px";
      popupwindowhtmlstyle.left = "0px";
    } else {
      popupscreenhtmlstyle.right = "0px";
      popupwindowhtmlstyle.right = "0px";
    }

    if (sideofCursorclickY === "top") {
      popupscreenhtmlstyle.top = "0px";
    } else {
      popupscreenhtmlstyle.bottom = "30px";
      popupwindowhtmlstyle.bottom = "0px";
    }
    // popupwindowhtmlstyle.overflow = "auto";
  }

  let mainpanelHtml = [];

  mainpanelHtml.push(
    <div style={popupscreenhtmlstyle}>
      <div style={popupwindowhtmlstyle}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            onClick={(e) =>
              props.parenthandleClick({
                e,
                type: "closepopup",
              })
            }
          >
            close
          </div>
        </div>
        <Alltypetemplateareaitemcomp
          isparenttablelayoutmetadatafield="false"
          parentalltypecompstatedata={parentalltypecompstatedata}
          sitestatedata={sitestatedata}
          templatemetadata={popupmetadata}
          modetype={modetypelocal}
          draggable={false}
          parenthandleClick={(methodprops) =>
            props.parenthandleClick({ ...methodprops })
          }
          parenthandleChange={(methodprops) =>
            props.parenthandleChange({ ...methodprops })
          }
        />
      </div>
    </div>
  );

  return mainpanelHtml;
}

export function Alltypecomp(props) {
  const [compstate, setCompstate] = useState({
    showbuildpropsui: false,
    modetype: props.modetype,
    metadata: JSON.parse(JSON.stringify(props.metadata)),
    openpopup: false,
    sideofCursorclickX: "",
    sideofCursorclickY: "",
    showalltypecomppopupinbuildmode: false,
    showui: true,
    alltypecompstatedata: {},
  });

  let updateCompstateandRefresh = async (methodprops) => {
    alltypecompconsolelog("Alltypecomp-updateCompstateandRefresh");
    alltypecompconsolelog(methodprops);
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));
    let compstatejs = JSON.parse(JSON.stringify(compstate));

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

  let hideuiHandler = async (methodprops) => {
    alltypecompconsolelog("Alltypecomp-hideui");
    alltypecompconsolelog(methodprops);
    let compstatejs = JSON.parse(JSON.stringify(compstate));
    let methodpropsjs = JSON.parse(JSON.stringify(methodprops));

    await setCompstate({
      ...compstatejs,
      ...methodpropsjs,
      showui: false,
    });
  };

  let showuiHandler = async (methodprops) => {
    alltypecompconsolelog("Alltypecomp-showui");
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
    let { modetype, draggable, sitestatedata } = props;
    let { type, order } = methodprops;
    alltypecompconsolelog("Alltypecomp-handleClick");
    alltypecompconsolelog(methodprops);
    alltypecompconsolelog(props);

    let sideofCursorclickX = "",
      sideofCursorclickY = "",
      screenwidth = "",
      screenheight = "",
      eventClientXPosition = "",
      eventClientYPosition = "";
    if (sitestatedata && sitestatedata.devicedata) {
      screenwidth = sitestatedata.devicedata.screenwidth;
      screenheight = sitestatedata.devicedata.screenheight;
    }
    if (methodprops && methodprops.e) {
      eventClientXPosition = methodprops.e.clientX;
      eventClientYPosition = methodprops.e.clientY;
    }

    if (
      screenwidth !== "" &&
      screenwidth !== undefined &&
      eventClientXPosition !== "" &&
      eventClientXPosition !== undefined
    ) {
      if (eventClientXPosition < screenwidth / 2) {
        sideofCursorclickX = "left";
      } else {
        sideofCursorclickX = "right";
      }
    }

    if (
      screenheight !== "" &&
      screenheight !== undefined &&
      eventClientYPosition !== "" &&
      eventClientYPosition !== undefined
    ) {
      if (eventClientYPosition < screenheight / 2) {
        sideofCursorclickY = "top";
      } else {
        sideofCursorclickY = "bottom";
      }
    }

    if (type === "executeclick" && modetype !== "build") {
      alltypecompconsolelog(methodprops.e.clientX);

      let metadataforclick = props.metadata;

      if (
        metadataforclick.onclick &&
        (metadataforclick.onclick.type === "openpopup" ||
          metadataforclick.onclick.type === "openselect")
      ) {
        updateCompstateandRefresh({
          openpopup: true,
          sideofCursorclickX: sideofCursorclickX,
          sideofCursorclickY: sideofCursorclickY,
        });
      } else if (
        props.metadata.onclick &&
        props.metadata.onclick.type === "updatealltypecompstatedataandopenpopup"
      ) {
        let clickhandlerresult = await alltypecompClickHandler({
          sectioncolumnmetadata: props.metadata,
          sitestatedata: sitestatedata,
          templateareaitemstatedata: props.templateareaitemstatedata,
          alltypecompstatedata: compstate.alltypecompstatedata,
        });

        compstate.alltypecompstatedata =
          clickhandlerresult.alltypecompstatedata;
        updateCompstateandRefresh({
          openpopup: true,
          sideofCursorclickX: sideofCursorclickX,
          sideofCursorclickY: sideofCursorclickY,
          alltypecompstatedata: compstate.alltypecompstatedata,
        });
      } else if (
        props.metadata.onclick &&
        props.metadata.onclick.type !== "" &&
        props.metadata.onclick.type !== undefined
      ) {
        props.parenthandleClick({
          type: "executeclickfromalltypecomp",
          metadata: props.metadata,
          templateareaitemstatedata: props.templateareaitemstatedata,
        });
      } else {
        // props.parenthandleClick({
        //     type: "executeclickfromalltypecomp",
        //     metadata: props.metadata,
        //     templateareaitemstatedata: props.templateareaitemstatedata,
        // });
      }
    } else if (type === "closepopup") {
      updateCompstateandRefresh({
        openpopup: false,
        sideofCursorclickX: "",
        sideofCursorclickY: "",
      });
    } else if (
      type === "executeclick" &&
      modetype === "build" &&
      compstate.showbuildpropsui === false
    ) {
      updateCompstateandRefresh({
        modetype: compstate.modetype,
        showbuildpropsui: true,
        metadata: compstate.metadata,
      });
    } else if (type === "executeallowdrop" && modetype === "build" && draggable) {
      allowDrop(methodprops.e);
    } else if (type === "executedragstart" && draggable) {
      dragstart(methodprops.e);
    } else if (type === "executedragenter" && modetype === "build" && draggable) {
      dragEnter(methodprops.e);
    } else if (type === "executedragleave" && modetype === "build" && draggable) {
      dragLeave(methodprops.e);
    } else if (type === "executekeyup" && modetype !== "build") {
    } else if (type === "executekeyup" && modetype === "build") {
      alltypecompconsolelog(methodprops.e.which);
      if (methodprops.e.which === 46) {
        props.parenthandleClick({
          type: "deletesectioncolumn",
          metadata: props.metadata,
        });
      }
    } else if (type === "dropalltypecompprepost") {
      props.parenthandleClick({
        ...methodprops,
        type: "dropsectioncolumnprepost",
      });
    } else if (
      (type === "savefromtemplateareaitem" &&
        compstate.metadata.type === "inputoutputfield" &&
        compstate.metadata.inputoutputfieldprops.type === "templateareaitem") ||
      (type === "savefrombuildtablequerymetadatapanelhtml" &&
        compstate.metadata.type === "inputoutputfield" &&
        compstate.metadata.inputoutputfieldprops.type ===
        "templateareaitemquery")
    ) {
      let metadatajs = JSON.parse(JSON.stringify(compstate.metadata));
      metadatajs.inputoutputfieldprops.defaultvalue =
        methodprops.templatemetadata;
      // props.parenthandleClick({
      //     type: "savefromalltypecomp",
      //     metadata: metadatajs,
      // });
      await updateCompstateandRefresh({
        metadata: metadatajs,
        defaultvaluefromservermodified: methodprops.templatemetadata,
      });

      props.parenthandleChange({
        type: "executechangefromalltypecomp",
        metadata: props.metadata,
        value: methodprops.templatemetadata,
        templateareaitemstatedata: props.templateareaitemstatedata,
      });
    } else if (
      type === "savefromtemplateareaitem" &&
      compstate.metadata.type === "inputoutputfield" &&
      compstate.metadata.inputoutputfieldprops.type === "islinkedcolumn"
    ) {
      let metadatajs = JSON.parse(JSON.stringify(compstate.metadata));
      metadatajs.inputoutputfieldprops.defaultvalue =
        methodprops.templatemetadata;
      // props.parenthandleClick({
      //     type: "savefromalltypecomp",
      //     metadata: metadatajs,
      // });
      await updateCompstateandRefresh({
        metadata: metadatajs,
        defaultvaluefromservermodified: methodprops.templatemetadata,
      });

      props.parenthandleChange({
        type: "executechangefromalltypecomp",
        metadata: props.metadata,
        value: metadatajs,
        templateareaitemstatedata: props.templateareaitemstatedata,
      });
    } else if (
      type === "savefromalltypecomp" &&
      compstate.metadata.type === "inputoutputfield" &&
      (compstate.metadata.inputoutputfieldprops.type ===
        "tablebuttonmetadatafield" ||
        compstate.metadata.inputoutputfieldprops.type ===
        "tablecolumnmetadatafield")
    ) {
      let metadatajs = JSON.parse(JSON.stringify(compstate.metadata));
      metadatajs.inputoutputfieldprops.defaultvalue = methodprops.metadata;
      // props.parenthandleClick({
      //     type: "savefromalltypecomp",
      //     metadata: metadatajs,
      // });
      await updateCompstateandRefresh({
        metadata: metadatajs,
        defaultvaluefromservermodified: methodprops.metadata,
      });

      props.parenthandleChange({
        type: "executechangefromalltypecomp",
        metadata: props.metadata,
        value: methodprops.metadata,
        templateareaitemstatedata: props.templateareaitemstatedata,
      });
    } else if (type === "cleardefaultvalue") {
      await updateCompstateandRefresh({
        defaultvaluefromservermodified: "nullvalue",
        openpopup: false,
        sideofCursorclickX: "",
        sideofCursorclickY: "",
      });

      props.parenthandleChange({
        type: "executechangefromalltypecomp",
        metadata: props.metadata,
        value: "",
        valuesubtypename: "",
        templateareaitemstatedata: props.templateareaitemstatedata,
      });
    }
  };

  let handleChange = async (methodprops) => {
    alltypecompconsolelog("Alltypecomp-handleChange");
    alltypecompconsolelog(methodprops);
    let { modetype, draggable, sitestatedata } = props;

    let { type, order, valuesubtypename, defaultvaluefromserver } = methodprops;
    let changedvalue = methodprops.value;

    let isvalid = true;
    if (
      props.metadata.inputoutputfieldprops &&
      (props.metadata.inputoutputfieldprops.type === "email") &&
      changedvalue &&
      changedvalue !== "" &&
      (!changedvalue.includes("@") || !changedvalue.includes(".com"))
    ) {
      alert("Incorrect email");
      isvalid = false;
    }



    if (
      props.metadata.inputoutputfieldprops &&
      props.metadata.inputoutputfieldprops.type === "date" &&
      changedvalue &&
      changedvalue !== ""
    ) {
      let changedvaluedate = new Date(changedvalue + "T00:00:00");

      changedvalue = changedvaluedate.toISOString();
    }

    if (
      props.metadata.inputoutputfieldprops &&
      (props.metadata.inputoutputfieldprops.type === "datetime" ||
        props.metadata.inputoutputfieldprops.type === "relativedatetime") &&
      changedvalue &&
      changedvalue !== ""
    ) {
      let changedvaluedate = new Date(changedvalue);

      changedvalue = changedvaluedate.toISOString();
    }

    if (
      props.metadata.inputoutputfieldprops &&
      (props.metadata.inputoutputfieldprops.type === "datetime" ||
        props.metadata.inputoutputfieldprops.type === "relativedatetime") &&
      changedvalue &&
      changedvalue !== ""
    ) {
      let changedvaluedate = new Date(changedvalue);

      changedvalue = changedvaluedate.toISOString();
    }

    let changedvaluetoparent = "";
    if (valuesubtypename && valuesubtypename !== "" && (defaultvaluefromserver === undefined || defaultvaluefromserver === "")) {
      changedvaluetoparent = {};
      changedvaluetoparent[valuesubtypename] = changedvalue;
    }
    else if (valuesubtypename && valuesubtypename !== "" && defaultvaluefromserver !== undefined && defaultvaluefromserver !== "") {
      changedvaluetoparent = defaultvaluefromserver;
      changedvaluetoparent[valuesubtypename] = changedvalue;
    }
    else {
      changedvaluetoparent = changedvalue;
    }



    if (
      modetype !== "build" &&
      props.metadata.onchange &&
      props.metadata.onchange.type !== "" &&
      props.metadata.onchange.type !== undefined &&
      isvalid === true
    ) {





      props.parenthandleChange({
        type: "executechangefromalltypecomp",
        metadata: props.metadata,
        value: changedvaluetoparent,
        valuesubtypename: "",
        templateareaitemstatedata: props.templateareaitemstatedata,
      });

      if (
        props.metadata.inputoutputfieldprops &&
        (props.metadata.inputoutputfieldprops.type === "rating") &&
        changedvaluetoparent &&
        changedvaluetoparent !== ""
      ) {
        await updateCompstateandRefresh({
          defaultvaluefromservermodified:
            changedvaluetoparent,
        });
      }





    }
  };

  let handleBlur = async (methodprops) => {
    alltypecompconsolelog("Alltypecomp-handleBlur");
    alltypecompconsolelog(methodprops);
  }

  let handleMouseup = async (methodprops) => {
    alltypecompconsolelog("Alltypecomp-handleMouseup");
    alltypecompconsolelog(methodprops);

    const selObj = window.getSelection();
    alert(selObj);
    alert(selObj.anchorOffset);
    const selRange = selObj.getRangeAt(0);
    alert(selRange);
  }

  let fromchildhandleClick = async (methodprops) => {
    alltypecompconsolelog("Alltypecomp-fromchildhandleClick");
    alltypecompconsolelog(methodprops);

    let { type, order } = methodprops;
    let { sitestatedata } = props;

    let sideofCursorclickX = "",
      sideofCursorclickY = "",
      screenwidth = "",
      screenheight = "",
      eventClientXPosition = "",
      eventClientYPosition = "";
    if (sitestatedata && sitestatedata.devicedata) {
      screenwidth = sitestatedata.devicedata.screenwidth;
      screenheight = sitestatedata.devicedata.screenheight;
    }
    if (methodprops && methodprops.e) {
      eventClientXPosition = methodprops.e.clientX;
      eventClientYPosition = methodprops.e.clientY;
    }

    if (
      screenwidth !== "" &&
      screenwidth !== undefined &&
      eventClientXPosition !== "" &&
      eventClientXPosition !== undefined
    ) {
      if (eventClientXPosition < screenwidth / 2) {
        sideofCursorclickX = "left";
      } else {
        sideofCursorclickX = "right";
      }
    }

    if (
      screenheight !== "" &&
      screenheight !== undefined &&
      eventClientYPosition !== "" &&
      eventClientYPosition !== undefined
    ) {
      if (eventClientYPosition < screenheight / 2) {
        sideofCursorclickY = "top";
      } else {
        sideofCursorclickY = "bottom";
      }
    }

    if (type === "closepopup") {
      updateCompstateandRefresh({
        openpopup: false,
        sideofCursorclickX: "",
        sideofCursorclickY: "",
      });
    } else if (type === "draftsavefromeditpropscomp") {
      showuiHandler({
        modetype: compstate.modetype,
        metadata: methodprops.metadata,
        showbuildpropsui: compstate.showbuildpropsui,
      });
    } else if (type === "draftsavefromeditpropscompandrefreshui") {
      updateCompstateandRefresh({
        modetype: compstate.modetype,
        metadata: methodprops.metadata,
        showbuildpropsui: compstate.showbuildpropsui,
      });
    } else if (type === "cancelfromeditpropscomp") {
      updateCompstateandRefresh({
        modetype: compstate.modetype,
        metadata: JSON.parse(JSON.stringify(props.metadata)),
        showbuildpropsui: false,
      });
    } else if (type === "savefromeditpropscomp") {
      props.parenthandleClick({
        type: "savefromalltypecomp",
        metadata: methodprops.metadata,
      });
    } else if (
      type === "deletealltypecomp" ||
      type === "deletefromeditpropscomp"
    ) {
      props.parenthandleClick({
        ...methodprops,
        type: "deletesectioncolumn",
        metadata: props.metadata,
      });
    } else if (type === "duplicatefromeditpropscomp") {
      props.parenthandleClick({
        ...methodprops,
        type: "duplicatesectioncolumn",
        metadata: props.metadata,
      });
    } else if (type === "addtofavouritesfromeditpropscomp") {
      let favouriteuiconfigslist = [];
      let dbuser = {};
      if (
        sitestatedata.signedindbuserdata &&
        sitestatedata.signedindbuserdata.id
      ) {
        dbuser = sitestatedata.signedindbuserdata;
      }
      if (
        sitestatedata.signedinvendordbuserdata &&
        sitestatedata.signedinvendordbuserdata.id
      ) {
        dbuser = sitestatedata.signedinvendordbuserdata;
      }
      favouriteuiconfigslist.push({
        id: "fv-" + dbuser.id + "-" + methodprops.name,
        orgname: props.sitestatedata.orgdata.data.name,
        data: { metadata: props.metadata, name: methodprops.name },
      });
      await inserttabledatainDatabase({
        tablename: "favouriteuiconfigs",
        tabledatalist: favouriteuiconfigslist,
      });
      // props.parenthandleClick({
      //     type: "executeonsiteparent",
      //     metadata: props.metadata,
      // });
      props.parenthandleClick({
        type: "executeonsiteparent",
        sitestatedata: {},
        isupdatesitestatedata: false,
        isrefreshsiteparent: true,
        isredirect: false,
        isrefreshcompparent: false,
      });
    } else if (type === "executeclickfromeditpropscomp") {
      if (
        props.metadata.onclick &&
        (props.metadata.onclick.type === "openpopup" ||
          props.metadata.onclick.type ===
          "updatealltypecompstatedataandopenpopup" ||
          props.metadata.onclick.type === "openselect")
      ) {
        updateCompstateandRefresh({
          openpopup: true,
          showbuildpropsui: false,
          sideofCursorclickX: sideofCursorclickX,
          sideofCursorclickY: sideofCursorclickY,
        });
      } else {
        props.parenthandleClick({
          type: "executeclickfromalltypecomp",
          metadata: props.metadata,
          templateareaitemstatedata: props.templateareaitemstatedata,
        });
      }
    } else if (type === "makemodetypebuildfromtemplateareaitem") {
      // from popup
      await hideuiHandler({
        showalltypecomppopupinbuildmode: false,
        openpopup: false,
      });
      await showuiHandler({
        showalltypecomppopupinbuildmode: true,
        openpopup: true,
      });
    } else if (type === "savefromtemplateareaitem") {
      // from popu
      let metadatajs = JSON.parse(JSON.stringify(compstate.metadata));
      metadatajs.onclick.popupmetadata = methodprops.templatemetadata;
      props.parenthandleClick({
        type: "savefromalltypecomp",
        metadata: metadatajs,
      });
    } else if (
      type === "executeonpopupparent" ||
      type === "executeonsiteparent"
    ) {
      if (
        methodprops.selecteduirepeatrecorddata &&
        methodprops.selecteduirepeatrecorddata.data
      ) {
        await updateCompstateandRefresh({
          defaultvaluefromservermodified:
            methodprops.selecteduirepeatrecorddata.data.recordid,
          openpopup: false,
          sideofCursorclickX: "",
          sideofCursorclickY: "",
        });

        props.parenthandleChange({
          type: "executechangefromalltypecomp",
          metadata: props.metadata,
          value: methodprops.selecteduirepeatrecorddata.data.recordid,
          valuesubtypename: "",
          templateareaitemstatedata: props.templateareaitemstatedata,
        });
      } else {
        props.parenthandleClick({
          ...methodprops,
        });
      }
    }
  };

  let fromchildhandleChange = async (methodprops) => {
    alltypecompconsolelog("Alltypecomp-fromchildhandleChange");
    let { type, order } = methodprops;
    alltypecompconsolelog(methodprops);
    let { modetype, draggable, sitestatedata } = props;

    props.parenthandleChange({
      ...methodprops,
    });
  };
  alltypecompconsolelog("Alltypecomp-render");
  alltypecompconsolelog(props);
  alltypecompconsolelog(compstate);

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
    templateareaitemstatedata,
    sitestatedata,
  } = props;

  let {
    showbuildpropsui,
    metadata,
    openpopup,
    sideofCursorclickX,
    sideofCursorclickY,
    showalltypecomppopupinbuildmode,
    showui,
    alltypecompstatedata,
  } = compstate;

  let defaultvaluefromserver = "";
  if (showui !== true) {
    return <></>;
  } else {
    if (
      metadata.uivaluefromdatabasetablename !== "" &&
      metadata.uivaluefromdatabasetablecolumnname !== "" &&
      metadata.uivaluefromdatabasetablename === "uirepeatrecorddata" &&
      templateareaitemstatedata &&
      templateareaitemstatedata.uirepeatrecorddata &&
      templateareaitemstatedata.uirepeatrecorddata.data
    ) {
      defaultvaluefromserver =
        templateareaitemstatedata.uirepeatrecorddata.data[
        metadata.uivaluefromdatabasetablecolumnname
        ];
      if (
        metadata.uivaluefromdatabasetablecolumnname === "id" ||
        metadata.uivaluefromdatabasetablecolumnname === "orgname"
      ) {
        defaultvaluefromserver =
          templateareaitemstatedata.uirepeatrecorddata[
          metadata.uivaluefromdatabasetablecolumnname
          ];
      }

      if (
        metadata.type !== "image" &&
        metadata.type !== "inputoutputfield" &&
        metadata.type !== "inputoutputfield"
      ) {
        metadata.innerText = defaultvaluefromserver;
      }
    } else if (
      metadata.uivaluefromdatabasetablename !== "" &&
      metadata.uivaluefromdatabasetablecolumnname !== "" &&
      metadata.uivaluefromdatabasetablename === "listdisplaycolumndata" &&
      templateareaitemstatedata &&
      templateareaitemstatedata.uirepeatrecorddata &&
      templateareaitemstatedata.uirepeatrecorddata.data &&
      templateareaitemstatedata.uirepeatrecorddata.data.listdisplaycolumndata
    ) {
      defaultvaluefromserver =
        templateareaitemstatedata.uirepeatrecorddata.data.listdisplaycolumndata[
        metadata.uivaluefromdatabasetablecolumnname
        ];

      if (
        metadata.type !== "image" &&
        metadata.type !== "inputoutputfield" &&
        metadata.type !== "inputoutputfield"
      ) {
        metadata.innerText = defaultvaluefromserver;
      }
    } else if (
      metadata.uivaluefromdatabasetablename !== "" &&
      metadata.uivaluefromdatabasetablecolumnname !== "" &&
      metadata.uivaluefromdatabasetablename === "orgdata" &&
      sitestatedata &&
      sitestatedata.orgdata &&
      sitestatedata.orgdata.data
    ) {
      defaultvaluefromserver =
        sitestatedata.orgdata.data[metadata.uivaluefromdatabasetablecolumnname];
    } else if (
      metadata.uivaluefromdatabasetablename !== "" &&
      metadata.uivaluefromdatabasetablecolumnname !== "" &&
      metadata.uivaluefromdatabasetablename === "signedindbuserdata" &&
      sitestatedata &&
      sitestatedata.signedindbuserdata &&
      sitestatedata.signedindbuserdata.data
    ) {
      defaultvaluefromserver =
        sitestatedata.signedindbuserdata.data[
        metadata.uivaluefromdatabasetablecolumnname
        ];
    } else if (
      metadata.uivaluefromdatabasetablename !== "" &&
      metadata.uivaluefromdatabasetablecolumnname !== "" &&
      metadata.uivaluefromdatabasetablename === "signedinvendordbuserdata" &&
      sitestatedata &&
      sitestatedata.signedinvendordbuserdata &&
      sitestatedata.signedinvendordbuserdata.data
    ) {
      defaultvaluefromserver =
        sitestatedata.signedinvendordbuserdata.data[
        metadata.uivaluefromdatabasetablecolumnname
        ];
    } else if (
      metadata.uivaluefromdatabasetablename !== "" &&
      metadata.uivaluefromdatabasetablecolumnname !== "" &&
      metadata.uivaluefromdatabasetablename === "sitestatedata" &&
      sitestatedata &&
      sitestatedata.onchangedata
      // && sitestatedata.onchangedata[ metadata.uivaluefromdatabasetablecolumnname]
    ) {
      defaultvaluefromserver =
        sitestatedata.onchangedata[metadata.uivaluefromdatabasetablecolumnname];
    } else if (
      metadata.uivaluefromdatabasetablename !== "" &&
      metadata.uivaluefromdatabasetablecolumnname !== "" &&
      metadata.uivaluefromdatabasetablename === "templateareaitemstatedata" &&
      templateareaitemstatedata &&
      templateareaitemstatedata.onchangedata &&
      templateareaitemstatedata.onchangedata[
      templateareaitemstatedata.lstobjindex
      ]
    ) {
      defaultvaluefromserver =
        templateareaitemstatedata.onchangedata[
        templateareaitemstatedata.lstobjindex
        ][metadata.uivaluefromdatabasetablecolumnname];
    } else if (metadata.inputoutputfieldprops) {
      defaultvaluefromserver = metadata.inputoutputfieldprops.defaultvalue;
    }

    if (compstate.defaultvaluefromservermodified) {
      defaultvaluefromserver = compstate.defaultvaluefromservermodified;
    }

    let elementHtml = [];
    if (metadata.type !== "image" && metadata.type !== "inputoutputfield") {
      //   if (defaultvaluefromserver === "") {
      //     defaultvaluefromserver = metadata.innerText;
      //   }
      elementHtml.push(
        <div
          onClick={(e) =>
            handleClick({ e, type: "executeclick", order: metadata.order })
          }
        >
          <Textcomphtml
            modetype={modetype}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={props.templateareaitemstatedata}
            defaultvaluefromserver={defaultvaluefromserver}
            metadata={metadata}
            parenthandleClick={(props) => handleClick(props)}
            parenthandleChange={(props) => handleChange(props)}
          />
        </div>
      );
    } else if (metadata.type === "image") {
      if (defaultvaluefromserver === "") {
        defaultvaluefromserver = metadata.imgicon.name;
      }
      elementHtml.push(
        <div
          onClick={(e) =>
            handleClick({ e, type: "executeclick", order: metadata.order })
          }
        >
          <Imagecomphtml
            modetype={modetype}
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={props.templateareaitemstatedata}
            defaultvaluefromserver={defaultvaluefromserver}
            metadata={metadata}
            parenthandleClick={(e) =>
              handleClick({ e, type: "executeclick", order: metadata.order })
            }
            parenthandleChange={(props) => handleChange(props)}
          />
        </div>
      );
    } else if (
      metadata.type === "inputoutputfield" &&
      metadata.inputoutputfieldprops.type !== "templateareaitem" &&
      metadata.inputoutputfieldprops.type !== "templateareaitemquery" &&
      metadata.inputoutputfieldprops.type !== "islinkedcolumn" &&
      metadata.inputoutputfieldprops.type !== "templateareaitemlist" &&
      metadata.inputoutputfieldprops.type !== "tablebuttonmetadatafield" &&
      metadata.inputoutputfieldprops.type !== "tablecolumnmetadatafield" &&
      metadata.inputoutputfieldprops.type !== "tablebuttonmetadatafieldref" &&
      metadata.inputoutputfieldprops.type !== "tablecolumnmetadatafieldref" &&
      metadata.inputoutputfieldprops.type !== "siteversionpagemetadata" &&
      metadata.inputoutputfieldprops.type !== "vendorsiteversionpagemetadata" &&
      metadata.inputoutputfieldprops.inputmode === "true"
    ) {
      if (defaultvaluefromserver === "") {
        defaultvaluefromserver = metadata.inputoutputfieldprops.defaultvalue;
      }
      if (
        metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.orientation === "horizontal"
      ) {
        elementHtml.push(
          <div
            style={{ display: "inline-flex", width: "100%" }}
            onClick={(e) =>
              handleClick({ e, type: "executeclick", order: metadata.order })
            }
          >
            <Textcomphtml
              modetype={modetype}
              sitestatedata={props.sitestatedata}
              templateareaitemstatedata={props.templateareaitemstatedata}
              defaultvaluefromserver=""
              metadata={metadata}
              parenthandleClick={(props) => handleClick(props)}
              parenthandleChange={(props) => handleChange(props)}
            />
            <Inputcomphtml
              modetype={modetype}
              sitestatedata={props.sitestatedata}
              templateareaitemstatedata={props.templateareaitemstatedata}
              defaultvaluefromserver={defaultvaluefromserver}
              metadata={metadata}
              parenthandleClick={(props) => handleClick(props)}
              parenthandleChange={(props) => handleChange(props)}
              parenthandleBlur={(props) => handleBlur(props)}
              parenthandleMouseup={(props) => handleMouseup(props)}
            />
          </div>
        );
      } else {
        elementHtml.push(
          <div
            style={{ display: "inline-block", width: "100%" }}
            onClick={(e) =>
              handleClick({ e, type: "executeclick", order: metadata.order })
            }
          >
            <Textcomphtml
              modetype={modetype}
              sitestatedata={props.sitestatedata}
              templateareaitemstatedata={props.templateareaitemstatedata}
              defaultvaluefromserver=""
              metadata={metadata}
              parenthandleClick={(props) => handleClick(props)}
              parenthandleChange={(props) => handleChange(props)}
            />
            <div style={{ width: "100%" }}>
              <Inputcomphtml
                modetype={modetype}
                sitestatedata={props.sitestatedata}
                templateareaitemstatedata={props.templateareaitemstatedata}
                defaultvaluefromserver={defaultvaluefromserver}
                metadata={metadata}
                parenthandleClick={(props) => handleClick(props)}
                parenthandleChange={(props) => handleChange(props)}
                parenthandleBlur={(props) => handleBlur(props)}
                parenthandleMouseup={(props) => handleMouseup(props)}
              />
            </div>
          </div>
        );
      }
    } else if (
      metadata.type === "inputoutputfield" &&
      metadata.inputoutputfieldprops.type !== "templateareaitem" &&
      metadata.inputoutputfieldprops.type !== "templateareaitemquery" &&
      metadata.inputoutputfieldprops.type !== "islinkedcolumn" &&
      metadata.inputoutputfieldprops.type !== "templateareaitemlist" &&
      metadata.inputoutputfieldprops.type !== "tablebuttonmetadatafield" &&
      metadata.inputoutputfieldprops.type !== "tablecolumnmetadatafield" &&
      metadata.inputoutputfieldprops.type !== "tablebuttonmetadatafieldref" &&
      metadata.inputoutputfieldprops.type !== "tablecolumnmetadatafieldref" &&
      metadata.inputoutputfieldprops.type !== "siteversionpagemetadata" &&
      metadata.inputoutputfieldprops.type !== "vendorsiteversionpagemetadata" &&
      metadata.inputoutputfieldprops.inputmode !== "true"
    ) {
      if (defaultvaluefromserver === "") {
        defaultvaluefromserver = metadata.inputoutputfieldprops.defaultvalue;
      }
      if (
        metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.orientation === "horizontal"
      ) {
        elementHtml.push(
          <div
            style={{ display: "inline-flex", alignItems: "center", width: "100%" }}
            onClick={(e) =>
              handleClick({ e, type: "executeclick", order: metadata.order })
            }
          >
            <Textcomphtml
              modetype={modetype}
              sitestatedata={props.sitestatedata}
              templateareaitemstatedata={props.templateareaitemstatedata}
              defaultvaluefromserver=""
              metadata={metadata}
              parenthandleClick={(props) => handleClick(props)}
              parenthandleChange={(props) => handleChange(props)}
            />{" "}
            :
            <Outputcomphtml
              modetype={modetype}
              sitestatedata={props.sitestatedata}
              templateareaitemstatedata={props.templateareaitemstatedata}
              defaultvaluefromserver={defaultvaluefromserver}
              metadata={metadata}
              parenthandleClick={(props) => handleClick(props)}
              parenthandleChange={(props) => handleChange(props)}
            />
          </div>
        );
      } else {
        elementHtml.push(
          <div
            style={{ display: "inline-block", width: "100%" }}
            onClick={(e) =>
              handleClick({ e, type: "executeclick", order: metadata.order })
            }
          >
            <Textcomphtml
              modetype={modetype}
              sitestatedata={props.sitestatedata}
              templateareaitemstatedata={props.templateareaitemstatedata}
              defaultvaluefromserver=""
              metadata={metadata}
              parenthandleClick={(props) => handleClick(props)}
              parenthandleChange={(props) => handleChange(props)}
            />
            <div style={{ width: "100%" }}>
              <Outputcomphtml
                modetype={modetype}
                sitestatedata={props.sitestatedata}
                templateareaitemstatedata={props.templateareaitemstatedata}
                defaultvaluefromserver={defaultvaluefromserver}
                metadata={metadata}
                parenthandleClick={(props) => handleClick(props)}
                parenthandleChange={(props) => handleChange(props)}
              />
            </div>
          </div>
        );
      }
    } else if (
      metadata.type === "inputoutputfield" &&
      (metadata.inputoutputfieldprops.type === "siteversionpagemetadata" ||
        metadata.inputoutputfieldprops.type === "vendorsiteversionpagemetadata")
    ) {
      let modetypetemplateareaitem = "";
      if (
        metadata.inputoutputfieldprops.inputmode === "true" &&
        (modetype === "normal" || modetype === "buildicon")
      ) {
        modetypetemplateareaitem = "build";
      } else {
        modetypetemplateareaitem = "normal";
      }

      let innertextvalue = metadata.innerText;

      if (innertextvalue === "" || innertextvalue === undefined) {
        innertextvalue = "blank";
      }

      if (defaultvaluefromserver === "" || defaultvaluefromserver === undefined) {
        defaultvaluefromserver = metadata.inputoutputfieldprops.defaultvalue;
      }

      elementHtml.push(
        <div style={{ display: "inline-block", width: "100%" }}>
          <div
            onClick={(e) =>
              handleClick({ e, type: "executeclick", order: metadata.order })
            }
          >
            {innertextvalue}
          </div>

          {defaultvaluefromserver !== undefined &&
            defaultvaluefromserver !== "" ? (
            <>
              <Templatearealistcomp
                isparentalltypecomp="true"
                sitestatedata={props.sitestatedata}
                modetype={modetypetemplateareaitem}
                siteversionpagemetadataid={
                  metadata.inputoutputfieldprops.type ===
                    "siteversionpagemetadata"
                    ? defaultvaluefromserver
                    : ""
                }
                vendorsiteversionpagemetadataid={
                  metadata.inputoutputfieldprops.type ===
                    "vendorsiteversionpagemetadata"
                    ? defaultvaluefromserver
                    : ""
                }
                sitetemplatemetadataid=""
                // parenthandleClick={(props) => fromchildhandleClick({...props,type:"executeonsiteparent", subtype:"executeclickfromtemplatearealist"})}
                // parenthandleChange={(props) => fromchildhandleChange({...props,type:"executeonsiteparent", subtype:"executechangefromtemplatearealist"})}
                parenthandleClick={() => { }}
                parenthandleChange={() => { }}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      );
    } else if (
      metadata.type === "inputoutputfield" &&
      metadata.inputoutputfieldprops.type === "templateareaitem"
    ) {
      let modetypetemplateareaitem = "";
      if (
        metadata.inputoutputfieldprops.inputmode === "true" &&
        (modetype === "normal" || modetype === "buildicon")
      ) {
        modetypetemplateareaitem = "build";
      } else {
        modetypetemplateareaitem = "normal";
      }

      let innertextvalue = metadata.innerText;
      if (innertextvalue === "" || innertextvalue === undefined) {
        innertextvalue = "blank";
      }

      if (defaultvaluefromserver === "" || defaultvaluefromserver === undefined) {
        defaultvaluefromserver = metadata.inputoutputfieldprops.defaultvalue;
      }

      if (compstate.defaultvaluefromservermodified) {
        defaultvaluefromserver = compstate.defaultvaluefromservermodified;
      }

      elementHtml.push(
        <div style={{ display: "inline-block", width: "100%" }}>
          <div
            onClick={(e) =>
              handleClick({ e, type: "executeclick", order: metadata.order })
            }
          >
            {innertextvalue}
          </div>
          <Alltypetemplateareaitemcomp
            isparenttablelayoutmetadatafield="true"
            parentalltypecompstatedata={{}}
            sitestatedata={props.sitestatedata}
            templatemetadata={defaultvaluefromserver}
            modetype={modetypetemplateareaitem}
            draggable={false}
            parenthandleClick={(props) => handleClick(props)}
            parenthandleChange={(props) => handleChange(props)}
          />
        </div>
      );
    } else if (
      metadata.type === "inputoutputfield" &&
      metadata.inputoutputfieldprops.type === "templateareaitemquery"
    ) {
      let modetypetemplateareaitem = "";
      if (
        metadata.inputoutputfieldprops.inputmode === "true" &&
        (modetype === "normal" || modetype === "buildicon")
      ) {
        modetypetemplateareaitem = "build";
      } else {
        modetypetemplateareaitem = "normal";
      }

      let innertextvalue = metadata.innerText;
      if (innertextvalue === "" || innertextvalue === undefined) {
        innertextvalue = "blank";
      }

      if (defaultvaluefromserver === "" || defaultvaluefromserver === undefined) {
        defaultvaluefromserver = metadata.inputoutputfieldprops.defaultvalue;
      }

      if (compstate.defaultvaluefromservermodified) {
        defaultvaluefromserver = compstate.defaultvaluefromservermodified;
      }

      elementHtml.push(
        <div style={{ display: "inline-block", width: "100%" }}>
          <div
            onClick={(e) =>
              handleClick({ e, type: "executeclick", order: metadata.order })
            }
          >
            {innertextvalue}
          </div>

          {defaultvaluefromserver ? (
            <Buildtablequerymetadatapanelhtml
              sitestatedata={props.sitestatedata}
              templateareaitemstatedata={props.templateareaitemstatedata}
              templatemetadata={defaultvaluefromserver}
              modetype={modetypetemplateareaitem}
              parenthandleClick={(props) => handleClick(props)}
              parenthandleChange={(props) => handleChange(props)}
            />
          ) : (
            <></>
          )}
        </div>
      );
    } else if (
      metadata.type === "inputoutputfield" &&
      metadata.inputoutputfieldprops.type === "templateareaitemlist"
    ) {
      let innertextvalue = metadata.innerText;
      if (innertextvalue === "" || innertextvalue === undefined) {
        innertextvalue = "blank";
      }

      elementHtml.push(
        <div style={{ display: "inline-block", width: "100%" }}>
          <div
            onClick={(e) =>
              handleClick({ e, type: "executeclick", order: metadata.order })
            }
          >
            {innertextvalue}
          </div>
        </div>
      );
    } else if (
      metadata.type === "inputoutputfield" &&
      (metadata.inputoutputfieldprops.type === "tablebuttonmetadatafield" ||
        metadata.inputoutputfieldprops.type === "tablecolumnmetadatafield")
    ) {
      let modetypetablebuttonmetadatafield = "";
      if (
        metadata.inputoutputfieldprops.inputmode === "true" &&
        (modetype === "normal" || modetype === "buildicon")
      ) {
        modetypetablebuttonmetadatafield = "build";
      } else {
        modetypetablebuttonmetadatafield = "normal";
      }

      let innertextvalue = metadata.innerText;
      if (innertextvalue === "" || innertextvalue === undefined) {
        innertextvalue = "blank";
      }

      if (defaultvaluefromserver === "" || defaultvaluefromserver === undefined) {
        defaultvaluefromserver = metadata.inputoutputfieldprops.defaultvalue;
      }

      if (compstate.defaultvaluefromservermodified) {
        defaultvaluefromserver = compstate.defaultvaluefromservermodified;
      }

      elementHtml.push(
        <div style={{ display: "inline-block", width: "100%" }}>
          <div
            onClick={(e) =>
              handleClick({ e, type: "executeclick", order: metadata.order })
            }
          >
            {innertextvalue}
          </div>

          <Alltypecomp
            sitestatedata={props.sitestatedata}
            templateareaitemstatedata={props.templateareaitemstatedata}
            draggable={false}
            metadata={defaultvaluefromserver}
            modetype={modetypetablebuttonmetadatafield}
            parenthandleClick={(props) => handleClick(props)}
            parenthandleChange={(props) => handleChange(props)}
          />
        </div>
      );
    } else if (
      metadata.type === "inputoutputfield" &&
      (metadata.inputoutputfieldprops.type === "tablebuttonmetadatafieldref" ||
        metadata.inputoutputfieldprops.type === "tablecolumnmetadatafieldref")
    ) {
      let modetypetablebuttonmetadatafield = "";
      // if (metadata.inputoutputfieldprops.inputmode === "true" && (modetype === "normal" || modetype === "buildicon")) {
      //     modetypetablebuttonmetadatafield = "build";
      // }
      // else {
      //     modetypetablebuttonmetadatafield = "normal";
      // }

      let innertextvalue = "";
      if (metadata.inputoutputfieldprops.refobjectname) {
        innertextvalue =
          innertextvalue + metadata.inputoutputfieldprops.refobjectname;
      }
      if (metadata.inputoutputfieldprops.refname) {
        innertextvalue =
          innertextvalue + metadata.inputoutputfieldprops.refname;
      }

      // if (innertextvalue === "" || innertextvalue === undefined) {
      //     innertextvalue = "blank";
      // }

      // if (defaultvaluefromserver === "" || defaultvaluefromserver === undefined) {
      //     defaultvaluefromserver = metadata.inputoutputfieldprops.defaultvalue;
      // }

      // if (compstate.defaultvaluefromservermodified) {
      //     defaultvaluefromserver = compstate.defaultvaluefromservermodified;
      // }

      elementHtml.push(
        <div style={{ display: "inline-block", width: "100%" }}>
          <div
            onClick={(e) =>
              handleClick({ e, type: "executeclick", order: metadata.order })
            }
          >
            {innertextvalue}
          </div>

          {/* <Alltypecomp
                      sitestatedata={props.sitestatedata}
                      templateareaitemstatedata={props.templateareaitemstatedata}
                      draggable={false}
                      metadata={defaultvaluefromserver}
                      modetype={modetypetablebuttonmetadatafield}
                      parenthandleClick={(props) => handleClick(props)}
                      parenthandleChange={(props) => handleChange(props)}
                  /> */}
        </div>
      );
    } else if (
      metadata.type === "inputoutputfield" &&
      metadata.inputoutputfieldprops.type === "islinkedcolumn"
    ) {
      if (defaultvaluefromserver === "") {
        defaultvaluefromserver = metadata.inputoutputfieldprops.defaultvalue;
      }
      if (
        metadata.inputoutputfieldprops &&
        metadata.inputoutputfieldprops.orientation === "horizontal"
      ) {
        elementHtml.push(
          <div style={{ display: "inline-flex", width: "100%" }}>
            <div
              onClick={(e) =>
                handleClick({ e, type: "executeclick", order: metadata.order })
              }
            >
              <Textcomphtml
                modetype={modetype}
                sitestatedata={props.sitestatedata}
                templateareaitemstatedata={props.templateareaitemstatedata}
                defaultvaluefromserver=""
                metadata={metadata}
                parenthandleClick={(props) => handleClick(props)}
                parenthandleChange={(props) => handleChange(props)}
              />
            </div>
            <div
              onClick={(e) =>
                handleClick({ e, type: "executeclick", order: metadata.order })
              }
            >
              <Recordlookuphtml
                tablename={metadata.inputoutputfieldprops.recordlookuptablename}
                recordid={defaultvaluefromserver}
                orgname={sitestatedata.orgdata.data.orgname}
                displaycolumnname={
                  metadata.inputoutputfieldprops.recordlookupdisplaycolumnname
                }
                inputmode={metadata.inputoutputfieldprops.inputmode}
              />
            </div>
            {defaultvaluefromserver !== undefined &&
              defaultvaluefromserver !== "" &&
              metadata.inputoutputfieldprops.inputmode === "true" ? (
              <div onClick={(e) => handleClick({ type: "cleardefaultvalue" })}>
                Clear
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      } else {
        elementHtml.push(
          <div style={{ display: "inline-block", width: "100%" }}>
            <div
              onClick={(e) =>
                handleClick({ e, type: "executeclick", order: metadata.order })
              }
            >
              <Textcomphtml
                modetype={modetype}
                sitestatedata={props.sitestatedata}
                templateareaitemstatedata={props.templateareaitemstatedata}
                defaultvaluefromserver=""
                metadata={metadata}
                parenthandleClick={(props) => handleClick(props)}
                parenthandleChange={(props) => handleChange(props)}
              />
            </div>
            <div
              style={{ width: "100%" }}
              onClick={(e) =>
                handleClick({ e, type: "executeclick", order: metadata.order })
              }
            >
              <Recordlookuphtml
                tablename={metadata.inputoutputfieldprops.recordlookuptablename}
                recordid={defaultvaluefromserver}
                orgname={sitestatedata.orgdata.data.orgname}
                displaycolumnname={
                  metadata.inputoutputfieldprops.recordlookupdisplaycolumnname
                }
                inputmode={metadata.inputoutputfieldprops.inputmode}
              />
            </div>
            {defaultvaluefromserver !== undefined &&
              defaultvaluefromserver !== "" &&
              metadata.inputoutputfieldprops.inputmode === "true" ? (
              <div onClick={(e) => handleClick({ type: "cleardefaultvalue" })}>
                Clear
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      }
      elementHtml.push();
    }

    let editpropshtml = [];
    let showbuildpropsuistyle = {
      position: "fixed",
      top: "100px",
      width: "250px",
      height: "400px",
      overflow: "auto",
      backgroundColor: "white",
      border: "1px solid grey",
      zIndex: 999,
      left: "10%",
    };

    if (showbuildpropsui) {
      editpropshtml.push(
        <div style={{ position: "relative" }}>
          <div style={showbuildpropsuistyle}>
            <Editpropscomp
              sitestatedata={props.sitestatedata}
              metadata={metadata}
              parenthandleClick={(props) => fromchildhandleClick(props)}
              parenthandleChange={(props) => fromchildhandleChange(props)}
            />
          </div>
        </div>
      );
    }

    let popuphtml = [];
    if (openpopup === true) {
      popuphtml.push(
        <Popuphtml
          popupside={metadata.onclick.popupside}
          popupmetadata={metadata.onclick.popupmetadata}
          parentalltypecompstatedata={alltypecompstatedata}
          sitestatedata={sitestatedata}
          modetype={modetype}
          showalltypecomppopupinbuildmode={showalltypecomppopupinbuildmode}
          sideofCursorclickX={sideofCursorclickX}
          sideofCursorclickY={sideofCursorclickY}
          parenthandleClick={(props) => fromchildhandleClick(props)}
          parenthandleChange={(props) => fromchildhandleChange(props)}
        />
      );
    }

    let mainpanelHtml = [];

    if (modetype === "buildicon") {
      mainpanelHtml.push(<>{elementHtml}</>);
      mainpanelHtml.push(<>{popuphtml}</>);
    } else if (modetype === "build") {
      mainpanelHtml.push(<>{elementHtml}</>);
      if (showbuildpropsui) {
        mainpanelHtml.push(<>{editpropshtml}</>);
      }
      mainpanelHtml.push(<>{popuphtml}</>);
    } else if (modetype === "normal" && showbuildpropsui === false) {
      mainpanelHtml.push(<>{elementHtml}</>);
      mainpanelHtml.push(<>{popuphtml}</>);
    }

    if (draggable === true) {
      return (
        <div
          style={{ ...metadata.style, display: "inline-block" }}
          data-type={"templateareaitemsetioncolumn"}
          data-order={metadata.order}
          data-dragtemplatename={metadata.dragtemplatename}
          data-dragtemplatetype={metadata.dragtemplatetype}
          // onClick={(e) =>
          //   handleClick({ e, type: "executeclick", order: metadata.order })
          // }
          // onKeyUp={(e) =>
          //     handleClick({ e, type: "executekeyup", order: metadata.order })
          // }
          draggable={draggable}
          onDragOver={(e) =>
            handleClick({ e, type: "executeallowdrop", order: metadata.order })
          }
          onDragStart={(e) =>
            handleClick({ e, type: "executedragstart", order: metadata.order })
          }
          onDragEnter={(e) =>
            handleClick({ e, type: "executedragenter", order: metadata.order })
          }
          onDragLeave={(e) =>
            handleClick({ e, type: "executedragleave", order: metadata.order })
          }
          onDrop={(e) =>
            handleClick({
              type: "dropalltypecompprepost",
              order: metadata.order,
              e,
              preposttext: "pre",
            })
          }
        >
          {mainpanelHtml}
        </div>
      );
    } else {
      return (
        <div
          style={{ ...metadata.style, display: "inline-block" }}
          data-type={"templateareaitemsetioncolumn"}
          data-order={metadata.order}
        // onClick={(e) =>
        //   handleClick({ e, type: "executeclick", order: metadata.order })
        // }
        // onKeyUp={(e) =>
        //     handleClick({ e, type: "executekeyup", order: metadata.order })
        // }
        >
          {mainpanelHtml}
        </div>
      );
    }
  }
}