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

// var TMO_DOC_EMBED_STARTUP_MS = 500; 

//-------------------------- Optional PAR only for debugger 

var URL_PAR_OPT="opt"; // if 1 we see Optional Columns used to Show/Hide Column in Test
// -- Test google, used only by AllSamples.html
var URL_PAR_TEST="test"; // 0= No TEST  1.. Number of Automatic Test to execute with Test Google Button 
var URL_PAR_PERIOD="period"; // Number of second sin randfom period  default = 60 


var JSU_TIP_PLAY_VIDEO='<div style="width:300px;">Click to Show a <b>YouTube Video of this JSU feature</b>';
var JSU_TIP_BROWSER_ALL='<div style="width:500px">' +
   'This Feature is <b>Fully supported by All Browser</b><BR/>It has been successfully tested in <label class="tipGoodBold">Safari, Chrome, Firefox, Opera, IE, Android</label></div>';
var JSU_TIP_BROWSER_IE_POPUP='<div style="width:450px">' +
'IE Popup is designed ONLY for IE:<ul>' +
'<li><label class="tipGoodBold">Browser Supported: ONLY IE</label></li>' +
'<li><label class="tipErrBold">Browser NOT Supported: Safari, Chrome, Firefox, Opera, Android</li>' +
'</ul>' +
'In the browser not supported IE Popup will simply display an Alert instead of the HTML Popup'
'</div>';

var JSU_TIP_DOC="Click to Show the <b>JSU Documentation</b>";
var JSU_TIP_DOC_TIP="Click to Show the <b>JSU Tooltip Documentation</b>";
var JSU_TIP_DOC_SORT="Click to Show the <b>JSU SortTable Documentation</b>";
var JSU_TIP_DOC_VALIDATE="Click to Show the <b>JSU Validate Documentation</b>";
var JSU_TIP_DOC_IEPOPUP="Click to Show the <b>JSU IE Popup Documentation</b>";
var JSU_TIP_DOC_JQPOPUP="Click to Show the <b>JSU JQuery Popup Documentation</b>";
var JSU_TIP_DOC_LOADING="Click to Show the <b>JSU LoadingDiv Documentation</b>";
var JSU_TIP_DOC_JSLOG="Click to Show the <b>JSU JSLogDocumentation</b>";

// ---------------------------- TITLE (simple tooltip without HTML TAGS
var JSU_TITLE_BROWSER_ALL = "This Feature is Fully supported by All Browser. It has been successfully tested in Safari, Chrome, Firefox, Opera, IE, Android";
var JSU_TITLE_BROWSER_IEPOPUP = "IE Popup is designed ONLY for IE. Only IE Browser is Supported. In the browser not supported IE Popup will simply display an Alert instead of the HTML Popup. ";
//---------------------------

var DOWNLOAD_TIP_TYPE={
		INFO: "INFO",
		FREE: "FREE",
		PAY: "PAY"
};



var JSU_EMAIL = "federico.levis@virgilio.it";  
var JSU_LONG_URL_COGNOS = "http://federicolevis.wix.com/cognos";
var JSU_LONG_URL_GITHUB = "https://github.com/FedericoLevis/JSU";
var JSU_LONG_URL_PLSQL = "https://github.com/FedericoLevis/PLSQLUtility";


var JSU_IMG_PLAY_VIDEO = "https://rawgit.com/FedericoLevis/images/master/jsuAbout/PlayVideo.png";

var JSU_SORT_CODE_H = 220;

var JSU_DISABLED = 'javascript:function() { return false; }';

var JSU_FREE_ZIP = "https://github.com/FedericoLevis/JSU/archive/master.zip";

var JSU_BUY = JSU_DISABLED; 


// ---------------------------------------
var SAMPLE_MAX_NUM=4; // Max sample per Feature in the samples
var SAMPLE_COL_ALL="ALL";


var JSU_URL_VIDEO_TIP= "https://youtu.be/wpo2oM_L3ds";


// NOTE: embed is visible in the Ember Tab of Youtube Video  

var JSU_VIDEO_FRAME_TIP  =	'<iframe width="750" height="600" src="https://www.youtube.com/embed/wpo2oM_L3ds?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
//DAFARE
var JSU_VIDEO_FRAME_VALIDATE  =	'<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
var JSU_VIDEO_FRAME_SORT  =	'<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
var JSU_VIDEO_FRAME_LOADING  =	'<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
var JSU_VIDEO_FRAME_JSLOG  =	'<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
var JSU_VIDEO_FRAME_IEPOPUP  =	'<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
var JSU_VIDEO_FRAME_JQPOPUP  =	'<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 

// Samples
// --------------- FEATURE NOT FREE URL run-time calculated  
var SHORT_URL_GOOGLE = true;  // Use Google Short URL

var JSU_LONG_URL_SAMPLE_VALIDATE =	"https://rawgit.com/FedericoLevis/JSU/master/samples/Validate/ValidateSample.html";
//var JSU_SHORT_URL_SAMPLE_LOADING  =	"https://rawgit.com/FedericoLevis/WORK/master/3/samples/Validate/ValidateSample.html";


var JSU_LONG_URL_SAMPLE_JQPOPUP  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/JQPopup/PopupSample.html";
//var JSU_SHORT_URL_SAMPLE_JQPOPUP  =	"https://rawgit.com/FedericoLevis/WORK/master/7/samples/JQPopup/PopupSample.html";


// ------------------
var JSU_LONG_URL_DOWNLOAD_PAGE_FREE  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/JSUFreeDownload.html";


var JSU_LONG_URL_SAMPLE_ALL  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/AllSamples.html";
var JSU_LONG_URL_SAMPLE_SORT  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/Sort/SortSample.html";
var JSU_LONG_URL_SAMPLE_TIP  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/Tip/TipSample.html";
var JSU_LONG_URL_SAMPLE_GA  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/GoogleAnal/GoogleAnalSample.html";
var JSU_LONG_URL_SAMPLE_IEPOPUP  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/IEPopup/PopupSample.html";
var JSU_LONG_URL_SAMPLE_LOADING  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/Loading/LoadingSample.html";
var JSU_LONG_URL_SAMPLE_JSLOG  =	"https://rawgit.com/FedericoLevis/JSU/master/samples/jslog/jslogSample.html";

//----------- goo.gl of FREE Features
var JSU_SHORT_URL_DOWNLOAD_FREE  =	"https://goo.gl/HnNqnM";
var JSU_SHORT_URL_SAMPLE_ALL  =	"https://goo.gl/MoY5nK";
var JSU_SHORT_URL_SAMPLE_TIP  =	"https://goo.gl/1e6ju7";
var JSU_SHORT_URL_SAMPLE_GA  =	"http://goo.gl/UzfnFK";
var JSU_SHORT_URL_SAMPLE_SORT  = "https://goo.gl/hJm8vV";
var JSU_SHORT_URL_SAMPLE_IEPOPUP  =	"https://goo.gl/1b2ely";
var JSU_SHORT_URL_SAMPLE_LOADING  =	"https://goo.gl/jttCME";
var JSU_SHORT_URL_SAMPLE_VALIDATE =	"https://goo.gl/F3r4lP";
var JSU_SHORT_URL_SAMPLE_JSLOG  =	"https://goo.gl/aAtyxG";
var JSU_SHORT_URL_SAMPLE_JQPOPUP  =	"https://goo.gl/09zCLG";
var JSU_SHORT_URL_GITHUB = "https://goo.gl/LYDepH";
var JSU_SHORT_URL_COGNOS = "http://goo.gl/JZJSPn";
var JSU_SHORT_URL_PLSQL = "https://goo.gl/OI3eIo";
var JSU_SHORT_URL_LINKEDIN = "https://goo.gl/J9mJfh";  
//---------------------
var JSU_LONG_URL_LINKEDIN = "https://www.linkedin.com/in/federicolevis";  

