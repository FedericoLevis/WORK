/* =========================================================================================
@File:     					jslog.js
@Author:   					Federico Levis
@Since:  						Mar 2016   
Description: 				JS LOG Window
Required:						dom-drag.js  (in jsCommon)   

MAIN FUNCTIONs
      1) jslog_init  generic startup (e.g from Cognos, HTML, ..)
      2) jslog_start For WEB appication:  read jslog parameter  (e.h  jslog=15)


DISCLAIMER
Copyright by Federico Levis http://federicolevis.wix.com/cognos Cognos Tips & Solutions
All rights reserved: UNAUTHORIZED COPYING, REPRODUCTION, REPUBLISHING, UPLOADING, POSTING, TRANSMITTING OR DUPLICATING IS PROHIBITED
========================================================================================= */
function jslog_init(e,o){function l(e){return(e=new RegExp("[?&]"+encodeURIComponent(e)+"=([^&]*)").exec(location.search))?decodeURIComponent(e[1]):void 0}var n=0
if(e==JSLOG_LEV_URL){var s=l(JSLOG_LEV_URL_PAR)
if("undefined"!=typeof s)window.name=JSLOG_LEV_URL_PAR+"="+s
else{var t=window.name
t.indexOf(JSLOG_LEV_URL_PAR+"=")>-1&&(s=parseInt(t.substr(10)))}n="undefined"!=typeof s?s:0}else n=parseInt(e)
jslogConsoleStart(n,o)}function jslogLevSet(e){if(jslogVar.iLogLev=e,0==e)jslog_end()
else if(jslogVar.console){var o="Level="+e
jslogVar.console.labelTitle.innerHTML=o,jslogVar.console.selectLogLev.selectedIndex=e}}function jslogGetLogLev(){return jslogVar.iLogLev}function jslogGetOpt(){return{iLogLev:jslogVar.iLogLev,bLogTime:jslogVar.bLogTime,szPathImg:jslogVar.szPathImg}}function jslogObj(e,o,l,n){void 0!=n&&null!=n||(n=!1)
var s=n?0:2,t=n?": ":"\n"
return isLevelEnable(e)&&jslogVar.console&&jslogVar.console.send(e,o+t+JSON.stringify(l,null,s)),0}function _replaceAll(e,o,l){if("undefined"==typeof e)return""
for(;e.indexOf(o)>-1;)e=e.replace(o,l)
return e}function json2jslogStr(e){var o=_replaceAll(JSON.stringify(e),"},","} ,\n  ")
return o=_replaceAll(o,":[",":\n[\n  "),o=_replaceAll(o,"[{","[\n  {"),_replaceAll(o,"}]","}\n]\n  ")}function jslogJson(e,o,l){return isLevelEnable(e)&&jslogVar.console.send(e,o+"\n"+json2jslogStr(l)),0}function jslogElapsedTime(e,o,l){if(isLevelEnable(e)&&jslogVar.console){var n=new Date,s=n.getTime()-l.getTime(),t=s>1e3?s/1e3+" sec":s+" msec"
jslogVar.console.send(e,o+t)}return 0}function jslog(e,o){return isLevelEnable(e)&&jslogVar.console&&jslogVar.console.send(e,o),0}function jslog_end(){jslogVar.console&&jslogVar.console.killWindow()}function isLevelEnable(e){return(jslogVar.iLogLev&e||0==e)&&null!=jslogVar.console}function jslogConsoleStart(e,o){jslog_end(),jslogVar.iLogLev=e,0!=jslogVar.iLogLev&&(void 0!=o&&(void 0!=o.szPathImg&&(jslogVar.szPathImg=o.szPathImg),void 0!=o.bLogTime&&(jslogVar.bLogTime=o.bLogTime)),jslogVar.console={debugging_on:!1,window:null,viewport:null,buffer:"",debugVisible:!1,arBtnDebug:new Array,init:function(){if(document.getElementsByTagName&&document.getElementById&&document.createElement&&document.createTextNode){var e=document.getElementsByTagName("body")[0]
"undefined"!=typeof e&&(jslogVar.console.createWindow(),jslogVar.console.getCookie(),jslogVar.console.debugging_on=!0,jslogVar.console.setSize(JSLOG_SIZE_DEF))}},createWindow:function(){jslogVar.console.window=document.createElement("div"),jslogVar.console.window.style.background="#000",jslogVar.console.window.style.font='9pt "Lucida Grande", "Lucida Sans Unicode", sans-serif',jslogVar.console.window.style.padding="2px",jslogVar.console.window.style.position="absolute",jslogVar.console.window.style.top=WIN_JSLOG_TOP,jslogVar.console.window.style.left="0px",jslogVar.console.window.style.height=WIN_JSLOG_H,jslogVar.console.window.style.zIndex="100",jslogVar.console.window.style.minHeight="40px",jslogVar.console.window.style.width=WIN_JSLOG_W,jslogVar.console.window.style.minWidth="150px"
var e=document.createElement("span")
e.style.border="1px solid #000",e.style.cursor="pointer",e.style.color="#000",e.style.display="block",e.style.lineHeight=".5em",e.style.padding="0 0 3px",e.style.position="absolute",e.style.top="4px",e.style.right="4px",e.setAttribute("title","Close jslogVar.console Debugger"),e.appendChild(document.createTextNode("x")),jslogVar.console.addEvent(e,"click",function(){jslogVar.console.killWindow()}),jslogVar.console.window.appendChild(e)
var o=document.createElement("div")
o.style.position="absolute",o.style.bottom="3px",o.style.right="3px"
var l=document.createElement("span")
l.style.border="5px solid #ccc",l.style.borderLeftColor=l.style.borderTopColor="#000",l.style.cursor="pointer",l.style.color="#ccc",l.style.display="block",l.style.height="0",l.style.width="0",l.style.overflow="hidden",l.setAttribute("title","Resize the jslogVar.console Debugger"),"undefined"!=typeof Drag&&(l.xFrom=0,l.yFrom=0,Drag.init(l,null,null,null,null,null,!0,!0),l.onDrag=function(e,o){jslogVar.console.resizeX(e,this),jslogVar.console.resizeY(o,this),jslogVar.console.adjustViewport()},l.onDragEnd=function(){jslogVar.console.setCookie()},o.appendChild(l),jslogVar.console.window.appendChild(o))
var n=document.createElement("h3")
n.className="jslog",jslogVar.console.appendAllBtn(n,!1),n.appendChild(jslogVar.console.getGroupSep("    ")),jslogVar.console.labelTitle=document.createElement("label"),jslogVar.console.labelTitle.className="jslog",jslogVar.console.labelTitle.innerHTML="Level="+jslogVar.iLogLev,n.appendChild(jslogVar.console.labelTitle),jslogVar.console.window.appendChild(n)
var s=document.createElement("div")
s.className="jslogFooter",jslogVar.console.appendAllBtn(s,!0),jslogVar.console.window.appendChild(s),jslogVar.console.viewport=document.createElement("pre"),jslogVar.console.viewport.style.border="1px solid #ccc",jslogVar.console.viewport.style.color="#ebebeb",jslogVar.console.viewport.style.textAlign="left",jslogVar.console.viewport.style.fontSize="1.2em",jslogVar.console.viewport.style.margin="0",jslogVar.console.viewport.style.padding="0 3px",jslogVar.console.viewport.style.position="absolute",jslogVar.console.viewport.style.top="25px",jslogVar.console.viewport.style.left="2px",jslogVar.console.viewport.style.overflow="auto",jslogVar.console.adjustViewport(),jslogVar.console.window.appendChild(jslogVar.console.viewport),document.getElementsByTagName("body")[0].appendChild(jslogVar.console.window),"undefined"!=typeof Drag&&(Drag.init(n,jslogVar.console.window),jslogVar.console.window.onDragEnd=function(){jslogVar.console.setCookie()})},resizeX:function(e,o){var l=parseInt(jslogVar.console.window.style.width),n=Math.abs(l-(e-o.xFrom))+"px"
parseInt(n)<parseInt(jslogVar.console.window.style.minWidth)&&(n=jslogVar.console.window.style.minWidth),jslogVar.console.window.style.width=n,o.xFrom=e},resizeY:function(e,o){var l=parseInt(jslogVar.console.window.style.height),n=Math.abs(l-(e-o.yFrom))+"px"
parseInt(n)<parseInt(jslogVar.console.window.style.minHeight)&&(n=jslogVar.console.window.style.minHeight),jslogVar.console.window.style.height=n,o.yFrom=e},adjustViewport:function(){jslogVar.console.viewport.style.width=parseInt(jslogVar.console.window.style.width)-8+"px",jslogVar.console.viewport.style.height=parseInt(jslogVar.console.window.style.height)-50+"px"},send:function(e,o){for(o+="<br />";o.indexOf("\n")>-1;)o=o.replace("\n","<br />")
var l=""
if(jslogVar.bLogTime){var n=new Date
l=jslogVar.console.num2StrPad(n.getHours(),"0",2)+":"+jslogVar.console.num2StrPad(n.getMinutes(),"0",2)+":"+jslogVar.console.num2StrPad(n.getSeconds(),"0",2)+"."+jslogVar.console.num2StrPad(n.getMilliseconds(),"0",3)+" "}o=l+"["+e+"] "+o,null==jslogVar.console.viewport?jslogVar.console.buffer+=o:(jslogVar.console.viewport.innerHTML+=o,jslogVar.console.scrollWithIt())},sendBuffer:function(){null==jslogVar.console.viewport?jslogVar.console.timer=window.setTimeout("jslogVar.console.sendBuffer()",500):(jslogVar.console.viewport.innerHTML+=jslogVar.console.buffer,jslogVar.console.scrollWithIt(),jslogVar.console.killTimer())},scrollWithIt:function(){jslogVar.console.viewport.scrollTop=jslogVar.console.viewport.scrollHeight},killWindow:function(){jslogVar.console.window.parentNode.removeChild(jslogVar.console.window),jslogVar.console.debugging_on=!1,jslogVar.console=null,window.name=JSLOG_LEV_URL_PAR+"=0"},setCookie:function(){var e=jslogVar.console.window.style.top+" "+jslogVar.console.window.style.left,o=jslogVar.console.window.style.height+" "+jslogVar.console.window.style.width
document.cookie="jslogVar.console="+escape(e+" "+o)},getCookie:function(){if(document.cookie){var e=document.cookie,o=e.indexOf("jslogVar.console=")
if(-1!=o){var l=o+"jslogVar.console=".length,n=e.indexOf(";",l),s=-1!=n?e.substring(l,n):e.substring(l)
s=unescape(s)
var t=s.split(" ")
jslogVar.console.window.style.top=t[0],jslogVar.console.window.style.left=t[1],jslogVar.console.window.style.height=t[2],jslogVar.console.window.style.width=t[3],jslogVar.console.adjustViewport()}}},timer:null,killTimer:function(){clearTimeout(jslogVar.console.timer)},addEvent:function(e,o,l){e.addEventListener?e.addEventListener(o,l,!1):e.attachEvent&&(e["e"+o+l]=l,e[o+l]=function(){e["e"+o+l](window.event)},e.attachEvent("on"+o,e[o+l]))},removeEvent:function(e,o,l){e.removeEventListener?e.removeEventListener(o,l,!1):e.detachEvent&&(e.detachEvent("on"+o,e[o+l]),e[o+l]=null,e["e"+o+l]=null)},appendAllBtn:function(e,o){var l=new Array
e.appendChild(jslogVar.console.getImgPos("arrowTopLeft.jpg","Move JSConsole to TOP LEFT CORNER",JSLOG_POS_TOPLEFT)),e.appendChild(jslogVar.console.getImgPos("arrowBottomRight.jpg","Move JSConsole to BOTTOM RIGHT LEFT CORNER",JSLOG_POS_BOTTOMRIGHT)),e.appendChild(jslogVar.console.getImgPos("arrowLeft.jpg","Move JSConsole to LEFT SIDE",JSLOG_POS_LEFT)),e.appendChild(jslogVar.console.getImgPos("arrowRight.jpg","Move JSConsole to the RIGHT SIDE",JSLOG_POS_RIGTH)),e.appendChild(jslogVar.console.getImgPos("arrowTop.jpg","Move JSConsole to the TOP",JSLOG_POS_TOP)),e.appendChild(jslogVar.console.getImgPos("arrowBottom.jpg","Move JSConsole to the BOTTOM",JSLOG_POS_BOTTOM)),e.appendChild(jslogVar.console.getGroupSep(""))
var n=new Array,s=30
n.push(["XS",s,"Size SX",function(){jslogVar.console.setSize(JSLOG_SIZE_XS)}]),n.push(["S",s,"Size S",function(){jslogVar.console.setSize(JSLOG_SIZE_S)}]),n.push(["M",s,"Size M",function(){jslogVar.console.setSize(JSLOG_SIZE_M)}]),n.push(["L",s,"Size L",function(){jslogVar.console.setSize(JSLOG_SIZE_L)}]),n.push(["XL",s,"Size XL",function(){jslogVar.console.setSize(JSLOG_SIZE_XL)}])
for(var t=0;t<n.length;t++){var r=jslogVar.console.getBtn(n[t])
e.appendChild(r),e.appendChild(jslogVar.console.getBtnSep())}e.appendChild(jslogVar.console.getGroupSep("")),l.push(["Clear",60,"Clear the Window",function(){jslogVar.console.clearWindow()}]),l.push(["Delimiter",70,"Add a Separator Delimet",function(){jslogVar.console.sendDelimeter()}]),jslogVar.console.isIE()?l.push(["CopyToClipboard",120,"Copy To Clipboard All the  contain of the  Window",function(){jslogVar.console.copy2Clipboard()}]):l.push(["SelectAll",70,"Select ALL",function(){jslogVar.console.selectAll()}])
for(var t=0;t<l.length;t++){var r=jslogVar.console.getBtn(l[t])
e.appendChild(r),e.appendChild(jslogVar.console.getBtnSep())}e.appendChild(jslogVar.console.getGroupSep(""))
var i=jslogVar.console.getBtn(["Show debug Fields",130,'Show hidden fields having class="debug" or id="debug"',function(){var e,o
jslogVar.console.debugVisible?(jslogVar.console.debugVisible=!1,e="Show "+JSLOG_ID_DEBUG+" Fields",o='Show hidden fields having class="'+JSLOG_ID_DEBUG+'" or id="'+JSLOG_ID_DEBUG+'"'):(jslogVar.console.debugVisible=!0,e="Hide "+JSLOG_ID_DEBUG+"Fields",o='Hide again Debug fields having class="'+JSLOG_ID_DEBUG+'" or id="'+JSLOG_ID_DEBUG+'"')
for(var l=0;l<jslogVar.console.arBtnDebug.length;l++){var n=jslogVar.console.arBtnDebug[l]
n.value=e,n.title=o}for(var s=["SPAN","DIV","TABLE"],t=0;t<s.length;t++)for(var r=document.getElementsByTagName(s[t]),l=0;l<r.length;l++){var i=r[l]
"debug"!=i.id&&"debug"!=i.className||(jslogVar.console.debugVisible?i.style.display="block":i.style.display="none")}}])
if(e.appendChild(i),jslogVar.console.arBtnDebug.push(i),e.appendChild(jslogVar.console.getGroupSep("")),o){var a=document.createElement("label")
a.className="jslogFooter",a.innerHTML="SETTINGS: ",e.appendChild(a)
var c=document.createElement("select")
c.className="jslog"
for(var t=0;31>=t;t++){var g="LogLevel="+t
0==t&&(g="CLOSE JSLOG")
var d=new Option(g,t)
d.dv=g,d.selected=jslogVar.iLogLev==t,c[c.length]=d}jslogVar.console.addEvent(c,"change",function(){jslogLevSet(this.selectedIndex)}),e.appendChild(c),jslogVar.console.selectLogLev=c
var p=document.createElement("select")
p.className="jslog"
for(var j=[["0","NO Time"],["1","Log Time"]],t=0;t<j.length;t++){var g=j[t][1],d=new Option(g,j[t][0])
d.dv=g,d.selected=!jslogVar.bLogTime&&0==t||jslogVar.bLogTime&&1==t,p[p.length]=d}jslogVar.console.addEvent(p,"change",function(){jslogVar.bLogTime=1==this.selectedIndex}),e.appendChild(p)}},sendDelimeter:function(){jslogVar.console.send('<span style="color: #f00">*******************************</span>')},selectAll:function(){if(document.selection){var e=document.body.createTextRange()
e.moveToElementText(jslogVar.console.window),e.select()}else if(window.getSelection){var e=document.createRange()
e.selectNode(jslogVar.console.window),window.getSelection().addRange(e)}},copy2Clipboard:function(){for(var e=0,o=""+jslogVar.console.viewport.innerHTML;o.indexOf("<BR>")>-1;)o=o.replace("<BR>","\n"),e++
for(;o.indexOf("<br>")>-1;)o=o.replace("<br>","\n"),e++
var l=document.createElement("TextArea")
return l.innerText=o,"undefined"==typeof l.createTextRange?void alert("copy2Clipboard NOT supported for This Browser - Supported Browser for COPY to Clipboard: IE.To Copy to Clipboard Please use SelectAll or CTRL-C  CTRL-V"):(Copied=l.createTextRange(),Copied.execCommand("RemoveFormat"),void Copied.execCommand("Copy"))},isIE:function(){try{return"Microsoft Internet Explorer"==navigator.appName||"Netscape"==navigator.appName&&null!=new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent)}catch(e){return!1}},getBtn:function(e){var o=document.createElement("input")
return o.className="jslogButton",o.setAttribute("type","button"),o.setAttribute("value",e[0]),o.style.width=e[1]+"px",o.setAttribute("title",e[2]),jslogVar.console.addEvent(o,"click",e[3]),o},getTxtSep:function(e){var o=document.createElement("span")
return o.style.color="#ffffff",o.style.fontWeight="bold",o.style.padding="0 2px 0px 10px",o.style.textAlign="right",o.appendChild(document.createTextNode(e)),o},getBtnSep:function(){var e=document.createElement("span")
return e.style.color="#ffffff",e.style.padding="0 3px 0px 0px",e},getGroupSep:function(){var e=document.createElement("span")
return e.style.color="#ffffff",e.style.padding="0 10px 0px 0px",e},getImgPos:function(e,o,l){var n=document.createElement("img")
return n.style.padding="0px 2px",n.style.cursor="pointer",n.src=jslogVar.szPathImg+e,n.height=15,n.width=15,n.align="top",n.title=o,n.style.border="1px solid black",jslogVar.console.addEvent(n,"mouseenter",function(){this.style.border="1px solid yellow"}),jslogVar.console.addEvent(n,"mouseleave",function(){this.style.border="1px solid black"}),jslogVar.console.addEvent(n,"click",function(){jslogVar.console.setPos(l)}),n},setSize:function(e){var o=0,l=0,n=0,s=0
"undefined"!=typeof window.innerHeight?(o=window.innerHeight-30,l=window.innerWidth-30):(o=window.screen.height-150,l=window.screen.width-30),e==JSLOG_SIZE_XS?(n=670,s=150):e==JSLOG_SIZE_S?(s=parseInt(.3*o),n=parseInt(.8*l)):e==JSLOG_SIZE_M?(s=parseInt(.5*o),n=parseInt(1*l)):e==JSLOG_SIZE_L?(s=parseInt(.6*o),n=parseInt(1*l)):e==JSLOG_SIZE_XL&&(jslogVar.console.window.style.top="0px",jslogVar.console.window.style.left="0px",s=parseInt(1*o),n=parseInt(1*l)),jslogVar.console.window.style.width=n+"px",jslogVar.console.window.style.height=s+"px",jslogVar.console.adjustViewport()},setPos:function(e){var o=0,l=0
"undefined"!=typeof window.innerHeight?(o=window.innerHeight-50,l=window.innerWidth-150):(o=window.screen.height-100,l=window.screen.width-200),e==JSLOG_POS_TOPLEFT?(jslogVar.console.window.style.top="0px",jslogVar.console.window.style.left="0px"):e==JSLOG_POS_BOTTOMRIGHT?(jslogVar.console.window.style.top=o+"px",jslogVar.console.window.style.left=l+"px"):e==JSLOG_POS_TOP?jslogVar.console.window.style.top="0px":e==JSLOG_POS_BOTTOM?jslogVar.console.window.style.top=o+"px":e==JSLOG_POS_LEFT?jslogVar.console.window.style.left="0px":e==JSLOG_POS_RIGTH&&(jslogVar.console.window.style.left=l+"px")},clearWindow:function(){jslogVar.console.viewport.innerHTML=""},num2StrPad:function(e,o,l){var n=l-e.toString().length+1
return Array(+(n>0&&n)).join("0")+e}},jslogVar.console.init())}var JSLOG_ERR=0,JSLOG_INFO=1,JSLOG_DEBUG=2,JSLOG_TEST=4,JSLOG_DUMP=8,JSLOG_BASE=16,JSLOG_LEV_URL="URL",JSLOG_LEV_URL_PAR="jslog",JSLOG_ID_DEBUG="debug",JSLOG_DEF_LOG_TIME=!1,JSLOG_DEF_PATH_IMG="../../images"
"undefined"!=typeof JSU_PATH_IMG&&(JSLOG_DEF_PATH_IMG=JSU_PATH_IMG)
var JSLOG_FUN_START="-------------------- START",JSLOG_FUN_END="-------------------- END",JSLOG_FILE_START=" ============================= START",JSLOG_FILE_END=" ============================= END",JSLOG_POS_TOPLEFT="TopLeft",JSLOG_POS_BOTTOMRIGHT="BottomRight",JSLOG_POS_TOP="Top",JSLOG_POS_LEFT="Left",JSLOG_POS_RIGTH="Right",JSLOG_POS_BOTTOM="Bottom",JSLOG_SIZE_XS="XS",JSLOG_SIZE_S="S",JSLOG_SIZE_M="M",JSLOG_SIZE_L="L",JSLOG_SIZE_XL="XL",WIN_JSLOG_TOP="370px",JSLOG_SIZE_DEF=JSLOG_SIZE_M,WIN_JSLOG_H="400px",WIN_JSLOG_W="1200px",jslogVar={iLogLev:0,bLogTime:JSLOG_DEF_LOG_TIME,szPathImg:JSLOG_DEF_PATH_IMG,console:null}
