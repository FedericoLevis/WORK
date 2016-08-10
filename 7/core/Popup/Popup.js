/** @fileOverview
========================================================================================= <BR/> 
<b>File:</b> 			core/Popup/Popup.js  <BR/>
<b>Author:</b>     		<a href="https://www.linkedin.com/in/federicolevis" target="_blank">Federico Levis</a> <BR/>
<b>BlockingPopup Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/BlockingPopup.html" target="_blank">JSU BlockingPopup Documentation</a> <BR/>
<b>JSU API Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html" target="_blank">JSU API Documentation</a> <BR/>
<b>Description:</b>       Blocking Popup API, designed specifically for IE (it uses <b><i>ShowModalDialog API</i></b>) <BR/>   
<b>REQUIRED:</b>          From JSU: <ul>
                            <li><b>CSS:</b> core/core.css core/Popup/Popup.css </li>
                            <li><b>JS</b> core/util.js </li>
                            <li><b>OPTIONAL JS:</b> core/jslog.js, core/dom-drag.js (required only to enable jslog)</li>
                          </ul>
<b>First Version:</b>     1.0 Feb 2014  <BR/>
<b>Current Version:</b>   3.3 Jul 2016    <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>DISCLAIMER</b>  <BR/>
Copyright by Federico Levis - <a href="https://github.com/FedericoLevis/JSU" target="_blank">JSU</a> <BR/> 
This file may be freely distributed under the MIT license.   <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>JSDoc NOTES</b>  <BR/>
In "JSU Obfuscated Version"  JS Code is not visible with JSDoc Source Link  <BR/> 
========================================================================================= <BR/> 
*/



/* ====================================================================================================
 *          CONFIGURATION
 ====================================================================================================*/
var POPUP_DEF_WIDTH = 600;  
var POPUP_DEF_CLOSE_ON_ESCAPE = true; // default: close on ESC
var POPUP_DEF_RESIZE = false; // default

//OPacity that will be set to the underline Window during Popup Dialog Display.  SET to 1.0 to SKIP this Feature
var POPUP_OPACITY = 0.5;

var POPUP_HTML="Popup.html";

// Default Number of Item to disaplay in selectChoice for Multi. It can be changed with Opt
var POPUP_DEF_MULTICHOICE_SIZE = 5;
var POPUP_MAX_HEIGHT = 800;  
// var POPUP_MIN_HEIGHT = 160;  

// ---------------------------------------- BROWSER
// ------------------- POssible configuration for the various Browser
// Always Popup
var POPUP_BROWSER_MODE_POPUP = "POPUP";   
//---------------------------------

// NOTE: For ALERT MODE, only Popup mapped to alert are supported
// Always simple JS alert
var POPUP_BROWSER_MODE_ALERT = "ALERT"; 

// ONLY Sperimental case, culd be used for Firefox
// Popup with Url Parameter for Popup with NoReturnCode: Info, Warning, Err, About, alse ALERT 
var POPUP_BROWSER_MODE_POPUP_URL = "POPUP_URL";  

//---------------- ENAMPLE/DISAMPLE POPUP in Browser: Popup for IE, Alert for Other
// var POPUP_BROWSER_MODE_IE = POPUP_BROWSER_MODE_ALERT;
var POPUP_BROWSER_IE_MODE = POPUP_BROWSER_MODE_POPUP;
var POPUP_BROWSER_FIREFOX_MODE = POPUP_BROWSER_MODE_POPUP_URL;
var POPUP_BROWSER_OTHER_MODE = POPUP_BROWSER_MODE_ALERT;


// ---------------------------------------- DEFAULT LAYOUT
// Default: Show Image (Info, Warn,..) On the Left of Message   (set false to hide)
var POPUP_DEF_SHOW_IMG = true;
//Default: Show Title Bar on The Top  (set false to hide)
var POPUP_DEF_SHOW_TITLE = true;
// Default
var POPUP_DEF_RESIZE = false;
var POPUP_DEF_PROMPT_NUMBER_W = 50;
var POPUP_DEF_PROMPT_STRING_W = 200;


 /* ====================================================================================================
 *          GLOBAL COSTANT
 ====================================================================================================*/
// 
/**
 * Popup() szPopupType par <BR/>
 * NOTE: DO NOT Change this values: they are used also to compose the img class e.g PopupInfo, PopupConfirm,..
 */
var POPUP_TYPE = {
    INFO: "Info",
    CONFIRM: "Confirm",
    ERR:"Error",
    ALARM:"Alarm",
    WARN:"Warning",
    QUESTION:"Question", // Question with YES NO
    QUESTION_3:"Question_3Btn", // Question with YES NO CANCEL
    PROMPT:"Prompt", // Prompt to insert one value
    CHOICE:"Choice" // Choice in a select
  };

/**
 * Popup() return
 */
var POPUP_BTN = {
    CLOSE: "CLOSE",    /* Close on x of Window */
    CONFIRM: "CONFIRM", /* BTN OK (YES) */
    NO: "NO", /* BTN NO */ 
    CANCEL: "CANCEL"  /* BTN CANCEL */
};

//-----------------

/**
 * Option iPromptType for POPUP_TYPE.PROMPT
 */
var PROMPT_TYPE = {
    NUMBER: "number",
    STRING: "string"
  };



 /* ====================================================================================================
 *          INTERNAL CONSTANT
 ====================================================================================================*/
var POPUP_IMG_CLASS_PREFIX = "PopupImg";  // e.g PopupImgInfo, PopupImgConfirm,..
var POPUP_TBLMSG_CLASS_PREFIX = "PopupTblMsg";  // e.g PopupTblMsgInfo, 
var POPUP_TITLE_CLASS_PREFIX = "PopupTitle";  // e.g PopupTitleInfo, 
var POPUP_DEF_HEIGHT = 200;  /* It is recalculed by DLG after Display */


//-----------
var POPUP_BROWSER_TYPE_IE = "IE";
var POPUP_BROWSER_TYPE_FIREFOX = "Firefox";
var POPUP_BROWSER_TYPE_UNKNOWN = "BrowserUnknown";

var POPUP_CHOICE_FS_MIN_WIDTH=200; // Min width to allow SelectAll DeselectAll


//navigator.appName  values
var APP_NAME_FIREFOX="Netscape";   // FIREFOX
var APP_NAME_IE="Microsoft Internet Explorer";   // IE
var APP_NAME_IE_11="Netscape";   // IE 11


