/* =========================================================================================
@File:     				jsu_cel.js
@Author:   				Federico Levis
@Since:  				Apr 2016   
Description: 			require.js Definition for Cognos jsu_cel with ModalPopup
Option:					  - JSU_PATH_BASE can also be defined in the html that include this file:
									  EXAMPLE:
										  var JSU_PATH_BASE = "/ibmcognos/jsu";  
									- If JSU_PATH_BASE is not already  defined, it is defined here
						  - JSU_LOADED_TMO_MS
						    In very rare case we need to wait a little before accessing the Cognos DOM in jsy_loaded. 
						    It can happen e.g Cognos 64 Bit with IE 11 in Compatibility Mode
                            In these case you can define JSU_LOADED_TMO_MS to be called after this TMO, instead of be calling immediatly after loading all JS						  
DISCLAIMER
Copyright by Federico Levis - JSUtily http://federicolevis.wix.com/jsu
This file may be freely distributed/modified under the MIT license. 
========================================================================================= */



/* the BASE Path: Path of ..../jsu folder. 
 a) Fixed 
 b) relative Path (relative to HTML including this file)
*/  

if (typeof (JSU_PATH_BASE) == "undefined"){
	var JSU_PATH_BASE = '/ibmcognos/jsu';  // DEfault: it is the setting for the JSU sample
}

//===================================== OPTION: JSU with Comment or Minified   
//decomment only the version that you want to use
var jsuVersion ="";       // JSU with Comment (or Obfuscated in the Free version)
//var jsuVersion = "/Minify"      // JSU Minified
//----- ExternalPlugin (jquery, jquery-ui)
var externalPluginVersion = "/Minify";


//----------------------------------- FIXED, depending on JSU_PATH_BASE
var JSU_PATH_IMG =   JSU_PATH_BASE + "/images/";
var JSU_PATH_POPUP_HTML = JSU_PATH_BASE +  "/core/Popup/";
//----------------------------------- FIXED 
var JSU_PATH_ABOUT_IMG = "https://rawgit.com/FedericoLevis/images/master/jsuAbout/";
var JSU_PATH_DOC = "https://rawgit.com/FedericoLevis/JSUDoc/master/";

//----------------------------------- MODULE CONFIGURATION
requirejs.config({
    baseUrl: JSU_PATH_BASE,
	// Path relative to baseUrl
    paths: {
        'core': 'core' + jsuVersion,
        'lan': 'locale/EN',
//      'lan': 'locale/ITA',     // For Italian Language
        'popup': 'core/Popup',
        'cognos': 'cognos/lib' + jsuVersion
    },
    shim: {
      'core/jslog': ['core/dom-drag'],
      'core/cSortTable': ['core/date']
    }    
});


require([ // First 3 always present
         'lan/locale-core', 
         'core/jslog',            /* require dom-drag, json2 */
         'core/util',							/* require json2 */
         'core/tooltip',
         'core/cSortTable',       /* require date, jslog */
         'core/cValidate',        /* require date, jslog, tooltip, popup/Popup */
         'popup/Popup',
		 'cognos/cognosUtil', 'cognos/cTipImg'
		   ],
				function()	{	
						jsu_loaded_1();
					} 
 );


var jsuLoadedTmo = null;   
   
function jsu_loaded_1(){
  if (typeof (JSU_LOADED_TMO_MS) == "undefined"){
    if (typeof (jsu_loaded) != "undefined"){
     return jsu_loaded();
    }
  }
  jsuLoadedTmo = setTimeout(jsu_loaded_2, JSU_LOADED_TMO_MS); 
}


function jsu_loaded_2(){
   clearTimeout (jsuLoadedTmo);
   return jsu_loaded();
}


   