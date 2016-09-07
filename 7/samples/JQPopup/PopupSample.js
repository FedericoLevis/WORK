// ==================================================================== CONSTANT
//var JSLOG_LEV = 31;
var JSLOG_LEV = 0;
//var JSLOG_LEV = 3;



/**
* Called when jsu is loaded
*/
function jsu_loaded(){
	/* For sample that are NOT FREE like this one, we have to setup the State
	 */
	setupState(); 
  // [Optional] Init jslog with JSLOG_LEV 
  // jslog_init(JSLOG_LEV);
	initSampleCmn(); // manage optional PAR show_opt, only for developer
  sampleInit();  
	loadingShow(false);
  
}

function sampleInit(){
	var fn = "[PopupSample.js sampleInit()] ";
  // Populate popupType select
  var arSelectId = ["popupType1","popupType1Desc"];
  var arPopupType = [POPUP_TYPE.INFO , POPUP_TYPE.WARN , POPUP_TYPE.ERR , POPUP_TYPE.ALARM ,POPUP_TYPE.CONFIRM, 
                     POPUP_TYPE.QUESTION , POPUP_TYPE.QUESTION_3 , POPUP_TYPE.CHOICE , POPUP_TYPE.PROMPT ];
  for (var i=0; i< arSelectId.length; i++){
    var id = arSelectId[i];
    var select = getElementById2 (id,true);
    for (var k=0; k< arPopupType.length; k++){
      var popupType = arPopupType[k];
      appendOptionLast (select,popupType,popupType);
    }  
  }
  onchangeSampleType1(); // simulate to init
  onchangeSample2(); // simulate to init
  // ------------------------------------------ OPT disable in DEMO Version
  if (isJsuFree()){
  	jsuOptDisable (["bModal", "szTitle","szPromptLabel","iPromptMin","iPromptMax","iChoiceMultiSize"], // Opt to disable
  	            ["bModalOpt", "szTitleOpt","szPromptLabelOpt","iPromptMinOpt","iPromptMaxOpt","iChoiceMultiSizeOpt"],  // Opt with label
  	            ["PopupOptCustomLayout","PopupPromptOpt","PopupChoiceOpt"],  // URL to see all Option
  	            true // bDemo 
  	  	);
  }
}


/* ============================================================================
 *             CALLBACK (used by SAMPLE_1, SAMPLE_2)
 ============================================================================ */

/**
 * Callback for Question with 2 or 3 Buttons
 * Show the answer to Question
 * @param objRet
 */
function callbackQuestion(objRet){
  var Fn = "[PopupSample.js callbackQuestion] ";
  jslogObj (JSLOG_TEST,Fn + "objRet",objRet);
  
  var retBtn   = objRet.retBtn  ; 
  if (retBtn   == POPUP_BTN.CONFIRM){
    Popup(POPUP_TYPE.CONFIRM,'<label class="PopupGood">Your answer was YES</label>',  {szTitle: "GOOD ANSWER!", iWidth: 300});
  }else if (retBtn   == POPUP_BTN.NO){
    Popup(POPUP_TYPE.ERR,'<label class="PopupError">Your answer was NO</label>',  {szTitle: "WHY DON'T WOUT LIKE IT?", iWidth: 300});
  }else if (retBtn   == POPUP_BTN.CANCEL){
    Popup(POPUP_TYPE.INFO,'<label class="PopupWarning">You have clicked CANCEL Button</label>',{iWidth: 400});
  }else if (retBtn   == POPUP_BTN.CLOSE){
    Popup(POPUP_TYPE.INFO,'You have close the Window without any Choice',{iWidth: 400});
  }
}


/**
 * Callback for Choice
 * Show the answer to Choice
 * @param objRet
 */
function callbackPrompt(objRet){
  var Fn = "[PopupSample.js callbackPrompt] ";
  jslogObj (JSLOG_DEBUG,Fn + "objRet",objRet);
  var retBtn   = objRet.retBtn  ; 
  if (retBtn   == POPUP_BTN.CONFIRM){
    Popup(POPUP_TYPE.CONFIRM,'You have inserted: <b>' + objRet.promptValue + ' </b>'); 
  }else if (retBtn   == POPUP_BTN.CANCEL){
    Popup(POPUP_TYPE.INFO,'You have clicked the <b>Cancel</b> Button');
  }else if (retBtn   == POPUP_BTN.CLOSE){
    Popup(POPUP_TYPE.INFO,'You have close the Window <label class="PopupWarning">without any Choice</label> with one of the following cases:<ul type="square">' + 
      '  <li>Clicking the <b>X</b> on the Top Left Corner of the Window</li>' +
      '  <li>Clicking <b>ESC</b></li>' +
      '</ul><BR/>');
}
  
  
}  

/**
 * Callback for Choice
 * Show the answer to Choice
 * @param objRet
 */