/* ====================================================================================================
 *         GLOBAL VAR
 ====================================================================================================*/
var popupPathHtml = JSU_PATH_POPUP_HTML;
// Current Dlg Status
var popup_bScroll = false;



//===================================================================================
//        LOCAL FUNCTION
//===================================================================================

/*
 * MAIN Local Function. Depending on BRowser and Configuration. 
 *    See also PopupOnLoad for Main initialization Event
 *  a) showModalDialog  (e.g IE) with simple URL
 *  b) showModalDialog  (e.g Firefox) with URUQueryString
 *  c) alert
 * 
 * 
* @param szPopupType {String}  POPUP_TYPE.INFO, POPUP_TYPE.WARN, POPUP_TYPE.ERR 
* @param szMsgHtml {String}  HTML TAG are Accepted (e.g <b>, <br/>,..)   also /n is present is accepted as NewLine
* @param [objOpt]   [Object]}    Optional Object with the Option - see Popup()
* * @return {Object}  retObj 
*                           Example:
*                           {  
*                             retBtn {String} POPUP_BTN.CLOSE, POPUP_BTN.CONFIRM, POPUP_BTN.NO, POPUP_BTN.CANCEL
*                           }  
*/
function PopupDlgShow(szPopupType,szMsgHtml,objOpt){
  var Fn = "[Popup.js PopupDlgShow] ";
  
  Popup_log (Fn + "-------------------");
  var szBrowser = PopupGetBrowser();
  var szBrowserMode = PopupGetBrowserMode(szBrowser); 
  Popup_log (Fn + " szBrowser=" + szBrowser + "  szBrowserMode=" + szBrowserMode);
  if (szBrowserMode == POPUP_BROWSER_MODE_ALERT){
    return PopupShowAlert(szPopupType,szMsgHtml);
  }
  szMsgHtml =   strReplaceAll(szMsgHtml,"\n","<BR/>");
  //  Init
  var iWidth = POPUP_DEF_WIDTH;
  var iHeight = POPUP_DEF_HEIGHT;
  var szScroll = "scroll=no;";  // Default
  // Default
  var szResize = (POPUP_DEF_RESIZE) ? "resizable=yes;" : "resizable=no;";
  if ((typeof(jslog) == "function" && jslogGetLogLev() > 0)){
    szResize = "resizable=yes;";
  }
  if (objOpt != null){
    if (objOpt.iWidth != undefined && objOpt.iWidth != null && objOpt.iWidth){
      iWidth = objOpt.iWidth;
    }
    if (objOpt.bScroll != undefined && objOpt.bScroll != null && objOpt.bScroll){
      szScroll = "scroll=yes;";  
    }
    if (objOpt.bResize != undefined &&  objOpt.bResize){
      szResize = "resizable=yes;";  
    }
  }  
  var szFeatures = "dialogWidth=" + iWidth +"px; dialogHeight=" + iHeight + "px; " + szScroll + szResize + "center=yes;" ;
  //  Pass Obj with Par
  var parIn = new Object();
  parIn.szPopupType  = szPopupType;
  parIn.iHeight= iHeight;
  parIn.szMsgHtml = szMsgHtml;
  parIn.objOpt = objOpt;
  parIn.iWidth = iWidth;
  if (typeof(jslog) == "function"){
    parIn.objJslogOpt = jslogGetOpt();
  }else{
  	parIn.objJslogOpt ={iLogLev : 0};
  }
  	
  
  var url = popupPathHtml + POPUP_HTML;
  Popup_logObj ("parIn",parIn);
  // Change Opacity of Underline Window, if required
  if (POPUP_OPACITY != 1){
    var body = document.getElementsByTagName("BODY")[0];
    var iOpacity = body .style.opacity;
    Popup_log ("From iOpacity=" + iOpacity + " To " + POPUP_OPACITY);
    body.style.opacity = POPUP_OPACITY ;
  }
  //============================================== 
  if (szBrowserMode == POPUP_BROWSER_MODE_POPUP){
    Popup_log ( Fn + szBrowser + " url=" + url + " szFeatures=" + szFeatures);
    loadingShow (true); 
    parIn.elLoading = loadingGetEl(); // Loading bElement (if Present, else 0)
    var retObj = window.showModalDialog(url, parIn, szFeatures);
    if (retObj == undefined){
      // Close with x on Window
      retObj = new Object;
      retObj.retBtn   = POPUP_BTN.CLOSE;
    }
    loadingShow (false);  
  }else if (szBrowserMode == POPUP_BROWSER_MODE_POPUP_URL){
    // Pass par in teh URL
    //   - center does not work and we have to manually center at startup to avoid bad "Moving Effect" (however we cebnter the Popup after displaying it)
    //   - we need Global var to pass parameter
    var left = (window.screen.width/2)-(iWidth/2);
    var top = (window.screen.height/2)-(iHeight/2);
    // var szFeatures = "dialogWidth=" + iWidth +"px; dialogHeight=" + iHeight + "px; scroll=no; center=yes; resizable=" + szResize;
    szFeatures = "center=yes;dialogWidth=" + iWidth +"px; dialogHeight:" + iHeight + "px; dialogTop:" + top + "px; dialogLeft:" + left + "px;" +   
      "directories:no;titlebar:no;toolbar:no;location:no;status:no;menubar:no;scroll=no;resizable=" + szResize +";";
    // ------------------- 
    url = url +  obj2URIQueryString(parIn);
    Popup_log ( Fn + szBrowser + "\nurl=" + url + "\nszFeatures=" + szFeatures);
    var retObj = window.showModalDialog(url, window, szFeatures);
    if (retObj == undefined){
      // Close with x on Window
      retObj = new Object;
      retObj.retBtn   = POPUP_BTN.CLOSE;
    }
  }
  Popup_logObj ("retObj", retObj);
  // Restore original opacity
  if (POPUP_OPACITY != 1 && body != undefined){
    Popup_log ("Restore iOpacity=" + iOpacity);
    body.style.opacity = iOpacity ;
  }  
  Popup_log (Fn + "-------------------");
  return retObj;
}  


/*
 * call jslog if it is defined
 * @param msg
 */
