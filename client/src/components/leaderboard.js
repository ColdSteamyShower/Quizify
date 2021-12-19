import '../styles/fonts.css';
import '../styles/leaderboard.css';
import React, { useState, useEffect } from "react";
import Axios from "axios";


const Leaderboard = (props) => {

    const [leaderboard, setLeaderboard] = useState([]);

    useEffect( () => {
        Axios.get(
            props.appURL + "/api/get/leaderboard"
          ).then( (response) => {
                setLeaderboard(response.data);
                console.log("Set Leaderboard");
                console.log(response.data);
          });
        
    }, []);


    return (
        <>
            <h4>Thanks for playing!</h4>
            <h4>Score: {props.score}</h4>
            
            <div className='leaderboard'>
                <div className='submitBox'>
                    <input 
                        className='enterScore' 
                        placeholder='Enter Name'
                    />
                    <div className='submitButton'>
                        <h4>Submit</h4>
                    </div>
                </div>

                <div className='boardHeader'>
                    <h3>Rank</h3>
                    <h3>Player</h3>
                    <h3>Score</h3>
                    <h3>Attempts</h3>
                </div>
                {leaderboard.map( (val) => {
                    return  <div className='ranking'>
                                <h3>#{val.position}</h3>
                                <h3>{val.name}</h3>
                                <h3>{val.score}</h3>
                                <h3>{val.attempts}</h3>
                            </div>
                })}
            </div>
        </>
    )
}

export default Leaderboard;