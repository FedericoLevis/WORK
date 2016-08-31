/** @fileOverview
========================================================================================= <BR/> 
<b>File:</b> 			core/tooltip.js <BR/>
<b>Author:</b>     		<a href="https://www.linkedin.com/in/federicolevis" target="_blank">Federico Levis</a> <BR/>
<b>Tip Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/HTML/Tooltip.html" target="_blank">JSU Tip Documentation</a> <BR/>
<b>JSU API Doc:</b> <a href="https://rawgit.com/FedericoLevis/JSUDoc/master/JSUAPI.html" target="_blank">JSU API Documentation</a> <BR/>
<b>Description:</b>     JSU Tip API:   Tip* UnTip*   <BR/>   
<b>REQUIRED:</b>        JSU:  jsu.css locale-core.js jsuCmn.js <BR/>
<b>OPTIONAL:</b>        JSU:  prettify: prettify-jsu.js prettify-jsu.css if you want show JS Hightlighted <BR/> 
<b>OPTIONAL:</b>        JSU:  jslog.js dom-drag.js if you want to use jslog <BR/> 
<b>First Version:</b>     ver 1.0 - Feb 2014  <BR/>
<b>Current Version:</b>   ver 3.3 - Jul 2016  <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>DISCLAIMER</b>  <BR/>
Copyright by Federico Levis - <a href="https://github.com/FedericoLevis/JSU" target="_blank">JSU</a> <BR/> 
This file may be freely distributed under the MIT license.   <BR/>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>IMPLEMENTATION NOTES</b>  <BR/>
There is few additional Code (marked with JSU_FREE_ JSU_FULL_ )to implement <a class="tipLink" href="javascript:showJSUVersionParLimit();">FREE JSU Limitations</a>
<BR/>-----------------------------------------------------------------------------------<BR/>
<b>JSDoc NOTES</b>  <BR/>
In "JSU Obfuscated Version"  JS Code is not visible with JSDoc Source Link  <BR/> 
========================================================================================= <BR/> 
*/



/*=========================================================================================
 * 					GLOBAl CONST
 ========================================================================================= */

/**
 * Optional TipType 
 */
var TIP_TYPE={
		Floating: "Floating",  // Floating
		Fixed: "Fixed",  // Fixed
		NONE: "NONE"  // NO Tip diaplayed
};

/**
 * Optional TipFixPos
 */
var TIP_FIXED_POS={
		LEFT:"left",     // left of the Clicked Object
		CENTER: "center",  // center of the Clicked Object (default)
		RIGHT: "right" // right of the Clicked Object
};

var TIP_DEF_CLOSE_BTN = true; // default: Close Btn present for FIXED Tip
var TIP_DEF_WIDTH = 800; // default
var TIP_DEF_COL_NUM = 100; // default: 100 col for TextArea
var TIP_DEF_ROW_NUM = 20; // default: 25 rows for TextArea
var TIP_DEF_MAXH_MCODE = 400; //for MultiCode
var TIP_DEF_MCODE_TITLE = "Code";
var TIP_DEF_TEXTBOX_TITLE = "Source Code";

var TIP_MAX_TEXT_BOX_ROW_NUM = 20; // if more there will be scrollbar


/*=========================================================================================
 * 					CONFIG CONST
 ========================================================================================= */


/**
 * Default Config of Floating Tip
 */
var TIP_CFG_FLOATING={
		FollowMouse: true,  //false or true - tooltip follows the mouse
		DelayMs: 400,   // Time span in ms until tooltip shows up
		FadeMs: 100,
		CenterMouse: false,	// false or true - center the tip horizontally
		BorderStyle: 'dotted',	// Any permitted CSS value, but I recommend 'solid', 'dotted' or 'dashed'
		BorderWidth: 2,
		CloseBtn: false,	// false or true - closebutton in titlebar		
		JumpHorz: true,     // false or true - jump Horizontal if required
		JumpVert: true,     // false or true - jump vertically		if required
		Title: '',		// Default title text applied to all tips (no default title: empty string '')
    Fix: null,// Fixated position, two modes. Mode 1: x- an y-coordinates in brackets, e.g. [210, 480]. Mode 2: Show tooltip at a position related to an HTML element: [ID of HTML element, x-offset, y-offset from HTML element], e.g. ['SomeID', 10, 30]. Value null (default) for no fixated positioning.
		OffsetY: 20 // Offset relative to Mouse position
};

/**
 * Default Config of Fixed Tip
 */
var TIP_CFG_FIXED={
		FollowMouse: false,  //Must be false
		DelayMs: 0,   // Time span in ms until tooltip shows up
		FadeMs: 0,
		CenterMouse: true,	// false or true - center the tip horizontally
		BorderStyle: 'dashed',	// Any permitted CSS value, but I recommend 'solid', 'dotted' or 'dashed'
		BorderWidth: 3,
		CloseBtn: true,	// false or true - closebutton in titlebar		
		JumpHorz: false,     // false or true - jump Horizontal if required
		JumpVert: false,     // Always false: we want the tip always below 
		Title: '',		// Default title text applied to all tips (no default title: empty string '')
		Fix: null, // it will be set run-time: e.g ['tipSortFeature',0,20]	
		OffsetY: 0   //  it will be set run-time
};


//Global For TipFix (see TipFix() objPar)
var tt_tipFix = {
		objClass : {     // Classes to use for Up/Down
			Down : undefined,
			Up : undefined
		},
		tipImg : undefined  // the tipImg where the user has click to show tipFix (can also be undefined)
};




/*=========================================================================================
 * 					LOCAL CONST
 ========================================================================================= */


// ------------------------------ Fixed Up/Down classes. See core.css. To add new class, add similar code referring to another existing class
// TOGGLE IMAGES. If the immage is not in these class, NO TOGGLE is done
var tt_arToggleClass = [
     {  Down: "tipFix",		Up: "tipFixUp"},
     {	Down: "tipFixArrow",		Up: "tipFixArrowUp"},
     {	Down: "googleAnalList",		Up: "googleAnalListUp"},
     {	Down: "tipFixJS",	Up: "tipFixJSUp"},
     {	Down: "tipFixCode",	Up: "tipFixCodeUp"},
     {	Down: "jsuOpt",	Up: "jsuOptUp"}
     ];



var TIP_X_MIN = 10;

var APP_NAME_FIREFOX="Netscape";   // FIREFOX
var APP_NAME_IE="Microsoft Internet Explorer";   // IE
var APP_NAME_IE_11="Netscape";   // IE 11


var config = new Object();
var tip_img_fixed = null; // Current tip Img Fixed

var TIPLOG_FUN_START = " ------------- START";
var TIPLOG_FUN_END = " ------------- END";

//===================  GLOBAL TOOLTIP CONFIGURATION  =========================//
var tt_init_done=false;
var tip_type = TIP_TYPE.NONE; // Current Tip displayed


var tt_Enabled	= true;	// Allows to (temporarily) suppress tooltips, e.g. by providing the user with a button that sets this global variable to false
var TagsToTip	= true;	// false or true - if true, HTML elements to be converted to tooltips via TagToTip() are automatically hidden;
							// if false, you should hide those HTML elements yourself

// For each of the following config variables there exists a command, which is
// just the variablename in uppercase, to be passed to Tip() or TagToTip() to
// configure tooltips individually. Individual commands override global
// configuration. Order of commands is arbitrary.
// Example: onmouseover="Tip('Tooltip text', LEFT, true, BGCOLOR, '#FF9900', FADEIN, 400)"

config. Padding			= 10;			// NB: Spacing between border and content
config. Delay			= TIP_CFG_FLOATING.DelayMs;		// Time span in ms until tooltip shows up
config. Above			= false;	// false or true - tooltip above mousepointer
config. BgColor			= '#FFFFCC';	// NB: TIP BACK COLOR Background color (HTML colour value, in quotes)     Yellow
config. BgImg			= '';		// Path to background image, none if empty string ''
//JSU_FREE_START **-------------------
config. jsuTitle  = '';   // SIMULAZIONE
//JSU_FREE_END **---------------------*/
// Black Border
config. BorderColor		= '#000000';
config. BorderStyle		= TIP_CFG_FLOATING.BorderStyle; 
config. BorderWidth		= TIP_CFG_FLOATING.BorderWidth;        // NB: Border 1 or 2 for example
config. CenterMouse		= TIP_CFG_FLOATING.CenterMouse;	// false or true - center the tip horizontally below (or above) the mousepointer
config. ClickClose		= false;	// false or true - close tooltip if the user clicks somewhere
config. ClickSticky		= false;	// false or true - make tooltip sticky if user left-clicks on the hovered element while the tooltip is active
config. CloseBtn		= TIP_CFG_FLOATING.CloseBtn;	// false or true - closebutton in titlebar
config. CloseBtnColors	= ['	', '#FFFFFF','#FF5858' , '#FFFFFF'];	// [Background, text, hovered background, hovered text] - use empty strings '' to inherit title colours
// config. CloseBtnColors	= ['#E5E4E4', '#000000','#BFBEBE' , '#000000'];	// [Background, text, hovered background, hovered text] - use empty strings '' to inherit title colours
config. CloseBtnText	= '&nbsp;X&nbsp;';	// Close button text (may also be an image tag)
config. CopyContent		= true;	// When converting a HTML element to a tooltip, copy only the element's content, rather than converting the element by its own
config. Duration		= 0;		// Time span in ms after which the tooltip disappears; 0 for infinite duration, < 0 for delay in ms _after_ the onmouseout until the tooltip disappears
config. Exclusive		= false;	// false or true - no other tooltip can appear until the current one has actively been closed
config. FadeIn			= TIP_CFG_FLOATING.FadeMs;		// Fade-in duration in ms, e.g. 400; 0 for no animation
config. FadeOut			= TIP_CFG_FLOATING.FadeMs;
config. FadeInterval	= 30;		// Duration of each fade step in ms (recommended: 30) - shorter is smoother but causes more CPU-load
config. Fix				= TIP_CFG_FLOATING.Fix;	// Fixated position, two modes. Mode 1: x- an y-coordinates in brackets, e.g. [210, 480]. Mode 2: Show tooltip at a position related to an HTML element: [ID of HTML element, x-offset, y-offset from HTML element], e.g. ['SomeID', 10, 30]. Value null (default) for no fixated positioning.
config. FollowMouse		= TIP_CFG_FLOATING.FollowMouse;	// false or true - tooltip follows the mouse
// --------------------- Default Font (used also for Footer)
config. FontColor		= '#000000';
config. FontFace		= 'Verdana';
config. FontSize		= '8pt';		// E.g. '9pt' or '12px' - unit is mandatory
config. FontWeight		= 'normal';	// 'normal' or 'bold';
//
config. Height			= 0;			// Tooltip height; 0 for automatic adaption to tooltip content, < 0 (e.g. -100) for a maximum for automatic adaption
config. JumpHorz		= TIP_CFG_FLOATING.JumpHorz;	// false or true - jump horizontally to other side of mouse if tooltip would extend past clientarea boundary
config. JumpVert		= TIP_CFG_FLOATING.JumpVert;
config. Left			= false;	// false or true - tooltip on the left of the mouse
config. OffsetX			= 14;		// Horizontal offset of left-top corner from mousepointer
config. OffsetY			= TIP_CFG_FLOATING.OffsetY;		// Vertical offset
config. Opacity			= 100;		// Integer between 0 and 100 - opacity of tooltip in percent
config. Shadow			= true;	// false or true
config. ShadowColor		= '#C0C0C0';
config. ShadowWidth		= 10;
config. Sticky			= false;	// false or true - fixate tip, ie. don't follow the mouse and don't hide on mouseout
config. TextAlign		= 'left';	// 'left', 'right' or 'justify'
//-------------------------------------------------- TITLE
config. Title			= TIP_CFG_FLOATING.Title;		// Default title text applied to all tips (no default title: empty string '')
config. TitleAlign		= 'center';	// 'left' 'center' or 'right' - text alignment inside the title bar
config. TitleBgColor	= '#000000'; // backgroundColor of the Title section . If empty string '', BorderColor will be used
config. TitleFontColor	= '#ffffff';	// Color of title text - if '', BgColor (of tooltip body) will be used
config. TitleFontFace	= 'bold';		// If '' use FontFace (boldified)
config. TitleFontSize	= '12pt';		// If '' use FontSize
config. TitlePadding	= 1;
config. Footer			= '';		// Default Footer text applied to all tips (no default title: empty string '')


