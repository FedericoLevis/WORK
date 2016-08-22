/** @fileOverview
========================================================================================= <BR/> 
<b>File:</b> 			JSPopup/Popup.js  <BR/>
<b>Author:</b>     		<a href="https://www.linkedin.com/in/federicolevis" target="_blank">Federico Levis</a> <BR/>
<b>JSPopup Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/JSPopup.html" target="_blank">JSU JSPopup Documentation</a> <BR/>
<b>JSU API Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html" target="_blank">JSU API Documentation</a> <BR/>
<b>Description:</b>       JQ Popup API, generic for ALL Browsers (IE, Mozilla, Chrome, ..) <BR/>                               
<b>REQUIRED:</b>          From JSU: <ul>
                            <li><b>jsu/externalPlugin/jquery:</b> jquery-ui.css jquery.js jquery-ui.js </li>
                            <li><b>CSS:</b> core/core.css core/Popup/Popup.css </li>
                            <li><b>JS</b> core/util.js </li>
                            <li><b>OPTIONAL JS:</b> core/jslog.js, core/dom-drag.js (required only to enable jslog)</li>
                          </ul>
<b>First Version:</b>     1.0 Jan 2015  <BR/>
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
 *          GLOBAL COSTANT
 ====================================================================================================*/

/**
 * POPUP_TYPE used in Popup() API as szPopupType par, to identify the PopupType to display<BR/>
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
 * Option iPromptType for POPUP_TYPE.PROMPT
 */ 
var PROMPT_TYPE = {
    NUMBER: "number",
    STRING: "string"
  };


/**
 * POPUP_TYPE used in Popup() API as szPopupType par, to identify the PopupType to display<BR/>
 * NOTE: DO NOT Change this values: they are used also to compose the img class e.g PopupInfo, PopupConfirm,..
 */
var POPUP_BTN = {
    CLOSE: "CLOSE",    /* Close on x of Window */
    CONFIRM: "CONFIRM", /* BTN OK (YES) */
    NO: "NO", /* BTN NO */ 
    CANCEL: "CANCEL"  /* BTN CANCEL */
};

/* ====================================================================================================
 *          DEFAULT CONFIGURATION: see description of objOpt in Popup(szPopupType, szMsgHtml,objOpt) API  
 ====================================================================================================*/
var POPUP_DEF_WIDTH = 600;    //iWidth {Number}
var POPUP_DEF_MULTICHOICE_SIZE = 5;  //iChoiceMultiSize {Number}
var POPUP_DEF_SHOW_IMG = true;  //bShowImg {Boolean} (show/hide Image (Info, Warn,..) On the Left of Message
//Default
var POPUP_DEF_RESIZE = true;  // bResize {Boolean}
var POPUP_DEF_CLOSE_ON_ESCAPE = true; // bCloseOnEscape {Boolean}
// For DEVELOPER: you can set false
var POPUP_DEF_MODAL = true;  // bModal {Boolean}
var POPUP_DEF_POSITION = {at: "center"};     // "center" "top" "left" "right" 
var POPUP_DEF_PROMPT_NUMBER_W = 50;
var POPUP_DEF_PROMPT_STRING_W = 200;

 /* ====================================================================================================
 *          INTERNAL CONSTANT
 ====================================================================================================*/
var POPUP_IMG_CLASS_PREFIX = "PopupImg";  // e.g PopupImgInfo, PopupImgConfirm,..
var POPUP_TBLMSG_CLASS_PREFIX = "PopupTblMsg";  // e.g PopupTblMsgInfo, 
var POPUP_TITLE_CLASS_PREFIX = "PopupTitle";  // e.g PopupTitleInfo, 
var POPUP_MSG_MIN_HEIGHT = 160;  /* Becaase we Need space for Image and Button */
var POPUP_FS_CHOICE_MIN_WIDTH=200; // Min width to allow SelectAll DeselectAll

