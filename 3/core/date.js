/* =========================================================================================
File:     					date.js
Author:   					Federico Levis
Last Modification:  Jan 2016   
Description: Common js date utilty for Cognos Report Studio or also for generic JS use 

DISCLAIMER
Copyright by Federico Levis http://federicolevis.wix.com/cognos Cognos Tips & Solutions
All rights reserved: UNAUTHORIZED COPYING, REPRODUCTION, REPUBLISHING, UPLOADING, POSTING, TRANSMITTING OR DUPLICATING IS PROHIBITED
========================================================================================= */

// ------------------------------------------------------------------
// These functions use the same 'format' strings as the 
// java.text.SimpleDateFormat class, with minor exceptions.
// The format string consists of the following abbreviations:
// 
// Field        | Full Form          | Short Form
// -------------+--------------------+-----------------------
// Year         | yyyy (4 digits)    | yy (2 digits), y (2 or 4 digits)
// Month        | MMM (name or abbr.)| MM (2 digits), M (1 or 2 digits)
//              | NNN (abbr.)        |
// Day of Month | dd (2 digits)      | d (1 or 2 digits)
// Day of Week  | EE (name)          | E (abbr)
// Hour (1-12)  | hh (2 digits)      | h (1 or 2 digits)
// Hour (0-23)  | HH (2 digits)      | H (1 or 2 digits)
// Hour (0-11)  | KK (2 digits)      | K (1 or 2 digits)
// Hour (1-24)  | kk (2 digits)      | k (1 or 2 digits)
// Minute       | mm (2 digits)      | m (1 or 2 digits)
// Second       | ss (2 digits)      | s (1 or 2 digits)
// AM/PM        | a                  |
//
//  ----- Examples
//   NNN dd, yyyy HH:mm:ss
//   yyyy-MM-dd
//
// NOTE THE DIFFERENCE BETWEEN MM and mm! Month=MM, not mm!
// Examples:
//  "MMM d, y" matches: January 01, 2000
//                      Dec 1, 1900
//                      Nov 20, 00
//  "M/d/yy"   matches: 01/20/00
//                      9/2/00
//  "MMM dd, yyyy hh:mm:ssa" matches: "January 01, 2000 12:30:45AM"
// ------------------------------------------------------------------

var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');



function LZ(x) {return(x<0||x>9?"":"0")+x;}

/* ------------------------------------------------------------------
        PAR
szDate          in        e.g "10-25-2008 10:00"
szFormat       in        e.g "MM-dd-yyyy HH:mm"
      RETURN
true      it is a Date in the specified format
false     it is not a Date in the specified format
      NOTE
hour minutes and seconds are not mandatory.
  e.g
szDate          in       "10-25-2008"
szFormat       in        "MM-dd-yyyy HH:mm"
  RETURN 
true
 ------------------------------------------------------------------*/
function isDate(szDate,szFormat) {
  // var Fn = "[isDate] ";
  // jslog(JSLOG_TEST,Fn + " IN szDate=" + szDate+ " szFormat=" + szFormat);  

	var iTime=getTimeFromFormat(szDate,szFormat);
	if (iTime==0) { return false; }
	return true;
}

/* ------------------------------------------------------------------
Compare two date strings to see which is greater. Both date must be NOT Empty
      PAR
szDate1        in        e.g "10-25-2008 10:00"
szDate2        in        e.g "10-26-2008 10:00"
szFormat       in        e.g "MM-dd-yyyy HH:mm"
bShowErr       in     if True and there is an Error, Show Error
      RETURN
1 szDate1 > szDate2      (szDate1 is more recent)
0 if they are the same
2 szDate1 < szDate2
-1 ERROR: invalid format
 ------------------------------------------------------------------*/
