/* =========================================================================================
File:     					about.js
Author:   					Federico Levis
Last Modification:  June 2016   
Description:        API for JSU about   
REQUIRE:            JSU

DISCLAIMER
Copyright by Federico Levis - JSU https://github.com/FedericoLevis/JSU 
This file may be freely distributed under the MIT license.
========================================================================================= */


/* =============================================================================================
   						CONSTANT
============================================================================================= */


var DOWNLOAD_TIP_TYPE={
		INFO: "INFO",
		FREE: "FREE",
		PAY: "PAY"
};

// DO NOT CHANGE:  they are "manually set in videoOpt Options"
var VIDEO_OPT={
	YOU_TUBE: "YOU_TUBE",
	POPUP: "POPUP"
};


//var JSU_LINKEDIN = "https://www.linkedin.com/in/federicolevis";  
var JSU_EMAIL = "federico.levis@virgilio.it";  
// var JSU_COGNOS = "http://federicolevis.wix.com/cognos";
//var JSU_GITHUB = "https://github.com/FedericoLevis/JSU";
//var JSU_PLSQL = "https://github.com/FedericoLevis/PLSQLUtility";


var JSU_IMG_PLAY_VIDEO = "https://rawgit.com/FedericoLevis/images/master/jsuAbout/PlayVideo.png";

var JSU_SORT_CODE_H = 220;

var JSU_DISABLED = 'javascript:function() { return false; }';

var JSU_GITHUB_DOWNLOAD = "https://github.com/FedericoLevis/JSU/archive/master.zip";

var JSU_BUY = JSU_DISABLED; 
//-------------------------- Optional PAR only for debugger 
var URL_PAR_OPT="opt"; // if 1 we see Optional Columns used to Show/Hide Column in Test
// -- Test google, used only by AllSamples.html
var URL_PAR_TEST="test"; // 0= No TEST  1.. Number of Automatic Test to execute with Test Google Button 
var URL_PAR_PERIOD="period"; // Number of second sin randfom period  default = 60 

// ---------------------------------------
var SAMPLE_MAX_NUM=4; // Max sample per Feature in the samples
var SAMPLE_COL_ALL="ALL";

// NOTE: embed is visible in the Ember Tab of Youtube Video  

var JSU_VIDEO_FRAME_TIP  =	'<iframe width="750" height="600" src="https://www.youtube.com/embed/wpo2oM_L3ds?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
//DAFARE
var JSU_VIDEO_FRAME_VALIDATE  =	'<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
var JSU_VIDEO_FRAME_SORT  =	'<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
var JSU_VIDEO_FRAME_LOADING  =	'<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
var JSU_VIDEO_FRAME_JSLOG  =	'<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
var JSU_VIDEO_FRAME_BLOCKPOPUP  =	'<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
var JSU_VIDEO_FRAME_JQPOPUP  =	'<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 

// Samples
// --------------- FEATURE NOT FREE URL run-time calculated  
var URL_SHORT_GOOGLE = true;  // Use Google Short URL

var JSU_URL_LONG_SAMPLE_LOADING  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/Loading/LoadingSample.html";
//var JSU_URL_SHORT_SAMPLE_LOADING  =	"https://rawgit.com/FedericoLevis/WORK/master/1/samples/Loading/LoadingSample.html";

var JSU_URL_LONG_SAMPLE_VALIDATE =	"https://rawgit.com/FedericoLevis/JSU/master/samples/Validate/ValidateSample.html";
//var JSU_URL_SHORT_SAMPLE_VALIDATE =	"https://rawgit.com/FedericoLevis/WORK/master/3/samples/Validate/ValidateSample.html";

var JSU_URL_LONG_SAMPLE_JSLOG  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/jslog/jslogSample.html";
//var JSU_URL_SHORT_SAMPLE_JSLOG  =	"https://rawgit.com/FedericoLevis/WORK/master/5/samples/jslog/jslogSample.html";

var JSU_URL_LONG_SAMPLE_JQPOPUP  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/JQPopup/PopupSample.html";
//var JSU_URL_SHORT_SAMPLE_JQPOPUP  =	"https://rawgit.com/FedericoLevis/WORK/master/7/samples/JQPopup/PopupSample.html";


// ------------------
var JSU_LONG_URL_DOWNLOAD_PAGE_FREE  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/JSUFreeDownload.html";
var JSU_LONG_URL_SAMPLE_ALL  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/AllSamples.html";
var JSU_LONG_URL_SAMPLE_SORT  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/Sort/SortSample.html";
var JSU_LONG_URL_SAMPLE_TIP  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/Tip/TipSample.html";
var JSU_LONG_URL_SAMPLE_BLOCKPOPUP  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/BlockPopup/PopupSample.html";

//----------- goo.gl of FREE Features
var JSU_URL_DOWNLOAD_PAGE_FREE  =	"https://goo.gl/HnNqnM";
var JSU_URL_SHORT_SAMPLE_ALL  =	"https://goo.gl/MoY5nK";
var JSU_URL_SHORT_SAMPLE_TIP  =	"https://goo.gl/1e6ju7";
var JSU_URL_SHORT_SAMPLE_SORT  = "https://goo.gl/hJm8vV";
var JSU_URL_SHORT_SAMPLE_BLOCKPOPUP  =	"https://goo.gl/u2zTRz";
var JSU_URL_SHORT_SAMPLE_LOADING  =	"https://goo.gl/j0HZDG";
var JSU_URL_SHORT_SAMPLE_VALIDATE =	"https://goo.gl/F3r4lP";
var JSU_URL_SHORT_SAMPLE_JSLOG  =	"https://goo.gl/OfC2Pf";
var JSU_URL_SHORT_SAMPLE_JQPOPUP  =	"https://goo.gl/09zCLG";
var JSU_GITHUB = "https://goo.gl/LYDepH";
var JSU_COGNOS = "http://goo.gl/JZJQPn";
var JSU_PLSQL = "https://goo.gl/OI3eIo";
var JSU_LINKEDIN = "https://goo.gl/J9mJfh";  
//---------------------


var JSU_URL_SHORT_SAMPLE_NOTFREE = 'https://rawgit.com/FedericoLevis/JSU/master/samples/Misc/SampleNotFree.html'
// ID sample NOt FREE (see WORK dir)
var JSU_ID_SAMPLE_LOADING  =	1;
var JSU_ID_SAMPLE_VALIDATE  =	3;
var JSU_ID_SAMPLE_JSLOG  =	5;
var JSU_ID_SAMPLE_JQPOPUP  =	7;
	
	
//DOC


var JSU_LONG_URL_API_DOC  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html";

var JSU_LONG_URL_DOC  =	"https://rawgit.com/FedericoLevis/JSU/master/README.html";
var JSU_LONG_URL_DOC_SORT  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/SortTable.html";
var JSU_LONG_URL_DOC_VALIDATE  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/Validate.html";
var JSU_LONG_URL_DOC_TIP  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/Tooltip.html";
var JSU_LONG_URL_DOC_LOADING  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/LoadingDiv.html";
var JSU_LONG_URL_DOC_JSLOG  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/jslog.html";
var JSU_LONG_URL_DOC_BLOCKPOPUP  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/BlockPopup.html";
var JSU_LONG_URL_DOC_JQPOPUP  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/JQPopup.html";

var JSU_URL_API_DOC  ="https://goo.gl/0PGnZl"

// ---- ggo.gl
var JSU_URL_DOC  =	"https://goo.gl/JzIXW0";
var JSU_URL_DOC_TIP  =	"https://goo.gl/AGKlpQ";
var JSU_URL_DOC_SORT  =	"https://goo.gl/aKR7b2";
var JSU_URL_DOC_VALIDATE  =	"https://goo.gl/M7LT4v";
var JSU_URL_DOC_LOADING  =	"https://goo.gl/0tIOIJ";
var JSU_URL_DOC_JSLOG  =	"https://goo.gl/Iobg3a";
var JSU_URL_DOC_BLOCKPOPUP  =	"https://goo.gl/iWW5cz";
var JSU_URL_DOC_JQPOPUP  =	"https://goo.gl/iPqUqL";


