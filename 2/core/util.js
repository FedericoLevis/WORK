/** @fileOverview
========================================================================================= <BR/> 
<b>File:</b> 			core/util.js <BR/>
<b>Author:</b>     		<a href="https://www.linkedin.com/in/federicolevis" target="_blank">Federico Levis</a> <BR/>
<b>LoadingDiv Doc:</b>   <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/LoadingDiv.html" target="_blank">JSU LoadingDiv Documentation</a> <BR/>
<b>JSU API Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html" target="_blank">JSU API Documentation</a> <BR/>
<b>Description:</b>     common JSU utility API:<ul> 
                            <li> select*    API for select </li>
                            <li> .....    other common API  </li>
                          </ul>  
<b>REQUIRE:</b>            JSU: jslog.js dom-drag.js   <BR/>
<b>First Version:</b>     ver 1.0 - Jul 2007  <BR/>
<b>Current Version:</b>   ver 3.3 - Jul 2016  <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>DISCLAIMER</b>  <BR/>
Copyright by Federico Levis - <a href="https://github.com/JSUtility/JSU" target="_blank">JSU</a> <BR/> 
This file may be freely distributed under the MIT license.   <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>JSDoc NOTES</b>  <BR/>
In "JSU Obfuscated Version"  JS Code is not visible with JSDoc Source Link  <BR/> 
========================================================================================= <BR/> 
*/

// ================================================= LANGUAGE For alert of User Error   (SW ERROR are always in English)
// can be change with utilSetLanMsg

var SW_DEBUG_ENABLE = 1;  // 1 during SW DEBUG 

var LAN_MSG_EN = "EN";
var LAN_MSG_ITA = "ITA";
var lan_msg = LAN_MSG_EN; 


// per funzioni arPmt
var SELECT_VALUE_ID_SEP = ".";  // separator between ID in a select
var SELECT_NOVALUE_SEL = "-1";
//------------
var TAG_SELECT = "SELECT";

//Prefix used by Cognos
var ID_PREFIX_SELECT  = "selectList";

// Optionally you can add a Div with a loading Image, that you can show/hide during long operation with setLoading API
var ID_DIV_LOADING_IMG = "jsuLoading";

//navigator.appName  values
var APP_NAME_FIREFOX="Netscape";   // FIREFOX
var APP_NAME_IE="Microsoft Internet Explorer";   // IE


//'&nbsp;'    CODE
var NBSP_CODE = 160;

// Default number separators
var DEF_COGNOS_GROUP_SEP = ",";
var DEF_COGNOS_DECIMAL_SEP = ".";

//Used in inputxxxxChecked ,..
var VAL_CB_CHECKED = "1";
var VAL_CB_UNCHECKED = "0";


var BROWSER_TYPE ={
	IE: "IE",
	FIREFOX: "FIREFOX",
	OTHER: "OTHER"
};



//**************************************************************************
//			    ERROR WARN  FUNCTIONS
//**************************************************************************


function obj2Html(obj){
	var szHtml = JSON.stringify(obj,null,4);	
	szHtml = replaceAll (szHtml,"\n","<BR/>");
	return replaceAll (szHtml,"    ","&nbsp;&nbsp;");
	
}




/**
 * 
 * @param szMsgHtml
 * @returns  szMsg in Text Format, that can be displayed by alert
 */
function msgHtml2Str(szMsgHtml){

  // -------  \n   instead of specific TAG  
  var szMsg=  szMsgHtml.replace(/<BR\/>/gi, '\n'); 
  szMsg=  szMsg.replace(/<ul/gi, '\n<ul');
  // BUllet
  szMsg=  szMsg.replace(/<li>/gi, ' \u2022 '); 
  szMsg=  szMsg.replace(/<li /gi, ' \u2022 <li '); 
  szMsg=  szMsg.replace(/<\/li>/gi, '\n'); 
  szMsg=  szMsg.replace(/<\/ul>/gi, '\n'); 
  // Table
  // Table Header
  szMsg=  szMsg.replace(/<th /gi, '\n<th '); 
  szMsg=  szMsg.replace(/<th>/gi, '\n<th>'); 
  // Table Row
  szMsg=  szMsg.replace(/<tr /gi, '\n \u2024 <tr '); 
  szMsg=  szMsg.replace(/<tr>/gi, '\n \u2024 '); 
  szMsg=  szMsg.replace(/<\/td>/gi, ' - '); 
  // var szMsg=  szMsg.replace(/<(?:.|\n)*?>/gm, ''); 
  szMsg=  szMsg.replace(/<[^>]*>?/gm, '');
  
  var arLetter = ['a','A','e','E','u','U','o','O','i','I'];
  var arType =["grave", "acute", "tilde", "dierese"];
  for (var iLetter=0; iLetter < arLetter.length; iLetter ++){
    for (var iType=0; iType < arType.length; iType ++){
  	  var szFrom = "&" + arLetter[iLetter] + arType[iType] + ';';
  	  var szTo = arLetter[iLetter] + "`";
  	  //  E.G: szMsg=  strReplaceAll(szMsg,"&ograve;", "o`");
  	  szMsg =  strReplaceAll (szMsg,szFrom, szTo);
    }  
  }
  return szMsg;
}




/**
 * Replace strange char to allow display as Text
 * 
 * @param szStr
 * @returns  szStr without Strange Char
 */
/*  UNDER WORK
 *  
function str2DisplayText(szStr){
	var szStr2 =szStr;
	var ar2Replace = [[/À/g,"\A`"], [/à/g,"a`"],
							[/[ÀÁÂÃÅ]/g,"\A`"],
	                  [/è/g,"e`"],
	                  [/ì/g,"i`"],
	                  [/ò/g,"o`"],
	                  [/ù/g,"u`"] 
	                  ];
	for (var i=0;i<ar2Replace.length; i++){
	  var szPatt = new RegExp(ar2Replace[i][0]);
		szStr2 = szStr2.replace (szPatt,ar2Replace[i][1]);
	}
  return szStr2;
}
*/



/*-----------------------------------------------------------
Check if Popup function is defined (e.g IEPopup.js is loaded) 
      RETURN
true if Popup function is defined      
-----------------------------------------------------------*/
function popupIsDefined (){

  return (typeof (Popup) == 'function'); 
}


/*-----------------------------------------------------------
Show an alert and return iRetVal
      PAR
szMsgHtml  in    Msg to show  Can contain also Html Tag
iRetVal    in 
      RETURN
iRetVal
-----------------------------------------------------------*/
function showAlert(szMsgHtml, iRetVal){
	alert (msgHtml2Str(szMsgHtml));
	return iRetVal;
}


/*-----------------------------------------------------------
Show a Info 
@param szMsgHtml  in    Msg to show  Can contain also Html Tag
@param [objOpt]  {Object}   Optional Object for Popup API if used    
-----------------------------------------------------------*/
function showInfo (szMsgHtml, objOpt){
    jslog(JSLOG_INFO,szMsgHtml) ;
    if (popupIsDefined()){
    	Popup (POPUP_TYPE.INFO,szMsgHtml,objOpt);
    }else {
     	showAlert (szMsgHtml,0);
    }
}


/*-----------------------------------------------------------
Show a Warning and return iRetVal
@param szMsgHtml  in    Msg to show  Can contain also Html Tag
@param iRetVal   in    Value to Return
@param [objOpt]  {Object}   Optional Object for Popup API if used    
@return iRetVal
-----------------------------------------------------------*/
function showWarn (szMsgHtml,iRetVal, objOpt){
    jslog(JSLOG_INFO,szMsgHtml) ;
    if (popupIsDefined()){
    	Popup (POPUP_TYPE.WARN,szMsgHtml, objOpt);
    }else {
     	showAlert (szMsgHtml,iRetVal);
    }
    return iRetVal;
}




/*-----------------------------------------------------------
Show an Error and return iRetVal
      PAR
@param szMsgHtml  in    Msg to show  Can contain also Html Tag
@param [iRetVal] {NUmber}  [1]  in    Value to Return
@param [objOpt]  {Object}   Optional Object for Popup API if used    
@return iRetVal
-----------------------------------------------------------*/
function showErr (szMsgHtml, iRetVal, objOpt){
  jslog(JSLOG_ERR,szMsgHtml) ;
  if (iRetVal == undefined){
  	iRetVal =1;
  }
  if (popupIsDefined()){
  	Popup (POPUP_TYPE.ERR,szMsgHtml,objOpt);
  }else {
   	showAlert (szMsgHtml,iRetVal);
  }
  return iRetVal;
}



/*-----------------------------------------------------------
8.4 Show an Error if required (bShowErr = true)
      PAR
bShowErr  in    true if I want to show Error
                false if don't want to show Error
szMsgErr  in    Msg to show
iRetVal   in    Value to Return
      RETURN
iRetVal
-----------------------------------------------------------*/
function showErrIfRequired (bShowErr,szMsgErr,iRetVal){
    if (bShowErr){
        showErr (szMsgErr,iRetVal);
    }
    return iRetVal;
}





/**
 * TBD: TO BE VERIFIED for Chroom
 * @returns {String}    BROWSER_TYPE.IE, BROWSER_TYPE.FIREFOX, BROWSER_TYPE.OTHER
 */
function getBrowser(){
  var Fn = "[Popup.js PopupGetBrowser] ";
  
  var szAppName = navigator.appName;
  var szBrowser = BROWSER_TYPE.OTHER; 
  // if (navigator.appName == APP_NAME_FIREFOX ){
  if	(typeof InstallTrigger !== 'undefined'){
    szBrowser = BROWSER_TYPE.FIREFOX;
  } else  if  ((navigator.appName == APP_NAME_IE) || 
      ((navigator.appName == APP_NAME_IE_11) && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))){ 		
    szBrowser = BROWSER_TYPE.IE;
  }  
  jslog(JSLOG_TEST,Fn + "szBrowser=" + szBrowser + " -  navigator.appCodeName=" + navigator.appCodeName + "  navigator.appName=" + navigator.appName);
  return szBrowser;
}



/*-----------------------------------------------------------
Check if the Current Browser is  Firefox
      RETURN
true  is Mozilla Firefox
false it is not Mozilla Firefox
-----------------------------------------------------------*/
function isFirefox()
{
  return (getBrowser() == BROWSER_TYPE.FIREFOX);
}








/*-----------------------------------------------------------
Check if the Current Browser is  IE
      RETURN
true  is IE
false it is not IE
-----------------------------------------------------------*/
function isIE()
{

  return (getBrowser() == BROWSER_TYPE.IE);
}


//DAFARE portare in util.js e mettere warining se non c'e` la var con Popup che dice NOn supportata nella Demo versione
//fare anche quella che fa Object
function cookieSetVar(szCookieName, szCookieValue) {
document.cookie = szCookieName + "=" + szCookieValue;
alert ("document.cookie=" + document.cookie);
}

function cookieGetVar(szCookieName) {
var name = szCookieName + "=";
alert ("document.cookie=" + document.cookie);
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) {
   var c = ca[i];
   while (c.charAt(0)==' ') c = c.substring(1);
   if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
}
return "";
}

