/** @fileOverview
========================================================================================= <BR/> 
<b>File:</b> 			core/loadingDiv.js <BR/>
<b>Author:</b>     		<a href="https://www.linkedin.com/in/federicolevis" target="_blank">Federico Levis</a> <BR/>
<b>LoadingDiv Doc:</b>   <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/LoadingDiv.html" target="_blank">JSU LoadingDiv Documentation</a> <BR/>
<b>JSU API Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html" target="_blank">JSU API Documentation</a> <BR/>
<b>Description:</b>    JSU LoadingDiv API:  loadingDivShow loadingDivHide <BR/>
<b>REQUIRE:</b>          JSU core/core.css <BR/>  
<b>OPTIONAL:</b>         jslog.js, dom-drag.js to use also jslog
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

/*==========================================================================
 * 							loadingDiv API
========================================================================== */

/**
 * LoadingDiv DEFAULT 
 */
var LOADING_DIV_DEF = {
		szTitleHtml:  "",	//	{String}: [""] if != "" Show a Title Section with szTitle 
		bShowGif:  true,	//	{Boolean}: [true] show the Loading Gif 
		szDiffUrlGif:  "",	//	{String Url}: [null] if different form null use this URL instead of CSS default	
		bShowElapsedSec: false, // {Boolean} [false[ if true show a Footer with Elapsed Time (sec)
		bResetElapsedSec: true, // {Boolean} [true] if true reset timer
		iDivWidth: null, // if different from null, set this Div Width instead of using Default Width (CSS)
		iGifWidth: null, // if different from null, set this Gif  Width instead of using Default Width (CSS)
		bShowCancel:  false,	//	{Boolean}: [false] show the Cancel Btn 
		szBackgroundColor: null, // {String} Div BackgroundColor, if different from null or "", 
		szDiffMsgHtml: "" // {String} if different from null or '', we show this Msg (HTML) instead of Default 
};

var LOADING_DIV_DEF_OPT ={
		szTitleHtml:  LOADING_DIV_DEF.szTitle,	//	{String}: [""] if != "" Show Title 
		bShowGif:  LOADING_DIV_DEF.bShowGif,	//	{Boolean}: [true] show the Loading Gif 
		szDiffUrlGif:  LOADING_DIV_DEF.szDiffUrlGif,	//	{String Url}: [null] if different form null use this URL instead of CSS default	
		bShowElapsedSec: LOADING_DIV_DEF.bShowElapsedSec, // {Boolean} [false] if true show a Footer with Elapsed Time (sec)
		bResetElapsedSec: LOADING_DIV_DEF.bResetElapsedSec, // {Boolean} [true] if true reset timer
		szDiffMsgHtml: LOADING_DIV_DEF.szDiffMsgHtml,  // {String} if different from null, show this Msg (HTML) instead of Default
		iDivWidth: LOADING_DIV_DEF.iDivWidth, // if different from null, set this Div Width instead of using DEfault Width (CSS)
		iGifWidth: LOADING_DIV_DEF.iGifWidth, // if different from null, set this Gif Width instead of using DEfault Width (CSS)
		bShowCancel:  LOADING_DIV_DEF.bShowCancel,	//	{Boolean}: [false] show the Cancel Btn
		szBackgroundColor: LOADING_DIV_DEF.szBackgroundColor, // {String} Div BackgroundColor, if different from null or "", 
		fnCancelCallback: null  // called when click Cancel
};

var JSU_LOADING_DIV = '<div id="loadingDivContainer" class="loadingDivContainer" >' + 
'  <table width="100%" height="100%">' + 
'    <tr> <td align="center">' + 
'      <div  id="loadingDiv" class="loadingDiv">' + 
'         <table id="loadingDivTable" class="loadingDiv" width="100%"  style="z-index: 110;">' + 
'            <tr class="loadingDivTitle">' + 
'              <td colspan="2" id="loadingDivTitle" class="loadingDivTitle" >Title Test</td>' + 
'            </tr>' + 
'            <tr> ' + 
'              <td id="loadingDivTdGif" align="left" width="80px">' + 
'                <div id="loadingDivGif" class="loadingDivGif"> </div>' + 
'              </td> ' + 
'              <td id="loadingDivMsg" class="loadingDivMsg" align="left" style="padding-left:0px">' + 
'                 <b>Working</b></BR>Please Wait...' + 
'              </td>' + 
'            </tr>' + 
'            <tr>' + 
'               <td colspan="2" align="center" class="loadingDivBtn" id="loadingDivBtnTd"  >' + 
'                 <input type="button" class="loadingDivBtn" id="loadingDivBtn" value="Stop" onclick="loadingDivCancel();" />' + 
'               </td>' + 
'            </tr>' + 
'            <tr>' + 
'               <td colspan="2" id="loadingDivFooter" class="loadingDivFooter" style="display:none">' + 
'                 Elapsed Time: 10 sec' + 
'               </td>' + 
'            </tr>' + 
'        </table>' + 
'      </div>' + 
'    </td> </tr>' + 
'  </table>' + 
'</div>'; 


