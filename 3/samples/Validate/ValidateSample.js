// ==================================================================== CONSTANT
 var JSLOG_LEV = 0;
//var JSLOG_LEV = 31;
//var JSLOG_LEV = 7;

//====================================================== TIP

var TIP_DURATION='<div style="width:250px;">Subscribe <b>Duration</b> (Years) must be:' +
'<ul><b><li>Minimum: 1</li><li>Maximum: 10</li></b></ul></div>';

var TIP_PWD = '<div style="width:270px;">' +
'<B>Password must have:</B>' +			
'  <ul type="circle">'  +
'    <li> between <b>[4..10] characters</b></li>' +
'    <li>At Least <b>1 Uppercase Alphabet</b></li>' +
'    <li>At Least <b>1 Lowercase Alphabet</b></li>' +
'    <li>At Least <b>1 Number</b></li>' +
'    <li>At Least <b>1 Special character</b></li>' +
'  </ul>' +
'</BR>Example of Valid Password: <label class="tipGood">Example$1</label> </BR></BR>' +
'Example of Wrong Password: <label class="tipErr">Example1</label>' +
'</div>';

var TIP_USER = '<div style="width:350px;">' +
'<B>Username must have:</B> ' +			
'  <ul type="square">'  +
'    <li>Number of characters  <b>between [3..20] characters</b></li>' +
'    <li>Possible characters:  <b>a..z   A..Z   0..9</b></li>' +
'  </ul>' +
'</BR>Example of Valid Username: <label class="tipGood">User01</label></BR></BR>' +
'Example of Wrong Username: <label class="tipErr">_$001</label>' +
'</div>';


var TIP_SIZE = '<div style="width:350px;">' +
'At the moment We have finished <label class="tipErr">SIZE XS and S</label></div>';

var TIP_COUNTRY = '<div style="width:350px;">' +
'At the moment <b>We support only following country</b>: ' +			
'  <ul type="square">'  +
'    <li><label class="tipGood">Italy</label></li>' +
'    <li><label class="tipGood">Spain</label></li>' +
'  </ul>' +
'</div>';


//==================================================================== VARIABLE

var cValidateObj1 = null;
var cValidateObj2 = null;
var cValidateObj3 = null;

/**
* Called when jsu is loaded
*/
function jsu_loaded(){
	var fn = "[ValidateSample.js jsu_loaded()] ";
	jslog (JSLOG_INFO,fn + JSLOG_FUN_START);
	/* For sample that are NOT FREE like this one, we have to setup the State
   */
	setupState(); 	
  // [Optional] Init jslog with JSLOG_LEV 
  // jslog_init(JSLOG_LEV);
	// jslogSetSize (JSLOG_SIZE.M); // Set Size
	initSampleCmn(); // manage optional PAR show_opt, only for developer
  populateCountry();
	initValidate1();
	initValidate2();
	initValidate3();
	loadingShow(false);
	jslog (JSLOG_INFO,fn + JSLOG_FUN_END);
}