// Used to replace location of sample not free
var JSU_LONG_URL_SAMPLE_NOTFREE = 'https://rawgit.com/FedericoLevis/JSU/master/samples/Misc/SampleNotFree.html'
// ID sample NOt FREE (see WORK dir)
var JSU_ID_SAMPLE_VALIDATE  =	3;
var JSU_ID_SAMPLE_JQPOPUP  =	7;
	
	
//----------------------- API DOC
var JSU_LONG_URL_API  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html";
var JSU_LONG_URL_API_TIP  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/tooltip.js/index.html";
var JSU_LONG_URL_API_GA  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/googleAnal.js/index.html";
var JSU_LONG_URL_API_LOADING  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/loadingDiv.js/index.html";
var JSU_LONG_URL_API_SORT  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/cSortTable.js/index.html";
var JSU_LONG_URL_API_VALIDATE  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/cValidate.js/index.html";
var JSU_LONG_URL_API_JSLOG  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/jslog.js/index.html";
var JSU_LONG_URL_API_IEPOPUP  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/IEPopup.js/index.html";
var JSU_LONG_URL_API_JQPOPUP  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/JQPopup.js/index.html";

var JSU_SHORT_URL_API  ="https://goo.gl/0PGnZl"

/* TBD if we need them	
var JSU_SHORT_URL_API_TIP  =	"https://goo.gl/AGKlpQ";
var JSU_SHORT_URL_API_LOADING  =	"https://goo.gl/0tIOIJ";
var JSU_SHORT_URL_API_SORT  =	"https://goo.gl/aKR7b2";
var JSU_SHORT_URL_API_VALIDATE  =	"https://goo.gl/M7LT4v";
var JSU_SHORT_URL_API_JSLOG  =	"https://goo.gl/Iobg3a";
var JSU_SHORT_URL_API_IEPOPUP  =	"https://goo.gl/iWW5cz";
var JSU_SHORT_URL_API_JQPOPUP  =	"https://goo.gl/iPqUqL";
*/


//----------------------- FEATURE DOC
var JSU_LONG_URL_DOC  =	"https://rawgit.com/FedericoLevis/JSU/master/README.html";
var JSU_LONG_URL_DOC_SORT  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/SortTable.html";
var JSU_LONG_URL_DOC_VALIDATE  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/Validate.html";
var JSU_LONG_URL_DOC_TIP  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/Tooltip.html";
var JSU_LONG_URL_DOC_GA  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/GoogleAnalytics.html";
var JSU_LONG_URL_DOC_LOADING  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/LoadingDiv.html";
var JSU_LONG_URL_DOC_JSLOG  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/jslog.html";
var JSU_LONG_URL_DOC_IEPOPUP  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/IEPopup.html";
var JSU_LONG_URL_DOC_JQPOPUP  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/JQPopup.html";

//----------------------- FEATURE DOC - par for FEature Only in FULL version
var JSU_LONG_URL_DOC_GA_ONLYFULL  =	JSU_LONG_URL_DOC_GA + "#parOnlyFullJsu";


// ---- ggo.gl
var JSU_SHORT_URL_DOC  =	"https://goo.gl/JzIXW0";
var JSU_SHORT_URL_DOC_TIP  =	"https://goo.gl/AGKlpQ";
var JSU_SHORT_URL_DOC_GA  =	"http://goo.gl/UYJ5Zv";
var JSU_SHORT_URL_DOC_SORT  =	"https://goo.gl/aKR7b2";
var JSU_SHORT_URL_DOC_VALIDATE  =	"https://goo.gl/M7LT4v";
var JSU_SHORT_URL_DOC_LOADING  =	"https://goo.gl/0tIOIJ";
var JSU_SHORT_URL_DOC_JSLOG  =	"https://goo.gl/Iobg3a";
var JSU_SHORT_URL_DOC_IEPOPUP  =	"https://goo.gl/ZJBCrl";
var JSU_SHORT_URL_DOC_JQPOPUP  =	"https://goo.gl/hZ5U6M";


//
var JSU_SHORT_URL_VERSION  =	"https://goo.gl/1eIYNm";
var JSU_LONG_URL_VERSION  =	"https://rawgit.com/FedericoLevis/JSUDoc/master/JSUversion.html";
var JSU_LONG_URL_VERSION_PAR_LIMIT  =	JSU_LONG_URL_VERSION + "#par1.2.1";


// used as Link for JSU in about
var JSU_SITE = JSU_SHORT_URL_DOC; 



// COMMON for all samples
var SAMPLE_MAX_NUM=4; // MAX Number of Sample
var SAMPLE_ALL="ALL";

var URL_1 = "WORK";
var URL_2 = "master";
var URL_SEP = "/";


//Div with hidden anchor
var JSU_DIV_HIDDEN_ID = "jsuDivHidden";
var JSU_HREF_HIDDEN_ID = "jsuHrefHidden";
// init to whatver href, then it will be changed run-time
var JSU_HREF_HIDDEN = '<a id="' + JSU_HREF_HIDDEN_ID +'" target="_blank" style="display:none" href="https://goo.gl/HnNqnM" >HIDDEN</a>'; 


/* =============================================================================================
    			MAIN JSU TIP:  JSU_TIP_SECT2 
 ============================================================================================= */
//Not allowed:  Reference to other Sub-Tip
//allowed:   Popup call
 
