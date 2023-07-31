import React, {useState,useRef} from "react";
import './TriviaHome.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const TriviaMain = () => {

    const [selectedQuestion,setSelectedQuestion] = useState(0);
    const [gameScore,updateGameScore] = useState(0);
    const [gameOver,setGameOver] = useState(false);
    const [jasonRight,setJasonRight] = useState(300);
    const [jasonLeft,setJasonLeft] = useState(50);

    const questions = require("../components/questions");

    const selectAnswer = (selected) => {
            console.log(selected.target.id);
        if(selected.target.id === questions[selectedQuestion].answer){
            updateGameScore(gameScore + 1);
        }
        if(selectedQuestion + 1 === questions.length){
            setGameOver(true);
        }else{
            setSelectedQuestion(selectedQuestion + 1);
        }
    }

    const jasonStyles = {
        position: 'absolute',
        top: jasonRight,
        right: jasonLeft,
        transform: 'translate(-50%, -50%)',
        height:'200px',
        width:'190px',
        opacity: 1,
        cursor: 'pointer',
        transition: '0.60s'
    }

    const restartGame = () => {
        setGameOver(false);
        updateGameScore(0);
        setSelectedQuestion(0);
    }

    const updateJasonPosition = () => {
        setJasonLeft(Math.floor(Math.random() * (500 - 10 + 1)) + 10);
        setJasonRight(Math.floor(Math.random() * (600 - 10 + 1)) + 10);
    }

    return (
        <div className="col-md-12 text-center">
            <div className="row top-buffer">
                <div>HORROR TRIVIA</div>
                <img className="jason-x" src={require('../Jason_X.png')} style={jasonStyles}/>
            </div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 question-container">
                {!gameOver ?
                    <div className="row" onClick={updateJasonPosition}>                   
                        <div className="question">{questions[selectedQuestion].question}</div>
                        <div id="1" className="answer" onClick={selectAnswer}>{questions[selectedQuestion].choice_one}</div>
                        <div id="2" className="answer" onClick={selectAnswer}>{questions[selectedQuestion].choice_two}</div>
                        <div id="3" className="answer" onClick={selectAnswer}>{questions[selectedQuestion].choice_three}</div>
                        <div id="4" className="answer" onClick={selectAnswer}>{questions[selectedQuestion].choice_four}</div>                    
                    </div>
                    :
                    <div className="row">
                        <div className="col-md-12 text-center game-over-container">
                            <div className="row">
                                <span className="game-over">Game Over</span>
                                <span className="score-board">Your scored: {(gameScore/4) *100}%</span>
                                <div className="col-md-12">
                                    <button className="btn-restart" onClick={restartGame}>Restart</button>
                                </div>
                            </div>
                        </div>                        
                    </div>
                    
                }
                </div>
                <div className="col-md-4"></div>
            </div>    
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                        <div className="row question-bottom">
                        <div className="score-container">Score {gameScore}</div>
                        <div className="button-container">
                            Question {selectedQuestion + 1} of 4
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    );
}

export default TriviaMain;