function populateCountry(){
	var fn = "[ValidateSample.js populateCountry()] ";
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_START);
	// all the possible countries
  var arCountry =	[	["",""],["AF","Afghanistan"],["AL","Albania"],["DZ","Algeria"],["AS","American Samoa"],["AD","Andorra"],["AO","Angola"],["AI","Anguilla"],["AQ","Antarctica"],["AG","Antigua and Barbuda"],["AR","Argentina"],["AM","Armenia"],["AW","Aruba"],["AU","Australia"],["AT","Austria"],["AZ","Azerbaijan"],["BS","Bahamas"],["BH","Bahrain"],["BD","Bangladesh"],["BB","Barbados"],["BY","Belarus"],["BE","Belgium"],["BZ","Belize"],["BJ","Benin"],["BM","Bermuda"],["BT","Bhutan"],["BO","Bolivia"],["BA","Bosnia and Herzegovina"],["BW","Botswana"],["BV","Bouvet Island"],["BR","Brazil"],["IO","British Indian Ocean Territory"],["BN","Brunei Darussalam"],["BG","Bulgaria"],["BF","Burkina Faso"],["BI","Burundi"],["KH","Cambodia"],["CM","Cameroon"],["CA","Canada"],["CV","Cape Verde"],["KY","Cayman Islands"],["CF","Central African Republic"],["TD","Chad"],["CL","Chile"],["CN","China"],["CX","Christmas Island"],["CC","Cocos (Keeling) Islands"],["CO","Colombia"],["KM","Comoros"],["CG","Congo"],["CK","Cook Islands"],["CR","Costa Rica"],["CI","Cote D'ivoire"],["HR","Croatia"],["CU","Cuba"],["CY","Cyprus"],["CZ","Czech Republic"],["DK","Denmark"],["DJ","Djibouti"],["DM","Dominica"],["DO","Dominican Republic"],["EC","Ecuador"],["EG","Egypt"],["SV","El Salvador"],["GQ","Equatorial Guinea"],["ER","Eritrea"],["EE","Estonia"],["ET","Ethiopia"],["FK","Falkland Islands (Malvinas)"],["FO","Faroe Islands"],["FJ","Fiji"],["FI","Finland"],["FR","France"],["GF","French Guiana"],["PF","French Polynesia"],["TF","French Southern Territories"],["GA","Gabon"],["GM","Gambia"],["GE","Georgia"],["DE","Germany"],["GH","Ghana"],["GI","Gibraltar"],["GR","Greece"],["GL","Greenland"],["GD","Grenada"],["GP","Guadeloupe"],["GU","Guam"],["GT","Guatemala"],["GG","Guernsey"],["GN","Guinea"],["GW","Guinea-bissau"],["GY","Guyana"],["HT","Haiti"],["HM","Heard Island and Mcdonald Islands"],["VA","Holy See (Vatican City State)"],["HN","Honduras"],["HK","Hong Kong"],["HU","Hungary"],["IS","Iceland"],["IN","India"],["ID","Indonesia"],["IR","Iran, Islamic Republic of"],["IQ","Iraq"],["IE","Ireland"],["IM","Isle of Man"],["IL","Israel"],["IT","Italy"],["JM","Jamaica"],["JP","Japan"],["JE","Jersey"],["JO","Jordan"],["KZ","Kazakhstan"],["KE","Kenya"],["KI","Kiribati"],["KR","Korea, Republic of"],["KW","Kuwait"],["KG","Kyrgyzstan"],["LA","Lao People's Democratic Republic"],["LV","Latvia"],["LB","Lebanon"],["LS","Lesotho"],["LR","Liberia"],["LY","Libyan Arab Jamahiriya"],["LI","Liechtenstein"],["LT","Lithuania"],["LU","Luxembourg"],["MO","Macao"],["MK","Macedonia"],["MG","Madagascar"],["MW","Malawi"],["MY","Malaysia"],["MV","Maldives"],["ML","Mali"],["MT","Malta"],["MH","Marshall Islands"],["MQ","Martinique"],["MR","Mauritania"],["MU","Mauritius"],["YT","Mayotte"],["MX","Mexico"],["FM","Micronesia, Federated States of"],["MD","Moldova, Republic of"],["MC","Monaco"],["MN","Mongolia"],["ME","Montenegro"],["MS","Montserrat"],["MA","Morocco"],["MZ","Mozambique"],["MM","Myanmar"],["NA","Namibia"],["NR","Nauru"],["NP","Nepal"],["NL","Netherlands"],["AN","Netherlands Antilles"],["NC","New Caledonia"],["NZ","New Zealand"],["NI","Nicaragua"],["NE","Niger"],["NG","Nigeria"],["NU","Niue"],["NF","Norfolk Island"],["MP","Northern Mariana Islands"],["NO","Norway"],["OM","Oman"],["PK","Pakistan"],["PW","Palau"],["PS","Palestinian Territory, Occupied"],["PA","Panama"],["PG","Papua New Guinea"],["PY","Paraguay"],["PE","Peru"],["PH","Philippines"],["PN","Pitcairn"],["PL","Poland"],["PT","Portugal"],["PR","Puerto Rico"],["QA","Qatar"],["RE","Reunion"],["RO","Romania"],["RU","Russian Federation"],["RW","Rwanda"],["SH","Saint Helena"],["KN","Saint Kitts and Nevis"],["LC","Saint Lucia"],["PM","Saint Pierre and Miquelon"],["VC","Saint Vincent and The Grenadines"],["WS","Samoa"],["SM","San Marino"],["ST","Sao Tome and Principe"],["SA","Saudi Arabia"],["SN","Senegal"],["RS","Serbia"],["SC","Seychelles"],["SL","Sierra Leone"],["SG","Singapore"],["SK","Slovakia"],["SI","Slovenia"],["SB","Solomon Islands"],["SO","Somalia"],["ZA","South Africa"],["ES","Spain"],["LK","Sri Lanka"],["SD","Sudan"],["SR","Suriname"],["SJ","Svalbard and Jan Mayen"],["SZ","Swaziland"],["SE","Sweden"],["CH","Switzerland"],["SY","Syrian Arab Republic"],["TW","Taiwan, Province of China"],["TJ","Tajikistan"],["TZ","Tanzania, United Republic of"],["TH","Thailand"],["TL","Timor-leste"],["TG","Togo"],["TK","Tokelau"],["TO","Tonga"],["TT","Trinidad and Tobago"],["TN","Tunisia"],["TR","Turkey"],["TM","Turkmenistan"],["TC","Turks and Caicos Islands"],["TV","Tuvalu"],["UG","Uganda"],["UA","Ukraine"],["AE","United Arab Emirates"],["GB","United Kingdom"],["US","United States"],["UM","United States Minor Outlying Islands"],["UY","Uruguay"],["UZ","Uzbekistan"],["VU","Vanuatu"],["VE","Venezuela"],["VN","Viet Nam"],["VG","Virgin Islands, British"],["VI","Virgin Islands, U.S."],["WF","Wallis and Futuna"],["EH","Western Sahara"],["YE","Yemen"],["ZM","Zambia"],["ZW","Zimbabwe"]];
  
 	var selectCountry = getElementById2 ( "country");
  for (var k=0; k< arCountry.length; k++){
  		var countryEl = arCountry[k];
  		appendOptionLast (selectCountry,countryEl[1],countryEl[0]);
  }
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_END);
}