//**************************************************************************
//			    Get Element
//**************************************************************************

/*-----------------------------------------------------------
Get Element By ID and Show Error if required
      PAR
Id        in
[bShowErr]  in   true (default) if I want to show Error
                false if don't want to show Error
      RETURN
el  if founded
0   if not founded
-----------------------------------------------------------*/
function getElementById2(Id,bShowErr)
{
	if (bShowErr == undefined){
		bShowErr = false;
	}
    var el = 	document.getElementById(Id);
    if (el == null) {
        if (bShowErr && SW_DEBUG_ENABLE){
        	// TODO some problem with IE Debugger
          alert("SW ERROR [util.js getElementById2] NOT FOUND Id=" +  Id) ;
        }
        return 0;  // Not Found
    }
    return el;
}



/*-----------------------------------------------------------
Get Element By ID and Show Error if required
      PAR
Id        in
bShowErr  in    true if I want to show Error
                false if don't want to show Error
Fn     	in      Fn calling, to be added in ErrMsg         
      RETURN
el  if founded
0   if not founded
-----------------------------------------------------------*/
function getElementById3(Id,bShowErr,Fn)
{
    var el = document.getElementById (Id);
    if (el == null) {
        if (bShowErr){
            showErr("SW ERROR [util.js getElementById3] NOT FOUND Id=" +  Id) ;
        }
        return 0;  // Not Found
    }
    return el;
}





/*
8.4 return el or 0 if not found and show Error if it not found
*/
/*
function getElementById(Id)
{
    return getElementById2(Id,true);
}
*/

function getElementByTag2(szTag,szSpanId,bShowErr)
{
    return getElementBySpanId2(szSpanId,szTag,bShowErr);
}



function getFirstFsByBlock(szBlock,bShowErr)
{
    var Fn = "[util.js getFieldset2] ";
    var block = getElementById2 (szBlock,bShowErr);
    if (!block){
    	return 0;
    }
    // Get List of all elements with tag
    try {
        var fsList = block.getElementsByTagName("FIELDSET");
        if (!fsList.length){
        	return 0;
        }
        return fsList[0];
        } catch (e){}
  if (bShowErr) {
    jslog(WARNING,Fn + "NOT FOUND FiledSet in Block=" + szBlock);
  }
}



/*-----------------------------------------------------------
Get a DOM element of a specific Tag using the SpanId of the Span that is before the element
      PAR
szSpanId    in
szTag       in    e.g "INPUT", "SELECT",..
bShowErr  in    true if I want to show Error
                false if don't want to show Error
      RETURN
DomEl  if found
0   if not found

-----------------------------------------------------------*/
function getElementBySpanId2(szSpanId, szTag, bShowErr)
{
    if(szTag.toLowerCase()=="button"){
	    var button = getButtonBySpanId2(szSpanId, bShowErr);
		if(button) return button;
	}
    var Fn = "[util.js getElementBySpanId2] ";
    // jslog(JSLOG_JSU, Fn + JSLOG_FUN_START);
    var SpanEl = document.getElementById (szSpanId);
    if (SpanEl == null) {
        return showErrIfRequired (bShowErr,Fn + " NOT FOUND SpanId=" +  szSpanId,0);
    }
    // Get List of all elements with tag
    var ElList = SpanEl.getElementsByTagName(szTag);

    if (ElList == null  || !ElList.length) {
        return showErrIfRequired (bShowErr,Fn + " NOT FOUND Elements with Tag=" + szTag +  " for SpanId=" +  szSpanId,0);
    }
    var El = ElList[ElList.length-1];
    // jslog(JSLOG_JSU, Fn + "IN: SpanId=" + szSpanId + " Tag=\"" + szTag + "\"" +  "  OUT: El  Id=" + El.id  + "  Name=" + El.name);
    // jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
    return El;
}

/*-----------------------------------------------------------
Get a DOM element of a specific Tag and Clas using the SpanId of the Span that is before the element
      PAR
szSpanId    in
szTag       in    e.g "INPUT", "SELECT",..
szClass     in    e.g 'clsSelectDateEditBox'    to get the INPUT that show the Date in a pickdateControl
bShowErr  in    true if I want to show Error
                false if don't want to show Error
      RETURN
DomEl  if found
0   if not found

-----------------------------------------------------------*/
function getElementOfClassBySpanId2(szSpanId, szTag, szClass, bShowErr)
{
    var Fn = "[util.js getElementOfClassBySpanId2] ";
    // jslog(JSLOG_JSU, Fn + JSLOG_FUN_START);
    var SpanEl = document.getElementById (szSpanId);
    if (SpanEl == null) {
        return showErrIfRequired (bShowErr,Fn + " NOT FOUND SpanId=" +  szSpanId,0);
    }
    // Get List of all elements with tag
    var ElList = SpanEl.getElementsByTagName(szTag);

    if (ElList == null  || !ElList.length) {
        return showErrIfRequired (bShowErr,Fn + " NOT FOUND Elements with Tag=" + szTag +  " for SpanId=" +  szSpanId,0);
    }
    // look for class
    var bFound = false;
    var El = 0;
    for (var i=0; !bFound && i< ElList.length; i++){
      El = ElList[i];
      if (El.className == szClass){
      	bFound = true;
      }
    }
    if (!bFound){
      return showErrIfRequired (bShowErr,Fn + " NOT FOUND Elements with Tag=" + szTag +  " and Class=" + szClass + " for SpanId=" +  szSpanId,0);
    }
    // jslog(JSLOG_JSU, Fn + "IN: SpanId=" + szSpanId + " Tag=\"" + szTag + "\"" +  "  OUT: El  Id=" + El.id  + "  Name=" + El.name);
    // jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
    return El;
}


/*-----------------------------------------------------------
Get a Block using the SpanId of the Span that is before the element
      PAR
szSpanId    in
bShowErr  in    true if I want to show Error
                        false if don't want to show Error
      RETURN
BlockEl  if founded
0   if not founded
-----------------------------------------------------------*/
function getBlockBySpanId2(szSpanId, bShowErr)
{
  var Fn = "[util.js getBlockBySpanId2] ";

  var span = getElementById2(szSpanId, bShowErr);
  if (!span ){
    return 0;
  }
  return span.firstChild;	
}



function getButtonBySpanId2(szSpanId,  bShowErr)
{
    var Fn = "[util.js getButtonBySpanId2] ";
    jslog(JSLOG_JSU, Fn + JSLOG_FUN_START);
    jslog(JSLOG_JSU, Fn + "IN: SpanId=" + szSpanId +  "\"");
    var SpanEl = document.getElementById (szSpanId);
    if (SpanEl == null) {
        return showErrIfRequired (bShowErr,Fn + " NOT FOUND SpanId=" +  szSpanId,0);
    }
    // Get List of all elements with tag
	
    var ElList = SpanEl.getElementsByTagName("INPUT");
    if (ElList == null  || !ElList.length) {
	   ElList = SpanEl.getElementsByTagName("BUTTON");
    }

    if (ElList == null  || !ElList.length) {
        return showErrIfRequired (bShowErr,Fn + " NOT FOUND Elements with Tag=INPUT/BUTTON for SpanId=" +  szSpanId,0);
    }
	for(var i = 0; i < ElList.length; i++)
    {
        try{
            if(ElList[i].type.toLowerCase() == "button"){
                jslog(JSLOG_JSU,Fn + "OUT: El  Id=" + ElList[i].id  + "  Name=" + ElList[i].name);
                return ElList[i];
            }
        }
        catch(err){
        }
    }
    showErrIfRequired (bShowErr,Fn + " NOT FOUND Button for SpanId=" +  szSpanId,0);
    return 0;	
}


/*
 * @param Caption
 * @param bShowErr
 * @returns
 */
function getFieldset2(Caption,bShowErr)
{
    var Fn = "[util.js getFieldset2] ";
    // Get List of all elements with tag
    try {
        var o = document.getElementsByTagName("FIELDSET");
        // jslog(JSLOG_JSU,Fn + "getFieldset o.length=" + o.length);
        for (var i=0; i<o.length; i++) {
            var el = o[i];
            var firstChild = el.firstChild;  //legend
            if (firstChild) {
                // Look for  "fieldSetCaption" "LEGEND"
                var TagName = firstChild.tagName;
                if (TagName == "LEGEND"){
                    // var TextContent = String(firstChild.textContent);
                    var CurCaption = String(firstChild.innerHTML);
                    if (CurCaption.split(Caption).length > 1) {
                        jslog(JSLOG_JSU,Fn + "FOUND  Caption=" + Caption +  " in textContent=" + CurCaption) ;
                        return o[i];   // N.B: if return el is wrong, all point to the same!
                    }
                }
            }

        }
    } catch (e){}
    if (bShowErr) {
        jslog(WARNING,Fn + "NOT FOUND Caption=" + Caption);
    }
    return 0;
}


/**
 * get FieldSet by Caption
 * @param Caption
 * @returns {Object}
 */
function getFieldset(Caption)
{
    return getFieldset2(Caption,false);

}

//**************************************************************************
//			locale
//**************************************************************************



/*-------------------------------------------------------------
Return Group Separator  used for Current locale
    RETURN
e.g    ","
--------------------------------------------------------------*/
function localeGetGroupSep()  {
    var Fn = "[util.js localeGetGroupSep] ";
    //jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
    var Num=1234;
    var NumStr=Num.toLocaleString();
    var Sep = NumStr.charAt(1);
    if (Sep == "2"){
        Sep = ""; // Group separator can be absent
    }
    jslog(JSLOG_JSU,Fn + "GroupSeparetor=" + Sep);
    return Sep;

}



/*-------------------------------------------------------------
Return Decimal Separator t used for Current locale
    RETURN
e.g    "."
--------------------------------------------------------------*/
function localeGetDecimalSep()  {
    var Fn = "[util.js localeGetDecimalSep] ";
    var Num=1.23;   // this is always a number with decimal
    var NumStr=Num.toLocaleString();
    var Sep = NumStr.charAt(1);
    if (Sep == "2"){
        Sep = "."; //default
        jslog(JSLOG_ERR,Fn + "DecimalSeparetor NOT found. Used default = " + Sep);
    }
    jslog(JSLOG_JSU,Fn + "DecimalSeparetor=" + Sep);
    return Sep;
}

//**************************************************************************
//			Conversion
//**************************************************************************




/*-------------------------------------------------------------
Replace all occurrences of from with to
@param szOrig in
@param from in   e.g  "&nbsp;"
@param to   in   e.g " " 
@return 
--------------------------------------------------------------*/
function strReplaceAll (szOrig,szFrom,szTo){
	var szNew = szOrig;
	while (szNew.indexOf(szFrom) >=0){
		szNew = szNew.replace (szFrom,szTo);
	}
	return szNew;	
}






