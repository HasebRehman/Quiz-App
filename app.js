
// API URL
let URL = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";

// Access the fields by DOM
let printQues = document.querySelector("#question-1");
let msgCon = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let giveUp = document.querySelector(".give-up");

// Access buttons and put it into array
let btnOptions = [
    document.querySelector("#opt-1"),
    document.querySelector("#opt-2"),
    document.querySelector("#opt-3"),
    document.querySelector("#opt-4")
];

// Assign some data
let questions = [];
let currentQuestion = 0;
let correctAns = 0;
let wrongAns = 0;
let quizOver = false;

// shuffle function for shuffling the option
const shuffleOptions = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// print question and options
const showQuestion = (ques) => {
    let q = questions[ques];

    // print question data
    printQues.innerText = q.question;

    // Add the correct and incorrect options into an array
    let options = [q.correct_answer, q.incorrect_answers];
    shuffleOptions(options);  // shuffle these options

    // place the shuffled option into the button
    btnOptions.forEach((btn, idx) => {
        btn.innerText = options[idx];
        btn.disabled = false; 
    });
}


btnOptions.forEach((btn) => {
    // button when clicked
    btn.addEventListener("click", () => {
        if (quizOver) {
            return;
        }

        const q = questions[currentQuestion];

        btnOptions.forEach((b) => {
            b.disabled = true;
        });

        // if answer is correct
        if (btn.innerText === q.correct_answer) {
            correctAns++;
            btn.style.backgroundColor = "green";
            btn.style.color = "white";

        } else {  // if answer is wrong
            wrongAns++;
            btn.style.backgroundColor = "red";
            btn.style.color = "white";

        }
        
        // color become normal
        setTimeout(() => {
            btn.style.backgroundColor = "";
            btn.style.color = "";

        }, 500);


        setTimeout(() => {
            // run the loop of the questions
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);

            } else {  // if the questions end
                quizOver = true;
                msgCon.classList.remove("hide");
                msg.innerText = `${correctAns} correct, ${wrongAns} wrong`;

            }

        }, 500);
    });
});

// handle giveup button
giveUp.addEventListener("click", () => {
    if (quizOver) return;

    wrongAns++;

    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            quizOver = true;
            msgCon.classList.remove("hide");
            msg.innerText = `${correctAns} correct, ${wrongAns} wrong`;
        }
    }, 500);
})


// start the quiz
const multipleQuizApp = async () => {
    // fetch and formating the API data
    let data = await fetch(URL);
    let res = await data.json();
    questions = res.results;
    showQuestion(currentQuestion);
}

multipleQuizApp();
