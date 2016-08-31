/*!
 * validate.js 0.9.0
 *
 * (c) 2013-2015 Nicklas Ansman, 2013 Wrapp
 * Validate.js may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://validatejs.org/
 */
(function(t,e,r){"use strict"
var n=function(t,e,r){r=i.extend({},i.options,r)
var o,s,a=i.runValidations(t,e,r)
for(o in a)for(s in a[o])if(i.isPromise(a[o][s]))throw new Error("Use validate.async if you want support for promises")
return n.processValidationResults(a,r)},i=n
i.extend=function(t){return[].slice.call(arguments,1).forEach(function(e){for(var r in e)t[r]=e[r]}),t},i.extend(n,{version:{major:0,minor:9,patch:0,metadata:"development",toString:function(){var t=i.format("%{major}.%{minor}.%{patch}",i.version)
return i.isEmpty(i.version.metadata)||(t+="+"+i.version.metadata),t}},Promise:"undefined"!=typeof Promise?Promise:null,EMPTY_STRING_REGEXP:/^\s*$/,runValidations:function(t,e,r){var n,o,s,a,u,f,l,c=[];(i.isDomElement(t)||i.isJqueryElement(t))&&(t=i.collectFormValues(t))
for(n in e){s=i.getDeepObjectValue(t,n),a=i.result(e[n],s,t,n,r,e)
for(o in a){if(u=i.validators[o],!u)throw l=i.format("Unknown validator %{name}",{name:o}),new Error(l)
f=a[o],f=i.result(f,s,t,n,r,e),f&&c.push({attribute:n,value:s,validator:o,globalOptions:r,attributes:t,options:f,error:u.call(u,s,f,n,t,r)})}}return c},processValidationResults:function(t,e){var r
switch(t=i.pruneEmptyErrors(t,e),t=i.expandMultipleErrors(t,e),t=i.convertErrorMessages(t,e),e.format||"grouped"){case"detailed":break
case"flat":t=i.flattenErrorsToArray(t)
break
case"grouped":t=i.groupErrorsByAttribute(t)
for(r in t)t[r]=i.flattenErrorsToArray(t[r])
break
default:throw new Error(i.format("Unknown format %{format}",e))}return i.isEmpty(t)?void 0:t},async:function(t,e,r){r=i.extend({},i.async.options,r)
var n=r.wrapErrors||function(t){return t}
r.cleanAttributes!==!1&&(t=i.cleanAttributes(t,e))
var o=i.runValidations(t,e,r)
return new i.Promise(function(s,a){i.waitForResults(o).then(function(){var u=i.processValidationResults(o,r)
u?a(new n(u,r,t,e)):s(t)},function(t){a(t)})})},single:function(t,e,r){return r=i.extend({},i.single.options,r,{format:"flat",fullMessages:!1}),i({single:t},{single:e},r)},waitForResults:function(t){return t.reduce(function(t,e){return i.isPromise(e.error)?t.then(function(){return e.error.then(function(t){e.error=t||null},function(t){if(t instanceof Error)throw t
i.error("Rejecting promises with the result is deprecated. Please use the resolve callback instead."),e.error=t})}):t},new i.Promise(function(t){t()}))},result:function(t){var e=[].slice.call(arguments,1)
return"function"==typeof t&&(t=t.apply(null,e)),t},isNumber:function(t){return"number"==typeof t&&!isNaN(t)},isFunction:function(t){return"function"==typeof t},isInteger:function(t){return i.isNumber(t)&&t%1===0},isObject:function(t){return t===Object(t)},isDate:function(t){return t instanceof Date},isDefined:function(t){return null!==t&&void 0!==t},isPromise:function(t){return!!t&&i.isFunction(t.then)},isJqueryElement:function(t){return t&&i.isString(t.jquery)},isDomElement:function(t){return t&&i.isFunction(t.querySelectorAll)&&i.isFunction(t.querySelector)?i.isObject(document)&&t===document?!0:"object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName:!1},isEmpty:function(t){var e
if(!i.isDefined(t))return!0
if(i.isFunction(t))return!1
if(i.isString(t))return i.EMPTY_STRING_REGEXP.test(t)
if(i.isArray(t))return 0===t.length
if(i.isDate(t))return!1
if(i.isObject(t)){for(e in t)return!1
return!0}return!1},format:i.extend(function(t,e){return i.isString(t)?t.replace(i.format.FORMAT_REGEXP,function(t,r,n){return"%"===r?"%{"+n+"}":String(e[n])}):t},{FORMAT_REGEXP:/(%?)%\{([^\}]+)\}/g}),prettify:function(t){return i.isNumber(t)?100*t%1===0?""+t:parseFloat(Math.round(100*t)/100).toFixed(2):i.isArray(t)?t.map(function(t){return i.prettify(t)}).join(", "):i.isObject(t)?t.toString():(t=""+t,t.replace(/([^\s])\.([^\s])/g,"$1 $2").replace(/\\+/g,"").replace(/[_-]/g," ").replace(/([a-z])([A-Z])/g,function(t,e,r){return""+e+" "+r.toLowerCase()}).toLowerCase())},stringifyValue:function(t){return i.prettify(t)},isString:function(t){return"string"==typeof t},isArray:function(t){return"[object Array]"==={}.toString.call(t)},contains:function(t,e){return i.isDefined(t)?i.isArray(t)?-1!==t.indexOf(e):e in t:!1},forEachKeyInKeypath:function(t,e,r){if(i.isString(e)){var n,o="",s=!1
for(n=0;n<e.length;++n)switch(e[n]){case".":s?(s=!1,o+="."):(t=r(t,o,!1),o="")
break
case"\\":s?(s=!1,o+="\\"):s=!0
break
default:s=!1,o+=e[n]}return r(t,o,!0)}},getDeepObjectValue:function(t,e){return i.isObject(t)?i.forEachKeyInKeypath(t,e,function(t,e){return i.isObject(t)?t[e]:void 0}):void 0},collectFormValues:function(t,e){var r,n,o,s,a={}
if(i.isJqueryElement(t)&&(t=t[0]),!t)return a
for(e=e||{},o=t.querySelectorAll("input[name], textarea[name]"),r=0;r<o.length;++r)n=o.item(r),i.isDefined(n.getAttribute("data-ignored"))||(s=i.sanitizeFormValue(n.value,e),"number"===n.type?s=s?+s:null:"checkbox"===n.type?n.attributes.value?n.checked||(s=a[n.name]||null):s=n.checked:"radio"===n.type&&(n.checked||(s=a[n.name]||null)),a[n.name]=s)
for(o=t.querySelectorAll("select[name]"),r=0;r<o.length;++r)n=o.item(r),s=i.sanitizeFormValue(n.options[n.selectedIndex].value,e),a[n.name]=s
return a},sanitizeFormValue:function(t,e){return e.trim&&i.isString(t)&&(t=t.trim()),e.nullify!==!1&&""===t?null:t},capitalize:function(t){return i.isString(t)?t[0].toUpperCase()+t.slice(1):t},pruneEmptyErrors:function(t){return t.filter(function(t){return!i.isEmpty(t.error)})},expandMultipleErrors:function(t){var e=[]
return t.forEach(function(t){i.isArray(t.error)?t.error.forEach(function(r){e.push(i.extend({},t,{error:r}))}):e.push(t)}),e},convertErrorMessages:function(t,e){e=e||{}
var r=[]
return t.forEach(function(t){var n=i.result(t.error,t.value,t.attribute,t.options,t.attributes,t.globalOptions)
return i.isString(n)?("^"===n[0]?n=n.slice(1):e.fullMessages!==!1&&(n=i.capitalize(i.prettify(t.attribute))+" "+n),n=n.replace(/\\\^/g,"^"),n=i.format(n,{value:i.stringifyValue(t.value)}),void r.push(i.extend({},t,{error:n}))):void r.push(t)}),r},groupErrorsByAttribute:function(t){var e={}
return t.forEach(function(t){var r=e[t.attribute]
r?r.push(t):e[t.attribute]=[t]}),e},flattenErrorsToArray:function(t){return t.map(function(t){return t.error})},cleanAttributes:function(t,e){function r(t,e,r){return i.isObject(t[e])?t[e]:t[e]=r?!0:{}}function n(t){var e,n={}
for(e in t)t[e]&&i.forEachKeyInKeypath(n,e,r)
return n}function o(t,e){if(!i.isObject(t))return t
var r,n,s=i.extend({},t)
for(n in t)r=e[n],i.isObject(r)?s[n]=o(s[n],r):r||delete s[n]
return s}return i.isObject(e)&&i.isObject(t)?(e=n(e),o(t,e)):{}},exposeModule:function(t,e,r,n,i){r?(n&&n.exports&&(r=n.exports=t),r.validate=t):(e.validate=t,t.isFunction(i)&&i.amd&&i([],function(){return t}))},warn:function(t){"undefined"!=typeof console&&console.warn&&console.warn("[validate.js] "+t)},error:function(t){"undefined"!=typeof console&&console.error&&console.error("[validate.js] "+t)}}),n.validators={presence:function(t,e){return e=i.extend({},this.options,e),i.isEmpty(t)?e.message||this.message||"can't be blank":void 0},length:function(t,e,r){if(!i.isEmpty(t)){e=i.extend({},this.options,e)
var n,o=e.is,s=e.maximum,a=e.minimum,u=e.tokenizer||function(t){return t},f=[]
t=u(t)
var l=t.length
return i.isNumber(l)?(i.isNumber(o)&&l!==o&&(n=e.wrongLength||this.wrongLength||"is the wrong length (should be %{count} characters)",f.push(i.format(n,{count:o}))),i.isNumber(a)&&a>l&&(n=e.tooShort||this.tooShort||"is too short (minimum is %{count} characters)",f.push(i.format(n,{count:a}))),i.isNumber(s)&&l>s&&(n=e.tooLong||this.tooLong||"is too long (maximum is %{count} characters)",f.push(i.format(n,{count:s}))),f.length>0?e.message||f:void 0):(i.error(i.format("Attribute %{attr} has a non numeric value for `length`",{attr:r})),e.message||this.notValid||"has an incorrect length")}},numericality:function(t,e){if(!i.isEmpty(t)){e=i.extend({},this.options,e)
var r,n,o=[],s={greaterThan:function(t,e){return t>e},greaterThanOrEqualTo:function(t,e){return t>=e},equalTo:function(t,e){return t===e},lessThan:function(t,e){return e>t},lessThanOrEqualTo:function(t,e){return e>=t}}
if(e.noStrings!==!0&&i.isString(t)&&(t=+t),!i.isNumber(t))return e.message||e.notValid||this.notValid||"is not a number"
if(e.onlyInteger&&!i.isInteger(t))return e.message||e.notInteger||this.notInteger||"must be an integer"
for(r in s)if(n=e[r],i.isNumber(n)&&!s[r](t,n)){var a="not"+i.capitalize(r),u=e[a]||this[a]||"must be %{type} %{count}"
o.push(i.format(u,{count:n,type:i.prettify(r)}))}return e.odd&&t%2!==1&&o.push(e.notOdd||this.notOdd||"must be odd"),e.even&&t%2!==0&&o.push(e.notEven||this.notEven||"must be even"),o.length?e.message||o:void 0}},datetime:i.extend(function(t,e){if(!i.isFunction(this.parse)||!i.isFunction(this.format))throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator")
if(!i.isEmpty(t)){e=i.extend({},this.options,e)
var r,n=[],o=e.earliest?this.parse(e.earliest,e):NaN,s=e.latest?this.parse(e.latest,e):NaN
return t=this.parse(t,e),isNaN(t)||e.dateOnly&&t%864e5!==0?e.message||this.notValid||"must be a valid date":(!isNaN(o)&&o>t&&(r=this.tooEarly||"must be no earlier than %{date}",r=i.format(r,{date:this.format(o,e)}),n.push(r)),!isNaN(s)&&t>s&&(r=this.tooLate||"must be no later than %{date}",r=i.format(r,{date:this.format(s,e)}),n.push(r)),n.length?e.message||n:void 0)}},{parse:null,format:null}),date:function(t,e){return e=i.extend({},e,{dateOnly:!0}),i.validators.datetime.call(i.validators.datetime,t,e)},format:function(t,e){(i.isString(e)||e instanceof RegExp)&&(e={pattern:e}),e=i.extend({},this.options,e)
var r,n=e.message||this.message||"is invalid",o=e.pattern
return i.isEmpty(t)?void 0:i.isString(t)?(i.isString(o)&&(o=new RegExp(e.pattern,e.flags)),r=o.exec(t),r&&r[0].length==t.length?void 0:n):n},inclusion:function(t,e){if(!i.isEmpty(t)&&(i.isArray(e)&&(e={within:e}),e=i.extend({},this.options,e),!i.contains(e.within,t))){var r=e.message||this.message||"^%{value} is not included in the list"
return i.format(r,{value:t})}},exclusion:function(t,e){if(!i.isEmpty(t)&&(i.isArray(e)&&(e={within:e}),e=i.extend({},this.options,e),i.contains(e.within,t))){var r=e.message||this.message||"^%{value} is restricted"
return i.format(r,{value:t})}},email:i.extend(function(t,e){e=i.extend({},this.options,e)
var r=e.message||this.message||"is not a valid email"
if(!i.isEmpty(t))return i.isString(t)&&this.PATTERN.exec(t)?void 0:r},{PATTERN:/^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i}),equality:function(t,e,r,n){if(!i.isEmpty(t)){i.isString(e)&&(e={attribute:e}),e=i.extend({},this.options,e)
var o=e.message||this.message||"is not equal to %{attribute}"
if(i.isEmpty(e.attribute)||!i.isString(e.attribute))throw new Error("The attribute must be a non empty string")
var s=i.getDeepObjectValue(n,e.attribute),a=e.comparator||function(t,e){return t===e}
return a(t,s,e,r,n)?void 0:i.format(o,{attribute:i.prettify(e.attribute)})}},url:function(t,e){if(!i.isEmpty(t)){e=i.extend({},this.options,e)
var r=e.message||this.message||"is not a valid url",n=e.schemes||this.schemes||["http","https"],o=e.allowLocal||this.allowLocal||!1
if(!i.isString(t))return r
var s="^(?:(?:"+n.join("|")+"):\\/\\/)(?:\\S+(?::\\S*)?@)?"
s+="(?:"
var a="(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))"
o?a="(?:localhost|"+a+")":s+="(?!10(?:\\.\\d{1,3}){3})(?!127(?:\\.\\d{1,3}){3})(?!169\\.254(?:\\.\\d{1,3}){2})(?!192\\.168(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})",s+="(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|"+a+"(?::\\d{2,5})?(?:\\/[^\\s]*)?$"
var u=new RegExp(s,"i")
return u.exec(t)?void 0:r}}},n.exposeModule(n,this,t,e,r)}).call(this,"undefined"!=typeof exports?exports:null,"undefined"!=typeof module?module:null,"undefined"!=typeof define?define:null)
