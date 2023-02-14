/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  alltypecompconsolelog, dragdropHandler, sortArray,
  gettabledatafromDatabase, inserttabledatainDatabase,
  onbeforeafterLoadHandler, resettabledatainDatabase, updatetabledatainDatabase, updatestandardcolumndata,

} from "./logic";
import {
  iconmetadataAdd, iconmetadataEdit, iconmetadataDrag,
  iconmetadataThumsup,
  templateareaitemsectioncolumnlistdragpanelmetadataInit, templateareaitemlistmetadataInit, iconmetadataSave,
  iconmetadataBasic, iconmetadataUndo, iconmetadataRedo
} from "./constants";
import {
  Templateareaitemlistcomp, Alltypetemplateareaitemcomp,
  Draggabletemplateareaitemhtml, DraggablefavouriteuiconfigsTemplateareaitemshtml
} from "./templateareaitem";

import { Alltypecomp } from "./templateareaitemsectioncolumn";
import { Templateareaitemsectioncomp } from "./templateareaitemsection";
import { Popuphtml } from "./templateareaitemsectioncolumn";
import { Editpropscomp } from "./editpropscomp";
const { useState, useEffect, createRef } = React;

///////////









