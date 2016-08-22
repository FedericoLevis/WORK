/* =========================================================================================
File:     					core_ita.js
Author:   					Federico Levis
Last Modification:  Apr 2016   
Description: use this JS for core Label in Italian 

DISCLAIMER
Copyright by Federico Levis http://federicolevis.wix.com/cognos Cognos Tips & Solutions
All rights reserved: UNAUTHORIZED COPYING, REPRODUCTION, REPUBLISHING, UPLOADING, POSTING, TRANSMITTING OR DUPLICATING IS PROHIBITED
This copy is provided To ENEL S.P.A to be used without restriction only inside its Cognos project
========================================================================================= */


//-------------------------------------------- VALIDATE
var VALIDATE_MSG={
	cantBeBlank: "non puo` essere vuoto",
	wrongLen: "e` una lunghezza errata (dovrebbe essere %{count} caratteri)",
	tooShort: "e` troppo corto  (il minimo sono  %{count} caratteri)",
	tooLong: "e` troppo lungo (il massimo e` %{count} caratteri)",
	notNumber: "non e` un numero",
	mustBeInteger: "deve essere un intero",
	mustBeType:  "deve esere %{type} %{count}",
	mustBeOdd:  "deve essere pari",
	mustBeEven:  "deve essere dispari",
	validDate: "deve essere una data valida",
	notEarlierThanDate:   "non deve essere < %{date}",
	notLaterThanDate:  "non deve essere >  %{date}",
	isInvalid: "non e` valido",
	valueRestricted: "^%{value} e` ristretto",
	notValidMail:  "non e` una mail valida",
	notValidUrl: "non e` un URL valido",
	notEmptyString: "L'attribute non puo` essere una stringa vuota",
	notEqualToAttribute: "non e` uguale a %{attribute}"	
};

//----------------------------- LOADING_DIV
var LOADING_DIV_MSG={
	cancelBtn: "Annulla",	
  working: "<b>In Esecuzione</b></BR>Attendere Prego...",
  sec: " sec",
  startTime: "Partenza alle: ",
  elapsed: " - Trascorsi: ",
  sec: " sec"
  
};  	



//----------------------------------------- TOOLTIP
var TIP_BTN_CLOSE = "Chiudi"; 
var TIP_DEF_JS_TITLE = "Codice Sorgente JS";
var TIP_BTN_CLOSE_TITLE = "Click o ESC per Chiudere il Tooltip";


//GoogleAnal Label
var GA_LABEL = {
		DEF_TITLE: "Google Analitycs",
		DEF_HEADER: 'Click Il Link <b><u>Google Analytics</u></b> per aprire la pagina delle Google Analitycs relative all\'URL selezionato</b>',
		DEF_FOOTER: '<b>NOTE sulle Google Analitycs:</b><ul>' +
		'<li>Sole le pagine caricate tramite lo <b><i>Short URL</i></b> sono conteggiate. Le pagine caricate con il <b><i>LongUrl</i></b> non vengono conteggiate</li>' +
		'<li>Sembra che sia presente un <i>Defect</i> nella Google Analytics: <b>le pagine caricate con IE non vengono conteggiate</b>, quindi in valore reale dei contatori e` piu` elevato di quanto visualizzato.</li></ul>',
		CAT: "Categoria",
		DESC: "Descrizione URL",
		LONG_URL: "Long URL",
		SHORT_URL: "Short URL",
		ANAL: "Google Analytics",
		ANAL_ALL: "TUTTE le Google Analytics",
		ALL_LINK:"Tutte le Google Analitycs",
		ALL_TITLE: "Mostra TUTTE le <b>GOOGLE_ANAL_NUM Google Analitycs</b> della Tabella:",
		//---------- Filter Cat
		FILTER_CAT_ALL: "TUTTE le Categorie", // For Filter
		FILTER_CAT_TITLE: "FILTRO delle Categorie:",
		FILTER_CAT_HEADER: "FILTRA le Categorie  da mostrare",
		//---------- Filter Type (last par in https://goo.gl/#analytics/goo.gl/HnNqnM/all_time )
		FILTER_TYPE_HEADER: "Analytics: ",  // displayed in Header
		FILTER_TYPE_TITLE: "Tipo di  Google Analytics da visualizzare. Poi puo` esseer cambiato dalla Google Analitycs page",  //Filter Tip
		// -- Entries in Filter
		FILTER_TYPE_ALL: "Tutto il periodo",
		FILTER_TYPE_MONTH: "Ultimo Mese",
		FILTER_TYPE_WEEK: "Ultima Settimana",
		FILTER_TYPE_DAY: "Ultimo Giorno",
		FILTER_TYPE_2HOURS: "Ultime 2 ore"
};


