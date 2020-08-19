//all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

//questions
let questions = [
    {
        question : "Which of those doesn't have an index based structure?",
        choiceA : "Set",
        choiceB : "List",
        choiceC : "Maps",
        correct : "A"
    }, {
        question : "What does HTML stand for",
        choiceA : "HyphenText Markdown Language",
        choiceB : "HyperText Markup Language",
        choiceC : "HyphoTexted Mark Language",
        correct : "B"
    }, {
        question : "Methods such as reverse, shuffle are offered in:",
        choiceA : "Collections",
        choiceB : "objects",
        choiceC : "Apache",
        correct : "A"
    }, {
        question : "What does CSS stand for",
        choiceA : "Cascading Style Sheet",
        choiceB : "Cascade Styling Show",
        choiceC : "Concord Stying Sheet",
        correct : "A"
    }, {
        question : "What is the most basic language Microsoft made?",
        choiceA : "DirectX",
        choiceB : "Batch",
        choiceC : "Visual Basic",
        correct : "C"
    }, {
        question : "A Variable name in C includes which special symbols?",
        choiceA : "_ (underscore)",
        choiceB : "* (asterisk)",
        choiceC : "# (Hash)",
        correct : "A"
    }, {
        question : "Where is the JavaScript placed inside an HTML document or page?",
        choiceA : "in the <title> section",
        choiceB : "In the <body> and <head> section.",
        choiceC : "in the <meta> section",
        correct : "B"
    }, {
        question : "What can loops offer JavaScript code as a whole?",
        choiceA : "Improved performance.",
        choiceB : "Cross-platform support.",
        choiceC : "Cleaner syntax.",
        correct : "A"
    }, {
        question : "What is the object called that lets you work with both dates and time-related data?",
        choiceA : "Time Field",
        choiceB : "Time-warp",
        choiceC : "Dates",
        correct : "C"
    }, {
        question : "In JavaScript, what element is used to store and manipulate text usually in multiples?",
        choiceA : "Arrays",
        choiceB : "Strings",
        choiceC : "Function",
        correct : "B"
    }
];

//Varibles

const lastQuestion = questions. length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start the quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
  
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}