// used as Link for JSU in about
var JSU_SITE = JSU_URL_DOC; 

	
var JSU_TIP_CUR_FEATURE="Click to Show a new Window with the <b>JSDoc HTML</b> of this feature";

// COMMON for all samples
var SAMPLE_MAX_NUM=4; // MAX Number of Sample
var SAMPLE_ALL="ALL";

var URL_1 = "WORK";
var URL_2 = "master";
var URL_SEP = "/";

var JSU_GOOGLE_ANAL_TIP='<div style="width:400px;" align="left">Click to show a Box with Links to the '+
  '<b>JSU Google Analytics</b>: <BR/>Number of <b>JSU Downloads</b>, Number of <b>access to Samples, Documentation,</b> ...</div>';


/* =============================================================================================
    			MAIN JSU TIP:  JSU_TIP_SECT2 
 ============================================================================================= */
//Not allowed:  Reference to other Sub-Tip
//allowed:   Popup call
 
var JSU_TIP_SECT2_FEAT =  '<table class="tip" BORDER="2" cellspacing="0" cellpadding="2" width="700">' +
'	  <tr class="tipTitle">' +
'		  <th class="tipTitle" colspan="5">JSU FEATURES</th>' +
'	  </tr>' +
'	  <tr class="tipTitle2">' +
'		  <td width="90px" class="tipc">Feature Documentation</td>' +
'		  <td width="370px" class="tipc">Description</td>' +
'		  <td width="60px" class="tipc">Plugin Required</td>' +
'		  <td width="60px" class="tipc">Video Sample  ' +
'        <select id="videoOpt" onchange="onchangeVideoOpt();" class="videoOpt" VIDEO_OPT_DISABLED> ' +
'           <option value="YOU_TUBE" selected>Show in YouTube</option> ' +
'           <option value="POPUP" >Show in Popup</option> ' +
'        </select> ' +
'     </td>' +
'		  <td width="70px" class="tipc">Try an Example</td>' +
'	  </tr>' +
'	  <tr>' +
'		  <td class="tipc"><a class="tipLink" href="'+ JSU_URL_DOC_TIP +'" target="_blank">Tooltip</a> </td>' +
'		  <td class="tipl">Flexible/Powerful HTML Tooltips: Floating/Fixed Tips with otptional GIF, Video, JS Code, ...   </td>' + 
'		  <td class="tipc"><b>-</b></td>' +
'     <td class="tipc"><a href="javascript:showJSUVideoTip()"><img src="' + JSU_IMG_PLAY_VIDEO + '" title="JSU Tooltip Video" width="100" height="20" border="2" /></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleTip();">Tooltip Sample</a></td>' +
'	  </tr>' +
'	  <tr>' +
'		  <td class="tipc"><a class="tipLink" href="'+ JSU_URL_DOC_LOADING +'" target="_blank">LoadingDiv</a> </td>' +
'		  <td class="tipl"><b>Loading Div</b> for Long Operation with Many Options: <b>Loading Gif, Title, Message, ElapsedSec...</b></td>' + 
'		  <td class="tipc"><b>-</b></td>' + 
'     <td class="tipc"><a href="javascript:showJSUVideoLoading()"><img src="' + JSU_IMG_PLAY_VIDEO + '" title="JSU LoadingDiv Video" width="100" height="20" border="2" /></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleLoading();">LoadingDiv Sample</a></td>' +
'	  </tr>' +
'	  <tr>' +
'		  <td class="tipc"><a class="tipLink" href="'+ JSU_URL_DOC_VALIDATE +'" target="_blank">Validate</a> </td>' +
'		  <td class="tipl"><b>Validate Items</b> with many constraints/options</BR>Show Validate Errors in Red Items or Section, Popup ...</td>' + 
'		  <td class="tipc"><b>-</b></td>' + 
'     <td class="tipc"><a href="javascript:showJSUVideoValidate()"><img src="' + JSU_IMG_PLAY_VIDEO + '" title="JSU Validate Video" width="100" height="20" border="2" /></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleValidate();">Validate Sample</a></td>' +
'	  </tr>' +
'	  <tr>' +
'		  <td class="tipc"><a class="tipLink" href="'+ JSU_URL_DOC_SORT +'" target="_blank">Table Sort</a> </td>' +
'		  <td class="tipl"><b>Sort HTML Table</b> by clicking column header</td>' + 
'		  <td class="tipc"><b>-</b></td>' + 
'     <td class="tipc"><a href="javascript:showJSUVideoSort()"><img src="' + JSU_IMG_PLAY_VIDEO + '" title="JSU SortTable Video" width="100" height="20" border="2" /></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleSort();">SortTable Sample</a></td>' +
'	  </tr>' +
'	  <tr>' +
'		  <td class="tipc"><a class="tipLink" href="'+ JSU_URL_DOC_JSLOG +'" target="_blank">jslog</a> </td>' +
'		  <td class="tipl"><b>Log from JS Code into an optional Window: log Object, JSON, ...</b></td>' + 
'		  <td class="tipc"><b>-</b></td>' + 
'     <td class="tipc"><a href="javascript:showJSUVideojslog()"><img src="' + JSU_IMG_PLAY_VIDEO + '" title="JSU JSlog Video" width="100" height="20" border="2" /></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleJSlog();">JSlog Sample</a></td>' +
'	  </tr>' +
'	  <tr>' +
'		  <td class="tipc"><a class="tipLink" href="'+ JSU_URL_DOC_BLOCKPOPUP +'" target="_blank">Blocking Popup</a> </td>' +
'		  <td class="tipl"><b>Modal Blocking Popup</b> designed specially for <b>IE</b><BR/><b>Blocking Code</b>, based on <i>ShowModalDialog</i> (fully supported only by IE) </td>' + 
'		  <td class="tipc"><b>-</b></td>' + 
'     <td class="tipc"><a href="javascript:showJSUVideoBlockPopup()"><img src="' + JSU_IMG_PLAY_VIDEO + '" title="JSU Blocking Popup Video" width="100" height="20" border="2" /></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleBlockPopup();">BlockingPopup Sample</a></td>' +
'	  </tr>' +
'	  <tr>' +
'		  <td class="tipc"><a class="tipLink" href="'+ JSU_URL_DOC_JQPOPUP +'" target="_blank">JS Popup</a> </td>' +
'		  <td class="tipl"><b>Modal Popup for whatever Browser</b><BR/><b>Not Blocking code</b> with callback function</td>' + 
'		  <td class="tipc"><b>jquery, jquery-ui</b></td>' + 
'     <td class="tipc"><a href="javascript:showJSUVideoJQPopup()"><img src="' + JSU_IMG_PLAY_VIDEO + '" title="JSU JS Popup Video" width="100" height="20" border="2" /></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleJQPopup();">JS Popup Sample</a></td>' +
'	  </tr>' +
'</table>';

//Message on the right of the Table of Features
var JSU_TIP_SECT2_MSG = '<a class="tipLink" href="'+ JSU_SITE +'" target="_blank">JSU</a> is a <b>JavaScript Utility</b>  library very Lightweight, powerful and simply to use:' +
'<ul type="square">' +
'<li><b>Very Easy to Install and try</b>: download JSU ZIP and try jsu/samples/AllSamples.html (that points to all the other samples)</li>'+ 
'<li><b>Very Simple to include in your project</b> with only one JS file: as displayed in the various JSU samples, the desired JSU modules are loaded with require.js using the proper plugin/jsu.js file </li>'+ 
'<li><b>No dependencies for most of the JSU Features (Pure JS features):</b> only if you include JS Popup, it is required jquery and jquery-ui</li>'+ 
'<li><b>All modern browsers are supported</b>: IE9+, Firefox 3+, Chrome,... </li>'+ 
'<li><b>Examples provided</b> for each JSU feature, with all the <b> relative JSU code calls explained in Fixed Tips</b></li>'+ 
'<li><b>Very Powerful and Simple to use</b>: only 1 or 2 JS instructions to get all the power and flexibilty of the JSU feature </li>'+ 
'<li><b>Localization support</b>: all the displayed messages are isolated in local/<b><i>LAN</i></b>/locale-core.js</BR>So you can easily select the desired language simply including the proper locale file.<BR/>JSU provides <b>locale/<i>EN</i>/locale-core.js</b> (English=default) and <b>locale/<i>ITA</i>/locale-core.js</b> (Italian)</BR>You can also add and include your personal <b>local/<i>LAN</i>/locale-core.js</b>   </li>'+
'<li><b>CSS support</b> (<i>core.css, Popup.css </i>): if required you can easily customize presentation</li>' +
'</ul>';


