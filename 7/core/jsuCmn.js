/** @fileOverview
========================================================================================= <BR/> 
<b>File:</b> 			core/jsuCmn.js <BR/>
<b>Author:</b>     		<a href="https://www.linkedin.com/in/federicolevis" target="_self">Federico Levis</a> <BR/>
<b>JSU API Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html" target="_self">JSU API Documentation</a> <BR/>
<b>Description:</b>    JSU Common constant or base API shared by all Features <BR/>
<b>REQUIRED:</b>          NOTHING<BR/>  
<b>First Version:</b>     ver 1.0 - Jul 2007  <BR/>
<b>Current Version:</b>   ver 3.3 - Jul 2016  <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>DISCLAIMER</b>  <BR/>
Copyright by Federico Levis - <a href="https://github.com/JSUtility/JSU" target="_self">JSU</a> <BR/> 
This file may be freely distributed under the MIT license.   <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>JSDoc NOTES</b>  <BR/>
In "JSU Obfuscated Version"  JS Code is not visible with JSDoc Source Link  <BR/> 
========================================================================================= <BR/> 
*/

/*==========================================================================
 * 							GLOBAL JSU CONSTANT
========================================================================== */
// displayed in About
var JSU_VERSION="FREE JSU v. 3.3 &nbsp;&nbsp;&nbsp;Last Update: 2016-Sep-02";

// JSU_FREE=true if we are using JSU FREE VERSION
var JSU_FREE = false;

//JSU_FREE_START **-------------------- 
JSU_FREE=true;  

//JSU_FREE_END **-----------------------*/






//-----------------------------------------------

var JSU_LOG_FUN_START = "------------------------ START";
var JSU_LOG_FUN_END = "------------------------ END";



/*==========================================================================
 * 							GLOBAL JSU FUNCTION
========================================================================== */

/*
 * call jslog if it is defined
 * @param msg
 */
function jsu_log(msg){
	if (typeof(jslog) == "function"){
		jslog (JSLOG_JSU, msg);
	}
	//	alert (msg);
}

/*
 * call jslogObj if it is defined
 * @param msg
 */
function jsu_logObj(msg,obj){
	if (typeof(jslogObj) == "function"){
		jslogObj (JSLOG_JSU, msg,obj);
	}
}

/*
 * call jslogHtml if it is defined
 * @param msg
 */
function jsu_logHtml(msg,szHtml){
	if (typeof(jslogHtml) == "function"){
		jslogHtml (JSLOG_JSU, msg,szHtml);
	}
}


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
function jsu_getElementById2(Id,bShowErr)
{
	if (bShowErr == undefined){
		// bShowErr = true;
		bShowErr = false;
	}
    var el = 	document.getElementById(Id);
    if (el == null) {
        if (bShowErr){
          alert("SW ERROR [jsu_getElementById2] NOT FOUND Id=" +  Id) ;
        }
        return 0;  // Not Found
    }
    return el;
}


/*
Show/Hide an Element (and its Children)
 * @param El
 * @param bShow  true if I want to show it -false if I want to hide it
 * @param [szDisplayIfVisible] {String}  display to set if bShow=true e.g "inline" (default= "block")  
 */
function jsu_elementShow(El,bShow,szDisplayIfVisible) {
  
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


/*
 * Show an Error 
 * @param szErr
 */
function jsu_err(szMsg){
	if (typeof (Popup) != "undefined"){
		Popup (POPUP_TYPE.ERR,szMsg);
	}else {
		alert (szMsg);
	}
}

/*
 * Show an Error because this szFeatNotSupported is not supported
 * @param szFeatNotSupported
 */
function jsu_featNotSupported(szFeatNotSupported){
	var szMsg = "Sorry but this feature is NOT PRESENT in JSU Free Version:\n " + szFeatNotSupported + '\n\n\n' +
	  "To use this feature you have to download FULL JSU Version";
	jsu_err (szMsg);
}




/**
 * 
 * @returns  true if we are using JSU FREE version
 */
function isJsuFree() {
  return JSU_FREE;
}