function compareDates(szDate1,szDate2,szFormat,bShowErr) {
  var Fn = "[compareDates] ";
  var iRet = 0;
  jslog(JSLOG_TEST,Fn + "IN szDate1=" + szDate1 + "  szDate2=" + szDate2  + "   szFormat=" +szFormat);

  if (szDate1.length == 0  && szDate2.length == 0) {
    return 0;  // No Problem: one or Both are empty
  }
  if (szDate1.length == 0) {
    return 2;  // No Problem: First is Empty
  }
  if (szDate2.length == 0) {
    return 1;  // No Problem: Second is Empty
  }

	var iTime1=getTimeFromFormat(szDate1,szFormat);
  if (iTime1 == 0){
    if (bShowErr){
      showErr (szDate1 + "\n\n" + ERR_DATE_FMT + szFormat,-2);
    }
    return -2;   // Invalid Format  
  }
	var iTime2=getTimeFromFormat(szDate2,szFormat);
  if (iTime2 == 0){
    if (bShowErr){
      showErr (szDate2 + "\n\n" + ERR_DATE_FMT + szFormat,-2);
    }
    return -2;   // Invalid Format  
  }
	if (iTime1 > iTime2) {
	  return 1;  
	}
	if (iTime1 < iTime2) {
	  return 2;  
	}
  return 0;  // They are equal
}


/* ------------------------------------------------------------------
Change the Format if a date
      PAR
szDate1    in        e.g "25-10-2008" 
szFmt1    in        e.g "dd-MM-yyyy"
szFmt2    in        e.g "MM-dd-yyyy HH:mm"
bShowErr  in        if true show errore if any
      RETURN
szDate (as string with szFmt2 format. e.g:  "10-25-2008 00:00")
 ------------------------------------------------------------------*/
function szDateChangeFmt(szDate1,szFmt1,szFmt2,bShowErr) {
  var Fn = "[szDateChangeFmt] ";
  var szDate2="";
  jslog(JSLOG_TEST, Fn + JSLOG_FUN_START);
  jslog(JSLOG_TEST,Fn + "IN szDate1=" + szDate1 + "  szFmt1=" + szFmt1 + " szFmt2=" +szFmt2);

  if (szFmt1 == szFmt2){
    return szDate1; // The format is the same, return szDate1
  }
  // I have to change Format
  if (szDate1.length == 0){
    jslog(JSLOG_TEST, "OUT: szDate2=" + szDate2);
    return szDate2;  // OK Empty String
  }

	var iTime1=getTimeFromFormat(szDate1,szFmt1);
  if (iTime1 == 0){
    if (bShowErr){
      showErr (szDate1 + "\n\n" + ERR_DATE_FMT + szFmt1,1);
    }
    jslog(JSLOG_TEST, "OUT: szDate2=" + szDate2);
    return szDate2;
  }
  var Date1 = new Date();
  Date1.setTime(iTime1);
  var szDate2= formatDate (Date1,szFmt2);
  jslog(JSLOG_TEST, "OUT: szDate2=" + szDate2);
  jslog(JSLOG_TEST, Fn + JSLOG_FUN_END);

  return szDate2;

}






/* ------------------------------------------------------------------
 formatDate (date_object, format)
 Returns a date in the output format specified.
 The format string uses the same abbreviations as in getTimeFromFormat()
      PAR
date    in        date type variable
format  in        e.g "MM-dd-yyyy HH:mm"
      RETURN
szDate (as string with format. e.g:  "10-25-2008 10:00")
 ------------------------------------------------------------------*/
