<template>
    <div class="score">
        <h2>Your Score is: {{score.toFixed(2)}}</h2>
        <h3>You got {{trueAnswer}} / {{amount}}</h3>
        <button @click="resetGame">Restart The Game</button>
    </div>
</template>

<script>
export default {
    props:['score', 'amount'],
    data(){
        return{
            trueAnswer : null
        }
    },
    mounted(){
        this.trueAnswer = parseInt(this.amount) * (this.score / 100)
    },
    methods:{
        resetGame(){
            this.$emit('resetGame', false)
        }
    }
}
</script>
<style>
    .score{
        width: 50%;
        margin: 6% 25%;
        border: 2px solid #bbb;
        border-radius: 10px;
        padding: 2rem 0;
    }
</style>