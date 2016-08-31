/** @fileOverview
========================================================================================= <BR/> 
<b>File:</b> 			core/loadingDiv.js <BR/>
<b>Author:</b>     		<a href="https://www.linkedin.com/in/federicolevis" target="_blank">Federico Levis</a> <BR/>
<b>LoadingDiv Doc:</b>   <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/LoadingDiv.html" target="_blank">JSU LoadingDiv Documentation</a> <BR/>
<b>JSU API Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html" target="_blank">JSU API Documentation</a> <BR/>
<b>Description:</b>    JSU LoadingDiv API:  loadingDivShow loadingDivHide <BR/>
<b>REQUIRED:</b>        JSU:  jsu.css locale-core.js jsuCmn.js <BR/>
<b>OPTIONAL:</b>        JSU: jslog.js, dom-drag.js to use also jslog <BR/>
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

/*
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
		szCancelLabel:  "Cancel" ,	//	{String}: [""] Label to set to Cancel Button - default is LOADING_DIV_MSG.cancelBtn 
		szBackgroundColor: null, // {String} Div BackgroundColor, if different from null or "", 
		szDiffMsgHtml: "", // {String} if different from null or '', we show this Msg (HTML) instead of Default 
		bRecalcBestPos: false	// bRecalcBestPos: {Boolean} [true] reCalculate BestPosition basing on WindowSize, Scrollbar. You can use false during Window LOad to avoid movement
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
		szCancelLabel:  "" ,	//	{String}: [""] Label to set to Cancel Button - default is LOADING_DIV_MSG.cancelBtn 
		szBackgroundColor: LOADING_DIV_DEF.szBackgroundColor, // {String} Div BackgroundColor, if different from null or "", 
		fnCancelCallback: null,  // called when click Cancel
		bRecalcBestPos: false	// bRecalcBestPos: {Boolean} [true] reCalculate BestPosition basing on WindowSize, Scrollbar. You can use false during Window LOad to avoid movement
};



var JSU_LOADING_DIV = '<div id="loadingDivContainer" class="loadingDivContainer" >' + 
'  <table width="100%" height="100%">' + 
'    <tr> <td align="center" valign="center">' + 
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

// Global var with current status
var var_ld_div = {
		elFooter: null, // td el with Footer
		tmoElapsedSec : null,  // tmo for ld_div to update ElapsedSec
		iElapsedSec : 0,  // elapsed sec
		fnCancelCallback: null,  // called when click Cancel
		// PREV Values to restore
		prev : {
			scrollLeft : 0, // Previous Val to Restore
			scrollTop : 0, // Previous Val to Restore
			scroll : 0,
			overflow : "auto"
    }
};


/*==========================================================================
 * 							PRIVATE 
========================================================================== */
var LOADING_APP_NAME_IE="Microsoft Internet Explorer";   // IE
var LOADING_APP_NAME_IE_11="Netscape";   // IE 11


/*
 * Different object to be used if IE/Firefox or Chrome
 */
function ld_getScrollEl(){
	var Fn = "[loadingDiv.js ld_getScrollEl()] ";
	// For Firefox or IE
	if  ((typeof InstallTrigger !== 'undefined')  ||
			 (navigator.appName == LOADING_APP_NAME_IE) || 
      ((navigator.appName == LOADING_APP_NAME_IE_11) && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))){ 		
		jsu_log(Fn + "Firefox/IE");
		return document.documentElement;
  } else { // NOT Firefox/IE (e.g CHROME)
  	jsu_log(Fn + "NOT Firefox/IE (e.g CHROME)");
  	return document.body;
  } 	
}










/*
 * Click on Cancel
 */
function loadingDivCancel(){
	loadingDivHide();	
	if (var_ld_div.fnCancelCallback != undefined){
		var_ld_div.fnCancelCallback();
	}
}

/*
 * Tmo elapsed
 */
function loadingDivTmo(){
	
	var dEnd = new Date();  	
	var iElapsedSec= Math.round((dEnd.getTime() - var_ld_div.iStartTime)/1000);
	var_ld_div.elFooter.innerHTML = LOADING_DIV_MSG.startTime + var_ld_div.szStartTime +  LOADING_DIV_MSG.elapsed + iElapsedSec + LOADING_DIV_MSG.sec;
	
}	  


/*==========================================================================
 * 							loadingDiv API
========================================================================== */