function callbackChoice(objRet){
  var Fn = "[PopupSample.js callbackChoice] ";
  jslogObj (JSLOG_TEST,Fn + "objRet",objRet);
  jslogObj (JSLOG_DEBUG,"objRet", objRet,true);
  // Example of objRet, if user select 2=Good and click OK
  // objRet: {
  //   "retBtn":"CONFIRM",
  //   "choiceValue":"2",
  //   "choiceText":"2 - Good",
  //   "arChoice":[{"value":"1","szText":"1 - Not Good","bSel":false},
  //               {"value":"2","szText":"2 - Good","bSel":true},
  //               {"value":"3","szText":"3 - Very Good","bSel":false},
  //               {"value":"4","szText":"4 - Excellent","bSel":false}]}  
  var retBtn   = objRet.retBtn  ; 
  if (retBtn   == POPUP_BTN.CONFIRM){
    var szMsgHtml = 'You have clicked the <b>OK</b> Button and you have selected the following items:<ul type="square">' + 
      '  <li><b>ChoiceValue:</b> ' +  objRet.choiceValue+ '</li>' +
      '  <li><b>ChoiceText:</b> ' +  objRet.choiceText + '</li>' +
      '</ul><BR/>';
    // add the table with the detail
    szMsgHtml += '<table class="Popup" width="100%">' +
    '  <th class="PopupTitle" colspan="3">DETAILS OF YOUR SELECTION</th>' +   
    '  <tr class="Popup">' +
    '    <td class="PopupHea" width="20%">VALUE</th>' +
    '    <td class="PopupHea" width="60%">TEXT</th>' +
    '    <td class="PopupHea" width="20%">SELECTED</th>' +
    '  </tr>';
    var arChoice = objRet.arChoice;
    for (var i=0; i<arChoice.length; i++){
      var arItem = arChoice[i];
      var szClassSel = arItem.bSel ? "PopupGood" : ""; 
      var szTdSel = arItem.bSel ?   '<img src="' + JSU_PATH_IMG +  'PopupConfirm.png" width="14" height="14">' : '';
      var szTr =  '  <tr class="Popup">' +
        '    <td class="PopupCenter"><b>' + arItem.value  +  '</b></td>' +
        '    <td class="' + szClassSel + ' PopupCenter">' + arItem.szText  +  '</td>' +
        '    <td class="PopupCenter">' + szTdSel + '</td>' +
        '  </tr>'; 
      szMsgHtml += szTr;
    }
    szMsgHtml += "</table><BR/>";
    Popup(POPUP_TYPE.INFO,szMsgHtml, 
        {szTitle: "CHOICE DETAILS", iWidth:600, iHeight: 600, bShowImg: false});
  }else if (retBtn   == POPUP_BTN.CANCEL){
    Popup(POPUP_TYPE.INFO,'You have clicked the <b>Cancel</b> Button');
  }else if (retBtn   == POPUP_BTN.CLOSE){
    Popup(POPUP_TYPE.INFO,'You have close the Window <label class="PopupWarning">without any Choice</label> with one of the following cases:<ul type="square">' + 
        '  <li>Clicking the <b>X</b> on the Top Left Corner of the Window</li>' +
        '  <li>Clicking <b>ESC</b></li>' +
        '</ul><BR/>');
  }
  
}



/* ============================================================================
 *             SAMPLE_2
 ============================================================================ */


/**
 * Align popupType1Desc to popupType1 selected
 */
function onchangeSampleType1(){
	var Fn = "[onchangeSampleType1()] ";
	
  var szAlertType =  selectGetSelVal(getElementById2('popupType1'));
	jslog (JSLOG_DEBUG,Fn + "szAlertType=" + szAlertType + "  select same AlertType into popupType1");
	selectSelValue(getElementById2('popupType1Desc'), szAlertType);
	var bPopupChoice = (szAlertType == POPUP_TYPE.CHOICE);
	var bPopupPrompt = (szAlertType == POPUP_TYPE.PROMPT);
	var bPopupOther = (!bPopupChoice && !bPopupPrompt);
  elementShow (getElementById2("sample_1_note_popup"),bPopupOther,"block"); 
  elementShow (getElementById2("optChoice"),bPopupChoice,"block"); 
  elementShow (getElementById2("sample_1_note_choice"),bPopupChoice,"block"); 
  elementShow (getElementById2("optPrompt"),bPopupPrompt,"block"); 
  elementShow (getElementById2("sample_1_note_prompt"),bPopupPrompt,"block"); 
}



/**
 * SAMPLE_2: HTML Popup
 */
