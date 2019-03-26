var scores = [0,0];
var roundScore = 0;
var activePlayer = 0;
var gamePlaying = true;
var maxScore = 100;

document.querySelector("#dice-1").style.display = "none";
document.querySelector("#dice-2").style.display = "none";


document.querySelector(".maxScore").addEventListener("change", function(){
    maxScore = Number(document.querySelector(".maxScore").value); 
});

document.querySelector(".btn-roll").addEventListener("click", function(){
    if (gamePlaying){
        // 1. Generate random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
        // 2. Display Result
    document.querySelector("#dice-1").style.display = "block";
    document.querySelector("#dice-2").style.display = "block";
    document.querySelector("#dice-1").src = "dice-" + dice1 +".png";
    document.querySelector("#dice-2").src = "dice-" + dice2 +".png";
        // 3. Update scores if not 1
    if(dice1 !== 1 && dice2 !== 1){
        // Add score
        roundScore += (dice1 + dice2);
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
        // Next player
        nextPlayer ()
    }
    } 
});

document.querySelector(".btn-hold").addEventListener("click", function(){
    if(gamePlaying){
         // add current score to global score
    scores[activePlayer] += roundScore;
        // update UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer]
        // Check if player win the game
    if (scores[activePlayer] >= maxScore){
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector("#dice-1").style.display = "none";
    document.querySelector("#dice-2").style.display = "none";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    gamePlaying = false;
    } else {
    nextPlayer ()
        }    
    }
       
})

document.querySelector(".btn-new").addEventListener("click", init);


function nextPlayer () {
    roundScore = 0;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector("#p1pig").classList.toggle("see");
    document.querySelector("#p2pig").classList.toggle("see");
    // document.querySelector(".dice").style.display = "none";
}

function init () {
    // 1. Reset all
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector("#dice-1").style.display = "none";
    document.querySelector("#dice-2").style.display = "none";
    document.querySelector("#score-0").textContent = 0;
    document.querySelector("#score-1").textContent = 0;
    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;
    document.querySelector("#name-0").innerHTML = 'Player 1<img src="pig.svg" class="piggy" id="p1pig">';
    document.querySelector("#name-1").innerHTML = 'Player 2<img src="pig.svg" class="piggy see" id="p2pig">';
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    // 2. Start again
    document.querySelector(".player-0-panel").classList.add("active");
    gamePlaying = true;
}
