document.addEventListener("DOMContentLoaded", function() {
    // Select the form element
    const form = document.querySelector("form");

    // Add event listener for form submission
    form.addEventListener("submit", function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Fetch trivia questions from the API
        fetch("https://opentdb.com/api.php?amount=10&category=20&type=multiple")
            // Parse the response as JSON
            .then(response => response.json())
            // Handle the retrieved data
            .then(data => {
                // Extract questions from the response
                const questions = data.results;
                // Display the fetched questions
                displayQuestions(questions);
            })
            // Handle errors during fetching
            .catch(error => console.error("Error fetching trivia questions:", error));
    });

    // Function to display questions
    function displayQuestions(questions) {
        // Get reference to the main content area
        const mainContent = document.getElementById("main-content");

        // Remove existing questions before adding new ones
        while (mainContent.firstChild) {
            mainContent.removeChild(mainContent.firstChild);
        }

        // Loop through each fetched question and create a card for it
        questions.forEach((question, index) => {
            const newCard = createCard(question);
            // Append the newly created card to the main content area
            mainContent.appendChild(newCard);
        });
    }

    // Function to create a card for a question
    function createCard(question) {
        // Create a new 'article' element
        const newCard = document.createElement("article");
        // Add 'card' class to the new card
        newCard.classList.add("card");

        // Create 'h2' element for card header and set its text content
        const newCardHeader = document.createElement("h2");
        newCardHeader.textContent = "Category: " + question.category;

        // Create 'p' element for question and set its text content
        const newCardQuestion = document.createElement("p");
        newCardQuestion.textContent = "Question: " + question.question;

        // Create 'button' element for toggling answer visibility and set its text content
        const newButton = document.createElement("button");
        newButton.textContent = "Show Answer";

        // Create 'p' element for answer and set its text content
        const newCardAnswer = document.createElement("p");
        // Add 'hidden' class to the answer paragraph initially
        newCardAnswer.classList.add("hidden");
        newCardAnswer.textContent = "Correct Answer: " + question.correct_answer;

        // Add event listener to toggle answer visibility on button click
        newButton.addEventListener("click", function() {
            newCardAnswer.classList.toggle("hidden");
        });

        // Append created elements to the new card
        newCard.appendChild(newCardHeader);
        newCard.appendChild(newCardQuestion);
        newCard.appendChild(newButton);
        newCard.appendChild(newCardAnswer);

        // Return the newly created card
        return newCard;
    }
});
