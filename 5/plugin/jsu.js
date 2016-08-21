


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
        'popup': '2/core/BlockPopup'
    },
    shim: {
      'core/jslog': ['core/dom-drag']
    }    
});



require([ // First 3 always present
         'lan/locale-core', 
         'core/jslog',            
         'core/util',							
         'core/date',							
         'core/tooltip',
         'popup/Popup',
         'loadingDiv',							
         'cValidate'        
		   ],
    	   function()	{	
							if (typeof (jslog_init) == "function"){
								jslog_init(JSLOG_LEV_URL);
							}
							jsu_loaded_1();
						} 
   );


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



   