/*-------------------------------------------------------------
8.4
    PARAMETER
NumStr        in    e.g  "1,234.56"
GroupSep      in    e.g  ","
DecimalSep    in    e.g  "."
    RETURN
Float       e.g 1234.55
--------------------------------------------------------------*/
function str2Num(NumStr,GroupSep,DecimalSep)
{
    NumStr2 = NumStr;
    if (typeof(GroupSep) != 'undefined'  &&  GroupSep.length){
        while (NumStr2.indexOf(GroupSep) > -1){
            NumStr2 = NumStr2.replace(GroupSep,"");
        }
    }

    // Replace DecimalSeparetor with "."
    if (typeof(DecimalSep) != 'undefined'  && DecimalSep != "."){
        NumStr2 = NumStr2.replace(DecimalSep,".");
    }
    Num = parseFloat(NumStr2);
    if (isNaN(Num)) Num = 0;
    return Num;
}



/**
 * @param iNum 			e.g    123
 * @param szPad			"0"
 * @param iLenWithPad	5 
 * @returns  "00123
 */
function num2StrPad(iNum,szPad, iLenWithPad) {
  var iZeroPad = iLenWithPad - iNum.toString().length + 1;
  return Array(+(iZeroPad > 0 && iZeroPad)).join("0") + iNum;
}	  



/*-------------------------------------------------------------
8.4  Get String from Cognos Text.
For example convert "&nbsp;" into " "
&nbsp; is the entity used to represent a non-breaking space
    PAR
Text        in    e.g  "NNN&nbsp;dd,&nbsp;yyyy&nbsp;HH:mm"

    RETURN
String       e.g "NNN dd, yyyy HH:mm"
--------------------------------------------------------------*/
function html2Str(Text)
{
    var Fn = "[util.js html2Str] ";
    var Text2 = new String("");
    // replace "&nbsp;" with " "

    
    // First we try with String
    Text=strReplaceAll(Text,"&nbsp;"," ");
    // Second: Try to Replace The Single CODE
    for (var i=0; i < Text.length; i++){
        var Code = Text.charCodeAt(i);
        var Ch= Text.charAt(i);
        if (Code == NBSP_CODE){
          // jslog(JSLOG_JSU,Fn + "Found " + Code+ "  at pos=" + i);
            // it is '&nbsp;'
          Ch=' ';
        }
        Text2 = Text2 + Ch;
    }
    // jslog(JSLOG_JSU,Fn + "IN=" + Text + "  OUT=" + Text2);
    return Text2;
}



/* ====================================================================================================================
 *  							Object  Serialize - Deserialize
 ==================================================================================================================== */

/*-----------------------------------------------------------
Serialize an object into a String
NOTE: Use objDeserialize to get the object from String
@param obj		{Object}   in   The object to serialize
		EXAMPLE
obj.objFilterR.bTensioneDis=false 
obj.objFilterR.iBloccoEnNum=1 
obj.objFilterR.szIsoDataDa":"2016-01-01"

obj will be serialized as: {"objFilterR":{"bTensioneDis":false,"iBloccoEnNum":1,"szIsoDataA":"2016-02-23"}}
------------------------------------------------------------*/
function objSerialize(obj) {
	
	return JSON.stringify(obj,null,0);
}


/*-----------------------------------------------------------
Deserialize an object that was serialized  with objSerialize 
@param    szObj {String} in		Example: {"objFilterR":{"bTensioneDis":false,"iBloccoEnNum":1,"szIsoDataA":"2016-02-23"}}
@return 	obj		{Object} The object that was serialized into szobj
------------------------------------------------------------*/
function objDeserialize(szObj) {
	var obj;
	
	if (szObj == undefined || szObj.length == 0){
		obj = new Object(); // Empty Object
	}else {
		obj = JSON.parse(szObj);
	}
	return obj;
}

/*-----------------------------------------------------------
Serialize an object into a String and then Encode it into URI 
NOTE: Use objFromURI to get the object from URI
@param obj		{Object}   in   The object to serialize  Es  {szAlertType='Info',.....}
@return szObjURIQueryString   es ?%7B%22szAlertType%22%3A%22Info.......
------------------------------------------------------------*/
function obj2URI(obj) {
	
	return  encodeURIComponent(objSerialize(obj));
}


/*-----------------------------------------------------------
Deserialize an object that was serialized and Encoded into URI  with obj2URI 
@param    szObj {String} in		Example: '{"szAlertType"="Info",.....}' 
@return 	obj		{Object} The object that was serialized into szobj.   Ex: {szAlertType='Info',.....}
------------------------------------------------------------*/
function objFromURI(szObjURI) {
	var Fn = "[util.js objFromURI]";
	var obj;
	
	var szObj = szObjURI;
	if (szObj == undefined || szObj.length == 0){
		obj = new Object(); // Empty Object
	}else {
		var szObj = decodeURIComponent(szObjURI);
		obj = objDeserialize(szObj);
	}
	// alert (Fn + "obj=" + JSON.stringify(obj,null,0));
	return obj;
}


/*-----------------------------------------------------------
Serialize an object into a String and Encode it into URI QuesryString 
NOTES: 
  - like obj2URI with also ? added ad the beginning
  - Use objFromURIQueryString to Get the Object
@param obj		{Object}   in   The object to serialize  Es  {szAlertType='Info',.....}
@return szObjURIQueryString   e.g. ?%7B%22szAlertType%22%3A%22Info.......
------------------------------------------------------------*/
function obj2URIQueryString(obj) {
	
	var szObjURI = encodeURIComponent(objSerialize(obj));
	if (szObjURI.length){
		return "?" + szObjURI; 
	}else {
		return ""; 
	}
}


/*-----------------------------------------------------------
Deserialize an object that was serialized and Encoded into URI  with obj2URI 
@param    szObjURIQueryString   e.g. ?%7B%22szAlertType%22%3A%22Info.......
@return 	obj		{Object} The object that was serialized into szobj.   Ex: {szAlertType='Info',.....}	
								null if Error or szObjURIQueryString Empty 
------------------------------------------------------------*/
function objFromURIQueryString(szURIQueryString) {
	var obj;
	
	if (szURIQueryString.length){
		return objFromURI(szURIQueryString.substr(1));
	}else{
		return null; 
	}
}



//**************************************************************************
//				SELECT FUNCTION
//**************************************************************************


/* --------------------------------------------------------------------------------
Get Index of First Opt with Value Containing szValue
   PAR
Select      in    
szValue     in value to Find
   RETURN 
-1   if Not Found Not Found (or Error)
0.. Index of First Opt Containing Value
-------------------------------------------------------------------------------- */
function selectGetFirstIndWithVal(Select,szValue)
{
  var Fn = "[util.js selectGetFirstIndWithVal] ";
  if (!Select){
    jslog(JSLOG_JSU,Fn + " Select is NULL!");
    return -1;
  }

  for (i=0; i < Select.options.length ;  i++) {
    Opt = Select[i];
    if (Opt.value.indexOf(szValue) > -1){
      jslog(JSLOG_JSU,Fn + " Value=" + szValue + "  First contained in opt[" + i + "]");
      return i;  
    }
  }
  jslog(JSLOG_JSU,Fn + " Value=" + szValue + "  is not contained in any opt of select");
  return -1;  
}

/* --------------------------------------------------------------------------------
populate ArOpt with all the Option of a select 
   PAR
Select      in    
ArOpt      in/out Array of cOpt
   RETURN 
-1   if Not Found Not Found (or Error)
N  Number of Optiion (ArOpt Size)
-------------------------------------------------------------------------------- */
function select2ar(Select,ArOpt)
{
  var Fn = "[util.js select2ar] ";
  // Clear ArOpt
  for (i = 0; i < ArOpt.length; i++){
    ArOpt.pop();
  }  
  if (!Select){
    jslog(JSLOG_JSU,Fn + " Select is NULL!");
    return -1;
  }
  for (i=0; i < Select.options.length  ; i++) {
    Opt = Select[i];
    ArOpt[i] = new cOpt(Opt.text,Opt.value);
  }  
  return  ArOpt.length;
}


/* --------------------------------------------------------------------------------
populate ArOpt with the Option of a select starting from iStartInd
   PAR
Select          in    
iSelectStartInd in 
_ArOpt          out Array of cOpt
   RETURN 
-1   if Not Found Not Found (or Error)
N  Number of Option (ArOpt Size)
-------------------------------------------------------------------------------- */
function select2arFromInd(Select,iSelectStartInd,_ArOpt)
{
  var Fn = "[util.js select2arFromInd] ";
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  jslog(JSLOG_JSU,Fn + " IN iSelectStartInd=" + iSelectStartInd);
  // Clear ArOpt
  for (i = 0; i < _ArOpt.length; i++){
    _ArOpt.pop();
  }  
  if (!Select){
    jslog(JSLOG_JSU,Fn + " Select is NULL!");
    return -1;
  }
  for (iAr=0, i=iSelectStartInd; i < Select.options.length  ; i++, iAr++) {
    Opt = Select[i];
    _ArOpt[iAr] = new cOpt(Opt.text,Opt.value);
    
  }  
  jslog(JSLOG_JSU,Fn + " RETURN _ArOpt.length=" + _ArOpt.length);
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
  return  _ArOpt.length;
}

/* --------------------------------------------------------------------------------
populate ArOpt with the Option of a select Till iEndInd  (With also iSelectEndInd)
   PAR
Select          in    
iSelectEndInd 	in 
_ArOpt          out Array of cOpt
   RETURN 
-1   if Not Found Not Found (or Error)
N  Number of Option (ArOpt Size)
-------------------------------------------------------------------------------- */
function select2arTillInd(Select,iSelectEndInd,_ArOpt)
{
  var Fn = "[util.js select2arFromInd] ";
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  jslog(JSLOG_JSU,Fn + " IN iSelectEndInd=" + iSelectEndInd);
  // Clear ArOpt
  for (i = 0; i < _ArOpt.length; i++){
    _ArOpt.pop();
  }  
  if (!Select){
    jslog(JSLOG_JSU,Fn + " Select is NULL!");
    return -1;
  }
  for (iAr=0, i=0; (i < Select.options.length && i <= iSelectEndInd)  ; i++, iAr++) {
    Opt = Select[i];
    _ArOpt[iAr] = new cOpt(Opt.text,Opt.value);
    
  }  
  jslog(JSLOG_JSU,Fn + " RETURN _ArOpt.length=" + _ArOpt.length);
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
  return  _ArOpt.length;
}





/* --------------------------------------------------------------------------------
Get Number of Selected Items in Select
   PAR
Select in    
   RETURN 
N    Number of Itemns selected
0    No Items Selected
-1   if Select Not Found (or Error)
-------------------------------------------------------------------------------- */
function selectGetSelectedNum(Select)
{
  var Fn = "[util.js selectGetSelectedNum] ";
  if (!Select){
    jslog(WARNING,Fn + " Select is NULL!");
    return -1;
  }
  var iSelNum=0;
  var iOptNum=Select.options.length;
  for (var i=0; i < iOptNum; i++) {
    var Opt = Select[i];
    if (Opt.selected){ 
      iSelNum++;
 	  }
  }
  return iSelNum;
}


