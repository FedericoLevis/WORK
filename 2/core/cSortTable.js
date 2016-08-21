
/** @fileOverview
========================================================================================= <BR/> 
<b>File:</b> 			core/cSortTable.js <BR/>
<b>Author:</b>     		<a href="https://www.linkedin.com/in/federicolevis" target="_blank">Federico Levis</a> <BR/>
<b>SortTable Doc:</b>   <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/SortTable.html" target="_blank">JSU SortTable Documentation</a> <BR/>
<b>JSU API Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html" target="_blank">JSU API Documentation</a> <BR/>
<b>Description:</b>     SortTable Class <BR/>   
<b>REQUIRE:</b>          JSU: jsu.js   <BR/>
<b>First Version:</b>     ver 1.0 - Feb 2010  <BR/>
<b>Current Version:</b>   ver 3.3 - Jul 2016  <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>DISCLAIMER</b>  <BR/>
Copyright by Federico Levis - <a href="https://github.com/FedericoLevis/JSU" target="_blank">JSU</a> <BR/> 
This file may be freely distributed under the MIT license.   <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>JSDoc NOTES</b>  <BR/>
In "JSU Obfuscated Version"  JS Code is not visible with JSDoc Source Link  <BR/> 
========================================================================================= <BR/> 
*/


//---------------------------------------------------------------------------------------------
//       GLOBAL CONSTANT
//---------------------------------------------------------------------------------------------

/**
 * SORT_TYPE (Default=STRING)
 */ 
var SORT_TYPE = {
		NONE:'NONE',    // NO Sort for This column
		STRING:'STRING',    // Default (used when it is not indicate the SORT_TYPE	)
		NUMBER:'NUMBER',
		DATETIME:'DATETIME'  // can be used for Date, DateTime, Time. For Format see date.js
};

/**
 * SORT_DIR
 */
var SORT_DIR = {
		ASC: "-1",    // Ascending (Do not change because this valiue is used By Cognos)
		DESC: "1",
		NONE: "NONE"
};


// ---------------------- Default Opt
var SORT_DEF_COGNOS =  false;    
var SORT_DEF_COGNOS_GLOBAL_SORT_EN =  false;    
//----- NB: see date.js for possible formats
//Default Format for SortType=DATETIME if SortInfo is not defined
var SORT_DEF_FMT_DATETIME="MM/dd/yyyy HH:mm:ss";
var SORT_DEF_PATH_IMG = JSU_PATH_IMG;
var SORT_DEF_IND = 0;
var SORT_DEF_DIR = SORT_DIR.ASC; 
var SORT_DEF_APPLY = false;

/**
 * DEFAULT class that Identify FOOTER Rows for HTML using this class. It Can be passed a different class
 */
var SORT_TR_CLASS_FOOTER="footer";

 
/**
 * ONLY FOR COGNOS: CLASS that identify TR (IE) or TD (Chroome)
 */
var SORT_CLASS_FOOTER_COGNOS="summary";


var SORT_INFO_ABSENT = "";


// --------------------------------------------------FileName for Sort Icons.  The Base Path is configured in ext_conf.js
// Fast Local Sort
var   SORT_IMG_NONE_FAST = "fast_sort_none.jpg";
var   SORT_IMG_ASC_FAST = "fast_sort_asc.jpg";
var   SORT_IMG_DESC_FAST = "fast_sort_desc.jpg";
// Slow Global Sort
var   SORT_IMG_NONE_SLOW = "slow_sort_none.jpg";
var   SORT_IMG_ASC_SLOW = "slow_sort_asc.jpg";
var   SORT_IMG_DESC_SLOW = "slow_sort_desc.jpg";
//Disable Sort
var   SORT_IMG_NONE_DIS = "disabled_sort_none.jpg";
var   SORT_IMG_ASC_DIS = "disabled_sort_asc.jpg";
var   SORT_IMG_DESC_DIS = "disabled_sort_desc.jpg";
//wait 
var   SORT_IMG_WAIT = "wait.jpg";





//---------------------------------------------------------------------------------------------
//  Internal CONSTANT 
//---------------------------------------------------------------------------------------------
var SORT_ATTR_SORT_DIR = "SortDirCur";
var SORT_TMO_WAIT_MS = 50;


//---------------------------------------------------------------------------------------------
//				SORT GLOBAL VAR
//---------------------------------------------------------------------------------------------

// the current SortTableEl because the sort function does not work properly
var cSortTableElCur = null;


//-------------------------

//
var SORT_CLASSNAME = "sortimg";



//**************************************************************************
//GLOBAL CONSTRUCTOR (N.B. at the Top of the file)
//**************************************************************************