var JSU_TIP_SECT2_FEAT =  '<table class="tip" BORDER="2" cellspacing="0" cellpadding="2" width="780">' +
'	  <tr class="tipTitle">' +
'		  <th class="tipTitle" colspan="6">JSU FEATURES</th>' +
'	  </tr>' +
'	  <tr class="tipTitle2">' +
'		  <td width="60px" class="tipc">Feature<BR/>Doc</td>' +
'		  <td width="280px" class="tipc">Description</td>' +
'		  <td width="70px" class="tipc">Browser Compatibility</td>' +
'		  <td width="60px" class="tipc">Plugin Required</td>' +
'		  <td width="60px" class="tipc">YouTube<BR/>Video Sample  ' +
'     </td>' +
'		  <td width="70px" class="tipc">Try an Example</td>' +
'	  </tr>' +
'	  <tr >' +
'		  <td class="tipc"><a class="tipLink" href="javascript:jsuDocTip(true);">Tooltip</a> </td>' +
'		  <td class="tipl"><b>Floating/Fixed Tips</b> with GIF, Video, Code Highlight (JS, CSS, Java, Shell,...), <b>Google Analytics</b>     </td>' + 
'     <td class="tipc"><input type="button"  class="browserAllSmall" title="' + JSU_TITLE_BROWSER_ALL + '"/> </td> ' +
'		  <td class="tipc tipGoodBold" rowspan="7">No Plugin is required</b></td>' +
'     <td class="tipc"><a href="javascript:jsuVideoTip()"> <input type="button" class="playVideoSmall" title="Click to Show a YouTube Video of Tooltip Feature"/></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleTip();">Tooltip Sample</a></td>' +
'	  </tr>' +
'	  <tr >' +
'		  <td class="tipc"><a class="tipLink" href="javascript:jsuDocGA(true);">Google Analytics</a> </td>' +
'		  <td class="tipl">JSU API to build in few minutes a User Friendly List of Links to <b>Google Analytics</b></td>' + 
'     <td class="tipc"><input type="button"  class="browserAllSmall" title="' + JSU_TITLE_BROWSER_ALL + '"/> </td> ' +
'     <td class="tipc"><a href="javascript:jsuVideoGA()"> <input type="button" class="playVideoSmall" title="Click to Show a YouTube Video of Google Analytics Feature"/></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleGA();">Google Analytics Sample</a></td>' +
'	  </tr>' +
'	  <tr >' + 
'		  <td class="tipc"><a class="tipLink" href="javascript:jsuDocLoading(true);">Loading Div</a> </td>' +
'		  <td class="tipl"><b>Loading Div</b> for Long Operation with <b>Loading Gif, Title, Message, ElapsedSec...</b></td>' +
'     <td class="tipc"><input type="button"  class="browserAllSmall" title="' + JSU_TITLE_BROWSER_ALL + '"/> </td> ' +
'     <td class="tipc"><a href="javascript:jsuVideoLoading()"> <input type="button" class="playVideoSmall" title="Click to Show a YouTube Video of LoadingDiv Feature"/></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleLoading();">LoadingDiv Sample</a></td>' +
'	  </tr>' +
'	  <tr>' +
'		  <td class="tipc"><a class="tipLink" href="javascript:jsuDocJSLog(true);" target="_blank">jslog</a> </td>' +
'		  <td class="tipl">Log from JS Code into an optional Window: <b>log Object, JSON, DOM ...</b></td>' + 
'     <td class="tipc"><input type="button"  class="browserAllSmall" title="' + JSU_TITLE_BROWSER_ALL + '"/> </td> ' +
'     <td class="tipc"><a href="javascript:jsuVideoJSLog()"> <input type="button" class="playVideoSmall" title="Click to Show a YouTube Video of JSLog Feature"/></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleJSlog();">JSlog Sample</a></td>' +
'	  </tr>' +
'	  <tr>' +
'		  <td class="tipc"><a class="tipLink" href="javascript:jsuSort(true);" target="_blank">Table Sort</a> </td>' +
'		  <td class="tipl"><b>Sort HTML Table</b> by clicking column header</td>' + 
'     <td class="tipc"><input type="button"  class="browserAllSmall" title="' + JSU_TITLE_BROWSER_ALL + '"/> </td> ' +
'     <td class="tipc"><a href="javascript:jsuVideoSort()"> <input type="button" class="playVideoSmall" title="Click to Show a YouTube Video of SortTable Feature"/></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleSort();">SortTable Sample</a></td>' +
'	  </tr>' +
'	  <tr>' +
'		  <td class="tipc"><a class="tipLink" href="javascript:jsuIEPopup(true);" target="_blank">IE Popup</a> </td>' +
'		  <td class="tipl"><b>Modal/Blocking Popup</b> designed ONLY for <b>IE</b><BR/><b> </td>' + 
'     <td class="tipc"><input type="button"  class="browserIESmall" title="' + JSU_TITLE_BROWSER_IEPOPUP + '"/> </td> ' +
'     <td class="tipc"><a href="javascript:jsuVideoIEPopup()"> <input type="button" class="playVideoSmall" title="Click to Show a YouTube Video of IE Popup Feature"/></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleIEPopup();">IE Popup Sample</a></td>' +
'	  </tr>' +
'	  <tr>' +
'		  <td class="tipc"><a class="tipLink" href="javascript:jsuDocValidate(true);" target="_blank">Validate</a> </td>' +
'		  <td class="tipl"><b>Validate Items</b> with many constraints/options</BR>Show Validate Errors in Section, Items, Popup ...</td>' + 
'     <td class="tipc"><input type="button"  class="browserAllSmall" title="' + JSU_TITLE_BROWSER_ALL + '"/> </td> ' +
'     <td class="tipc"><a href="javascript:jsuVideoValidate()"> <input type="button" class="playVideoSmall" title="Click to Show a YouTube Video of Validate Feature"/></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleValidate();">Validate Sample</a></td>' +
'	  </tr>' +
'	  <tr>' +
'		  <td class="tipc"><a class="tipLink" href="javascript:jsuDocJQPopup(true);" target="_blank">JQ Popup</a> </td>' +
'		  <td class="tipl"><b>Modal Popup for whatever Browser</b><BR/><b>Not Blocking code</b> with callback function</td>' + 
'     <td class="tipc"><input type="button"  class="browserAllSmall" title="' + JSU_TITLE_BROWSER_ALL + '"/> </td> ' +
'		  <td class="tipc"><b>jquery, jquery-ui</b></td>' + 
'     <td class="tipc"><a href="javascript:jsuVideoJQPopup()"> <input type="button" class="playVideoSmall" title="Click to Show a YouTube Video of JQ Popup Feature"/></a></td> ' +  
'		  <td class="tipc"><a class="tipLink" href="javascript:showSampleJQPopup();">JQ Popup Sample</a></td>' +
'	  </tr>' +
'</table>';

//Message on the right of the Table of Features
var JSU_TIP_SECT2_MSG = '<a class="tipLink" href="'+ JSU_SITE +'" target="_blank">JSU</a> is a <b>JavaScript Utility</b>  library very Lightweight, powerful and simply to use:' +
'<ul type="square">' +
'<li><b>Very Easy to Install and try</b>: download JSU ZIP and try jsu/samples/AllSamples.html (that points to all the other samples)</li>'+ 
'<li><b>Very Simple to include in your project</b> with only one JS file: as displayed in the various JSU samples, the desired JSU modules are loaded with require.js using the proper plugin/jsu.js file </li>'+ 
'<li><b>No dependencies for most of the JSU Features (Pure JS features):</b> only if you include JQ Popup, it is required jquery and jquery-ui</li>'+ 
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
'  <td width="50%" class="tipl"  style="padding-left:5px;padding-right:5px;font-size:11px;">' + JSU_TIP_SECT2_MSG + '</td>' +
'</tr>' +
'</table>';



/* =============================================================================================
   						GLOBAL VAR
============================================================================================= */
//TRUE if there is URL par opt=1

var url_par = {
	doc : undefined,
	test : 100,
	period: 60,
	opt : undefined
};


var tmo_resize = null;



/* =============================================================================================
									GLOBAL API
============================================================================================= */


/**
 * JSU About Popup Example
 */
function showJsuPopupAbout(){

	var szMsg = '<table class="tip" BORDER="1" cellspacing="0" cellpadding="2" width="1250px">' +
  '  <tr class="jsuAbout jsuAboutHea">' +
  '    <td><table class="tipNoBorder" width="100%"><tr>' +
  '      <td  align="center" class="jsuAboutTitle"> <img class="jsuAboutTitle" src="https://rawgit.com/FedericoLevis/images/master/jsuAbout/jsuAboutTitle.png"/></td> ' +
  '      <td ><table class="tipNoBorder" width="100%"><tr>' +
  '        <td align="right" width="40%"><img class="jsuAboutJust" src="'  + JSU_PATH_ABOUT_IMG + 'jsuAboutJust.gif"/></td>' +
  '        <td align="center" width="20%"><img class="jsuAboutSimple" src="'  + JSU_PATH_ABOUT_IMG + 'jsuAboutSimple.gif"/></td>' +
  '        <td align="left" width="40%"><img class="jsuAboutUse" src="'  + JSU_PATH_ABOUT_IMG + 'jsuAboutUse.gif"/></td>' +
  '      </tr></table></td> ' +
  '    </tr></table></td>' +
  '  </tr>' +
  '  <tr class="jsuAboutMsg"><td class="tipl" >' + JSU_TIP_SECT2 + '</td></tr> ' +
  '</table>';
  Popup(POPUP_TYPE.INFO, szMsg,	{ bShowImg: false, szTitle: "JSU ABOUT", iWidth: 1300, position: {at: "top"}});
}



