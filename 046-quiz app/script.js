let quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "no answer is correct",
    correct: "b",
  },
];

const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;
let currentOptionOrder = [];

const deselectAnswers = () => {
  answerElements.forEach((answer) => (answer.checked = false));
};

// Refactor getSelected() for Efficiency
const getSelected = (answersArray) => {
  // const answersArray = Array.from(answerElements);
  const checkedAnswer = answersArray.find(
    (answerElement) => answerElement.checked
  );
  // return checkedAnswer ? checkedAnswer.id : undefined;
  return checkedAnswer ? checkedAnswer.value : undefined;
};

const loadQuiz = () => {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionElement.innerText = currentQuizData.question;

  // Shuffle Answer Options
  currentOptionOrder = shuffle(["a", "b", "c", "d"]);
  [a_text, b_text, c_text, d_text].forEach((label, index) => {
    const key = currentOptionOrder[index];
    label.innerText = currentQuizData[key];
    answerElements[index].value = key;
  });
};

// Shuffle Question Order
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

quizData = shuffle(quizData);

loadQuiz();

submitButton.addEventListener("click", () => {
  const answersArray = Array.from(answerElements);
  const answer = getSelected(answersArray);
  if (answer) {
    // Provide Immediate Feedback
    const correctAnswer = quizData[currentQuiz].correct;
    const isCorrect = answer === correctAnswer;
    if (isCorrect) score++;
    // const correctElement = document.getElementById(correctAnswer);
    // const answerElement = document.getElementById(answer);
    const correctElement = answersArray.find(
      (element) => element.value === correctAnswer
    );
    const answerElement = answersArray.find(
      (element) => element.value === answer
    );

    correctElement.parentElement.classList.add("correct");
    if (!isCorrect) answerElement.parentElement.classList.add("incorrect");

    setTimeout(
      () => {
        correctElement.parentElement.classList.remove("correct");
        if (!isCorrect)
          answerElement.parentElement.classList.remove("incorrect");

        currentQuiz++;
        if (currentQuiz < quizData.length) loadQuiz();
        else {
          quiz.innerHTML = `
            <h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <button onclick="history.go(0)">Play Again</button>
        `;
        }
      },
      isCorrect ? 500 : 2000
    );
  }
});
