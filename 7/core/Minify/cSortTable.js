/* =========================================================================================
@File:     					cSortTable.js
@Author:   					Federico Levis
@Since:  						Apr 2016   
Description: 				Sort JS API
Required:						core/*.js 
   									ONLY if option bCognos=true, it is required cognos/common/cognosUtil.js

DISCLAIMER
Copyright by Federico Levis http://federicolevis.wix.com/jsu JS Utility API
All rights reserved: UNAUTHORIZED COPYING, REPRODUCTION, REPUBLISHING, UPLOADING, POSTING, TRANSMITTING OR DUPLICATING IS PROHIBITED
========================================================================================= */
var SORT_TYPE={STRING:"STRING",NUMBER:"NUMBER",DATETIME:"DATETIME"},SORT_DIR_ASC="-1",SORT_DIR_DESC="1",SORT_DIR_NONE="NONE",SORT_DEF_COGNOS=!1,SORT_DEF_COGNOS_GLOBAL_SORT_EN=!1,SORT_DEF_FMT_DATETIME="NNN dd, yyyy HH:mm:ss",SORT_DEF_PATH_IMG=JSU_PATH_IMG,SORT_DEF_IND=0,SORT_DEF_DIR=SORT_DIR_ASC,SORT_DEF_APPLY=!1,SORT_TR_CLASS_FOOTER="footer",SORT_CLASS_FOOTER_COGNOS="summary",SORT_INFO_ABSENT="",SORT_IMG_NONE_FAST="fast_sort_none.jpg",SORT_IMG_ASC_FAST="fast_sort_asc.jpg",SORT_IMG_DESC_FAST="fast_sort_desc.jpg",SORT_IMG_NONE_SLOW="slow_sort_none.jpg",SORT_IMG_ASC_SLOW="slow_sort_asc.jpg",SORT_IMG_DESC_SLOW="slow_sort_desc.jpg",SORT_IMG_NONE_DIS="disabled_sort_none.jpg",SORT_IMG_ASC_DIS="disabled_sort_asc.jpg",SORT_IMG_DESC_DIS="disabled_sort_desc.jpg",SORT_IMG_WAIT="wait.jpg",SORT_ATTR_SORT_DIR="SortDirCur",SORT_TMO_WAIT_MS=50,cSortTableElCur=null,SORT_CLASSNAME="sortimg"
cSortTable=function(t,o,r){var e="[cSortTable] "
jslog(JSLOG_INFO,e+JSLOG_FILE_START),this.iTblRowPerPage=0,this.bCognos=SORT_DEF_COGNOS,this.bCognosGlobalSort=SORT_DEF_COGNOS_GLOBAL_SORT_EN,this.bSortEn=!0,this.szFmtDatetime=SORT_DEF_FMT_DATETIME,this.szPathImg=SORT_DEF_PATH_IMG,this.szClassFooter=SORT_TR_CLASS_FOOTER,this.szSortHiddenId="",this.szSortPathNone="",this.szSortPathAsc="",this.szSortPathDesc="",this.szSortPathWait="",this.bMultiPage=!1,this.imgTemp=document.createElement("img"),this.arSortImg=new Array,this.tempTextSep=document.createTextNode(" "),this.szSortDecSep="",this.szSortDecSep_locale="",this.szSortGroupSepLocale=localeGetGroupSep(),this.szSortDecSep_locale=localeGetDecimalSep(),jslog(JSLOG_TEST,e+"this.szSortDecSep_locale= "+this.szSortDecSep_locale+"  this.szSortGroupSepLocale = "+this.szSortGroupSepLocale),this.szSortGroupSep="",this.szSortGroupSepLocale="",this.iSortColInd=SORT_DEF_IND,this.szSortCol=void 0,this.szSortDir=SORT_DEF_DIR,this.szSortCol="",o.length>0&&(this.szSortCol=void 0!=o[0].col?o[0].col:""),this.selectSortCol=0,this.selectSortDir=0,this.inputSortCol=0,this.inputSortDir=0,this.inputSortHiddenCol=0,this.imgSortCur=null,this.szSortHintAsc="",this.szSortHintDesc="",this.iTblFooterRec=0,jslog(JSLOG_DEBUG,e+"IN szElId="+t),jslogObj(JSLOG_DEBUG,e+"IN arSortCol:",o,!0),void 0!=r&&(jslogObj(JSLOG_DEBUG,e+"objOpt",r),void 0!=r.iTblRowPerPage&&(this.iTblRowPerPage=r.iTblRowPerPage,jslog(JSLOG_DEBUG,e+"OPTION: iTblRowPerPage="+this.iTblRowPerPage)),void 0!=r.bCognos&&(this.bCognos=r.bCognos,jslog(JSLOG_DEBUG,e+"OPTION: bCognos="+this.bCognos)),void 0!=r.bCognosGlobalSort&&(this.bCognosGlobalSort=r.bCognosGlobalSort,jslog(JSLOG_DEBUG,e+"OPTION: bCognosGlobalSort="+this.bCognosGlobalSort)),void 0!=r.szFmtDatetime&&(this.szFmtDatetime=r.szFmtDatetime,jslog(JSLOG_DEBUG,e+"OPTION: szFmtDatetime="+this.szFmtDatetime)),void 0!=r.szPathImg&&(this.szPathImg=r.szPathImg,jslog(JSLOG_DEBUG,e+"OPTION: szPathImg="+this.szPathImg)),void 0!=r.szClassFooter&&(this.szClassFooter=r.szClassFooter,jslog(JSLOG_DEBUG,e+"OPTION: szClassFooter="+this.szClassFooter))),this.tmoSortApply=null,this.bCognos&&(this.szClassFooter=SORT_CLASS_FOOTER_COGNOS,jslog(JSLOG_DEBUG,e+"For COGNOS ALWAYS szClassFooter="+this.szClassFooter)),this.bCognos?this.tblSort=getElementByTag2("TABLE","tblSort",!1):this.tblSort=getElementById2(t,!0)
var s=0
if(this.iTblFooterRec=0,void 0!=this.tblSort&&void 0!=this.tblSort.rows){for(var S=1;S<this.tblSort.rows.length;S++){var i=this.tblSort.rows[S].firstChild.type,l=!1,T=this.tblSort.rows[S].firstChild.outerHTML,a=-1
void 0!=T&&(a=T.indexOf('type="'+this.szClassFooter+'"'),a>=0&&(l=!0))
var n=this.tblSort.rows[S].className
this.bCognos&&(n=i)
var _=l||void 0!=n&&n.indexOf(this.szClassFooter)>=0
"columnTitle"==i||_||s++,_&&(jslog(JSLOG_TEST,"Rec ["+S+"]  IS FOOTER"),this.bCognos&&(this.tblSort.rows[S].className=this.szClassFooter),this.iTblFooterRec++)}jslog(JSLOG_TEST,e+"TABLE iTblRecNum="+s+"   iTblFooterRec="+this.iTblFooterRec+"  (rows="+this.tblSort.rows.length+")"),this.bCognos&&(this.bMultiPage=0!=this.iTblRowPerPage&&s>=this.iTblRowPerPage||isMultiPage()),jslog(JSLOG_TEST,e+"this.bMultiPage="+this.bMultiPage)}this.iTblRecNum=s
var h=""
if(this.bMultiPage?(this.szSortPathNone=this.szPathImg+(this.bCognosGlobalSort?SORT_IMG_NONE_SLOW:SORT_IMG_NONE_DIS),this.szSortPathAsc=this.szPathImg+(this.bCognosGlobalSort?SORT_IMG_ASC_SLOW:SORT_IMG_ASC_DIS),this.szSortPathDesc=this.szPathImg+(this.bCognosGlobalSort?SORT_IMG_DESC_SLOW:SORT_IMG_DESC_DIS),h=SORT_HINT_REC_NUM_PART.replace("XXX",s),this.bCognosGlobalSort?(this.szSortHintAsc=SORT_HINT_GLOBAL_ASC+"\n\n"+h,this.szSortHintDesc=SORT_HINT_GLOBAL_DESC+"\n\n"+h):(this.szSortHintAsc=SORT_HINT_DISABLED+"\n\n"+h,this.szSortHintDesc=this.szSortHintAsc)):(this.szSortPathNone=this.szPathImg+SORT_IMG_NONE_FAST,this.szSortPathAsc=this.szPathImg+SORT_IMG_ASC_FAST,this.szSortPathDesc=this.szPathImg+SORT_IMG_DESC_FAST,h=SORT_HINT_REC_NUM_ALL.replace("XXX",s),this.szSortHintAsc=SORT_HINT_ASC+"\n\n"+h,this.szSortHintDesc=SORT_HINT_DESC+"\n\n"+h),this.szSortPathWait=this.szPathImg+SORT_IMG_WAIT,jslog(JSLOG_TEST,e+"this.szSortPathNone="+this.szSortPathNone+" this.szSortPathAsc="+this.szSortPathAsc+" this.szSortPathDesc="+this.szSortPathDesc),this.bCognos){jslog(JSLOG_TEST,e+"Get select of SORT BOX Otions (e.g for Cognos)")
var O=getFW()
this.selectSortCol=O._oLstChoices_SelectSortCol,this.selectSortCol._cSortTableEl=this,this.selectSortCol.onchange=this.onchangeSortCol,this.selectSortDir=O._oLstChoices_SelectSortDir,this.selectSortDir._cSortTableEl=this,this.selectSortDir.onchange=this.onchangeSortDir,selectRemoveExtraItems(this.selectSortDir),this.inputSortCol=O._textEditBox_SortCol,this.inputSortDir=O._textEditBox_SortDir,this.inputSortHiddenCol=O._textEditBox_SortHiddenCol}jslog(JSLOG_TEST,e+"populate this.arcSortItem"),this.arcSortItem=new Array
var c=0
this.selectSortCol&&selectRemoveAll(this.selectSortCol)
for(var g=0;g<o.length;g++)void 0==o[g].col&&(o[g].col=g+1),void 0==o[g].type&&(o[g].type=SORT_TYPE.STRING),this.selectSortCol&&appendOptionLast(this.selectSortCol,o[g].col,o[g].col),c++
if(this.arSortCol=o,this.inputSortHiddenCol){var C=this.inputSortHiddenCol.value
if(jslog(JSLOG_TEST,"szSortHidden = "+C),C.length){var E=C.split(",")
this.sorttableSetHiddenCol(E)}}if(this.selectSortCol&&(jslog(JSLOG_TEST,"Align Current Sort Selection to Visible Fields"),selectSelValue(this.selectSortCol,this.inputSortCol.value),selectSelValue(this.selectSortDir,this.inputSortDir.value),jslog(JSLOG_TEST,"Init Global Val form Cognos Hidden Fields"),this.iSortColInd=this.selectSortCol.selectedIndex,this.szSortDir=this.inputSortDir.value,this.szSortCol=this.inputSortCol.value),this.tblSort&&this.sortInit(),void 0!=r&&(r.szSortCol||r.szSortDir)){var d=void 0!=r.bSortApply&&r.bSortApply
jslog(JSLOG_DEBUG,e+"Obtional Initial Sort is SET: SortCol="+r.szSortCol+" szSortDir="+r.szSortDir+" bSortApply="+d),this.setSort(r.szSortCol,r.szSortDir,d)}this.bMultiPage&&!this.bCognosGlobalSort&&this.sorttableDisableSort(),jslog(JSLOG_INFO,e+JSLOG_FILE_END)},cSortTable.prototype.setSort=function(t,o,r){var e="[cSortTable.setSort] "
jslog(JSLOG_TEST,e+JSLOG_FUN_START),void 0!=r&&null!=r||(r=!0),jslog(JSLOG_TEST,e+"IN szSortCol="+t+" szSortDir="+o+" ("+SORT_DIR_ASC+"=ASC  "+SORT_DIR_DESC+"=DESC )  bResortTable="+r)
var s=this.iSortColInd
if(void 0!=t){var s=this.getSortIndFromSortCol(t)
if(0>s)return}jslog(JSLOG_TEST,e+"iSortColInd="+s)
var S=this.arSortImg[s]
if(r){var i=o==SORT_DIR_ASC?SORT_DIR_DESC:SORT_DIR_ASC
jslog(JSLOG_TEST,"simulate having for iSortColInd="+s+" The szSortDirTmp="+i+"to Obtain with resortTable the desired new szSortDir="+o),S.setAttribute(SORT_ATTR_SORT_DIR,i),this.resortTable(S)}else{var l=S.parentNode,T=l.cellIndex
T!=this.iSortColInd&&0!=this.imgSortCur&&(jslog(JSLOG_TEST,"Changed Sort column from "+this.iSortColInd+" to "+T+"   --> Reset Previous Img"),this.imgSortCur.setAttribute(SORT_ATTR_SORT_DIR,SORT_DIR_NONE),this.imgSortCur.setAttribute("title",this.szSortHintDesc),this.imgSortCur.setAttribute("src",this.szSortPathNone)),this.iSortColInd=T,jslog(JSLOG_TEST,"SET iSortColInd = "+this.iSortColInd),this.imgSortCur=S,S.setAttribute(SORT_ATTR_SORT_DIR,o),this.szSortDir=o,o==SORT_DIR_ASC?(S.setAttribute("title",this.szSortHintAsc),S.setAttribute("src",this.szSortPathAsc)):(S.setAttribute("title",this.szSortHintDesc),S.setAttribute("src",this.szSortPathDesc))}jslog(JSLOG_TEST,e+JSLOG_FUN_END)},cSortTable.prototype.sorttableSetHiddenCol=function(t){var o="[cSortTable.sorttableSetHiddenCol] "
jslog(JSLOG_TEST,o+JSLOG_FUN_START),arTrace(JSLOG_TEST,t,o+"ArColId")
var r=this.selectSortCol.selectedIndex
if(jslog(JSLOG_TEST,o+"this.selectSortCol iSelInd="+r),0>r)return void jslog(JSLOG_TEST,o+"return (iSelInd <0)")
jslog(JSLOG_TEST,o+"Prepare this.szSortHiddenId with the ColId to Hide")
var e=this.selectSortCol[r].value
jslog(JSLOG_TEST,o+"szSortIdCur="+e)
var s=!1,S=t.length
this.szSortHiddenId=""
for(var i=0;S>i;i++)this.szSortHiddenId+=t[i],this.szSortHiddenId+=",",t[i]==e&&(s=!0)
jslog(JSLOG_TEST,o+"this.szSortHiddenId ="+this.szSortHiddenId),selectRemoveAllOption(this.selectSortCol)
for(var i=0;i<this.arSortCol.length;i++){var l=this.arSortCol[i],T=l.col,a=T,n=-1==this.szSortHiddenId.indexOf(T+",")
n&&appendOptionSelLast(this.selectSortCol,a,T,T==e)}this.inputSortHiddenCol.value=this.szSortHiddenId,s&&(jslog(JSLOG_TEST,o+"Previous SortCol Has been Hidden --> Set DefaultSort (First Col Asc)"),this.selectSortCol.selectedIndex=0,this.selectSortDir.selectedIndex=0),jslog(JSLOG_TEST,o+JSLOG_FUN_END)},cSortTable.prototype.getSortColCur=function(){return this.szSortCol},cSortTable.prototype.getSortDirCur=function(){return this.szSortDir},cSortTable.prototype.getSortDirLabelCur=function(){return this.selectSortDir?selectGetSelText(this.selectSortDir):this.szSortDir},cSortTable.prototype.sortInit=function(){var t="[cSortTable.sortInit] "
jslog(JSLOG_TEST,t+JSLOG_FUN_START),jslog(JSLOG_TEST,t+JSLOG_FUN_START)
if(0==this.tblSort)return jslog(JSLOG_TEST,t+"Nothing to DO: there is NOT Table to Sort in this Page",JSLOG_FUN_START)
if(jslog(JSLOG_TEST,"CURRENT SORT: iSortColInd="+this.iSortColInd+"  szSortColCur="+this.szSortCol+"  szSortDirCur="+this.szSortDir),this.tblSort.rows&&this.tblSort.rows.length>0)var o=this.tblSort.rows[0]
if(!o)return void jslog(JSLOG_TEST,t+"Table without Rows, Nothing to Sort")
var r=o.childNodes.length,e=0
if(this.inputSortHiddenCol){for(var s=this.inputSortHiddenCol.value,S=s.split(","),i=0;i<S.length;i++)""!=S[i]&&null!=S[i]&&e++
jslog(JSLOG_TEST,t+"numColHidden="+e)}var l=this.arSortCol.length,T=l>r?r:l-e
jslog(JSLOG_TEST,t+"iColVis="+r+"  iSortColNum="+l+"  ---> iColSort="+T)
for(var a=0;T>a;a++){var n=o.cells[a],_=this.tempTextSep.cloneNode(!1),h=this.imgTemp.cloneNode(!1)
h.className=SORT_CLASSNAME,h._cSortTableEl=this,h.onclick=this.onclickSortImg
var O=this.szSortDir,c=this.szSortHintDesc,g=this.szSortPathNone
a==this.iSortColInd?(this.imgSortCur=h,this.szSortDir==SORT_DIR_ASC?(g=this.szSortPathAsc,c=this.szSortHintAsc):(g=this.szSortPathDesc,c=this.szSortHintDesc)):O=SORT_DIR_NONE,jslog(JSLOG_TEST,t+"IMG["+a+"] setAttribute ("+SORT_ATTR_SORT_DIR+") = "+O),h.setAttribute(SORT_ATTR_SORT_DIR,O),h.setAttribute("src",g),h.setAttribute("title",c),n.appendChild(_),n.appendChild(h),this.arSortImg[a]=h}jslog(JSLOG_TEST,t+JSLOG_FUN_END)},cSortTable.prototype.sorttableDisableSort=function(){var t="[cSortTable.sorttableDisableSort] "
if(jslog(JSLOG_TEST,t+JSLOG_FUN_START),0==this.tblSort)return void jslog(JSLOG_TEST,t+"tblSort NOT VISIBLE"+JSLOG_FUN_END)
var o=this.tblSort.getElementsByTagName("IMG")
if(null==o||!o.length)return void jslog(JSLOG_TEST,t+"ImgList is Empty. Nothing to do"+JSLOG_FUN_END)
this.bSortEn=!1
for(var r=0;r<o.length;r++){var e=o[r]
jslog(JSLOG_TEST,t+"className="+e.className),e.className==SORT_CLASSNAME&&(jslog(JSLOG_TEST,t+"Disable ImgEl["+r+"]"),e.setAttribute("title",this.szSortHintAsc))}jslog(JSLOG_TEST,t+JSLOG_FUN_END)},cSortTable.prototype.ts_sort_numeric=function(t,o){var r=cSortTableElCur.iSortColInd,e=t.cells[r],s=o.cells[r]
if(void 0==s||void 0==e)return cSortTableElCur.szSortDirCur==SORT_DIR_ASC?1:-1
if(aNumStr=ts_getInnerText(e),bNumStr=ts_getInnerText(s),0==aNumStr.length)return-1
if(0==bNumStr.length)return 1
aNum=str2Num(aNumStr,cSortTableElCur.szSortGroupSep,cSortTableElCur.szSortDecSep),bNum=str2Num(bNumStr,cSortTableElCur.szSortGroupSep,cSortTableElCur.szSortDecSep)
var S=0
return S=aNum-bNum},cSortTable.prototype.ts_sort_datetime=function(t,o){var r=cSortTableElCur.iSortColInd,e=t.cells[r],s=o.cells[r]
if(void 0==s||void 0==e)return this.szSortDir==SORT_DIR_ASC?1:-1
var S=ts_getInnerText(e),i=ts_getInnerText(s),l=getTimeFromFormat(S,cSortTableElCur.szFmtDatetime),T=getTimeFromFormat(i,cSortTableElCur.szFmtDatetime)
return l==T?0:T>l?-1:1},cSortTable.prototype.ts_sort_currency=function(t,o){var r=cSortTableElCur.iSortColInd,e=t.cells[r],s=o.cells[r]
return void 0==s||void 0==e?this.szSortDir==SORT_DIR_ASC?1:-1:(aa=ts_getInnerText(e).replace(/[^0-9.]/g,""),bb=ts_getInnerText(s).replace(/[^0-9.]/g,""),parseFloat(aa)-parseFloat(bb))},cSortTable.prototype.ts_sort_caseinsensitive=function(t,o){var r="[cSortTable.ts_sort_caseinsensitive] ",e=cSortTableElCur.iSortColInd,s=t.cells[e],S=o.cells[e]
if(void 0==S||void 0==s)return jslog(JSLOG_TEST,r+" FOOTER ROW"),this.szSortDir==SORT_DIR_ASC?1:-1
aa=ts_getInnerText(s).toLowerCase(),bb=ts_getInnerText(S).toLowerCase()
var i=0
return i=aa==bb?0:aa<bb?-1:1},cSortTable.prototype.getSortId=function(t){for(var o="[cSortTable.sorttable.getSortId] ",r=-1,e=0;e<this.arSortCol.length;e++){var s=this.arSortCol[e].col
if(-1==this.szSortHiddenId.indexOf(s+",")&&r++,r==t)return s}return showErr(o+"SW ERROR: this.iSortColInd="+this.iSortColInd+" NOT Visible  iColInd="+t,1)},cSortTable.prototype.getSortObj=function(t){for(var o="[cSortTable.getSortObj] ",r=this.getSortId(t),e=0;e<this.arSortCol.length;e++){var s=this.arSortCol[e]
if(s.col==r)return s}return showErr(o+"SW ERROR: this.iSortColInd="+this.iSortColInd+" NOT Found SortId="+r,1)},cSortTable.prototype.getSortIndFromSortCol=function(t){for(var o="[cSortTable.sorttable.getSortIndFromSortCol] ",r=0;r<this.arSortCol.length;r++){var e=this.arSortCol[r]
if(e.col==t)return r}return showErr(o+"SW ERROR: szSortCol="+t+" NOT FOUND",1)},cSortTable.prototype.resortTable=function(t){var o="[cSortTable.resortTable] "
jslog(JSLOG_TEST,o+JSLOG_FUN_START)
var r=t.parentNode,e=r.cellIndex
jslog(JSLOG_TEST,"Clicked on column="+e+"  Previous SortCol="+this.iSortColInd),e!=this.iSortColInd&&0!=this.imgSortCur&&(jslog(JSLOG_TEST,"Changed Sort column from "+this.iSortColInd+" to "+e+"   --> Reset Previous Img"),this.imgSortCur.setAttribute(SORT_ATTR_SORT_DIR,SORT_DIR_NONE),this.imgSortCur.setAttribute("title",this.szSortHintDesc),this.imgSortCur.setAttribute("src",this.szSortPathNone)),this.iSortColInd=e,jslog(JSLOG_TEST,"SET iSortColInd = "+this.iSortColInd),this.imgSortCur=t
var s=t.getAttribute(SORT_ATTR_SORT_DIR)
jslog(JSLOG_TEST,o+"szAttrSortDir="+s),s==SORT_DIR_ASC?(jslog(JSLOG_TEST,o+"Previous Sort was ASC - TOGGLE to Dir=DESC"),this.szSortDir=SORT_DIR_DESC):(jslog(JSLOG_TEST,o+"Previous Sort was NOT ASC- SET Dir=ASC"),this.szSortDir=SORT_DIR_ASC),t.setAttribute("src",this.szSortPathWait),t.setAttribute("title","Please Wait..."),cSortTableElCur=this,this.tmoSortApply=setTimeout(this.sortApply,SORT_TMO_WAIT_MS),jslog(JSLOG_TEST,o+JSLOG_FUN_END)},cSortTable.prototype.headSetSortLbl=function(){var t="[cSortTable.headSetSortLbl] "
jslog(JSLOG_TEST,t+JSLOG_FUN_START)
var o=getElementById2("spanHeaSortCol",!1),r=getElementById2("spanHeaSortDir",!1)
if(0==o||0==r)return jslog(JSLOG_TEST,t+"Nothing to DO: SORTHeader is not present "+JSLOG_FUN_END)
var e=this.getSortColCur(),s=this.getSortDirLabelCur()
spanSetText(o,e),spanSetText(r,s),jslog(JSLOG_TEST,t+JSLOG_FUN_END)},cSortTable.prototype.sortApply=function(){var t,o="[cSortTable.sortApply] ",r=new Date,e=cSortTableElCur
if(clearTimeout(e.tmoSortApply),jslog(JSLOG_TEST,o+JSLOG_FUN_START),jslog(JSLOG_TEST,o+"Doing SORT:   Current iSortColInd="+cSortTable.iSortColInd+" szSortDir="+cSortTable.szSortDir+" bMultiPage="+cSortTable.bMultiPage),e.szSortCol=e.getSortId(e.iSortColInd),e.selectSortCol&&(selectSelValue(e.selectSortCol,e.szSortCol),selectSelValue(e.selectSortDir,e.szSortDir),jslog(JSLOG_TEST,o+"save current szSortColCur="+e.szSortCol+"  and  szSortDirCur="+e.szSortDir),e.inputSortCol.value=e.szSortCol,e.inputSortDir.value=e.szSortDir),e.bCognosGlobalSort&&e.bMultiPage)return jslog(JSLOG_TEST,"============= GLOBAL SORT ===="),cognosActionFINISH()
jslog(JSLOG_TEST,"============= LOCAL SORT ====")
var s=e.imgSortCur.parentNode,S=s.cellIndex
jslog(JSLOG_TEST,"Clicked on column="+S+"  Previous SortCol="+e.iSortColInd)
var l=e.tblSort,T=e.getSortObj(e.iSortColInd)
if(jslog(JSLOG_TEST,"NEW Sort for cSortTableEl.iSortColInd="+e.iSortColInd+" SortId="+e.getSortId(e.iSortColInd)),jslogObj(JSLOG_TEST,"objSortCol:",T),T.type==SORT_TYPE.NUMBER)t=e.ts_sort_numeric,e.szSortGroupSep=void 0==T.groupSep?e.szSortGroupSepLocale:T.groupSep,e.szSortDecSep=void 0==T.groupSep?e.szSortDecSep_locale:T.groupSep
else if(T.type==SORT_TYPE.STRING)t=e.ts_sort_caseinsensitive
else{if(T.type!=SORT_TYPE.DATETIME)return showErr(o+"SW ERROR: Invalid SortType="+szSortType,1)
t=e.ts_sort_datetime,e.szFmtDatetime=void 0==T.fmt?SORT_DEF_FMT_DATETIME:T.fmt,jslog(JSLOG_TEST,"sortfn = ts_sort_datetime - Using cSortTableEl.szFmtDatetime="+e.szFmtDatetime)}jslog(JSLOG_TEST,"Set the attribute in the Image to indicate the direction")
var a,n
e.szSortDir==SORT_DIR_ASC?(a=e.szSortPathAsc,n=e.szSortHintAsc):(a=e.szSortPathDesc,n=e.szSortHintDesc),jslog(JSLOG_TEST,o+"IMG setAttribute ("+SORT_ATTR_SORT_DIR+") = "+e.szSortDir),e.imgSortCur.setAttribute(SORT_ATTR_SORT_DIR,e.szSortDir),e.imgSortCur.setAttribute("src",a),e.imgSortCur.setAttribute("title",n)
var _=new Array,h=new Array
for(i=0;i<l.rows[0].length;i++)_[i]=l.rows[0][i]
for(j=1;j<l.rows.length;j++)h[j-1]=l.rows[j]
for(jslog(JSLOG_TEST,"Start Sort Ascending..."),cSortTableElCur=e,h.sort(t),jslog(JSLOG_TEST,"Sort Ascending done"),e.szSortDir==SORT_DIR_DESC&&(h.reverse(),jslog(JSLOG_TEST,"Reverse done - Sort Descending Done")),i=0;i<h.length;i++){var O=h[i].className,c=void 0!=O&&O.indexOf(e.szClassFooter)>=0
c||l.tBodies[0].appendChild(h[i])}for(i=0;i<h.length;i++){var O=h[i].className,c=void 0!=O&&O.indexOf(e.szClassFooter)>=0
c&&l.tBodies[0].appendChild(h[i])}e.bCognos&&e.headSetSortLbl(),jslogElapsedTime(JSLOG_INFO,o+"DONE in ",r),jslog(JSLOG_TEST,o+JSLOG_FUN_END)},cSortTable.prototype.getParent=function(t,o){return null==t?null:1==t.nodeType&&t.tagName.toLowerCase()==o.toLowerCase()?t:this.getParent(t.parentNode,o)},cSortTable.prototype.onchangeSortCol=function(t){var o="[cSortTable.onchangeSortCol] "
jslog(JSLOG_TEST,o+JSLOG_FUN_START)
var r=cSortTable.getSortTableElFromEv(o,t),e=selectGetSelVal(r.selectSortCol)
jslog(JSLOG_TEST,o+"Save into this.inputSortCol the selected szSortId="+e),r.inputSortCol.value=e,jslog(JSLOG_TEST,o+JSLOG_FUN_END)},cSortTable.prototype.onchangeSortDir=function(t){var o="[cSortTable.onchangeSortDir] "
jslog(JSLOG_TEST,o+JSLOG_FUN_START)
var r=cSortTable.getSortTableElFromEv(o,t),e=selectGetSelVal(r.selectSortDir)
jslog(JSLOG_TEST,o+"Save into this.inputSortDir the selected iSortDir="+e),r.inputSortDir.value=e,jslog(JSLOG_TEST,o+JSLOG_FUN_END)},cSortTable.prototype.onclickSortImg=function(t){var o="[cSortTable.onclickSortImg] "
jslog(JSLOG_TEST,o+JSLOG_FUN_START)
var r,e=cSortTable.getSortTableElFromEv(o,t),s=this.tagName
if(jslog(JSLOG_TEST,o+"this="+this+"  tagName="+s),"undefined"!=typeof s&&"IMG"==s.toUpperCase())r=this
else{if(!e.imgSortCur)return void jslog(JSLOG_ERR,o+"imgSortCur=null   CANNOT Apply workaround for IE")
jslog(JSLOG_TEST,o+"Workaround for IE Header Seleted: Use imgSortCur"),r=e.imgSortCur}e.bSortEn?e.resortTable(r):showInfo(e.szSortHintAsc),jslog(JSLOG_TEST,o+JSLOG_FUN_END)},cSortTable.getSortTableElFromEv=function(t,o){var t="[cSortTable.getSortTableElFromEv] "
jslog(JSLOG_TEST,t+JSLOG_FUN_START)
var r=cSortTable.getElement(o),e=r._cSortTableEl
return"undefined"==typeof e?showErr(t+"SW ERROR: cSortTableEl is undefined in "+t,1):jslog(JSLOG_TEST,t+"cSortTableEl.szSortPathAsc="+e.szSortPathAsc),jslog(JSLOG_TEST,t+JSLOG_FUN_END),e},cSortTable.getElement=function(t){for(var o=cSortTable.is_ie?window.event.srcElement:t.currentTarget;1!=o.nodeType||/^div$/i.test(o.tagName);)o=o.parentNode
return o},cSortTable.is_ie=/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent)
