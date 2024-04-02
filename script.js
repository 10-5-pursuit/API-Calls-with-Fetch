let main = document.querySelector("main");

fetch(`https://opentdb.com/api.php?amount=10`)
.then((response) => response.json())
.then((fetchedJSON) => displayQs(fetchedJSON.results))
.catch((error) => alert(`This API is having issues. Please try again!\n(${error})`));

function displayQs(questions){
    for (const question of questions){
        let article = document.createElement("article");
        article.className = "card";

        let h2 = document.createElement("h2");
        h2.innerHTML = question.category;

        let p1 = document.createElement("p");
        p1.innerHTML = question.question;

        let button = document.createElement("button");
        button.innerText = "Show Answer";
        button.addEventListener("click", () =>{
            button.style.display = "none";
            p2.style.display = "block";
        })

        let p2 = document.createElement("p");
        p2.className = "hidden";
        p2.innerText = question.correct_answer;

        article.append(h2, p1, button, p2);

        main.append(article);
    }
}