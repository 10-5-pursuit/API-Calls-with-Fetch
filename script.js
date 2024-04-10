const questionButton = document.querySelector('form button');
const main = document.querySelector('.centered');

async function fetchData() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');
        const data = await response.json();
        return data.results;
    } catch(error) {
        throw new Error('Error fetching the data');
    }
}

async function createCard() {
    const results = await fetchData();

    results.forEach(result => {
        const article = document.createElement('article');
        article.classList.add('card');
    
        const h2 = document.createElement('h2');
        h2.textContent = result.category;
        article.appendChild(h2);
    
        const p1 = document.createElement('p');
        p1.textContent = result.question;
        article.appendChild(p1);
    
        const buttonShowAnswer = document.createElement('button');
        buttonShowAnswer.textContent = 'Show Answer';
        article.appendChild(buttonShowAnswer);
    
        const p2 = document.createElement('p');
        p2.classList.add('hidden');
        p2.textContent = result.correct_answer;
        article.appendChild(p2);
    
        main.appendChild(article);

        buttonShowAnswer.addEventListener('click', (e) => {
            p2.classList.remove('hidden');
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
        
        for (let i = 0; i <= 9; i++) {
            createCard();
        }
    });
} else {
    console.error('.centered element not found.');
}