// Get the modal
document.addEventListener("DOMContentLoaded", showLoginModal);

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

// Quiz questions

const questions = [
    { 
        question: "What does HTML stand for?",
        options: ["Home Tool Markup Language", "Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Marking Language"],
        answer: 2
    } 
];

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultsContainer = document.getElementById("results");

function runQuiz(index) {
    let score = 0;
    const question = questions[index];
    quizContainer.innerHTML = `<h3>${question.question}</h3>`;

    // Create radio buttons
    question.options.forEach((option, optionIndex) => {
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "question";
        radioInput.value = optionIndex;
        // quizContainer.append(radioInput);
        // quizContainer.append(option);

        const label = document.createElement("label");
        label.textContent = option;
        label.appendChild(radioInput);

        quizContainer.append(label);
    });
}
