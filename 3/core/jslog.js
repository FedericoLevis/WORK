/** @fileOverview
========================================================================================= <BR/> 
<b>File:</b> 			core/jslog.js <BR/>
<b>Author:</b>     		<a href="https://www.linkedin.com/in/federicolevis" target="_self">Federico Levis</a> <BR/>
<b>JS Log Doc:</b>   <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/jslog.html" target="_self">JSU JS Log Documentation</a> <BR/>
<b>JSU API Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html" target="_self">JSU API Documentation</a> <BR/>
<b>Description:</b>        jslog API:   jslog*    <BR/>   
<b>REQUIRE:</b>           JSU: dom-drag.js    <BR/>
<b>First Version:</b>     ver 1.0 - Nov 2008  <BR/>
<b>Current Version:</b>   ver 3.3 - Jul 2016  <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>DISCLAIMER</b>  <BR/>
Copyright by Federico Levis - <a href="https://github.com/FedericoLevis/JSU" target="_self">JSU</a> <BR/> 
This file may be freely distributed under the MIT license.   <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>JSDoc NOTES</b>  <BR/>
In "JSU Obfuscated Version"  JS Code is not visible with JSDoc Source Link  <BR/> 
========================================================================================= <BR/> 
*/

//**************************************************************************
//				CONSTANT
//**************************************************************************

// -------------------------------- Log Level 

/**
 * JSLOG_ERR = 0 ERRORS: always enable when jslog is visible
 */
var JSLOG_ERR = 0;
/**
 * JSLOG_INFO = 1 Important Information
 */
var JSLOG_INFO = 1;	   
/**
 * JSLOG_DEBUG = 2 DEBUG Information
 */
var JSLOG_DEBUG = 2;
/**
 * JSLOG_TRACE = 4 DUMP Large Data (usually for json or object)
 */
var JSLOG_TRACE = 4;        
/**
 * JSLOG_TEST = 8 Feature under TEST
 */
var JSLOG_TEST = 8;  
/**
 * JSLOG_JSU = 16 JSU Functionality (usually stable)
 */
var JSLOG_JSU = 16;    	   
// ---------------- NOTE: you can add also New Levels

/**
 * jslog_init (JSLOG_LEV_URL) to get jslogVar.iLogLev from URL parameter jslog
 */
var JSLOG_LEV_URL = "URL"; 

/**
 * Parameter to add to URL to set LogLev: JSLOG_LEV_URL_PAR = "jslog"
 * @example
  // init jslog reading URL parameter jslog, if present
  // For example 
  //  a) LogLev will be set to 3 and jslogWindow will be displayed:
  //    URL=https://rawgit.com/FedericoLevis/JSU/master/samples/Sort/SortSample.html?jslog=3
  //  a) LogLev will be set to 0 and jslogWindow will NOT be displayed:
  //    URL=https://rawgit.com/FedericoLevis/JSU/master/samples/Sort/SortSample.html
  jslog_init('URL');
 * 
 */
var JSLOG_LEV_URL_PAR = "jslog";
var JSLOG_ID_DEBUG = "debug";  // id/class that identify yje element that can be Show/Hide by jslog Button 

//------------ Option: Default value
var JSLOG_DEF_LOG_TIME = false;
var JSLOG_DEF_PATH_IMG = "../../images/"; // Default (for samples)
if (typeof (JSU_PATH_IMG) != "undefined"){
	JSLOG_DEF_PATH_IMG = JSU_PATH_IMG; 
}

//---------------------------------------
var JSLOG_FUN_START = "-------------------- START";
var JSLOG_FUN_END = "-------------------- END";
var JSLOG_FILE_START = " ============================= START";
var JSLOG_FILE_END = " ============================= END";

var JSLOG_DELIMITER= '<span style="color: #f00">-----------------------------------------------------------------------------------------------------------------------</span>';

// For jslogDomEl
var JSLOG_DEF_DOM_EL_COL_NUM = 150;
var JSLOG_MAX_TEXT_BOX_ROW_NUM = 10; // Max, then we will use scrollbar


//------------------------ POSITION
var JSLOG_POS_TOPLEFT="TopLeft";
var JSLOG_POS_BOTTOMRIGHT="BottomRight";
var JSLOG_POS_TOP="Top";
var JSLOG_POS_LEFT="Left";
var JSLOG_POS_RIGTH="Right";
var JSLOG_POS_BOTTOM="Bottom";

//------------------------ SIZE
/**
 * Size of the log Window<ul>
		<li>JSLOG_SIZE.XS:"XS"   </li>
		<li>JSLOG_SIZE.S:"S"   </li>
		<li>JSLOG_SIZE.M:"M"   </li>
		<li>JSLOG_SIZE.L:"L"   </li>
		<li>JSLOG_SIZE.XL:"XL"   </li>
	</ul>	
 */
var JSLOG_SIZE = {
		XS:"XS",
		S:"S",
		M:"M",
		L:"L",
		XL:"XL"
};


//------------------------ ObjOpt Flag
/**
 * For ObjOpt Fields. e.g OpjOpt.style <ul>
		<li>JSLOG_OPT.NONE:"NONE"   </li>
		<li>JSLOG_SIZE.ONLY_MEANINGFUL:"ONLY_MEANINGFUL"   </li>
		<li>JSLOG_SIZE.ALL:"ALL"   </li>
	</ul>	
 */
var JSLOG_OPT = {
		NONE:"NONE",
		ONLY_MEANINGFUL:"ONLY_MEANINGFUL",
		ALL:"ALL"
};

//dimensioni iniziali. Attenzione ad TOP perche` poi viene settato insieme a SIZE_DEF
var WIN_JSLOG_TOP='370px';
//settata
var JSLOG_SIZE_DEF = JSLOG_SIZE.M;
// Temporanee
var WIN_JSLOG_H='400px';
var WIN_JSLOG_W='1200px';


//**************************************************************************
//    GLOBAL VARIABLE
//**************************************************************************

var jslogVar ={
	iLogLev : 0,
	bLogTime: JSLOG_DEF_LOG_TIME,  // True to Log Time
	szPathImg: JSLOG_DEF_PATH_IMG, // Default
	console: null
};

//


//**************************************************************************
//										GLOBAL API
//**************************************************************************



