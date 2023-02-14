/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import {
  templateareaitemDragpanelmetadataInitMap,
  templatearealistmetadataInit,
  querypaneltabelcolumnvaluetypeMap,
} from "./constants";

///////////////////////////

let dragstart = (ev) => {
  alltypecompconsolelog("dragstart");
  alltypecompconsolelog(ev.target.dataset);
  ev.dataTransfer.setData("paneltype", ev.target.dataset.type);
  ev.dataTransfer.setData("order", ev.target.dataset.order);
  if (
    ev.target.dataset.dragtemplatename &&
    ev.target.dataset.dragtemplatename !== ""
  ) {
    ev.dataTransfer.setData(
      "dragtemplatename",
      ev.target.dataset.dragtemplatename
    );
    ev.dataTransfer.setData(
      "dragtemplatetype",
      ev.target.dataset.dragtemplatetype
    );
  }
};

let allowDrop = (ev) => {
  // ev.target.style.backgroundColor = "lightblue";
  ev.preventDefault();
};

let dragEnter = (ev) => {
  ev.target.style.backgroundColor = "lightblue";
};

let dragLeave = (ev) => {
  ev.target.style.backgroundColor = "";
  // ev.preventDefault();
};

const sortArray = (items, orderby, typeofsortby) => {
  // sort by value
  if (typeofsortby === "integer") {
    items.sort(function (a, b) {
      let xval = "";
      let yval = "";

      if (orderby.includes(".")) {
        let orderbysplit = orderby.split(".");
        xval = a[orderbysplit[0]][orderbysplit[1]];
        yval = b[orderbysplit[0]][orderbysplit[1]];
      } else {
        xval = a[orderby];
        yval = b[orderby];
      }

      if (xval === undefined || xval === "") {
        xval = 0;
      }
      if (yval === undefined || yval === "") {
        yval = 0;
      }
      return xval - yval;
    });

    return items;
  }

  if (typeofsortby === "time") {
    return items.sort(function (a, b) {
      let xval = "";
      let yval = "";

      if (orderby.includes(".")) {
        let orderbysplit = orderby.split(".");
        xval = a[orderbysplit[0]][orderbysplit[1]];
        yval = b[orderbysplit[0]][orderbysplit[1]];
      } else {
        xval = a[orderby];
        yval = b[orderby];
      }

      let atime = new Date(xval);
      let btime = new Date(yval);
      return atime - btime;
    });
  }

  // sort by name
  if (typeofsortby === "string") {
    return items.sort(function (a, b) {
      let xval = "";
      let yval = "";

      if (orderby.includes(".")) {
        let orderbysplit = orderby.split(".");
        xval = a[orderbysplit[0]][orderbysplit[1]];
        yval = b[orderbysplit[0]][orderbysplit[1]];
      } else {
        xval = a[orderby];
        yval = b[orderby];
      }

      if (xval === undefined) {
        xval = "";
      }
      if (yval === undefined) {
        yval = "";
      }
      var nameA = xval.toUpperCase(); // ignore upper and lowercase
      var nameB = yval.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
};

const dragdropHandler = (methodprops) => {
  alltypecompconsolelog("dragdropHandler-render", methodprops);
  let propsJS = JSON.parse(JSON.stringify(methodprops));
  let {
    changingobject,
    addingsubobject,
    operationtype,
    preposttext,
    draggedcomporder,
    neworder,
  } = propsJS;

  let changingobjectArray = [];
  let changingobjectArraySorted = [];
  if (changingobject && Object.keys(changingobject).length > 0) {
    for (let i in changingobject) {
      changingobjectArray.push(changingobject[i]);
    }
    changingobjectArraySorted = sortArray(
      changingobjectArray,
      "order",
      "integer"
    );
  }

  if (operationtype === "add") {
    if (changingobjectArraySorted.length === 0) {
      changingobjectArraySorted.push(addingsubobject);
    } else {
      if (neworder === "") {
        changingobjectArraySorted.push(addingsubobject);
      } else {
        let changingobjectArraySortedU = [];
        for (let i = 0; i < changingobjectArraySorted.length; i++) {
          if (
            changingobjectArraySorted[i].order === neworder &&
            preposttext === "pre"
          ) {
            changingobjectArraySortedU.push(addingsubobject);
            changingobjectArraySortedU.push(changingobjectArraySorted[i]);
          } else if (
            changingobjectArraySorted[i].order === neworder &&
            preposttext === "post"
          ) {
            changingobjectArraySortedU.push(changingobjectArraySorted[i]);
            changingobjectArraySortedU.push(addingsubobject);
          } else {
            changingobjectArraySortedU.push(changingobjectArraySorted[i]);
          }
        }
        changingobjectArraySorted = changingobjectArraySortedU;
      }
    }
  }
  if (operationtype === "swap") {
    let changingobjectArraySortedU = [];
    for (let i = 0; i < changingobjectArraySorted.length; i++) {
      if (changingobjectArraySorted[i].order === draggedcomporder) {
        addingsubobject = changingobjectArraySorted[i];
      } else {
        changingobjectArraySortedU.push(changingobjectArraySorted[i]);
      }
    }

    let changingobjectArraySortedU2 = [];
    for (let i = 0; i < changingobjectArraySortedU.length; i++) {
      if (
        changingobjectArraySortedU[i].order === neworder &&
        preposttext === "pre"
      ) {
        changingobjectArraySortedU2.push(addingsubobject);
        changingobjectArraySortedU2.push(changingobjectArraySortedU[i]);
      } else if (
        changingobjectArraySortedU[i].order === neworder &&
        preposttext === "post"
      ) {
        changingobjectArraySortedU2.push(changingobjectArraySortedU[i]);
        changingobjectArraySortedU2.push(addingsubobject);
      } else {
        changingobjectArraySortedU2.push(changingobjectArraySortedU[i]);
      }
    }
    changingobjectArraySorted = changingobjectArraySortedU2;
  }
  if (operationtype === "delete") {
    let changingobjectArraySortedU = [];
    for (let i = 0; i < changingobjectArraySorted.length; i++) {
      if (changingobjectArraySorted[i].order !== neworder) {
        changingobjectArraySortedU.push(changingobjectArraySorted[i]);
      }
    }

    changingobjectArraySorted = changingobjectArraySortedU;
  }

  for (let i = 0; i < changingobjectArraySorted.length; i++) {
    changingobjectArraySorted[i].order = i;
  }

  let changingobjectU = {};
  for (let i = 0; i < changingobjectArraySorted.length; i++) {
    changingobjectU[i] = changingobjectArraySorted[i];
  }

  return changingobjectU;
};

let getrelatedlinkedcolumnrecorddata = async (methodprops) => {
  alltypecompconsolelog("getrelatedlinkedcolumnrecorddata-entry", methodprops);

  let { tablename, tabledatalist, tablecolumnmetadatalist } = methodprops;
  let recorddataarray = [];
  if (tabledatalist && tabledatalist.length > 0) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];
      if (
        tabledata &&
        tablecolumnmetadatalist &&
        tablecolumnmetadatalist.length > 0
      ) {
        let listdisplaycolumndata = [];
        for (let j = 0; j < tablecolumnmetadatalist.length; j++) {
          if (tablecolumnmetadatalist[j].data.islistdisplaycolumn === "true") {
            listdisplaycolumndata.push(tablecolumnmetadatalist[j]);
          }
        }
        let tabledataobject = {};

        for (let ldc = 0; ldc < listdisplaycolumndata.length; ldc++) {
          tabledataobject[listdisplaycolumndata[ldc].data.name] =
            tabledata.data[listdisplaycolumndata[ldc].data.name];
        }

        for (let j = 0; j < tablecolumnmetadatalist.length; j++) {
          if (tablecolumnmetadatalist[j].data.islinkedcolumn === "true") {
            // {orgname, , data{}}
            let dataobj = {
              tablename: tablename,
              recordid: tabledata.id,
              linkedtablename: tablecolumnmetadatalist[j].data.parenttablename,
              linkedrecordid:
                tabledata.data[tablecolumnmetadatalist[j].data.name],
              listdisplaycolumndata: tabledataobject,
            };

            let idstr =
              "lr-" +
              dataobj.tablename +
              "-" +
              dataobj.linkedtablename +
              "-" +
              dataobj.linkedrecordid +
              "-" +
              dataobj.recordid;
            recorddataarray.push({
              orgname: tabledata.orgname,
              id: idstr,
              data: dataobj,
            });
          }
        }
        //  }
      }
    }
  }
  alltypecompconsolelog(
    "getrelatedlinkedcolumnrecorddata-exit",
    recorddataarray
  );
  return recorddataarray;
};

let getrelatedsearchcolumnrecorddata = async (methodprops) => {
  alltypecompconsolelog("getrelatedsearchcolumnrecorddata-entry", methodprops);
  let { tablename, tabledatalist, tablecolumnmetadatalist } = methodprops;

  let recorddataarray = [];
  if (tabledatalist && tabledatalist.length > 0) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];
      if (
        tabledata &&
        tablecolumnmetadatalist &&
        tablecolumnmetadatalist.length > 0
      ) {
        let listdisplaycolumndata = [];
        for (let j = 0; j < tablecolumnmetadatalist.length; j++) {
          if (tablecolumnmetadatalist[j].data.islistdisplaycolumn === "true") {
            listdisplaycolumndata.push(tablecolumnmetadatalist[j]);
          }
        }
        let tabledataobject = {};

        for (let ldc = 0; ldc < listdisplaycolumndata.length; ldc++) {
          tabledataobject[listdisplaycolumndata[ldc].data.name] =
            tabledata.data[listdisplaycolumndata[ldc].data.name];
        }

        for (let j = 0; j < tablecolumnmetadatalist.length; j++) {
          if (tablecolumnmetadatalist[j].data.issearchcolumn === "true") {
            let dataobj = {
              tablename: tablename,
              recordid: tabledata.id,
              columnname: tablecolumnmetadatalist[j].data.name,
              columnvalue: tabledata.data[tablecolumnmetadatalist[j].data.name],
              listdisplaycolumndata: tabledataobject,
            };
            let idstr =
              "sr-" +
              dataobj.tablename +
              "-" +
              dataobj.columnvalue +
              "-" +
              dataobj.columnname +
              "-" +
              dataobj.recordid;
            recorddataarray.push({
              orgname: tabledata.orgname,
              id: idstr,
              data: dataobj,
            });
          }
        }
        //  }
      }
    }
  }
  alltypecompconsolelog(
    "getrelatedsearchcolumnrecorddata-exit",
    recorddataarray
  );
  return recorddataarray;
};

let getrelatedhashtaggedcolumnrecorddata = async (methodprops) => {
  alltypecompconsolelog(
    "getrelatedhashtaggedcolumnrecorddata-entry",
    methodprops
  );
  let { tablename, tabledatalist, tablecolumnmetadatalist } = methodprops;

  let recorddataarray = [];
  if (tabledatalist && tabledatalist.length > 0) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];
      if (
        tabledata &&
        tablecolumnmetadatalist &&
        tablecolumnmetadatalist.length > 0
      ) {
        let listdisplaycolumndata = [];
        for (let j = 0; j < tablecolumnmetadatalist.length; j++) {
          if (tablecolumnmetadatalist[j].data.islistdisplaycolumn === "true") {
            listdisplaycolumndata.push(tablecolumnmetadatalist[j]);
          }
        }
        let tabledataobject = {};

        for (let ldc = 0; ldc < listdisplaycolumndata.length; ldc++) {
          tabledataobject[listdisplaycolumndata[ldc].data.name] =
            tabledata.data[listdisplaycolumndata[ldc].data.name];
        }

        for (let j = 0; j < tablecolumnmetadatalist.length; j++) {
          if (tablecolumnmetadatalist[j].data.ishashtaggedcolumn === "true") {
            let columnvalueinit =
              tabledata.data[tablecolumnmetadatalist[j].data.name];
            if (
              columnvalueinit &&
              columnvalueinit !== "" &&
              columnvalueinit.includes("#")
            ) {
              let hashsplitarray = columnvalueinit.split("#");
              for (let hashI = 1; hashI < hashsplitarray.length; hashI++) {
                let afterhashvalue = hashsplitarray[hashI];
                if (afterhashvalue && afterhashvalue !== "") {
                  let spacesplitarray = afterhashvalue.split(" ");
                  if (spacesplitarray[0] && spacesplitarray[0] !== "") {
                    let dataobj = {
                      tablename: tablename,
                      recordid: tabledata.id,
                      columnname: tablecolumnmetadatalist[j].data.name,
                      columnvalue: spacesplitarray[0],
                      listdisplaycolumndata: tabledataobject,
                    };

                    let idstr =
                      "ht-" +
                      dataobj.tablename +
                      "-" +
                      dataobj.columnvalue +
                      "-" +
                      dataobj.columnname +
                      "-" +
                      dataobj.recordid;
                    recorddataarray.push({
                      orgname: tabledata.orgname,
                      id: idstr,
                      data: dataobj,
                    });
                  }
                }
              }
            }
          }
        }
        //  }
      }
    }
  }
  alltypecompconsolelog(
    "getrelatedhashtaggedcolumnrecorddata-exit",
    recorddataarray
  );
  return recorddataarray;
};

let getrelatedaccessrecorddata = async (methodprops) => {
  alltypecompconsolelog("getrelatedaccessrecorddata-entry", methodprops);

  let { tablename, tabledatalist, tablemetadata } = methodprops;

  let recorddataarray = [];

  if (tabledatalist && tabledatalist.length > 0) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];

      // get owneruserdata info
      let ownerdbuserdata = {};
      if (tabledata.data && tabledata.data.ownerid) {
        let ownerdbuserdataparams = {
          tablename: "vendordbuser",
          id: tabledata.data.ownerid,
          idoperator: "equalsto",
          orgname: tabledata.orgname,
        };

        let ownerdbuserdatalist = await gettabledatafromDatabase(
          ownerdbuserdataparams
        );
        if (ownerdbuserdatalist && ownerdbuserdatalist.length > 0) {
          ownerdbuserdata = ownerdbuserdatalist[0];
        } else {
          // result.issuccess = "false";
        }
      }
      alltypecompconsolelog("ownerdbuserdata", ownerdbuserdata);

      // get ownerrolemetadata info
      let ownerrolemetadata = {};
      if (ownerdbuserdata.data && ownerdbuserdata.data.roleid) {
        let ownerrolemetadataparams = {
          tablename: "rolemetadata",
          id: ownerdbuserdata.data.roleid,
          idoperator: "equalsto",
          orgname: tabledata.orgname,
        };

        let ownerrolemetadatalist = await gettabledatafromDatabase(
          ownerrolemetadataparams
        );
        if (ownerrolemetadatalist && ownerrolemetadatalist.length > 0) {
          ownerrolemetadata = ownerrolemetadatalist[0];
        }
      }
      alltypecompconsolelog("ownerrolemetadata", ownerrolemetadata);

      let dataobjowner = {
        tablename: tablename,
        recordid: tabledata.id,
        accesstype: "fullaccess",
        accesstoid: tabledata.data.ownerid,
      };
      let idstr =
        "ar-" +
        tablename +
        "-" +
        dataobjowner.accesstoid +
        "-" +
        dataobjowner.recordid;
      recorddataarray.push({
        orgname: tabledata.orgname,
        id: idstr,
        data: dataobjowner,
      });

      if (
        tabledata &&
        tablemetadata &&
        ownerrolemetadata &&
        ownerrolemetadata.id !== undefined &&
        ownerrolemetadata.id !== ""
      ) {
        if (
          tablemetadata.data.issharingbyrole &&
          tablemetadata.data.issharingbyrole !== ""
        ) {
          let dataobjrole = {
            tablename: tablename,
            recordid: tabledata.id,
            accesstype: "fullaccess",
            accesstoid: ownerrolemetadata.id,
          };

          idstr =
            "ar-" +
            tablename +
            "-" +
            dataobjrole.accesstoid +
            "-" +
            dataobjrole.recordid;

          recorddataarray.push({
            orgname: tabledata.orgname,
            id: idstr,
            data: dataobjrole,
          });
        }
      }
    }
  }
  alltypecompconsolelog("getrelatedaccessrecorddata-exit", recorddataarray);
  return recorddataarray;
};
let getcreatingactivityrecorddata = async (methodprops) => {
  alltypecompconsolelog("getcreatingactivityrecorddata-entry", methodprops);

  let { tablename, tabledatalist, modifytype } = methodprops;

  let recorddataarray = [];
  if (tabledatalist && tabledatalist.length > 0) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];

      // get owneruserdata info
      let ownerdbuserdata = {};
      if (tabledata.data && tabledata.data.ownerid) {
        let ownerdbuserdataparams = {
          tablename: "vendordbuser",
          id: tabledata.data.ownerid,
          idoperator: "equalsto",
          orgname: tabledata.orgname,
        };

        let ownerdbuserdatalist = await gettabledatafromDatabase(
          ownerdbuserdataparams
        );
        if (ownerdbuserdatalist && ownerdbuserdatalist.length > 0) {
          ownerdbuserdata = ownerdbuserdatalist[0];
        } else {
          //  result.issuccess = "false";
        }
      }
      alltypecompconsolelog("ownerdbuserdata", ownerdbuserdata);

      // get ownerrolemetadata info
      let ownerrolemetadata = {};
      if (ownerdbuserdata.data && ownerdbuserdata.data.roleid) {
        let ownerrolemetadataparams = {
          tablename: "rolemetadata",
          id: ownerdbuserdata.data.roleid,
          idoperator: "equalsto",
          orgname: tabledata.orgname,
        };

        let ownerrolemetadatalist = await gettabledatafromDatabase(
          ownerrolemetadataparams
        );
        if (ownerrolemetadatalist && ownerrolemetadatalist.length > 0) {
          ownerrolemetadata = ownerrolemetadatalist[0];
        }
      }
      alltypecompconsolelog("ownerrolemetadata", ownerrolemetadata);

      let dataobj = {
        tablename: tablename,
        recordid: tabledata.id,
        activitytype: modifytype,
        fromvalueobject: {},
        tovalueobject: {},
      };
      let todaydatetime = new Date();
      let currenttimeiniso = todaydatetime.toISOString();
      let idstr =
        "ar-" +
        dataobj.tablename +
        "-" +
        dataobj.recordid +
        "-" +
        ownerdbuserdata.id +
        "-" +
        currenttimeiniso;

      recorddataarray.push({
        orgname: tabledata.orgname,
        id: idstr,
        data: dataobj,
      });
    }
  }

  alltypecompconsolelog("getcreatingactivityrecorddata-exit", recorddataarray);
  return recorddataarray;
};