/*
Look for value in select and return relative text. If not found set to DefText
      PAR
Select    i     sel object
Value     i     String that identify value
DefText   i     Default Value to return if not found Value
*/
function selectGetTextFromValue(Select,Value,DefText)
{
    var Fn = "[util.js selectGetTextFromValue] ";
    //jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
    if (!Select){
        jslog(JSLOG_JSU,Fn + " Select is NULL - RETURN DefText=" + DefText);
        return DefText;
    }
    // jslog(JSLOG_JSU,"[util.js selectGetTextFromValue]  size=" + Select.options.length);
    for (var i=0; i < Select.options.length; i++) {
        var CurValue = html2Str (Select[i].value);
        if (CurValue == Value) {
            var CurText = html2Str (Select[i].text);
            jslog(JSLOG_JSU,Fn + "Value=" +Value + "  FOUND - RETURN Text=" + CurText);
            return CurText;
        }
    }
    // It is not an Error, it is allowed. return DefText
    jslog(JSLOG_JSU,Fn + " Value=" +Value + "  NOT FOUND - RETURN DefText=" + DefText);
    return DefText;

}




/*==================================================================
Remove All Option (Items)
==================================================================*/
function selectRemoveAllOption(Select)
{
  if (Select != 0){
    for (i = Select.length - 1; i >= 0; i--) {
       Select[i] = null;
    }
  }
}  


/*==================================================================
Remove All Option (Items), preserving First N
==================================================================*/
function selectRemoveOption(Select,iPreserveFirstN)
{
  if (Select != 0){
    for (i = Select.length - 1; i >= iPreserveFirstN; i--) {
       Select[i] = null;
    }
  }
}  


/* 8.4
Look for first occurence of Value in a select and select it if found
   RETURN
SelIndex  if found and selected
-1   if Not Found
*/
function selectSelValue(Select,Value)
{
    var Fn = "[util.js selectSelValue] ";
    if (!Select){
        jslog(WARNING,Fn + " Select is NULL!");
        return -1;
    }
    for (var i=0; i < Select.options.length; i++) {
        var Opt = Select[i];
        var CurValue = html2Str (Opt.value );
        if (CurValue == Value) {
            // jslog(JSLOG_JSU,Fn + " Found Value=" + Value + "  in " + Select.name + "   Text=" + Opt.text + "\nRETURN SelInd=" + i);
            Opt.selected = true;
            Select.selectedIndex = i;
            return i;
        }
    }
    // This is not an Error: if I try to select a value not present I simply trace it and return -1
    jslog(JSLOG_JSU,Fn + " NOT FOUND Value=" + Value + "  in " + Select.name);
    return -1;
}


// if Select != 0 Remove first 2 elements (dded by Cognos), only if they are present
function selectRemoveCognosEl(Select)
{
    removeExtraItems(Select);
    /*
    if (Select){
        Select.remove(1);
        Select.remove(0);        
        Select.removeAttribute("hasLabel");       
    }
    */
}

/* 8.4
Look for first occurrence of Value in a select and remove it if found
   RETURN
SelIndex  if found
-1   if Not Found
*/
function selectRemoveValue(Select,Value)
{
    var Fn = "[util.js selectRemoveValue] ";
    if (!Select){
        jslog(WARNING,Fn + " Select is NULL!");
        return -1;
    }
    for (var i=0; i < Select.options.length; i++) {
        var Opt = Select[i];
        var CurValue = html2Str (Opt.value );
        if (CurValue == Value) {
            jslog(JSLOG_JSU,Fn + " Found Value=" + Value + "  in " + Select.name + "   Text=" + Opt.text + "\n SelInd=" + i + "      NOW REMOVING IT");
            Select[i]=null;
            return i;
        }
    }
    jslog(JSLOG_JSU,Fn + " NOT FOUND Value=" + Value + "  in " + Select.name);
    return -1;
}

/* ---------------------------------------------------
Remove All Options of a Select
 ---------------------------------------------------*/
function selectRemoveAll(Select)
{
   var Fn = "[util.js selectRemoveAll] ";
   
   var i=0;
   if (!Select){
        jslog(WARNING,Fn + " Select is NULL!");
        return -1;
  }
  for (i = Select.length - 1; i >= 0; i--) {
        Select[i] = null;
  }
}


/* ---------------------------------------------------
		RETURN
TRUE  selet is MultiSelect
FALSE selet is NOT MultiSelect		
 ---------------------------------------------------*/
function selectIsMulti(Select)
{
   var Fn = "[util.js selectIsMulti] ";
   
   return Select.multiple;
}



/* ---------------------------------------------------
if they are present We remove the 2 Extra items added to the beggining of the 
select by Cognos
e.g. 
   FilterTimeMode
   ---------------

    PAR
Select  in
--------------------------------------------------- */
function selectRemoveExtraItems(Select)
{
  var Fn = "[util.js selectGetTextFromValue] ";

  if(!Select || Select.options.length < 1) {
     return;
  }

  // jslog(JSLOG_JSU,Fn + "Removing 2 Extra Items from Select" + Select.name);
  try{
        var szText = Select.childNodes[1].text;
        if(szText.match("----")){
            Select.remove(1);
            Select.remove(0);
            Select.removeAttribute("hasLabel");
            jslog(JSLOG_JSU,Fn + "Succesfully Removed 2 Extra Items from Select " + Select.name);
            return;
        }
  }
  catch(err){
    //ignore it
  }

}






/*
Look for first occurence of Text in a select and select it if found
   RETURN
SelIndex  if found and selected
-1   if Not Found
*/
function selectSelText(Select,Text)
{
    var Fn = "[util.js selectSelText] ";
    if (!Select){
        jslog(WARNING,Fn + " Select is NULL!");
        return -1;
    }
    // jslog(JSLOG_JSU,Fn + Select.name + "  len=" + Select.options.length);
    for (var i=0; i < Select.options.length; i++) {
        var Opt = Select[i];
        var CurText = html2Str (Opt.text);
        // jslog(JSLOG_JSU,Fn + " CurText=" + CurText + "  len= " + CurText.length + ")     Looking for Text=" + Text + " (len=" + Text.length + ")");
        if (CurText == Text) {
            jslog(JSLOG_JSU,Fn + " SELECT Found Text=" + Text  + "  in " + Select.name + "\nValue=" + Opt.value+ "\nRETURN SelInd=" + i);
            Opt.selected = true;
            return i;
        }
    }
    jslog(JSLOG_JSU,Fn + " NOT FOUND Text=" + Text + "  in " + Select.name);
    return -1;
}



/*
Get Text of Opt with Value
    PAR
Select 	in
Value		in 	
    RETURN
Text related to Opt with Value
*/
function selectGetTextOfValue(Select,Value)
{
    var Fn = "[util.js selectGetTextOfValue] ";
    if (!Select){
        jslog(WARNING,Fn + " Select is NULL!");
        return "Select is NULL";
    }
    for (var i=0; i < Select.options.length; i++) {
        var Opt = Select[i];
        var CurValue = html2Str (Opt.value);
        if (CurValue == Value) {
            var Text = html2Str (Opt.text);
            jslog(JSLOG_JSU,Fn + " Found Value=" + Value + "   Text=" + Text);
            return Text;
        }
    }
    return Value + " NOT FOUND";

}


/*
Get value of Opt with Text
    PAR
Select 	in
Text		in 	
    RETURN
Value related to Opt with Text
*/
function selectGetValueOfText(Select,Text)
{
    var szText1 = html2Str (Text);
    var Fn = "[util.js selectGetValueOfText] ";
    if (!Select){
        jslog(WARNING,Fn + " Select is NULL!");
        return "Select is NULL";
    }
    for (var i=0; i < Select.options.length; i++) {
        var Opt = Select[i];
        var CurText = html2Str (Opt.text);
       
        if (CurText == szText1) {
            var Value = html2Str (Opt.value);
            jslog(JSLOG_JSU,Fn + " Found Text=" + szText1+ "   Value=" + Value);
            return Value;
        }
    }
    return Text + " NOT FOUND";
}




/*
Get Sel Status of OPt with value=Value
    PAR
Select 	in
Value		in 	
    RETURN
SelStatus (true or false)
*/
function selectGelSelectedStatus(Select,Value)
{
    var Fn = "[util.js selectSelValue] ";
    var SelectedStatus = false;
    if (!Select){
        jslog(WARNING,Fn + " Select is NULL!");
        return SelectedStatus;
    }
    for (var i=0; i < Select.options.length; i++) {
        var Opt = Select[i];
        var CurValue = html2Str (Opt.value );
        if (CurValue == Value) {
            //jslog(JSLOG_JSU,Fn + " Found Value=" + Value + "  in " + Select.name + "   Text=" + Opt.text + "    Selected=" + Opt.selected);
            return Opt.selected;
        }
    }
    return SelectedStatus;
}


/*
Get a String with the List of text   values of a select (useful for Debug)
*/
function selectGetDesc(Select)
{
    var Desc = new String("name: " + Select.name + "\n\ntext      value\n\n");

    for (var i=0; i < Select.options.length; i++) {
        var Opt = Select[i];
        var Line = new String("\n" + Opt.text + "     " + Opt.value);
        Desc += Line;
    }
    return Desc;
}


function appendOptionLast(Select,Text,Value)
{
   var Opt = new Option(Text, Value);
   Select[Select.length] = Opt;
   Opt.dv = Text;
}


function appendOptionSelLast(Select,Text,Value,bSel)
{
    appendOptionLast(Select,Text,Value);
    if (bSel){
        var Opt = Select[Select.length-1];
        Opt.selected = true;
    }
}


/*----------------------------------------------------------------------------------------------
Get the List of Elements of a Multi Select
	PAR
Select	in
_ArId	out	Array with the IDs (value) 
	RETURN
_ArId.length	
----------------------------------------------------------------------------------------------*/
function selectGetList (Select,_ArId){
  var Fn = "[util.js selectGetList] ";
  // jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  if (!Select){
    return jslog(JSLOG_JSU,Fn +  "Select =0 NOTHING to DO");
  }
  _ArId.length=0;
  var iAr=0;
  for (var iOpt=0; iOpt < Select.options.length; iOpt ++){
    var Opt = Select.options[iOpt];
    _ArId[iAr++] = Opt.value;
  }
  // jslog(JSLOG_JSU,Fn + " return  _ArId.length=" +_ArId.length + "  " +  JSLOG_FUN_START);
  return _ArId.length;
}

/*----------------------------------------------------------------------------------------------
Get the List of Elements Selected in a Multi Select
	PAR
Select	in
_ArSelId	out	Array with the IDs (value) selected
	RETURN
_ArSelId.length	   (Number of Element Selected)
----------------------------------------------------------------------------------------------*/
function selectGetSelList (Select,_ArSelId){
  var Fn = "[util.js selectGetSelList] ";
  if (!Select){
    return jslog(JSLOG_JSU,Fn +  "Select =0 NOTHING to DO");
  }
  // jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  _ArSelId.length=0;
  var iAr=0;
  for (var iOpt=0; iOpt < Select.options.length; iOpt ++){
    var Opt = Select.options[iOpt];
	  if (Opt.selected){
       _ArSelId[iAr++] = Opt.value;
	  }  
  }
  // jslog(JSLOG_JSU,Fn + " return  _ArSelId.length=" +_ArSelId.length + "  " +  JSLOG_FUN_START);
  return _ArSelId.length;
}