var POPUP_DIV_EMPTY = '<div id="PopupDiv" class="Popup" style="display:none;"></div> ';
// The html of the Div
var POPUP_DIV_HTML = '<table id="PopupTblHea" class="PopupTitleInfo" style="display:none" width="100%" >'+
'      <tr><td id="PopupTitle" class="PopupTitle" width="100%">INFORMATION</td>  </tr>'+
'    </table>  '+
'    <table id="PopupTblMsg" class="PopupTblMsgInfo" style="min-height:80px;" width="100%">'+
'      <tr>'+
'        <td id="PopupImg" class="PopupImgConfirm" width="80px">'+
'        </td>'+
'        <td>'+
'          <table class="PopupMsg">'+
'            <tr>'+
'              <td id="PopupMsg" class="PopupMsg" >'+
'              </td>'+
'            </tr>'+
'            <tr>'+
'              <!--    Section for  PopupPrompt   -->'+
'               <td id="PopupPromptSect" class="PopupPrompt" style="display:none">'+
'                 <table>' +
'                   <tr>' +
'                     <td><label id="PopupPromptLabel" class="PopupPrompt"></label></td>'+
'                     <td><input id="PopupPromptInput" class="PopupPrompt" onfocus="PopupDlgOnFocusPromptInput();"/></td>'+
'                   </tr>' +
'                   <tr>' +
'                     <td></td>' +
'                     <td><label id="PopupPromptError" class="PopupPromptError"/></td>'+
'                   </tr>' +
'                 </table>' +
'               </td>'+
'            </tr>'+
'            <tr>'+
'              <!--    Section for  PopupChoice Single   -->'+
'               <td id="PopupChoiceSingleSect" class="PopupChoiceSingle" style="display:none">'+
'                 <label id="PopupChoiceSingleLabel" class="PopupChoiceSingle">Choice:</label>'+
'                 <select id="PopupChoiceSingleSelect" class="PopupChoiceSingle"></select>  '+
'               </td>'+
'            </tr>'+
'            <tr>'+
'              <!--    Section for  PopupChoice Multi   -->'+
'               <td id="PopupChoiceMultiSect" class="PopupChoiceMulti" style="display:none;text-align:center;">'+
'                     <fieldset id="PopupChoiceMultiFS" class="PopupChoiceMulti">'+
'                       <legend id="PopupChoiceMultiLabel" class="PopupChoiceMulti">Multi</legend>'+
'                       <select id="PopupChoiceMultiSelect" class="PopupChoiceMulti" multiple=true></select>'+
'                       <div style="margin-top:10px; margin-bottom:10px;">'+
'                          <a id="PopupSelectAll" href="javascript:PopupDlgSelectAll();" class="Popup">SELECT All</a>'+
'                          <a id="PopupDeselectAll" href="javascript:PopupDlgDeselectAll();" class="Popup" style="padding-left:15px;">DESELECT All</a>'+
'                       </div>'+
'                     </fieldset>'+
'                </td>'+
'            </tr>'+
'          </table>'+
'        </td>'+
'      </tr>'+
'    </table>';


/* ====================================================================================================
 *         GLOBAL VAR
 ====================================================================================================*/
// Current Dlg Status
var jsPopup_bScroll = false;



//===================================================================================
//        LOCAL FUNCTION
//===================================================================================

