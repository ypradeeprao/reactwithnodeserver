/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  alltypecompconsolelog,
  gettabledatafromDatabase, alltypecompChangeHandler, alltypecompClickHandler,

  getbrowserLocalstorage,
  browserlocalstoragedata,
  urldata,
  devicedata,
  orgdata,
  signedinuserdata,
  dbuserdata,
  dbuserprofiledata,
  haspageaccessmetadata
} from "./logic";
// import {
//   templatearealistmetadataInit
// } from "./constants";

// import { Templatearealistcomp } from "./templatearea";
const { useState, useEffect, createRef } = React;


export function Sitecomp(props) {
  const [compstate, setCompstate] = useState({
    showui: false,
    modetype: "buildicon",

    sitestatedata: {},
  });

  useEffect(() => {
    alltypecompconsolelog("sitecomp-useeffect");

    handleInit();
    //  fetchAllsiteversionpageDatafromDB();
  }, []);

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

  async function handleInit(methodprops) {
    alltypecompconsolelog("sitecomp-handleInit");
    alltypecompconsolelog(methodprops);
    let sitestatedata = {};
    sitestatedata.onchangedata = {};
    sitestatedata.onclickdata = {};

    // previous sitestate
    if (
      methodprops &&
      methodprops.sitestatedata &&
      Object.keys(methodprops.sitestatedata).length > 0
    ) {
      sitestatedata = methodprops.sitestatedata;
    }

    // browserlocalstorage
    sitestatedata.browserlocalstoragedata = browserlocalstoragedata();

    // url paramaters
  
    sitestatedata.urldata = urldata();
    sitestatedata.devicedata = devicedata();
    if (
      methodprops &&
      methodprops.oldurldata &&
      Object.keys(methodprops.oldurldata).length > 0
    ) {
      sitestatedata.oldurldata = methodprops.oldurldata;
    }
  
  

   
  
   




    
   
    sitestatedata.orgdata = await orgdata();
    sitestatedata.signedindbuserdata = await signedinuserdata();
    sitestatedata.dbuserdata = await dbuserdata();
    sitestatedata.dbuserprofiledata = await dbuserprofiledata();
    let haspageaccessmetadatajs = await haspageaccessmetadata();

    if(haspageaccessmetadatajs){
    
    }
    else{
    await showui({
      ...methodprops,
    
      sitestatedata: sitestatedata,
    });
  }





  }

  


  // let handleClick = async (methodprops) => {
  //   alltypecompconsolelog("sitecomp-handleClick");
  //   alltypecompconsolelog(methodprops);

  //   let { type, order } = methodprops;
  //   let { draggable } = props;
  //   let { siteversionpagetemplatedata } = compstate;

  //   if (type === "backtohome") {
  //     await hideui({});
  //     await handleInit({
  //       // tabname: "home",
  //     });
  //   }
  // };

  // let fromchildhandleClick = async (methodprops) => {
  //   alltypecompconsolelog("sitecomp-fromchildhandleClick");
  //   alltypecompconsolelog(methodprops);
  //   let { type, order, sectioncolumnmetadata } = methodprops;
  //   let { sitestatedata } = compstate;

  //   if (type === "executeonsiteparent") {
  //     if (methodprops.isupdatesitestatedata === true) {
  //       sitestatedata = methodprops.sitestatedata;
  //     }
  //     if (methodprops.isrefreshsiteparent === true) {
  //       await hideui({});
  //       await handleInit({
  //         sitestatedata: sitestatedata,
  //       });
  //     }
  //     if (methodprops.isredirect === true) {
  //       await hideui({});
  //       await handleInit({
  //         url: methodprops.sitestatedata.urldata.url,
  //         tabname: methodprops.sitestatedata.urldata.tabname,
  //         sitename: methodprops.sitestatedata.urldata.sitename,
  //         sitetablename: methodprops.sitestatedata.urldata.sitetablename,
  //         urlsearchdataparams:
  //           methodprops.sitestatedata.urldata.urlsearchdataparams,
  //         urlhashdataparams:
  //           methodprops.sitestatedata.urldata.urlhashdataparams,
  //         oldurldata: methodprops.sitestatedata.oldurldata,
  //       });
  //     }
  //   } else if (type === "executeclickfromsectioncolumn") {
  //     if (
  //       sectioncolumnmetadata &&
  //       sectioncolumnmetadata.onclick &&
  //       (sectioncolumnmetadata.onclick.type === "modifydatabase" ||
  //         sectioncolumnmetadata.onclick.type === "modifydatabaseandrefreshui" ||
  //         sectioncolumnmetadata.onclick.type ===
  //         "modifydatabaseandrefreshparentui" ||
  //         sectioncolumnmetadata.onclick.type === "redirect" ||
  //         sectioncolumnmetadata.onclick.type === "updatesitestatedata" ||
  //         sectioncolumnmetadata.onclick.type ===
  //         "updatesitestatedataandrefreshui" ||
  //         sectioncolumnmetadata.onclick.type ===
  //         "updatebrowserlocalstoragedata" ||
  //         sectioncolumnmetadata.onclick.type ===
  //         "updatebrowserlocalstoragedataandrefreshallui" ||
  //         sectioncolumnmetadata.onclick.type ===
  //         "resetbrowserlocalstoragedata" ||
  //         sectioncolumnmetadata.onclick.type ===
  //         "resetbrowserlocalstoragedataandrefreshallui" ||
  //         sectioncolumnmetadata.onclick.type ===
  //         "modifydatabaseandrefreshallui" ||
  //         sectioncolumnmetadata.onclick.type === "modifydatabaseandredirect")
  //     ) {
  //       let clickhandlerresult = await alltypecompClickHandler({
  //         ...methodprops,
  //         sitestatedata: sitestatedata,
  //       });
  //       if (
  //         sectioncolumnmetadata.onclick.type === "redirect" ||
  //         sectioncolumnmetadata.onclick.type === "modifydatabaseandredirect"
  //       ) {
  //         await hideui({});
  //         await handleInit({
  //           url: clickhandlerresult.sitestatedata.urldata.url,
  //           tabname: clickhandlerresult.sitestatedata.urldata.tabname,
  //           sitename: clickhandlerresult.sitestatedata.urldata.sitename,
  //           sitetablename:
  //             clickhandlerresult.sitestatedata.urldata.sitetablename,
  //           urlsearchdataparams:
  //             clickhandlerresult.sitestatedata.urldata.urlsearchdataparams,
  //           urlhashdataparams:
  //             clickhandlerresult.sitestatedata.urldata.urlhashdataparams,
  //           oldurldata: clickhandlerresult.sitestatedata.oldurldata,
  //         });
  //       } else {
  //         await hideui({});
  //         await handleInit({});
  //       }
  //     }
  //   }
  // };

  // let fromchildhandleChange = async (methodprops) => {
  //   alltypecompconsolelog("sitecomp-fromchildhandleChange");
  //   alltypecompconsolelog(methodprops);
  //   let { sitestatedata } = compstate;
  //   let { sectioncolumnmetadata, type } = methodprops;

  //   if (
  //     (type === "executechangefromtemplatearea" ||
  //       type === "executechangefromsectioncolumn" ||
  //       type === "executeonsiteparent") &&
  //     sectioncolumnmetadata &&
  //     sectioncolumnmetadata.onchange &&
  //     (sectioncolumnmetadata.onchange.type === "updatesitestatedata" ||
  //       sectioncolumnmetadata.onchange.type ===
  //       "updatesitestatedataandrefreshui")
  //   ) {
  //     let changehandlerresult = await alltypecompChangeHandler({
  //       ...methodprops,
  //       sitestatedata: sitestatedata,
  //     });
  //     sitestatedata = changehandlerresult.sitestatedata;
  //     if (
  //       sectioncolumnmetadata.onchange.type === "updatesitestatedataandrefreshui"
  //     ) {
  //       await hideui({});
  //       await showui({ sitestatedata: sitestatedata });
  //     }
  //   }

  //   alltypecompconsolelog(sitestatedata);
  // };

   return null;

  // if (compstate.showui !== true) {
  //   return <></>;
  // } else {
  //   let elementHtml = [];
  //   let elementbuildiconsHtml = [];
  //   let { modetype, sitestatedata } = compstate;
  //   alltypecompconsolelog("sitecomp-render");
  //   alltypecompconsolelog(compstate);

  //   if (modetype === "buildicon") {
  //     elementbuildiconsHtml.push(
  //       <>
  //         <div onClick={(props) => handleClick({ type: "backtohome" })}>
  //           back
  //         </div>
  //       </>
  //     );
  //   }

  //   if (sitestatedata.currentsiteversionpagemetadataid) {
  //     elementHtml.push(
  //       <>
  //         <Templatearealistcomp
  //           isparentalltypecomp="false"
  //           sitestatedata={sitestatedata}
  //           modetype={modetype}
  //           siteversionpagemetadataid={
  //             sitestatedata.currentsiteversionpagemetadatatablenamebeginswith ===
  //               "stvp-"
  //               ? sitestatedata.currentsiteversionpagemetadataid
  //               : ""
  //           }
  //           vendorsiteversionpagemetadataid={
  //             sitestatedata.currentsiteversionpagemetadatatablenamebeginswith ===
  //               "vstvp-"
  //               ? sitestatedata.currentsiteversionpagemetadataid
  //               : ""
  //           }
  //           sitetemplatemetadataid=""
  //           parenthandleClick={fromchildhandleClick}
  //           parenthandleChange={fromchildhandleChange}
  //         />
  //       </>
  //     );
  //   }

  //   return (
  //     <>
  //       {elementbuildiconsHtml}
  //       {elementHtml}
  //     </>
  //   );
  // }
}