let beforemodifyvaluenumbertrackingcolumnrecorddata = async (methodprops) => {
  alltypecompconsolelog(
    "beforemodifyvaluenumbertrackingcolumnrecorddata-entry",
    methodprops
  );
  let {
    tablename,
    tabledatalist,

    tablecolumnmetadatalist,
  } = methodprops;

  let result = { issuccess: "true", message: "" };
  if (tabledatalist && tabledatalist.length > 0) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];
      if (
        tabledata &&
        tablecolumnmetadatalist &&
        tablecolumnmetadatalist.length > 0
      ) {
        for (let j = 0; j < tablecolumnmetadatalist.length; j++) {
          if (
            tablecolumnmetadatalist[j].data.isvaluenumbertrackingcolumn ===
            "true"
          ) {
            let dataobj = {
              tablename: tablename,
              columnname: tablecolumnmetadatalist[j].data.name,
              columnvalue: tabledata.data[tablecolumnmetadatalist[j].data.name],
              noofrecords: 1,
              range: 1,
            };
            let newnoofrecords = "";
            let oldrange = "";
            let newrange = "";

            let idstr =
              "vnt-" +
              dataobj.tablename +
              "-" +
              dataobj.columnname +
              "-" +
              dataobj.columnvalue;
            let existingvaluenumbertrackingcolumnrecorddataparams = {
              tablename: "valuenumbertrackingcolumnrecorddata",
              id: idstr,
              idoperator: "equalsto",
              orgname: tabledata.orgname,
            };
            alltypecompconsolelog(
              "existingvaluenumbertrackingcolumnrecorddataparams",
              existingvaluenumbertrackingcolumnrecorddataparams
            );

            let existingvaluenumbertrackingcolumnrecorddatalist =
              await gettabledatafromDatabase(
                existingvaluenumbertrackingcolumnrecorddataparams
              );
            if (
              existingvaluenumbertrackingcolumnrecorddatalist &&
              existingvaluenumbertrackingcolumnrecorddatalist.length > 0
            ) {
              let noofrecords =
                existingvaluenumbertrackingcolumnrecorddatalist[0].data
                  .noofrecords;
              oldrange =
                existingvaluenumbertrackingcolumnrecorddatalist[0].data.range;

              if (
                noofrecords &&
                noofrecords !== undefined &&
                noofrecords !== ""
              ) {
                noofrecords = noofrecords - 1;

                if (noofrecords >= 0 && noofrecords < 10) {
                  newrange = 1;
                }
                if (noofrecords >= 10 && noofrecords < 100) {
                  newrange = 10;
                }
                if (noofrecords >= 100 && noofrecords < 1000) {
                  newrange = 100;
                }
                if (noofrecords >= 1000 && noofrecords < 10000) {
                  newrange = 1000;
                }

                newnoofrecords = noofrecords;
                existingvaluenumbertrackingcolumnrecorddatalist[0].data.noofrecords =
                  newnoofrecords;
                existingvaluenumbertrackingcolumnrecorddatalist[0].data.range =
                  newrange;

                let updatingvaluenumbertrackingcolumnrecorddatalist = [];
                updatingvaluenumbertrackingcolumnrecorddatalist.push(
                  existingvaluenumbertrackingcolumnrecorddatalist[0]
                );

                alltypecompconsolelog(
                  "updatingvaluenumbertrackingcolumnrecorddatalist",
                  updatingvaluenumbertrackingcolumnrecorddatalist
                );
                let lrupdateresult = await updatetabledatainDatabase({
                  tablename: "valuenumbertrackingcolumnrecorddata",
                  tabledatalist:
                    updatingvaluenumbertrackingcolumnrecorddatalist,
                });
                alltypecompconsolelog("lrupdateresult", lrupdateresult);
                if (lrupdateresult.issuccess !== "true") {
                  result.issuccess = "false";
                }
              }
            }

            let idrangestr =
              "vrt-" +
              dataobj.tablename +
              "-" +
              dataobj.columnname +
              "-" +
              oldrange +
              "-" +
              dataobj.columnvalue;
            let existingvaluerangetrackingcolumnrecorddataparams = {
              tablename: "valuerangetrackingcolumnrecorddata",
              id: idrangestr,
              idoperator: "equalsto",
              orgname: tabledata.orgname,
            };
            alltypecompconsolelog(
              "existingvaluerangetrackingcolumnrecorddataparams",
              existingvaluerangetrackingcolumnrecorddataparams
            );

            let existingvaluerangetrackingcolumnrecorddatalist =
              await gettabledatafromDatabase(
                existingvaluerangetrackingcolumnrecorddataparams
              );
            if (
              existingvaluerangetrackingcolumnrecorddatalist &&
              existingvaluerangetrackingcolumnrecorddatalist.length > 0
            ) {
              let deletingvaluerangetrackingcolumnrecorddatalist = [];
              deletingvaluerangetrackingcolumnrecorddatalist.push(
                existingvaluerangetrackingcolumnrecorddatalist[0]
              );

              alltypecompconsolelog(
                "deletingvaluerangetrackingcolumnrecorddatalist",
                deletingvaluerangetrackingcolumnrecorddatalist
              );
              let lrdeleteresult = await deletetabledatainDatabase({
                tablename: "valuerangetrackingcolumnrecorddata",
                tabledatalist: deletingvaluerangetrackingcolumnrecorddatalist,
              });
              alltypecompconsolelog("lrdeleteresult", lrdeleteresult);
              if (lrdeleteresult.issuccess !== "true") {
                result.issuccess = "false";
              }
            }

            let newidrangestr =
              "vrt-" +
              dataobj.tablename +
              "-" +
              dataobj.columnname +
              "-" +
              newrange +
              "-" +
              dataobj.columnvalue;
            let insertingvaluerangetrackingcolumnrecorddatalist = [];
            let insertingvaluerangetrackingcolumnrecorddata = {};
            insertingvaluerangetrackingcolumnrecorddata.tablename =
              dataobj.tablename;
            insertingvaluerangetrackingcolumnrecorddata.columnname =
              dataobj.columnname;
            insertingvaluerangetrackingcolumnrecorddata.columnvalue =
              dataobj.columnvalue;
            insertingvaluerangetrackingcolumnrecorddata.noofrecords =
              newnoofrecords;
            insertingvaluerangetrackingcolumnrecorddata.range = newrange;
            insertingvaluerangetrackingcolumnrecorddatalist.push({
              orgname: tabledata.orgname,
              id: newidrangestr,
              data: insertingvaluerangetrackingcolumnrecorddata,
            });
            let lrinsertresult = await inserttabledatainDatabase({
              tablename: "valuerangetrackingcolumnrecorddata",
              tabledatalist: insertingvaluerangetrackingcolumnrecorddatalist,
            });
            alltypecompconsolelog("lrinsertresult", lrinsertresult);
            if (lrinsertresult.issuccess !== "true") {
              result.issuccess = "false";
            }
          }
        }
      }
    }
  }
  alltypecompconsolelog(
    "beforemodifyvaluenumbertrackingcolumnrecorddata-exit",
    result
  );
  return result;
};

let aftermodifyvaluenumbertrackingcolumnrecorddata = async (methodprops) => {
  alltypecompconsolelog(
    "aftermodifyvaluenumbertrackingcolumnrecorddata-entry",
    methodprops
  );
  let { tablename, tabledatalist, tablecolumnmetadatalist } = methodprops;

  let result = { issuccess: "true", message: "" };
  if (tabledatalist && tabledatalist.length > 0) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];
      if (
        tabledata &&
        tablecolumnmetadatalist &&
        tablecolumnmetadatalist.length > 0
      ) {
        for (let j = 0; j < tablecolumnmetadatalist.length; j++) {
          if (
            tablecolumnmetadatalist[j].data.isvaluenumbertrackingcolumn ===
            "true"
          ) {
            ///// numberdata update

            let dataobj = {
              tablename: tablename,
              columnname: tablecolumnmetadatalist[j].data.name,
              columnvalue: tabledata.data[tablecolumnmetadatalist[j].data.name],
              noofrecords: 1,
              range: 1,
            };

            let newnoofrecords = "";
            let oldrange = "";
            let newrange = "";

            let idstr =
              "vnt-" +
              dataobj.tablename +
              "-" +
              dataobj.columnname +
              "-" +
              dataobj.columnvalue;
            let existingvaluenumbertrackingcolumnrecorddataparams = {
              tablename: "valuenumbertrackingcolumnrecorddata",
              id: idstr,
              idoperator: "equalsto",
              orgname: tabledata.orgname,
            };
            alltypecompconsolelog(
              "existingvaluenumbertrackingcolumnrecorddataparams",
              existingvaluenumbertrackingcolumnrecorddataparams
            );

            let existingvaluenumbertrackingcolumnrecorddatalist =
              await gettabledatafromDatabase(
                existingvaluenumbertrackingcolumnrecorddataparams
              );
            if (
              existingvaluenumbertrackingcolumnrecorddatalist &&
              existingvaluenumbertrackingcolumnrecorddatalist.length > 0
            ) {
              let noofrecords =
                existingvaluenumbertrackingcolumnrecorddatalist[0].data
                  .noofrecords;
              oldrange =
                existingvaluenumbertrackingcolumnrecorddatalist[0].data.range;

              if (
                noofrecords &&
                noofrecords !== undefined &&
                noofrecords !== ""
              ) {
                noofrecords = noofrecords + 1;
                newnoofrecords = noofrecords;
                if (noofrecords >= 0 && noofrecords < 10) {
                  newrange = 1;
                }
                if (noofrecords >= 10 && noofrecords < 100) {
                  newrange = 10;
                }
                if (noofrecords >= 100 && noofrecords < 1000) {
                  newrange = 100;
                }
                if (noofrecords >= 1000 && noofrecords < 10000) {
                  newrange = 1000;
                }

                existingvaluenumbertrackingcolumnrecorddatalist[0].data.noofrecords =
                  newnoofrecords;
                existingvaluenumbertrackingcolumnrecorddatalist[0].data.range =
                  newrange;

                let updatingvaluenumbertrackingcolumnrecorddatalist = [];
                updatingvaluenumbertrackingcolumnrecorddatalist.push(
                  existingvaluenumbertrackingcolumnrecorddatalist[0]
                );

                alltypecompconsolelog(
                  "updatingvaluenumbertrackingcolumnrecorddatalist",
                  updatingvaluenumbertrackingcolumnrecorddatalist
                );
                let lrupdateresult = await updatetabledatainDatabase({
                  tablename: "valuenumbertrackingcolumnrecorddata",
                  tabledatalist:
                    updatingvaluenumbertrackingcolumnrecorddatalist,
                });
                alltypecompconsolelog("lrupdateresult", lrupdateresult);
                if (lrupdateresult.issuccess !== "true") {
                  result.issuccess = "false";
                }
              }
            } else {
              newrange = 1;
              newnoofrecords = 1;
              let newidnumberstr =
                "vnt-" +
                dataobj.tablename +
                "-" +
                dataobj.columnname +
                "-" +
                dataobj.columnvalue;

              let insertingvaluenumbertrackingcolumnrecorddatalist = [];
              let insertingvaluenumbertrackingcolumnrecorddata = {};
              insertingvaluenumbertrackingcolumnrecorddata.tablename =
                dataobj.tablename;
              insertingvaluenumbertrackingcolumnrecorddata.columnname =
                dataobj.columnname;
              insertingvaluenumbertrackingcolumnrecorddata.columnvalue =
                dataobj.columnvalue;
              insertingvaluenumbertrackingcolumnrecorddata.noofrecords =
                newnoofrecords;
              insertingvaluenumbertrackingcolumnrecorddata.range = newrange;

              insertingvaluenumbertrackingcolumnrecorddatalist.push({
                orgname: tabledata.orgname,
                id: newidnumberstr,
                data: insertingvaluenumbertrackingcolumnrecorddata,
              });
              let lrinsertresult = await inserttabledatainDatabase({
                tablename: "valuenumbertrackingcolumnrecorddata",
                tabledatalist: insertingvaluenumbertrackingcolumnrecorddatalist,
              });
              alltypecompconsolelog("lrinsertresult", lrinsertresult);
              if (lrinsertresult.issuccess !== "true") {
                result.issuccess = "false";
              }
            }

            // rangedata update

            let idrangestr =
              "vrt-" +
              dataobj.tablename +
              "-" +
              dataobj.columnname +
              "-" +
              oldrange +
              "-" +
              dataobj.columnvalue;
            let existingvaluerangetrackingcolumnrecorddataparams = {
              tablename: "valuerangetrackingcolumnrecorddata",
              id: idrangestr,
              idoperator: "equalsto",
              orgname: tabledata.orgname,
            };
            alltypecompconsolelog(
              "existingvaluerangetrackingcolumnrecorddataparams",
              existingvaluerangetrackingcolumnrecorddataparams
            );

            let existingvaluerangetrackingcolumnrecorddatalist =
              await gettabledatafromDatabase(
                existingvaluerangetrackingcolumnrecorddataparams
              );
            if (
              existingvaluerangetrackingcolumnrecorddatalist &&
              existingvaluerangetrackingcolumnrecorddatalist.length > 0
            ) {
              let deletingvaluerangetrackingcolumnrecorddatalist = [];
              deletingvaluerangetrackingcolumnrecorddatalist.push(
                existingvaluerangetrackingcolumnrecorddatalist[0]
              );

              alltypecompconsolelog(
                "deletingvaluerangetrackingcolumnrecorddatalist",
                deletingvaluerangetrackingcolumnrecorddatalist
              );
              let lrdeleteresult = await deletetabledatainDatabase({
                tablename: "valuerangetrackingcolumnrecorddata",
                tabledatalist: deletingvaluerangetrackingcolumnrecorddatalist,
              });
              alltypecompconsolelog("lrdeleteresult", lrdeleteresult);
              if (lrdeleteresult.issuccess !== "true") {
                result.issuccess = "false";
              }
            }

            let newidrangestr =
              "vrt-" +
              dataobj.tablename +
              "-" +
              dataobj.columnname +
              "-" +
              newrange +
              "-" +
              dataobj.columnvalue;

            let insertingvaluerangetrackingcolumnrecorddatalist = [];
            let insertingvaluerangetrackingcolumnrecorddata = {};
            insertingvaluerangetrackingcolumnrecorddata.tablename =
              dataobj.tablename;
            insertingvaluerangetrackingcolumnrecorddata.columnname =
              dataobj.columnname;
            insertingvaluerangetrackingcolumnrecorddata.columnvalue =
              dataobj.columnvalue;
            insertingvaluerangetrackingcolumnrecorddata.noofrecords =
              newnoofrecords;
            insertingvaluerangetrackingcolumnrecorddata.range = newrange;
            insertingvaluerangetrackingcolumnrecorddatalist.push({
              orgname: tabledata.orgname,
              id: newidrangestr,
              data: insertingvaluerangetrackingcolumnrecorddata,
            });
            let lrdeleteresult = await inserttabledatainDatabase({
              tablename: "valuerangetrackingcolumnrecorddata",
              tabledatalist: insertingvaluerangetrackingcolumnrecorddatalist,
            });
            alltypecompconsolelog("lrdeleteresult", lrdeleteresult);
            if (lrdeleteresult.issuccess !== "true") {
              result.issuccess = "false";
            }
          }
        }
      }
    }
  }
  alltypecompconsolelog(
    "aftermodifyvaluenumbertrackingcolumnrecorddata-exit",
    result
  );
  return result;
};

