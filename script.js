const form = document.querySelector("form");
const main = document.querySelector("main");

const BASE_URL = "https://opentdb.com/api.php?";
const results = {
  correct: 0,
  incorrect: 0,
};
let amount = 5;


// Mock Data
data = form.addEventListener("submit", (event) => {
  event.preventDefault();
  reset();
  const category = event.target.category.value;
  const difficulty = event.target.difficulty.value;
  let queryUrl = BASE_URL;
  queryUrl +=`amount=${amount}`

  if (category != "any") {
    queryUrl += `&category=${category}`;
  }
  if (difficulty != "any") {
    queryUrl += `&difficulty=${difficulty}`;
  }
  fetch(queryUrl)
    .then((response) => {
      // Convert response into JSON
      return response.json();
    })
    .then((responseJSON) => {
      const results = responseJSON.results;
      results.forEach((data) => {
        // console.log(data.type);
        addCard(data);
      });
    })
    .catch((err) => {
      // Deal with errors
      console.log("error");
    });
  // Clear form
  event.target.category.value = "any";
  event.target.difficulty.value = "any";
});

function addCard(data) {
  //   Create card
  const card = document.createElement("article");
  const difficulty = data.difficulty;
  card.classList.add("card", difficulty);

  // Card Category
  const category = document.createElement("h2");
  category.innerHTML = data.category;
  card.appendChild(category);

  //   Card Question
  const question = document.createElement("p");
  question.innerHTML = data.question;
  card.appendChild(question);

  //   Card Answer options
  const options = document.createElement("div");
  options.classList.add("options");
  const { correct_answer, incorrect_answers } = data;
  const answers = randomizeArr([correct_answer, ...incorrect_answers]);
  for (const answer of answers) {
    const button = document.createElement("button");
    button.classList.add("card-option");
    button.innerHTML = answer;
    button.addEventListener("click", (event) => {
      if (event.target.innerHTML == correct_answer) {
        event.target.style.backgroundColor = "#3dd86b";
        results.correct++;
      } else {
        event.target.style.backgroundColor = "#9d4f4f";
        results.incorrect++;
      }
      event.target.parentElement.childNodes.forEach((element) => {
        element.disabled = true;
      });

      if (results.incorrect + results.correct == amount) {
        alert(
          `Total:\nCorrect: ${results.correct}\nIncorrect: ${results.incorrect}`
        );
      }
    });

    options.appendChild(button);
  }

  card.appendChild(options);

  main.appendChild(card);
}

function reset() {
  results.correct = 0;
  results.incorrect = 0;
  main.innerHTML = "";
}

function randomizeArr(arr) {
  for (let idx = arr.length - 1; idx >= 0; idx--) {
    const randomIdx = Math.floor(Math.random() * (idx + 1));
    [arr[idx], arr[randomIdx]] = [arr[randomIdx], arr[idx]];
  }
  return arr;
}