/*----------------------------------------------------------------------------------------------
Get the Number of Elements Selected
	PAR
Select	in
	RETURN
iSelNum 
-1 ERR
----------------------------------------------------------------------------------------------*/
function selectGetSelNum (Select){
  var Fn = "[util.js selectGetSelNum] ";
  var iSelNum = 0;
  if (!Select){
    jslog(JSLOG_JSU,Fn +  "Select =0 NOTHING to DO");
    return 0;
  }
  
  for (var iOpt=0; iOpt < Select.options.length; iOpt ++){
    var Opt = Select.options[iOpt];
	  if (Opt.selected){
	  	iSelNum ++;
	  }  
  }
  jslog(JSLOG_JSU,Fn + "  return  iSelNum=" + iSelNum);
  return iSelNum;
}  

/*----------------------------------------------------------------------------------------------
Get the Number of Items (Options) in Select
	PAR
Select	in
	RETURN
iItemNum 
-1 ERR
----------------------------------------------------------------------------------------------*/
function selectGetOptNum (Select){
  var Fn = "[util.js selectGetOptNum ] ";

  if (!Select){
    jslog(JSLOG_JSU,Fn +  "Select =0  return 0");
    return 0;
  }
  return Select.options.length; 
}  



/*----------------------------------------------------------------------------------------------
Get the Number of Elements that will be considered in Filter basing on current selection:
	PAR
Select	in
	RETURN
iNumFilterEl:	
- if iSelNum > 0 : iNumFilterEl = iSelNum
- if iSelNum=0  : iNumFilterEl = iNumItem  (ALL entries will be considered in Filter)
----------------------------------------------------------------------------------------------*/
function selectGetNumFilterEl (Select){
  var Fn = "[util.js selectGetNumFilterEl] ";
  var iSelNum = selectGetSelNum (Select);
  if (iSelNum < 0) {
  	return 0;
  }
  var iNumFilterEl = (iSelNum > 0) ? iSelNum : Select.options.length; 
  jslog(JSLOG_JSU,Fn + "iSelNNum=" + iSelNum + "  return  iNumFilterEl=" +iNumFilterEl);
  return iNumFilterEl;
}


/*----------------------------------------------------------------------------------------------
Get the Labels of the Elements Selected in a Multi Select. They can be displayed in Report Heading
	PAR
Select	in
	RETURN
  e.g     2degrees - GSM 900/1800 - NEW ZEALAND,  3 - 3G 2100 - SWEDEN
----------------------------------------------------------------------------------------------*/
function selectGetSelLabels (Select){
  var Fn = "[util.js selectGetSelList] ";
  var szSelLabels = "";
  var bFirst  = true;
  
  if (!Select){
    return jslog(JSLOG_JSU,Fn +  "Select =0 NOTHING to DO");
  }
  for (var iOpt=0; iOpt < Select.options.length; iOpt ++){
    var Opt = Select.options[iOpt];
	  if (Opt.selected){
       if (bFirst){
         szSelLabels = Opt.text;
         bFirst = false;
       } else {
         szSelLabels = szSelLabels + ", " + Opt.text;
       }
	  }  
  }
  return szSelLabels;
}


/*----------------------------------------------------------------------------------------------
Get the values of the Elements Selected in a Multi Select. 
e.g. They can be used in a Where condition or to find a Value
	PAR
Select	in
bValueAsString in   [false] true if the values must be considered as String, adding ''  

	RETURN
  e.g  bValueAsString=false   1, 4, 12
  e.g  bValueAsString=false   MT, BT
  e.g  bValueAsString=true   'MT', 'BT'
  
----------------------------------------------------------------------------------------------*/
function selectGetSelValues (Select,bValueAsString){
  var Fn = "[util.js selectGetSelValues] ";
  var szSelValues = "";
  var bFirst  = true;
  
  if (bValueAsString == undefined){
  	bValueAsString = false;
  }
  
  if (!Select){
    return jslog(JSLOG_JSU,Fn +  "Select =0 NOTHING to DO");
  }
  for (var iOpt=0; iOpt < Select.options.length; iOpt ++){
    var Opt = Select.options[iOpt];
	  if (Opt.selected){
   	   var szSelVal = Opt.value;
    	 if (bValueAsString){
         szSelVal = "'" + szSelVal + "'";
    	 }  
       if (bFirst){
         szSelValues = szSelVal;
         bFirst = false;
       } else {
         szSelValues = szSelValues + ", " + szSelVal;
       }
	  }  
  }
  return szSelValues;
}


/*----------------------------------------------------------------------------------------------
Get the values of the Elements in a Multi Select. 
e.g. They can be used in a Where condition or to find a Value
	PAR
Select	in
	RETURN
  e.g     Sig1, Sig4, Sig-12
----------------------------------------------------------------------------------------------*/
function selectGetValues (Select){
  var Fn = "[util.js selectGetValues] ";
  var szSelValues = "";
  var bFirst  = true;
  
  if (!Select){
    return jslog(JSLOG_JSU,Fn +  "Select =0 NOTHING to DO");
  }
  for (var iOpt=0; iOpt < Select.options.length; iOpt ++){
    var Opt = Select.options[iOpt];
	  if (bFirst){
         szSelValues = Opt.value;
         bFirst = false;
      } else {
         szSelValues = szSelValues + ", " + Opt.value;
      }	    
  }
  return szSelValues;
}


/*----------------------------------------------------------------------------------------------
Deselect All Item in a Multi Select 
	PAR
Select	in
----------------------------------------------------------------------------------------------*/
function selectDeselectAll (Select){
  var Fn = "[util.js selectDeselectAll] ";
  if (!Select){
    return jslog(JSLOG_JSU,Fn +  "Select =0 NOTHING to DO");
  }
  if (Select.selectedIndex != -1){
    Select.selectedIndex = -1;
  }
  /*
  for (var iOpt=0; iOpt < Select.options.length; iOpt ++){
    var Opt = Select.options[iOpt];
	  Opt.selected = false;
  }
  */
}

/*----------------------------------------------------------------------------------------------
select All Item in a Multi Select 
	PAR
Select	in
----------------------------------------------------------------------------------------------*/
function selectSelectAll (Select){
  var Fn = "[util.js selectSelectAll] ";
  if (!Select){
    return jslog(JSLOG_JSU,Fn +  "Select =0 NOTHING to DO");
  }
  for (var iOpt=0; iOpt < Select.options.length; iOpt ++){
    var Opt = Select.options[iOpt];
	  Opt.selected = true;
  }
}


/*----------------------------------------------------------------------------------------------
Get the Value Selected in selectedIndex 
	PAR
Select	in
bValueAsString in   [false] true if the values must be considered as String, adding ''  
	RETURN
SelValue	  or "-1" if Nothing Selected  (SELECT_NOVALUE_SEL)
Es:     bValueAsString=true      "'MT'"
Es:     bValueAsString=true      ""     (ALL Item selected)
----------------------------------------------------------------------------------------------*/
function selectGetSelVal (Select,bValueAsString){
  var Fn = "[util.js selectGetSelVal] ";
  var szSelVal = SELECT_NOVALUE_SEL;
  
  if (bValueAsString == undefined){
  	bValueAsString = false;
  }
  if (!Select){
    return szSelVal;
  }
  var iSelInd = Select.selectedIndex;
  if (iSelInd < 0){
    return szSelVal;
  }
  szSelVal = html2Str(Select.options[iSelInd].value);
  if (bValueAsString){
		// NOTE: if "" it is ALL item. we mantain it without adding ' 
  	if (szSelVal.length){
      szSelVal = "'" + szSelVal + "'";
  	}
  }  
  return szSelVal;
} 


/*----------------------------------------------------------------------------------------------
Get the Value Selected in a Single select
	PAR
Select	in
	RETURN
SelValue	  or "-1" if Nothing Selected  (SELECT_NOVALUE_SEL)
----------------------------------------------------------------------------------------------*/
function selectGetSelText (Select){
  var Fn = "[util.js selectGetSelText] ";
  var szSelText = SELECT_NOVALUE_SEL;
  
  if (!Select){
    return szSelText;
  }
  var iSelInd = Select.selectedIndex;
  if (iSelInd < 0){
    return szSelText;
  }
  return html2Str(Select.options[iSelInd].text);
} 



/**
 * Populate an empty select
 * @param select
 * @param arOpt
 * @param szSelVal 
 */
function selectPopulate(select, arOpt, szSelVal){
	if (select == null || select == 0){
		return;
	}
 for (var i=0; i< arOpt.length; i++){
  	var el = arOpt[i];
  	var bSel = (el[0] == szSelVal);
  	appendOptionSelLast (select,el[1],el[0],bSel);
  }  
}


/*-----------------------------------------------------------
Read Select and if it has Items selected, it Adds "AND condition" 
      PAR
Select	in
szDbId	in	e.g "ROAMINGTYPE"
szFilter	in	Current Filter e.g  "PLMNCARRIERID=1001 AND DIRECTION = 1"
    RETURN
szFilter   (with the new condition)	
e.g  "PLMNCARRIERID=1001 AND DIRECTION = 1 ANd ROAMINGTYPE IN (1,2)"
------------------------------------------------------------*/
function selectAddFilterCond(Select,szDbId,szFilter) {
  var szFilterAnd = (szFilter.length < 4) ? " " : " AND "; 
  var Fn = "[util.js selectAddFilterCond] ";
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  jslog(JSLOG_JSU,Fn + "IN: szFilter=" + szFilter);
  var ArSelId= new Array();
  var ArId= new Array();

  var iFilterNum = selectGetSelList (Select,ArSelId);
  if  (iFilterNum == 1){
    szFilter += szFilterAnd  + szDbId + " = " + ArSelId[0];  
  } else if  (iFilterNum > 1){
    szFilter += szFilterAnd + szDbId +" IN (" + ar2List(ArSelId) + ")";  
  } 
  jslog(JSLOG_JSU,Fn + "OUT: szFilter=" + szFilter);
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
  return szFilter;
}  




/*-----------------------------------------------------------
Get the Select All and Deselect All Elements in a Block having a Select List
	PAR
szBlockId		in 		Span containing the Block with the select
_ArSelAllEl		out 		Array with [SelectAll,DeselectAll]
bShowEr		in
	RETURN
0		OK	
Other	Error
------------------------------------------------------------*/
function getSelAllEl(szBlockId,_ArEl,bShowEr) {
  var Fn = "[util.js getSelAllEl] ";
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  jslog(JSLOG_JSU,Fn + "IN szBlockId=" + szBlockId);
  var iSize = 0;
  var BlockEl = document.getElementById (szBlockId);
  if (BlockEl == null) {
    return showErrIfRequired (bShowEr,Fn + " NOT FOUND BlockId=" +  szBlockId,1);
  }
  // Get List of all elements with tag 'A'  ("Select All" "Delect All"), Present only if it is a MultiSelect
  ElList = BlockEl.getElementsByTagName("A");
  if (ElList == null  || ElList.length != 2) {
    return showErrIfRequired (bShowEr,Fn + " NOT FOUND the 2 Elements with Tag A for BlockId=" +  szBlockId,1);
  }
  _ArEl[iSize++] = ElList[0];
  _ArEl[iSize++] = ElList[1];
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
  return 0; // OK 
}  



