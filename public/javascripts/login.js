$().ready(function() {
  
    //Name
    $('#name').keyup(function(e) {
        var name = $('#name').val();
          switch(true){
              case (name == ''):
                  $('#name').css('border', 'solid 1px #690008');
                  $('#name_error').text('name missing');
                  $('#name_error').show();
                  e.preventDefault();
                  break;
              case (name.length <= 2):
                  $('#name').css('border', 'solid 1px #690008');
                  $('#name_error').text('at least 3 chars for name');
                  $("#name_error").show();
                  e.preventDefault();
                  break;
              case (name.length >= 50):
                  $('#name').css('border', 'solid 1px #690008');
                  $('#name_error').text('no more than 50 chars for name');
                  $("#name_error").show();
                  e.preventDefault();
                  break;
              default:
                  $('#name').css('border','solid 1px #242c37');
                  $('#name_error').hide(); 
          }
    });
    
    //Lastname
    $('#lastname').keyup(function(e) {
          var lastname = $('#lastname').val();
          switch(true){
            case (lastname == ''):
              $('#lastname').css('border', 'solid 1px #690008');
              $('#lastname_error').text('lastname missing');
              $("#lastname_error").show();
              e.preventDefault();
              break;
            case (lastname.length <= 2):
              $('#lastname').css('border', 'solid 1px #690008');
              $('#lastname_error').text('at least 3 chars for lastname');
              $("#lastname_error").show();
              e.preventDefault();
              break;
            case (lastname.length >= 50):
              $('#lastname').css('border', 'solid 1px #690008');
              $('#lastname_error').text('no more than 50 chars for lastname');
              $("#lastname_error").show();
              e.preventDefault();
              break;
            default:
              $('#lastname').css('border','solid 1px #242c37');
              $('#lastname_error').hide(); 
          }
    });
      
    
    //validation email function
    function validateEmail(email) {
      var regex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      return regex.test(email);
    }
    
    //Email
    $('#email').keyup(function(e) {
        var email = $('#email').val();
          switch(true){
              case (email == ''):
                  $('#email').css('border', 'solid 1px #690008');
                  $('#email_error').text('email missing');
                  $('#email_error').show();
                  e.preventDefault();
                  break;
            case (!validateEmail(email)):
                  $('#email').css('border', 'solid 1px #690008');
                  $('#email_error').text('invalid email');
                  $('#email_error').show();
                  e.preventDefault();
                  break;
              default:
            $('#email').css('border','solid 1px #242c37');
            $('#email_error').hide();
        }
    });
    
    //Password
      $('#password').keyup(function(e) {
        var password = $('#password').val();
          switch(true){
              case (password == ''):
                  $('#password').css('border', 'solid 1px #690008');
                  $('#password_error').text('password missing');
                  $("#password_error").show();
                  e.preventDefault();
                  break;
              case (password.length < 8):
                  $('#password').css('border', 'solid 1px #690008');
                  $('#password_error').text('at least 8 chars for password');
                  $("#password_error").show();
                  e.preventDefault();
                  break;
              default:
                  $('#password').css('border','solid 1px #242c37');
                  $('#password_error').hide(); 
          }
    });
   
  });