// Initial variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

// First time when a key is pressed
$(document).one('keydown', function(event) { 
    if(start === false){
        start = true;
        nextSequence();
        event.stopPropagation();     
    }});
  

// Random number generator
function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;   
    $("h1").text("Level " + level);
};

// Buttons pressed by user
$(".btn").click(function handler(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// Function to play sounds either the program generates the sequence or the user click on the buttons
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
};

// Animation on buttons when are pressed by user
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


 // Check answer 
  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    } else {
        console.log("wrong");
            audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over")
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
    }
  }

// Start over the game  
function startOver(){
    $("body").one('keydown', function(event){
        nextSequence();
        event.stopPropagation();
    })
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}