/*====================================================================
 *  					SAMPLE_1
 =================================================================== */

// 1) Init cValidate with Item constraints, tips and options
function initValidate1(){
	var fn = "[ValidateSample.js initValidate1()] ";
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_START);
	
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
	// Now the item Validation is managed by cValidate.js
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_END);
}

// 2)  At Submit Button Click: we Validate all the items
function onclickSubmit1() {
	var fn = "[ValidateSample.js onclickSubmit1()] ";
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_START);
	var retCode = cValidateObj1.validateApply();
	if (retCode == VALIDATE_RETCODE.OK){
		showInfo ('<label class="PopupGood">Validation OK</label>',{szTitle:"VALIDATION of SAMPLE_1"});
	}
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_END);
}

/**
 * Show the Floating Tip
 * @param event
 * @param iSample {Number} 1,2,3
 */
function sampleOptTip (event,iSample){
	Tip('Open/Close the Box to Change <b>Validate Option</b> in SAMPLE_' + iSample );
}


/*====================================================================
 *  					SAMPLE_2
 =================================================================== */

//1) Init cValidate with Item constraints, tips and options
function initValidate2(){
	var fn = "[ValidateSample.js initValidate2()] ";
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_START);
	cValidateObj2 = new cValidate ({ // Mandatory username len[3..20] 
		username: {presence: true, tip: TIP_USER, length: { minimum: 3,  maximum: 20 },
		  format: { // We allow only  a-z and 0-9, and we ignore (flags=i) if it is uppercase or lowercase 
		    pattern: "[a-z0-9]+",   flags: "i",   message: "can only contain a-z or A-Z or 0-9"  }
		}, // Mandatory password, len [4..10]
		password: {	presence: true,	tip: TIP_PWD,  length: {  minimum: 4,  maximum: 10  },
		  format: { // Format rules described in message
		    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/ ,   
		    message: "must have [4..10] char., At least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number, 1 Special Char."
		  }    
		}, // Mandatory conform-password, that must be equal to password
		"confirm-password": { presence: true,  
		     equality: {   attribute: "password",   message: "The passwords does not match"  }
		}
	}, //---------- OPTION
	{	// Validate all items only at validateApply (Submit button) - Error Section on the Top
		szErrSectId: "errSect2",		
		bInstantFieldValidation:false, 
		bOnErrShowLabel: false,		
		bOnErrShowAlarm: true,		
		bOnErrShowSect:true	}
	);
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_END);
}