let updatestandardcolumndata = async (methodpropss) => {
  alltypecompconsolelog("updatestandardcolumndata-entry");
  let methodprops = JSON.parse(JSON.stringify(methodpropss));
  alltypecompconsolelog("methodprops", methodprops);
  let {
    tablename,
    tabledatalist,
    sitestatedata,
    tablemetadata,
    templateareaitemstatedata,
    modifytype,
  } = methodprops;
  let { signedindbuserdata, signedinvendordbuserdata } = sitestatedata;

  let dbuserdata = {};
  if (signedindbuserdata && signedindbuserdata.id) {
    dbuserdata = signedindbuserdata;
  }
  if (signedinvendordbuserdata && signedinvendordbuserdata.id) {
    dbuserdata = signedinvendordbuserdata;
  }
  let todaydatetime = new Date();
  let currenttimeiniso = todaydatetime.toISOString();
  if (sitestatedata && sitestatedata.devicedata) {
    sitestatedata.devicedata.currenttimeiniso = currenttimeiniso;
  }
  let tabledatalistmodified = [];
  if (tabledatalist && tabledatalist.length > 0) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];

      let isinsert = false;
      let isupdate = false;

      if (modifytype === "insert") {
        isinsert = true;
      }

      if (modifytype === "update") {
        isupdate = true;
      }

      if (
        modifytype === "upsert" &&
        (tabledata.id === undefined || tabledata.id === "")
      ) {
        isinsert = true;
      }

      if (
        modifytype === "upsert" &&
        tabledata.id !== undefined &&
        tabledata.id !== ""
      ) {
        isupdate = true;
      }

      if (isinsert === true) {
        tabledata.orgname = sitestatedata.orgdata.data.name;
        let idstr = "";
        if (tablename === "favouriteuiconfigs") {
          idstr = "fv-" + dbuserdata.id + "-" + tabledata.data.name;
          tabledata.id = idstr;
        } else if (tablename === "tablemetadata") {
          idstr = "tb-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "tablecolumnmetadata") {
          idstr =
            "tc-" +
            tabledata.data.tablename +
            "-" +
            dbuserdata.id +
            "-" +
            currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "tablebuttonmetadata") {
          idstr =
            "tb-" +
            tabledata.data.tablename +
            "-" +
            dbuserdata.id +
            "-" +
            currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "tablelayoutmetadata") {
          idstr =
            "tl-" +
            tabledata.data.tablename +
            "-" +
            dbuserdata.id +
            currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "tablequerymetadata") {
          idstr =
            "tq-" +
            tabledata.data.tablename +
            "-" +
            dbuserdata.id +
            "-" +
            currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "linkedrecordnumberdata") {
          // {orgname, , data{tablename, linkedtablename, recordid, nooflinks}}
          idstr =
            "lrn-" +
            tabledata.data.tablename +
            "-" +
            tabledata.data.linkedtablename +
            "-" +
            tabledata.data.recordid;
          tabledata.id = idstr;
        } else if (tablename === "linkedrecordnumbertrackerdata") {
          // {orgname, , data{tablename, linkedtablename,  maxnooflinks, minnooflinks, averagenooflinks}}
          idstr =
            "lrnt-" +
            tabledata.data.tablename +
            "-" +
            tabledata.data.linkedtablename;
          tabledata.id = idstr;
        } else if (tablename === "orgmetadata") {
          idstr = "org-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "parentorgmetadata") {
          idstr = "org-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "sitetemplatemetadata") {
          idstr = "stt-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
          tabledata.data.metadata = templatearealistmetadataInit;
        } else if (tablename === "sitemetadata") {
          idstr = "st-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "vendorsitemetadata") {
          idstr = "vst-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "customersitemetadata") {
          idstr = "cst-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "siteversionmetadata") {
          idstr = "stv-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "vendorsiteversionmetadata") {
          idstr = "vstv-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "customersiteversionmetadata") {
          idstr = "cstv-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "siteversionpagemetadata") {
          idstr =
            "stvp-" +
            tabledata.data.parentid +
            "-" +
            dbuserdata.id +
            "-" +
            currenttimeiniso;
          tabledata.id = idstr;
          if (
            tabledata.data.metadata === undefined ||
            tabledata.data.metadata === ""
          ) {
            tabledata.data.metadata = templatearealistmetadataInit;
          }
        } else if (tablename === "vendorsiteversionpagemetadata") {
          idstr =
            "vstvp-" +
            tabledata.data.parentid +
            "-" +
            dbuserdata.id +
            "-" +
            currenttimeiniso;
          tabledata.id = idstr;
          if (
            tabledata.data.metadata === undefined ||
            tabledata.data.metadata === ""
          ) {
            tabledata.data.metadata = templatearealistmetadataInit;
          }
        } else if (tablename === "customersiteversionpagemetadata") {
          idstr =
            "cstvp-" +
            tabledata.data.parentid +
            "-" +
            dbuserdata.id +
            "-" +
            currenttimeiniso;
          tabledata.id = idstr;
          if (
            tabledata.data.metadata === undefined ||
            tabledata.data.metadata === ""
          ) {
            tabledata.data.metadata = templatearealistmetadataInit;
          }
        } else if (tablename === "dbuser") {
          idstr = "dbu-" + tabledata.data.name;
          tabledata.id = idstr;
        } else if (tablename === "signinuser") {
          idstr = "su-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "profilemetadata") {
          idstr = "pf-" + tabledata.data.name;
          tabledata.id = idstr;
        } else if (tablename === "appaccessmetadata") {
          idstr = "aa-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "tabaccessmetadata") {
          idstr = "ta-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else if (tablename === "rolemetadata") {
          idstr = "rl-" + dbuserdata.id + "-" + currenttimeiniso;
          tabledata.id = idstr;
        } else {
          let idfieldvalue = replacedynamictext({
            replacetext: tablemetadata.data.idreplacetext,
            sitestatedata: sitestatedata,
            templateareaitemstatedata: templateareaitemstatedata,
            parentalltypecompstatedata: {},
            tabledata: tabledata,
          });
          alltypecompconsolelog("===idfieldvalue");
          alltypecompconsolelog(idfieldvalue);

          tabledata.id = idfieldvalue;
        }

        if (
          tabledata.data.ownerid === undefined ||
          tabledata.data.ownerid === ""
        ) {
          tabledata.data.ownerid = dbuserdata.id;
        }
        tabledata.data.createdbyid = dbuserdata.id;
        tabledata.data.lastupdatedbyid = dbuserdata.id;
        tabledata.data.createddate = currenttimeiniso;
        tabledata.data.lastupdateddate = currenttimeiniso;
      }
      if (isupdate === true) {
        if (
          tabledata.data.ownerid === undefined ||
          tabledata.data.ownerid === ""
        ) {
          tabledata.data.ownerid = dbuserdata.id;
        }
        tabledata.data.lastupdatedbyid = dbuserdata.id;
        tabledata.data.lastupdateddate = currenttimeiniso;
      }

      tabledatalistmodified.push(tabledata);
    }
  }
  alltypecompconsolelog("tabledatalistmodified", tabledatalistmodified);
  return tabledatalistmodified;
};

let validatecolumndata = async (methodprops) => {
  alltypecompconsolelog("validatecolumndata-entry");
  alltypecompconsolelog(methodprops);

  let result = { issuccess: "true", message: "" };
  let { tabledatalist, sitestatedata, tablevalidationmetadatalist } =
    methodprops;

  let currenttablevalidationmetadataarray = [];

  for (let i = 0; i < tablevalidationmetadatalist.length; i++) {
    if (
      tablevalidationmetadatalist[i].data &&
      // tablevalidationmetadatalist[i].data.tablename === tablename &&
      tablevalidationmetadatalist[i].data.isdeleterule === "true"
      //  modifytype === "delete"
    ) {
      currenttablevalidationmetadataarray.push(tablevalidationmetadatalist[i]);
    } else if (
      tablevalidationmetadatalist[i].data &&
      //  tablevalidationmetadatalist[i].data.tablename === tablename &&
      tablevalidationmetadatalist[i].data.isdeleterule !== "true"
      //  modifytype !== "delete"
    ) {
      currenttablevalidationmetadataarray.push(tablevalidationmetadatalist[i]);
    }
  }

  if (tabledatalist && tabledatalist.length > 0) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];
      if (currenttablevalidationmetadataarray) {
        for (let i = 0; i < currenttablevalidationmetadataarray.length; i++) {
          let validationreplacetexttvalue = replacedynamictext({
            replacetext:
              currenttablevalidationmetadataarray[i].data.validationreplacetext,
            sitestatedata: sitestatedata,
            templateareaitemstatedata: {},
            parentalltypecompstatedata: {},
            tabledata: tabledata,
          });
          alltypecompconsolelog(validationreplacetexttvalue);
          if (validationreplacetexttvalue === "true") {
            result.issuccess = "false";

            if (
              currenttablevalidationmetadataarray[i].data
                .notifymessagereplacetext
            ) {
              let notifymessagereplacetextvalue = replacedynamictext({
                replacetext:
                  currenttablevalidationmetadataarray[i].data
                    .notifymessagereplacetext,
                sitestatedata: sitestatedata,
                templateareaitemstatedata: {},
                parentalltypecompstatedata: {},
                tabledata: tabledata,
              });

              result.message = notifymessagereplacetextvalue;
            }
          }
        }
      }
    }
  }

  alltypecompconsolelog("validatecolumndata-exit");
  alltypecompconsolelog(result);

  return result;
};

let templateareaitemconsolelog = (templatemetadata, key, value) => {
  console.log("templateareaitemconsolelog" + templatemetadata.order + key);
  console.log(value);
};

let templateareaitemsectionconsolelog = (key, value) => {
  console.log(key);
  console.log(value);
};

let templateareaitemsectioncolumnconsolelog = (key, value) => {
  console.log(key);
  console.log(value);
};

export let alltypecompconsolelog = (key, value) => {
  console.log(key);
  console.log(value);
};

let replacedynamictextutil = (methodprops) => {
  let { replacetext, replacedynamicstring, replacedynamicvalue } = methodprops;
  if (
    typeof replacetext === "string" &&
    replacetext.includes(replacedynamicstring) &&
    replacedynamicvalue &&
    replacedynamicstring &&
    replacedynamicstring !== ""
  ) {
    alltypecompconsolelog("replacedynamictextutil");
    alltypecompconsolelog(methodprops);
    let typetext = typeof replacedynamicvalue;
    if (
      typetext === "string" ||
      replacedynamicvalue === true ||
      replacedynamicvalue === false
    ) {
      replacetext = replacetext.replace(
        replacedynamicstring,
        replacedynamicvalue
      );
    } else {
      replacetext = replacedynamicvalue;
    }
    alltypecompconsolelog(replacetext);
  }

  return replacetext;
};

export let replacedynamictext = (methodprops) => {
  alltypecompconsolelog("replacedynamictext-entry");
  alltypecompconsolelog(methodprops);
  let {
    replacetext,
    sitestatedata,
    templateareaitemstatedata,
    parentalltypecompstatedata,
    tabledata,
    lstobjindex,
  } = methodprops;

  let todaydatetime = new Date();
  let currenttimeiniso = todaydatetime.toISOString();
  if (sitestatedata && sitestatedata.devicedata) {
    sitestatedata.devicedata.currenttimeiniso = currenttimeiniso;
  }

  for (let i in querypaneltabelcolumnvaluetypeMap) {
    if (
      querypaneltabelcolumnvaluetypeMap[i].fields &&
      Object.keys(querypaneltabelcolumnvaluetypeMap[i].fields).length > 0
    ) {
      for (let j in querypaneltabelcolumnvaluetypeMap[i].fields) {
        let replacedynamicstring =
          "{" +
          querypaneltabelcolumnvaluetypeMap[i].name +
          "." +
          querypaneltabelcolumnvaluetypeMap[i].fields[j].name +
          "}";
        let replacedynamicvalue = "";
        if (
          typeof replacetext === "string" &&
          replacetext.includes(replacedynamicstring)
        ) {
          if (
            querypaneltabelcolumnvaluetypeMap[i].name === "signedindbuserdata"
          ) {
            if (
              sitestatedata &&
              sitestatedata.signedindbuserdata &&
              sitestatedata.signedindbuserdata.data
            ) {
              if (
                querypaneltabelcolumnvaluetypeMap[i].fields[j].name !== "id"
              ) {
                replacedynamicvalue =
                  sitestatedata.signedindbuserdata.data[
                    querypaneltabelcolumnvaluetypeMap[i].fields[j].name
                  ];
              } else {
                replacedynamicvalue =
                  sitestatedata.signedindbuserdata[
                    querypaneltabelcolumnvaluetypeMap[i].fields[j].name
                  ];
              }
            }
          }
          if (
            querypaneltabelcolumnvaluetypeMap[i].name ===
            "signedinvendordbuserdata"
          ) {
            if (
              sitestatedata &&
              sitestatedata.signedinvendordbuserdata &&
              sitestatedata.signedinvendordbuserdata.data
            ) {
              if (
                querypaneltabelcolumnvaluetypeMap[i].fields[j].name !== "id"
              ) {
                replacedynamicvalue =
                  sitestatedata.signedinvendordbuserdata.data[
                    querypaneltabelcolumnvaluetypeMap[i].fields[j].name
                  ];
              } else {
                replacedynamicvalue =
                  sitestatedata.signedinvendordbuserdata[
                    querypaneltabelcolumnvaluetypeMap[i].fields[j].name
                  ];
              }
            }
          }

          if (querypaneltabelcolumnvaluetypeMap[i].name === "orgdata") {
            if (
              sitestatedata &&
              sitestatedata.orgdata &&
              sitestatedata.orgdata.data
            ) {
              if (
                querypaneltabelcolumnvaluetypeMap[i].fields[j].name !== "id"
              ) {
                replacedynamicvalue =
                  sitestatedata.orgdata.data[
                    querypaneltabelcolumnvaluetypeMap[i].fields[j].name
                  ];
              } else {
                replacedynamicvalue =
                  sitestatedata.orgdata[
                    querypaneltabelcolumnvaluetypeMap[i].fields[j].name
                  ];
              }
            }
          }

          if (querypaneltabelcolumnvaluetypeMap[i].name === "urldata") {
            if (sitestatedata && sitestatedata.urldata) {
              replacedynamicvalue =
                sitestatedata.urldata[
                  querypaneltabelcolumnvaluetypeMap[i].fields[j].name
                ];
            }
          }

          if (
            typeof replacetext === "string" &&
            replacedynamicvalue &&
            replacedynamicstring &&
            replacedynamicstring !== ""
          ) {
            let typetext = typeof replacedynamicvalue;
            if (typetext === "string") {
              replacetext = replacetext.replace(
                replacedynamicstring,
                replacedynamicvalue
              );
            } else {
              replacetext = replacedynamicvalue;
            }
          }
        }
      }
    }
  }

  for (let i in sitestatedata.signedindbuserdata) {
    let replacedynamicstring = "{signedindbuserdata" + "." + i + "}";
    let replacedynamicvalue = sitestatedata.signedindbuserdata[i];

    replacetext = replacedynamictextutil({
      replacetext: replacetext,
      replacedynamicstring: replacedynamicstring,
      replacedynamicvalue: replacedynamicvalue,
    });
  }

  for (let i in sitestatedata.signedinvendordbuserdata) {
    let replacedynamicstring = "{signedinvendordbuserdata" + "." + i + "}";
    let replacedynamicvalue = sitestatedata.signedinvendordbuserdata[i];

    replacetext = replacedynamictextutil({
      replacetext: replacetext,
      replacedynamicstring: replacedynamicstring,
      replacedynamicvalue: replacedynamicvalue,
    });
  }

  for (let i in sitestatedata.browserlocalstoragedata) {
    let replacedynamicstring = "{browserlocalstoragedata" + "." + i + "}";
    let replacedynamicvalue = sitestatedata.browserlocalstoragedata[i];

    replacetext = replacedynamictextutil({
      replacetext: replacetext,
      replacedynamicstring: replacedynamicstring,
      replacedynamicvalue: replacedynamicvalue,
    });
  }

  for (let i in sitestatedata.devicedata) {
    let replacedynamicstring = "{sitestatedata" + "." + i + "}";
    let replacedynamicvalue = sitestatedata.devicedata[i];
    replacetext = replacedynamictextutil({
      replacetext: replacetext,
      replacedynamicstring: replacedynamicstring,
      replacedynamicvalue: replacedynamicvalue,
    });
  }

  for (let i in sitestatedata.urldata) {
    let replacedynamicstring = "{sitestatedata" + "." + i + "}";
    let replacedynamicvalue = sitestatedata.urldata[i];
    replacetext = replacedynamictextutil({
      replacetext: replacetext,
      replacedynamicstring: replacedynamicstring,
      replacedynamicvalue: replacedynamicvalue,
    });
  }

  if (sitestatedata.urldata && sitestatedata.urldata.urlhashdataparams) {
    for (let i in sitestatedata.urldata.urlhashdataparams) {
      let replacedynamicstring = "{urlhashdataparams" + "." + i + "}";
      let replacedynamicvalue = sitestatedata.urldata.urlhashdataparams[i];

      replacetext = replacedynamictextutil({
        replacetext: replacetext,
        replacedynamicstring: replacedynamicstring,
        replacedynamicvalue: replacedynamicvalue,
      });
    }
  }

  if (sitestatedata.urldata && sitestatedata.urldata.urlsearchdataparams) {
    for (let i in sitestatedata.urldata.urlsearchdataparams) {
      let replacedynamicstring = "{urlsearchdataparams" + "." + i + "}";
      let replacedynamicvalue = sitestatedata.urldata.urlsearchdataparams[i];

      replacetext = replacedynamictextutil({
        replacetext: replacetext,
        replacedynamicstring: replacedynamicstring,
        replacedynamicvalue: replacedynamicvalue,
      });
    }
  }

  if (sitestatedata.onclickdata) {
    for (let i in sitestatedata.onclickdata) {
      let replacedynamicstring = "{sitestatedata" + "." + i + "}";
      let replacedynamicvalue = sitestatedata.onclickdata[i];
      replacetext = replacedynamictextutil({
        replacetext: replacetext,
        replacedynamicstring: replacedynamicstring,
        replacedynamicvalue: replacedynamicvalue,
      });
    }
  }

  if (sitestatedata.onchangedata) {
    for (let i in sitestatedata.onchangedata) {
      let replacedynamicstring = "{sitestatedata" + "." + i + "}";
      let replacedynamicvalue = sitestatedata.onchangedata[i];

      replacetext = replacedynamictextutil({
        replacetext: replacetext,
        replacedynamicstring: replacedynamicstring,
        replacedynamicvalue: replacedynamicvalue,
      });
    }
  }

  for (let i in sitestatedata) {
    let replacedynamicstring = "{sitestatedata" + "." + i + "}";
    let replacedynamicvalue = sitestatedata[i];

    replacetext = replacedynamictextutil({
      replacetext: replacetext,
      replacedynamicstring: replacedynamicstring,
      replacedynamicvalue: replacedynamicvalue,
    });
  }

  if (
    lstobjindex !== undefined &&
    templateareaitemstatedata &&
    templateareaitemstatedata.onclickdata &&
    templateareaitemstatedata.onclickdata[lstobjindex]
  ) {
    for (let i in templateareaitemstatedata.onclickdata[lstobjindex]) {
      let replacedynamicstring = "{templateareaitemstatedata" + "." + i + "}";
      let replacedynamicvalue =
        templateareaitemstatedata.onclickdata[lstobjindex][i];
      replacetext = replacedynamictextutil({
        replacetext: replacetext,
        replacedynamicstring: replacedynamicstring,
        replacedynamicvalue: replacedynamicvalue,
      });
    }
  }

  if (
    lstobjindex !== undefined &&
    templateareaitemstatedata &&
    templateareaitemstatedata.onchangedata &&
    templateareaitemstatedata.onchangedata[lstobjindex]
  ) {
    for (let i in templateareaitemstatedata.onchangedata[lstobjindex]) {
      let replacedynamicstring = "{templateareaitemstatedata" + "." + i + "}";
      let replacedynamicvalue =
        templateareaitemstatedata.onchangedata[lstobjindex][i];
      replacetext = replacedynamictextutil({
        replacetext: replacetext,
        replacedynamicstring: replacedynamicstring,
        replacedynamicvalue: replacedynamicvalue,
      });
    }
  }

  if (templateareaitemstatedata) {
    for (let i in templateareaitemstatedata) {
      let replacedynamicstring = "{templateareaitemstatedata" + "." + i + "}";
      let replacedynamicvalue = templateareaitemstatedata[i];
      replacetext = replacedynamictextutil({
        replacetext: replacetext,
        replacedynamicstring: replacedynamicstring,
        replacedynamicvalue: replacedynamicvalue,
      });
    }
  }

  if (tabledata && tabledata.data) {
    for (let i in tabledata.data) {
      let replacedynamicstring = "{tabledata" + "." + i + "}";
      let replacedynamicvalue = tabledata.data[i];

      replacetext = replacedynamictextutil({
        replacetext: replacetext,
        replacedynamicstring: replacedynamicstring,
        replacedynamicvalue: replacedynamicvalue,
      });
    }
  }

  for (let i in parentalltypecompstatedata) {
    let replacedynamicstring = "{parentalltypecompstatedata" + "." + i + "}";
    let replacedynamicvalue = parentalltypecompstatedata[i];

    replacetext = replacedynamictextutil({
      replacetext: replacetext,
      replacedynamicstring: replacedynamicstring,
      replacedynamicvalue: replacedynamicvalue,
    });
  }

  if (
    templateareaitemstatedata &&
    templateareaitemstatedata.uirepeatrecorddata &&
    Object.keys(templateareaitemstatedata.uirepeatrecorddata).length > 0
  ) {
    for (let i in templateareaitemstatedata.uirepeatrecorddata) {
      let replacedynamicstring = "{uirepeatrecorddata" + "." + i + "}";
      let replacedynamicvalue = templateareaitemstatedata.uirepeatrecorddata[i];
      replacetext = replacedynamictextutil({
        replacetext: replacetext,
        replacedynamicstring: replacedynamicstring,
        replacedynamicvalue: replacedynamicvalue,
      });
    }
  }

  if (
    templateareaitemstatedata &&
    templateareaitemstatedata.uirepeatrecorddata &&
    templateareaitemstatedata.uirepeatrecorddata.data &&
    Object.keys(templateareaitemstatedata.uirepeatrecorddata.data).length > 0
  ) {
    for (let i in templateareaitemstatedata.uirepeatrecorddata.data) {
      let replacedynamicstring = "{uirepeatrecorddata" + "." + i + "}";
      let replacedynamicvalue =
        templateareaitemstatedata.uirepeatrecorddata.data[i];

      replacetext = replacedynamictextutil({
        replacetext: replacetext,
        replacedynamicstring: replacedynamicstring,
        replacedynamicvalue: replacedynamicvalue,
      });
    }
  }

  if (
    templateareaitemstatedata &&
    templateareaitemstatedata.uirepeatrecorddata &&
    templateareaitemstatedata.uirepeatrecorddata.data &&
    templateareaitemstatedata.uirepeatrecorddata.data.listdisplaycolumndata &&
    Object.keys(
      templateareaitemstatedata.uirepeatrecorddata.data.listdisplaycolumndata
    ).length > 0
  ) {
    for (let i in templateareaitemstatedata.uirepeatrecorddata.data
      .listdisplaycolumndata) {
      let replacedynamicstring = "{listdisplaycolumndata" + "." + i + "}";
      let replacedynamicvalue =
        templateareaitemstatedata.uirepeatrecorddata.data.listdisplaycolumndata[
          i
        ];

      replacetext = replacedynamictextutil({
        replacetext: replacetext,
        replacedynamicstring: replacedynamicstring,
        replacedynamicvalue: replacedynamicvalue,
      });
    }
  }

  let searchtextbefore = "ISBLANK(";
  let searchtextafter = ")";
  do {
    if (
      replacetext !== undefined &&
      typeof replacetext === "string" &&
      replacetext.includes(searchtextbefore)
    ) {
      let isblankreplacetextsplitarray = replacetext.split(searchtextbefore, 2);
      let afterisblankreplacetextsplitarray =
        isblankreplacetextsplitarray[1].split(searchtextafter, 2);
      alltypecompconsolelog(
        "afterisblankreplacetextsplitarray",
        afterisblankreplacetextsplitarray
      );
      let afterisblankreplacetextsplitstring = "";
      if (
        afterisblankreplacetextsplitarray[0] === undefined ||
        afterisblankreplacetextsplitarray[0] === "" ||
        afterisblankreplacetextsplitarray[0].includes("{")
      ) {
        afterisblankreplacetextsplitstring = "true";
      } else {
        afterisblankreplacetextsplitstring = "false";
      }
      alltypecompconsolelog(
        "afterisblankreplacetextsplitstring",
        afterisblankreplacetextsplitstring
      );
      replacetext = replacetext.replace(
        searchtextbefore +
          afterisblankreplacetextsplitarray[0] +
          searchtextafter,
        afterisblankreplacetextsplitstring
      );
      alltypecompconsolelog(
        "afterisblankreplacetextsplitstringreplacetext",
        replacetext
      );
    }
  } while (
    replacetext !== undefined &&
    typeof replacetext === "string" &&
    replacetext.includes(searchtextbefore)
  );

  searchtextbefore = "ISEQUALS(";
  searchtextafter = ")";
  do {
    alltypecompconsolelog(replacetext);
    if (
      replacetext !== undefined &&
      typeof replacetext === "string" &&
      replacetext.includes(searchtextbefore)
    ) {
      let isblankreplacetextsplitarray = replacetext.split(searchtextbefore, 2);
      let afterisblankreplacetextsplitarray =
        isblankreplacetextsplitarray[1].split(searchtextafter, 2);
      let afterisblankreplacetextsplitarraysplitbycomma = [];
      if (afterisblankreplacetextsplitarray[0] !== undefined) {
        afterisblankreplacetextsplitarraysplitbycomma =
          afterisblankreplacetextsplitarray[0].split(",");
      }
      let afterisblankreplacetextsplitstring = "false";
      if (afterisblankreplacetextsplitarraysplitbycomma.length > 0) {
        afterisblankreplacetextsplitstring = "true";
        for (
          let i = 0;
          i < afterisblankreplacetextsplitarraysplitbycomma.length;
          i++
        ) {
          for (
            let j = 0;
            j < afterisblankreplacetextsplitarraysplitbycomma.length;
            j++
          ) {
            alltypecompconsolelog(
              afterisblankreplacetextsplitarraysplitbycomma[i]
            );
            if (
              afterisblankreplacetextsplitarraysplitbycomma[i] !==
              afterisblankreplacetextsplitarraysplitbycomma[j]
            ) {
              afterisblankreplacetextsplitstring = "false";
            }
          }
        }
      }

      replacetext = replacetext.replace(
        searchtextbefore +
          afterisblankreplacetextsplitarray[0] +
          searchtextafter,
        afterisblankreplacetextsplitstring
      );
    }
  } while (
    replacetext !== undefined &&
    typeof replacetext === "string" &&
    replacetext.includes(searchtextbefore)
  );

  searchtextbefore = "NOT(";
  searchtextafter = ")";
  do {
    if (
      replacetext !== undefined &&
      typeof replacetext === "string" &&
      replacetext.includes(searchtextbefore)
    ) {
      alltypecompconsolelog("NOT(");
      alltypecompconsolelog(replacetext);
      let isblankreplacetextsplitarray = replacetext.split(searchtextbefore, 2);
      let afterisblankreplacetextsplitarray =
        isblankreplacetextsplitarray[1].split(searchtextafter, 2);
      let afterisblankreplacetextsplitstring = "";
      if (
        afterisblankreplacetextsplitarray[0] === true ||
        afterisblankreplacetextsplitarray[0] === "true"
      ) {
        afterisblankreplacetextsplitstring = "false";
      }
      if (
        afterisblankreplacetextsplitarray[0] === false ||
        afterisblankreplacetextsplitarray[0] === "false" ||
        afterisblankreplacetextsplitarray[0].includes("{")
      ) {
        afterisblankreplacetextsplitstring = "true";
      }
      alltypecompconsolelog(afterisblankreplacetextsplitstring);
      replacetext = replacetext.replace(
        searchtextbefore +
          afterisblankreplacetextsplitarray[0] +
          searchtextafter,
        afterisblankreplacetextsplitstring
      );
    }
  } while (
    replacetext !== undefined &&
    typeof replacetext === "string" &&
    replacetext.includes(searchtextbefore)
  );

  searchtextbefore = "AND(";
  searchtextafter = ")";
  do {
    alltypecompconsolelog(replacetext);
    if (
      replacetext !== undefined &&
      typeof replacetext === "string" &&
      replacetext.includes(searchtextbefore)
    ) {
      let isblankreplacetextsplitarray = replacetext.split(searchtextbefore, 2);
      let afterisblankreplacetextsplitarray =
        isblankreplacetextsplitarray[1].split(searchtextafter, 2);
      let afterisblankreplacetextsplitarraysplitbycomma = [];
      if (afterisblankreplacetextsplitarray[0] !== undefined) {
        afterisblankreplacetextsplitarraysplitbycomma =
          afterisblankreplacetextsplitarray[0].split(",");
      }
      let afterisblankreplacetextsplitstring = "";
      if (afterisblankreplacetextsplitarraysplitbycomma.length > 0) {
        afterisblankreplacetextsplitstring = "true";
        for (
          let i = 0;
          i < afterisblankreplacetextsplitarraysplitbycomma.length;
          i++
        ) {
          alltypecompconsolelog(
            afterisblankreplacetextsplitarraysplitbycomma[i]
          );
          if (afterisblankreplacetextsplitarraysplitbycomma[i] !== "true") {
            afterisblankreplacetextsplitstring = "false";
          }
        }
      }

      replacetext = replacetext.replace(
        searchtextbefore +
          afterisblankreplacetextsplitarray[0] +
          searchtextafter,
        afterisblankreplacetextsplitstring
      );
    }
  } while (
    replacetext !== undefined &&
    typeof replacetext === "string" &&
    replacetext.includes(searchtextbefore)
  );

  searchtextbefore = "OR(";
  searchtextafter = ")";
  do {
    if (
      replacetext !== undefined &&
      typeof replacetext === "string" &&
      replacetext.includes(searchtextbefore)
    ) {
      let isblankreplacetextsplitarray = replacetext.split(searchtextbefore, 2);
      let afterisblankreplacetextsplitarray =
        isblankreplacetextsplitarray[1].split(searchtextafter, 2);
      let afterisblankreplacetextsplitarraysplitbycomma = [];
      if (afterisblankreplacetextsplitarray[0] !== undefined) {
        afterisblankreplacetextsplitarraysplitbycomma =
          afterisblankreplacetextsplitarray[0].split(",");
      }
      let afterisblankreplacetextsplitstring = "";
      if (afterisblankreplacetextsplitarraysplitbycomma.length > 0) {
        afterisblankreplacetextsplitstring = "false";
        for (
          let i = 0;
          i < afterisblankreplacetextsplitarraysplitbycomma.length;
          i++
        ) {
          alltypecompconsolelog(
            afterisblankreplacetextsplitarraysplitbycomma[i]
          );
          if (afterisblankreplacetextsplitarraysplitbycomma[i] === "true") {
            afterisblankreplacetextsplitstring = "true";
          }
        }
      }

      replacetext = replacetext.replace(
        searchtextbefore +
          afterisblankreplacetextsplitarray[0] +
          searchtextafter,
        afterisblankreplacetextsplitstring
      );
    }
  } while (
    replacetext !== undefined &&
    typeof replacetext === "string" &&
    replacetext.includes(searchtextbefore)
  );

  alltypecompconsolelog("replacedynamictext-exit");
  alltypecompconsolelog(replacetext);
  return replacetext;
};

