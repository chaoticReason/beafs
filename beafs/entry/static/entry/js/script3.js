(function($) {
  "use strict";

  /*==================================================================
  [ Input events ]*/
  $('.input100').each(function() { // for beauty
    $(this).on('blur', function() {
      if ($(this).val() != "") {
        $(this).addClass('has-val');
      } else {
        $(this).removeClass('has-val');
      }
    });
  });

  $('.input100').each(function() {
    $(this).on('blur', function() {
      if (validate(this)) {
        hideAlert(this);
        $(this).addClass('true-validate');
      } else $(this).removeClass('true-validate');
    });
  });

  $('#password').keyup(function() {
    if (pswValidate(this)) {
      hideAlert(this);
      $(this).addClass('true-validate');
    } else $(this).removeClass('true-validate');
  });

  $('.input100').each(function() {
    $(this).focus(function() {
      hideAlert(this);
      $(this).removeClass('true-validate');
    });
  });

  /*==================================================================
  [ Check validation ]*/

  function pswValidate(psw) {
    var inpContainer = $(psw).parent();
    if ($(psw).val().length < 6) {
      $(inpContainer).addClass('av-easy');
      return false;
    }
    return true;
  }

  function validate(inp) {
    var thisAlert = $(inp).parent();
    if (emptyInp(inp) == true) {
      return false;
    }
    if ($(inp).prop('name') == 'email') {
      if ($(inp).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        $(thisAlert).addClass('av-email');
        return false;
      }
    }
    if ($(inp).prop('name') == 'nickname') {
      if ($(inp).val() == "admin") {
        $(thisAlert).addClass('av-nickname');
        return false;
      }
    }
    if ($(inp).prop('name') == 'auth') {
      if ($(inp).val() != $('#password').val()) {
        $(thisAlert).addClass('av-mismatch');
        return false;
      }
    }
    if ($(inp).prop('name') == 'password') {
      if ($(inp).val().length < 6) {
        $(thisAlert).addClass('av-easy');
        return false;
      }
    }
    return true;
  }

  function emptyInp(inp) {
    var inpContainer = $(inp).parent();
    if ($(inp).val() == '') {
      $(inpContainer).addClass('alert-validate');
      return true;
    }
    return false;
  }

  function hideAlert(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass('alert-validate');
    $(thisAlert).removeClass('av-easy');
    $(thisAlert).removeClass('av-nickname');
    $(thisAlert).removeClass('av-email');
    $(thisAlert).removeClass('av-mismatch');
  }

  /*==================================================================
  [ Button ]*/
  var btn = '#btn';
  var input = $('.input100');

  $('.input100').each(function() {
    $(this).blur(function() {
      if (checkInputs()) {
        $(btn).addClass('btn-validate');
        $(btn).prop('disabled', false);
      } else {
        if ($(btn).is('btn-validate')) {
          $(btn).removeClass('btn-validate');
          $(btn).prop('disabled', true);
        }
      }
    });
  });

  $(btn).on('submit', function() {
    alert("submit");
    $(input).each(function() {
      for (var i = 0; i < input.length; i++) {
        if (validate(input[i]))
          pswValidate(input[i]);
      }
    });
  });

  function checkInputs() {
    if ($('.true-validate').length < 4)
      return false;
    return true;
  }
})(jQuery);
