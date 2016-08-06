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
	manage_par_opt(); // manage optional PAR show_opt, only for developer
  sampleInit();  
	loadingShow(false);
  
}

function sampleInit(){
  // Populate popupType select
  var arSelectId = ["popupType1","popupType2"];
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
  onchangeSample2(); // simulate to init
  onchangeSample3(); // simulate to init
}

/* ============================================================================
 *             SAMPLE_1
 ============================================================================ */


/**
 * Text Popup: Choice
 */
function sample1Choice(){
  PopupChoice (//Messages
      "Please Choose a Vote for Popup API\n",  "Popup VOTE: ",
      // arChoice: "Very Good" is pre-selected
      [{value:1, szText:"1 - Not Good", bSel:false},
       {value:2, szText:"2 - Good", bSel:false},
       {value:3, szText:"3 - Very Good", bSel:true},
       {value:4, szText:"4 - Excellent", bSel:false},
      ],
      // callback, called when user close the Popup
      {fnCallback: callbackChoice});
}

/**
 * Text Popup: Prompt
 */
function sample1Prompt(){
  Popup (POPUP_TYPE.PROMPT,
      "Insert a VOTE [1..10] in the field below\n(You can insert a  Value out of Range [1..10] to see Validation Features)\n\n",
      // objOpt Option: PromptLabel, validate, Callback
     { szPromptLabel: "VOTE [1..10]: ",
       // Validate Option: NUMBER must be in range [1..10]
       szPromptType: PROMPT_TYPE.NUMBER,  iPromptMin:1,  iPromptMax: 10,iPromptWidth:50,
       fnCallback: callbackPrompt});
}

/**
 * Text Popup: Question
 * @param PopupType POPUP_TYPE.QUESTION or POPUP_TYPE.QUESTION_3
 */
function sample1Question(PopupType){
  // PopupType = POPUP_TYPE.QUESTION (2 Buttons) or POPUP_TYPE.QUESTION_3 (3 Buttons)
  Popup (PopupType,"Do you like this sample?",
      // objOpt: callback called when Popup is closed
     {  fnCallback: callbackQuestion});
}

/**
 * Text Popup: Notify
 * @param PopupType   POPUP_TYPE.INFO POPUP_TYPE.CONFIRM  POPUP_TYPE.ERR  POPUP_TYPE.ALARM  POPUP_TYPE.WARN
 */
function sample1Notify(PopupType){
  // PopupType:   POPUP_TYPE.[INFO, CONFIRM, WARN, ERR, ALARM]
  Popup (PopupType,"This is an example of Message\nThis is the second Line");
}



/**
 * SAMPLE_1: Text Popup
 */
function sample1(){
  var szAlertType =  selectGetSelVal(getElementById2('popupType1'));
  if (szAlertType == POPUP_TYPE.CHOICE){
    return sample1Choice();
  }else if (szAlertType == POPUP_TYPE.PROMPT){
    return sample1Prompt();
  }else if (szAlertType == POPUP_TYPE.QUESTION || szAlertType == POPUP_TYPE.QUESTION_3){
    return sample1Question(szAlertType);
  }else {
    return sample1Notify(szAlertType);
  }  
}

/**
 * Align labelSample1 to Type Sample1 selected
 */
