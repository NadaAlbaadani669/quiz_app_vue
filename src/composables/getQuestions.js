import {ref} from 'vue'
const getQuestions = (difficulty1, difficulty2, difficulty3)=>{
    const questions = ref([])
    const error = ref('')
    const query1 = ref('https://opentdb.com/api.php?amount=5&difficulty='+difficulty1+'&type=multiple')
    const query2 = ref('https://opentdb.com/api.php?amount=5&difficulty='+difficulty2+'&type=multiple')
    const query3 = ref('https://opentdb.com/api.php?amount=5&difficulty='+difficulty3+'&type=multiple')
    
    
    const load = async()=>{
        try{
            // const data = await fetch([query1.value, query2.value, query3.value])
            // if(!data.ok){
            //     throw Error ('There is no category try again later..')
            // }
            // questions.value = await data.json()   
            Promise.all([
                fetch(query1.value).then(res => res.json()),
                fetch(query2.value).then(res => res.json()),
                fetch(query3.value).then(res => res.json())
            ]).then((data)=>{
                data.forEach( val => {
                    questions.value.push(...val.results)
                })
            })
            
        }
        catch(err){
            error.value = err.message
        }
    }
    load()    
    
    
    return {questions, error}
}

export default getQuestions