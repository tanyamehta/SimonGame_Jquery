var gamePattern = [];
var count = 1;
var clickedArray = [];
var arr = ["green", "red", "yellow", "blue"];
var keyPressed = 0;

// To generate the random number
function generateRandom() {
  var random = Math.floor(Math.random() * 4);
  var color = arr[random];
  $("." + color).fadeOut();
  setTimeout(function() {
    $("." + color).fadeIn();
  }, 5);
  return random;
}

// To add the Audio
function addAudio(random) {
  var color = arr[random];
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

//Event handling when the key is pressed
function keyPress() {
  $(document).keydown(function() {
    if(keyPressed==0){
    var returnedRandomvalue = generateRandom();
    gamePattern.push(returnedRandomvalue);
    addAudio(returnedRandomvalue);
    $("h1").text("Level " + count);
    keyPressed =1;
  }
  });
}

//Events to be performed when we clicked on button
function clickButton() {
  $(".btn").click(function() {
    var press = $(this).attr("id");
    var index = arr.indexOf(press);
    $("." + press).addClass("pressed");
    setTimeout(function() {
      $("." + press).removeClass("pressed");
    }, 100);
    addAudio(index);
    clickedArray.push(index);
    verification();
  });
}

//To verify if both the arrays are same or not
function verification() {
  for (var i = 0; i < clickedArray.length; i++) {
    if (gamePattern[i] == clickedArray[i]) {
      if (gamePattern.length == clickedArray.length) {
        var RRV;
        RRV = generateRandom();
        gamePattern.push(RRV);
        clickedArray = [];
        $("h1").text("Level " + gamePattern.length);
      }
    } else {
      $("h1").text("Game Over, Press any Key to Restart");
      $("body").css("background-color", "red");
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      setTimeout(function() {
        $("body").css("background-color", "#011F3F");
      }, 300);
      gamePattern = [];
      clickedArray = [];
      keyPressed = 0;
    }
  }
}
keyPress();
clickButton();
