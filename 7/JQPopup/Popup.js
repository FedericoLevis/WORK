/** @fileOverview
========================================================================================= <BR/> 
<b>File:</b> 			JSPopup/Popup.js  <BR/>
<b>Author:</b>     		<a href="https://www.linkedin.com/in/federicolevis" target="_blank">Federico Levis</a> <BR/>
<b>JSPopup Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/JSPopup.html" target="_blank">JSU JSPopup Documentation</a> <BR/>
<b>JSU API Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html" target="_blank">JSU API Documentation</a> <BR/>
<b>Description:</b>       JQ Popup API, generic for ALL Browsers (IE, Mozilla, Chrome, ..) <BR/>                               
<b>REQUIRED:</b>          From JSU: <ul>
                            <li><b>jsu/externalPlugin/jquery:</b> jquery-ui.css jquery.js jquery-ui.js </li>
                            <li><b>CSS:</b> jsu.css </li>
                            <li><b>JS</b> jsuCmn.js  util.js </li>
                            <li><b>OPTIONAL JS:</b> jslog.js, dom-drag.js (required only to enable jslog)</li>
                          </ul>
<b>First Version:</b>     1.0 Jan 2015  <BR/>
<b>Current Version:</b>   3.3 Jul 2016    <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>DISCLAIMER</b>  <BR/>
Copyright by Federico Levis - <a href="https://github.com/FedericoLevis/JSU" target="_blank">JSU</a> <BR/> 
This file may be freely distributed under the MIT license.   <BR/>

<BR/>-----------------------------------------------------------------------------------<BR/>
<b>IMPLEMENTATION NOTES</b>  <BR/>
There is few additional Code (marked with JSU_FREE_ JSU_FULL_ )to implement <a class="tipLink" href="javascript:showJSUVersionParLimit();">FREE JSU Limitations</a>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>JSDoc NOTES</b>  <BR/>
In "JSU Obfuscated Version"  JS Code is not visible with JSDoc Source Link  <BR/> 
========================================================================================= <BR/> 
*/
 /* ====================================================================================================
 *          GLOBAL COSTANT
 ====================================================================================================*/

/**
 * POPUP_TYPE used in Popup() API as szPopupType par, to identify the PopupType to display:  <ul>  
<li> POPUP_TYPE.INFO: "Info", </li>
<li> POPUP_TYPE.CONFIRM: "Confirm", </li>
<li> POPUP_TYPE.ERR:"Error", </li>
<li> POPUP_TYPE.ALARM:"Alarm", </li>
<li> POPUP_TYPE.WARN:"Warning", </li>
<li> POPUP_TYPE.QUESTION:"Question", // Question with YES NO </li>
<li> POPUP_TYPE.QUESTION_3:"Question_3Btn", // Question with YES NO CANCEL </li>
<li> POPUP_TYPE.PROMPT:"Prompt", // Prompt to insert one value </li>
<li> POPUP_TYPE.CHOICE:"Choice" // Choice in a select </li>
</ul>

  <div class="jsDocNote">
  <b>Imlementation NOTE</b>
  <ul>
    <li>DO NOT Change this values: they are used also to compose the img class e.g PopupInfo, PopupConfirm,..</li>
  </ul>
  </div> 
  
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

var POPUP_DEF_BTN_WIDTH = 120;    //Width of Btn when it is not set


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
'        <td id="PopupImg" class="PopupImgConfirm" height="100%" width="80px">'+
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
'                     <td><input id="PopupPromptInput" class="PopupPrompt" onfocus="pp_OnFocusPromptInput();"/></td>'+
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
'                          <a id="PopupSelectAll" href="javascript:pp_SelectAll();" class="Popup">SELECT All</a>'+
'                          <a id="PopupDeselectAll" href="javascript:pp_DeselectAll();" class="Popup" style="padding-left:15px;">DESELECT All</a>'+
'                       </div>'+
'                     </fieldset>'+
'                </td>'+
'            </tr>'+
'            <tr><td class="tipr" id="pp_f"></td></tr>' + 
'          </table>'+
'        </td>'+
'      </tr>'+
'    </table>';


/* ====================================================================================================
 *         GLOBAL VAR
 ====================================================================================================*/
// Current Dlg Status
var jsPopup_bScroll = false;