/**
 @class cSortTable 
  
  @param	{string} szElId      Id of the HTML TABLE to sort - If bCognos=true szElId=spanId that enclose the Cognos List to Sort 
	@param	{array} arSortCol  Array with the SortCol (See Example below)
	@param objOpt {Object}   Options: <ul>
					<li>iRowHeader {Number}  Default =1   Number [1,2,..] of Row Header </li>
					<li>iRowSortHeader {Number}  Default =1   Number [1,2,..] of the Row where we have to put the Sort Icon. e.g 2 if we have 2 row header and we want to put icon in the second row</li>
					   NOTE: you can also define only one of previous. if you set only iRowHeader=2 also iRowSortHeader will be 2 </li>
					   you can define both for particular cases (e.g iRowHeader=2 iRowSortHeader=1 for Filter presence) </li> 
					<li>szSortCol	{String}		Current Sort Col to be set.	<BR/> 
																Default. Par is absent and First Col is Set, without applying the Sort (we suppose Table already Sorted) <BR/>
																To init without any SortCol, pass szSortCol = ""
																<ul>
																	<li> a) bCognos=false: First Col is Set  </li>
																	<li> b) bCognos=true: Current Col is taken by selectSortCol </li>
																</ul>
															</li>		
					<li>szSortDir	{String}		Current SortDir: SORT_DIR.ASC, SORT_DIR.DESC, SORT_DIR.NONE . <BR/>
																Default: par is absent and we use: <ul>
																	<li>a) bCognos=false: SORT_DIR.ASC </li>
																	<li> b) bCognos=true: Current Dir is taken by selectSortDir </li>
															</ul>
														</li>			
					<li>bSortApply {Boolean}	Default=false If true apply the current SortCol/ SortDir 											 </li>
	  			<li>szFmtDatetime (String}  Fmt to be used for Datetime if the Info is passed for the DATETIME Columns into szSortCol .fmt parameter	 </li>
	  			<li>szPathImg {String}   	BaseSortPath (e.g	"../../../images") to be used instead  of the default image Path </li>
	  			<li>iTblRowPerPage {Number}   If present is the limit of Rows displayed in the Table. For Cognos is the Setting of the List properties RowPerPage <BR/>
	  																When not present (default), we consider all the Table always displayed </li>
	  			<li>szClassFooter {String}    class that identity the TR and/OR TD Footer rows					 </li>
	  			<li>bNoStartupSortIco {Boolean} [false] true to avoid setting a default ico sort at startup (in the First col)
					<li>bCognos				{Boolean}     default=false . true for Cognos  Sort: in this case szElId identifies the span in front of the Table </li>
					<li>bCognosGlobalSort {Boolean} Default=false. Only for bCognos=true <BR/>
																			When The Table is displayed and More than one Page is present we cannot make Local Sort: <ul>
																			  <li> a) bCognosGlobalSort=false  LocalSort is Disable (Gray icons) </li>
																			  <li> b) bCognosGlobalSort=false  If Click in Icon we re-execute the Report and mnake Global Sort (it can be Slow) </li>
																		<ul>
																	</li>		  


	@example
 
  // First 3 colums have default type: SORT_TYPE.STRING that is set when .type is not present 
	var arSortCol = [  {col: 'Country'},   
					{col: 'Last Name'},        
					{col: 'Email'}, 
	        {col:'Payment', type: SORT_TYPE.DATETIME, fmt: 'yyyy/MM/dd HH:mm'}, 
	        {col: 'Amount', type: SORT_TYPE.NUMBER, groupSep:',', decimalSep:'.'}] 
	  ]; 
	var LIST_ROWS_PER_PAGE=1000; // RowPerPage properties: till 1000 Rec we can make FastSort 
 
	// Cognos Table with 1000 RowsPerPage. Enable GlobalSort if the Table has More than 1000 Rec 
	var cSortTbl1 = new cSortTable("tblSort",arSortCol,{bCognos=true,bCognosGlobalSort=true,iTblRowPerPage=LIST_ROWS_PER_PAGE); 
	
*/
cSortTable = function (szElId, arSortCol,objOpt) {
	var Fn = "[cSortTable] ";
	  
	jslog(JSLOG_INFO,Fn + JSLOG_FILE_START);
	// Init Global Var
	this.iTblRowPerPage = 0;
	this.iRowSortHeader = 1; // Default. position [1..] of Sort in Header
	this.iRowHeader = 1; // Default. 1 row for Header
	this.bCognos = SORT_DEF_COGNOS;
	this.bCognosGlobalSort=SORT_DEF_COGNOS_GLOBAL_SORT_EN;
	this.bSortEn = true;
	this.szFmtDatetime = SORT_DEF_FMT_DATETIME;
	this.szPathImg = SORT_DEF_PATH_IMG;
	this.szClassFooter =  SORT_TR_CLASS_FOOTER;
	this.szSortHiddenId = "";
	// Path of Sort Img
	this.szSortPathNone= ""; 	this.szSortPathAsc=""; this.szSortPathDesc="", this.szSortPathWait= "";
	this.bMultiPage = false; // default
	this.imgTemp = document.createElement("img");
	this.arSortImg = new Array(); // Array of SortImg
	this.tempTextSep = document.createTextNode(" ");
	this.szSortDecSep = ""; this.szSortDecSepLocale = "";
	this.szSortGroupSepLocale = localeGetGroupSep();	
	this.szSortDecSepLocale = localeGetDecimalSep();
	jslog(JSLOG_TEST,Fn + "this.szSortDecSepLocale= " + this.szSortDecSepLocale + "  this.szSortGroupSepLocale = " + this.szSortGroupSepLocale); 
	this.iSortColInd=SORT_DEF_IND;   // index corrent sort
	this.szSortDir=SORT_DEF_DIR;  // Default
	this.szSortCol=""; // Default
	this.bNoStartupSortIco = false;
	
	if (arSortCol.length > 0){
		this.szSortCol=   (arSortCol[0].col != undefined) ? arSortCol[0].col : "" ;    
	} 
	// [OPTIONAL, not used by HTML; DOM Object of Cognos BOX with select with Current SelCol and ColDir
	this.selectSortCol=0; this.selectSortDir=0; this.inputSortCol=0; this.inputSortDir=0; this.inputSortHiddenCol=0;
	this.imgSortCur=null; // Current Sort Image
	this.szSortHintAsc=""; this.szSortHintDesc="";
	this.iTblFooterRec=0;  // Number of Footer Rows
	jslog(JSLOG_DEBUG,Fn + "IN szElId=" + szElId );
	jslogObj(JSLOG_DEBUG,Fn + "IN arSortCol:",arSortCol,true);
	// Options
	
	if (objOpt != undefined){
		jslogObj(JSLOG_DEBUG,Fn + "objOpt", objOpt);
		// Only if objOpt.szSortCol="" we set false
		
		if (objOpt.iRowHeader != undefined){
			this.iRowHeader = objOpt.iRowHeader; 
			jslog(JSLOG_DEBUG,Fn + "OPTION: iRowHeader=" + this.iRowHeader);
			if (objOpt.iRowSortHeader == undefined){
				objOpt.iRowSortHeader = objOpt.iRowHeader; 
			} 
		} 
		if (objOpt.iRowSortHeader != undefined){
			this.iRowSortHeader = objOpt.iRowSortHeader; 
			jslog(JSLOG_DEBUG,Fn + "OPTION: iRowSortHeader=" + this.iRowSortHeader);
			if (objOpt.iRowHeader == undefined){
				objOpt.iRowHeader = objOpt.iRowSortHeader;
				this.iRowHeader = objOpt.iRowHeader; 
			} 
		} 
		if (objOpt.iTblRowPerPage != undefined){
			this.iTblRowPerPage = objOpt.iTblRowPerPage; 
			jslog(JSLOG_DEBUG,Fn + "OPTION: iTblRowPerPage=" + this.iTblRowPerPage );
		} 
		if (objOpt.bCognos != undefined){
			this.bCognos=objOpt.bCognos;
			jslog(JSLOG_DEBUG,Fn + "OPTION: bCognos=" + this.bCognos);
		}	
		if (objOpt.bCognosGlobalSort != undefined){
			this.bCognosGlobalSort=objOpt.bCognosGlobalSort;
			jslog(JSLOG_DEBUG,Fn + "OPTION: bCognosGlobalSort=" + this.bCognosGlobalSort);
		}	
		if (objOpt.szFmtDatetime != undefined){
			this.szFmtDatetime=objOpt.szFmtDatetime;
			jslog(JSLOG_DEBUG,Fn + "OPTION: szFmtDatetime=" + this.szFmtDatetime);
		}	
		if (objOpt.szPathImg != undefined){
			this.szPathImg=objOpt.szPathImg;
			jslog(JSLOG_DEBUG,Fn + "OPTION: szPathImg=" + this.szPathImg);
		}	
		if (objOpt.szClassFooter != undefined){
			this.szClassFooter=objOpt.szClassFooter;
			jslog(JSLOG_DEBUG,Fn + "OPTION: szClassFooter=" + this.szClassFooter);
		}	
		if (objOpt.bNoStartupSortIco != undefined){
			this.bNoStartupSortIco=objOpt.bNoStartupSortIco;
			jslog(JSLOG_DEBUG,Fn + "OPTION: bNoStartupSortIco=" + this.bNoStartupSortIco);
		}	
		
	}
	this.tmoSortApply=null;
	if (this.bCognos){
		this.szClassFooter = SORT_CLASS_FOOTER_COGNOS;
		jslog(JSLOG_DEBUG,Fn + "For COGNOS ALWAYS szClassFooter=" + this.szClassFooter);
	}	
	
	// ------- HTML or COGNOS?
	if (this.bCognos){
		// For COGMOS it is a SPAN containing the TABLE
		this.tblSort = getElementByTag2("TABLE","tblSort",false);
	}else {
		// For HTML the Id is the Id of the Table
		this.tblSort = getElementById2(szElId,true);
	}
	if (this.tblSort == 0){
		return;
	}
	var iTblRecNum = 0;  // Count the number of Records (Skip First row=header  Footer with class="summary")
	this.iTblFooterRec = 0;
	if (this.tblSort!= undefined && this.tblSort.rows != undefined){
		// skip Header Rows
		for (var i=this.iRowSortHeader; i < this.tblSort.rows.length ; i++){
			var szType = 	this.tblSort.rows[i].firstChild.type; // for Cognos it set into TD
			// Particular case for Chrome: I have to find type="summary" into outerHTML 
			var bOuterHTMLSummary = false;
			var szOuterHTML = this.tblSort.rows[i].firstChild.outerHTML;
			var iPosTypeSummary = -1;
			if (szOuterHTML != undefined){
				iPosTypeSummary =  szOuterHTML.indexOf('type="'  + this.szClassFooter  +  '"');
				if (iPosTypeSummary >= 0){
					bOuterHTMLSummary = true;
				}
			}
			var szClassName = 	this.tblSort.rows[i].className; // For HTML
			// jslog (JSLOG_TEST,"ROW [" + i + "] szType=" + szType + " szClassName=" + szClassName + "   iPosTypeSummary=" + iPosTypeSummary + " bOuterHTMLSummary=" + bOuterHTMLSummary);
			if (this.bCognos){
				szClassName = szType;
			}	
			var bFooter =   (bOuterHTMLSummary ||  (szClassName != undefined &&  szClassName.indexOf(this.szClassFooter) >=0));
			// jslog (JSLOG_TEST,"szClassName=" + szClassName +   " bOuterHTMLSummary=" + bOuterHTMLSummary + "  szClassFooter=" +  this.szClassFooter + " --> bFooter=" + bFooter);
			if (szType != "columnTitle" && !bFooter){
				iTblRecNum++;
			}
			if (bFooter){
				jslog(JSLOG_TEST,"Rec [" + i + "]  IS FOOTER" );
				if (this.bCognos){
					// Set also className to have the same sort algorith and identify footer by classname
					this.tblSort.rows[i].className = this.szClassFooter;  
				}
				this.iTblFooterRec++;
			}
		}
		jslog(JSLOG_TEST,Fn + "TABLE iTblRecNum=" + iTblRecNum + " - iRowHeader=" + this.iRowHeader + " iRowSortHeader=" + this.iRowSortHeader + "  iTblFooterRec=" + this.iTblFooterRec + "  (rows=" + this.tblSort.rows.length +  ")");
		// For Cognos: check if MultiPage
		if (this.bCognos){
			// bMultiPage true: if we find the Link for Top Down (isMultiPage), or if there are more row that the one of the List
			this.bMultiPage =  ((this.iTblRowPerPage != 0) &&  (iTblRecNum >= this.iTblRowPerPage)) || isMultiPage(); 
		}
		
		jslog(JSLOG_TEST,Fn + "this.bMultiPage=" + this.bMultiPage);
	}
	this.iTblRecNum = iTblRecNum;
	var szSortHintRecNum="";
	if (this.bMultiPage){
		this.szSortPathNone= this.szPathImg +   ((this.bCognosGlobalSort) ?  SORT_IMG_NONE_SLOW :  SORT_IMG_NONE_DIS);
		this.szSortPathAsc= this.szPathImg + ((this.bCognosGlobalSort) ?  SORT_IMG_ASC_SLOW :  SORT_IMG_ASC_DIS);
		this.szSortPathDesc= this.szPathImg + ((this.bCognosGlobalSort) ?  SORT_IMG_DESC_SLOW :  SORT_IMG_DESC_DIS);
		szSortHintRecNum = SORT_HINT_REC_NUM_PART.replace("XXX",iTblRecNum);
		if (this.bCognosGlobalSort){
			this.szSortHintAsc = SORT_HINT_GLOBAL_ASC + "\n\n" + szSortHintRecNum;
			this.szSortHintDesc = SORT_HINT_GLOBAL_DESC + "\n\n" + szSortHintRecNum;
		}else{
			this.szSortHintAsc = SORT_HINT_DISABLED + "\n\n" + szSortHintRecNum;
			this.szSortHintDesc = this.szSortHintAsc;

		}
	}else{
		this.szSortPathNone= this.szPathImg +   SORT_IMG_NONE_FAST;
		this.szSortPathAsc= this.szPathImg + SORT_IMG_ASC_FAST;
		this.szSortPathDesc= this.szPathImg + SORT_IMG_DESC_FAST;
		szSortHintRecNum = SORT_HINT_REC_NUM_ALL.replace("XXX",iTblRecNum);
		this.szSortHintAsc = SORT_HINT_ASC + "\n\n" + szSortHintRecNum;
		this.szSortHintDesc = SORT_HINT_DESC + "\n\n" + szSortHintRecNum;
	}
	this.szSortPathWait=  this.szPathImg +   SORT_IMG_WAIT;
	jslog(JSLOG_TEST,Fn + "this.szSortPathNone=" + this.szSortPathNone + " this.szSortPathAsc=" + this.szSortPathAsc + " this.szSortPathDesc=" + this.szSortPathDesc); 
	if (this.bCognos){
		jslog(JSLOG_TEST,Fn + "Get select of SORT BOX Otions (e.g for Cognos)"); 
		var fW = getFW(); // get Form Warp
		this.selectSortCol = fW._oLstChoices_SelectSortCol;
		this.selectSortCol._cSortTableEl  = this; // To be used in Event
		this.selectSortCol.onchange = this.onchangeSortCol;
		this.selectSortDir = fW._oLstChoices_SelectSortDir;  
		this.selectSortDir._cSortTableEl  = this; // To be used in Event
		this.selectSortDir.onchange = this.onchangeSortDir;
		selectRemoveExtraItems(this.selectSortDir);   // Remove first 2 Extra Cogns Items
		this.inputSortCol = fW._textEditBox_SortCol;
		this.inputSortDir = fW._textEditBox_SortDir;
		this.inputSortHiddenCol = fW._textEditBox_SortHiddenCol;
	}
	//------------------------------------------
	jslog(JSLOG_TEST,Fn + "populate this.arcSortItem"); 
  //all the sortItem info
	this.arcSortItem = new Array();
  var iSortNum=0;
  if (this.selectSortCol){
    selectRemoveAll (this.selectSortCol);
  }
  // Set default value when not present
  for (var iAr=0; iAr < arSortCol.length; iAr++) {
  	if (arSortCol[iAr].col == undefined){
  		arSortCol[iAr].col = (iAr+1);  // if objSortCol.col is undefined we set [1,2,....] 
  	}
  	if (arSortCol[iAr].type == undefined){
  		arSortCol[iAr].type = SORT_TYPE.STRING; 
  	}	
    if (this.selectSortCol){
    	appendOptionLast (this.selectSortCol,arSortCol[iAr].col,arSortCol[iAr].col);
    }	
  	iSortNum ++;
  }
  this.arSortCol = arSortCol;
  //jslogObj(JSLOG_TEST,"this.arSortCol", this.arSortCol);
	//-------------------------------------------
	if (this.inputSortHiddenCol){
		var szSortHidden = this.inputSortHiddenCol.value; // E.G  "Country,PLMN"
		jslog(JSLOG_TEST,"szSortHidden = " + szSortHidden);
		if (szSortHidden.length){
			var ArColHidden = szSortHidden.split(",");
			this.sorttableSetHiddenCol(ArColHidden); 
		}
	}  
	//------------------------------------
	if (this.selectSortCol){
		jslog(JSLOG_TEST, "Align Current Sort Selection to Visible Fields");
		selectSelValue(this.selectSortCol,this.inputSortCol.value);
		selectSelValue(this.selectSortDir,this.inputSortDir.value);
		jslog(JSLOG_TEST, "Init Global Val form Cognos Hidden Fields");
		this.iSortColInd =  this.selectSortCol.selectedIndex ;
	  this.szSortDir = this.inputSortDir.value;
	  this.szSortCol = this.inputSortCol.value;
	}  
	if (this.tblSort){
		this.sortInit();
	}
	// If required by objOpt, set Initial Sort
	if (objOpt != undefined){
		if (objOpt.szSortCol || objOpt.szSortDir){
			var bSortApply = (objOpt.bSortApply != undefined && objOpt.bSortApply); 
			jslog (JSLOG_DEBUG,Fn + "Obtional Initial Sort is SET: SortCol=" + objOpt.szSortCol + 
					   " szSortDir=" + objOpt.szSortDir + " bSortApply=" + bSortApply);
		  this.setSort (objOpt.szSortCol,objOpt.szSortDir,bSortApply);
		}
	}	
	
	if (this.bMultiPage && !this.bCognosGlobalSort){
		this.sorttableDisableSort();
	}
	jslog(JSLOG_INFO,Fn + JSLOG_FILE_END);
};