/**
 * Show the Big Tip for all JSU Feature 
 * @param event
 * @param [bShowAllSample] {Boolean} def true
 */
function aboutTipFixJSU(event,bShowAllSample){
	var Fn = "[about.js aboutTipFixJSU] ";
	if (bShowAllSample == undefined){
		bShowAllSample = true;
	}
	// for JSUDoc we disable the choice
	// var szLocation = window.location + ""; 
	// var bJSUDoc = szLocation.indexOf ("JSUDoc") >= 0;
	
	var szMsg = '<table class="tip" BORDER="1" cellspacing="0" cellpadding="2" width="1300px">' +
  '  <tr class="jsuAbout jsuAboutHea">' +
  '    <td >' +
  '      <table class="jsuHeaderNoBorder"  width="100%">' +
  '        <tr>' +
  '          <td  align="left" class="jsuAboutTitle" width="40%"> <img class="jsuAboutTitle" src="'  + JSU_PATH_ABOUT_IMG + 'jsuAboutTitle.png"/></td> ' +
  '          <td  align="left" class="jsuAboutTitle" width="27%">' +
  '            <table class="tipNoBorder" width="100%">' +
  '		           <tr><td class="tipl jsuVersion">' + JSU_VERSION +  '</td></tr>' +
  '		           <tr><td class="tipl"><a class="tipLink" href="'+ JSU_SHORT_URL_DOC +'" target="_blank">JSU Feature documentation</a> </td></tr>' +
  '		           <tr><td class="tipl"><a class="tipLink" href="'+ JSU_SHORT_URL_API +'" target="_blank">JSU API documentation</a> </td></tr>';
	if (bShowAllSample){
		szMsg = szMsg +	
	   '		       <tr><td class="tipl"><a class="tipLink" href="'+ JSU_SHORT_URL_SAMPLE_ALL +'" target="_blank">JSU: All Samples</a> </td></tr>';
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
  '  <tr class="jsuAboutMsg"><td class="tipl">' + JSU_TIP_SECT2  + '</td></tr> ' +
  '  <tr class="jsuAbout jsuAboutFooter" >' +
  ' </tr></table>';
	TipFix (szMsg,event,{iTipWidth:1300, szTitle: "JSU: JS Utility FEATURES"});	
}

/**
 * Tip for Author(title)
 */
function aboutTipAuthor(event){
	var szTip = '<div style="width=800px"><table class="tip" BORDER="1" cellspacing="0" cellpadding="2" width="100%">' +
  '  <tr>' +
  '    <td width="230px" align="left"> <img width="230px" src="'  + JSU_PATH_ABOUT_IMG + 'FedericoLevis.jpg"/></td> ' +
  '    <td ><table class="tipNoBorder" width="100%">' +
  '      <tr><td align="left"><label class="tipTitleBig">Federico Levis</label></td><tr/>' +
  '      <tr><td align="left">SW Engineer - Developer, Architect & Team Leader specialist in:<BR/>' +
  '              Java, JS, DB, SQL, PL/SQL, Cognos, C++, Perl & Unix Script</td><tr/>' +
  '      <tr><td ><table class="tipNoBorder" width="100%">' +
  '        <tr>' +
  '          <td width="180px" class="tipl"><label class="tipTitle">Linkedin CV: </label></td>'+
  '          <td class="tipl"><a class="tipLink" href="' +  JSU_SHORT_URL_LINKEDIN  + '" target="_blank">' + JSU_LONG_URL_LINKEDIN +  '</a> </td>'+
  '        <tr/>' +
  '        <tr>' +
  '          <td class="tipl"><label class="tipTitle">Email: </label></td>'+
  '          <td class="tipl"><a class="tipLink" href="mailto:' +  JSU_EMAIL  + '" target="_blank">' + JSU_EMAIL +  '</a> </td>'+
  '        <tr/>' +
  '        <tr>' +
  '          <td class="tipl"><label class="tipTitle">JSU: </label></td>'+
  '          <td class="tipl"><a class="tipLink" href="' +  JSU_SHORT_URL_DOC  + '" target="_blank">' + JSU_LONG_URL_DOC +  '</a> </td>'+
  '        <tr/>' +
  '        <tr>' +
  '          <td class="tipl"><label class="tipTitle">Cognos CEL Plugin: </label></td>'+
  '          <td class="tipl"><a class="tipLink" href="' +  JSU_SHORT_URL_COGNOS  + '" target="_blank">' + JSU_LONG_URL_COGNOS +  '</a> </td>'+
  '        <tr/>' +
  '        <tr>' +
  '          <td class="tipl"><label class="tipTitle">PL/SQL LOG Package: </label></td>'+
  '          <td class="tipl"><a class="tipLink" href=" 	' +  JSU_SHORT_URL_PLSQL  + '" target="_blank">' + JSU_LONG_URL_PLSQL +  '</a> </td>'+
  '        <tr/>' +
  '      </table></td></tr>' +
  '    </table></td> ' +
  '  </tr>' +
  '  </table></div> ';
	
	
	TipFix (szTip,event,{szTitle:'JSU AUTHOR',iTipWidth:830});	
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
		szMsg += 	'&nbsp;&nbsp;<a class="tipLink" href="' + JSU_SHORT_URL_SAMPLE_LOADING + '" target="_blank">Try JSU cLoading Sample</a><BR/>&nbsp; ';
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
function downloadPay(event){
	UnTip();
	featureNotReady();
}

/**
 * The download BTN in all Pages, that Open the DownLOad Page
 */
function downloadFree(event){
	var fn = "[about.js downloadFree()] ";
	jslog(JSLOG_DEBUG, fn + JSLOG_FUN_START);
	ga('send', {
	  hitType: 'event',
	  eventCategory: 'DownloadFree',
	  eventAction: 'BtnView',
	  eventLabel: 'OpenPage'
	});

	UnTip();
	/* Old
  jsuGoToURL(JSU_SHORT_URL_DOWNLOAD_FREE,false);
  */
	var szTipFrame =	'<iframe width="1030" height="580" src="' + JSU_SHORT_URL_DOWNLOAD_FREE + '" ></iframe>'; 
	TipFix(szTipFrame,event,{
		 iTipWidth: 1070,
		 szTitle:'Download FREE JSU.zip',
		 objClass: {Down: 'downloadFree', Up: 'downloadFreeUp'},  // we pass the Custom Classes used
		 bCloseBtn : false
	 }
	);
	jslog(JSLOG_DEBUG, fn + JSLOG_FUN_END);
	
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
* Tip for Button Download Free: Execute the download of JSU.zip
* 
* @param event
*/
function downloadFreeExecute(event){
	var Fn = "[about.js downloadFreeExecute()] ";
	jslog (JSLOG_DEBUG,Fn + JSLOG_FUN_START);
	UnTip();
	jslog (JSLOG_DEBUG,Fn + "send event ");
	ga('send', {
	  hitType: 'event',
	  eventCategory: 'DownloadFree',
	  eventAction: 'master.zip',
	  eventLabel: 'master.zip'
	});

	// ga('send', 'pageView',JSU_FREE_ZIP);
	
	
	jslog (JSLOG_DEBUG,Fn + "URL = " + JSU_FREE_ZIP);
	jsuGoToURL(JSU_FREE_ZIP, true);
	jslog (JSLOG_DEBUG,Fn + JSLOG_FUN_END);
	
  // location.href=JSU_FREE_ZIP;
	
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
			szMsg = '<div>Click to <b>Download the FREE Version of JSU.ZIP</b><BR/><BR/> ' +
			'<table class="tipNote"><tr> ' +
		  '  <td class="tipNote"><input class="tipNote"></td> ' +
		  '  <td><label class="tipWarnBold">FREE JSU.zip has some limitation: </label><ul>' +
			'    <li>JS Code Obfuscated</li>' +
			'    <li>NOT All Features are present and there are some limitation</li>' +
			'    <li>JS Code documentation is not so detailed and completed like FULL JSU</li>' +
			'  <ul/> ' +
			'  </td> ' +
		  '</tr></table> </div>';
		}else	{
			szMsg = 'Click to Go to the <b>Download Page of the <label class="tipGood">FULL Version of JSU.ZIP</label></b><BR/><BR/>';
		}
  	Tip (szMsg);  	
	}else {
		// TipInfo
		var szMsg = szMsg + '<div align="left" style="padding:5px 5px 5px 5px">There are 2 DOWLOAD Options: <ul>' +
		'<li><label class="tipGoodBold">JSU.ZIP FULL:</label> Full access to source code, documentation, samples. Required if you want yo modify/customize/investigate JSU code</li>' +
		'<li><label class="tipWarnBold">JSU.ZIP FREE (Obfuscated):</label>&nbsp;Only some Features are avalable and everything (JSU and samples) is <label class="tipWarnn">obfuscated and without comments</label></li>' +
		'</ul>' +
		'For the details see <a class="tipLink" href="javascript:showJSUVersion();">Possible JSU Version to download</a> or following abstract:<BR/>' +
		'</div>' +
		'<table style="padding:5px 5px 5px 5px" class="det" BORDER="2" cellspacing="0" cellpadding="2" width="1000px">' +
		'	  <tr class="detTitle">' +
		'		  <th class="detTitle" colspan="6">JSU.ZIP DOWLOAD OPTIONS</th>' +
		'	  </tr>' +
		'	  <tr class="detTitle2">' +
		'		  <td width="14%" class="tipc">DOWNLOAD OPTION</td>' +
		'		  <td width="36%" class="tipc">JSU Features</td>' +
		'		  <td width="20%" class="tipc">JSU and Samples<BR/>JS Source Code</td>' +
		'		  <td width="18%" class="tipc">JSU Documentation</td>' +
		'		  <td width="12%" class="tipc">Price</td>' +
		'	  </tr>' +
		'	  <tr>' +
		'		  <td class="tipc"><input type="button" style="margin-left:0px" class="downloadPay"   onclick="downloadPay();" /></td>' +
		'		  <td class="tipGoodBold">Full access: ALL JSU Features available</td>' +
		'		  <td class="tipGoodBold">Full access: Code visible with all comments</td>' +
		'		  <td class="tipGoodBold">Full access: JSDoc HTML with reference to code</td>' +
		'		  <td class="tipErrBold">FUTURE (Not still available)</td>' +
		'	  </tr>' +
		'	  <tr>' +
		'		  <td class="tipc"><input type="button" style="margin-left:0px" class="downloadFree"  ' +
		'         onclick="downloadFree();" /></td>' +
		'		  <td class="tipl"><ul><li>AVAILABLE (with some Limitation): Tooltip, LoadingDiv, SortTable, JSLog, IEPopup</li>' +
		'                          <li><label class="tipErrBold">NOT AVAILABLE: Validate, JQPopup</label></li></ul> </td>' +
		'		  <td class="tipErrBold">JS Obfuscated and without any comments</td>' +
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
 * Open window with JSU Documentation
 * @param [bNewWindow] {Boolean} default true
 */
function jsuDoc(bNewWindow){
	if (bNewWindow == undefined){
		bNewWindow = true;
	}
	jsuGoToURL(JSU_SHORT_URL_DOC,bNewWindow);
}


/**
 * Open window with Validate Documentation
 * @param [bNewWindow] {Boolean} default true
 */
function jsuDocValidate(bNewWindow){
	if (bNewWindow == undefined){
		bNewWindow = true;
	}
	jsuGoToURL(JSU_SHORT_URL_DOC_VALIDATE,bNewWindow);
}

/**
 * Open window with Tip Documentation
 * @param [bNewWindow] {Boolean} default true
 */
function jsuDocTip(bNewWindow){
	if (bNewWindow == undefined){
		bNewWindow = true;
	}
	jsuGoToURL(JSU_SHORT_URL_DOC_TIP,bNewWindow);
}
/**
 * Open window with SortTable Documentation
 * @param [bNewWindow] {Boolean} default true
 */
function jsuDocSort(bNewWindow){
	if (bNewWindow == undefined){
		bNewWindow = true;
	}
	jsuGoToURL(JSU_SHORT_URL_DOC_SORT,bNewWindow);
}
/**
 * Open window with Loading Documentation
 * @param [bNewWindow] {Boolean} default true
 */
function jsuDocLoading(bNewWindow){
	if (bNewWindow == undefined){
		bNewWindow = true;
	}
	jsuGoToURL(JSU_SHORT_URL_DOC_LOADING,bNewWindow);
}

/**
 * Open window with JSLOG Documentation
 * @param [bNewWindow] {Boolean} default true
 */
function jsuDocJSLog(bNewWindow){
	if (bNewWindow == undefined){
		bNewWindow = true;
	}
	jsuGoToURL(JSU_SHORT_URL_DOC_JSLOG,bNewWindow);
}
/**
 * Open window with IEPopup Documentation
 * @param [bNewWindow] {Boolean} default true
 */
function jsuDocIEPopup(bNewWindow){
	if (bNewWindow == undefined){
		bNewWindow = true;
	}
	jsuGoToURL(JSU_SHORT_URL_DOC_IEPOPUP,bNewWindow);
}
/**
 * Open window with JQPopup Documentation
 * @param [bNewWindow] {Boolean} default true
 */
function jsuDocJQPopup(bNewWindow){
	if (bNewWindow == undefined){
		bNewWindow = true;
	}
	jsuGoToURL(JSU_SHORT_URL_DOC_JQPOPUP,bNewWindow);
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
 * Common init par all samples, Called by all samples
 *  - Manage optional URL PAR show_opt, useful only for developers. 
 *  - show label of FREE Limits if we are in FREE JSU
 *  - ....
 * GLOBAL
 *  url_par   set in this routine 
 */
function initSampleCmn(){
	var fn = "initSampleCmn() ";
	try{
		
		//-----------------------------------------------------------
		var szParOpt = urlGetParVal (URL_PAR_OPT);
		jslog (JSLOG_JSU,fn + "URL PAR " + URL_PAR_OPT + "=" + szParOpt);
		if (szParOpt != ""){
			url_par.opt = szParOpt;
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
		var iParTest = urlGetParVal (URL_PAR_TEST);
		jslog (JSLOG_JSU,fn + "URL:  " + URL_PAR_TEST + "=" + iParTest);
		var bTest = (iParTest != undefined &&  iParTest != "");
		jslog (JSLOG_JSU,fn + "bTest=" + bTest);
		elementShow(getElementById2("test",false), bTest);
		if (bTest){
			par_test = parseInt(iParTest);
		}
		var iParPeriod = urlGetParVal (URL_PAR_PERIOD);
		jslog (JSLOG_JSU,fn + "URL:  " + URL_PAR_PERIOD + "=" + iParPeriod );
		if (iParPeriod != undefined &&  iParPeriod != ""){
			par_period = parseInt(iParPeriod);
		}
		// ----------------------------
		if (isJsuFree()){
		 // show Label with Limitition for FREE JSU
	  		var el = getElementById2("sample_limit", false);
	  		if (el != 0){
		    	elementShow (el, true,"block");
	  		}
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
	return (url_par.opt != undefined);
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
	if (SHORT_URL_GOOGLE){
    if (iId == JSU_ID_SAMPLE_VALIDATE){
   	  return "https://goAALl/F3r4lP".replace ("AAL","o.g");
    }else if (iId == JSU_ID_SAMPLE_JQPOPUP){
   	  return "https://goAALl/09zCLG".replace ("AAL","o.g");
    }		
	}else{
	  return szUrl.replace("JSU/master",URL_1 + URL_SEP + URL_2 + URL_SEP + 
         (iId + ((((Math.floor((Math.random() * 100) + 7) > 5) ? 0 : 1) == 0) ? "" : "3")));
	}
  
}


/*
 * NOT FREE 
 */
function showSampleValidate(){
  showSampleWindow(JSU_LONG_URL_SAMPLE_VALIDATE, JSU_ID_SAMPLE_VALIDATE);
}

/*
 * NOT FREE
 */
function showSampleJQPopup(){
  showSampleWindow(JSU_LONG_URL_SAMPLE_JQPOPUP, JSU_ID_SAMPLE_JQPOPUP);
}




/*
 * 
 */
function showSampleLoading(bNewWindow){
	jsuGoToURL(JSU_SHORT_URL_SAMPLE_LOADING,bNewWindow);
}


/*
 * 
 */
function showSampleSort(bNewWindow){
	jsuGoToURL(JSU_SHORT_URL_SAMPLE_SORT,bNewWindow);
}
/*
 * 
 */
function showSampleTip(bNewWindow){
	jsuGoToURL(JSU_SHORT_URL_SAMPLE_TIP,bNewWindow);
}

/*
 * 
 */
function showSampleGA(bNewWindow){
	jsuGoToURL(JSU_SHORT_URL_SAMPLE_GA,bNewWindow);
}

/*
 * 
 */
function showSampleJSlog(bNewWindow){
	jsuGoToURL(JSU_SHORT_URL_SAMPLE_JSLOG,bNewWindow);
}

/*
 * 
 */
function showSampleIEPopup(bNewWindow){
	jsuGoToURL(JSU_SHORT_URL_SAMPLE_IEPOPUP,bNewWindow);
}


function showJSUVersion(bNewWindow){
	jsuGoToURL(JSU_SHORT_URL_VERSION,bNewWindow);
}

/**
 * Go to the Page.par Free
 */
function showJSUVersionParLimit(bNewWindow){
	jsuGoToURL(JSU_LONG_URL_VERSION_PAR_LIMIT,bNewWindow);
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
	  history.replaceState(null, null,JSU_LONG_URL_SAMPLE_NOTFREE);
	}  
  window.moveTo(10, 20);
  window.resizeTo(screen.width-20, screen.height-30);
}



/**
 * 
 * @param szVideoFrame
 * @param szTitle
 * @param iWidth
 * @returns
 */
function jsuVideo(szVideoFrame,szTitle,iWidth){
	Popup(POPUP_TYPE.INFO, szVideoFrame, {bShowImg:false,iWidth:iWidth,position:{at: "top"}, szTitle: szTitle});
  // jsuGoToURL ("https://youtu.be/wpo2oM_L3ds");

}

function jsuVideoTip(bNewWindow){
	jsuGoToURL(JSU_URL_VIDEO_TIP,bNewWindow);
}


function jsuVideoLoading(bNewWindow){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_LOADING,
    {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "Loading Table Sample"});
  */  
}


function jsuVideoSort(bNewWindow){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_SORT,
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "Sort Table Sample"});
  */    
}




function jsuVideojslog(bNewWindow){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_JSLOG,
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "JSLog Sample"});
  */    
}



function jsuVideoJQPopup(bNewWindow){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_JQPOPUP,
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "JQ Popup Sample"});
  */    
}