config. Width			= 0;			// Tooltip width; 0 for automatic adaption to tooltip content; < -1 (e.g. -240) for a maximum width for that automatic adaption;
									// -1: tooltip width confined to the width required for the titlebar
//=======  END OF TOOLTIP CONFIG, DO NOT CHANGE ANYTHING BELOW  ==============//
var tt_aElt = new Array(10), // Container DIV, outer title & body DIVs, inner title & body TDs, closebutton SPAN, shadow DIVs, and IFRAME to cover windowed elements in IE
tt_aV = new Array(),	// Caches and enumerates config data for currently active tooltip
tt_sContent,			// Inner tooltip text or HTML
tt_t2t, tt_t2tDad,		// Tag converted to tip, and its DOM parent element
tt_musX, tt_musY,
tt_over,
tt_x, tt_y, tt_w, tt_h; // Position, width and height of currently displayed tooltip


// Only for LICENSE Check
var tt_a2="pe", tt_a1="ty", tt_a3="of";


// dynamic id. Used to protect CODE  JSU FULL.
//  {idVal,acron, rangeMin, rangeMax}
var tt_id = {
//JSU_FREE_START **-------------------
		jsu: [0,'tt',10000,20000],     //  
//JSU_FREE_END **---------------------*/
		js: [0,'tt',1,100],     // 
		jt: [0,'tt',1000,2000],     // e.g tt57
		jd: [0,'tt',3000,4000]      
};


//=====================  PUBLIC  =============================================//



/**
 * GLOBAL USE: Display a FloatingTip. Called by User only with tipType = TIP_TYPE.Floating to disaplay a Floating Tip<BR/>
 * Call Untip() to Hide the tooltip <BR/>
 * NOTE: it is also used internally with other tipType 
 *  
 * @param tipMsgHtml {String}   
 * @param [tipType] {String}   [TIP_TYPE.Floating] when called by User
 * @param [objOpt] Option: <BR/>
 *                         - bNL2BR [true]  if true convert NewLine to <BR/>
 * 
 * 		GLOBAL
 * Set tip_type = tipType
 */
function Tip(tipMsgHtml,tipType,objOpt)
{
	var fn = "[tooltip.js Tip()] ";
	jsu_log ( fn + TIPLOG_FUN_START);
	
	tt_init(); // init, if not already done
	if (tip_type == TIP_TYPE.Fixed){
		return jsu_log ( fn + "Nothing to do: a TipFix is currently diaplyed" + TIPLOG_FUN_END);
	}	
	
	if (objOpt == undefined){
		var objOpt = {bNL2BR: true};
	}
	if (objOpt.bNL2BR == undefined || objOpt.bNL2BR){
		tipMsgHtml = tt_NL2BR (tipMsgHtml);  // Replace /n with <BR/>,...
	}
	var bShow = true;
	if (tipType == undefined){
		tipType = TIP_TYPE.Floating; 
	}
	tip_type = tipType;
	jsu_log (fn + "SET tip_type=" + tip_type);
	//---------- set config Option
	var objCfg = (tip_type == TIP_TYPE.Fixed) ? TIP_CFG_FIXED : TIP_CFG_FLOATING;
	tt_SetCfg (objCfg);
	//---------------------
	tt_showTip(tipMsgHtml);
	tip_type = tipType; // workaround. we have to set again this global var because tt_Hide has resetted it
	jsu_log ( fn + TIPLOG_FUN_END);
}

/**
 * @param tipMsgHtml {String}   
 * @param [event]  {Object}   Usually pass the event of the onclick. if null you have to pass pass objOpt.szRefElId
 * @param [objOpt] {Object}   
     <table class="jsDoc" border="2" cellpadding="2" cellspacing="2">
        <tr><td class="jsDocTitle">OPTION</td></tr>
        <tr><td class="jsDocParam">
        <ul>
           <li> szTitle{String}  default: ''   </li> 
           <li> bCloseBtn {Boolean}  default: true(if true show a Close Button on the Bottom)  </li> 
					 <li> iTipMaxHeight {Number}:  [0] Max Height of the Tip (Scroll will be used if required). If 0 the height is automatically calculated to show all the Tip. . Default =0 NO SCROLL  </li>  
				 	 <li> iTipWidth {Number}: [undefined] TipWidth  - do not pass it to automatically set it basing on content. </li> 
					 <li> tipFixedPos:  TipPosition using  TIP_FIXED_POS possible values (TIP_FIXED_POS.CENTER,...) n (e.g -100)   default=TIP_FIXED_POS.CENTER  </li> 
					 <li> bNL2BR= [true]  if true /n are converted to </li>
					 ------ <b>FOLLOW FIELDS are for ADVANCED use. Usually they are ever used </b>  
           <li> objClass:  {Object}  {Down: {String}, Up: {String}}  2 Classes that identify The 2 states <BR/>
               To be used when you have 2 classes not that are not already defined into the TIP_TOGGLE_CLASS_xxx constants of this file <BR/>
               e.g.  objClass: {Down: 'downloadFree', Up: 'downloadFreeUp'} </li>
           <li>szRefElId: Id of the Reference ElementImage. It can be used instead of event, to display the Tip below this szRefEl </li>
        </ul> 
        </td></tr>
     </table>  
 
  <div class="jsDocNote">
  <b>Implementation NOTES:</b>
  <ul>
    <li>GLOBAL VAR:   tt_tipFix </li>
    <li>All the other tiFixXXX call this funcion</li>
  </ul>
  </div> 
   
 */
function TipFix(tipMsgHtml,event, objOpt)
{
	var fn = "[tooltip.js TipFix] ";
	jsu_log ( fn + TIPLOG_FUN_START);
	jsu_logObj (fn + "IN objOpt", objOpt);
	tt_init(); // init, if not already done
	if (objOpt == undefined){
		var objOpt = {bNL2BR: true};
	}
	if (objOpt.bNL2BR == undefined || objOpt.bNL2BR){
		tipMsgHtml = tt_NL2BR (tipMsgHtml);  // Replace /n with <BR/>,...
	}
	if (objOpt.bCloseBtn == undefined){	
		objOpt.bCloseBtn = TIP_DEF_CLOSE_BTN; 
	}
	// set this global var, to be used when they are not undefined
	tt_tipFix.objClass = objOpt.objClass;
	
	var szTitle = "";
	
//JSU_FREE_START **-------------------
    // Finta
	tt_getId (tt_id.jsu);
	tt_aV[JSUTITLE] += ' <span><a id="' + tt_id.jsu[0] +'" href="https://goo.gl/1eIYNm">JSU Demo Version</a></span>';
//JSU_FREE_END **---------------------*/
  // -- Option
  if (objOpt){
  	if (objOpt.szTitle){
  		szTitle = objOpt.szTitle;
  	}
  	var szMaxHeight = "", szMaxWidth = "";
  	var bDivScroll = false;
  	if (objOpt.iTipMaxHeight){
  		  szMaxHeight = 'max-height: ' +objOpt.iTipMaxHeight + 'px;';
  		  bDivScroll = true;
  	} 
  	if (objOpt.iTipWidth == undefined ){
  		// in this case we set only max-width but we do not set width: so it is automatically set basing on content
   	  szMaxWidth = 'max-width: ' +TIP_DEF_WIDTH+ 'px;';
  	}else {
  		// only if explicitly required, we se also  width 
   	  szMaxWidth = 'max-width: ' +objOpt.iTipWidth+ 'px; width:' +objOpt.iTipWidth + 'px;';
  	}	

 		bDivScroll = true;
  	var szDivHTML = "";
  	/*
  	if (!bDivScroll){
  		szMaxWidth = 'max-width: ' + tt_w + 'px;';
  	}	
  	*/
		jsu_log ( fn + "SET style='" + szMaxHeight + szMaxWidth + "'");
  	
 		// Add Div for scroll
 		// e.g "<div style='max-height: 200px;overflow: auto;'>"
 		tipMsgHtml = '<div id="divTipContainer" align="center" style="' + szMaxHeight + szMaxWidth +  ' border: 1px solid;background-color: white; overflow: auto; ">' +
 		    tipMsgHtml + '</div>';
  	
  	
	  // -- Optional Close Button
	  if (objOpt.bCloseBtn != undefined && objOpt.bCloseBtn){
	  	// szTip += '<table class="tipNoBorder" width="100%"><tr><td><input type="button" value="Close" onclick="UnTip(event)" /> </td></tr></table>';
	  	tipMsgHtml += '<BR/><div id="divTipMain" align="center" width="100%"><input type="button" class="tipBtnClose" value="' + TIP_BTN_CLOSE + '" title="' + TIP_BTN_CLOSE_TITLE +  '" onclick="tt_UnTipFix()" /> </div>';
	  }
  }	
  TIP_CFG_FIXED.Title = szTitle;
	var bShow = true; // see if the TipFix is already disalyed. In this case we Close it because the user has click again t close it
	var tipFixedPos = TIP_FIXED_POS.CENTER; // default
	if (objOpt != undefined && objOpt.tipFixedPos != undefined){
		tipFixedPos = objOpt.tipFixedPos;
	}
	jsu_log ( fn + "IN: tipFixedPos=" + tipFixedPos);
	var tipImg = null;
	if (objOpt.szRefElId != undefined && objOpt.szRefElId != ""){
		tipImg = document.getElementById (objOpt.szRefElId);
	}else {
		var event = event || window.event;
		tipImg = event.target || event.srcElement;
	}
	// var deltaY = 35; // Default
	if (tipImg != undefined){
		var className = tipImg.className;
		var szId = tipImg.id; 
		if (szId == undefined || szId.length == 0){
			return tt_Err(fn + "SW ERROR tipImg has id=null \n tipImg used with TipFix must have an id");
		}
		var bToggled = false; //default
		//---------------------- TOGGLE IMAGE 
		jsu_log ( fn + "OLD classname=" + className);
		for (i=0; i< tt_arToggleClass.length; i++){
			var objToggle = tt_arToggleClass[i];
			if (className == objToggle.Down){
				className = objToggle.Up;
				bToggled = true;
				jsu_log ( fn + "TOGGLE From " + objToggle.Down + " TO " + objToggle.Up);
			}else	if (className == objToggle.Up){
				className = objToggle.Down;
				jsu_log ( fn + "TOGGLE From " + objToggle.Up + " TO " + objToggle.Down);
				bShow = false;
				bToggled = true;
			}
		}
		if (tt_tipFix.objClass != undefined && tt_tipFix.objClass.Down != undefined && tt_tipFix.objClass.Up != undefined){
				jsu_logObj ( fn + "CASE of CUSTOM objClass" + tt_tipFix.objClass);
				// Custom Class passed by User
				if (className == tt_tipFix.objClass.Up){
				  className = tt_tipFix.objClass.Down;
					bToggled = true;
				  bShow = false;
			  }else	if (className == tt_tipFix.objClass.Down ){
				  className = tt_tipFix.objClass.Up;
					bToggled = true;
			  }
		}		
		if (bToggled){
			jsu_log ( fn + "TOGGLE TO NEW classname=" + className);
		}	else{
			jsu_logObj ( fn + "WARNING: Current className=" + className + " NOT implemented as TOGGLE IMage: SO NO IMAGE TOGGLE is DONE" );
		}
		tipImg.className = className;
	}
	jsu_log ( fn + "bShow=" + bShow);
	if (bShow && tip_img_fixed){
		jsu_log ( fn + "Particular case: Click to opne a new TipFix while another is still open. So we close the TipFix that was stil open");
		// To manage the case of switch beween different Fixed img. We untip previous
		tt_UnTipFix();  // false becuase we do not want to resize: there is alread a new FixedTip Open
	}
	
	if (bShow && tipImg){
		tip_img_fixed = tipImg; // save in global
		TIP_CFG_FIXED.Fix = [tipImg.id,tipFixedPos,5];
		jsu_logObj ( fn + "SET TIP_CFG_FIXED.Fix=", TIP_CFG_FIXED.Fix);
		Tip(tipMsgHtml,TIP_TYPE.Fixed, objOpt);
		
		var el = document.getElementById ("WzTiTl");
		var szWidth = el.style.width; 
		jsu_log (fn + "reduce width of the header that was " + szWidth);
		iWidth = parseInt (szWidth.replace ("px","")) - 6;
		el.style.width = iWidth + "px";
//JSU_FREE_START **-------------------
		// verifico che ci sia l'URL aggiunto in id tt_id.jt contenga href come https://goo.gl/1eIYNm
		// controllo che non sia stato hakerato il codice
		try {
			if (jsu_getElementById2(tt_id.jt[0]).href.indexOf('o' + 'o' + '.') < 0){
				// e` stato hakerato - esco
				tt_UnTipFix();
				jsu_logObj ("tt_id", tt_id);
			}
		}catch(e) {
			tt_UnTipFix();
			jsu_logObj ("tt_id " + e.message, tt_id);
		}	
//JSU_FREE_END **---------------------*/
        
	}else {
		// User has click over the image arrow Up to close the TipFix
		tt_UnTipFix();
	}
	jsu_log ( fn + TIPLOG_FUN_END);
}


