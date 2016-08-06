// ==================================================================== CONSTANT
//var JSLOG_LEV = 31;
// var JSLOG_LEV = 0;
var JSLOG_LEV = 7;



/**
* Called when jsu is loaded
*/
function jsu_loaded(){
	/* For sample that are NOT FREE like this one, we have to setup the State
	 */
	setupState(); 
  // Init jslog with JSLOG_LEV 
  // jslog_init(JSLOG_LEV);
	manage_par_opt(); // manage optional PAR show_opt, only for developer
  jslog (JSLOG_INFO,"jslog sample STARTED");
}


/* ============================================================================
 *             SAMPLE_1
 ============================================================================ */

function sample1_jslogStart(){
  var iLogLev =   selectGetSelVal(getElementById2("logLev1"));
  var selectLogTime = getElementById2("logTime");
  var bLogTime =   (selectLogTime.options[selectLogTime.selectedIndex].value == "1");
  jslog_init(iLogLev,{ bLogTime: bLogTime});
}

function jslog1()
{
	
  var szName = "Federico Levis";
  var iHeight = 177;
  var now = new Date();
  
  jslog(JSLOG_INFO,"This a Log at Level 1. My name is " + szName + ",  Height=" + iHeight + " cm  - Current Time is: " + now);
}




function jslog2()
{
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
}

function jslog4()
{
	// Prepare object to log
  var author ={
	  szFirstName: "Federico",  
	  szLastName : "Levis",
	  szCity : "Padova",
	  szNation : "Italy",
	  height: 176
  }; 
  // Get bLogCompact Option selected by User
  var selectLogCompact = document.getElementById("logCompact");
  var bLogCompact =   (selectLogCompact.options[selectLogCompact.selectedIndex].value == "1");
  // Log Object author at Level JSLOG_TEST=4 with bLogCompac Option
  jslogObj(JSLOG_TEST,"Log at Level 2 of a JS Object -  author:", author,bLogCompact);
}



/* ============================================================================
 *             SAMPLE_2
 ============================================================================ */

/**
 * 
 * @param iLogLev
 */
function jslog_sample2(iLogLev){
	var szUrl = getSampleUrl(JSU_URL_SAMPLE_VALIDATE, JSU_ID_SAMPLE_VALIDATE);
	jslog (JSLOG_INFO,szUrl);
	var szPar = JSLOG_LEV_URL_PAR + "=" + iLogLev;
	jslog (JSLOG_INFO,"PASSING PARAMETER  ="+ szPar );
	// Example: https://rawgit.com/FedericoLevis/WORK/master/3/samples/Validate/ValidateSample.html?jslog=3
	szUrl = szUrl +  "?" + JSLOG_LEV_URL_PAR + "=" + iLogLev;		
	var aId = getElementById2("href_validate");
	aId.href = szUrl;
	aId.click();
	
}





//===================================================================================================
//  BELOW CODE is not strictly related to the Sort feature, but it is ONLY Related to JS Code Highlight
//===========================================================================================


var JS1_JSLOG_START= '// START jslog:  \n' +
'// - iLogLev is a BITMASK to Enable the various Level.\n' +
'//   Example of Levels Enable (X) with various settings:\n\n' +
'//     iLogLev   |  Level=1   Level=2  Level=4 \n' +
'//   ------------|---------------------------- \n' +
'//        1      |     X                       \n' +
'//        2      |               X              \n' +
'//        5      |     X                  X     \n' +
'//        7      |     X         X        X     \n' +
'// - bLogTime is an example of one of the Optional OPTIONS\n\n' +
'jslog_init(iLogLev,{ bLogTime: bLogTime}); ';

var JS1_JSLOG_END= '// Close jslog Window \n' +
'jslog_end();';

var JS1_LEV1= '// Prepare szMsg: \n' +
'var szName = "Federico Levis";\n' +
'var iHeight = 177; \n' +
'var now = new Date(); \n' +
'//LOG at Level JSLOG_INFO=1 \n' +
'jslog(JSLOG_INFO,"This a Log at Level 1. My name is " + szName + ",  Height=" + iHeight + " cm  - Current Time is: " + now);\n';


var JS1_LEV2='//Prepare json	\n' +
'var jsonEx = {"total":5,"rows":[ \n' +
'	{"day":"21/04/2015","daration_sec":15,"err_num":7}, \n' +
'	{"day":"22/04/2015","daration_sec":0,"err_num":1}, \n' +
'	{"day":"23/04/2015","daration_sec":3,"err_num":3}, \n' +
'	{"day":"24/04/2015","daration_sec":3,"err_num":2}, \n' +
'	{"day":"25/04/2015","daration_sec":3,"err_num":14} \n' +
']}; \n' +
'// log json at Level JSLOG_DEBUG=2 \n' +
'jslogJson(JSLOG_DEBUG,"Log at Level 2 of a JS Object.  jsonEx:", jsonEx);';

var JS1_LEV4= '// Prepare object to log\n' +
'  var author ={ \n' +
'	  szFirstName: "Federico",   \n' +
'	  szLastName : "Levis", \n' +
'	  szCity : "Padova", \n' +
'	  szNation : "Italy", \n' +
'	  height: 176 \n' +
'  };  \n' + 
'  // Get bLogCompact Option selected by User  \n' +
'  var selectLogCompact = document.getElementById("logCompact"); \n' +
'  var bLogCompact =   (selectLogCompact.options[selectLogCompact.selectedIndex].value == "1"); \n' +
'  // Log Object author at Level JSLOG_TEST=4 with bLogCompac Option \n' +
'  jslogObj(JSLOG_TEST,"Log at Level 2 of a JS Object -  author:", author,bLogCompact);';


var JS2_START= '// Test1: pass jslog=7 as URL parameter \n' +
'aId.href = "https://rawgit.com/JSUtility/JSUDoc/master/JSPopup.js/index.html?jslog=7"; \n' +
'// Now click the Link: jslog window with LogLevel=7 will be displayed... \n' +
'// ...\n' +
'//Test2: DO NOT pass jslog as URL parameter (default is jslog=0) \n' +
'aId.href = "https://rawgit.com/JSUtility/JSUDoc/master/JSPopup.js/index.html"; \n' +
'// Now click the Link: jslog windows will not be displayed... \n' +
'// ...\n';