/* =========================================================================================
File:     					cValidate.js
Author:   					Federico Levis
Last Modification:  Apr 2016   
Description: Validate js API   
Required:  core
Doucumentation:  http://validatejs.org  (by Nicklas Ansman) for the possible constraints format

NOTE:  about This Class 
  1) Incorporated and Modified validate.js by Nicklas Ansman http://validatejs.org:
     -  add LOCALE Support. 
     -  add supoort for tip
     - showErr instead of throw 
  2)  WE have added many other features; TBD 


Documentaion:


DISCLAIMER
Copyright by Federico Levis http://federicolevis.wix.com/jsu JSUtiliy
All rights reserved: UNAUTHORIZED COPYING, REPRODUCTION, REPUBLISHING, UPLOADING, POSTING, TRANSMITTING OR DUPLICATING IS PROHIBITED
========================================================================================= */
function validateItemOnFocus(){clearError(this,this.validateObj.validateOpt.bInstantFieldValidation),void 0!=this.fnOnFocusOrig&&this.fnOnFocusOrig()}function validateItemOnChange(t){var e="[cValidate.js validateItemOnChange()] "
jslog(JSLOG_TEST,e+JSLOG_FUN_END),jslog(JSLOG_TEST,e+"el.id="+t.id)
var r=new Object,n=t.tagName,i=t.validateObj,a=null
"SELECT"==n?a=t.options[t.selectedIndex].value:"INPUT"==n&&(a=t.value),r[t.id]=a,jslogObj(JSLOG_TEST,"validate objValues",r)
var o=validate(r,i.constraints),s=o[t.id]
if(jslog(JSLOG_TEST,e+"szErr="+s),s){var l=t.parentNode.querySelector(".validateErrLabel")
classAdd(t,"validateErr",!0)
var u=i.validateOpt
if(u.bOnErrShowLabel&&(l.innerText=s,elementShow(l,!0,"inline")),u.bOnErrShowAlarm){var n=input.tagName
if("SELECT"==n){var d=input.parentNode.querySelector(".jsuAlarmingImg")
elementShow(d,!0,"inline")}else alarmShowIn1El(input,!0)}}jslog(JSLOG_TEST,e+JSLOG_FUN_END)}function clearError(t,e){void 0==e&&(e=!1)
var r=t.tagName
if("SELECT"==r){var n=t.parentNode.querySelector(".jsuAlarmingImg")
elementShow(n,!1)}else alarmShowIn1El(t,!1)
if(!e){classAdd(t,"validateErr",!1)
var i=t.parentNode.querySelector(".validateErrLabel")
elementShow(i,!1)}}var VALIDATE_SUPPORTED_TAG=["INPUT","SELECT","TEXTAREA"],VALIDATE_DEF_OPT={bInstantFieldValidation:!1,bOnErrShowLabel:!0,bOnErrShowSect:!1,bOnErrShowPopup:!1,bOnErrShowAlarm:!1,szDateFmt:"yyyy-MM-dd",szDateTimeFmt:"yyyy-MM-dd hh:mm:ss"}
cValidate=function(t,e){var r="[cValidate.js cValidate()] "
jslog(JSLOG_INFO,r+JSLOG_FUN_START),jslogObj(JSLOG_TEST,r+"IN constraints=",t),jslogObj(JSLOG_TEST,r+"IN [objOpt]=",e),this.constraints=t
var n=new Array
for(var i in t){var a=document.getElementById(i)
if(null==a)return showErr(r+"SW ERROR key="+i+"  is not a DOM id - return null from document.getElementById("+i+")")
var o=a.tagName
if(checkArVal(a.tagName,VALIDATE_SUPPORTED_TAG,"SW ERROR for DOM item "+a.id+" with tagName="+o+"\nAll the constraints items must refer to a DOM item having a Supported TAG"))return 1
n.push(a)}this.arValidateEl=n,this.validateOpt=VALIDATE_DEF_OPT,this.setOption(e)
for(var s=0;s<this.arValidateEl.length;s++){var a=this.arValidateEl[s]
"SELECT"==a.tagName&&this.addAlarmImg(a)
var l=t[a.id],u=l.tip
if(void 0!=u){jslog(JSLOG_TEST,r+"Add tip for item="+a.id)
var d=document.createElement("img")
classAdd(d,"validateInfo",!0),d.tip=u,d.onmouseover=function(){Tip(this.tip)},d.onmouseout=function(){UnTip()},a.parentNode.appendChild(d)}if(this.validateOpt.bOnErrShowLabel&&this.addErrLabel(a),this.validateOpt.bOnErrShowLabel||this.validateOpt.bOnErrShowAlarm){var c=a.onfocus
void 0!=c&&(a.fnOnFocusOrig=c),a.onfocus=validateItemOnFocus}a.validateObj=this}this.arValidateEl=n,validate.extend(validate.validators.datetime,{parse:function(t,e){var r=e.dateOnly?e.szDateFmt:e.szDateTimeFmt,n=getTimeFromFormat(t,r)
return 0==n?void 0:n},format:function(t,e){var r=e.dateOnly?e.szDateFmt:e.szDateTimeFmt
return getTimeFromFormat(t,r)},options:{szDateFmt:this.validateOpt.szDateFmt,szDateTimeFmt:this.validateOpt.szDateTimeFmt}}),this.addErrSection(),jslog(JSLOG_INFO,r+JSLOG_FUN_END)},cValidate.prototype.setOption=function(t){var e="[cSortTable.setOption] "
if(jslog(JSLOG_TEST,e+JSLOG_FUN_START),t){jslogObj(JSLOG_TEST,e+"IN objOpt:",t)
var r=this.validateOpt
void 0!=t.szDateFmt&&(r.szDateFmt=t.szDateFmt),void 0!=t.szDateTimeFmt&&(r.szDateTimeFmt=t.szDateTimeFmt),void 0!=t.bInstantFieldValidation&&(r.bInstantFieldValidation=t.bInstantFieldValidation),void 0!=t.bOnErrShowAlarm&&(r.bOnErrShowAlarm=t.bOnErrShowAlarm),void 0!=t.bOnErrShowLabel&&(r.bOnErrShowLabel=t.bOnErrShowLabel),void 0!=t.bOnErrShowSect&&(r.bOnErrShowSect=t.bOnErrShowSect),void 0!=t.bOnErrShowPopup&&(r.bOnErrShowPopup=t.bOnErrShowPopup),void 0!=t.bInstantFieldValidation&&(r.bInstantFieldValidation=t.bInstantFieldValidation),this.validateOpt=r,jslogObj(JSLOG_TEST,e+"CURRENT validateOpt:",r)}if(this.validateOpt.bInstantFieldValidation){jslog(JSLOG_TEST,e+"Add EVENTs for INSTANT Validation")
for(var n=0;n<this.arValidateEl.length;n++)this.arValidateEl[n].addEventListener("change",function(t){t.preventDefault(),validateItemOnChange(this)})}this.addErrSection()
for(var n=0;n<this.arValidateEl.length;n++)clearError(this.arValidateEl[n])
jslog(JSLOG_TEST,e+JSLOG_FUN_END)},cValidate.prototype.validateApply=function(){var t="[cSortTable.validateApply] "
jslog(JSLOG_TEST,t+JSLOG_FUN_START),jslog(JSLOG_TEST,t+"Prepare objValues to Validate")
for(var e=new Object,r=0;r<this.arValidateEl.length;r++){el=this.arValidateEl[r]
var n=el.tagName,i=null
"SELECT"==n?i=el.options[el.selectedIndex].value:"INPUT"==n&&(i=el.value),e[el.id]=i}jslogObj(JSLOG_TEST,"validate objValues",e)
var a=validate(e,this.constraints)
jslogObj(JSLOG_TEST,t+"validate errors",a),this.showErrors(a||{})
var o=a?1:0
return jslog(JSLOG_TEST,t+"iRet="+o),jslog(JSLOG_TEST,t+JSLOG_FUN_END),o},cValidate.prototype.showErrors=function(t,e){var r="[cValidate.js showErrors] "
jslog(JSLOG_TEST,r+JSLOG_FUN_START),void 0==e&&(e=!1)
for(var n="",i=!1,a=this.validateOpt,o=0;o<this.arValidateEl.length;o++){var s=this.arValidateEl[o],l=s.id,u=s.parentNode.querySelector(".validateErrLabel"),d=t&&t[l],c=null!=d
if(c){classAdd(s,"validateErr",!0)
var f=""
for(iEr=0;iEr<d.length;iEr++)iEr>0&&(f+=" - "),f+=d[iEr]
if(a.bOnErrShowLabel&&(jslog(JSLOG_TEST,r+"Id="+l+" set Err="+f),u.innerText=f,elementShow(u,!0,"inline")),!e&&a.bOnErrShowAlarm){var m=s.tagName
if("SELECT"==m){var E=s.parentNode.querySelector(".jsuAlarmingImg")
elementShow(E,!0,"inline")}else alarmShowIn1El(s,!0)}n+="<li>"+f+"</li>",i=!0}else elementShow(u,!1)}if(!e)if(i){if(n='<ul type="square">'+n+"</ul>",a.bOnErrShowSect){var p='<table width="100%"><tr>  <td class="PopupImgWarn" width="100px"></td>  <td><label class="validateErrPopup">'+n+"</label></td></tr></table>"
this.elErrSect.innerHTML=p,elementShow(this.elErrSect,!0)}if(a.bOnErrShowPopup){var h='<label class="validateErrPopup">'+n+"</label>",v=new Object
a.szErrPopupTitle&&(v.szTitle=a.szErrPopupTitle),Popup(POPUP_TYPE.WARN,h,v)}}else elementShow(this.elErrSect,!1)
jslog(JSLOG_TEST,r+JSLOG_FUN_END)},cValidate.prototype.addErrSection=function(){var t="[cValidate.js addErrSection()] "
if(jslog(JSLOG_TEST,t+JSLOG_FUN_START),this.validateOpt&&this.validateOpt.bOnErrShowSect)if(this.validateOpt.szErrSectId)jslog(JSLOG_TEST,t+"There is SECT ERR with objOpt.szErrSectId="+objOpt.szErrSectId),this.elErrSect=getElementById3(objOpt.szErrSectId,!0,t)
else{var e=document.getElementById("validateErrSect")
void 0==e?(e=document.createElement("div"),e.className="validateErrSect",document.body.insertBefore(e,document.body.firstChild)):elementShow(e,!1),this.elErrSect=e}jslog(JSLOG_TEST,t+JSLOG_FUN_END)},cValidate.prototype.addErrLabel=function(t){var e="[cValidate.js addErrLabel()] "
jslog(JSLOG_TEST,e+"input.id="+t.id)
var r=t.parentNode.querySelector(".validateErrContainer")
if(void 0==r){r=document.createElement("span"),r.className="validateErrContainer",t.parentNode.appendChild(r)
var n=document.createElement("label")
n.className="validateErrLabel",n.id="validateErrLabel",r.appendChild(n)}clearError(t)},cValidate.prototype.addAlarmImg=function(t){var e="[cValidate.js addAlarmImg()] "
jslog(JSLOG_TEST,e+JSLOG_FUN_START),jslog(JSLOG_TEST,e+"input.id="+t.id)
var r=t.parentNode.querySelector(".jsuAlarmingImg")
if(void 0==r){jslog(JSLOG_TEST,e+"add the elAlarm ")
var n=document.createElement("span")
t.parentNode.appendChild(n),r=document.createElement("img"),r.className="jsuAlarmingImg",n.appendChild(r)}jslog(JSLOG_TEST,e+JSLOG_FUN_END)},function(t,e,r){"use strict"
var n=function(t,e,r){r=i.extend({},i.options,r)
var a,o,s=i.runValidations(t,e,r)
for(a in s)for(o in s[a])if(i.isPromise(s[a][o]))throw new Error("Use validate.async if you want support for promises")
return n.processValidationResults(s,r)},i=n
i.extend=function(t){for(var e=[].slice.call(arguments,1),r=0;r<e.length;r++){var n=e[r]
for(var i in n)t[i]=n[i]}return t},i.extend(n,{version:{major:0,minor:9,patch:0,metadata:"development",toString:function(){var t=i.format("%{major}.%{minor}.%{patch}",i.version)
return i.isEmpty(i.version.metadata)||(t+="+"+i.version.metadata),t}},Promise:"undefined"!=typeof Promise?Promise:null,EMPTY_STRING_REGEXP:/^\s*$/,runValidations:function(t,e,r){var n,a,o,s,l,u,d,c=[];(i.isDomElement(t)||i.isJqueryElement(t))&&(t=i.collectFormValues(t))
for(n in e){o=i.getDeepObjectValue(t,n),s=i.result(e[n],o,t,n,r,e)
for(a in s){if(l=i.validators[a],!l)throw d=i.format("Unknown validator %{name}",{name:a}),new Error(d)
u=s[a],u=i.result(u,o,t,n,r,e),u&&c.push({attribute:n,value:o,validator:a,globalOptions:r,attributes:t,options:u,error:l.call(l,o,u,n,t,r)})}}return c},processValidationResults:function(t,e){var r
switch(t=i.pruneEmptyErrors(t,e),t=i.expandMultipleErrors(t,e),t=i.convertErrorMessages(t,e),e.format||"grouped"){case"detailed":break
case"flat":t=i.flattenErrorsToArray(t)
break
case"grouped":t=i.groupErrorsByAttribute(t)
for(r in t)t[r]=i.flattenErrorsToArray(t[r])
break
default:throw new Error(i.format("Unknown format %{format}",e))}return i.isEmpty(t)?void 0:t},async:function(t,e,r){r=i.extend({},i.async.options,r)
var n=r.wrapErrors||function(t){return t}
r.cleanAttributes!==!1&&(t=i.cleanAttributes(t,e))
var a=i.runValidations(t,e,r)
return new i.Promise(function(o,s){i.waitForResults(a).then(function(){var l=i.processValidationResults(a,r)
l?s(new n(l,r,t,e)):o(t)},function(t){s(t)})})},single:function(t,e,r){return r=i.extend({},i.single.options,r,{format:"flat",fullMessages:!1}),i({single:t},{single:e},r)},waitForResults:function(t){return t.reduce(function(t,e){return i.isPromise(e.error)?t.then(function(){return e.error.then(function(t){e.error=t||null},function(t){if(t instanceof Error)throw t
i.error("Rejecting promises with the result is deprecated. Please use the resolve callback instead."),e.error=t})}):t},new i.Promise(function(t){t()}))},result:function(t){var e=[].slice.call(arguments,1)
return"function"==typeof t&&(t=t.apply(null,e)),t},isNumber:function(t){return"number"==typeof t&&!isNaN(t)},isFunction:function(t){return"function"==typeof t},isInteger:function(t){return i.isNumber(t)&&t%1===0},isObject:function(t){return t===Object(t)},isDate:function(t){return t instanceof Date},isDefined:function(t){return null!==t&&void 0!==t},isPromise:function(t){return!!t&&i.isFunction(t.then)},isJqueryElement:function(t){return t&&i.isString(t.jquery)},isDomElement:function(t){return t&&i.isFunction(t.querySelectorAll)&&i.isFunction(t.querySelector)?i.isObject(document)&&t===document?!0:"object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName:!1},isEmpty:function(t){var e
if(!i.isDefined(t))return!0
if(i.isFunction(t))return!1
if(i.isString(t))return i.EMPTY_STRING_REGEXP.test(t)
if(i.isArray(t))return 0===t.length
if(i.isDate(t))return!1
if(i.isObject(t)){for(e in t)return!1
return!0}return!1},format:i.extend(function(t,e){return i.isString(t)?t.replace(i.format.FORMAT_REGEXP,function(t,r,n){return"%"===r?"%{"+n+"}":String(e[n])}):t},{FORMAT_REGEXP:/(%?)%\{([^\}]+)\}/g}),prettify:function(t){return i.isNumber(t)?100*t%1===0?""+t:parseFloat(Math.round(100*t)/100).toFixed(2):i.isArray(t)?t.map(function(t){return i.prettify(t)}).join(", "):i.isObject(t)?t.toString():(t=""+t,t.replace(/([^\s])\.([^\s])/g,"$1 $2").replace(/\\+/g,"").replace(/[_-]/g," ").replace(/([a-z])([A-Z])/g,function(t,e,r){return""+e+" "+r.toLowerCase()}).toLowerCase())},stringifyValue:function(t){return i.prettify(t)},isString:function(t){return"string"==typeof t},isArray:function(t){return"[object Array]"==={}.toString.call(t)},contains:function(t,e){return i.isDefined(t)?i.isArray(t)?-1!==t.indexOf(e):e in t:!1},forEachKeyInKeypath:function(t,e,r){if(i.isString(e)){var n,a="",o=!1
for(n=0;n<e.length;++n)switch(e[n]){case".":o?(o=!1,a+="."):(t=r(t,a,!1),a="")
break
case"\\":o?(o=!1,a+="\\"):o=!0
break
default:o=!1,a+=e[n]}return r(t,a,!0)}},getDeepObjectValue:function(t,e){return i.isObject(t)?i.forEachKeyInKeypath(t,e,function(t,e){return i.isObject(t)?t[e]:void 0}):void 0},collectFormValues:function(t,e){var r,n,a,o,s={}
if(i.isJqueryElement(t)&&(t=t[0]),!t)return s
for(e=e||{},a=t.querySelectorAll("input[name], textarea[name]"),r=0;r<a.length;++r)n=a.item(r),i.isDefined(n.getAttribute("data-ignored"))||(o=i.sanitizeFormValue(n.value,e),"number"===n.type?o=o?+o:null:"checkbox"===n.type?n.attributes.value?n.checked||(o=s[n.name]||null):o=n.checked:"radio"===n.type&&(n.checked||(o=s[n.name]||null)),s[n.name]=o)
for(a=t.querySelectorAll("select[name]"),r=0;r<a.length;++r)n=a.item(r),o=i.sanitizeFormValue(n.options[n.selectedIndex].value,e),s[n.name]=o
return s},sanitizeFormValue:function(t,e){return e.trim&&i.isString(t)&&(t=t.trim()),e.nullify!==!1&&""===t?null:t},capitalize:function(t){return i.isString(t)?t[0].toUpperCase()+t.slice(1):t},pruneEmptyErrors:function(t){return t.filter(function(t){return!i.isEmpty(t.error)})},expandMultipleErrors:function(t){for(var e=[],r=0;r<t.length;r++){var n=t[r]
if(i.isArray(n.error))for(var a=n.error,o=0;o<a.length;o++){var s=a[o]
e.push(i.extend({},n,{error:s}))}else e.push(n)}return e},convertErrorMessages:function(t,e){e=e||{}
for(var r=[],n=0;n<t.length;n++){var a=t[n],o=i.result(a.error,a.value,a.attribute,a.options,a.attributes,a.globalOptions)
if(!i.isString(o))return void r.push(a)
"^"===o[0]?o=o.slice(1):e.fullMessages!==!1&&(o=i.capitalize(i.prettify(a.attribute))+" "+o),o=o.replace(/\\\^/g,"^"),o=i.format(o,{value:i.stringifyValue(a.value)}),r.push(i.extend({},a,{error:o}))}return r},groupErrorsByAttribute:function(t){for(var e={},r=0;r<t.length;r++){var n=t[r],i=e[n.attribute]
i?i.push(n):e[n.attribute]=[n]}return e},flattenErrorsToArray:function(t){return t.map(function(t){return t.error})},cleanAttributes:function(t,e){function r(t,e,r){return i.isObject(t[e])?t[e]:t[e]=r?!0:{}}function n(t){var e,n={}
for(e in t)t[e]&&i.forEachKeyInKeypath(n,e,r)
return n}function a(t,e){if(!i.isObject(t))return t
var r,n,o=i.extend({},t)
for(n in t)r=e[n],i.isObject(r)?o[n]=a(o[n],r):r||delete o[n]
return o}return i.isObject(e)&&i.isObject(t)?(e=n(e),a(t,e)):{}},exposeModule:function(t,e,r,n,i){r?(n&&n.exports&&(r=n.exports=t),r.validate=t):(e.validate=t,t.isFunction(i)&&i.amd&&i([],function(){return t}))},warn:function(t){"undefined"!=typeof console&&console.warn&&console.warn("[validate.js] "+t)},error:function(t){var e="[validate.js] "+t
"undefined"!=typeof console&&console.error&&console.error(e)},swError:function(t){var e="[validate.js] "+t
throw showErr(e),new Error(e)}}),n.validators={tip:function(t,e){},presence:function(t,e){return e=i.extend({},this.options,e),i.isEmpty(t)?e.message||this.message||VALIDATE_MSG.cantBeBlank:void 0},length:function(t,e,r){if(!i.isEmpty(t)){e=i.extend({},this.options,e)
var n,a=e.is,o=e.maximum,s=e.minimum,l=e.tokenizer||function(t){return t},u=[]
t=l(t)
var d=t.length
return i.isNumber(d)?(i.isNumber(a)&&d!==a&&(n=e.wrongLength||this.wrongLength||VALIDATE_MSG.wrongLen,u.push(i.format(n,{count:a}))),i.isNumber(s)&&s>d&&(n=e.tooShort||this.tooShort||VALIDATE_MSG.tooShort,u.push(i.format(n,{count:s}))),i.isNumber(o)&&d>o&&(n=e.tooLong||this.tooLong||VALIDATE_MSG.tooLong,u.push(i.format(n,{count:o}))),u.length>0?e.message||u:void 0):(i.error(i.format("Attribute %{attr} has a non numeric value for `length`",{attr:r})),e.message||this.notValid||"has an incorrect length")}},numericality:function(t,e){if(!i.isEmpty(t)){e=i.extend({},this.options,e)
var r,n,a=[],o={greaterThan:function(t,e){return t>e},greaterThanOrEqualTo:function(t,e){return t>=e},equalTo:function(t,e){return t===e},lessThan:function(t,e){return e>t},lessThanOrEqualTo:function(t,e){return e>=t}}
if(e.noStrings!==!0&&i.isString(t)&&(t=+t),!i.isNumber(t))return e.message||e.notValid||this.notValid||VALIDATE_MSG.notNumber
if(e.onlyInteger&&!i.isInteger(t))return e.message||e.notInteger||this.notInteger||VALIDATE_MSG.mustBeInteger
for(r in o)if(n=e[r],i.isNumber(n)&&!o[r](t,n)){var s="not"+i.capitalize(r),l=e[s]||this[s]||VALIDATE_MSG.mustBeType
a.push(i.format(l,{count:n,type:i.prettify(r)}))}return e.odd&&t%2!==1&&a.push(e.notOdd||this.notOdd||VALIDATE_MSG.mustBeOdd),e.even&&t%2!==0&&a.push(e.notEven||this.notEven||VALIDATE_MSG.mustBeEven),a.length?e.message||a:void 0}},datetime:i.extend(function(t,e){if(i.isFunction(this.parse)&&i.isFunction(this.format)||i.swError("Both the parse and format functions needs to be set to use the datetime/date validator"),!i.isEmpty(t)){e=i.extend({},this.options,e)
var r,n=[],a=e.earliest?this.parse(e.earliest,e):NaN,o=e.latest?this.parse(e.latest,e):NaN
return t=this.parse(t,e),isNaN(t)?e.message||this.notValid||VALIDATE_MSG.validDate:(!isNaN(a)&&a>t&&(r=this.tooEarly||VALIDATE_MSG.notEarlierThanDate,r=i.format(r,{date:this.format(a,e)}),n.push(r)),!isNaN(o)&&t>o&&(r=this.tooLate||VALIDATE_MSG.notLaterThanDate,r=i.format(r,{date:this.format(o,e)}),n.push(r)),n.length?e.message||n:void 0)}},{parse:null,format:null}),date:function(t,e){return e=i.extend({},e,{dateOnly:!0}),i.validators.datetime.call(i.validators.datetime,t,e)},format:function(t,e){(i.isString(e)||e instanceof RegExp)&&(e={pattern:e}),e=i.extend({},this.options,e)
var r,n=e.message||this.message||VALIDATE_MSG.isInvalid,a=e.pattern
return i.isEmpty(t)?void 0:i.isString(t)?(i.isString(a)&&(a=new RegExp(e.pattern,e.flags)),r=a.exec(t),r&&r[0].length==t.length?void 0:n):n},inclusion:function(t,e){if(!i.isEmpty(t)&&(i.isArray(e)&&(e={within:e}),e=i.extend({},this.options,e),!i.contains(e.within,t))){var r=e.message||this.message||"^%{value} is not included in the list"
return i.format(r,{value:t})}},exclusion:function(t,e){if(!i.isEmpty(t)&&(i.isArray(e)&&(e={within:e}),e=i.extend({},this.options,e),i.contains(e.within,t))){var r=e.message||this.message||VALIDATE_MSG.valueRestricted
return i.format(r,{value:t})}},email:i.extend(function(t,e){e=i.extend({},this.options,e)
var r=e.message||this.message||VALIDATE_MSG.notValidMail
if(!i.isEmpty(t))return i.isString(t)&&this.PATTERN.exec(t)?void 0:r},{PATTERN:/^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i}),equality:function(t,e,r,n){if(!i.isEmpty(t)){i.isString(e)&&(e={attribute:e}),e=i.extend({},this.options,e)
var a=e.message||this.message||"is not equal to %{attribute}"
if(i.isEmpty(e.attribute)||!i.isString(e.attribute))throw new Error("The attribute must be a non empty string")
var o=i.getDeepObjectValue(n,e.attribute),s=e.comparator||function(t,e){return t===e}
return s(t,o,e,r,n)?void 0:i.format(a,{attribute:i.prettify(e.attribute)})}},url:function(t,e){if(!i.isEmpty(t)){e=i.extend({},this.options,e)
var r=e.message||this.message||VALIDATE_MSG.notValidUrl,n=e.schemes||this.schemes||["http","https"],a=e.allowLocal||this.allowLocal||!1
if(!i.isString(t))return r
var o="^(?:(?:"+n.join("|")+"):\\/\\/)(?:\\S+(?::\\S*)?@)?"
o+="(?:"
var s="(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))"
a?s="(?:localhost|"+s+")":o+="(?!10(?:\\.\\d{1,3}){3})(?!127(?:\\.\\d{1,3}){3})(?!169\\.254(?:\\.\\d{1,3}){2})(?!192\\.168(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})",o+="(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|"+s+"(?::\\d{2,5})?(?:\\/[^\\s]*)?$"
var l=new RegExp(o,"i")
return l.exec(t)?void 0:r}}},n.exposeModule(n,this,t,e,r)}.call(this,"undefined"!=typeof exports?exports:null,"undefined"!=typeof module?module:null,"undefined"!=typeof define?define:null)