/**
 * Call this function to Hide the Tip after Tip() Call <BR/>
 * If currently a TipFix is displayed, it is not closed (to manage both TipFix at Click and Tip/Untip
 *  
 * GLOBAL 
 * tip_type Set it to TIP_TYPE.NONE 
 */
function UnTip()
{
	var fn = "[tooltip.js UnTip()] ";
	jsu_log ( fn + TIPLOG_FUN_START);
  jsu_log(fn + "CURRENT tip_type=" + tip_type);
  if (tip_type == TIP_TYPE.Fixed){
  	return jsu_log ( fn + "Nothing to do: a TipFix is still displayed" +  TIPLOG_FUN_END);
  }
	tt_init(); // init, if not already done
	tt_SetCfg(TIP_CFG_FLOATING);
	tt_OpReHref();
	if(tt_aV[DURATION] < 0 && (tt_iState & 0x2))
		tt_tDurt.Timer("tt_HideInit()", -tt_aV[DURATION], true);
	else if(!(tt_aV[STICKY] && (tt_iState & 0x2)))
		tt_HideInit();
	tt_RestoreImgFixed();  // Restore previous Image Fixed if required
	tip_type = TIP_TYPE.NONE;
	jsu_log ( fn + TIPLOG_FUN_END);
}




/**
 * Display a Fixed Tip with Code Hightlighted with JSU core/prettify/prettify-jsu.js <BR/>
 * Example of supported language: <b>js, java,  perl, pl, pm, bsh, csh, sh, c, cpp, rb, py, cv, cs ,json, ..</b> <BR/>
 * See prettify-jsu.js for the detail of supported languages <BR/>
 *   
 *   NOTE:  <ul>
 *   <li> a) if core/prettify/prettify-jsu.js is Enabled (Loaded and FULL Version), the code is higlighted  </li> 
 *   <li> b) if core/prettify/prettify-jsu.js is NOT Enabled, the code is displayed as Plain Text in TextArea </li> 
 * </ul>
 * @param szCode  {String}  jsCode to display, with \n for newline. <BR/>
 *                          <label class="tipWarn">szCode with HTML is not supported by this function. To show HTML Code you can use TipFixMultiCode or TipFixTextArea</label>
 * @param event
 * @param [objOpt] {Object} Option: <ul>    
 *                           <li> szTitle{String}  default:  TIP_DEF_CODE_TITLE   </li> 
 * 													 <li> iTipWidth {Number}: [undefined] TipWidth  - do not pass it to automatically set it basing on content. </li> 
 * 													 <li> iTipMaxHeight {Number}:  [0] Max Height of the Tip (Scroll will be used if required). If 0 the height is automatically calculated to show all the Tip. . Default =0 NO SCROLL </li>  
 *                           <li> bCloseBtn {Boolean}  default: true (if true show a Close Button on the Bottom)  </li> 
 * 													 <li> tipFixedPos:  TipPosition using  TIP_FIXED_POS possible values (TIP_FIXED_POS.CENTER,...)  n   default=TIP_FIXED_POS.CENTER   </li> 
 * 													</ul>	     
 */
function TipFixCode(szCode, event, objOpt){
	var fn = "[tooltip.js TipFixCode] ";
	jsu_log (fn + TIPLOG_FUN_START);
	if (objOpt == undefined){
		objOpt = new Object();
	}
	if (objOpt.szTitle == undefined){	objOpt.szTitle = TIP_DEF_CODE_TITLE; }
	if (objOpt.bCloseBtn == undefined){	objOpt.bCloseBtn = TIP_DEF_CLOSE_BTN; }
	// if (objOpt.iTipWidth == undefined){	objOpt.iTipWidth = TIP_DEF_WIDTH; }
	tt_init(); // init, if not already done
	// Check if prettify is enabled 
	if (tt_isPrettifyEn()){
		var szCodeDiv = '<div id="divTipJS" align="left" class="prettify" style="width:"' + objOpt.iTipWidth + '"px;"> <pre class="prettyprint"><code>' + szCode + '</code></pre></div>';
		TipFix (szCodeDiv,event,objOpt);
		jsuPrettyPrint();  // Hightlight with prettify-jsu the code between <pre> </pre> 
	}else{
		TipFixTextArea(szCode, event, objOpt);
	}
	jsu_log (fn + TIPLOG_FUN_END);
}


/**
 * Display a Fixed Tip with Code Hightlighted with JSU core/prettify/prettify-jsu.js <BR/>
 * Example of supported language: <b>js, java,  perl, pl, pm, bsh, csh, sh, c, cpp, rb, py, cv, cs ,json, ..</b> <BR/>
 * See prettify-jsu.js for the detail of supported languages <BR/>
 *   
 *   NOTE:  <ul>
 *   <li> a) if core/prettify/prettify-jsu.js is Enabled (Loaded and FULL Version), the code is higlighted  </li> 
 *   <li> b) if core/prettify/prettify-jsu.js is NOT Enabled, the code is displayed as Plain Text in TextArea </li> 
 * </ul>
 * @param arObjCode  {Array}  Array of Obj with the info of the code display. ESech Obj of the Array can have follwoing fields: <ul>
 * 														 <li> szTitle {String} e.g "JS" - Title of the Section</li>
 * 														 <li> szCode {String} The Code to diaply in section</li>
 * 														 <li> bPrettify  {Boolean} [true]  true if szCode must be prettified. If szCode contains HTML Tags you have to set bPrettify=false if you wnat to see the Text with HTMLTags into a TextArea, witout prettify it</li>
 * 														 <li> iRowNum {Number} [undefined] Only for Obj.bPrettify=false. If it is not present (default), the Rows of TextArea are automatically calculated basing on /n. If passed  iRowNum is used</li>
 * 													   <li> iMaxHeight {Number}:  Only for Obj.bPrettify=true Max Height (px) of the Div - If Undefined there is no max <li/> 
 * 			                      </ul> 
 *                            See example below <BR/>
 * @param event
 * @param [objOpt] {Object} Option: <ul>   
 *                           <li> szTitle{String}  default: 'Source Code'  <li/>
 * 													 <li> iTipWidth {Number}: [undefined] TipWidth  - do not pass it to automatically set it basing on content. </li> 
 * 													 <li> iTipMaxHeight {Number}:  Max Height (px) of the Tip . Default =0 NO SCROLL <li/> 
 *                           <li> iColNum  {Number}  default: 80 Can be used to change the colnum of all the TextArea of the Tip  <li/>
 *                           <li> bCloseBtn {Boolean}  default: true (if true show a Close Button on the Bottom)  <li/>
 * 													 <li> tipFixedPos:  TipPosition using  TIP_FIXED_POS possible values (TIP_FIXED_POS.CENTER,...)     default=TIP_FIXED_POS.CENTER   <li/>
 * 													</ul>	  
 * 
 *    @example
 *    
 *    DAFARE
 */
function TipFixMultiCode(arObjCode, event, objOpt){
	var fn = "[tooltip.js TipFixMultiCode] ";
	jsu_log (fn + TIPLOG_FUN_START);
	jsu_logObj (fn + "IN arObjCode",arObjCode);
	jsu_logObj (fn + "IN objOpt",objOpt);
	if (objOpt == undefined){
		objOpt = new Object();
	}
	if (objOpt.szTitle == undefined){	objOpt.szTitle = TIP_DEF_CODE_TITLE; }
	if (objOpt.bCloseBtn == undefined){	objOpt.bCloseBtn = TIP_DEF_CLOSE_BTN; }
	// if (objOpt.iTipWidth == undefined){	objOpt.iTipWidth = TIP_DEF_WIDTH; }
	if (objOpt.iColNum == undefined){ objOpt.iColNum = TIP_DEF_COL_NUM; }
	var iTxtAreaWidth = objOpt.iTipWidth - 40; // some space for padding and borders 
	tt_init(); // init, if not already done
	var bPrettifyEn = tt_isPrettifyEn();
	var szCodeDiv = '<table class="detNoBorder" >\n';
	for (var i=0; i < arObjCode.length;i++){
		var objCode = arObjCode[i];
		var szWidth = "";
		if (objCode.bPrettify== undefined){
			objCode.bPrettify= false; 
		}
		if (!bPrettifyEn){
			objCode.bPrettify= false; 
		}
		var szClassPrettify = (objCode.bPrettify) ? "prettifyCode" : ""; // extra Class
		var szClassTitlePrettify = (objCode.bPrettify) ? " prettifyTitle " : ""; // extra Class
		var szTbl = '<tr><td><table class="det ' + szClassPrettify + '" ' + szWidth + '" BORDER="2" cellspacing="0" cellpadding="2" >\n';
		if (objCode.iTipMaxHeight== undefined){
			objCode.iTipMaxHeight= TIP_DEF_MAXH_MCODE; 
		}
		if (objCode.szTitle == undefined){ objCode.szTitle = TIP_DEF_MCODE_TITLE; }
		jsu_log (fn + 'arObjCode[' + i + '] bPrettify=' + objCode.bPrettify);
		
		szTbl+= '  <tr class="detTitle ' + szClassTitlePrettify + szClassPrettify + '"><td width="100%" class="detTitle ' + szClassTitlePrettify + szClassPrettify + '">' + objCode.szTitle + '</td></tr>\n';
		szTbl+= '  <tr class="det ' + szClassPrettify + '" ><td class="tipl ' + szClassPrettify + '" width="100%">\n';  	
		var id = "tipCode_" + i;
		if (!objCode.bPrettify){
			if (objCode.iRowNum == undefined){
				// if not passed we calculate RowNum basing on /n
				objCode.iRowNum = tt_getHtmlRowNum(objCode.szCode);
			}   
			// HTML must be put into a TextArea
			szTbl+='     <textarea id="' + id + '"  rows="' + objCode.iRowNum + '" cols="' + objOpt.iColNum  + '" >' + objCode.szCode + '</textarea>\n';
		}else{	
			// This Code must be prettified
			var iWidth = (objOpt.iTipWidth == undefined) ? TIP_DEF_WIDTH : objOpt.iTipWidth;
			var bContainer = false;
			// check if is required MaxHeight
			var szMaxHeight = "";
			var iMaxHeight = objOpt.iTipMaxHeight; // can be undefined
			if (objCode.iMaxHeight != undefined){
				iMaxHeight = objCode.iMaxHeight; 
			} 
			if (iMaxHeight != undefined && iMaxHeight > 0){
				bContainer = true;
			}	
			//-----------------------
			if (bContainer){
				var szMaxHeightCont = 'max-height:' +  iMaxHeight + 'px;';
				var szWidthCont = 'width:' + iWidth -100 + 'px;';
				var szWidth = 'width:' + (iWidth -130) + 'px;';
				// ------
				jsu_log (fn + "For code[" + i + "] we have to put an extra div container - szMaxHeightCont=" + szMaxHeightCont);
				var szDivPretty = '<div style="' + szMaxHeightCont + szWidthCont + ' border: 1px solid; overflow: auto; background-color: white; ">' + 
							'    <div id="' + id + '" class="prettify" style="' + szWidth + 
			        '"> <pre class="prettyprint"><code>' + objCode.szCode + '</code></pre></div>' +
				     '</div>';
				jsu_logHtml (fn + "szDivPretty", szDivPretty);     
			}else {
				var szWidth = 'width:' + iWidth + 'px;';
				var szDivPretty = '    <div id="' + id + '" class="prettify" style="' + szWidth + 
             '"> <pre class="prettyprint"><code>' + objCode.szCode + '</code></pre></div>\n';
				
			}
			szTbl += szDivPretty;
		}
		szTbl+= '   </td></tr></table>\n';
		szCodeDiv += szTbl;
		szCodeDiv += '</td></tr>'
			if (i < (arObjCode.length-1)){
				// Empty row
				szCodeDiv += '<tr class="detSep"><td></td></tr>';
			}
	}
	szCodeDiv += '</table>';
	// jsu_logHtml(fn + "szCodeDiv", szCodeDiv);
	objOpt.bNL2BR = false;  // we do not want to replace \n with <BR/>. Everythong is already well formatted
	TipFix (szCodeDiv,event,objOpt);
	if (bPrettifyEn){
		jsuPrettyPrint();  // Hightlight with prettify-jsu the code between <pre> </pre>
	}
	
	
	// NOTE: we have to change the width of TextArea basing on TipWidth. If set during TextArea creation it is not considered
	var iTipWidth = (objOpt.iTipWidth != undefined) ? objOpt.iTipWidth : TIP_DEF_WIDTH; 
	var iWidth = iTipWidth - 40; // keep some space for Padding,..
  jsu_log (fn + "TipWidth=" + iTipWidth + " - We set " + arObjCode.length + " CodeEl with width=" + iWidth + " to adapt them to the Div Container");
	for (var i=0; i < arObjCode.length; i++){
	 	var el = document.getElementById("tipCode_" + i);
	 	el.style.width = iWidth + 'px'; 
	}	
	jsu_log (fn + TIPLOG_FUN_END);
}



