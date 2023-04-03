<template>
    <div v-if="!showScore">
        <div class="question" v-for="(question, index) in questions.results" :key="question">
            <QuestionBox :question="question" :error="error" :index="index" v-if="currentQuestion === index" @score="scoreCollector"/>            
        </div>
        <button @click="nextQuestion"  v-if="!done">Next Question</button>
        <button @click="getScore" v-if="done">Get Score</button>
    </div>
    <div v-if="showScore">
        <Score :score="score" @resetGame="resetGame" />
    </div>
</template>

<script>
import getQuestions from '../composables/getQuestions'
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import QuestionBox from '../components/QuestionBox.vue'
import Score from '../components/Score.vue'

export default {
    name:'Test',
    components:{QuestionBox, Score},
    data(){
        return{
            
        }
    },
    setup(){
        const route = useRoute()
        const currentQuestion = ref(0)
        const done = ref(false)
        const score = ref(null)
        const trueAnswers = ref(0)
        const showScore = ref(false)
        
        //questions
        const amount = route.query.amount
        const category = route.query.category
        const difficulty = route.query.difficulty
        const {questions, error} = getQuestions(amount, category,difficulty)
        


        //methods
        const nextQuestion = ()=>{
            currentQuestion.value ++
            if(currentQuestion.value+1 >= parseInt(amount)){
                done.value = true
            }                     
        }

        const scoreCollector = (value)=>{
            if(value === 1){
                trueAnswers.value +=1
            }
            else {
                trueAnswers.value +=0
            }
        }
        
        const getScore= ()=>{
            score.value = (100 / parseInt(amount)) * trueAnswers.value
            showScore.value = true
        }
        const resetGame = ()=>{
            
        }
        

        //life cycle

        return {questions,error,currentQuestion, nextQuestion, done, scoreCollector, getScore, showScore, score, resetGame}
    },
    
   
}
</script>

<style>

</style>