/*****************************************************************************************************
******************************************************************************************************
					GLOBAL FUNCTIONS
******************************************************************************************************
*****************************************************************************************************/


/* 
Set SortCol and SortDir and Apply It
@param szSortCol {string} 
@param szSortDir {string} in SORT_DIR.ASC or SORT_DIR.DESC
@param [bResortTable] {Boolean} in Default=true    if true the Sort is Resort basing on szSortCol/SzSortDir
 																									 if false the Sort is only aplied to the SortIcon. 
 																									 Pass bResortTable=false if the Table is already sorted by szSortCol/SzSortDir  	
 */
cSortTable.prototype.setSort = function (szSortCol, szSortDir,bResortTable) {
  var Fn = "[cSortTable.setSort] ";
	jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
	if (bResortTable == undefined || bResortTable == null){
		bResortTable = true; // Deafault
	}
	jslog(JSLOG_TEST,Fn + "IN szSortCol=" + szSortCol + " szSortDir=" + szSortDir + " (" + SORT_DIR.ASC + "=ASC  " + SORT_DIR.DESC + "=DESC )  bResortTable=" + bResortTable);
	var iSortColInd = this.iSortColInd; // Default
	if (szSortCol != undefined){
	  var iSortColInd = this.getSortIndFromSortCol(szSortCol);
	  if (iSortColInd <0){
	  	return; // ERROR
	  }
	}
	jslog(JSLOG_TEST,Fn + "iSortColInd=" + iSortColInd);
  // Get SortImg and 
  var SortImg = this.arSortImg[iSortColInd];
  if (bResortTable){
	  // simulate The state to Obtain with resortTable the desired new state
	  var szSortDirTmp= (szSortDir == SORT_DIR.ASC) ? SORT_DIR.DESC : SORT_DIR.ASC;
	  jslog (JSLOG_TEST,"simulate having for iSortColInd=" + iSortColInd + " The szSortDirTmp=" + szSortDirTmp + 
	  		"to Obtain with resortTable the desired new szSortDir=" + szSortDir);
	  SortImg.setAttribute(SORT_ATTR_SORT_DIR,szSortDirTmp);
	  this.resortTable (SortImg);
  }else {
  	// only Update the Sort Icon
	  var td = SortImg.parentNode;
	  var iNewSortCol = td.cellIndex;  // current Column  [0,1...]
	  if (iNewSortCol != this.iSortColInd  && this.imgSortCur != 0){
	    jslog(JSLOG_TEST,"Changed Sort column from " + this.iSortColInd + " to "  + iNewSortCol + "   --> Reset Previous Img");
	    this.imgSortCur.setAttribute(SORT_ATTR_SORT_DIR,SORT_DIR.NONE);
	    this.imgSortCur.setAttribute("title",this.szSortHintDesc);  // like it is Desc because clicking it will be ASC 
	    this.imgSortCur.setAttribute("src",this.szSortPathNone);
	  }
	  this.iSortColInd = iNewSortCol;   // Set Global Var with current Sort Col Ind
	  this.szSortCol = this.arSortCol[this.iSortColInd].col; 
	  jslog(JSLOG_TEST,"SET iSortColInd = " + this.iSortColInd + "  szSortCol=" + this.szSortCol);
	  this.imgSortCur = SortImg;
	  // Set also New this.szSortDir
	  SortImg.setAttribute(SORT_ATTR_SORT_DIR,szSortDir);
    this.szSortDir = szSortDir;
    if (szSortDir == SORT_DIR.ASC){
	    SortImg.setAttribute("title",this.szSortHintAsc); 
	    SortImg.setAttribute("src",this.szSortPathAsc);
    }else{
	    SortImg.setAttribute("title",this.szSortHintDesc); 
	    SortImg.setAttribute("src",this.szSortPathDesc);
    }
	  
  }  
	jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);
};


