const questionButton = document.querySelector('form button');
const main = document.querySelector('.centered');
const selectWarning = document.querySelector('.selectWarning');

const selectElement = document.querySelector('.questDifficulty');
let selectedOptionValue = null;

selectElement.addEventListener('change', (e) => {
    selectedOptionValue = selectElement.value;
});

async function fetchData(difficultyLevel) {
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=${difficultyLevel}&type=multiple`);
    const data = await response.json();
    return data.results;
}

async function createCard() {
    const results = await fetchData(selectedOptionValue);

    results.forEach(result => {
        const article = document.createElement('article');
        article.classList.add('card');

        const h2 = document.createElement('h2');
        h2.innerHTML = result.category;
        article.appendChild(h2);

        const p1 = document.createElement('p');
        p1.innerHTML = result.question;
        article.appendChild(p1);

        const buttonShowAnswer = document.createElement('button');
        buttonShowAnswer.textContent = 'Show Answer';
        article.appendChild(buttonShowAnswer);

        const p2 = document.createElement('p');
        p2.classList.add('hidden');
        p2.style.color = 'green';
        p2.innerHTML = result.correct_answer;
        article.appendChild(p2);

        if (result.difficulty === 'easy') {
            article.style.borderColor = '#4f7d5d';
        } else if (result.difficulty === 'medium') {
            article.style.borderColor = 'orange';
        } else if (result.difficulty === 'hard') {
            article.style.borderColor = 'red';
        }

        main.appendChild(article);

        buttonShowAnswer.addEventListener('click', () => {
            p2.classList.toggle('hidden');
        });
    });
}

function removeArticles() {
    const articles = document.querySelectorAll('article');

    articles.forEach(article => {
        main.removeChild(article);
    });
}

if (main) {
    questionButton.addEventListener('click', (e) => {
        e.preventDefault();
        removeArticles();

        if (selectedOptionValue) {
            selectWarning.style.display = 'none';
            for (let i = 0; i < 10; i++) {
                createCard();
            }
        } else {
            console.error('Please select a difficulty level.');
            selectWarning.style.display = 'block';
        }
    });
} else {
    console.error('.centered element not found.');
    alert('(!) .centered element not found. (!)');
}