/**
  Show loadingDiv
  @param [objOpt] 	{Object} Option: <ul>
		<li>szTitleHtml:  {String}: [""] if != "" Show Title  </li>
		<li>bShowGif:   		{Boolean}: [true] show the Loading Gif  </li>
		<li>szDiffUrlGif:  	 {String Url}: [null] if different form null use this URL instead of CSS default	 </li>
		<li>bShowElapsedSec: 	{Boolean} [false] if true show a Footer with Elapsed Time (sec) </li>
		<li>bResetElapsedSec: {Boolean} [false] if true reset timer </li>
		<li>szDiffMsgHtml: 	{String} if different from null, show this Msg (HTML) instead of Default </li>
		<li>iDivWidth: 	 {Number} if different from null, set this Div Width instead of using DEfault Width (CSS) </li>
		<li>iGifWidth: 		 {Number} if different from null, set this Gif Width instead of using DEfault Width (CSS) </li>
		<li>bShowCancel:  	{Boolean}: [false] show the Cancel Btn </li>
		<li>szCancelLabel:  {String} ["Cancel"] Label to set to Cancel Button 
		<li>szBackgroundColor:{String} Div BackgroundColor, if different from null or "",  </li>
		<li>fnCancelCallback: {function} [null]  called when Cancel button is clicked </li>
		<li>bRecalcBestPos: {Boolean} [true] reCalculate BestPosition basing on WindowSize, Scrollbar. You can use false during Window LOad to avoid movement </li>
	</ul>	
 */
function loadingDivShow(objOpt){
	var Fn = "[loadingDiv.js loadingDivStart()] ";
	jsu_log(Fn + JSU_LOG_FUN_START);
	if (var_ld_div.tmoElapsedSec){
		clearTimeout (var_ld_div.tmoElapsedSec);
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
  	if (objOpt.szCancelLabel== undefined) {objOpt.szCancelLabel = LOADING_DIV_DEF.szCancelLabel;}
  	if (objOpt.szDiffMsgHtml == undefined) {objOpt.szDiffMsgHtml = LOADING_DIV_DEF.szDiffMsgHtml;}
  	if (objOpt.bRecalcBestPos == undefined) {objOpt.bRecalcBestPos = LOADING_DIV_DEF.bRecalcBestPos;}
  }	
  var_ld_div.fnCancelCallback = objOpt.fnCancelCallback; 
	jsu_logObj(Fn + "objOpt",objOpt);
	var divMain = jsu_getElementById2 ("loadingDivMain",false);
	if (divMain){
		document.body.removeChild (divMain);
	}	
	jsu_log(Fn + "add JSU_LOADING_DIV to document.body");
	divMain = document.createElement("div");
  divMain.id = "loadingDivMain";		
	divMain.innerHTML = JSU_LOADING_DIV;
	document.body.appendChild(divMain);
	
	var loadingDiv = jsu_getElementById2 ("loadingDiv");
	if (objOpt.iDivWidth != null){
		loadingDiv.style.width = objOpt.iDivWidth + "px";  
	}
	jsu_log( Fn + "Set Visible element depending on objOpt");
	var elTitle = jsu_getElementById2 ("loadingDivTitle");
	var bTitle = (objOpt.szTitleHtml && objOpt.szTitleHtml != ""); 
	jsu_elementShow (elTitle,bTitle,"");
	if (bTitle){elTitle.innerHTML = objOpt.szTitleHtml;}
	//------
	var elMsgHtml = jsu_getElementById2 ("loadingDivMsg",false);
	if (!elMsgHtml){
		return; // WorkAround
	}
	var szMsgHtml = LOADING_DIV_MSG.working;
	if (objOpt.szDiffMsgHtml && objOpt.szDiffMsgHtml != ""){
		szMsgHtml = objOpt.szDiffMsgHtml; 
	}
	elMsgHtml.innerHTML = szMsgHtml;
	//------
	var elCancelBtn = jsu_getElementById2 ("loadingDivBtn");
	elCancelBtn.value = objOpt.szCancelLabel;
	jsu_elementShow (jsu_getElementById2 ("loadingDivBtnTd"),objOpt.bShowCancel,"");
	//------
	var elGif = jsu_getElementById2 ("loadingDivGif");
	if (objOpt.szDiffUrlGif != undefined && objOpt.szDiffUrlGif != ""){
		elGif.style.backgroundImage = "url('" + objOpt.szDiffUrlGif + "')"; 
	}
	if (objOpt.iDivWidth != null){
		elGif.style.width = objOpt.iGifWidth + "px";  
	}
	
	jsu_elementShow (jsu_getElementById2 ("loadingDivTdGif"),objOpt.bShowGif,"");
	//------
	if (objOpt.szBackgroundColor && objOpt.szBackgroundColor != ""){
		loadingDiv.style.backgroundColor = objOpt.szBackgroundColor; 
		jsu_getElementById2 ("loadingDivMsg").style.backgroundColor = objOpt.szBackgroundColor;
		jsu_getElementById2 ("loadingDivTdGif").style.backgroundColor = objOpt.szBackgroundColor;
		jsu_getElementById2 ("loadingDivBtnTd").style.backgroundColor = objOpt.szBackgroundColor;		
	}	
	//------------------
	var bShowElapsedSec = (objOpt.bShowElapsedSec != undefined && objOpt.bShowElapsedSec); 
	jsu_elementShow (elTitle,bTitle,"");
	var_ld_div.elFooter = jsu_getElementById2 ("loadingDivFooter");
	jsu_elementShow (var_ld_div.elFooter ,bShowElapsedSec,"");
	if (bShowElapsedSec){
		if (objOpt.bResetElapsedSec){
			jsu_log( Fn + "Start Timeout for Elapsedsec");
			var dStart = new Date();  	
			var_ld_div.iStartTime = dStart.getTime();
			var_ld_div.szStartTime = num2StrPad(dStart.getHours(),'0',2) + ":" + 
		   num2StrPad(dStart.getMinutes(),'0',2) + ":" +  num2StrPad(dStart.getSeconds(),'0',2); 
		}
		loadingDivTmo(); // simulate Tmo to show currente Elapsed Time
		var_ld_div.tmoElapsedSec =  setInterval(loadingDivTmo,1000);
	}
	
	// ---------------------------------- Set the Size if Required
	if (objOpt.bRecalcBestPos){
		jsu_log(Fn + "Recalculate Best Postion");
		var divContainer = jsu_getElementById2 ("loadingDivContainer",true);
		
		var bd = ld_getScrollEl();
	
		// Scroll = total dimensione, also if some is not bvisible
		var hScroll= bd.scrollHeight;
		var wScroll= bd.scrollWidth;
		var xScroll= bd.scrollLeft;
		var yScroll= bd.scrollTop;
		// Visible part
		var wClient= window.innerWidth;
		var hClient= window.innerHeight;
		jsu_log(Fn + "scroll: xScroll=" + xScroll + " yScroll=" + yScroll + " wScroll=" + wScroll + " hScroll="+hScroll);
		jsu_log(Fn + "Client: wClient=" + wClient + " hClient="+hClient);
		
		divContainer.style.height = hScroll + 100+ "px";
		divContainer.style.width = wScroll + 100 + "px";
		var xScrollNew = (100 + wScroll - wClient)/2 ; 
		var yScrollNew = (100 + hScroll -  hClient)/2 ; 
		jsu_log(Fn + "SET NEW SCROLL =" + xScrollNew + " y=" + yScrollNew);
		if (xScrollNew > 0){
			var_ld_div.prev.scrollLeft = bd.scrollLeft; // Value to restore 
			bd.scrollLeft = xScrollNew;
		}else {
			var_ld_div.prev.scrollLeft = -1;  // Nothing to restore 
		}
		if (yScrollNew > 0){
			var_ld_div.prev.scrollTop = bd.scrollTop; // Value to restore 
		  bd.scrollTop = yScrollNew;
		}else{
			var_ld_div.prev.scrollTop = -1;  // Nothing to restore 
		}  
		// Save previous value
		var_ld_div.prev.scroll = bd.scroll; // IE Only
	  bd.scroll = "no"; // ie only	
		if (document.documentElement != undefined){
			var_ld_div.prev.overflow = document.documentElement.style.overflow; // Firefox, Chrome
			document.documentElement.style.overflow = 'hidden';  // firefox, chrome		
		}else {
			var_ld_div.prev.overflow = null;
		}
	}
	jsu_elementShow (divMain,true);
	jsu_elementShow (loadingDiv,true);

	
	jsu_log(Fn + JSU_LOG_FUN_END);

}	  