function Popup_log(msg){
	if (typeof(jslog) == "function"){
		jslog (JSLOG_JSU, msg);
	}
	//	alert (msg);
}

/*
 * call jslogObj if it is defined
 * @param msg
 */
function Popup_logObj(msg,obj){
	if (typeof(jslogObj) == "function"){
		jslogObj (JSLOG_JSU, msg,obj);
	}
}




/*
 *  Show alert
 * 
 * 
* @param szPopupType {String}  POPUP_TYPE.INFO, POPUP_TYPE.WARN, POPUP_TYPE.ERR 
* @param szMsgHtml {String}  HTML TAG are Accepted (e.g <b>, <br/>,..)   also /n is present is accepted as NewLine
* @return {Object}  retObj 
*                           Example:
*                           {  
*                             retBtn {String} POPUP_BTN.CLOSE,POPUP_BTN.CONFIRM, POPUP_BTN.NO
*                           }  
*/
function PopupShowAlert(szPopupType,szMsgHtml){
  var Fn = "[Popup.js PopupDlgShow] ";
  var retObj = new Object();
  
  retObj.retBtn   = POPUP_BTN.CLOSE; // DEFAULT
  
  Popup_log (Fn + "-------------------");
  var szMsg =  msgHtml2Str (szMsgHtml);
  if (szPopupType == POPUP_TYPE.INFO || szPopupType == POPUP_TYPE.CONFIRM || szPopupType == POPUP_TYPE.ERR || szPopupType == POPUP_TYPE.WARN){
    alert (szMsg);       
    return null;
  }else if (szPopupType == POPUP_TYPE.QUESTION){
    if (confirm(szMsg)){
      retObj.retBtn   = POPUP_BTN.CONFIRM; 
    }else{
      retObj.retBtn   = POPUP_BTN.NO; 
    } 
  }else {
    alert ("ERROR: PopupType=" + szPopupType + " is NOT SUPPORTED with this Browser.\n\n" +
        "Message was:\n" + szMsg);
  }
  return retObj;
}  






/*
 * @returns {String}    POPUP_BROWSER_TYPE_IE, POPUP_BROWSER_TYPE_FIREFOX, POPUP_BROWSER_TYPE_OTHER
 */
function PopupGetBrowser(){
  var Fn = "[Popup.js PopupGetBrowser] ";
  
  var szAppName = navigator.appName;
  var szBrowser = POPUP_BROWSER_TYPE_UNKNOWN; 
  // if (navigator.appName == APP_NAME_FIREFOX ){
  if  (typeof InstallTrigger !== 'undefined'){
    szBrowser = POPUP_BROWSER_TYPE_FIREFOX;
  } else  if  ((navigator.appName == APP_NAME_IE) || 
      ((navigator.appName == APP_NAME_IE_11) && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))){     
    szBrowser = POPUP_BROWSER_TYPE_IE;
  }  
  Popup_log (Fn + "szBrowser=" + szBrowser + " -  navigator.appCodeName=" + navigator.appCodeName + "  navigator.appName=" + navigator.appName);
  return szBrowser;
}



/*
 * @param  szBrowser{String}    POPUP_BROWSER_TYPE_IE, POPUP_BROWSER_TYPE_FIREFOX, POPUP_BROWSER_TYPE_OTHER
 * @returns szBrowserMode{String}    POPUP_BROWSER_MODE_POPUP, POPUP_BROWSER_MODE_ALERT, POPUP_BROWSER_MODE_POPUP_URL
 */
function PopupGetBrowserMode(szBrowser){
  var Fn = "[Popup.js PopupGetBrowserMode] ";
  var szBrowserMode;
  
  if (szBrowser == POPUP_BROWSER_TYPE_IE){
    szBrowserMode = POPUP_BROWSER_IE_MODE; 
  }else if (szBrowser == POPUP_BROWSER_TYPE_FIREFOX){
    szBrowserMode = POPUP_BROWSER_FIREFOX_MODE; 
  }else{
    szBrowserMode = POPUP_BROWSER_OTHER_MODE; 
  }
  return szBrowserMode; 
}

/*
 * Init Class of Layout Objects
 * @param szPopupType {String} in  
 */
function PopupDlgClassInit(szPopupType){
  var Fn = "[Popup.js PopupDlgClassInit] ";
  Popup_log (Fn + "-------------------");

  // Get Class
  var szClassId = szPopupType;
  if (szPopupType == POPUP_TYPE.QUESTION_3){
    szClassId = POPUP_TYPE.QUESTION; // Mapped to the same Class
  }
  //---------------
  var szTitleClassName = POPUP_TITLE_CLASS_PREFIX + szClassId;
  Popup_log (Fn + "set PopupTblHea className=" + szTitleClassName);
  getElementById2("PopupTblHea").className = szTitleClassName;
  //---------------
  var szImgClassName = POPUP_IMG_CLASS_PREFIX + szClassId;
  Popup_log (Fn + "set PopupImg className=" + szImgClassName);
  getElementById2("PopupImg").className = szImgClassName;
  //---------------
  var szTblMsgClassName = POPUP_TBLMSG_CLASS_PREFIX + szClassId;
  Popup_log (Fn + "set PopupTblMsg className=" + szTblMsgClassName);
  getElementById2("PopupTblMsg").className = szTblMsgClassName;
  Popup_log (Fn + "-------------------");
}





/*
 * @param el
 * @param bShow
 */
function PopupIdIsVisible (szId){
  var Fn = "[Popup.js PopupIdIsVisible] ";
  var el = getElementById2(szId);
  if (el == null){
    return alert (Fn + "SW ERROR szId=" + szId + "   NOT FOUND");
  }
  return  el.style.display != "none";
}



/*
 * @param el
 * @param bShow
 */
function PopupElShow (el, bShow){
  if (bShow){
    // DAFARE capire
    el.style.display= "inline";
    el.style.visibility="visible";
  }else{
    el.style.display= "none";
    el.style.visibility="hidden";
  }
}  

/*
 * @param szId
 * @param bShow
 */
function PopupIdShow (szId, bShow){
  var Fn = "[Popup.js PopupIdShow] ";

  Popup_log (Fn + "szId=" + szId  + " bShow=" + bShow);
  var el = getElementById2(szId);
  if (el == null){
    return alert (Fn + "SW ERROR szId=" + szId + "   NOT FOUND");
  }
  PopupElShow (el,bShow);
}  


