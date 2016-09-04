
/** @fileOverview
========================================================================================= <BR/> 
<b>File:</b> 			core/cValidate.js <BR/>
<b>Author:</b>     		<a href="https://www.linkedin.com/in/federicolevis" target="_self">Federico Levis</a> <BR/>
<b>Validate Doc:</b>   For Validate Documentation see:<ul>
                          <li><a href="https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/Validate.html" target="_self">JSU Validate Documentation</a> </li>
                          <li><a href="http://validatejs.org" target="_self">validate.js</a> </li>
                        </ul>
<b>JSU API Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html" target="_self">JSU API Documentation</a> <BR/>
<b>Description:</b>      Validate Class <BR/>   
<b>REQUIRE:</b>          JSU: jsu.js   <BR/>
<b>First Version:</b>    ver 1.0 - Feb 2015  <BR/>
<b>Current Version:</b>  ver 3.3 - Jul 2016  <BR/>
<b>NOTES:</b> <BR/>
  1) Incorporated and Modified validate.js by Nicklas Ansman http://validatejs.org: <BR/>
     -  add LOCALE Support. <BR/>
     -  add supoort for tip<BR/>
     - showErr instead of throw  <BR/>
  2)  We have added many other features, described in JSU documentation <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>DISCLAIMER</b>  <BR/>
Copyright by Federico Levis - <a href="https://github.com/FedericoLevis/JSU" target="_self">JSU</a> <BR/> 
This file may be freely distributed under the MIT license.   <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>IMPLEMENTATION NOTES</b>  <BR/>
There is few additional Code (marked with JSU_FREE_ JSU_FULL_ )to implement <a class="tipLink" href="javascript:showJSUVersionParLimit();">FREE JSU Limitations</a>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>JSDoc NOTES</b>  <BR/>
In "JSU Obfuscated Version"  JS Code is not visible with JSDoc Source Link  <BR/> 
========================================================================================= <BR/> 
*/


//**************************************************************************
//			    GLOBAL CONSTANT
//**************************************************************************


//**************************************************************************
//			    LOCAL CONSTANT
//**************************************************************************

var VALIDATE_SUPPORTED_TAG = ["INPUT","SELECT","TEXTAREA"];

//**************************************************************************
//			    GLOBAL SETTINGS
//**************************************************************************

/**
 * Validate Return Codes
 */
var VALIDATE_RETCODE =
{
		OK: "OK",
		ERR: "ERR"
};	


/**
 * Validate Default Option
 */
var VALIDATE_DEF_OPT ={
  bInstantFieldValidation: true,  //  {Boolean}: [true] Instant Validation at item onchange event 
	bOnErrShowLabel: true,	// {Boolean}: [true] true: On Validate Error shows an error label on the right of the Item
	bOnErrShowSect:  false,	//	{Boolean}: [false] show a section on the Top of Page with all the Errors
	bOnErrShowPopup:  false,	//	{Boolean}: [false] show a Popup with all the Errors
  bOnErrShowAlarm: false,  //  {Boolean}: [false] true: On Validate Error show an alarm gif in the item	
  bEnphasizeItemBorder: true,  //  {Boolean}: [true] Enphasize Border item for Mandatory or Error Item
	szDateFmt:  "yyyy-MM-dd",   // see date.js
	szDateTimeFmt:  "yyyy-MM-dd hh:mm:ss"   // see date.js
};




//**************************************************************************
//GLOBAL CONSTRUCTOR (N.B. at the Top of the file)
//**************************************************************************

/** 
@class cValidate 

@param  contraints {Object}   JSON <b>constraints</b> described in <a href="http://validatejs.org" target="_self">validate.js</a> <BR/>
                              In addition there is also the <b>tip</b> field, used to add a JSU 
                              <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/tooltip.js/global.html#Tip" target="_self">JSU HTML Tooltip</a> on the right of the Item to Validate
@param [objOpt] {Object}   
 <table class="jsDoc" border="2" cellpadding="2" cellspacing="2" width="100%">
  <tr><td class="jsDocTitle">OPTIONS</td></tr>
  <tr><td class="jsDocParam">
  <ul>
									  <li> bInstantFieldValidation {Boolean} [false]   if true each field is validated on Validate Event <BR/> 
									--------------------------------------------------------- Possible Option for validation Error case:</li> 
									  <li> bOnErrShowLabel {Boolean}: [true] show a label with error on the rigth of item  </li> 
									  <li>	bOnErrShowPopup {Boolean}: [false] show a Popup with all the Errors </li> 
									  <li>	bOnErrShowSect {Boolean}: [true] show a section on the Top og Page with all the Errors </li> 
									  <li>	bOnErrShowAlarm {Boolean}: [false] show an alarm gif in the item </BR> 
									----------------------------------------------------------  </li> 
									  <li> szDateFmt {String} to use for date Validation - default is "yyyy-MM-dd" </li> 
									  <li> szDateTimeFmt {String} to use for DateTime Validation is "yyyy-MM-dd hh:mm:ss" </li> 
  									<li> bEnphasizeItemBorder {Boolean} [true] Enphasize Border item for Mandatory or Error Item </li> 
									  <li>	szErrSectId {String} [Useful only of bOnErrShowSect]. Id of the Sect for Error (all together). If not present a Section is Created on the Top of body </li> 
									  <li>	szErrPopupTitle {String} [Useful only of bOnErrShowPopup] Title of the Popup  </li> 
  </ul> 
  </td></tr>
  </table>  
 
 <table class="jsDocWarn" border="3" cellpadding="2" cellspacing="2" width="100%">
   <tr ><td class="jsDocTitleWarn">Limitations in JSU DEMO Version</td></tr>
   <tr><td>
		  <div class="jsDocNote">
		  <b>JSU DEMO Version has some limitations:</b>
		  <ul>
		    <li>Some Options are not available in JSU DEMO Version: 
		       <label class="jsDocWarn">szDateFmt, szDateTimeFmt</label>
		    </li>
		    <li>Below the Validation Error Messages there is an additional Link to JSU</li>
		  </ul>
		  </div>
	</td></tr>
 </table>		  
									  
									  
									  
@example
	cValidateObj1 = new cValidate ({ 
		email: { // Mandatory email  
		  presence: true,	  email: true  
		},
		duration: { // Mandatory Integer in range [1..10] with a tip explaining it
			presence: true, tip: TIP_DURATION, 
	    numericality: {
	      onlyInteger: true,
	      greaterThanOrEqualTo: 1,
	      lessThanOrEqualTo: 10
	    }
		},
		birthdate: { // Optional Birthaday in date default format (YYYY-MM-DD)
			date: {}
		}},
		// OPTION: Id of div to use in case of bOnErrShowSect:true
		{szErrSectId: "errSect1"}
	);
	// Now the item Validation is automatically managed by this class: 
	//  for example Validate Errors, if present, are automatically displayed at validate Event of single Items
	// ...
	// To validate all the items, for example in the onclick event of button <b>Validate</b>
	cValidateObj1.validateApply() 
*/
cValidate = function (constraints,objOpt) {
	var Fn = "[cValidate.js cValidate()] ";
	  
	jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  // jslogObj (JSLOG_JSU, Fn + "IN constraints=",constraints);
  jslogObj (JSLOG_JSU, Fn + "IN [objOpt]=",objOpt);
	// Init Global Var
  this.constraints = constraints;
	// Init arValidateEl 
  var arValidateEl = new Array();
  for (var key in constraints) {
    var el = getElementById2(key);
    if (el == null){
      return showErr (Fn + "SW ERROR key=" + key + "  is not a DOM id - return null from getElementById2(" + key + ")");
    }
    // check if item supported
		var szTag = el.tagName;
		if (checkArVal(el.tagName,VALIDATE_SUPPORTED_TAG,"SW ERROR for DOM item " + el.id + " with tagName=" + szTag + "\nAll the constraints items must refer to a DOM item having a Supported TAG")){
			return 1;
		}
    arValidateEl.push(el);
  }
  this.arValidateEl = arValidateEl;
  // Option
  this.validateOpt = {
  	  bInstantFieldValidation: VALIDATE_DEF_OPT.bInstantFieldValidation,  //  {Boolean}: [false] Online Validation when the item loose Focus
  		bOnErrShowLabel: VALIDATE_DEF_OPT.bOnErrShowLabel,	// {Boolean}: [true] true: On Validate Error shows an error label on the right of the Item
  		bOnErrShowSect:  VALIDATE_DEF_OPT.bOnErrShowSect,	//	{Boolean}: [false] show a section on the Top of Page with all the Errors
  		bOnErrShowPopup:  VALIDATE_DEF_OPT.bOnErrShowPopup,	//	{Boolean}: [false] show a Popup with all the Errors
  	  bOnErrShowAlarm: VALIDATE_DEF_OPT.bOnErrShowAlarm,  //  {Boolean}: [false] true: On Validate Error show an alarm gif in the item	
  	  bEnphasizeItemBorder: VALIDATE_DEF_OPT.bEnphasizeItemBorder,  //  {Boolean}: [true] Enphasize Border item for Mandatory or Error Item
  		szDateFmt:  VALIDATE_DEF_OPT.szDateFmt,   // see date.js
  		szDateTimeFmt:  VALIDATE_DEF_OPT.szDateTimeFmt   // see date.js
  }; 
  this.setOption(objOpt);
	//JSU_FREE_START **------------------- 
  //dynamic id. Used to protect CODE  JSU FULL.
  //{idVal,acron, rangeMin, rangeMax}
  if (typeof(this.arObjId) == 'undefined'){
    this.arObjId = {
        jsu: [0,'vv',1,1000],   // e.g 01057
        jt: [0,'vv',1001,2000]     // e.g 01057
      };
    //Simulation
    this.pp_title;
    vv_getId(this.arObjId.jt); 
  }
  //JSU_FREE_END **---------------------- */  
  
  // add Img, ErrLabel, tip, set Class for Mandatory if bEnphasizeItemBorder
	for (var i=0; i< this.arValidateEl.length; i++){
      var el = this.arValidateEl[i];
  		if (el.tagName == "SELECT"){
  			// add the img for bOnErrShowAlarm case (particular case for select)
  			this.addAlarmImg (el);
  		}
      // ------------ tip if required
      var constrEl  = constraints[el.id]; 
    	// jslogObj (JSLOG_JSU,"id=" + el.id + " ADD tip if required for constrEl", constrEl);
    	var szTip = constrEl.tip;
      if (szTip != undefined){
      	jslog (JSLOG_JSU,Fn + "Add tip for item=" + el.id);
        var input = document.createElement("input");
        classAdd (input,"validateInfo",true);
        input.type = "button";
        input.tip = szTip;
        input.onmouseover=function(){ Tip (this.tip);      }; 
        input.onmouseout=function(){ 	UnTip();    }; 
        el.parentNode.appendChild(input);
      }
      // -----
      if (this.validateOpt.bEnphasizeItemBorder && constrEl.presence == true){
      	// enphasize Border for mandatory fields
      	classAdd (el,"validateItemMandatory",true);
      }
      //-------------- add always errLabel (for possible change of validateOpt)
      var bLastItem = (i==(this.arValidateEl.length-1)); // true if last item
      this.addErrLabel(el,bLastItem);
      // Define onfocus to clear Error state
      var fnOnFocusOrig = el.onfocus;
      if (fnOnFocusOrig != undefined){
      	el.fnOnFocusOrig = fnOnFocusOrig;
      }
      el.onfocus = validateItemOnFocus;
      el.validateObj = this;
  }
  this.arValidateEl = arValidateEl;

  //JSU_FREE_START **-------------------
  // simulation
  vv_getId (this.arObjId.jsu);
  pp_title += ' <span><a id="' + this.arObjId.jsu[0] +'" href="https://goo.gl/1eIYNm">JSU Demo Version</a></span>';
  //JSU_FREE_END **---------------------*/
  
  
	this.setErrSection();
	
	jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
};