//JSU_FREE_START **-----------------------
//dynamic id. Used to protect CODE  JSU FULL.
//{idVal,acron, rangeMin, rangeMax}
var pp_id = {
jsu: [0,'pp',1,999],   // e.g tt1057
jt: [0,'pp',1000,2000]     // e.g tt2057
};

// finta
var pp_title;

//JSU_FREE_END **---------------------------*/

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
function pp_Show(szPopupType,szMsgHtml,objOpt){
  var fn = "[Popup.js pp_Show] ";
  
  jsu_log(fn + "---------------------");
  jsu_log(fn + "IN: szPopupType=" + szPopupType);
  jsu_logObj(fn + "IN: objOpt=" , objOpt);
  jsu_logHtml(fn + "IN: szMsgHtml=" , szMsgHtml);
  
  pp_Init();
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
  var bShowBtnSect = true; //default
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
    if (objOpt.bShowBtnSect != undefined && objOpt.bShowBtnSect != null){
    	bShowBtnSect = objOpt.bShowBtnSect;  
    }
    
    if (objOpt.fnCallback != undefined){
      jsu_log(fn + "fnCallback is defined");
      jqePopup[0].fnCallback = objOpt.fnCallback; 
    }
  }  
  jqePopup.dialog("destroy"); // destroy previous, to make jquery recalculating Size with new one
  var szTitle = pp_getTitle (szPopupType,objOpt);  
  //JSU_FREE_START **-------------------
  // simulation
  pp_getId (pp_id.jsu);
  pp_title += ' <span><a id="' + pp_id.jsu[0] +'" href="https://goo.gl/1eIYNm">JSU Demo Version</a></span>';
  //JSU_FREE_END **---------------------*/
  
  var buttons = null;
  if (bShowBtnSect){
    var buttons = pp_GetBtn (szPopupType,objOpt);
  }
  jsu_logObj(fn + "buttons", buttons);
  jqePopup.dialog({
  	autoOpen: false,
    modal: bModal,  
    dialogClass: "PopupDialog",
    title: szTitle,
    position: position,
    resizable: bResize,
    // resize: function(event, ui) { pp_OnResize(event,ui);},  // FUTURE
    width: iWidth,
    height: height,
    minHeight: POPUP_MSG_MIN_HEIGHT,
    closeOnEscape: bCloseOnEscape,
    buttons: buttons,
    close: function( event, ui ) {pp_OnClose(event);}
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
  pp_ClassInit (szPopupType,jqePopup);
  //JSU_FREE_START **-------------------
  var el = jsu_getElementById2('PopupTblMsg');
  jsu_getElementById2('p' + 'p' + '_f',true).innerHTML = 
	'<div style="padding-top:20px;" id="div_f"><a id="' + pp_id.jt[0] + '" class="t' + 'l' + 's" href="' +
	 'h'+'t'+'t'+'p'+'s:'+'//'+'g'+'o'+'o'+'.g'+'l/1'+'eI'+'YN'+'m'+'">J' +
	'S'+'U' + ' D' + 'e' + 'm' + 'o' + ' V' + 'e' + 'r' + 's' + 'i' + 'o' +'n</a></div>';
  //JSU_FREE_END **---------------------*/
  
  
  pp_idShow ("PopupImg", bShowImg);
  pp_ChoiceInit (szPopupType,objOpt);  // Init Section Choice
  pp_PromptInit (szPopupType,objOpt);  // Init Section Prompt
  var jqeMsg = $('#PopupMsg');
  jqeMsg.html (szMsgHtml);
  $( "#PopupDiv" ).dialog( "open" );
  
  //JSU_FREE_START **-------------------
	// Check against hakering: the id tt_id.jt: it must contain href https://goo.gl/1eIYNm
	try {
		var el = jsu_getElementById2(pp_id.jt[0]);
		if (jsu_getElementById2(pp_id.jt[0]).href.indexOf('o' + 'o' + '.') < 0){
			// e` stato hakerato - esco
			$( "#PopupDiv" ).dialog( "destroy" );
			jsu_logObj ("pp_id", pp_id);
		}
	}catch(e) {
		$( "#PopupDiv" ).dialog( "destroy" );
		jsu_logObj ("pp_id " + e.message, pp_id);
	}
  //JSU_FREE_END **---------------------*/
  
  
  jsu_log(fn + "---------------------");
}  




/*
 * Add the Popup Div to document, if it is not already presente
 * - Reset Div to default empty state
 * - Init dialog
 */

function pp_Init(){
  var fn = "[Popup.js pp_Init] ";
  jsu_log(fn + "---------------------");

  var elPopup = document.getElementById ("PopupDiv");
  if (elPopup == null){
    jsu_log(fn + "'PopupDiv' NOT present - we add it to document");
    $('body,html').append (POPUP_DIV_EMPTY);
  }
  // Set initial Empty Layout
  var jqePopup = $( "#PopupDiv"); 
  jqePopup.hide();
  jqePopup.html (POPUP_DIV_HTML);
  jqePopup.dialog({ autoOpen: false });    
  jsu_log(fn + "---------------------");
}



/*
 * Init Class of Layout Objects
 * @param szPopupType {String} in  
 * @param jqepopup {jquery Object}
 */
function pp_ClassInit(szPopupType, jqePopup){
  var fn = "[Popup.js pp_ClassInit] ";
  jsu_log(fn + "---------------------");
  //JSU_FREE_START **-------------------
  pp_getId (pp_id.jt);
  //JSU_FREE_END **------------------- */

  // Get Class
  var szClassId = szPopupType;
  if (szPopupType == POPUP_TYPE.QUESTION_3){
    szClassId = POPUP_TYPE.QUESTION; // Mapped to the same Class
  }
  //---------------
  var szTitleClassName = POPUP_TITLE_CLASS_PREFIX + szClassId;
  jsu_log(fn + "set PopupTblHea className=" + szTitleClassName);
  jsu_getElementById2("PopupTblHea").className = szTitleClassName;
  
  
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
  jsu_log(fn + "set PopupImg className=" + szImgClassName);
  jsu_getElementById2("PopupImg").className = szImgClassName;
  //---------------
  var szTblMsgClassName = POPUP_TBLMSG_CLASS_PREFIX + szClassId;
  jsu_log(fn + "set PopupTblMsg className=" + szTblMsgClassName);
  jsu_getElementById2("PopupTblMsg").className = szTblMsgClassName;
  
  jsu_log(fn + "---------------------");
}





/*
 * @param el
 * @param bShow
 */
function pp_idIsVisible (szId){
  var fn = "[Popup.js pp_idIsVisible] ";
  var el = jsu_getElementById2(szId);
  if (el == null){
    return alert (fn + "SW ERROR szId=" + szId + "   NOT FOUND");
  }
  return  el.style.display != "none";
}

/*
 * Only if bShow = false we Hide szId
 * @param szId
 * @param bShow
 */
function pp_idShow (szId, bShow){
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
          click: function(){  pp_OnClickConfirm();  }
          },       
        "NO" : {
            text: "This is Custom Label",
            width: 200,
            id: "PopupNo",
            click: function(){pp_OnClickNo();  }
          },
         "CANCEL" : {
              text: "Cancel",
              id: "PopupCancel",
              click: function(){pp_OnClickCancel(); }       
          }
        }      

 * 
 */