function onchange_sampleType1(){
	var Fn = "[onchange_sampleType1()] ";
	
  var szAlertType =  selectGetSelText(getElementById2('popupType1'));
	jslog (JSLOG_DEBUG,Fn + "szAlertType=" + szAlertType);
  var label = getElementById2('labelSample1');
  label.innerHTML = "POPUP_TYPE=" + szAlertType;
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
    Popup(POPUP_TYPE.CONFIRM,'<label class="PopupGood">Your answer was YES</label>',  {szTitle: "GOOD ANSWER!"});
  }else if (retBtn   == POPUP_BTN.NO){
    Popup(POPUP_TYPE.ERR,'<label class="PopupError">Your answer was NO</label>',  {szTitle: "WHY DON'T WOUT LIKE IT?"});
  }else if (retBtn   == POPUP_BTN.CANCEL){
    Popup(POPUP_TYPE.INFO,'<label class="PopupWarning">You have clicked CANCEL Button</label>');
  }else if (retBtn   == POPUP_BTN.CLOSE){
    Popup(POPUP_TYPE.INFO,'You have close the Window without any Choice');
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


function onchangeSample2(){
  var Fn="[onchangeSample2] ";
  var szAlertType =  selectGetSelVal(getElementById2('popupType2'));
  jslog (JSLOG_DEBUG,"szAlertType=" + szAlertType);
  elementShow (getElementById2("optChoice"),szAlertType == POPUP_TYPE.CHOICE,"block"); 
  elementShow (getElementById2("optPrompt"),szAlertType == POPUP_TYPE.PROMPT,"block"); 
    
}


/**
 * SAMPLE_2: HTML Popup
 */
function sample2(){
  var szAlertType =  selectGetSelVal(getElementById2('popupType2'));
  if (szAlertType == POPUP_TYPE.INFO){
    return sample2Info();
  }else if (szAlertType == POPUP_TYPE.WARN){
    return sample2Warn("");
  }else if (szAlertType == POPUP_TYPE.ERR){
    return sample2Err();
  }else if (szAlertType == POPUP_TYPE.CONFIRM){
    return sample2Confirm();
  }else if (szAlertType == POPUP_TYPE.ALARM){
    return sample2Alarm();
  }else if (szAlertType == POPUP_TYPE.CHOICE){
    return sample2Choice();
  }else if (szAlertType == POPUP_TYPE.PROMPT){
    return sample2Prompt();
  }else if (szAlertType == POPUP_TYPE.QUESTION || szAlertType == POPUP_TYPE.QUESTION_3){
    return sample2Question(szAlertType);
  }
}

function sample2Info(){
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
    '<li><b>POPUP_TYPE.PROMPT</b> to Prompt for a value</li>' +
    '</ul>';
  Popup(POPUP_TYPE.INFO,szMsg);
}

/*
 *    @param szTitle {String} if it is different from "" or null it is set as Title into Popup, else Default is used (WARNING in this case)
 */
function sample2Warn(szTitle){
   var szMsg = 'There were 2 Warnings and we can enphasize them using Popup.css class <b>PopupWarning</b><BR/><BR/>' +
       '<b>WARNING LIST:</b>' +
       '<ul type="square">' +
        '<li><label class="PopupWarning">WARNING CODE 001234:</label> This an Example of a long phrase that describe this Warning. This phrase will be automatically splitted by Popup into more lines: we do not have to worrie about inserting newline into the description.</li> ' +
        '<li><label class="PopupWarning">WARNING CODE 1234568:</label> This an Example of this Warning Description</li>' +
      '</ul>';
    Popup(POPUP_TYPE.WARN,szMsg,{szTitle:szTitle});
}

function sample2Err(){
  Popup(POPUP_TYPE.ERR,'<label class="PopupError">This is an ERROR!</label><BR/>But dont worrie it is only an example<BR/><label class="PopupGood">Everything is still working properly :o)</label>');
}


function sample2Alarm(){
  var szMsg =  '<label class="PopupError">The CPU temperature is critically hight!!!</label>' +  
        '<img src="' +  JSU_PATH_ABOUT_IMG +  'ComputerFire.gif" width="70" height="70"  />' + 
       '<BR/>But dont worrie, it is only an example.' ;
  Popup(POPUP_TYPE.ALARM,szMsg );
}



/*
 * Question with 2 or 3 Buttons
 */
function sample2Question(szPopupType){
  Popup(szPopupType,'Do you like <b>Popup API</b>?',{fnCallback: callbackQuestion});
}


/**
 * Show a POPUP_TYPE.CONFIRM with a table with various images (The Path of images is relative to Popup.html)
 * 
 */
function sample2Confirm(){
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
function sample2Choice(){
  var Fn="[sample2Choice] ";
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
    var selectChoiceSize = getElementById2('selectChoiceSize');
    var iChoiceMultiSize = parseInt(selectChoiceSize[selectChoiceSize.selectedIndex].value);
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
    var selectChoiceSize = getElementById2('selectChoiceSize');
    var iChoiceMultiSize = parseInt(selectChoiceSize[selectChoiceSize.selectedIndex].value);
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
function sample2Prompt(){
  var Fn = "[sample2Prompt] ";
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
 *             SAMPLE_3
 ============================================================================ */


function onchangeSample3(){
  var Fn="[onchangeSample3] ";
  var szType =  selectGetSelVal(getElementById2('type3'));
  elementShow (getElementById2("optLayout"),szType == "LAYOUT","block"); 
    
}

/**
 * Show Popup Info with the option set by User
 */
function sample3Layout(){
  // var Fn = "[sample3Layout] ";
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
  Popup(POPUP_TYPE.INFO,szMsg, objOpt);

}



/**
 * SAMPLE_3: HTML Popup
 */
function sample3(){
  var szType =  selectGetSelVal(getElementById2('type3'));
  if (szType == "LAYOUT"){
    return sample3Layout();
  }else if (szType == "1BTN"){
    return sample3CustomBtn1();
  }else if (szType == "2BTN"){
    return sample3CustomBtn2();
  }else if (szType == "3BTN"){
    return sample3CustomBtn3();
  }
}


/*
 * Custom Btn Confirm = "CONTINUE"  
 */
function sample3CustomBtn1(){
  var szMsg = '<b>1 Custom Button</b><BR/><BR/>Popup Option:<ul><li><b>szConfirmLabel</b>: "CONTINUE"</li></ul>';
  Popup(POPUP_TYPE.ERR,szMsg,{szConfirmLabel: "CONTINUE"});
}


/*
 * 2 Custom Btn, change also Btn Width  
 */
function sample3CustomBtn2(){
  var szMsg = '<b>2 Custom Button</b><BR/><BR/>Popup Option:<ul>' +
   '<li><b>szConfirmLabel</b>: "YES I Like it!"</li>' +
   '<li><b>iConfirmWidth</b>: 200</li>' +
   '<li><b>szNoLabel</b>: "NO I don\'t LIKE IT"</li>' +
   '<li><b>iNoWidth</b>: 200</li>' +
   '</ul></BR>' +
   'Do you like <b>Popup API</b>?';
  Popup(POPUP_TYPE.QUESTION,szMsg,
      {fnCallback: callbackQuestion,
       szConfirmLabel: "YES I Like it!",iConfirmWidth:200,
       szNoLabel: "NO I don't LIKE IT",iNoWidth:200 }
        );
}

/*
 * 3 Custom Btn, change also Width  
 */
function sample3CustomBtn3(){
  var szMsg = '<b>3 Custom Button</b><BR/><BR/>Popup Option:<ul>' +
  '<li><b>szConfirmLabel</b>: "YES It is Very Interesting"</li>' +
  '<li><b>iConfirmWidth</b>: 200</li>' +
  '<li><b>szNoLabel</b>: "NOT Very Much"</li>' +
  '<li><b>iNoWidth</b>: 130</li>' +
  '<li><b>szCancelLabel</b>: "INDIFFERENT"</li>' +
  '<li><b>iCancelWidth</b>: 130</li>' +
  '</ul></BR>' +
  'Do you like <b>Popup API</b>?';
  Popup(POPUP_TYPE.QUESTION_3, szMsg,
      {fnCallback: callbackQuestion,
       szConfirmLabel: "YES It is Very Interesting",iConfirmWidth:200,
        szNoLabel: "NOT Very Much",iNoWidth:130, 
        szCancelLabel: "INDIFFERENT",iCancelWidth:130}
  );
}



/* ============================================================================
 *             SAMPLE_4
 ============================================================================ */

/*
 * Popup with a Video  
 */
function sample4Video(){
  // Show Popup with Video
	var szMsg = '<iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
  Popup(POPUP_TYPE.INFO, szMsg,
      // objOpt
      {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "Video Example"});
}


/**
 * SAMPLE_4: HTML Popup
 */
function sample4(){
  var szType =  selectGetSelVal(getElementById2('type4'));
  if (szType == "VIDEO"){
    return sample4Video();
  }else if (szType == "ABOUT"){
    return showJsuPopupAbout();
  }
}

/**
 * Align labelSample4 to Type Sample4 selected
 */
function onchange_sampleType4(){
	var Fn = "[onchange_sampleType4()] ";
	
  var szType =  selectGetSelText(getElementById2('type4'));
	jslog (JSLOG_DEBUG,Fn + "szType=" + szType);
  var label = getElementById2('labelSample4');
  label.innerHTML =  szType;
}





//===================================================================================================
//  BELOW CODE is not strictly related to the Sort feature, but it is ONLY Related to JS Code 
//===========================================================================================



var JS1_NOTIFY= '// 1) Show Popup \n' +
'//PopupType:   POPUP_TYPE.INFO, .CONFIRM, .WARN, .ERR, .ALARM] \n' +
'Popup (PopupType,"This is an example of Message\\nThis is the second Line"); ';

var JS1_QUESTION= '// 1) Show Popup \n' +
'// PopupType = POPUP_TYPE.QUESTION (2 Buttons) or POPUP_TYPE.QUESTION_3 (3 Buttons) \n'+
'Popup (PopupType,"Do you like this sample?", \n'+
'  // objOpt: callback called when Popup is closed \n'+
'  { fnCallback: callbackQuestion}); \n\n'+
'// 2) CALLBACK, invoked when Popup is closed \n' + 
'function callbackQuestion(objRet){ \n' +
'  // Example of objRet, if user click NO \n' +
'  //   objRet= {"retBtn": "NO"} \n' +
'  // ---- Check How user has closed the Popup: \n' +
'  var retBtn   = objRet.retBtn  ; \n' +
'  if (retBtn   == POPUP_BTN.CONFIRM){  // Popup Closed clicking OK \n' + 
'  }else if (retBtn   == POPUP_BTN.NO){ // Popup Closed clicking NO \n' + 
'  }else if (retBtn   == POPUP_BTN.CANCEL){  // Popup Closed clicking CANCEL \n' + 
'  }else if (retBtn   == POPUP_BTN.CLOSE){  // Popup Closed clicking X or ESC \n' +
'  ...';


var JS1_PROMPT= '// 1) Show Popup \n' +
'Popup (POPUP_TYPE.PROMPT, \n' +
'  "Insert a VOTE [1..10] in the field below\\n(You can insert a  Value out of Range [1..10] to see Validation Features)\\n\\n", \n' +
'  // objOpt Option: PromptLabel, validate, Callback \n' +
'  { szPromptLabel: "VOTE [1..10]: ", \n' +
'     // Validate Option: NUMBER must be in range [1..10] \n' +
'     szPromptType: PROMPT_TYPE.NUMBER,  iPromptMin:1,  iPromptMax: 10,iPromptWidth:50, \n' +
'     fnCallback: callbackPrompt}); \n\n' +
'// 2) CALLBACK, invoked when Popup is closed \n' + 
'function callbackPrompt(objRet){ \n' +
'  // Example of objRet, if user insert 9 and click OK \n' +
'  //   objRet= {"retBtn": "CONFIRM", "promptValue": "9"} \n' +
'  // ---- Check How user has closed the Popup: \n' +
'  var retBtn   = objRet.retBtn  ; \n' +
'  if (retBtn   == POPUP_BTN.CONFIRM){  // Popup Closed clicking OK \n' + 
'  }else if (retBtn   == POPUP_BTN.CANCEL){  // Popup Closed clicking CANCEL \n' + 
'  }else if (retBtn   == POPUP_BTN.CLOSE){  // Popup Closed clicking X or ESC \n' +
'  ...';


var JS1_CHOICE= '// 1) Show Popup \n' +
'PopupChoice ( //Messages \n' +
'  "Please Choose a Vote for Popup API",  "Popup VOTE: ", \n' +
'  // arChoice: "Very Good" is pre-selected  \n' +
'  [{value:1, szText:"1 - Not Good", bSel:false},  \n' +
'     {value:2, szText:"2 - Good", bSel:false}, \n' +
'     {value:3, szText:"3 - Very Good", bSel:true}, \n' +
'     {value:4, szText:"4 - Excellent", bSel:false}, \n' +
'  ], \n' +
'  // callback, called when Popup is closed \n' +
'  {fnCallback: callbackChoice}); \n\n' +
'// 2) CALLBACK, invoked when Popup is closed \n' + 
'function callbackChoice(objRet){ \n' +
'  // Example of objRet, if user select 2=Good and click OK \n' +
'  // objRet={\n' +
'  //   "retBtn":"CONFIRM",\n' +
'  //   "choiceValue":"2",\n' +
'  //   "choiceText":"2 - Good",\n' +
'  //   "arChoice":[{"value":"1","szText":"1 - Not Good","bSel":false},\n' +
'  //               {"value":"2","szText":"2 - Good","bSel":true},\n' +
'  //               {"value":"3","szText":"3 - Very Good","bSel":false}\n' +
'  //               {"value":"4","szText":"4 - Excellent","bSel":false}]}\n' +  
'  // ---- Check How user has closed the Popup: \n' +
'  var retBtn   = objRet.retBtn  ; \n' +
'  if (retBtn   == POPUP_BTN.CONFIRM){  // Popup Closed clicking OK \n' + 
'  }else if (retBtn   == POPUP_BTN.CANCEL){  // Popup Closed clicking CANCEL \n' + 
'  }else if (retBtn   == POPUP_BTN.CLOSE){  // Popup Closed clicking X or ESC \n' +
'  ...';


var JS3_OPT =  
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


var JS4_VIDEO= '// 1) Show Popup with Video \n' +
'Popup(POPUP_TYPE.INFO, \n' +
'   // szMsg = iframe with Video URL \n' + 
'   //    Example: <iframe width="600" height="500" src="https://www.youtube.com/embed/SuYxv1z1BMg?version=3&vq=hd720&autoplay=1" frameborder="0" allowfullscreen></iframe> \n' + 
'   szMsg,\n' +
'   // objOpt \n' +
'   {bShowImg:false,iWidth:650,position:{at: "top"}, szTitle: "Video Example"}); \n';



var JS4_ABOUT= '// 1) Show Popup with About\n' +
'Popup(POPUP_TYPE.INFO, \n' +
'   szMsg, // szMsg = HTML with About (see about.js for details) \n' + 
'   // objOpt \n' +
'   {bShowImg:false,iWidth:1100,position:{at: "top"}, szTitle: "JSU ABOUT"}); \n';


/**
 * Show JS Code Hightlighted for Sample1
 * @param event
 * @returns
 */
function sample1JS(event){
  // Get the szAlertType set by User 
  var szAlertType =  selectGetSelVal(getElementById2('popupType1'));
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
  TipJSFixedClicked(szTip,event,{szTitle:"JS Source Code - POPUP_TYPE=" + szAlertType});
  
}


/**
 * Show JS Code Hightlighted for Sample3
 * @param event
 * @returns
 */
function sample3JS(event){
  TipJSFixedClicked(JS3_OPT,event,{iJSColNum:120,iMaxHeight:300,szTitle:"JS Source Code - Popup Option" });
}


/**
 * Show JS Code Hightlighted for Sample4
 * @param event
 * @returns
 */
function sample4JS(event){
  // Get the szAlertType set by User 
  var szType =  selectGetSelVal(getElementById2('type4'));
  var szTypeText =  selectGetSelText(getElementById2('type4'));
  var szTip="";
  
  if (szType == "VIDEO"){
    szTip = JS4_VIDEO;
  }else if (szType == "ABOUT"){
    szTip = JS4_ABOUT;
  }
  TipJSFixedClicked(szTip,event,{szTitle:"JS Source Code - Advanced Sample=" + szTypeText});
  
}



