import {ref} from 'vue'
const getCategories = ()=>{
    const categories = ref([])
    const error = ref(null)

    const load = async () => {
        try{
            const data = await fetch('https://opentdb.com/api_category.php')
            if(!data.ok){
                throw Error ('There is no category try again later..')
            }
            categories.value = await data.json()       
        }
        catch(err){
            error.value = err.message
        }
    }
    load()
    return{categories,error}
}

export default getCategories