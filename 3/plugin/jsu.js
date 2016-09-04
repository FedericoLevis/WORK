/** @fileOverview
========================================================================================= <BR/> 
<b>File:</b> 			jsu.js <BR/>
<b>Author:</b>     		<a href="https://www.linkedin.com/in/federicolevis" target="_blank">Federico Levis</a> <BR/>
<b>Description:</b>    js used to load JSU wiith require.js :  base configuration on,y with PURE JS PLUGIN - this vesrione is USED during LOCAL DEVELPOMENT<BR/>
<b>OPTIONS:</b>        Before loading this file we can define following JS variable to set JSU Options: 

                       - JSU_PATH_BASE ["../.."]  
                         can be a fixed path or a path relative to the HTML loading this file                       
                         Examples: <ul>
                           var JSU_BASE_URL = https://rawgit.com/FedericoLevis/WORK/master"
		                   var JSU_BASE_URL = "/ibmcognos/jsu";  // FOR COGNOS     
						   var JSU_PATH_BASE = '../..';   // cen be used during local development
						If JSU_PATH_BASE is not already  defined, it is defined here as "../.." (for development)
                        
                      - JSU_GA_TRACKING_ID: when defined, this module will load google-analytics and send  a page-view with JSU_GA_TRACKING_ID
                         
<b>REQUIRED:</b>        JSU with jquery, jquery-ui <BR/>
<b>First Version:</b>     ver 1.0 - Jul 2007  <BR/>
<b>Current Version:</b>   ver 3.3 - Jul 2016  <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>DISCLAIMER</b>  <BR/>
Copyright by Federico Levis - <a href="https://github.com/JSUtility/JSU" target="_blank">JSU</a> <BR/> 
This file may be freely distributed under the MIT license.   <BR/>
========================================================================================= <BR/> 
*/


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

// ===================================== OPTION: JSU with Comment or Minified   
// decomment only the jsuVersion version that you want to use
var jsuVersion ="";       // JSU with Comment (or Obfuscated in the Free version)
// var jsuVersion = "/Minify"      // JSU Minified
//----- ExternalPlugin (jquery, jquery-ui)
var externalPluginVersion = "/Minify";

// ----------------------------------- FIXED, depending on JSU_PATH_BASE
var JSU_PATH_IMG =   JSU_PATH_BASE + "/images/";
var JSU_PATH_POPUP_HTML = JSU_PATH_BASE +  "/core/IEPopup/";
//----------------------------------- FIXED 
var JSU_PATH_ABOUT_IMG = "https://rawgit.com/FedericoLevis/images/master/jsuAbout/";
var JSU_PATH_DOC = "https://rawgit.com/FedericoLevis/JSUDoc/master/";



//Only for TEST during development
//var JSU_PATH_ABOUT_IMG = JSU_PATH_IMG +"about/";


//----------------------------------- MODULE CONFIGURATION
requirejs.config({
    baseUrl: JSU_PATH_BASE,
	// Path relative to baseUrl
    paths: {
        'core': 'core' + jsuVersion,
        'lan': 'locale/EN',
//      'lan': 'locale/ITA',     // For Italian Language
        'popup': 'core/IEPopup' + jsuVersion
    },
    shim: {
      'core/jslog': ['core/dom-drag'],
      'core/cSortTable': ['core/date']
    }    
});



require([ // First 3 always present
         'lan/locale-core', 
         'core/jslog',            
         'core/jsuCmn','core/util',							
         'core/tooltip',
         'core/prettify-jsu',      /* only for code- prettify */
         'core/googleAnal',
         'core/loadingDiv',							
         'core/cSortTable',       /* require date */
         'popup/Popup',
         'core/loadingDiv',							
         'core/cValidate'        /* require date, Popup */
		   ],
    	   function()	{	
							if (typeof (jslog_init) == "function"){
								jslog_init(JSLOG_LEV_URL);
							}
							jsu_loaded_1();
						} 
   );

//----------------------------------  ONLY for  GOOGLE ANALYTICS -  this part can be removed if you do not use them
if (typeof (JSU_GA_TRACKING_ID) != "undefined"){
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');


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



   