// All the Section with Table of Features and Message
var JSU_TIP_SECT2 = '<table class="jsuAboutMsg" width="100%" style="margin-top:15px;margin-bottom:15px;">' +
'<tr>' +
'  <td width="50%">' + JSU_TIP_SECT2_FEAT + '</td>' +
'  <td width="50%" style="padding-left:5px;padding-right:5px;">' + JSU_TIP_SECT2_MSG + '</td>' +
'</tr>' +
'</table>';



/* =============================================================================================
   						GLOBAL VAR
============================================================================================= */
//TRUE if there is URL par opt=1
var b_par_opt = false;

// option to show Video
var video_opt = VIDEO_OPT.YOU_TUBE;  //default

// For Test of Google Analytics
var par_test = 100;
var par_period = 60;

/* =============================================================================================
									GLOBAL API
============================================================================================= */


/**
 * JSU About Popup Example
 */
function showJsuPopupAbout(){
	var szTipSect2 = JSU_TIP_SECT2.replace("VIDEO_OPT_DISABLED", "disabled");

	var szMsg = '<table class="tip" BORDER="1" cellspacing="0" cellpadding="2" width="700px">' +
  '  <tr class="jsuAbout jsuAboutHea">' +
  '      <td  align="center" class="jsuAboutTitle"> <img class="jsuAboutTitle" src="https://raw.githubusercontent.com/FedericoLevis/images/master/jsuAbout/jsuAboutTitle.png"/></td> ' +
  '     </tr>' +
  '  <tr class="jsuAboutMsg"><td class="tipl" >' + szTipSect2 + '</td></tr> ' +
  '  <tr class="jsuAbout jsuAboutFooter" >' +
  '    <td ><table class="tipNoBorder" width="100%"><tr>' +
  '      <td align="right" width="40%"><img class="jsuAboutJust" src="'  + JSU_PATH_ABOUT_IMG + 'jsuAboutJust.gif"/></td>' +
  '      <td align="center" width="20%"><img class="jsuAboutSimple" src="'  + JSU_PATH_ABOUT_IMG + 'jsuAboutSimple.gif"/></td>' +
  '      <td align="left" width="40%"><img class="jsuAboutUse" src="'  + JSU_PATH_ABOUT_IMG + 'jsuAboutUse.gif"/></td>' +
  '   </tr></table>' +
  '  </td> ' +
  ' </tr></table>';
  Popup(POPUP_TYPE.INFO, szMsg,	{ bShowImg: false, szTitle: "JSU ABOUT", iWidth: 750, position: {at: "top"}});
}



/**
 * Show Tip for JSU 
 * @param event
 * @param [bShowAllSample] {Boolean} def true
 */
function aboutTipFixJSU(event,bShowAllSample){
	var Fn = "[about.js aboutTipFixJSU] ";
	if (bShowAllSample == undefined){
		bShowAllSample = true;
	}
	// for JSUDoc we disable the choice
	var szLocation = window.location + ""; 
	var bJSUDoc = szLocation.indexOf ("JSUDoc") >= 0;
	
	// depending on BRowser we enable or disable videoOpt 
	var szTipSect2 = "";
	if (!bJSUDoc && (isIE() || isFirefox())){
		// We can show Video also in Popup
		// select.disabled = false;
		szTipSect2 = JSU_TIP_SECT2.replace("VIDEO_OPT_DISABLED", "");
	}else{
		szTipSect2 = JSU_TIP_SECT2.replace("VIDEO_OPT_DISABLED", "disabled");
	}	
	videoOpt = VIDEO_OPT.YOU_TUBE; // INIT
	var szMsg = '<table class="tip" BORDER="1" cellspacing="0" cellpadding="2" width="1300px">' +
  '  <tr class="jsuAbout jsuAboutHea">' +
  '    <td >' +
  '      <table class="tipNoBorder" width="100%">' +
  '        <tr>' +
  '          <td  align="left" class="jsuAboutTitle" width="40%"> <img class="jsuAboutTitle" src="'  + JSU_PATH_ABOUT_IMG + 'jsuAboutTitle.png"/></td> ' +
  '          <td  align="left" class="jsuAboutTitle" width="27%">' +
  '            <table class="tipNoBorder" width="100%">' +
  '		           <tr><td class="tipl"><a class="tipLink" href="'+ JSU_URL_DOC +'" target="_blank">JSU Feature documentation</a> </td></tr>' +
  '		           <tr><td class="tipl"><a class="tipLink" href="'+ JSU_URL_API_DOC +'" target="_blank">JSU API documentation</a> </td></tr>';
	if (bShowAllSample){
		szMsg = szMsg +	
	   '		       <tr><td class="tipl"><a class="tipLink" href="'+ JSU_URL_SHORT_SAMPLE_ALL +'" target="_blank">JSU: All Samples</a> </td></tr>';
	}
	szMsg = szMsg +  '        </table>' +
  '         </td>' +
  '          <td align="right" class="jsuAboutTitle" width="33%">' + 
  '            <table class="tipNoBorder" width="100%">' +
  '             <tr>' +
  '              <td align="right" width="42%"><img class="jsuAboutJust" src="'  + JSU_PATH_ABOUT_IMG + 'jsuAboutJust.gif"/></td>' +
  '              <td align="center" width="16%"><img class="jsuAboutSimple" src="'  + JSU_PATH_ABOUT_IMG + 'jsuAboutSimple.gif"/></td>' +
  '              <td align="left" width="42%"><img class="jsuAboutUse" src="'  + JSU_PATH_ABOUT_IMG + 'jsuAboutUse.gif"/></td>' +
  '             </tr>' +
  '            </table>' +
  '          </td> ' +
  '       </tr>' +
  '      </table>' +
  '    </td>' +
  '  </tr>' +
  '  <tr class="jsuAboutMsg"><td class="tipl">' + szTipSect2  + '</td></tr> ' +
  '  <tr class="jsuAbout jsuAboutFooter" >' +
  ' </tr></table>';
	TipFix (szMsg,event,{iTipWidth:1300, szTitle: "JSU: JS Utility FEATURES"});	
}

/**
 * Tip for Author(title)
 */
