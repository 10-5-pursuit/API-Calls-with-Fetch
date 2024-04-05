const form = document.querySelector("form");
const main = document.querySelector("main");

const BASE_URL = "https://opentdb.com/api.php?amount=10";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(BASE_URL)
    .then((response) => response.json()) // Convert response into JSON
    .then((responseJSON) => {
      const results = responseJSON.results;
      results.forEach((data) => {
        addCard(data);
      });
    });
});

function addCard(data) {
  // Card Data
  const category = document.createElement("h2");
  category.innerHTML = data.category;

  const question = document.createElement("p");
  question.innerHTML = data.question;

  const correctAnswer = document.createElement("p");
  correctAnswer.classList.add("hidden");
  correctAnswer.innerHTML = data.correct_answer;

  //   Card button
  const button = document.createElement("button");
  button.innerText = "Show Answer";
  button.addEventListener("click", (event) => {
    correctAnswer.classList.remove("hidden");
  });

  //   Create card
  const card = document.createElement("article");
  card.classList.add("card");

  card.append(category, question, button, correctAnswer);

  main.appendChild(card);
}