function sample1(){
  var szAlertType =  selectGetSelVal(getElementById2('popupType1'));
  if (szAlertType == POPUP_TYPE.INFO){
    return sample1Info();
  }else if (szAlertType == POPUP_TYPE.WARN){
    return sample1Warn("");
  }else if (szAlertType == POPUP_TYPE.ERR){
    return sample1Err();
  }else if (szAlertType == POPUP_TYPE.CONFIRM){
    return sample1Confirm();
  }else if (szAlertType == POPUP_TYPE.ALARM){
    return sample1Alarm();
  }else if (szAlertType == POPUP_TYPE.CHOICE){
    return sample1Choice();
  }else if (szAlertType == POPUP_TYPE.PROMPT){
    return sample1Prompt();
  }else if (szAlertType == POPUP_TYPE.QUESTION || szAlertType == POPUP_TYPE.QUESTION_3){
    return sample1Question(szAlertType);
  }
}

function sample1Info(){
  var szMsg = 'This is an Information with <b>some part bold</b>, <i>some part Italic</i>,...<BR/><u>This is the Line 2 that is underlined</u><BR/>' +
    '<label class="PopupGood">This is the  line 3 in bold green (to enphasize <i>Good Msg</i>)</label><BR/>' +
  '<label class="PopupWarning">This is the  line 4 with Yellow Background (to enphasize <i>Warning Msg</i>)</label><BR/>' +
  '<label class="PopupError">This is the  line 5 in Bold Red (to enphasize <i>Error Msg</i>)</label><BR/><BR/>' +
    'You can try different Type of POPUP. The <b><u><i>Standard</i> POPUP</u></b> are:' +
  '<ul type="square">' +
    '<li><b>POPUP_TYPE.INFO</b> for Info</li>' +
    '<li><b>POPUP_TYPE.WARN</b> for Warning</li>' +
    '<li><b>POPUP_TYPE.ERR</b> for Error</li>' +
    '<li><b>POPUP_TYPE.ALARM</b> for Alarm</li>' +
    '<li><b>POPUP_TYPE.CONFIRM</b> for Confirmation</li>' +
    '<li><b>POPUP_TYPE.QUESTION</b> to ask a Question with 2 Buttons</li>' +
    '<li><b>POPUP_TYPE.QUESTION_3</b> to ask a Question with 3 Buttons</li>' +
    '<li><b>POPUP_TYPE.CHOICE</b> to Choose one or more values from a List of values</li>' +
    '<li><b>POPUP_TYPE.PROMPT</b> to Prompt for a value</li>' +
    '</ul>';
  Popup(POPUP_TYPE.INFO,szMsg);
}



/*
 *    @param szTitle {String} if it is different from "" or null it is set as Title into Popup, else Default is used (WARNING in this case)
 */
function sample1Warn(szTitle){
   var szMsg = 'There were 2 Warnings and we can enphasize them using Popup.css class <b>PopupWarning</b><BR/><BR/>' +
       '<b>WARNING LIST:</b>' +
       '<ul type="square">' +
        '<li><label class="PopupWarning">WARNING CODE 001234:</label> This an Example of a long phrase that describe this Warning. This phrase will be automatically splitted by Popup into more lines: we do not have to worrie about inserting newline into the description.</li> ' +
        '<li><label class="PopupWarning">WARNING CODE 1234568:</label> This an Example of this Warning Description</li>' +
      '</ul>';
    Popup(POPUP_TYPE.WARN,szMsg,{szTitle:szTitle});
}

function sample1Err(){
  Popup(POPUP_TYPE.ERR,
  		  '<label class="PopupError">This is an ERROR!</label><BR/>But dont worrie it is only an example<BR/><label class="PopupGood">Everything is still working properly :o)</label>',
  		  {iWidth: 450}
  		 );
}


function sample1Alarm(){
  var szMsg =  '<label class="PopupError">The CPU temperature is critically hight!!!</label>' +  
        '<img src="' +  JSU_PATH_ABOUT_IMG +  'ComputerFire.gif" width="70" height="70"  />' + 
       '<BR/>But dont worrie, it is only an example.' ;
  Popup(POPUP_TYPE.ALARM,
  		szMsg,
		  {iWidth: 450}
  		);
}



/*
 * Question with 2 or 3 Buttons
 */
function sample1Question(szPopupType){
  Popup(szPopupType,
  		'Do you like <b>Popup API</b>?',
  		{ 
  	   iWidth: 400,
  	   fnCallback: callbackQuestion
  	   }
  );
}


/**
 * Show a POPUP_TYPE.CONFIRM with a table with various images (The Path of images is relative to Popup.html)
 * 
 */