/*
 * MAIN Local Function. Depending on BRowser and Configuration. 
 * 
* @param szPopupType {String}  POPUP_TYPE.INFO, POPUP_TYPE.WARN, POPUP_TYPE.ERR, ...... 
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
  
  Popup_log(Fn + "---------------------");
  Popup_log(Fn + "IN: szPopupType=" + szPopupType);
  Popup_logObj(Fn + "IN: objOpt=" , objOpt);
  
  PopupDlgInit();
  // Replace /n with <BR/> 
  szMsgHtml =   strReplaceAll(szMsgHtml,"\n","<BR/>");

  //  Init
  var iWidth = POPUP_DEF_WIDTH;
  var height = "auto";
  // Default
  var bModal = POPUP_DEF_MODAL;
  var bResize = POPUP_DEF_RESIZE;
  var bShowImg = POPUP_DEF_SHOW_IMG;
  var bCloseOnEscape = POPUP_DEF_CLOSE_ON_ESCAPE;
  var position = POPUP_DEF_POSITION;
  var bLog = (jslogGetLogLev() > 0);
  if (bLog){
    bResize = true;
  }
  var jqePopup = $( "#PopupDiv" );
  jqePopup[0].fnCallback = undefined; // DEfault
  var bOpt = (objOpt != undefined && objOpt != null ); 
  if  (bOpt){
    if (objOpt.iWidth != undefined && objOpt.iWidth != null && objOpt.iWidth){
      iWidth = objOpt.iWidth;
    }
    if (objOpt.iHeight != undefined && objOpt.iHeight != null){
      height = objOpt.iHeight;
    }
     if (objOpt.position  != undefined){
      position = objOpt.position;
    }
    if (objOpt.bModal != undefined && objOpt.bModal != null){
      bModal = objOpt.bModal;
    }
    if (objOpt.bResize != undefined && objOpt.bResize != null){
      bResize = objOpt.bResize;  
    }
    if (objOpt.bShowImg != undefined && objOpt.bShowImg != null){
      bShowImg = objOpt.bShowImg;
    }    
    if (objOpt.bCloseOnEscape != undefined && objOpt.bCloseOnEscape != null){
      bCloseOnEscape = objOpt.bCloseOnEscape;  
    }
    if (objOpt.fnCallback != undefined){
      Popup_log(Fn + "fnCallback is defined");
      jqePopup[0].fnCallback = objOpt.fnCallback; 
    }
  }  
  jqePopup.dialog("destroy"); // destroy previous, to make jquery recalculating Size with new one
  var szTitle = PopupGetTitle (szPopupType,objOpt);
  var buttons = PopupDlgGetBtn (szPopupType,objOpt);
  Popup_logObj(Fn + "buttons", buttons);
  jqePopup.dialog({
  	autoOpen: false,
    modal: bModal,  
    dialogClass: "PopupDialog",
    title: szTitle,
    position: position,
    resizable: bResize,
    width: iWidth,
    height: height,
    minHeight: POPUP_MSG_MIN_HEIGHT,
    closeOnEscape: bCloseOnEscape,
    buttons: buttons,
    close: function( event, ui ) {PopupDlgOnClose(event);}
  });  
  /* Set className of button */
  var arIdBtn = ['#PopupConfirm','#PopupNo','#PopupCancel'];
  for (var i=0;i < arIdBtn.length; i++){
    var elBtn = $(arIdBtn[i])[0];
     // Not all the Btn are always created, so we must check if elBtn si present
    if (elBtn){
      elBtn.className = "PopupBtn";
    }
  }
  //
  PopupDlgClassInit (szPopupType,jqePopup);
  PopupIdShow ("PopupImg", bShowImg);
  PopupDlgChoiceInit (szPopupType,objOpt);  // Init Section Choice
  PopupDlgPromptInit (szPopupType,objOpt);  // Init Section Prompt
  var jqeMsg = $('#PopupMsg');
  jqeMsg.html (szMsgHtml);
  $( "#PopupDiv" ).dialog( "open" );
  Popup_log(Fn + "---------------------");
}  

/*
 * call jslog if it is defined
 * @param msg
 */
function Popup_log(msg){
	if (typeof(jslog) == "function"){
		jslog(JSLOG_JSU, msg);
	}
	//	alert (msg);
}

/*
 * call jslogObj if it is defined
 * @param msg
 */
function Popup_logObj(msg,obj){
	if (typeof(jslogObj) == "function"){
		jslogObj(JSLOG_JSU, msg,obj);
	}
}

/*
 * Add the Popup Div to document, if it is not already presente
 * - Reset Div to default empty state
 * - Init dialog
 */