function jsuVideoIEPopup(bNewWindow){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_IEPOPUP,
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "IE Popup Sample"});
  */    
}


function jsuVideoValidate(bNewWindow){
	featureNotReady();
	/*
  Popup(POPUP_TYPE.INFO, JSU_VIDEO_FRAME_VALIDATE,
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "Validate Table Sample"});
  */    
}



/**
 * Show a FixedTip with the Link to JSU Google Analytics
 * @param event
 */
function jsuGoogleAnalList (event){
	var Fn = "[about.js jsuGoogleAnalList()] ";
	var GA_CAT_DOWN = "JSU DOWNLOAD";
	var GA_CAT_SAMPLE_FREE = "JSU FREE - SAMPLES";
	var GA_CAT_SAMPLE_FULL = "JSU FULL - SAMPLES";
	var GA_CAT_DOC_FREE = "JSU FREE - DOC";
	var GA_CAT_DOC_FULL = "JSU FULL - DOC";
	jslog (JSLOG_JSU,Fn + JSLOG_FUN_START);
  UnTip(event);	
  
  // Prepare arObjGoogleAnal: only shortUrl is mandatory  
  // In this case we populate all fields
  var arObjGaList = [
       {shortUrl: JSU_SHORT_URL_DOWNLOAD_FREE, longUrl: JSU_LONG_URL_DOWNLOAD_PAGE_FREE , cat:GA_CAT_DOWN,desc:'Download JSU.ZIP FREE'},
       {shortUrl: JSU_SHORT_URL_SAMPLE_ALL, longUrl: JSU_LONG_URL_SAMPLE_ALL,cat:GA_CAT_SAMPLE_FREE, desc:'Main JSU Sample'},
       {shortUrl: JSU_SHORT_URL_SAMPLE_TIP, longUrl: JSU_LONG_URL_SAMPLE_TIP,cat:GA_CAT_SAMPLE_FREE, desc:'Tooltip Sample'},
       {shortUrl: JSU_SHORT_URL_SAMPLE_GA, longUrl: JSU_LONG_URL_SAMPLE_GA,cat:GA_CAT_SAMPLE_FREE, desc:'Google Analytics Sample'},
       {shortUrl: JSU_SHORT_URL_SAMPLE_LOADING, longUrl: JSU_LONG_URL_SAMPLE_LOADING, cat:GA_CAT_SAMPLE_FREE,desc:'LoadingDiv Sample'},
       {shortUrl: JSU_SHORT_URL_SAMPLE_JSLOG, longUrl: JSU_LONG_URL_SAMPLE_JSLOG, cat:GA_CAT_SAMPLE_FREE,desc:'JSLog Sample'},
       {shortUrl: JSU_SHORT_URL_SAMPLE_SORT, longUrl: JSU_LONG_URL_SAMPLE_SORT, cat:GA_CAT_SAMPLE_FREE, desc:'SortTable Sample'},
       {shortUrl: JSU_SHORT_URL_SAMPLE_IEPOPUP, longUrl: JSU_LONG_URL_SAMPLE_IEPOPUP, cat:GA_CAT_SAMPLE_FREE,desc:'IE Popup Sample'},
       // --------------------------
       {shortUrl: JSU_SHORT_URL_DOC, longUrl: JSU_LONG_URL_DOC, cat:GA_CAT_DOC_FREE,desc:'JSU Documentation'},
       {shortUrl: JSU_SHORT_URL_DOC_TIP, longUrl: JSU_LONG_URL_DOC_TIP, cat:GA_CAT_DOC_FREE,desc:'JSU Tooltip Documentation'},
       {shortUrl: JSU_SHORT_URL_DOC_GA, longUrl: JSU_LONG_URL_DOC_GA, cat:GA_CAT_DOC_FREE,desc:'JSU Tooltip Documentation'},
       {shortUrl: JSU_SHORT_URL_DOC_LOADING, longUrl: JSU_LONG_URL_DOC_LOADING, cat:GA_CAT_DOC_FREE,desc:'JSU Google Analytics Documentation'},
       {shortUrl: JSU_SHORT_URL_DOC_JSLOG, longUrl: JSU_LONG_URL_DOC_JSLOG, cat:GA_CAT_DOC_FULL,desc:'JSU JSLog Doc'},
       {shortUrl: JSU_SHORT_URL_DOC_SORT, longUrl: JSU_LONG_URL_DOC_SORT, cat:GA_CAT_DOC_FREE,desc:'JSU SortTable Documentation'},
       {shortUrl: JSU_SHORT_URL_DOC_IEPOPUP, longUrl: JSU_LONG_URL_DOC_IEPOPUP, cat:GA_CAT_DOC_FULL,desc:'JSU IE Popup Doc'}
       // --------------------------
       /*
       {shortUrl: JSU_SHORT_URL_SAMPLE_JQPOPUP, longUrl: JSU_LONG_URL_SAMPLE_JQPOPUP, cat:GA_CAT_SAMPLE_FULL,desc:'JQ Popup Sample'},
       {shortUrl: JSU_SHORT_URL_SAMPLE_VALIDATE, longUrl: JSU_LONG_URL_SAMPLE_VALIDATE, cat:GA_CAT_SAMPLE_FULL,desc:'Validate Sample'},
       {shortUrl: JSU_SHORT_URL_DOC_VALIDATE, longUrl: JSU_LONG_URL_DOC_VALIDATE, cat:GA_CAT_DOC_FULL,desc:'JSU Validate Doc'},
       {shortUrl: JSU_SHORT_URL_DOC_JQPOPUP, longUrl: JSU_LONG_URL_DOC_JQPOPUP, cat:GA_CAT_DOC_FULL,desc:'JSU JQ Popup Doc'}
       */
       
       
     ];
  // show the TipFix with the List of Link
  gaShortUrlList(arObjGaList,event,{
    	bShortUrl: false,   // ShortUrl not visible at startup
    	bLongUrl: false,  // LongUrl not visible at startup
    	szTitle:'JSU Google Analitycs',
    	iWidth: 1100  // Tip Width   
    });
  
  
	jslog (JSLOG_JSU,Fn + JSLOG_FUN_END);
	
}