/**
 * Display whatever Text (also HTML TAGs) in a TextArea of a FixedTip. For Example this function is used to display mixed JS and HTML code  
 * @param szTxt  {String}  szTxt to display, with \n for newline
 * @param event
 * @param [objOpt] {Object} Option: <ul>    
 *                           <li> szTitle{String}  default: 'Text'  </li> 
 *                           <li> iColNum{Number}  default=100 Number of Column for TextArea </li> 
 *                           <li> iRowNum{Number}  default=20 Number of Rows for TextArea (if more rows are present, scrollbar will be created).  
 *                                Usually do not pass iRowNum, so it is automatically calculatd</li>
 *                           <li> bCloseBtn {Boolean}  default: true (if true show a Close Button on the Bottom)  </li> 
 * 													 <li> iTipWidth {Number}: [undefined] TipWidth  - do not pass it to automatically set it basing on content. </li> 
 *													 <li> iTipMaxHeight {Number}:  [0] Max Height of the Tip (Scroll will be used if required). If 0 the height is automatically calculated to show all the Tip. . Default =0 NO SCROLL  </li>  
 * 													 <li> tipFixedPos:  TipPosition using  TIP_FIXED_POS possible values (TIP_FIXED_POS.CENTER,...)  n   default=TIP_FIXED_POS.CENTER   </li>
 *                          </ul>  
 * 	@example
 
		//This is an example of MIXED Code: JS and also HTML.  
		//	HTML TAGs cannot be displayed with TipJSFixedClick(), but you should use TipTextAreaFixedClick()   
		
		//--------------------------------------------------------- JS   
		var JS_CODE_SORT_SAMPLE=...;  
		//<input> object with:  
		//  - class="tipFixed" type="button"   
		//  - value=Text to display in the button 	
		//  - set whatever unique id   
		//  - onclick="TipJSFixedClicked(msg,event,objOpt)" 	
		//  - objOpt = {iTipMaxHeight:300} for Optional MaxHeight (Vertical Scrollbar) 
		
		//--------------------------------------------------------- HTML   
		 <input type="button" class="tipFixed" style="color:blue;" value="JS Source Code" id="tipBtnJSFixedSample"  
		    onclick="TipJSFixedClicked(JS_CODE_SORT_SAMPLE,event,{iTipMaxHeight:300});" /> ; 
														     
 */
function TipFixTextArea(szTxt, event, objOpt){
	var fn = "[tooltip.js TipFixTextArea] ";
	jsu_log (fn + TIPLOG_FUN_START);
	jsu_logObj (fn + "IN objOpt", objOpt);
	if (objOpt == undefined){
		objOpt = new Object();
	}
	if (objOpt.szTitle == undefined){	objOpt.szTitle = TIP_DEF_TEXTBOX_TITLE; }
	if (objOpt.bCloseBtn == undefined){	objOpt.bCloseBtn = TIP_DEF_CLOSE_BTN; }
	if (objOpt.iColNum == undefined){	objOpt.iColNum = TIP_DEF_COL_NUM; }
	if (objOpt.iRowNum == undefined){	objOpt.iRowNum = tt_getHtmlRowNum(szTxt) }
	tt_init(); // init, if not already done
	var szTxtBox='<textarea id="tipTextArea" rows="' + objOpt.iRowNum + '" cols="' + objOpt.iColNum  + '" >' + szTxt + '</textarea><BR/>';
  objOpt.bNL2BR = false;  // we do not want to replace \n with <BR/>
	TipFix (szTxtBox,event,objOpt);
	// NOTE: we have to change the width of TextArea basing on TipWidth. If set during TextArea creation it is not considered
	var iTipWidth = (objOpt.iTipWidth != undefined) ? objOpt.iTipWidth : TIP_DEF_WIDTH; 
	var iTextAreaWidth = iTipWidth - 40; // keep some space for Padding,..
	jsu_log (fn + "TipWidth=" + iTipWidth + " - We set TextArea with width=" + iTextAreaWidth + " to adapt it to the Div Container");
  var el = document.getElementById("tipTextArea");
  el.style.width = iTextAreaWidth + 'px'; 
	
	jsu_log (fn + TIPLOG_FUN_END);
}




/* ==========================================================================================
																	LOCAL FUNCTION	 
========================================================================================== */
/*
 * Internal Use:   call this function to UnTip after TipFixxx(). E.g in Close Button, ESC,... <BR/>
 */
function tt_UnTipFix(){
	var fn = "[tooltip.js tt_UnTipFix()] ";
	
	jsu_log ( fn + TIPLOG_FUN_START);
  jsu_log(fn + "CURRENT tip_type=" + tip_type);
	tt_init(); // init, if not already done
	
	
	tt_SetCfg(TIP_CFG_FLOATING);
	tt_OpReHref();
	if(tt_aV[DURATION] < 0 && (tt_iState & 0x2))
		tt_tDurt.Timer("tt_HideInit()", -tt_aV[DURATION], true);
	else if(!(tt_aV[STICKY] && (tt_iState & 0x2)))
		tt_HideInit();
	tt_RestoreImgFixed();  // Restore previous Image Fixed if required
	tip_type = TIP_TYPE.NONE;
	jsu_log ( fn + TIPLOG_FUN_END);

}


/*
 * Check if szClass is a TipFix Class
 * @param szClass
 */
function tt_isClassFixed(szClass){
  var bTipFix = false;	
	var fn="[tooltip.js tt_isClassFixed()] ";
	for (i=0; i< tt_arToggleClass.length; i++){
		if (tt_arToggleClass[i].Up == szClass){
			bTipFix = true;
		}
	}
	if (tt_tipFix.objClass != undefined && tt_tipFix.objClass.Down != undefined && tt_tipFix.objClass.Up != undefined){
		// Custom Class passed by User
		if (szClass == tt_tipFix.objClass.Up){
			bTipFix = true;
		}  
	}	
	jsu_log (fn + "IN: szClass=" + szClass + "  OUT bTipFix=" + bTipFix);
  return bTipFix;	
	
}

/*
 *  Restore the Original Image class (From Up to down) if tip_img_fixed != null 
 */
function tt_RestoreImgFixed() {
	var fn="[tooltip.js tt_RestoreImgFixed()] ";
	if (tip_img_fixed != null){
		var szClass = "";
		// Change img of tip_fixed if present
		for (i=0; i< tt_arToggleClass.length; i++){
			if (tt_arToggleClass[i].Up == tip_img_fixed.className){
				szClass = tt_arToggleClass[i].Down ;
			}
		}
		if (tt_tipFix.objClass != undefined && tt_tipFix.objClass.Down != undefined && tt_tipFix.objClass.Up != undefined){
			// Custom Class passed by User
			if (tip_img_fixed.className == tt_tipFix.objClass.Up){
				szClass = tt_tipFix.objClass.Down;
			}
		}		
		if (szClass != ""){
			jsu_log (fn + "tip_img_fixed.id=" + tip_img_fixed.id + " - Change className=" + tip_img_fixed.className + " To "  + szClass);
			tip_img_fixed.className = szClass;
		}
		tip_img_fixed = null;
	}
	
}



/*-----------------------------------------------------------
Get Element By ID and Show Error if required
      PAR
Id        in
[bShowErr]  in   true (default) if I want to show Error
                false if don't want to show Error
      RETURN
el  if founded
0   if not founded
-----------------------------------------------------------*/
function tt_getElementById2(Id,bShowErr)
{
	if (bShowErr == undefined){
		// bShowErr = true;
		bShowErr = false;  // use false beacause some fileds are not present
	}
    var el = 	document.getElementById(Id);
    if (el == null) {
        if (bShowErr){
          alert("SW ERROR [tt_getElementById2] NOT FOUND Id=" +  Id) ;
        }
        return 0;  // Not Found
    }
    return el;
}






function tt_showTip()
{
	var fn = "[tooltip.js tt_showTip()] ";
	jsu_log ( fn + TIPLOG_FUN_START);
	tt_Tip(arguments, null);
	jsu_log ( fn + TIPLOG_FUN_END);
}

function TagToTip()
{
	var t2t = tt_GetElt(arguments[0]);
	if(t2t)
		tt_Tip(arguments, t2t);
}







/*
 * Set some Cfg config specifyc for Floating or Fixed
 * @param objCfg
 */
function tt_SetCfg(objCfg){
	config.FollowMouse = objCfg.FollowMouse;
	config.Delay = objCfg.DelayMs;
	config.FadeIn = objCfg.FadeMs;
	config.FadeOut = objCfg.FadeMs;
	config.CenterMouse =objCfg.CenterMouse;
	config.BorderStyle = objCfg.BorderStyle;
	config.BorderWidth = objCfg.BorderWidth;
	config.CloseBtn = objCfg.CloseBtn;
	config.JumpVert = objCfg.JumpVert;
	config.Title = objCfg.Title;
	config.Fix = objCfg.Fix;
	config.OffsetY = objCfg.OffsetY;
}

function tt_Extension()
{
	tt_ExtCmdEnum();
	tt_aExt[tt_aExt.length] = this;
	return this;
}


/*
 * Set TipPos
 * 
 * Modify: Apr 2016  if x is too left or to right to seet porperly the tip,  we adljust it
 * 
 * @param x  
 * @param y
 */
function tt_SetTipPos(x, y)
{
	var fn = "[tooltip.js tt_SetTipPos] ";
	var css = tt_aElt[0].style;
	//if x is too left or to right to set porperly the tip,  we adljust it
	if (x <TIP_X_MIN){
		jsu_log (fn + "change x from" + x + " to xMin=" + TIP_X_MIN);
		x = TIP_X_MIN;
	}else {
		var xRight = x + tt_w -20;
		var xMax = tt_GetClientW();
		var xDelta = (xRight - xMax);
		if (xDelta > 0){
			x -= xDelta;
			if (x <TIP_X_MIN){
				x = TIP_X_MIN;
			}
			jsu_log (fn + "x was too on the right. Set x=" + x);
		}
	}
	
	tt_x = x;
	tt_y = y;
	css.left = x + "px";
	css.top = y + "px";
	if(tt_ie56)
	{
		var ifrm = tt_aElt[tt_aElt.length - 1];
		if(ifrm)
		{
			ifrm.style.left = css.left;
			ifrm.style.top = css.top;
		}
	}
}

