(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';(function(){'use strict';require('./imports/utils');require('./imports/init');})();

},{"./imports/init":2,"./imports/utils":3}],2:[function(require,module,exports){
//
// CORE INIT
//
"use strict";$("#notification-msg").delay(5000).fadeOut(5000); // show ajax loading gif
$(document).ajaxStart(function(){$("#quote-loading").removeClass("hide"); // show the gif image when ajax starts
}).ajaxStop(function(){$("#quote-loading").addClass("hide");});

},{}],3:[function(require,module,exports){
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

},{}]},{},[1]);