/**
 * onclick Sunbmit2: Validate SAMPLE_2
 */
function onclickSubmit2() {
	var fn = "[ValidateSample.js onclickSubmit2()] ";
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_START);
	var retCode = cValidateObj2.validateApply();
	if (retCode == VALIDATE_RETCODE.OK){
		showInfo ('<label class="PopupGood">Validation OK</label>',{szTitle:"VALIDATION of SAMPLE_2"});
	}
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_END);
}



/*====================================================================
 *  					SAMPLE_3
 =================================================================== */

//1) Init cValidate with Item constraints, tips and options
function initValidate3(){
	var fn = "[ValidateSample.js initValidate2()] ";
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_START);
	cValidateObj3 = new cValidate ({ // Mandatory size, choice exclude XS and S 
			size: {	presence: true, tip: TIP_SIZE,	exclusion: {   within: ["XS","S"],    
				message: "<b>XS and S</b> are not available at the moment"   }	  
			}, // Mandatory country, choice within IT or SP
			country: {presence: true,	tip: TIP_COUNTRY,	inclusion: {   within: ["IT","SP"],    
				message: "^Sorry, this service is only for <b>Italy or Spain</b> "   }	  
			}, // optional ZIP with a Tip, with 5 digit required if inserted
			zip: { format: { pattern: "\\d{5}"}	}
		}, // OPTION: Validate all items only at validateApply - Popup Err and Alarm in Items
		{	
			szErrSectId: "errSect3",		
			bInstantFieldValidation:false, bOnErrShowLabel: false, bOnErrShowPopup:true, bOnErrShowAlarm:false	
		}
	);
	// Now the item Validation is managed by cValidate.js \n' + 
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_END);
}

/**
 * onclick Sunbmit1: Validate SAMPLE_3
 */
function onclickSubmit3() {
	var fn = "[ValidateSample.js onclickSubmit3()] ";
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_START);
	var retCode = cValidateObj3.validateApply();
	if (retCode == VALIDATE_RETCODE.OK){
		showInfo ('<label class="PopupGood">Validation OK</label>',{szTitle:"VALIDATION of SAMPLE_1"});
	}
	jslog (JSLOG_DEBUG,fn + JSLOG_FUN_END);
}

//===================================================================================================
//  BELOW CODE is not strictly related to the Sort feature, but it is ONLY Related to JS Code Highlight
//===========================================================================================

var JS_CODE_VALIDATE1= '// 1) Init cValidate with Item constraints, tips and options \n' +
'function initValidate1(){ \n' + 
'  cValidateObj1 = new cValidate ({  \n' + 
'      // Mandatory email   \n' + 
'      email: {  presence: true,  email: true }, \n' + 
'      duration: { // Mandatory Integer in range [1..10] with a tip explaining it \n' + 
'        presence: true,  // must be present   \n' +
'        tip: TIP_DURATION, // HTML Tip to create on the right of the Item \n' + 
'        numericality: { \n' +
'          onlyInteger: true,  \n' +
'          greaterThanOrEqualTo: 1,  lessThanOrEqualTo: 10 \n' +
'        } \n' + 
'      }, \n' + 
'      // Optional Birthday in date default format (YYYY-MM-DD) \n' + 
'      birthdate: { date: {} } \n' + 
'    }, \n' + 
'    // OPTION: Id of div to use in case of bOnErrShowSect:true \n' + 
'    {szErrSectId: "errSect1"} \n' + 
'  ); \n' + 
'  // Now the item Validation is managed by cValidate.js \n' + 
'} \n' + 
' \n' + 
' //  2)  At Submit Button Click: we Validate all the items  \n' + 
'function onclickSubmit1() { \n' + 
'  var retCode = cValidateObj1.validateApply(); \n' + 
'} \n';  