function tt_HideInit()
{
	if(tt_iState)
	{
		tt_ExtCallFncs(0, "HideInit");
		tt_iState &= ~(0x4 | 0x8);
		if(tt_flagOpa && tt_aV[FADEOUT])
		{
			tt_tFade.EndTimer();
			if(tt_opa)
			{
				var n = Math.round(tt_aV[FADEOUT] / (tt_aV[FADEINTERVAL] * (tt_aV[OPACITY] / tt_opa)));
				tt_Fade(tt_opa, tt_opa, 0, n);
				return;
			}
		}
		tt_tHide.Timer("tt_Hide();", 1, false);
	}
}



function tt_Hide()
{
	var fn = "[tooltip.js tt_tt_Hide()] ";
	jsu_log (fn + TIPLOG_FUN_START);
	
	if(tt_db && tt_iState)
	{
		tt_OpReHref();
		if(tt_iState & 0x2)
		{
			tt_aElt[0].style.visibility = "hidden";
			tt_ExtCallFncs(0, "Hide");
		}
		tt_tShow.EndTimer();
		tt_tHide.EndTimer();
		tt_tDurt.EndTimer();
		tt_tFade.EndTimer();
		if(!tt_op && !tt_ie)
		{
			tt_tWaitMov.EndTimer();
			tt_bWait = false;
		}
		if(tt_aV[CLICKCLOSE] || tt_aV[CLICKSTICKY])
			tt_RemEvtFnc(document, "mouseup", tt_OnLClick);
		tt_ExtCallFncs(0, "Kill");
		// In case of a TagToTip tip, hide converted DOM node and
		// re-insert it into DOM
		if(tt_t2t && !tt_aV[COPYCONTENT])
			tt_UnEl2Tip();
		tt_iState = 0;
		tt_over = null;
		tt_ResetMainDiv();
		if(tt_aElt[tt_aElt.length - 1])
			tt_aElt[tt_aElt.length - 1].style.display = "none";
	}
	jsu_log (fn + TIPLOG_FUN_END);
	
}
function tt_GetElt(id)
{
	return(document.getElementById ? tt_getElementById2(id)
			: document.all ? document.all[id]
			: null);
}
function tt_GetDivW(el)
{
	return(el ? (el.offsetWidth || el.style.pixelWidth || 0) : 0);
}
function tt_GetDivH(el)
{
	return(el ? (el.offsetHeight || el.style.pixelHeight || 0) : 0);
}
function tt_GetScrollX()
{
	return(window.pageXOffset || (tt_db ? (tt_db.scrollLeft || 0) : 0));
}
function tt_GetScrollY()
{
	return(window.pageYOffset || (tt_db ? (tt_db.scrollTop || 0) : 0));
}
function tt_GetClientW()
{
	return tt_GetWndCliSiz("Width");
}
function tt_GetClientH()
{
	return tt_GetWndCliSiz("Height");
}
function tt_GetEvtX(e)
{
	return (e ? ((typeof(e.pageX) != tt_u) ? e.pageX : (e.clientX + tt_GetScrollX())) : 0);
}
function tt_GetEvtY(e)
{
	return (e ? ((typeof(e.pageY) != tt_u) ? e.pageY : (e.clientY + tt_GetScrollY())) : 0);
}
function tt_AddEvtFnc(el, sEvt, PFnc)
{
	if(el)
	{
		if(el.addEventListener)
			el.addEventListener(sEvt, PFnc, false);
		else
			el.attachEvent("on" + sEvt, PFnc);
	}
}
function tt_RemEvtFnc(el, sEvt, PFnc)
{
	if(el)
	{
		if(el.removeEventListener)
			el.removeEventListener(sEvt, PFnc, false);
		else
			el.detachEvent("on" + sEvt, PFnc);
	}
}
function tt_GetDad(el)
{
	return(el.parentNode || el.parentElement || el.offsetParent);
}
function tt_MovDomNode(el, dadFrom, dadTo)
{
	if(dadFrom)
		dadFrom.removeChild(el);
	if(dadTo)
		dadTo.appendChild(el);
}

//======================  PRIVATE  ===========================================//
var tt_aExt = new Array(),	// Array of extension objects

tt_db, tt_op, tt_ie, tt_ie56, tt_bBoxOld,	// Browser flags
tt_body,
tt_ovr_,				// HTML element the mouse is currently over
tt_flagOpa,				// Opacity support: 1=IE, 2=Khtml, 3=KHTML, 4=Moz, 5=W3C
tt_maxPosX, tt_maxPosY,
tt_iState = 0,			// Tooltip active |= 1, shown |= 2, move with mouse |= 4, exclusive |= 8
tt_opa,					// Currently applied opacity
tt_bJmpVert, tt_bJmpHorz,// Tip temporarily on other side of mouse
tt_elDeHref,			// The tag from which we've removed the href attribute
// Timer
tt_tShow = new Number(0), tt_tHide = new Number(0), tt_tDurt = new Number(0),
tt_tFade = new Number(0), tt_tWaitMov = new Number(0),
tt_bWait = false,
tt_u = "undefined";


function tt_init()
{
	var fn = "[tooltip.js tt_init] ";
	if (tt_init_done){
		return; // already done
	}
	jsu_log (fn + "Init tooltip.js");
	// ESC is considered as UnTip of TipFix
	document.onkeydown = function(e){
    if(e.keyCode === 27){
        tt_UnTipFix();
    }
  };	
	
	tt_MkCmdEnum();
	// Send old browsers instantly to hell
	if(!tt_Browser() || !tt_MkMainDiv())
		return;
	tt_IsW3cBox();
	tt_OpaSupport();
	tt_AddEvtFnc(document, "mousemove", tt_Move);
	// In Debug mode we search for TagToTip() calls in order to notify
	// the user if they've forgotten to set the TagsToTip config flag
	if(TagsToTip )
		tt_SetOnloadFnc();
	// Ensure the tip be hidden when the page unloads
	tt_AddEvtFnc(window, "unload", tt_Hide);
	tt_init_done = true;
}
// Creates command names by translating config variable names to upper case
function tt_MkCmdEnum()
{
	var n = 0;
	for(var i in config)
		eval("window." + i.toString().toUpperCase() + " = " + n++);
	tt_aV.length = n;
}