function aboutTipAuthor(event){
	var szTip = '<table class="tip" BORDER="1" cellspacing="0" cellpadding="2" width="850px">' +
  '  <tr>' +
  '    <td width="250px" align="left"> <img width="290px" src="'  + JSU_PATH_ABOUT_IMG + 'FedericoLevis.jpg"/></td> ' +
  '    <td ><table class="tipNoBorder" width="100%">' +
  '      <tr><td align="left"><label class="tipTitleBig">Federico Levis</label></td><tr/>' +
  '      <tr><td align="left">SW Engineer - Developer, Architect & Team Leader specialist in:<BR/>' +
  '              Java, JS, DB, SQL, PL/SQL, Cognos, C++, Perl & Unix Script</td><tr/>' +
  '      <tr><td ><table class="tipNoBorder" width="100%">' +
  '        <tr>' +
  '          <td width="180px" class="tipl"><label class="tipTitle">Linkedin CV: </label></td>'+
  '          <td class="tipl"><a class="tipLink" href="' +  JSU_LINKEDIN  + '" target="_blank">' + JSU_LINKEDIN +  '</a> </td>'+
  '        <tr/>' +
  '        <tr>' +
  '          <td class="tipl"><label class="tipTitle">Email: </label></td>'+
  '          <td class="tipl"><a class="tipLink" href="mailto:' +  JSU_EMAIL  + '" target="_blank">' + JSU_EMAIL +  '</a> </td>'+
  '        <tr/>' +
  '        <tr>' +
  '          <td class="tipl"><label class="tipTitle">JSU GitHub: </label></td>'+
  '          <td class="tipl"><a class="tipLink" href="' +  JSU_GITHUB  + '" target="_blank">' + JSU_GITHUB +  '</a> </td>'+
  '        <tr/>' +
  '        <tr>' +
  '          <td class="tipl"><label class="tipTitle">Cognos CEL Plugin: </label></td>'+
  '          <td class="tipl"><a class="tipLink" href="' +  JSU_COGNOS  + '" target="_blank">' + JSU_COGNOS +  '</a> </td>'+
  '        <tr/>' +
  '        <tr>' +
  '          <td class="tipl"><label class="tipTitle">PL/SQL LOG Package: </label></td>'+
  '          <td class="tipl"><a class="tipLink" href=" 	' +  JSU_PLSQL  + '" target="_blank">' + JSU_PLSQL +  '</a> </td>'+
  '        <tr/>' +
  '      </table></td></tr>' +
  '    </table></td> ' +
  '  </tr>' +
  '  </table> ';
	
	
	TipFix (szTip,event,{szTitle:'JSU AUTHOR'});	
}


/**
 * Tip Info for SortTable
 */
function aboutTipSortInfo(){
	// DAFARE
	var szTip ="<b>OK DAFARE</b>";
	Tip (szTip);
}




/* ================================================================================== 
                                      TIP for Validate
================================================================================== */ 

var JSU_TABLE_VALIDATE_OPT = '	 <table class="tip" BORDER="2" cellpadding="2" width="900px">'+
'				  <tr class="tipTitle"><td colspan="4">cValidate OPTION</td></tr>'+
'				  <tr class="tipTitle2">'+
'				  <td width ="10%">OPTION</td>'+
'				  <td width ="10%">DEFAULT</td>'+
'				  <td width ="80%">DESCRIPTION</td>'+
'     </tr>  '+
'     <tr class="tip">'+
'				  <td><b>bOnErrShowLabel</b></td>'+
'				  <td><i>true</i></td>'+
'				  <td class="tipl"><b>if true</b>: if <label class="jsuAPI">validateApply</label> generates Validate Errors, it shows an error label on the right of the Item</td>'+
'     </tr>'+
'	    <tr class="tip">'+
'				  <td><b>bInstantFieldValidation</b></td>'+
'				  <td><i>false</i></b></td>'+
'				  <td class="tipl"><b>If true</b>: Each Item is Instantly validated on the relative onChange Event</td>'+
'				</tr>'+
'     <tr class="tip">'+
'				  <td><b>bOnErrShowSect</b></td>'+
'				  <td><i>false</i></b></td>'+
'				  <td class="tipl"><b>if true</b>: if <label class="jsuAPI">validateApply</label> generates Validate Errors, it shows a Section in The Top will All the Errors</td>'+
'     </tr>'+
'     <tr class="tip">'+
'				  <td><b>bOnErrShowPopup</b></td>'+
'				  <td><i>false</i></b></td>'+
'				  <td class="tipl"><b>If true</b>: if <label class="jsuAPI">validateApply</label> generates Validate Errors, it shows a Popup with the Error Description</td>'+
'     </tr>'+
'     <tr class="tip">'+
'				  <td><b>bOnErrShowAlarm</b></td>'+
'				  <td><i>false</i></b></td>'+
'				  <td class="tipl"><b>If true</b>: On Single Item Validate Error, it shows an AlarmGif in the Item</td>'+
'	      </tr>'+
'				<tr class="tip">'+
'						  <td><b>bEnphasizeItemBorder</b></td>'+
'						  <td><i>true</i></b></td>'+
'						  <td class="tipl"><b>If true</b>: Mandatory or Error item are Enphasized with bigger border (Red for Validation Error cases)</td>'+
'				</tr>'+
'		</table>';

/**
 * Tip Info for Validate
 * 
 */
function onclickValidateFeature(event, bShowTrySample){
	if (bShowTrySample == undefined){
		bShowTrySample = true;
	}
	var szMsg = '<ul type="square">' +
    '<li><label class="jsuAPI">JSU cValidate (cValidate.js)</label> is based on <a class="tipLink" href="https://validatejs.org/#overview" target="_blank">validate.js</a> constraints Validator, encoded with <b>compact JSON constraints</b>: all the <a class="tipLink" href="https://validatejs.org/#overview" target="_blank">validate.js</a> features are supported and well documentated. '+
    'Example of <b>cValidate.js JSON constraints</b>: Date, Email, Equality, Exclusion, Format, Inclusion, Length, Numerically, URL, .. (see  documentaion: <a class="tipLink" href="https://validatejs.org/#validators" target="_blank">validate.js Validators</a>)</li>'+
    '<li><label class="jsuAPI">cValidate</label> has a <b>Very Simple Interface</b> allowing many flexible and powerful options with only 2 calls:</li>' +
    '  <ul type="none">' +
    '    <li><b>1) Init cValidate with Item constraints and options:</b> <i>cValidateObj1 = new <label class="jsuAPI">cValidate(contraints,objOpt);</label></i><BR/>' +
    '    &nbsp;&nbsp;&nbsp;&nbsp;After point 1) the item Validation and Options (e.g. Instant Validation, Tips,..) are automatically managed by cValidate.js</li>' +
    '    <li><b>2) Apply All Validate Items,</b> for example in the onclick event of Submit/Apply button: <i> var retCode = cValidateObj1.<label class="jsuAPI">validateApply();</label></i></li>' +
    '  </ul>' +
    '<li><b>Many Validation Options</b> are available and can be selected alone or together in whatever combination: ' +
    JSU_TABLE_VALIDATE_OPT + '<BR/></li>' + 
    '<li><b>Many Presentation Options</b> are available (if required they can be easily customized in CSS):' +
    '  <ul type="none">' +
    '    <li><b>1) Enphasize Mandatory Item</b> with a different border (CSS default: double border)</b></li>' +
    '    <li><b>2) Enphasize Error Item</b> with a different border (CSS default: Red border)</b></li>' +
    '    <li><b>3) Display HTML Tip (JSU Tooltip)</b> on the right of the Item to validate</li>' +
    '    <li><b>...</b></li>' +
    '  </ul>' +
    '<li><b>cValidate.js take care of everything:</b> Not only Validation but also all previous options are available <b>without any additional code</b> required: you simply have to set the desired options.</b></li>' +
    '<li><b>Different Validate Groups</b> can be managed separatly in the same page: each cValidate instance in independent, also in the same page</li>'+ 
    '<li><b>Multi language support</b> (<i>jsu/locale/...</i>)</li>' +
    '<li><b>CSS support</b> (<i>jsu/core/core.css</i>): if required you can easily customize presentation</li>' +
    '<li><b>All modern browsers are supported</b>(IE9+, Firefox 3+, Chrome, ...)</li>'+ 
	  '<li><b>No external dependencies</b> at all (pure JS code)</b></li>'+ 
	'</ul>';
	if (bShowTrySample){
	   szMsg += 	'&nbsp;&nbsp;<a class="tipLink" href="javascript:showSampleValidate();" target="_blank">Try JSU cValidate Sample</a><BR/>&nbsp; ';
	}
	
	TipFix (szMsg,event,{szTitle:"JSU cValidate", iTipWidth: 1000,bCloseBtn: true});
}



/* ================================================================================== 
			TIP for Loading
================================================================================== */ 