/**
 * Init jslog and Show jslog Window if jsLogLev > 0
 * @param jsLogLev	{Number|String} 2 option: <BR/>
 * 													- Number : iLogLev (0,1,2,....) BitMask To set JSLOG_INFO, JSLOG_DEBUG, .. <BR/>
                              iLogLev is a BITMASK to Enable the various Level.  <BR/>
															Example of Levels Enable with various settings: <BR/>
																a) Level=3 to Enable JSLOG_ERR (0), JSLOG_INFO(1) and JSLOG_DEBUG(2)
																b) Level=4 to Enable JSLOG_ERR (0) JSLOG_TEST(4)
* 													-	'URL' (JSLOG_LEV_URL_PAR) To get jslog parameter from URL (if absent 0 will be used)				
	@param [objOpt] {Object}   Option: <ul>
					  <li> .bLogTime	{Boolean}   [def=false] true to log also the Time in format [HH:MM:SS.ms] </li>
	  			  <li> . szPathImg {String}   	BaseSortPath (e.g	"../../../images") to be used instead of the one configured in conf.js <BR/>
  															Example  "/portalDtct0/images/"    "../../images/" </li>
  				  <li> . szSize {String}  [def JSLOG_SIZE.M] JSLOG_SIZE.XS, JSLOG_SIZE.M, .....	</li>
  				</ul>										
 
  @example
  // init jslog reading URL parameter jslog, if present
  // For example 
  //  a) LogLev will be set to 3 and jslogWindow will be displayed:
  //    URL=https://rawgit.com/FedericoLevis/JSU/master/samples/Sort/SortSample.html?jslog=3
  //  a) LogLev will be set to 0 and jslogWindow will NOT be displayed:
  //    URL=https://rawgit.com/FedericoLevis/JSU/master/samples/Sort/SortSample.html
  jslog_init('URL');

  @example
  // init jslog with Level=3 to Enable JSLOG_ERR (0), JSLOG_INFO(1) and JSLOG_DEBUG(2)
  jslog_init(3);

   @example
  // init jslog with Level=4 to Enable JSLOG_ERR (0) JSLOG_TEST(4)
  jslog_init(4); 
   															 
  															 
 */
function jslog_init(jsLogLev,objOpt)
{
	var iLogLev = 0; // Default
  if (jsLogLev == JSLOG_LEV_URL){
  	function getPar(name){
 	   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
 	  	 return decodeURIComponent(name[1]);
  	}
  	var urlLogLev = getPar (JSLOG_LEV_URL_PAR);
  	// alert ("PAR urlLogLev=" + urlLogLev);
    var szNameLogLev = JSLOG_LEV_URL_PAR + "=";
  	if (typeof (urlLogLev) != 'undefined'){
  	  // Save in Session window.name
      window.name = szNameLogLev  + urlLogLev;
  	}else{
      // Retrieve jsLog from window.name if it has been set previously
  	  var szLogLev = window.name;
  	  if (szLogLev.indexOf(szNameLogLev ) > -1){
         urlLogLev = parseInt(szLogLev.substr (szNameLogLev.length));
  	  }
    }	
  	if ((typeof (urlLogLev) != 'undefined')){
  		iLogLev = urlLogLev;
  	}else {
  		iLogLev =0;
  	}  
  }else {
  	iLogLev = parseInt(jsLogLev);
  }
	jj_consoleStart(iLogLev,objOpt);
}	



/**
Change jslogLev
@param iLogLev {Number}    iJslogLevel
      GLOBAL
jslogVar.iLogLev		out  Set New Level
 */
function jslogLevSet(iLogLev)
{
	jslogVar.iLogLev = iLogLev;
	if (iLogLev == 0){
		jslog_end();
	}else if (jslogVar.console){
		var szTitle = "Level=" + iLogLev;
		jslogVar.console.labelTitle.innerHTML = szTitle;
		jslogVar.console.selectLogLev.selectedIndex = iLogLev;
	}
	
}


/**
Set jslog Window SIZE
@param szLogSize
      GLOBAL
jslogVar in  
*/
function jslogSetSize(szLogSize)
{
	if (jslogVar.console != null){
		jslogVar.console.setSize (szLogSize); 
	}
}



/**
Clear jslog Window
*/
function jslogClear(){
	if (jslogVar.console){
		jslogVar.console.clearWindow();
	}
}


/**
Get jslogLev
@return jslogVar.iLogLev {Number}     Current jslogLev
      GLOBAL
jslogVar in  
*/
function jslogGetLogLev()
{
	return jslogVar.iLogLev;
}



/**
 * Get All Current Option
 * @return {Object}  OBJECT with current jslog option: <ul>
 *                    <li> .iLogLev </li>
 *                    <li> .bLogTime </li>
 *                    <li> .szPathImg </li>
 *                    </ul>
 */
function jslogGetOpt()
{
	return {
		iLogLev : jslogVar.iLogLev,
		bLogTime: jslogVar.bLogTime, 
		szPathImg: jslogVar.szPathImg
	};
}



/**
 * LOG OBJECT: <BR/>
 * If jslog CONSOLE is Present, Log OBJECT in the jslog CONSOLE if Level is enable <BR/>
 * If jslog was initialized with Level=0 or if iLogLev is not enabled, this function does not log 
 * @param iLogLev {Number} JSLOG_INFO, ..
 * @param szMsg  {String} Message To log before JSON
 * @param obj  {Object} OBJECT To log
 * @param [bLogCompact] {Boolean}	  in    Default=false  if true log Obj in a compact way
 * @returns 0
 
 * @example
	// Prepare object to log
  var author ={
	  szFirstName: "Federico",  
	  szLastName : "Levis",
	  szCity : "Padova",
	  szNation : "Italy",
	  height: 176
  }; 
   // Log Object author at Level JSLOG_TEST=8
  jslogObj(JSLOG_TEST,"Log at Level 2 of a JS Object -  author:", author);
 */
function jslogObj(Level,szMsg, obj, bLogCompact)
{
	if (bLogCompact == undefined || bLogCompact == null){
		bLogCompact = false;
	}
	var iNumSep = (bLogCompact) ? 0 : 2; 
	var szSep = (bLogCompact) ? ": " : "\n";
	// WE make the Check here to avoid executing JSON.stringify when Level is not Enable
  if(isLogLevEnable(Level) && jslogVar.console){
    jslogVar.console.send(Level, szMsg + szSep + JSON.stringify(obj,null,iNumSep));
  }
  return 0;

}


/**
 * LOG HTML: log a Text contanint HTML. We log it into a TextBox <BR/>
 * If jslog CONSOLE is Present, Log main szHtml into a TextArea of the jslog CONSOLE if Level is enable <BR/>
 * If jslog was initialized with Level=0 or if iLogLev is not enabled, this function does not log 
 * @param iLogLev {Number} JSLOG_INFO, ..
 * @param szMsg  {String} Initial Message
 * @param szHtml  {String} Message To log that can contain HTML TAGs
 * @param [objOpt]  {Object}	  Options: <ul> 
 *    												<li> .iColNum  TextArea ColNum to use instead of JSLOG_DEF_DOM_EL_COL_NUM </li>
 *    												<li> .iRowNum  TextArea RowNum to use instead of the rows automatically calculated (MAX is JSLOG_MAX_TEXT_BOX_ROW_NUM) </li>
 *   											</ul> 
 * @returns 0
 
 * @example
   jslogHTML (JSLOG_TEST,'selectTest',getElementById('selectTest').innerHTML);  

  LOGGED:

selectTest:  
<select class="detFilter" id="googleAnalType" title="Initial Analytics TYPE displayed. Then it can be changed form Google Analitycs page"  style="width:100%;"  onchange="tt_onchangeGoogleAnalType();" >
<option class="detFilter" value="all" selected >All Time</option> 
<option class="detFilter" value="month"  >Last Month</option> 
<option class="detFilter" value="week"  >Last Week</option> 
<option class="detFilter" value="day"  >Last Day</option> 
<option class="detFilter" value="two_hours"  >Last 2 Hours</option> 
  
 */
