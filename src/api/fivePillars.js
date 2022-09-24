import axios from "axios";
const base_url = process.env.REACT_APP_API_URL

export const fetchAllQuestions = async ()=> {
    try {
        const data = await axios.get(`${base_url}/questions`)
        return data.data
    } catch(err){
        console.log(err)
        return {err: err, success: false}
    }
}

export const fetchAQuestionByBaseAndLevel = async (base, level, ids)=> {
    try {
        const data = await axios.post(`${base_url}/question/${base}/${level}`, ids)
        return {data: data.data , success: true}
    } catch(err){
        console.log(err)
        return {error: err, success: false}
    }
}