/**
* Tip Info for Loading
* 
*/
function onclickLoadingFeature(event, bShowTrySample){
	if (bShowTrySample == undefined){
			bShowTrySample = true;
	}
	var szMsg = '<ul type="square">' +
	'<li><label class="jsuAPI">JSU cLoading (cLoading.js)</label> is based on <a class="tipLink" href="https://validatejs.org/#overview" target="_blank">validate.js</a> constraints Validator, encoded with <b>compact JSON constraints</b>: all the <a class="tipLink" href="https://validatejs.org/#overview" target="_blank">validate.js</a> features are supported and well documentated. '+
	'Example of <b>cLoading.js JSON constraints</b>: Date, Email, Equality, Exclusion, Format, Inclusion, Length, Numerically, URL, .. (see  documentaion: <a class="tipLink" href="https://validatejs.org/#validators" target="_blank">validate.js Validators</a>)</li>'+
	'<li><label class="jsuAPI">cLoading</label> has a <b>Very Simple Interface</b> allowing many flexible and powerful options with only 2 calls:</li>' +
	'  <ul type="none">' +
	'    <li><b>1) Init cLoading with Item constraints and options:</b> <i>cLoadingObj1 = new <label class="jsuAPI">cLoading(contraints,objOpt);</label></i><BR/>' +
	'    &nbsp;&nbsp;&nbsp;&nbsp;After point 1) the item Validation and Options (e.g. Instant Validation, Tips,..) are automatically managed by cLoading.js</li>' +
	'    <li><b>2) Apply All Loading Items,</b> for example in the onclick event of Submit/Apply button: <i> var retCode = cLoadingObj1.<label class="jsuAPI">validateApply();</label></i></li>' +
	'  </ul>' +
	'<li><b>Many Validation Options</b> are available and can be selected alone or together in whatever combination: ' +
	JSU_TABLE_LOADING_OPT + '<BR/></li>' + 
	'<li><b>Many Presentation Options</b> are available (if required they can be easily customized in CSS):' +
	'  <ul type="none">' +
	'    <li><b>1) Enphasize Mandatory Item</b> with a different border (CSS default: double border)</b></li>' +
	'    <li><b>2) Enphasize Error Item</b> with a different border (CSS default: Red border)</b></li>' +
	'    <li><b>3) Display HTML Tip (JSU Tooltip)</b> on the right of the Item to validate</li>' +
	'    <li><b>...</b></li>' +
	'  </ul>' +
	'<li><b>cLoading.js take care of everything:</b> Not only Validation but also all previous options are available <b>without any additional code</b> required: you simply have to set the desired options.</b></li>' +
	'<li><b>Different Loading Groups</b> can be managed separatly in the same page: each cLoading instance in independent, also in the same page</li>'+ 
	'<li><b>Multi language support</b> (<i>jsu/locale/...</i>)</li>' +
	'<li><b>CSS support</b> (<i>jsu/core/core.css</i>): if required you can easily customize presentation</li>' +
	'<li><b>All modern browsers are supported</b>(IE9+, Firefox 3+, Chrome, ...)</li>'+ 
	'<li><b>No external dependencies</b> at all (pure JS code)</b></li>'+ 
	'</ul>';
	if (bShowTrySample){
		szMsg += 	'&nbsp;&nbsp;<a class="tipLink" href="' + JSU_URL_SHORT_SAMPLE_LOADING + '" target="_blank">Try JSU cLoading Sample</a><BR/>&nbsp; ';
	}

	TipFix (szMsg,event,{szTitle:"JSU cLoading", iTipWidth: 1000,bCloseBtn: true});
}



/* ========================================================================= 
 						JS CODE SAMPLES DAFARE penso tutto da rimuovere
 ========================================================================= */

var JS_CODE_SORT= "//SORT SAMPLE_1: One JSU call is enough to set the Sort: \n" +
"// 1) create cSortTable related to Table with id='tbl1' \n" +
"var cSortTbl1 = new cSortTable('tbl1', \n" +
" //Describe how to Sort the Table Columns \n" +
"  [{col: 'Country'},  // Default type: SORT_TYPE.DATETIME \n"+  	
"   {col: 'Name'},  // Default type: SORT_TYPE.DATETIME \n"+
"   // For Date we set the FMT_DATETIME_TBL1 = 'NNN dd, yyyy HH:mm:ss' \n"+
"   {col:'Date', type: SORT_TYPE.DATETIME, fmt: FMT_DATETIME_TBL1},\n"+
"   // For NUMBER  we use default separator (used creating the table)\n"+
"   {col: 'Amount', type: SORT_TYPE.NUMBER} ],\n"+  		
"   // OPTION \n" +
"     {szSortCol:'Name',   // Current SortCol \n"+
"     szSortDir:SORT_DIR.ASC, // Current SortDir 	\n"+
"     bSortApply:false   // Table is already sorted\n"+
"});\n" +
"//Now you can Sort the Table by clicking on Colum Header ";

var JS_CODE_VALIDATE= '// 1) Init cValidate with Item constraints, tips and options \n' +
'function initValidate1(){ \n' + 
'  cValidateObj1 = new cValidate ({  \n' + 
'      // Mandatory email   \n' + 
'      email: {  presence: true,  email: true }, \n' + 
'      duration: { // Mandatory Integer in range [1..10] with a tip explaining it \n' + 
'        presence: true, tip: TIP_DURATION,  \n' + 
'        numericality: { onlyInteger: true,  greaterThanOrEqualTo: 1,  lessThanOrEqualTo: 10 } \n' + 
'      }, \n' + 
'      // Optional Birthday in date default format (YYYY-MM-DD) \n' + 
'      birthdate: { date: {} } \n' + 
'    }, \n' + 
'    // OPTION: Id of div to use in case of bOnErrShowSect:true \n' + 
'    {szErrSectId: "errSect1"} \n' + 
'  ); \n' + 
'  // Now the item Validation is managed by cValidate.js \n' + 
'} \n' + 
' \n' + 
' //  2)  At Submit Button Click: we Validate all the items  \n' + 
'function onclickSubmit1() { \n' + 
'  var retCode = cValidateObj1.validateApply(); \n' + 
'} \n';  

var JS_CODE_TIP= '//Define in JS the HTML Tip Msg: \n'+
'var JSU_TIP_HTML="<b>Simple Tooltip</b> with <i>HTML tags</i><br/>Tip (You can use <u>whatever HTML TAG</u>\');" \n\n' + 
'//Add onmouseover="Tip()" and onmouseout="UnTip()" \n'+	
'<input type="text" value="HTML Tip" style="width:60px;" \n' +
'onmouseover="Tip(JSU_TIP_HTML);" onmouseout="UnTip(event)" />'; 



function featureNotReady(){
  Popup (POPUP_TYPE.INFO,'This Feature is still UNDER WORK: it will be available in few weeks');
}


/**
 * download All JSU
 * 
 */
function downloadPay(){
	UnTip();
	featureNotReady;
}

/**
 * download BTN in all Pages
 * We redirect to downloadTageFree
 */
function downloadFree(){
	UnTip();
  jsuGoToURL(JSU_URL_DOWNLOAD_PAGE_FREE,false);
}

/**
* Tip for Button Download Free
* 
* @param event
*/
function downloadTipFree(event){
	downloadTip(event,DOWNLOAD_TIP_TYPE.FREE);
}

/**
* Tip for Button Download Pay
* 
* @param event
*/
function downloadTipPay(event){
	downloadTip(event,DOWNLOAD_TIP_TYPE.PAY);
}

/**
* Tip for Button Download Free: make the download
* 
* @param event
*/
function downloadPageFree(event){
	UnTip();
  location.href=JSU_GITHUB_DOWNLOAD;
	
}


