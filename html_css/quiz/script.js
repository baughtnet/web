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
    loginForm.addEventListener("submit", function(event) {
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
        // Redirect to next page
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
        radioInput.addEventListener("change", (event) => {
            if (event.target.checked) {
                if(optionIndex === question.answer) {
                    score++;
                    console.log(score);
                }
            }
        });
        // quizContainer.append(radioInput);
        // quizContainer.append(option);

        const label = document.createElement("label");
        label.textContent = option;
        label.appendChild(radioInput);

        quizContainer.append(label);
    });
    
    // disable buttons on first and last question
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
        const selectedAnswer = document.querySelector(`input[name='question]'][value='${question.answer}']:checked`);
        if (!selectedAnswer || selectedAnswer.value !== question.answer)  {
            incorrectAnswers += `<p><b>Question #{i + 1}:</b> {question.question}</p>`;
            incorrectAnswers += `<p>- Your answer: ${question.options[selectedAnswer ? selectedAnswer.value : 0]}<br></p>`;
            incorrectAnswers += `<p>- Correct answer: ${question.options[question.answer]}</p>`;
    }
}
    if (incorrectAnswers) {
        resultsContainer.innerHTML = `<h2>Incorrect Answers</h2>`
        resultsContainer.innerHTML += incorrectAnswers;
}
});

// Quiz questions
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Home Tool Markup Language", "Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Marking Language"],
        answer: 2
    },
    {
        question: "What is the primary purpose of css?",
        options: ["define website layout", "add interactivity to webpages", "style the appearance of webpages", "store data for web applications"],
        answer: 3
    },
    {
        question: "What tag defines a heading in an HTML document?",
        options: ["<p>", "<h1>", "<div>", "<span>"],
        answer: 2
    },
    {
        question: "Which attribute is used to uniquely identify an HTML element?",
        options: ["class", "style", "id", "src"],
        answer: 3
    },
    {
        question: "What HTML element is used to start an unordered list in an HTML document?",
        options: ["<br>", "<li>", "<div>", "<table>"],
        answer: 3
    },
    {
        question: "Which CSS property controls the background color of an element?",
        options: ["background-color", "color", "bg-color", "font-size"],
        answer: 1
    },
    {
        question: "What is the difference between inline and external styles in CSS?",
        options: ["Inline styles apply to all elements, external styles apply to specific elements.", "Inline styles are defined within the HTML tag, external styles are defined in a separate file.", "There is no difference, they are both used for the same purpose.", "External styles are slower, inline styles are faster."],
        answer: 2
    },
    {
        question: "How can you center an element horizontally using CSS?",
        options: ["text-align: center", "margin: 0 auto", "float: center", "align: center"],
        answer: 2
    },
    {
        question: "How do you link an external CSS file to an HTML document?",
        options: ["<link rel='stylesheet' href='style.css'>", "<style src='style.css'>", "<css href='style.css'>", "<link style='style.css'>"],
        answer: 1
    },
    {
        question: "How can you style all <p> elements on a webpage with the same font color?",
        options: ["<p style='color: red;'>", "p { color: red; }", ".paragraph { color: red; }", "body p { color: red; }"],
        answer: 3
    },
    {
        question: "How can you select a specific element with the ID 'main' and change its background color?",
        options: ["#main { background-color: blue; }", ".main { background-color: blue; }", "main { background-color: blue; }", "id='main' { background-color: blue; }"],
        answer: 1
    },
    {
        question: "What is the primary purpose of defining '<div>' elements with id attributes in HTML?",
        options: ["To structure the content logically", "To create hyperlinks", "To embed multimedia elements", "To generate dynamic content"],
        answer: 1
    },
    {   
        question: "What is a common use case for pseudo-classes in CSS?",
        options: ["Adding hover effects to elements", "Grouping elements with similar styles", "Creating custom HTML tags", "Defining animations for elements"],
        answer: 1
    },
];



// store info
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
        userAnswer: question.options[
          document.querySelector(`input[name='question'][value='${question.answer}']:checked`)?.value
        ] || "",
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