var JS_CODE_VALIDATE2= '//1) Init cValidate with Item constraints, tips and options\n'+
'function initValidate2(){\n'+
'  cValidateObj2 = new cValidate ({ // Mandatory username len[3..20] \n'+
'    username: {presence: true, tip: TIP_USER, length: { minimum: 3,  maximum: 20 },\n'+
'      format: { // reqexp: We allow only  a-z and 0-9, and we ignore (flags=i) if it is uppercase or lowercase \n'+
'        pattern: "[a-z0-9]+",   flags: "i",   message: "can only contain a-z or A-Z or 0-9"  }\n'+
'    }, // Mandatory password, len [4..10]\n'+
'    password: {  presence: true,  tip: TIP_PWD,  length: {  minimum: 4,  maximum: 10  },\n'+
'      format: { // pattern=reqexp Format - we described them in message\n'+
'        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/ ,   \n'+
'        message: "must have [4..10] char., At least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number, 1 Special Char."\n'+
'      }    \n'+
'    }, // Mandatory conform-password, that must be equal to password\n'+
'    "confirm-password": { presence: true,  \n'+
'         equality: {   attribute: "password",   message: "The passwords does not match"  }\n'+
'    }\n'+
'  }, //---------- OPTION\n'+
'  {  // Validate all items only at validateApply (Submit button) - Error Section on the Top\n'+
'    szErrSectId: "errSect2",    \n'+
'    bInstantFieldValidation:false, bOnErrShowLabel: false,    bOnErrShowSect:true  }\n'+
'  );\n'+
'  // Now the item Validation is managed by cValidate.js \n' + 
'}\n'+
' \n' + 
' //  2)  At Submit Button Click: we Validate all the items  \n' + 
'function onclickSubmit2() { \n' + 
'  var retCode = cValidateObj2.validateApply(); \n' + 
'} \n' ;

var JS_CODE_VALIDATE3= '//1) Init cValidate with Item constraints, tips and options\n'+
'function initValidate3(){ \n'+ 
'  cValidateObj3 = new cValidate ({ // Mandatory size, choice exclude XS and S  \n'+ 
'      size: {  presence: true, tip: TIP_SIZE,  exclusion: {   within: ["XS","S"],  \n'+ 
'     message: "<b>XS and S</b> are not available at the moment"   }  \n'+ 
'      }, // Mandatory country, choice within IT or SP \n'+ 
'      country: {presence: true,  tip: TIP_COUNTRY,  inclusion: {   within: ["IT","SP"],  \n'+ 
'     message: "^Sorry, this service is only for <b>Italy or Spain</b> "   }  \n'+ 
'      }, // optional ZIP with a Tip, with 5 digit required if inserted \n'+ 
'      zip: { format: {   pattern: "\\d{5}"  }  } \n'+ 
'    },// OPTION: Validate all items only at validateApply - Popup Err and Alarm in Items \n'+ 
'    {  szErrSectId: "errSect3",  \n'+ 
'      bInstantFieldValidation:false, bOnErrShowLabel: false, bOnErrShowPopup:true, bOnErrShowAlarm:true   \n'+ 
'    } \n'+ 
'  ); \n'+ 
'  // Now the item Validation is managed by cValidate.js \n'+  
'} \n'+ 
' \n' + 
' //  2)  At Submit Button Click: we Validate all the items  \n' + 
'function onclickSubmit3() { \n' + 
'  var retCode = cValidateObj3.validateApply(); \n' + 
'} \n'; 