/**
* Tip for Downloading Options
* 
* @param event
* @param [szDownloadTipType] default DOWNLOAD_TIP_TYPE.INFO . DOWNLOAD_TIP_TYPE.FREE, DOWNLOAD_TIP_TYPE.PAY 
*/
function downloadTip(event,szDownloadTipType){
	var Fn = "[about.js downloadTip()] ";
	jslog (JSLOG_JSU,Fn + JSLOG_FUN_START);
	jslog (JSLOG_JSU,Fn + "IN szDownloadTipType=" + szDownloadTipType);
	var szMsg = "";
	var bTipInfo = false;
	if (szDownloadTipType == undefined){
		szDownloadTipType = DOWNLOAD_TIP_TYPE.INFO;
		bTipInfo = true;
	}
	if (!bTipInfo){
		if (szDownloadTipType == DOWNLOAD_TIP_TYPE.FREE){
			szMsg = 'Click to Go to the <b>Download Page of the FREE Version of JSU.ZIP</b> <label class="tipWarnn">(JS Code Obfuscated - Available only Tooltip, SortTable, BlockingPopup Features)</label><BR/><BR/>';
		}else	{
			szMsg = 'Click to Go to the <b>Download Page of the <label class="tipGood">FULL Version of JSU.ZIP</label></b><BR/><BR/>';
		}
  	Tip (szMsg);  	
	}else {
		// TipInfo
		var szMsg = szMsg + '<div style="padding:5px 5px 5px 5px">There are 2 DOWLOAD Options: <ul>' +
		'<li><label class="tipGood">JSU.ZIP FULL:</label> Full access to source code, documentation, samples. Required if you want yo modify/customize/investigate JSU code</li>' +
		'<li><label class="tipWarnn">JSU.ZIP Obfuscated:</label>Only some Features are avalable and everything (JSU and samples) is <label class="tipWarnn">obfuscated</label>. You can only use JSU as it is, as a <b><i>CLOSE BLACK BOX</i></b>.<BR/>You can use JS samples and JSU but their original JS code is not available <i>in clear</i> and all comments have been removed</li>' +
		'</ul></div>' +
		'<table style="padding:5px 5px 5px 5px" class="det" BORDER="2" cellspacing="0" cellpadding="2" width="1000px">' +
		'	  <tr class="detTitle">' +
		'		  <th class="detTitle" colspan="6">JSU.ZIP DOWLOAD OPTIONS</th>' +
		'	  </tr>' +
		'	  <tr class="detTitle2">' +
		'		  <td width="18%" class="tipc">DOWNLOAD OPTION</td>' +
		'		  <td width="34%" class="tipc">JSU Features</td>' +
		'		  <td width="18%" class="tipc">JSU and Samples<BR/>JS Source Code</td>' +
		'		  <td width="18%" class="tipc">JSU Documentation</td>' +
		'		  <td width="12%" class="tipc">Price</td>' +
		'	  </tr>' +
		'	  <tr>' +
		'		  <td class="detTitle2"><input type="button" class="downloadPay"   onclick="downloadPay()" /></td>' +
		'		  <td class="tipGood">Full access: ALL JSU Features available</td>' +
		'		  <td class="tipGood">Full access: Code visible with all comments</td>' +
		'		  <td class="tipGood">Full access: JSDoc HTML with reference to code</td>' +
		'		  <td class="tipErr">FUTURE (Not still available)</td>' +
		'	  </tr>' +
		'	  <tr>' +
		'		  <td class="detTitle2"><input type="button" class="downloadFree"  ' +
		'         onclick="location.href=\'https://github.com/FedericoLevis/JSU/archive/master.zip\';" /></td>' +
		'		  <td class="tipl"><ul><li>AVAILABLE: Tip, SortTable, BlockingPopup</li>' +
		'                          <li><label class="tipErr">NOT AVAILABLE: LoadingDiv, Validate, JSLog, JQPopup</label></li></ul> </td>' +
		'		  <td class="tipErr">JS Obfuscated and without any comments</td>' +
		'		  <td>JSDoc HTML available, but <label class="tipErr">NO reference to code</label></td>' +
		'		  <td style="background-color:#008B45; color:white; font-weight:bold;font-size:16">FREE</td>' +
		'	  </tr>' +
		'</table>';
  	TipFix (szMsg,event,{szTitle:"DOWLOAD OPTIONS", iTipWidth:1000});
	}	
	jslog (JSLOG_JSU,Fn + JSLOG_FUN_END);
}



/*=======================================================================================
 *   URl for DOC
=======================================================================================*/

/**
 * Open window with Validate Documentation
 */
function jsuDocValidate(){
	jsuGoToURL(JSU_URL_DOC_VALIDATE);
}

/**
 * Open window with Tip Documentation
 */
function jsuDocTip(){
	jsuGoToURL(JSU_URL_DOC_TIP);
}
/**
 * Open window with SortTable Documentation
 */
function jsuDocSort(){
	jsuGoToURL(JSU_URL_DOC_SORT);
}
/**
 * Open window with Loading Documentation
 */
function jsuDocLoading(){
	jsuGoToURL(JSU_URL_DOC_LOADING);
}

/**
 * Open window with JSLOG Documentation
 */
function jsuDocJSLog(){
	jsuGoToURL(JSU_URL_DOC_JSLOG);
}
/**
 * Open window with BlockPopup Documentation
 */
function jsuDocBlockPopup(){
	jsuGoToURL(JSU_URL_DOC_BLOCKPOPUP);
}
/**
 * Open window with JQPopup Documentation
 */
function jsuDocJQPopup(){
	jsuGoToURL(JSU_URL_DOC_JQPOPUP);
}


/*=======================================================================
 *    COMMON FOR ALL SAMPLES
 ======================================================================= */

/**
 * show only the COLUMN selected
 */
function onchangeShowCol(){
	var fn = "onchangeShowCol() ";
	var szVal = selectGetSelVal(getElementById2("selectShowCol"));
	jslog (JSLOG_DEBUG, fn + "szVal=" + szVal);
	for (var iRow=0; iRow<=SAMPLE_MAX_NUM; iRow++){
		for (var iCol=1; iCol<=2; iCol++){
			var szColId = "col_" + iRow + "_" + iCol;
			jslog (JSLOG_DEBUG, fn + "szColId=" + szColId + "  bShow=" + bShow);
			var el = getElementById2(szColId,false);
			if (el){
				var bShow = (szVal == SAMPLE_COL_ALL ||  szVal == iCol+"");
				el.style.display = (bShow) ? "" : "none";
				el.style.visibility = bShow;
			}else{
				jslog (JSLOG_DEBUG, fn + "szColId=" + szColId + "  NOT PRESENT in THIS Feature sample");
			}
		}
	}
}

/*
 * show only the sample selected
 */
function onchange_sample(){
	var fn = "onchange_sample ";
	var szVal = selectGetSelVal(getElementById2("selectSample"));
	jslog (JSLOG_JSU, fn + "szVal=" + szVal);
	for (var i=1; i<=SAMPLE_MAX_NUM; i++){
		var bShow = (szVal == SAMPLE_ALL ||  szVal == i+"");
		var elTr = getElementById2("tr_sample_" + i, false);
		if (elTr){
			jslog (JSLOG_JSU, fn + "tr i=" + i + "  bShow=" + bShow);
			elTr.style.display = (bShow) ? "" : "none";
			elTr.style.visibility = bShow;
		}
	}
}




/*
 * Manage optional URL PAR show_opt, useful only for developers. Called by all samples
 * 
 * GLOBAL
 *  b_par_opt   set to TRUE if there is URL par opt=1   if 1 we see Optional Columns used to Show/Hide Column in Test
 */
