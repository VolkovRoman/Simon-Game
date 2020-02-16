var userClickedPattern = [];
var gamePattern = [];
var level = 1;
var buttonColors = ["red", "blue", "green", "yellow"];

var fadeSpeed = 100;

var gameNotStarted = true;



$("body").on("click", function () {
  if (gameNotStarted) {
    nextSequence();
    gameNotStarted = false;
  }
});

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  animatePress(randomChosenColor);
  playSound(randomChosenColor);

  $("#level-title").text("Level " + level);
  level++;
}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 500);
    }
  } else {
    gameOver();
    startOver();
  }

}

function gameOver() {
  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("GAME OVER. CLICK TO TRY AGAIN");
}

function startOver() {
  gameNotStarted = true;
  level = 1;
  gamePattern = [];
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(buttonColor) {
  $("#" + buttonColor).addClass("pressed");
  setTimeout(function () {
    $("#" + buttonColor).removeClass("pressed");
  }, fadeSpeed);
}