/*=========================================================================================
 							Form to change Validate Option
========================================================================================= */



/**
 * Show the TipFix with the Form to Change Validate Option
 * @param event
 */
function sampleOpt(event,iSample){
  var fn="[ValidateSample.js sampleOpt] ";
	
	var szParOpt = "tipc";
	if (isJsuFree()){
		szParOpt = "jsuParAbsent";
	}	
	
	var szMsg = '<table class="sampleNoteOpt"><tr>' +
	'   <td class="sampleNoteOpt"><input class="sampleNoteOpt"></td>' +
	'   <td class="tipl">' +
	'     <ul>' +
	'       <li id="sampleOptFreeNote">The <label class="jsuParAbsent">Option with Yellow Background</label> are NOT Available in this JSU FREE Version</li>' +
	'       <li>For all the Available OPTIONS see <a class="tipLink" href="https://rawgit.com/FedericoLevis/JSUDoc/master/cValidate.js/cValidate.html" target="_blank">cValidate() API Options</a></li>' +
	'       <li>You can <b>Change Options</b>, click button <b>Apply Options</b> and test again the SAMPLE with the new Options</li>' +
	'     </ul>' +
	'   </td>' +
	'</tr>' +
	'</table>' +
	'<table><tr valign="top"><td>'+	

	'	 <table class="det" BORDER="2" cellpadding="2" width="800px">'+
	'				  <tr class="detTitle"><td colspan="4">cValidate OPTION</td></tr>'+
	'				  <tr class="detTitle2">'+
	'				  <td width ="10%">OPTION</td>'+
	'				  <td width ="20%">DEFAULT</td>'+
	'				  <td width ="20%">VALUE</td>'+
	'				  <td width ="50%">DESCRIPTION</td>'+
	'     </tr>  '+
	'     <tr class="tip">'+
	'				  <td class="tipc" id="bOnErrShowLabelOpt"><b>bOnErrShowLabel</b></td>'+
	'				  <td><i>true</i></td>'+
	'				  <td> <select class="bold" id="bOnErrShowLabel" >  '+
	'			       <option value ="false" bOnErrShowLabelFALSE_SEL >false</option>  '+
	'			       <option value ="true" bOnErrShowLabelTRUE_SEL >true</option>  '+
	'				      </select> '+
	'				  </td>'+
	'				  <td class="tipl"><b>if true</b>: Validation Error is displayed on the right of the Item</td>'+
	'     </tr>'+
	'	    <tr class="tip">'+
	'				  <td class="tipc" id="bInstantFieldValidationOpt"><b>bInstantFieldValidation</b></td>'+
	'				  <td><i>false</i></b></td>'+
	'				  <td> <select class="bold" id="bInstantFieldValidation">  '+
	'			         <option value ="false" bInstantFieldValidationFALSE_SEL >false</option>  '+
	'			         <option value ="true" bInstantFieldValidationTRUE_SEL >true</option>  '+
	'				  </select> </td>'+
	'				  <td class="tipl"><b>If true</b>: Each Item is Instantly validated on the relative onChange Event</td>'+
	'				</tr>'+
	'     <tr class="tip">'+
	'				  <td class="tipc" id="bOnErrShowSectOpt"><b>bOnErrShowSect</b></td>'+
	'				  <td><i>false</i></b></td>'+
	'				  <td> <select class="bold" id="bOnErrShowSect">  '+
	'            <option value ="false" bOnErrShowSectFALSE_SEL >false</option>  '+
	'             <option value ="true" bOnErrShowSectTRUE_SEL >true</option>  '+
	'				      </select> </td>'+
	'				  <td class="tipl"><b>if true</b>: if <label class="jsuAPI">validateApply</label> generates Validate Errors, it shows a Section in The Top will All the Errors</td>'+
	'     </tr>'+
	'     <tr class="tipc">'+
	'				  <td class="tipc" id="bOnErrShowPopupOpt"><b>bOnErrShowPopup</b></td>'+
	'				  <td><i>false</i></b></td>'+
	' 				  <td> <select class="bold" id="bOnErrShowPopup">  '+
	'			         <option value ="false" bOnErrShowPopupFALSE_SEL >false</option>  '+
	'			         <option value ="true" bOnErrShowPopupTRUE_SEL >true</option>  '+
	'				  </select> </td>'+
	'				  <td class="tipl"><b>If true</b>: if <label class="jsuAPI">validateApply</label> generates Validate Errors, it shows a Popup with the Error Description</td>'+
	'     </tr>'+
	'     <tr class="tip">'+
	'				  <td class="tipc" id="bOnErrShowAlarmOpt"><b>bOnErrShowAlarm</b></td>'+
	'				  <td><i>false</i></b></td>'+
	'				  <td> <select class="bold" id="bOnErrShowAlarm">  '+
	'			         <option value ="false" bOnErrShowAlarmFALSE_SEL >false</option>  '+
	'			         <option value ="true" bOnErrShowAlarmTRUE_SEL >true</option>  '+
	'				  </select> </td>'+
	'				  <td class="tipl"><b>If true</b>: On Single Item Validate Error, it shows an AlarmGif in the Item</td>'+
	'	      </tr>'+
	'				<tr class="tip">'+
	'						  <td><b>bEnphasizeItemBorder</b></td>'+
	'						  <td><i>true</i></b></td>'+
	'						  <td> <select class="bold" id="bEnphasizeItemBorder">  '+
	'			         <option value ="false" bEnphasizeItemBorderFALSE_SEL >false</option>  '+
	'			         <option value ="true" bEnphasizeItemBorderTRUE_SEL >true</option>  '+
	'						  </select> </td>'+
	'						  <td class="tipl"><b>If true</b>: Mandatory or Error item are Enphasized with bigger border (Red for Validation Error cases)</td>'+
	'						</tr>'+
	'				<tr call = "tip">'+
	'						  <td class="' + szParOpt + '"><b>szDateFmt</b></td>'+
	'						  <td><i>yyyy-MM-dd</i></b></td>'+
	'						  <td> <input style="font-weight: bold;" id="szDateFmt" width="100px" value="szDateFmtVALUE"></td>  ' +
	'						  <td class="tipl"><b>Date Format</b> to use for Date Validation</td>'+
	'				</tr>'+
	'				<tr class="tipc">'+
	'						  <td class="' + szParOpt + '"><b>szDateTimeFmt</b></td>'+
	'						  <td><i>yyyy-MM-dd hh:mm:ss</i></b></td>'+
	'						  <td> <input style="font-weight: bold;" id="szDateTimeFmt" width="100px" value="szDateTimeFmtVALUE"></td>  ' +
	'						  <td class="tipl"><b>DateTime Format</b> to use for DateTime Validation</td>'+
	'				</tr>'+
	'			  </table>' +
	
	 '	 </td>'+
	 ' </tr>' +
	 '<tr><td align="center">' + 
	'  <BR/><input type="button" class="jsuButton"  value="Apply Options" onclick="applyValidateOption(' + iSample + ');" />'+
	'</td></tr></table><BR/>';
	var validateOpt = null;
	if (iSample ==1){
		validateOpt = cValidateObj1.getOption ();
	}else	if (iSample ==2){
		validateOpt = cValidateObj2.getOption ();
	}else	if (iSample ==3){
		validateOpt = cValidateObj3.getOption ();
	}
	jslogObj (JSLOG_DEBUG,fn + "validateOpt" , validateOpt);
	/* e.g:
validateOpt
{
  "bInstantFieldValidation": true,
  "bOnErrShowLabel": true,
  "bOnErrShowSect": false,
  "bOnErrShowPopup": false,
  "bOnErrShowAlarm": false,
  "bEnphasizeItemBorder": true,
  "szDateFmt": "yyyy-MM-dd",
  "szDateTimeFmt": "yyyy-MM-dd hh:mm:ss",
  "szErrSectId": "errSect1"
}	  
	*/
  // Initialize Form with current validateOpt
  for (var key in validateOpt) {
  	// e.g key = "bInstantFieldValidation"
    var optVal  = validateOpt[key];  // e.g. true  or false for select
    jslog(JSLOG_DEBUG,fn + "key=" + key + " optVal=" + optVal);
    szMsg = szMsg.replace (key + 'TRUE_SEL',optVal ? 'selected' : '');
    szMsg = szMsg.replace (key + 'FALSE_SEL',optVal ? '' : 'selected');
    // e.g for szDateTime or szDate
    szMsg = szMsg.replace (key + 'VALUE',optVal );
  }
	
	TipFix (szMsg,event,{
		szTitle: "VALIDATE OPTIONS of SAMPLE_" + iSample,
		bCloseBtn:false,
		iTipWidth: 850,
		tipFixedPos: is_par_opt() ? TIP_FIXED_POS.LEFT : TIP_FIXED_POS.RIGHT
		});

 	var bJsuFree = isJsuFree(); 
	if (bJsuFree){
		// disable Opt not availble in FREE JSU
		getElementById2('szDateFmt').disabled=true;
		getElementById2('szDateTimeFmt').disabled=true;
	}	
  elementShowById('sampleOptFreeNote',bJsuFree,'');


}