/**
 * Show GoogleAnalyticList FloatingTip
 * @param event
 */
function jsuGoogleAnalListTip (event){
	var szTip='<div style="width:500px;" align="left">Click to show a Box with Links to the '+
     '<b>JSU Google Analytics</b>: <BR/>Number of <b>JSU Downloads</b>, Number of <b>access to Samples, Documentation,</b> ...</div>';
	
	Tip (szTip);
}


/**
 * Show GoogleAnalytic Free FloatingTip
 * @param event
 */
function jsuGoogleAnalFreeTip (event){
	var szTip='<div style="width:300px;" align="left">Click to show <b>Google Analytics Page</b><BR/>' + 
     'with the number of <b>FREE JSU.zip downloads</b></div>';
	Tip (szTip);
}

/**
 * GoTo GoogleAnalytic Page relative to Free download Numbers
 * @param event
 */
function jsuGoogleAnalFree (event){
	var fn = "[about.js jsuGoogleAnalFree()] ";
	jslog (JSLOG_JSU,fn + JSLOG_FUN_START);
	UnTip();
	jsuGoToURL(JSU_SHORT_URL_DOWNLOAD_FREE +'.info' ,true);
	jslog (JSLOG_JSU,fn + JSLOG_FUN_END);
}

/**
 * Show GoogleAnalytic Pay FloatingTip
 * @param event
 */