/*
 * Only if bShow = false we Hide szId
 * @param szId
 * @param bShow
 */
function PopupIdHideIfRequired (szId, bShow){
  if (!bShow){
    PopupIdShow (szId,bShow);
  }  
}  


/*
 * Init Btn and its Option if present
 * @param parIn {Object} in  
 */
function PopupDlgBtnInit(parIn){
  var Fn = "[Popup.js PopupDlgBtnInit] ";
  Popup_log (Fn + "-------------------");
  var elBtnConfirm = getElementById2("PopupConfirm");
  var elBtnNo= getElementById2("PopupNo");
  var elBtnCancel = getElementById2("PopupCancel");
  var szPopupType = parIn.szPopupType; 
  var bQuestion = (szPopupType == POPUP_TYPE.QUESTION || szPopupType == POPUP_TYPE.QUESTION_3); 
  var bQuestion3 = (szPopupType == POPUP_TYPE.QUESTION_3); 
  // Default
  var szConfirmLabel = (bQuestion) ?  POPUP_BTN_LABEL. QUESTION_CONFIRM :  POPUP_BTN_LABEL. CONFIRM; 
  var szNoLabel =  POPUP_BTN_LABEL. QUESTION_NO;
  var szCancelLabel =  POPUP_BTN_LABEL. QUESTION_CANCEL;
  Popup_log (Fn + "Default Label: szConfirmLabel=" + szConfirmLabel + "   szNoLabel=" + szNoLabel + "   szCancelLabel=" + szCancelLabel);
  var objOpt = parIn.objOpt;
  if (objOpt != null){
    if (objOpt.szConfirmLabel != undefined && objOpt.szConfirmLabel != ""){
      szConfirmLabel = objOpt.szConfirmLabel; 
    }
    if (objOpt.szNoLabel != undefined && objOpt.szNoLabel != ""){
      szNoLabel = objOpt.szNoLabel; 
    }
    if (objOpt.szCancelLabel != undefined && objOpt.szCancelLabel != ""){
      szCancelLabel = objOpt.szCancelLabel; 
    }
    // ------------ width
    if (objOpt.iConfirmWidth!= undefined && objOpt.iConfirmWidth != 0){
      elBtnConfirm.style.width = objOpt.iConfirmWidth + "px"; 
    }
    if (objOpt.iNoWidth!= undefined && objOpt.iNoWidth != 0){
      elBtnNo.style.width = objOpt.iNoWidth + "px"; 
    }
    if (objOpt.iCancelWidth!= undefined && objOpt.iCancelWidth != 0){
      elBtnCancel.style.width = objOpt.iCancelWidth + "px"; 
    }
  }
  Popup_log (Fn + "SET BTN  Label: szConfirmLabel=" + szConfirmLabel + "   szNoLabel=" + szNoLabel + "   szCancelLabel=" + szCancelLabel);
  elBtnConfirm.value = szConfirmLabel; 
  elBtnNo.value = szNoLabel; 
  elBtnCancel.value = szCancelLabel; 
  Popup_log (Fn + "Set Btn Visibility");
  PopupElShow (elBtnNo,bQuestion);
  PopupElShow (elBtnCancel,bQuestion3);
  Popup_log (Fn + "-------------------");
}  


/*
 * Init OptionChoice if present 
 * @param parIn {Object} in  
 */
function PopupDlgOptChoiceInit(parIn){
  var Fn = "[Popup.js PopupDlgOptChoiceInit] ";
  Popup_log (Fn + "-------------------");
  var objOpt = parIn.objOpt;
  if (objOpt != null){
    Popup_log (Fn + "objOpt.bChoiceMultiSel=" + objOpt.bChoiceMultiSel);
    szId =  objOpt.bChoiceMultiSel ? "PopupChoiceMulti" : "PopupChoiceSingle";
    PopupIdShow (szId + "Sect", true);
    getElementById2(szId + "Label").innerHTML = objOpt.szChoiceLabel;
    // Populate selectChoice
    var selectChoice = getElementById2(szId + "Select");
    if (objOpt.bChoiceMultiSel){
      var iChoiceMultiSize = POPUP_DEF_MULTICHOICE_SIZE;
      if (objOpt.iChoiceMultiSize != undefined && objOpt.iChoiceMultiSize != null){
        iSize = objOpt.iChoiceMultiSize; 
      } 
      selectChoice.size = iSize;
      // Label
      var aElSelectAll = getElementById2("PopupSelectAll");
      aElSelectAll.childNodes[0].textContent = POPUP_SELECT_ALL;
      var aElDeselectAll = getElementById2("PopupDeselectAll");
      aElDeselectAll.childNodes[0].textContent=POPUP_DESELECT_ALL;
    }
    for (var i=0; i < objOpt.arChoice.length; i++){
      var objOptItem = objOpt.arChoice[i];
      var elOpt = new Option(objOptItem.szText,objOptItem.value);
      elOpt.dv = objOptItem.szText;
      elOpt.selected = objOptItem.bSel;
      selectChoice[selectChoice.length] = elOpt;
    }
    // ------------- adjust width
    var elFS= getElementById2("PopupChoiceMultiFS");
    var iWidth = selectChoice.clientWidth + 15;
    if (iWidth < POPUP_CHOICE_FS_MIN_WIDTH){
      iWidth = POPUP_CHOICE_FS_MIN_WIDTH;
    }
    elFS.style.width = iWidth + "px";
    Popup_log (Fn + "We have SET elFS.style.width=" + elFS.style.width);
    
  }
  Popup_log (Fn + "-------------------");
}  


/*
 *  Init Option Show if present and Set Show/Hide of Sections basing on Default 
 * @param parIn {Object} in  
 */
function PopupDlgOptLayoutInit(parIn){
  var Fn = "[Popup.js PopupDlgOptChoiceInit] ";
  Popup_log (Fn + "-------------------");
  // Default
  var bShowTitle = POPUP_DEF_SHOW_TITLE;
  var bShowImg = POPUP_DEF_SHOW_IMG;
  var objOpt = parIn.objOpt;
  if (objOpt != null){
    Popup_logObj (Fn + "There are Custom Option:", objOpt);
    if (objOpt.bShowTitle != undefined && objOpt.bShowTitle != null){
      bShowTitle = objOpt.bShowTitle;
    }
    if (objOpt.bShowImg != undefined && objOpt.bShowImg != null){
      bShowImg = objOpt.bShowImg;
    }    
  }
  PopupIdHideIfRequired ("PopupTblHea", bShowTitle);
  PopupIdHideIfRequired ("PopupImg", bShowImg);
  Popup_log (Fn + "-------------------");
}  