export let getdroppedtemplateareaitem = (methodprops) => {
  let rettemplateareaitem = {};
  var draggedcomporder = methodprops.e.dataTransfer.getData("order");
  let { favouriteuiconfigslistmetadata } = methodprops;
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
      rettemplateareaitem =
        templateareaitemDragpanelmetadataInitMap[draggedcompdragtemplatename];
    }
    if (draggedcompdragtemplatetype === "favouritetemplateareaitem") {
      for (let i = 0; i < favouriteuiconfigslistmetadata.length; i++) {
        if (
          favouriteuiconfigslistmetadata[i].id === draggedcompdragtemplatename
        ) {
          rettemplateareaitem = favouriteuiconfigslistmetadata[i].data.metadata;
        }
      }
    }
  }

  return rettemplateareaitem;
};

///////////////////////////

export let gettabledatafromNodejs = async (methodprops) => {
  alltypecompconsolelog("gettabledatafromNodejs-entry",methodprops);
 





  let requestbody = JSON.stringify({
    "tablename":"bow",
    "conditionexpression":{"a":"b"},
     "columns":[],
     "sortby" :"a",
     "sortbytype":"asc", 
     "limit":1
   

  });
 


  var config = {
    method: 'post',
    url: '/retrieverecords',
    headers: {
      "Content-type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
 //   "Access-Control-Request-Headers": "*",
    },
    data: requestbody
};

let resp = {issuccess:"true", message:""};

   await axios(config)
   .then(function (response) {
       console.log(JSON.stringify(response.data));
       resp.issuccess = true;
       resp.data = response.data;
       resp.message = '';
   })
   .catch(function (error) {
       console.log(error);
       resp.issuccess = false;
       resp.data = [];
       resp.message = error;
   });

 alltypecompconsolelog("gettabledatafromNodejs-response",resp);
 // alltypecompconsolelog("gettabledatafromNodejs-response.json",response.json());
  // const response = await fetch('/createtable');
  //const body = await response.json();
  
  // if (response.status !== 200) {
  //   throw Error(body.message);f
  // }
  return resp;
};

export let gettabledatafromDatabase = async (methodprops) => {
  let isdatabaselocalstorage = false;
  let isdatabasefirebase = false;
  let data = [];
  isdatabaselocalstorage = true;
  if (isdatabaselocalstorage === true) {
    data = await gettabledatafromLocalstorage(methodprops);
  }
  if (isdatabasefirebase === true) {
    data = await gettabledatafromFirebase(methodprops);
  }
  return data;
};

let gettabledatafromLocalstorage = async (methodprops) => {
  alltypecompconsolelog("gettabledatafromLocalstorage-entry");

  alltypecompconsolelog(methodprops);
  let { tablename, orgname, id, idoperator } = methodprops;

  let data = [];

  let totaldbLS = await localStorage.getItem("alltabledatabaseJSON");
  if (totaldbLS && tablename && tablename !== "") {
    let totaldbLSJson = JSON.parse(totaldbLS);
    let totaltabledata = totaldbLSJson["data"][tablename];
    if (totaltabledata) {
      alltypecompconsolelog(totaltabledata);
      for (let i = 0; i < totaltabledata.length; i++) {
        if (
          totaltabledata[i].id === id &&
          totaltabledata[i].orgname === orgname &&
          idoperator === "equalsto"
        ) {
          data.push(totaltabledata[i]);
        }
        if (
          totaltabledata[i].id &&
          totaltabledata[i].id.startsWith(id) &&
          totaltabledata[i].orgname === orgname &&
          idoperator === "beginswith"
        ) {
          data.push(totaltabledata[i]);
        }
      }
    }
  }
  alltypecompconsolelog("gettabledatafromLocalstorage-exit");

  alltypecompconsolelog(data);
  return data;
};

let gettabledatafromFirebase = async (methodprops) => {
  alltypecompconsolelog("gettabledatafromFirebase-entry", methodprops);

  let { tablename, orgname, id, idoperator } = methodprops;

  let data = [];

  const snapshot = await window.firebase
    .database()
    .ref("alltabledatabaseJSON")
    .once("value");
  var totaldbLS = snapshot.val();
  if (totaldbLS && totaldbLS.data && tablename && tablename !== "") {
    let totaldbLSJson = totaldbLS;
    let totaltabledata = totaldbLSJson["data"][tablename];
    if (totaltabledata) {
      alltypecompconsolelog(totaltabledata);
      for (let i = 0; i < totaltabledata.length; i++) {
        if (
          totaltabledata[i] &&
          totaltabledata[i].id === id &&
          totaltabledata[i].orgname === orgname &&
          idoperator === "equalsto"
        ) {
          data.push(totaltabledata[i]);
        }
        if (
          totaltabledata[i] &&
          totaltabledata[i].id &&
          totaltabledata[i].id.startsWith(id) &&
          totaltabledata[i].orgname === orgname &&
          idoperator === "beginswith"
        ) {
          data.push(totaltabledata[i]);
        }
      }
    }
  }
  alltypecompconsolelog("gettabledatafromFirebase-exit", data);

  return data;
};