function jslogHtml(iLogLev,szMsg,szHtml, objOpt)
{

	// WE make the Check here to avoid executing JSON.stringify when Level is not Enable
  if(!isLogLevEnable(iLogLev) || jslogVar.console == undefined){
  	return;
  }
	if (objOpt == undefined){
		objOpt = new Object();
	}
	if (objOpt.iColNum == undefined){	objOpt.iColNum = JSLOG_DEF_DOM_EL_COL_NUM; }
	if (objOpt.iRowNum == undefined){	
		// if not passed objOpt.iRowNum, we use the number of /n inserted. 
		objOpt.iRowNum = jj_getHtmlRowNum(szHtml);
	}

	// prepare szTxtArea 
	var szTxtArea= szMsg + ":<BR\>" + '<textarea rows="' + objOpt.iRowNum + '" cols="' + objOpt.iColNum  + '">' + szHtml + '</textarea><BR\>';
	jslog (iLogLev,szTxtArea);
	return 0;

}



/**
 * LOG DOM ELEMENT: log main fields (nodeName, attributes,...) of DOM Element <BR/>
 * If jslog CONSOLE is Present, Log main fields of DOM Elements into a TextArea of the jslog CONSOLE if Level is enable <BR/>
 * If jslog was initialized with Level=0 or if iLogLev is not enabled, this function does not log 
 * @param iLogLev {Number} JSLOG_INFO, ..
 * @param szMsg  {String} Message To log before DOM Element
 * @param el  {Object} DOM OBJECT To log
 * @param [objOpt]  {Object}	  Options: <ul> 
 *    												<li> .iColNum  TextArea ColNum to use instead of JSLOG_DEF_DOM_EL_COL_NUM </li>
 *    												<li> .iRowNum  TextArea RowNum to use instead of the rows automatically calculated (MAX is JSLOG_MAX_TEXT_BOX_ROW_NUM) </li>
 *    												<li> .log_style  to log also style: JSLOG_OPT.NONE (default)  JSLOG_OPT.ONLY_MEANINGFUL JSLOG_OPT.ALL </li>
 *   											</ul> 
 * @returns 0
 
 * @example
   jslogDomEl (JSLOG_TEST,"DOM ELEMENT tipJS1Lev1",getElementById2("tipJS1Lev1"),{style:JSLOG_OPT.ONLY_MEANINGFUL});  
  LOG:
  DOM ELEMENT tipJS1Lev1:
	nodeName=INPUT
	class=tipJSFixed
	id=tipJS1Lev1
	onclick=TipJSFixedClicked (JS1_LEV1,event,{iJSColNum:140});
	type=button
	......
	---------------------------- meaningful style
	  alignContent = 'stretch'
	  alignItems = 'stretch'
	  alignSelf = 'auto'
	  alignmentBaseline = 'auto'
	  backfaceVisibility = 'visible'
	  backgroundAttachment = 'scroll'
	  backgroundClip = 'border-box'
	  backgroundColor = 'rgb(224, 224, 224)'
	
  
 */
function jslogDomEl(iLogLev,szMsg, el, objOpt)
{
	if (el == null || el == 0){
		return;
	}
	// WE make the Check here to avoid executing JSON.stringify when Level is not Enable
  if(!isLogLevEnable(iLogLev) || jslogVar.console == undefined){
  	return;
  }
	if (objOpt == undefined){
		objOpt = new Object();
	}
	if (objOpt.iColNum == undefined){	objOpt.iColNum = JSLOG_DEF_DOM_EL_COL_NUM; }
	if (objOpt.style == undefined){	objOpt.style = JSLOG_OPT.NONE ; }
	var szEl="nodeName=" + el.nodeName + "\n";	
  for (var i=0; i<el.attributes.length; i++){
  	var attr = el.attributes[i];
  	szEl += attr.name + "=" + attr.value + "\n";
  }
  szEl += "outerHTML=" +  jj_replaceAll(el.outerHTML,"><",">\n<");
  
  if (objOpt.style != JSLOG_OPT.NONE ){
    var st = el.style;
    var cs = window.getComputedStyle(el, null);
    szEl += "\n\n--------------------------------------- ";
  	if (objOpt.style == JSLOG_OPT.ONLY_MEANINGFUL){
  		szEl += "meaningful style \n";
  	}else{
  		szEl += "style \n";
  	}	
    for (x in st) {
    	var bLog = true;
    	if (objOpt.style == JSLOG_OPT.ONLY_MEANINGFUL){
      	if ((st[x] == 0 &&  cs[x] == undefined) || 
      	    (st[x] == false &&  cs[x] == undefined) ||
      	    (st[x] == '' &&  cs[x] == '') ||
      	    (x.indexOf('animation')>=0 || x.indexOf('accelerator')>=0 ) ||
      	    (st[x] != undefined &&  (typeof(st[x]) == 'function'))
      	    ) 
      	{
      		bLog = false;
      	}
    	}
    	if (bLog){
    		var szStyle = st[x]; 
    		if (szStyle == 0 || szStyle =='')
    		{
    			szStyle = cs[x];
    		}	
    		szEl += "  " + x + " = '" + szStyle + "'\n";
    	}
    }
  }
  
  
	if (objOpt.iRowNum == undefined){	
		// if not passed objOpt.iRowNum, we use the number of /n inserted. 
		objOpt.iRowNum = jj_getHtmlRowNum(szEl);
	}
	
	// prepare szTxtArea 
	var szTxtArea= szMsg + ":<BR\>" + '<textarea rows="' + objOpt.iRowNum + '" cols="' + objOpt.iColNum  + '" readonly>' + szEl + '</textarea><BR\>';
	jslog (iLogLev,szTxtArea);
  return 0;

}


/**
 * LOG DOM ELEMENT: log main fields (nodeName, attributes,...) of DOM Element <BR/>
 * If jslog CONSOLE is Present, Log main fields of DOM Elements into a TextArea of the jslog CONSOLE if Level is enable <BR/>
 * If jslog was initialized with Level=0 or if iLogLev is not enabled, this function does not log 
 * @param iLogLev {Number} JSLOG_INFO, ..
 * @param szMsg  {String} Message To log before DOM Element
 * @param el  {Object} DOM OBJECT To log
 * @param [objOpt]  {Object}	  Options: <ul> 
 *    												<li> .iColNum  TextArea ColNum to use instead of JSLOG_DEF_DOM_EL_COL_NUM </li>
 *    												<li> .iRowNum  TextArea RowNum to use instead of the rows automatically calculated (MAX is JSLOG_MAX_TEXT_BOX_ROW_NUM) </li>
 *    												<li> .log_style  to log also style: JSLOG_OPT.NONE (default)  JSLOG_OPT.ONLY_MEANINGFUL JSLOG_OPT.ALL </li>
 *   											</ul> 
 * @returns 0
 
 * @example
   jslogDomEl (JSLOG_TEST,"DOM ELEMENT tipJS1Lev1","tipJS1Lev1",{style:JSLOG_OPT.ONLY_MEANINGFUL});  
  LOG:
  DOM ELEMENT tipJS1Lev1:
	nodeName=INPUT
	class=tipJSFixed
	id=tipJS1Lev1
	onclick=TipJSFixedClicked (JS1_LEV1,event,{iJSColNum:140});
	type=button
	......
	---------------------------- meaningful style
	  alignContent = 'stretch'
	  alignItems = 'stretch'
	  alignSelf = 'auto'
	  alignmentBaseline = 'auto'
	  backfaceVisibility = 'visible'
	  backgroundAttachment = 'scroll'
	  backgroundClip = 'border-box'
	  backgroundColor = 'rgb(224, 224, 224)'
  
 */