function sample1Confirm(){
  // NOTE: the image Path are relative to Popup.html Path
  var szMsg = 'Example of Confirmation: <label class="PopupGood">All the Test have been Completed.</label><BR/><BR/>' +
    'Follow an Example of TABLE that can be used to display the Abstract of some TESTS:<BR/><BR/>' +
    '<table class="Popup" width="95%">' +
    '  <th class="PopupTitle" colspan="3">EXAMPLE OF TEST RESULTS</th>' +   
    '  <tr class="Popup">' +
    '    <td class="PopupHea" width="30%">TEST</th>' +
    '    <td class="PopupHea" width="30%">RESULT</th>' +
    '    <td class="PopupHea" width="40%">STATE</th>' +
    '  </tr>' +
    '  <tr class="Popup">' +
    '    <td class="PopupLeft"><b>Test 1</b></td>' +
    '    <td class="PopupGood PopupCenter">OK</td>' +
    '    <td class="PopupCenter"><img src="' + JSU_PATH_IMG + 'PopupOk.jpg" width="20" height="20"></td>' +
    '  </tr>' +
    '  <tr class="Popup">' +
    '    <td class="PopupLeft"><b>Test 2</b></td>' +
    '    <td class="PopupGood PopupCenter">OK</td>' +
    '    <td class="PopupCenter"><img src="' + JSU_PATH_IMG + 'PopupOk.jpg" width="20" height="20"></td>' +
    '  </tr>' +
    '  <tr class="Popup">' +
    '    <td class="PopupLeft"><b>Test 3</b></td>' +
    '    <td class="PopupWarning PopupCenter">WARNING</td>' +
    '    <td class="PopupCenter"><img src="' + JSU_PATH_IMG + 'PopupWarning.png" width="20" height="20"></td>' +
    '  </tr>' +
    '  <tr class="Popup">' +
    '    <td class="PopupLeft"><b>Test 4</b></td>' +
    '    <td class="PopupError PopupCenter">ERROR</td>' +
    '    <td class="PopupCenter"><img src="' + JSU_PATH_IMG + 'PopupError.png" width="20" height="20"></td>' +
    '  </tr>' +
    '<table><BR/>';
  Popup(POPUP_TYPE.CONFIRM,szMsg);
}


/**
 * Show PopupChoice with the option set by User
 */
function sample1Choice(){
  var Fn="[sample1Choice] ";
  var CHOICE_NUM = 20;
  
  var szSel =  selectGetSelVal(getElementById2('selectChoiceMultiSel'));
  jslog (JSLOG_DEBUG, Fn + "szSel=" + szSel);
  var bChoiceMultiSel = selectGetSelVal(getElementById2('selectChoiceMultiSel')) == "TRUE";
  var szChoiceLabel = bChoiceMultiSel ? "<b>Select 0..N FIELDS</b><BR/>" :  "<b>Select only One FIELD</b>";
  // Prepare an Example of arChoice
  var arChoice  = new Array();
  for (var i=1;i<=CHOICE_NUM;i++){
    var arItem = { 
           value:i, 
           szText:"This is an Example of the Item " + i, 
           bSel: false
           };
    if (!bChoiceMultiSel && i == 10){
      arItem.bSel = true; // Selected
    }    
    if (bChoiceMultiSel && i <=5){
      arItem.bSel = true; // Selected
    }    
    arChoice.push (arItem);
  }
  var iChoiceMultiSize = null;
  var szMsgHtml = "";
  if (bChoiceMultiSel){
    // Get the optional Size
    var iChoiceMultiSize = getElementById2('iChoiceMultiSize');
    var iChoiceMultiSize = parseInt(iChoiceMultiSize[iChoiceMultiSize.selectedIndex].value);
    szMsgHtml = 'Example of <b>Multi Selection Choice</b> with:<ul>' + 
        '<li>' + CHOICE_NUM + ' items </li>' + 
        '<li>First 5 Items pre-selected</li>' +
        '<li>Visible Items=' + iChoiceMultiSize +'</li></ul>';
  }else{
    szMsgHtml = "Example of <b>Single Selection Choice</b> with Item 10 pre-selected.<BR/><BR/>"; 
  }
  var objRet = PopupChoice (szMsgHtml,szChoiceLabel,arChoice,
      {fnCallback:callbackChoice,
       bChoiceMultiSel: bChoiceMultiSel,
       iChoiceMultiSize: iChoiceMultiSize
      });
}


/**
 * Show Hide divChoiceMultiSel depending on selectChoiceType  
 */
function onchangeChoiceMultiSel(){
  // Get the bMultiSize option selected
  var bChoiceMultiSel = selectGetSelVal(getElementById2('selectChoiceMultiSel')) == "TRUE";
  elementShow (getElementById2('divChoiceSize'),bChoiceMultiSel,'inline');
  
    
}















function showSampleAbout(){
  
  showJsuAbout({szPathAboutImg: JSU_PATH_ABOUT_IMG});
}



/**
 * Show PopupChoice with the option set by User
 */
