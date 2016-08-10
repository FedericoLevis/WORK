// ==================================================================== CONSTANT
// var JSLOG_LEV = 0;
//var JSLOG_LEV = 31;
var JSLOG_LEV = 15;

var PATH_LOADING_GIF = "https://rawgit.com/FedericoLevis/images/master/loading/";
var PATH_SAMPLES_GIF = "https://rawgit.com/FedericoLevis/images/master/samples/";
// Dev:
//var PATH_LOADING_GIF = "../../images/loading/";
// var PATH_SAMPLES_GIF = "../../images/samples/";

 var TMO_LOADING3_JSU_SEC = 10000;
 var TMO_LOADING3_3STATE_SEC = 3000;

//==================================================================== VARIABLE
 var tmoLoading1 = null, tmoLoading2 = null, tmoLoading3 = null;
 var state=0;
 
//==================================================================== FUNCTION
 
 
/**
* Called when jsu is loaded
*/
function jsu_loaded(){
	/* For sample that are NOT FREE like this one, we have to setup the State
	 */
	setupState(); 
  // [Optional] Init jslog with JSLOG_LEV 
  // jslog_init(JSLOG_LEV);
	manage_par_opt(); // manage optional PAR show_opt, only for developer
	populateDuration();
	populateUrlGif();
	// Set DEfault
	try{  // use try catch beacuse we use this file also from HTML doc
		getElementById2("szTitleHtml").value = "Loading Title <i>Example</i>";
		getElementById2("szDiffMsgHtml").value = "<b>Loading could require <i>some seconds</i></b><BR/><BR/>Please Wait...";
	}catch (e){
		;
	}
	loadingShow(false);
}


function populateDuration(){
	// Select and selVal
  var arSelect =[["selectDur1","3"], ["selectDur2","5"]];
  var arDur=	[	["3","3 sec"],["5","5 sec"],["10","10 sec"]];
  
  for (var i=0; i< arSelect.length; i++){
  	var elSelect = arSelect[i];
  	selectPopulate (getElementById2 (elSelect[0]),arDur,elSelect[1]);
  }
  
  
}

function populateUrlGif(){
	// Select and selVal
  var arUrlGif=	[	
              	 	[PATH_LOADING_GIF + "1ColorRing.gif","1ColorRing"],
               	 	[PATH_LOADING_GIF + "2ColorRing.gif","2ColorRing"],
               	 	[PATH_LOADING_GIF + "Cat.gif","Cat"],
               	 	[PATH_LOADING_GIF + "3Wheels.gif","3Wheels"],
               	 	[PATH_LOADING_GIF + "Disk.gif","Disk"],
               	 	[PATH_LOADING_GIF + "FillingRing.gif","FillingRing"],
               	 	[PATH_LOADING_GIF + "Ventilator.gif","Ventilator"],
               	 	[PATH_LOADING_GIF + "JSU.gif","JSU"]
  ];
  
	selectPopulate (getElementById2 ("szDiffUrlGif"),arUrlGif,PATH_LOADING_GIF + "Cat.gif");
}


/*====================================================================
 *  					SAMPLE_1
 =================================================================== */

/**
 * Show loadingDiv
 */
function onclickLoading1() {
  tmoLoading1 = setTimeout(tmoElapsedLoading1, 1000 * selectGetSelVal(getElementById2("selectDur1")));
	loadingDivShow ();	
}

/**
 * Timeout Elapsed: Hide loadingDiv
 * 
 */
function tmoElapsedLoading1 () {
	clearTimeout (tmoLoading1);
	loadingDivHide ();	
	elementShow (getElementById2("loadedSample1"),true);
}


/*====================================================================
 *  					SAMPLE_2
 =================================================================== */


/**
 * Show LoadingDiv with the selected Options
 */
function onclickLoading2() {
	// Timer to simulate the Duration of Loading Operation
  tmoLoading2 = setTimeout(tmoElapsedLoading2, 1000 * selectGetSelVal(getElementById2("selectDur2",true)));
  // 1) Show LoadingDiv with the selected Options
	loadingDivShow ( {
		szTitleHtml: getElementById2("szTitleHtml").value,  
    szDiffMsgHtml: getElementById2("szDiffMsgHtml").value,  
    bShowElapsedSec: selectGetSelVal (getElementById2("bShowElapsedSec")) == "TRUE", 
    bShowCancel: selectGetSelVal (getElementById2("bShowCancel")) == "TRUE",
    iDivWidth: selectGetSelVal (getElementById2("iDivWidth")),
    szDiffUrlGif: selectGetSelVal (getElementById2("szDiffUrlGif")),
    fnCancelCallback: loading2CancelCallback	
      });
}

