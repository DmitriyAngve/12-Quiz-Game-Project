const url = "quiz.json";
const questions = []; // load all of the data into the questions array
const output = document.querySelector(".output");
const btn = document.querySelector(".btn");
const totalOutput = document.querySelector("h1");
let holder = []; // hold all of the newly constructed elements
let cur = 0; // current question
const player = { score: 0 };

btn.addEventListener("click", (e) => {
  if (cur >= questions.length) {
    output.innerHTML = "Game Over!";
  } else {
    newQuestion();
  }
  btn.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  //   console.log("ready");
  loadQuestions();
});

function newQuestion() {
  updateScore();
  const el = questions[cur]; // element object of the question
  el.options.sort(() => {
    return 0.5 - Math.random();
  });

  console.log(cur);
  console.log(questions.length);
  console.log(questions[cur]);

  output.innerHTML = "";

  const que1 = document.createElement("div");
  que1.classList.add("que");

  let strOutput = el.question;
  strOutput = strOutput.charAt(0).toUpperCase() + strOutput.slice(1);

  const ans1 = document.createElement("div");
  que1.textContent = strOutput + "?";

  holder.length = 0; // clear array

  el.options.forEach((ans) => {
    const div = document.createElement("div");

    holder.push(div);

    div.textContent = ans.response;
    div.classList.add("box");
    div.classList.add("boxCursor");
    div.correct = ans.correct;
    div.addEventListener("click", selOption);
    ans1.append(div);
  });

  output.append(que1);
  output.append(ans1);
}

// Function for remove event listener (to handle click event)
function selOption(e) {
  endTurn();
  if (e.target.correct) {
    player.score++;
    updateScore();
    e.target.style.backgroundColor = "green";
  } else {
    e.target.style.backgroundColor = "red";
  }
  e.target.style.color = "white";
  nextBtn();
}

function updateScore() {
  totalOutput.innerHTML = `${cur} out of ${questions.length} Score: ${player.score}`;
}

function endTurn() {
  holder.forEach((el) => {
    el.removeEventListener("click", selOption);
    el.style.backgroundColor = "#ddd";
    el.classList.remove("boxCursor");
  });
}

function loadQuestions() {
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      //   console.log(data);
      data.forEach((el) => {
        let temp = []; // Holder of the object information for the correct and the incorrect answers.

        // Loop through the incorrect answer array
        el.incorrect.forEach((ans) => {
          let tempObj = {
            response: ans,
            correct: false,
          }; // obj for holding information and set it up as an object
          temp.push(tempObj);
        });

        let tempObj = {
          response: el.correct,
          correct: true,
        }; // obj for holding information and set it up as an object
        temp.push(tempObj);
        console.log(temp);
        let mainTemp = { question: el.question, options: temp };
        questions.push(mainTemp); // Populate an array
      });
      console.log(questions);
      //   document.write(JSON.stringify(questions));
    });
}

function nextBtn() {
  btn.style.display = "block";
  cur++;
  if (cur >= questions.length) {
    btn.textContent = "See Score";
  } else {
    btn.textContent = "Next Question";
  }
}
