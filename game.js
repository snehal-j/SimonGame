// Array of colors
var buttonColors = ["red","blue","green","yellow"];

//create a array which will hold the pattern of color
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var isGameStart = false;

//-----------------------------------------------------------------------------
//handle start-restart button events

$(".startstop-btn").click(function(){
    //code to start or restart the game
    if(!isGameStart){
        nextSequence();
        isGameStart = true;
    }

    var userClickedBtn = $(this).attr("id"); 
    animateBtnPress(userClickedBtn);
    $(this).hide();
})

//-----------------------------------------------------------------------------
//handle button click 

$(".btn").click(function(){

    if(!isGameStart)
        return;

    var userClickedBtn = $(this).attr("id");
    userClickedPattern.push(userClickedBtn);

    animateBtnPress(userClickedBtn);
    playSound(userClickedBtn);

    var lastColorIndex = userClickedPattern.length-1;
    checkUserAnswer(lastColorIndex);
})

//-----------------------------------------------------------------------------
//create function to get next sequence

function nextSequence(){

    //generate random number,choose color from array and add it to game pattern
    var randomNum = Math.floor(Math.random()*4);
    var choosenColor = buttonColors[randomNum];
    gamePattern.push(choosenColor);

    //update level status
    if(isGameStart)
    {
        userClickedPattern = [];
        level++;
    }
        
    updateLevelHeader("Level "+level);
    animateBtnPress(choosenColor);
    playSound(choosenColor);
}

//-----------------------------------------------------------------------------
//Function to make sound

function playSound(choosedColor){
    var audioPath = "sounds/" + choosedColor+".mp3";
    var audio = new Audio(audioPath);
    audio.play();
}

//-----------------------------------------------------------------------------
//function to animate when button is pressed

 function animateBtnPress(choosenColor){
    var btnId = "#"+ choosenColor;

    //add class name "pressed" to button elements
    $(btnId).addClass("pressed");

    //remove the class after 100 milliseconds
    setTimeout(function(){
    $(btnId).removeClass("pressed");
    },100);
 }

 //-----------------------------------------------------------------------------
 //function to update level header

 function updateLevelHeader(levelCount){
    $("#level-title").text(levelCount);
 }

 //-----------------------------------------------------------------------------
 //function to check user answer

 function checkUserAnswer(indexOfLastColor){
     var lastAnsweredColor = userClickedPattern[indexOfLastColor];
     var lastPatternColor = gamePattern[indexOfLastColor];
      if(lastAnsweredColor === lastPatternColor){
          if(userClickedPattern.length == gamePattern.length){
                setTimeout(function(){
                    nextSequence(); 
                },1000)
          }
      }else{
          
        playSound("wrong");
        startOver();
        $("body").addClass("game-over");
        updateLevelHeader("Press play button to start");
        setTimeout(function(){
         $("body").removeClass("game-over");
        },200);

      }
 }

 //-----------------------------------------------------------------------------
 //function to reset all parameters

 function startOver(){
     level = 0;
     isGameStart = false;
     gamePattern = [];
     userClickedPattern = [];
     $(".startstop-btn").show();
 }

 //-----------------------------------------------------------------------------
