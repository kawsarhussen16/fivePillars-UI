import { useEffect, useState } from "react";
import './gameBoard.scss'
import { fetchAQuestionByBaseAndLevel, fetchAllQuestions } from "../../api/fivePillars";
import BasicSelector from "../../helpers/form-helper/basicSelector";

const GameBoard =() => {
    const [base, setBase] = useState('iman')
    const [level, setLevel] = useState(100)
    const [ids, setIds] = useState([])
    const [question, setQuestion] = useState(null)
    const [answer, setAnswer] = useState(null)
    const [error, setError] = useState(null)
    const [showAnswer, setShowAnswer] = useState(false)
    const [allQuestions, setAllQuestions] = useState([])

    useEffect( ()=> {
        const localData = localStorage.getItem('questions')
        if(!localData || localData?.length === 0){
            fetAllQuestionsAsync()
        }
    })

    const handleClick = (e) => {
        setError(null)
        console.log(e.target.name)
        if(e.target.name === 'level'){
            setLevel(e.target.value)
        } else if(e.target.name === 'base') {
            setBase(e.target.value)
        }
    }

    const toggleAnswer = (e) => {
        setShowAnswer(!showAnswer)
    }

    const fetAllQuestionsAsync = async ()=> {
        const data = await fetchAllQuestions()
        setAllQuestions(data)
        localStorage.setItem("questions", data)
    }

    const handleSubmit = async () => { 
        let data = await fetchAQuestionByBaseAndLevel(base, level, ids)
        if(data.success){
            if(!data.data){
                setError("No data found")
            } else {
                setIds(prev => {
                    console.log({prev})
                    let updatedIds = [...prev, data.data?.id]
                    localStorage.setItem(base, updatedIds)
                    return updatedIds
                })
                setQuestion(data.data.question)
                setAnswer(data.data.answer)
            }
        }  else {
            setError(data.error)
        }
    }

    const bases = ['iman', 'salah', 'sawm', 'zakah', 'hajj']
    const levels = [100,200,300,400,500]

    return (
        <div className="game-container">
            <div className="selection-container">
                <h2 className="choice-title">Select your choice</h2>
                <form className="game-board-form-container">
                    <label>
                        <span>Base</span>
                        <BasicSelector handleClick={handleClick} options={bases} name="base" value={base} />
                    </label>
                    <label>
                        <span>Level</span>
                        <BasicSelector handleClick={handleClick} options={levels} name="level" value={level}/>
                    </label>
                    <input type="button" value="Submit" onClick={handleSubmit}/>
                </form>
            </div>

            <div className="question-answer-box">
                {question ? <h1 className="question">Question: {question} </h1> : null }
                {showAnswer ? <h1 className="answer" >Answer: {answer}</h1> : null}
                {answer ? 
                    ( showAnswer ?  <input className="button" type="button" value="Hide Answer" onClick={toggleAnswer} /> : <input type="button" value="Reveal Answer" onClick={toggleAnswer} /> ) 
                : null}
                {error ? <h1>{error}</h1>: null}
            </div>
            
        </div>
    )
}

export default GameBoard