function manage_par_opt(){
	var fn = "manage_par_opt() ";
	var szParOpt = urlGetParVal (URL_PAR_OPT);
	jslog (JSLOG_JSU,fn + "URL PAR " + URL_PAR_OPT + "=" + szParOpt);
	b_par_opt = (szParOpt != ""); 
	if (b_par_opt){
		jslog (JSLOG_JSU,fn + "show selectShowCol");
		elementShow (getElementById2("selectShowCol"),true,"");
		// URL
		var szLocation = window.location + ""; 
		var bJsLog = szLocation.indexOf ("jslogSample") > 0;
		// set preferred size to prepare YouTube Video 
		if (bJsLog){
		  window.moveTo(85, 34);
		  window.resizeTo(1200, 800);
		}else{
		  window.moveTo(85, 34);
		  window.resizeTo(800+35, 620+170);
		}
	}	
	// var URL_PAR_TEST="test"; // 0= No TEST  1.. Number of Automatic Test to execute with Test Google Button 
	// var URL_PAR_PERIOD="period"; // Number of second sin randfom period  default = 60
	try {
		var iParTest = urlGetParVal (URL_PAR_TEST);
		jslog (JSLOG_JSU,fn + "URL:  " + URL_PAR_TEST + "=" + iParTest);
		var bTest = (iParTest != undefined &&  iParTest != "");
		jslog (JSLOG_JSU,fn + "bTest=" + bTest);
		elementShow(getElementById2("testGoogle",true), bTest);
		if (bTest){
			par_test = parseInt(iParTest);
		}
		var iParPeriod = urlGetParVal (URL_PAR_PERIOD);
		jslog (JSLOG_JSU,fn + "URL:  " + URL_PAR_PERIOD + "=" + iParPeriod );
		if (iParPeriod != undefined &&  iParPeriod != ""){
			par_period = parseInt(iParPeriod);
		}
	}catch (e) {
		jslog (JSLOG_ERR,fn + "Exception: " + e.message);
	}
	
	//
}

/**
 * 
 * @returns  b_par_opt {Boolean}  TRUE if there is URL par opt=1
 */
function is_par_opt (){
	return b_par_opt;
}


/*===================================================================================
 *  FOR SAMPLES NOT FREE
===================================================================================*/

 


/*
 * 
 * @param szUrl e.g: "https://rawgit.com/FedericoLevis/JSU/master/samples/Validate/ValidateSample.html"
 * @param iId   1 ,3, 5, 7
 * 
 * @return e.g:  https://rawgit.com/FedericoLevis/WORK/master/3/samples/Validate/ValidateSample.html 
 */
function getSampleUrl(szUrl,iId){
	if (URL_SHORT_GOOGLE){
    if (iId == JSU_ID_SAMPLE_LOADING){
   	  return "https://goAALl/j0HZDG".replace ("AAL","o.g");
    }else if (iId == JSU_ID_SAMPLE_VALIDATE){
     	  return "https://goAALl/F3r4lP".replace ("AAL","o.g");
    }else if (iId == JSU_ID_SAMPLE_JSLOG){
   	  return "https://goAALl/OfC2Pf".replace ("AAL","o.g");
    }else if (iId == JSU_ID_SAMPLE_JQPOPUP){
   	  return "https://goAALl/09zCLG".replace ("AAL","o.g");
    }		
	}else{
	  return szUrl.replace("JSU/master",URL_1 + URL_SEP + URL_2 + URL_SEP + 
         (iId + ((((Math.floor((Math.random() * 100) + 7) > 5) ? 0 : 1) == 0) ? "" : "3")));
	}
  
}


/*
 * 
 */
function showSampleLoading(){
  showSampleWindow(JSU_URL_LONG_SAMPLE_LOADING, JSU_ID_SAMPLE_LOADING);
}


/*
 * 
 */
function showSampleValidate(){
  showSampleWindow(JSU_URL_LONG_SAMPLE_VALIDATE, JSU_ID_SAMPLE_VALIDATE);
}


/*
 * 
 */
function showSampleSort(){
	jsuGoToURL(JSU_URL_SHORT_SAMPLE_SORT);
}
/*
 * 
 */
function showSampleTip(){
	jsuGoToURL(JSU_URL_SHORT_SAMPLE_TIP);
}
/*
 * 
 */
function showSampleBlockPopup(){
	jsuGoToURL(JSU_URL_SHORT_SAMPLE_BLOCKPOPUP);
}


/*
 * 
 */
function showSampleJSlog(){
  showSampleWindow(JSU_URL_LONG_SAMPLE_JSLOG, JSU_ID_SAMPLE_JSLOG);
}


/*
 * 
 */
function showSampleJQPopup(){
  showSampleWindow(JSU_URL_LONG_SAMPLE_JQPOPUP, JSU_ID_SAMPLE_JQPOPUP);
}

/*
 * Show a Window with a Sample, to manage NOT FREE JS FEatures
 * 
 * @param szUrl e.g: "https://rawgit.com/FedericoLevis/JSU/master/samples/Validate/ValidateSample.html"
 * @param iId   1 ,3, 5, 7
 * 
 */
function showSampleWindow(szUrl,iId){
	var bTest = false;
	// To manage Mobile, where window.open seems to work
	var bSmallWindow = window.innerWidth <= 800;
	var ua = navigator.userAgent;
	var bMobile = ( ua.match(/Android/i) || ua.match(/webOS/i) || ua.match(/iPhone/i)	 || ua.match(/iPad/i) || 
			 ua.match(/iPod/i) || ua.match(/BlackBerry/i) || ua.match(/Windows Phone/i) );
	
	if (bSmallWindow || bMobile || bTest){
		// start with URL
		jsuGoToURL (getSampleUrl(szUrl,iId));
	}else {
	  window.open(getSampleUrl(szUrl,iId),	"_blank","menubar=1,resizable=1,menubar=1,width=100,height=100");
    window.moveTo(10, 20);
	}

}

/*
 * Only for samples that are not FREE we have to setup location 
 */
function setupState(){
	// URK
	var szLocation = window.location + ""; 
	var bRawGit = szLocation.indexOf ("FedericoLevis") > 0;
	if (bRawGit){
	  history.replaceState(null, null,JSU_URL_SHORT_SAMPLE_NOTFREE);
	}  
  window.moveTo(10, 20);
  window.resizeTo(screen.width-20, screen.height-30);
}


/*===================================================================================
 *  show Video
===================================================================================*/

/**
 * onchange for select videoOpt
 * 
 * GLOBAL   OUT: video_opt used by showJSUVideo..
 */
function onchangeVideoOpt(){
	video_opt = selectGetSelVal (getElementById2("videoOpt"));
}


/**
 * WE use an Hidden a tag, for compatibility with MObile (instead of using window.open)
 * 
 * @param szUrl
 * @param [bNewWindow] {Boolean} default true
 * @returns
 */
function jsuGoToURL(szUrl,bNewWindow){
	if (bNewWindow == undefined){
		bNewWindow = true;
	}
	var aEl = getElementById2("href_hidden");
	aEl.href = szUrl;
	aEl.target = (bNewWindow)? "_blank" : "_self";
	aEl.click();
}


/**
 * 
 * @param szVideoFrame
 * @param szTitle
 * @param iWidth
 * @returns
 */
function showJSUVideo(szVideoFrame,szTitle,iWidth){
	if (video_opt == VIDEO_OPT.POPUP){
	  Popup(POPUP_TYPE.INFO, szVideoFrame, {bShowImg:false,iWidth:iWidth,position:{at: "top"}, szTitle: szTitle});
	}else{
		jsuGoToURL ("https://youtu.be/wpo2oM_L3ds");
	}

}

function showJSUVideoTip(){
	showJSUVideo (JSU_VIDEO_FRAME_TIP,"JSU Tooltip Sample",800);
}


function showJSUVideoLoading(){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_LOADING,
    {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "JSU Loading Table Sample"});
  */  
}


function showJSUVideoSort(){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_SORT,
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "JSU Sort Table Sample"});
  */    
}




function showJSUVideojslog(){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_JSLOG,
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "JSU jslog Sample"});
  */    
}



function showJSUVideoJQPopup(){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_JQPOPUP,
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "JSU JQPopup Sample"});
  */    
}

function showJSUVideoBlockPopup(){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_BLOCKPOPUP,
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "JSU Blocking Popup Sample"});
  */    
}

function showJSUVideoSort(){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_SORT,
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "JSU Sort Table Sample"});
  */    
}

function showJSUVideoValidate(){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_VALIDATE,
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "JSU Validate Table Sample"});
  */    
}



/**
 * Show a FixedTip with the Link to JSU Google Analytics
 * @param event
 */
