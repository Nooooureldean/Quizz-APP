let form = document.querySelector('.start-quiz');
let categoryMenu = document.getElementById('categoryMenu');
let level = document.querySelector('#difficultyOptions');
let numberofQS = document.querySelector('.form-control');
let btnStart = document.querySelector('#startQuiz');
let mYRow = document.querySelector('.questions .container .row');
let myQuiz;
let QS;

btnStart.addEventListener('click', async function () {
    let category = categoryMenu.value;
    let difficulty = level.value;
    let number = numberofQS.value;
    
    myQuiz = new Quiz(category, difficulty, number);
    QS = await myQuiz.getAllQuestions();
    console.log(QS);
    form.classList.replace('d-flex', 'd-none');
    let myQS = new Question(0);
    myQS.display();
});

class Quiz {
    constructor(category, difficulty, number) {
        this.category = category;
        this.difficulty = difficulty;
        this.number = number;
        this.score = 0;
    }

    getApi() {
        return `https://opentdb.com/api.php?amount=${this.number}&category=${this.category}&difficulty=${this.difficulty}`;
    }

    async getAllQuestions() {
        let res = await fetch(this.getApi());
        let data = await res.json();
        return data.results;
    }
}

class Question {
    constructor(index) {
        this.index = index;
        this.question = QS[index].question;
        this.category = QS[index].category;
        this.difficulty = QS[index].difficulty;
        this.correct_answer = QS[index].correct_answer;
        this.incorrect_answers = QS[index].incorrect_answers;
        this.myAllAnswer = this.getAllAnswers();
        this.is_Answer = false;
    }

    getAllAnswers() {
        let allAn = [...this.incorrect_answers, this.correct_answer];
        allAn.sort();
        return allAn;
    }

    display() {
        const questionMarkUp = `
        <div class="question shadow-lg col-lg-6 offset-lg-3 p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn">
            <div class="w-100 d-flex justify-content-between">
                <span class="btn btn-category">${this.category}</span>
                <span class="fs-6 btn btn-questions">${this.index + 1} of ${QS.length}</span>
            </div>
            <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
            <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
                ${this.myAllAnswer.map((answer) => `<li>${answer}</li>`).join('')}
            </ul>
            <h2 class="text-capitalize text-center score-color h3 fw-bold">
                <i class="bi bi-emoji-laughing"></i> Score: ${myQuiz.score}
            </h2>        
        </div>
        `;

        mYRow.innerHTML = questionMarkUp;

        let allChoices = document.querySelectorAll('.choices li');
        allChoices.forEach((li) => li.addEventListener('click', () => {
            this.checkAnswer(li);
            this.nextQs();
        }));
    }

    checkAnswer(choice) {
        if (!this.is_Answer) {
            this.is_Answer = true;
            if (choice.innerHTML === this.correct_answer) {
                choice.classList.add('correct', 'animate__animated', 'animate__shakeY');
                myQuiz.score++;
            } else {
                choice.classList.add('wrong', 'animate__animated', 'animate__shakeX');
                this.highlightCorrectAnswer();
            }
        }
    }

    highlightCorrectAnswer() {
        let allChoices = document.querySelectorAll('.choices li');
        allChoices.forEach((li) => {
            if (li.innerHTML === this.correct_answer) {
                li.classList.add('correct', 'animate__animated', 'animate__shakeY');
            }
        });
    }

    nextQs() {
        this.index++;
        if (this.index < QS.length) {
            setTimeout(() => {
                let newQS = new Question(this.index);
                newQS.display();
            }, 2000);
        } else {
            console.log('finish');
            this.showResults();
            document.querySelector('.again').addEventListener('click', function () {
                window.location.reload();
            });
        }
    }

    showResults() {
        const resultMarkup = `
        <div class="result shadow-lg col-lg-6 offset-lg-3 p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn">
            <h2 class="text-capitalize text-center h4">${myQuiz.score === myQuiz.number ? 'Congratulations' : 'Quiz Finished'}</h2>
            <h3 class="text-capitalize text-center h4">Your Score: ${myQuiz.score}</h3>
            <button class="again btn btn-primary rounded-pill"><i class="bi bi-arrow-repeat"></i> Try Again</button>
        </div>
        `;
        mYRow.innerHTML = resultMarkup;
    }
}
