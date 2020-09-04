import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Context from './Context';
import '../style/Landing.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
    const history = useHistory();
    const { setUserData, setToken, setLoggedIn, loggedIn, setUserFicLists, setUserEpLists } = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password
        };

        const logged = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(loginData)
        };
        const resp = await fetch('/users/login', logged);
        const data = await resp.json();
        const header = resp.headers.get('x-auth');

        if (data.success) {
            localStorage.setItem('token', header);
            setToken(header);
            setUserData(data.user);
            setUserEpLists(data.user.epsLists);
            setUserFicLists(data.user.ficLists);
            setLoggedIn(true);
            setErrorMsg(false);
            history.push("/account");
        } else {
            setErrorMsg(true);
        };
    };

    // useEffect(() => {
    //     loggedIn && history.push("/account");
    // });
    
    return (
        <div className={isMobile ? "homepage-container" : "homepage-container desktop-margin"}>
            <div className={isMobile ? "landing mobile-width" : "landing"}>
                <form className="login-form" onSubmit={handleLogin}>
                    <h2 className="h2-login">LOGIN</h2>
                    <label className="login-label">Email
                        <input
                            className="login-input"
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className="login-label">Password
                        <input
                            className="login-input"
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <p className={errorMsg ? "signin-error show-error" : "signin-error"}>Email or password incorrect</p>
                    {
                    isButtonClicked && !errorMsg ?
                        <button className="sign-btn" type="submit"><FontAwesomeIcon icon={faSpinner} spin className="spin-icon" /></button>
                    :
                        <button className="sign-btn" type="submit" onClick={() => {setIsButtonClicked(true); setErrorMsg(false)}}>GO</button>
                    }
                    <Link to="reset_password" className="pass-forgot">Forgot password?</Link>
                </form>
            </div>
        </div>
    );
};

export default Landing;