/**
 FOR COGNOS: Exclude some cols form sorttable management (e.g. becuase they are  hidden)
@param ArColId  [Array] with some ColId e.g ['Country','PLMN']
      GLOBAL
this.inputSortHiddenCol in/out (set value)
this.szSortHiddenId    out  e.g "Carrier,PLMN"
this.arSortCol
 */
cSortTable.prototype.sorttableSetHiddenCol= function (ArColId) {
  var Fn = "[cSortTable.sorttableSetHiddenCol] ";
  jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
  arTrace(JSLOG_TEST,ArColId,Fn + "ArColId");  
  var iSelInd = this.selectSortCol.selectedIndex;
  jslog(JSLOG_TEST,Fn + "this.selectSortCol iSelInd=" + iSelInd);
  if (iSelInd < 0){
	  jslog(JSLOG_TEST,Fn + "return (iSelInd <0)");
    return;
  }
  // Prepare
  jslog(JSLOG_TEST,Fn + "Prepare this.szSortHiddenId with the ColId to Hide");
  var szSortIdCur = this.selectSortCol[iSelInd].value;  // Current SortId
  jslog(JSLOG_TEST,Fn + "szSortIdCur=" + szSortIdCur);
  var bSortCurHidden = false ; // true if szSortIdCur has been Hidde
  var iSize= ArColId.length;
  this.szSortHiddenId =  "";
  for(var i=0;i < iSize;i++) {
    this.szSortHiddenId += ArColId[i];
    this.szSortHiddenId += ",";
	  if (ArColId[i] == szSortIdCur){
	    bSortCurHidden = true; // True if the curent Sort is Hidden
	  }
  }
  // e.g. this.szSortHiddenId =IC,COUNTRY,IC_NODE_TYPE,GATEWAY_NODE,GATEWAY_NODE_TYPE,DEST_REGION,TRUNK,
  
  jslog(JSLOG_TEST,Fn + "this.szSortHiddenId =" + this.szSortHiddenId);
  // Populate this.selectSortCol with only the Visible Items
  selectRemoveAllOption(this.selectSortCol);
  
  for (var i=0; i< this.arSortCol.length; i++){
  	var objSortCol = this.arSortCol[i];
    var szId = objSortCol.col;
    var szCol = szId;
    // is it in the Hidden Cols? (N.B append "," at the end to avoid problem ID containing other id (e.g IC IC_NODE) 
    var bVisible = (this.szSortHiddenId.indexOf(szId + ",") == -1);
    // jslog(JSLOG_TEST,Fn + "szId =" + szId + "  szCol=" + szCol + "   bVisible=" + bVisible);
	  if (bVisible){
	    // szId is not in the Hidden Ones --> I add it
      appendOptionSelLast(this.selectSortCol,szCol,szId,(szId == szSortIdCur));
	  }  
  }
  this.inputSortHiddenCol.value  = this.szSortHiddenId;
  // if current SortCol is in the szColsExcluded reset to default Sort (FirstCol Ascending)
  if (bSortCurHidden){
    jslog(JSLOG_TEST,Fn + "Previous SortCol Has been Hidden --> Set DefaultSort (First Col Asc)");
    this.selectSortCol.selectedIndex = 0;
	  this.selectSortDir.selectedIndex = 0;
  }
  
  jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);
};




