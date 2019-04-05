$(document).ready(function() {        
  /**
  * Event handler for when the user attempts to register
  */
  $("#register").click(function (event) {
    $.ajax({
      type: 'POST',
      url: '/users/register',
      dataType: 'json',
      data: {
        'name': $("name").val(),
        'username': $("#username").val(),
        'email': $("#emailRegister").val(),
        'password': $("#passwordRegister").val(),
        'confirmPassword': $("#passwordConfirm").val()
      },
      success: function(token){
        $(location).attr('href', '/' );
		// Redirect to home page
      },
      error: function(errMsg) {
        swal(
          'Oops...',
          errMsg.responseJSON.body,
          'error'
        )
      }
    });
  });
      
    /**
    * Event handler for when the user attempts to login
    */
  $("#login").click(function (event) {
    $.ajax({
      type: 'POST',
      url: '/users/login',
      dataType: 'json',
      data: {
        'email': $("#emailLogin").val(),
        'password': $("#passwordLogin").val()
      },
      success: function(token){
        console.log(token);
        $(location).attr('href', '/' );
		// Redirect to home page
      },
      error: function(errMsg) {
        swal(
          'Oops...',
          errMsg.responseJSON.body,
          'error'
        )
      }
    });
  });
});
