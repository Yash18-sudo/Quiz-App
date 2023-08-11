const api_url ="https://opentdb.com/api.php?amount=10&category=18&type=multiple";

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const playButton = document.getElementById("play-btn");
let final_ans;
let questionIndex = 0;
let score = 0;
let op_index=0;

function refreshPage() {
    // Use the location object to reload the current page
    location.reload();
}

async function getapi(api_url){
    
    const response = await fetch(api_url);
    let data = await response.json();
    
    
    let options = Object.assign({}, data.results[0].incorrect_answers);
    options.ans=data.results[op_index].correct_answer;
    final_ans=data.results[op_index].correct_answer//correct option
    let propertyValues = Object.values(options);//all options

    function shuffle(propertyValues) {
        propertyValues.sort(() => Math.random() - 0.5);
    }
    shuffle(propertyValues);
    


function showQuestion(){

    resetState();
    questionElement.innerHTML = data.results[questionIndex].question;
    
    options = Object.assign({}, data.results[op_index].incorrect_answers);
    options.ans=data.results[op_index].correct_answer;
    final_ans=data.results[op_index].correct_answer//correct option
    propertyValues = Object.values(options);//all options
    shuffle(propertyValues);
    op_index++;

    propertyValues.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        button.addEventListener("click",selectAnswer);
    });
    }

    function resetState() {
        nextButton.style.display = "none";
        while(answerButtons.firstChild)
        {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }   

    function selectAnswer(event)
    {
        const selectedButton = event.target;
        if (selectedButton.textContent == final_ans) {
            selectedButton.classList.add('correct');
            score++;
        } else {
            selectedButton.classList.add('incorrect');
        }
        
        Array.from(answerButtons.children).forEach(button => {

            if(button.textContent == final_ans){
                button.classList.add('correct');
            }
            button.disabled=true;
        });
        
        nextButton.style.display = "block";
    }

    function showScore(){
        resetState();
        questionElement.innerHTML = `You Scored ${score} out of 10`;
        playButton.style.display = "block";
    }

    function handleNextButton(){
        questionIndex++;
        if(questionIndex < data.results.length)
        {
            showQuestion();
        }
        else{
            showScore();
        }
    }
 
    nextButton.addEventListener("click", ()=>{
        if(questionIndex < data.results.length)
        {
            handleNextButton();
        }else{
            startQuiz();
        }
    });
    

function startQuiz(){
    
    nextButton.innerHTML = "Next";
    showQuestion();
}


startQuiz();
    
}


getapi(api_url);
console.log("Developed By Yash");