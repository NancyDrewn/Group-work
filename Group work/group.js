const quizzes = [
    {
        title: "Math Quiz",
        questions: [
            {
                question: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correctAnswer: 1
            },
            {
                question: "What is 3 * 4?",
                options: ["8", "10", "12", "14"],
                correctAnswer: 2
            }
        ]
    },
    {
        title: "Science Quiz",
        questions: [
            {
                question: "What is the chemical symbol for water?",
                options: ["H2O", "CO2", "O2", "NaCl"],
                correctAnswer: 0
            },
            {
                question: "What is the largest planet in our solar system?",
                options: ["Earth", "Jupiter", "Mars", "Venus"],
                correctAnswer: 1
            }
        ]
    }
];

const quizList = document.getElementById('quiz-list');
const quizElement = document.getElementById('quiz');
const resultsElement = document.getElementById('results');

function loadQuizSelection() {
    quizzes.forEach((quiz, index) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = quiz.title;
        button.addEventListener('click', () => loadQuiz(index));
        li.appendChild(button);
        quizList.appendChild(li);
    });
}

function loadQuiz(quizIndex) {
    const quiz = quizzes[quizIndex];
    let output = '';
    quiz.questions.forEach((question, index) => {
        output += `
            <div class="question">
                <h2>Question ${index + 1}:</h2>
                <p>${question.question}</p>
                <ul>
                    ${question.options.map((option, optionIndex) => `
                        <li>
                            <label>
                                <input type="radio" name="question${index}" value="${optionIndex}">
                                ${option}
                            </label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    });
    output += `<button onclick="checkAnswers(${quizIndex})">Submit Answers</button>`;
    quizElement.innerHTML = output;
}

function checkAnswers(quizIndex) {
    const quiz = quizzes[quizIndex];
    const userAnswers = [];
    quiz.questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            userAnswers.push(parseInt(selectedOption.value));
        } else {
            userAnswers.push(null);
        }
    });

    let score = 0;
    let correctAnswers = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quiz.questions[index].correctAnswer) {
            score++;
            correctAnswers++;
        }
    });

    const totalQuestions = quiz.questions.length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const percentage = (score / totalQuestions) * 100;

    resultsElement.innerHTML = `
        <h2>Quiz Results</h2>
        <p>Score: ${score}/${totalQuestions}</p>
        <p>Correct Answers: ${correctAnswers}</p>
        <p>Incorrect Answers: ${incorrectAnswers}</p>
        <p>Percentage: ${percentage.toFixed(2)}%</p>
    `;
}

loadQuizSelection();