function formatDate(date,szFmt) {

  var Fn = "[formatDate] ";
  // jslog(JSLOG_TEST, Fn + JSLOG_FUN_START);
  // jslog(JSLOG_TEST,Fn + "IN date=" + date + "  szFmt=" + szFmt);


	szFmt=szFmt+"";
	var result="";
	var i_szFmt=0;
	var c="";
	var token="";
	var y=date.getYear()+"";
	var M=date.getMonth()+1;
	var d=date.getDate();
	var E=date.getDay();
	var H=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();

  // jslog(JSLOG_TEST,"y=" + y + " M=" + M + " d=" + d + " E=" + E + " H=" +H + " m=" + m + " s=" + s);


	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real date parts into szFmtted versions
	var value=new Object();
	if (y.length < 4) {y=""+(y-0+1900);}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	value["M"]=M;
	value["MM"]=LZ(M);
	value["MMM"]=MONTH_NAMES[M-1];
	value["NNN"]=MONTH_NAMES[M+11];
	value["d"]=d;
	value["dd"]=LZ(d);
	value["E"]=DAY_NAMES[E+7];
	value["EE"]=DAY_NAMES[E];
	value["H"]=H;
	value["HH"]=LZ(H);
	if (H==0){value["h"]=12;}
	else if (H>12){value["h"]=H-12;}
	else {value["h"]=H;}
	value["hh"]=LZ(value["h"]);
	if (H>11){value["K"]=H-12;} else {value["K"]=H;}
	value["k"]=H+1;
	value["KK"]=LZ(value["K"]);
	value["kk"]=LZ(value["k"]);
	if (H > 11) { value["a"]="PM"; }
	else { value["a"]="AM"; }
	value["m"]=m;
	value["mm"]=LZ(m);
	value["s"]=s;
	value["ss"]=LZ(s);
	while (i_szFmt < szFmt.length) {
		c=szFmt.charAt(i_szFmt);
		token="";
		while ((szFmt.charAt(i_szFmt)==c) && (i_szFmt < szFmt.length)) {
			token += szFmt.charAt(i_szFmt++);
			}
      // jslog(JSLOG_TEST,"token=" + token);
		if (value[token] != null) { result=result + value[token]; }
		else { result=result + token; }
		}
  // jslog(JSLOG_TEST, Fn + JSLOG_FUN_END);
	return result;
}
	
// ------------------------------------------------------------------
// Utility functions for parsing in getTimeFromFormat()
// ------------------------------------------------------------------
function _isInteger(val) {
	var digits="1234567890";
	for (var i=0; i < val.length; i++) {
		if (digits.indexOf(val.charAt(i))==-1) { return false; }
		}
	return true;
	}



/* ------------------------------------------------------------------
------------------------------------------------------------------*/
function _getInt(str,i,minlength,maxlength) {
	for (var x=maxlength; x>=minlength; x--) {
		var token=str.substring(i,i+x);
		if (token.length < minlength) { return null; }
		if (_isInteger(token)) { return token; }
		}
	return null;
	}




	
