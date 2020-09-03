import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import '../style/About.scss';

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const hideHash = (e) => {
        e.preventDefault();
    };

    return (
        <div className="about-container">
            <div className="theme-list">
                <ul>
                    <li><HashLink onClick={hideHash} className="side-link" to="/about#whatisfanfavorite">What is FanFavorite?</HashLink></li>
                    <li><HashLink onClick={hideHash} className="side-link" to="/about#howtocreatelists">How to create lists?</HashLink></li>
                    <li><HashLink onClick={hideHash} className="side-link" to="/about#howtocreateaccount">How to create an account?</HashLink></li>
                    <li><HashLink onClick={hideHash} className="side-link" to="/about#editpersonalinfo">Can I edit my personal info?</HashLink></li>
                    <li><HashLink onClick={hideHash} className="side-link" to="/about#deleteaccount">What happens when I delete my account?</HashLink></li>
                    <li><HashLink onClick={hideHash} className="side-link" to="/about#timetostart">Why does it take time to initially load?</HashLink></li>
                    <li><HashLink onClick={hideHash} className="side-link" to="/about#suggestions">Can I suggest changes for FanFavorite?</HashLink></li>
                </ul>
            </div>
            <div className="questions-container">
                <div className="questions-headline">
                    <h3>FANFAVORITE IS HERE</h3>
                    <h3>FOR ANY QUESTIONS</h3>
                    <h3>YOU MIGHT HAVE</h3>
                    <h5>IF YOU CAN'T FIND IT HERE, FEEL FREE TO MAKE A DIRECT 
                        <HashLink to="#footer" className="contact" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} onClick={hideHash}>
                            CONTACT</HashLink></h5>
                </div>
                <div className="questions">
                    <div id="whatisfanfavorite">
                        <h4>WHAT IS FANFAVORITE?</h4>
                        <p>
                            FanFavorite is a web app created by and for fans who would like to keep all of their favorite fan fiction and episodes in one place, so they're never lost. It started as a small idea for a project to be presented in a portfolio, and grew to be FanFavorite.
                        </p>
                        <p>
                            With FanFavorite you wont need to save endless links in your browser. Now it is possible to keep them all in one list, with exact description to make it easy for you to remember them.
                        </p>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="howtocreatelists">
                        <h4>HOW TO CREATE A LIST?</h4>
                        <ol>
                            <li>1. <Link to="signup">Sign up</Link> with your own account (see next question).</li>
                            <li>2. Click on ADD LIST in the desired category (fan fiction or episodes).</li>
                            <li>3. Give the list the name of the fandom it belongs to.</li>
                            <li>3. Once list is created, use the form to add items to it.</li>
                            <li>4. You can edit or delete the items and the lists (the info will be permanently changed/deleted).</li>
                            <li>Once you go back to your account's page, you'll be able to see your lists.</li>
                        </ol>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="howtocreateaccount">
                        <h4>HOW TO CREATE AN ACCOUNT?</h4>
                        <ol>
                            <li>1. Click on the top navigation bar on 'Sign up'.</li>
                            <li>2. Fill in all the required fields.</li>
                            <li>3. Click on 'GO'.</li>
                            <li>You can edit your info from your account.</li>
                        </ol>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="editpersonalinfo">
                        <h4>CAN I EDIT MY PERSONAL INFO?</h4>
                        <p>You can edit your username and password. This is how:</p>
                        <ol>
                            <li>1. Once you're logged in, make sure you're on your account's page.</li>
                            <li>2. In the top toolbar click 'EDIT USERNAME' or 'EDIT PASSWORD'.</li>
                            <li>3. Click on the check mark to approve, or on the 'x' to cancel editing.</li>
                            <li><strong>* The 'DELETE ACCOUNT' and 'SIGN OUT' buttons are also in the top toolbar.</strong></li>
                        </ol>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="deleteaccount">
                        <h4>WHAT HAPPENS WHEN I DELETE MY ACCOUNT?</h4>
                        <p>Deleting your account will permanently delete all of your info and lists, so please make sure it's really what you want.</p>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="timetostart">
                        <h4>WHY DOES IT TAKE TIME FOR THE WEB APP TO INITIALLY LOAD?</h4>
                        <p>The app is currently hosted on a free server. Without going into technical details - the server needs about 30 seconds to 'wake up'. Afterwards, it will work without delays.</p>
                        <p>Please note that the 'waking up' will happen each time after a certain amount of inactive time.</p>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="suggestions">
                        <h4>CAN I SUGGEST CHANGES FOR FANFAVORITE?</h4>
                        <p>Of course! This web app is for you.</p>
                        <p>If you think of a way to improve it, please let me know.</p>
                        <p>It would also be much appreciated if you notify me about any bugs you might find.</p>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;