/*
 * Init Section of Prompt 
 * @param szPopupType {String} in
 * @param parIn {Object} in  
 */
function PopupDlgPromptInit(szPopupType, objOpt){
  var Fn = "[Popup.js PopupDlgPromptInit] ";
  Popup_log(Fn + "-------------------");
  PopupIdShow ("PopupPromptSect", false);
  if (szPopupType == POPUP_TYPE.PROMPT){
    PopupIdShow ("PopupPromptSect", true);
    if (objOpt != null){
      if (objOpt.szPromptLabel && objOpt.szPromptLabel.length){
        getElementById2("PopupPromptLabel").innerHTML = objOpt.szPromptLabel;
      }
      var elInput = getElementById2("PopupPromptInput");
      if (objOpt.szPromptValue && objOpt.szPromptValue.length){
        Popup_log(Fn + "Set Default PromptValue=" + objOpt.szPromptValue);
        elInput.value = objOpt.szPromptValue;
      }
      szPromptType = (objOpt.szPromptType) ? objOpt.szPromptType : PROMPT_TYPE.STRING;
      var bNumber = (szPromptType == PROMPT_TYPE.NUMBER);
      elInput.setAttribute ("type",szPromptType);
      var iMin=null, iMax=null;
      var bMin=false, bMax=false;
      if (objOpt.iPromptWidth && !isNaN(objOpt.iPromptWidth)){
        elInput.setAttribute ("style","width:" + objOpt.iPromptWidth + "px;");
      }else {
        elInput.setAttribute ("style","width:" + 
            (bNumber ? POPUP_DEF_PROMPT_NUMBER_W : POPUP_DEF_PROMPT_STRING_W )+ 
            "px;");
      }  
      if (objOpt.iPromptMax && !isNaN(objOpt.iPromptMax)){
        bMax = true;
        iPromptMax=objOpt.iPromptMax; 
        elInput.setAttribute ("max",iPromptMax);
        if (!bNumber){
          elInput.setAttribute ("maxlength",iPromptMax);
        }
      }  else {
        elInput.removeAttribute ("max");
        elInput.removeAttribute ("maxlength");
      }
      if (objOpt.iPromptMin && !isNaN(objOpt.iPromptMin)){
        bMin = true;
        iPromptMin=objOpt.iPromptMin; 
        elInput.setAttribute ("min",iPromptMin);
      }else{
        elInput.removeAttribute ("min");
      }
      elInput.focus();
      // ------------ Tip 
      var szTitle = (bNumber) ? POPUP_PROMPT_TIP.NUMBER : POPUP_PROMPT_TIP.STRING;
      if (bMin || bMax) {
        szTitle = (bNumber) ? POPUP_PROMPT_TIP.NUMBER_RANGE : POPUP_PROMPT_TIP.STRING_RANGE;
        if (bMin && bMax){
          szTitle += "[" + iPromptMin + ".." + iPromptMax + "]";
        }else if (bMax){
          szTitle += "[" + 0 + ".." + iPromptMax + "]";
        }else if (bMin){
          szTitle += "[" + iPromptMin + "..]";
        }
      }
      elInput.setAttribute ("title",szTitle);
    }
  }  
  Popup_log(Fn + "-------------------");
}  




/*
 * Get the Dlg Height that we should set in this Moment, basing on current display Message,, Btn,..
 * @returns iDlgH
 */
function PopupDlgGetHeight() { // crossbrowser version
  var Fn = "[Popup.js PopupDlgGetHeight] ";
  var elDivBtn = document.getElementById ("PopupDivBtn");
  var box = elDivBtn .getBoundingClientRect();
  var body = document.body;
  var docEl = document.documentElement;
  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var top  = box.top +  scrollTop - clientTop;
  var iDlgH = Math.round(top) +  elDivBtn.clientHeight;
  Popup_log ( Fn + "Current iDlgH=" + iDlgH);
  return iDlgH;

}




/*
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 * 
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 * 
 * @see http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393 
 */
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    if (canvas == undefined || canvas.getContext == undefined){
      return 0;
    }
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
};






/*====================================================================
====================================================================*/


/*
 * @param parIn {Object} 
 * @return szTitle to Use
*/
function PopupGetTitle(parIn){
  var objOpt = parIn.objOpt;
  var szTitle = (objOpt) ? objOpt.szTitle: null;
  var szPopupType = parIn.szPopupType;
  if (typeof(szTitle) == undefined || szTitle == null || szTitle == ""){ 
    if (szPopupType == POPUP_TYPE.INFO){
      return POPUP_DEF_TITLE.INFO;    
    }else  if (szPopupType == POPUP_TYPE.WARN){
      return POPUP_DEF_TITLE.WARN;    
    }else  if (szPopupType == POPUP_TYPE.ERR){
      return POPUP_DEF_TITLE.ERR;    
    }else  if (szPopupType == POPUP_TYPE.CONFIRM){
      return POPUP_DEF_TITLE.CONFIRM;    
    }else  if (szPopupType == POPUP_TYPE.CHOICE){
      return POPUP_DEF_TITLE.CHOICE;    
    }else  if (szPopupType == POPUP_TYPE.PROMPT){
      return POPUP_DEF_TITLE.PROMPT;    
    }else  if (szPopupType == POPUP_TYPE.QUESTION || szPopupType == POPUP_TYPE.QUESTION_3){
      return POPUP_DEF_TITLE.QUESTION;    
    }else  if (szPopupType == POPUP_TYPE.ALARM){
      return POPUP_DEF_TITLE.ALARM;    
    }else  if (szPopupType == POPUP_TYPE.PROMPT){
      return POPUP_DEF_TITLE.PROMPT;    
    }
  }else {
    return szTitle; 
  }
}  

/*
 * @param elInput
 * @return 0 if OK    1 if ERR
 */