/**
 * Hide loadindgDiv
 */
function loadingDivHide(){
	var Fn = "[loadingDiv.js loadingDivHide()] ";
	jsu_log(Fn + JSU_LOG_FUN_START);
	
	if (var_ld_div.tmoElapsedSec){
		clearTimeout (var_ld_div.tmoElapsedSec);
	}
	var bd = ld_getScrollEl(); 
	if (var_ld_div.prev.scrollLeft != -1){
		jsu_log(Fn + "RESTORE scrollLeft=" + var_ld_div.prev.scrollLeft);
		bd.scrollLeft = var_ld_div.prev.scrollLeft;
	}
	if (var_ld_div.prev.scrollTop != -1){
		jsu_log(Fn + "RESTORE scrollTop=" + var_ld_div.prev.scrollTop);
		bd.scrollTop = var_ld_div.prev.scrollTop;
	}

	bd.scroll = var_ld_div.prev.scroll; // IE Only 
	if (var_ld_div.prev.overflow != null && document.documentElement != undefined){
		document.documentElement.style.overflow = var_ld_div.prev.overflow ; // Firefox, Chrome 
	}
	
	
	var divContainer = jsu_getElementById2 ("loadingDivContainer",false);
	jsu_elementShow (divContainer,false);
	jsu_log(Fn + JSU_LOG_FUN_END);
}	  

