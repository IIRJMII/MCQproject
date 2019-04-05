$(document).ready(function () {
  
  var score = 0;
  var userData;
  var myModule;
  var prevAverage;
  var totalAnswered;
  var newAverage;
  
  getUser();
  getQuestions();
  
  $('.carousel').carousel('pause');
  
  $('#questionsHTML').on('click', '.confirm', function(event) {
    //if the question has already been answered, move to next question
    if($(this).html() == '<i class="fas fa-2x fa-arrow-right"></i>')
    {
      $('.carousel').carousel('next');
    }
    //if the question is being answered
    else
    {
      $(this).html("<i class='fas fa-2x fa-arrow-right'></i>");
      
      //if answer is right
      if ($(this).val() == $('input[name="radioBtn"]:checked:visible').val())
        {
          $(this).parent().parent().parent().parent().css("border-color", "#39FF14");
          $('.'+$(this).val()+':visible').css("color", "#39FF14");
          score++;
        }
      //if answer is wrong
      else
        {
          $(this).parent().parent().parent().parent().css("border-color", "#FF0000");
          $('input[name="radioBtn"]:checked').parent().parent().css("color", "#FF0000");
          $('.'+$(this).val()+':visible').css("color", "#39FF14");
        }
      
      //if the final question has been answered
      if($(this).attr("id") == "finalButton")
        {
          $("#results").text(score+"/"+10);
          newAverage = ((((prevAverage/10)*totalAnswered)+score)/(totalAnswered+10))*10;
          $("#newAverage").text(newAverage);
          updateAverage();
        }
    }
  })
  
  $('#questionsHTML').on('click', '.previous', function(event) {
    $('.carousel').carousel('prev');
  })
  
  function getUser() {
    $.ajax({
      url: '/users/getUser',
      type: 'GET',
      success: function (data) {
        userData = data;
        if(userData[0].username != undefined)
          {
            $("#welcome").text("Welcome, "+userData[0].username);
          }
      }
    })
    
  }
  
  function updateAverage() {
    $.ajax({
      url: '/updateAverage/'+userData[0]._id+'/'+newAverage,
      type: 'PUT',
      success: function (data) {
        console.log(data);
      }
    })
  }
  
  function getQuestions () {
    $.ajax({
      url: '/getQuestions',
      type: 'GET',
      success: function (data) {
        var questionHTML = "";
        //first question
        questionHTML += '<br>';
        questionHTML += '<div id="questionsCarousel" class="carousel slide" data-ride="carousel" data-interval="false">';
        questionHTML += '<div class="carousel-inner">';
        questionHTML += '<div class="carousel-item active">';
        questionHTML += '<div class="card" value="'+data[0].correctAnswer+'">';
        questionHTML += '<div class="card-body">';
        questionHTML += '<h3>Question 1</h3>';
        questionHTML += '<h2>'+data[0].question+'</h2>';
        questionHTML += '<hr>';
        questionHTML += '<div class="row justify-content-center">';
        questionHTML += '<div class="col-md-6">';
        questionHTML += '<h4 class="1">A. '+data[0].answerA+'</h4>';
        questionHTML += '</div>';
        questionHTML += '<div class="col-md-1">';
        questionHTML += '<input class="form-check-input" type="radio" name="radioBtn" value="1">';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '<div class="row justify-content-center">';
        questionHTML += '<div class="col-md-6">';
        questionHTML += '<h4 class="2">B. '+data[0].answerB+'</h4>';
        questionHTML += '</div>';
        questionHTML += '<div class="col-md-1">';
        questionHTML += '<input class="form-check-input" type="radio" name="radioBtn" value="2">';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '<div class="row justify-content-center">';
        questionHTML += '<div class="col-md-6">';
        questionHTML += '<h4 class="3">C. '+data[0].answerC+'</h4>';
        questionHTML += '</div>';
        questionHTML += '<div class="col-md-1">';
        questionHTML += '<input class="form-check-input" type="radio" name="radioBtn" value="3">';
        questionHTML += '</div>';
        questionHTML += '</div>';
        if(data[0].answerD != null)
          {
            questionHTML += '<div class="row justify-content-center">';
            questionHTML += '<div class="col-md-6">';
            questionHTML += '<h4 class="4">D. '+data[0].answerD+'</h4>';
            questionHTML += '</div>';
            questionHTML += '<div class="col-md-1">';
            questionHTML += '<input class="form-check-input" type="radio" name="radioBtn" value="4">';
            questionHTML += '</div>';
            questionHTML += '</div>';
          }
        questionHTML += '<hr>';
        questionHTML += '<div class="row">';
        questionHTML += '<div class="ml-3 previous">';
        questionHTML += '</div>';
        questionHTML += '<div class="ml-auto mr-3 confirmNext">';
        questionHTML += '<button class="confirm btn btn-outline-dark ml-auto" value="'+data[0].correctAnswer+'" type="button"><i class="fas fa-2x fa-check"></i></button>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        //questions 2-9
        for(var i = 1; i < 9; i++)
          {
            if (data[i].question == null)
            {
              //continue;
            }
            questionHTML += '<div class="carousel-item">';
            questionHTML += '<div class="card" value="'+data[0].correctAnswer+'" >';
            questionHTML += '<div class="card-body">';
            questionHTML += '<h3>Question '+(i+1)+'</h3>';
            questionHTML += '<h2>'+data[i].question+'</h2>';
            questionHTML += '<hr>';
            questionHTML += '<div class="row justify-content-center">';
            questionHTML += '<div class="col-md-6">';
            questionHTML += '<h4 class="1">A. '+data[i].answerA+'</h4>';
            questionHTML += '</div>';
            questionHTML += '<div class="col-md-1">';
            questionHTML += '<input class="form-check-input" type="radio" name="radioBtn" value="1">';
            questionHTML += '</div>';
            questionHTML += '</div>';
            questionHTML += '<div class="row justify-content-center">';
            questionHTML += '<div class="col-md-6">';
            questionHTML += '<h4 class="2">B. '+data[i].answerB+'</h4>';
            questionHTML += '</div>';
            questionHTML += '<div class="col-md-1">';
            questionHTML += '<input class="form-check-input" type="radio" name="radioBtn" value="2">';
            questionHTML += '</div>';
            questionHTML += '</div>';
            questionHTML += '<div class="row justify-content-center">';
            questionHTML += '<div class="col-sm-6">';
            questionHTML += '<h4 class="3">C. '+data[i].answerC+'</h4>';
            questionHTML += '</div>';
            questionHTML += '<div class="col-md-1">';
            questionHTML += '<input class="form-check-input" type="radio" name="radioBtn" value="3">';
            questionHTML += '</div>';
            questionHTML += '</div>';
            if(data[i].answerD != null)
              {
                questionHTML += '<div class="row justify-content-center">';
                questionHTML += '<div class="col-md-6">';
                questionHTML += '<h4 class="4">D. '+data[i].answerD+'</h4>';
                questionHTML += '</div>';
                questionHTML += '<div class="col-md-1">';
                questionHTML += '<input class="form-check-input" type="radio" name="radioBtn" value="4">';
                questionHTML += '</div>';
                questionHTML += '</div>';
              }
            questionHTML += '<hr>';
            questionHTML += '<div class="row">';
            questionHTML += '<div class="ml-3 previous">';
            questionHTML += '<button class="previous btn btn-outline-dark mr-auto" type="button"><i class="fas fa-2x fa-arrow-left"></i></button>';
            questionHTML += '</div>';
            questionHTML += '<div class="ml-auto mr-3 confirmNext">';
            questionHTML += '<button class="confirm btn btn-outline-dark ml-auto" value="'+data[i].correctAnswer+'" type="button"><i class="fas fa-2x fa-check"></i></button>';
            questionHTML += '</div>';
            questionHTML += '</div>';
            questionHTML += '</div>';
            questionHTML += '</div>';
            questionHTML += '</div>';
          }
        //question 10
        questionHTML += '<div class="carousel-item">';
        questionHTML += '<div class="card" value="'+data[9].correctAnswer+'">';
        questionHTML += '<div class="card-body">';
        questionHTML += '<h3>Question 10</h3>';
        questionHTML += '<h2>'+data[9].question+'</h2>';
        questionHTML += '<hr>';
        questionHTML += '<div class="row justify-content-center">';
        questionHTML += '<div class="col-md-6">';
        questionHTML += '<h4 class="1">A. '+data[9].answerA+'</h4>';
        questionHTML += '</div>';
        questionHTML += '<div class="col-md-1">';
        questionHTML += '<input class="form-check-input" type="radio" name="radioBtn" value="1">';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '<div class="row justify-content-center">';
        questionHTML += '<div class="col-md-6">';
        questionHTML += '<h4 class="2">B. '+data[9].answerB+'</h4>';
        questionHTML += '</div>';
        questionHTML += '<div class="col-md-1">';
        questionHTML += '<input class="form-check-input" type="radio" name="radioBtn" value="2">';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '<div class="row justify-content-center">';
        questionHTML += '<div class="col-md-6">';
        questionHTML += '<h4 class="3">C. '+data[9].answerC+'</h4>';
        questionHTML += '</div>';
        questionHTML += '<div class="col-md-1">';
        questionHTML += '<input class="form-check-input" type="radio" name="radioBtn" value="3">';
        questionHTML += '</div>';
        questionHTML += '</div>';
        if(data[9].answerD != null)
          {
            questionHTML += '<div class="row justify-content-center">';
            questionHTML += '<div class="col-md-6">';
            questionHTML += '<h4 class="4">D. '+data[9].answerD+'</h4>';
            questionHTML += '</div>';
            questionHTML += '<div class="col-md-1">';
            questionHTML += '<input class="form-check-input" type="radio" name="radioBtn" value="4">';
            questionHTML += '</div>';
            questionHTML += '</div>';
          }
        questionHTML += '<hr>';
        questionHTML += '<div class="row">';
        questionHTML += '<div class="ml-3 previous">';
        questionHTML += '<button class="previous btn btn-outline-dark mr-auto" type="button"><i class="fas fa-2x fa-arrow-left"></i></button>';
        questionHTML += '</div>';
        questionHTML += '<div class="ml-auto mr-3 confirmNext" value="1">';
        questionHTML += '<button class="confirm btn btn-outline-dark ml-auto" id="finalButton" value="'+data[9].correctAnswer+'" type="button"><i class="fas fa-2x fa-check"></i></button>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        
        //results
        
        myModule = ""+data[0].module;

        if(userData.body == undefined)//if user is logged in
          {
            prevAverage = userData[0][myModule];
            totalAnswered = userData[0][myModule+"Total"];
          }
        
        questionHTML += '<div class="carousel-item">';
        questionHTML += '<div class="card">';
        questionHTML += '<div class="card-body">';
        questionHTML += '<h2 class="text-center">Results</h2>';
        questionHTML += '<hr>';
        questionHTML += '<div class="row">';
        questionHTML += '<div class="col-md-6 text-right">';
        questionHTML += '<h3>Your results:</h3>';
        questionHTML += '</div>';
        questionHTML += '<div class="col-md-6">';
        questionHTML += '<h3 id="results">0</h3>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        
        if(userData.body == undefined)//if user is logged in
          {
            questionHTML += '<div class="row">';
            questionHTML += '<div class="col-md-6 text-right">';
            questionHTML += '<h3>Your previous average:</h3>';
            questionHTML += '</div>';
            questionHTML += '<div class="col-md-6">';
            questionHTML += '<h3 id="prevAverage">'+prevAverage+'</h3>';
            questionHTML += '</div>';
            questionHTML += '</div>';
            questionHTML += '<div class="row">';
            questionHTML += '<div class="col-md-6 text-right">';
            questionHTML += '<h3>Your new average:</h3>';
            questionHTML += '</div>';
            questionHTML += '<div class="col-md-6">';
            questionHTML += '<h3 id="newAverage">0</h3>';
            questionHTML += '</div>';
            questionHTML += '</div>';
          }
        else
          {
            questionHTML += '<div class="row">';
            questionHTML += '<div class="col-md-6 offset-md-3 text-center">';
            questionHTML += '<h3>Log in to see your average result</h3>';
            questionHTML += '</div>';
            questionHTML += '</div>';
          }
        
        questionHTML += '<hr>';
        questionHTML += '<div class="row">';
        questionHTML += '<div class="ml-3 previous">';
        questionHTML += '<button class="previous btn btn-outline-dark" type="button"><i class="fas fa-2x fa-arrow-left"></i></button>';
        questionHTML += '</div>';
        questionHTML += '<div class="ml-auto mr-3 confirmNext">';
        questionHTML += '<button class="confirm btn btn-outline-dark" type="button"><i class="fas fa-2x fa-arrow-right"></i></button>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        //
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        questionHTML += '</div>';
        $("#questionsHTML").html(questionHTML);
      }
    });
  }
});
    
