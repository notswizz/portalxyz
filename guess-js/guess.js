var guess = {
  // (A) PROPERTIES
  // (A1) HTML ELEMENTS
  hnum : null, // number input field
  hbtn : null, // guess/reset button
  htxt : null, // response text field

  // (A2) FLAGS
  min : 0, // min allowed number
  max : 0, // max allowed number
  jackpot : 0, // the correct number
  guesses : 0, // total nunmber of guesses made

  // (B) INITIALIZE
  init : () => {
    // (B1) GET HTML ELEMENTS
    guess.hnum = document.getElementById("guess-num");
    guess.hbtn = document.getElementById("guess-btn");
    guess.htxt = document.getElementById("guess-txt");

    // (B2) MIN/MAX NUMBER
    guess.min = Math.ceil(guess.hnum.min);
    guess.max = Math.floor(guess.hnum.max);

    // (B3) RESET GAME
    guess.reset();
  },

  // (C) RESET GAME
  reset : () => {
    // (C1) RESET FLAGS
    guess.guesses = 0;
    // credits: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    guess.jackpot = Math.floor(Math.random() * (guess.max - guess.min + 1)) + guess.min;
    console.log("Jackpot - " + guess.jackpot); // for the cheaters

    // (C2) RESET HTML
    guess.hnum.value = guess.min;
    guess.hbtn.innerHTML = "Make a Guess";
    guess.hbtn.onclick = guess.check;
  },

  // (D) MAKE A GUESS
  check : () => {
    // (D1) GET CHOSEN NUMBER + RESET CSS
    var num = +guess.hnum.value;
    guess.guesses++;
    guess.htxt.classList.remove("high");
    guess.htxt.classList.remove("low");

    // (D2) HIT!
    if (num==guess.jackpot) {
      guess.htxt.innerHTML = "Nailed it! Total guesses made - " + guess.guesses;
      guess.htxt.classList.add("hit");
      guess.hnum.readOnly = true;
      guess.hbtn.innerHTML = "Reset";
      guess.hbtn.onclick = guess.reset;
    }

    // (D3) MISS - GIVE HINTS
    else  {
      // (D3-1) HIGHER OR LOWER?
      let difference = num - guess.jackpot, text = "";
      if (difference>0) {
        text = "high";
        guess.htxt.classList.add("high");
      } else {
        text = "low";
        guess.htxt.classList.add("low");
      }

      // (D3-2) TOO MUCH OR CLOSE?
      difference = Math.abs(difference);
      if (difference>20) {
        text = "Too " + text;
      } else if (difference>=10) {
        text = "Slightly " + text;
      } else {
        text = "A little " + text;
      }

      // (D3-3) INTERFACE UPDATE
      guess.htxt.innerHTML = text;
    }
  }
};
window.addEventListener("load", guess.init);
