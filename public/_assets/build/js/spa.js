(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//
// CORE UTILS
//
// display a growl message in green
"use strict";window.growlCenterSuccess = function growlCenterSuccess($msg){$.bootstrapGrowl($msg,{type:"success", // (null, "info", "danger", "success")
offset:{from:"top",amount:300}, // "top", or "bottom"
align:"center", // ("left", "right", or "center")
width:200, // (integer, or "auto")
delay:3000, // Time while the message will be displayed. It"s not equivalent to the *demo* timeOut!
allow_dismiss:true, // If true then will display a cross to close the popup.
stackup_spacing:10 // spacing between consecutively stacked growls.
});}; // display a growl message in red
window.growlCenterDanger = function growlCenterDanger($msg){$.bootstrapGrowl($msg,{type:"danger", // (null, "info", "danger", "success")
offset:{from:"top",amount:300}, // "top", or "bottom"
align:"center", // ("left", "right", or "center")
width:300, // (integer, or "auto")
delay:70000, // Time while the message will be displayed. It"s not equivalent to the *demo* timeOut!
allow_dismiss:true, // If true then will display a cross to close the popup.
stackup_spacing:10 // spacing between consecutively stacked growls.
});};window.growlCenterNotify = function growlCenterNotify($msg){$.bootstrapGrowl($msg,{type:"info", // (null, "info", "danger", "success")
offset:{from:"top",amount:300}, // "top", or "bottom"
align:"center", // ("left", "right", or "center")
width:400, // (integer, or "auto")
delay:7000, // Time while the message will be displayed. It"s not equivalent to the *demo* timeOut!
allow_dismiss:true, // If true then will display a cross to close the popup.
stackup_spacing:10 // spacing between consecutively stacked growls.
});};window.growlCenterError = function growlCenterError($msg){$.bootstrapGrowl($msg,{type:"danger", // (null, "info", "danger", "success")
offset:{from:"top",amount:300}, // "top", or "bottom"
align:"center", // ("left", "right", or "center")
width:400, // (integer, or "auto")
delay:7000, // Time while the message will be displayed. It"s not equivalent to the *demo* timeOut!
allow_dismiss:true, // If true then will display a cross to close the popup.
stackup_spacing:10 // spacing between consecutively stacked growls.
});};

},{}],2:[function(require,module,exports){
//
// BENEFITS TAB
//
'use strict';var _utils_spa=require('./utils_spa'); // Populate Benefits Tab on initial load 
if(typeof liEmp_ID !== 'undefined' && liGroupName == 'siteEmployee'){var benData=_utils_spa.ajxPopulateBens(liEmp_ID);benData.done(function(data){ /* code for when the data is back */ //console.log("\n returned benData");
//console.log(benData.responseJSON);
//console.log("histChanged: " + benData.responseJSON.histChanged);
//var changed = benData.responseJSON.changed;
});} // Qualifying Event Listener
$(document).on("change","#qual_event",function(){ // clear Benefit Effective Date
if(_utils_spa.loaded_ben_eff_date == $("#ben_eff_date").val()){$("#ben_eff_date").val("");}var selQual_Event=$("#qual_event option:selected").text(); //console.log(selQual_Event);
switch(selQual_Event){case "Adoption":growlCenterSuccess("Use Date of Adoption for Benefit Effective Date");break;case "Birth":growlCenterSuccess("Use New Born DOB for Benefit Effective Date");break;case "Death":growlCenterSuccess("Use Date of Death for Benefit Effective Date");break;case "Divorce":growlCenterSuccess("Use Divorce Decree Date for Benefit Effective Date");break;case "Gain of Coverage":growlCenterSuccess("Use Date of Gain of Coverage for Benefit Effective Date");break;case "Loss of Coverage":growlCenterSuccess("Use Date of Loss of Coverage for Benefit Effective Date");break;case "Marriage":growlCenterSuccess("Use Marriage Date for Benefit Effective Date");break; // case "New Enrollment":
//     growlCenterSuccess("Use Marriage Date for Benefit Effective Date");
//     break;
// case "Open Enrollment":
//     growlCenterSuccess("Use Marriage Date for Benefit Effective Date");
//     break;
} //growlCenterSuccess("Saved Benefit Changes Successfully");
}); // Cobra Click Listener
$(document).on("click","#cobra",function(){ // clear Benefit Effective Date
if(_utils_spa.loaded_ben_eff_date == $("#ben_eff_date").val()){$("#ben_eff_date").val("");}}); // Plan Change Listener
$(document).on("change","#plan_no",function(){ // clear Benefit Effective Date
if(_utils_spa.loaded_ben_eff_date == $("#ben_eff_date").val()){$("#ben_eff_date").val("");}var emp_id=$("#emp_id").val();return $.ajax({url:"/benefitsTab/show/" + emp_id,type:"GET",dataType:"json",success:function success(data){if(data.returnStatus == "success"){ //console.log("onclick plan_no successful");
//console.log(data);
var todayMoment=moment(); //var todayMoment = moment("2015-10-15");
var oestartMoment=moment(data.perms.oe.oestart,"YYYY-MM-DD");var lastDayOfYearMoment=moment().dayOfYear(365); //console.log(todayMoment + "|" + oestartMoment + "|" + lastDayOfYearMoment);
//console.log(todayMoment.format('MM/DD/YYYY') + "|" + oestartMoment.format('MM/DD/YYYY') + "|" + lastDayOfYearMoment.format('MM/DD/YYYY'));
// if plan changes from oestart to 12-31
// check oestart is in the current year or do not set plan_eff_date
if(oestartMoment.format("YYYY") == todayMoment.format("YYYY")){ //console.log("oestartMoment is in same year as lastDayOfYearMoment");
if(todayMoment.isBetween(oestartMoment,lastDayOfYearMoment)){ //console.log("set plan_eff_date to plan_eff_date in open enrollment table");
// format 
$("#ben_eff_date").val(moment(data.perms.oe.ben_eff_date,"YYYY-MM-DD").format("MM/DD/YYYY"));$("#plan_eff_date").val(moment(data.perms.oe.plan_eff_date,"YYYY-MM-DD").format("MM/DD/YYYY"));}else { //console.log("set plan_eff_date to ben_eff_date in open enrollment table");
// Growler Please Verify Benefit and Plan Effective Dates
$("#ben_eff_date").val("");$("#plan_eff_date").val("");growlCenterDanger("Please ENTER the Benefit Effective Date <br /> and the Plan Effective Date");}}}else if(data.returnStatus == "fail"){console.log("failed");}},error:function error(_error){console.log("Error:");console.log(_error);}});}); // change Coverage Type Listener
$(document).on("change","#coverage",function(){ // clear Benefit Effective Date
if(_utils_spa.loaded_ben_eff_date == $("#ben_eff_date").val()){$("#ben_eff_date").val("");}}); //
// Save All Benefits Changes
//
$(document).on("click","#saveAllBenChanges",function(){ //console.log("saveAllBenChanges");
_utils_spa.ChkLogin();var formdata=$("#frmBen").serialize() + "&emp_id=" + $("#emp_id").val();$.ajax({url:"/benefitsTab/store",type:"POST",dataType:"json",data:formdata,success:function success(data){if(data.returnStatus == "success"){ //console.log("successful");
//alert("Saved Benefit Changes Successfully");
growlCenterSuccess("Saved Benefit Changes Successfully");_utils_spa.ajxPopulateBens($("#emp_id").val());_utils_spa.ClearHideBenHistory();}else if(data.returnStatus == "fail"){ //console.log("fail from saveNewEmp")
var obj=data.message;var msg="";$.each(obj,function(key,value){msg = msg + value + "<br /><br />";console.log(key + ": " + value);});growlCenterDanger(msg);}},error:function error(_error2){console.log("Error:");console.log(_error2);}});}); //
// SUBMIT Benefit Changes for Approval
//
$(document).on("click","#submitAllBenChanges",function(){ //console.log("submitAllBenChanges");
_utils_spa.ChkLogin();var formdata=$("#frmBen").serialize() + "&emp_id=" + $("#emp_id").val();$.ajax({url:"/benefitsTab/store",type:"POST",dataType:"json",data:formdata,success:function success(data){if(data.returnStatus == "success"){ //console.log("successful");
//alert("Saved Benefit Changes Successfully");
growlCenterSuccess("Saved Benefit Changes Successfully");_utils_spa.ajxPopulateBens($("#emp_id").val());_utils_spa.ClearHideBenHistory();}else if(data.returnStatus == "fail"){ //console.log("fail from saveNewEmp")
var obj=data.message;var msg="";$.each(obj,function(key,value){msg = msg + value + "<br /><br />";console.log(key + ": " + value);});growlCenterDanger(msg);}},error:function error(_error3){console.log("Error:");console.log(_error3);}});}); //
//	FSA Calculators
//
function fsaHealth(){ //console.log($('#flex_med_yramt').val());
if($('#flex_med_yramt').val() > 2500){var fsaHealthTmp=$('#flex_med_yramt').val(); //alert("Max value for FSA Health \nAnnual amount is $2500\n\n$" + fsaHealthTmp + " was Entered/Calculated");
var msg="Max value for FSA Health \nAnnual amount is $2500\n\n$" + fsaHealthTmp + " was Entered/Calculated";growlCenterDanger(msg);$('#flex_med_yramt').val('');}return;}$("#flex_med_periods").blur(function(){ // force Integer
var periods=$("#flex_med_periods").val();if(!($.isNumeric(periods) && parseInt(periods,10) > 0)){ //alert("Enter a Positive Integer for # Pay Periods");
growlCenterDanger("Enter a Positive Integer for # Pay Periods");}else {$("#flex_med_periods").val(parseInt(periods,10));var total=($('#flex_med_periods').val() * $('#flex_med_prdamt').val()).toFixed(2);$('#flex_med_yramt').val(total);}fsaHealth();});$("#flex_med_prdamt").blur(function(){ // limit to 2 decimal places
var prdAmt=$('#flex_med_prdamt').val();if(!($.isNumeric(prdAmt) && prdAmt > 0)){ //alert("Enter a Positive Number for Pay Period $");
growlCenterDanger("Enter a Positive Number for Pay Period $");return;}var num=parseFloat($(this).val());var cleanNum=num.toFixed(2);$(this).val(cleanNum);if(num / cleanNum < 1){ //alert("Please enter only 2 decimal places");
growlCenterDanger("Please enter only 2 decimal places");}else {var total=($('#flex_med_periods').val() * $('#flex_med_prdamt').val()).toFixed(2);$('#flex_med_yramt').val(total);}fsaHealth();});$('#flex_med_yramt').blur(function(){var prdamt=$('#flex_med_yramt').val() / $('#flex_med_periods').val();var rndPrdAmt=(Math.floor(prdamt * 100) / 100).toFixed(2);$('#flex_med_prdamt').val(rndPrdAmt);var tmp=($('#flex_med_periods').val() * $('#flex_med_prdamt').val()).toFixed(2);$('#flex_med_yramt').val(tmp);fsaHealth();});function fsaDepCare(){ //console.log($('#flex_med_yramt').val());
if($('#flex_depcare_yramt').val() > 5000){var fsaDepcareTmp=$('#flex_depcare_yramt').val(); //alert("Max value for FSA DepCare \nAnnual amount is $5000\n\n$" + fsaDepcareTmp + " was Entered/Calculated");
growlCenterDanger("Max value for FSA DepCare \nAnnual amount is $5000\n\n$" + fsaDepcareTmp + " was Entered/Calculated");$('#flex_depcare_yramt').val('');}return;}$("#flex_depcare_periods").blur(function(){ // force Integer
var periodsDepcare=$("#flex_depcare_periods").val();if(!($.isNumeric(periodsDepcare) && parseInt(periodsDepcare,10) > 0)){ //alert("Enter a Positive Integer for # Pay Periods");
growlCenterDanger("Enter a Positive Integer for # Pay Periods");}else {$("#flex_depcare_periods").val(parseInt(periodsDepcare,10));var totalDepcare=($('#flex_depcare_periods').val() * $('#flex_depcare_prdamt').val()).toFixed(2);$('#flex_depcare_yramt').val(totalDepcare);}fsaDepCare();});$("#flex_depcare_prdamt").blur(function(){ // limit to 2 decimal places
var prdAmtDepcare=$('#flex_depcare_prdamt').val();if(!($.isNumeric(prdAmtDepcare) && prdAmtDepcare > 0)){ //alert("Enter a Positive Number for Pay Period $");
growlCenterDanger("Enter a Positive Number for Pay Period $");return;}var numDepcare=parseFloat($(this).val());var cleanNumDepcare=numDepcare.toFixed(2);$(this).val(cleanNumDepcare);if(cleanNumDepcare / cleanNumDepcare < 1){ //alert("Please enter only 2 decimal places");
growlCenterDanger("Please enter only 2 decimal places");}else {var totalDepcare=($('#flex_depcare_periods').val() * $('#flex_depcare_prdamt').val()).toFixed(2);$('#flex_depcare_yramt').val(totalDepcare);}fsaDepCare();});$('#flex_depcare_yramt').blur(function(){var prdamtDepcare=$('#flex_depcare_yramt').val() / $('#flex_depcare_periods').val();var rndPrdAmtDepcare=(Math.floor(prdamtDepcare * 100) / 100).toFixed(2);$('#flex_depcare_prdamt').val(rndPrdAmtDepcare);var tmpDepcare=($('#flex_depcare_periods').val() * $('#flex_depcare_prdamt').val()).toFixed(2);$('#flex_depcare_yramt').val(tmpDepcare);fsaDepCare();}); //
//	End FSA Calculators
//
//
// SET COVERAGE check boxes based on drop down
//
$('#coverage').on('change',function(){ // clear Benefit Effective Date
$("#ben_eff_date").val("");var filter=$("#coverage").val();_utils_spa.SetCoverage(filter);}); // disable if waived
$('#waive_coverage').click(function(e){ //console.log("waive_coverage checkbox clicked");
if($('#waive_coverage').prop('checked')){ //console.log("waive_coverage checkbox checked");
$('#ben_eff_date').val("");$('#plan_eff_date').val("");$('#waive_date').val(moment().format("MM/DD/YYYY"));$('#ben_eff_date').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#plan_eff_date').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#qual_event').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#plan_no').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#coverage').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#waive_coverage').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#waive_date').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#en_med_den').prop('disabled',true);$("#en_med_den").prop("checked",false);$('#en_med_den').prop('title',"Disabled due to waived coverage");$('#s_med_den').prop('disabled',true);$("#s_med_den").prop("checked",false);$('#s_med_den').prop('title',"Disabled due to waived coverage");$('#d_med_den').prop('disabled',true);$("#d_med_den").prop("checked",false);$('#d_med_den').prop('title',"Disabled due to waived coverage");}else { //console.log("waive_coverage checkbox unchecked");
$('#waive_date').val();$('#ben_eff_date').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#plan_eff_date').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#qual_event').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#plan_no').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#coverage').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#waive_coverage').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#waive_date').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#en_med_den').prop('disabled',false);$('#s_med_den').prop('disabled',false);$('#d_med_den').prop('disabled',false);}});$(document).on("click","#en_med_den",function(){var filter=$("#coverage").val();growlCenterDanger("Please use the Coverage Type drop down to set this Full Coverage");_utils_spa.SetCoverage(filter);});$(document).on("click","#s_med_den",function(){var filter=$("#coverage").val();growlCenterDanger("Please use the Coverage Type drop down to set this Full Coverage");_utils_spa.SetCoverage(filter);});$(document).on("click","#d_med_den",function(){var filter=$("#coverage").val();growlCenterDanger("Please use the Coverage Type drop down to set this Full Coverage");_utils_spa.SetCoverage(filter);}); //
// END COVERAGE 
//

},{"./utils_spa":7}],3:[function(require,module,exports){
//
// DEPENDENTS TAB
//
'use strict';var _utils_spa=require('./utils_spa'); // Populate Dependents Tab on initial load 
if(typeof liEmp_ID !== 'undefined' && liGroupName == 'siteEmployee'){var depData=_utils_spa.ajxPopulateDeps(liEmp_ID);depData.done(function(data){ /* code for when the data is back */ //console.log("\n returned benData");
//console.log(benData.responseJSON);
//console.log("histChanged: " + benData.responseJSON.histChanged);
//var changed = benData.responseJSON.changed;
});}$(document).on("click","#addDep",function(){_utils_spa.ChkLogin();$("#div_deps").addClass("hide");$("#div_dep").removeClass("hide");$("#saveAllDepChanges").addClass("hide");$("#saveNewDep").removeClass("hide"); // clear fields for new Dependent$("#dep_id").val(data.d.id);
_utils_spa.ClearHideDepHistory();_utils_spa.ClearDependents();});$(document).on("click","#editDep",function(){_utils_spa.ChkLogin();var dep_id=$(this).closest('td').next().text(); //console.log("dep_id: " + dep_id);
_utils_spa.ClearHideDepHistory();_utils_spa.ajxPopulateDep(dep_id);$("#div_deps").addClass("hide");$("#div_dep").removeClass("hide");});$(document).on("click","#saveAllDepChanges",function(){_utils_spa.ChkLogin();var formdata=$("#frmDep").serialize();$.ajax({url:"/dependentsTab/storeDep",type:"POST",dataType:"json",data:formdata,success:function success(data){if(data.returnStatus == "success"){ //console.log("successful /dependentsTab/store");
//console.log(data);
growlCenterSuccess("Saved Benefit Changes Successfully");_utils_spa.ajxPopulateDeps($("#emp_id").val());}else if(data.returnStatus == "fail"){ //console.log("failed")
var obj=data.message;var msg="";$.each(obj,function(key,value){msg = msg + value + "<br /><br />"; //console.log(key + ": " + value);
});growlCenterDanger(msg);} //console.log(data);
},error:function error(_error){console.log("Error:");console.log(_error);}});});$(document).on("click","#submitAllDepChanges",function(){_utils_spa.ChkLogin();var formdata=$("#frmDep").serialize();$.ajax({url:"/dependentsTab/storeDep",type:"POST",dataType:"json",data:formdata,success:function success(data){if(data.returnStatus == "success"){ //console.log("successful /dependentsTab/store");
//console.log(data);
growlCenterSuccess("Saved Benefit Changes Successfully");_utils_spa.ajxPopulateDeps($("#emp_id").val());}else if(data.returnStatus == "fail"){ //console.log("failed")
var obj=data.message;var msg="";$.each(obj,function(key,value){msg = msg + value + "<br /><br />"; //console.log(key + ": " + value);
});growlCenterDanger(msg);} //console.log(data);
},error:function error(_error2){console.log("Error:");console.log(_error2);}});});$(document).on("click","#saveNewDep",function(){_utils_spa.ChkLogin();var formdata=$("#frmDep").serialize() + "&emp_id=" + $("#emp_id").val();$.ajax({url:"/dependentsTab/saveNewDep",type:"POST",dataType:"json",data:formdata,success:function success(data){if(data.returnStatus == "success"){ //console.log("successful /dependentsTab/saveNewDep");
//console.log(data);
growlCenterSuccess("Saved Benefit Changes Successfully");_utils_spa.ajxPopulateDeps($("#emp_id").val());}else if(data.returnStatus == "fail"){console.log("failed");var obj=data.message;var msg="";$.each(obj,function(key,value){msg = msg + value + "<br /><br />"; //console.log(key + ": " + value);
});growlCenterDanger(msg);} //console.log(data);
},error:function error(_error3){console.log("Error:");console.log(_error3);}});}); // Delete Dependent
$("#deps-table-body").on('click',".deldep",function(){_utils_spa.ChkLogin();var depID=$(this).data("depid");var emp_id=$("#emp_id").val();var formdata="depID=" + depID + "&empID=" + emp_id;var r=confirm("Are you sure you want to DELETE?");if(r === true){$.ajax({url:"/dependentsTab/delDep",type:"GET",dataType:"json",data:formdata,success:function success(data){ //console.log(data);
if(data.returnStatus == "success"){_utils_spa.ajxPopulateDeps(emp_id);growlCenterSuccess("Delete Dependent Successfully");}else if(data.returnStatus == "fail"){growlCenterDanger("Delete Dependent Failed");}},error:function error(_error4){console.log("Error:");console.log(_error4);}});}}); // $('.btn-delete').on('click', function() { 
// 	return confirm('Are you sure you want to DELETE?'); 
// }); 
$(document).on("click","#cancelDepChanges",function(){_utils_spa.ChkLogin();$("#div_deps").removeClass("hide");$("#div_dep").addClass("hide");initDepsBtns = {'saveAllDepChanges':'hide','discardAllDepChanges':'hide','saveNewDep':'hide','cancelDepChanges':'show','submitAllDepChanges':'hide','depAwaitingApproval':'hide'};_utils_spa.DepsButtons(undefined,initDepsBtns);});

},{"./utils_spa":7}],4:[function(require,module,exports){
//
// EMPLOYEE LIST TAB
//
"use strict";exports.__esModule = true;var _utils_spa=require('./utils_spa');$("#list").jqGrid({url:"employeeListDataAll",datatype:"json",mtype:"GET",colNames:["id","Employee ID","Last Name",'First Name','MI','SSN','DOH','Term Date','NE Start Date','NE End Date','New Hire','In NE Window Now','Days Until In NE Window','Days Left In NE Win','Lapsed NE Window','OE Start Date','OE End Date','In OE Window'],colModel:[{name:"id",width:50,hidden:true},{name:"emp_id",width:130},{name:"e_lname",width:110},{name:"e_fname",width:110},{name:"e_mi",width:30,search:false},{name:"e_ssn",width:110},{name:"doh",width:90},{name:"term_date",width:90},{name:"NEStartDate",width:90},{name:"NEEndDate",width:90},{name:"isNewHire",width:90},{name:"inNeWindowNow",width:130},{name:"daysUntilInNeWindow",width:170},{name:"daysLeftInNeWin",width:130},{name:"lapsedNeWindow",width:130},{name:"oestart",width:90},{name:"oeend",width:90},{name:"inOeWindowNow",width:130}],pager:"#pager",loadonce:true,rowNum:10000,sortname:"id",sortorder:"asc",rowList:[], // disable page size dropdown
pgbuttons:false, // disable page control like next, back button
pgtext:null, // disable pager text like 'Page 0 of 10'
viewrecords:true, // disable current view record text like 'View 1-10 of 100' 
gridview:true,height:520,autowidth:true,shrinkToFit:false,autoencode:true,ignoreCase:true,caption:"Employees",ondblClickRow:function ondblClickRow(rowid){ //alert(rowid);
goToEmployee();}});function goToEmployee(){var rowid=$("#list").jqGrid('getGridParam','selrow');var rowData=$("#list").getRowData(rowid);var curEmp_ID=$("#list").jqGrid('getCell',rowid,'emp_id'); // console.log("employee_list curEmp_ID is: " + curEmp_ID);
// console.log("employee_list rowData has: " + JSON.stringify(rowData));
// console.log("employee_list row id is: " + rowid);
// set Employee tab active
_utils_spa.ActivateTab("emp");$("#badge_emp").removeClass("hide"); // fill tabs with data
_utils_spa.ajxPopulateEmp(curEmp_ID); // pass id from employees table
_utils_spa.ajxPopulateBens(curEmp_ID);_utils_spa.ajxPopulateDeps(curEmp_ID);}$("#list").jqGrid('navGrid',"#pager",{edit:false,add:false,del:false}).jqGrid('filterToolbar',{defaultSearch:'cn'});setTimeout(function(){ // resort grid
$('#list').jqGrid('setGridParam',{sortname:'e_lname',sortorder:'asc'}).trigger('reloadGrid',[{page:1}]);},1500); //
//  Add New Employee listener
//
if(typeof liGroupName !== 'undefined'){if(liGroupName == "tccSupport"){$('#addNewEmpList').addClass('hide');}else {$('#addNewEmpList').click(function(e){ //console.log("addNewEmpList clicked");
_utils_spa.ChkLogin();_utils_spa.NewEmp();});}} // select employee list tab, show benefits and deps tabs
$('#tab-emplist').click(function(e){ //console.log("addNewEmpList clicked");
_utils_spa.ChkLogin();$("#tab-bens").removeClass("hide");$("#tab-deps").removeClass("hide");}); //
// Employee List FILTERS
//
$('#filter').on('change',function(){ //console.log("submit filter: " + $("#filter").val());
_utils_spa.ChkLogin();var filter=$("#filter").val();switch(filter){case "all": // all employees
//console.log("actEnr");
$('#list').jqGrid('GridUnload');$(function(){$("#list").jqGrid({url:"employeeListDataAll",datatype:"json",mtype:"GET",colNames:["id","Employee ID","First Name",'MI','Last Name','SSN','DOH','Term Date','NE Start Date','NE End Date','New Hire','In NE Window Now','Days Until In NE Window','Days Left In NE Win','Lapsed NE Window','OE Start Date','OE End Date','In OE Window'],colModel:[{name:"id",width:50,hidden:true},{name:"emp_id",width:130},{name:"e_fname",width:110},{name:"e_mi",width:30,search:false},{name:"e_lname",width:110},{name:"e_ssn",width:110},{name:"doh",width:90},{name:"term_date",width:90},{name:"NEStartDate",width:90},{name:"NEEndDate",width:90},{name:"isNewHire",width:90},{name:"inNeWindowNow",width:130},{name:"daysUntilInNeWindow",width:170},{name:"daysLeftInNeWin",width:130},{name:"lapsedNeWindow",width:130},{name:"oestart",width:90},{name:"oeend",width:90},{name:"inOEwindow",width:130}],pager:"#pager",loadonce:true,rowNum:10000,sortname:"id",sortorder:"asc",rowList:[], // disable page size dropdown
pgbuttons:false, // disable page control like next, back button
pgtext:null, // disable pager text like 'Page 0 of 10'
viewrecords:true, // disable current view record text like 'View 1-10 of 100' 
gridview:true,height:520,autowidth:true,shrinkToFit:false,ignoreCase:true,autoencode:true,caption:"Employees",ondblClickRow:function ondblClickRow(rowid){ //alert(rowid);
goToEmployee();}});$("#list").jqGrid('navGrid',"#pager",{edit:false,add:false,del:false}).jqGrid('filterToolbar',{defaultSearch:'cn'});});break;case "actEnr": // active enrollees
//console.log("actEnr");
$('#list').jqGrid('GridUnload');$(function(){$("#list").jqGrid({url:"employeeListData",datatype:"json",mtype:"GET",colNames:["id","Employee ID","First Name",'MI','Last Name','SSN','DOH','Term Date','NE Start Date','NE End Date','New Hire','In NE Window Now','Days Until In NE Window','Days Left In NE Win','Lapsed NE Window','OE Start Date','OE End Date','In OE Window'],colModel:[{name:"id",width:50,hidden:true},{name:"emp_id",width:130},{name:"e_fname",width:110},{name:"e_mi",width:30,search:false},{name:"e_lname",width:110},{name:"e_ssn",width:110},{name:"doh",width:90},{name:"term_date",width:90},{name:"NEStartDate",width:90},{name:"NEEndDate",width:90},{name:"isNewHire",width:90},{name:"inNeWindowNow",width:130},{name:"daysUntilInNeWindow",width:170},{name:"daysLeftInNeWin",width:130},{name:"lapsedNeWindow",width:130},{name:"oestart",width:90},{name:"oeend",width:90},{name:"inOEwindow",width:130}],pager:"#pager",loadonce:true,rowNum:10000,sortname:"id",sortorder:"asc",rowList:[], // disable page size dropdown
pgbuttons:false, // disable page control like next, back button
pgtext:null, // disable pager text like 'Page 0 of 10'
viewrecords:true, // disable current view record text like 'View 1-10 of 100' 
gridview:true,height:520,autowidth:true,shrinkToFit:false,ignoreCase:true,autoencode:true,caption:"Employees",ondblClickRow:function ondblClickRow(rowid){ //alert(rowid);
goToEmployee();}});$("#list").jqGrid('navGrid',"#pager",{edit:false,add:false,del:false}).jqGrid('filterToolbar',{defaultSearch:'cn'});});break;case "wAppr": // awaiting approval
//console.log("wAppr");
$('#list').jqGrid('GridUnload');$(function(){$("#list").jqGrid({url:"eFilterWAppr",datatype:"json",mtype:"GET",colNames:["id","Employee ID","First Name",'MI','Last Name'],colModel:[{name:"id",width:50,hidden:true},{name:"emp_id",width:130},{name:"e_fname",width:110},{name:"e_mi",width:30,search:false},{name:"e_lname",width:110}],pager:"#pager",loadonce:true,rowNum:10000,sortname:"id",sortorder:"asc",rowList:[], // disable page size dropdown
pgbuttons:false, // disable page control like next, back button
pgtext:null, // disable pager text like 'Page 0 of 10'
viewrecords:true, // disable current view record text like 'View 1-10 of 100' 
gridview:true,height:520,autowidth:true,shrinkToFit:false,ignoreCase:true,autoencode:true,caption:"Employees",ondblClickRow:function ondblClickRow(rowid){goToEmployee();}});$("#list").jqGrid('navGrid',"#pager",{edit:false,add:false,del:false}).jqGrid('filterToolbar',{defaultSearch:'cn'});});break;case "wBiometric": //console.log("wAppr");
$('#list').jqGrid('GridUnload');$(function(){$("#list").jqGrid({url:"eFilterBiometric",datatype:"json",mtype:"GET",colNames:["id","Employee ID","First Name",'MI','Last Name','SSN',"Biometric"],colModel:[{name:"id",width:50,hidden:true},{name:"emp_id",width:130},{name:"e_fname",width:110},{name:"e_mi",width:30,search:false},{name:"e_lname",width:110},{name:"e_ssn",width:110},{name:"biometric",width:110,formatter:"checkbox",align:"center",search:false}],pager:"#pager",loadonce:true,rowNum:10000,sortname:"id",sortorder:"asc",rowList:[], // disable page size dropdown
pgbuttons:false, // disable page control like next, back button
pgtext:null, // disable pager text like 'Page 0 of 10'
viewrecords:true, // disable current view record text like 'View 1-10 of 100' 
gridview:true,height:520,autowidth:true,shrinkToFit:false,ignoreCase:true,autoencode:true,caption:"Employees",ondblClickRow:function ondblClickRow(rowid){goToEmployee();}});$("#list").jqGrid('navGrid',"#pager",{edit:false,add:false,del:false}).jqGrid('filterToolbar',{defaultSearch:'cn'});});break;case "wCobra": //console.log("wAppr");
$('#list').jqGrid('GridUnload');$(function(){$("#list").jqGrid({url:"eFilterCobra",datatype:"json",mtype:"GET",colNames:["id","Employee ID","First Name",'MI','Last Name','SSN',"COBRA"],colModel:[{name:"id",width:50,hidden:true},{name:"emp_id",width:130},{name:"e_fname",width:110},{name:"e_mi",width:30,search:false},{name:"e_lname",width:110},{name:"e_ssn",width:110},{name:"cobra",width:110,formatter:"checkbox",align:"center",search:false}],pager:"#pager",loadonce:true,rowNum:10000,sortname:"id",sortorder:"asc",rowList:[], // disable page size dropdown
pgbuttons:false, // disable page control like next, back button
pgtext:null, // disable pager text like 'Page 0 of 10'
viewrecords:true, // disable current view record text like 'View 1-10 of 100' 
gridview:true,height:520,autowidth:true,shrinkToFit:false,ignoreCase:true,autoencode:true,caption:"Employees",ondblClickRow:function ondblClickRow(rowid){goToEmployee();}});$("#list").jqGrid('navGrid',"#pager",{edit:false,add:false,del:false}).jqGrid('filterToolbar',{defaultSearch:'cn'});});break;case "wFSA": //console.log("wAppr");
$('#list').jqGrid('GridUnload');$(function(){$("#list").jqGrid({url:"eFilterWFSA",datatype:"json",mtype:"GET",colNames:["id","Employee ID","First Name",'MI','Last Name','SSN','FSA Med. Ann. Election $','FSA DepCare Ann. Election $'],colModel:[{name:"id",width:50,hidden:true},{name:"emp_id",width:130},{name:"e_fname",width:110},{name:"e_mi",width:30,search:false},{name:"e_lname",width:110},{name:"e_ssn",width:110},{name:"flex_med_yramt",width:210,align:"center"},{name:"flex_depcare_yramt",width:210,align:"center"}],pager:"#pager",loadonce:true,rowNum:10000,sortname:"id",sortorder:"asc",rowList:[], // disable page size dropdown
pgbuttons:false, // disable page control like next, back button
pgtext:null, // disable pager text like 'Page 0 of 10'
viewrecords:true, // disable current view record text like 'View 1-10 of 100' 
gridview:true,height:520,autowidth:true,shrinkToFit:false,ignoreCase:true,autoencode:true,caption:"Employees",ondblClickRow:function ondblClickRow(rowid){goToEmployee();}});$("#list").jqGrid('navGrid',"#pager",{edit:false,add:false,del:false}).jqGrid('filterToolbar',{defaultSearch:'cn'});});break;case "inActEnr": // inactive enrollees
//console.log("inActEnr");
$('#list').jqGrid('GridUnload');$(function(){$("#list").jqGrid({url:"eFilterinActEnr",datatype:"json",mtype:"GET",colNames:["id","Employee ID","First Name",'MI','Last Name','SSN'],colModel:[{name:"id",width:50,hidden:true},{name:"emp_id",width:130},{name:"e_fname",width:110},{name:"e_mi",width:30,search:false},{name:"e_lname",width:110},{name:"e_ssn",width:110}],pager:"#pager",loadonce:true,rowNum:10000,sortname:"id",sortorder:"asc",rowList:[], // disable page size dropdown
pgbuttons:false, // disable page control like next, back button
pgtext:null, // disable pager text like 'Page 0 of 10'
viewrecords:true, // disable current view record text like 'View 1-10 of 100' 
gridview:true,height:520,autowidth:true,shrinkToFit:false,ignoreCase:true,autoencode:true,caption:"Employees",ondblClickRow:function ondblClickRow(rowid){goToEmployee();}});$("#list").jqGrid('navGrid',"#pager",{edit:false,add:false,del:false}).jqGrid('filterToolbar',{defaultSearch:'cn'});});break;case "newEnr": // new enrollment status
//console.log("newEnr");
$('#list').jqGrid('GridUnload');$(function(){$("#list").jqGrid({url:"eFilterNewEnr",datatype:"json",mtype:"GET",colNames:["id","Employee ID","First Name",'MI','Last Name','SSN','DOH','Term Date','NE Start Date','NE End Date','New Hire','In NE Window Now','Days Until In NE Window','Days Left In NE Win','Lapsed NE Window','OE Start Date','OE End Date','In OE Window'],colModel:[{name:"id",width:50,hidden:true},{name:"emp_id",width:130},{name:"e_fname",width:110},{name:"e_mi",width:30,search:false},{name:"e_lname",width:110},{name:"e_ssn",width:110},{name:"doh",width:90},{name:"term_date",width:90},{name:"NEStartDate",width:90},{name:"NEEndDate",width:90},{name:"isNewHire",width:90},{name:"inNeWindowNow",width:130},{name:"daysUntilInNeWindow",width:170},{name:"daysLeftInNeWin",width:130},{name:"lapsedNeWindow",width:130},{name:"oestart",width:90},{name:"oeend",width:90},{name:"inOEwindow",width:130}],pager:"#pager",loadonce:true,rowNum:10000,sortname:"id",sortorder:"asc",rowList:[], // disable page size dropdown
pgbuttons:false, // disable page control like next, back button
pgtext:null, // disable pager text like 'Page 0 of 10'
viewrecords:true, // disable current view record text like 'View 1-10 of 100' 
gridview:true,height:520,autowidth:true,shrinkToFit:false,ignoreCase:true,autoencode:true,caption:"Employees",ondblClickRow:function ondblClickRow(rowid){ //alert(rowid);
goToEmployee();}});$("#list").jqGrid('navGrid',"#pager",{edit:false,add:false,del:false}).jqGrid('filterToolbar',{defaultSearch:'cn'});});break;case "waived": //console.log("waived");
$('#list').jqGrid('GridUnload');$(function(){$("#list").jqGrid({url:"eFilterWaived",datatype:"json",mtype:"GET",colNames:["id","Employee ID","First Name",'MI','Last Name','SSN','Waived Coverage','Waived Date'],colModel:[{name:"id",width:50,hidden:true},{name:"emp_id",width:130},{name:"e_fname",width:110},{name:"e_mi",width:30,search:false},{name:"e_lname",width:110},{name:"e_ssn",width:110},{name:"waived_coverage",align:"center",width:130},{name:"waived_date",width:110}],pager:"#pager",loadonce:true,rowNum:10000,sortname:"id",sortorder:"asc",rowList:[], // disable page size dropdown
pgbuttons:false, // disable page control like next, back button
pgtext:null, // disable pager text like 'Page 0 of 10'
viewrecords:true, // disable current view record text like 'View 1-10 of 100' 
gridview:true,height:520,autowidth:true,shrinkToFit:false,ignoreCase:true,autoencode:true,caption:"Employees",ondblClickRow:function ondblClickRow(rowid){goToEmployee();}});$("#list").jqGrid('navGrid',"#pager",{edit:false,add:false,del:false}).jqGrid('filterToolbar',{defaultSearch:'cn'});});break;}}); // END Employee List FILTERS
exports.goToEmployee = goToEmployee;

},{"./utils_spa":7}],5:[function(require,module,exports){
//
// EMPLOYEES TAB
//
'use strict';var _utils_spa=require('./utils_spa'); //console.log("tab_employee.blade.php with emp_id: " + emp_id);
// Populate Employee Tab on initial load for siteEmployees
// if liEmp_ID exists and is
if(typeof liEmp_ID !== 'undefined' && liGroupName == 'siteEmployee'){var empData=_utils_spa.ajxPopulateEmp(liEmp_ID);empData.done(function(data){ /* code for when the data is back */ //console.log("\n returned empData");
//console.log(empData.responseJSON);
//console.log("histChanged: " + empData.responseJSON.changed);
//var histChanged = empData.responseJSON.changed;
});} // add a new employee
$("#addNewEmp").on("click",function(){ //console.log("addNewEmp clicked");
_utils_spa.ChkLogin();_utils_spa.NewEmp();}); // save new employee
$(document).on("click","#saveNewEmp",function(){ //alert("saveNewEmp");
_utils_spa.ChkLogin();var formdata=$("#frmEmp").serialize();$.ajax({url:"/employeeTab/saveNewEmp",type:"POST",dataType:"json",data:formdata,success:function success(data){ //console.log(data);
if(data.returnStatus == "success"){ // console.log("success from saveNewEmp");
growlCenterSuccess("New Employee Saved Successfully"); // $("#tab-bens").removeClass("hide");
// $("#tab-deps").removeClass("hide");
$("#list").setGridParam({datatype:'json',page:1}).trigger('reloadGrid');setTimeout(function(){ // resort grid
$('#list').jqGrid('setGridParam',{sortname:'e_lname',sortorder:'asc'}).trigger('reloadGrid',[{page:1}]);},1500);}else if(data.returnStatus == "fail"){var obj=data.message; //console.log(data.message);
var msg="";$.each(obj,function(key,value){msg = msg + value + "<br /><br />"; //console.log(key + ": " + value);
});growlCenterDanger(msg);}else if(data.returnStatus == "failEmpID"){growlCenterDanger(data.message);}},error:function error(_error){console.log("Error:");console.log(_error);}});}); // save employee changes by admin
$(document).on("click","#saveAllEmpChanges",function(){ //console.log("enter saveAllEmpChanges click handler");
_utils_spa.ChkLogin();var formdata=$("#frmEmp").serialize(); // ajax call to get data
$.ajax({url:"/employeeTab/store",type:"POST",dataType:"json",data:formdata,success:function success(data){if(data.returnStatus == "success"){ //console.log("Saved Successfully saveAllEmpChanges ajax return");
// refresh grid
$("#list").setGridParam({datatype:'json',page:1}).trigger('reloadGrid');setTimeout(function(){ // resort grid
$('#list').jqGrid('setGridParam',{sortname:'e_lname',sortorder:'asc'}).trigger('reloadGrid',[{page:1}]);},1500);growlCenterSuccess("Employees changes saved successfully");var emp_id=$("#emp_id").val();var empData2=_utils_spa.ajxPopulateEmp(emp_id);empData2.done(function(data){ // set button visible/hidden state
var buttonArray={'addNewEmp':'show','saveNewEmp':'hide','saveAllEmpChanges':'show','discardAllChanges':'hide','submitEmpChanges':'hide','EmpAwaitingApproval':'hide'};_utils_spa.EmpButtons(false,buttonArray);});var arr2=['emp_id','e_fname','e_lname','e_mi','e_ssn','e_gender','e_marital_status','e_dob','doh','term_date','e_addr1','e_addr2','e_city','e_state','e_zip','e_phone1','e_phone2','e_email','retiree','out_of_state','biometric','emp_comments'];$.each(arr2,function(index,value){$("#hdiv_" + value).addClass("hide");});}else if(data.returnStatus == "fail"){ //console.log(data.message);
var obj=data.message;var msg="";$.each(obj,function(key,value){msg = msg + value + "<br /><br />"; //console.log(key + ": " + value);
});growlCenterDanger(msg);}},error:function error(_error2){console.log("Error:");console.log(_error2);}});}); // save employee changes
$(document).on("click","#submitEmpChanges",function(){ //console.log("enter submitEmpChanges click handler");
_utils_spa.ChkLogin();var formdata=$("#frmEmp").serialize(); // ajax call to get data
$.ajax({url:"/employeeTab/store",type:"POST",dataType:"json",data:formdata,success:function success(data){ //console.log(data);
if(data.returnStatus == "success"){ //console.log("success returned from ajax");
// refresh grid
$("#list").setGridParam({datatype:'json',page:1}).trigger('reloadGrid');setTimeout(function(){ // resort grid
$('#list').jqGrid('setGridParam',{sortname:'e_lname',sortorder:'asc'}).trigger('reloadGrid',[{page:1}]);},1500); //console.log("Saved Successfully submitEmpChanges ajax return");
growlCenterSuccess("Employees changes saved successfully");var emp_id=$("#emp_id").val();_utils_spa.ajxPopulateEmp(emp_id); // set button visible/hidden state
var buttonArray={'addNewEmp':'hide','saveNewEmp':'hide','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'hide','EmpAwaitingApproval':'show'};_utils_spa.EmpButtons(buttonArray);empButtonMode = "waitingApproval";}else if(data.returnStatus == "fail"){ //console.log(data.message);
var obj=data.message;var msg="";$.each(obj,function(key,value){msg = msg + value + "<br /><br />"; //console.log(key + ": " + value);
});growlCenterDanger(msg);}},error:function error(_error3){console.log("Error:");console.log(_error3);}});}); // discard all changes and restore from history
$(document).on("click",".discardAllChanges",function(){ //alert("discardAllChanges");
//console.log($("#id").val());
_utils_spa.ChkLogin();var r=confirm("Are you sure you want to Discard ALL Changes? \n\nThis will discard ALL requested changes to the \nEmployee, Benefits and Dependents tabs\nand restore the latest history record.");if(r === true){var id=$("#id").val();var emp_id=$("#emp_id").val();$.ajax({url:"/employeeTab/discardAllChanges",type:"GET",dataType:"json",data:{"id":id,"emp_id":emp_id},success:function success(data){ //console.log("return from discardAllChanges");
//console.log(data);
if(data.discardSuccess === "true"){ //console.log("successful save of reverted changes");
_utils_spa.ajxPopulateEmp(emp_id);_utils_spa.ClearHideEmpHistory();ajxPopulateBens(emp_id);ClearHideBenHistory();ajxPopulateDeps(emp_id);ClearHideDepHistory();_utils_spa.ActivateTab('emp');growlCenterSuccess("All requested changes have been Discarded.");}else { //console.log("There was a problem reverting Employee changes, Please see the Admin.");
growlCenterDanger("There was a problem reverting All changes, Please see the Admin.");}},error:function error(_error4){console.log("Error:");console.log(_error4);}});} // end if
});

},{"./utils_spa":7}],6:[function(require,module,exports){
//
// INIT SPA
//
'use strict';var _utils_spa=require('./utils_spa');$('input, textarea').placeholder();$('#notification-msg').delay(5000).fadeOut(5000); // show ajax loading gif
$(document).ajaxStart(function(){$('#quote-loading').removeClass("hide"); // show the gif image when ajax starts
}).ajaxStop(function(){$('#quote-loading').addClass("hide");}); // set active tab based on url passed
if(typeof activateTab !== "undefined"){_utils_spa.ActivateTab(activateTab); //console.log("init.js activateTab: " + activateTab);
} // show window status badge
$("#a-emp").on("click",function(){$("#windowStatus").removeClass('hide');});$("#a-bens").on("click",function(){$("#windowStatus").removeClass('hide');});$("#a-deps").on("click",function(){$("#windowStatus").removeClass('hide');});

},{"./utils_spa":7}],7:[function(require,module,exports){
//
// SPA UTILS
//
"use strict";exports.__esModule = true;exports.fnliGroupName = fnliGroupName;exports.ActivateTab = ActivateTab;exports.ChkLogin = ChkLogin;exports.ClearEmployees = ClearEmployees;exports.ClearHideEmpHistory = ClearHideEmpHistory;exports.NewEmp = NewEmp;exports.ajxPopulateEmp = ajxPopulateEmp;exports.EmpButtons = EmpButtons;exports.ClearHideBenHistory = ClearHideBenHistory;exports.ClearBenefits = ClearBenefits;exports.SetCoverage = SetCoverage;exports.ajxPopulateBens = ajxPopulateBens;exports.BenButtons = BenButtons;exports.ClearDependents = ClearDependents;exports.ClearHideDepHistory = ClearHideDepHistory;exports.ajxPopulateDeps = ajxPopulateDeps;exports.DepsButtons = DepsButtons;exports.ajxPopulateDep = ajxPopulateDep;exports.DepButtons = DepButtons;function fnliGroupName(){ // get liGroupName
var liGroupName="";$.get("/utils/liGroupName",{},function(data){ //console.log("data: " + data);
return data;});} // activate the tab passed in
function ActivateTab(arg){ // pass in siteadmin, emplist, emp, bens, deps
// hide all tabs and pages
$("#tab-siteadmin").removeClass("active");$("#siteadmin").removeClass("active");$("#tab-emplist").removeClass("active");$("#emplist").removeClass("active");$("#tab-emp").removeClass("active");$("#emp").removeClass("active");$("#tab-bens").removeClass("active");$("#bens").removeClass("active");$("#tab-deps").removeClass("active");$("#deps").removeClass("active"); // display the tab and related page
$("#tab-" + arg).addClass("active");$("#" + arg).addClass("active");} // check if user is logged in or redirect
function ChkLogin(){$.ajax({url:"/pub/chkLogin",type:"GET",success:function success(data){ //console.log(data);
if(data.returnStatus == "success"){ //console.log("successful chkLogin");
}else if(data.returnStatus == "failed"){ //console.log("failed chkLogin")
var currurl=window.location.protocol + "//" + window.location.host + "/"; //console.log('url is: ' + currurl);
growlCenterDanger("Session has Timed Out <br />Due to Inactivity. <br />Please Login again.");setTimeout(function(){$(location).attr('href',currurl + 'pub/userid');},5000);}},error:function error(_error){console.log("Error:");console.log(_error);}});} ///////////////////////////
// Employees Functions   //
///////////////////////////
// import { ClearEmployees, ClearHideEmpHistory, NewEmp, ajxPopulateEmp, EmpButtons } from './utils_spa';
// clear all fields in the Employee tab
function ClearEmployees(){ // clear Emp fields
$("#id").val("");$("#curr_emp_id").val("");$("#emp_id").val("");$("#e_fname").val("");$("#e_lname").val("");$("#e_mi").val("");$("#h_emp_id").val("");$("#h_e_fname").val("");$("#h_e_lname").val("");$("#h_e_mi").val("");$("#e_phone1").val("");$("#e_phone2").val("");$("#e_email").val("");$('#retiree').prop('checked',false);$('#out_of_state').prop('checked',false);$('#biometric').prop('checked',false);$("#h_e_phone1").val("");$("#h_e_phone2").val("");$("#h_e_email").val("");$('#h_retiree').prop('checked',false);$('#h_out_of_state').prop('checked',false);$('#h_biometric').prop('checked',false);$("#e_ssn").val("");$("#e_gender").val("");$("#e_marital_status").val("");$("#e_dob").val("");$("#doh").val("");$("#term_date").val("");$("#h_e_ssn").val("");$("#h_e_gender").val("");$("#h_e_marital_status").val("");$("#h_e_dob").val("");$("#h_doh").val("");$("#h_term_date").val("");$("#e_addr1").val("");$("#e_addr2").val("");$("#e_city").val("");$("#e_state").val("SC");$("#e_zip").val("");$("#h_e_addr1").val("");$("#h_e_addr2").val("");$("#h_e_city").val("");$("#h_e_state").val("SC");$("#h_e_zip").val("");$("#emp_comments").val("");$("#h_emp_comments").val("");} // clear and hide history fields
function ClearHideEmpHistory(){ //console.log("inside ClearHideEmpHistory");
var arr=['emp_id','e_fname','e_lname','e_mi','e_ssn','e_gender','e_marital_status','e_dob','doh','term_date','e_addr1','e_addr2','e_city','e_state','e_zip','e_phone1','e_phone2','e_email','retiree','out_of_state','biometric','emp_comments']; // show hidden historical fields if changed is true
$.each(arr,function(index,value){$("#hdiv_" + value).addClass("hide");$("#hdiv_" + value).val(""); //console.log("remove class hide in #hdiv_" + value);   
});} // display for adding a new employee
function NewEmp(){ //console.log("NewEmp clicked");
// show Emp Tab, hide Benefits and Dependents
$("#tab-emp").removeClass('hide');$("#tab-bens").addClass("hide");$("#tab-deps").addClass("hide");ActivateTab("emp"); // select the Employee tab
// set button visible/hidden state
var buttonArray={'addNewEmp':'hide','saveNewEmp':'show','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'hide','EmpAwaitingApproval':'hide'};EmpButtons(false,buttonArray); // clear badge
$("#badge_emp").addClass("hide");ClearEmployees();ClearBenefits();ClearDependents();ClearHideEmpHistory();ClearHideBenHistory();ClearHideDepHistory(); // clear tint
$("#a-emp").css("background-color","#FFFFFF");} // display for adding a new employee
function ajxPopulateEmp(emp_id){ //console.log("ajxPopulateEmp emp_id: " + emp_id);
//console.log("liGroupName: " + liGroupName);
// Populate employee tab, ajax call to get data
return $.ajax({url:"/employeeTab/show/" + emp_id,type:"GET",dataType:"json", //data: {"emp_id": emp_id},
success:function success(data){if(data.returnStatus == "success"){ //console.log("successful in ajxPopulateEmp");
//console.log(data);
//console.log(JSON.stringify(data));
// show Emp Tab
$("#tab-emp").removeClass('hide');$("#tab-bens").removeClass('hide');$("#tab-deps").removeClass('hide');var initEmpBtns=''; // populate Emp Tab fields
//console.log("\nPopulate fields");
// tint tabs with records needing approval
if(typeof data.emp !== 'undefined'){if(data.emp.awaitingApproval === true){$("#a-emp").css("background-color","#FFFFAA");}else {$("#a-emp").css("background-color","#FFFFFF");}} // populate Name Badges tabs in headings
//console.log(data.perms.aWindow);
var tooltip_text=''; // Welcome to Open Enrollment window
if(data.perms.aWindow.inOeWindowNow == "true" && data.perms.aWindow.inNeWindowNow == "false"){$("#windowStatus").removeClass('hide');$("#windowStatus").html("Welcome to Open Enrollment");tooltip_text = "Open Enrollment is from:\n" + data.perms.aWindow.oestart + "\nto:\n" + data.perms.aWindow.oeend;$("#windowStatus").attr('title',tooltip_text);}else if(data.perms.aWindow.inNeWindowNow == "true"){ // if IN New Enrollee window
$("#windowStatus").removeClass('hide');$("#windowStatus").html("Welcome to Open Enrollment");tooltip_text = "Open Enrollment is from:\n" + data.perms.aWindow.oestart + "\nto:\n" + data.perms.aWindow.oeend;tooltip_text += "\n\nNew Enrollee start date is:\n" + data.perms.aWindow.NEStartDate + "\nto\n" + data.perms.aWindow.NEEndDate;$("#windowStatus").attr('title',tooltip_text);}else {$("#windowStatus").removeClass('hide');$("#windowStatus").html("Welcome");tooltip_text = "Open Enrollment is from:\n" + data.perms.aWindow.oestart + "\nto:\n" + data.perms.aWindow.oeend;$("#windowStatus").attr('title',tooltip_text);}if(data.emp.e_mi){$("#badge_emp").html(data.emp.e_fname + " " + data.emp.e_mi + ". " + data.emp.e_lname + "<br />ID: " + data.emp.emp_id);$("#badge_ben").html(data.emp.e_fname + " " + data.emp.e_mi + ". " + data.emp.e_lname + "<br />ID: " + data.emp.emp_id);$("#badge_emp_deps").html(data.emp.e_fname + " " + data.emp.e_mi + ". " + data.emp.e_lname + "<br />ID: " + data.emp.emp_id);$("#badge_emp_dep").html(data.emp.e_fname + " " + data.emp.e_mi + ". " + data.emp.e_lname + "<br />ID: " + data.emp.emp_id);}else {$("#badge_emp").html(data.emp.e_fname + " " + data.emp.e_lname + "<br />ID: " + data.emp.emp_id);$("#badge_ben").html(data.emp.e_fname + " " + data.emp.e_lname + "<br />ID: " + data.emp.emp_id);$("#badge_emp_deps").html(data.emp.e_fname + " " + data.emp.e_lname + "<br />ID: " + data.emp.emp_id);$("#badge_emp_dep").html(data.emp.e_fname + " " + data.emp.e_lname + "<br />ID: " + data.emp.emp_id);} // populate live Employee fields
$("#id").val(data.emp.id);$("#emp_id").val(data.emp.emp_id);$("#curr_emp_id").val(data.emp.emp_id);$("#e_fname").val(data.emp.e_fname);$("#e_lname").val(data.emp.e_lname);$("#e_mi").val(data.emp.e_mi);$("#e_phone1").val(data.emp.e_phone1);$("#e_phone2").val(data.emp.e_phone2);$("#e_email").val(data.emp.e_email);if(data.emp.retiree == "1"){$('#retiree').prop('checked',true);}else {$('#retiree').prop('checked',false);}if(data.emp.out_of_state == "1"){$('#out_of_state').prop('checked',true);}else {$('#out_of_state').prop('checked',false);}if(data.emp.biometric == "1"){$('#biometric').prop('checked',true);}else {$('#biometric').prop('checked',false);}$("#e_ssn").val(data.emp.e_ssn);$("#e_gender").val(data.emp.e_gender);$("#e_marital_status").val(data.emp.e_marital_status);$("#e_dob").val(data.emp.e_dob);$("#doh").val(data.emp.doh);$("#term_date").val(data.emp.term_date);$("#e_addr1").val(data.emp.e_addr1);$("#e_addr2").val(data.emp.e_addr2);$("#e_city").val(data.emp.e_city);$("#e_state").val(data.emp.e_state);$("#e_zip").val(data.emp.e_zip);$("#emp_comments").val(data.emp.emp_comments); // populate Historical Employee fields
var changed=false; // initialize and then check below
if(data.he){ //console.log("history records exist for Employee Tab");
$("#h_emp_id").val(data.he.emp_id);$("#h_curr_emp_id").val(data.he.emp_id);$("#h_e_fname").val(data.he.e_fname);$("#h_e_lname").val(data.he.e_lname);$("#h_e_mi").val(data.he.e_mi);$("#h_e_phone1").val(data.he.e_phone1);$("#h_e_phone2").val(data.he.e_phone2);$("#h_e_email").val(data.he.e_email);if(data.he.retiree == "1"){$('#h_retiree').prop('checked',true);}else {$('#h_retiree').prop('checked',false);}if(data.he.out_of_state == "1"){$('#h_out_of_state').prop('checked',true);}else {$('#h_out_of_state').prop('checked',false);}if(data.he.biometric == "1"){$('#h_biometric').prop('checked',true);}else {$('#h_biometric').prop('checked',false);}$("#h_e_ssn").val(data.he.e_ssn);$("#h_e_gender").val(data.he.e_gender);$("#h_e_marital_status").val(data.he.e_marital_status);$("#h_e_dob").val(data.he.e_dob);$("#h_doh").val(data.he.doh);$("#h_term_date").val(data.he.term_date);$("#h_e_addr1").val(data.he.e_addr1);$("#h_e_addr2").val(data.he.e_addr2);$("#h_e_city").val(data.he.e_city);$("#h_e_state").val(data.he.e_state);$("#h_e_zip").val(data.he.e_zip);$("#h_emp_comments").val(data.he.emp_comments); // Show different History Diffs bg to Yellow and read only
var arr=['emp_id','e_fname','e_lname','e_mi','e_ssn','e_gender','e_marital_status','e_dob','doh','term_date','e_addr1','e_addr2','e_city','e_state','e_zip','e_phone1','e_phone2','e_email','retiree','out_of_state','biometric','emp_comments'];$.each(arr,function(index,value){if(data.emp[value] != data.he[value] && data.emp.updated_at > data.emp.approved_at){ //console.log("CHANGED difference: " + data.emp[value] + "|" + data.he[value]);
changed = true;$("#h_" + value).removeClass("hist-bg").addClass("hist-bg-chgd");$("#h_" + value).prop('readonly',false); // needed to allow bg color change
$("#h_" + value).attr("disabled",false); // needed to allow bg color change
}else { //console.log(data.emp[value] + "|" + data.he[value]);
$("#h_" + value).prop('readonly',true);$("#h_" + value).attr("disabled",'disabled');}}); // show hidden historical fields if changed is true
if(changed){$.each(arr,function(index,value){$("#hdiv_" + value).removeClass("hide"); //console.log("remove class hide in #hdiv_" + value);   
});} //console.log("end data.he");
}else {ClearHideEmpHistory(); //console.log("end else of data.he");
} //
// SET BUTTONS on Employee tab populate
//
var liGroupName=fnliGroupName(); //console.log("liGroupName: " + liGroupName);
//console.log("changed: " + changed);
if((liGroupName == "tccAdmin" || liGroupName == "tccPowerUser" || liGroupName == "siteAdmin") && changed === false){ //console.log("ajxPopulateEmp init emp buttons for admins where history changed false");
// set button visible/hidden state
initEmpBtns = {'addNewEmp':'show','saveNewEmp':'hide','saveAllEmpChanges':'show','discardAllChanges':'hide','submitEmpChanges':'hide','EmpAwaitingApproval':'hide'};EmpButtons(false,initEmpBtns);}else if((liGroupName == "tccAdmin" || liGroupName == "tccPowerUser" || liGroupName == "siteAdmin") && changed === true){ //console.log("ajxPopulateEmp init emp buttons for admins where history changed true");
// set button visible/hidden state
initEmpBtns = {'addNewEmp':'show','saveNewEmp':'hide','saveAllEmpChanges':'show','discardAllChanges':'show','submitEmpChanges':'hide','EmpAwaitingApproval':'hide'};EmpButtons(true,initEmpBtns);}else if(liGroupName == "sitePowerUser" && changed === true){ //console.log("ajxPopulateEmp init emp buttons for sitePoweruser where history changed true");
// set button visible/hidden state
initEmpBtns = {'addNewEmp':'show','saveNewEmp':'hide','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'hide','EmpAwaitingApproval':'show'};EmpButtons(true,initEmpBtns);}else if(liGroupName == "sitePowerUser" && changed === false){ // set button visible/hidden state
//console.log("ajxPopulateEmp init emp buttons for sitePowerUser where history changed false");
initEmpBtns = {'addNewEmp':'show','saveNewEmp':'hide','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'show','EmpAwaitingApproval':'hide'};EmpButtons(false,initEmpBtns);}else if(liGroupName == "siteEmployee" && changed === true){ //console.log("ajxPopulateEmp init emp buttons for siteEmployee where history changed true");
// set button visible/hidden state
initEmpBtns = {'addNewEmp':'hide','saveNewEmp':'hide','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'hide','EmpAwaitingApproval':'show'};EmpButtons(true,initEmpBtns);}else if(liGroupName == "siteEmployee" && changed === false){ //console.log("ajxPopulateEmp init emp buttons for siteEmployee where history changed false");
// set button visible/hidden state
initEmpBtns = {'addNewEmp':'hide','saveNewEmp':'hide','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'show','EmpAwaitingApproval':'hide'};EmpButtons(false,initEmpBtns);}else if(liGroupName == "tccSupport"){ //console.log("ajxPopulateEmp init emp buttons for tccSupport");
// set button visible/hidden state
initEmpBtns = {'addNewEmp':'hide','saveNewEmp':'hide','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'hide','EmpAwaitingApproval':'hide'};EmpButtons(undefined,initEmpBtns);} //console.log("edit: " + data.perms.empTabPerms.edit + "  awaitingApproval: " + data.emp.awaitingApproval);
//
// SET FIELD PERMISSIONS BY GROUP ...no field restrictions for tccAdmin, tccPowerUser, siteAdmin or sitePowerUser
//                                   tccSupport can view all fields but no SAVE buttons appear
// Set fields for liGroupName siteEmployee
var arrFields=[];if(liGroupName == "siteEmployee"){ //console.log("ajxPopulateEmp user is in siteEmployee liGroupName");
//console.log(data.perms);
// check EnrolleeMode mode and window status; edit reflects window mode and window statuses
if(data.perms.empTabPerms.edit == "true" && data.emp.awaitingApproval === false){ //console.log("edit true AND awaiting approval false");
// editing is allow except for always RO fields
arrFields = ['emp_id','e_fname','e_mi','e_lname','e_ssn','e_gender','e_marital_status','doh','term_date','emp_comments'];$.each(arrFields,function(index,value){$("#" + value).prop('readonly',true);});$('#e_gender option:not(:selected)').attr('disabled',true);$('#e_marital_status option:not(:selected)').attr('disabled',true);$('#retiree').click(function(evt){evt.preventDefault();});$('#out_of_state').click(function(evt){evt.preventDefault();});$('#biometric').click(function(evt){evt.preventDefault();});}else if(data.perms.empTabPerms.edit == "false" || data.emp.awaitingApproval === true){ //console.log("edit false OR awaiting approval true");
arrFields = ['emp_id','e_fname','e_mi','e_lname','e_ssn','e_gender','e_marital_status','e_dob','doh','term_date','e_addr1','e_addr2','e_city','e_state','e_zip','e_phone1','e_phone2','e_email','emp_comments'];$.each(arrFields,function(index,value){$("#" + value).prop('readonly',true);});$('#e_gender option:not(:selected)').attr('disabled',true);$('#e_marital_status option:not(:selected)').attr('disabled',true);$('#retiree').click(function(evt){evt.preventDefault();});$('#out_of_state').click(function(evt){evt.preventDefault();});$('#biometric').click(function(evt){evt.preventDefault();});}} //console.log( "\najax data");
//console.log(data);
}else if(data.returnStatus == "fail"){console.log("failed");} // console.log(data);
},error:function error(_error2){console.log("Error:");console.log(_error2);}});} // Button manager show / hide buttons at top of Employee Tab
function EmpButtons(changed,argSetEmpBtns){ //console.log("\nentered fnEmpButtonMode with histChanged: " + histChanged + " and setEmpBtns:");
//console.log(setEmpBtns);
var histChanged=typeof changed !== 'undefined'?changed:false; //
// INITIALIZE button array when buttonArray no supplied
//
var setEmpBtns="";if(typeof argSetEmpBtns == 'undefined'){ //console.log("EmpButtons function, argSetEmpBtns is undefined");
//console.log(liGroupName);
if((liGroupName == "tccAdmin" || liGroupName == "tccPowerUser" || liGroupName == "siteAdmin") && histChanged === false){setEmpBtns = {'addNewEmp':'show','saveNewEmp':'hide','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'hide','EmpAwaitingApproval':'hide'};}else if((liGroupName == "tccAdmin" || liGroupName == "tccPowerUser" || liGroupName == "siteAdmin") && histChanged === true){setEmpBtns = {'addNewEmp':'hide','saveNewEmp':'hide','saveAllEmpChanges':'show','discardAllChanges':'show','submitEmpChanges':'hide','EmpAwaitingApproval':'hide'};}else if(liGroupName == "sitePowerUser" && histChanged === false){setEmpBtns = {'addNewEmp':'hide','saveNewEmp':'hide','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'show','EmpAwaitingApproval':'hide'};}else if(liGroupName == "sitePowerUser" && histChanged === true){setEmpBtns = {'addNewEmp':'hide','saveNewEmp':'hide','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'hide','EmpAwaitingApproval':'show'};}else if(liGroupName == "siteEmployee" && histChanged === false){setEmpBtns = {'addNewEmp':'hide','saveNewEmp':'hide','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'show','EmpAwaitingApproval':'hide'};}else if(liGroupName == "siteEmployee" && histChanged === true){setEmpBtns = {'addNewEmp':'hide','saveNewEmp':'hide','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'hide','EmpAwaitingApproval':'show'};}else if(liGroupName == "tccSupport"){setEmpBtns = {'addNewEmp':'hide','saveNewEmp':'hide','saveAllEmpChanges':'hide','discardAllChanges':'hide','submitEmpChanges':'hide','EmpAwaitingApproval':'hide'};}}else {setEmpBtns = argSetEmpBtns;} // END INITIALIZE
$.each(setEmpBtns,function(index,value){ //  console.log("\n" + index + "|" + value);
if(value == 'show'){$("#" + index).removeClass("hide"); // console.log(index + ' : show');
}else if(value == 'hide'){$("#" + index).addClass("hide"); //  console.log(index + ' : hide');
}});} ///////////////////////////
// Benefits Functions    //
///////////////////////////
// import { ClearHideBenHistory, ClearBenefits, SetCoverage, ajxPopulateBens, BenButtons } from './utils_spa';
// clear and hide history fields
function ClearHideBenHistory(){ //console.log("inside ClearHideBenHistory");
var arrBenHistFields=['ben_eff_date','plan_eff_date','qual_event','cobra','plan_no','coverage','waive_coverage','waive_date','waive_sig','en_med_den','flex_med','flex_med_periods','flex_med_prdamt','flex_med_yramt','flex_depcare','flex_depcare_periods','flex_depcare_prdamt','flex_depcare_yramt','s_med_den','d_med_den','ben_comments']; // show hidden historical fields if changed is true
$.each(arrBenHistFields,function(index,value){$("#hdiv_" + value).addClass("hide");$("#hdiv_" + value).val(""); //console.log("remove class hide in #hdiv_" + value);   
});} // clear all fields in the Benefits tab
function ClearBenefits(){$("#ben_eff_date").val("");$("#plan_eff_date").val("");$("#qual_event").val("");$('#cobra').prop('checked',false);$("#plan_no").val("");$("#h_ben_eff_date").val("");$("#h_plan_eff_date").val("");$("#h_qual_event").val("");$('#h_cobra').prop('checked',false);$("#h_plan_no").val("");$("#coverage").val("");$('#waive_coverage').prop('checked',false);$("#waive_date").val("");$("#waive_sig").val("");$("#h_coverage").val("");$('#h_waive_coverage').prop('checked',false);$("#h_waive_date").val("");$("#h_waive_sig").val("");$('#en_med_den').prop('checked',false);$('#flex_med').prop('checked',false);$("#flex_med_periods").val("");$("#flex_med_prdamt").val("");$("#flex_med_yramt").val("");$('#h_en_med_den').prop('checked',false);$('#h_flex_med').prop('checked',false);$("#h_flex_med_periods").val("");$("#h_flex_med_prdamt").val("");$("#h_flex_med_yramt").val("");$('#flex_depcare').prop('checked',false);$("#flex_depcare_periods").val("");$("#flex_depcare_prdamt").val("");$("#flex_depcare_yramt").val("");$('#h_flex_depcare').prop('checked',false);$("#h_flex_depcare_periods").val("");$("#h_flex_depcare_prdamt").val("");$("#h_flex_depcare_yramt").val("");$('#s_med_den').prop('checked',false);$('#h_s_med_den').prop('checked',false);$('#d_med_den').prop('checked',false);$('#h_d_med_den').prop('checked',false);$("#h_ben_comments").val("");} // set checkboxes to match Coverage drop down
function SetCoverage(filter){switch(filter){case "e": //console.log("e");
$('#en_med_den').prop('disabled',false);$("#en_med_den").prop("checked",true);$('#s_med_den').prop('disabled',false);$("#s_med_den").prop("checked",false);$('#d_med_den').prop('disabled',false);$("#d_med_den").prop("checked",false);break;case "s": //console.log("s");
$('#en_med_den').prop('disabled',false);$("#en_med_den").prop("checked",true);$('#s_med_den').prop('disabled',false);$("#s_med_den").prop("checked",true);$('#d_med_den').prop('disabled',false);$("#d_med_den").prop("checked",false);break;case "c": //console.log("c");
$('#en_med_den').prop('disabled',false);$("#en_med_den").prop("checked",true);$('#s_med_den').prop('disabled',false);$("#s_med_den").prop("checked",false);$('#d_med_den').prop('disabled',false);$("#d_med_den").prop("checked",true);break;case "f": //console.log("f");
$('#en_med_den').prop('disabled',false);$("#en_med_den").prop("checked",true);$('#s_med_den').prop('disabled',false);$("#s_med_den").prop("checked",true);$('#d_med_den').prop('disabled',false);$("#d_med_den").prop("checked",true);break;}} // populate the Benefits tab
var loaded_ben_eff_date="";exports.loaded_ben_eff_date = loaded_ben_eff_date;function ajxPopulateBens(emp_id){exports.loaded_ben_eff_date = loaded_ben_eff_date = ""; //console.log("populate bens in benefits.js");
return $.ajax({url:"/benefitsTab/show/" + emp_id,type:"GET",dataType:"json",success:function success(data){if(data.returnStatus == "success"){ //console.log("ajxPopulateBens successful");
//console.log(data);
// employee tab has Records or not ?
var emptyRecord=data.emptyRecord;var setBenBtns={};if(emptyRecord == 'yes'){ // do not populate fields, show save benefits button
BenButtons(); // initialize buttons
}else if(emptyRecord == 'no'){ //console.log("\nPopulate Benefit fields");
// populate LIVE Benefits Tab
$("#ben_eff_date").val(data.ben.ben_eff_date);if(data.ben.created_at){$("#created_at").val(data.ben.created_at);}$("#plan_eff_date").val(data.ben.plan_eff_date); // set Ben Eff Date and Plan Eff Date initially
var ben_eff_date=$("#ben_eff_date").val();if(ben_eff_date === ""){ //console.log("ben_eff_date empty");
//console.log("ben_eff_date: " + ben_eff_date);
if(data.perms.aWindow.inOeWindowNow == "true" && liGroupName == "siteEmployee"){ //console.log("inOeWindowNow True and siteEmployee");
$("#ben_eff_date").val(data.perms.oe.ben_eff_date);$("#plan_eff_date").val(data.perms.oe.plan_eff_date);} // New Enrollee overrides OE settings above
if(data.perms.aWindow.inNeWindowNow == "true" && liGroupName == "siteEmployee"){ //console.log("inNeWindowNow True and siteEmployee");
$("#ben_eff_date").val(data.perms.aWindow.NEStartDate);$("#plan_eff_date").val(data.perms.aWindow.NEStartDate);}}if(!data.ben.qual_event){$("#qual_event").val("");}else {$("#qual_event").val(data.ben.qual_event);}if(data.ben.cobra == "1"){$('#cobra').prop('checked',true);}else {$('#cobra').prop('checked',false);}$("#plan_no").val(data.ben.plan_no);$("#coverage").val(data.ben.coverage);if(data.ben.waive_coverage == "1"){$('#waive_coverage').prop('checked',true);$('#ben_eff_date').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#plan_eff_date').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#qual_event').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#plan_no').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#coverage').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#waive_coverage').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#waive_date').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");}else {$('#waive_coverage').prop('checked',false);$('#ben_eff_date').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#plan_eff_date').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#qual_event').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#plan_no').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#coverage').siblings('i[class*="glyphicon-asterisk"]').removeClass("hide");$('#waive_coverage').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");$('#waive_date').siblings('i[class*="glyphicon-asterisk"]').addClass("hide");}$("#waive_date").val(data.ben.waive_date);$("#waive_sig").val(data.ben.waive_sig);if(data.ben.en_med == "1" && data.ben.en_den == "1" && data.ben.en_vis == "1"){$('#en_med_den').prop('checked',true);}else {$('#en_med_den').prop('checked',false);}if(data.ben.flex_med == "1"){$('#flex_med').prop('checked',true);}else {$('#flex_med').prop('checked',false);}if(JSON.stringify(data.ben.flex_med_periods) !== "null"){$("#flex_med_periods").val(data.ben.flex_med_periods);}else {$("#flex_med_periods").val('26');}$("#flex_med_prdamt").val(data.ben.flex_med_prdamt);$("#flex_med_yramt").val(data.ben.flex_med_yramt);if(data.ben.flex_depcare == "1"){$('#flex_depcare').prop('checked',true);}else {$('#flex_depcare').prop('checked',false);}if(JSON.stringify(data.ben.flex_depcare_periods) !== "null"){$("#flex_depcare_periods").val(data.ben.flex_depcare_periods);}else {$("#flex_depcare_periods").val('26');}$("#flex_depcare_prdamt").val(data.ben.flex_depcare_prdamt);$("#flex_depcare_yramt").val(data.ben.flex_depcare_yramt);if(data.ben.s_med == "1" && data.ben.s_den == "1" && data.ben.s_vis == "1"){$('#s_med_den').prop('checked',true);}else {$('#s_med_den').prop('checked',false);}if(data.ben.d_med == "1" && data.ben.d_den == "1" && data.ben.d_vis == "1"){$('#d_med_den').prop('checked',true);}else {$('#d_med_den').prop('checked',false);}$("#ben_comments").val(data.ben.ben_comments); // populate Historical Benefits fields
var changed=false;if(data.he){ //console.log("history records exist for Benefit Tab");
$("#h_ben_eff_date").val(data.he.ben_eff_date);$("#h_plan_eff_date").val(data.he.plan_eff_date);if(!data.he.qual_event){$("#h_qual_event").val("");}else {$("#h_qual_event").val(data.he.qual_event);}if(data.he.cobra == "1"){$('#h_cobra').prop('checked',true);}else {$('#h_cobra').prop('checked',false);}$("#h_plan_no").val(data.he.plan_no);$("#h_coverage").val(data.he.coverage);if(data.he.waive_coverage == "1"){$('#h_waive_coverage').prop('checked',true);}else {$('#h_waive_coverage').prop('checked',false);}$("#h_waive_date").val(data.he.waive_date);$("#h_waive_sig").val(data.he.waive_sig);if(data.he.en_med == "1" && data.he.en_den == "1" && data.he.en_vis == "1"){$('#h_en_med_den').prop('checked',true);}else {$('#h_en_med_den').prop('checked',false);}if(data.he.flex_med == "1"){$('#h_flex_med').prop('checked',true);}else {$('#h_flex_med').prop('checked',false);}if(JSON.stringify(data.he.flex_med_periods) !== "null"){$("#h_flex_med_periods").val(data.he.flex_med_periods);}else {$("#h_flex_med_periods").val('26');}$("#h_flex_med_prdamt").val(data.he.flex_med_prdamt);$("#h_flex_med_yramt").val(data.he.flex_med_yramt);if(data.he.flex_depcare == "1"){$('#h_flex_depcare').prop('checked',true);}else {$('#h_flex_depcare').prop('checked',false);}if(JSON.stringify(data.he.flex_depcare_periods) !== "null"){$("#h_flex_depcare_periods").val(data.he.flex_depcare_periods);}else {$("#h_flex_depcare_periods").val('26');}$("#h_flex_depcare_prdamt").val(data.he.flex_depcare_prdamt);$("#h_flex_depcare_yramt").val(data.he.flex_depcare_yramt);if(data.he.s_med == "1" && data.he.s_den == "1" && data.he.s_vis == "1"){$('#h_s_med_den').prop('checked',true);}else {$('#h_s_med_den').prop('checked',false);}if(data.he.d_med == "1" && data.he.d_den == "1" && data.he.d_vis == "1"){$('#h_d_med_den').prop('checked',true);}else {$('#h_d_med_den').prop('checked',false);}$("#h_ben_comments").val(data.he.ben_comments); // Show different History Diffs bg to Yellow and read only
var arrBen=['ben_eff_date','plan_eff_date','qual_event','cobra','plan_no','coverage','waive_coverage','waive_date','waive_sig','en_med_den','flex_med','flex_med_periods','flex_med_prdamt','flex_med_yramt','flex_depcare','flex_depcare_periods','flex_depcare_prdamt','flex_depcare_yramt','s_med_den','d_med_den','ben_comments'];$.each(arrBen,function(index,value){if(data.ben[value] != data.he[value] && data.ben.updated_at > data.ben.approved_at){ //console.log("CHANGED difference: " + value + ": " + data.ben[value] + "|" + data.he[value]);
changed = true;$("#h_" + value).removeClass("hist-bg").addClass("hist-bg-chgd");$("#h_" + value).prop('readonly',false); // needed to allow bg color change
$("#h_" + value).attr("disabled",false); // needed to allow bg color change
}else { //console.log("Readonly: " + data.ben[value] + "|" + data.he[value]);
$("#h_" + value).prop('readonly',true);$("#h_" + value).attr("disabled",'disabled');}}); // show hidden historical fields if changed is true
if(changed){$.each(arrBen,function(index,value){$("#hdiv_" + value).removeClass("hide"); //console.log("remove class hide in #hdiv_" + value);   
});} // tint tabs with records needing approval
if(typeof data.ben !== 'undefined'){if(data.ben.awaitingApproval === true){$("#a-bens").css("background-color","#FFFFAA");}else {$("#a-bens").css("background-color","#FFFFFF");}}}else { // hide all historical fields
//console.log("No Benefit history records exist");
var arrBenHide=['ben_eff_date','plan_eff_date','qual_event','cobra','plan_no','coverage','waive_coverage','waive_date','en_med_den','flex_med','flex_med_periods','flex_med_prdamt','flex_depcare','flex_depcare_periods','flex_depcare_prdamt','flex_depcare_yramt','s_med_den','d_med_den','ben_comments'];$.each(arrBenHide,function(index,value){$("#hdiv_" + value).addClass("hide");$("#hdiv_" + value).val(""); //console.log("add class hide in #hdiv_" + value);  
});} // SET BUTTON STATE
var liGroupName=fnliGroupName(); //console.log("changed: " + changed);
if((liGroupName == "tccAdmin" || liGroupName == "tccPowerUser" || liGroupName == "siteAdmin") && changed === false){setBenBtns = {'saveAllBenChanges':'show','submitAllBenChanges':'hide','discardAllBenChanges':'hide','benAwaitingApproval':'hide'};}else if((liGroupName == "tccAdmin" || liGroupName == "tccPowerUser" || liGroupName == "siteAdmin") && changed === true){setBenBtns = {'saveAllBenChanges':'show','submitAllBenChanges':'hide','discardAllBenChanges':'show','benAwaitingApproval':'hide'};}else if(liGroupName == "sitePowerUser" && changed === false){setBenBtns = {'saveAllBenChanges':'hide','submitAllBenChanges':'show','discardAllBenChanges':'hide','benAwaitingApproval':'hide'};}else if(liGroupName == "sitePowerUser" && changed === true){setBenBtns = {'saveAllBenChanges':'hide','submitAllBenChanges':'hide','discardAllBenChanges':'hide','benAwaitingApproval':'show'};}else if(liGroupName == "siteEmployee" && changed === false && data.perms.bensTabPerms.edit == "true"){setBenBtns = {'saveAllBenChanges':'hide','submitAllBenChanges':'show','discardAllBenChanges':'hide','benAwaitingApproval':'hide'};}else if(liGroupName == "siteEmployee" && changed === false && data.perms.bensTabPerms.edit == "false"){setBenBtns = {'saveAllBenChanges':'hide','submitAllBenChanges':'hide','discardAllBenChanges':'hide','benAwaitingApproval':'hide'};}else if(liGroupName == "siteEmployee" && changed === true){setBenBtns = {'saveAllBenChanges':'hide','submitAllBenChanges':'hide','discardAllBenChanges':'hide','benAwaitingApproval':'show'};}else if(liGroupName == "tccSupport"){setBenBtns = {'saveAllBenChanges':'hide','submitAllBenChanges':'hide','discardAllBenChanges':'hide','benAwaitingApproval':'hide'};} //console.log(setBenBtns);
BenButtons(changed,setBenBtns); //
// SET FIELD PERMISSIONS BY GROUP ...no field restrictions for tccAdmin, tccPowerUser, siteAdmin or sitePowerUser
//
// Set fields for when liGroupName is siteEmployee
var arrBenHistFields=[];if(liGroupName == "siteEmployee"){ //console.log("ajxPopulateBen user is in siteEmployee liGroupName");
//console.log(data.perms);
// check EnrolleeMode mode and window status; edit reflects window mode and window statuses
if(data.perms.bensTabPerms.edit == "true" && data.ben.awaitingApproval === false){ //console.log("edit true AND awaiting approval false");
// editing is allow except for always RO fields
arrBenHistFields = ['ben_eff_date','plan_eff_date','ben_comments'];$.each(arrBenHistFields,function(index,value){$("#" + value).prop('readonly',true);});$('#cobra').click(function(evt){evt.preventDefault();});}else if(data.perms.bensTabPerms.edit == "false" || data.emp.awaitingApproval === true){ //console.log("edit false OR awaiting approval true");
arrBenHistFields = ['ben_eff_date','plan_eff_date','qual_event','plan_no','coverage','waive_coverage','waive_date','waive_sig','flex_med_periods','flex_med_prdamt','flex_med_yramt','flex_depcare_periods','flex_depcare_prdamt','flex_depcare_yramt','ben_comments'];$.each(arrBenHistFields,function(index,value){$("#" + value).prop('readonly',true);});$('#plan_no option:not(:selected)').attr('disabled',true);$('#cobra').click(function(evt){evt.preventDefault();});$('#waive_coverage').click(function(evt){evt.preventDefault();});$('#en_med_den').click(function(evt){evt.preventDefault();});$('#flex_med').click(function(evt){evt.preventDefault();});$('#flex_depcare').click(function(evt){evt.preventDefault();});$('#s_med_den').click(function(evt){evt.preventDefault();});$('#d_med_den').click(function(evt){evt.preventDefault();});}}} // end populate yes
}else if(data.returnStatus == "fail"){console.log("failed");}},error:function error(_error3){console.log("Error:");console.log(_error3);}});} // Button manager show / hide buttons at top of Benefits Tab
function BenButtons(changed,argSetBenBtns){ // saveAllBenChanges, submitAllBenChanges, discardAllBenChanges, benAwaitingApproval
//console.log("entered fnEmpButtonMode");
var histChanged=typeof changed !== 'undefined'?changed:false; // initialize button array when setBenBtns not supplied
var setBenBtns="";if(typeof argSetBenBtns == 'undefined'){setBenBtns = {'saveAllBenChanges':'hide'}; /*if ( ((liGroupName == "tccAdmin") || (liGroupName == "tccPowerUser") || (liGroupName == "siteAdmin"))  && changed === false ){
            setBenBtns = { 'saveAllBenChanges' : 'show'};
        }else if ( ((liGroupName == "tccAdmin") || (liGroupName == "tccPowerUser") || (liGroupName == "siteAdmin"))  && changed === true ){
            setBenBtns = { 'saveAllBenChanges' : 'show'};
        }else if (liGroupName == "sitePowerUser" && changed === false){
            setBenBtns = { 'saveAllBenChanges' : 'show'};
        }else if (liGroupName == "sitePowerUser" && changed === true){
            setBenBtns = { 'saveAllBenChanges' : 'show'};
        }else if (liGroupName == "siteEmployee" && changed === false){
            setBenBtns = { 'saveAllBenChanges' : 'show'};
        }else if (liGroupName == "siteEmployee" && changed === true){
            setBenBtns = { 'saveAllBenChanges' : 'show'};
        }else if (liGroupName == "tccSupport"){
            setBenBtns = { 'saveAllBenChanges' : 'show'};
        }*/}else {setBenBtns = argSetBenBtns;}$.each(setBenBtns,function(index,value){ //console.log("\n" + index + "|" + value);
if(value == 'show'){$("#" + index).removeClass("hide"); //console.log(index + ' : show');
}else if(value == 'hide'){$("#" + index).addClass("hide"); //console.log(index + ' : hide');
}});} ///////////////////////////
// Dependents Functions  //
///////////////////////////
// import { ClearDependents, ClearHideDepHistory, ajxPopulateDeps, DepsButtons, ajxPopulateDep, DepButtons } from './utils_spa';
// clear all fields in the Dependents tab
function ClearDependents(){$("#type").val("");$("#e_relationship").val("");$("#dep_e_fname").val("");$("#dep_e_mi").val("");$("#dep_e_lname").val("");$("#h_type").val("");$("#h_e_relationship").val("");$("#h_dep_e_fname").val("");$("#h_dep_e_mi").val("");$("#h_dep_e_lname").val("");$("#dep_e_gender").val("");$("#dep_e_ssn").val("");$("#dep_e_dob").val("");$("#dep_eff_date").val("");$("#dep_term_date").val("");$("#dep_student").val("");$("#h_dep_e_gender").val("");$("#h_dep_e_ssn").val("");$("#h_dep_e_dob").val("");$("#h_dep_eff_date").val("");$("#h_dep_term_date").val("");$("#h_dep_student").val("");$("#dep_other_cvg").val("");$("#dep_other_cvg_carrier").val("");$("#dep_other_cvg_policy").val("");$("#h_dep_other_cvg").val("");$("#h_dep_other_cvg_carrier").val("");$("#h_dep_other_cvg_policy").val("");$("#dep_comments").val("");$("#h_dep_comments").val("");} // clear and hide history fields
function ClearHideDepHistory(){ //console.log("inside ClearHideDepHistory");
var arrDepHistFields={'type':'type','e_relationship':'e_relationship','e_fname':'dep_e_fname','e_mi':'dep_e_mi','e_lname':'dep_e_lname','e_gender':'dep_e_gender','e_ssn':'dep_e_ssn','e_dob':'dep_e_dob','eff_date':'dep_eff_date','term_date':'dep_term_date','student':'dep_student','other_cvg':'dep_other_cvg','other_cvg_carrier':'dep_other_cvg_carrier','other_cvg_policy':'dep_other_cvg_policy','comments':'dep_comments'};$.each(arrDepHistFields,function(field,elemID){$("#hdiv_h_" + elemID).addClass("hide");$("#hdiv_h_" + elemID).val(""); //console.log("add class hide in #hdiv_" + elemID); 
});} // populate the Dependents tab
function ajxPopulateDeps(emp_id){ //console.log("populate deps in dependents.js, pass in emp_id: " + emp_id);
$("#div_deps").removeClass("hide");$("#div_dep").addClass("hide"); //$("#saveNewDep").addClass("hide");
// ajax call to get data
return $.ajax({url:"/dependentsTab/show/" + emp_id,type:"GET",dataType:"json",success:function success(data){ //console.log("ajxPopulateDeps success /dependentsTab/show/");
//console.log(data);
// show table or no records message
if(typeof data.deps !== 'undefined'){if(data.deps.length > 0){ //console.log("records exist");
$("#depsNoRecords").addClass("hide");$("#depsTable").removeClass("hide");}else { //console.log("no records");
$("#depsNoRecords").removeClass("hide");$("#depsTable").addClass("hide");}} // tint tabs with records needing approval
var depChanged="false";if(typeof data.deps !== 'undefined'){ //console.log("data.deps exists");
// loop over list of dependents
$.each(data.deps,function(key,value){ //console.log("awatingApproval: " + value.awaitingApproval);
if(value.awaitingApproval === true){depChanged = "true";}}); //console.log("depChanged: " + depChanged);
if(depChanged === "true"){$("#a-deps").css("background-color","#FFFFAA");}else {$("#a-deps").css("background-color","#FFFFFF");}}var myTableBody="<tr>";for(var i=0;i < data.deps.length;i++) {if(data.deps[i]["delete"] == "true"){ //console.log( "delete " + data.deps[i].delete);
myTableBody = myTableBody + "<td><button type='button' class='btn btn-danger deldep' data-depid =" + data.deps[i].id + ">Delete</button></td>";}myTableBody = myTableBody + "<td><button type='button' class='btn btn-info' id='editDep'>Edit</button></td>";myTableBody = myTableBody + "<td style='display:none;'>" + data.deps[i].id + "</td>";if(data.deps[i].awaitingApproval === true){myTableBody = myTableBody + "<td>" + "Awaiting Approval" + "</td>";}else {myTableBody = myTableBody + "<td>" + "Approved" + "</td>";}switch(data.deps[i].type){case "D":myTableBody = myTableBody + "<td>Dependent</td>";break;case "S":myTableBody = myTableBody + "<td>Spouse</td>";break;default:myTableBody = myTableBody + "<td></td>";}switch(data.deps[i].e_relationship){case "H":myTableBody = myTableBody + "<td>Husband</td>";break;case "W":myTableBody = myTableBody + "<td>Wife</td>";break;case "S":myTableBody = myTableBody + "<td>Son</td>";break;case "D":myTableBody = myTableBody + "<td>Daughter</td>";break;case "O":myTableBody = myTableBody + "<td>Other</td>";break;default:myTableBody = myTableBody + "<td></td>";}myTableBody = myTableBody + "<td>" + data.deps[i].e_fname + "</td>";myTableBody = myTableBody + "<td>" + data.deps[i].e_mi + "</td>";myTableBody = myTableBody + "<td>" + data.deps[i].e_lname + "</td>";myTableBody = myTableBody + "<td>" + data.deps[i].e_ssn + "</td>";switch(data.deps[i].e_gender){case "m":myTableBody = myTableBody + "<td>Male</td>";break;case "f":myTableBody = myTableBody + "<td>Female</td>";break;default:myTableBody = myTableBody + "<td></td>";}myTableBody = myTableBody + "<td>" + data.deps[i].e_dob + "</td>";myTableBody = myTableBody + "<td>" + data.deps[i].eff_date + "</td>";myTableBody = myTableBody + "<td>" + data.deps[i].term_date + "</td>";myTableBody = myTableBody + "<td>" + data.deps[i].student + "</td>";if(data.deps[i].other_cvg == +'1'){myTableBody = myTableBody + "<td>Yes</td>";}else {myTableBody = myTableBody + "<td></td>";}myTableBody = myTableBody + "<td>" + data.deps[i].other_cvg_carrier + "</td>";myTableBody = myTableBody + "<td>" + data.deps[i].other_cvg_policy + "</td>";myTableBody = myTableBody + "<td>" + data.deps[i].dep_comments + "</td>";myTableBody = myTableBody + "<td>" + data.deps[i].created_at + "</td>";myTableBody = myTableBody + "<td>" + data.deps[i].updated_at + "</td>";myTableBody = myTableBody + "</tr>";}$('#deps-table-body').empty().append(myTableBody); //
// SET BUTTONS on Dependents tab
//
var liGroupName=fnliGroupName(); //console.log(liGroupName);     
var initDepsBtns='';if(liGroupName == "tccAdmin" || liGroupName == "tccPowerUser" || liGroupName == "siteAdmin"){ //console.log("ajxPopulateDeps init dep buttons for admins");
// set button visible/hidden state
initDepsBtns = {'addDep':'show'};}else if(liGroupName == "sitePowerUser"){ //console.log("ajxPopulateDeps init dep buttons for sitePowerUser");
// set button visible/hidden state
initDepsBtns = {'addDep':'show'};}else if(liGroupName == "siteEmployee"){ //console.log("ajxPopulateDeps init dep buttons for siteEmployee");
// set button visible/hidden state
initDepsBtns = {'addDep':'show'};}else if(liGroupName == "tccSupport"){ //console.log("ajxPopulateDeps init dep buttons for tccSupport");
// set button visible/hidden state
initDepsBtns = {'addDep':'hide'};}DepsButtons(undefined,initDepsBtns);},error:function error(_error4){console.log("Error:");console.log(_error4);}});} // Button manager show / hide buttons at top of Dependents Tab
function DepsButtons(changed,argSetDepsBtns){var histChanged=typeof changed !== 'undefined'?changed:false; //console.log(buttonArray);
$.each(argSetDepsBtns,function(index,value){ //console.log("\n" + index + "|" + value);
if(value == 'show'){$("#" + index).removeClass("hide"); //console.log(index + ' : show');
}else if(value == 'hide'){$("#" + index).addClass("hide"); //console.log(index + ' : hide');
}});} // populate the individual Dependent form
function ajxPopulateDep(dep_id){ // dep_id is id field in dependents table
//console.log("in ajxPopulateDep function");
$.ajax({url:"/dependentsTab/showDep/" + dep_id,type:"GET",dataType:"json",success:function success(data){if(data.returnStatus == "success"){ //console.log("entered ajxPopulateDep /dependentsTab/showDep/ successful");
//console.log(data);
// POPULATE Dependent
$("#dep_id").val(data.d.id);$("#fk_emp_id").val(data.d.fk_emp_id);$("#type").val(data.d.type);$("#e_relationship").val(data.d.e_relationship);$("#dep_e_fname").val(data.d.e_fname);$("#dep_e_mi").val(data.d.e_mi);$("#dep_e_lname").val(data.d.e_lname);$("#dep_e_gender").val(data.d.e_gender);$("#dep_e_ssn").val(data.d.e_ssn);$("#dep_e_dob").val(data.d.e_dob);$("#dep_eff_date").val(data.d.eff_date);$("#dep_term_date").val(data.d.term_date);$("#dep_student").val(data.d.student);if(data.dep_other_cvg == "1"){$('#dep_other_cvg').prop('checked',true);}else {$('#dep_other_cvg').prop('checked',false);}$("#dep_other_cvg_carrier").val(data.d.other_cvg_carrier);$("#dep_other_cvg_policy").val(data.d.dep_other_cvg_policy);$("#dep_comments").val(data.d.dep_comments); // populate Historical Employee fields
var changed=false; // initialize and then check below
if(data.hd){ // POPULATE Dependent History Fields
$("#h_type").val(data.hd.type);$("#h_e_relationship").val(data.hd.e_relationship);$("#h_dep_e_fname").val(data.hd.e_fname);$("#h_dep_e_mi").val(data.hd.e_mi);$("#h_dep_e_lname").val(data.hd.e_lname);$("#h_dep_e_gender").val(data.hd.e_gender);$("#h_dep_e_ssn").val(data.hd.e_ssn);$("#h_dep_e_dob").val(data.hd.e_dob);$("#h_dep_eff_date").val(data.hd.eff_date);$("#h_dep_term_date").val(data.hd.term_date);$("#h_dep_student").val(data.hd.student);if(data.hdep_other_cvg == "1"){$('#h_dep_other_cvg').prop('checked',true);}else {$('#h_dep_other_cvg').prop('checked',false);}$("#h_dep_other_cvg_carrier").val(data.hd.other_cvg_carrier);$("#h_dep_other_cvg_policy").val(data.hd.dep_other_cvg_policy);$("#h_dep_comments").val(data.hd.dep_comments); // SET different History Diffs bg to Yellow and read only, left side is from database, right side is element name
var arrDep={'type':'type','e_relationship':'e_relationship','e_fname':'dep_e_fname','e_mi':'dep_e_mi','e_lname':'dep_e_lname','e_gender':'dep_e_gender','e_ssn':'dep_e_ssn','e_dob':'dep_e_dob','eff_date':'dep_eff_date','term_date':'dep_term_date','student':'dep_student','other_cvg':'dep_other_cvg','other_cvg_carrier':'dep_other_cvg_carrier','other_cvg_policy':'dep_other_cvg_policy','comments':'dep_comments'};$.each(arrDep,function(field,elemID){if(data.d[field] != data.hd[field] && data.d.updated_at > data.d.approved_at){ //console.log("CHANGED difference: " + elemID + ": " + data.d[field] + "|" + data.hd[field]);
changed = true;$("#h_" + elemID).removeClass("hist-bg").addClass("hist-bg-chgd");$("#h_" + elemID).prop('readonly',false); // needed to allow bg color change
$("#h_" + elemID).attr("disabled",false); // needed to allow bg color change
}else { //console.log("Read Only: " + elemID + ": " + data.d[field] + "|" + data.hd[field]);
$("#h_" + elemID).prop('readonly',true);$("#h_" + elemID).attr("disabled",'disabled');}}); //console.log("changed: " + changed);
// SHOW historical fields if changed is true
if(changed){$.each(arrDep,function(field,elemID){$("#hdiv_h_" + elemID).removeClass("hide"); //console.log("remove class hide in #hdiv_" + elemID);  
});}}else { // no history records exist
//console.log("no Dependent history records exist");
ClearHideDepHistory();} //
// SET BUTTONS on Dependents tab
//
//console.log(liGroupName);
var liGroupName=fnliGroupName();var initDepBtns='';if((liGroupName == "tccAdmin" || liGroupName == "tccPowerUser" || liGroupName == "siteAdmin") && changed === true){ //console.log("ajxPopulateDep init dep buttons for admins where history changed true");
// set button visible/hidden state
initDepBtns = {'saveAllDepChanges':'show','discardAllDepChanges':'show','saveNewDep':'hide','cancelDepChanges':'show','submitAllDepChanges':'hide','depAwaitingApproval':'hide'};}else if((liGroupName == "tccAdmin" || liGroupName == "tccPowerUser" || liGroupName == "siteAdmin") && changed === false){ //console.log("ajxPopulateDep init dep buttons for admins where history changed false");
// set button visible/hidden state
initDepBtns = {'saveAllDepChanges':'show','discardAllDepChanges':'hide','saveNewDep':'hide','cancelDepChanges':'show','submitAllDepChanges':'hide','depAwaitingApproval':'hide'};}else if(liGroupName == "sitePowerUser" && changed === true){ //console.log("ajxPopulateDep init dep buttons for sitePowerUser where history changed true");
// set button visible/hidden state
initDepBtns = {'saveAllDepChanges':'hide','discardAllDepChanges':'hide','saveNewDep':'hide','cancelDepChanges':'show','submitAllDepChanges':'hide','depAwaitingApproval':'show'};}else if(liGroupName == "sitePowerUser" && changed === false){ //console.log("ajxPopulateDep init dep buttons for sitePowerUser where history changed false");
// set button visible/hidden state
initDepBtns = {'saveAllDepChanges':'hide','discardAllDepChanges':'hide','saveNewDep':'hide','cancelDepChanges':'show','submitAllDepChanges':'show','depAwaitingApproval':'hide'};}else if(liGroupName == "siteEmployee" && changed === true){ //console.log("ajxPopulateDep init dep buttons for siteEmployee where history changed true");
// set button visible/hidden state
initDepBtns = {'saveAllDepChanges':'hide','discardAllDepChanges':'hide','saveNewDep':'hide','cancelDepChanges':'show','submitAllDepChanges':'hide','depAwaitingApproval':'show'};}else if(liGroupName == "siteEmployee" && changed === false){ //console.log("ajxPopulateDep init dep buttons for siteEmployee where history changed false");
// set button visible/hidden state
initDepBtns = {'saveAllDepChanges':'hide','discardAllDepChanges':'hide','saveNewDep':'hide','cancelDepChanges':'show','submitAllDepChanges':'show','depAwaitingApproval':'hide'};}else if(liGroupName == "tccSupport"){ //console.log("ajxPopulateDep init dep buttons for tccSupport");
// set button visible/hidden state
initDepBtns = {'saveAllDepChanges':'hide','discardAllDepChanges':'hide','saveNewDep':'hide','cancelDepChanges':'show','submitAllDepChanges':'hide','depAwaitingApproval':'hide'};}DepButtons(undefined,initDepBtns); //
// SET FIELD PERMISSIONS BY GROUP ...no field restrictions for tccAdmin, tccPowerUser, siteAdmin or sitePowerUser
//
// Set fields for when liGroupName is siteEmployee
var arrDepHistFields=[];if(liGroupName == "siteEmployee"){ //console.log("ajxPopulateDep user is in siteEmployee liGroupName");
// set term_date READONLY if siteEmployee
$("#dep_term_date").prop('readonly',true); // check EnrolleeMode mode and window status; edit reflects window mode and window statuses
if(data.perms.depsTabPerms.edit == "true" && data.deps.awaitingApproval === false){ //console.log("edit true AND awaiting approval false");
// editing is allow except for always RO fields
arrDepHistFields = ['type','e_relationship','dep_e_fname','dep_e_mi','dep_e_lname','dep_e_gender','dep_e_ssn','dep_e_dob','dep_eff_date','dep_term_date','dep_student','dep_other_cvg','dep_other_cvg_carrier','dep_other_cvg_policy','dep_comments'];$.each(arrDepHistFields,function(index,value){$("#" + value).prop('readonly',true);});$('#dep_e_gender option:not(:selected)').attr('disabled',true);$('#dep_other_cvg').click(function(evt){evt.preventDefault();});}else if(data.perms.depsTabPerms.edit == "false" || data.emp.awaitingApproval === true){ //console.log("edit false AND/OR awaiting approval true");
arrDepHistFields = ['type','e_relationship','dep_e_fname','dep_e_mi','dep_e_lname','dep_e_gender','dep_e_ssn','dep_e_dob','dep_eff_date','dep_term_date','dep_student','dep_other_cvg','dep_other_cvg_carrier','dep_other_cvg_policy','dep_comments'];$.each(arrDepHistFields,function(index,value){$("#" + value).prop('readonly',true);});$('#dep_e_gender option:not(:selected)').attr('disabled',true);$('#dep_other_cvg').click(function(evt){evt.preventDefault();});}}}else if(data.returnStatus == "fail"){console.log("failed");}},error:function error(_error5){console.log("Error:");console.log(_error5);}});} // Button manager show / hide buttons at top of Dependent Tab
function DepButtons(changed,argSetDepBtns){var histChanged=typeof changed !== 'undefined'?changed:false; //console.log(buttonArray);
$.each(argSetDepBtns,function(index,value){ //console.log("\n" + index + "|" + value);
if(value == 'show'){$("#" + index).removeClass("hide"); //console.log(index + ' : show');
}else if(value == 'hide'){$("#" + index).addClass("hide"); //console.log(index + ' : hide');
}});}

},{}],8:[function(require,module,exports){
'use strict';(function(){'use strict';require('./imports/utils');require('./imports_spa/utils_spa');require('./imports_spa/init_spa');require('./imports_spa/emp_list');require('./imports_spa/employee');require('./imports_spa/benefits');require('./imports_spa/dependents');})();

},{"./imports/utils":1,"./imports_spa/benefits":2,"./imports_spa/dependents":3,"./imports_spa/emp_list":4,"./imports_spa/employee":5,"./imports_spa/init_spa":6,"./imports_spa/utils_spa":7}]},{},[8]);