export let gettabledatafromDatabaseUsingSectionMetadata = async (
  methodprops
) => {
  let templaterecordlistdata = [];
  let searchpaneltemplaterecordlistdata = [];
  let datafromDatabaseUsingSectionMetadata = {};
  let templaterecordlistdatafiltered = [];

  let {
    templatemetadata,
    sitestatedata,
    parentalltypecompstatedata,
    currenttablequerymetadatafromserver,
    searchpanelchangevalue,
    dbuisearchpanelidbeginswith,
    dbuisearchpaneltablename,
  } = methodprops;
  templateareaitemconsolelog(
    templatemetadata,
    "gettabledatafromDatabaseUsingSectionMetadata-entry",
    methodprops
  );

  let {
    dbquerypaneltablenamesectionmetadata,
    dbquerypanelbeginswithtablecolumnssectionmetadata,
    dbquerypanelfilterbytablecolumnssectionmetadata,
  } = templatemetadata.items;

  if (
    currenttablequerymetadatafromserver &&
    Object.keys(currenttablequerymetadatafromserver).length > 0
  ) {
    dbquerypaneltablenamesectionmetadata =
      currenttablequerymetadatafromserver.data.metadata.items
        .dbquerypaneltablenamesectionmetadata;
    dbquerypanelbeginswithtablecolumnssectionmetadata =
      currenttablequerymetadatafromserver.data.metadata.items
        .dbquerypanelbeginswithtablecolumnssectionmetadata;
    dbquerypanelfilterbytablecolumnssectionmetadata =
      currenttablequerymetadatafromserver.data.metadata.items
        .dbquerypanelfilterbytablecolumnssectionmetadata;
  }

  if (dbquerypaneltablenamesectionmetadata) {
    let tablenamefield = {};
    for (let i in dbquerypaneltablenamesectionmetadata.items) {
      if (
        dbquerypaneltablenamesectionmetadata.items[i].inputoutputfieldprops &&
        dbquerypaneltablenamesectionmetadata.items[i].inputoutputfieldprops
          .type === "querypaneltablename"
      ) {
        tablenamefield = dbquerypaneltablenamesectionmetadata.items[i];
      }
    }
    templateareaitemconsolelog(
      templatemetadata,
      "tablenamefield",
      tablenamefield
    );

    let idfield = {};
    let nonidfields = [];
    for (let i in dbquerypanelbeginswithtablecolumnssectionmetadata.items) {
      if (
        dbquerypanelbeginswithtablecolumnssectionmetadata.items[i]
          .inputoutputfieldprops &&
        dbquerypanelbeginswithtablecolumnssectionmetadata.items[i]
          .inputoutputfieldprops.type === "querypanelcolumnquery"
      ) {
        if (
          dbquerypanelbeginswithtablecolumnssectionmetadata.items[i]
            .inputoutputfieldprops.querypaneltabelcolumnname === "id"
        ) {
          idfield = dbquerypanelbeginswithtablecolumnssectionmetadata.items[i];
        } else {
          nonidfields.push(
            dbquerypanelbeginswithtablecolumnssectionmetadata.items[i]
          );
        }
      }
    }

    templateareaitemconsolelog(templatemetadata, "idfield", idfield);

    let querypaneltablenamevalue = "";
    if (tablenamefield && tablenamefield.inputoutputfieldprops) {
      querypaneltablenamevalue =
        tablenamefield.inputoutputfieldprops.querypaneltablename;
    }

    querypaneltablenamevalue = replacedynamictext({
      replacetext: querypaneltablenamevalue,
      sitestatedata: sitestatedata,
      templateareaitemstatedata: {},
      parentalltypecompstatedata: parentalltypecompstatedata,
      tabledata: {},
    });

    // replace idfeidl dynamic values
    let idfieldvalue = "";
    if (idfield && idfield.inputoutputfieldprops) {
      idfieldvalue = idfield.inputoutputfieldprops.querypaneltabelcolumnvalue;
    }

    idfieldvalue = replacedynamictext({
      replacetext: idfieldvalue,
      sitestatedata: sitestatedata,
      templateareaitemstatedata: {},
      parentalltypecompstatedata: parentalltypecompstatedata,
      tabledata: {},
    });

    if (
      tablenamefield &&
      tablenamefield.inputoutputfieldprops &&
      idfield &&
      idfield.inputoutputfieldprops
    ) {
      let templaterecordlistdataparams = {
        tablename: querypaneltablenamevalue,
        id: idfieldvalue,
        idoperator:
          idfield.inputoutputfieldprops.querypaneltabelcolumncondition,
        orgname: sitestatedata.orgdata.data.orgname,
      };
      templateareaitemconsolelog(
        templatemetadata,
        "templaterecordlistdataparams",
        templaterecordlistdataparams
      );
      templaterecordlistdata = await gettabledatafromDatabase(
        templaterecordlistdataparams
      );
    }
  }

  dbuisearchpanelidbeginswith = replacedynamictext({
    replacetext: dbuisearchpanelidbeginswith,
    sitestatedata: sitestatedata,
    templateareaitemstatedata: {},
    parentalltypecompstatedata: parentalltypecompstatedata,
    tabledata: {},
  });

  dbuisearchpaneltablename = replacedynamictext({
    replacetext: dbuisearchpaneltablename,
    sitestatedata: sitestatedata,
    templateareaitemstatedata: {},
    parentalltypecompstatedata: parentalltypecompstatedata,
    tabledata: {},
  });

  if (
    dbuisearchpaneltablename &&
    dbuisearchpaneltablename !== "" &&
    dbuisearchpanelidbeginswith &&
    dbuisearchpanelidbeginswith !== ""
  ) {
    let searchpaneltemplaterecordlistdataparams = {
      tablename: dbuisearchpaneltablename,
      id: dbuisearchpanelidbeginswith + searchpanelchangevalue,
      idoperator: "beginswith",
      orgname: sitestatedata.orgdata.data.orgname,
    };
    templateareaitemconsolelog(
      templatemetadata,
      "searchpaneltemplaterecordlistdataparams",
      searchpaneltemplaterecordlistdataparams
    );
    searchpaneltemplaterecordlistdata = await gettabledatafromDatabase(
      searchpaneltemplaterecordlistdataparams
    );
  }

  templateareaitemconsolelog(
    templatemetadata,
    "templaterecordlistdata",
    templaterecordlistdata
  );
  templateareaitemconsolelog(
    templatemetadata,
    "searchpaneltemplaterecordlistdata",
    searchpaneltemplaterecordlistdata
  );
  if (
    dbquerypanelfilterbytablecolumnssectionmetadata &&
    Object.keys(dbquerypanelfilterbytablecolumnssectionmetadata).length > 0 &&
    dbquerypanelfilterbytablecolumnssectionmetadata.items
  ) {
    for (let i = 0; i < templaterecordlistdata.length; i++) {
      let ismatching = true;

      for (let j in dbquerypanelfilterbytablecolumnssectionmetadata.items) {
        if (
          dbquerypanelfilterbytablecolumnssectionmetadata.items[j]
            .inputoutputfieldprops &&
          dbquerypanelfilterbytablecolumnssectionmetadata.items[j]
            .inputoutputfieldprops.type === "querypanelcolumnquery"
        ) {
          let columnname =
            dbquerypanelfilterbytablecolumnssectionmetadata.items[j]
              .inputoutputfieldprops.querypaneltabelcolumnname;
          let columnvalue =
            dbquerypanelfilterbytablecolumnssectionmetadata.items[j]
              .inputoutputfieldprops.querypaneltabelcolumnvalue;
          let datarecord = templaterecordlistdata[i];
          if (
            dbquerypanelfilterbytablecolumnssectionmetadata.items[j]
              .inputoutputfieldprops.querypaneltabelcolumncondition ===
              "beginswith" &&
            columnname &&
            datarecord.data[columnname] &&
            datarecord.data[columnname].startsWith(columnvalue)
          ) {
          } else if (
            dbquerypanelfilterbytablecolumnssectionmetadata.items[j]
              .inputoutputfieldprops.querypaneltabelcolumncondition ===
              "contains" &&
            columnname &&
            datarecord.data[columnname] &&
            datarecord.data[columnname].includes(columnvalue)
          ) {
          } else if (
            dbquerypanelfilterbytablecolumnssectionmetadata.items[j]
              .inputoutputfieldprops.querypaneltabelcolumncondition ===
              "equalsto" &&
            columnname &&
            datarecord.data[columnname] &&
            datarecord.data[columnname] === columnvalue
          ) {
          } else if (
            dbquerypanelfilterbytablecolumnssectionmetadata.items[j]
              .inputoutputfieldprops.querypaneltabelcolumncondition ===
              "notequalsto" &&
            columnname &&
            datarecord.data[columnname] &&
            datarecord.data[columnname] !== columnvalue
          ) {
          } else {
            ismatching = false;
          }
        }
      }
      if (ismatching === true) {
        templaterecordlistdatafiltered.push(templaterecordlistdata[i]);
      }
    }
  } else {
    templaterecordlistdatafiltered = templaterecordlistdata;
  }

  datafromDatabaseUsingSectionMetadata.recordlistdatafromdb =
    templaterecordlistdatafiltered;
  datafromDatabaseUsingSectionMetadata.searchpanelrecordlistdatafromdb =
    searchpaneltemplaterecordlistdata;

  return datafromDatabaseUsingSectionMetadata;
};

export let getbrowserLocalstorage = async (methodprops) => {
  alltypecompconsolelog("getbrowserLocalstorage-entry");

  alltypecompconsolelog(methodprops);

  let value = "";
  let totaldbLS = await localStorage.getItem("browserlocalstoragedata");
  if (totaldbLS) {
    let totaldbLSJson = JSON.parse(totaldbLS);
    if (totaldbLSJson && totaldbLSJson.data) {
      value = totaldbLSJson.data;
    }
  }
  alltypecompconsolelog("getbrowserLocalstorage-exit");

  alltypecompconsolelog(value);
  return value;
};

export let inserttabledatainDatabase = async (methodprops) => {
  let { tablename, tabledatalist } = methodprops;
  let isdatabaselocalstorage = false;
  let isdatabasefirebase = false;
  let data = [];
  isdatabaselocalstorage = true;

  if (isdatabaselocalstorage === true) {
    data = await inserttabledatainLocalstorage({
      tablename: tablename,
      tabledatalist: tabledatalist,
    });
  }
  if (isdatabasefirebase === true) {
    data = await inserttabledatainFirebase({
      tablename: tablename,
      tabledatalist: tabledatalist,
    });
  }

  return data;
};

let inserttabledatainLocalstorage = async (methodprops) => {
  alltypecompconsolelog("inserttabledatainLocalstorage-entry");
  alltypecompconsolelog(methodprops);
  let { tablename, tabledatalist } = methodprops;

  let totaldbLS = await localStorage.getItem("alltabledatabaseJSON");
  let result = { issuccess: "false", message: "", tabledatalist: [] };
  if (totaldbLS && tablename && tablename !== "" && tabledatalist) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];
      if (tabledata) {
        let totaldbLSJson = JSON.parse(totaldbLS);
        alltypecompconsolelog(totaldbLSJson);
        let totaltabledata = totaldbLSJson["data"][tablename];
        alltypecompconsolelog(totaltabledata);
        if (totaltabledata === undefined) {
          totaltabledata = [];
        }

        if (totaltabledata) {
          result.tabledatalist.push(tabledata);
          totaltabledata.push(tabledata);
          totaldbLSJson["data"][tablename] = totaltabledata;
          await localStorage.setItem(
            "alltabledatabaseJSON",
            JSON.stringify(totaldbLSJson)
          );
        }
      }
    }
    result.issuccess = "true";
  }

  alltypecompconsolelog("inserttabledatainLocalstorage-exit");
  alltypecompconsolelog(result);
  return result;
};

let inserttabledatainFirebase = async (methodprops) => {
  alltypecompconsolelog("inserttabledatainFirebase-entry");
  alltypecompconsolelog(methodprops);
  let { tablename, tabledatalist } = methodprops;

  const snapshot = await window.firebase
    .database()
    .ref("alltabledatabaseJSON")
    .once("value");
  var totaldbLS = snapshot.val();
  var dbref = window.firebase.database().ref("alltabledatabaseJSON");

  let result = { issuccess: "false", message: "", tabledatalist: [] };
  if (totaldbLS && tablename && tablename !== "" && tabledatalist) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];
      if (tabledata) {
        let totaldbLSJson = totaldbLS;
        alltypecompconsolelog(totaldbLSJson);
        let totaltabledata = totaldbLSJson["data"][tablename];
        alltypecompconsolelog(totaltabledata);
        if (totaltabledata === undefined) {
          totaltabledata = [];
        }

        if (totaltabledata) {
          totaltabledata.push(tabledata);
          result.tabledatalist.push(tabledata);
          totaldbLSJson["data"][tablename] = totaltabledata;
          await dbref.set(totaldbLSJson);
        }
      }
    }
    result.issuccess = "true";
  }

  alltypecompconsolelog("inserttabledatainFirebase-exit");
  alltypecompconsolelog(result);
  return result;
};

export let updatetabledatainDatabase = async (methodprops) => {
  let { tablename, tabledatalist } = methodprops;
  let isdatabaselocalstorage = false;
  let isdatabasefirebase = false;
  let data = [];
  isdatabaselocalstorage = true;

  if (isdatabaselocalstorage === true) {
    data = await updatetabledatainLocalstorage({
      tablename: tablename,
      tabledatalist: tabledatalist,
    });
  }
  if (isdatabasefirebase === true) {
    data = await updatetabledatainFirebase({
      tablename: tablename,
      tabledatalist: tabledatalist,
    });
  }
  return data;
};

let updatetabledatainLocalstorage = async (methodprops) => {
  alltypecompconsolelog("updatetabledatainLocalstorage-entry");
  alltypecompconsolelog(methodprops);
  let result = { issuccess: "false", message: "", tabledatalist: [] };
  let { tablename, tabledatalist } = methodprops;

  let totaldbLS = await localStorage.getItem("alltabledatabaseJSON");

  if (
    totaldbLS &&
    tablename &&
    tablename !== "" &&
    tabledatalist &&
    tabledatalist.length > 0
  ) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];
      if (tabledata && tabledata.orgname !== "" && tabledata.id !== "") {
        let totaldbLSJson = JSON.parse(totaldbLS);
        alltypecompconsolelog(totaldbLSJson);
        let totaltabledata = totaldbLSJson["data"][tablename];
        alltypecompconsolelog(totaltabledata);
        for (let i = 0; i < totaltabledata.length; i++) {
          if (
            totaltabledata[i].id === tabledata.id &&
            totaltabledata[i].orgname === tabledata.orgname
          ) {
            result.tabledatalist.push(tabledata);
            totaltabledata[i] = tabledata;
            totaldbLSJson["data"][tablename] = totaltabledata;
            totaldbLS = JSON.stringify(totaldbLSJson);
            await localStorage.setItem(
              "alltabledatabaseJSON",
              JSON.stringify(totaldbLSJson)
            );
          }
        }
        result.issuccess = "true";
      }
    }
  }
  alltypecompconsolelog("updatetabledatainLocalstorage-exit");
  alltypecompconsolelog(result);
  return result;
};

let updatetabledatainFirebase = async (methodprops) => {
  alltypecompconsolelog("updatetabledatainFirebase-entry");
  alltypecompconsolelog(methodprops);
  let result = { issuccess: "false", message: "", tabledatalist: [] };
  let { tablename, tabledatalist } = methodprops;

  const snapshot = await window.firebase
    .database()
    .ref("alltabledatabaseJSON")
    .once("value");
  var totaldbLS = snapshot.val();
  var dbref = window.firebase.database().ref("alltabledatabaseJSON");
  if (
    totaldbLS &&
    tablename &&
    tablename !== "" &&
    tabledatalist &&
    tabledatalist.length > 0
  ) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];
      if (tabledata && tabledata.orgname !== "" && tabledata.id !== "") {
        let totaldbLSJson = totaldbLS;
        alltypecompconsolelog(totaldbLSJson);
        let totaltabledata = totaldbLSJson["data"][tablename];
        alltypecompconsolelog(totaltabledata);

        for (let i = 0; i < totaltabledata.length; i++) {
          if (
            totaltabledata[i] &&
            totaltabledata[i].id === tabledata.id &&
            totaltabledata[i].orgname === tabledata.orgname
          ) {
            totaltabledata[i] = tabledata;

            result.tabledatalist.push(tabledata);
            totaldbLSJson["data"][tablename] = totaltabledata;
            await dbref.set(totaldbLSJson);
          }
        }
      }
    }
    result.issuccess = "true";
  }
  alltypecompconsolelog("updatetabledatainFirebase-exit");
  alltypecompconsolelog(result);
  return result;
};

let setbrowserLocalstorage = async (methodprops) => {
  alltypecompconsolelog("setbrowserLocalstorage-entry");
  let { value } = methodprops;

  alltypecompconsolelog(methodprops);

  let totaldbLS = await localStorage.getItem("browserlocalstoragedata");
  if (totaldbLS) {
    let totaldbLSJson = JSON.parse(totaldbLS);
    for (let i in value) {
      totaldbLSJson.data[i] = value[i];
    }
    await localStorage.setItem(
      "browserlocalstoragedata",
      JSON.stringify(totaldbLSJson)
    );
  } else {
    let totaldbLSJson = { type: "object", data: {} };
    for (let i in value) {
      totaldbLSJson.data[i] = value[i];
    }

    await localStorage.setItem(
      "browserlocalstoragedata",
      JSON.stringify(totaldbLSJson)
    );
  }

  alltypecompconsolelog("setbrowserLocalstorage-entry");

  alltypecompconsolelog(methodprops);

  return {};
};

export let deletetabledatainDatabase = async (methodprops) => {
  let { tablename, tabledatalist } = methodprops;
  let isdatabaselocalstorage = false;
  let isdatabasefirebase = false;
  let data = [];
  isdatabaselocalstorage = true;

  if (isdatabaselocalstorage === true) {
    data = await deletetabledatainLocalstorage({
      tablename: tablename,
      tabledatalist: tabledatalist,
    });
  }
  if (isdatabasefirebase === true) {
    data = await deletetabledatainFirebase({
      tablename: tablename,
      tabledatalist: tabledatalist,
    });
  }
  return data;
};

let deletetabledatainLocalstorage = async (methodprops) => {
  alltypecompconsolelog("deletetabledatainLocalstorage-entry");
  alltypecompconsolelog(methodprops);
  let { tablename, tabledatalist } = methodprops;

  let totaldbLS = await localStorage.getItem("alltabledatabaseJSON");
  let totaldbLSJson = JSON.parse(totaldbLS);
  alltypecompconsolelog(totaldbLSJson);
  let existingtabledata = totaldbLSJson["data"][tablename];
  alltypecompconsolelog(existingtabledata);
  let totaltabledatanew = [];
  let result = { issuccess: "false", message: "", tabledatalist: [] };
  if (
    totaldbLS &&
    tablename &&
    tabledatalist !== "" &&
    tabledatalist &&
    tabledatalist.length > 0 &&
    existingtabledata
  ) {
    let deletingtabledatalist = tabledatalist;
    for (let i = 0; i < existingtabledata.length; i++) {
      alltypecompconsolelog(existingtabledata[i].id);
      let isdeleting = false;
      for (let td = 0; td < deletingtabledatalist.length; td++) {
        if (
          deletingtabledatalist[td] &&
          deletingtabledatalist[td].orgname !== "" &&
          deletingtabledatalist[td].id !== "" &&
          deletingtabledatalist[td].id === existingtabledata[i].id &&
          deletingtabledatalist[td].orgname === existingtabledata[i].orgname
        ) {
          isdeleting = true;
        }
      }
      if (isdeleting === false) {
        totaltabledatanew.push(existingtabledata[i]);
      }
    }
    totaldbLSJson["data"][tablename] = totaltabledatanew;
    alltypecompconsolelog(totaltabledatanew);
    await localStorage.setItem(
      "alltabledatabaseJSON",
      JSON.stringify(totaldbLSJson)
    );
    result.issuccess = "true";
  }
  alltypecompconsolelog("deletetabledatainLocalstorage-exit");
  return result;
};

let deletetabledatainFirebase = async (methodprops) => {
  alltypecompconsolelog("deletetabledatainFirebase-entry");
  alltypecompconsolelog(methodprops);
  let { tablename, tabledatalist } = methodprops;

  const snapshot = await window.firebase
    .database()
    .ref("alltabledatabaseJSON")
    .once("value");
  var totaldbLS = snapshot.val();
  var dbref = window.firebase.database().ref("alltabledatabaseJSON");
  let result = { issuccess: "false", message: "", tabledatalist: [] };
  if (
    totaldbLS &&
    tablename &&
    tablename !== "" &&
    tabledatalist !== "" &&
    tabledatalist &&
    tabledatalist.length > 0
  ) {
    for (let td = 0; td < tabledatalist.length; td++) {
      let tabledata = tabledatalist[td];
      if (tabledata && tabledata.orgname !== "" && tabledata.id !== "") {
        let totaldbLSJson = totaldbLS;
        alltypecompconsolelog(totaldbLSJson);
        let totaltabledata = totaldbLSJson["data"][tablename];
        let totaltabledatanew = [];
        alltypecompconsolelog(totaltabledata);
        result.tabledatalist.push(tabledata);
        for (let i = 0; i < totaltabledata.length; i++) {
          alltypecompconsolelog(totaltabledata[i].id);
          alltypecompconsolelog(tabledata.id);
          if (
            totaltabledata[i].id !== tabledata.id &&
            totaltabledata[i].orgname === tabledata.orgname
          ) {
            totaltabledatanew.push(totaltabledata[i]);
          }
        }
        totaldbLSJson["data"][tablename] = totaltabledatanew;
        alltypecompconsolelog(totaltabledatanew);
        await dbref.set(totaldbLSJson);
      }
      result.issuccess = "true";
    }
  }
  alltypecompconsolelog("deletetabledatainFirebase-exit");
  return result;
};

