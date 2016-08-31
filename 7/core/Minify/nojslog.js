/* =========================================================================================
@File:     					nojslog.js
@Author:   					Federico Levis
@Since:  						Apr 2016   
Description: 				EMPTY API function for jslog: used only for demo, to exlude this feature
========================================================================================= */
function jslog_init(_,L){}function jslogLevSet(_){}function jslogGetLogLev(){return jslogVar.iLogLev}function jslogGetOpt(){return{iLogLev:jslogVar.iLogLev,bLogTime:jslogVar.bLogTime,szPathImg:jslogVar.szPathImg}}function jslogObj(_,L,o,n){return 0}function jslogJson(_,L,o){return 0}function jslogElapsedTime(_,L,o){return 0}function jslog(_,L){return 0}function jslog_end(){return 0}var JSLOG_ERR=0,JSLOG_INFO=1,JSLOG_DEBUG=2,JSLOG_TEST=4,JSLOG_DUMP=8,JSLOG_BASE=16,JSLOG_LEV_URL="URL",JSLOG_LEV_URL_PAR="jslog",JSLOG_ID_DEBUG="debug",JSLOG_DEF_LOG_TIME=!1,JSLOG_DEF_PATH_IMG="../../images"
"undefined"!=typeof JSU_PATH_IMG&&(JSLOG_DEF_PATH_IMG=JSU_PATH_IMG)
var JSLOG_FUN_START="-------------------- START",JSLOG_FUN_END="-------------------- END",JSLOG_FILE_START=" ============================= START",JSLOG_FILE_END=" ============================= END",jslogVar={iLogLev:0,bLogTime:JSLOG_DEF_LOG_TIME,szPathImg:JSLOG_DEF_PATH_IMG,console:null}
