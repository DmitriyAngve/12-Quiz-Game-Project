const url = "quiz.json";
const questions = []; // load all of the data into the questions array
let cur = 0; // current question

window.addEventListener("DOMContentLoaded", () => {
  console.log("ready");
  loadQuestions();
});

function loadQuestions() {
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      console.log(data);
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

        let mainTemp = { question: el.question };
      });
    });
}
