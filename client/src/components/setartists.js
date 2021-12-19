import '../styles/fonts.css';
import '../styles/setartists.css';
import React, { useState, useEffect } from "react";
import Axios from "axios";



const SetArtists = (props) => {

    const [searchArtist, setSearchArtist] = useState('');
    const [artists, setArtists] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);

    const artistString = props.appURL + "/api/get/artist";

    // get new artist list when search term changes
      // 500ms delay to prevent database stress
    useEffect( () => {
      const timer = setTimeout(() => {
        console.log("new artists rendering for: " + searchArtist);
        Axios.get(
          artistString, { params: {searchTerm: searchArtist} }
        ).then( (response) => {
          setArtists(response.data);
          console.log(response.data);
        });
      }, 500);
      return () => clearTimeout(timer);
      
    }, [searchArtist]);

    useEffect( () => {
      console.log(selectedArtists);
    }, [selectedArtists]);


    return (
    <>
      <div class="homeBox">
          <h4>Select your artists</h4>
          <h3>Or select none to play with all songs!</h3>

          <div className='inputBox'>
            <input 
                  type="text" 
                  className="searchArtist"
                  name="searchArtist"
                  value={searchArtist}
                  onChange={(e) => {
                    setSearchArtist(e.target.value);
                  }}
                  />
            <button 
              className='startBtn'
              onClick={ () => {
                props.setQuizArtists(selectedArtists);
                props.startGame(true);
              }}
            
            >PLAY</button>
          </div>
          
          <div className='artistBox'>

            { // Selected artists
                // Click -> remove artist from selectedArtists
            selectedArtists.map((val) => {
                  return (
                    <button 
                      className='selectedArtist' 
                      onClick={ () => {
                        setSelectedArtists(selectedArtists.filter(item => item !== val));
                      }}
                    >
                      <h5>
                        {val}
                      </h5>
                    </button>
                  );
                  })}
                  
              { // Unselected artists
                // Click -> add artist to selectedArtists
                artists.map((val) => {
                if (!selectedArtists.includes(val.name)) {
                  return (
                    <button 
                      className='artistOption' 
                      onClick={ () => {
                        setSelectedArtists([...selectedArtists, val.name]);
                      }}
                    >
                      <h5>
                        {val.name}
                      </h5>
                    </button>
                  );
                }
              })
            }
          </div>
      </div>
    </>);
}

export default SetArtists;