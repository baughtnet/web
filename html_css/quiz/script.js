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
    }, 
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
        question: "What element is used to group related content in an HTML document?",
        options: ["<br>", "<li>", "<div>", "<table>"],
        answer: 3
    },
    {
        question: Which CSS property controls the background color of an element?
        options: ["background-color", "color", "text-align", "font-size"],
        answer: 1
    },
    {
        question: What is the difference between inline and external styles in CSS?
        options: ["Inline styles apply to all elements, external styles apply to specific elements.", "Inline styles are defined within the HTML tag, external styles are defined in a separate file.", "There is no difference, they are both used for the same purpose.", "External styles are slower, inline styles are faster."],
        answer: 2
    },
    {
        question: How can you center an element horizontally using CSS?
        options: ["text-align: center", "margin: 0 auto", "float: center", "align: center"],
        answer: 2
    },
    {
        question: How do you link an external CSS file to an HTML document?
        options: ["<link rel='stylesheet' href='style.css'>", "<style src='style.css'>", "<css href='style.css'>", "<link style='style.css'>"],
        answer: 1
    },
    {
        question: How can you style all <p> elements on a webpage with the same font color?
        options: ["<p style='color: red;'>", "p { color: red; }", ".paragraph { color: red; }", "body p { color: red; }"],
        answer: 3
    },
    {
        question: How can you select a specific element with the ID "main" and change its background color?
        options: ["#main { background-color: blue; }", ".main { background-color: blue; }", "main { background-color: blue; }", "id='main' { background-color: blue; }"],
        answer: 1
    },
    {
        question: What is the difference between display: block and display: inline?
        options: ["Block elements take up the full width available, inline elements only take up the space needed for their content.", "Block elements are used for headings and paragraphs, inline elements are used for text and links.", "Both display properties are the same, there is no difference.", "Block elements are faster to render, inline elements are slower."],
        answer: 1
    }

4. Combining HTML & CSS:

5. Advanced Concepts:

question: What is a common use case for pseudo-classes in CSS?
options: ["Adding hover effects to elements", "Grouping elements with similar styles", "Creating custom HTML tags", "Defining animations for elements"],
answer: 1
question: Briefly explain the concept of responsive design in web development.
options: ["Making websites accessible to people with disabilities", "Optimizing websites for different screen sizes and devices", "Improving website loading speed", "Ensuring website compatibility with different browsers"],
answer: 2
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