function PopupDlgInit(){
  var Fn = "[Popup.js PopupDlgInit] ";
  Popup_log(Fn + "---------------------");

  var elPopup = document.getElementById ("PopupDiv");
  if (elPopup == null){
    Popup_log(Fn + "'PopupDiv' NOT present - we add it to document");
    $('body,html').append (POPUP_DIV_EMPTY);
  }
  // Set initial Empty Layout
  var jqePopup = $( "#PopupDiv"); 
  jqePopup.hide();
  jqePopup.html (POPUP_DIV_HTML);
  jqePopup.dialog({ autoOpen: false });    
  Popup_log(Fn + "---------------------");
}



/*
 * Init Class of Layout Objects
 * @param szPopupType {String} in  
 * @param jqepopup {jquery Object}
 */
function PopupDlgClassInit(szPopupType, jqePopup){
  var Fn = "[Popup.js PopupDlgClassInit] ";
  Popup_log(Fn + "---------------------");

  // Get Class
  var szClassId = szPopupType;
  if (szPopupType == POPUP_TYPE.QUESTION_3){
    szClassId = POPUP_TYPE.QUESTION; // Mapped to the same Class
  }
  //---------------
  var szTitleClassName = POPUP_TITLE_CLASS_PREFIX + szClassId;
  Popup_log(Fn + "set PopupTblHea className=" + szTitleClassName);
  getElementById2("PopupTblHea").className = szTitleClassName;
  
  
  // Set className of TitleBar
  var elTitleBar = jqePopup.siblings('.ui-dialog-titlebar')[0];
  var szClassName = szTitleClassName + " " + elTitleBar.className;
  elTitleBar.className =szClassName;
  // Get the css and set to the TitleBar
  elTitleBar.style.backgroundColor =  $('#PopupTblHea').css( "background-color" );
  elTitleBar.style.textAlign =  "center";
  elTitleBar.style.fontSize = $('#PopupTblHea').css( "font-size" ); 
  elTitleBar.style.fontWeight= $('#PopupTblHea').css( "font-weight" ); 
  elTitleBar.style.color= $('#PopupTblHea').css( "color" );
  //---------------
  var szImgClassName = POPUP_IMG_CLASS_PREFIX + szClassId;
  Popup_log(Fn + "set PopupImg className=" + szImgClassName);
  getElementById2("PopupImg").className = szImgClassName;
  //---------------
  var szTblMsgClassName = POPUP_TBLMSG_CLASS_PREFIX + szClassId;
  Popup_log(Fn + "set PopupTblMsg className=" + szTblMsgClassName);
  getElementById2("PopupTblMsg").className = szTblMsgClassName;
  
  Popup_log(Fn + "---------------------");
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
 * Only if bShow = false we Hide szId
 * @param szId
 * @param bShow
 */
function PopupIdShow (szId, bShow){
  var jqId = '#' + szId;
  var jqEl = $(jqId); 
  if (bShow){
    jqEl.show();
  }else{
    jqEl.hide();
  }  
}  


/*
 * Gget the Btn depending on szPopupType and objOpt if present
 * @param szPopupType {String} in
 * @param objOpt {Object} in  
 * 
 * @return buttons {Object}   e.g:
 *     {
        "OK" : {
          text: "OK",
          id: "PopupConfirm",
          click: function(){  PopupDlgOnClickConfirm();  }
          },       
        "NO" : {
            text: "This is Custom Label",
            width: 200,
            id: "PopupNo",
            click: function(){PopupDlgOnClickNo();  }
          },
         "CANCEL" : {
              text: "Cancel",
              id: "PopupCancel",
              click: function(){PopupDlgOnClickCancel(); }       
          }
        }      

 * 
 */
function PopupDlgGetBtn (szPopupType,objOpt){
  var Fn = "[Popup.js PopupDlgBtnInit] ";
  Popup_log(Fn + "---------------------");

  var bQuestion = (szPopupType == POPUP_TYPE.QUESTION || szPopupType == POPUP_TYPE.QUESTION_3); 
  var bQuestion3 = (szPopupType == POPUP_TYPE.QUESTION_3);
  var bOpt = (objOpt != undefined && objOpt != null);
  // Default
  var szConfirmLabel = (bQuestion) ?  POPUP_BTN_LABEL. QUESTION_CONFIRM :  POPUP_BTN_LABEL. CONFIRM; 
  var szNoLabel =  POPUP_BTN_LABEL. QUESTION_NO;
  var szCancelLabel =  POPUP_BTN_LABEL. QUESTION_CANCEL;
  Popup_log(Fn + "Default Label: szConfirmLabel=" + szConfirmLabel + "   szNoLabel=" + szNoLabel + "   szCancelLabel=" + szCancelLabel);
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
  }
  var objBtnConfirm = { text: szConfirmLabel,  id: "PopupConfirm",
                    click: function(){  PopupDlgOnClickConfirm();  }  
                 };
  if  (bOpt && objOpt.iConfirmWidth!= undefined && objOpt.iConfirmWidth!= null){
    objBtnConfirm.width = objOpt.iConfirmWidth;
  }
  //-------
  var objBtnNo = { text: szNoLabel,  id: "PopupNo",
      click: function(){  PopupDlgOnClickNo();  }  
   };
  if  (bOpt && objOpt.iNoWidth!= undefined && objOpt.iNoWidth!= null){
      objBtnNo.width = objOpt.iNoWidth;
  }
  //-------
  var objBtnCancel = { text: szCancelLabel,  id: "PopupCancel",
      click: function(){  PopupDlgOnClickCancel();  }  
   };
  if  (bOpt && objOpt.iCancelWidth!= undefined && objOpt.iCancelWidth!= null){
      objBtnCancel.width = objOpt.iCancelWidth;
  }
  var buttons = new Object();
  buttons.confirm =  objBtnConfirm;
  if (szPopupType == POPUP_TYPE.QUESTION){
    buttons.no =  objBtnNo;
  }else if (szPopupType == POPUP_TYPE.QUESTION_3){
    buttons.no =  objBtnNo;
    buttons.cancel =  objBtnCancel;
  }else if (szPopupType == POPUP_TYPE.CHOICE || szPopupType == POPUP_TYPE.PROMPT){
    buttons.cancel =  objBtnCancel;
  }
  Popup_log(Fn + "---------------------");
  return buttons;
}  


