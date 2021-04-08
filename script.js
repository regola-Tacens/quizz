let givenAnswers =[]
let rightAnswers =['réponse1','eric', 'garagiste', 'homme politique']
let questionIndex = 0
let questions = [
    ['Quel était le prénom de Picasso ?', 'pierre', 'eric', 'pablo'],
    ['Delacroix était un :', 'sculpteur', 'peintre', 'garagiste'],
    ['Andre malraux était un :', 'écrivain', 'homme politique', 'indien']

]
let nextQuestion
let score = 0
let initialState = true


let mainDiv = document.createElement('div')
mainDiv.className='main'
document.body.appendChild(mainDiv)

let headerDiv = document.createElement('div')
headerDiv.innerHTML = `<h3>BEST QUIZZ EVER !!</h3><br> Question ${questionIndex +1} / ${questions.length +1}` 
mainDiv.appendChild(headerDiv)



//rejourer la partie
const resetGame = () => {
    score = 0
    initialState = true
    questionIndex = 0
    givenAnswers =[]
    headerDiv.innerHTML = `<h3>BEST QUIZZ EVER !!</h3><br> Question ${questionIndex +1} / ${questions.length +1}` 
    addQuestion()
} 

// Calcul du score
const result =()=>{    
    givenAnswers.forEach((ans, index) => {
        console.log(ans, index, rightAnswers[index])       
        if (rightAnswers[index] === ans ) {
            console.log('ok score = ', score)
            score = score +1
        }
    })
    headerDiv.innerHTML =  `<h2>vous avez un score de : ${score}`
    const playAgainBtn = document.createElement('button')
    playAgainBtn.innerText='rejouez la partie !'
    headerDiv.appendChild(playAgainBtn)
    playAgainBtn.addEventListener('click', () => resetGame())
    
}

// fonction pour le bouton next Question
const addQuestion = ()=>{
    let toErase = document.querySelector('.main')
    let nested = document.querySelector('#blocQuestions')
    nested && toErase.removeChild(nested)
    if(questionIndex === questions.length) {
        result()
    } 
    if(initialState) {
        nextQuestion = new Question ('premiere question', 'réponse1', 'réponse 2', 'réponse 3') 
        initialState = false

    } else if (!initialState && questionIndex !== questions.length) {
        nextQuestion = new Question (questions[questionIndex][0], questions[questionIndex][1], questions[questionIndex][2], questions[questionIndex][3])  
        questionIndex++
        headerDiv.innerHTML = `<h3>BEST QUIZZ EVER !!</h3><br> Question ${questionIndex +1} / ${questions.length +1}` 
    }
}

class Question {
    
    constructor(quest, ans1, ans2, ans3) {
        this.quest = quest
        this.ans1 = ans1 
        this.ans2 = ans2 
        this.ans3 = ans3 
       
        //creation de la div contenant le bloc question
        this.visual = document.createElement(`div`);
        const visual = this.visual
        visual.id = 'blocQuestions'
        visual.classList.add('blocQuestions')
        visual.classList.add('animateBloc')
        
        this.questionDiv = document.createElement('div')
        const questionDiv = this.questionDiv
        questionDiv.className='questionDiv'
        questionDiv.innerHTML = `<h3>${quest}</h3>`
        visual.appendChild(questionDiv)

        // création du form contenant la question et les réponses
        this.myForm = document.createElement('form')
        const myForm = this.myForm
        myForm.id = 'formId'
        myForm.setAttribute("type", "submit");
        visual.appendChild(myForm)

        this.myformDiv = document.createElement('div')
        const myformDiv = this.myformDiv
        myformDiv.className = 'myFormDiv'
        myForm.appendChild(myformDiv)

        
        for (let i=1; i<=3; i++) {      
             //input
            this.inputField = document.createElement('input')
            const inputField = this.inputField
            inputField.setAttribute("type", "radio");
            inputField.id = `li${i}`
            inputField.name = 'answer'
            inputField.value = this[`ans${i}`]
            ////label
            this.labelField = document.createElement('label')
            const labelField = this.labelField
            labelField.setAttribute('for', inputField.name )
            labelField.innerText = this[`ans${i}`]
            myformDiv.appendChild(inputField)
            myformDiv.appendChild(labelField)
            myformDiv.appendChild(document.createElement('br'))
        }

        // boutton submit
        this.submitButton = document.createElement('button')
        const submitButton = this.submitButton
        submitButton.setAttribute("type", "submit")
        submitButton.innerHTML = questionIndex +1 === questions.length  ?'to results' : 'next Question'
        submitButton.addEventListener('click', (e) => {
            e.preventDefault()
            let answer = myForm.querySelector('input[type=radio]:checked')   
            if (answer) {
                givenAnswers.push(answer.value)
                addQuestion()
            } else {
                console.log('ok')
                popup.classList.add('show', 'animateBloc')             
                setTimeout(()=>popup.classList.remove('show', 'animateBloc'), 3000)
                console.log('popup', popup)
            }      
        } )
        myformDiv.appendChild(submitButton)
        
        // création du popup
        let popup = document.createElement('div')
        popup.className='popup'
        popup.innerHTML ='choose one option'
        myformDiv.appendChild(popup)

        mainDiv.appendChild(visual)
        
    }
}



if(initialState) {
    nextQuestion = new Question ('premiere question', 'réponse1', 'réponse 2', 'réponse 3') 

    initialState = false
} 


// console.log(givenAnswers)

