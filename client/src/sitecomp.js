/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  alltypecompconsolelog,
  gettabledatafromDatabase, alltypecompChangeHandler, alltypecompClickHandler,

  getbrowserLocalstorage,
} from "./logic";
import {
  templatearealistmetadataInit
} from "./constants";

import { Templatearealistcomp } from "./templatearea";
const { useState, useEffect, createRef } = React;


function Sitecomp(props) {
  const [compstate, setCompstate] = useState({
    showui: false,
    modetype: "buildicon",

    sitestatedata: {},
  });

  useEffect(() => {
    alltypecompconsolelog("sitecomp-useeffect");

    fetchsitestatedatafromDB();
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

  async function fetchsitestatedatafromDB(methodprops) {
    alltypecompconsolelog("sitecomp-fetchsitestatedatafromDB");
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
    let browserlocalstoragedata = await getbrowserLocalstorage();
    sitestatedata.browserlocalstoragedata = browserlocalstoragedata;

    // url paramaters
    let totalurl = window.location.href;
    let urldata = {
      totalurl: totalurl,
      baseurl: window.location.hostname,
      domain: document.domain,
      title: document.title,
      tabname: "",
      subtabname: "",
      action: "",
      urlhashdataparams: { hash1: "hash1test" },
      urlsearchdataparams: { a: "b" },
      hash: window.location.hash,
      path: window.location.pathname,
      search: window.location.search,
    };
    if (methodprops && methodprops.url && methodprops.url !== "") {
      urldata.url = methodprops.url;
    }
    if (methodprops && methodprops.sitename && methodprops.sitename !== "") {
      urldata.sitename = methodprops.sitename;
    }

    if (
      methodprops &&
      methodprops.sitetablename &&
      methodprops.sitetablename !== ""
    ) {
      urldata.sitetablename = methodprops.sitetablename;
    }

    if (methodprops && methodprops.tabname && methodprops.tabname !== "") {
      urldata.tabname = methodprops.tabname;
    }

    if (
      methodprops &&
      methodprops.urlsearchdataparams &&
      Object.keys(methodprops.urlsearchdataparams).length > 0
    ) {
      urldata.urlsearchdataparams = methodprops.urlsearchdataparams;
    }

    if (
      methodprops &&
      methodprops.urlhashdataparams &&
      Object.keys(methodprops.urlhashdataparams).length > 0
    ) {
      urldata.urlhashdataparams = methodprops.urlhashdataparams;
    }

    sitestatedata.urldata = urldata;

    if (
      methodprops &&
      methodprops.oldurldata &&
      Object.keys(methodprops.oldurldata).length > 0
    ) {
      sitestatedata.oldurldata = methodprops.oldurldata;
    }

    // current time
    let todaydatetime = new Date();
    let currenttimeiniso = todaydatetime.toISOString();

    // device parameters
    let devicedata = {
      windowinnerwidth: window.innerWidth,
      windowinnerheight: window.innerHeight,
      screenwidth: window.screen.width,
      screenheight: window.screen.height,
      isdesktop: "true",
      istab: "false",
      isphone: "false",
      width: "small/medium/large/xlarge",
      isbrowserorapp: "true/false",
      currenttimeiniso: currenttimeiniso,
    };
    sitestatedata.devicedata = devicedata;

    let parentorgname = "cloudreed";
    let parentorgid = "org-cloudreed";
    let currentorgname = "cloudreed";
    let currentorgid = "org-cloudreed";
    let currentdbuserid = "dbu-parentsiteadmin1";
    let currentvendordbuserid = "";
    let currentsitemetadataid =
      "st-dbu-parentsiteadmin1-2022-12-01T18:11:19.879Z";
    let currentsitemetadataname = "";
    let currentsitemetadatatablename = "sitemetadata";

    let currentsiteadminprofilenamefromparentorg = "parentsiteadmin";
    let adminpagenamefromparentorg = "adminpagefromparentorg";
    let currentsitedefaultpagename = "home";

    if (urldata.sitename && urldata.sitename !== "") {
      currentsitemetadataname = urldata.sitename;
    }
    if (urldata.sitetablename && urldata.sitetablename !== "") {
      currentsitemetadatatablename = urldata.sitetablename;
    }

    sitestatedata.currentsitemetadataid = currentsitemetadataid;
    sitestatedata.currentsitemetadataname = currentsitemetadataname;
    sitestatedata.currentsitemetadatatablename = currentsitemetadatatablename;
    if (
      sitestatedata.currentsitemetadatatablename &&
      sitestatedata.currentsitemetadatatablename === "sitemetadata"
    ) {
      sitestatedata.currentsitemetadatatablenamebeginswith = "st-";
      sitestatedata.currentsiteversionmetadatatablenamebeginswith = "stv-";
      sitestatedata.currentsiteversionpagemetadatatablenamebeginswith = "stvp-";
      sitestatedata.currentsiteversionmetadatatablename = "siteversionmetadata";
      sitestatedata.currentsiteversionpagemetadatatablename =
        "siteversionpagemetadata";
    }
    if (
      sitestatedata.currentsitemetadatatablename &&
      sitestatedata.currentsitemetadatatablename === "vendorsitemetadata"
    ) {
      sitestatedata.currentsitemetadatatablenamebeginswith = "vst-";
      sitestatedata.currentsiteversionmetadatatablenamebeginswith = "vstv-";
      sitestatedata.currentsiteversionpagemetadatatablenamebeginswith =
        "vstvp-";
      sitestatedata.currentsiteversionmetadatatablename =
        "vendorsiteversionmetadata";
      sitestatedata.currentsiteversionpagemetadatatablename =
        "vendorsiteversionpagemetadata";
    }
    if (
      sitestatedata.currentsitemetadatatablename &&
      sitestatedata.currentsitemetadatatablename === "customersitemetadata"
    ) {
      sitestatedata.currentsitemetadatatablenamebeginswith = "cst-";
      sitestatedata.currentsiteversionmetadatatablenamebeginswith = "cstv-";
      sitestatedata.currentsiteversionpagemetadatatablenamebeginswith =
        "cstvp-";
      sitestatedata.currentsiteversionmetadatatablename =
        "customersiteversionmetadata";
      sitestatedata.currentsiteversionpagemetadatatablename =
        "customersiteversionpagemetadata";
    }

    sitestatedata.currentsiteadminprofilenamefromparentorg =
      currentsiteadminprofilenamefromparentorg;
    sitestatedata.currentsitedefaultpagename = currentsitedefaultpagename;
    sitestatedata.adminpagenamefromparentorg = adminpagenamefromparentorg;

    // get org info
    let parentsiterecordorgdata = await gettabledatafromDatabase({
      tablename: "parentorgmetadata",
      id: currentorgid,
      idoperator: "equalsto",
      orgname: parentorgname,
    });

    if (
      parentsiterecordorgdata === undefined ||
      parentsiterecordorgdata.length <= 0
    ) {
      alert("no org info exists in parent org");
    } else {
      sitestatedata.parentorgdata = parentsiterecordorgdata[0];
    }

    // get org info
    let siterecordorgdata = await gettabledatafromDatabase({
      tablename: "orgmetadata",
      id: currentorgid,
      idoperator: "equalsto",
      orgname: currentorgname,
    });

    if (siterecordorgdata === undefined || siterecordorgdata.length <= 0) {
      alert("no org info exists in current org");
    } else {
      sitestatedata.orgdata = siterecordorgdata[0];
    }

    // after signin

    // get dbuser
    if (sitestatedata.orgdata && sitestatedata.orgdata.data) {
      let siteloggedindbuserdataparams = {
        tablename: "dbuser",
        id: currentdbuserid,
        idoperator: "equalsto",
        orgname: sitestatedata.orgdata.data.orgname,
      };

      let siteloggedindbuserdata = await gettabledatafromDatabase(
        siteloggedindbuserdataparams
      );

      if (
        siteloggedindbuserdata === undefined ||
        siteloggedindbuserdata.length <= 0
      ) {
        alert("no dbuser exists");
      } else {
        sitestatedata.signedindbuserdata = siteloggedindbuserdata[0];
      }
    }
    alltypecompconsolelog(
      "signedindbuserdata",
      sitestatedata.signedindbuserdata
    );

    // get vendordbuser
    if (
      sitestatedata.browserlocalstoragedata &&
      sitestatedata.browserlocalstoragedata.signedindvendordbuserdataid !==
      undefined &&
      sitestatedata.browserlocalstoragedata.signedindvendordbuserdataid !== "" &&
      sitestatedata.orgdata &&
      sitestatedata.orgdata.data
    ) {
      if (sitestatedata.orgdata && sitestatedata.orgdata.data) {
        let signedinvendordbuserdataparams = {
          tablename: "vendordbuser",
          id: sitestatedata.browserlocalstoragedata.signedindvendordbuserdataid,
          idoperator: "equalsto",
          orgname: sitestatedata.orgdata.data.orgname,
        };

        let signedinvendordbuserdata = await gettabledatafromDatabase(
          signedinvendordbuserdataparams
        );

        if (
          signedinvendordbuserdata === undefined ||
          signedinvendordbuserdata.length <= 0
        ) {
          //  alert("no vendordbuser exists");
        } else {
          sitestatedata.signedinvendordbuserdata = signedinvendordbuserdata[0];
        }
      }
    }

    alltypecompconsolelog(
      "signedinvendordbuserdata",
      sitestatedata.signedinvendordbuserdata
    );

    // get dbuser profilemetadata
    if (
      sitestatedata.signedindbuserdata &&
      sitestatedata.signedindbuserdata.data
    ) {
      let siteloggedindbuserprofiledataparams = {
        tablename: "profilemetadata",
        id: sitestatedata.signedindbuserdata.data.profileid,
        idoperator: "equalsto",
        orgname: sitestatedata.orgdata.data.orgname,
      };

      let siteloggedindbuserprofilemetadata = await gettabledatafromDatabase(
        siteloggedindbuserprofiledataparams
      );

      if (
        siteloggedindbuserprofilemetadata === undefined ||
        siteloggedindbuserprofilemetadata.length <= 0
      ) {
        alert("no dbuser profile exists");
      } else {
        sitestatedata.signedindbuserprofilemetadata =
          siteloggedindbuserprofilemetadata[0];
      }
    }
    alltypecompconsolelog(
      "signedindbuserprofilemetadata",
      sitestatedata.signedindbuserprofilemetadata
    );

    // get vendor dbuser profilemetadata
    if (
      sitestatedata.signedinvendordbuserdata &&
      sitestatedata.signedinvendordbuserdata.data
    ) {
      let siteloggedinvendordbuserprofiledataparams = {
        tablename: "profilemetadata",
        id: sitestatedata.signedinvendordbuserdata.data.profileid,
        idoperator: "equalsto",
        orgname: sitestatedata.orgdata.data.orgname,
      };

      let siteloggedinvendordbuserprofilemetadata =
        await gettabledatafromDatabase(
          siteloggedinvendordbuserprofiledataparams
        );

      if (
        siteloggedinvendordbuserprofilemetadata === undefined ||
        siteloggedinvendordbuserprofilemetadata.length <= 0
      ) {
        //     alert("no vendor dbuser profile exists");
      } else {
        sitestatedata.signedinvendordbuserprofilemetadata =
          siteloggedinvendordbuserprofilemetadata[0];
      }
    }
    alltypecompconsolelog(
      "signedinvendordbuserprofilemetadata",
      sitestatedata.signedinvendordbuserprofilemetadata
    );

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

    let appaccessmetadataparams = {
      tablename: "appaccessmetadata",
      id: "aa",
      idoperator: "beginswith",
      orgname: sitestatedata.orgdata.data.orgname,
    };

    let appaccessmetadata = await gettabledatafromDatabase(
      appaccessmetadataparams
    );

    if (appaccessmetadata === undefined || appaccessmetadata.length <= 0) {
      //  alert("no appaccessmetadata exists");
    } else {
      let appaccessmetadataarray = [];
      let defaultappaccessmetadata = {};
      for (let i = 0; i < appaccessmetadata.length; i++) {
        if (
          appaccessmetadata[i].data.accessto.includes(dbuser.data.profileid)
        ) {
          appaccessmetadataarray.push(appaccessmetadata[i]);
        }
        if (
          appaccessmetadata[i].data.accessto.includes(dbuser.data.profileid) &&
          appaccessmetadata[i].data.isdefault === "true"
        ) {
          defaultappaccessmetadata = appaccessmetadata[i];
        }
      }
      sitestatedata.appaccessmetadataarray = appaccessmetadataarray;
      sitestatedata.defaultappaccessmetadata = defaultappaccessmetadata;
    }

    alltypecompconsolelog(
      "appaccessmetadataarray",
      sitestatedata.appaccessmetadataarray
    );

    let tabaccessmetadataparams = {
      tablename: "tabaccessmetadata",
      id: "aa",
      idoperator: "beginswith",
      orgname: sitestatedata.orgdata.data.orgname,
    };

    let tabaccessmetadata = await gettabledatafromDatabase(
      tabaccessmetadataparams
    );

    if (tabaccessmetadata === undefined || tabaccessmetadata.length <= 0) {
      //  alert("no tabaccessmetadata exists");
    } else {
      let tabaccessmetadataarray = [];

      for (let i = 0; i < tabaccessmetadata.length; i++) {
        if (
          tabaccessmetadata[i].data.accessto.includes(dbuser.data.profileid)
        ) {
          tabaccessmetadataarray.push(tabaccessmetadata[i]);
        }
      }
      sitestatedata.tabaccessmetadataarray = tabaccessmetadataarray;
    }

    alltypecompconsolelog(
      "tabaccessmetadataarray",
      sitestatedata.tabaccessmetadataarray
    );

    sitestatedata.templatearealistmetadatainit = templatearealistmetadataInit;
    alltypecompconsolelog("sitestatedata");
    alltypecompconsolelog(sitestatedata);
    // if (sitestatedata.signedindbuserprofilemetadata) {
    await fetchFavouriteuiconfigsDatafromDB({
      sitestatedata: sitestatedata,
    });
    //  }
  }

  async function fetchFavouriteuiconfigsDatafromDB(methodprops) {
    alltypecompconsolelog("sitecomp-fetchFavouriteuiconfigsDatafromDB");
    alltypecompconsolelog(methodprops);
    let { sitestatedata } = methodprops;
    let { orgdata } = sitestatedata;
    let favouriteuiconfigslistmetadata = await gettabledatafromDatabase({
      tablename: "favouriteuiconfigs",
      id: "fv",
      idoperator: "beginswith",
      orgname: orgdata.data.orgname,
    });
    sitestatedata.favouriteuiconfigslistmetadata =
      favouriteuiconfigslistmetadata;
    alltypecompconsolelog(favouriteuiconfigslistmetadata);
    await fetchAllsiteversionpageDatafromDB({
      ...methodprops,

      sitestatedata: sitestatedata,
    });
  }

  async function fetchAllsiteversionpageDatafromDB(methodprops) {
    alltypecompconsolelog("sitecomp-fetchAllsiteversionpageDatafromDB");
    alltypecompconsolelog(methodprops);
    let { sitestatedata } = methodprops;
    let { orgdata } = sitestatedata;

    let activesitemetadataid = "";

    if (
      sitestatedata.currentsitemetadataname &&
      sitestatedata.currentsitemetadataname !== ""
    ) {
      let allsiteversionmetadatalist = await gettabledatafromDatabase({
        tablename: sitestatedata.currentsitemetadatatablename,
        id: sitestatedata.currentsitemetadatatablenamebeginswith,
        idoperator: "beginswith",
        orgname: orgdata.data.orgname,
      });
      alltypecompconsolelog(
        "allsiteversionmetadatalist",
        allsiteversionmetadatalist
      );

      if (allsiteversionmetadatalist.length <= 0) {
      } else {
        for (let i = 0; i < allsiteversionmetadatalist.length; i++) {
          if (
            allsiteversionmetadatalist[i].data.name ===
            sitestatedata.currentsitemetadataname
          ) {
            activesitemetadataid = allsiteversionmetadatalist[i].id;
            sitestatedata.currentsitemetadataid = activesitemetadataid;
          }
        }
      }
    }

    // get active site versionmetadata
    let activesiteversionmetadataid = "";
    let allsiteversionmetadatalist = await gettabledatafromDatabase({
      tablename: sitestatedata.currentsiteversionmetadatatablename,
      id: sitestatedata.currentsiteversionmetadatatablenamebeginswith,
      idoperator: "beginswith",
      orgname: orgdata.data.orgname,
    });
    alltypecompconsolelog(
      "allsiteversionmetadatalist",
      allsiteversionmetadatalist
    );

    if (allsiteversionmetadatalist.length <= 0) {
    } else {
      for (let i = 0; i < allsiteversionmetadatalist.length; i++) {
        if (
          allsiteversionmetadatalist[i].data.isactive === "true" &&
          allsiteversionmetadatalist[i].data.parentid ===
          sitestatedata.currentsitemetadataid
        ) {
          activesiteversionmetadataid = allsiteversionmetadatalist[i].id;
          sitestatedata.currentsiteversionmetadataid =
            activesiteversionmetadataid;
        }
      }
    }

    // get active

    let modetype = "normal";
    if (
      sitestatedata.currentsiteadminprofilenamefromparentorg ===
      sitestatedata.signedindbuserprofilemetadata.data.name
    ) {
      //  modetype = "build";
      sitestatedata.currentsitedefaultpagename =
        sitestatedata.adminpagenamefromparentorg;
    }

    let homesiteversionpagetemplatedata = {};
    let currentsiteversionpagetemplatedata = {};

    if (
      activesiteversionmetadataid === undefined ||
      activesiteversionmetadataid === ""
    ) {
      alert("no active siteversion");
    } else {
      let allsiteversionpagemetadatalist = await gettabledatafromDatabase({
        tablename: sitestatedata.currentsiteversionpagemetadatatablename,
        id:
          sitestatedata.currentsiteversionpagemetadatatablenamebeginswith +
          activesiteversionmetadataid,
        idoperator: "beginswith",
        orgname: orgdata.data.orgname,
      });
      alltypecompconsolelog(
        "allsiteversionpagemetadatalist",
        allsiteversionpagemetadatalist
      );
      if (allsiteversionpagemetadatalist.length <= 0) {
      } else {
        for (let i = 0; i < allsiteversionpagemetadatalist.length; i++) {
          if (
            sitestatedata.urldata.tabname &&
            sitestatedata.urldata.tabname ===
            allsiteversionpagemetadatalist[i].data.tabname
          ) {
            currentsiteversionpagetemplatedata =
              allsiteversionpagemetadatalist[i];
          }
          if (
            allsiteversionpagemetadatalist[i].data.tabname ===
            sitestatedata.currentsitedefaultpagename
          ) {
            homesiteversionpagetemplatedata = allsiteversionpagemetadatalist[i];
          }
        }

        if (
          currentsiteversionpagetemplatedata === undefined ||
          Object.keys(currentsiteversionpagetemplatedata).length === 0
        ) {
          currentsiteversionpagetemplatedata = JSON.parse(
            JSON.stringify(homesiteversionpagetemplatedata)
          );
        }
        sitestatedata.currentsiteversionpagemetadataid =
          currentsiteversionpagetemplatedata.id;
      }
    }

    alltypecompconsolelog(
      "homesiteversionpagetemplatedata",
      homesiteversionpagetemplatedata
    );
    alltypecompconsolelog(
      "currentsiteversionpagetemplatedata",
      currentsiteversionpagetemplatedata
    );
    alltypecompconsolelog("sitestatedata", sitestatedata);

    if (
      activesiteversionmetadataid !== undefined &&
      activesiteversionmetadataid !== "" &&
      (sitestatedata.currentsiteversionpagemetadataid === undefined ||
        sitestatedata.currentsiteversionpagemetadataid === "")
    ) {
      alert("no active siteversion page");
    } else {
      await showui({
        ...methodprops,
        modetype: modetype,
        sitestatedata: sitestatedata,
      });
    }
  }

  let handleClick = async (methodprops) => {
    alltypecompconsolelog("sitecomp-handleClick");
    alltypecompconsolelog(methodprops);

    let { type, order } = methodprops;
    let { draggable } = props;
    let { siteversionpagetemplatedata } = compstate;

    if (type === "backtohome") {
      await hideui({});
      await fetchsitestatedatafromDB({
        // tabname: "home",
      });
    }
  };

  let fromchildhandleClick = async (methodprops) => {
    alltypecompconsolelog("sitecomp-fromchildhandleClick");
    alltypecompconsolelog(methodprops);
    let { type, order, sectioncolumnmetadata } = methodprops;
    let { sitestatedata } = compstate;

    if (type === "executeonsiteparent") {
      if (methodprops.isupdatesitestatedata === true) {
        sitestatedata = methodprops.sitestatedata;
      }
      if (methodprops.isrefreshsiteparent === true) {
        await hideui({});
        await fetchsitestatedatafromDB({
          sitestatedata: sitestatedata,
        });
      }
      if (methodprops.isredirect === true) {
        await hideui({});
        await fetchsitestatedatafromDB({
          url: methodprops.sitestatedata.urldata.url,
          tabname: methodprops.sitestatedata.urldata.tabname,
          sitename: methodprops.sitestatedata.urldata.sitename,
          sitetablename: methodprops.sitestatedata.urldata.sitetablename,
          urlsearchdataparams:
            methodprops.sitestatedata.urldata.urlsearchdataparams,
          urlhashdataparams:
            methodprops.sitestatedata.urldata.urlhashdataparams,
          oldurldata: methodprops.sitestatedata.oldurldata,
        });
      }
    } else if (type === "executeclickfromsectioncolumn") {
      if (
        sectioncolumnmetadata &&
        sectioncolumnmetadata.onclick &&
        (sectioncolumnmetadata.onclick.type === "modifydatabase" ||
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
          sectioncolumnmetadata.onclick.type === "modifydatabaseandredirect")
      ) {
        let clickhandlerresult = await alltypecompClickHandler({
          ...methodprops,
          sitestatedata: sitestatedata,
        });
        if (
          sectioncolumnmetadata.onclick.type === "redirect" ||
          sectioncolumnmetadata.onclick.type === "modifydatabaseandredirect"
        ) {
          await hideui({});
          await fetchsitestatedatafromDB({
            url: clickhandlerresult.sitestatedata.urldata.url,
            tabname: clickhandlerresult.sitestatedata.urldata.tabname,
            sitename: clickhandlerresult.sitestatedata.urldata.sitename,
            sitetablename:
              clickhandlerresult.sitestatedata.urldata.sitetablename,
            urlsearchdataparams:
              clickhandlerresult.sitestatedata.urldata.urlsearchdataparams,
            urlhashdataparams:
              clickhandlerresult.sitestatedata.urldata.urlhashdataparams,
            oldurldata: clickhandlerresult.sitestatedata.oldurldata,
          });
        } else {
          await hideui({});
          await fetchsitestatedatafromDB({});
        }
      }
    }
  };

  let fromchildhandleChange = async (methodprops) => {
    alltypecompconsolelog("sitecomp-fromchildhandleChange");
    alltypecompconsolelog(methodprops);
    let { sitestatedata } = compstate;
    let { sectioncolumnmetadata, type } = methodprops;

    if (
      (type === "executechangefromtemplatearea" ||
        type === "executechangefromsectioncolumn" ||
        type === "executeonsiteparent") &&
      sectioncolumnmetadata &&
      sectioncolumnmetadata.onchange &&
      (sectioncolumnmetadata.onchange.type === "updatesitestatedata" ||
        sectioncolumnmetadata.onchange.type ===
        "updatesitestatedataandrefreshui")
    ) {
      let changehandlerresult = await alltypecompChangeHandler({
        ...methodprops,
        sitestatedata: sitestatedata,
      });
      sitestatedata = changehandlerresult.sitestatedata;
      if (
        sectioncolumnmetadata.onchange.type === "updatesitestatedataandrefreshui"
      ) {
        await hideui({});
        await showui({ sitestatedata: sitestatedata });
      }
    }

    alltypecompconsolelog(sitestatedata);
  };

  if (compstate.showui !== true) {
    return <></>;
  } else {
    let elementHtml = [];
    let elementbuildiconsHtml = [];
    let { modetype, sitestatedata } = compstate;
    alltypecompconsolelog("sitecomp-render");
    alltypecompconsolelog(compstate);

    if (modetype === "buildicon") {
      elementbuildiconsHtml.push(
        <>
          <div onClick={(props) => handleClick({ type: "backtohome" })}>
            back
          </div>
        </>
      );
    }

    if (sitestatedata.currentsiteversionpagemetadataid) {
      elementHtml.push(
        <>
          <Templatearealistcomp
            isparentalltypecomp="false"
            sitestatedata={sitestatedata}
            modetype={modetype}
            siteversionpagemetadataid={
              sitestatedata.currentsiteversionpagemetadatatablenamebeginswith ===
                "stvp-"
                ? sitestatedata.currentsiteversionpagemetadataid
                : ""
            }
            vendorsiteversionpagemetadataid={
              sitestatedata.currentsiteversionpagemetadatatablenamebeginswith ===
                "vstvp-"
                ? sitestatedata.currentsiteversionpagemetadataid
                : ""
            }
            sitetemplatemetadataid=""
            parenthandleClick={fromchildhandleClick}
            parenthandleChange={fromchildhandleChange}
          />
        </>
      );
    }

    return (
      <>
        {elementbuildiconsHtml}
        {elementHtml}
      </>
    );
  }
}