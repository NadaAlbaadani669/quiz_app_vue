<template>
    
   <div class="question">       
        <div class="details">
            <div class="questionNum">{{index+1}}</div>
            <div class="money">{{money}}</div>
        </div>
        <h4>{{question.question}}</h4>
        <div class="answers" v-for="(answer, index) in randomAnswers" :key="answer">
            <label>
                <input 
                    type="radio" 
                    required
                    v-model="chosenAnswer" 
                    :value="answer.answer" 
                    @change.once="answerHanddler"
                    :disabled="showTrueStyle || (showFiftyAns && answer.disable)" /> 
                <span :style="{'background-color': answer.answer == question.correct_answer && showTrueStyle ? '#00FF7F !important' : ''}">
                    {{index+1}}/ {{answer.answer}} 
                    <span class="askAud" v-if="showPrec">&nbsp;&nbsp;&nbsp; {{answer.precentage}}</span>
                </span>   
            </label>                       
        </div>
        <div >
            <button v-if="showDec" @click="showSolution">This is my final Answer</button>
            <button v-if="showNext" @click="nextQuestion">Next Question</button>
        </div>
        <div v-if="showExpAns">
            <h4>An Expert at Google is thinking:</h4>
            <p>"Unless this is a trick question or something, 
                <span style="color: red; font-weight: 700;">{{question.correct_answer}} </span>
                is the answer."</p>
        </div>
   </div>
   
</template>
<script>
import {computed, onMounted, ref} from 'vue'
import randomizeAnswers from '../composables/randomizeAnswers'
export default {
    name:'questionBox',
    props:['question', 'index', 'currentQuestion','showNext','showPrec', 'showExpAns','showFiftyAns'],
    emits:['answer','nextQuestion', 'showExpAns', 'showPrec', 'showFiftyAns'],
    setup(props, {emit}){
        // fetching
        const correct_answer = ref(props.question.correct_answer)
        const incorrect_answers = ref(props.question.incorrect_answers)
        const {randomAnswers} = randomizeAnswers(correct_answer, incorrect_answers)
        const showDec = ref(false)
        const money = ref('')
        const background = ref('green')
        const showTrueStyle = ref(false)
        console.log(correct_answer)

        //chosing answer
        const chosenAnswer = ref('')

        onMounted:{
            money.value = '100$'
        }

        onUpdated:{
            console.log()
            switch(props.currentQuestion){
                case 2:
                    money.value = '200$'
                    break;
                case 3:
                    money.value = '300$'
                    break;
                case 4:
                    money.value = '500$'
                    break;
                case 5:
                    money.value = '1000$'
                    break;
                case 6:
                    money.value = '2000$'
                    break;
                case 7:
                    money.value = '4000$'
                    break;
                case 8:
                    money.value = '8000$'
                    break;
                case 9:
                    money.value = '16000$'
                    break;
                case 10:
                    money.value = '32000$'
                    break;
                case 11:
                    money.value = '64000$'
                    break;
                case 12:
                    money.value = '125000$'
                    break;
                case 13:
                    money.value = '250000$'
                    break;
                case 14:
                    money.value = '500000$'
                    break;
                case 15:
                    money.value = '1000000$'
                    break;
            }            
        }

        
        //methods
        const answerHanddler = ()=>{
            showDec.value = true  
            emit('showPrec')  
            emit('showExpAns')  
            emit('showFiftyAns')  
        }
        
        const showSolution = ()=>{
            if(correct_answer.value === chosenAnswer.value){
                showDec.value = false
                showTrueStyle.value = true 
                emit('answer', 1)
            }
            else {
                emit('answer', 0)
            }         
        }
        const nextQuestion =()=>{
            emit('nextQuestion')
           
        }
        const showFiftyFun = ()=>{
            if(props.showFiftyAns){
                console.log('return fifty result')
                return false
            }
        }
        
    
        return{
            randomAnswers, 
            chosenAnswer,
            showSolution,
            showTrueStyle,
            answerHanddler,
            money,
            showDec,
            nextQuestion,
            background,
            showFiftyFun,
            }
    }
}
</script>

<style scoped>
    .question{
        width: 50%;
        border: 2px solid #bbb;
        border-radius: 10px;
        margin: 0 25%;
        padding: 2rem 0 0 0;
    }
    label{
        width: 60%;
        height: 3.1rem;
    } 
    label> span{
        justify-content: center;
        display: flex;
        align-items: center;
    }   
    .answers{
        margin-top: 2rem;
    }
    .details{
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        margin-top: -3%;
        padding: 0 30px;
        margin-bottom: -3%;
    }
    .questionNum{
        background: #ddd;
        width: 5%;
        padding: 7px;
        border-radius: 7px;
    }
    .money{
        background: #ddd;
        width: 30%;
        padding: 7px;
        border-radius: 7px;
    }
    .trueAnswerClass{
        background: #00FF7F !important;
    }
    input [type="radio"][disabled]{
        cursor: none;
    }
    .askAud{
        color: red;
        font-weight: 700;
    }
    input [type="radio"] :disabled > span {
        pointer-events: auto! important;
        cursor: not-allowed! important;
        background: red !important;
    }

</style>