function showSampleChoice(){
  var CHOICE_NUM = 40;
  
  // Get the bMultiSize option selected
  var selectChoiceType = getElementById2('selectChoiceType');
  var bChoiceMultiSel = (selectChoiceType[selectChoiceType.selectedIndex].value == "SINGLE") ? false : true;
  var szChoiceLabel = bChoiceMultiSel ? "<b>Select 0..N FIELDS</b><BR/>" :  "<b>Select only One FIELD</b>";
  // Prepare an Example of arChoice
  var arChoice  = new Array();
  for (var i=1;i<=CHOICE_NUM;i++){
    var arItem = { 
           value:i, 
           szText:"This is an Example of the Item " + i, 
           bSel: false
           };
    if (!bChoiceMultiSel && i == 10){
      arItem.bSel = true; // Selected
    }    
    if (bChoiceMultiSel && i <=5){
      arItem.bSel = true; // Selected
    }    
    arChoice.push (arItem);
  }
  var iChoiceMultiSize = null;
  if (bChoiceMultiSel){
    // Get the optional Size
    var iChoiceMultiSize = getElementById2('iChoiceMultiSize');
    var iChoiceMultiSize = parseInt(iChoiceMultiSize[iChoiceMultiSize.selectedIndex].value);
  }
  var szMsgHtml = bChoiceMultiSel ? "Example of <b>Multi Selection Choice</b> with First 5 Items pre-selected." 
                  : "Example of <b>Single Selection Choice</b> with Item 10 pre-selected."; 
  
  var objRet = PopupChoice (szMsgHtml,szChoiceLabel,arChoice,
      {fnCallback:callbackChoice,
       bChoiceMultiSel: bChoiceMultiSel,
       iChoiceMultiSize: iChoiceMultiSize
      });
}



/**
 * Show Popup PROMPT with the option set by User
 */
function sample1Prompt(){
  var Fn = "[sample1Prompt] ";
  var szPromptType = selectGetSelVal(getElementById2("szPromptType"));
  var szMsg = (szPromptType == PROMPT_TYPE.NUMBER) ?
     "Please Insert a <B>Number</b>" :  
    "Please Insert a <B>Text</b>";  
  var objOpt ={
    szPromptType: szPromptType,
    szPromptLabel: getElementById2 ("szPromptLabel").value,
    szPromptValue: getElementById2 ("szPromptValue").value,
    iPromptMin:  parseInt (getElementById2("iPromptMin").value),
    iPromptMax: parseInt (getElementById2 ("iPromptMax").value),
    iPromptWidth: parseInt(getElementById2  ("iPromptWidth").value),
    fnCallback:callbackPrompt
  };  
  jslogObj (JSLOG_DEBUG,Fn + "objOpt", objOpt );
  Popup (POPUP_TYPE.PROMPT,szMsg,objOpt);

}


/* ============================================================================
 *             SAMPLE_2
 ============================================================================ */


function onchangeSample2(){
  var Fn="[onchangeSample2] ";
  var szType =  selectGetSelVal(getElementById2('type2'));
	var bLayout = (szType == "LAYOUT");
  elementShow (getElementById2("optLayout"),bLayout,"block"); 
  elementShow (getElementById2("sample_2_note_layout"),bLayout,"block"); 
  
    
}

/**
 * Show Popup Info with the option set by User
 */
function sample2Layout(){
  // var Fn = "[sample2Layout] ";
  var objOpt ={
      bShowImg: selectGetSelVal (getElementById2("bShowImg")) == "TRUE",
      bResize: selectGetSelVal (getElementById2("bResize")) == "TRUE",
      bModal: selectGetSelVal (getElementById2("bModal")) == "TRUE",
      szTitle: getElementById2("szTitle").value,
      iWidth: selectGetSelVal (getElementById2("iWidth")) 
    };  
  
  var szMsg = 'Popup with a <b>CUSTOM LAYOUT</b>' +
    '  <ul type="square">' +
    '   <li><b>bShowImg: </b>' +  objOpt.bShowImg +  '</li>' +
    '   <li><b>bResize: </b>' +  objOpt.bResize +  '</li>' +
    '   <li><b>bModal: </b>' +  objOpt.bModal+  '</li>' +
    '   <li><b>iWidth: </b>' +  objOpt.iWidth+  '</li>' +
    '  </ul>';
  Popup(POPUP_TYPE.INFO,szMsg, objOpt,{iWidth:300});

}



/**
 * SAMPLE_2: Custom JQ Popup
 */
function sample2(){
  var szType =  selectGetSelVal(getElementById2('type2'));
  if (szType == "LAYOUT"){
    return sample2Layout();
  }else if (szType == "1BTN"){
    return sample2CustomBtn1();
  }else if (szType == "2BTN"){
    return sample2CustomBtn2();
  }else if (szType == "3BTN"){
    return sample2CustomBtn3();
  }
}


/*
 * Custom Btn Confirm = "CONTINUE"  
 */
