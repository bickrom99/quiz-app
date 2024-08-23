let Questions = [
    {
    numb : 1,
    question : 'What Does HTML Stand For?' ,
    answer :'Hyper Text Markup Language' ,
    options : [
        'Hyper Text Preprocesssor',
        'Hyper Text Markup Language',
        'Hyper Text Multiple Language',
        'Hyper Text Multi Language'
    ]
    },

    {
    numb : 2,
    question : 'What Does CSS Stand For?',
    answer : 'Cascading Style Sheet',
    options : [
        'Common Style Sheet',
        'Colorful Style Sheet',
        'Computer Style Sheet',
        'Cascading Style Sheet'
        ]
    },

    {
    numb : 3,
    question : 'What Does PHP Stand For?',
    answer : 'Hypertext Preprocesssor',
    options : [
        'Hypertext Preprocesssor',
        'Hypertext Programming',
        'Hypertext Preprogramming',
        'Hometext Preprocessor'
        ]
    },
    {
    numb : 4,
    question : 'What Does XML Stand For?',
    answer : 'eXtensible Markup Language',
    options : [
        'eXamine Markup Language',
        'eXtensible Multiple Language',
        'eXTra Multi-Program Language',
        'eXtensible Markup Language'
        ]
    }
];

const quizAppPage = document.querySelector('.quizApp');
const ruleBoxPage = document.querySelector('.ruleBox');
const questionsPage = document.querySelector('.Questions');
const first_btn = document.querySelector('.first_btn');
const exitButton = document.querySelector('.ExitButton');
const continueButton = document.querySelector('.ContinueButton');
const timeCount = document.querySelector('.TimeCount .timeRight');
const timeCounterLine = document.querySelector('.Questions .timeLine');




// ========secound page enter 
first_btn.addEventListener('click', (e)=> {
    e.preventDefault();
    quizAppPage.style.display = 'none';
    ruleBoxPage.style.display = 'block';
});

// ========Exit button 
exitButton.addEventListener('click', (e)=> {
    e.preventDefault();

    window.location.reload();
});



//======== continue button 
continueButton.addEventListener('click', (e)=> {
    e.preventDefault();
    ruleBoxPage.style.display = 'none';
    questionsPage.style.display = 'block';
    nextBtn.style.display = 'none';

    // Question show function
    showQuestion(0);
    // tiemrCounter
    timerCounter(15);
    // timercounterLine
    startCounterLine(0);
});


function showQuestion(index){
    const ques_text = document.querySelector('.text1');
    let ques_tag = "<span>" + Questions[index].numb + '.' + Questions[index].question + "</span>";
    ques_text.innerHTML = ques_tag;
    // option create work here
    const options_list = document.querySelector('.myQuestion');
    let options_tag = '<div class="options">' + Questions[index].options[0] + '</div>'
                    + '<div class="options">' + Questions[index].options[1] + '</div>'
                    + '<div class="options">' + Questions[index].options[2] + '</div>'
                    + '<div class="options">' + Questions[index].options[3] + '</div>';
    options_list.innerHTML = options_tag;

    // footer page count work here
    const total_question = document.querySelector('.total_question');
    let total_ques_tag = `<p> ${Questions[index].numb} of 4 </p>`;
    total_question.innerHTML = total_ques_tag;

    // option selected work here
    const option = options_list.querySelectorAll('.options');
    for (let i = 0; i< option.length; i++) {
        // onclick function create
        option[i].setAttribute('onclick', 'optionSelected(this)');
        // id create for pointerEvents = none
        option[i].setAttribute('id', 'select_pointer');
    }

    
}

let userSoce = 0;
// ========correct or wrong answer select function here
function optionSelected(answers){
    const options_list = document.querySelector('.myQuestion');
    // automatic option show right & wrong answe
    let allOptions = options_list.children.length;
    // options select work start here
    let userAns = answers.textContent;
    let correctAns = Questions[ques_count].answer; 
    if (userAns === correctAns) {
        userSoce += 1;
        document.querySelector('.ScoreValue').innerHTML = userSoce;
        answers.classList.add("correct");
    }else{
        answers.classList.add("Incorrect");
        // automatic option show right & wrong answe
        for (let i = 0; i < allOptions; i++) {
            if (options_list.children[i].textContent === correctAns) {
                options_list.children[i].setAttribute('class', "options correct")
            }
            
        }
    }
    
    // Anyone select then PointerEvents = 'none' 
    const select_poiter = options_list.querySelectorAll('#select_pointer');
    for (let i = 0; i< select_poiter.length; i++) {
        select_poiter[i].style.pointerEvents = 'none';
    }
    
    // options slect then nextBtn show
    nextBtn.style.display = 'block';
    clearInterval(counter);
    clearInterval(counterLine);
}

// ========next button work here
const nextBtn = document.querySelector('.nextBtn');
// -----Result-Box selected here
const result_box = document.querySelector('.result_box');
const Reple_quiz = document.querySelector('.result_buttons .resetBtn1');
const Exit_Quiz = document.querySelector('.result_buttons .resetBtn2');

let ques_count = 0;

nextBtn.addEventListener('click' , (e)=> {
    e.preventDefault();
    
    if (ques_count < Questions.length - 1) {
        ques_count ++;
        showQuestion(ques_count);
        clearInterval(counter);
        timerCounter(15);
        // timeLine
        clearInterval(counterLine);
        startCounterLine(0);
        nextBtn.style.display = 'none';
    }else{
        showResultBox();
    }   
    
});

// ======Result-Box 
function showResultBox(){
        ruleBoxPage.style.display = 'none';
        questionsPage.style.display = 'none';
        result_box.style.display = 'block';
        
}

Exit_Quiz.onclick = ()=> {
    window.location.reload();
}
Reple_quiz.onclick = ()=> {
    result_box.style.display = 'none';
    ruleBoxPage.style.display = 'block';
}


// ======timer counter program here
// ======timer counter program here
let counter;
function timerCounter(time){
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time.toString().padStart(2, 0);
        time--;

        if (timeCount.textContent === '00') {
            time = '00';
        }
        if(time === '00'){
            nextBtn.style.display = 'block';
            
        }
    }
    
}


// ======= timer counter line
let counterLine ;

function startCounterLine(time){
    counterLine = setInterval(timer, 45);
    function timer(){
        time += 1;
        timeCounterLine.style.width = time + 'px';
        if(time > 350){
            clearInterval(counterLine);
        }
    }
}