function jsuGoogleAnalPayTip (event){
	var szTip='<div style="width:300px;" align="left">Click to show <b>Google Analytics Page</b><BR/>' + 
     'with the number of <b>FULL JSU.zip downloads</b></div>';
	Tip (szTip);
}

/**
 * GoTo GoogleAnalytic Page relative to Pay download Numbers
 * @param event
 */
function jsuGoogleAnalPay(event){
	UnTip();
	// jsuGoToURL(JSU_SHORT_URL_DOWNLOAD_PAY +'.info' ,true);
	featureNotReady();
}



function jsuTipPlayVideo(event){
	Tip (JSU_TIP_PLAY_VIDEO);
}
function jsuTipBrowserAll(event){
	Tip (JSU_TIP_BROWSER_ALL);
}
function jsuTipBrowserIEPopup(event){
	Tip (JSU_TIP_BROWSER_IE_POPUP);
}



/**
 * Called by HTML Doc 
 * @param event
 */
function tipFixLimitInJSUFree(event){
	var szTip="//JS Code to Sort an HTML Table with JSU cSortTable: you need only one JSU API call. \n" +
	"// 1) create cSortTable related to Table with id='tbl1' \n" +
	"var cSortTbl1 = new cSortTable('tbl1', \n" +
	" //Describe how to Sort the Table Columns \n" +
	"  [{col: 'Country'},  // Default type: SORT_TYPE.STRING \n"+  	
	"   {col: 'Name'},  // Default type: SORT_TYPE.STRING \n"+
	"   // For Date we set the FMT_DATETIME_TBL1 = 'NNN dd, yyyy HH:mm:ss' \n"+
	"   {col:'Date', type: SORT_TYPE.DATETIME, fmt: FMT_DATETIME_TBL1},\n"+
	"   // For NUMBER  we use default separator (used creating the table)\n"+
	"   {col: 'Amount', type: SORT_TYPE.NUMBER} ],\n"+  		
	"   // OPTION \n" +
	"     {szSortCol:'Name',   // Current SortCol (we have already Popolated the Table order by this col)\n"+
	"     szSortDir:SORT_DIR.ASC, // Current SortDir (we have Popolated the Table in this way)	\n"+
	"     bSortApply:false   //  Table is already sorted\n"+
	"});\n" +
	"//Now you can Sort the Table by clicking on Colum Header ";
	
	TipFixCode(szTip,event,
				 {iTipWidth:1000,
			    iTipMaxHeight:600,
			    szTitle:'TipFixCode Sample - JS Code is not Hightlighted in FREE Version'
			   });	
}

/* ---------------------------------------------------------------------------------------------------------------------
 * 					TEST GOOGLE ANALYTICS
--------------------------------------------------------------------------------------------------------------------- */