function sample2CustomBtn1(){
  var szMsg = 'Example<BR><b>1 Custom Button with a different Label</b><BR/><BR/>Popup Option:<ul><li><b>szConfirmLabel</b>: "CONTINUE"</li></ul>';
  Popup(POPUP_TYPE.INFO,szMsg,{szConfirmLabel: "CONTINUE", iWidth:400});
}


/*
 * 2 Custom Btn, change also Btn Width  
 */
function sample2CustomBtn2(){
  var szMsg = '<b>Example<BR>2 Custom Button with different Label and Width</b><BR/><BR/>Popup Option:<ul>' +
   '<li><b>szConfirmLabel</b>: "YES I Like it!"</li>' +
   '<li><b>iConfirmWidth</b>: 200</li>' +
   '<li><b>szNoLabel</b>: "NO I don\'t LIKE IT"</li>' +
   '<li><b>iNoWidth</b>: 200</li>' +
   '</ul></BR>' +
   'Do you like <b>Popup API</b>?';
  Popup(POPUP_TYPE.QUESTION,szMsg,
      {fnCallback: callbackQuestion,
       szConfirmLabel: "YES I Like it!",iConfirmWidth:160,
       szNoLabel: "NO I don't LIKE IT",iNoWidth:160, 
       iWidth: 450
       }
    );
}

/*
 * 3 Custom Btn, change also Width  
 */
function sample2CustomBtn3(){
  var szMsg = 'Example<BR><b>3 Custom Button, each one with different Label and Width</b><BR/><BR/>Popup Option:<ul>' +
  '<li><b>szConfirmLabel</b>: "YES It is Very Interesting"</li>' +
  '<li><b>iConfirmWidth</b>: 280</li>' +
  '<li><b>szNoLabel</b>: "NOT Very Much"</li>' +
  '<li><b>iNoWidth</b>: 180</li>' +
  '<li><b>szCancelLabel</b>: "INDIFFERENT"</li>' +
  '<li><b>iCancelWidth</b>: 180</li>' +
  '</ul></BR>' +
  'Do you like <b>Popup API</b>?';
  Popup(POPUP_TYPE.QUESTION_3, szMsg,
      {fnCallback: callbackQuestion,
  	   iWidth: 560,
       szConfirmLabel: "YES It is Super",iConfirmWidth:150,
        szNoLabel: "NOT Very Much",iNoWidth:150, 
        szCancelLabel: "INDIFFERENT",iCancelWidth:150
        }
  );
}



/* ============================================================================
 *             SAMPLE_4
 ============================================================================ */

/*
 * Popup with a Video  
 */
function sample3VideoOk(){
  // Show Popup with Video
	var szMsg = '<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
  
	
	Popup(POPUP_TYPE.INFO, szMsg,
      // objOpt
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "Video Example"});
}


/*
 * Popup with a Video  
 */
function sample3Video(){
	var szMsg = '<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
  // Show Popup with Video   
  Popup(POPUP_TYPE.INFO, szMsg,
      // objOpt
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "Video Example"});
  
}

/*
 * Popup with a Embedded Page  
 */
function sample3Page(){
	var szMsg =	'<iframe width="1050" height="580" align="center" src="' + JSU_LONG_URL_DOWNLOAD_PAGE_FREE +'" ></iframe>';
  // Show Popup with Page   
  Popup(POPUP_TYPE.INFO, szMsg,
      // objOpt
      {bShowImg:false,
  	   iWidth:1120,
  	   iHeight: 690,
  	   bShowBtnSect : false,  // Do Not show Button section on the Bottom of the Popup
  	   position:{at: "top"}, 
  	   szTitle: "Popup with Embedded HTML Page"
  	  });  
}



/**
 * SAMPLE_3: 
 */
function sample3(){
  var szType =  selectGetSelVal(getElementById2('type3'));
  if (szType == "VIDEO"){
    return sample3Video();
  }else if (szType == "PAGE"){
    return sample3Page();
  }
}





/**
 * Align type3Desc to type3 selected
 */
function onchangeSampleType3(){
	var Fn = "[onchangeSampleType3()] ";
	
  var szType =  selectGetSelVal(getElementById2('type3'));
	jslog (JSLOG_DEBUG,Fn + "szAlertType=" + szType + "  select same AlertType into type3");
	selectSelValue(getElementById2('type3Desc'), szType);
	
}





//===================================================================================================
//  BELOW CODE is not strictly related to the Sort feature, but it is ONLY Related to JS Code 
//===========================================================================================



var JS1_NOTIFY= '// Prepare the Msg to display, with whatever HTML TAG \n' +
'var szMsgHTML = "This is an Information with <b>some part bold</b>, <i>some part Italic</i>,... "; \n' +
'// Show Popup \n' +
'//PopupType:   POPUP_TYPE.INFO, .CONFIRM, .WARN, .ERR, .ALARM] \n' +
'Popup (PopupType,szMsgHTML); ';

