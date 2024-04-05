const triviaForm = document.getElementById("triviaForm");
const triviaContainer = document.getElementById("triviaContainer");
const categorySelect = document.getElementById("category");

triviaForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const categoryId = categorySelect.value;
  const apiUrl = `https://opentdb.com/api.php?amount=10&category=${categoryId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const triviaQuestions = data.results;

    triviaContainer.innerHTML = "";

    triviaQuestions.forEach((question) => {
      const card = document.createElement("article");
      card.classList.add("card");

      // Add difficulty class based on question difficulty
      if (question.difficulty === "easy") {
        card.classList.add("easy");
      } else if (question.difficulty === "medium") {
        card.classList.add("medium");
      } else if (question.difficulty === "hard") {
        card.classList.add("hard");
      }

      const difficultyElement = document.createElement("div");
      difficultyElement.classList.add("difficulty");
      difficultyElement.textContent = `Difficulty: ${question.difficulty}`;
      card.appendChild(difficultyElement);

      const categoryElement = document.createElement("h2");
      categoryElement.textContent = question.category;
      card.appendChild(categoryElement);

      const questionElement = document.createElement("p");
      questionElement.innerHTML = decodeURIComponent(question.question);
      card.appendChild(questionElement);

      const answersContainer = document.createElement("div");
      answersContainer.classList.add("answers");

      const answers = [
        ...question.incorrect_answers,
        question.correct_answer,
      ].sort(() => Math.random() - 0.5);

      answers.forEach((answer) => {
        const answerElement = document.createElement("button");
        answerElement.classList.add("answer");
        answerElement.innerHTML = decodeURIComponent(answer);
        answerElement.addEventListener("click", () => {
          const correctAnswer = card.querySelector(".correct");
          correctAnswer.classList.remove("initial");
          correctAnswer.classList.add("highlighted");
          answerElement.classList.add("selected");
        });
        if (answer === question.correct_answer) {
          answerElement.classList.add("correct", "initial");
        }
        answersContainer.appendChild(answerElement);
      });

      card.appendChild(answersContainer);

      triviaContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
  }
});