function tmoElapsedLoading2 () {
	clearTimeout (tmoLoading2);
	loadingDivHide ();	
	var elLoadedSample2 = getElementById2("loadedSample2");
	elLoadedSample2.className = "tipGood";
	elLoadedSample2.innerHTML = "Loaded";
	elementShow (elLoadedSample2,true,"inline");
}


function loading2CancelCallback(){
	clearTimeout (tmoLoading2);
	var elLoadedSample2 = getElementById2("loadedSample2");
	elLoadedSample2.innerHTML = "CANCELLED";
	elLoadedSample2.className = "tipErr";
	elementShow (elLoadedSample2,true,"inline");
}



/*====================================================================
 *  					SAMPLE_3
 =================================================================== */


function onclickLoading3(){
	var szType = selectGetSelVal (getElementById2("loadingType3"));
	if (szType == "CustomLayout"){
		showCustomLayout();
	}else {
		show3States();
	}
}


/**
 * Show loadingDiv with Custom Layout
 */
function showCustomLayout() {
	// Timer to simulate the Duration of Loading Operation
  tmoLoading3= setTimeout(tmoElapsedLoading3, TMO_LOADING3_JSU_SEC);
  var szJsuMsg = '<table class="tip"  cellspacing="0" cellpadding="2" width="500px">' +
  '  <tr > ' +
  '   <td  align="center" class="jsuAboutTitle" > <img class="jsuAboutTitle" src="'  + JSU_PATH_ABOUT_IMG + 'jsuAboutTitle.png"/></td> ' +
  '   <td  align="left" class="jsuAboutTitle"> <img class="jsuAboutTitle" src="'  + JSU_PATH_ABOUT_IMG + 'ComputerVelox.gif"/></td> ' +
  '  </tr>' +
  '  <tr><td colspan="2">' +
  '    <table style="background-color:white;" ><tr>' +
  '      <td id="loadingDivTdGif" align="left" width="150px">' +
  '          <img  src="'  + PATH_LOADING_GIF + 'JSU.gif" />' +
  '      </td>' +
  '      <td width="250px" class="loadingDivMsg" style="font-size: 17px">' +    
  '         <b>Loading JSU components</BR>Please wait...' +
  '      </td> ' +
  '    </tr></table>' +
  '  </td></tr>' +
  '</table>';
  
  // Show loadingDiv
  loadingDivShow ({
  		szTitleHtml: "JSU",
      szDiffMsgHtml: szJsuMsg,  // Custom Msg with the Table with Image, Gif, Message
      bShowElapsedSec: true,
      bShowGif: false, // hide default Gif because we have everything in szDiffMsgHtml 
      bShowCancel: true,
      iDivWidth: 500,
      szBackgroundColor : "gray", // backgound color of the part of the Div different from szDiffMsgHtml 
      fnCancelCallback: loading3CancelCallback 
    });  
}

function tmoElapsedLoading3() {
	clearTimeout (tmoLoading3);
	loadingDivHide ();	
	var elLoadedSample3 = getElementById2("loadedSample3");
	elLoadedSample3.className = "tipGood";
	elLoadedSample3.innerHTML = "Loaded";
	elementShow (elLoadedSample3,true,"inline");
}


/**
 * LoadingDiv Cancel Callback
 */
function loading3CancelCallback(){
	clearTimeout (tmoLoading3);
	var elLoadedSample3 = getElementById2("loadedSample3");
	elLoadedSample3.innerHTML = "CANCELLED";
	elLoadedSample3.className = "tipErr";
	elementShow (elLoadedSample3,true,"inline");
}



/**
 * Start LoadingDiv with 3 different Loading States
 */
function show3States() {
	// Timer to simulate the Duration of Loading Operation
  tmoLoading3 = setInterval(tmoElapsedLoading3States, TMO_LOADING3_3STATE_SEC);
  showLoadingDivState(1); 
}


