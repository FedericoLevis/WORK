/* ============================================================================
 *             FROM util.js
 ============================================================================ */

/*-----------------------------------------------------------
Get Element By ID and Show Error if required
      PAR
Id        in
[bShowErr]  in   true (default) if I want to show Error
                false if don't want to show Error
      RETURN
el  if founded
0   if not founded
-----------------------------------------------------------*/
function getElementById2(Id,bShowErr)
{
	if (bShowErr == undefined){
		bShowErr = true;
	}
    var el = 	document.getElementById(Id);
    if (el == null) {
        if (bShowErr && SW_DEBUG_ENABLE){
        	// TODO some problem with IE Debugger
          alert("SW ERROR [util.js getElementById2] NOT FOUND Id=" +  Id) ;
        }
        return 0;  // Not Found
    }
    return el;
}



/*----------------------------------------------------------------------------------------------
Get the Value Selected in selectedIndex 
	PAR
Select	in
	RETURN
SelValue	  or "-1" if Nothing Selected  (SELECT_NOVALUE_SEL)
Es:     bValueAsString=true      "'MT'"
Es:     bValueAsString=true      ""     (ALL Item selected)
----------------------------------------------------------------------------------------------*/
function selectGetSelVal (Select){
  var szSelVal = "";
  
  if (!Select){
    return szSelVal;
  }
  var iSelInd = Select.selectedIndex;
  if (iSelInd < 0){
    return szSelVal;
  }
  return  Select.options[iSelInd].value;
} 


function sampleInit(){
	populate_jslogLev();
}

/**
* Populate jslogLev Select
*/
function populate_jslogLev(){
  var select = getElementById2("logLev");

  for (var i=0;i<31;i++){
    var Opt = new Option(i, i);
    select[i] = Opt;
    Opt.dv = i;
    if (i==15){
    	Opt.selected = true;
    }
  } 
}



/* ============================================================================
 *             SAMPLE_1
 ============================================================================ */

function sample1_jslogStart(){
  var iLogLev =   selectGetSelVal(getElementById2("logLev"));
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
	  height: 176,
	  info:{
  	  CV: "<a class='tipLinkJsLog' href='https://www.linkedin.com/in/federicolevis' target='_blank' >https://www.linkedin.com/in/federicolevis</a>",
  	  email: "<a class='tipLinkJsLog' href='mailto:federico.levis@virgilio.it' target='_blank' >federico.levis@virgilio.it</a>",
  	  JSU_Site: "<a class='tipLinkJsLog' href='https://www.linkedin.com/in/federicolevis' target='_blank' >https://www.linkedin.com/in/federicolevis</a>",
  	  COGNOS_Site: "<a class='tipLinkJsLog' href='http://federicolevis.wix.com/cognos' target='_blank' >http://federicolevis.wix.com/cognos</a>",
  	  PLSQL_Site: "<a class='tipLinkJsLog' href='https://github.com/FedericoLevis/PLSQLUtility' target='_blank' >https://github.com/FedericoLevis/PLSQLUtility</a>"
	  }
  }; 
  // Get bLogCompact Option selected by User
  var selectLogCompact = document.getElementById("logCompact");
  var bLogCompact =   (selectLogCompact.options[selectLogCompact.selectedIndex].value == "1");
  // Log Object author at Level JSLOG_TRACE=4 with bLogCompac Option
  jslogObj(JSLOG_TRACE,"Log at Level 2 of a JS Object -  author:", author,bLogCompact);
}



