
/* =============================================================================================
   						CONSTANT
============================================================================================= */

var JSLOG_LEV = 0;


var TIP_SORT_FEATURE="<b>Sort Feature: DAFARE</b>";



/* =============================================================================================
									FUNCTION
============================================================================================= */

/**
* Called when jsu is loaded
*/
function jsu_loaded(){
  // [Optional] Init jslog
  // jslog_init(JSLOG_LEV);
	if (isIE() || isFirefox()){
		// We can show Video also in Popup
		var select = getElementById2("videoOpt");
		select.disabled = false;
	}	
	manage_par_opt();
};


function onclickSortFeature(event){
	TipFixed (TIP_SORT_FEATURE,event);
}