function jslogDomElById(Level,szMsg, szId,objOpt)
{
	return jslogDomEl(Level,szMsg,document.getElementById(szId), objOpt);

}


/** 
	PAR
json      i    Json obj
@returns
String for jslog      
 */
function json2jslogStr(json)
{
  // N.B: devo cambiare qualcosa nei replace o si inluppa
	var szJson = jj_replaceAll(JSON.stringify(json),"},","} ,\n  ");
	szJson = jj_replaceAll (szJson,":[",":\n[\n  ");
	szJson = jj_replaceAll (szJson,"[{","[\n  {");
	return  jj_replaceAll (szJson,"}]","}\n]\n  ");

}




/**
 * LOG JSON: <BR/>
 * If jslog CONSOLE is Present, Log json in the jslog CONSOLE if Level is enable <BR/>
 * If jslog was initialized with Level=0 or if iLogLev is not enabled, this function does not log 
 * @param iLogLev {Number} JSLOG_INFO, ..
 * @param szMsg  {String} Message To log before JSON
 * @param json  {String} JSON To log
 *  * @returns 0
 
 * @example
 // Prepare json	
var jsonEx = {"total":5,"rows":[
	{"day":"21/04/2015","daration_sec":15,"err_num":7},
	{"day":"22/04/2015","daration_sec":0,"err_num":1},
	{"day":"23/04/2015","daration_sec":3,"err_num":3},
	{"day":"24/04/2015","daration_sec":3,"err_num":2},
	{"day":"25/04/2015","daration_sec":3,"err_num":14}
]};
// log json at Level JSLOG_DEBUG=2
jslogJson(JSLOG_DEBUG,"Log at Level 2 of a JS Object.  jsonEx:", jsonEx);
 */
function jslogJson(iLogLev,szMsg, json)
{
	// WE make the Check here to avoid executing JSON.stringify when iLogLev is not Enable
    if(isLogLevEnable(iLogLev)){
        jslogVar.console.send(iLogLev,szMsg + "\n" + json2jslogStr(json));
    }
    return 0;

}

/**
 * Log the Elapsed Time From dStart to Now
 * @param iLogLev {Number} JSLOG_INFO, ..
 * @param szMsg  {String} Message To log
 * @param dStart  Start date
 * @return 0
 */
function jslogElapsedTime (iLogLev,szMsg,dStart){
  if(isLogLevEnable(iLogLev) && jslogVar.console)
  {
		var dEnd = new Date();  	
		var iDeltaMs = dEnd.getTime() - dStart.getTime();
		var szDurata = (iDeltaMs > 1000) ? ((iDeltaMs/1000) + " sec") : (iDeltaMs + " msec"); 
		jslogVar.console.send(iLogLev,szMsg + szDurata);
  }
  return 0;
}


/**
 * LOG STRING: <BR/>
 * If jslog CONSOLE is Present, Log Msg in the jslog CONSOLE if Level is enable <BR/>
 * If jslog was initialized with Level=0 or if iLogLev is not enabled, this function does not log 
 * @param iLogLev {Number} JSLOG_INFO, ..
 * @param szMsg  {String} Message To log
 * @returns 0
 * GLOBAL VAR:
    jslogVar.console
    jslogVar.iLogLev  
 * @example
 // Prepare szMsg: 
  var szName = "Federico Levis";
  var iHeight = 177; 
  var now = new Date(); 
  //LOG at Level JSLOG_INFO=1 
  jslog(JSLOG_INFO,"This a Log at Level 1. My name is " + szName + ",  Height=" + iHeight + " cm  - Current Time is: " + now);
 * 
 * 
 */
function jslog(iLogLev,szMsg)
{
  if(isLogLevEnable(iLogLev) && jslogVar.console)
  {
    jslogVar.console.send(iLogLev,szMsg);
  }
  return 0;
}


/**
 * jslog END: destroy the JSLOG window if present
 */
function jslog_end()
{
	if (jslogVar.console){
		jslogVar.console.killWindow();
	}
}

/**
 * Check if iLogLev is Enabled
 * @param iLogLev
 * @returns {Boolean}  true if iLogVel is Enabled
 */
function isLogLevEnable(iLogLev)
{
   return ((jslogVar.iLogLev & iLogLev || iLogLev == 0)  && jslogVar.console != null );
}


/**********************************************************************************************************
 * 																				PRIVATE
 ******************************************************************************************************/



function jj_getHtmlRowNum(szHtml){
	if (typeof(szHtml) != "string"){
		return 0;
	}
	var iRowNum =  1 + (szHtml.match(/\n/g) || []).length;
	if (iRowNum > JSLOG_MAX_TEXT_BOX_ROW_NUM){
		iRowNum	= JSLOG_MAX_TEXT_BOX_ROW_NUM;
  } 
	return iRowNum;
	
}


/*
 * 
 * Replace in str di tutte le occorrenze di strFrom, che vengono sostituite con strTo 
 * @param str			es: "questa frase contiene Pippo 2 volte perche` alla fine ripeto Pippo"
 * @param strFrom		es: "Pippo"
 * @param strTo			es: "Paperino"
 * @returns str 		es: "questa frase contiene Paperino 2 volte perche` alla fine ripeto Paperino"
 */
function jj_replaceAll(str,strFrom,strTo)
{  
  if (typeof(str) == "undefined"){
    return "";
  }	
  while (str.indexOf(strFrom)>-1) {
	 str = str.replace(strFrom,strTo);
  }	
  return str;  
}



/*
 * 
 * @param iLogLev	{Number} LogLev   see 
 * @param [objOpt] {Object} see jslog_init
 */
