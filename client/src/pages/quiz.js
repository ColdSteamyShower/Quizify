import '../styles/fonts.css';
import '../styles/quiz.css';
import SetArtists from '../components/setartists.js';
import Question from '../components/question.js';
import React, { useState, useEffect } from "react";
import Leaderboard from '../components/leaderboard';


const Quiz = (props) => {

    const [playing, setPlaying] = useState(false);
    const [leaderboard, setLeaderboard] = useState(false);
    const [useArtists, setUseArtists] = useState([]);
    const [score, setScore] = useState(0);

    useEffect( () => {
        console.log("Quiz rendered");
      }, []);

    useEffect( () => {
    console.log("Playing with: " + useArtists);
    }, [useArtists]);

    if (!playing) {
        return (
        <>
            <div className='artistPageBox'>
                <SetArtists 
                    appURL={props.appURL} 
                    setQuizArtists={val => setUseArtists(val)} 
                    startGame={val => setPlaying(val)}
                />
            </div>
        </>
        )
    } else if (!leaderboard) {
        return (
            <>
                <Question 
                    artistList={useArtists}
                    appURL={props.appURL}
                    setScore={val => setScore(val)} 
                    score={score}
                    setLeaderboard={val => setLeaderboard(val)} 
                />
            </>
        )
    } else {
        return (
            <>
                <Leaderboard
                    appURL={props.appURL}
                    score={score}
                />
            </>
        )
    }
}

export default Quiz;