function PopupDlgValidateInput(elInput){
  var Fn = "[Popup.js PopupDlgValidateInput] ";
  Popup_log(Fn + "-------------------");
  var promptValue = elInput.value;
  Popup_log(Fn + "Prompt=" + promptValue);
  // Is required Validation?
  var szType =  elInput.getAttribute ("type");
  var bNumber = (szType == PROMPT_TYPE.NUMBER);
  var iLen= (promptValue) ? promptValue.length :0;
  var iMin =  parseInt(elInput.getAttribute ("min"));
  var iMax =  parseInt(elInput.getAttribute ("max"));
  if (isNaN(iMin)){ iMin = null;}
  if (isNaN(iMax)){ iMax = null;}
  if (bNumber){
    promptValue = parseInt (promptValue);
  }
  var bErr = false;
  if (bNumber){
    Popup_log(Fn + "VALIDATION is required for PROMPT NUMBER - We check that promptValue=" + promptValue + "  is a NUMBER");
    bErr = (isNaN(promptValue)); 
  }
  if (!bErr && iMin){
    Popup_log(Fn + "VALIDATION required for iMin=" + iMin + " - PROMPT szType=" + szType);
    if (bNumber && iMin > promptValue){ bErr = true;}
    if (!bNumber && iMin > iLen){ bErr = true;}
  }
  if (!bErr && iMax){
    Popup_log(Fn + "VALIDATION required for iMax=" + iMax + " - PROMPT szType=" + szType);
    if (bNumber && iMax < promptValue){ bErr = true;}
    if (!bNumber && iMax < iLen){ bErr = true;}
  }
  if (bErr){
    // Show the Error Element
    var szTitle = elInput.getAttribute ("title");
    Popup_log(Fn + "VALIDATION ERROR for promptValue=" + promptValue + " Show Err: " + szTitle);
    var elErr = getElementById2("PopupPromptError");
    elErr.innerHTML = szTitle;
    elementShow(elErr,true,"inline");
    // 
    elInput.setAttribute ("class","PopupPromptError");  // Change class to show alarm gif
    return 1;
  }
  return Popup_log(Fn + "-------------------");
}


/*
 * - validate (if POPUP_TYPE.PROMPT)
 * - Close Dlg and return retObj
 * @param retObj  {
 *                  retBtn   {Number or Object} in  Example: {Number} JTPOPUP_BTN.CONFIRM, POPUP_BTN.NO, POPUP_BTN.CANCEL or whetever Custom NUmber
 *                                       Example: {Object} Custom Object
 *                  .......
 *                 }                      
 * 
 */
function PopupDlgClose(retObj){
  var Fn = "[Popup.js PopupDlgClose] ";

  Popup_log(Fn + "-------------------");
  // true if clicked on OK Button
  var bConfirm = (retObj && retObj.retBtn   == POPUP_BTN.CONFIRM);
  Popup_log(Fn + "bConfirm=" + bConfirm );
  if (bConfirm){
    // -------------- Check if Prompt is Visible
    var bPrompt = PopupIdIsVisible("PopupPromptSect");
    if (bPrompt){
      var elInput = getElementById2("PopupPromptInput");
      if (PopupDlgValidateInput (elInput)){
        return;
      }
      retObj.promptValue = elInput.value;
    }  
    // -------------- Check if Choice is Visible
    var bChoiceSingle = PopupIdIsVisible("PopupChoiceSingleSect");
    var bChoiceMulti = PopupIdIsVisible("PopupChoiceMultiSect");
    if   (bChoiceSingle || bChoiceMulti){
      Popup_log(Fn + "Get Choice Selection");
      var szEl = (bChoiceSingle) ? "PopupChoiceSingleSelect" : "PopupChoiceMultiSelect";
      var selectChoice = getElementById2(szEl);
      // Read All and prepare arChoice
      var arChoice = new Array();
      var szChoiceValue = "";
      var szChoiceText= "";
      var szSep = ""; 
      for (var iOpt=0; iOpt < selectChoice.options.length; iOpt ++){
        var Opt = selectChoice.options[iOpt];
        var arItem = { 
             value: Opt.value, 
             szText: Opt.text, 
             bSel: Opt.selected
             };
        if (Opt.selected){
          szChoiceValue += (szSep + Opt.value);
          szChoiceText += (szSep + Opt.text);
          if (szSep == ""){
            szSep = ", ";
          }  
        }
        arChoice.push(arItem);
      }
      retObj.choiceValue = szChoiceValue;
      retObj.choiceText = szChoiceText;
      retObj.arChoice = arChoice;
    }
  }  
  window.returnValue = retObj;
  Popup_logObj (Fn + "window.returnValue", window.returnValue);
  Popup_log (Fn + "-------------------");
  window.close();  
}


/*====================================================================
EVENT FROM Popup Dlg
====================================================================*/


/*
* Called at click on Button OK or YES
* - Close Dlg and return retObj.bOk = true 
*/
function PopupDlgOnClickConfirm(){
  var Fn = "[Popup.js PopupDlgOnClickConfirm] ";
  
  PopupDlgClose ({retBtn  : POPUP_BTN.CONFIRM});
  
}


/*
 * Deselect All Items in PopupChoiceMultiSelect
 */
function PopupDlgDeselectAll(){
  var selectChoice = getElementById2("PopupChoiceMultiSelect");
  for (var iOpt=0; iOpt < selectChoice.options.length; iOpt ++){
    selectChoice.options[iOpt].selected = false;
  }
}


/*
 * Select All Items in PopupChoiceMultiSelect
 */
function PopupDlgSelectAll(){
  var selectChoice = getElementById2("PopupChoiceMultiSelect");
  for (var iOpt=0; iOpt < selectChoice.options.length; iOpt ++){
    selectChoice.options[iOpt].selected = true;
  }
}


/*
 * FUTURE
 */
function PopupDlgOnResize(){
  var Fn = "[Popup.js PopupDlgOnResize] ";
  var w = window.outerWidth;
  var h = window.outerHeight;
  if (w != undefined && h != undefined){
    // Popup_log (Fn + "Window size: width=" + w + ", height=" + h);
    var divPopup = document.getElementById ('PopupDiv');
    // Popup_log (Fn + "divPopup .width=" + divPopup.clientWidth + " .height=" + divPopup.clientHeight);
    var iDivW = w-16;
    if (popup_bScroll){
      iDivW -=20;
    }
    Popup_log (Fn + "Change divPopup width from =" + divPopup.clientWidth + " to =" + iDivW);
    divPopup.style.width = iDivW + "px";
  }   
}


