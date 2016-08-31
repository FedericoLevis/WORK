/* =========================================================================================
@File:     				jsu_jq.js
@Author:   				Federico Levis
@Since:  					Apr 2016   
Description: 			require.js Definition for jsu with JSPopup that requires jquery
Option:					  - JSU_PATH_BASE can be defined in the html that include this file:
									  EXAMPLE:
										  var JSU_BASE_URL = "/ibmcognos/jsu";  // FOR COGNOS
										  var JSU_PATH_BASE = '../..';   // FOR samples
									- If JSU_PATH_BASE is not already  defined, it is defined here
DISCLAIMER
Copyright by Federico Levis - JSUtily http://federicolevis.wix.com/jsu
This file may be freely distributed/modified under the MIT license. 
========================================================================================= */

/* the BASE Path: Path of ..../jsu folder. 
 a) Fixed 
 b) relative Path (relative to HTML including this file)
*/  

if (typeof (JSU_PATH_BASE) == "undefined"){
    // ONLY for LOCAL DEVELOPMENT
	var JSU_PATH_BASE = '../..';  // Default: it is the setting for the JSU sample
    // GIT
    // var JSU_PATH_BASE="https://rawgit.com/FedericoLevis/JSU/master";
}

//===================================== OPTION: JSU with Comment or Minified   
//decomment only the jsuVersion version that you want to use
//  "/Minify"       Version Minified
//  "/Obfuscated"     Version Obscured
var jsuVersion = "";
var externalPluginVersion = "/Minify";

// ----------------------------------- FIXED (they depend on JSU_PATH_BASE)
var JSU_PATH_IMG =   JSU_PATH_BASE + "/images/";
// var JSU_PATH_ABOUT_IMG = JSU_PATH_IMG + "about/";
var JSU_PATH_ABOUT_IMG = "https://rawgit.com/FedericoLevis/images/master/jsuAbout/";
var JSU_PATH_POPUP_HTML = JSU_PATH_BASE +  "/core/IEPopup/";


if (typeof (JSU_GA_EN) == "undefined"){
	// DEFAULT:  Enable GoogleAnaltycs
	var JSU_GA_EN = true; 
}

//----------------------------------- MODULE CONFIGURATION
requirejs.config({
    baseUrl: JSU_PATH_BASE,
	// Path relative to baseUrl
    paths: {
        'core': 'core' + jsuVersion,
        'lan': 'locale/EN',
//      'lan': 'locale/ITA',     // For Italian Language
        'popup': 'JQPopup' + jsuVersion,
        'jquery': 'externalPlugin/jquery' + externalPluginVersion
    },
    shim: {
      'core/jslog': ['core/dom-drag'],
      'core/cSortTable': ['core/date'],
      'jquery/jquery-ui': ['jquery/jquery']  
    }    
});



require([ // First 3 always present
         'lan/locale-core', 
         'core/jslog',            /* require dom-drag, json2 */
         'core/jsuCmn','core/util',							/* require json2 */
         'core/tooltip',
         'core/prettify-jsu',      /* only for code- prettify */
         'core/googleAnal',
         'core/cSortTable',       /* require date, jslog */
         'core/loadingDiv',							
         'core/cValidate',        /* require date, jslog, tooltip, popup/Popup */
         'popup/Popup',
         'jquery/jquery-ui'
		   ],
  	   function()	{	
	if (typeof (jslog_init) == "function"){
		jslog_init(JSLOG_LEV_URL);
	}
	jsu_loaded_1();
} 
);

//----------------------------------  ONLY for  GOOGLE ANALYTICS -  this part can be removed 
if (typeof (JSU_GA_EN) != "undefined" && JSU_GA_EN){
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	  if (typeof (JSU_GA_TRACKING_ID) == "undefined"){
	  	// we use the default TrackingId theat identify FREE JSU
	  	var JSU_GA_TRACKING_ID = 'UA-83225633-1'; 
	  }
    ga('create',JSU_GA_TRACKING_ID , 'auto');
    ga('send', 'pageview');
} 
//------------------------------------------------------------------------------

  
var jsuLoadedTmo = null;   

function jsu_loaded_1(){
  if (typeof (JSU_LOADED_TMO_MS) == "undefined"){
    if (typeof (jsu_loaded) != "undefined"){
     return jsu_loaded();
    }else {
    	return;
    }
  }
  jsuLoadedTmo = setTimeout(jsu_loaded_2, JSU_LOADED_TMO_MS); 
}


function jsu_loaded_2(){
	clearTimeout (jsuLoadedTmo);
	return jsu_loaded();
}