/* ------------------------------------------------------------------
 This function takes a date string and a format string. It matches
 If the date string matches the format string, it returns the 
 getTime() of the date. If it does not match, it returns 0.

      PAR
szDate    in        e.g "10-25-2008 10:00"
format  in        e.g "MM-dd-yyyy HH:mm"
      RETURN
0   if date is not in format or date is empty...      
Time  (date.getTime())

      NOTE
Time (hour minutes and seconds) are not mandatory
  e.g
szDate          in       "10-25-2008"
szFormat       in        "MM-dd-yyyy HH:mm"
  RETURN 
Time   (as it was "10-25-2008 00:00")
------------------------------------------------------------------*/
function getTimeFromFormat(szDate,format) {
  var Fn = "[getTimeFromFormat] ";
  //jslog(JSLOG_TEST,Fn + JSLOG_FUN_START);
  //jslog(JSLOG_TEST,"IN: szDate=" + szDate + " (Len=" + szDate.length  + ")   format=" + format);


	szDate=szDate+"";
  var iDateLen =	 szDate.length;
  // Skip possible Blank at the end of szDate
  var bEnd=false;
  for (var i= szDate.length-1; !bEnd && i--; i>=0){
    var szChar = szDate.charAt(i);
    if (szChar != " "){
      bEnd = true;
    }else {
      iDateLen--;
    }
  } 

	format=format+"";

	if (iDateLen < 2) {return 0;}


	var iDate=0;
	var i_format=0;
	var c="";
	var token="";
	var token2="";
	var x,y;
	var now=new Date();
	var year=now.getYear();
	var month=now.getMonth()+1;
	var date=1;
	var hh=0, mm=0, ss=0;
	var ampm="";
  var bDateWithoutTime = false;
	
	while (i_format < format.length && !bDateWithoutTime) {
		// Get next token from format string
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		// Extract contents of szDate based on format token
    //jslog(JSLOG_TEST,"token=" + token + " iDate=" + iDate + " iDateLen=" + iDateLen);
    // if it is a Token Relative to Time Part (or a blank separator) and Date has ended, it is OK and we use hh=0, mm=0, ss=0;
		if  ((iDate == iDateLen) &&  (token==" " || token=="  " ||  token=="HH"||token=="H" || token=="HH"||token=="H" || token=="KK"||token=="K" || token=="kk"||token=="k" ||
		                               token=="mm"||token=="m" || token=="ss"||token=="s" || token=="a")) {
      bDateWithoutTime = true;
    } else {     
		  if (token=="yyyy" || token=="yy" || token=="y") {
			  if (token=="yyyy") { x=4;y=4; }
			  if (token=="yy")   { x=2;y=2; }
			  if (token=="y")    { x=2;y=4; }
			  year=_getInt(szDate,iDate,x,y);
			  if (year==null) { return 0; }
			  iDate += year.length;
			  if (year.length==2) {
				  if (year > 70) { year=1900+(year-0); }
				  	else { year=2000+(year-0); }
				  }
		    //jslog(JSLOG_TEST,"year = " + year);
			  }
		  else if (token=="MMM"||token=="NNN"){
			  month=0;
			  for (var i=0; i<MONTH_NAMES.length; i++) {
				  var month_name=MONTH_NAMES[i];
				  if (szDate.substring(iDate,iDate+month_name.length).toLowerCase()==month_name.toLowerCase()) {
					  if (token=="MMM"||(token=="NNN"&&i>11)) {
						  month=i+1;
						  if (month>12) { month -= 12; }
						  	iDate += month_name.length;
						  break;
						  }
					  }
				  }
		    //jslog(JSLOG_TEST,"month  = " + month );
			  if ((month < 1)||(month>12)){return 0;}
			  }
		  else if (token=="EE"||token=="E"){
			  for (var i=0; i<DAY_NAMES.length; i++) {
				  var day_name=DAY_NAMES[i];
				  if (szDate.substring(iDate,iDate+day_name.length).toLowerCase()==day_name.toLowerCase()) {
					  iDate += day_name.length;
					  break;
					  }
				  }
			  }
		  else if (token=="MM"||token=="M") {
				month=_getInt(szDate,iDate,token.length,2);
				if(month==null||(month<1)||(month>12)){return 0;}
				iDate+=month.length;
		    //jslog(JSLOG_TEST,"month=" + month );
			  }
		  else if (token=="dd"||token=="d") {
			  date=_getInt(szDate,iDate,token.length,2);
			  if(date==null||(date<1)||(date>31)){return 0;}
			  iDate+=date.length;
			  }
		  else if (token=="hh"||token=="h") {
			  hh=_getInt(szDate,iDate,token.length,2);
			  if(hh==null||(hh<1)||(hh>12)){return 0;}
			  iDate+=hh.length;
		    //jslog(JSLOG_TEST,"hh=" + hh);
			  }
		  else if (token=="HH"||token=="H") {
			  hh=_getInt(szDate,iDate,token.length,2);
			  if(hh==null||(hh<0)||(hh>23)){return 0;}
			  iDate+=hh.length;
		    //jslog(JSLOG_TEST,"hh=" + hh);
			  }
		  else if (token=="KK"||token=="K") {
			  hh=_getInt(szDate,iDate,token.length,2);
			  if(hh==null||(hh<0)||(hh>11)){return 0;}
			  iDate+=hh.length;}
		  else if (token=="kk"||token=="k") {
			  hh=_getInt(szDate,iDate,token.length,2);
			  if(hh==null||(hh<1)||(hh>24)){return 0;}
			  iDate+=hh.length;hh--;}
		  else if (token=="mm"||token=="m") {
			  mm=_getInt(szDate,iDate,token.length,2);
			  if(mm==null||(mm<0)||(mm>59)){return 0;}
			  iDate+=mm.length;
		    //jslog(JSLOG_TEST,"mm=" + mm);
			  }
		  else if (token=="ss"||token=="s") {
			  ss=_getInt(szDate,iDate,token.length,2);
			  if(ss==null||(ss<0)||(ss>59)){return 0;}
			  iDate+=ss.length;}
		  else if (token=="a") {
			  if (szDate.substring(iDate,iDate+2).toLowerCase()=="am") {ampm="AM";}
			  else if (szDate.substring(iDate,iDate+2).toLowerCase()=="pm") {ampm="PM";}
			  else {return 0;}
			  iDate+=2;}
		  else {
			  if (szDate.substring(iDate,iDate+token.length)!=token) {
			    jslog(JSLOG_INFO,"LEN ERROR");
			  	return 0;
			  }
			  else {iDate+=token.length;}
			  }
      }
		} // end while
	// If there are any trailing characters left in the szDate, it doesn't match
  //jslog(JSLOG_TEST,"month=" + month + "  date=" + date + " year=" +year);
	if (iDate != iDateLen) { return 0; }
	// Is date szDateid for month?
	if (month==2) {
		// Check for leap year
		if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
			if (date > 29){ return 0; }
			}
		else { if (date > 28) { return 0; } }
		}
	if ((month==4)||(month==6)||(month==9)||(month==11)) {
		if (date > 30) { return 0; }
		}
	// Correct hours szDateue
	if (hh<12 && ampm=="PM") { hh=hh-0+12; }
	else if (hh>11 && ampm=="AM") { hh-=12; }
	var newdate=new Date(year,month-1,date,hh,mm,ss);
  //jslog(JSLOG_TEST,"OUT  newdate=" + newdate);
  //jslog(JSLOG_TEST,Fn + JSLOG_FUN_END);
	return newdate.getTime();
	}