/*
* Called at click on Button No or NO
* - Close Dlg and return retObj.bConfirm = false
*/
function PopupDlgOnClickNo(){
  var Fn = "[Popup.js PopupDlgOnClickNo] ";
  
  PopupDlgClose ({retBtn  : POPUP_BTN.NO});
}


/*
* Called at click on Button3 
* - Close Dlg and return retObj.bConfirm = false
*/
function PopupDlgOnClickCancel(){
  var Fn = "[Popup.js PopupDlgOnClickNo] ";
  
  PopupDlgClose ({retBtn: POPUP_BTN.CANCEL});
}


/*
* MAIN Initialization Event Called at Startup from Popup Modal Dialog
* - Setup Dlg Layout
*/
function PopupDlgOnLoad(){
  var Fn = "[Popup.js PopupDlgOnLoad] ";
  var parIn = null;
  var szBrowser = PopupGetBrowser();
  var szUriQueryString = location.search;
  if (szUriQueryString.length){
    // parIn has been passed as UriQueryString
    // alert ("IN szUriQueryString=" + szUriQueryString);
    parIn = objFromURIQueryString (szUriQueryString);
  }else{
    parIn = window.dialogArguments ;
  }
  if (parIn == undefined){
    // DEVELOPER TEST: we suppose that html has been launched directly by the page, only for Developer Test
    parIn = new Object();
    parIn.szMsgHtml = "<b> This is a Test only For Developers</b><br/>We want to Try what is the minimum Height required for a Message";
    parIn.bDefWidth = true;
    parIn.iJslogLev = 7;
    parIn.iWidth = POPUP_DEF_WIDTH;
    // --------- Various Test
    parIn.szPopupType = POPUP_TYPE.CHOICE;
    parIn.objOpt = {
             szChoiceLabel: "VOTE:",
             arChoice: [{value:1,szText:"1 - Not Good",bSel:false},
               {value:2,szText:"2 - Good",bSel:false},
               {value:3,szText:"3 - Very Good",bSel:true},
               {value:4,szText:"4 - Excellent",bSel:false},
               ],        
             bChoiceMultiSel:true,
             iChoiceMultiSize:4};        
  }
  //  --------------- Init  jslog with the same parameter used by parent
  var objJslogOpt = parIn.objJslogOpt;
  if (objJslogOpt && objJslogOpt.iLogLev > 0){
    var objOpt = new Object();
    objOpt.bLogTime = objJslogOpt.bLogTime;
    var szPathImg = objJslogOpt.szPathImg; // Default. Absolte
    if (szPathImg.indexOf ("../") == 0){
      // Partizcular cases: Relative Path passed e.g.       ../../jsu/images/
      szPathImg = szPathImg.substr(3);
    }
    objOpt.szPathImg = szPathImg;
    jslog_init(objJslogOpt.iLogLev ,objOpt);
  } 
  Popup_log (Fn + "-------------------");
  var objOpt = parIn.objOpt; 
  // ----------------------------- bCloseOnEscape 
  var bCloseOnEscape = POPUP_DEF_CLOSE_ON_ESCAPE;
  if (objOpt && objOpt.bCloseOnEscape != undefined){
		bCloseOnEscape = objOpt.bCloseOnEscape; 
	} 
	if (bCloseOnEscape){
		// ESC is considered as Close on X 
		document.onkeydown = function(e){
	    if(e.keyCode === 27){
	    	PopupDlgClose ({retBtn: POPUP_BTN.CLOSE});;
	    }
	  };	
	}
  // ----------------------------- bResize 
  var bResize = POPUP_DEF_RESIZE;
  if (objOpt && objOpt.bResize != undefined){
  	bResize = objOpt.bResize; 
	}
	if (bResize){
    Popup_log (Fn + "SET onresize");
		document.body.onresize = function(){
			PopupDlgOnResize();			
		}
	}
  //-------------------------------------------------------
  if (parIn.elLoading != undefined && parIn.elLoading){
    Popup_log (Fn + "Hide Loading in Parent");
    loadingShowByEl (parIn.elLoading,false);    
  }  
  // NB: Reset elLoading before jslogObj that does not support DOM El
  parIn.elLoading = null;
  Popup_logObj (Fn + "parIn", parIn);
  Popup_log (Fn +"set Dlg Layout -------");
  var szTitle = PopupGetTitle (parIn);
  var objOpt = parIn.objOpt;
  Popup_log (Fn + "Set Title=" + szTitle);
  document.title = szTitle;
  getElementById2("PopupTitle").innerHTML = szTitle; 
  //
  var szPopupType = parIn.szPopupType;
  PopupDlgClassInit (szPopupType);
  PopupDlgBtnInit (parIn);  // Init Btn and its Options if present
  if (szPopupType == POPUP_TYPE.CHOICE){
    PopupDlgOptChoiceInit (parIn);  // Init Option Choice if present
  }
  PopupDlgOptLayoutInit (parIn);  // Init Option Show if present and Set Show/Hide of Sections basing on Default
  PopupDlgPromptInit (szPopupType,objOpt);  // Init Section Prompt
  
  var elMsg = getElementById2("PopupMsg");
  elMsg.innerHTML = parIn.szMsgHtml;
  var szMsgHtml = parIn.szMsgHtml;
  //  ------------------------------------------ H
  var iDlgH= PopupDlgGetHeight ();
  if (iDlgH > POPUP_MAX_HEIGHT){
    iDlgH =POPUP_MAX_HEIGHT;
  }  
/*
  if (iDlgH < POPUP_MIN_HEIGHT){
    iDlgH =POPUP_MIN_HEIGHT;
  }  
*/
  if (szBrowser == POPUP_BROWSER_TYPE_IE){
    Popup_log (Fn + szBrowser +" set iDlgH=" + iDlgH);
    window.dialogHeight= iDlgH + "px"; 
  }else{
    // We have to add in Firerfox, or we see Scroolbar
    iDlgH += 8;  
    Popup_log (Fn + "NOT IE set iDlgH=" + iDlgH);
    if (window.innerHeight != undefined){
      Popup_log (Fn + szBrowser + " Firefox set innerHeight=" + iDlgH);
      window.innerHeight = iDlgH ;
    } 
    // Center
    if (window.screen.height != undefined && window.screen.width != undefined){
      var iScreenH = window.screen.height;
      var iScreenW = window.screen.width;
      var iY = parseInt((iScreenH - iDlgH)/2);
      var iX = parseInt ((iScreenW -parIn.iWidth)/2); 
      window.moveTo (iX,iY);
    }
  }
  //--------------------------------------------------- W
  // Set the Global Var used by Event
  popup_bScroll = (objOpt!=null && objOpt.bScroll != undefined && objOpt.bScroll != null && objOpt.bScroll);
  if (popup_bScroll){
    // We have to get some size for the SBVert pr we will see also the SBHor
    var divPopup = document.getElementById ('PopupDiv');
    var iWidth = divPopup.clientWidth;
    Popup_log (Fn + "divPopup.clientWidth=" + divPopup.clientWidth + "  divPopup.style.width=" + divPopup.style.width);
    iWidth -=20;
    divPopup.style.width = iWidth + "px";
    Popup_log (Fn + "SET divPopup.clientWidth=" + divPopup.clientWidth + "  divPopup.style.width=" + divPopup.style.width);
    iDlgH +=20;
  }  
  Popup_log (Fn + "set iDlgH=" + iDlgH);
  window.dialogHeight= iDlgH + "px"; 
  
  Popup_log (Fn + "-------------------");
}