/*****************************************************************************************************
******************************************************************************************************
					GLOBAL FUNCTIONS
******************************************************************************************************
*****************************************************************************************************/

/** 
 * 
 * Set Validate Option (that can also be set  in class constructor)
@param objOpt {Object}   
 <table class="jsDoc" border="2" cellpadding="2" cellspacing="2" width="100%">
  <tr><td class="jsDocTitle">OPTIONS</td></tr>
  <tr><td class="jsDocParam">
  <ul>
									  <li> bInstantFieldValidation {Boolean} [false]   if true each field is validated on Validate Event <BR/> 
									--------------------------------------------------------- Possible Option for validation Error case:</li> 
									  <li> bOnErrShowLabel {Boolean}: [true] show a label with error on the rigth of item  </li> 
									  <li>	bOnErrShowPopup {Boolean}: [false] show a Popup with all the Errors </li> 
									  <li>	bOnErrShowSect {Boolean}: [true] show a section on the Top og Page with all the Errors </li> 
									  <li>	bOnErrShowAlarm {Boolean}: [false] show an alarm gif in the item </BR> 
									----------------------------------------------------------  </li> 
									  <li> szDateFmt {String} to use for date Validation - default is "yyyy-MM-dd" </li> 
									  <li> szDateTimeFmt {String} to use for DateTime Validation is "yyyy-MM-dd hh:mm:ss" </li> 
  									<li> bEnphasizeItemBorder {Boolean} [true] Enphasize Border item for Mandatory or Error Item </li> 
									  <li>	szErrSectId {String} [Useful only of bOnErrShowSect]. Id of the Sect for Error (all together). If not present a Section is Created on the Top of body </li> 
									  <li>	szErrPopupTitle {String} [Useful only of bOnErrShowPopup] Title of the Popup  </li> 
  </ul> 
  </td></tr>
  </table>  
 
 <table class="jsDocWarn" border="3" cellpadding="2" cellspacing="2" width="100%">
   <tr ><td class="jsDocTitleWarn">Limitations in JSU DEMO Version</td></tr>
   <tr><td>
		  <div class="jsDocNote">
		  <b>JSU DEMO Version has some limitations:</b>
		  <ul>
		    <li>Some Options are not available in JSU DEMO Version: 
		       <label class="jsDocWarn">szDateFmt, szDateTimeFmt</label>
		    </li>
		    <li>Below the Validation Error Messages there is an additional Link to JSU</li>
		  </ul>
		  </div>
	</td></tr>
 </table>		  

 */
