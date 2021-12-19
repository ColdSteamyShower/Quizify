import './styles/App.css';
import './styles/background.scss';
import './styles/fonts.css';

import React, { useState, useEffect } from "react";
import Axios from "axios";

import HeaderBar from './components/headerbar';
import Homepage from './pages/homepage.js';
import Quiz from './pages/quiz.js';

function App() {

  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [reviewList, setReviewList] = useState([]);

  const appURL = "http://localhost:3001";

  useEffect( () => {
    console.log("App rendered");
  }, []);

  const submitReview = () => {
    Axios.post(
      appURL + '/api/insert', {
        movieName: name, 
        movieReview: review,
      }).then( () => {
        setReviewList([...reviewList, {id: 0, movieName: name, movieReview: review}])
      });
  };

  return (
    <> 
      <div className='appWindow'>
        <HeaderBar/>
        {/* <div>
          <Homepage/>
        </div> */}
        <Quiz appURL={appURL}/>


      </div>
      {/* <div class="App">
         <h1 className='title'>CRUD APPLICATION</h1>
          <div className='form'>
            <label className='subhead'>Movie Name</label>
            <input 
              type="text" 
              name="movieName" 
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              />
            <label className="subhead">Review</label>
            <input 
              type="text" 
              name="review" 
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
              }}
              />

            <button onClick={ () => {
              submitReview();
              setName('');
              setReview('');
            }}>Submit</button>
          </div>

          <div>
            <h1 className='subhead'>Reviews:</h1>

            {reviewList.map((val) => {
              return (
                <p className='subhead'>
                  Movie #{val.id}: {val.name} - "{val.review}"
                </p>
              );
            })}
          </div>
      </div> */}
    </>
  );
}

export default App;
