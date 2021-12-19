import '../styles/fonts.css';
import '../styles/headerbar.css';

const HeaderBar = () => {
    return (
    <>
        <div className='box'>
            <div class="headerTitle">
                <img class="logo" src={require('../spotify-logo.png')} />
                <p class="pageTitle"> Quizify </p>
            </div>
        </div>
    </>)
}

export default HeaderBar;