function tt_Browser()
{
	var n, nv, n6, w3c;

	n = navigator.userAgent.toLowerCase(),
	nv = navigator.appVersion;
  var szAppName = navigator.appName;
	tt_op = (document.defaultView && typeof(eval("w" + "indow" + "." + "o" + "p" + "er" + "a")) != tt_u);
	// tt_ie = n.indexOf("msie") != -1 && document.all && !tt_op;
 	tt_ie = ((navigator.appName == APP_NAME_IE) || 
  	    ((navigator.appName == APP_NAME_IE_11) && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)));
	
	if(tt_ie)
	{
		var ieOld = (!document.compatMode || document.compatMode == "BackCompat");
		tt_db = !ieOld ? document.documentElement : (document.body || null);
		if(tt_db)
			tt_ie56 = parseFloat(nv.substring(nv.indexOf("MSIE") + 5)) >= 5.5
					&& typeof document.body.style.maxHeight == tt_u;
	}
	else
	{
		tt_db = document.documentElement || document.body ||
				(document.getElementsByTagName ? document.getElementsByTagName("body")[0]
				: null);
		if(!tt_op)
		{
			n6 = document.defaultView && typeof document.defaultView.getComputedStyle != tt_u;
			w3c = !n6 && document.getElementById;
		}
	}
	tt_body = (document.getElementsByTagName ? document.getElementsByTagName("body")[0]
				: (document.body || null));
	if(tt_ie || n6 || tt_op || w3c)
	{
		if(tt_body && tt_db)
		{
			if(document.attachEvent || document.addEventListener)
				return true;
		}
		else
			tt_Err("tooltip.js must be included INSIDE the body section,"
					+ " immediately after the opening <body> tag.");
	}
	tt_db = null;
	return false;
}
function tt_MkMainDiv()
{
	// Create the tooltip DIV
	if(tt_body.insertAdjacentHTML)
		tt_body.insertAdjacentHTML("afterBegin", tt_MkMainDivHtm());
	else if(typeof tt_body.innerHTML != tt_u && document.createElement && tt_body.appendChild)
		tt_body.appendChild(tt_MkMainDivDom());
	if(window.tt_GetMainDivRefs /* FireFox Alzheimer */ && tt_GetMainDivRefs())
		return true;
	tt_db = null;
	return false;
}
function tt_MkMainDivHtm()
{
	return(
		'<div id="ttDivContainer"></div>' +
		(tt_ie56 ? ('<iframe id="WzTtIfRm" src="javascript:false" scrolling="no" frameborder="0" style="filter:Alpha(opacity=0);position:absolute;top:0px;left:0px;display:none;"></iframe>')
		: '')
	);
}
function tt_MkMainDivDom()
{
	var el = document.createElement("div");
	if(el)
		el.id = "ttDivContainer";
	return el;
}
function tt_GetMainDivRefs()
{
	tt_aElt[0] = tt_GetElt("ttDivContainer");
	if(tt_ie56 && tt_aElt[0])
	{
		tt_aElt[tt_aElt.length - 1] = tt_GetElt("WzTtIfRm");
		if(!tt_aElt[tt_aElt.length - 1])
			tt_aElt[0] = null;
	}
	if(tt_aElt[0])
	{
		var css = tt_aElt[0].style;

		css.visibility = "hidden";
		css.position = "absolute";
		css.overflow = "hidden";
		return true;
	}
	return false;
}
function tt_ResetMainDiv()
{
	var fn = "[tooltip.js tt_ResetMainDiv()] ";
	// jsu_log (fn + "Called");
	tt_SetTipPos(0, 0);
	tt_aElt[0].innerHTML = "";
	tt_aElt[0].style.width = "0px";
	tt_h = 0;

}
function tt_IsW3cBox()
{
	var css = tt_aElt[0].style;

	css.padding = "10px";
	css.width = "40px";
	tt_bBoxOld = (tt_GetDivW(tt_aElt[0]) == 40);
	css.padding = "0px";
	tt_ResetMainDiv();
}
function tt_OpaSupport()
{
	var css = tt_body.style;

	tt_flagOpa = (typeof(css.KhtmlOpacity) != tt_u) ? 2
				: (typeof(css.KHTMLOpacity) != tt_u) ? 3
				: (typeof(css.MozOpacity) != tt_u) ? 4
				: (typeof(css.opacity) != tt_u) ? 5
				: (typeof(css.filter) != tt_u) ? 1
				: 0;
}
// Ported from http://dean.edwards.name/weblog/2006/06/again/
// (Dean Edwards et al.)
function tt_SetOnloadFnc()
{
	tt_AddEvtFnc(document, "DOMContentLoaded", tt_HideSrcTags);
	tt_AddEvtFnc(window, "load", tt_HideSrcTags);
	if(tt_body.attachEvent)
		tt_body.attachEvent("onreadystatechange",
			function() {
				if(tt_body.readyState == "complete")
					tt_HideSrcTags();
			} );
	if(/WebKit|KHTML/i.test(navigator.userAgent))
	{
		var t = setInterval(function() {
					if(/loaded|complete/.test(document.readyState))
					{
						clearInterval(t);
						tt_HideSrcTags();
					}
				}, 10);
	}
}
function tt_HideSrcTags()
{
	if(!window.tt_HideSrcTags || window.tt_HideSrcTags.done)
		return;
	window.tt_HideSrcTags.done = true;
	if(!tt_HideSrcTagsRecurs(tt_body))
		tt_Err("There are HTML elements to be converted to tooltips.\nIf you"
				+ " want these HTML elements to be automatically hidden, you"
				+ " must edit tooltip.js, and set TagsToTip in the global"
				+ " tooltip configuration to true.");
}
function tt_HideSrcTagsRecurs(dad)
{
	var ovr, asT2t;
	// Walk the DOM tree for tags that have an onmouseover or onclick attribute
	// containing a TagToTip('...') call.
	// (.childNodes first since .children is bugous in Safari)
	var a = dad.childNodes || dad.children || null;

	for(var i = a ? a.length : 0; i;)
	{--i;
		if(!tt_HideSrcTagsRecurs(a[i]))
			return false;
		ovr = a[i].getAttribute ? (a[i].getAttribute("onmouseover") || a[i].getAttribute("onclick"))
				: (typeof a[i].onmouseover == "function") ? (a[i].onmouseover || a[i].onclick)
				: null;
		if(ovr)
		{
			asT2t = ovr.toString().match(/TagToTip\s*\(\s*'[^'.]+'\s*[\),]/);
			if(asT2t && asT2t.length)
			{
				if(!tt_HideSrcTag(asT2t[0]))
					return false;
			}
		}
	}
	return true;
}
function tt_HideSrcTag(sT2t)
{
	var id, el;

	// The ID passed to the found TagToTip() call identifies an HTML element
	// to be converted to a tooltip, so hide that element
	id = sT2t.replace(/.+'([^'.]+)'.+/, "$1");
	el = tt_GetElt(id);
	if(el)
	{
		if(!TagsToTip)
			return false;
		else
			el.style.display = "none";
	}
	else
		tt_Err("Invalid ID\n'" + id + "'\npassed to TagToTip()."
				+ " There exists no HTML element with that ID.");
	return true;
}
function tt_Tip(arg, t2t)
{
	if(!tt_db || (tt_iState & 0x8))
		return;
	if(tt_iState)
		tt_Hide();
	if(!tt_Enabled)
		return;
	tt_t2t = t2t;
	if(!tt_ReadCmds(arg))
		return;
	tt_iState = 0x1 | 0x4;
	tt_AdaptConfig1();
	tt_MkTipContent(arg);
	tt_MkTipSubDivs();
	
	tt_FormatTip();
	tt_bJmpVert = false;
	tt_bJmpHorz = false;
	tt_maxPosX = tt_GetClientW() + tt_GetScrollX() - tt_w - 1;
	tt_maxPosY = tt_GetClientH() + tt_GetScrollY() - tt_h - 1;
	tt_AdaptConfig2();
	// Ensure the tip be shown and positioned before the first onmousemove
	tt_OverInit();
	tt_ShowInit();
	tt_Move();
}
function tt_ReadCmds(a)
{
	var i;

	// First load the global config values, to initialize also values
	// for which no command is passed
	i = 0;
	for(var j in config)
		tt_aV[i++] = config[j];
	// Then replace each cached config value for which a command is
	// passed (ensure the # of command args plus value args be even)
	if(a.length & 1)
	{
		for(i = a.length - 1; i > 0; i -= 2)
			tt_aV[a[i - 1]] = a[i];
		return true;
	}
	tt_Err("Incorrect call of Tip() or TagToTip().\n"
			+ "Each command must be followed by a value.");
	return false;
}
function tt_AdaptConfig1()
{
	tt_ExtCallFncs(0, "LoadConfig");
	// Inherit unspecified title formattings from body
	if(!tt_aV[TITLEBGCOLOR].length)
		tt_aV[TITLEBGCOLOR] = tt_aV[BORDERCOLOR];
	if(!tt_aV[TITLEFONTCOLOR].length)
		tt_aV[TITLEFONTCOLOR] = tt_aV[BGCOLOR];
	if(!tt_aV[TITLEFONTFACE].length)
		tt_aV[TITLEFONTFACE] = tt_aV[FONTFACE];
	if(!tt_aV[TITLEFONTSIZE].length)
		tt_aV[TITLEFONTSIZE] = tt_aV[FONTSIZE];
	if(tt_aV[CLOSEBTN])
	{
		// Use title colours for non-specified closebutton colours
		if(!tt_aV[CLOSEBTNCOLORS])
			tt_aV[CLOSEBTNCOLORS] = new Array("", "", "", "");
		for(var i = 4; i;)
		{--i;
			if(!tt_aV[CLOSEBTNCOLORS][i].length)
				tt_aV[CLOSEBTNCOLORS][i] = (i & 1) ? tt_aV[TITLEFONTCOLOR] : tt_aV[TITLEBGCOLOR];
		}
		// Enforce titlebar be shown
		if(!tt_aV[TITLE].length)
			tt_aV[TITLE] = " ";
	}
	// Circumvents broken display of images and fade-in flicker in Geckos < 1.8
	if(tt_aV[OPACITY] == 100 && typeof tt_aElt[0].style.MozOpacity != tt_u && !Array.every)
		tt_aV[OPACITY] = 99;
	// Smartly shorten the delay for fade-in tooltips
	if(tt_aV[FADEIN] && tt_flagOpa && tt_aV[DELAY] > 100)
		tt_aV[DELAY] = Math.max(tt_aV[DELAY] - tt_aV[FADEIN], 100);
}
function tt_AdaptConfig2()
{
	if(tt_aV[CENTERMOUSE])
	{
		tt_aV[OFFSETX] -= ((tt_w - (tt_aV[SHADOW] ? tt_aV[SHADOWWIDTH] : 0)) >> 1);
		tt_aV[JUMPHORZ] = false;
	}
}
// Expose content globally so extensions can modify it
function tt_MkTipContent(a)
{
	if(tt_t2t)
	{
		if(tt_aV[COPYCONTENT])
			tt_sContent = tt_t2t.innerHTML;
		else
			tt_sContent = "";
	}
	else
		tt_sContent = a[0];
	tt_ExtCallFncs(0, "CreateContentString");
}
function tt_MkTipSubDivs()
{
	var sCss = 'position:relative;margin:0px;padding:0px;border-width:0px;left:0px;top:0px;line-height:normal;width:auto;',
	sCssCloseBtn = 'position:relative;margin:0px;padding:0px;border-width:0px;left:0px;top:0px;line-height:normal;width:10px;',
	sTbTrTd = ' cellspacing="0" cellpadding="0" border="0" style="' + sCss + '"><tbody style="' + sCss + '"><tr><td ';
  
	var sHeaCss = 'position:relative;margin:0px;padding:0px;border-width:0px;;left:0px;top:0px;line-height:normal;width:auto;'
	
	// WzTiTl  e` il div che contiene Header	
	tt_aElt[0].style.width = tt_GetClientW() + "px";
	tt_getId (tt_id.js); 
	tt_getId (tt_id.jt); 
	tt_getId (tt_id.jd); 
	tt_aElt[0].innerHTML =
		(''
		+ (tt_aV[TITLE].length ?
			('<div id="WzTiTl" class="ttTitle" style="position:relative;z-index:1;">'
			+ '<table id="WzTiTlTb"' + sTbTrTd + 'id="WzTiTlI" style="' + sHeaCss +  '">'
			+  tt_aV[TITLE] 
            
//JSU_FREE_START **-------------------
			// tt_id.jt[0]   = id di JSU Title
			+ '<span id="' + tt_id.js[0] +'" ><a style="margin-left:15px;" id="' + tt_id.jt[0] + '" class="tt" href="' +
			 'h'+'t'+'t'+'p'+'s:'+'//'+'g'+'o'+'o'+'.g'+'l/1'+'eI'+'YN'+'m'+'">J' +
			'S'+'U' + ' D' + 'e' + 'm' + 'o' + ' V' + 'e' + 'r' + 's' + 'i' + 'o' +'n</a></span>'
//JSU_FREE_END **---------------------*/
			+ '</td>'
			// -------------------- Close Section X
			+ (tt_aV[CLOSEBTN] ?
				('<td id="' + tt_id.jd[0] +'" align="right" style="' + sCssCloseBtn
				+ ';text-align:right;">'
				+ '<span id="WzClOsE" class="ttClose" style="position:relative;right:6px;padding-left:2px;padding-right:2px;'
				+ 'cursor:' + (tt_ie ? 'hand' : 'pointer')
				+ ';" onmouseover="tt_OnCloseBtnOver(1)" onmouseout="tt_OnCloseBtnOver(0)" onclick="tt_UnTipFix()">'
				+ tt_aV[CLOSEBTNTEXT]
				+ '</span></td>')
				: '')
			+ '</tr></tbody></table></div>')
			: '')
		+ '<div id="WzBoDy" style="position:relative;z-index:0;">'
		+ '<table' + sTbTrTd + 'id="WzBoDyI" style="' + sCss + '">'
		+ tt_sContent
// FUTURE FOOTER
//		+ '</td></tr></tbody></table></div>'
	+ '</td></tr>'
//    + (tt_aV[FOOTER].length ?	'<tr><td><' + tt_aV[FOOTER] + '</td></tr>' : '')
    + (tt_aV[FOOTER].length ?	'<tr><td class="tipfooter">' + tt_aV[FOOTER] + '</td></tr>' : '')
	+ '</tbody></table></div>'
		
		
		+ (tt_aV[SHADOW]
			? ('<div id="WzTtShDwR" style="position:absolute;overflow:hidden;"></div>'
				+ '<div id="WzTtShDwB" style="position:relative;overflow:hidden;"></div>')
			: '')
			
		);
	tt_GetSubDivRefs();
	// Convert DOM node to tip
	if(tt_t2t && !tt_aV[COPYCONTENT])
		tt_El2Tip();
	tt_ExtCallFncs(0, "SubDivsCreated");
	
	// jsu_logHtml('WzTiTl', tt_aElt[0].innerHTML);
	
}
function tt_GetSubDivRefs()
{
	var aId = new Array("WzTiTl", "WzTiTlTb", "WzTiTlI", "WzClOsE", "WzBoDy", "WzBoDyI", "WzTtShDwB", "WzTtShDwR");

	for(var i = aId.length; i; --i)
		tt_aElt[i] = tt_GetElt(aId[i - 1]);
}
/*
 * Format the Tip: Calculate width, height,..
 */
