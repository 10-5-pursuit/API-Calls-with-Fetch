document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        fetchTriviaQuestions();
    });
});

function fetchTriviaQuestions() {
    fetch('https://opentdb.com/api.php?amount=10&category=14&difficulty=easy&type=multiple')
        .then(response => response.json())
        .then(data => {
            displayQuestions(data.results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to display questions
function displayQuestions(questions) {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';

    questions.forEach(question => {
        //Create a a new article element for each question.
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
          <h2>${question.category}</h2>
          <p>${question.question}</p>
          <button>Show Answer</button>
          <p class="hidden">${question.correct_answer}</p>
        `;

        // Add an event listener to the 'Show Answer' button
        card.querySelector('button').addEventListener('click', function () {
            this.nextElementSibling.classList.toggle('hidden');
        });

        questionsContainer.appendChild(card);
    });
}