export let resettabledatainDatabase = async (methodprops) => {
  let { tablename, tabledata } = methodprops;
  let isdatabaselocalstorage = false;
  let isdatabasefirebase = false;
  let data = [];
  isdatabaselocalstorage = true;

  if (isdatabaselocalstorage === true) {
    data = await resettabledatainLocalstorage({
      tablename: tablename,
      tabledata: tabledata,
    });
  }
  if (isdatabasefirebase === true) {
    data = await resettabledatainFirebase({
      tablename: tablename,
      tabledata: tabledata,
    });
  }
  return data;
};

let resettabledatainLocalstorage = async (methodprops) => {
  await localStorage.setItem(
    "alltabledatabaseJSON",
    JSON.stringify({ type: "object", data: {} })
  );
  return {};
};

let resettabledatainFirebase = async (methodprops) => {
  var dbref = window.firebase.database().ref("alltabledatabaseJSON");
  await dbref.set({ type: "object", data: {} });
  return {};
};

let resetbrowserLocalstorage = async (methodprops) => {
  await localStorage.setItem(
    "browserlocalstoragedata",
    JSON.stringify({ type: "object", data: {} })
  );
  return {};
};

////////////////////////////////////

const premodifydatabaseHandler = async (methodpropss) => {
  let methodprops = JSON.parse(JSON.stringify(methodpropss));
  alltypecompconsolelog("premodifydatabaseHandler-entry", methodprops);
  let result = { issuccess: "true", message: "" };

  let {
    tablename,

    tabledatalistOld,
    tablemetadata,
    tablecolumnmetadatalist,

    modifytype,
  } = methodprops;

  let linkedrecordsdataarray = await getrelatedlinkedcolumnrecorddata({
    tablename: tablename,
    tabledatalist: tabledatalistOld,
    tablemetadata: tablemetadata,
    tablecolumnmetadatalist: tablecolumnmetadatalist,
  });

  if (
    modifytype &&
    modifytype !== "" &&
    modifytype !== "insert" &&
    linkedrecordsdataarray &&
    linkedrecordsdataarray.length > 0
  ) {
    let lrdeleteresult = await deletetabledatainDatabase({
      tablename: "linkedcolumnrecorddata",
      tabledatalist: linkedrecordsdataarray,
    });
    alltypecompconsolelog("lrdeleteresult", lrdeleteresult);
  }

  alltypecompconsolelog("linkedrecordsdataarray", linkedrecordsdataarray);

  let searchcolumnrecordsdataarray = await getrelatedsearchcolumnrecorddata({
    tablename: tablename,
    tabledatalist: tabledatalistOld,
    tablemetadata: tablemetadata,
    tablecolumnmetadatalist: tablecolumnmetadatalist,
  });

  if (
    modifytype &&
    modifytype !== "" &&
    modifytype !== "insert" &&
    searchcolumnrecordsdataarray &&
    searchcolumnrecordsdataarray.length > 0
  ) {
    let srdeleteresult = await deletetabledatainDatabase({
      tablename: "searchcolumnrecorddata",
      tabledatalist: searchcolumnrecordsdataarray,
    });
    alltypecompconsolelog("srdeleteresult", srdeleteresult);
  }

  alltypecompconsolelog(
    "searchcolumnrecordsdataarray",
    searchcolumnrecordsdataarray
  );

  let hashtaggedcolumnrecordsdataarray =
    await getrelatedhashtaggedcolumnrecorddata({
      tablename: tablename,
      tabledatalist: tabledatalistOld,
      tablemetadata: tablemetadata,
      tablecolumnmetadatalist: tablecolumnmetadatalist,
    });

  if (
    modifytype &&
    modifytype !== "" &&
    modifytype !== "insert" &&
    hashtaggedcolumnrecordsdataarray &&
    hashtaggedcolumnrecordsdataarray.length > 0
  ) {
    let srdeleteresult = await deletetabledatainDatabase({
      tablename: "hashtaggedcolumnrecorddata",
      tabledatalist: hashtaggedcolumnrecordsdataarray,
    });
    alltypecompconsolelog("srdeleteresult", srdeleteresult);
  }

  alltypecompconsolelog(
    "hashtaggedcolumnrecordsdataarray",
    hashtaggedcolumnrecordsdataarray
  );

  // let valuerangetrackingcolumnrecorddataarray = await getrelatedvaluerangetrackingcolumnrecorddata({
  //     tablename: tablename,
  //     tabledatalist: tabledatalistOld,
  //     tablemetadata: tablemetadata,
  //     tablecolumnmetadatalist: tablecolumnmetadatalist,

  // });

  // if (modifytype && modifytype !== "" && modifytype !== "insert" &&
  //     valuerangetrackingcolumnrecorddataarray && valuerangetrackingcolumnrecorddataarray.length > 0) {

  //     let srdeleteresult = await deletetabledatainDatabase({
  //         tablename: "valuerangetrackingcolumnrecorddata",
  //         tabledatalist: valuerangetrackingcolumnrecorddataarray,

  //     });
  //     alltypecompconsolelog("srdeleteresult", srdeleteresult);

  // }

  // alltypecompconsolelog("valuerangetrackingcolumnrecorddataarray", valuerangetrackingcolumnrecorddataarray);

  if (
    modifytype &&
    modifytype !== "" &&
    modifytype !== "insert" &&
    tabledatalistOld &&
    tabledatalistOld.length > 0
  ) {
    let getrelatedvaluenumbertrackingcolumnrecorddataresult =
      await beforemodifyvaluenumbertrackingcolumnrecorddata({
        tablename: tablename,
        tabledatalist: tabledatalistOld,
        tablemetadata: tablemetadata,
        tablecolumnmetadatalist: tablecolumnmetadatalist,
      });

    alltypecompconsolelog(
      "getrelatedvaluenumbertrackingcolumnrecorddataresult",
      getrelatedvaluenumbertrackingcolumnrecorddataresult
    );
  }

  let accessrecordsdataarray = await getrelatedaccessrecorddata({
    tablename: tablename,
    tabledatalist: tabledatalistOld,
    tablemetadata: tablemetadata,
  });

  if (
    modifytype &&
    modifytype !== "" &&
    modifytype !== "insert" &&
    accessrecordsdataarray &&
    accessrecordsdataarray.length > 0
  ) {
    let ardeleteresult = await deletetabledatainDatabase({
      tablename: "accessrecorddata",
      tabledatalist: accessrecordsdataarray,
    });
    alltypecompconsolelog("ardeleteresult", ardeleteresult);
  }

  alltypecompconsolelog("accessrecordsdataarray", accessrecordsdataarray);

  alltypecompconsolelog("premodifydatabaseHandler-exit", result);
  return result;
};

const postmodifydatabaseHandler = async (methodpropss) => {
  let methodprops = JSON.parse(JSON.stringify(methodpropss));
  alltypecompconsolelog("postmodifydatabaseHandler-entry", methodprops);
  let result = { issuccess: "true", message: "" };

  let { tablename, tabledatalist, tablemetadata, tablecolumnmetadatalist } =
    methodprops;

  let linkedrecordsdataarray = await getrelatedlinkedcolumnrecorddata({
    tablename: tablename,
    tabledatalist: tabledatalist,
    tablemetadata: tablemetadata,
    tablecolumnmetadatalist: tablecolumnmetadatalist,
  });

  if (linkedrecordsdataarray && linkedrecordsdataarray.length > 0) {
    let lrinsertresult = await inserttabledatainDatabase({
      tablename: "linkedcolumnrecorddata",
      tabledatalist: linkedrecordsdataarray,
    });
    alltypecompconsolelog("lrinsertresult", lrinsertresult);
  }

  alltypecompconsolelog("linkedrecordsdataarray", linkedrecordsdataarray);

  let searchcolumnrecordsdataarray = await getrelatedsearchcolumnrecorddata({
    tablename: tablename,
    tabledatalist: tabledatalist,
    tablemetadata: tablemetadata,
    tablecolumnmetadatalist: tablecolumnmetadatalist,
  });

  if (searchcolumnrecordsdataarray && searchcolumnrecordsdataarray.length > 0) {
    let srinsertresult = await inserttabledatainDatabase({
      tablename: "searchcolumnrecorddata",
      tabledatalist: searchcolumnrecordsdataarray,
    });
    alltypecompconsolelog("srinsertresult", srinsertresult);
  }

  alltypecompconsolelog(
    "searchcolumnrecordsdataarray",
    searchcolumnrecordsdataarray
  );

  let hashtaggedcolumnrecordsdataarray =
    await getrelatedhashtaggedcolumnrecorddata({
      tablename: tablename,
      tabledatalist: tabledatalist,
      tablemetadata: tablemetadata,
      tablecolumnmetadatalist: tablecolumnmetadatalist,
    });

  if (
    hashtaggedcolumnrecordsdataarray &&
    hashtaggedcolumnrecordsdataarray.length > 0
  ) {
    let srinsertresult = await inserttabledatainDatabase({
      tablename: "hashtaggedcolumnrecorddata",
      tabledatalist: hashtaggedcolumnrecordsdataarray,
    });
    alltypecompconsolelog("srinsertresult", srinsertresult);
  }

  alltypecompconsolelog(
    "hashtaggedcolumnrecordsdataarray",
    hashtaggedcolumnrecordsdataarray
  );

  // let valuerangetrackingcolumnrecorddataarray = await getrelatedvaluerangetrackingcolumnrecorddata({
  //     tablename: tablename,
  //     tabledatalist: tabledatalist,
  //     tablemetadata: tablemetadata,
  //     tablecolumnmetadatalist: tablecolumnmetadatalist,

  // });

  // if (
  //     valuerangetrackingcolumnrecorddataarray && valuerangetrackingcolumnrecorddataarray.length > 0) {

  //     let srdeleteresult = await inserttabledatainDatabase({
  //         tablename: "valuerangetrackingcolumnrecorddata",
  //         tabledatalist: valuerangetrackingcolumnrecorddataarray,

  //     });
  //     alltypecompconsolelog("srdeleteresult", srdeleteresult);

  // }

  // alltypecompconsolelog("valuerangetrackingcolumnrecorddataarray", valuerangetrackingcolumnrecorddataarray);

  let getrelatedvaluenumbertrackingcolumnrecorddataresult =
    await aftermodifyvaluenumbertrackingcolumnrecorddata({
      tablename: tablename,
      tabledatalist: tabledatalist,
      tablemetadata: tablemetadata,
      tablecolumnmetadatalist: tablecolumnmetadatalist,
    });

  alltypecompconsolelog(
    "getrelatedvaluenumbertrackingcolumnrecorddataresult",
    getrelatedvaluenumbertrackingcolumnrecorddataresult
  );

  let accessrecordsdataarray = await getrelatedaccessrecorddata({
    tablename: tablename,
    tabledatalist: tabledatalist,
    tablemetadata: tablemetadata,
  });

  if (accessrecordsdataarray && accessrecordsdataarray.length > 0) {
    let srinsertresult = await inserttabledatainDatabase({
      tablename: "accessrecorddata",
      tabledatalist: accessrecordsdataarray,
    });
    alltypecompconsolelog("srinsertresult", srinsertresult);
  }

  alltypecompconsolelog("accessrecordsdataarray", accessrecordsdataarray);

  alltypecompconsolelog("postmodifydatabaseHandler-exit", result);
  return result;
};

