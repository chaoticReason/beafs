
(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('keyup', function(){
            if(showValidate(this)){
                $(this).parent().addClass('true-validate-log-in');
            }else{
                $(this).parent().removeClass('true-validate-log-in');
            }
        })
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        if($(input).val().trim() == '')
          return false;

        return true;
    }

  var btn = '#btn';

  $('.validate-form .input100').each(function(){
    $(this).on('keyup', function(){
      if(checkInputs()){
        $(btn).addClass('btn-validate');
        $(btn).prop('disabled', false);
      }
      else{
        if($(btn).has('btn-validate')){
          $(btn).removeClass('btn-validate');
          $(btn).prop('disabled', true);
        }
      }
    });
  });

  function checkInputs(){
    if($('.true-validate-log-in').length < 2)
      return false;
    return true;
  }

})(jQuery);