/**
 * @returns   Current SortCol label
 */
cSortTable.prototype.getSortCol= function () {
	return   this.szSortCol;
};


/**
 * @returns   Current SortDir SORT_DIR.ASC,...
 */
cSortTable.prototype.getSortDir= function () {
	return  this.szSortDir;
};


/**
 * @returns   Current SortDirLabel (Only For Cognos) 
 */
cSortTable.prototype.getSortDirLabel= function () {
	if (this.selectSortDir){
		return selectGetSelText(this.selectSortDir);
	}else{
		return  this.szSortDir;
	}
};







//**************************************************************************
//**************************************************************************
//LOCAL FUNCTIONS  (N.B prototype and using this)
//**************************************************************************
//**************************************************************************

/*-----------------------------------------------------------
 Init Sort 
 -- Create sort icons and set them ASC/DESC/NONE  basing on this. variables
------------------------------------------------------------*/
cSortTable.prototype.sortInit = function () {
	var Fn = "[cSortTable.sortInit] ";
	jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
	jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
	var szId="", szCol="", szType="";
	
	if (this.tblSort == 0){
	  return jslog(JSLOG_TEST,Fn + "Nothing to DO: there is NOT Table to Sort in this Page",JSLOG_FUN_START);
	}
	jslog(JSLOG_TEST,"CURRENT SORT: iSortColInd=" + this.iSortColInd +  "  szSortColCur=" + this.szSortCol + "  szSortDirCur=" + this.szSortDir);
	// this.tblSort.rows = object with all the rows of the this.tblSort. The first row is Header
	if (this.tblSort.rows && this.tblSort.rows.length >= this.iRowSortHeader) {
	   var sortRow = this.tblSort.rows[this.iRowSortHeader-1];
	}
	if (!sortRow) {
	  jslog(JSLOG_TEST,Fn + "Table without Rows to Sort. iRowSortHeader=" + this.iRowSortHeader + "  NumRow=" + this.tblSort.rows.length);
	  return;
	}
	//---------  manage click on Header when the cell is selected
	var iColVis = sortRow.childNodes.length;
	var numColHidden = 0;
	if (this.inputSortHiddenCol){
	  //when number of visible column > number of sort column 
	  var szSortHidden = this.inputSortHiddenCol.value; 
	  var ArColHidden = szSortHidden.split(",");
	  for(var y = 0; y < ArColHidden.length; y++){
		  if(ArColHidden[y]!= "" && ArColHidden[y]!= null)numColHidden++;
	  }
	  jslog(JSLOG_TEST,Fn +  "numColHidden="+numColHidden);
	}
	
	// Only Visible Columns will be sorted. sort ar could contains more elements (in some reports I could remove elements after)
	var iSortColNum = this.arSortCol.length;
	var iColSort = (iColVis < iSortColNum) ? iColVis : (iSortColNum - numColHidden);
	jslog(JSLOG_TEST,Fn +  "iColVis="+iColVis + "  iSortColNum=" + iSortColNum +   "  ---> iColSort="+iColSort);
	
	jslog(JSLOG_TEST,Fn + " Prepare icons (arSortImg), events and set Current Sort");
	for (var i=0;i<iColSort;i++) {
		var CurCell = sortRow.cells[i];
		// var txt = ts_getInnerText(CurCell);
		var TextSep = this.tempTextSep.cloneNode(false);
		//
		var SortImg = this.imgTemp.cloneNode(false);
		//
		SortImg.className = SORT_CLASSNAME;  
		SortImg._cSortTableEl  = this; // To be used in Event
		SortImg.onclick = this.onclickSortImg;
		var CurDir=this.szSortDir;
		var CurHint=this.szSortHintDesc;  // LIke it is Desc, because clicking it will become Asc   
		var CurImgPath=this.szSortPathNone;
		if (i == this.iSortColInd && !this.bNoStartupSortIco)
		{
			this.imgSortCur = SortImg;  // Global Var
			// Current Sort Column
			if (this.szSortDir == SORT_DIR.ASC){
				CurImgPath=this.szSortPathAsc;
				CurHint=this.szSortHintAsc;
			} 
			else{
				CurImgPath=this.szSortPathDesc;
				CurHint=this.szSortHintDesc;
			} 
		}  
		else {
			CurDir=SORT_DIR.NONE;
		}
		this.bNoStartupSortIco = false; // only at startup we want this flag
		SortImg.setAttribute(SORT_ATTR_SORT_DIR, CurDir);
		SortImg.setAttribute("src", CurImgPath);
		SortImg.setAttribute("title", CurHint);
		if (this.arSortCol[i].type != SORT_TYPE.NONE){
			jslog(JSLOG_TEST,Fn + "ADD to Col  [" + i + "] the SORT IMG - Attribute (" + SORT_ATTR_SORT_DIR + ") = " + CurDir );
			CurCell.appendChild(TextSep);
			CurCell.appendChild(SortImg);
		}	
		// Save SortImg in Global Array
		this.arSortImg[i] = SortImg;
	}
	jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);
};


/*-----------------------------------------------------------
Disable SortImages (for example when the layout of Sort has changed due to filter selection)
------------------------------------------------------------*/
cSortTable.prototype.sorttableDisableSort = function () {
  var Fn = "[cSortTable.sorttableDisableSort] ";
  jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
  if (this.tblSort == 0){
    jslog(JSLOG_TEST,Fn + "tblSort NOT VISIBLE" + JSLOG_FUN_END);
    return;
  }
  
  var ImgList = this.tblSort.getElementsByTagName("IMG");

  if (ImgList == null  || !ImgList.length) {
      jslog(JSLOG_TEST,Fn + "ImgList is Empty. Nothing to do"+ JSLOG_FUN_END);
      return;
  }
  this.bSortEn =false;  
  for(var i=0; i<ImgList.length; i++) {
  	var ImgEl = ImgList[i];
    jslog(JSLOG_TEST,Fn + "className=" + ImgEl.className);
  	if (ImgEl.className == SORT_CLASSNAME){
      jslog(JSLOG_TEST,Fn + "Disable ImgEl[" + i +"]");
      // NOTE we prefer to mantain it enabled and show the message SORT_HINT_DISABLED when someone click 
    	// ImgEl.disabled = true; 
      // (this.szSortHintAsc and this.szSortHintDesc are the same in this case)
    	ImgEl.setAttribute("title", this.szSortHintAsc);
  	}
  }

  jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);
};




