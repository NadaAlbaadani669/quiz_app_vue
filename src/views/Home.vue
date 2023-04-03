<template>
 <!-- home -->
  <div class="home" v-if="showHome">
    <h2>Who Wants to Win $1,000,000?</h2>
    <br>
    <h4>
      Welcome to Who Wants to Win a Million Dollars! 
      Test your knowledge of math and science as you work your way to the million dollar level!
      Although the questions you will answer are real, the money, unfortunately,
      is not. You aren't playing for real money! Sorry!
    </h4>
    <br>
    <button @click="startPlaying">Start Playing</button>
  </div>
  <!-- questions -->
  <div v-if="showQuestions">
      <questions @startAgain="resetGame" />
  </div>

  <!-- Score page -->

  <div v-if="showScore">
      <Score :score="score" :amount="amount"  @resetGame="resetGame" />
  </div>

  <!-- Losing Component

  <div v-if="losing">
    <losing @losing="losingShow"/>
  </div> -->

</template>

<script>

import getCategories from '../composables/getCategories'
import {ref} from 'vue'
import Score from '../components/Score.vue'
import questions from '../components/questions.vue'


export default {
  name: 'home',
  components:{questions, Score},
  setup(){
    
    //categories fetching
    const{categories, error} = getCategories()

    const difficulty = ref('')
    const showHome = ref(true)
    const showQuestions = ref(false)
    const showScore = ref(false)  
    const score = ref(null)
        
    //methods
    const startPlaying =() =>{
      showHome.value = false
      showQuestions.value = true     
    }  
    // const getScore = (value)=>{
    //   score.value = value
    //   showQuestions.value = false
    //   showScore.value = true 
    //   console.log(score)
    // }
    
    const resetGame = (value)=>{
        showQuestions.value = value
        showHome.value = true
    }

        
    return{
      // score,
      difficulty,   
      showHome,
      showQuestions,
      showScore,
      startPlaying,      
      resetGame,
      // getScore,
      }
  },
  
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
  div{
    margin-bottom:2rem ;
  }
  .home{
    border: 2.5px solid #bbb;
    width: 65%;
    margin: -1rem 17.5% 0 17.5%;
    padding: 2% 1rem;
    border-radius: 10px;
  }
  .amount input{
    background: #ddd;
    width: 4rem;
    height: 2.5rem;
    border: none;
    border-radius: 5px;
    text-align: center;
  }
  .difficulty label {
    width: 5rem;
    margin: 1rem;
  }
  input[type="radio"] {
    display: none;
  }
  input[type="radio"]:disabled{
    background-color: red !important;
  }
  label {
    display: inline-grid;
    position: relative;
    height: 2.5rem;
    border: none;
    border-radius: 5px;
    background: #ddd;
    cursor: pointer;
  }
  input[type="radio"]:checked  + * {
    background-color: #bbb !important;
    border-radius: 5px;
  }
  
  label > span {
    justify-content: center;
    display: flex;
    align-items: center;
  }
  
  .categories select{
    background: #ddd;
    width: 20rem;
    height: 2.5rem;
    border: none;
    border-radius: 5px;
    text-align: center;
    color: black;
    font-size: medium;
  }
  button{
    background: #ddd;
    margin: 1rem;
    padding: 0.8rem;
    border: none;
    border-radius: 5px;
    font-weight: 500;
  }
  button:hover{
    cursor: pointer;
    background: #bbb;
    /*border: 0.5px solid black;*/
  }
  button:disabled{
    pointer-events: auto! important;
    cursor: not-allowed! important;
  }
 
</style>