/*-----------------------------------------------------------
Move the Select/Deselect All object of a filter to the Right (instead of below)
	PAR
szFilterNameId	in		e.g "TrType"  --> "blockFilterTrType", "spanSelectAllTrType","spanDeselectAllTrType"	
bShowEr		in
	RETURN
0		OK	
Other	Error
------------------------------------------------------------*/
function filterSelAllEl2R(szFilterNameId,bShowEr) {
  var Fn = "[util.js filterSelAllEl2R] ";
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  jslog(JSLOG_JSU,Fn + "IN szFilterNameId=" + szFilterNameId);

  var ArSelEl = new Array();
  // Get "Select All" and "Deselect All" Object
  getSelAllEl ("blockFilter" + szFilterNameId,ArSelEl,bShowEr);
  // Move the object into the spans on the right
  var ArSpanEl = new Array("spanSelectAll" + szFilterNameId,"spanDeselectAll" + szFilterNameId);
  for (iAr=0; iAr < 2;iAr++){
    var Span = getElementById2(ArSpanEl[iAr],bShowEr);
    Span.appendChild (ArSelEl [iAr]);
    ArSelEl [iAr].style.fontSize = "8pt";
  }
  return 0; // OK
}



//**************************************************************************
//   Loading and Cursor Wait
//**************************************************************************



function setCursorWait(bWait)
{
	  // jslog(JSLOG_JSU,"setCursorWait " + bWait);
    var Cursor = bWait ? 'wait' : 'default';

    document.body.style.cursor = Cursor;

    // ------------------------ set Wait cursor also for all the elements
    var TagAr = new Array("IMG","TD","INPUT","BUTTON","SELECT");
    for (var ArInd=0; ArInd < TagAr.length; ArInd++)
    {
        var Tag = TagAr[ArInd];
        var o = document.getElementsByTagName(Tag);
        for (var i=0; i<o.length; i++) {
            var el = o[i];
            el.style.cursor = Cursor;
        }
    }
}



/**
 * Show/Hide the Load Image into a specific element, on its right
 * @param szElId {String}   e.g   "inputEl1"
 * @param bShow {Boolean}  true to set Loading Image		
 */
function loadingShowIn1ElId(szElId,bShow){
	var el = getElementById2(szElId,true);
	loadingShowIn1El (el,bShow);
}	  
  

/**
 * Show/Hide the Load Image into a specific element, on its right
 * @param el {Object}   e.g   
 * @param bShow {Boolean}  true to set Loading Image		
 */
function loadingShowIn1El(el,bShow){
	if (el){
		classAdd (el,'jsuLoadingEl',bShow);
	}
}	  



/**
 * @return {Object}  The Loading Div or 0 if Not present		
 */
function loadingGetEl(){
	return getElementById2(ID_DIV_LOADING_IMG,false);
}


/**
 * Show/Hide the Loading Div Image
 * @param el {Object}    the div with the Loading Image 
 * @param bShow {Boolean}  true to set Loading Image		
 */
function loadingShowByEl(el,bShow){
	if (el){
		classAdd (el,'jsuLoading',bShow);
		elementShow(el,bShow);
	}
}	  


/**
 * Show/Hide the Loading Div Image
 * @param bShow {Boolean}  true to set Loading Image		
 */
function loadingShow(bShow){
	var el = getElementById2(ID_DIV_LOADING_IMG,false);
	if (el){
		classAdd (el,'jsuLoading',bShow);
		elementShow(el,bShow);
	}
}	  




/**
 * Show/Hide the Alarm Image into a specific element, on its right
 * @param szElId {String}   e.g   "inputEl1"
 * @param bLoading {Boolean}  true to set Loading Image		
 * @return 1		
 */
function alarmShowIn1ElId(szElId,bShow){
	var el = getElementById2(szElId,true);
	return alarmShowIn1El (el,bShow);
}	  
  

/**
 * Show/Hide the Alarm Image into a specific element, on its right
 * @param el {Object}   e.g   
 * @param bShow {Boolean}  true to set Loading Image
 * @return 1		
 */
function alarmShowIn1El(el,bShow){
	if (el){
		classAdd (el,'jsuAlarmingEl',bShow);
	}
	return 1;
}	  






/**
 * @param el {Object}				DOM el
 * @param szClass {String}		Class To add or remove
 * @param bAdd {Boolean} true=Add   false=remove		
 */
function classAdd (el, szClass, bAdd){
	var Fn = "[util.js classAdd] ";
	var szClassCur = el.className;
	if (szClassCur == undefined){
		szClassCur = "";
	}
	var bPresent = szClassCur.indexOf (szClass) >=0;
	if (bAdd){
		if (!bPresent){
			// we have to add it
			if (szClassCur == ""){
				szClassCur = szClass;
			}else{
				szClassCur = szClassCur + " " + szClass; 
			}
		}
	}else {
			// Remove
		szClassCur = szClassCur.replace(" " + szClass, "");
		szClassCur = szClassCur.replace(szClass, "");
	}
	el.className = szClassCur;
	// jslog (JSLOG_TEST,Fn + "IN szClass=" + szClass + " bAdd=" + bAdd + "  - el.id=" + el.id + " class SET FROM + '" + szClassCur + "' TO '" + el.className + "'");
}



function ts_getInnerText(el) {
    if (typeof el == "string") return el;
    if (typeof el == "undefined") {
        return el;
    }
    if (el.innerText) return el.innerText;	//Not needed but it is faster
    var str = "";

    var cs = el.childNodes;
    var l = cs.length;
    for (var i = 0; i < l; i++) {
        switch (cs[i].nodeType) {
            case 1: //ELEMENT_NODE
                str += ts_getInnerText(cs[i]);
                break;
            case 3:	//TEXT_NODE
                str += cs[i].nodeValue;
                break;
        }
    }
    return str;
}


/*-----------------------------------------------------------
Show/Hide an Element (and its Children)
      PAR
szSpan       in  e.g 'sectFilterIntPrev'
bShow in    true if I want to show it
            false if I want to hide it
------------------------------------------------------------*/
function elementShowBySpan(szSpan,bShow) {
  var Fn = "[util.js elementShowBySpan ]";

   var El = getElementById2 (szSpan,false);
   // jslog(JSLOG_JSU,Fn + "szSpan=" + szSpan + " bShow=" +bShow + "  getElementById2 return El=" + El +  "   (NOTE: El can be 0, in this case nothing to do)");
   if (El){
     elementShow(El,bShow);
   } 
}   

/*-----------------------------------------------------------
Check if an Element is Visible
      PAR
szSpan       in  e.g 'sectFilterIntPrev'
			RETURN
 true if it is visible
 false if it is not visible
------------------------------------------------------------*/
function elementIsVisibleBySpan(szSpan) {
  var Fn = "[util.js elementIsVisibleBySpan ]";

  var bVisible = false;
  var El = getElementById2 (szSpan,false);
  if (El){
  	bVisible = (El.style.visibility != "hidden");
  } 
  return bVisible;
  
}  


/*-----------------------------------------------------------
Show/Hide an Element (and its Children)
      PAR
El    in  Object
bShow in    true if I want to show it
            false if I want to hide it
------------------------------------------------------------*/
/**
 * @param El
 * @param bShow
 * @param [szDisplayIfVisible] {String}  display to set if bShow=true e.g "inline" (default= "block")  
 */
function elementShow(El,bShow,szDisplayIfVisible) {
  var Fn = "[util.js elementShow ]";
  
  if (El == 0 || El == undefined){
    return;
  }
  if (szDisplayIfVisible == undefined){
  	szDisplayIfVisible = "block";
  }
  if (bShow){
  	El.style.visibility="visible";
    /* El.style.display="block"; */
    El.style.display=szDisplayIfVisible;
  }else {
    El.style.visibility="hidden";
    El.style.display="none";
  }
}


/**
 * @param elem
 * @returns {Object} .top .left .height .width 
 */
function elementGetWinCoords(elem) { // crossbrowser version
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top  = box.top +  scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  return { 
  	top: Math.round(top), 
  	left: Math.round(left),
  	height: elem.clientHeight,
  	width: elem.clientWidth
  };
}


/***
* add on page load events
*/
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        };
    }
}

/***
 * set cookie for a page
 *
 * @parameter: name: the name of the cookie
 * @parameter: days: days of expiration
 */
function createCookie(name,value,days) {
	var expires = "";
    if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}
    try{
        document.cookie = name+"="+value+expires+"; path=/";
    }catch(err){
        // ignore it
    }
}

/***
 * read the cookie of a page
 * @parameter: name: the name of the cookie
 * @return: the value of the cookie
 */
function readCookie(name) {
	var nameEQ = name + "=";
    try{
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
    }catch(err){
        // ignore it
    }
	return null;
}

/***
 * erase the cookie of a page
 * @parameter: name: the name of the cookie
 */
function eraseCookie(name) {
	createCookie(name,"",-1);
}

/***
 * get the paramter from the url query string
 * @parmater name: the name of the paramter
 * @return: the value in the url (the first one)
 */