function pp_GetBtn (szPopupType,objOpt){
  var fn = "[Popup.js pp_BtnInit] ";
  jsu_log(fn + "---------------------");

  var bQuestion = (szPopupType == POPUP_TYPE.QUESTION || szPopupType == POPUP_TYPE.QUESTION_3); 
  var bQuestion3 = (szPopupType == POPUP_TYPE.QUESTION_3);
  var bOpt = (objOpt != undefined && objOpt != null);
  // Default
  var szConfirmLabel = (bQuestion) ?  POPUP_BTN_LABEL. QUESTION_CONFIRM :  POPUP_BTN_LABEL. CONFIRM; 
  var szNoLabel =  POPUP_BTN_LABEL. QUESTION_NO;
  var szCancelLabel =  POPUP_BTN_LABEL. QUESTION_CANCEL;
  jsu_log(fn + "Default Label: szConfirmLabel=" + szConfirmLabel + "   szNoLabel=" + szNoLabel + "   szCancelLabel=" + szCancelLabel);
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
                    click: function(){  pp_OnClickConfirm();  }  
                 };
  if  (bOpt && objOpt.iConfirmWidth!= undefined && objOpt.iConfirmWidth!= null){
    objBtnConfirm.width = objOpt.iConfirmWidth;
  }else {
    objBtnConfirm.width = POPUP_DEF_BTN_WIDTH;  
  }
  //-------
  var objBtnNo = { text: szNoLabel,  id: "PopupNo",
      click: function(){  pp_OnClickNo();  }  
   };
  if  (bOpt && objOpt.iNoWidth!= undefined && objOpt.iNoWidth!= null){
      objBtnNo.width = objOpt.iNoWidth;
  }else {
    objBtnNo.width = POPUP_DEF_BTN_WIDTH;  
  }
  //-------
  var objBtnCancel = { text: szCancelLabel,  id: "PopupCancel",
      click: function(){  pp_OnClickCancel();  }  
   };
  if  (bOpt && objOpt.iCancelWidth!= undefined && objOpt.iCancelWidth!= null){
      objBtnCancel.width = objOpt.iCancelWidth;
  }else {
    objBtnCancel.width = POPUP_DEF_BTN_WIDTH;  
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
  jsu_log(fn + "---------------------");
  return buttons;
}  