/**
 * Apply Validate Option
 * @param iSample  1,2,3
 */
function applyValidateOption(iSample){
	var szDateFmt = getElementById2 ( "szDateFmt").value;
	var validateOpt = {
	  bOnErrShowLabel: (selectGetSelVal(getElementById2 ( "bOnErrShowLabel")) == "true"),
	  bOnErrShowSect: (selectGetSelVal(getElementById2 ( "bOnErrShowSect")) == "true"),
	  bOnErrShowPopup: (selectGetSelVal(getElementById2 ( "bOnErrShowPopup")) == "true"),
	  bOnErrShowAlarm: (selectGetSelVal(getElementById2 ( "bOnErrShowAlarm")) == "true"),
	  bEnphasizeItemBorder: (selectGetSelVal(getElementById2 ( "bEnphasizeItemBorder")) == "true"),
	  bInstantFieldValidation: (selectGetSelVal(getElementById2 ( "bInstantFieldValidation")) == "true"),
	  szDateFmt: szDateFmt,
	  szDateTimeFmt: getElementById2 ( "szDateTimeFmt").value
	};
	if (iSample ==1){
		cValidateObj1.setOption (validateOpt);
		var el = getElementById2('birthdate');
		el.placeholder = szDateFmt; 
	}else	if (iSample ==2){
		cValidateObj2.setOption (validateOpt);
	}else	if (iSample ==3){
		cValidateObj3.setOption (validateOpt);
	}
}