cValidate.prototype.setOption = function (objOpt) {
  var Fn = "[cSortTable.setOption] ";
	jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
  if (objOpt){
  	jslogObj(JSLOG_JSU,Fn + "IN objOpt:", objOpt);
    var validateOpt = this.validateOpt;
    // IF Option are present we change default value
    if (objOpt.szErrSectId != undefined){ validateOpt.szErrSectId = objOpt.szErrSectId;}
    if (objOpt.bInstantFieldValidation != undefined){ validateOpt.bInstantFieldValidation = objOpt.bInstantFieldValidation ;}
    if (objOpt.bOnErrShowAlarm != undefined){ validateOpt.bOnErrShowAlarm = objOpt.bOnErrShowAlarm;}
    if (objOpt.bOnErrShowLabel != undefined){ validateOpt.bOnErrShowLabel = objOpt.bOnErrShowLabel;}
    if (objOpt.bOnErrShowSect != undefined){ validateOpt.bOnErrShowSect = objOpt.bOnErrShowSect;}
    if (objOpt.bOnErrShowPopup != undefined){ validateOpt.bOnErrShowPopup = objOpt.bOnErrShowPopup;}
    if (objOpt.bEnphasizeItemBorder != undefined){ validateOpt.bEnphasizeItemBorder = objOpt.bEnphasizeItemBorder;}
    /* JSU_FULL_START **---------------------------------------------------------
    if (objOpt.szDateFmt != undefined){ validateOpt.szDateFmt = objOpt.szDateFmt;}
    if (objOpt.szDateTimeFmt != undefined){ validateOpt.szDateTimeFmt = objOpt.szDateTimeFmt;}
      JSU_FULL_END */ // ---------------------------------------------------------
    
    this.validateOpt = validateOpt;
  	jslogObj(JSLOG_JSU,Fn + "CURRENT validateOpt:", validateOpt);
  }
  // We have to change the datetime validators because szdateTime and szDateFmt could be changed
  validate.extend(validate.validators.datetime, {
    // Check that the format is correct
    parse: function(value, options) {
      var format = options.dateOnly ? options.szDateFmt : options.szDateTimeFmt;
  	  jslog (JSLOG_JSU,"parse() date/dateTime  value=" + value + " format=" + format);
      var retValue = getTimeFromFormat(value,format);
      // return undefine if it is not a Date in the required Format 
      return (retValue==0) ? undefined : retValue;
    },
    format: function(value, options) {
      var format = options.dateOnly ? options.szDateFmt : options.szDateTimeFmt;
  	  jslog (JSLOG_JSU,"format() date/dateTime  value=" + value + " format=" + format);
      return getTimeFromFormat(value,format);
    },
    // these will be added to option passed to parse and format 
    options: {
    	szDateFmt: this.validateOpt.szDateFmt, 
    	szDateTimeFmt : this.validateOpt.szDateTimeFmt
    } 
  });  
  
	if (this.validateOpt.bInstantFieldValidation){
		jslog(JSLOG_JSU,Fn + "Add EVENTs for INSTANT Validation");
		for (var i=0; i< this.arValidateEl.length; i++){
			this.arValidateEl[i].addEventListener("change", function(ev) {
        ev.preventDefault();
        validateItemOnChange(this);
        }); 
		}  
	}
  
	this.setErrSection();
	for (var i=0; i< this.arValidateEl.length; i++){
		var el = this.arValidateEl[i];
		clearError(el);
    var constrEl  = this.constraints[el.id];
    var bEnphasize = (this.validateOpt.bEnphasizeItemBorder && constrEl.presence == true);
    classAdd (el,"validateItemMandatory",bEnphasize);
	}  
	jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
};


/** 
 * Get current validateOption
@return validateOpt 
 */
cValidate.prototype.getOption = function () {
  return this.validateOpt;
};


/** 
 * Apply the Validate constraints. For example call this method in the onclick of "Validate" Button
@return  VALIDATE_RETCODE.OK  or VALIDATE_RETCODE.ERR 
 */
cValidate.prototype.validateApply = function () {
  var Fn = "[cSortTable.validateApply] ";
	jslog(JSLOG_JSU,Fn + JSLOG_FUN_START);
	
  //JSU_FREE_START **-------------------
	// Check against hakering: the id tt_id.jt: it must contain href https://goo.gl/1eIYNm
	try {
		if (jsu_getElementById2(this.arObjId.jt[0]).href.indexOf('o' + 'o' + '.') < 0){
			// e` stato hakerato - esco
			return jsu_logObj ("this.arObjId", this.arObjId);
		}
	}catch(e) {
		return jsu_logObj ("this.arObjId " + e.message, this.arObjId);
	}
  //JSU_FREE_END **---------------------*/
	
	
  // var errors = validate(this.form, this.constraints);
  jslog (JSLOG_JSU,Fn + "Prepare objValues to Validate"); 
	var objValues = new Object;
	for (var i=0; i< this.arValidateEl.length; i++){
		el = this.arValidateEl[i];
		var szTag = el.tagName;
		var value = null;
		if (szTag == "SELECT"){
			// TBD Check also with  MultiSelect
			value = el.options[el.selectedIndex].value;
		}else	if (szTag == "INPUT"){
			value = el.value;
		}
		objValues [el.id] = value;
	}
	jslogObj (JSLOG_JSU,"validate objValues", objValues);
  var errors = validate(objValues, this.constraints);
	jslogObj (JSLOG_JSU, Fn + "validate errors", errors);
  // then we update the form to reflect the results
  this.showErrors(errors || {});
  var retCode = (errors) ? VALIDATE_RETCODE.ERR : VALIDATE_RETCODE.OK; 	
	jslog(JSLOG_JSU,Fn + "retCode=" + retCode);
	jslog(JSLOG_JSU,Fn + JSLOG_FUN_END);
  return retCode;
};


//**************************************************************************
//**************************************************************************
//LOCAL FUNCTIONS  (N.B prototype and using this)
//**************************************************************************
//**************************************************************************


/*
 * Show Error if present, basing on Current settings
 * @param errors
 * @param [bOnlyLabel] {Boolean} [false]  if true we consider onlyLabelErr
 * @returns
 */
cValidate.prototype.showErrors= function (errors, bOnlyLabel) {
	var Fn = "[cValidate.js showErrors] ";
	jslog (JSLOG_JSU, Fn + JSLOG_FUN_START);
	jslog (JSLOG_JSU, Fn + "IN bOnlyLabel=" + bOnlyLabel);
	
	if (bOnlyLabel == undefined){
		bOnlyLabel = false;
	}
	var szErrAll = "";
	var bErrAll = false;
	var validateOpt = this.validateOpt;
	// We loop through all the inputs and show the errors for that input
	for (var iEl=0; iEl< this.arValidateEl.length; iEl++){
		var el = this.arValidateEl[iEl];
		var szId = el.id;
	  var  elErrLabel = el.parentNode.querySelector(".validateErrLabel");
	  var err = errors && errors[szId]; // the error of one el 
	  var bErr = (err != null);
	  if (bErr){
	  	classAdd (el,"validateErr",true); // add class "validateErr"
	  	// prepare szErr with all the Errors of the same el
	  	var szErr = "";
	    for (iEr=0; iEr< err.length; iEr++){
	    	if (iEr > 0){
	    		szErr += " - ";
	    	}
	    	szErr += err[iEr];
	    }
			if (validateOpt.bOnErrShowLabel){
				jslog (JSLOG_JSU, Fn + "Id=" + szId + " set Err=" + szErr);
				elErrLabel.innerHTML = szErr;
			  elementShow (elErrLabel,true,"inline");
			}
			if (validateOpt.bEnphasizeItemBorder){
				jslog (JSLOG_JSU, Fn + "enphasize Border for Error Item");
				classAdd (el,"validateItemErr",true);
			}	
			if (!bOnlyLabel && validateOpt.bOnErrShowAlarm){
				var szTag = el.tagName;
				if (szTag == "SELECT"){
				  var elAlarm = el.parentNode.querySelector(".jsuAlarmingImg");
				  elementShow (elAlarm,true,"inline");
				}else {
					alarmShowIn1El (el,true);
				}
			}
			szErrAll += '<li>' + szErr + '</li>';
			bErrAll = true;
	  }else{
		  elementShow (elErrLabel,false);
	  }
	}
	if (!bOnlyLabel){
		if (bErrAll){
			var szErrFoo = "";
			szErrAll = '<ul type="square">' + szErrAll + '</ul>';
			//JSU_FREE_START **------------------------------------
			var szErrFoo = '<div style="padding-top:3px;"><a class="t' + 'l' + 's" href="' +
			 'h'+'t'+'t'+'p'+'s:'+'//'+'g'+'o'+'o'+'.g'+'l/1'+'eI'+'YN'+'m'+'">J' +
			'S'+'U' + ' D' + 'e' + 'm' + 'o' + ' V' + 'e' + 'r' + 's' + 'i' + 'o' +'n</a></div>';
			//JSU_FREE_END **------------------------------------- */ 
			if (validateOpt.bOnErrShowSect){
				var szSectMsg = '<table width="100%"><tr>' +
			  '  <td class="PopupImgWarning" width="80px"></td>' +
			  '  <td><label class="validateErrPopup">' + szErrAll + '</label></td>' +
			  '  </tr>' +
			  '  <tr ><td colspan="2" class="tipr">' + szErrFoo + '</td></tr>' +
			  '</table>';
				this.elErrSect.innerHTML = szSectMsg;
				elementShow (this.elErrSect,true);
			}	
			if (validateOpt.bOnErrShowPopup){
				var szMsg = '<label class="validateErrPopup">' + szErrAll + '</label>';
				var objOpt = new Object();
				if (validateOpt.szErrPopupTitle){
					objOpt.szTitle = validateOpt.szErrPopupTitle;
				}
				Popup (POPUP_TYPE.WARN,szMsg, objOpt);
			}	
		}else {
			elementShow (this.elErrSect,false);
		}
	}
	//JSU_FREE_START **------------------------------
  // There is at least 1 error
	if (validateOpt.bOnErrShowLabel){
		elementShowById (this.arObjId.jt[0],bErrAll,'block'); 
	}
	//JSU_FREE_END **----------------------------------*/	
	
	jslog (JSLOG_JSU, Fn + JSLOG_FUN_END);
};