/**
 * Show LoadingDiv with 3 different Loading States: 1) Show First State
 * 
 * @param curState  {Number} 1,2,3
 */
function showLoadingDivState (curState){
	var szMsg;
	var szUrlGif;
	var bResetElapsedSec = (curState == 1);
	
	state = curState;
	if (curState == 1){
		szMsg = "<b>[Action 1/3]</b><BR/>Searching Files...";
		szUrlGif = PATH_SAMPLES_GIF + "Search.gif";
	}else if (curState == 2){
		szMsg = "<b>[Action 2/3]</b><BR/>Printing Files...";
		szUrlGif = PATH_SAMPLES_GIF + "Print.gif";
	}else if (curState == 3){
		szMsg = "<b>[Action 3/3]</b><BR/>Sending Emails...";
		szUrlGif = PATH_SAMPLES_GIF + "SendEmail.gif";
	}
  loadingDivShow ({
		szTitleHtml: "JSU",
    szDiffMsgHtml: szMsg,
    bShowElapsedSec: true,
    bResetElapsedSec: bResetElapsedSec,
    bShowCancel: true,
    iGifWidth: 160,
    iDivWidth: 350,
    szDiffUrlGif: szUrlGif,
    fnCancelCallback: loading3CancelCallback 
  });  
}

/**
 * Elapsed the Tmo of Loading Sample 3: 3 States
 */
function tmoElapsedLoading3States () {
	if (state == 1){
	  showLoadingDivState(2); 
	}else if (state == 2){
	  showLoadingDivState(3); 
	}else if (state == 3){
		tmoElapsedLoading3();
	}	
}


//===================================================================================================
//  BELOW CODE is not strictly related to this JSU feature, but it is ONLY Related to JS Code 
//===========================================================================================

var JS_LOADING1= '//Only 2 JSU calls are required:\n' +  
'//   - loadingDivShow(objOpt) : Show the LoadingDiv with optional objOpt\n' +  
'//   - loadingDivHide()       : Hide the LoadingDiv\n\n' +  
'// 1) We Show LoadingDiv (with default Options)\n' +
'loadingDivShow();\n' + 
'// Execute the "Long Loading Operation". During this Code execution the User will see only the LoadingDiv \n' + 
'... \n' + 
'... \n' + 
'//Now  we have finished Executing the "Long Loading Operation"  \n' + 
'// 2) Finally we Hide LoadingDiv\n' + 
'loadingDivHide();'; 

var JS_LOADING2= '// 1) Show LoadingDiv with the selected Options\n' +
'loadingDivShow ( { \n' +
'   szTitleHtml: getElementById2("szTitleHtml").value,\n' +  
'   szDiffMsgHtml: getElementById2("szDiffMsgHtml").value, \n' + 
'   bShowElapsedSec: selectGetSelVal (getElementById2("bShowElapsedSec")) == "TRUE",\n' + 
'   bShowCancel: selectGetSelVal (getElementById2("bShowCancel")) == "TRUE",\n' +
'   iDivWidth: selectGetSelVal (getElementById2("iDivWidth")),\n' +
'   szDiffUrlGif: selectGetSelVal (getElementById2("szDiffUrlGif")),\n' +
'   fnCancelCallback: loading2CancelCallback\n' +	
' });\n' +
'// Execute the "Long Loading Operation". During this Code execution the User will see only the LoadingDiv \n' + 
'... \n' + 
'... \n' + 
'//Now  we have finished Executing the "Long Loading Operation"  \n' + 
'// 2) Finally we Hide LoadingDiv\n' + 
'loadingDivHide();'; 


