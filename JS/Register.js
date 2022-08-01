
// the form starts displaying the login screen
var loginToggle = "loginModalLogin";
var processingLogin = false;
// flip the modal to the desired function
function ToggleLoginModal(target) {
  // can't do anything while we're processing
  if( processingLogin ) {
    return;
  }
  document.getElementById(loginToggle + "Body").style.display = "none";
  document.getElementById(loginToggle + "Footer").style.display = "none";
  loginToggle = target.id
  document.getElementById(loginToggle + "Body").style.display = "block";
  document.getElementById(loginToggle + "Footer").style.display = "block";
  $('#modalTitle').html((loginToggle == "loginModalReset") ? "Reset my PIN" : ((loginToggle == "loginModalRegister") ? "Register New Account" : "Log In"))
  sizeModal();
}

// process an attempted login
function SubmitLogIn() {
  // can't do anything while we're processing
  if( processingLogin ) {
    return;
  }

  // we need to give this a few frames to load before we test for error messages
  $('#loginFrame').load( function() { setTimeout( function() { 
    var frame = document.getElementById("loginFrame");
    frame.onload = null;

    var messages = frame.contentDocument.getElementById("loginFlashMessages");
    var lightboxFollowup = frame.contentDocument.getElementById("lightboxFollowup");
    var redirectMessage = frame.contentDocument.getElementById("redirectMessage");
    var nextLocation = null;
    // success, but need to reuse the lightbox
    if( lightboxFollowup != null ) {
      window.top.VuFind.lightbox.reload();
    // success, but they have messages, so send them to the message center
    } else if( $(frame.contentDocument).find('.notificationsCount').length > 0 ) {
      nextLocation = "/MyResearch/Notifications";
    // success, reload the desired page
    } else if( redirectMessage != null ) {
      nextLocation = "/MyResearch/" + redirectMessage.innerHTML;
    // success, reload this page
    } else if( messages == null || messages.children.length == 0 ) {
      nextLocation = frame.contentWindow.location.href;
    // failure, find the error message and display it in the modal
    } else {
      processingLogin = false;
      document.getElementById(loginToggle + "Footer").style.display = "block";
      document.getElementById("loadingFooter").style.display = "none";
      document.getElementById("loginFlashMessages").innerHTML = messages.innerHTML;
    }

    if( nextLocation ) {
      $('#realLoginContents').empty();
      $('#loginForm').clone().appendTo('#realLoginContents').attr("id", "REAL_loginForm");
      $('#REAL_loginForm').attr("action", nextLocation);
      $('#REAL_loginForm').attr("target", "");
      setTimeout( function() {
        $('#REAL_loginForm .submitButton').css({"display":""});
        $('#realLoginContents').css({"display":"", "width":"0px", "height":"0px"});
        $('#REAL_loginForm .submitButton').click();
      }, 300);
    }
  }, 100); } );

  // make sure they've given us all the relevant info
  var barcode = document.getElementById("login_username");
  var pword = document.getElementById("login_password");
  if( barcode.value == "" || barcode.value == "Enter your Library Card Number" ) {
    document.getElementById("login_usernameError").style.display = "block";
    document.getElementById("login_usernameError").innerHTML = "Please enter your library card number above.";
    $("#login_usernameError").attr("tabIndex", -1).focusout( function() { $("#login_username").focus(); } ).focus();
    if( "classList" in barcode ) {
      barcode.classList.add("textBoxError");
    } else {
      barcode.className += " textBoxError";
    }
    barcode.nextElementSibling.style.display = "block";
  } else if( pword.value == "" || pword.value == "XXXX" ) {
    document.getElementById("login_passwordError").style.display = "block";
    document.getElementById("login_passwordError").innerHTML = "Please enter your PIN above.";
    $("#login_passwordError").attr("tabIndex", -1).focusout( function() { $("#login_password").focus(); } ).focus();
    if( "classList" in pword ) {
      pword.classList.add("textBoxError");
    } else {
      pword.className += " textBoxError";
    }
    pword.nextElementSibling.style.display = "block";
  } else {
    processingLogin = true;
    document.getElementById(loginToggle + "Footer").style.display = "none";
    document.getElementById("loadingFooter").style.display = "block";
    document.getElementById("loginForm").submit();
  }
}

// process an attempted reset
function SubmitReset() {
  // can't do anything while we're processing
  if( processingLogin ) {
    return;
  }

  // we need to give this a few frames to load before we test for error messages
  $('#loginFrame').load( function() { setTimeout( function() { 
    var frame = document.getElementById("loginFrame");
    frame.onload = null;

    var messages = frame.contentDocument.getElementById("resetFlashMessages");
    // success, find the result message and display it in the modal
    if( messages != null && messages.children.length > 0 ) {
      processingLogin = false;
      document.getElementById(loginToggle + "Footer").style.display = "block";
      document.getElementById("loadingFooter").style.display = "none";
      document.getElementById("loginFlashMessages").innerHTML = messages.innerHTML;
    }
  }, 100); } );

  // make sure they've given us all the relevant info
  var barcode = document.getElementById("reset_username");
  if( barcode.value == "" || barcode.value == "Enter your Library Card Number" ) {
    document.getElementById("reset_usernameError").style.display = "block";
    document.getElementById("reset_usernameError").innerHTML = "Please enter your library card number above.";
    $("#reset_usernameError").attr("tabIndex", -1).focusout( function() { $("#reset_username").focus(); } ).focus();
    if( "classList" in barcode ) {
      barcode.classList.add("textBoxError");
    } else {
      barcode.className += " textBoxError";
    }
    barcode.nextElementSibling.style.display = "block";
  } else {
    processingLogin = true;
    document.getElementById(loginToggle + "Footer").style.display = "none";
    document.getElementById("loadingFooter").style.display = "block";
    document.getElementById("resetForm").submit();
  }
}

// clean out the error problems
function ClearFormError(element) {
  if( "classList" in element ) {
    element.classList.remove("textBoxError");
  } else {
    element.className = element.className.replace("textBoxError", "");
  }
  var errorField = document.getElementById((((element.id == "register_state") || (element.id == "register_zip")) ? "register_city" : element.id) + "Error");
  errorField.style.display = "none";
  $(errorField).attr("tabIndex", null);
  element.nextElementSibling.style.display = "none";
}

jQuery(document).ready(function() {
  // grab the form from the standard layout
  $('#loginModalLoginBody').html( $('#realLoginContents').html() );
  $('#loginModalLoginBody #DUMMY_loginForm').attr("id", "loginForm");
  $('#loginModalLoginBody #DUMMY_login_username').attr("id", "login_username");
  $('#loginModalLoginBody #DUMMY_login_usernameError').attr("id", "login_usernameError");
  $('#loginModalLoginBody #DUMMY_login_password').attr("id", "login_password");
  $('#loginModalLoginBody #DUMMY_login_passwordError').attr("id", "login_passwordError");
  $('#loginModalLoginBody #DUMMY_loginModalReset').attr("id", "loginModalReset");
  $('#loginModalLoginBody #DUMMY_loginModalRegister').attr("id", "loginModalRegister");

  // see whether we need to add these arguments
      
  // see if we need to jump automatically to registration form
  
  // submit the login on enter press
  $("#loginForm input").keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      SubmitLogIn();
    }
  });
} );