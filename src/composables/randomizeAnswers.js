import { computed } from "vue"
const randomizeAnswers = (correct , incorrect)=>{
    let incorrect_answers = incorrect.value
    let answers = [{answer:correct.value, precentage:'', disable:false}]
    for(let i=0; i< incorrect_answers.length; i++){
        answers.push(...[{answer:incorrect_answers[i], precentage:'', disable:false}])
    }
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const randomAnswers =computed(()=>{
        for (let j = 0; j < answers.length; j++) {
            answers = answers.sort((a, b) => 0.5 - Math.random()).slice(0, 4);
        }
        for(let x = 0; x < answers.length; x++){
            if (answers[x].answer === correct.value){
                answers[x].precentage = randomNumber(20, 40) + '%'   
            }
            else{
                answers[x].precentage = randomNumber(0,30) + '%'
            }
        }

        const answers_temp = [...incorrect_answers];
        const removedIncorrects = [];
        let idx = randomNumber(0, answers_temp.length);
        removedIncorrects.push(answers_temp.splice(idx, 1)[0]);
         idx = randomNumber(0, answers_temp.length);
        removedIncorrects.push(answers_temp.splice(idx, 1)[0]);

        for(const answer of answers) {
            if (removedIncorrects.includes(answer.answer)) {
                answer.disable = true;
            }
        }



       /* for(let i=0 ; i<answers.length-1 ; i++){
            if(answers[i].answer !== correct.value){
                answers[i].disable = true
            }
        }*/
        console.log(answers)
        return answers
    })
    return{randomAnswers}
}

export default randomizeAnswers