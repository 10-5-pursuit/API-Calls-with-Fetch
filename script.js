document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.card button');
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        answer.classList.toggle('hidden');
      });
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const main = document.querySelector('main');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const response = await fetch('https://opentdb.com/api.php?amount=10');
      const data = await response.json();
  
      main.innerHTML = ''; 
  
      data.results.forEach((question, index) => {
        const card = document.createElement('article');
        card.classList.add('card');
        const category = document.createElement('h2');
        category.textContent = `Category: ${question.category}`;
        const questionText = document.createElement('p');
        questionText.textContent = question.question;
        const button = document.createElement('button');
        button.textContent = 'Show Answer';
        const answer = document.createElement('p');
        answer.classList.add('hidden');
        answer.textContent = `Correct Answer: ${question.correct_answer}`;
  
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
  });