function jsuGoogleAnal (event){
	var Fn = "[about.js jsuGoogleAnal()] ";
	var GA_CAT_DOWN = "JSU DOWNLOAD";
	var GA_CAT_SAMPLE_FREE = "JSU FREE Version: SAMPLES";
	var GA_CAT_SAMPLE_FULL = "JSU FULL Version: SAMPLES";
	var GA_CAT_DOC_FREE = "JSU FREE Version: DOC";
	var GA_CAT_DOC_FULL = "JSU FULL Version: DOC";
	jslog (JSLOG_JSU,Fn + JSLOG_FUN_START);
  UnTip(event);	
  
  // Prepare arObjGoogleAnal: Only shortUrl is mandatory (if other fields are not present, they are not displayed). 
  // In this case we populate all fields
  var arObjGoogleAnal = [
       {shortUrl: JSU_URL_DOWNLOAD_PAGE_FREE, longUrl: JSU_LONG_URL_DOWNLOAD_PAGE_FREE , cat:GA_CAT_DOWN,desc:'Download JSU.ZIP FREE'},
       {shortUrl: JSU_URL_SHORT_SAMPLE_ALL, longUrl: JSU_LONG_URL_SAMPLE_ALL,cat:GA_CAT_SAMPLE_FREE, desc:'Main JSU Sample'},
       {shortUrl: JSU_URL_SHORT_SAMPLE_TIP, longUrl: JSU_LONG_URL_SAMPLE_TIP,cat:GA_CAT_SAMPLE_FREE, desc:'Tooltip Sample'},
       {shortUrl: JSU_URL_SHORT_SAMPLE_SORT, longUrl: JSU_LONG_URL_SAMPLE_SORT, cat:GA_CAT_SAMPLE_FREE, desc:'SortTable Sample'},
       {shortUrl: JSU_URL_SHORT_SAMPLE_BLOCKPOPUP, longUrl: JSU_LONG_URL_SAMPLE_BLOCKPOPUP, cat:GA_CAT_SAMPLE_FREE,desc:'Blocking Popup Sample'},
       // --------------------------
       {shortUrl: JSU_URL_DOC, longUrl: JSU_LONG_URL_DOC, cat:GA_CAT_DOC_FREE,desc:'JSU Documentation'},
       {shortUrl: JSU_URL_DOC_TIP, longUrl: JSU_LONG_URL_DOC_TIP, cat:GA_CAT_DOC_FREE,desc:'JSU Tooltip Documentation'},
       {shortUrl: JSU_URL_DOC_LOADING, longUrl: JSU_LONG_URL_DOC_LOADING, cat:GA_CAT_DOC_FREE,desc:'JSU LoadingDiv Documentation'},
       {shortUrl: JSU_URL_DOC_SORT, longUrl: JSU_LONG_URL_DOC_SORT, cat:GA_CAT_DOC_FREE,desc:'JSU SortTable Documentation'}
       // --------------------------
       /*
       ,{shortUrl: JSU_URL_SHORT_SAMPLE_LOADING, longUrl: JSU_LONG_URL_SAMPLE_LOADING, cat:GA_CAT_SAMPLE_FULL,desc:'LoadingDiv Sample'},
       {shortUrl: JSU_URL_SHORT_SAMPLE_VALIDATE, longUrl: JSU_LONG_URL_SAMPLE_VALIDATE, cat:GA_CAT_SAMPLE_FULL,desc:'Validate Sample'},
       {shortUrl: JSU_URL_SHORT_SAMPLE_JSLOG, longUrl: JSU_LONG_URL_SAMPLE_JSLOG, cat:GA_CAT_SAMPLE_FULL,desc:'JSLog Sample'},
       {shortUrl: JSU_URL_SHORT_SAMPLE_JQPOPUP, longUrl: JSU_LONG_URL_SAMPLE_JQPOPUP, cat:GA_CAT_SAMPLE_FULL,desc:'JQ Popup Sample'},
       {shortUrl: JSU_URL_DOC_VALIDATE, longUrl: JSU_LONG_URL_DOC_VALIDATE, cat:GA_CAT_DOC_FULL,desc:'JSU Validate Doc'},
       {shortUrl: JSU_URL_DOC_JSLOG, longUrl: JSU_LONG_URL_DOC_JSLOG, cat:GA_CAT_DOC_FULL,desc:'JSU JSLog Doc'},
       {shortUrl: JSU_URL_DOC_BLOCKPOPUP, longUrl: JSU_LONG_URL_DOC_BLOCKPOPUP, cat:GA_CAT_DOC_FULL,desc:'JSU Blocking Popup Doc'},
       {shortUrl: JSU_URL_DOC_JQPOPUP, longUrl: JSU_LONG_URL_DOC_JQPOPUP, cat:GA_CAT_DOC_FULL,desc:'JSU JS Popup Doc'}
       */
     ];
  var bUrl = false;
  if (bUrl){
    TipFixGoogleAnal(arObjGoogleAnal,event,{
    	szTitle:'JSU Google Analitycs',
    	iTipWidth: 1200  // Tip Width 
    });
  }else{
    TipFixGoogleAnal(arObjGoogleAnal,event,{
    	bShortUrl: false,
    	bLongUrl: false,
    	szTitle:'JSU Google Analitycs',
    	iTipWidth: 800  // Tip Width 
    });
  }
  
  
	jslog (JSLOG_JSU,Fn + JSLOG_FUN_END);
	
}

/**
 * Show GoogleAnalytic FloatingTip
 * @param event
 */
function jsuGoogleAnalTip (event){
	Tip (JSU_GOOGLE_ANAL_TIP);
}



/* ---------------------------------------------------------------------------------------------------------------------
 * 					TEST GOOGLE ANALYTICS
--------------------------------------------------------------------------------------------------------------------- */
var tmoTest = null;
// arTestUrl.length;
var test_cur = 0;

/**
 * Test Google
 * @param event
 */
function onclickTestGoogle(){
	var Fn = "[about.js  showAllGoogleShort()] ";
	test_cur =0;
	var iSec = Math.floor((Math.random() * 10) + 1);
	jslog (JSLOG_DEBUG,Fn + "START tmo " + iSec + " sec");
	tmoTest = setTimeout (testGoogle,iSec * 1000);
}



function testGoogle(){
	var Fn = "[about.js testGoogle()] ";
	// URL under TEST
	var arTestUrl = [JSU_URL_DOWNLOAD_PAGE_FREE
	                 ,JSU_URL_SHORT_SAMPLE_ALL,JSU_URL_SHORT_SAMPLE_TIP,JSU_URL_SHORT_SAMPLE_SORT, JSU_URL_SHORT_SAMPLE_BLOCKPOPUP
	                 ,JSU_URL_DOC,JSU_URL_DOC_TIP,JSU_URL_DOC_LOADING,JSU_URL_DOC_SORT,JSU_URL_DOC_VALIDATE
	                 // ,JSU_URL_SHORT_SAMPLE_LOADING,JSU_URL_SHORT_SAMPLE_JSLOG,JSU_URL_SHORT_SAMPLE_JQPOPUP,JSU_URL_SHORT_SAMPLE_VALIDATE
	                 // ,JSU_URL_DOC_JSLOG, JSU_URL_DOC_BLOCKPOPUP, JSU_URL_DOC_JQPOPUP
	                 ];
	var iTestUrlNum = arTestUrl.length;
	var i = Math.floor(Math.random() * arTestUrl.length);
	jslog (JSLOG_DEBUG,Fn + "test_cur=" + test_cur +  " Index under Test i=" + i);
	var szUrl = arTestUrl[i];
	jslog (JSLOG_DEBUG,Fn + "LAUNCH szUrl=" + szUrl);
	jsuGoToURL(szUrl, true);
	clearTimeout (testGoogle);
	
	if (++test_cur > par_test){
		alert ("FINE Test Executed=" + par_test);
	}else {
		var iSec = Math.floor((Math.random() * par_period) + 1);
		jslog (JSLOG_DEBUG,Fn + "START tmo " + iSec + " sec");
		tmoTest = setTimeout (testGoogle,iSec * 1000);
	}
		
}



function onclickTest(){
	alert ('ok');
}