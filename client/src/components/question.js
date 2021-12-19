import '../styles/fonts.css';
import '../styles/question.css';
import React, { useState, useEffect } from "react";
import Axios from "axios";


const Question = (props) => {

    const [songs, setSongs] = useState([]);
    const [attribute, setAttribute] = useState({attribute: [{name: '', question: '', description: ''}]});
    const [message, setMessage] = useState('CORRECT');
    

    useEffect( () => {
        console.log("Question rendered");
        serveQuestion();
      }, []); 

    // useEffect( () => {
    //     console.log("Got songs:");
    //     songs.map( (val) => {
    //         console.log(val);
    //     })
    // }, [songs]); 

    useEffect( () => {
        const timer = setTimeout(() => {
            setMessage('');
          }, 3000);
          return () => clearTimeout(timer);
    }, [message]);

    const serveQuestion = () => {
        console.log("serving a question");

        Axios.get(
                props.appURL + "/api/get/randomattribute"
            ).then( (response) => {
                setAttribute(response.data);
                console.log("Got Attribute: ");
                console.log(response.data);
                getNewSongs(response.data.attribute[0].name)
                }
            );
    };

    const getNewSongs = async (att) => {
        Axios.get(
            props.appURL + "/api/get/randomsongs", { params: {artistList: props.artistList, attribute: att} }
          ).then( (response) => {
                setSongs(response.data);
                console.log("got songs from DB");
                console.log(response.data);
          });
    };

    const printOptions = () => {
        if (songs.length == 2) {
            return  <>
                        <div 
                        class='answer'
                        onClick={() => {
                            if (songs[0].value >= songs[1].value) {
                                correct()
                            } else {wrong()}
                        }}
                        >
                            <h4>{songs[0].title}</h4>
                            <h3>By {songs[0].name}</h3>
                        </div>

                        <div 
                        class='answer'
                        onClick={() => {
                            if (songs[1].value >= songs[0].value) {
                                correct()
                            } else {
                                wrong()
                            }
                        }}
                        >
                            <h4>{songs[1].title}</h4>
                            <h3>By {songs[1].name}</h3>
                        </div>
                    </>
        } else {
            return <><h3>no songs</h3></> 
        }
    };

    const correct = () => {
        setMessage("Correct");
        props.setScore(props.score + 100); 
        serveQuestion();
    };

    const wrong = () => {
        setMessage("Wrong");
        props.setLeaderboard(true);
    };

    return (
    <>
        <div className='homeBox'>
            <h5>Which of these songs</h5>
            <h4>{attribute.attribute[0].question}?</h4>
            <h3>({attribute.attribute[0].description})</h3>
            <h3>Score: {props.score}</h3>
            <div className='answerBox'>
                {printOptions()}
            </div>
            <h4>{message}</h4>

            </div>
    </>
    )
}

export default Question;