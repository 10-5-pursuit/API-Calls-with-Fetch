document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const main = document.querySelector('main');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const response = await fetch('https://opentdb.com/api.php?amount=10');
      const data = await response.json();
  
      main.innerHTML = ''; //clears previous questions
  
      data.results.forEach((question, index) => {
        const card = document.createElement('article');
        card.classList.add('card');
        const category = document.createElement('h2');
        category.textContent = `Category: ${decodeHtml(question.category)}`; // decode HTML 
        const questionText = document.createElement('p');
        questionText.textContent = decodeHtml(question.question); // decode HTML 
        const button = document.createElement('button');
        button.textContent = 'Show Answer';
        const answer = document.createElement('p');
        answer.classList.add('hidden');
        answer.textContent = `Correct Answer: ${decodeHtml(question.correct_answer)}`; // decode HTML
  
        button.addEventListener('click', function() {
          answer.classList.toggle('hidden');
        });
  
        card.appendChild(category);
        card.appendChild(questionText);
        card.appendChild(button);
        card.appendChild(answer);
        main.appendChild(card);
      });
    });
  
    // decodes HTML entities
    function decodeHtml(html) {
      var txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    }
  });
  