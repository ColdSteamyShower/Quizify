import './App.css';
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {

  const [name, setName] = useState('');
  const [review, setReview] = useState('');

  const submitReview = () => {
    Axios.post(
      'http://localhost:3001/api/insert', {
        movieName: name, 
        movieReview: review,
      }).then( () => {
        alert("successful insert");
      });
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
        <div className='form'>
          <label>Movie Name</label>
          <input 
            type="text" 
            name="movieName" 
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label>Review</label>
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
    </div>
  );
}

export default App;