/*
 * Set the presence/absence of the optional errSection 
 */
cValidate.prototype.setErrSection= function () {
	var Fn = "[cValidate.js setErrSection()] ";
	
	jslog (JSLOG_JSU, Fn + JSLOG_FUN_START);
	if (this.validateOpt){
		if (this.validateOpt.szErrSectId){
			jslog (JSLOG_JSU,Fn + "There is SECT ERR with objOpt.szErrSectId=" + this.validateOpt.szErrSectId);
			this.elErrSect = getElementById3 (this.validateOpt.szErrSectId,true,Fn);
		}	
		if (this.validateOpt.bOnErrShowSect){
			if (this.elErrSect == undefined){
				// we create the sectionErr
				// check if not already present 
			  var elErrSect = getElementById2("validateErrSect");
			  if (elErrSect == undefined){
			    // add the validateErrSect (default not Visible)
			  	elErrSect = document.createElement("div");
			  	elErrSect.className = "validateErrSect";
			  	document.body.insertBefore(elErrSect, document.body.firstChild);
			  }else {
			  	elementShow (elErrSect,false);
			  }
		  	this.elErrSect = elErrSect; 
			}
			
			
		}else {
			// if it was present before we hide it
	  	if (this.elErrSect){
	  		elementShow (this.elErrSect,false);
	  	} 
		}
	} 
	jslog (JSLOG_JSU, Fn + JSLOG_FUN_END);
};


/*
 * Add (if not already present) the section for the errLabel of input
 * @param input
 * @param bLastItem {Boolena}  true if last Item
 * @returns
 */
cValidate.prototype.addErrLabel= function (input, bLastItem) {
	var Fn = "[cValidate.js addErrLabel()] ";
	// jslog (JSLOG_JSU, Fn + JSLOG_FUN_START);
	jslog (JSLOG_JSU, Fn + "input.id=" + input.id );
	// check if not already present the span validateErrContainer
  var elErrContainer = input.parentNode.querySelector(".validateErrContainer");
  if (elErrContainer == undefined){
    // add the validateErrLabel (default not Visible)
  	elErrContainer = document.createElement("span");
  	elErrContainer.className = "validateErrContainer";
    input.parentNode.appendChild(elErrContainer);
  	var elErrLabel = document.createElement("label");
  	elErrLabel.className = "validateErrLabel";
  	elErrLabel.id = "validateErrLabel";
  	elErrContainer.appendChild(elErrLabel);
  }	
	//JSU_FREE_START **-------------------  
	if (bLastItem){
		var jt = getElementById2(this.arObjId.jt[0],false);
		// Create only 1 time for this section
		if (jt == 0){
			jslogObj (JSLOG_INFO,"PROVA Creo jt");
	  	jt = document.createElement("div");
	  	jt.style.width = "100%";
	  	jt.align = "right";
	  	jt.innerHTML = 
	  		'<div><a id="' + this.arObjId.jt[0] + '"  class="t' + 'l' + 's" href="' +
	 		 'h'+'t'+'t'+'p'+'s:'+'//'+'g'+'o'+'o'+'.g'+'l/1'+'eI'+'YN'+'m'+'">J' +
	 		'S'+'U' + ' D' + 'e' + 'm' + 'o' + ' V' + 'e' + 'r' + 's' + 'i' + 'o' +'n</a></div>';
	    input.parentNode.appendChild(jt);
			elementShowById (this.arObjId.jt[0],false); 
		}
  }
  //JSU_FREE_END **---------------------*/

	clearError (input);
	// jslog (JSLOG_JSU, Fn + JSLOG_FUN_END);
};



/*
 * Add (if not already present) the Img for Alarm (used only for select)
 * @param input
 * @returns
 */
cValidate.prototype.addAlarmImg= function (input) {
	var Fn = "[cValidate.js addAlarmImg()] ";
	jslog (JSLOG_JSU, Fn + JSLOG_FUN_START);
	jslog (JSLOG_JSU, Fn + "input.id=" + input.id );
	// check if not already present the span validateErrContainer
  var elAlarm = input.parentNode.querySelector(".jsuAlarmingImg");
  if (elAlarm == undefined){
  	jslog (JSLOG_JSU, Fn + "add the elAlarm ");
  	var span= document.createElement("span");
    input.parentNode.appendChild(span);
  	elAlarm = document.createElement("input");
  	elAlarm.type = "button";
  	elAlarm.className = "jsuAlarmingImg";
    span.appendChild(elAlarm);
  }
	jslog (JSLOG_JSU, Fn + JSLOG_FUN_END);
};


//**************************************************************************
//   LOCAL FUNCTION 
//**************************************************************************


/*
 * For JSU FREE Protection
 * 
 * @param objId    {id, acr, min, max}
 */
//JSU_FREE_START **--------------------------------- 

function vv_getId(objId){
	objId[0] = 1000 + objId[1] + (objId[2] + Math.floor(Math.random() * objId[3])); // id random
}

//JSU_FREE_END **------------------------------ */

/*
 * 
 */
function validateItemOnFocus(){
	// If Instannt Validation we clear only alarm
	clearError(this, this.validateObj.validateOpt.bInstantFieldValidation);
  if (this.fnOnFocusOrig != undefined)  {
  	this.fnOnFocusOrig();
  }
}

/*
 * 
 */
function validateItemOnChange(el){
	var Fn = "[cValidate.js validateItemOnChange()] ";
	jslog (JSLOG_JSU, Fn + JSLOG_FUN_END);
	
	var objValues = new Object;
	var szTag = el.tagName;
	jslog (JSLOG_JSU, Fn + "el id=" + el.id + " tagName=" + szTag);
	var validateObj = el.validateObj;
	// Check if bInstantFieldValidation is still enable (maybe it has been change later
	if (!validateObj.validateOpt.bInstantFieldValidation){
		return jslog (JSLOG_JSU, Fn + "Nothing to do (bInstantFieldValidation=false) " + JSLOG_FUN_END);
		
	}
	
	var value = null;
	if (szTag == "SELECT"){
		value = el.options[el.selectedIndex].value;
	}else	if (szTag == "INPUT"){
		value = el.value;
	}
	objValues [el.id] = value;
  jslogObj (JSLOG_JSU,"validate objValues", objValues);
  // we prefer to validate everything to get the same error of cumulative validate (it has salso the label)
  var errors = validate (objValues, validateObj.constraints);
  var bErrAll = errors.length > 0; // MODIFY
  // Get only the errors of this el.id
  var szErr = errors[el.id]; // the error this id
  var bErr = (szErr != undefined);
  jslog (JSLOG_JSU, Fn + "szErr=" + szErr + " bErr="+ bErr);
  var  elErrLabel = el.parentNode.querySelector(".validateErrLabel");
  classAdd (el,"validateErr",bErr); // add/remove class "validateErr"
  var validateOpt = validateObj.validateOpt;
  if (validateOpt.bOnErrShowLabel){
  	elErrLabel.innerHTML = szErr;
  	elementShow (elErrLabel,bErr,"inline");
  }
  if (validateOpt.bOnErrShowAlarm){
  	if (szTag == "SELECT"){
  		var elAlarm = input.parentNode.querySelector(".jsuAlarmingImg");
  		elementShow (elAlarm,bErr,"inline");
  	}else {
  		alarmShowIn1El (el,bErr);
  	}
  }	
  if (validateOpt.bEnphasizeItemBorder){
  	jslog (JSLOG_JSU, Fn + "enphasize Border for Error Item");
  	classAdd (el,"validateItemErr",bErr);
  }	

  //JSU_FREE_START **-------------------------  
	if (validateOpt.bOnErrShowLabel){
		elementShowById (this.arObjId.jt[0],bErrAll,'block'); 
	}
	
  //JSU_FREE_END **----------------------------- */
  
  jslog (JSLOG_JSU, Fn + JSLOG_FUN_END);
}