/* -----------------------------------------------------
NB: we have to use global var cSortTableElCur, this does not work here 
@param a  row
@param b  row
 			GLOBAL
cSortTableElCur 			
----------------------------------------------------- */
cSortTable.prototype.ts_sort_numeric = function (a,b) {
    var Fn = "[cSortTable.ts_sort_numeric] ";
    var iSortColInd = cSortTableElCur.iSortColInd;

 	 var aCellEl = a.cells[iSortColInd];
	 var bCellEl = b.cells[iSortColInd];
	 // For FOOTER case
	  if (bCellEl == undefined || aCellEl== undefined){
	  	if (cSortTableElCur.szSortDirCur == SORT_DIR.ASC){
	    	return 1;
	  	}else {
	  		return -1;
	  	}
	  } 
	  
    aNumStr = ts_getInnerText(aCellEl);
    bNumStr = ts_getInnerText(bCellEl);
    
  //jslog (JSLOG_TEST, Fn + " aNumStr=" + aNumStr + " bNumStr="+ bNumStr);
	// Particular Cases to manage aNumStr and bNumStr=0
	if (aNumStr.length == 0){
    // jslog(JSLOG_TEST,Fn + " aNumStr=" + aNumStr + "  bNumStr=" + bNumStr + " ---> return -1");
	  return -1;
	}
	if (bNumStr.length == 0){
    // jslog(JSLOG_TEST,Fn + " aNumStr=" + aNumStr + "  bNumStr=" + bNumStr + " ---> return 1");
	  return 1;
	}

  aNum = str2Num(aNumStr,cSortTableElCur.szSortGroupSep,cSortTableElCur.szSortDecSep);
  bNum = str2Num(bNumStr,cSortTableElCur.szSortGroupSep,cSortTableElCur.szSortDecSep);

	var iRet = 0;
	iRet = aNum-bNum;
  // jslog(JSLOG_TEST,Fn + " aNumStr=" + aNumStr + " aNum=" + aNum +  "  bNumStr=" + bNumStr + " bNum=" + bNum + " ---> return " + iRet);
  return iRet;
};


/* -----------------------------------------------------
sort for DATETIME
NB: we have to use global var cSortTableElCur, this does not work here 
@param a  row
@param b  row
 			GLOBAL
cSortTableElCur 			
----------------------------------------------------- */
cSortTable.prototype.ts_sort_datetime = function (a,b) {
  var Fn = "[cSortTable.ts_sort_datetime] ";
  // jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
  
  var iSortColInd = cSortTableElCur.iSortColInd;
	var aCellEl = a.cells[iSortColInd];
	var bCellEl = b.cells[iSortColInd];
	// For FOOTER case
	if (bCellEl == undefined || aCellEl== undefined){
	  	if (this.szSortDir == SORT_DIR.ASC){
	    	return 1;
	  	}else {
	  		return -1;
	  	}
	} 
  
  var DateTxt1 = ts_getInnerText(aCellEl);
  var DateTxt2 = ts_getInnerText(bCellEl);
  // jslog(JSLOG_TEST,Fn + " DateTxt1=" + DateTxt1 + "   DateTxt2=" + DateTxt2);
  // Convert To date
  var iTime1 = getTimeFromFormat(DateTxt1,cSortTableElCur.szFmtDatetime);
  var iTime2 = getTimeFromFormat(DateTxt2,cSortTableElCur.szFmtDatetime);
  // jslog(JSLOG_TEST,Fn + " DateTxt1=" + DateTxt1 + " (" + iTime1 +  ")    DateTxt2=" + DateTxt2 + " (" + iTime2 + ")");
  
  if (iTime1==iTime2) return 0;
  if (iTime1<iTime2) return -1;
  return 1;
};


/* -----------------------------------------------------
sort for CURRENCY
NB: we have to use global var cSortTableElCur, this does not work here 
@param a  row
@param b  row
 			GLOBAL
cSortTableElCur 			
----------------------------------------------------- */

cSortTable.prototype.ts_sort_currency = function (a,b) {
  var iSortColInd = cSortTableElCur.iSortColInd;
	 var aCellEl = a.cells[iSortColInd];
	 var bCellEl = b.cells[iSortColInd];
	 // For FOOTER case
	  if (bCellEl == undefined || aCellEl== undefined){
	  	if (this.szSortDir == SORT_DIR.ASC){
	    	return 1;
	  	}else {
	  		return -1;
	  	}
	  } 
    aa = ts_getInnerText(aCellEl).replace(/[^0-9.]/g,'');
    bb = ts_getInnerText(bCellEl).replace(/[^0-9.]/g,'');
    return parseFloat(aa) - parseFloat(bb);
};


/* -----------------------------------------------------
sort for STRING
NB: we have to use global var cSortTableElCur, this does not work here 
@param a  row
@param b  row
 			GLOBAL
cSortTableElCur 			
----------------------------------------------------- */
cSortTable.prototype.ts_sort_caseinsensitive = function (a,b) {
	var Fn = "[cSortTable.ts_sort_caseinsensitive] ";
  var iSortColInd = cSortTableElCur.iSortColInd;
	 var aCellEl = a.cells[iSortColInd];
	 var bCellEl = b.cells[iSortColInd];
	 // For FOOTER case
	  if (bCellEl == undefined || aCellEl== undefined){
	    jslog(JSLOG_TEST,Fn + " FOOTER ROW");
	  	if (this.szSortDir == SORT_DIR.ASC){
	    	return 1;
	  	}else {
	  		return -1;
	  	}
	  } 
	 
	 
    aa = ts_getInnerText(aCellEl).toLowerCase();
    bb = ts_getInnerText(bCellEl).toLowerCase();
    var iRet =0;
    if (aa==bb) {
    	iRet = 0;
    }else  if (aa<bb){
    	iRet = -1;
    }else {
    	iRet = 1;
    }
    // jslog(JSLOG_TEST,Fn + " aa=" + aa + "  bb=" + bb + "     return " +  iRet);
    return iRet;
    
    
};

/*-------------------------------------------------------------
Get SortId from iColInd.
NOTE ar_sort_id_col is ordered but some Col can be Hidden
@param iColInd	in		0,1...N
@return szSortId		e.g    "Total Roamers"
      
      GLOBAL
this.arSortCol
this.szSortHiddenId   //Possible Hidden SortId   e.g "Carrier,PLMN,"
-------------------------------------------------------------*/
cSortTable.prototype.getSortId  = function (iColInd) {
  var Fn = "[cSortTable.sorttable.getSortId] ";
  var iColCur=-1;
  for (var i=0;i < this.arSortCol.length; i++){
    var szSortId = this.arSortCol[i].col;
    if (this.szSortHiddenId.indexOf(szSortId+",") == -1){
    	// szId is not Hidden
    	iColCur++;
    }
    if (iColCur == iColInd){
      // jslog(JSLOG_TEST,Fn + " IN: this.szSortHiddenId=" + this.szSortHiddenId + "  iColInd=" + iColInd + " OUT: szSortId=" + szSortId);
      return szSortId;
    }
  }
  return showErr (Fn + "SW ERROR: this.iSortColInd=" + this.iSortColInd + " NOT Visible  iColInd=" + iColInd,1);
};  

/*-------------------------------------------------------------
Get SortInfo from iColInd.
@param 	iColInd	in		0,1...N
@return obhSortCol		
      GLOBAL
this.arSortCol
-------------------------------------------------------------*/
cSortTable.prototype.getSortObj  = function (iColInd) {
  var Fn = "[cSortTable.getSortObj] ";
  var szSortId = this.getSortId(iColInd);
  for (var i=0;i < this.arSortCol.length; i++){
  	var objSortCol = this.arSortCol[i];
    if (objSortCol.col == szSortId){
    	return objSortCol;
    }	
	}
  return showErr (Fn + "SW ERROR: this.iSortColInd=" + this.iSortColInd + " NOT Found SortId=" + szSortId,1);
};  





/*-------------------------------------------------------------
Get SortId from iColInd.
NOTE ar_sort_id_col is ordered but some Col can be Hidden
@param szSortCol in		e.g 'Last Name'
@return iSortInd		e.g    0..
      
-------------------------------------------------------------*/
cSortTable.prototype.getSortIndFromSortCol  = function (szSortCol) {
  var Fn = "[cSortTable.sorttable.getSortIndFromSortCol] ";
  for (var i=0;i < this.arSortCol.length; i++){
  	var objSortCol = this.arSortCol[i];
  	// jslog (JSLOG_TEST,"szSortColCur=" + szSortColCur + " szSortCol=" + szSortCol);
    if (objSortCol.col == szSortCol){
      return i;
    }
  }
  return showErr (Fn + "SW ERROR: szSortCol=" + szSortCol + " NOT FOUND",1);
};  




