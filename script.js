const form = document.querySelector("form");
const main = document.querySelector("main");

const BASE_URL = "https://opentdb.com/api.php?amount=10";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const category = event.target.category.value;
  const difficulty = event.target.difficulty.value;
  let queryUrl = BASE_URL;

  if (category != "any") {
    queryUrl += `&category=${category}`;
  }
  if (difficulty != "any") {
    queryUrl += `&difficulty=${difficulty}`;
  }
  console.log(queryUrl);

  fetch(queryUrl)
    .then((response) => response.json()) // Convert response into JSON
    .then((responseJSON) => {
      const results = responseJSON.results;
      results.forEach((data) => {
        console.log("Difficulty", data.difficulty);
        console.log("Category", data.category);
        console.log("==");
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
  const difficulty = data.difficulty;
  card.classList.add("card", difficulty);

  card.append(category, question, button, correctAnswer);

  main.appendChild(card);
}