// ------------------------------------------------------------------
// parseDate( date_string [, prefer_euro_format] )
//
// This function takes a date string and tries to match it to a
// number of possible date formats to get the value. It will try to
// match against the following international formats, in this order:
// y-M-d   MMM d, y   MMM d,y   y-MMM-d   d-MMM-y  MMM d
// M/d/y   M-d-y      M.d.y     MMM-d     M/d      M-d
// d/M/y   d-M-y      d.M.y     d-MMM     d/M      d-M
// A second argument may be passed to instruct the method to search
// for formats like d/M/y (european format) before M/d/y (American).
// Returns a Date object or null if no patterns match.
// ------------------------------------------------------------------
function parseDate(val) {
	var preferEuro=(arguments.length==2)?arguments[1]:false;
	generalFormats=new Array('y-M-d','MMM d, y','MMM d,y','y-MMM-d','d-MMM-y','MMM d');
	monthFirst=new Array('M/d/y','M-d-y','M.d.y','MMM-d','M/d','M-d');
	dateFirst =new Array('d/M/y','d-M-y','d.M.y','d-MMM','d/M','d-M');
	var checkList=new Array('generalFormats',preferEuro?'dateFirst':'monthFirst',preferEuro?'monthFirst':'dateFirst');
	var d=null;
	for (var i=0; i<checkList.length; i++) {
		var l=window[checkList[i]];
		for (var j=0; j<l.length; j++) {
			d=getTimeFromFormat(val,l[j]);
			if (d!=0) { return new Date(d); }
			}
		}
	return null;
	}


// 
function getDateFromFormat(szDate,szFmt)
{
  return getTimeFromFormat(szDate,szFmt);
}  


