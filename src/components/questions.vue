<template>
    <div class="questions" v-if="showQuestionBox">
        <div class="helps">
            <button @click="askExpertFun" :disabled="askExpert">ِAsk an Expert</button>
            <button @click="fiftyFun" :disabled="fifty">50/50</button>
            <button @click="askAudFun" :disabled="askAud">Ask Audiences</button>
        </div>

        <div v-for="(question, index) in questions.questions" :key="question">
            <QuestionBox 
            :question="question" 
            :index="index" 
            :currentQuestion="currentQuestion" 
            :showNext="showTrue"
            :showPrec="showPrec"
            :showExpAns="showExpAns"
            :showFiftyAns="showFiftyAns"
            v-if="currentQuestion === index+1" 
            @answer="handdelNext"
            @nextQuestion="nextQuestion"
            @showPrec="showPrec = false"
            @showExpAns="showExpAns = false"
            @showFiftyAns="showFiftyAns = false" />     
        </div>       
    </div>
    <!-- <div class="true" v-if="showTrue">
        <h4>True Answer You can move to the next question</h4>
        <button @click="nextQuestion">Next Question</button>
    </div> -->
    <div class="false" v-if="showFalse">
        <h3>Hmmm. You must have hit the wrong button...</h3>
        <h4>You can play again</h4>
        <button @click='startAgain'>Play Again</button>
    </div>
    <!-- <div class="helps" v-if="showQuestionBox">
        <button>ِAsk an Expert</button>
        <button>50/50</button>
        <button>Poll the Lab</button>
    </div> -->
    
</template>

<script>
import {onUpdated, ref} from 'vue'
import getQuestions from '../composables/getQuestions'
import QuestionBox from '../components/QuestionBox.vue'
export default {
    components:{QuestionBox},
    name:'questions',
    emits:['startAgain'],
    setup(context, {emit}){
        const currentQuestion = ref(1)
        const done = ref(false)
        const showFalse = ref(false)
        const trueAnswers = ref(0)
        const showQuestions = ref(true)
        const showTrue = ref(false)
        const showQuestionBox = ref(true)
        const questions = ref(getQuestions('easy', 'medium', 'hard'))        
        
        const askAud = ref(false)
        const showPrec = ref(false)
        const askExpert = ref(false)
        const showExpAns = ref(false)
        const fifty = ref(false)
        const showFiftyAns = ref(false)

        //methods
        const nextQuestion = () => {
            currentQuestion.value ++
            showTrue.value = false
        }
        const handdelNext = (value)=>{
            if(value === 1){
                showTrue.value = true
            }
            else{
                showQuestionBox.value = false
                showFalse.value = true
            }
        } 
        const startAgain = ()=>{
            emit("startAgain", false)
        }      
        const askAudFun = ()=>{
            askAud.value = true
            showPrec.value = true
        }
        const askExpertFun = ()=>{
            askExpert.value = true 
            showExpAns.value = true
        }
        const fiftyFun = ()=>{
            fifty.value = true
            showFiftyAns.value = true 
        }


        return{
            currentQuestion,
            questions, 
            trueAnswers,
            nextQuestion,
            handdelNext,
            done,
            showQuestionBox,
            showTrue,
            showFalse,
            startAgain,

            askAud,
            askAudFun,
            showPrec,
            askExpert,
            askExpertFun,
            showExpAns,
            fifty,
            fiftyFun,
            showFiftyAns,
        }
    }
}
</script>

<style>
    .questions{
        width: 100%;
    }
    .helps{
        border: 2px solid #bbb;
        width: 50%;
        margin: 10% 0 0 0;
        height: 10%;
        margin: -2% 25% 2% 25%;
        border-radius: 10px;
        display: flex;
        justify-content: space-around;
    }
    .helps > button {
        width: 25%;
    }

    
</style>