function getRequestParameter( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[util.js \\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var plainString = unescape(window.location.href);
  var results = regex.exec( plainString );
  if( results == null )
    return "";
  else
    return results[1];
}




/**
 * Find all elements with same id ( which exists on static view report)
 * paramter id: the element id
 * return array of elements with the same id
 */
function getElementsWithSameId(id){
  var nodes = [];
  var tmpNode = document.getElementById(id);
  while(tmpNode){
    nodes.push(tmpNode);
    tmpNode.id = "";
    tmpNode = document.getElementById(id);
  }
  for(var x=0; x<nodes.length; x++){
    nodes[x].id = id;
  }
  return nodes;
}


/*-----------------------------------------------------------
Set Text in a Span
      PAR
Span    in
szText  in
-----------------------------------------------------------*/
function spanSetTextById(szSpanId,szText,bShowErr)
{

  var SpanId = getElementById2 (szSpanId,bShowErr);
  if (SpanId){
    spanSetText(SpanId, szText);
  }
} 


/*-----------------------------------------------------------
Get Text from a Span
      PAR
Span    in
		RETURN
szText  
-----------------------------------------------------------*/
function spanGetTextById(szSpanId,bShowErr)
{

  var SpanId = getElementById2 (szSpanId,bShowErr);
  if (SpanId){
    return spanGetText(SpanId);
  } else {
  	return ("szSpanId=" + szSpanId + "  NOT FOUND");
  }
} 




/*-----------------------------------------------------------
Set Text in a Span
      PAR
Span    in
szText  in
-----------------------------------------------------------*/
function spanSetText(Span,szText)
{
  var Fn = "[util.js spanSetText] ";
  // jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  // jslog(JSLOG_JSU,Fn +  "IN szTxt=" + szText);

  if (Span){
    // Span.firstChild.textContent=szText;
    Span.firstChild.innerHTML = szText;
  }
  // jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
}


/*-----------------------------------------------------------
Get Text From a Span
      PAR
Span    in
      RETURN
szText  
-----------------------------------------------------------*/
function spanGetText(Span)
{
  if (Span == 0 || Span.firstChild == 0){
    return "";
  }
  var szText =  Span.firstChild.innerHTML;
  return szText.replace ("&nbsp;","");
}




/***************************************************************************************************************
			BLOCK FUNCTION
***************************************************************************************************************/


/*-----------------------------------------------------------
Set Padding to a Block
	PAR
szBlock         in 		span identifying the Block  e.g "blockFilterService"
szPAD	 IN             pADDING Top   Right  Bottom Left"		
bShowEr		in
	RETURN
0		OK	
Other	Error
------------------------------------------------------------*/
function blockSetPad(szBlock,szPad) {
  var Fn = "[util.js blockSetPad] ";
  // jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  // jslog(JSLOG_JSU,Fn + " IN: szBlock=" + szBlock + " szPad=" + szPad);
  var Block = getBlockBySpanId2(szBlock,true);
  if (Block == 0){
    // ERROR
    return showErr(Fn + "NOT Find szBlock=" + szBlock,1); 
  }
  Block.style.padding=szPad;
  // jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
  return 0; // OK 

}  

/* -------------------------------------------------------------------------
Reset a TextBox contained in the Block identified by szBlockName
    PAR
szBlock   in    e.g. "blockKpiVal"
bShowEr		in		
------------------------------------------------------------------------- */
function blockRangeReset(szBlock,bShowEr) 
{
  var Fn = "[util.js blockRangeReset] ";
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  jslog(JSLOG_JSU,Fn + " IN: szBlock=" + szBlock);
  
  var BlockEl = document.getElementById (szBlock);
  if (BlockEl == null) {
    return showErrIfRequired (bShowEr,Fn + " NOT FOUND szBlock=" +  szBlock,1);
  }
  // Get List of all elements with tag 'INPUT'  
  var ElList = BlockEl.getElementsByTagName("INPUT");
  if (ElList == null  || !ElList.length) {
    return showErrIfRequired (bShowEr,Fn + " NOT FOUND Elements with Tag INPUT for szBlock=" +  szBlock,1);
  }
  var iSize = ElList.length - 1;
  var ArRb = new Array();
  var ArText = new Array();
  var iArRb = 0, iArText = 0;
  for (var iEl=0; iEl < ElList.length; iEl++){
    var El = ElList[iEl];
    if (El.type == "radio"){
    	ArRb[iArRb++]=El;
    } else if (El.type == "text"){
    	ArText[iArText++]=El;
    }
  }
  jslog(JSLOG_JSU,Fn + " Found " + iArRb + " RB  and " + iArText + " TEXT");
  if ((iArRb != 4) || (iArText != 2)){
    jslog(JSLOG_JSU,Fn + " Wrong Number of RB or TEXT, cannot continue");
    return 1;
  }
  ArRb[1].checked = true;
  ArRb[3].checked = true;
  ArText[0].value = "";
  ArText[1].value = "";
  
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
  return 0; // OK 

}  





//**************************************************************************
//**************************************************************************
//				Array Functions
//**************************************************************************
//**************************************************************************


/*-----------------------------------------------------------
From an Array of IDs to the List of IDs
		PAR
ArId		in	e.g   [11,15,76]		
      RETURN
szList	e.g   '11,15,76'	  
------------------------------------------------------------*/
function ar2List(ArId) {
  var Fn = "[util.js ar2List] ";
  var szList = "";
  var iLen = ArId.length;
  
  // jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  if (!iLen){
    return szList;
  }
  szList = ArId[0];
  for (var i=1; i < iLen; i++){
    szList += ("," + ArId[i]);
  }
  // jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
  return szList;
}

/*-----------------------------------------------------------
Trace an Array of "Single Element" that can be traced 
		PAR
 iTrLev         in      TraceLev                                   
Ar		in	e.g   [11,15,76]	
                                e.g   ["elem1","elem2"]	
szArName    in      e.g "ArSel"                                
------------------------------------------------------------*/
function arTrace(iTrLev,Ar,szArName) {
  var iLen = Ar.length;
  
  
  jslog(iTrLev,szArName + ".length = " + iLen);
  for (var iAr=0; iAr < iLen; iAr++){
    jslog(iTrLev,szArName + "[util.js " + iAr + "] = " + Ar[iAr]);
  }
}




/***************************************************************************************************************
			CHECK FUNCTION
***************************************************************************************************************/

/*-----------------------------------------------------------
Check that a Filter doesn't contain more than iMaxItem selected
-  If there are more Items selected an Error is displayed and the function return 1
-  Else if OK it return 0
For example with ORACLE:
    - ORA-01704 (string literal too long ) with String longer than 4000
   - MaxItem was 1000  in the IN Clause (Maybe now it have been removed, but we should verify that Cognos doesn't crash)
   
NOTE: check only select-multiple Filters, if single is not required
      PAR
szFilterName    in    e.g "COUNTRY"
szFilterItemsName    in    e.g "Countries"
Select          in
iMinItem        in    e.g 0  or 1...
iMaxItem        in    e.g 200
bNoSelLikeAllSel     in    if true 0 sel is considered like All Selected
      RETURN
0   OK
1   Err
-----------------------------------------------------------*/
function selectCheckNumItem (szFilterName,szFilterItemsName,Select,iMinItem,iMaxItem,bNoSelLikeAllSel)
{
  var Fn = "[util.js filterCheckNumItem] ";
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);  
  if (Select == 0){
    return showErr ("Fn=" + Fn + " Select is null",1);
  }
  // if it is MultiSelect
  var szType = Select.type;
  if (szType  == 'undefined' || szType != "select-multiple"){
    jslog(JSLOG_JSU,Fn + "NOTHING to CHECK: szFilterName=" + szFilterName + " Is Not select-multiple. (select has select.type=" + szType + ")");
    return 0;
  }
  var iSelNum = selectGetSelectedNum (Select);   
  if (iSelNum == 0 && bNoSelLikeAllSel){
  	iSelNum = Select.options.length;
    jslog(JSLOG_JSU,Fn + "0 Selected - We set iSel = NumOfOptions=" + iSelNum );
  }
  jslog(JSLOG_JSU,"szFilterName=" + szFilterName + " iSelNum=" + iSelNum + " iMinItem=" + iMinItem + " iMaxItem=" + iMaxItem);
  if (iSelNum > iMaxItem || iSelNum < iMinItem){
  	var szEr = ERR_FILTER_MAX_ITEM_1 + iSelNum + ERR_FILTER_MAX_ITEM_2 + szFilterName + ERR_FILTER_MAX_ITEM_3 + iMinItem +  ".." + iMaxItem + "]";
    if (iMinItem == 0){
    	 szEr += ERR_FILTER_MAX_ITEM_4 + szFilterName + ERR_FILTER_MAX_ITEM_5+ szFilterItemsName + ERR_FILTER_MAX_ITEM_6;
    }
    return showErr (szEr,1);
  }
  jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);  
  return 0;  // OK
}


/* -----------------------------------------------------
Contain text and Value of an Option of a select
        PAR
szText       text of select       
szValue      value of select       
    Calling Example
var cOptEl = new cOpt(Opt.text,Opt.value);
----------------------------------------------------- */
function cOpt(szText, szValue) {
  this.text = szText;
  this.value = szValue;
}


/* ------------------------------------------------------------------------------------
Show all the SPAN or DIV fields"    having class="debug" or id="debug"  
	@param bShow   (Boolean}  in true=show   false=hide
------------------------------------------------------------------------------------ */
function showDebugFields(bShow)
{
  var TAG_DEBUG = ["SPAN","DIV"];
	jslog(JSLOG_INFO, "showDebugFields bShow=" + bShow);
  
  for (var iTag=0; iTag < TAG_DEBUG.length; iTag++){
  	var ElList = document.getElementsByTagName(TAG_DEBUG[iTag]);
  	for (var i=0; i < ElList.length; i++){
  		var El = ElList [i];
  		if (El.id == "debug" || El.className == "debug"){
  			elementShow (El,bShow);
  		}	
		}
	}
	
}


/**
 * Check that obj is defined
 * @param obj				it must be differenbt form undefined or 0
 * @param objName	  label to show  in case of Error
 */
function checkObjDefined(obj,objName)
{
	if (obj){
		return 0;  // OK
	}else{
		return showErr ("SW ERROR: " + objName + " undefined",1);
	}
}


/**
 * Check that szVal is one of  the Values of arVal.
 * ShowEr if not present
 * @param szVal			
 * @param arVal
 * @param [szEr] Optional additional ErMsg
 * @returns {Number}  0 OK   1 ERR
 */
function checkArVal(szVal,arVal,szEr)
{
	for (var i=0; i< arVal.length; i++){
		if (szVal == arVal[i]){
			return 0; //OK
		}
	}
	// ERROR
	var szMsg = "ERROR:\n " + "Value=" + szVal + "\nIS NOT one of the Possible Values: [ ";
	// Prepare szEr if there will be an Error
	for (var i=0; i< arVal.length; i++){
		szMsg += arVal[i];
		if (i< (arVal.length-1)){
			szMsg += " , ";
		}
	}
	szMsg += " ]";
  if (szEr != undefined){
  	szMsg += "\n\n" + szEr;
  }	
	return showErr(szMsg,1);
}



/*-----------------------------------------------------------
Get SQL Condition for The select, using the useValues selected in select
select can be either multiSElect or singleSelect
IF NO SElection (MUltiSelect) or Selected the First Cognos Item for ALL we return ""
	PAR
szDbCol   in      DB Col Name (e.g. COD_CATEG_BLOCCO)	
select		in 			select DOM object
bValueAsString in   true if Value get from CB are String (else they are Number) 
  RETURN

Example for   		bValueAsString=true
---------------------------------------------     
e.g (ALL is Selected)     ""
e.g (1 Item Selected)     "TENSIONE  = 'AM'"
e.g (2 Items Selected)    "TENSIONE  IN ('AM','MT')"

Example for   		bValueAsString=false
---------------------------------------------     
e.g (0 Item Selected)     ""
e.g (1 Item Selected)     "TENSIONE  = 1"
e.g (3 Items Selected)    "TENSIONE  IN (1,4)"

------------------------------------------------------------*/
function sqlCondSelect(szDbCol,select,bValueAsString) {
  var Fn = "[util.js sqlCondSelect] ";
  var szSql = "";
  
  // jslog(JSLOG_DEBUG,Fn + JSLOG_FUN_START);
  if (selectIsMulti (select)){
  	szSql = selectGetSelValues (select,bValueAsString);
  }else {
  	szSql = selectGetSelVal (select,bValueAsString);
  }
  if (szSql.length){
  	var bInCond = szSql.indexOf(',') > 0;
  	if (bInCond){
  		szSql = szDbCol + " IN (" + szSql + ")";
  	}else{
  		szSql = szDbCol + " = " + szSql;
  	}
  }
  jslog(JSLOG_JSU,Fn + "OUT szSql: " + szSql);
  // jslog(JSLOG_DEBUG,Fn + JSLOG_FUN_END);
  return szSql;
}




