/* =========================================================================================
File:     					core_en.js
Author:   					Federico Levis
Last Modification:  Apr 2016   
Description: use this JS for core Label in English 

DISCLAIMER
Copyright by Federico Levis http://federicolevis.wix.com/cognos Cognos Tips & Solutions
All rights reserved: UNAUTHORIZED COPYING, REPRODUCTION, REPUBLISHING, UPLOADING, POSTING, TRANSMITTING OR DUPLICATING IS PROHIBITED
This copy is provided To ENEL S.P.A to be used without restriction only inside its Cognos project
========================================================================================= */


//-------------------------------------------- VALIDATE
var VALIDATE_MSG={
	cantBeBlank:"can't be blank",
	wrongLen: "is the wrong length (should be %{count} characters)",
	tooShort: "is too short (minimum is %{count} characters)",
	tooLong: "is too long (maximum is %{count} characters)",
	notNumber: "is not a number",
	mustBeInteger: "must be an integer",
	mustBeType:     "must be %{type} %{count}",
	mustBeOdd:  "must be odd",
	mustBeEven:  "must be even",
	validDate: "must be a valid date",
	notEarlierThanDate:   "must be no earlier than %{date}",
	notLaterThanDate:  "must be no later than %{date}",
	isInvalid: "is invalid",
	valueRestricted: "^%{value} is restricted", 
	notValidMail:  "is not a valid email",
	notValidUrl: "is not a valid url",
	notEmptyString: "The attribute must be a non empty string",
	notEqualToAttribute: "is not equal to %{attribute}"	
};


//----------------------------- LOADING_DIV
var LOADING_DIV_MSG={
	cancelBtn: "Cancel",	
  working: "<b>Working</b></BR>Please Wait...",
  startTime: "Start Time: ",
  elapsed: " - Elapsed: <b>",
  sec: " sec</b>"
  	
};  	

//----------------------------------------- TOOLTIP
var TIP_BTN_CLOSE = "Close";
var TIP_BTN_CLOSE_TITLE = "Click or ESC to Close the Tooltip";
var TIP_DEF_JS_TITLE = "JS Source Code";


//----------------------------------------- SORT
//---------------- HINT
//Sort
var SORT_HINT_ASC="Click to Sort Descending Z..A";
var SORT_HINT_DESC="Click to Sort Ascending A..Z";
var SORT_HINT_GLOBAL_ASC="Click to Sort Descending Z..A\nWARNING: it can be Slow because Report will be re-executed";
var SORT_HINT_GLOBAL_DESC="Click to Sort Ascending A..Z\nWARNING: it can be Slow because Report will be re-executed";
var SORT_HINT_DISABLED="Sort is disabled because NOT ALL the Records are currently displayed";
var SORT_HINT_REC_NUM_ALL="Table has XXX Records";
var SORT_HINT_REC_NUM_PART="ONLY XXX Records of the Tables are displayed in this page and there are other pages";


//----------------------------- POPUP
// Default Title of the jsPopup, when Title is Not passed
var POPUP_DEF_TITLE = {
  INFO:  "INFORMATION",
  WARN : "WARNING",
  ERR : "ERROR",
  ALARM : "ALARM",
  QUESTION : "QUESTION",
  PROMPT : "PROMPT",
  CONFIRM : "CONFIRMATION",
  CHOICE : "CHOICE"
};  

var POPUP_BTN_LABEL ={
  CONFIRM: "OK",
  QUESTION_CONFIRM: "YES",
  QUESTION_NO: "NO",
  QUESTION_CANCEL:"CANCEL"
};  

var POPUP_SELECT_ALL = "Select All";
var POPUP_DESELECT_ALL = "Deselect All";

var POPUP_PROMPT_TIP ={
  STRING : "Insert a Text",
  NUMBER : "Insert a Number",
  STRING_RANGE : "Insert a Text with a number of Characters in Range ",
  NUMBER_RANGE : "Insert a Number in Range "
};

//---------------- ERROR

var ERR_FILTER_SETTINGS = "Please Check Filter Settings: with current values the query cannot be executed";
var ERR_NUMBER_FIELD = "Please insert a number";
var ERR_DATE_FMT = "INVALID DATE FORMAT.\n\nPlease insert a date in Format ";
var ERR_DATE_FMT_EX = "For example Current Date = ";
var ERR_DATE_START_GREATER_END = "Please insert Start Time <= End Time";
var ERR_AUTOREFRESH_SETTINGS = "Auto-refresh not supported. Is supported only Entry/Hourly Resolutions";

//---- e.g "You have selected 523 items in PLMN Filter\nThe maximum number of selectable items in this Filter is 200\nnIf you deselect all, no filter will be applied for PLMN and all PLMNs will be included in the query"
var ERR_FILTER_MAX_ITEM_1 = "You have selected ";
var ERR_FILTER_MAX_ITEM_2 = " items in ";
var ERR_FILTER_MAX_ITEM_3 = " Filter\nPlease Select a Number of Items in Range [";

var ERR_FILTER_MAX_ITEM_4 = "\n\nIf you deselect all, no filter will be applied for ";
var ERR_FILTER_MAX_ITEM_5 = "\nand all ";
var ERR_FILTER_MAX_ITEM_6 = " will be included in the query.";


// --- TIP
var TIP_HIDE_CONFIRM = "With current Settings HIDDEN KPI Columns are:";