var JS_LOADING_OPT= '//================================================================================================================\n' + 
'//OPTIONAL objOpt  of loadingDiv(objOpt):\n' +
'//        szTitleHtml:       {String}: [""] if != "" Show Title \n' + 
'//        bShowGif:          {Boolean}: [true] show the Loading Gif \n' + 
'//        szDiffUrlGif:      {String Url}: [null] if different from null use this URL instead of CSS default \n' +  
'//        bShowElapsedSec:   {Boolean} [false] if true show a Footer with Elapsed Time (sec) \n' +
'//        bResetElapsedSec:  {Boolean} [false] if true reset timer \n' +
'//        szDiffMsgHtml:     {String} if different from null, show this Msg (HTML) instead of Default \n' +
'//        iDivWidth:         {Number} if different from null, set this Div Width instead of using DEfault Width (CSS) \n' +
'//        iGifWidth:         {Number} if different from null, set this Gif Width instead of using DEfault Width (CSS) \n' +
'//        bShowCancel:       {Boolean}: [false] show the Cancel Btn \n' +
'//        szBackgroundColor: {String} Div BackgroundColor, if different from null or "", \n' + 
'//        fnCancelCallback:  {function} [null]  called when Cancel button is clicked \n' +
'//================================================================================================================'; 

var JS_LOADING3_LAYOUT= 
'// Prepare the Custom Layout: an HTML Table with Image, Gif, Message\n' +
'var szJsuMsg="..." \n' + 	
'// 1) Show LoadingDiv with Options to show a Custom Layout\n' +
'loadingDivShow ({\n' +
'	szTitleHtml: "JSU",\n' +
'  szDiffMsgHtml: szJsuMsg,  // Custom Msg with the Table with Image, Gif, Message\n' +
'  bShowElapsedSec: true,\n' +
'  bShowGif: false, // hide default Gif because we have everything in szDiffMsgHtml\n' + 
'  bShowCancel: true,\n' +
'  iDivWidth: 430,\n' +
'  szBackgroundColor : "gray", // backgound color of the part of the Div different from szDiffMsgHtml\n' + 
'  fnCancelCallback: loading3CancelCallback \n' +
'});  \n' +
'// Execute the "Long Loading Operation". During this Code execution the User will see only the LoadingDiv \n' + 
'... \n' + 
'... \n' + 
'//Now  we have finished Executing the "Long Loading Operation"  \n' + 
'// 2) Finally we Hide LoadingDiv\n' + 
'loadingDivHide();'; 

var JS_LOADING3_3STATES= 
	'// 1) Show LoadingDiv with Options to show First State: Search\n' +
	'loadingDivShow ({\n' +
	'  szDiffMsgHtml: "<b>[Action 1/3]</b><BR/>Searching Files...",  \n' +
	'  szDiffUrlGif: ".../Search.gif",\n' +
	'  ...\n' +
	'});  \n' +
	'// Execute the "State1 Operation" \n' + 
	'... \n' + 
	'// 2) State1 is completed - Now we Show LoadingDiv with Options to show State2: Search\n' +
	'loadingDivShow ({\n' +
	'  szDiffMsgHtml: "<b>[Action 2/3]</b><BR/>Printing Files...",  \n' +
	'  szDiffUrlGif: ".../Print.gif",\n' +
	'  bResetElapsedSec: false; // DO NOT Reset Elapsed sec (because we continue from previous state)\n' +
	'  ...\n' +
	'});  \n' +
	'// Execute the "State2 Operation" \n' + 
	'... \n' + 
	'// 3) State2 is completed - Now we Show LoadingDiv with Options to show State3: SendEmail\n' +
	'loadingDivShow ({\n' +
	'  szDiffMsgHtml: "<b>[Action 2/3]</b><BR/>Sending Emails...",  \n' +
	'  szDiffUrlGif: ".../SendEmail.gif",\n' +
	'  bResetElapsedSec: false; // DO NOT Reset Elapsed sec (because we continue from previous state)\n' +
	'  ...\n' +
	'});  \n' +
	'// Execute the "State3 Operation" \n' + 
	'... \n' + 
	'//4) Now  we have finished All the 3 operations. So We Finally Hide LoadingDiv\n' + 
	'loadingDivHide();'; 


/**
 * Show JS Code Hightlighted for Sample3
 * @param event
 */
function sample3JS(event){
  var szTip="";
  var szType = selectGetSelVal (getElementById2("loadingType3"));
  var szTypeText = selectGetSelText (getElementById2("loadingType3"));
	if (szType == "CustomLayout"){
    szTip = JS_LOADING3_LAYOUT;
	}else {
    szTip = JS_LOADING3_3STATES;
	}
  TipJSFixedClicked(szTip,event,{iJSMaxHeight: 300, szTitle:"JS Source Code - CUSTOM LoadingDiv Sample: " + szTypeText});
  
}