/*==================================================================================================
        GLOBAL API  for OPTION
==================================================================================================*/

/**
 * Optionally Used when the Path of Dlg is different form the one configured in conf.js (POPUP_PATH_HTML)
 * 
 * @param szPathHtml
 */
function PopupSetPathHtml(szPathHtml){
   popupPathHtml = szPathHtml;
}  


/*==================================================================================================
            GLOBAL API
==================================================================================================*/


/**
 * @param szPopupType {String}  POPUP_TYPE.INFO,  POPUP_TYPE.CONFIRM, ..    <BR/>
    POPUP_TYPE:  <BR/>
        .INFO: "Info", <BR/>
        .CONFIRM: "Confirm", <BR/>
        .ERR:"Error", <BR/>
        .ALARM:"Alarm", <BR/>
        .WARN:"Warning", <BR/>
        .QUESTION:"Question", // Question with YES NO <BR/>
        .QUESTION_3:"Question_3Btn", // Question with YES NO CANCEL <BR/>
        .PROMPT:"Prompt", // Prompt to insert one value <BR/>
        .CHOICE:"Choice" // Choice in a select
 *                                 
 * @param szMsgHtml {String}  HTML TAG are Accepted (e.g <b>, <br/>,..)    /n if present is converted to <BR/>
 * @param objOpt    [Object]}    Optional Object to change default Option: <BR/>
 *          szConfirmLabel:  {String} Label of Confirm Button  <BR/>
 *          iConfirmWidth:   {Number}  Width of Confirm Button  <BR/>
 *          szNoLabel:  {String}      Label of No Button  <BR/>
 *          iNoWidth:   {Number}      Width of No Button  <BR/>
 *          szNoLabel:  {String}      Label of No Button  <BR/>
 *           iNoWidth:   {Number}      Width of No Button  <BR/>
 *           szTitle:    {String}      change default Title <BR/>
 *           iWidth:  {Number}      Optional Width: if it passed it is used - If 0 or null or undefined, Default Width is used <BR/>
 *           bShowTitle: {Boolean}     true to show Title  (Default=true) <BR/>
 *           bShowImg:    {Boolean}     true to show Image  (Default=true) <BR/>
 *           bScroll:    {Boolean}      true to show ScroolBar  (Default=false)    <BR/>
 *           bResize:    {Boolean}     true to allow Resize Dialog  (Default=false)    <BR/>
 *           bCloseOnEscape: {Boolean}  Default true   
 *   
 *   
 * @return {Object}  retObj  <BR/>
 *                           Example: <BR/>
 *                           {   <BR/>
 *                             retBtn {String} POPUP_BTN.CLOSE, POPUP_BTN.CONFIRM, POPUP_BTN.NO, POPUP_BTN.CANCEL <BR/>
 *                             choiceValue      Only for POPUP_TYPE.CHOICE: Value chosen in selectChoice <BR/>
 *                             choiceText    Only for POPUP_TYPE.CHOICE: Text chosen in selectChoice <BR/>
 *                             ......          for POPUP_CUSTOM: you can add your personal memeber   <BR/>
 *                           }
*/
function Popup(szPopupType, szMsgHtml,objOpt){
  return PopupDlgShow (szPopupType,szMsgHtml,objOpt);
}  


/**
 * Default Btn: POPUP_BTN.CONFIRM, POPUP_BTN.CANCEL
 * 
 * @param szMsgHtml {String}  HTML TAG are Accepted (e.g <b>, <br/>,..)    /n if present is converted to <BR/>
 * @param szChoiceLabel {String} Label of the selectChoice
 * @param arChoice  {Array}    Array to populate the selectChoice: Example <BR/>
 *                               [{value:1,szText:"1 - Not Good",bSel:false},                <BR/>
 *                                  {value:2,szText:"2 - Good",bSel:false}, <BR/>
 *                                {value:3,szText:"3 - Very Good",bSel:true}]
 * @param [objOpt]   [Object]    Optional Array of Option to change Button. Use PopupOpt API to generate this par  
 * @return {Object}  retObj  <BR/>
 *                           Example: <BR/>
 *                           {   <BR/>
 *                             retBtn {String} POPUP_BTN.CLOSE, POPUP_BTN.CONFIRM, POPUP_BTN.CANCEL <BR/>
 *                             choiceSelValue    Value chosen in selectChoice    (valueSel1, valueSel2, .. for MultiSel) <BR/>
 *                             choiceSelText      Text chosen in selectChoice      (textSel1, textSel2,.. for MultiSel) <BR/>
 *                             arChoice          like inpout with the bSel=true/false depending on selected state
*/
function PopupChoice(szMsgHtml,szChoiceLabel,arChoice,objOpt){
  if (objOpt == undefined || objOpt == null){
    objOpt = new Array();
  }
  // Create the Option for Choice and push it into objOpt
  objOpt.szChoiceLabel = szChoiceLabel;
  objOpt.arChoice = arChoice;
  return PopupDlgShow (POPUP_TYPE.CHOICE,szMsgHtml,objOpt);
}  









