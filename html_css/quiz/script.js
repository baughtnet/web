const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultsContainer = document.getElementById("results");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let currentQuestionIndex = 0;
let score = 0;

// Get the modal
document.addEventListener("DOMContentLoaded", showLoginModal);

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    runQuiz(currentQuestionIndex);
});

prevButton.addEventListener("click", () => {
    currentQuestionIndex--;
    runQuiz(currentQuestionIndex);
});

function showLoginModal() {
    document.getElementById("loginModal").classList.remove("hidden");
    checkLogin();
}

function checkLogin() {
    // Check if login form is submitted
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Process login info
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const studentNumber = document.getElementById("studentNumber").value;

        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Student Number:", studentNumber);

        // You can store the information using localStorage, cookies, or server-side scripting for persistence (optional)
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("studentNumber", studentNumber);

        if (firstName && lastName && studentNumber) {
            // Redirect to the next page
            document.getElementById("loginModal").classList.add("hidden");
            document.getElementById("quizModal").classList.remove("hidden");

            // Run quiz
            runQuiz(0);
        }
    });
}

function runQuiz(index) {
    const question = questions[index];
    quizContainer.innerHTML = `<h3>${question.question}</h3>`;

    // Create radio buttons
    question.options.forEach((option, optionIndex) => {
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "question";
        radioInput.value = optionIndex;
        radioInput.addEventListener("change", () => {
            if (radioInput.checked) {
                if (optionIndex === question.answer) {
                    score++;
                    console.log(score);
                    console.log(optionIndex);
                }
            }
        });

        const label = document.createElement("label");
        label.textContent = option;
        label.appendChild(radioInput);

        quizContainer.append(label);
    });

    // Disable buttons on the first and last question
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = currentQuestionIndex === questions.length - 1;
}

submitButton.addEventListener("click", () => {
    questions.forEach((question) => {
        const selectedAnswer = document.querySelector(`input[name='question'][value='${question.answer}']:checked`);
        if (selectedAnswer) {
            score++;
        }
    });

    resultsContainer.innerHTML = `<h2>Your score is ${score} out of ${questions.length}</h2>`;

    let incorrectAnswers = "";
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const selectedAnswer = document.querySelector(`input[name='question'][value='${question.answer}']:checked`);
        if (!selectedAnswer || selectedAnswer.value !== question.answer) {
            incorrectAnswers += `<p><b>Question #${i + 1}:</b> ${question.question}</p>`;
            incorrectAnswers += `<p>- Your answer: ${question.options[selectedAnswer ? selectedAnswer.value : 0]}<br></p>`;
            incorrectAnswers += `<p>- Correct answer: ${question.options[question.answer]}</p>`;
        }
    }

    if (incorrectAnswers) {
        resultsContainer.innerHTML += `<h2>Incorrect Answers</h2>`;
        resultsContainer.innerHTML += incorrectAnswers;
    }
});

// Quiz questions
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Home Tool Markup Language", "Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Marking Language"],
        answer: 1
    },
    {
        question: "What is the primary purpose of css?",
        options: ["define website layout", "add interactivity to webpages", "style the appearance of webpages", "store data for web applications"],
        answer: 2
    },
    // Add more questions as needed
];

// Store info
const firstName = localStorage.getItem("firstName");
const lastName = localStorage.getItem("lastName");
const studentNumber = localStorage.getItem("studentNumber");

if (firstName && lastName && studentNumber) {
    const quizData = {
        firstName,
        lastName,
        studentNumber,
        score,
        questions: questions.map((question) => ({
            question: question.question,
            userAnswer: question.options[document.querySelector(`input[name='question'][value='${question.answer}']:checked`)?.value] || "",
            correctAnswer: question.options[question.answer],
        })),
    };

    // You can use localStorage, cookies, server-side scripting, or any other preferred method to store the quizData object here
    // For example, using localStorage:
    localStorage.setItem("quizData", JSON.stringify(quizData));

    // Display a message indicating successful storage (optional)
    resultsContainer.innerHTML += `<p>Your quiz information has been stored.</p>`;
} else {
    resultsContainer.innerHTML += `<p>Please enter your information in the login modal to store the quiz results.</p>`;
}

// Initial setup
runQuiz(currentQuestionIndex); // Display the first question