/*-------------------------------------------------------------
It does the sort. 
@param SortImg    in   SortImg clicked
-------------------------------------------------------------*/
cSortTable.prototype.resortTable = function (SortImg) {
  var Fn = "[cSortTable.resortTable] ";
  jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);

  var td = SortImg.parentNode;
  var iNewSortCol = td.cellIndex;  // current Column  [0,1...]
  jslog(JSLOG_TEST,"Clicked on column=" + iNewSortCol  + "  Previous SortCol=" + this.iSortColInd);
  if (iNewSortCol != this.iSortColInd  && this.imgSortCur != 0 && this.imgSortCur != undefined){
    jslog(JSLOG_TEST,"Changed Sort column from " + this.iSortColInd + " to "  + iNewSortCol + "   --> Reset Previous Img");
    this.imgSortCur.setAttribute(SORT_ATTR_SORT_DIR,SORT_DIR.NONE);
    this.imgSortCur.setAttribute("title",this.szSortHintDesc);  // like it is Desc because clicking it will be ASC 
    this.imgSortCur.setAttribute("src",this.szSortPathNone);
  }

  this.iSortColInd = iNewSortCol;   // Set Global Var with current Sort Col Ind
  this.szSortCol = this.arSortCol[this.iSortColInd].col; 
  jslog(JSLOG_TEST,"SET iSortColInd = " + this.iSortColInd + "  szSortCol=" + this.szSortCol);
  this.imgSortCur = SortImg;

  // Set also New this.szSortDir
  var szAttrSortDir = SortImg.getAttribute(SORT_ATTR_SORT_DIR);
  jslog(JSLOG_TEST,Fn + "szAttrSortDir=" + szAttrSortDir );
  if (szAttrSortDir  == SORT_DIR.ASC) {  // ASC become DESC
    jslog(JSLOG_TEST,Fn + "Previous Sort was ASC - TOGGLE to Dir=DESC" );
    this.szSortDir = SORT_DIR.DESC;
  }else{ // NONE or DESC: become ASC
    jslog(JSLOG_TEST,Fn + "Previous Sort was NOT ASC- SET Dir=ASC" );
    this.szSortDir = SORT_DIR.ASC;
  }
  SortImg.setAttribute("src", this.szSortPathWait);
  SortImg.setAttribute("title", "Please Wait...");
  cSortTableElCur = this; // GLOBAL
  this.tmoSortApply = setTimeout(this.sortApply, SORT_TMO_WAIT_MS);
  jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);
};



/*-----------------------------------------------------------
Only for Cognos: Set Sort Label in Header, only if the Header is Present 
------------------------------------------------------------*/
cSortTable.prototype.headSetSortLbl = function () {
  var Fn="[cSortTable.headSetSortLbl] ";

  jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
  // NB: bShowErr False because This is an Optional Feature (spanHeaSortCol can be absent)
  var SpanHeaSortCol = getElementById2("spanHeaSortCol",false);  
  var SpanHeaSortDir = getElementById2("spanHeaSortDir",false);  
  if (SpanHeaSortCol == 0 || SpanHeaSortDir == 0){
    return jslog(JSLOG_TEST,Fn + "Nothing to DO: SORTHeader is not present " + JSLOG_FUN_END);
  }
  // Set 
  var szSortCol =  this.getSortCol();
  var szSortDirLabel =  this.getSortDirLabel();

  spanSetText(SpanHeaSortCol,szSortCol);
  spanSetText(SpanHeaSortDir,szSortDirLabel);

  jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);
};


/*-------------------------------------------------------------
It does the sort. Called after a Timeout, to show Wait Image
@param cSortTableEl    in   Current cSortTableEl (DO NOT use 'this' here)
		GLOBAL
cSortTableElCur		
-------------------------------------------------------------*/
cSortTable.prototype.sortApply = function () {
  var Fn = "[cSortTable.sortApply] ";
  var sortfn;
  
  var dStart = new Date();
  var cSortTableEl=cSortTableElCur;
  clearTimeout (cSortTableEl.tmoSortApply);
  jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
  jslog(JSLOG_TEST,Fn + "Doing SORT:   Current iSortColInd=" + cSortTable.iSortColInd + " szSortDir=" + cSortTable.szSortDir  +  " bMultiPage=" + cSortTable.bMultiPage );
  cSortTableEl.szSortCol = cSortTableEl.getSortId(cSortTableEl.iSortColInd);
  
  // If Present, put into Select new sort settings
  if (cSortTableEl.selectSortCol){
	  selectSelValue(cSortTableEl.selectSortCol,cSortTableEl.szSortCol);
	  selectSelValue(cSortTableEl.selectSortDir,cSortTableEl.szSortDir);
	  // save also into Hidden field
	  jslog (JSLOG_TEST,Fn + "save current szSortColCur=" + cSortTableEl.szSortCol + "  and  szSortDirCur=" + cSortTableEl.szSortDir);
	  cSortTableEl.inputSortCol.value = cSortTableEl.szSortCol;
	  cSortTableEl.inputSortDir.value = cSortTableEl.szSortDir;
  }  
  if  (cSortTableEl.bCognosGlobalSort &&  cSortTableEl.bMultiPage)  {
    // GLOBAL SORT
    jslog(JSLOG_TEST,Fn + "============= GLOBAL SORT ====");
    // it is Like a click on OK Button
    return cognosActionFINISH();   
  }
  jslog(JSLOG_TEST,Fn + "============= LOCAL SORT ====");
  var td = cSortTableEl.imgSortCur.parentNode;
  var iNewSortCol = td.cellIndex;  // current Column  [0,1...]
  jslog(JSLOG_TEST,Fn + "Clicked on column=" + iNewSortCol  + "  Previous SortCol=" + cSortTableEl.iSortColInd);
  var tblSort = cSortTableEl.tblSort;
	
  var objSortCol= cSortTableEl.getSortObj(cSortTableEl.iSortColInd);
  jslog(JSLOG_TEST,"NEW Sort for cSortTableEl.iSortColInd=" + cSortTableEl.iSortColInd + " SortId=" + cSortTableEl.getSortId(cSortTableEl.iSortColInd));
  jslogObj(JSLOG_TEST,"objSortCol:", objSortCol);
  if (objSortCol.type == SORT_TYPE.NUMBER){
    sortfn = cSortTableEl.ts_sort_numeric;  
    cSortTableEl.szSortGroupSep =  (objSortCol.groupSep == undefined) ?  cSortTableEl.szSortGroupSepLocale : objSortCol.groupSep;
    cSortTableEl.szSortDecSep = (objSortCol.decimalSep == undefined) ? cSortTableEl.szSortDecSepLocale : objSortCol.decimalSep;
    jslog(JSLOG_TEST,"sortfn = ts_sort_numeric - Using szSortGroupSep=" + cSortTableEl.szSortGroupSep + "  szSortDecSep=" + cSortTableEl.szSortDecSep);
  } else if (objSortCol.type == SORT_TYPE.STRING){
    sortfn = cSortTableEl.ts_sort_caseinsensitive; 
  } else if (objSortCol.type == SORT_TYPE.DATETIME){
	  sortfn = cSortTableEl.ts_sort_datetime;
	  cSortTableEl.szFmtDatetime = (objSortCol.fmt == undefined) ? SORT_DEF_FMT_DATETIME : objSortCol.fmt ;   
    jslog(JSLOG_TEST,"sortfn = ts_sort_datetime - Using cSortTableEl.szFmtDatetime=" + cSortTableEl.szFmtDatetime);
  } else {
    return showErr (Fn + "SW ERROR: Invalid SortType=" +  szSortType,1);
  }
  
  jslog(JSLOG_TEST,"Set the attribute in the Image to indicate the direction");
  var CurImgPath,CurHint;
  if (cSortTableEl.szSortDir == SORT_DIR.ASC){
    CurImgPath=cSortTableEl.szSortPathAsc;
    CurHint=cSortTableEl.szSortHintAsc;
  } 
  else{
    CurImgPath=cSortTableEl.szSortPathDesc;
    CurHint=cSortTableEl.szSortHintDesc;
  } 
	jslog(JSLOG_TEST,Fn + "IMG setAttribute (" + SORT_ATTR_SORT_DIR + ") = " + cSortTableEl.szSortDir);
  cSortTableEl.imgSortCur.setAttribute(SORT_ATTR_SORT_DIR,cSortTableEl.szSortDir);
  cSortTableEl.imgSortCur.setAttribute("src", CurImgPath);
  cSortTableEl.imgSortCur.setAttribute("title", CurHint);
 
  var newRows = new Array();
  var headerRows = new Array();
  // ---------------------------------- Header
  jslog (JSLOG_TEST,Fn + "Prepare newRow with the Row to Sort - We skip First HEADER Rows=" + cSortTableEl.iRowHeader);
  for (var j=cSortTableEl.iRowHeader, i=0;j<tblSort.rows.length ;j++, i++) {
  	newRows[i] = tblSort.rows[j]; 
  }
  
  // SORT
  jslog(JSLOG_TEST,"Start Sort Ascending...");
  // salvo la var globale
  cSortTableElCur = cSortTableEl;
  newRows.sort(sortfn);
  
  jslog(JSLOG_TEST,"Sort Ascending done");
  if (cSortTableEl.szSortDir == SORT_DIR.DESC){ 
    newRows.reverse();
    jslog(JSLOG_TEST,"Reverse done - Sort Descending Done");
  } 

  // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
  // we don't do it for SORT_TBL_CLASS_FOOTER rows
  for (i=0;i<newRows.length;i++) {
  	var szClassName = newRows[i].className;
		var bFooter = (szClassName != undefined &&  szClassName.indexOf(cSortTableEl.szClassFooter) >=0);
  	if (!bFooter){
  		tblSort.tBodies[0].appendChild(newRows[i]);
  	} 
  }
  // do SORT_TBL_CLASS_FOOTER rows only
  for (i=0;i<newRows.length;i++) { 
  	var szClassName = newRows[i].className;
		var bFooter = (szClassName != undefined &&  szClassName.indexOf(cSortTableEl.szClassFooter) >=0);
  	if (bFooter) {
  		tblSort.tBodies[0].appendChild(newRows[i]);
  	}
  }  

  // ---------------------
  if (cSortTableEl.bCognos){
  	cSortTableEl.headSetSortLbl(); // Align Sort Label in Header if Present Sort Section
  }
 	jslogElapsedTime (JSLOG_INFO,Fn + "DONE in ",dStart);
  jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);
	
};