const alltypecompClickHandler = async (methodpropss) => {
  alltypecompconsolelog("alltypecompClickHandler-entry");

  let methodprops = JSON.parse(JSON.stringify(methodpropss));
  alltypecompconsolelog(methodprops);
  methodprops.result = { issuccess: "true", message: "", tabledatalist: [] };

  let {
    sectioncolumnmetadata,
    sitestatedata,
    templateareaitemstatedata,
    alltypecompstatedata,
    parentalltypecompstatedata,
  } = methodprops;
  let lstobjindex = templateareaitemstatedata.lstobjindex;

  if (methodprops.isfromalltypecomppopup === "true") {
    sectioncolumnmetadata = methodprops.popupmethodprops.sectioncolumnmetadata;
    templateareaitemstatedata =
      methodprops.popupmethodprops.templateareaitemstatedata;
    lstobjindex = methodprops.popupmethodprops.lstobjindex;
  }

  let oldurldata = {};
  let newurldata = {};
  if (sitestatedata.oldurldata !== undefined) {
    oldurldata = JSON.parse(JSON.stringify(sitestatedata.oldurldata));
  }
  if (sitestatedata.urldata !== undefined) {
    newurldata = JSON.parse(JSON.stringify(sitestatedata.urldata));
  }

  if (sectioncolumnmetadata.onclick.type === "showalert") {
    //    alert(sectioncolumnmetadata.onclick);
  }

  if (sectioncolumnmetadata.onclick.type === "openpopup") {
    //   alert(sectioncolumnmetadata.onclick);
  }

  if (sectioncolumnmetadata.onclick.type === "openselect") {
    //  alert(sectioncolumnmetadata.onclick.props.title);
  }

  if (
    sectioncolumnmetadata.onclick.type === "modifydatabase" ||
    sectioncolumnmetadata.onclick.type === "modifydatabaseandrefreshui" ||
    sectioncolumnmetadata.onclick.type === "modifydatabaseandrefreshallui" ||
    sectioncolumnmetadata.onclick.type === "modifydatabaseandrefreshparentui" ||
    sectioncolumnmetadata.onclick.type === "modifydatabaseandredirect"
  ) {
    let modifydatabasedata = [];
    if (sectioncolumnmetadata.onclick.modifydatabasedata.length > 0) {
      modifydatabasedata = sectioncolumnmetadata.onclick.modifydatabasedata;
    }
    for (let i = 0; i < modifydatabasedata.length; i++) {
      let {
        initialassignmentarraytype,
        initialassignmentarraysubtype,
        assigncolumnsdata,
        deletewithquerybeginswith,
      } = modifydatabasedata[i];

      // tablename
      let modifydatabasetype = modifydatabasedata[i].type;
      let replactexttablename = "";

      replactexttablename = replacedynamictext({
        replacetext: modifydatabasedata[i].tablename,
        sitestatedata: sitestatedata,
        templateareaitemstatedata: templateareaitemstatedata,
        parentalltypecompstatedata: parentalltypecompstatedata,
        tabledata: {},
        lstobjindex: lstobjindex,
      });

      deletewithquerybeginswith = replacedynamictext({
        replacetext: modifydatabasedata[i].deletewithquerybeginswith,
        sitestatedata: sitestatedata,
        templateareaitemstatedata: templateareaitemstatedata,
        parentalltypecompstatedata: parentalltypecompstatedata,
        tabledata: {},
        lstobjindex: lstobjindex,
      });
      alltypecompconsolelog("replactexttablename", replactexttablename);
      alltypecompconsolelog(
        "deletewithquerybeginswith",
        deletewithquerybeginswith
      );

      let initialassignmentarraysubtypeobjlistbeforeassigncolumns = [];

      // initial object assignment
      let initialassignmentarraytypeobj = {};
      let initialassignmentarraysubtypeobj = { data: {} };
      let initialassignmentarraysubtypeobjOld = { data: {} };
      let initialassignmentarraysubtypeobjlistOld = [];
      if (initialassignmentarraytype === "sitestatedata") {
        initialassignmentarraytypeobj = sitestatedata;
      }
      if (initialassignmentarraytype === "templateareaitemstatedata") {
        initialassignmentarraytypeobj = templateareaitemstatedata;
      }
      if (
        initialassignmentarraysubtype &&
        initialassignmentarraysubtype !== "" &&
        initialassignmentarraytypeobj &&
        Object.keys(initialassignmentarraytypeobj).length > 0
      ) {
        initialassignmentarraysubtypeobj =
          initialassignmentarraytypeobj[initialassignmentarraysubtype];
        initialassignmentarraysubtypeobjOld = JSON.parse(
          JSON.stringify(
            initialassignmentarraytypeobj[initialassignmentarraysubtype]
          )
        );
        if (
          initialassignmentarraysubtype === "uirepeatrecorddata" &&
          lstobjindex !== undefined &&
          templateareaitemstatedata.onchangedata[lstobjindex] &&
          Object.keys(templateareaitemstatedata.onchangedata[lstobjindex])
            .length > 0
        ) {
          for (let i in templateareaitemstatedata.onchangedata[lstobjindex]) {
            if (i === "orgname" || i === "id") {
              initialassignmentarraysubtypeobj[i] =
                templateareaitemstatedata.onchangedata[lstobjindex][i];
            } else {
              if (initialassignmentarraysubtypeobj.data === undefined) {
                initialassignmentarraysubtypeobj.data = {};
              }
              initialassignmentarraysubtypeobj.data[i] =
                templateareaitemstatedata.onchangedata[lstobjindex][i];
            }
          }
        }
      }
      alltypecompconsolelog(
        "initialassignmentarraysubtypeobj",
        initialassignmentarraysubtypeobj
      );

      // upsert use case

      if (
        modifydatabasedata[i].type === "upsert" &&
        initialassignmentarraysubtypeobj &&
        Object.keys(initialassignmentarraysubtypeobj).length > 0 &&
        (initialassignmentarraysubtypeobj.id === undefined ||
          initialassignmentarraysubtypeobj.id === "")
      ) {
        modifydatabasetype = "insert";
      }

      if (
        modifydatabasedata[i].type === "upsert" &&
        initialassignmentarraysubtypeobj &&
        Object.keys(initialassignmentarraysubtypeobj).length > 0 &&
        initialassignmentarraysubtypeobj.id !== undefined &&
        initialassignmentarraysubtypeobj.id !== ""
      ) {
        modifydatabasetype = "update";
      }
      alltypecompconsolelog("modifydatabasetype", modifydatabasetype);

      initialassignmentarraysubtypeobjlistbeforeassigncolumns.push(
        initialassignmentarraysubtypeobj
      );
      initialassignmentarraysubtypeobjlistOld.push(
        initialassignmentarraysubtypeobjOld
      );
      alltypecompconsolelog(
        "initialassignmentarraysubtypeobjlistbeforeassigncolumns",
        initialassignmentarraysubtypeobjlistbeforeassigncolumns
      );

      // assign columns data
      let initialassignmentarraysubtypeobjlist = [];

      if (
        initialassignmentarraysubtypeobjlistbeforeassigncolumns &&
        Object.keys(initialassignmentarraysubtypeobjlistbeforeassigncolumns)
          .length > 0
      ) {
        for (
          let ai = 0;
          ai < initialassignmentarraysubtypeobjlistbeforeassigncolumns.length;
          ai++
        ) {
          let initialassignmentarraysubtypeobjai =
            initialassignmentarraysubtypeobjlistbeforeassigncolumns[ai];
          if (assigncolumnsdata && Object.keys(assigncolumnsdata).length > 0) {
            for (let i in assigncolumnsdata) {
              let keytext = i;
              let valuetext = assigncolumnsdata[i].tovalue;

              if (keytext && keytext !== "" && valuetext && valuetext !== "") {
                valuetext = replacedynamictext({
                  replacetext: valuetext,
                  sitestatedata: sitestatedata,
                  templateareaitemstatedata: templateareaitemstatedata,
                  parentalltypecompstatedata: parentalltypecompstatedata,
                  tabledata: {},
                  lstobjindex: lstobjindex,
                });

                if (keytext === "orgname" || keytext === "id") {
                  initialassignmentarraysubtypeobjai[keytext] = valuetext;
                } else {
                  initialassignmentarraysubtypeobjai.data[keytext] = valuetext;
                }
              }
            }
          }
          alltypecompconsolelog(
            "initialassignmentarraysubtypeobjai",
            initialassignmentarraysubtypeobjai
          );

          initialassignmentarraysubtypeobjlist.push(
            initialassignmentarraysubtypeobjai
          );
        }
      }
      alltypecompconsolelog(
        "initialassignmentarraysubtypeobjlist",
        initialassignmentarraysubtypeobjlist
      );

      let deletewithqueryrecords = [];
      if (
        modifydatabasetype === "deletewithquery" &&
        deletewithquerybeginswith
      ) {
        let deletewithqueryparams = {
          tablename: replactexttablename,
          id: deletewithquerybeginswith,
          idoperator: "beginswith",
          orgname: sitestatedata.orgdata.data.orgname,
        };
        alltypecompconsolelog("deletewithqueryparams", deletewithqueryparams);
        deletewithqueryrecords = await gettabledatafromDatabase(
          deletewithqueryparams
        );
        initialassignmentarraysubtypeobjlist = deletewithqueryrecords;
        modifydatabasetype = "delete";
      }
      alltypecompconsolelog("deletewithqueryrecords", deletewithqueryrecords);
      alltypecompconsolelog(
        "initialassignmentarraysubtypeobjlist",
        initialassignmentarraysubtypeobjlist
      );

      let ispremodifyrequired = true;
      let ispostmodifyrequired = true;
      let isprepostmodifyrequired = true;
      if (
        replactexttablename === "tablemetadata" ||
        replactexttablename === "tablecolumnmetadata" ||
        replactexttablename === "tablebuttonmetadata" ||
        replactexttablename === "tablevalidationmetadata" ||
        replactexttablename === "tablelayoutmetadata" ||
        replactexttablename === "tablequerymetadata" ||
        replactexttablename === "rolemetadata" ||
        replactexttablename === "dbuser" ||
        replactexttablename === "favouriteuiconfigs" ||
        replactexttablename === "linkedcolumnrecorddata" ||
        replactexttablename === "searchcolumnrecorddata" ||
        replactexttablename === "hashtaggedcolumnrecorddata" ||
        replactexttablename === "valuerangetrackingcolumnrecorddata" ||
        replactexttablename === "valuenumbertrackingcolumnrecorddata" ||
        replactexttablename === "accessrecorddata" ||
        replactexttablename === "activityrecorddata" ||
        replactexttablename === "sitemetadata" ||
        replactexttablename === "siteversionmetadata" ||
        replactexttablename === "siteversionpagemetadata" ||
        replactexttablename === "vendorsitemetadata" ||
        replactexttablename === "vendorsiteversionmetadata" ||
        replactexttablename === "vendorsiteversionpagemetadata"
      ) {
        ispremodifyrequired = false;
        ispostmodifyrequired = false;
        isprepostmodifyrequired = false;
      }

      if (modifydatabasetype === "insert") {
        ispremodifyrequired = false;
      }
      if (modifydatabasetype === "delete") {
        ispostmodifyrequired = false;
      }

      alltypecompconsolelog("ispremodifyrequired", ispremodifyrequired);
      alltypecompconsolelog("ispostmodifyrequired", ispostmodifyrequired);

      // tablemetadata
      let tablemetadata = {};
      if (isprepostmodifyrequired === true) {
        let tablemetadataparams = {
          tablename: "tablemetadata",
          id: "tb-",
          idoperator: "beginswith",
          orgname: sitestatedata.orgdata.data.orgname,
        };

        let tablemetadatalist = await gettabledatafromDatabase(
          tablemetadataparams
        );
        if (tablemetadatalist && tablemetadatalist.length > 0) {
          for (let tb = 0; tb < tablemetadatalist.length; tb++) {
            if (tablemetadatalist[tb].data.name === replactexttablename) {
              tablemetadata = tablemetadatalist[tb];
            }
          }
        }
      }
      alltypecompconsolelog("tablemetadata", tablemetadata);

      //tablecolumnmetadata
      let tablecolumnmetadatalist = [];
      if (isprepostmodifyrequired === true) {
        let tablecolumnmetadataparams = {
          tablename: "tablecolumnmetadata",
          id: "tc-" + tablemetadata.data.name,
          idoperator: "beginswith",
          orgname: sitestatedata.orgdata.data.orgname,
        };

        tablecolumnmetadatalist = await gettabledatafromDatabase(
          tablecolumnmetadataparams
        );
      }
      alltypecompconsolelog("tablecolumnmetadatalist", tablecolumnmetadatalist);

      //tablevalidationmetadata
      let tablevalidationmetadatalist = [];
      if (isprepostmodifyrequired === true) {
        let tablevalidationmetadataparams = {
          tablename: "tablevalidationmetadata",
          id: "tv-" + tablemetadata.data.name,
          idoperator: "beginswith",
          orgname: sitestatedata.orgdata.data.orgname,
        };

        tablevalidationmetadatalist = await gettabledatafromDatabase(
          tablevalidationmetadataparams
        );
      }
      alltypecompconsolelog(
        "tablevalidationmetadatalist",
        tablevalidationmetadatalist
      );

      //updatestandardcolumns
      let tabledatalistmodifiedlist = await updatestandardcolumndata({
        modifytype: modifydatabasetype,
        tablename: replactexttablename,
        tabledatalist: initialassignmentarraysubtypeobjlist,
        tabledatalistOld: initialassignmentarraysubtypeobjlistOld,
        sitestatedata: sitestatedata,

        tablemetadata: tablemetadata,
        templateareaitemstatedata: templateareaitemstatedata,
      });
      initialassignmentarraysubtypeobjlist = tabledatalistmodifiedlist;
      alltypecompconsolelog(
        "initialassignmentarraysubtypeobjlist",
        initialassignmentarraysubtypeobjlist
      );

      // validate columndata
      let validateresult = await validatecolumndata({
        tabledatalist: initialassignmentarraysubtypeobjlist,
        tabledatalistOld: initialassignmentarraysubtypeobjlistOld,
        sitestatedata: sitestatedata,
        tablevalidationmetadatalist: tablevalidationmetadatalist,
      });
      if (validateresult.issuccess === "false") {
        methodprops.result.issuccess = "false";
        methodprops.result.message = validateresult.message;
      }

      alltypecompconsolelog("validateresult", validateresult);
      alltypecompconsolelog("methodprops", methodprops);

      // premodifydatabaseresult
      let premodifydatabaseresult = { issuccess: "true", message: "" };
      if (
        methodprops.result.issuccess === "true" &&
        ispremodifyrequired === true
      ) {
        premodifydatabaseresult = await premodifydatabaseHandler({
          modifytype: modifydatabasetype,
          tablename: replactexttablename,
          tabledatalist: initialassignmentarraysubtypeobjlist,
          tabledatalistOld: initialassignmentarraysubtypeobjlistOld,
          tablemetadata: tablemetadata,
          tablecolumnmetadatalist: tablecolumnmetadatalist,
          tablevalidationmetadatalist: tablevalidationmetadatalist,
          sitestatedata: sitestatedata,
        });
      }
      alltypecompconsolelog("premodifydatabaseresult", premodifydatabaseresult);

      if (premodifydatabaseresult.issuccess !== "true") {
        methodprops.result.issuccess = "false";
        methodprops.result.message = premodifydatabaseresult.message;
      }
      alltypecompconsolelog("methodprops", methodprops);
      alltypecompconsolelog(
        "initialassignmentarraysubtypeobjlist",
        initialassignmentarraysubtypeobjlist
      );
      alltypecompconsolelog("modifydatabasetype", modifydatabasetype);

      // modify
      let insertresult;
      if (
        methodprops.result.issuccess === "true" &&
        initialassignmentarraysubtypeobjlist &&
        initialassignmentarraysubtypeobjlist.length > 0 &&
        modifydatabasetype === "insert"
      ) {
        insertresult = await inserttabledatainDatabase({
          tablename: replactexttablename,
          tabledatalist: initialassignmentarraysubtypeobjlist,
        });

        methodprops.result.tabledatalist = insertresult.tabledatalist;

        if (insertresult.issuccess !== "true") {
          methodprops.result.issuccess = "false";
          methodprops.result.message = insertresult.message;
        }
      }
      alltypecompconsolelog("insertresult", insertresult);

      let updateresult;
      if (
        methodprops.result.issuccess === "true" &&
        initialassignmentarraysubtypeobjlist &&
        initialassignmentarraysubtypeobjlist.length > 0 &&
        modifydatabasetype === "update"
      ) {
        updateresult = await updatetabledatainDatabase({
          tablename: replactexttablename,
          tabledatalist: initialassignmentarraysubtypeobjlist,
        });
        methodprops.result.tabledatalist = updateresult.tabledatalist;
        if (updateresult.issuccess !== "true") {
          methodprops.result.issuccess = "false";
          methodprops.result.message = updateresult.message;
        }
      }
      alltypecompconsolelog("updateresult", updateresult);

      let deleteresult;
      if (
        methodprops.result.issuccess === "true" &&
        initialassignmentarraysubtypeobjlist &&
        initialassignmentarraysubtypeobjlist.length > 0 &&
        modifydatabasetype === "delete"
      ) {
        deleteresult = await deletetabledatainDatabase({
          tablename: replactexttablename,
          tabledatalist: initialassignmentarraysubtypeobjlist,
        });
        methodprops.result.tabledatalist = deleteresult.tabledatalist;
        if (deleteresult.issuccess !== "true") {
          methodprops.result.issuccess = "false";
          methodprops.result.message = deleteresult.message;
        }
      }

      alltypecompconsolelog("deleteresult", deleteresult);

      alltypecompconsolelog("methodprops", methodprops);

      // post modify
      let postmodifydatabaseresult = {};
      if (
        ispostmodifyrequired === true &&
        methodprops.result.issuccess === "true" &&
        modifydatabasetype !== "delete"
      ) {
        postmodifydatabaseresult = await postmodifydatabaseHandler({
          tablename: replactexttablename,
          tabledatalist: methodprops.result.tabledatalist,
          tablemetadata: tablemetadata,
          tablecolumnmetadatalist: tablecolumnmetadatalist,

          modifytype: modifydatabasetype,
        });
        if (postmodifydatabaseresult.issuccess !== "true") {
          methodprops.result.issuccess = "false";
          methodprops.result.message = postmodifydatabaseresult.message;
        }
      }
      alltypecompconsolelog(
        "postmodifydatabaseresult",
        postmodifydatabaseresult
      );

      let activityrecordsdataarray;
      if (methodprops.result.issuccess === "true") {
        activityrecordsdataarray = await getcreatingactivityrecorddata({
          tablename: replactexttablename,
          tabledatalist: methodprops.result.tabledatalist,
          modifytype: modifydatabasetype,
        });
      }
      alltypecompconsolelog(
        "activityrecordsdataarray",
        activityrecordsdataarray
      );

      let activityinsertresult;
      if (
        methodprops.result.issuccess === "true" &&
        activityrecordsdataarray &&
        activityrecordsdataarray.length > 0
      ) {
        activityinsertresult = await inserttabledatainDatabase({
          tablename: "activityrecorddata",
          tabledatalist: activityrecordsdataarray,
        });
      }
      alltypecompconsolelog("activityinsertresult", activityinsertresult);
    }
  }

  if (
    sectioncolumnmetadata.onclick.type === "updatesitestatedata" ||
    sectioncolumnmetadata.onclick.type === "updatesitestatedataandrefreshui"
  ) {
    let { updatestatedata } = sectioncolumnmetadata.onclick;

    if (updatestatedata && Object.keys(updatestatedata).length > 0) {
      for (let i in updatestatedata) {
        let keytext = i;
        let valuetext = updatestatedata[i].tovalue;

        if (keytext !== "") {
          valuetext = replacedynamictext({
            replacetext: valuetext,
            sitestatedata: sitestatedata,
            templateareaitemstatedata: templateareaitemstatedata,
            parentalltypecompstatedata: parentalltypecompstatedata,
            tabledata: {},
            lstobjindex: lstobjindex,
          });

          sitestatedata.onclickdata[keytext] = valuetext;
          alltypecompconsolelog("sitestatedata", sitestatedata);
        }
      }
    }
  }

  if (
    sectioncolumnmetadata.onclick.type === "updatebrowserlocalstoragedata" ||
    sectioncolumnmetadata.onclick.type ===
      "updatebrowserlocalstoragedataandrefreshallui"
  ) {
    let { updatestatedata } = sectioncolumnmetadata.onclick;

    if (updatestatedata && Object.keys(updatestatedata).length > 0) {
      let localstoragedata = {};
      for (let i in updatestatedata) {
        let keytext = i;
        let valuetext = updatestatedata[i].tovalue;

        if (keytext !== "") {
          valuetext = replacedynamictext({
            replacetext: valuetext,
            sitestatedata: sitestatedata,
            templateareaitemstatedata: templateareaitemstatedata,
            parentalltypecompstatedata: parentalltypecompstatedata,
            tabledata: {},
            lstobjindex: lstobjindex,
          });

          localstoragedata[keytext] = valuetext;
        }
      }

      alltypecompconsolelog("localstoragedata", localstoragedata);
      await setbrowserLocalstorage({
        value: localstoragedata,
      });

      methodprops.result.issuccess = "true";
      methodprops.result.message = "";
    }
  }
  if (
    sectioncolumnmetadata.onclick.type === "resetbrowserlocalstoragedata" ||
    sectioncolumnmetadata.onclick.type ===
      "resetbrowserlocalstoragedataandrefreshallui"
  ) {
    await resetbrowserLocalstorage({});
    methodprops.result.issuccess = "true";
    methodprops.result.message = "";

    alltypecompconsolelog("resetbrowserLocalstorage", methodprops);
  }

  if (
    sectioncolumnmetadata.onclick.type === "updatetemplateareaitemstatedata" ||
    sectioncolumnmetadata.onclick.type ===
      "updatetemplateareaitemstatedataandrefreshui"
  ) {
    let { updatestatedata } = sectioncolumnmetadata.onclick;

    if (updatestatedata && Object.keys(updatestatedata).length > 0) {
      for (let i in updatestatedata) {
        let keytext = i;
        let valuetext = updatestatedata[i].tovalue;

        if (keytext !== "") {
          valuetext = replacedynamictext({
            replacetext: valuetext,
            sitestatedata: sitestatedata,
            templateareaitemstatedata: templateareaitemstatedata,
            parentalltypecompstatedata: parentalltypecompstatedata,
            tabledata: {},
            lstobjindex: lstobjindex,
          });

          if (
            lstobjindex !== undefined &&
            templateareaitemstatedata.onclickdata[lstobjindex]
          ) {
            templateareaitemstatedata.onclickdata[lstobjindex] = {};
            templateareaitemstatedata.onclickdata[lstobjindex][keytext] =
              valuetext;
          } else {
            templateareaitemstatedata.onclickdata[lstobjindex][keytext] =
              valuetext;
          }

          alltypecompconsolelog(
            "templateareaitemstatedata",
            templateareaitemstatedata
          );
        }
      }
    }
  }

  if (
    sectioncolumnmetadata.onclick.type ===
    "updatealltypecompstatedataandopenpopup"
  ) {
    let { updatestatedata } = sectioncolumnmetadata.onclick;

    if (updatestatedata && Object.keys(updatestatedata).length > 0) {
      for (let i in updatestatedata) {
        let keytext = i;
        let valuetext = updatestatedata[i].tovalue;

        if (keytext !== "") {
          valuetext = replacedynamictext({
            replacetext: valuetext,
            sitestatedata: sitestatedata,
            templateareaitemstatedata: templateareaitemstatedata,
            parentalltypecompstatedata: parentalltypecompstatedata,
            tabledata: {},

            lstobjindex: lstobjindex,
          });

          alltypecompstatedata[keytext] = valuetext;
          alltypecompconsolelog("alltypecompstatedata", alltypecompstatedata);
        }
      }
    }
  }

  if (
    sectioncolumnmetadata.onclick.type === "redirect" ||
    sectioncolumnmetadata.onclick.type === "modifydatabaseandredirect"
  ) {
    if (
      sectioncolumnmetadata.onclick.redirecttopage !== "" &&
      sectioncolumnmetadata.onclick.redirecttopage !== undefined
    ) {
      alltypecompconsolelog(
        "sectioncolumnmetadata",
        JSON.parse(JSON.stringify(sectioncolumnmetadata))
      );

      if (sectioncolumnmetadata.onclick.redirecttopage === "back") {
        sitestatedata.urldata = oldurldata;
        sitestatedata.oldurldata = {};
        alltypecompconsolelog("sitestatedata", sitestatedata);
      } else {
        sitestatedata.oldurldata = newurldata;

        sitestatedata.urldata.tabname =
          sectioncolumnmetadata.onclick.redirecttopage;

        sitestatedata.urldata.tabname = replacedynamictext({
          replacetext: sectioncolumnmetadata.onclick.redirecttopage,
          sitestatedata: sitestatedata,
          templateareaitemstatedata: templateareaitemstatedata,
          parentalltypecompstatedata: parentalltypecompstatedata,
          tabledata: {},
          lstobjindex: lstobjindex,
        });

        sitestatedata.urldata.sitename =
          sectioncolumnmetadata.onclick.redirecttositename;

        sitestatedata.urldata.sitename = replacedynamictext({
          replacetext: sectioncolumnmetadata.onclick.redirecttositename,
          sitestatedata: sitestatedata,
          templateareaitemstatedata: templateareaitemstatedata,
          parentalltypecompstatedata: parentalltypecompstatedata,
          tabledata: {},
          lstobjindex: lstobjindex,
        });

        sitestatedata.urldata.sitetablename =
          sectioncolumnmetadata.onclick.redirecttositetablename;

        sitestatedata.urldata.sitetablename = replacedynamictext({
          replacetext: sectioncolumnmetadata.onclick.redirecttositetablename,
          sitestatedata: sitestatedata,
          templateareaitemstatedata: templateareaitemstatedata,
          parentalltypecompstatedata: parentalltypecompstatedata,
          tabledata: {},
          lstobjindex: lstobjindex,
        });

        alltypecompconsolelog("sitestatedata", sitestatedata);
      }
    }
    if (
      sectioncolumnmetadata.onclick.redirecttourl !== "" &&
      sectioncolumnmetadata.onclick.redirecttourl !== undefined
    ) {
      sitestatedata.urldata.url = sectioncolumnmetadata.onclick.redirecttourl;

      sitestatedata.urldata.url = replacedynamictext({
        replacetext: sectioncolumnmetadata.onclick.redirecttourl,
        sitestatedata: sitestatedata,
        templateareaitemstatedata: templateareaitemstatedata,
        parentalltypecompstatedata: parentalltypecompstatedata,
        tabledata: {},
        lstobjindex: lstobjindex,
      });

      alltypecompconsolelog("sitestatedata", sitestatedata);
    }

    if (
      sectioncolumnmetadata.onclick.redirecttosearchdatastring !== "" &&
      sectioncolumnmetadata.onclick.redirecttosearchdatastring !== undefined
    ) {
      let redirecttosearchdataparams = {};
      let redirecttosearchdatastring = replacedynamictext({
        replacetext: sectioncolumnmetadata.onclick.redirecttosearchdatastring,
        sitestatedata: sitestatedata,
        templateareaitemstatedata: templateareaitemstatedata,
        parentalltypecompstatedata: parentalltypecompstatedata,
        tabledata: {},
        lstobjindex: lstobjindex,
      });
      if (redirecttosearchdatastring.includes("&")) {
        let redirecttosearchdataafterandsplit =
          redirecttosearchdatastring.split("&");
        if (redirecttosearchdataafterandsplit.length > 0) {
          for (let i = 0; i < redirecttosearchdataafterandsplit.length; i++) {
            let redirecttosearchdataafterequalsplit =
              redirecttosearchdataafterandsplit[i].split("=");
            if (redirecttosearchdataafterequalsplit.length > 0) {
              redirecttosearchdataparams[
                redirecttosearchdataafterequalsplit[0]
              ] = redirecttosearchdataafterequalsplit[1];
            }
          }
        }
      } else {
        let redirecttosearchdataafterequalsplit =
          redirecttosearchdatastring.split("=");
        if (redirecttosearchdataafterequalsplit.length > 0) {
          redirecttosearchdataparams[redirecttosearchdataafterequalsplit[0]] =
            redirecttosearchdataafterequalsplit[1];
        }
      }
      sitestatedata.urldata.urlsearchdataparams = redirecttosearchdataparams;
      alltypecompconsolelog(
        "redirecttosearchdataparams",
        redirecttosearchdataparams
      );
    }
    if (
      sectioncolumnmetadata.onclick.redirecttohashdatastring !== "" &&
      sectioncolumnmetadata.onclick.redirecttohashdatastring !== undefined
    ) {
      let redirecttohashdataparams = {};
      let redirecttohashdatastring = replacedynamictext({
        replacetext: sectioncolumnmetadata.onclick.redirecttohashdatastring,
        sitestatedata: sitestatedata,
        templateareaitemstatedata: templateareaitemstatedata,
        parentalltypecompstatedata: parentalltypecompstatedata,
        tabledata: {},
        lstobjindex: lstobjindex,
      });
      if (redirecttohashdatastring.includes("&")) {
        let redirecttohashdataafterandsplit =
          redirecttohashdatastring.split("&");
        if (redirecttohashdataafterandsplit.length > 0) {
          for (let i = 0; i < redirecttohashdataafterandsplit.length; i++) {
            let redirecttohashdataafterequalsplit =
              redirecttohashdataafterandsplit[i].split("=");
            if (redirecttohashdataafterequalsplit.length > 0) {
              redirecttohashdataparams[redirecttohashdataafterequalsplit[0]] =
                redirecttohashdataafterequalsplit[1];
            }
          }
        }
      } else {
        let redirecttohashdataafterequalsplit =
          redirecttohashdatastring.split("=");
        if (redirecttohashdataafterequalsplit.length > 0) {
          redirecttohashdataparams[redirecttohashdataafterequalsplit[0]] =
            redirecttohashdataafterequalsplit[1];
        }
      }
      sitestatedata.urldata.urlhashdataparams = redirecttohashdataparams;
      // alltypecompconsolelog("urlhashdataparams", urlhashdataparams);
    }
  }

  alltypecompconsolelog("alltypecompClickHandler-exit");
  alltypecompconsolelog(methodprops);

  return methodprops;
};