var var_loading_div = {
		elFooter: null, // td el with Footer
		tmoElapsedSec : null,  // tmo for loading_div to update ElapsedSec
		iElapsedSec : 0,  // elapsed sec
		fnCancelCallback: null  // called when click Cancel
};


/*==========================================================================
 * 							PRIVATE 
========================================================================== */


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
function loading_getElementById2(Id,bShowErr)
{
	if (bShowErr == undefined){
		bShowErr = true;
	}
    var el = 	document.getElementById(Id);
    if (el == null) {
        if (bShowErr){
          alert("SW ERROR [util.js loading_getElementById2] NOT FOUND Id=" +  Id) ;
        }
        return 0;  // Not Found
    }
    return el;
}



/*
 * call jslog if it is defined
 * @param msg
 */
function loading_log(msg){
	if (typeof(jslog) == "function"){
		jslog (JSLOG_CORE, msg);
	}
	//	alert (msg);
}

/*
 * call jslogObj if it is defined
 * @param msg
 */
function loading_logObj(msg,obj){
	if (typeof(jslogObj) == "function"){
		jslogObj (JSLOG_CORE, msg,obj);
	}
}



/*
 * Click on Cancel
 */
function loadingDivCancel(){
	loadingDivHide();	
	if (var_loading_div.fnCancelCallback != undefined){
		var_loading_div.fnCancelCallback();
	}
}

/*
 * Tmo elapsed
 */
function loadingDivTmo(){
	
	var dEnd = new Date();  	
	var iElapsedSec= Math.round((dEnd.getTime() - var_loading_div.iStartTime)/1000);
	var_loading_div.elFooter.innerHTML = LOADING_DIV_MSG.startTime + var_loading_div.szStartTime +  LOADING_DIV_MSG.elapsed + iElapsedSec + LOADING_DIV_MSG.sec;
	
}	  


/*==========================================================================
 * 							loadingDiv API
========================================================================== */

/**
  Show loadingDiv
  @param [objOpt] 	{Object} Optional Option: <BR/>
		- szTitleHtml:  {String}: [""] if != "" Show Title  <BR/>
		- bShowGif:   		{Boolean}: [true] show the Loading Gif  <BR/>
		- szDiffUrlGif:  	 {String Url}: [null] if different form null use this URL instead of CSS default	 <BR/>
		- bShowElapsedSec: 	{Boolean} [false] if true show a Footer with Elapsed Time (sec) <BR/>
		- bResetElapsedSec: {Boolean} [false] if true reset timer <BR/>
		- szDiffMsgHtml: 	{String} if different from null, show this Msg (HTML) instead of Default <BR/>
		- iDivWidth: 	 {Number} if different from null, set this Div Width instead of using DEfault Width (CSS) <BR/>
		- iGifWidth: 		 {Number} if different from null, set this Gif Width instead of using DEfault Width (CSS) <BR/>
		- bShowCancel:  	{Boolean}: [false] show the Cancel Btn <BR/>
		- szBackgroundColor:{String} Div BackgroundColor, if different from null or "",  <BR/>
		- fnCancelCallback: {function} [null]  called when Cancel button is clicked <BR/>
 */
