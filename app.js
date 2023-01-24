const url = "quiz.json";
const questions = []; // load all of the data into the questions array
const output = document.querySelector(".output");
const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
  newQuestion();
  btn.style.display = "none";
});

let cur = 0; // current question

window.addEventListener("DOMContentLoaded", () => {
  //   console.log("ready");
  loadQuestions();
});

function newQuestion() {
  console.log(cur);
  console.log(questions.length);
  console.log(questions[cur]);

  output.innerHTML = "";
  const el = questions[cur];
  const que1 = document.createElement("div");
  const ans1 = document.createElement("div");
  que1.textContent = el.question;
  el.options.forEach((ans) => {
    const div = document.createElement("div");
    div.textContent = ans.response;
    div.addEventListener("click", (e) => {
      console.log(ans.correct);
    });
    ans1.append(div);
  });

  output.append(que1);
  output.append(ans1);
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
