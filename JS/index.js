import quizData from "./quiz-data.js";

const formQuiz = document.querySelector(".form");

const fragment = document.createDocumentFragment();

function createQuestion(questionObj, indx) {
  const section = document.createElement("section");
  section.classList.add("section-question");

  const questionText = document.createElement("h3");
  questionText.classList.add("question");
  questionText.textContent = indx + 1 + ". " + questionObj.question;

  section.append(questionText);
  const ol = createAnswers();
  questionObj.choices.forEach(el => {
    let choiceItem = createAnswerItem(el, `${indx}`);
    ol.append(choiceItem);
  });
  section.append(ol);
  fragment.append(section);
}

function createAnswers() {
  const answersList = document.createElement("ol");
  answersList.classList.add("answers-list");
  return answersList;
}

function createAnswerItem(choice, idx) {
  const answerItem = document.createElement("li");
  answerItem.classList.add("answer-item");

  const answerLabel = document.createElement("label");
  answerLabel.classList.add("answer-label");
  answerLabel.textContent = choice;

  const answerInput = document.createElement("input");
  answerInput.setAttribute("type", "radio");
  answerInput.setAttribute("name", idx);
  answerInput.setAttribute("value", choice);

  answerLabel.prepend(answerInput);
  answerItem.append(answerLabel);

  return answerItem;
}

quizData.questions.forEach((questionData, indx) => {
  createQuestion(questionData, indx);
});

const quizTitle = document.createElement('h2');
quizTitle.classList.add('quiz_title');
quizTitle.textContent = quizData.title;

formQuiz.prepend(quizTitle, fragment);

formQuiz.addEventListener("submit", handleSubmWithFormData);

function handleSubmWithFormData(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  let data = [];
  formData.forEach(name => {
    data.push(name);
  });

  let correctAnswers = [];
  quizData.questions.forEach(questionData => {
    correctAnswers.push(questionData.choices[questionData.answer]);
  });

  const score = data.reduce((acc, value, idx) => {
    if (value === correctAnswers[idx]) {
      acc += 1;
    }

    return acc;
  }, 0);

  if (score / data.length >= 0.8) {
    alert(
      `Поздравляем! Вы сдали - правильно ответили на ${Math.round(
        (score / data.length) * 100
      )}% вопросов`
    );
  } else
    alert(
      `Поздравляем! Вы лузер - правильно ответили на ${Math.round(
        (score / data.length) * 100
      )}% вопросов`
    );
  event.target.reset();
}