function loadingDivShow(objOpt){
	var Fn = "[util.js loadingDivStart()] ";
	loading_log(Fn + "-------------------");
	if (var_loading_div.tmoElapsedSec){
		clearTimeout (var_loading_div.tmoElapsedSec);
	}
  if (objOpt == undefined){
  	var objOpt = LOADING_DIV_DEF_OPT; 
  }else {
  	if (objOpt.szTitleHtml == undefined) {objOpt.szTitleHtml = LOADING_DIV_DEF.szTitleHtml;}
  	if (objOpt.bShowGif == undefined) {objOpt.bShowGif = LOADING_DIV_DEF.bShowGif;}
  	if (objOpt.szDiffUrlGif == undefined) {objOpt.szDiffUrlGif = LOADING_DIV_DEF.szDiffUrlGif;}
  	if (objOpt.bShowElapsedSec == undefined) {objOpt.bShowElapsedSec = LOADING_DIV_DEF.bShowElapsedSec;}
  	if (objOpt.bResetElapsedSec == undefined) {objOpt.bResetElapsedSec = LOADING_DIV_DEF.bResetElapsedSec;}
  	if (objOpt.iDivWidth == undefined) {objOpt.iDivWidth = LOADING_DIV_DEF.iDivWidth;}
  	if (objOpt.iGifWidth == undefined) {objOpt.iGifWidth = LOADING_DIV_DEF.iGifWidth;}
  	if (objOpt.szBackgroundColor == undefined) {objOpt.szBackgroundColor = LOADING_DIV_DEF.szBackgroundColor;}
  	if (objOpt.bShowCancel== undefined) {objOpt.bShowCancel = LOADING_DIV_DEF.bShowCancel;}
  	if (objOpt.szDiffMsgHtml == undefined) {objOpt.szDiffMsgHtml = LOADING_DIV_DEF.szDiffMsgHtml;}
  }	
  var_loading_div.fnCancelCallback = objOpt.fnCancelCallback; 
	loading_logObj(Fn + "objOpt",objOpt);
	var divMain = loading_getElementById2 ("loadingDivMain",false);
	if (divMain){
		document.body.removeChild (divMain);
	}	
	loading_log(Fn + "add JSU_LOADING_DIV to document.body");
	divMain = document.createElement("div");
  divMain.id = "loadingDivMain";		
	divMain.innerHTML = JSU_LOADING_DIV;
	document.body.appendChild(divMain);
	var loadingDiv = loading_getElementById2 ("loadingDiv");
	if (objOpt.iDivWidth != null){
		loadingDiv.style.width = objOpt.iDivWidth + "px";  
	}
	loading_log( Fn + "Set Visible element depending on objOpt");
	var elTitle = loading_getElementById2 ("loadingDivTitle");
	var bTitle = (objOpt.szTitleHtml && objOpt.szTitleHtml != ""); 
	loading_elementShow (elTitle,bTitle,"");
	if (bTitle){elTitle.innerHTML = objOpt.szTitleHtml;}
	//------
	var elMsgHtml = loading_getElementById2 ("loadingDivMsg",false);
	if (!elMsgHtml){
		return; // WorkAround
	}
	var szMsgHtml = LOADING_DIV_MSG.working;
	if (objOpt.szDiffMsgHtml && objOpt.szDiffMsgHtml != ""){
		szMsgHtml = objOpt.szDiffMsgHtml; 
	}
	elMsgHtml.innerHTML = szMsgHtml;
	//------
	var elCancelBtn = loading_getElementById2 ("loadingDivBtn");
	elCancelBtn.value = LOADING_DIV_MSG.cancelBtn;
	loading_elementShow (loading_getElementById2 ("loadingDivBtnTd"),objOpt.bShowCancel,"");
	//------
	var elGif = loading_getElementById2 ("loadingDivGif");
	if (objOpt.szDiffUrlGif != undefined && objOpt.szDiffUrlGif != ""){
		elGif.style.backgroundImage = "url('" + objOpt.szDiffUrlGif + "')"; 
	}
	if (objOpt.iDivWidth != null){
		elGif.style.width = objOpt.iGifWidth + "px";  
	}
	
	loading_elementShow (loading_getElementById2 ("loadingDivTdGif"),objOpt.bShowGif,"");
	//------
	if (objOpt.szBackgroundColor && objOpt.szBackgroundColor != ""){
		loadingDiv.style.backgroundColor = objOpt.szBackgroundColor; 
		loading_getElementById2 ("loadingDivMsg").style.backgroundColor = objOpt.szBackgroundColor;
		loading_getElementById2 ("loadingDivTdGif").style.backgroundColor = objOpt.szBackgroundColor;
		loading_getElementById2 ("loadingDivBtnTd").style.backgroundColor = objOpt.szBackgroundColor;		
	}	
	//------------------
	var bShowElapsedSec = (objOpt.bShowElapsedSec != undefined && objOpt.bShowElapsedSec); 
	loading_elementShow (elTitle,bTitle,"");
	var_loading_div.elFooter = loading_getElementById2 ("loadingDivFooter");
	loading_elementShow (var_loading_div.elFooter ,bShowElapsedSec,"");
	if (bShowElapsedSec){
		if (objOpt.bResetElapsedSec){
			loading_log( Fn + "Start Timeout for Elapsedsec");
			var dStart = new Date();  	
			var_loading_div.iStartTime = dStart.getTime();
			var_loading_div.szStartTime = num2StrPad(dStart.getHours(),'0',2) + ":" + 
		   num2StrPad(dStart.getMinutes(),'0',2) + ":" +  num2StrPad(dStart.getSeconds(),'0',2); 
		}
		loadingDivTmo(); // simulate Tmo to show currente Elapsed Time
		var_loading_div.tmoElapsedSec =  setInterval(loadingDivTmo,1000);
	}
	loading_elementShow (divMain,true);

}	  

/**
 * Hide loadindgDiv
 */
function loadingDivHide(){
	
	if (var_loading_div.tmoElapsedSec){
		clearTimeout (var_loading_div.tmoElapsedSec);
	}
	var divContainer = loading_getElementById2 ("loadingDivContainer",false);
	loading_elementShow (divContainer,false);
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
function loading_elementShow(El,bShow,szDisplayIfVisible) {
  var Fn = "[util.js loading_elementShow ]";
  
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