function jj_consoleStart(iLogLev,objOpt){		
	var szLogSize = JSLOG_SIZE_DEF;
	jslog_end(); // End previous jslogVar.console if present
	jslogVar.iLogLev = iLogLev;
	if (jslogVar.iLogLev ==0){
		return;
	}
	
	if (objOpt != undefined){
		if (objOpt.szPathImg != undefined){
			// save in Global
		  jslogVar.szPathImg = objOpt.szPathImg;
		}
		if (objOpt.bLogTime != undefined){
			// save in Global
			jslogVar.bLogTime = objOpt.bLogTime;
		}
		if (objOpt.szLogSize != undefined){
			// save in Global
			szLogSize = objOpt.szLogSize;
		}
	}
	 
  jslogVar.console = {
	  /*----------------------------------------------------------------------------
	                                Core Functionality
	  ----------------------------------------------------------------------------*/
	  // vars
	  debugging_on: false,
	  window:       null,
	  viewport:     null,
	  buffer:       '',
	  debugVisible: false, // Status related to showDebug Button  (debugVisible= true after click)
	  arBtnDebug: new Array(),  //Btn for Debug (2 Buttons)
	  // initialization
	  init: function(){
	    if( !document.getElementsByTagName ||
	        !document.getElementById ||
	        !document.createElement ||
	        !document.createTextNode ) return;
	
		var domBody = document.getElementsByTagName( 'body' )[0];
		if (typeof (domBody) == 'undefined'){
		  return;
		}
	    jslogVar.console.createWindow();
	    jslogVar.console.getCookie();
	    jslogVar.console.debugging_on = true;
	    jslogVar.console.setSize (szLogSize); 
	  },
	
	  // jslogVar.console window creation
	  createWindow: function(){
	    jslogVar.console.window = document.createElement( 'div' );     // the window
	    jslogVar.console.window.style.background = '#000';
	    jslogVar.console.window.style.font       = '9pt "Lucida Grande", "Lucida Sans Unicode", sans-serif';
	    jslogVar.console.window.style.padding    = '2px';
	    jslogVar.console.window.style.position   = 'absolute';
	    jslogVar.console.window.style.top        = WIN_JSLOG_TOP;
	    jslogVar.console.window.style.left       = '0px';
	    jslogVar.console.window.style.height     = WIN_JSLOG_H;
	    jslogVar.console.window.style.zIndex     = '100';
	    jslogVar.console.window.style.minHeight  = '40px';
	    jslogVar.console.window.style.width      = WIN_JSLOG_W;
	    jslogVar.console.window.style.minWidth   = '150px';
	     
	    var x = document.createElement('span');             // the closer
	        x.style.border     = '1px solid #000';
	        x.style.cursor     = 'pointer';
	        x.style.color      = '#000';
	        x.style.display    = 'block';
	        x.style.lineHeight = '.5em';
	        x.style.padding    = '0 0 3px';
	        x.style.position   = 'absolute';
	        x.style.top        = '4px';
	        x.style.right      = '4px';
	        x.setAttribute( 'title', 'Close jslogVar.console Debugger' );
	        x.appendChild( document.createTextNode( 'x' ) );
	        jslogVar.console.addEvent( x, 'click', function(){ jslogVar.console.killWindow(); } );
	        jslogVar.console.window.appendChild( x );
	    var sh = document.createElement('div');             // the stretcher holder
	        sh.style.position = 'absolute';
	        sh.style.bottom   = '3px';
	        sh.style.right    = '3px';
	    var sg = document.createElement('span');            // the stretcher grip
	        sg.style.border   = '5px solid #ccc';
	        sg.style.borderLeftColor = sg.style.borderTopColor = '#000';
	        sg.style.cursor   = 'pointer';
	        sg.style.color    = '#ccc';
	        sg.style.display  = 'block';
	        sg.style.height   = '0';
	        sg.style.width    = '0';
	        sg.style.overflow = 'hidden';
	        sg.setAttribute( 'title', 'Resize the jslogVar.console Debugger' );
	
	        if( typeof( Drag ) != 'undefined' ){ // make it draggable
	          sg.xFrom = 0;
	          sg.yFrom = 0;
	          Drag.init( sg, null, null, null, null, null, true, true );
	          sg.onDrag = function( x, y ){
	                        jslogVar.console.resizeX( x, this );
	                        jslogVar.console.resizeY( y, this );
	                        jslogVar.console.adjustViewport();
	                      };
	          sg.onDragEnd = function(){
	                       jslogVar.console.setCookie();
	                     };
	          sh.appendChild( sg );
	          jslogVar.console.window.appendChild( sh );
	        }
	        
	        var header = document.createElement( 'h3' );
	        header.className = "jslog";
	        jslogVar.console.appendAllBtn(header,false); 
	        //--------------------------------------
	        header.appendChild( jslogVar.console.getGroupSep("    "));
	        jslogVar.console.labelTitle = document.createElement( 'label' );
	        jslogVar.console.labelTitle.className = "jslog";
	        jslogVar.console.labelTitle.innerHTML  =	'Level=' + jslogVar.iLogLev;
	        header.appendChild(jslogVar.console.labelTitle);
	        jslogVar.console.window.appendChild( header );
	        //------------------------     
	        var footer = document.createElement( 'div' );        // additional footer holder
	        footer.className = "jslogFooter";
	        jslogVar.console.appendAllBtn(footer,true); 
	        jslogVar.console.window.appendChild( footer);
	
		//	STYLE
	    jslogVar.console.viewport = document.createElement( 'pre' );
	    jslogVar.console.viewport.style.border   = '1px solid #ccc';
	    jslogVar.console.viewport.style.color    = '#ebebeb';
		  jslogVar.console.viewport.style.color    = 'white';
		  jslogVar.console.viewport.style.backgroundColor = 'black';
	    jslogVar.console.viewport.style.textAlign    = 'left';
	    jslogVar.console.viewport.style.fontSize = '1.2em';
	    jslogVar.console.viewport.style.margin   = '0';
	    jslogVar.console.viewport.style.padding  = '0 3px';
	    jslogVar.console.viewport.style.position = 'absolute';
	    jslogVar.console.viewport.style.top      = '25px';
	    jslogVar.console.viewport.style.left     = '2px';
	    jslogVar.console.viewport.style.overflow = 'auto';
	    jslogVar.console.adjustViewport();
	    jslogVar.console.window.appendChild( jslogVar.console.viewport );
	    document.getElementsByTagName( 'body' )[0].appendChild( jslogVar.console.window );
	
	    if( typeof( Drag ) != 'undefined' ){ // make it draggable
	      Drag.init( header, jslogVar.console.window );
	      jslogVar.console.window.onDragEnd = function(){
	                                   jslogVar.console.setCookie();
	                                 };
	    }
	  },
	
	  // resizing stuff
	
	  resizeX: function( x, grip ){
	
	    var width    = parseInt( jslogVar.console.window.style.width );
	
	    var newWidth = Math.abs( width - ( x - grip.xFrom ) ) + 'px';
	
	    if( parseInt( newWidth ) < parseInt( jslogVar.console.window.style.minWidth ) )
	
	      newWidth = jslogVar.console.window.style.minWidth;
	
	    jslogVar.console.window.style.width = newWidth;
	
	    grip.xFrom = x;
	
	  },
	
	  resizeY: function( y, grip ){
	
	    var height    = parseInt( jslogVar.console.window.style.height );
	
	    var newHeight = Math.abs( height - ( y - grip.yFrom ) ) + 'px';
	
	    if( parseInt( newHeight ) < parseInt( jslogVar.console.window.style.minHeight ) )
	
	      newHeight = jslogVar.console.window.style.minHeight;
	
	    jslogVar.console.window.style.height = newHeight;
	
	    grip.yFrom = y;
	
	  },
	
	  // adjust viewport
	
	  adjustViewport: function(){
	    jslogVar.console.viewport.style.width = ( parseInt( jslogVar.console.window.style.width ) - 8 ) + 'px';
	    jslogVar.console.viewport.style.height = ( parseInt( jslogVar.console.window.style.height ) - 50 ) + 'px';
	  },
	
	  // send data too the window
	
	  send: function(iLevel, text ){
	    // Replace "/n" with <br>
		  // look for "\n" and replace with <BR>	
	    text = text + "<br/>";
	    // if textarea we do not replace \n
	    if (text.indexOf("<textarea rows") < 0){
			  while (text.indexOf("\n")>-1) {
			    text = text.replace("\n","<br/>");
		    }
	    }
	  	var szTime ="";
	  	if (jslogVar.bLogTime){
	    	var d = new Date();
	    	szTime = jslogVar.console.num2StrPad(d.getHours(),'0',2) + ":" + 
	    				jslogVar.console.num2StrPad(d.getMinutes(),'0',2) + ":" + 
	    				jslogVar.console.num2StrPad(d.getSeconds(),'0',2) + "." + 
	    				jslogVar.console.num2StrPad(d.getMilliseconds(),'0',3) + " ";
	  	}
	  	// for delimiter we pass null
	  	if (iLevel != null){
			  text = szTime + "[" + iLevel + "] " + text;
	  	}
	    if( jslogVar.console.viewport == null ){  /* store in the buffer if the 
	                                        viewport has not yet been built */
	      jslogVar.console.buffer += text;
	    } else {
	      jslogVar.console.viewport.innerHTML += text;
	      jslogVar.console.scrollWithIt();
	    }
	  },
	
	  // send the buffer to the window
	
	  sendBuffer: function(){
	
	    if( jslogVar.console.viewport == null ){
	
	      jslogVar.console.timer = window.setTimeout( 'jslogVar.console.sendBuffer()', 500 );
	
	    } else {
	
	      jslogVar.console.viewport.innerHTML += jslogVar.console.buffer;
	
	      jslogVar.console.scrollWithIt();
	
	      jslogVar.console.killTimer();
	
	    }
	
	  },
	
	  // adjust the viewport to keep pace with the latest entries
	
	  scrollWithIt: function(){
	
	    jslogVar.console.viewport.scrollTop = jslogVar.console.viewport.scrollHeight;
	
	  },
	
	  // kill the window
	
	  killWindow: function() {
	    jslogVar.console.window.parentNode.removeChild( jslogVar.console.window );
	    jslogVar.console.debugging_on = false;
	    jslogVar.console = null;
	    window.name = JSLOG_LEV_URL_PAR + "=0";
	    
	  },
	
	  // cookie handlers
	
	  setCookie: function(){
	
	    var posn = jslogVar.console.window.style.top + ' ' + jslogVar.console.window.style.left;
	
	    var size = jslogVar.console.window.style.height + ' ' + jslogVar.console.window.style.width;
	
	    document.cookie = 'jslogVar.console=' + escape( posn + ' ' + size );
	
	  },
	
	  getCookie: function(){
	    if( !document.cookie ) return;
	    var all_cookies = document.cookie;
	    var found_at = all_cookies.indexOf('jslogVar.console=');
	    if( found_at != -1 ){
	      var start = found_at + 'jslogVar.console='.length;
	      var end   = all_cookies.indexOf( ';', start );
	      var value = ( end != -1 ) ? all_cookies.substring( start, end )
	                                : all_cookies.substring( start );
	      value = unescape( value );
	      var vals = value.split( ' ' );
	      // start with position
	      jslogVar.console.window.style.top  = vals[0];
	      jslogVar.console.window.style.left = vals[1];
	      // then size
	      jslogVar.console.window.style.height = vals[2];
	      jslogVar.console.window.style.width  = vals[3];
	      jslogVar.console.adjustViewport();
	    }
	  },
	  // generic timer setup (if needed)
	  timer: null,
	  killTimer: function(){
	    clearTimeout( jslogVar.console.timer );
	  },
	  // event handlers
	  addEvent: function( obj, type, fn ){
	    if (obj.addEventListener) obj.addEventListener( type, fn, false );
	    else if (obj.attachEvent) {
	      obj["e"+type+fn] = fn;
	      obj[type+fn] = function() {
	        obj["e"+type+fn]( window.event );
	      };
	      obj.attachEvent( "on"+type, obj[type+fn] );
	    }
	  },
	
	  removeEvent: function ( obj, type, fn ) {
	    if (obj.removeEventListener) obj.removeEventListener( type, fn, false );
	    else if (obj.detachEvent) {
	      obj.detachEvent( "on"+type, obj[type+fn] );
	      obj[type+fn] = null;
	      obj["e"+type+fn] = null;
	    }
	  },
	
	  
	  
	  
	  /*================================================================================================
	   * @param parent  {Object} the parent that will be added the Btn
	   * @param bFooter {Boolean} true for Footer
	  ===============================================================================================*/
	  appendAllBtn: function (parent,bFooter) {
		  var listBtn = new Array();
		  parent.appendChild( jslogVar.console.getImgPos("arrowTopLeft.jpg","Move JSConsole to TOP LEFT CORNER",JSLOG_POS_TOPLEFT));
		  parent.appendChild( jslogVar.console.getImgPos("arrowBottomRight.jpg","Move JSConsole to BOTTOM RIGHT LEFT CORNER",JSLOG_POS_BOTTOMRIGHT));
		  parent.appendChild( jslogVar.console.getImgPos("arrowLeft.jpg","Move JSConsole to LEFT SIDE",JSLOG_POS_LEFT));
		  parent.appendChild( jslogVar.console.getImgPos("arrowRight.jpg","Move JSConsole to the RIGHT SIDE",JSLOG_POS_RIGTH));
		  // parent.appendChild( jslogVar.console.getBtnSep());
		  parent.appendChild( jslogVar.console.getImgPos("arrowTop.jpg","Move JSConsole to the TOP",JSLOG_POS_TOP));
		  parent.appendChild( jslogVar.console.getImgPos("arrowBottom.jpg","Move JSConsole to the BOTTOM",JSLOG_POS_BOTTOM));
			//-------------------------------------- SIZE
			parent.appendChild( jslogVar.console.getGroupSep(""));
			var listBtnSize = new Array();
			var w=30;
			listBtnSize.push( [ 'XS', w,'Size SX',  function(){ jslogVar.console.setSize(JSLOG_SIZE.XS); } ] );
			listBtnSize.push( [ 'S', w,'Size S',  function(){ jslogVar.console.setSize(JSLOG_SIZE.S); } ] );
			listBtnSize.push( [ 'M', w,'Size M',  function(){ jslogVar.console.setSize(JSLOG_SIZE.M); } ] );
			listBtnSize.push( [ 'L', w,'Size L',  function(){ jslogVar.console.setSize(JSLOG_SIZE.L); } ] );
			listBtnSize.push( [ 'XL', w,'Size XL',  function(){ jslogVar.console.setSize(JSLOG_SIZE.XL); } ] );
			// ========================== Add buttons
			for(var i=0; i < listBtnSize.length; i++ ){
				var btn = jslogVar.console.getBtn(listBtnSize[i]);
				parent.appendChild( btn);
				parent.appendChild( jslogVar.console.getBtnSep());
			}		
		  // ----------------------------------------- define any Other Add-on Buttons
		  parent.appendChild( jslogVar.console.getGroupSep(""));
		  listBtn.push( [ 'Clear', 60, 'Clear the Window',  function(){ jslogVar.console.clearWindow(); } ] );
		  listBtn.push( [ 'Delimiter', 70, 'Add a Separator Delimet',  function(){ jslogVar.console.sendDelimiter(); }] );
		  if (jslogVar.console.isIE()){
		    listBtn.push( [ 'CopyToClipboard',120, 'Copy To Clipboard All the  contain of the  Window',  function(){ jslogVar.console.copy2Clipboard(); }  ] );
		  }else{
		    listBtn.push( [ 'SelectAll',70, 'Select ALL', function(){ jslogVar.console.selectAll(); } ] );
		  }
			// ========================== Add buttons
			for(var i=0; i < listBtn.length; i++ ){
				var btn = jslogVar.console.getBtn(listBtn[i]);
				parent.appendChild( btn);
				parent.appendChild( jslogVar.console.getBtnSep());
			}
		  parent.appendChild( jslogVar.console.getGroupSep(""));
		  var btnDebug = jslogVar.console.getBtn( [ 'Show debug Fields', 130, 'Show hidden fields having class="debug" or id="debug"',  function(){
		  	  var szBtnValue, szBtnTitle;
				  if (jslogVar.console.debugVisible){
				  	// Debug are visible. We hide them
					  jslogVar.console.debugVisible = false;
					  szBtnValue = 'Show ' + JSLOG_ID_DEBUG + ' Fields';
					  szBtnTitle = 'Show hidden fields having class="' + JSLOG_ID_DEBUG +  '" or id="' + JSLOG_ID_DEBUG + '"';
				  }else{
				  	// Debug are visible. We Show them them
					  jslogVar.console.debugVisible = true;
					  szBtnValue = 'Hide ' + JSLOG_ID_DEBUG  + 'Fields';
					  szBtnTitle = 'Hide again Debug fields having class="' + JSLOG_ID_DEBUG + '" or id="' +JSLOG_ID_DEBUG + '"';
				  }
				  // Change value and title of the array (2) of btnDebug
				  for (var i=0; i<jslogVar.console.arBtnDebug.length; i++){
				  	var btnDebug = jslogVar.console.arBtnDebug[i]; 
					  btnDebug.value = szBtnValue;
					  btnDebug.title = szBtnTitle;
				  }
				  
			  	// Get List of all elements with tag SPAN and id= "debug"
				  var TAG_DEBUG = ["SPAN","DIV","TABLE"];
				  
				  for (var iTag=0; iTag < TAG_DEBUG.length; iTag++){
				  	var ElList = document.getElementsByTagName(TAG_DEBUG[iTag]);
				  	for (var i=0; i < ElList.length; i++){
				  		var El = ElList [i];
				  		if (El.id == "debug" || El.className == "debug"){
				  		  if (jslogVar.console.debugVisible){
				  		  	// El.style.visibility="visible";
				  		    El.style.display="block";
				  		  }else {
				  		    // El.style.visibility="hidden";
				  		    El.style.display="none";
				  		  }
				  		}
				  	}
				  }	
		  }] );
			parent.appendChild(btnDebug);
			// add to the list of btnDebuf
			jslogVar.console.arBtnDebug.push (btnDebug);
			parent.appendChild( jslogVar.console.getGroupSep(""));
			//-------------------------------- Select with logLev
			// We add Only in Footer because they do not work in H3
			if (bFooter ){
        var label = document.createElement( 'label' );
        label.className = "jslogFooter";
        label.innerHTML  =	"SETTINGS: ";
        parent.appendChild(label);
	      var selectLogLev = document.createElement( 'select');
	      selectLogLev.className ='jslog';
	      for (var i=0; i <= 31; i++){
	      	var szText = "LogLevel=" + i;
	      	if (i==0){
	      		szText = "CLOSE JSLOG";
	      	}
	        var elOpt = new Option(szText,i);
	        elOpt.dv = szText;
	        elOpt.selected = (jslogVar.iLogLev == i);
	        selectLogLev[selectLogLev.length] = elOpt;
	      }
	      jslogVar.console.addEvent(selectLogLev, 'change', function(){ 
	      	  jslogLevSet (this.selectedIndex);
	      	}  );
	      parent.appendChild(selectLogLev);
	      jslogVar.console.selectLogLev = selectLogLev;
	      //-------------------------------------------------------
	      var selectLogTime = document.createElement( 'select');
	      selectLogTime.className ='jslog';
	      var arOpt =[["0","NO Time"],["1","Log Time"]];
	      for (var i=0; i < arOpt.length; i++){
	      	var szText = arOpt[i][1];
	        var elOpt = new Option(szText,arOpt[i][0]);
	        elOpt.dv = szText;
	        elOpt.selected = ((!jslogVar.bLogTime && i==0) || (jslogVar.bLogTime && i==1));
	        selectLogTime[selectLogTime.length] = elOpt;
	      }
	      jslogVar.console.addEvent(selectLogTime, 'change', function(){ 
	      	jslogVar.bLogTime = (this.selectedIndex ==1);
	      	}  );
	      parent.appendChild(selectLogTime);
			}
			
	  },
	  
	  /*----------------------------------------------------------------------------
	                              Footer Functions
	  ----------------------------------------------------------------------------*/
	  // send a delimiter to the window
	  sendDelimiter: function(){
	    jslogVar.console.send(null, JSLOG_DELIMITER);
	  },
	  selectAll: function() {
	    if (document.selection) {
	        var range = document.body.createTextRange();
	        range.moveToElementText(jslogVar.console.window);
	        range.select();
	    } else if (window.getSelection) {
	        var range = document.createRange();
	        range.selectNode(jslogVar.console.window);
	        window.getSelection().addRange(range);
	    }
	  },  
	  
	  // copy 2 Clipboard (only IE)
	  copy2Clipboard: function(){
	    var i=0;
	
		  // look for <BR> and <br> and replace with "\n"
	    // Get Current String with trace
		  var NewString = "" + jslogVar.console.viewport.innerHTML;
		  while (NewString.indexOf("<BR>")>-1) {
		    NewString = NewString.replace("<BR>","\n");
	      i++;
	    }
		  while (NewString.indexOf("<br>")>-1) {
		    NewString = NewString.replace("<br>","\n");
	      i++;
	    }	  
		  // Now NetString has NewLines
	    // for clipboard
		  var textArea = document.createElement( 'TextArea');
		  // textArea.innerText = Text;
		  textArea.innerText = NewString;
	    if (typeof(textArea.createTextRange) == "undefined"){
	      alert("copy2Clipboard NOT supported for This Browser - Supported Browser for COPY to Clipboard: IE." +
	      		 "To Copy to Clipboard Please use SelectAll or CTRL-C  CTRL-V");
	      return;
	    }
		  Copied = textArea.createTextRange();
		  Copied.execCommand("RemoveFormat");
		  Copied.execCommand("Copy");
	    // alert("ALL Rows Copied to Clipdoard ");
	
	  },
	
	  
	  isIE: function() {
	    try{
	      return ((navigator.appName == 'Microsoft Internet Explorer') || 
	          ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); 		
	    }
	    catch(err){
	      return false;
	    }
	  },  
	
	
	  getBtn: function(arDesc){
	      var btn = document.createElement( 'input');
	      btn.className = 'jslogButton';
	      btn.setAttribute( 'type', 'button' );
	      btn.setAttribute( 'value', arDesc[0] );
		    btn.style.width =  arDesc[1] + 'px';
	      btn.setAttribute( 'title', arDesc[2] );
	      jslogVar.console.addEvent( btn, 'click', arDesc[3] );
	      return btn;
	  },
	
	  getTxtSep: function(txt){
		  var sep = document.createElement( 'span' );
		  sep.style.color       = '#ffffff';
	    sep.style.fontWeight=  'bold';
		  sep.style.padding     = '0 2px 0px 10px';
		  sep.style.textAlign = "right";
		  sep.appendChild(document.createTextNode( txt ));
		  return sep;
	  },
	  getBtnSep: function(){
		  var sep = document.createElement( 'span' );
		  sep.style.color       = '#ffffff';
		  sep.style.padding     = '0 3px 0px 0px';
		  return sep;
	  },
	  getGroupSep: function(){
		  var sep = document.createElement( 'span' );
		  sep.style.color       = '#ffffff';
		  sep.style.padding     = '0 10px 0px 0px';
		  return sep;
	  },
	  
	  
	  getImgPos: function(src,tip,Pos){
	    var img = document.createElement( 'img' );
	    img.style.padding     = '0px 2px';
	    img.style.cursor      = 'pointer';
	    img.src = jslogVar.szPathImg + src;
	    img.height = 15;
	    img.width = 15;
	    img.align = "top";
	    img.title= tip;
	    img.style.border  = '1px solid black';
	    // Set Border Yellow when mouse is Over Img
	    jslogVar.console.addEvent( img, 'mouseenter',	function(){this.style.border  = '1px solid yellow'; });
	    jslogVar.console.addEvent( img, 'mouseleave', function(){this.style.border  = '1px solid black';});
	    jslogVar.console.addEvent( img, 'click', function(){jslogVar.console.setPos(Pos);});
	    //
	    return img;
	  },
	
	  
	  /*
	   * Set Console Position
	   * @param size  JSLOG_POS_XS...
	   */
	  setSize: function(size){
		  var hMax=0;
		  var wMax=0;
		  var w=0;
		  var h=0;
		  if (typeof(window.innerHeight) != 'undefined'){
			  //Some Space for scrollbar (if present)
			  hMax= window.innerHeight-30;
			  wMax= window.innerWidth-30;
		  }else{
			  // Particular cases
			  hMax= window.screen.height-150;
			  wMax= window.screen.width-30;
		  }
	
		  if (size == JSLOG_SIZE.XS){
		      w =1100;
		      h=150;
		  }
		  else if (size == JSLOG_SIZE.S){
			  h = parseInt (hMax *0.3);
			  w = parseInt (wMax *0.8);
		  }
		  else if (size == JSLOG_SIZE.M){
			  h = parseInt (hMax *0.5);
			  w = parseInt (wMax *1);
		  }
		  else if (size == JSLOG_SIZE.L){
			  h = parseInt (hMax *0.6);
			  w = parseInt (wMax *1);
		  }
		  else if (size == JSLOG_SIZE.XL){
			  jslogVar.console.window.style.top    = '0px';
			  jslogVar.console.window.style.left   = '0px';
			  h = parseInt (hMax *1);
			  w = parseInt (wMax *1);
		  }
		  if (w < 1100){
		  	w = 1100;
		  }
		  jslogVar.console.window.style.width    = w + 'px';
		  jslogVar.console.window.style.height   = h + 'px';
		  jslogVar.console.adjustViewport();
	  }, 	
	    
	  /*
	   * Set Console Position
	   * @param pos  JSLOG_POS_TOPLEFT...
	   */
	  setPos: function(pos){
		  var top = 0;
		  var left = 0;
		  if (typeof(window.innerHeight) != 'undefined'){
			  //Some Space for scrollbar (if present)
			  top= window.innerHeight - 50;
			  left= window.innerWidth - 150;
		  }else{
			  // Particular cases
		  	  top= window.screen.height-100;
		  	  left= window.screen.width-200;
		  }
		  if (pos == JSLOG_POS_TOPLEFT){
			  jslogVar.console.window.style.top    = '0px';
			  jslogVar.console.window.style.left   = '0px';
		  }
		  else if (pos == JSLOG_POS_BOTTOMRIGHT){
			  jslogVar.console.window.style.top   =  top + 'px';
			  jslogVar.console.window.style.left   = left + 'px';
		  }	
		  else if (pos == JSLOG_POS_TOP){
			  jslogVar.console.window.style.top        = '0px';
		  }
		  else if (pos == JSLOG_POS_BOTTOM){
			  // var h = jslogVar.console.window.style.height.replace('px','');
			  jslogVar.console.window.style.top   =  top + 'px';
		  }	
		  else if (pos == JSLOG_POS_LEFT){
			  jslogVar.console.window.style.left   = '0px';
		  }	
		  else if (pos == JSLOG_POS_RIGTH){
			  // var w = jslogVar.console.window.style.width.replace('px','');
			  jslogVar.console.window.style.left   = left + 'px';
		  }	
	  },
	  clearWindow: function(){
	    jslogVar.console.viewport.innerHTML = '';
	  },
	  /**
	   * @param iNum 			e.g    123
	   * @param szPad			"0"
	   * @param iLenWithPad	5 
	   * @returns  "00123
	   */
	  num2StrPad: function (iNum,szPad, iLenWithPad) {
	    var iZeroPad = iLenWithPad - iNum.toString().length + 1;
	    return Array(+(iZeroPad > 0 && iZeroPad)).join("0") + iNum;
	  }	  
	  
	  
  };

  // jslogVar.console.addEvent( window, 'load', jslogVar.console.init );
  // jslogVar.console.addEvent( window, 'load', jslogVar.console.sendBuffer );
   jslogVar.console.init(); 

}