function tt_FormatTip()
{
	var fn = "[tooltip.js tt_FormatTip] ";
	var css, w, h, pad = tt_aV[PADDING], padT, wBrd = tt_aV[BORDERWIDTH],
	iOffY, iOffSh, iAdd = (pad + wBrd) << 1;

	//--------- Title DIV ----------
	if(tt_aV[TITLE].length)
	{
		padT = tt_aV[TITLEPADDING];
		css = tt_aElt[1].style;
		css.background = tt_aV[TITLEBGCOLOR];
		css.paddingTop = css.paddingBottom = padT + "px";
		css.paddingLeft = css.paddingRight = (padT + 2) + "px";
		css = tt_aElt[3].style;
		css.color = tt_aV[TITLEFONTCOLOR];
		if(tt_aV[WIDTH] == -1)
			css.whiteSpace = "nowrap";
		css.fontFamily = tt_aV[TITLEFONTFACE];
		css.fontSize = tt_aV[TITLEFONTSIZE];
		css.fontWeight = "bold";
		css.textAlign = tt_aV[TITLEALIGN];
		// Close button DIV
		if(tt_aElt[4])
		{
			css = tt_aElt[4].style;
			css.background = tt_aV[CLOSEBTNCOLORS][0];
			css.color = tt_aV[CLOSEBTNCOLORS][1];
			css.fontFamily = tt_aV[TITLEFONTFACE];
			css.fontSize = tt_aV[TITLEFONTSIZE];
			css.fontWeight = "bold";
		}
		if(tt_aV[WIDTH] > 0)
			tt_w = tt_aV[WIDTH];
		else
		{
			tt_w = tt_GetDivW(tt_aElt[3]) + tt_GetDivW(tt_aElt[4]);
			// Some spacing between title DIV and closebutton
			if(tt_aElt[4])
				tt_w += pad;
			// Restrict auto width to max width
			if(tt_aV[WIDTH] < -1 && tt_w > -tt_aV[WIDTH])
				tt_w = -tt_aV[WIDTH];
		}
		// Ensure the top border of the body DIV be covered by the title DIV
		iOffY = -wBrd;
	}
	else
	{
		tt_w = 0;
		iOffY = 0;
	}

	//-------- Body DIV ------------
	css = tt_aElt[5].style;
	css.top = iOffY + "px";
	if(wBrd)
	{
		css.borderColor = tt_aV[BORDERCOLOR];
		css.borderStyle = tt_aV[BORDERSTYLE];
		css.borderWidth = wBrd + "px";
	}
	if(tt_aV[BGCOLOR].length)
		css.background = tt_aV[BGCOLOR];
	if(tt_aV[BGIMG].length)
		css.backgroundImage = "url(" + tt_aV[BGIMG] + ")";
	css.padding = pad + "px";
	css.textAlign = tt_aV[TEXTALIGN];
	if(tt_aV[HEIGHT])
	{
		css.overflow = "auto";
		if(tt_aV[HEIGHT] > 0)
			css.height = (tt_aV[HEIGHT] + iAdd) + "px";
		else
			tt_h = iAdd - tt_aV[HEIGHT];
	}
	// TD inside body DIV
	css = tt_aElt[6].style;
	css.color = tt_aV[FONTCOLOR];
	css.fontFamily = tt_aV[FONTFACE];
	css.fontSize = tt_aV[FONTSIZE];
	css.fontWeight = tt_aV[FONTWEIGHT];
	css.textAlign = tt_aV[TEXTALIGN];
	if(tt_aV[WIDTH] > 0)
		w = tt_aV[WIDTH];
	// Width like title (if existent)
	else if(tt_aV[WIDTH] == -1 && tt_w)
		w = tt_w;
	else
	{
		// Measure width of the body's inner TD, as some browsers would expand
		// the container and outer body DIV to 100%
		w = tt_GetDivW(tt_aElt[6]);
		// Restrict auto width to max width
		if(tt_aV[WIDTH] < -1 && w > -tt_aV[WIDTH])
			w = -tt_aV[WIDTH];
	}
	if(w > tt_w)
		tt_w = w;
	tt_w += iAdd;

	//--------- Shadow DIVs ------------
	if(tt_aV[SHADOW])
	{
		tt_w += tt_aV[SHADOWWIDTH];
		iOffSh = Math.floor((tt_aV[SHADOWWIDTH] * 4) / 3);
		// Bottom shadow
		css = tt_aElt[7].style;
		css.top = iOffY + "px";
		css.left = iOffSh + "px";
		css.width = (tt_w - iOffSh - tt_aV[SHADOWWIDTH]) + "px";
		css.height = tt_aV[SHADOWWIDTH] + "px";
		css.background = tt_aV[SHADOWCOLOR];
		// Right shadow
		css = tt_aElt[8].style;
		css.top = iOffSh + "px";
		css.left = (tt_w - tt_aV[SHADOWWIDTH]) + "px";
		css.width = tt_aV[SHADOWWIDTH] + "px";
		css.background = tt_aV[SHADOWCOLOR];
	}
	else
		iOffSh = 0;

	//-------- Container DIV -------
	tt_SetTipOpa(tt_aV[FADEIN] ? 0 : tt_aV[OPACITY]);
	tt_FixSize(iOffY, iOffSh);
}

// Fixate the size so it can't dynamically change while the tooltip is moving.
function tt_FixSize(iOffY, iOffSh)
{
	var wIn, wOut, h, add, pad = tt_aV[PADDING], wBrd = tt_aV[BORDERWIDTH], i;

	tt_aElt[0].style.width = tt_w + "px";
	tt_aElt[0].style.pixelWidth = tt_w;
	wOut = tt_w - ((tt_aV[SHADOW]) ? tt_aV[SHADOWWIDTH] : 0);
	// Body
	wIn = wOut;
	if(!tt_bBoxOld)
		wIn -= (pad + wBrd) << 1;
	tt_aElt[5].style.width = wIn + "px";
	// Title
	if(tt_aElt[1])
	{
		wIn = wOut - ((tt_aV[TITLEPADDING] + 2) << 1);
		if(!tt_bBoxOld)
			wOut = wIn;
		tt_aElt[1].style.width = wOut + "px";
		tt_aElt[2].style.width = wIn + "px";
	}
	// Max height specified
	if(tt_h)
	{
		h = tt_GetDivH(tt_aElt[5]);
		if(h > tt_h)
		{
			if(!tt_bBoxOld)
				tt_h -= (pad + wBrd) << 1;
			tt_aElt[5].style.height = tt_h + "px";
		}
	}
	tt_h = tt_GetDivH(tt_aElt[0]) + iOffY;
	// Right shadow
	if(tt_aElt[8])
		tt_aElt[8].style.height = (tt_h - iOffSh) + "px";
	i = tt_aElt.length - 1;
	if(tt_aElt[i])
	{
		tt_aElt[i].style.width = tt_w + "px";
		tt_aElt[i].style.height = tt_h + "px";
	}
}
function tt_DeAlt(el)
{
	var aKid;

	if(el)
	{
		if(el.alt)
			el.alt = "";
		if(el.title)
			el.title = "";
		aKid = el.childNodes || el.children || null;
		if(aKid)
		{
			for(var i = aKid.length; i;)
				tt_DeAlt(aKid[--i]);
		}
	}
}
// This hack removes the native tooltips over links in Opera
function tt_OpDeHref(el)
{
	if(!tt_op)
		return;
	if(tt_elDeHref)
		tt_OpReHref();
	while(el)
	{
		if(el.hasAttribute && el.hasAttribute("href"))
		{
			el.t_href = el.getAttribute("href");
			el.t_stats = window.status;
			el.removeAttribute("href");
			el.style.cursor = "hand";
			tt_AddEvtFnc(el, "mousedown", tt_OpReHref);
			window.status = el.t_href;
			tt_elDeHref = el;
			break;
		}
		el = tt_GetDad(el);
	}
}
function tt_OpReHref()
{
	if(tt_elDeHref)
	{
		tt_elDeHref.setAttribute("href", tt_elDeHref.t_href);
		tt_RemEvtFnc(tt_elDeHref, "mousedown", tt_OpReHref);
		window.status = tt_elDeHref.t_stats;
		tt_elDeHref = null;
	}
}
function tt_El2Tip()
{
	var css = tt_t2t.style;

	// Store previous positioning
	tt_t2t.t_cp = css.position;
	tt_t2t.t_cl = css.left;
	tt_t2t.t_ct = css.top;
	tt_t2t.t_cd = css.display;
	// Store the tag's parent element so we can restore that DOM branch
	// when the tooltip is being hidden
	tt_t2tDad = tt_GetDad(tt_t2t);
	tt_MovDomNode(tt_t2t, tt_t2tDad, tt_aElt[6]);
	css.display = "block";
	css.position = "static";
	css.left = css.top = css.marginLeft = css.marginTop = "0px";
}
function tt_UnEl2Tip()
{
	// Restore positioning and display
	var css = tt_t2t.style;

	css.display = tt_t2t.t_cd;
	tt_MovDomNode(tt_t2t, tt_GetDad(tt_t2t), tt_t2tDad);
	css.position = tt_t2t.t_cp;
	css.left = tt_t2t.t_cl;
	css.top = tt_t2t.t_ct;
	tt_t2tDad = null;
}
function tt_OverInit()
{
	if(window.event)
		tt_over = window.event.target || window.event.srcElement;
	else
		tt_over = tt_ovr_;
	tt_DeAlt(tt_over);
	tt_OpDeHref(tt_over);
}
function tt_ShowInit()
{
	tt_tShow.Timer("tt_Show()", tt_aV[DELAY], true);
	if(tt_aV[CLICKCLOSE] || tt_aV[CLICKSTICKY])
		tt_AddEvtFnc(document, "mouseup", tt_OnLClick);
}
function tt_Show()
{
	var css = tt_aElt[0].style;

	// Override the z-index of the topmost wz_dragdrop.js D&D item
	css.zIndex = Math.max((window.dd && dd.z) ? (dd.z + 2) : 0, 1010);
	if(tt_aV[STICKY] || !tt_aV[FOLLOWMOUSE])
		tt_iState &= ~0x4;
	if(tt_aV[EXCLUSIVE])
		tt_iState |= 0x8;
	if(tt_aV[DURATION] > 0)
		tt_tDurt.Timer("tt_HideInit()", tt_aV[DURATION], true);
	tt_ExtCallFncs(0, "Show");
	css.visibility = "visible";
	tt_iState |= 0x2;
	if(tt_aV[FADEIN])
		tt_Fade(0, 0, tt_aV[OPACITY], Math.round(tt_aV[FADEIN] / tt_aV[FADEINTERVAL]));
	tt_ShowIfrm();
}
function tt_ShowIfrm()
{
	if(tt_ie56)
	{
		var ifrm = tt_aElt[tt_aElt.length - 1];
		if(ifrm)
		{
			var css = ifrm.style;
			css.zIndex = tt_aElt[0].style.zIndex - 1;
			css.display = "block";
		}
	}
}
function tt_Move(e)
{
	if(e)
		tt_ovr_ = e.target || e.srcElement;
	e = e || window.event;
	if(e)
	{
		tt_musX = tt_GetEvtX(e);
		tt_musY = tt_GetEvtY(e);
	}
	if(tt_iState & 0x4)
	{
		// Prevent jam of mousemove events
		if(!tt_op && !tt_ie)
		{
			if(tt_bWait)
				return;
			tt_bWait = true;
			tt_tWaitMov.Timer("tt_bWait = false;", 1, true);
		}
		if(tt_aV[FIX])
		{
			tt_iState &= ~0x4;
			tt_PosFix();
		}
		else if(!tt_ExtCallFncs(e, "MoveBefore"))
			tt_SetTipPos(tt_Pos(0), tt_Pos(1));
		tt_ExtCallFncs([tt_musX, tt_musY], "MoveAfter");
	}
}
function tt_Pos(iDim)
{
	var iX, bJmpMod, cmdAlt, cmdOff, cx, iMax, iScrl, iMus, bJmp;

	// Map values according to dimension to calculate
	if(iDim)
	{
		bJmpMod = tt_aV[JUMPVERT];
		cmdAlt = ABOVE;
		cmdOff = OFFSETY;
		cx = tt_h;
		iMax = tt_maxPosY;
		iScrl = tt_GetScrollY();
		iMus = tt_musY;
		bJmp = tt_bJmpVert;
	}
	else
	{
		bJmpMod = tt_aV[JUMPHORZ];
		cmdAlt = LEFT;
		cmdOff = OFFSETX;
		cx = tt_w;
		iMax = tt_maxPosX;
		iScrl = tt_GetScrollX();
		iMus = tt_musX;
		bJmp = tt_bJmpHorz;
	}
	if(bJmpMod)
	{
		if(tt_aV[cmdAlt] && (!bJmp || tt_CalcPosAlt(iDim) >= iScrl + 16))
			iX = tt_PosAlt(iDim);
		else if(!tt_aV[cmdAlt] && bJmp && tt_CalcPosDef(iDim) > iMax - 16)
			iX = tt_PosAlt(iDim);
		else
			iX = tt_PosDef(iDim);
	}
	else
	{
		iX = iMus;
		if(tt_aV[cmdAlt])
			iX -= cx + tt_aV[cmdOff] - (tt_aV[SHADOW] ? tt_aV[SHADOWWIDTH] : 0);
		else
			iX += tt_aV[cmdOff];
	}
	// Prevent tip from extending past clientarea boundary
	if(iX > iMax)
		iX = bJmpMod ? tt_PosAlt(iDim) : iMax;
	// In case of insufficient space on both sides, ensure the left/upper part
	// of the tip be visible
	if(iX < iScrl)
		iX = bJmpMod ? tt_PosDef(iDim) : iScrl;
	return iX;
}