cSortTable.prototype.getParent = function (el, pTagName) {
	if (el == null) return null;
	else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())	// Gecko bug, supposed to be uppercase
		return el;
	else
		return this.getParent(el.parentNode, pTagName);
};


/*-----------------------------------------------------------
onchange selectSortCol
------------------------------------------------------------*/
cSortTable.prototype.onchangeSortCol = function (ev) {
  var Fn = "[cSortTable.onchangeSortCol] ";

  jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
  var cSortTableEl = cSortTable.getSortTableElFromEv(Fn,ev);

	var szSortId = selectGetSelVal(cSortTableEl.selectSortCol);
  jslog(JSLOG_TEST,Fn + "Save into this.inputSortCol the selected szSortId=" + szSortId);
  cSortTableEl.inputSortCol.value = szSortId;
  jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);
};  

/*-----------------------------------------------------------
onchange selectSortDir
------------------------------------------------------------*/
cSortTable.prototype.onchangeSortDir = function (ev) {
  var Fn = "[cSortTable.onchangeSortDir] ";

  jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
  var cSortTableEl = cSortTable.getSortTableElFromEv(Fn,ev);
	var iSortDir = selectGetSelVal(cSortTableEl.selectSortDir);
  jslog(JSLOG_TEST,Fn + "Save into this.inputSortDir the selected iSortDir=" + iSortDir);
  cSortTableEl.inputSortDir.value = iSortDir;
  jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);
};  



/*-------------------------------------------------------------
this.bSortEn  = false. the click on images will display the Hint
this.bSortEn  = true   Toggle sort and Sort the table basing on
  			GLOBAL
this.bSortEn in  			
--------------------------------------------------------------*/
cSortTable.prototype.onclickSortImg= function (ev) {
  var Fn = "[cSortTable.onclickSortImg] ";
  jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
  var cSortTableEl = cSortTable.getSortTableElFromEv(Fn,ev);

  // this is the current element clicked
  var TagName = this.tagName;
  var CurImg;
  jslog(JSLOG_TEST,Fn + "this=" + this  +"  tagName=" + TagName);
  if (typeof (TagName) != 'undefined' && TagName.toUpperCase() == "IMG"){
    // Normal "Working" Click
    CurImg = this;
  }
  else {
    // WorkAround for IE: when it is selected the cell Header, "this" variable is not the td. In this case I use imgSortCur 
    if (cSortTableEl.imgSortCur){
      jslog(JSLOG_TEST,Fn + "Workaround for IE Header Seleted: Use imgSortCur");
      CurImg = cSortTableEl.imgSortCur;
    }
    else {
      jslog(JSLOG_ERR,Fn + "imgSortCur=null   CANNOT Apply workaround for IE");
      return;
    }
  }
  if (cSortTableEl.bSortEn){
  	cSortTableEl.resortTable (CurImg);
  }else {
  	showInfo (cSortTableEl.szSortHintAsc);
  }
  jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);

};





//*********************************************************************************************
// LOCAL FUNCTION
//*********************************************************************************************

/*-----------------------------------------------------------
Get Current SortTable instance from Event
	PAR
Fn  in  Function name calling this function
ev  in  Event		
------------------------------------------------------------*/
cSortTable.getSortTableElFromEv = function(Fn,ev) {
	var Fn = "[cSortTable.getSortTableElFromEv] ";
	jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
	
	// get current element
	var El = cSortTable.getElement(ev);
	// N.B Get Current cSortTable instance (cSortTableEl)  
	var cSortTableEl = El._cSortTableEl;
	if (typeof (cSortTableEl) == "undefined"){
		showErr (Fn + "SW ERROR: cSortTableEl is undefined in " + Fn,1);
	}else {
		// Log one member
		jslog(JSLOG_TEST, Fn + "cSortTableEl.szSortPathAsc=" + cSortTableEl.szSortPathAsc);
	}
	jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);
	return cSortTableEl;
};



//**************************************************************************
//**************************************************************************
//Utility Function (NO Prototype)
//**************************************************************************
//**************************************************************************

cSortTable.getElement = function(ev) {
var f = cSortTable.is_ie ? window.event.srcElement : ev.currentTarget;
while (f.nodeType != 1 || /^div$/i.test(f.tagName))
	f = f.parentNode;
return f;
};


/// detect a special case of "web browser"
cSortTable.is_ie = ( /msie/i.test(navigator.userAgent) &&	!/opera/i.test(navigator.userAgent) );






