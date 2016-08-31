/* =========================================================================================
File:     					util.js
Author:   					Federico Levis
Last Modification:  Jan 2016   
Description: Common js utilty for Cognos Report Studio or also for generic JS use 

DISCLAIMER
Copyright by Federico Levis http://federicolevis.wix.com/cognos Cognos Tips & Solutions
All rights reserved: UNAUTHORIZED COPYING, REPRODUCTION, REPUBLISHING, UPLOADING, POSTING, TRANSMITTING OR DUPLICATING IS PROHIBITED
========================================================================================= */
function msgHtml2Str(e){var t=e.replace(/<BR\/>/gi,"\n")
t=t.replace(/<ul/gi,"\n<ul"),t=t.replace(/<li>/gi," • "),t=t.replace(/<li /gi," • <li "),t=t.replace(/<\/li>/gi,"\n"),t=t.replace(/<\/ul>/gi,"\n"),t=t.replace(/<th /gi,"\n<th "),t=t.replace(/<th>/gi,"\n<th>"),t=t.replace(/<tr /gi,"\n ․ <tr "),t=t.replace(/<tr>/gi,"\n ․ "),t=t.replace(/<\/td>/gi," - "),t=t.replace(/<[^>]*>?/gm,"")
for(var n=["a","A","e","E","u","U","o","O","i","I"],r=["grave","acute","tilde","dierese"],l=0;l<n.length;l++)for(var o=0;o<r.length;o++){var i="&"+n[l]+r[o]+";",s=n[l]+"`"
t=strReplaceAll(t,i,s)}return t}function popupIsDefined(){return"function"==typeof Popup}function showAlert(e,t){return alert(msgHtml2Str(e)),t}function showInfo(e,t){jslog(JSLOG_INFO,e),popupIsDefined()?Popup(POPUP_TYPE.INFO,e,t):showAlert(e,0)}function showWarn(e,t,n){return jslog(JSLOG_INFO,e),popupIsDefined()?Popup(POPUP_TYPE.WARN,e,n):showAlert(e,t),t}function showErr(e,t,n){return jslog(JSLOG_ERR,e),void 0==t&&(t=1),popupIsDefined()?Popup(POPUP_TYPE.ERR,e,n):showAlert(e,t),t}function showErrIfRequired(e,t,n){return e&&showErr(t,n),n}function getBrowser(){var e="[Popup.js PopupGetBrowser] ",t=(navigator.appName,BROWSER_TYPE.OTHER)
return"undefined"!=typeof InstallTrigger?t=BROWSER_TYPE.FIREFOX:(navigator.appName==APP_NAME_IE||navigator.appName==APP_NAME_IE_11&&null!=new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent))&&(t=BROWSER_TYPE.IE),jslog(JSLOG_TEST,e+"szBrowser="+t+" -  navigator.appCodeName="+navigator.appCodeName+"  navigator.appName="+navigator.appName),t}function isFirefox(){return getBrowser()==BROWSER_TYPE.FIREFOX}function isIE(){return getBrowser()==BROWSER_TYPE.IE}function getElementById2(e,t){var n=document.getElementById(e)
return null==n?(t&&jslog(JSLOG_ERR,"[util.js getElementById] NOT FOUND Id="+e),0):n}function getElementById3(e,t,n){var r=document.getElementById(e)
return null==r?(t&&jslog(JSLOG_ERR,n+" util.getElementById NOT FOUND Id="+e),0):r}function getElementById(e){return getElementById2(e,!0)}function getElementByTag2(e,t,n){return getElementBySpanId2(t,e,n)}function getFirstFsByBlock(e,t){var n="[util.js getFieldset2] ",r=getElementById2(e,t)
if(!r)return 0
try{var l=r.getElementsByTagName("FIELDSET")
return l.length?l[0]:0}catch(o){}t&&jslog(WARNING,n+"NOT FOUND FiledSet in Block="+e)}function getElementBySpanId2(e,t,n){if("button"==t.toLowerCase()){var r=getButtonBySpanId2(e,n)
if(r)return r}var l="[util.js getElementBySpanId2] ",o=document.getElementById(e)
if(null==o)return showErrIfRequired(n,l+" NOT FOUND SpanId="+e,0)
var i=o.getElementsByTagName(t)
if(null==i||!i.length)return showErrIfRequired(n,l+" NOT FOUND Elements with Tag="+t+" for SpanId="+e,0)
var s=i[i.length-1]
return s}function getElementOfClassBySpanId2(e,t,n,r){var l="[util.js getElementOfClassBySpanId2] ",o=document.getElementById(e)
if(null==o)return showErrIfRequired(r,l+" NOT FOUND SpanId="+e,0)
var i=o.getElementsByTagName(t)
if(null==i||!i.length)return showErrIfRequired(r,l+" NOT FOUND Elements with Tag="+t+" for SpanId="+e,0)
for(var s=!1,a=0,u=0;!s&&u<i.length;u++)a=i[u],a.className==n&&(s=!0)
return s?a:showErrIfRequired(r,l+" NOT FOUND Elements with Tag="+t+" and Class="+n+" for SpanId="+e,0)}function getBlockBySpanId2(e,t){var n=getElementById2(e,t)
return n?n.firstChild:0}function getButtonBySpanId2(e,t){var n="[util.js getButtonBySpanId2] "
jslog(JSLOG_BASE,n+JSLOG_FUN_START),jslog(JSLOG_BASE,n+"IN: SpanId="+e+'"')
var r=document.getElementById(e)
if(null==r)return showErrIfRequired(t,n+" NOT FOUND SpanId="+e,0)
var l=r.getElementsByTagName("INPUT")
if(null!=l&&l.length||(l=r.getElementsByTagName("BUTTON")),null==l||!l.length)return showErrIfRequired(t,n+" NOT FOUND Elements with Tag=INPUT/BUTTON for SpanId="+e,0)
for(var o=0;o<l.length;o++)try{if("button"==l[o].type.toLowerCase())return jslog(JSLOG_BASE,n+"OUT: El  Id="+l[o].id+"  Name="+l[o].name),l[o]}catch(i){}return showErrIfRequired(t,n+" NOT FOUND Button for SpanId="+e,0),0}function getFieldset2(e,t){var n="[util.js getFieldset2] "
try{for(var r=document.getElementsByTagName("FIELDSET"),l=0;l<r.length;l++){var o=r[l],i=o.firstChild
if(i){var s=i.tagName
if("LEGEND"==s){var a=String(i.innerHTML)
if(a.split(e).length>1)return jslog(JSLOG_BASE,n+"FOUND  Caption="+e+" in textContent="+a),r[l]}}}}catch(u){}return t&&jslog(WARNING,n+"NOT FOUND Caption="+e),0}function getFieldset(e){return getFieldset2(e,!1)}function localeGetGroupSep(){var e="[util.js localeGetGroupSep] ",t=1234,n=t.toLocaleString(),r=n.charAt(1)
return"2"==r&&(r=""),jslog(JSLOG_BASE,e+"GroupSeparetor="+r),r}function localeGetDecimalSep(){var e="[util.js localeGetDecimalSep] ",t=1.23,n=t.toLocaleString(),r=n.charAt(1)
return"2"==r&&(r=".",jslog(JSLOG_ERR,e+"DecimalSeparetor NOT found. Used default = "+r)),jslog(JSLOG_BASE,e+"DecimalSeparetor="+r),r}function strReplaceAll(e,t,n){for(var r=e;r.indexOf(t)>=0;)r=r.replace(t,n)
return r}function str2Num(e,t,n){if(NumStr2=e,"undefined"!=typeof t&&t.length)for(;NumStr2.indexOf(t)>-1;)NumStr2=NumStr2.replace(t,"")
return"undefined"!=typeof n&&"."!=n&&(NumStr2=NumStr2.replace(n,".")),Num=parseFloat(NumStr2),isNaN(Num)&&(Num=0),Num}function num2StrPad(e,t,n){var r=n-e.toString().length+1
return Array(+(r>0&&r)).join("0")+e}function html2Str(e){var t=new String("")
e=strReplaceAll(e,"&nbsp;"," ")
for(var n=0;n<e.length;n++){var r=e.charCodeAt(n),l=e.charAt(n)
r==NBSP_CODE&&(l=" "),t+=l}return t}function objSerialize(e){return JSON.stringify(e,null,0)}function objDeserialize(e){var t
return t=void 0==e||0==e.length?new Object:JSON.parse(e)}function obj2URI(e){return encodeURIComponent(objSerialize(e))}function objFromURI(e){var t,n=e
if(void 0==n||0==n.length)t=new Object
else{var n=decodeURIComponent(e)
t=objDeserialize(n)}return t}function obj2URIQueryString(e){var t=encodeURIComponent(objSerialize(e))
return t.length?"?"+t:""}function objFromURIQueryString(e){return e.length?objFromURI(e.substr(1)):null}function selectGetFirstIndWithVal(e,t){var n="[util.js selectGetFirstIndWithVal] "
if(!e)return jslog(JSLOG_BASE,n+" Select is NULL!"),-1
for(i=0;i<e.options.length;i++)if(Opt=e[i],Opt.value.indexOf(t)>-1)return jslog(JSLOG_BASE,n+" Value="+t+"  First contained in opt["+i+"]"),i
return jslog(JSLOG_BASE,n+" Value="+t+"  is not contained in any opt of select"),-1}function select2ar(e,t){var n="[util.js select2ar] "
for(i=0;i<t.length;i++)t.pop()
if(!e)return jslog(JSLOG_BASE,n+" Select is NULL!"),-1
for(i=0;i<e.options.length;i++)Opt=e[i],t[i]=new cOpt(Opt.text,Opt.value)
return t.length}function select2arFromInd(e,t,n){var r="[util.js select2arFromInd] "
for(jslog(JSLOG_BASE,r+JSLOG_FUN_START),jslog(JSLOG_BASE,r+" IN iSelectStartInd="+t),i=0;i<n.length;i++)n.pop()
if(!e)return jslog(JSLOG_BASE,r+" Select is NULL!"),-1
for(iAr=0,i=t;i<e.options.length;i++,iAr++)Opt=e[i],n[iAr]=new cOpt(Opt.text,Opt.value)
return jslog(JSLOG_BASE,r+" RETURN _ArOpt.length="+n.length),jslog(JSLOG_BASE,r+JSLOG_FUN_END),n.length}function select2arTillInd(e,t,n){var r="[util.js select2arFromInd] "
for(jslog(JSLOG_BASE,r+JSLOG_FUN_START),jslog(JSLOG_BASE,r+" IN iSelectEndInd="+t),i=0;i<n.length;i++)n.pop()
if(!e)return jslog(JSLOG_BASE,r+" Select is NULL!"),-1
for(iAr=0,i=0;i<e.options.length&&i<=t;i++,iAr++)Opt=e[i],n[iAr]=new cOpt(Opt.text,Opt.value)
return jslog(JSLOG_BASE,r+" RETURN _ArOpt.length="+n.length),jslog(JSLOG_BASE,r+JSLOG_FUN_END),n.length}function selectGetSelectedNum(e){var t="[util.js selectGetSelectedNum] "
if(!e)return jslog(WARNING,t+" Select is NULL!"),-1
for(var n=0,r=e.options.length,l=0;r>l;l++){var o=e[l]
o.selected&&n++}return n}function selectGetTextFromValue(e,t,n){var r="[util.js selectGetTextFromValue] "
if(!e)return jslog(JSLOG_BASE,r+" Select is NULL - RETURN DefText="+n),n
for(var l=0;l<e.options.length;l++){var o=html2Str(e[l].value)
if(o==t){var i=html2Str(e[l].text)
return jslog(JSLOG_BASE,r+"Value="+t+"  FOUND - RETURN Text="+i),i}}return jslog(JSLOG_BASE,r+" Value="+t+"  NOT FOUND - RETURN DefText="+n),n}function selectRemoveAllOption(e){if(0!=e)for(i=e.length-1;i>=0;i--)e[i]=null}function selectRemoveOption(e,t){if(0!=e)for(i=e.length-1;i>=t;i--)e[i]=null}function selectSelValue(e,t){var n="[util.js selectSelValue] "
if(!e)return jslog(WARNING,n+" Select is NULL!"),-1
for(var r=0;r<e.options.length;r++){var l=e[r],o=html2Str(l.value)
if(o==t)return l.selected=!0,e.selectedIndex=r,r}return jslog(JSLOG_BASE,n+" NOT FOUND Value="+t+"  in "+e.name),-1}function selectRemoveCognosEl(e){removeExtraItems(e)}function selectRemoveValue(e,t){var n="[util.js selectRemoveValue] "
if(!e)return jslog(WARNING,n+" Select is NULL!"),-1
for(var r=0;r<e.options.length;r++){var l=e[r],o=html2Str(l.value)
if(o==t)return jslog(JSLOG_BASE,n+" Found Value="+t+"  in "+e.name+"   Text="+l.text+"\n SelInd="+r+"      NOW REMOVING IT"),e[r]=null,r}return jslog(JSLOG_BASE,n+" NOT FOUND Value="+t+"  in "+e.name),-1}function selectRemoveAll(e){var t="[util.js selectRemoveAll] ",n=0
if(!e)return jslog(WARNING,t+" Select is NULL!"),-1
for(n=e.length-1;n>=0;n--)e[n]=null}function selectIsMulti(e){return e.multiple}function selectRemoveExtraItems(e){var t="[util.js selectGetTextFromValue] "
if(e&&!(e.options.length<1))try{var n=e.childNodes[1].text
if(n.match("----"))return e.remove(1),e.remove(0),e.removeAttribute("hasLabel"),void jslog(JSLOG_BASE,t+"Succesfully Removed 2 Extra Items from Select "+e.name)}catch(r){}}function selectSelText(e,t){var n="[util.js selectSelText] "
if(!e)return jslog(WARNING,n+" Select is NULL!"),-1
for(var r=0;r<e.options.length;r++){var l=e[r],o=html2Str(l.text)
if(o==t)return jslog(JSLOG_BASE,n+" SELECT Found Text="+t+"  in "+e.name+"\nValue="+l.value+"\nRETURN SelInd="+r),l.selected=!0,r}return jslog(JSLOG_BASE,n+" NOT FOUND Text="+t+"  in "+e.name),-1}function selectGetTextOfValue(e,t){var n="[util.js selectGetTextOfValue] "
if(!e)return jslog(WARNING,n+" Select is NULL!"),"Select is NULL"
for(var r=0;r<e.options.length;r++){var l=e[r],o=html2Str(l.value)
if(o==t){var i=html2Str(l.text)
return jslog(JSLOG_BASE,n+" Found Value="+t+"   Text="+i),i}}return t+" NOT FOUND"}function selectGetValueOfText(e,t){var n=html2Str(t),r="[util.js selectGetValueOfText] "
if(!e)return jslog(WARNING,r+" Select is NULL!"),"Select is NULL"
for(var l=0;l<e.options.length;l++){var o=e[l],i=html2Str(o.text)
if(i==n){var s=html2Str(o.value)
return jslog(JSLOG_BASE,r+" Found Text="+n+"   Value="+s),s}}return t+" NOT FOUND"}function selectGelSelectedStatus(e,t){var n="[util.js selectSelValue] ",r=!1
if(!e)return jslog(WARNING,n+" Select is NULL!"),r
for(var l=0;l<e.options.length;l++){var o=e[l],i=html2Str(o.value)
if(i==t)return o.selected}return r}function selectGetDesc(e){for(var t=new String("name: "+e.name+"\n\ntext      value\n\n"),n=0;n<e.options.length;n++){var r=e[n],l=new String("\n"+r.text+"     "+r.value)
t+=l}return t}function appendOptionLast(e,t,n){var r=new Option(t,n)
e[e.length]=r,r.dv=t}function appendOptionSelLast(e,t,n,r){if(appendOptionLast(e,t,n),r){var l=e[e.length-1]
l.selected=!0}}function selectGetList(e,t){var n="[util.js selectGetList] "
if(!e)return jslog(JSLOG_BASE,n+"Select =0 NOTHING to DO")
t.length=0
for(var r=0,l=0;l<e.options.length;l++){var o=e.options[l]
t[r++]=o.value}return t.length}function selectGetSelList(e,t){var n="[util.js selectGetSelList] "
if(!e)return jslog(JSLOG_BASE,n+"Select =0 NOTHING to DO")
t.length=0
for(var r=0,l=0;l<e.options.length;l++){var o=e.options[l]
o.selected&&(t[r++]=o.value)}return t.length}function selectGetSelNum(e){var t="[util.js selectGetSelNum] ",n=0
if(!e)return jslog(JSLOG_BASE,t+"Select =0 NOTHING to DO"),0
for(var r=0;r<e.options.length;r++){var l=e.options[r]
l.selected&&n++}return jslog(JSLOG_BASE,t+"  return  iSelNum="+n),n}function selectGetOptNum(e){var t="[util.js selectGetOptNum ] "
return e?e.options.length:(jslog(JSLOG_BASE,t+"Select =0  return 0"),0)}function selectGetNumFilterEl(e){var t="[util.js selectGetNumFilterEl] ",n=selectGetSelNum(e)
if(0>n)return 0
var r=n>0?n:e.options.length
return jslog(JSLOG_BASE,t+"iSelNNum="+n+"  return  iNumFilterEl="+r),r}function selectGetSelLabels(e){var t="[util.js selectGetSelList] ",n="",r=!0
if(!e)return jslog(JSLOG_BASE,t+"Select =0 NOTHING to DO")
for(var l=0;l<e.options.length;l++){var o=e.options[l]
o.selected&&(r?(n=o.text,r=!1):n=n+", "+o.text)}return n}function selectGetSelValues(e,t){var n="[util.js selectGetSelValues] ",r="",l=!0
if(void 0==t&&(t=!1),!e)return jslog(JSLOG_BASE,n+"Select =0 NOTHING to DO")
for(var o=0;o<e.options.length;o++){var i=e.options[o]
if(i.selected){var s=i.value
t&&(s="'"+s+"'"),l?(r=s,l=!1):r=r+", "+s}}return r}function selectGetValues(e){var t="[util.js selectGetValues] ",n="",r=!0
if(!e)return jslog(JSLOG_BASE,t+"Select =0 NOTHING to DO")
for(var l=0;l<e.options.length;l++){var o=e.options[l]
r?(n=o.value,r=!1):n=n+", "+o.value}return n}function selectDeselectAll(e){var t="[util.js selectDeselectAll] "
return e?void(-1!=e.selectedIndex&&(e.selectedIndex=-1)):jslog(JSLOG_BASE,t+"Select =0 NOTHING to DO")}function selectSelectAll(e){var t="[util.js selectSelectAll] "
if(!e)return jslog(JSLOG_BASE,t+"Select =0 NOTHING to DO")
for(var n=0;n<e.options.length;n++){var r=e.options[n]
r.selected=!0}}function selectGetSelVal(e,t){var n=SELECT_NOVALUE_SEL
if(void 0==t&&(t=!1),!e)return n
var r=e.selectedIndex
return 0>r?n:(n=html2Str(e.options[r].value),t&&n.length&&(n="'"+n+"'"),n)}function selectGetSelText(e){var t=SELECT_NOVALUE_SEL
if(!e)return t
var n=e.selectedIndex
return 0>n?t:html2Str(e.options[n].text)}function selectAddFilterCond(e,t,n){var r=n.length<4?" ":" AND ",l="[util.js selectAddFilterCond] "
jslog(JSLOG_BASE,l+JSLOG_FUN_START),jslog(JSLOG_BASE,l+"IN: szFilter="+n)
var o=new Array,i=(new Array,selectGetSelList(e,o))
return 1==i?n+=r+t+" = "+o[0]:i>1&&(n+=r+t+" IN ("+ar2List(o)+")"),jslog(JSLOG_BASE,l+"OUT: szFilter="+n),jslog(JSLOG_BASE,l+JSLOG_FUN_END),n}function getSelAllEl(e,t,n){var r="[util.js getSelAllEl] "
jslog(JSLOG_BASE,r+JSLOG_FUN_START),jslog(JSLOG_BASE,r+"IN szBlockId="+e)
var l=0,o=document.getElementById(e)
return null==o?showErrIfRequired(n,r+" NOT FOUND BlockId="+e,1):(ElList=o.getElementsByTagName("A"),null==ElList||2!=ElList.length?showErrIfRequired(n,r+" NOT FOUND the 2 Elements with Tag A for BlockId="+e,1):(t[l++]=ElList[0],t[l++]=ElList[1],jslog(JSLOG_BASE,r+JSLOG_FUN_END),0))}function filterSelAllEl2R(e,t){var n="[util.js filterSelAllEl2R] "
jslog(JSLOG_BASE,n+JSLOG_FUN_START),jslog(JSLOG_BASE,n+"IN szFilterNameId="+e)
var r=new Array
getSelAllEl("blockFilter"+e,r,t)
var l=new Array("spanSelectAll"+e,"spanDeselectAll"+e)
for(iAr=0;iAr<2;iAr++){var o=getElementById2(l[iAr],t)
o.appendChild(r[iAr]),r[iAr].style.fontSize="8pt"}return 0}function setCursorWait(e){var t=e?"wait":"default"
document.body.style.cursor=t
for(var n=new Array("IMG","TD","INPUT","BUTTON","SELECT"),r=0;r<n.length;r++)for(var l=n[r],o=document.getElementsByTagName(l),i=0;i<o.length;i++){var s=o[i]
s.style.cursor=t}}function loadingShowIn1ElId(e,t){var n=getElementById2(e,!0)
loadingShowIn1El(n,t)}function loadingShowIn1El(e,t){e&&classAdd(e,"jsuLoadingEl",t)}function loadingGetEl(){return getElementById2(ID_DIV_LOADING_IMG,!1)}function loadingShowByEl(e,t){e&&(classAdd(e,"jsuLoading",t),elementShow(e,t))}function loadingShow(e){var t=getElementById2(ID_DIV_LOADING_IMG,!1)
t&&(classAdd(t,"jsuLoading",e),elementShow(t,e))}function alarmShowIn1ElId(e,t){var n=getElementById2(e,!0)
return alarmShowIn1El(n,t)}function alarmShowIn1El(e,t){return e&&classAdd(e,"jsuAlarmingEl",t),1}function classAdd(e,t,n){var r=e.className
void 0==r&&(r="")
var l=r.indexOf(t)>=0
n?l||(r=""==r?t:r+" "+t):(r=r.replace(" "+t,""),r=r.replace(t,"")),e.className=r}function ts_getInnerText(e){if("string"==typeof e)return e
if("undefined"==typeof e)return e
if(e.innerText)return e.innerText
for(var t="",n=e.childNodes,r=n.length,l=0;r>l;l++)switch(n[l].nodeType){case 1:t+=ts_getInnerText(n[l])
break
case 3:t+=n[l].nodeValue}return t}function elementShowBySpan(e,t){var n=getElementById2(e,!1)
n&&elementShow(n,t)}function elementIsVisibleBySpan(e){var t=!1,n=getElementById2(e,!1)
return n&&(t="hidden"!=n.style.visibility),t}function elementShow(e,t,n){0!=e&&void 0!=e&&(void 0==n&&(n="block"),t?(e.style.visibility="visible",e.style.display=n):(e.style.visibility="hidden",e.style.display="none"))}function elementGetWinCoords(e){var t=e.getBoundingClientRect(),n=document.body,r=document.documentElement,l=window.pageYOffset||r.scrollTop||n.scrollTop,o=window.pageXOffset||r.scrollLeft||n.scrollLeft,i=r.clientTop||n.clientTop||0,s=r.clientLeft||n.clientLeft||0,a=t.top+l-i,u=t.left+o-s
return{top:Math.round(a),left:Math.round(u),height:e.clientHeight,width:e.clientWidth}}function addLoadEvent(e){var t=window.onload
"function"!=typeof window.onload?window.onload=e:window.onload=function(){t(),e()}}function createCookie(e,t,n){var r=""
if(n){var l=new Date
l.setTime(l.getTime()+24*n*60*60*1e3),r="; expires="+l.toGMTString()}try{document.cookie=e+"="+t+r+"; path=/"}catch(o){}}function readCookie(e){var t=e+"="
try{for(var n=document.cookie.split(";"),r=0;r<n.length;r++){for(var l=n[r];" "==l.charAt(0);)l=l.substring(1,l.length)
if(0==l.indexOf(t))return l.substring(t.length,l.length)}}catch(o){}return null}function eraseCookie(e){createCookie(e,"",-1)}function getRequestParameter(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]")
var t="[util.js \\?&]"+e+"=([^&#]*)",n=new RegExp(t),r=unescape(window.location.href),l=n.exec(r)
return null==l?"":l[1]}function getElementsWithSameId(e){for(var t=[],n=document.getElementById(e);n;)t.push(n),n.id="",n=document.getElementById(e)
for(var r=0;r<t.length;r++)t[r].id=e
return t}function spanSetTextById(e,t,n){var r=getElementById2(e,n)
r&&spanSetText(r,t)}function spanGetTextById(e,t){var n=getElementById2(e,t)
return n?spanGetText(n):"szSpanId="+e+"  NOT FOUND"}function spanSetText(e,t){e&&(e.firstChild.innerHTML=t)}function spanGetText(e){if(0==e||0==e.firstChild)return""
var t=e.firstChild.innerHTML
return t.replace("&nbsp;","")}function blockSetPad(e,t){var n="[util.js blockSetPad] ",r=getBlockBySpanId2(e,!0)
return 0==r?showErr(n+"NOT Find szBlock="+e,1):(r.style.padding=t,0)}function blockRangeReset(e,t){var n="[util.js blockRangeReset] "
jslog(JSLOG_BASE,n+JSLOG_FUN_START),jslog(JSLOG_BASE,n+" IN: szBlock="+e)
var r=document.getElementById(e)
if(null==r)return showErrIfRequired(t,n+" NOT FOUND szBlock="+e,1)
var l=r.getElementsByTagName("INPUT")
if(null==l||!l.length)return showErrIfRequired(t,n+" NOT FOUND Elements with Tag INPUT for szBlock="+e,1)
for(var o=(l.length-1,new Array),i=new Array,s=0,a=0,u=0;u<l.length;u++){var c=l[u]
"radio"==c.type?o[s++]=c:"text"==c.type&&(i[a++]=c)}return jslog(JSLOG_BASE,n+" Found "+s+" RB  and "+a+" TEXT"),4!=s||2!=a?(jslog(JSLOG_BASE,n+" Wrong Number of RB or TEXT, cannot continue"),1):(o[1].checked=!0,o[3].checked=!0,i[0].value="",i[1].value="",jslog(JSLOG_BASE,n+JSLOG_FUN_END),0)}function ar2List(e){var t="",n=e.length
if(!n)return t
t=e[0]
for(var r=1;n>r;r++)t+=","+e[r]
return t}function arTrace(e,t,n){var r=t.length
jslog(e,n+".length = "+r)
for(var l=0;r>l;l++)jslog(e,n+"[util.js "+l+"] = "+t[l])}function selectCheckNumItem(e,t,n,r,l,o){var i="[util.js filterCheckNumItem] "
if(jslog(JSLOG_BASE,i+JSLOG_FUN_START),0==n)return showErr("Fn="+i+" Select is null",1)
var s=n.type
if("undefined"==s||"select-multiple"!=s)return jslog(JSLOG_BASE,i+"NOTHING to CHECK: szFilterName="+e+" Is Not select-multiple. (select has select.type="+s+")"),0
var a=selectGetSelectedNum(n)
if(0==a&&o&&(a=n.options.length,jslog(JSLOG_BASE,i+"0 Selected - We set iSel = NumOfOptions="+a)),jslog(JSLOG_BASE,"szFilterName="+e+" iSelNum="+a+" iMinItem="+r+" iMaxItem="+l),a>l||r>a){var u=ERR_FILTER_MAX_ITEM_1+a+ERR_FILTER_MAX_ITEM_2+e+ERR_FILTER_MAX_ITEM_3+r+".."+l+"]"
return 0==r&&(u+=ERR_FILTER_MAX_ITEM_4+e+ERR_FILTER_MAX_ITEM_5+t+ERR_FILTER_MAX_ITEM_6),showErr(u,1)}return jslog(JSLOG_BASE,i+JSLOG_FUN_END),0}function cOpt(e,t){this.text=e,this.value=t}function showDebugFields(e){var t=["SPAN","DIV"]
jslog(JSLOG_INFO,"showDebugFields bShow="+e)
for(var n=0;n<t.length;n++)for(var r=document.getElementsByTagName(t[n]),l=0;l<r.length;l++){var o=r[l]
"debug"!=o.id&&"debug"!=o.className||elementShow(o,e)}}function checkObjDefined(e,t){return e?0:showErr("SW ERROR: "+t+" undefined",1)}function checkArVal(e,t,n){for(var r=0;r<t.length;r++)if(e==t[r])return 0
for(var l="ERROR:\n Value="+e+"\nIS NOT one of the Possible Values: [ ",r=0;r<t.length;r++)l+=t[r],r<t.length-1&&(l+=" , ")
return l+=" ]",void 0!=n&&(l+="\n\n"+n),showErr(l,1)}function sqlCondSelect(e,t,n){var r="[util.js sqlCondSelect] ",l=""
if(l=selectIsMulti(t)?selectGetSelValues(t,n):selectGetSelVal(t,n),l.length){var o=l.indexOf(",")>0
l=o?e+" IN ("+l+")":e+" = "+l}return jslog(JSLOG_BASE,r+"OUT szSql: "+l),l}function sqlCondFromToDate(e,t,n){var r="[util.js sqlCondFromTo] ",l=""
jslog(JSLOG_TEST,r+JSLOG_FUN_START)
var o=promptDateGetVal(t),i=promptDateGetVal(n),s=o.length>0,a=i.length>0,u=""
s&&(u=e+" >= TO_DATE('"+o+"','YYYY-MM-DD')")
var c=""
return a&&(c=e+" <= TO_DATE('"+i+"','YYYY-MM-DD')"),s&&a?l=u+" AND "+c:s?l=u:a&&(l=c),jslog(JSLOG_TEST,r+"return szSql="+l),jslog(JSLOG_TEST,r+JSLOG_FUN_END),l}function sqlAddCond(e,t,n){return e.length>0&&t.length>0?e+" AND "+t:t.length>0?t:e}function utilSetLanMsg(e){var t="[util.js utilSetLanMsg] "
lan_msg=e,jslog(JSLOG_INFO,t+"lan_msg="+lan_msg)}function dateIsoGetFirstDayCurYear(){var e=new Date
return e.getFullYear()+"-01-01"}function dateIsoGetLastDayLastYear(){var e=new Date
return e.getFullYear()-1+"-12-31"}function dateIsoGetCurDay(){var e=new Date,t=e.getMonth()+1,n=t>=10?""+t:"0"+t,r=e.getDate(),l=r>=10?""+r:"0"+r
return e.getFullYear()+"-"+n+"-"+l}function arPmtFromSelect(e){var t="[util.arPmtFromSelect] "
jslog(JSLOG_BASE,t+JSLOG_FILE_START)
var n=e.options.length
jslog(JSLOG_BASE,t+"iOptNum="+n)
for(var r=new Array,l=0;n>l;l++){var o=e.options[l],i=new Object,s=o.value.split(SELECT_VALUE_ID_SEP)
i.szId1=s[0],i.szId2=s[1],i.szTxt2=o.text,r.push(i)}return jslog(JSLOG_BASE,t+"return arAll.length= "+r.length),jslog(JSLOG_BASE,t+JSLOG_FILE_END),r}function arPmt2Select(e,t,n,r){var l="[util.arPmt2Select] "
jslog(JSLOG_BASE,l+JSLOG_FILE_START)
var o=e.length
jslog(JSLOG_BASE,l+"IN szId1="+t+"  arPmt with Len="+o)
var i=r?2:0
jslog(JSLOG_BASE,l+"Clear selectPmt bTutti="+r+" iPreserveFirstN="+i),selectRemoveOption(n,i),jslog(JSLOG_BASE,l+"INSERT Entry matching szId1="+t)
for(var s=0;o>s;s++){var a=e[s],u=a.szId1==t
u?(jslog(JSLOG_BASE,l+"["+s+"]="+a.szId1+" - ADDED: "+a.szId2+" "+a.szTxt2),appendOptionLast(n,a.szTxt2,a.szId2)):jslog(JSLOG_DUMP,l+"["+s+"]="+a.szId1+" - NOT ADDED: "+a.szId2+" "+a.szTxt2)}n.selectedIndex=0,n.disabled=!1,jslog(JSLOG_BASE,l+JSLOG_FILE_END)}function mapVal1ToVal2(e,t,n){for(var r=null,l=!1,o="",i=0;!l&&i<e.length;i++){var s=e[i][0],a=e[i][1]
s==t?(r=a,l=1):(i>0&&(o+=" , "),o+=a)}return!l&&n&&showErr("SW ERROR: "+t+" NOT FOUND in the List of Possible Values [ "+o+" ]",-1),r}function tipAddEvent(e){for(var t=["IMG","INPUT"],n=0;n<t.length;n++)for(var r=document.getelementsByTagName(t[n]),l=0;l<r.length;l++){for(var o=r[l],i=o.className,s=!1,a=0;!s&&a<e.length;a++)i==i[a]&&(s=!0)
s&&(o.onmouseover=function(){Tip(this.tip)},o.onmouseout=function(){UnTip()})}}var LAN_MSG_EN="EN",LAN_MSG_ITA="ITA",lan_msg=LAN_MSG_EN,SELECT_VALUE_ID_SEP=".",SELECT_NOVALUE_SEL="-1",TAG_SELECT="SELECT",ID_PREFIX_SELECT="selectList",ID_DIV_LOADING_IMG="jsuLoading",APP_NAME_FIREFOX="Netscape",APP_NAME_IE="Microsoft Internet Explorer",NBSP_CODE=160,DEF_COGNOS_GROUP_SEP=",",DEF_COGNOS_DECIMAL_SEP=".",VAL_CB_CHECKED="1",VAL_CB_UNCHECKED="0",BROWSER_TYPE={IE:"IE",FIREFOX:"FIREFOX",OTHER:"OTHER"}