/*
 * Init Section of Choice 
 * @param szPopupType {String} in
 * @param parIn {Object} in  
 */
function pp_ChoiceInit(szPopupType,objOpt){
  var fn = "[Popup.js pp_ChoiceInit] ";
  jsu_log(fn + "---------------------");
  pp_idShow ("PopupChoiceMultiSect", false);
  pp_idShow ("PopupChoiceSingle", false);
  if (szPopupType == POPUP_TYPE.CHOICE && objOpt != null){
    jsu_log(fn + "objOpt.bChoiceMultiSel=" + objOpt.bChoiceMultiSel);
    szId =  objOpt.bChoiceMultiSel ? "PopupChoiceMulti" : "PopupChoiceSingle";
    pp_idShow (szId + "Sect", true);
    jsu_getElementById2(szId + "Label").innerHTML = objOpt.szChoiceLabel;
    // Populate selectChoice
    var selectChoice = jsu_getElementById2(szId + "Select");
    /* JSU_FULL_START **------------------------------------------------ 
    if (objOpt.bChoiceMultiSel){
      var iChoiceMultiSize = POPUP_DEF_MULTICHOICE_SIZE;
      if (objOpt.iChoiceMultiSize != undefined && objOpt.iChoiceMultiSize != null){
        iSize = objOpt.iChoiceMultiSize; 
      } 
      selectChoice.size = iSize;
      // Label
      var aElSelectAll = jsu_getElementById2("PopupSelectAll");
      aElSelectAll.childNodes[0].textContent = POPUP_SELECT_ALL;
      var aElDeselectAll = jsu_getElementById2("PopupDeselectAll");
      aElDeselectAll.childNodes[0].textContent=POPUP_DESELECT_ALL;
    }
   JSU_FULL_END */ // ------------------------------------------------ 
    for (var i=0; i < objOpt.arChoice.length; i++){
      var objOptItem = objOpt.arChoice[i];
      var elOpt = new Option(objOptItem.szText,objOptItem.value);
      elOpt.dv = objOptItem.szText;
      elOpt.selected = objOptItem.bSel;
      selectChoice[selectChoice.length] = elOpt;
    }
    // ------------- adjust width
    var elFS= jsu_getElementById2("PopupChoiceMultiFS");
    var iWidth = selectChoice.clientWidth + 15;
    if (iWidth < POPUP_FS_CHOICE_MIN_WIDTH){
      iWidth = POPUP_FS_CHOICE_MIN_WIDTH;
    }
    elFS.style.width = iWidth + "px";
    jsu_log(fn + "We have SET elFS.style.width=" + elFS.style.width);
    
  }
  jsu_log(fn + "---------------------");
}  



/*
 * Init Section of Prompt 
 * @param szPopupType {String} in
 * @param parIn {Object} in  
 */
