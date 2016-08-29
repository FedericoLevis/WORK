/* BASE_PATH fisso e punat a dove sono sparpagliati i vari file */

/* the BASE Path: Path of ..../jsu folder. 
 a) Fixed 
 b) relative Path (relative to HTML including this file)
*/  

if (typeof (JSU_PATH_BASE) == "undefined"){
  var JSU_PATH_BASE="https://rawgit.com/FedericoLevis/WORK/master";
}

// ===================================== OPTION: JSU with Comment or Minified   
//----- ExternalPlugin (jquery, jquery-ui)
var externalPluginVersion = "/Minify";

// ----------------------------------- FIXED
var JSU_PATH_IMG =   "https://rawgit.com/FedericoLevis/JSU/master/images/";
var JSU_PATH_POPUP_HTML = "https://rawgit.com/FedericoLevis/JSU/master/core/IEPopup/";
//----------------------------------- FIXED 
var JSU_PATH_ABOUT_IMG = "https://rawgit.com/FedericoLevis/images/master/jsuAbout/";
var JSU_PATH_DOC = "https://rawgit.com/FedericoLevis/JSUDoc/master/";

if (typeof (JSU_GA_EN) == "undefined"){
	// DEFAULT:  Enable GoogleAnaltycs
	var JSU_GA_EN = true; 
}


//Only for TEST during development
//var JSU_PATH_ABOUT_IMG = JSU_PATH_IMG +"about/";


//----------------------------------- MODULE CONFIGURATION
requirejs.config({
    baseUrl: JSU_PATH_BASE,
	// Path relative to baseUrl
    paths: {
			  'core': '2/core',
			  'loadingDiv': '2/core/loadingDiv',
			  'cValidate': '6/core/cValidate',
			  'lan': '6/locale/EN',
        'popup': '4/JQPopup',
        'prettify': '2/core',
        'jquery': '7/externalPlugin/jquery' + externalPluginVersion
    },
    shim: {
      'core/jslog': ['core/dom-drag'],
      'jquery/jquery-ui': ['jquery/jquery']  
    }    
});



require([ // First 3 always present
         'lan/locale-core', 
         'core/jslog',            
         'core/jsuCmn','core/util',							
         'core/date',							
         'core/tooltip',
         'prettify/prettify-jsu',
         'core/googleAnal',
         'popup/Popup',
         'loadingDiv',							
         'cValidate',
         'jquery/jquery-ui'
		   ],
    	   function()	{	
							if (typeof (jslog_init) == "function"){
								jslog_init(JSLOG_LEV_URL);
							}
							jsu_loaded_1();
						} 
   );



// ----------------------------------  ONLY for  GOOGLE ANALYTICS -  this part can be removed 
if (typeof (JSU_GA_EN) != "undefined" && JSU_GA_EN){
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  	  if (typeof (JSU_GA_TRACKING_ID) == "undefined"){
  	  	// we use the default TrackingId that identify FREE JSU
  	  	var JSU_GA_TRACKING_ID = 'UA-83225633-1'; 
  	  }
      ga('create',JSU_GA_TRACKING_ID , 'auto');
      ga('send', 'pageview');
  } 
// ------------------------------------------------------------------------------



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