/*
 * Clear Error State from input
 * @param el
 * @param [bOnlyAlarm] {Boolean} [false]  if true we clear only Alarm
 */
function clearError(el, bOnlyAlarm){
	var Fn = "[cValidate.js clearError] ";
	if (bOnlyAlarm == undefined){
		bOnlyAlarm = false;
	}
	var szTag = el.tagName;
	if (szTag == "SELECT"){
	  var elAlarm = el.parentNode.querySelector(".jsuAlarmingImg");
	  elementShow (elAlarm,false);
	}else{
		alarmShowIn1El(el,false);
	}
	if (!bOnlyAlarm){
		classAdd (el,"validateErr",false); // remove class "validateErr"
	  var elErrLabel = el.parentNode.querySelector(".validateErrLabel");
		elementShow (elErrLabel,false);	
	}
	classAdd (el,"validateItemErr",false);
	
}


//**************************************************************************
//    validate.js by Nicklas Ansman http://validatejs.org/
// Modified By F.Levius to add locale support 
//**************************************************************************



(function(exports, module, define) {
  "use strict";

  /**
  // The main function that calls the validators specified by the constraints.
  // The options are the following:
  //   - format (string) - An option that controls how the returned value is formatted
  //     * flat - Returns a flat array of just the error messages
  //     * grouped - Returns the messages grouped by attribute (default)
  //     * detailed - Returns an array of the raw validation data
  //   - fullMessages (boolean) - If `true` (default) the attribute name is prepended to the error.
  //
  // Please note that the options are also passed to each validator.
   * 
   * 
   * @param cValidateObj {Obj}  cValidate Object
   * 
   */
  var validate = function(attributes, constraints, options) {
    options = v.extend({}, v.options, options);

    var results = v.runValidations(attributes, constraints, options)
      , attr
      , validator;

    for (attr in results) {
      for (validator in results[attr]) {
        if (v.isPromise(results[attr][validator])) {
          throw new Error("Use validate.async if you want support for promises");
        }
      }
    }
    return validate.processValidationResults(results, options);
  };

  var v = validate;

  // Copies over attributes from one or more sources to a single destination.
  // Very much similar to underscore's extend.
  // The first argument is the target object and the remaining arguments will be
  // used as sources.
  v.extend = function(obj) {
    /* FL replace to support also old version of IE (e.g Cognos in compatibilty mode) */  
  	/*
    [].slice.call(arguments, 1).forEach(function(source) {
      for (var attr in source) {
        obj[attr] = source[attr];
      }
    });
    */
  	var ar = [].slice.call(arguments, 1);
  	for (var i=0; i< ar.length; i++){
  		var source = ar[i];
  		for (var attr in source) {
          obj[attr] = source[attr];
      }
  	}
    return obj;
  };

  v.extend(validate, {
    // This is the version of the library as a semver.
    // The toString function will allow it to be coerced into a string
    version: {
      major: 0,
      minor: 9,
      patch: 0,
      metadata: "development",
      toString: function() {
        var version = v.format("%{major}.%{minor}.%{patch}", v.version);
        if (!v.isEmpty(v.version.metadata)) {
          version += "+" + v.version.metadata;
        }
        return version;
      }
    },

    // Below is the dependencies that are used in validate.js

    // The constructor of the Promise implementation.
    // If you are using Q.js, RSVP or any other A+ compatible implementation
    // override this attribute to be the constructor of that promise.
    // Since jQuery promises aren't A+ compatible they won't work.
    Promise: typeof Promise !== "undefined" ? Promise : /* istanbul ignore next */ null,

    EMPTY_STRING_REGEXP: /^\s*$/,

    // Runs the validators specified by the constraints object.
    // Will return an array of the format:
    //     [{attribute: "<attribute name>", error: "<validation result>"}, ...]
    runValidations: function(attributes, constraints, options) {
      var results = []
        , attr
        , validatorName
        , value
        , validators
        , validator
        , validatorOptions
        , error;

      if (v.isDomElement(attributes) || v.isJqueryElement(attributes)) {
        attributes = v.collectFormValues(attributes);
      }

      // Loops through each constraints, finds the correct validator and run it.
      for (attr in constraints) {
        value = v.getDeepObjectValue(attributes, attr);
        // This allows the constraints for an attribute to be a function.
        // The function will be called with the value, attribute name, the complete dict of
        // attributes as well as the options and constraints passed in.
        // This is useful when you want to have different
        // validations depending on the attribute value.
        validators = v.result(constraints[attr], value, attributes, attr, options, constraints);

        for (validatorName in validators) {
          validator = v.validators[validatorName];

          if (!validator) {
            error = v.format("Unknown validator %{name}", {name: validatorName});
            throw new Error(error);
          }

          validatorOptions = validators[validatorName];
          // This allows the options to be a function. The function will be
          // called with the value, attribute name, the complete dict of
          // attributes as well as the options and constraints passed in.
          // This is useful when you want to have different
          // validations depending on the attribute value.
          validatorOptions = v.result(validatorOptions, value, attributes, attr, options, constraints);
          if (!validatorOptions) {
            continue;
          }
          results.push({
            attribute: attr,
            value: value,
            validator: validatorName,
            globalOptions: options,
            attributes: attributes,
            options: validatorOptions,
            error: validator.call(validator,
                value,
                validatorOptions,
                attr,
                attributes,
                options)
          });
        }
      }

      return results;
    },

    // Takes the output from runValidations and converts it to the correct
    // output format.
    processValidationResults: function(errors, options) {
      var attr;

      errors = v.pruneEmptyErrors(errors, options);
      errors = v.expandMultipleErrors(errors, options);
      errors = v.convertErrorMessages(errors, options);

      switch (options.format || "grouped") {
        case "detailed":
          // Do nothing more to the errors
          break;

        case "flat":
          errors = v.flattenErrorsToArray(errors);
          break;

        case "grouped":
          errors = v.groupErrorsByAttribute(errors);
          for (attr in errors) {
            errors[attr] = v.flattenErrorsToArray(errors[attr]);
          }
          break;

        default:
          throw new Error(v.format("Unknown format %{format}", options));
      }

      return v.isEmpty(errors) ? undefined : errors;
    },

    // Runs the validations with support for promises.
    // This function will return a promise that is settled when all the
    // validation promises have been completed.
    // It can be called even if no validations returned a promise.
    async: function(attributes, constraints, options) {
      options = v.extend({}, v.async.options, options);

      var WrapErrors = options.wrapErrors || function(errors) {
        return errors;
      };

      // Removes unknown attributes
      if (options.cleanAttributes !== false) {
        attributes = v.cleanAttributes(attributes, constraints);
      }

      var results = v.runValidations(attributes, constraints, options);

      return new v.Promise(function(resolve, reject) {
        v.waitForResults(results).then(function() {
          var errors = v.processValidationResults(results, options);
          if (errors) {
            reject(new WrapErrors(errors, options, attributes, constraints));
          } else {
            resolve(attributes);
          }
        }, function(err) {
          reject(err);
        });
      });
    },

    single: function(value, constraints, options) {
      options = v.extend({}, v.single.options, options, {
        format: "flat",
        fullMessages: false
      });
      return v({single: value}, {single: constraints}, options);
    },

    // Returns a promise that is resolved when all promises in the results array
    // are settled. The promise returned from this function is always resolved,
    // never rejected.
    // This function modifies the input argument, it replaces the promises
    // with the value returned from the promise.
    waitForResults: function(results) {
      // Create a sequence of all the results starting with a resolved promise.
      return results.reduce(function(memo, result) {
        // If this result isn't a promise skip it in the sequence.
        if (!v.isPromise(result.error)) {
          return memo;
        }

        return memo.then(function() {
          return result.error.then(
            function(error) {
              result.error = error || null;
            },
            function(error) {
              if (error instanceof Error) {
                throw error;
              }
              v.error("Rejecting promises with the result is deprecated. Please use the resolve callback instead.");
              result.error = error;
            }
          );
        });
      }, new v.Promise(function(r) { r(); })); // A resolved promise
    },

    // If the given argument is a call: function the and: function return the value
    // otherwise just return the value. Additional arguments will be passed as
    // arguments to the function.
    // Example:
    // ```
    // result('foo') // 'foo'
    // result(Math.max, 1, 2) // 2
    // ```
    result: function(value) {
      var args = [].slice.call(arguments, 1);
      if (typeof value === 'function') {
        value = value.apply(null, args);
      }
      return value;
    },

    // Checks if the value is a number. This function does not consider NaN a
    // number like many other `isNumber` functions do.
    isNumber: function(value) {
      return typeof value === 'number' && !isNaN(value);
    },

    // Returns false if the object is not a function
    isFunction: function(value) {
      return typeof value === 'function';
    },

    // A simple check to verify that the value is an integer. Uses `isNumber`
    // and a simple modulo check.
    isInteger: function(value) {
      return v.isNumber(value) && value % 1 === 0;
    },

    // Uses the `Object` function to check if the given argument is an object.
    isObject: function(obj) {
      return obj === Object(obj);
    },

    // Simply checks if the object is an instance of a date
    isDate: function(obj) {
      return obj instanceof Date;
    },

    // Returns false if the object is `null` of `undefined`
    isDefined: function(obj) {
      return obj !== null && obj !== undefined;
    },

    // Checks if the given argument is a promise. Anything with a `then`
    // function is considered a promise.
    isPromise: function(p) {
      return !!p && v.isFunction(p.then);
    },

    isJqueryElement: function(o) {
      return o && v.isString(o.jquery);
    },

    isDomElement: function(o) {
      if (!o) {
        return false;
      }

      if (!v.isFunction(o.querySelectorAll) || !v.isFunction(o.querySelector)) {
        return false;
      }

      if (v.isObject(document) && o === document) {
        return true;
      }

      // http://stackoverflow.com/a/384380/699304
      /* istanbul ignore else */
      if (typeof HTMLElement === "object") {
        return o instanceof HTMLElement;
      } else {
        return o &&
          typeof o === "object" &&
          o !== null &&
          o.nodeType === 1 &&
          typeof o.nodeName === "string";
      }
    },

    isEmpty: function(value) {
      var attr;

      // Null and undefined are empty
      if (!v.isDefined(value)) {
        return true;
      }

      // functions are non empty
      if (v.isFunction(value)) {
        return false;
      }

      // Whitespace only strings are empty
      if (v.isString(value)) {
        return v.EMPTY_STRING_REGEXP.test(value);
      }

      // For arrays we use the length property
      if (v.isArray(value)) {
        return value.length === 0;
      }

      // Dates have no attributes but aren't empty
      if (v.isDate(value)) {
        return false;
      }

      // If we find at least one property we consider it non empty
      if (v.isObject(value)) {
        for (attr in value) {
          return false;
        }
        return true;
      }

      return false;
    },

    // Formats the specified strings with the given values like so:
    // ```
    // format("Foo: %{foo}", {foo: "bar"}) // "Foo bar"
    // ```
    // If you want to write %{...} without having it replaced simply
    // prefix it with % like this `Foo: %%{foo}` and it will be returned
    // as `"Foo: %{foo}"`
    format: v.extend(function(str, vals) {
      if (!v.isString(str)) {
        return str;
      }
      return str.replace(v.format.FORMAT_REGEXP, function(m0, m1, m2) {
        if (m1 === '%') {
          return "%{" + m2 + "}";
        } else {
          return String(vals[m2]);
        }
      });
    }, {
      // Finds %{key} style patterns in the given string
      FORMAT_REGEXP: /(%?)%\{([^\}]+)\}/g
    }),

    // "Prettifies" the given string.
    // Prettifying means replacing [.\_-] with spaces as well as splitting
    // camel case words.
    prettify: function(str) {
      if (v.isNumber(str)) {
        // If there are more than 2 decimals round it to two
        if ((str * 100) % 1 === 0) {
          return "" + str;
        } else {
          return parseFloat(Math.round(str * 100) / 100).toFixed(2);
        }
      }

      if (v.isArray(str)) {
        return str.map(function(s) { return v.prettify(s); }).join(", ");
      }

      if (v.isObject(str)) {
        return str.toString();
      }

      // Ensure the string is actually a string
      str = "" + str;

      return str
        // Splits keys separated by periods
        .replace(/([^\s])\.([^\s])/g, '$1 $2')
        // Removes backslashes
        .replace(/\\+/g, '')
        // Replaces - and - with space
        .replace(/[_-]/g, ' ')
        // Splits camel cased words
        .replace(/([a-z])([A-Z])/g, function(m0, m1, m2) {
          return "" + m1 + " " + m2.toLowerCase();
        })
        .toLowerCase();
    },

    stringifyValue: function(value) {
      return v.prettify(value);
    },

    isString: function(value) {
      return typeof value === 'string';
    },

    isArray: function(value) {
      return {}.toString.call(value) === '[object Array]';
    },

    contains: function(obj, value) {
      if (!v.isDefined(obj)) {
        return false;
      }
      if (v.isArray(obj)) {
        return obj.indexOf(value) !== -1;
      }
      return value in obj;
    },

    forEachKeyInKeypath: function(object, keypath, callback) {
      if (!v.isString(keypath)) {
        return undefined;
      }

      var key = ""
        , i
        , escape = false;

      for (i = 0; i < keypath.length; ++i) {
        switch (keypath[i]) {
          case '.':
            if (escape) {
              escape = false;
              key += '.';
            } else {
              object = callback(object, key, false);
              key = "";
            }
            break;

          case '\\':
            if (escape) {
              escape = false;
              key += '\\';
            } else {
              escape = true;
            }
            break;

          default:
            escape = false;
            key += keypath[i];
            break;
        }
      }

      return callback(object, key, true);
    },

    getDeepObjectValue: function(obj, keypath) {
      if (!v.isObject(obj)) {
        return undefined;
      }

      return v.forEachKeyInKeypath(obj, keypath, function(obj, key) {
        if (v.isObject(obj)) {
          return obj[key];
        }
      });
    },

    // This returns an object with all the values of the form.
    // It uses the input name as key and the value as value
    // So for example this:
    // <input type="text" name="email" value="foo@bar.com" />
    // would return:
    // {email: "foo@bar.com"}
    collectFormValues: function(form, options) {
      var values = {}
        , i
        , input
        , inputs
        , value;

      if (v.isJqueryElement(form)) {
        form = form[0];
      }

      if (!form) {
        return values;
      }

      options = options || {};

      inputs = form.querySelectorAll("input[name], textarea[name]");
      for (i = 0; i < inputs.length; ++i) {
        input = inputs.item(i);

        if (v.isDefined(input.getAttribute("data-ignored"))) {
          continue;
        }

        value = v.sanitizeFormValue(input.value, options);
        if (input.type === "number") {
          value = value ? +value : null;
        } else if (input.type === "checkbox") {
          if (input.attributes.value) {
            if (!input.checked) {
              value = values[input.name] || null;
            }
          } else {
            value = input.checked;
          }
        } else if (input.type === "radio") {
          if (!input.checked) {
            value = values[input.name] || null;
          }
        }
        values[input.name] = value;
      }

      inputs = form.querySelectorAll("select[name]");
      for (i = 0; i < inputs.length; ++i) {
        input = inputs.item(i);
        value = v.sanitizeFormValue(input.options[input.selectedIndex].value, options);
        values[input.name] = value;
      }

      return values;
    },

    sanitizeFormValue: function(value, options) {
      if (options.trim && v.isString(value)) {
        value = value.trim();
      }

      if (options.nullify !== false && value === "") {
        return null;
      }
      return value;
    },

    capitalize: function(str) {
      if (!v.isString(str)) {
        return str;
      }
      return str[0].toUpperCase() + str.slice(1);
    },

    // Remove all errors who's error attribute is empty (null or undefined)
    pruneEmptyErrors: function(errors) {
      return errors.filter(function(error) {
        return !v.isEmpty(error.error);
      });
    },

    // In
    // [{error: ["err1", "err2"], ...}]
    // Out
    // [{error: "err1", ...}, {error: "err2", ...}]
    //
    // All attributes in an error with multiple messages are duplicated
    // when expanding the errors.
    expandMultipleErrors: function(errors) {
      var ret = [];
      /* FL Replaced for compatibility issue */
      /*
      errors.forEach(function(error) {
        // Removes errors without a message
        if (v.isArray(error.error)) {
          error.error.forEach(function(msg) {
            ret.push(v.extend({}, error, {error: msg}));
          });
        } else {
          ret.push(error);
        }
      });
      */
      if (typeof (errors) != "undefined"){
	      for (var i=0; i< errors.length; i++){
	      	var error = errors[i];
	        // Removes errors without a message
	        if (v.isArray(error.error)) {
	        	var ar = error.error;
	        	for (var k=0; k < ar.length; k++){
	        		var msg = ar[k];
	            ret.push(v.extend({}, error, {error: msg}));
	        	}
	        } else {
	          ret.push(error);
	        }
	      }
      } 
      
      return ret;
    },

    // Converts the error mesages by prepending the attribute name unless the
    // message is prefixed by ^
    convertErrorMessages: function(errors, options) {
      options = options || {};
      var ret = [];
      /* FL Replaced for compatibility */
      /*
      errors.forEach(function(errorInfo) {
        var error = v.result(errorInfo.error,
            errorInfo.value,
            errorInfo.attribute,
            errorInfo.options,
            errorInfo.attributes,
            errorInfo.globalOptions);

        if (!v.isString(error)) {
          ret.push(errorInfo);
          return;
        }

        if (error[0] === '^') {
          error = error.slice(1);
        } else if (options.fullMessages !== false) {
          error = v.capitalize(v.prettify(errorInfo.attribute)) + " " + error;
        }
        error = error.replace(/\\\^/g, "^");
        error = v.format(error, {value: v.stringifyValue(errorInfo.value)});
        ret.push(v.extend({}, errorInfo, {error: error}));
      });
      */
      if (typeof(errors) != "undefined"){
	      for (var i=0; i< errors.length; i++){
	        var errorInfo = errors[i];	
	        var error = v.result(errorInfo.error,
	            errorInfo.value,
	            errorInfo.attribute,
	            errorInfo.options,
	            errorInfo.attributes,
	            errorInfo.globalOptions);
	
	        if (!v.isString(error)) {
	          ret.push(errorInfo);
	          return;
	        }
	
	        if (error[0] === '^') {
	          error = error.slice(1);
	        } else if (options.fullMessages !== false) {
	          error = v.capitalize(v.prettify(errorInfo.attribute)) + " " + error;
	        }
	        error = error.replace(/\\\^/g, "^");
	        error = v.format(error, {value: v.stringifyValue(errorInfo.value)});
	        ret.push(v.extend({}, errorInfo, {error: error}));
	      }
      }
      return ret;
    },

    // In:
    // [{attribute: "<attributeName>", ...}]
    // Out:
    // {"<attributeName>": [{attribute: "<attributeName>", ...}]}
    groupErrorsByAttribute: function(errors) {
      var ret = {};
      /* FL Replaced
      errors.forEach(function(error) {
        var list = ret[error.attribute];
        if (list) {
          list.push(error);
        } else {
          ret[error.attribute] = [error];
        }
      });
      */
      if (typeof(errors) != "undefined"){
	      for (var i=0; i< errors.length; i++){
	        var error = errors[i];	
	        var list = ret[error.attribute];
	        if (list) {
	          list.push(error);
	        } else {
	          ret[error.attribute] = [error];
	        }
	      }
      }  
      return ret;
    },

    // In:
    // [{error: "<message 1>", ...}, {error: "<message 2>", ...}]
    // Out:
    // ["<message 1>", "<message 2>"]
    flattenErrorsToArray: function(errors) {
      return errors.map(function(error) { return error.error; });
    },

    cleanAttributes: function(attributes, whitelist) {
      function whitelistCreator(obj, key, last) {
        if (v.isObject(obj[key])) {
          return obj[key];
        }
        return (obj[key] = last ? true : {});
      }

      function buildObjectWhitelist(whitelist) {
        var ow = {}
          , lastObject
          , attr;
        for (attr in whitelist) {
          if (!whitelist[attr]) {
            continue;
          }
          v.forEachKeyInKeypath(ow, attr, whitelistCreator);
        }
        return ow;
      }

      function cleanRecursive(attributes, whitelist) {
        if (!v.isObject(attributes)) {
          return attributes;
        }

        var ret = v.extend({}, attributes)
          , w
          , attribute;

        for (attribute in attributes) {
          w = whitelist[attribute];

          if (v.isObject(w)) {
            ret[attribute] = cleanRecursive(ret[attribute], w);
          } else if (!w) {
            delete ret[attribute];
          }
        }
        return ret;
      }

      if (!v.isObject(whitelist) || !v.isObject(attributes)) {
        return {};
      }

      whitelist = buildObjectWhitelist(whitelist);
      return cleanRecursive(attributes, whitelist);
    },

    exposeModule: function(validate, root, exports, module, define) {
      if (exports) {
        if (module && module.exports) {
          exports = module.exports = validate;
        }
        exports.validate = validate;
      } else {
        root.validate = validate;
        if (validate.isFunction(define) && define.amd) {
          define([], function () { return validate; });
        }
      }
    },

    warn: function(msg) {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("[validate.js] " + msg);
      }
    },
    // validate Error (only to log)
    error: function(msg) {
    	var szMsg = "[validate.js] " + msg;
      if (typeof console !== "undefined" && console.error) {
        console.error(szMsg);
      }
    },
    swError: function(msg) {
    	var szMsg = "[validate.js] " + msg;
      showErr (szMsg);
      throw new Error (szMsg);
    }
  });

  validate.validators = {
  	/* Levis: tip does not need validator, is a field used to add tip */
    tip: function(value, options) {
  			 return;	
    },	
  		
    // Presence validates that the value isn't empty
    presence: function(value, options) {
      options = v.extend({}, this.options, options);
      if (v.isEmpty(value)) {
        return options.message || this.message || VALIDATE_MSG.cantBeBlank;
      }
    },
    length: function(value, options, attribute) {
      // Empty values are allowed
      if (v.isEmpty(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var is = options.is
        , maximum = options.maximum
        , minimum = options.minimum
        , tokenizer = options.tokenizer || function(val) { return val; }
        , err
        , errors = [];

      value = tokenizer(value);
      var length = value.length;
      if(!v.isNumber(length)) {
        v.error(v.format("Attribute %{attr} has a non numeric value for `length`", {attr: attribute}));
        return options.message || this.notValid || "has an incorrect length";
      }

      // Is checks
      if (v.isNumber(is) && length !== is) {
        err = options.wrongLength ||
          this.wrongLength ||  VALIDATE_MSG.wrongLen ;
        errors.push(v.format(err, {count: is}));
      }

      if (v.isNumber(minimum) && length < minimum) {
        err = options.tooShort ||
          this.tooShort || VALIDATE_MSG.tooShort ;
        errors.push(v.format(err, {count: minimum}));
      }

      if (v.isNumber(maximum) && length > maximum) {
        err = options.tooLong ||
          this.tooLong ||  VALIDATE_MSG.tooLong;
        errors.push(v.format(err, {count: maximum}));
      }

      if (errors.length > 0) {
        return options.message || errors;
      }
    },
    numericality: function(value, options) {
      // Empty values are fine
      if (v.isEmpty(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var errors = []
        , name
        , count
        , checks = {
            greaterThan:          function(v, c) { return v > c; },
            greaterThanOrEqualTo: function(v, c) { return v >= c; },
            equalTo:              function(v, c) { return v === c; },
            lessThan:             function(v, c) { return v < c; },
            lessThanOrEqualTo:    function(v, c) { return v <= c; }
          };

      // Coerce the value to a number unless we're being strict.
      if (options.noStrings !== true && v.isString(value)) {
        value = +value;
      }

      // If it's not a number we shouldn't continue since it will compare it.
      if (!v.isNumber(value)) {
        return options.message || options.notValid || this.notValid || VALIDATE_MSG.notNumber;
      }

      // Same logic as above, sort of. Don't bother with comparisons if this
      // doesn't pass.
      if (options.onlyInteger && !v.isInteger(value)) {
        return options.message || options.notInteger || this.notInteger  || VALIDATE_MSG.mustBeInteger ;
      }

      for (name in checks) {
        count = options[name];
        if (v.isNumber(count) && !checks[name](value, count)) {
          // This picks the default message if specified
          // For example the greaterThan check uses the message from
          // this.notGreaterThan so we capitalize the name and prepend "not"
          var key = "not" + v.capitalize(name);
          var msg = options[key] || this[key] || VALIDATE_MSG.mustBeType;

          errors.push(v.format(msg, {
            count: count,
            type: v.prettify(name)
          }));
        }
      }

      if (options.odd && value % 2 !== 1) {
        errors.push(options.notOdd || this.notOdd ||  VALIDATE_MSG.mustBeOdd );
      }
      if (options.even && value % 2 !== 0) {
        errors.push(options.notEven || this.notEven || VALIDATE_MSG.mustBeEven);
      }

      if (errors.length) {
        return options.message || errors;
      }
    },
    datetime: v.extend(function(value, options) {
      if (!v.isFunction(this.parse) || !v.isFunction(this.format)) {
      	v.swError ("Both the parse and format functions needs to be set to use the datetime/date validator");
      }

      // Empty values are fine
      if (v.isEmpty(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var err
        , errors = []
        , earliest = options.earliest ? this.parse(options.earliest, options) : NaN
        , latest = options.latest ? this.parse(options.latest, options) : NaN;

      value = this.parse(value, options);

      if (isNaN(value)) {
        return options.message || this.notValid ||   
           VALIDATE_MSG.validDate;
      }

      if (!isNaN(earliest) && value < earliest) {
        err = this.tooEarly ||  VALIDATE_MSG.notEarlierThanDate ;
        err = v.format(err, {date: this.format(earliest, options)});
        errors.push(err);
      }

      if (!isNaN(latest) && value > latest) {
        err = this.tooLate ||  VALIDATE_MSG.notLaterThanDate;
        err = v.format(err, {date: this.format(latest, options)});
        errors.push(err);
      }

      if (errors.length) {
        return options.message || errors;
      }
    }, {
      parse: null,
      format: null
    }),
    date: function(value, options) {
      options = v.extend({}, options, {dateOnly: true});
      return v.validators.datetime.call(v.validators.datetime, value, options);
    },
    format: function(value, options) {
      if (v.isString(options) || (options instanceof RegExp)) {
        options = {pattern: options};
      }

      options = v.extend({}, this.options, options);

      var message = options.message || this.message || VALIDATE_MSG.isInvalid
        , pattern = options.pattern
        , match;

      // Empty values are allowed
      if (v.isEmpty(value)) {
        return;
      }
      if (!v.isString(value)) {
        return message;
      }

      if (v.isString(pattern)) {
        pattern = new RegExp(options.pattern, options.flags);
      }
      match = pattern.exec(value);
      if (!match || match[0].length != value.length) {
        return message;
      }
    },
    inclusion: function(value, options) {
      // Empty values are fine
      if (v.isEmpty(value)) {
        return;
      }
      if (v.isArray(options)) {
        options = {within: options};
      }
      options = v.extend({}, this.options, options);
      if (v.contains(options.within, value)) {
        return;
      }
      var message = options.message ||
        this.message ||
        "^%{value} is not included in the list";
      return v.format(message, {value: value});
    },
    exclusion: function(value, options) {
      // Empty values are fine
      if (v.isEmpty(value)) {
        return;
      }
      if (v.isArray(options)) {
        options = {within: options};
      }
      options = v.extend({}, this.options, options);
      if (!v.contains(options.within, value)) {
        return;
      }
      var message = options.message || this.message || VALIDATE_MSG.valueRestricted ;
      return v.format(message, {value: value});
    },
    email: v.extend(function(value, options) {
      options = v.extend({}, this.options, options);
      var message = options.message || this.message || VALIDATE_MSG.notValidMail;
      // Empty values are fine
      if (v.isEmpty(value)) {
        return;
      }
      if (!v.isString(value)) {
        return message;
      }
      if (!this.PATTERN.exec(value)) {
        return message;
      }
    }, {
      PATTERN: /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i
    }),
    equality: function(value, options, attribute, attributes) {
      if (v.isEmpty(value)) {
        return;
      }

      if (v.isString(options)) {
        options = {attribute: options};
      }
      options = v.extend({}, this.options, options);
      var message = options.message ||
        this.message ||  VALIDATE_MSG.notEqualToAttribute;

      if (v.isEmpty(options.attribute) || !v.isString(options.attribute)) {
        throw new Error(VALIDATE_MSG.notEmptyString);
      }

      var otherValue = v.getDeepObjectValue(attributes, options.attribute)
        , comparator = options.comparator || function(v1, v2) {
          return v1 === v2;
        };

      if (!comparator(value, otherValue, options, attribute, attributes)) {
        return v.format(message, {attribute: v.prettify(options.attribute)});
      }
    },

    // A URL validator that is used to validate URLs with the ability to
    // restrict schemes and some domains.
    url: function(value, options) {
      if (v.isEmpty(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var message = options.message || this.message ||  VALIDATE_MSG.notValidUrl 
        , schemes = options.schemes || this.schemes || ['http', 'https']
        , allowLocal = options.allowLocal || this.allowLocal || false;

      if (!v.isString(value)) {
        return message;
      }

      // https://gist.github.com/dperini/729294
      var regex =
        "^" +
          // schemes
          "(?:(?:" + schemes.join("|") + "):\\/\\/)" +
          // credentials
          "(?:\\S+(?::\\S*)?@)?";

      regex += "(?:";

      var hostname =
          "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
          "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
          "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))";

      // This ia a special case for the localhost hostname
      if (allowLocal) {
        hostname = "(?:localhost|" + hostname + ")";
      } else {
          // private & local addresses
          regex +=
              "(?!10(?:\\.\\d{1,3}){3})" +
              "(?!127(?:\\.\\d{1,3}){3})" +
              "(?!169\\.254(?:\\.\\d{1,3}){2})" +
              "(?!192\\.168(?:\\.\\d{1,3}){2})" +
              "(?!172" +
                "\\.(?:1[6-9]|2\\d|3[0-1])" +
                "(?:\\.\\d{1,3})" +
              "{2})";
      }

      // reserved addresses
      regex +=
          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
          hostname +
          // port number
          "(?::\\d{2,5})?" +
          // path
          "(?:\\/[^\\s]*)?" +
        "$";

      var PATTERN = new RegExp(regex, 'i');
      if (!PATTERN.exec(value)) {
        return message;
      }
    }
  };

  validate.exposeModule(validate, this, exports, module, define);
}).call(this,
        typeof exports !== 'undefined' ? /* istanbul ignore next */ exports : null,
        typeof module !== 'undefined' ? /* istanbul ignore next */ module : null,
        typeof define !== 'undefined' ? /* istanbul ignore next */ define : null);






