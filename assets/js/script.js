var startContainer = document.querySelector(".start-container");
var startBtn = document.querySelector("#start-btn");
var questionContainer = document.querySelector(".question-container");
var questionEl = document.querySelector("#question");
var btnList = document.querySelector(".btn-list");
var initialsContainer = document.querySelector(".initials-container");
var initialsInput = document.querySelector("#initials-input");
var submitInitialsBtn = document.querySelector("#submit-initials-btn");
var highScoresDiv = document.querySelector(".high-scores");

var index = 0;
var time = 60;
var timeleft;
var score = 0;
let intervalId;

// [{initials: "JB", score: 5}, ...]
let highScores = [];

function startQuiz() {
  console.log("startQuiz");

  // 1. Clear old buttons
  btnList.innerHTML = "";

  // 2. Render buttons
  var currentQuestion = questions[index];
  questionContainer.classList.replace("hide", "show");
  //use the index variable to reach into  your questions array and display first question and answwers
  // after creating a place to show it, you need to display time in html
  questionEl.textContent = currentQuestion.question;
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    console.log("choiceloop");
    const choice = currentQuestion.choices[i];
    var choicebtn = document.createElement("button");
    choicebtn.setAttribute("class", "choice");
    choicebtn.setAttribute("value", choice);
    choicebtn.textContent = i + 1 + "." + choice;
    choicebtn.addEventListener("click", () => {
      checkAnswer(choice);
    });
    btnList.appendChild(choicebtn);
  }
}

function startTimer() {
  timeleft = time;

  // you have to start the timer (look into timer method javascript) using the timeleft variable
  intervalId = setInterval(() => {
    timeleft -= 1;
    // render the timeleft:
    document.querySelector("#time").innerText = `Time Remaining: ${timeleft}s`;

    if (timeleft <= 0) {
      // end the game...
      endQuiz();
    }
  }, 1000);
}

function checkAnswer(answer) {
  //this is the function where you will check of the user's choice is correct or not.
  //if it's correct the score goes up - score++ and the question goes forward too index++
  //and you call the function startQuiz again.

  //else the question still goes to the next  - index++
  //but you take away time - time-= 5
  //you call the function startQuiz again
  var currentQuestion = questions[index];

  if (currentQuestion.correct == answer) {
    score++;
    index++;
  } else {
    timeleft -= 5;
    index++;
  }

  if (index >= questions.length) {
    endQuiz();
    return;
  }

  startQuiz();
}

function endQuiz() {
  //this is where you clear th interval of time
  //where you make the question container disappear
  //and where you make the initials container appear.
  clearInterval(intervalId);
  document.querySelector("#time").classList.add("hide");
  questionContainer.classList.replace("show", "hide");
  initialsContainer.classList.replace("hide", "show");
}

//addEventListener

//create a click event listener on the start buttopn

startBtn.addEventListener("click", () => {
  startContainer.classList.add("hide");
  startQuiz();
  startTimer();
});

submitInitialsBtn.addEventListener("click", () => {
  highScores.push({
    initials: initialsInput.value,
    score: score,
  });

  initialsContainer.classList.replace("show", "hide");
  renderHighScores();
});

function renderHighScores() {
  highScoresDiv.classList.replace("hide", "show");
  highScoresDiv.innerHTML = `
        <h1>High Scores</h1>
        <div>
            ${highScores
              .map(
                (highScore) => `
                <div>${highScore.initials} - ${highScore.score}</div>
            `
              )
              .join("")}
        </div>
  `;

  const goBackButton = document.createElement("button");
  goBackButton.innerText = "Go Back";
  goBackButton.addEventListener("click", () => {
    highScoresDiv.classList.replace("show", "hide");
    document.querySelector("#time").classList.remove("hide");

    startContainer.classList.add("hide");
    index = 0;
    score = 0;
    startQuiz();
    startTimer();
  });
  highScoresDiv.append(goBackButton);

  const clearButton = document.createElement("button");
  clearButton.innerText = "Clear High Scores";
  clearButton.addEventListener("click", () => {
    highScores = [];
    renderHighScores();
  });
  highScoresDiv.append(clearButton);
}

// event listener for btnList so you can target  (var userChoice=event.target.textContent) to see which
//button the user is clicking
//then you pass that user choice onto your function checkanswer by calling the function and passing the
//parameter - checkAnswer(userChoice)

//add eventlistener to the subimit button fo the input
//here you will commit your initials and score to localstorage and use window.location.assing("scores.html")
//to be directed to your scores page