/*
 * Init Section of Choice 
 * @param szPopupType {String} in
 * @param parIn {Object} in  
 */
function PopupDlgChoiceInit(szPopupType,objOpt){
  var Fn = "[Popup.js PopupDlgChoiceInit] ";
  Popup_log(Fn + "---------------------");
  PopupIdShow ("PopupChoiceMultiSect", false);
  PopupIdShow ("PopupChoiceSingle", false);
  if (szPopupType == POPUP_TYPE.CHOICE && objOpt != null){
    Popup_log(Fn + "objOpt.bChoiceMultiSel=" + objOpt.bChoiceMultiSel);
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
    if (iWidth < POPUP_FS_CHOICE_MIN_WIDTH){
      iWidth = POPUP_FS_CHOICE_MIN_WIDTH;
    }
    elFS.style.width = iWidth + "px";
    Popup_log(Fn + "We have SET elFS.style.width=" + elFS.style.width);
    
  }
  Popup_log(Fn + "---------------------");
}  



/*
 * Init Section of Prompt 
 * @param szPopupType {String} in
 * @param parIn {Object} in  
 */
function PopupDlgPromptInit(szPopupType, objOpt){
  var Fn = "[Popup.js PopupDlgPromptInit] ";
  Popup_log(Fn + "---------------------");
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
  Popup_log(Fn + "---------------------");
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
 * @param objOpt {Object} 
 * @return szTitle to Use
*/
function PopupGetTitle(szPopupType,objOpt){
  var szTitle = (objOpt) ? objOpt.szTitle: null;
  if (typeof(szTitle) == undefined || szTitle == null || szTitle == ""){ 
    if (szPopupType == POPUP_TYPE.INFO){
      return POPUP_DEF_TITLE.INFO;    
    }else  if (szPopupType == POPUP_TYPE.WARN){
      return POPUP_DEF_TITLE.WARN;    
    }else  if (szPopupType == POPUP_TYPE.ERR){
      return POPUP_DEF_TITLE.ERR;    
    }else  if (szPopupType == POPUP_TYPE.ALARM){
      return POPUP_DEF_TITLE.ALARM;    
    }else  if (szPopupType == POPUP_TYPE.CONFIRM){
      return POPUP_DEF_TITLE.CONFIRM;    
    }else  if (szPopupType == POPUP_TYPE.PROMPT){
      return POPUP_DEF_TITLE.PROMPT;    
    }else  if (szPopupType == POPUP_TYPE.CHOICE){
      return POPUP_DEF_TITLE.CHOICE;    
    }else  if (szPopupType == POPUP_TYPE.QUESTION || szPopupType == POPUP_TYPE.QUESTION_3){
      return POPUP_DEF_TITLE.QUESTION;    
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
  Popup_log(Fn + "---------------------");
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
  return Popup_log(Fn + "---------------------");
}

/*
 * Intercept Close to manage ESC or x
 * 
 * @param event
 */
function PopupDlgOnClose(event){
  var Fn = "[Popup.js PopupDlgOnClose] ";
  Popup_log(Fn + "---------------------");
  if(event.originalEvent ){
    Popup_log(Fn + "Clicking on dialog box X or ESC");
    // triggered by clicking on dialog box X or pressing ESC
    PopupDlgClose ({retBtn  : POPUP_BTN.CLOSE});
  }        
  Popup_log(Fn + "---------------------");

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

  Popup_log(Fn + "---------------------");
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
  Popup_logObj(Fn + "retObj", retObj);
  var jqePopup = $("#PopupDiv" );
  Popup_log(Fn + "close and destroy Dialog");
  var fnCallback = jqePopup[0].fnCallback;
  jqePopup.dialog("destroy");
  if (typeof (UnTip) == "function"){
    UnTip();  /// if there is any Tip in the Dialog we UnTip it (to avoid the risk of leave it open)
  }  
  if (fnCallback != undefined){
    Popup_log(Fn + "call fncallback");
    fnCallback (retObj);
  }
  Popup_log(Fn + "---------------------");
  
}


/*====================================================================
EVENT FROM Popup Dlg
====================================================================*/

/*
 * Focus on 'PromptPromptInput' Element
 * Set standard Class to remove Validation Class Error if present
 */
function PopupDlgOnFocusPromptInput(){
  var elInput = getElementById2("PopupPromptInput");
  elInput.setAttribute('class','PopupPromptInput');
  var elErr = getElementById2("PopupPromptError");
  elementShow (elErr,false); 
}

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
  
  PopupDlgClose ({retBtn  :POPUP_BTN.CANCEL});
}





/*==================================================================================================
            GLOBAL API
==================================================================================================*/


/**
 * Show the Popup
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
 * @param szMsgHtml {String}  HTML TAG are Accepted - Newline if present is converted to HTML Newline
 * @param objOpt    {Object}    Optional Object to change default Option:  <BR/>
 *           - fnCallback:  {function}  callback function, called when Popup is closed <BR/>
 *           - szTitle:    {String}      change default Title <BR/>
 *           - position: {Object}    jQuery ui position. Default {at: "center"} Example: {at: "top"} <BR/>
 *           - iWidth:  {Number}      Optional PopupWidth: if it passed it is used - Else DEfault is used <BR/>
 *           - iHeight:  {Number}     Optional PopupHeight: if it passed it is Set- Else is automarically calculated <BR/>
 *           - szConfirmLabel:  {String} Label of Confirm Button  <BR/>
 *           - iConfirmWidth:   {Number}  Width of Confirm Button  <BR/>
 *           - szNoLabel:  {String}      Label of No Button  <BR/>
 *           - iNoWidth:   {Number}      Width of No Button  <BR/>
 *           - szNoLabel:  {String}      Label of No Button  <BR/>
 *           - iNoWidth:   {Number}      Width of No Button  <BR/>
 *           - bShowImg:    {Boolean}     true to show Image  (Default=true) <BR/>
 *           - bResize:    {Boolean}     true to allow Resize Dialog  (Default=true) <BR/>
 *           - bModal:    {Boolean}     true=modal (default) <BR/>
 *           - bCloseOnEscape: {Boolean}  Default true    <BR/>
 *          ----------------- ONLY For POPUP_TYPE.CHOICE:  <BR/>
 *           - bChoiceMultiSel: {Boolean}  true if MultiSelect,else single select. Default false <BR/>
 *           - iChoiceMultiSize: {Number}  if bChoiceMultiSel=true:  size (Num item) to display without Scrollbar <BR/>
 *          ----------------- ONLY For POPUP_TYPE.PROMPT:  <BR/>
 *           - szPromptType: {String}  PROMPT_TYPE.NUMBER  PROMPT_TYPE.STRING default=PROMPT_TYPE.STRING        <BR/>
 *           - szPromptLabel: {String}  Label in Front of Prompt   <BR/>
 *           - szPromptValue: {String}  Default Value to set        <BR/>
 *           - iPromptWidth: {Number}  Width (px) of the Prompt Item        <BR/>
 *           - iPromptMin: {Number}   Min (MinValue for PROMPT_TYPE.NUMBER, MinLen for PROMPT_TYPE.STRING)           <BR/>
 *           - iPromptMax: {Number}   Max (MaxValue for PROMPT_TYPE.NUMBER, MaxLen for PROMPT_TYPE.STRING)           <BR/> * 
 *   
 *   
 * @return {Object}  retObj  <BR/>
 *                           Example: <BR/>
 *                           {   <BR/>
 *                             - retBtn {String} POPUP_BTN.CLOSE, POPUP_BTN.CONFIRM, POPUP_BTN.NO, POPUP_BTN.CANCEL <BR/>
 *                             - choiceValue      Only for POPUP_TYPE.CHOICE: Value chosen in selectChoice <BR/>
 *                             - choiceText    Only for POPUP_TYPE.CHOICE: Text chosen in selectChoice <BR/>
 *                             ......          for POPUP_CUSTOM: you can add your personal memeber   <BR/>
 *                           } <BR/>*/
function Popup(szPopupType, szMsgHtml,objOpt){
  return PopupDlgShow (szPopupType,szMsgHtml,objOpt);
}  


/**
 * Show a Popup for Choice with Default Btn: POPUP_BTN.CONFIRM, POPUP_BTN.CANCEL
 * 
 * @param szMsgHtml {String}  HTML TAG are Accepted - Newline if present is converted to HTML Newline
 * @param szChoiceLabel {String} Label of the selectChoice
 * @param arChoice  {Array}    Array to populate the selectChoice: Example <BR/>
 *                               [{value:1,szText:"1 - Not Good",bSel:false},  <BR/>
 *                                  {value:2,szText:"2 - Good",bSel:false}, <BR/>
 *                                {value:3,szText:"3 - Very Good",bSel:true}] <BR/>
 * @param [objOpt]   {Object}    Optional  Option to change Button.   
* @return {Object}  retObj  <BR/>
 *                           Example: <BR/>
 *                           {   <BR/>
 *                             retBtn {String} POPUP_BTN.CLOSE, POPUP_BTN.CONFIRM, POPUP_BTN.CANCEL <BR/>
 *                             choiceSelValue    Value chosen in selectChoice    (valueSel1, valueSel2, .. for MultiSel) <BR/>
 *                             choiceSelText      Text chosen in selectChoice      (textSel1, textSel2,.. for MultiSel) <BR/>
 *                             arChoice          like inpout with the bSel=true/false depending on selected state <BR/>
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



/**
 * Return false to indicate to JSU User that this Popup.js Interface is NOT the IEPopup (that works only in IE) <BR/>
 * The same function is Present in JQPopup/Popup.js where it return true <BR/>
 * This API is used if the html does not know what popup.js interface is loaded by require.js configuration file, where it can be changed because <BR/>
 * both IEPopup/Popup.js and JQPopup/Popup.js share the same interface 
 * 
 * @returns {Boolean}   false to indicate that This popup.js interfaca is not the IEPopup/popup.js 
 */
function isIEPopup(){
	return false;
}


