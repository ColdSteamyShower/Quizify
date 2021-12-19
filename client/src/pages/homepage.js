import '../styles/fonts.css';
import '../styles/homepage.css';

const Homepage = () => {
    return (
    <>
    <div class="homeBox">
        <h1>Welcome to Quizify</h1>
        <h4>A music quiz where you test your knowledge against the Spotify indexing AI!</h4>
        <h5>Every song on Spotify is scored for popularity, loudness, energy, acousticness... etc. See if you can guess between two songs which one has a higher score for some kind of attribute!</h5>
        <h4>Ready?</h4>

        <button class="playBtn">LETS GO!</button>
    </div>
    </>)
}

export default Homepage;