/*---------------------------------------------------------------------
Get SQL Condition for From..To Cognos Pickdate Prompt Controls
	PAR
szDbCol   in      DB Col Name (e.g. COD_BLOCCO)	
pmtDateFrom in      Cognos Prompt for DateFrom	
pmtDateFrom in      Cognos Prompt for DateTo	
  RETURN
e.g      "COD_BLOCCO >= TO_DATE('2016-01-26','YYYY-MM-DD') AND COD_BLOCCO <= TO_DATE('2016-04-17','YYYY-MM-DD')"
e.g      ""     if no Value is set
------------------------------------------------------------*/
function sqlCondFromToDate (szDbCol,pmtDateFrom,pmtDateTo){
  var Fn = "[util.js sqlCondFromTo] ";
  var szSql = "";

  jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);

  // eg. Get  '2016-01-26'   or ''
  var szFromDateVal = promptDateGetVal(pmtDateFrom);
  var szToDateVal = promptDateGetVal(pmtDateTo);
  //--
  var bFrom = (szFromDateVal.length > 0);
  var bTo = (szToDateVal.length > 0);
  var szSqlFrom = "";
  if (bFrom){
  	szSqlFrom  = szDbCol + " >= TO_DATE('" + szFromDateVal +  "','YYYY-MM-DD')";
  }
  var szSqlTo = "";
  if (bTo){
  	szSqlTo  = szDbCol + " <= TO_DATE('" + szToDateVal +  "','YYYY-MM-DD')";
  }
  if (bFrom && bTo){
  	szSql = szSqlFrom + " AND " + szSqlTo;
  }else	if (bFrom){
  	szSql = szSqlFrom;
  }else	if (bTo){
  	szSql = szSqlTo;
  }
  jslog(JSLOG_TEST,Fn + "return szSql=" + szSql);
  jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);
  return szSql;
}




/*-----------------------------------------------------------
Add a New SqlCondition managing the need of adding or NOT AND
	PAR
szCurCond in      Current Sql Condition	
szCond		in 			Sql Condition to Add
  RETURN
NewSqlCond

 Example
szCurCond													szCond					RETURN
--------------------------------------------------------------
''															"COL1 = 10"				"COL1=10"
"COL0 IN (1,2)"									"COL1 = 10"				"COL0 IN (1,2) AND COL1=10"
------------------------------------------------------------*/
function sqlAddCond(szCurCond,szCond,bValueAsString) {
  // var Fn = "[util.js sqlAddCond] ";
  
	
	if (szCurCond.length > 0 && szCond.length > 0){
		return szCurCond + " AND " + szCond;
	}else	if (szCond.length > 0){
		return szCond;
	}else	{
		return szCurCond;
	}	
 
}




/**
 * get URL ParVal if present 
 * @param szParName  ParName. e.g jslog
 * @returns value of szParName if present in the URL. Else return ""
 */
function urlGetParVal(szParName){
	var szName;
  if(szName=(new RegExp('[?&]'+encodeURIComponent(szParName)+'=([^&]*)')).exec(location.search)){
 	 return decodeURIComponent(szName[1]);
  }
  else{
  	return "";
  }
}




/*---------------------------------------------------------------------
Change Language for User Error Msg (e.g validation). Default is LAN_MSG_EN  
@param szLanMsg in     LAN_MSG_ITA for Italian 
												LAN_MSG_EN for English (Default)	
	GLOBAL
lan_msg out      LAN_MSG_ITA, LAN_MSG_EN	
------------------------------------------------------------*/
function utilSetLanMsg (szLanMsg){
  var Fn = "[util.js utilSetLanMsg] ";

	lan_msg = szLanMsg; 
  jslog (JSLOG_INFO,Fn + "lan_msg=" + lan_msg);

}



/*---------------------------------------------------------------------
Get dateIso:  First Day of Current YEar
		RETURN
Example:  "2016-01-01"		
------------------------------------------------------------*/
function dateIsoGetFirstDayCurYear(){
	var dd = new Date();
	// Format ISO:  YYYY-M-D
	return dd.getFullYear()+"-01-01";
}

/*---------------------------------------------------------------------
Get dateIso:  Last Day of Last YEar
		RETURN
Example:  "2016-01-01"		
------------------------------------------------------------*/
function dateIsoGetLastDayLastYear(){
	var dd = new Date();
	// Format ISO:  YYYY-M-D
	return (dd.getFullYear() -1 )+"-12-31";
}



/*---------------------------------------------------------------------
Get dateIso:  First Day of Current YEar
		RETURN
Example:  "2016-07-27"		
------------------------------------------------------------*/
function dateIsoGetCurDay(){
  var dd = new Date();
  // getMonth  return 0..11
  var iMonth = dd.getMonth() + 1;
  var szMonth = (iMonth >=10) ? ("" + iMonth) : ("0" + iMonth);
  var iDay = dd.getDate();
  var szDay = (iDay >=10) ? ("" + iDay) : ("0" + iDay);
	return dd.getFullYear()+ "-" + szMonth + "-" + szDay;
}



/**
 * Get array of prompt  from Select
 * @param selectAll  contains value = szId1.szId2   text=...
 * @returns {Array}		Array of obj for dynamic prompt 
 * @example 
 *   { 
 *    "szId1": "DD01",
 *    "szId2": "DH",
 *    "szTxt2": "DH - Dip. Emilia Romagna - Marche"
 *    }
 */
function arPmtFromSelect(selectAll) {
  var Fn = "[util.arPmtFromSelect] ";
  
  jslog(JSLOG_JSU,Fn + JSLOG_FILE_START);
  var iOptNum = selectAll.options.length;
  jslog(JSLOG_JSU,Fn + "iOptNum=" + iOptNum);
  var arAll = new Array();
  for (var iOpt=0; iOpt < iOptNum; iOpt ++){
    var opt = selectAll.options[iOpt];
    var objPmt = new Object();
    // split di value  nei 2 ID
    var arId = opt.value.split(SELECT_VALUE_ID_SEP);
    // ricavo obj da usare per i Prompt dinamici
    objPmt.szId1 = arId[0];
    objPmt.szId2 = arId[1];
    objPmt.szTxt2 = opt.text;
    // jslog (JSLOG_TRACE,Fn + "[" + iOpt + "]=" + objPmt.szId1 + " " + objPmt.szId2 + " " + objPmt.szTxt2);
    arAll.push(objPmt);
  }
  jslog(JSLOG_JSU,Fn + "return arAll.length= " + arAll.length);
  jslog(JSLOG_JSU,Fn + JSLOG_FILE_END);
  return arAll;
}

/*
 * @param arPmt 		{Array} array of objec to populate selectPmt  
 *   {
 *    "szId1": "DD01",
 *    "szId2": "DH",
 *    "szTxt2": "DH - Dip. Emilia Romagna - Marche"
 *    }
 *    ...
 *   {
 *    "szId1": "DEVA",
 *    "szId2": "VV",
 *    "szTxt2": "VV - Dip. DEVAL S.p.A.(Val d'aosta)" 
 *    }    
 * @param szId1        filter for arPmt. Only  el with szId1 will be used  . Es: "DD01" 
 * @param selectPmt  select da Popolare con szId2 e szTxt2 used
 * @param bTutti     true se sono presenti le 2 Entries iniziali (Tutti  "----"), da preservare  
 *    
 */
function arPmt2Select(arPmt,szId1,selectPmt,bTutti) {
  var Fn = "[util.arPmt2Select] ";
  
  jslog(JSLOG_JSU,Fn + JSLOG_FILE_START);
  var iArLen = arPmt.length;
  jslog(JSLOG_JSU,Fn + "IN szId1=" + szId1 + "  arPmt with Len=" + iArLen);
  var iPreserveFirstN = (bTutti) ? 2 : 0;
  jslog(JSLOG_JSU,Fn + "Clear selectPmt bTutti=" + bTutti + " iPreserveFirstN=" + iPreserveFirstN);
  selectRemoveOption(selectPmt,iPreserveFirstN);
  //-------
  jslog(JSLOG_JSU,Fn + "INSERT Entry matching szId1=" + szId1);
  for (var i=0; i < iArLen; i ++){
    var objPmt = arPmt[i];
    var bAdd = (objPmt.szId1 == szId1);
    if (bAdd){
      jslog (JSLOG_JSU,Fn + "[" + i + "]=" + objPmt.szId1 + " - ADDED: " + objPmt.szId2 + " " +  objPmt.szTxt2);
    	appendOptionLast(selectPmt,objPmt.szTxt2,objPmt.szId2);
    }else{
      jslog (JSLOG_TRACE,Fn + "[" + i + "]=" + objPmt.szId1 + " - NOT ADDED: " + objPmt.szId2 + " " +  objPmt.szTxt2);
    }
  }
  selectPmt.selectedIndex = 0;
	selectPmt.disabled = false;
  jslog(JSLOG_JSU,Fn + JSLOG_FILE_END);
}

/**
 * @param arMap			eg [["name1",1],["name_7",23]]     couple of values (either string or int)
 * @param val1			eg  "name_7"
 * @param bShowEr	
 * @returns 		eg 23    null if not found 
 */
function mapVal1ToVal2(arMap, val1, bShowEr){
	var val2 = null;
	var bFound = false;
	var szListVal1 = "";
	
	for (var i=0; !bFound && i < arMap.length; i++){
		var val1Cur = arMap[i][0];
		var val2Cur = arMap[i][1];
		if (val1Cur == val1){
			val2 = val2Cur;
			bFound = 1;
		}else {
			if (i>0){
				szListVal1 += " , ";
			}
			szListVal1 += val2Cur;
		}
	}
	if (!bFound && bShowEr){
		showErr ("SW ERROR: " + val1 + " NOT FOUND in the List of Possible Values [ " + szListVal1 + " ]",-1);
	}
	return val2;
}



function tipAddEvent (arClass){
  var TAG_TIP = ["IMG","INPUT"];

  for (var iTag=0; iTag < TAG_TIP.length; iTag++){
  	var elList = document.getelementsByTagName(TAG_TIP[iTag]);
  	for (var iel=0; iel < elList.length; iel++){
  		var el = elList [iel];
  		var szClass = el.className;
  		// check if el ha className in arClass
  		var bFound = false;
    	for (var i=0; !bFound && i < arClass.length; i++){
    		if (szClass == szClass[i]){
    			bFound = true;
    		} 
    	}
    	if (bFound){
    		// add Event
        el.onmouseover=function(){ Tip (this.tip); }; 
        el.onmouseout=function(){ 	UnTip();    }; 
    	}
		}
  }  
}