var var_test = {
		tmoTest: null,
		iTestCur:  0,
    bFrame:  false		
};


/**
 * Test Google
 * @param bFrame  true for Frame
 */
function testStart(bFrame){
	var Fn = "[about.js  showAllGoogleShort()] ";
	var_test.iTestCur =0;
	var_test.bFrame = bFrame;
	var iSec = Math.floor((Math.random() * 10) + 1);
	jslog (JSLOG_DEBUG,Fn + "START tmo " + iSec + " sec");
	getElementById2("testDone",true).value = var_test.iTestCur;
	getElementById2("testTmo",true).value = iSec;
	var_test.tmoTest = setTimeout (testExecute,iSec * 1000);
}



function testExecute(){
	var Fn = "[about.js testExecute()] ";
	// URL under TEST
	var arTestUrl = [JSU_SHORT_URL_DOWNLOAD_FREE
	                 ,JSU_SHORT_URL_SAMPLE_ALL,JSU_SHORT_URL_SAMPLE_TIP,JSU_SHORT_URL_SAMPLE_GA,JSU_SHORT_URL_SAMPLE_SORT, JSU_SHORT_URL_SAMPLE_IEPOPUP
	                 ,JSU_SHORT_URL_DOC,JSU_SHORT_URL_DOC_TIP,JSU_SHORT_URL_DOC_GA,JSU_SHORT_URL_DOC_LOADING,JSU_SHORT_URL_DOC_SORT,JSU_SHORT_URL_DOC_VALIDATE
	                 // ,JSU_SHORT_URL_SAMPLE_LOADING,JSU_SHORT_URL_SAMPLE_JSLOG,JSU_SHORT_URL_SAMPLE_JQPOPUP,JSU_SHORT_URL_SAMPLE_VALIDATE
	                 // ,JSU_SHORT_URL_DOC_JSLOG, JSU_SHORT_URL_DOC_IEPOPUP, JSU_SHORT_URL_DOC_JQPOPUP
	                 ];
	var iTestUrlNum = arTestUrl.length;
	var i = Math.floor(Math.random() * arTestUrl.length);
	jslog (JSLOG_DEBUG,Fn + "var_test.iTestCur=" + var_test.iTestCur +  " Index under Test i=" + i);
	var szUrl = arTestUrl[i];
	jslog (JSLOG_DEBUG,Fn + "LAUNCH szUrl=" + szUrl);
	if (var_test.bFrame){
		UnTip();
		var szTipFrame =	'<iframe width="1200" height="100" src="' + szUrl + '" ></iframe>'; 
		TipFix(szTipFrame,null,{
			 iTipWidth: 1200,
			 szTitle:szUrl,
			 objClass: {Down: 'downloadFree', Up: 'downloadFreeUp'},  // we pass the Custom Classes used
			 bCloseBtn : false,
			 szRefElId : 'downloadFree' 
		 }
		);
		
	}else {
		jsuGoToURL(szUrl, true);
	}
	clearTimeout (var_test.tmoTest);
	var_test.iTestCur++ ;
	getElementById2("testDone",true).value = var_test.iTestCur;
	getElementById2("testURL",true).value = szUrl;
	if (var_test.iTestCur > par_test){
		alert ("FINE Test - Executed=" + par_test);
	}else {
		var iSec = Math.floor((Math.random() * par_period) + 1);
		getElementById2("testTmo",true).value = iSec;
		jslog (JSLOG_DEBUG,Fn + "START tmo " + iSec + " sec");
		var_test.tmoTest = setTimeout (testExecute,iSec * 1000);
	}		
}






/*===================================================================================
 *  Fake Click
===================================================================================*/


function fakeClick(event, anchorObj) {
  if (anchorObj.click) {
    anchorObj.click()
  } else if(document.createEvent) {
    if(event.target !== anchorObj) {
      var evt = document.createEvent("MouseEvents"); 
      evt.initMouseEvent("click", true, true, window, 
          0, 0, 0, 0, 0, false, false, false, false, 0, null); 
      var allowDefault = anchorObj.dispatchEvent(evt);
      // you can check allowDefault for false to see if
      // any handler called evt.preventDefault().
      // Firefox will *not* redirect to anchorObj.href
      // for you. However every other browser will.
    }
  }
}

/**
 * WE use an Hidden a tag, for compatibility with MObile (instead of using window.open)
 * 
 * @param szUrl
 * @param [bNewWindow] {Boolean} default false
 * @returns
 */
function jsuGoToURL(szUrl,bNewWindow){
	var fn = "[about.js jsuGoToURL()] ";
	try{
		jslog (JSLOG_JSU,fn + JSLOG_FUN_START);
		UnTip(); // UnTip if required
		if (bNewWindow == undefined){
			bNewWindow = true;
		}
		jslog (JSLOG_JSU,fn + "bNewWindow=" + bNewWindow);
		var aEl = document.getElementById(JSU_HREF_HIDDEN_ID);
		if (aEl == undefined){
			jslog(JSLOG_DEBUG,fn + "add " + JSU_HREF_HIDDEN_ID + " HIDDEN div and anchor to document.body");
			divHidden = document.createElement("div");
			divHidden.id = JSU_DIV_HIDDEN_ID;		
			divHidden.innerHTML = JSU_HREF_HIDDEN;
			document.body.appendChild(divHidden);
			aEl = document.getElementById(JSU_HREF_HIDDEN_ID);
		}
		aEl.href = szUrl;
		jslog (JSLOG_JSU,fn + "aEl.href=" + aEl.href);
		aEl.target = (bNewWindow)? "_blank" : "_self";
	  if (aEl.click){
			jslog (JSLOG_JSU,fn + "a.click is defined. We call it");
			aEl.click();
	  } else {
			jslog (JSLOG_JSU,fn + "a.click is NOT defined in this Browser");
	  	if(document.createEvent) {
	  		// e.g SAFARI
				jslog (JSLOG_JSU,fn + "document.createEvent is defined in this Browser. We create the event to simulate the click");
	      var evt = document.createEvent("MouseEvents"); 
	      evt.initMouseEvent("click", true, true, window, 
	          0, 0, 0, 0, 0, false, false, false, false, 0, null); 
	      var allowDefault = aEl.dispatchEvent(evt);
	      // you can check allowDefault for false to see if
	      // any handler called evt.preventDefault().
	      // Firefox will *not* redirect to anchorObj.href
	      // for you. However every other browser will.
	  	}
	  }
	}catch (e){
		jslog (JSLOG_ERR,fn + "EXCEPTION: " + e.message);
	}	
}





/**
 * Show SEc withh Error for apr not present in FREE JSU
 * 
 * @param szIdSectErr       Id of Sect Err to display
 * @param szErr
 * @param szUrlDoc  Url of Document to go to see Feature
 */
function errFreeJsu(szIdSectErr,szErr){
	var szSectMsg = '<table width="100%"><tr>' +
  '  <td class="PopupImgWarning" style="padding-top:10px;" width="80px"></td>' +
  '  <td class="tipl errSample">' + szErr + '</td>' +
  '</tr>' +
  '<tr>' +
  ' <td></td>' +
  ' <td style="color:black">' +
  '  For the details see: ' +
   '<a class="tipLink" href="javascript:showJSUVersionParLimit();">JSU Options available only in FULL Version</a>' +  
  ' </td></tr></table>';
	var elErrSect = getElementById2(szIdSectErr,true);
	elErrSect.innerHTML = szSectMsg;
	elementShow (elErrSect,true);
}