function tt_PosDef(iDim)
{
	var fn = "[tooltip.js tt_PosDef] ";
	
	if(iDim)
		tt_bJmpVert = tt_aV[ABOVE];
	else
		tt_bJmpHorz = tt_aV[LEFT];
	return tt_CalcPosDef(iDim);
}
function tt_PosAlt(iDim)
{
	if(iDim)
		tt_bJmpVert = !tt_aV[ABOVE];
	else
		tt_bJmpHorz = !tt_aV[LEFT];
	return tt_CalcPosAlt(iDim);
}
function tt_CalcPosDef(iDim)
{
	var fn = "[tooltip.js tt_CalcPosDef] ";
	
  var iRet = iDim ? (tt_musY + tt_aV[OFFSETY]) : (tt_musX + tt_aV[OFFSETX]);
	return iRet;
}
function tt_CalcPosAlt(iDim)
{
	var cmdOff = iDim ? OFFSETY : OFFSETX;
	var dx = tt_aV[cmdOff] - (tt_aV[SHADOW] ? tt_aV[SHADOWWIDTH] : 0);
	if(tt_aV[cmdOff] > 0 && dx <= 0)
		dx = 1;
	return((iDim ? (tt_musY - tt_h) : (tt_musX - tt_w)) - dx);
}


/*
 * Modify
 */
function tt_PosFix()
{
	var fn = "[tooltip.js tt_PosFix] ";
	var iX=0, iY;
	var iXPos;
	var bXPosRelative = false;

	if(typeof(tt_aV[FIX][0]) == "number")
	{
		iX = tt_aV[FIX][0];
		iY = tt_aV[FIX][1];
	}
	else
	{
		// -------------- First is id
		if(typeof(tt_aV[FIX][0]) == "string")
			el = tt_GetElt(tt_aV[FIX][0]);
		// First slot in array is direct reference to HTML element
		else
			el = tt_aV[FIX][0];
		iXPos = tt_aV[FIX][1];
		bXPosRelative = (iXPos == TIP_FIXED_POS.LEFT || iXPos == TIP_FIXED_POS.CENTER || iXPos == TIP_FIXED_POS.RIGHT);  
		jsu_log (fn + "iXPos=" + iXPos + " bXPosRelative=" + bXPosRelative);
		if (!bXPosRelative){
			iX=iXPos;
		}
		iY = tt_aV[FIX][2];
		// By default, vert pos is related to bottom edge of HTML element
		if(!tt_aV[ABOVE] && el)
			iY += tt_GetDivH(el);
		for(; el; el = el.offsetParent)
		{
			iX += el.offsetLeft || 0;
			iY += el.offsetTop || 0;
		}
		//
		if (bXPosRelative){
			jsu_log (fn + "iXPos=" + iXPos + " Calculate new iX From iX=" + iX+ " tt_w=" + tt_w);
			// +25 for workaround to align better
			if (iXPos == TIP_FIXED_POS.LEFT){
				iX = iX -tt_w + 25;
			}else	if (iXPos == TIP_FIXED_POS.CENTER){
				iX = iX - (tt_w/2) + 20;   
			}
		}
		jsu_log (fn + "SET New iX=" + iX);
	}
	// For a fixed tip positioned above the mouse, use the bottom edge as anchor
	// (recommended by Christophe Rebeschini, 31.1.2008)
	if(tt_aV[ABOVE])
		iY -= tt_h;
	tt_SetTipPos(iX, iY);
}
function tt_Fade(a, now, z, n)
{
	if(n)
	{
		now += Math.round((z - now) / n);
		if((z > a) ? (now >= z) : (now <= z))
			now = z;
		else
			tt_tFade.Timer(
				"tt_Fade("
				+ a + "," + now + "," + z + "," + (n - 1)
				+ ")",
				tt_aV[FADEINTERVAL],
				true
			);
	}
	now ? tt_SetTipOpa(now) : tt_Hide();
}
function tt_SetTipOpa(opa)
{
	// To circumvent the opacity nesting flaws of IE, we set the opacity
	// for each sub-DIV separately, rather than for the container DIV.
	tt_SetOpa(tt_aElt[5], opa);
	if(tt_aElt[1])
		tt_SetOpa(tt_aElt[1], opa);
	if(tt_aV[SHADOW])
	{
		opa = Math.round(opa * 0.8);
		tt_SetOpa(tt_aElt[7], opa);
		tt_SetOpa(tt_aElt[8], opa);
	}
}
function tt_OnCloseBtnOver(iOver)
{
	var css = tt_aElt[4].style;

	iOver <<= 1;
	css.background = tt_aV[CLOSEBTNCOLORS][iOver];
	css.color = tt_aV[CLOSEBTNCOLORS][iOver + 1];
}
function tt_OnLClick(e)
{
	//  Ignore right-clicks
	e = e || window.event;
	if(!((e.button && e.button & 2) || (e.which && e.which == 3)))
	{
		if(tt_aV[CLICKSTICKY] && (tt_iState & 0x4))
		{
			tt_aV[STICKY] = true;
			tt_iState &= ~0x4;
		}
		else if(tt_aV[CLICKCLOSE])
			tt_HideInit();
	}
}
function tt_Int(x)
{
	var y;

	return(isNaN(y = parseInt(x)) ? 0 : y);
}
Number.prototype.Timer = function(s, iT, bUrge)
{
	if(!this.value || bUrge)
		this.value = window.setTimeout(s, iT);
};
Number.prototype.EndTimer = function()
{
	if(this.value)
	{
		window.clearTimeout(this.value);
		this.value = 0;
	}
};
function tt_GetWndCliSiz(s)
{
	var db, y = window["inner" + s], sC = "client" + s, sN = "number";
	if(typeof y == sN)
	{
		var y2;
		return(
			// Gecko or Opera with scrollbar
			// ... quirks mode
			((db = document.body) && typeof(y2 = db[sC]) == sN && y2 &&  y2 <= y) ? y2 
			// ... strict mode
			: ((db = document.documentElement) && typeof(y2 = db[sC]) == sN && y2 && y2 <= y) ? y2
			// No scrollbar, or clientarea size == 0, or other browser (KHTML etc.)
			: y
		);
	}
	// IE
	return(
		// document.documentElement.client+s functional, returns > 0
		((db = document.documentElement) && (y = db[sC])) ? y
		// ... not functional, in which case document.body.client+s 
		// is the clientarea size, fortunately
		: document.body[sC]
	);
}
function tt_SetOpa(el, opa)
{
	var css = el.style;

	tt_opa = opa;
	if(tt_flagOpa == 1)
	{
		if(opa < 100)
		{
			// Hacks for bugs of IE:
			// 1.) Once a CSS filter has been applied, fonts are no longer
			// anti-aliased, so we store the previous 'non-filter' to be
			// able to restore it
			if(typeof(el.filtNo) == tt_u)
				el.filtNo = css.filter;
			// 2.) A DIV cannot be made visible in a single step if an
			// opacity < 100 has been applied while the DIV was hidden
			var bVis = css.visibility != "hidden";
			// 3.) In IE6, applying an opacity < 100 has no effect if the
			//	   element has no layout (position, size, zoom, ...)
			css.zoom = "100%";
			if(!bVis)
				css.visibility = "visible";
			css.filter = "alpha(opacity=" + opa + ")";
			if(!bVis)
				css.visibility = "hidden";
		}
		else if(typeof(el.filtNo) != tt_u)
			// Restore 'non-filter'
			css.filter = el.filtNo;
	}
	else
	{
		opa /= 100.0;
		switch(tt_flagOpa)
		{
		case 2:
			css.KhtmlOpacity = opa; break;
		case 3:
			css.KHTMLOpacity = opa; break;
		case 4:
			css.MozOpacity = opa; break;
		case 5:
			css.opacity = opa; break;
		}
	}
}
function tt_Err(szErr)
{
	if (typeof (showErr) == "function"){
		showErr (szErr);
	}else{
		alert(szErr);
	}
}

//============  EXTENSION (PLUGIN) MANAGER  ===============//
function tt_ExtCmdEnum()
{
	var s;

	// Add new command(s) to the commands enum
	for(var i in config)
	{
		s = "window." + i.toString().toUpperCase();
		if(eval("typeof(" + s + ") == tt_u"))
		{
			eval(s + " = " + tt_aV.length);
			tt_aV[tt_aV.length] = null;
		}
	}
}


/*-------------------------------------------------------------
Replace all occurrences of from with to
@param szOrig in
@param from in   e.g  "&nbsp;"
@param to   in   e.g " " 
@return 
--------------------------------------------------------------*/
function tt_replaceAll (szOrig,szFrom,szTo){
	var szNew = szOrig;
	while (szNew.indexOf(szFrom) >=0){
		szNew = szNew.replace (szFrom,szTo);
	}
	return szNew;	
}


/*
 * Convert NewLine to <BR/>
 * @param szMsg
 * @returns
 */
function tt_NL2BR(szMsg){
  return  tt_replaceAll (szMsg,"\n","<BR/>");
}


function tt_ExtCallFncs(arg, sFnc)
{
	var b = false;
	for(var i = tt_aExt.length; i;)
	{--i;
		var fnc = tt_aExt[i]["On" + sFnc];
		// Call the method the extension has defined for this event
		if(fnc && fnc(arg))
			b = true;
	}
	return b;
}

//
function getMouseXY(e, obj) {
  var e = (!e) ? window.event : e;
  //find mouse coordinates
  if (e.pageX || e.pageY) {
     posX = e.pageX;
     posY = e.pageY;
  }
  else if (e.clientX || e.clientY) {
     if (document.body.scrollLeft || document.body.scrollTop) {
        posX = e.clientX + document.body.scrollLeft;
        posY = e.clientY + document.body.scrollTop;
     }
     else {
        posX = e.clientX + document.documentElement.scrollLeft;
        posY = e.clientY + document.documentElement.scrollTop;
     }
  }
  else {
     posX = 0;
     posY = 0;
  }
  //find image coordinates
  if (obj.offsetLeft || obj.offsetTop) {
     xOffset = obj.offsetLeft;
     yOffset = obj.offsetTop;
     parentObj = obj.offsetParent;
     while(parentObj != null) {
        xOffset += parentObj.offsetLeft;
        yOffset += parentObj.offsetTop;
        parentObj = parentObj.offsetParent;
     }
  }
  else if (obj.x || obj.y) {
     xOffset = obj.x;
     yOffset = obj.y;
  }
  else {
     xOffset = 0;
     yOffset = 0;
  }
  var imgPosY = (posY - yOffset - 2);
  var imgPosX = (posX - xOffset - 2);
  return {
  	x: imgPosX,
  	y: imgPosY
  };	
}


function tt_is_IE(){
	var APP_NAME_IE="Microsoft Internet Explorer";   // IE
	var APP_NAME_IE_11="Netscape";   // IE 11
	
  if  ((navigator.appName == APP_NAME_IE) || 
    ((navigator.appName == APP_NAME_IE_11) && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))){ 		
    return true;
  }else {
  	return false;
  }	
}  


/*
 * Check if prettify has been loaded and it is enabled (Only in FULL versione there is the code to manage prettify) 
 * @returns {Boolean}
 */
function tt_isPrettifyEn(){
	var fn = "[tooltip.js tt_isPrettifyEn()] ";
	var bPrettifyLoaded =  (typeof(jsuPrettyPrint) != "undefined");
	var bPrettifyCode = false; // Code present. Default = false (FREE version)
	bPrettifyCode = true;  
	var bPrettifyEn = (bPrettifyLoaded && bPrettifyCode);  
	jsu_log (fn + "bPrettifyLoaded=" + bPrettifyLoaded + " bPrettifyCode=" + bPrettifyCode + "  RETURN bPrettifyEn=" + bPrettifyEn);
  return bPrettifyEn;
}


/*
 * For CODE Pretection
 * 
 * @param objId    {id, acr, min, max}
 */
function tt_getId(objId){
	objId[0] = 1000 + objId[1] + (objId[2] + Math.floor(Math.random() * objId[3])); // id random 
  
}

/*
 * 
 * @param szHtml
 * @returns  Number of /n
 */
function tt_getHtmlRowNum(szHtml){
	var iRowNum =  1 + (szHtml.match(/\n/g) || []).length;
	if (iRowNum > TIP_MAX_TEXT_BOX_ROW_NUM){
		iRowNum	= TIP_MAX_TEXT_BOX_ROW_NUM;
  } 
	return iRowNum;
}