const onbeforeafterLoadHandler = async (methodpropss) => {
  alltypecompconsolelog("onbeforeafterLoadHandler-entry");

  let methodprops = JSON.parse(JSON.stringify(methodpropss));
  alltypecompconsolelog(methodprops);
  methodprops.result = { issuccess: "true", message: "", tabledatalist: [] };

  let { siteversionpagetemplatedata, sitestatedata } = methodprops;
  let beforeafterloadmetadata = {};
  if (
    siteversionpagetemplatedata &&
    siteversionpagetemplatedata.data &&
    siteversionpagetemplatedata.data.metadata
  ) {
    beforeafterloadmetadata = siteversionpagetemplatedata.data.metadata;
  }

  let oldurldata = {};
  let newurldata = {};
  if (sitestatedata.oldurldata !== undefined) {
    oldurldata = JSON.parse(JSON.stringify(sitestatedata.oldurldata));
  }
  if (sitestatedata.urldata !== undefined) {
    newurldata = JSON.parse(JSON.stringify(sitestatedata.urldata));
  }

  let checkifconditionreplacetext = replacedynamictext({
    replacetext: beforeafterloadmetadata.onbeforeafterload
      ? beforeafterloadmetadata.onbeforeafterload.checkifconditionreplacetext
      : "",
    sitestatedata: sitestatedata,
    templateareaitemstatedata: {},
    parentalltypecompstatedata: {},
    tabledata: {},
    lstobjindex: "",
  });

  let checkifalertreplacetext = replacedynamictext({
    replacetext: beforeafterloadmetadata.onbeforeafterload
      ? beforeafterloadmetadata.onbeforeafterload.checkifalertreplacetext
      : "",
    sitestatedata: sitestatedata,
    templateareaitemstatedata: {},
    parentalltypecompstatedata: {},
    tabledata: {},
    lstobjindex: "",
  });

  alltypecompconsolelog(
    "checkifconditionreplacetext",
    checkifconditionreplacetext
  );
  alltypecompconsolelog("checkifalertreplacetext", checkifalertreplacetext);

  if (
    checkifconditionreplacetext === "true" &&
    beforeafterloadmetadata.onbeforeafterload.type === "checkifandshowalert"
  ) {
    methodprops.result.checkifconditionreplacetext = "true";
    methodprops.result.checkifalertreplacetext = checkifalertreplacetext;
    methodprops.result.showpopup = "false";
    methodprops.result.redirect = "false";
  } else if (
    checkifconditionreplacetext === "true" &&
    beforeafterloadmetadata.onbeforeafterload.type === "checkifandshowpopup"
  ) {
    methodprops.result.checkifconditionreplacetext = "true";
    methodprops.result.checkifalertreplacetext = "";
    methodprops.result.showpopup = "true";
    methodprops.result.redirect = "false";
  } else if (
    checkifconditionreplacetext === "true" &&
    beforeafterloadmetadata.onbeforeafterload.type === "checkifandredirect"
  ) {
    methodprops.result.checkifconditionreplacetext = "true";
    methodprops.result.checkifalertreplacetext = "";
    methodprops.result.showpopup = "false";
    methodprops.result.redirect = "true";

    if (
      beforeafterloadmetadata.onbeforeafterload.redirecttopage !== "" &&
      beforeafterloadmetadata.onbeforeafterload.redirecttopage !== undefined
    ) {
      alltypecompconsolelog(
        "beforeafterloadmetadata",
        JSON.parse(JSON.stringify(beforeafterloadmetadata))
      );

      if (beforeafterloadmetadata.onbeforeafterload.redirecttopage === "back") {
        sitestatedata.urldata = oldurldata;
        sitestatedata.oldurldata = {};
        alltypecompconsolelog("sitestatedata", sitestatedata);
      } else {
        sitestatedata.oldurldata = newurldata;

        sitestatedata.urldata.tabname =
          beforeafterloadmetadata.onbeforeafterload.redirecttopage;

        sitestatedata.urldata.tabname = replacedynamictext({
          replacetext: beforeafterloadmetadata.onbeforeafterload.redirecttopage,
          sitestatedata: sitestatedata,
          templateareaitemstatedata: {},
          parentalltypecompstatedata: {},
          tabledata: {},
          lstobjindex: "",
        });

        sitestatedata.urldata.sitename =
          beforeafterloadmetadata.onbeforeafterload.redirecttositename;

        sitestatedata.urldata.sitename = replacedynamictext({
          replacetext:
            beforeafterloadmetadata.onbeforeafterload.redirecttositename,
          sitestatedata: sitestatedata,
          templateareaitemstatedata: {},
          parentalltypecompstatedata: {},
          tabledata: {},
          lstobjindex: "",
        });

        sitestatedata.urldata.sitetablename =
          beforeafterloadmetadata.onbeforeafterload.redirecttositetablename;

        sitestatedata.urldata.sitetablename = replacedynamictext({
          replacetext:
            beforeafterloadmetadata.onbeforeafterload.redirecttositetablename,
          sitestatedata: sitestatedata,
          templateareaitemstatedata: {},
          parentalltypecompstatedata: {},
          tabledata: {},
          lstobjindex: "",
        });

        alltypecompconsolelog("sitestatedata", sitestatedata);
      }
    }
    if (
      beforeafterloadmetadata.onbeforeafterload.redirecttourl !== "" &&
      beforeafterloadmetadata.onbeforeafterload.redirecttourl !== undefined
    ) {
      sitestatedata.urldata.url =
        beforeafterloadmetadata.onbeforeafterload.redirecttourl;

      sitestatedata.urldata.url = replacedynamictext({
        replacetext: beforeafterloadmetadata.onbeforeafterload.redirecttourl,
        sitestatedata: sitestatedata,
        templateareaitemstatedata: {},
        parentalltypecompstatedata: {},
        tabledata: {},
        lstobjindex: "",
      });

      alltypecompconsolelog("sitestatedata", sitestatedata);
    }

    if (
      beforeafterloadmetadata.onbeforeafterload.redirecttosearchdatastring !==
        "" &&
      beforeafterloadmetadata.onbeforeafterload.redirecttosearchdatastring !==
        undefined
    ) {
      let redirecttosearchdataparams = {};
      let redirecttosearchdatastring = replacedynamictext({
        replacetext:
          beforeafterloadmetadata.onbeforeafterload.redirecttosearchdatastring,
        sitestatedata: sitestatedata,
        templateareaitemstatedata: {},
        parentalltypecompstatedata: {},
        tabledata: {},
        lstobjindex: "",
      });
      if (redirecttosearchdatastring.includes("&")) {
        let redirecttosearchdataafterandsplit =
          redirecttosearchdatastring.split("&");
        if (redirecttosearchdataafterandsplit.length > 0) {
          for (let i = 0; i < redirecttosearchdataafterandsplit.length; i++) {
            let redirecttosearchdataafterequalsplit =
              redirecttosearchdataafterandsplit[i].split("=");
            if (redirecttosearchdataafterequalsplit.length > 0) {
              redirecttosearchdataparams[
                redirecttosearchdataafterequalsplit[0]
              ] = redirecttosearchdataafterequalsplit[1];
            }
          }
        }
      } else {
        let redirecttosearchdataafterequalsplit =
          redirecttosearchdatastring.split("=");
        if (redirecttosearchdataafterequalsplit.length > 0) {
          redirecttosearchdataparams[redirecttosearchdataafterequalsplit[0]] =
            redirecttosearchdataafterequalsplit[1];
        }
      }
      sitestatedata.urldata.urlsearchdataparams = redirecttosearchdataparams;
      alltypecompconsolelog(
        "redirecttosearchdataparams",
        redirecttosearchdataparams
      );
    }
    if (
      beforeafterloadmetadata.onbeforeafterload.redirecttohashdatastring !==
        "" &&
      beforeafterloadmetadata.onbeforeafterload.redirecttohashdatastring !==
        undefined
    ) {
      let redirecttohashdataparams = {};
      let redirecttohashdatastring = replacedynamictext({
        replacetext:
          beforeafterloadmetadata.onbeforeafterload.redirecttohashdatastring,
        sitestatedata: sitestatedata,
        templateareaitemstatedata: {},
        parentalltypecompstatedata: {},
        tabledata: {},
        lstobjindex: "",
      });
      if (redirecttohashdatastring.includes("&")) {
        let redirecttohashdataafterandsplit =
          redirecttohashdatastring.split("&");
        if (redirecttohashdataafterandsplit.length > 0) {
          for (let i = 0; i < redirecttohashdataafterandsplit.length; i++) {
            let redirecttohashdataafterequalsplit =
              redirecttohashdataafterandsplit[i].split("=");
            if (redirecttohashdataafterequalsplit.length > 0) {
              redirecttohashdataparams[redirecttohashdataafterequalsplit[0]] =
                redirecttohashdataafterequalsplit[1];
            }
          }
        }
      } else {
        let redirecttohashdataafterequalsplit =
          redirecttohashdatastring.split("=");
        if (redirecttohashdataafterequalsplit.length > 0) {
          redirecttohashdataparams[redirecttohashdataafterequalsplit[0]] =
            redirecttohashdataafterequalsplit[1];
        }
      }
      sitestatedata.urldata.urlhashdataparams = redirecttohashdataparams;
      // alltypecompconsolelog("urlhashdataparams", urlhashdataparams);
    }
  } else if (checkifconditionreplacetext !== "true") {
    methodprops.result.checkifconditionreplacetext = "false";
    methodprops.result.checkifalertreplacetext = "";
    methodprops.result.showpopup = "false";
    methodprops.result.redirect = "false";
  }

  alltypecompconsolelog("onbeforeafterLoadHandler-exit");
  alltypecompconsolelog(methodprops);

  return methodprops;
};

// const alltypecompScrollafterHandler = async (methodpropss) => {};

const alltypecompChangeHandler = async (methodprops) => {
  alltypecompconsolelog("alltypecompChangeHandler-entry");
  alltypecompconsolelog(methodprops);

  let {
    sectioncolumnmetadata,
    sitestatedata,
    templateareaitemstatedata,
    lstobjindex,
  } = methodprops;
  let changedvalue = methodprops.value;

  if (methodprops.isfromalltypecomppopup === "true") {
    sectioncolumnmetadata = methodprops.popupmethodprops.sectioncolumnmetadata;
    templateareaitemstatedata =
      methodprops.popupmethodprops.templateareaitemstatedata;
    lstobjindex = methodprops.popupmethodprops.lstobjindex;
    changedvalue = methodprops.popupmethodprops.changedvalue;
  }

  if (
    sectioncolumnmetadata.onchange.type === "updatesitestatedata" ||
    sectioncolumnmetadata.onchange.type === "updatesitestatedataandrefreshui"
  ) {
    let { updatestatedata } = sectioncolumnmetadata.onchange;
    if (updatestatedata && Object.keys(updatestatedata).length > 0) {
      for (let i in updatestatedata) {
        let keytext = i;
        let valuetext = updatestatedata[i].tovalue;
        alltypecompconsolelog(keytext);
        alltypecompconsolelog(valuetext);
        if (keytext !== "") {
          sitestatedata.onchangedata[keytext] = changedvalue;
        }
      }
    }
  } else if (
    sectioncolumnmetadata.onchange.type === "updatebrowserlocalstoragedata" ||
    sectioncolumnmetadata.onchange.type ===
      "updatebrowserlocalstoragedataandrefreshallui"
  ) {
    let { updatestatedata } = sectioncolumnmetadata.onchange;
    if (updatestatedata && Object.keys(updatestatedata).length > 0) {
      let localstoragedata = {};
      for (let i in updatestatedata) {
        let keytext = i;
        let valuetext = updatestatedata[i].tovalue;
        alltypecompconsolelog(keytext);
        alltypecompconsolelog(valuetext);
        if (keytext !== "") {
          localstoragedata[keytext] = changedvalue;
        }
      }
      alltypecompconsolelog(localstoragedata);
    }
  } else if (
    sectioncolumnmetadata.onchange.type === "resetbrowserlocalstoragedata" ||
    sectioncolumnmetadata.onchange.type ===
      "resetbrowserlocalstoragedataandrefreshallui"
  ) {
    await resetbrowserLocalstorage({});
  } else if (
    sectioncolumnmetadata.onchange.type === "updatetemplateareaitemstatedata" ||
    sectioncolumnmetadata.onchange.type ===
      "updatetemplateareaitemstatedataandrefreshui"
  ) {
    let { updatestatedata } = sectioncolumnmetadata.onchange;
    if (updatestatedata && Object.keys(updatestatedata).length > 0) {
      for (let i in updatestatedata) {
        let keytext = i;
        let valuetext = updatestatedata[i].tovalue;
        alltypecompconsolelog(keytext);
        alltypecompconsolelog(valuetext);
        if (keytext !== "") {
          alltypecompconsolelog(
            templateareaitemstatedata.onchangedata[lstobjindex]
          );

          if (
            methodprops.valuesubtypename &&
            methodprops.valuesubtypename !== ""
          ) {
            if (
              lstobjindex !== undefined &&
              templateareaitemstatedata.onchangedata[lstobjindex] === undefined
            ) {
              templateareaitemstatedata.onchangedata[lstobjindex] = {};
            }
            let changedvaluewithsubtype =
              templateareaitemstatedata.onchangedata[lstobjindex][keytext];
            if (
              changedvaluewithsubtype &&
              Object.keys(changedvaluewithsubtype).length > 0
            ) {
              changedvaluewithsubtype[methodprops.valuesubtypename] =
                changedvalue;
            } else {
              changedvaluewithsubtype = {};
              changedvaluewithsubtype[methodprops.valuesubtypename] =
                changedvalue;
            }
            templateareaitemstatedata.onchangedata[lstobjindex][keytext] =
              changedvaluewithsubtype;
          } else {
            if (
              lstobjindex !== undefined &&
              templateareaitemstatedata.onchangedata[lstobjindex] === undefined
            ) {
              templateareaitemstatedata.onchangedata[lstobjindex] = {};
            }
            templateareaitemstatedata.onchangedata[lstobjindex][keytext] =
              changedvalue;
          }
        }
      }
    }
  }

  alltypecompconsolelog("alltypecompChangeHandler-exit");
  alltypecompconsolelog(methodprops);
  return methodprops;
};

////////////////////////