var JS1_QUESTION= '// 1) Show Popup, using whatever HTML Tag in szMsg \n' +
'// PopupType = POPUP_TYPE.QUESTION (2 Buttons) or POPUP_TYPE.QUESTION_3 (3 Buttons) \n'+
'var objRet = Popup (PopupType,"Do you like <b>Popup API</b>") \n'+
'// 2) manage the Popup answer, returned into objRet - example: objRet= {"retBtn": "NO"}\n' + 
'  var retBtn   = objRet.retBtn; \n' +
'  if (retBtn   == POPUP_BTN.CONFIRM){  // Popup Closed clicking OK \n' + 
'  }else if (retBtn   == POPUP_BTN.NO){ // Popup Closed clicking NO \n' + 
'  }else if (retBtn   == POPUP_BTN.CANCEL){  // Popup Closed clicking CANCEL \n' + 
'  }else if (retBtn   == POPUP_BTN.CLOSE){  // Popup Closed clicking X or ESC \n' +
'  ...';


var JS1_PROMPT= '// 1) Show Popup, using whatever HTML Tag in szMsg \n' +
'Popup (POPUP_TYPE.PROMPT, \n' +
'  "Please insert a <b>NUMBER</b>", \n' +
'  // objOpt Option: PromptLabel, validate \n' +
'  { szPromptLabel: "VOTE [1..10]: ", \n' +
'     // Validate Option: NUMBER must be in range [1..10] \n' +
'     szPromptType: PROMPT_TYPE.NUMBER,  iPromptMin:1,  iPromptMax: 10,iPromptWidth:50, \n' +
'   }); \n' +
'  // Example of objRet, if user insert 9 and click OK: objRet= {"retBtn": "CONFIRM", "promptValue": "9"} \n' +
'  var retBtn   = objRet.retBtn; \n' +
'  if (retBtn   == POPUP_BTN.CONFIRM){  // Popup Closed clicking OK \n' + 
'  }else if (retBtn   == POPUP_BTN.CANCEL){  // Popup Closed clicking CANCEL \n' + 
'  }else if (retBtn   == POPUP_BTN.CLOSE){  // Popup Closed clicking X or ESC \n' +
'  ...';


var JS1_CHOICE= '// 1) Show Popup, using whatever HTML Tag in szMsg. In this example item10 is pre-selected \n' +
'var objRet = PopupChoice ( //Messages \n' +
'  "Example of <b>Single Selection Choice</b>......",  "<b>Select only one field</b>", \n' +
'  // arChoice: \n' +
'  [{value:1, szText:"This is an example of the Item1", bSel:false},  \n' +
'     {value:2, szText:"This is an example of the Item2",  bSel:false}, \n' +
'     ....... \n' +
'     {value:10, szText:"This is an example of the Item10",  bSel:true}, \n' +
'     ....... \n' +
'  ]); \n' +
'  // Example of objRet, if user select Item2 and click OK: \n' +
'  // objRet={\n' +
'  //   "retBtn":"CONFIRM",\n' +
'  //   "choiceValue":"2",\n' +
'  //   "choiceText":"This is an example of the Item2",\n' +
'  //   "arChoice":[{"value":"1","szText":"This is an example of the Item1","bSel":false},\n' +
'  //               {"value":"2","szText":"This is an example of the Item2","bSel":true},\n' +
'  //               ..........................................'
'  //               .......................................... }]}\n' +  
'// 2) manage the Popup answer, returned into objRet \n' + 
'  var retBtn   = objRet.retBtn; \n' +
'  if (retBtn   == POPUP_BTN.CONFIRM){  // Popup Closed clicking OK \n' + 
'  }else if (retBtn   == POPUP_BTN.CANCEL){  // Popup Closed clicking CANCEL \n' + 
'  }else if (retBtn   == POPUP_BTN.CLOSE){  // Popup Closed clicking X or ESC \n' +
'  ...';



