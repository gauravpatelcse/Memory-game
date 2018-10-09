/*
 * Create a list that holds all of your cards
 */

const symbols = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
let cards = [...symbols, ...symbols];

// Create array to hold opened cards

let openCard = [];
let moves = 0;
let starts = 3;
let matchFound = 0;
let startGame = false;
let starRating = "3";
let timer;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle cards (function from http://stackoverflow.com/a/2450976)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


//html of card
function createCard() {
  let cardList = shuffle(cards);
  cardList.forEach(function(card) {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  })
}

//Matching Cards
function findMatch() {
  // Show cards on click
  $(".card").on("click", function() {
    if ($(this).hasClass("open show")) { return; }
    $(this).toggleClass("flipInY open show");
    openCard.push($(this));
    startGame = true;
    
   // Check if classlist matches when openCard length == 2
    if (openCard.length === 2) {
      if (openCard[0][0].classList[2] === openCard[1][0].classList[2]) {
      openCard[0][0].classList.add("bounceIn", "match");
      openCard[1][0].classList.add("bounceIn", "match");
      $(openCard[0]).off('click');
      $(openCard[1]).off('click');
      matchFound += 1;
      moves++;
      removeOpenCards();
      findWinner();
      } else {
        
      // If classes don't match, add "wrong" class
      openCard[0][0].classList.add("shake", "wrong");
      openCard[1][0].classList.add("shake", "wrong");
        
      // Set timeout to remove "show" and "open" class
      setTimeout(removeClasses, 1100);
        
      // Reset openCard.length to 0
      setTimeout(removeOpenCards, 1100);
      moves++;
      }
    }
  updateMoves();
  })
}



// Update HTML with number of moves
function updateMoves() {
  if (moves === 1) {
    $("#movesText").text(" Move");
  } else {
    $("#movesText").text(" Moves");
  }
  $("#moves").text(moves.toString());

  if (moves > 0 && moves < 16) {
    starRating = starRating;
  } else if (moves >= 16 && moves <= 20) {
    $("#starOne").removeClass("fa-star");
    starRating = "2";
  } else if (moves > 20) {
    $("#starTwo").removeClass("fa-star");
    starRating = "1";
  }
}


// Open popup when game is complete source: www.w3schools.com
function findWinner() {

  if (matchFound === 8) {

    let modal = document.getElementById('win-popup');
    let span = document.getElementsByClassName("close")[0];

    $("#total-moves").text(moves);
    $("#total-stars").text(starRating);

    modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

   $("#play-again-btn").on("click", function() {
       location.reload()
   });

   clearInterval(timer);


 }
}

// Reset openCard.length to 0
function removeOpenCards() {
  openCard = [];
}



// Remove all classes except "match"
function removeClasses() {
  $(".card").removeClass("show open flipInY bounceIn shake wrong");
  removeOpenCards();
}



// Disable clicks
function disableClick() {
 openCard.forEach(function (card) {
   card.off("click");
  })
}



// Start timer on the first card click
function startTimer() {
  let clicks = 0;
  $(".card").on("click", function() {
    clicks += 1;
    if (clicks === 1) {
      let sec = 0;
      function time ( val ) { return val > 9 ? val : "0" + val; }
      timer = setInterval( function(){
        $(".seconds").html(time(++sec % 60));
        $(".minutes").html(time(parseInt(sec / 60, 10)));
      }, 1000);
    }
  })
 }



// Call functions
shuffle(cards);
createCard();
findMatch();
startTimer();



// Function to restart the game on icon click
function restartGame() {
  $("#restart").on("click", function() {
      location.reload()
  });
  }

restartGame();





