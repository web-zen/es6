//
// CORE UTILS
//

// display a growl message in green
window.growlCenterSuccess = function growlCenterSuccess($msg){
    $.bootstrapGrowl($msg, {
      type: "success", // (null, "info", "danger", "success")
      offset: {from: "top", amount: 300}, // "top", or "bottom"
      align: "center", // ("left", "right", or "center")
      width: 200, // (integer, or "auto")
      delay: 3000, // Time while the message will be displayed. It"s not equivalent to the *demo* timeOut!
      allow_dismiss: true, // If true then will display a cross to close the popup.
      stackup_spacing: 10 // spacing between consecutively stacked growls.
    });
 };

// display a growl message in red
window.growlCenterDanger = function growlCenterDanger($msg){
    $.bootstrapGrowl($msg, {
      type: "danger", // (null, "info", "danger", "success")
      offset: {from: "top", amount: 300}, // "top", or "bottom"
      align: "center", // ("left", "right", or "center")
      width: 300, // (integer, or "auto")
      delay: 70000, // Time while the message will be displayed. It"s not equivalent to the *demo* timeOut!
      allow_dismiss: true, // If true then will display a cross to close the popup.
      stackup_spacing: 10 // spacing between consecutively stacked growls.
    });
 };