var JS2_OPT =  
'function Popup(szPopupType, szMsgHtml,objOpt){ \n' +
' ........\n' +
'} \n' +
'// objOpt can be used to set OptionalParameter: \n' +
' /* @param objOpt    [Object]}    Optional Object to change default Option:\n' +
' *    fnCallback:  {function}  callback function, called when Popup is closed \n' +
' *    szTitle:    {String}      change default Title\n' +
' *    position: {Object}    jQuery ui position. Default {my: "center"}\n' + 
' *    iWidth:  {Number}      Optional PopupWidth: if it passed it is used - Else DEfault is used\n' +
' *    iHeight:  {Number}     Optional PopupHeight: if it passed it is Set- Else is automarically calculated\n' +
' *    szConfirmLabel:  {String} Label of Confirm Button \n' +
' *    iConfirmWidth:   {Number}  Width of Confirm Button \n' +
' *    szNoLabel:  {String}      Label of No Button \n' +
' *    iNoWidth:   {Number}      Width of No Button \n' +
' *    szNoLabel:  {String}      Label of No Button \n' +
' *    iNoWidth:   {Number}      Width of No Button \n' +
' *    bShowImg:    {Boolean}     true to show Image  (Default=true)\n' +
' *    bResize:    {Boolean}     true to allow Resize Dialog  (Default=true)\n' +
' *    bModal:    {Boolean}     true=modal (default)\n' +
' *    bCloseOnEscape: {Boolean}  Default true   \n' +
' *    ------------------------------------------ ONLY For POPUP_TYPE.CHOICE:\n' + 
' *    bChoiceMultiSel: {Boolean}  true if MultiSelect,else single select. Default false\n' +
' *    iChoiceMultiSize: {Number}  if bChoiceMultiSel=true:  size (Num item) to display without Scrollbar\n' +
' *    ------------------------------------------ ONLY For POPUP_TYPE.PROMPT: \n' +
' *    szPromptType: {String}  PROMPT_TYPE.NUMBER  PROMPT_TYPE.STRING default=PROMPT_TYPE.STRING\n' +       
' *    szPromptLabel: {String}  Label in Front of Prompt  \n' +
' *    szPromptValue: {String}  Default Value to set       \n' +
' *    iPromptWidth: {Number}  Width (px) of the Prompt Item       \n' +
' *    iPromptMin: {Number}   Min (MinValue for PROMPT_TYPE.NUMBER, MinLen for PROMPT_TYPE.STRING)\n' +          
' *    iPromptMax: {Number}   Max (MaxValue for PROMPT_TYPE.NUMBER, MaxLen for PROMPT_TYPE.STRING)';          


var JS3_VIDEO= '// 1) Show Popup with Video \n' +
'Popup(POPUP_TYPE.INFO, \n' +
'   // szMsg = iframe with Video URL \n' + 
'   //    Example: <iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe> \n' + 
'   szMsg,\n' +
'   // objOpt \n' +
'   {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "Video Example"}); \n';



var JS3_PAGE= '// Prepare the HTML Msg with the Embedded Page \n' +
'  var szMsg =	\'<iframe width="1060" height="600" align="center"  \n' +
'      src="https://rawgit.com/FedericoLevis/JSU/master/samples/JSUFreeDownload.html" ></iframe>\'; \n' +
'  // Show Popup with Page    \n' +
'  Popup(POPUP_TYPE.INFO, szMsg, \n' +
'      // objOpt \n' +
'      {bShowImg:false, \n' +
'  	   iWidth:1100, \n' +
'  	   iHeight: 650, \n' +
'  	   bShowBtnSect : false,  // Do Not show Button section on the Bottom of the Popup \n' +
'  	   position:{at: "top"},  \n' +
'  	   szTitle: "Popup with Embedded HTML Page" \n' +
'  	  });\n\n';




/**
 * Show JS Code for Sample2 (in a TextBox because it has HTML tags)
 * @param event
 * @returns
 */
function sample1Code(event){
  // Get the szAlertType set by User 
  var szAlertType =  selectGetSelVal(getElementById2('popupType1Desc'));
  var szTip="";
  
  if (szAlertType == POPUP_TYPE.CHOICE){
    szTip = JS1_CHOICE;
  }else if (szAlertType == POPUP_TYPE.PROMPT){
    szTip = JS1_PROMPT;
  }else if (szAlertType == POPUP_TYPE.QUESTION || szAlertType == POPUP_TYPE.QUESTION_3){
    szTip = JS1_QUESTION;
  }else {
    szTip = JS1_NOTIFY;
  }  
  TipFixTextArea(szTip,event,{iColNum:130, iRowNum:20,szTitle:"JS Source Code - POPUP_TYPE=" + szAlertType});
  
}



/**
 * Show JS Code Hightlighted for Sample2
 * @param event
 * @returns
 */
function sample2Code(event){
  TipFixCode(JS2_OPT,event,{iWidth:1000, iTipMaxHeight:400,szTitle:"JS Source Code - Popup Option" });
}



/**
 * Show JS Code Hightlighted for Sample4
 * @param event
 * @returns
 */
function sample3Code(event){
  // Get the szAlertType set by User 
  var szType =  selectGetSelVal(getElementById2('type3Desc'));
  var szTypeText =  selectGetSelText(getElementById2('type3Desc'));
  var szTip="";
  
  if (szType == "VIDEO"){
    szTip = JS3_VIDEO;
    TipFixTextArea(szTip,event,{szTitle:"JS Source Code - Advanced Sample=" + szTypeText});
  }else if (szType == "PAGE"){
    szTip = JS3_PAGE;
    TipFixTextArea(szTip,event,{szTitle:"JS Source Code - Advanced Sample=" + szTypeText});
  }
  
}