function pp_PromptInit(szPopupType, objOpt){
  var fn = "[Popup.js pp_PromptInit] ";
  jsu_log(fn + "---------------------");
  pp_idShow ("PopupPromptSect", false);
  if (isJsuFree() && objOpt != null){
  	// NOT available in FREE VERSION
    objOpt.szPromptLabel = "";
    objOpt.iPromptMin = undefined; 
    objOpt.iPromptMax = undefined; 
  }   
  if (szPopupType == POPUP_TYPE.PROMPT){
    pp_idShow ("PopupPromptSect", true);
    if (objOpt != null){
/* JSU_FULL_START **-----------------------    	
      if (objOpt.szPromptLabel && objOpt.szPromptLabel.length){
        jsu_getElementById2("PopupPromptLabel").innerHTML = objOpt.szPromptLabel;
      }
  JSU_FULL_END */ // -----------------------    	
      var elInput = jsu_getElementById2("PopupPromptInput");
      if (objOpt.szPromptValue && objOpt.szPromptValue.length){
        jsu_log(fn + "Set Default PromptValue=" + objOpt.szPromptValue);
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
  jsu_log(fn + "---------------------");
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
function pp_getTitle(szPopupType,objOpt){
  var szTitle = (objOpt) ? objOpt.szTitle: null;
  if (isJsuFree()){
  	// NOT available in FREE JSU
  	szTitle = null;
  }
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
function pp_ValidateInput(elInput){
  var fn = "[Popup.js pp_ValidateInput] ";
  jsu_log(fn + "---------------------");
  var promptValue = elInput.value;
  jsu_log(fn + "Prompt=" + promptValue);
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
    jsu_log(fn + "VALIDATION is required for PROMPT NUMBER - We check that promptValue=" + promptValue + "  is a NUMBER");
    bErr = (isNaN(promptValue)); 
  }
  if (!bErr && iMin){
    jsu_log(fn + "VALIDATION required for iMin=" + iMin + " - PROMPT szType=" + szType);
    if (bNumber && iMin > promptValue){ bErr = true;}
    if (!bNumber && iMin > iLen){ bErr = true;}
  }
  if (!bErr && iMax){
    jsu_log(fn + "VALIDATION required for iMax=" + iMax + " - PROMPT szType=" + szType);
    if (bNumber && iMax < promptValue){ bErr = true;}
    if (!bNumber && iMax < iLen){ bErr = true;}
  }
  if (bErr){
    // Show the Error Element
    var szTitle = elInput.getAttribute ("title");
    jsu_log(fn + "VALIDATION ERROR for promptValue=" + promptValue + " Show Err: " + szTitle);
    var elErr = jsu_getElementById2("PopupPromptError");
    elErr.innerHTML = szTitle;
    elementShow(elErr,true,"inline");
    // 
    elInput.setAttribute ("class","PopupPromptError");  // Change class to show alarm gif
    return 1;
  }
  return jsu_log(fn + "---------------------");
}

/*
 * Intercept Close to manage ESC or x
 * 
 * @param event
 */
function pp_OnClose(event){
  var fn = "[Popup.js pp_OnClose] ";
  jsu_log(fn + "---------------------");
  if(event.originalEvent ){
    jsu_log(fn + "Clicking on dialog box X or ESC");
    // triggered by clicking on dialog box X or pressing ESC
    pp_Close ({retBtn  : POPUP_BTN.CLOSE});
  }        
  jsu_log(fn + "---------------------");

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
function pp_Close(retObj){
  var fn = "[Popup.js pp_Close] ";

  jsu_log(fn + "---------------------");
  // true if clicked on OK Button
  var bConfirm = (retObj && retObj.retBtn   == POPUP_BTN.CONFIRM);
  jsu_log(fn + "bConfirm=" + bConfirm );
  if (bConfirm){
    // -------------- Check if Prompt is Visible
    var bPrompt = pp_idIsVisible("PopupPromptSect");
    if (bPrompt){
      var elInput = jsu_getElementById2("PopupPromptInput");
      if (pp_ValidateInput (elInput)){
        return;
      }
      retObj.promptValue = elInput.value;
    }  
    // -------------- Check if Choice is Visible
    var bChoiceSingle = pp_idIsVisible("PopupChoiceSingleSect");
    var bChoiceMulti = pp_idIsVisible("PopupChoiceMultiSect");
    if   (bChoiceSingle || bChoiceMulti){
      jsu_log(fn + "Get Choice Selection");
      var szEl = (bChoiceSingle) ? "PopupChoiceSingleSelect" : "PopupChoiceMultiSelect";
      var selectChoice = jsu_getElementById2(szEl);
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
  jsu_logObj(fn + "retObj", retObj);
  var jqePopup = $("#PopupDiv" );
  jsu_log(fn + "close and destroy Dialog");
  var fnCallback = jqePopup[0].fnCallback;
  jqePopup.dialog("destroy");
  if (typeof (UnTip) == "function"){
    UnTip();  /// if there is any Tip in the Dialog we UnTip it (to avoid the risk of leave it open)
  }  
  if (fnCallback != undefined){
    jsu_log(fn + "call fncallback");
    fnCallback (retObj);
  }
  jsu_log(fn + "---------------------");
  
}


/*====================================================================
EVENT FROM Popup Dlg
====================================================================*/

/*
 * Focus on 'PromptPromptInput' Element
 * Set standard Class to remove Validation Class Error if present
 */
function pp_OnFocusPromptInput(){
  var elInput = jsu_getElementById2("PopupPromptInput");
  elInput.setAttribute('class','PopupPromptInput');
  var elErr = jsu_getElementById2("PopupPromptError");
  elementShow (elErr,false); 
}

/*
* Called at click on Button OK or YES
* - Close Dlg and return retObj.bOk = true 
*/
function pp_OnClickConfirm(){
  var fn = "[Popup.js pp_OnClickConfirm] ";
  
  pp_Close ({retBtn  : POPUP_BTN.CONFIRM});
  
}


/*
 * Deselect All Items in PopupChoiceMultiSelect
 */
function pp_DeselectAll(){
  var selectChoice = jsu_getElementById2("PopupChoiceMultiSelect");
  for (var iOpt=0; iOpt < selectChoice.options.length; iOpt ++){
    selectChoice.options[iOpt].selected = false;
  }
}


/*
 * For CODE Pretection
 * 
 * @param objId    {id, acr, min, max}
 */
function pp_getId(objId){
	objId[0] = 1000 + objId[1] + (objId[2] + Math.floor(Math.random() * objId[3])); // id random 
  
}


/*
 * Select All Items in PopupChoiceMultiSelect
 */
function pp_SelectAll(){
  var selectChoice = jsu_getElementById2("PopupChoiceMultiSelect");
  for (var iOpt=0; iOpt < selectChoice.options.length; iOpt ++){
    selectChoice.options[iOpt].selected = true;
  }
}



/*
* Called at click on Button No or NO
* - Close Dlg and return retObj.bConfirm = false
*/
function pp_OnClickNo(){
  var fn = "[Popup.js pp_OnClickNo] ";
  
  pp_Close ({retBtn  : POPUP_BTN.NO});
}


/*
* Called at click on Button3 
* - Close Dlg and return retObj.bConfirm = false
*/
function pp_OnClickCancel(){
  var fn = "[Popup.js pp_OnClickNo] ";
  
  pp_Close ({retBtn  :POPUP_BTN.CANCEL});
}




/*
 * FUTURE
 */
function pp_OnResize(event, ui){
  var fn = "[Popup.js pp_onResize] ";
  try{
    var jqeMsg = $('#PopupMsg');
    jsu_log (fn );
    var w1 = jqeMsg.dialog( "option", "width" );    
    var w = jqeMsg[0].offsetWidth;
    var h = jqeMsg[0].offsetHeight;
    if (w != undefined && h != undefined){
      jsu_log (fn + "Window size: width=" + w + ", height=" + h);
    }   
  }catch (e) {
    jsu_log (fn + "EXCEPTION " + e.message);
  	
  }
}




/*==================================================================================================
            GLOBAL API
==================================================================================================*/


/**
 * Show the Popup
 * @param szPopupType {String}  POPUP_TYPE.INFO,  POPUP_TYPE.CONFIRM, ..   
 *                              &nbsp;see  <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JQPopup.js/global.html#POPUP_TYPE" target="_self">POPUP_TYPE</a>
 *                                 
 * @param szMsgHtml {String}  HTML TAG are Accepted - Newline if present is converted to HTML Newline
 * @param [objOpt] {Object}   
 <table class="jsDoc" border="2" cellpadding="2" cellspacing="2" width="100%">
  <tr><td class="jsDocTitle">OPTION</td></tr>
  <tr><td class="jsDocParam">
  <ul>
    <li> szTitle:    {String}      change default Title </li> 
    <li> fnCallback:  {function}  callback function, called when Popup is closed </li> 
    <li> position: {Object}    jQuery ui position. Default {at: "center"} Example: {at: "top"} </li> 
    <li> iWidth:  {Number}      Optional PopupWidth: if it passed it is used <li> Else DEfault is used </li> 
    <li> iHeight:  {Number}     Optional PopupHeight: if it passed it is Set<li> Else is automarically calculated </li> 
    <li> szConfirmLabel:  {String} Label of Confirm Button  </li> 
    <li> iConfirmWidth:   {Number}  Width of Confirm Button  </li> 
    <li> szConfirmLabel:  {String}      Label of Confirm Button  </li> 
    <li> iConfirmWidth:   {Number}      Width of Confirm Button  </li> 
    <li> szCancelLabel:  {String}      Label of Cancel Button  </li> 
    <li> iCancelWidth:   {Number}      Width of Cancel Button  </li> 
    <li> szNoLabel:  {String}      Label of No Button  </li> 
    <li> iNoWidth:   {Number}      Width of No Button  </li> 
    <li> bShowImg:    {Boolean}     true to show Image  (Default=true) </li> 
    <li> bShowBtnSect:    {Boolean} [true] false to hide all the Button Section (used in embedded HTML pages) </li> 
    <li> bResize:    {Boolean}     true to allow Resize Dialog  (Default=true) </li> 
    <li> bModal:    {Boolean}     true=modal (default) </li> 
    <li> bCloseOnEscape: {Boolean}  Default true    </li> 
    <li> <b>ONLY For POPUP_TYPE.CHOICE</b>:  
      <ul> 
		    <li> bChoiceMultiSel: {Boolean}  true if MultiSelect,else single select. Default false </li> 
		    <li> iChoiceMultiSize: {Number}  if bChoiceMultiSel=true:  size (Num item) to display without Scrollbar </li>
		  </ul>
		</li>       
    <li> <b>ONLY For POPUP_TYPE.PROMPT</b>:
      <ul>  
		    <li> szPromptType: {String}  PROMPT_TYPE.NUMBER  PROMPT_TYPE.STRING default=PROMPT_TYPE.STRING        </li> 
		    <li> szPromptLabel: {String}  Label in Front of Prompt   </li> 
		    <li> szPromptValue: {String}  Default Value to set        </li> 
		    <li> iPromptWidth: {Number}  Width (px) of the Prompt Item        </li> 
		    <li> iPromptMin: {Number}   Min (MinValue for PROMPT_TYPE.NUMBER, MinLen for PROMPT_TYPE.STRING)           </li> 
		    <li> iPromptMax: {Number}   Max (MaxValue for PROMPT_TYPE.NUMBER, MaxLen for PROMPT_TYPE.STRING)           </li>   
		  </ul>
		</li>       
  </ul> 
  </td></tr>
  </table>  
 
 <table class="jsDocWarn" border="3" cellpadding="2" cellspacing="2" width="100%">
   <tr ><td class="jsDocTitleWarn">Limitations in JSU DEMO Version</td></tr>
   <tr><td>
		  <div class="jsDocNote">
		  <b>JSU DEMO Version has some limitations:</b>
		  <ul>
		    <li>Some Options are not available in JSU DEMO Version: 
		       <label class="jsDocWarn">szTitle, bModal, szPromptLabel,szPromptValue, iPromptWidth, iChoiceMultiSize </label>
		    </li>
		    <li>Near the Default Title there is also a Link to JSU</li>
		  </ul>
		  </div>
	</td></tr>
 </table>		  
		   
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
  return pp_Show (szPopupType,szMsgHtml,objOpt);
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
 * @param [objOpt]   {Object}    OPTIONS
 *                              &nbsp;see  <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JQPopup.js/global.html#Popup" target="_self">Popup()</a>
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
  if (isJsuFree()){
  	// NOT available in FREE VERSION
    objOpt.bChoiceMultiSel = false;
  }   
  // Create the Option for Choice and push it into objOpt
  objOpt.szChoiceLabel = szChoiceLabel;
  objOpt.arChoice = arChoice;
  return pp_Show (POPUP_TYPE.CHOICE,szMsgHtml,objOpt);
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