/**
 * Show JS Code description for sample3
 * @param event 
 */
function sample1Js(event){
	var bParOpt = is_par_opt(); 
	var iTipWidth = (bParOpt) ? 600: 700;
	var iTipMaxHeight = (bParOpt) ? 610 : 500; 
	TipFixCode (JS_CODE_VALIDATE1,event,{iTipWidth:iTipWidth,iTipMaxHeight:iTipMaxHeight});	
}


/**
 * Show JS Code description for sample3
 * @param event 
 */
function sample2Js(event){
	var bParOpt = is_par_opt(); 
	var iTipWidth = (bParOpt) ? 500: 750;
	var iTipMaxHeight = (bParOpt) ? 600 : 400; 
	TipFixCode (JS_CODE_VALIDATE2,event,{iTipWidth:iTipWidth,iTipMaxHeight:iTipMaxHeight});	
}

/**
 * Show JS Code description for sample3
 * @param event 
 */
function sample3Js(event){
	var bParOpt = is_par_opt(); 
	var iTipWidth = (bParOpt) ? 500: 700;
	var iTipMaxHeight = (bParOpt) ? 500 : 400; 
	TipFixCode (JS_CODE_VALIDATE3,event,{iTipWidth:iTipWidth,iTipMaxHeight:iTipMaxHeight});	
}