//---------------- SORT
//Sort. NB: per ASC indichiamo Descendente perche` si Fa Toggle di Sort
var SORT_HINT_ASC="Click per il 'Sort Veloce' (Discendente Z..A)";
var SORT_HINT_DESC="Click per il 'Sort Veloce' (Ascendente A..Z)";
var SORT_HINT_GLOBAL_ASC="Click per il Sort  (Discendente Z..A)\nATTENZIONE: puo` essere LENTO perche` il Report sara` rieseguito!";
var SORT_HINT_GLOBAL_DESC="Click per il Sort (Ascendente A..Z)\nATTENZIONE: puo` essere LENTO perche` il Report sara` rieseguito!";
var SORT_HINT_DISABLED="'Sort Veloce' disabilitato perche` NON sono visualizzati Tutti i Records della Tabella\nPuoi cambiare il Sort tramite il relativo Filtro e poi clikare su Esegui";

var SORT_HINT_REC_NUM_ALL="La Tabella ha XXX Records";
var SORT_HINT_REC_NUM_PART="In questa pagina sono visualizzati SOLO XXX Records della Tabella e sono presenti altre pagine";


//----------------------------- POPUP
// Default Title of the jsPopup, when Title is Not passed
var POPUP_DEF_TITLE ={
  INFO : "INFORMAZIONE",
  WARN : "WARNING",
  ERR : "ERRORE",
  ALARM : "ALLARME",
  QUESTION : "DOMANDA",
  PROMPT : "RICHIESTA VALORE",
  CONFIRM : "CONFERMA",
  CHOICE : "SCELTA"
};  

var POPUP_BTN_LABEL = {
  CONFIRM : "OK",
  QUESTION_CONFIRM : "SI",
  QUESTION_NO : "NO",
  QUESTION_CANCEL : "ANNULLA"
};  

var POPUP_SELECT_ALL = "Seleziona Tutti";
var POPUP_DESELECT_ALL = "Deseleziona Tutti";


var POPUP_PROMPT_TIP = {
  STRING : "Inserisci un testo",
  NUMBER : "Inserisci un numero",
  STRING_RANGE : "Inserisci un testo con un numero di caratteri nel range ",
  NUMBER_RANGE : "Inserisci un numero nel range "
};  

//---------------- ERROR
var ERR_FILTER_SETTINGS = "Please Check Filter Settings: with current values the query cannot be executed";
var ERR_NUMBER_FIELD = "Please insert a number";
var ERR_DATE_FMT = "INVALID DATE FORMAT.\n\nPlease insert a date in Format ";
var ERR_DATE_FMT_EX = "For example Current Date = ";
var ERR_DATE_START_GREATER_END = "Please insert Start Time <= End Time";
var ERR_AUTOREFRESH_SETTINGS = "Auto-refresh not supported. Is supported only Entry/Hourly Resolutions";

//---- e.g "You have selected 523 items in PLMN Filter\nThe maximum number of selectable items in this Filter is 200\nnIf you deselect all, no filter will be applied for PLMN and all PLMNs will be included in the query"
var ERR_FILTER_MAX_ITEM_1 = "You have selected ";
var ERR_FILTER_MAX_ITEM_2 = " items in ";
var ERR_FILTER_MAX_ITEM_3 = " Filter\nPlease Select a Number of Items in Range [";

var ERR_FILTER_MAX_ITEM_4 = "\n\nIf you deselect all, no filter will be applied for ";
var ERR_FILTER_MAX_ITEM_5 = "\nand all ";
var ERR_FILTER_MAX_ITEM_6 = " will be included in the query.";


// --- TIP
var TIP_HIDE_CONFIRM = "With current Settings HIDDEN KPI Columns are:";
