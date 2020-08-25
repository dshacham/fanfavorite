import React, { useState, useEffect, useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import Context from './Context';
import '../style/NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const history = useHistory();
    const { userData, setUserData, setToken, setLoggedIn, loggedIn } = useContext(Context);

    const [statusChange, setStatusChange] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault()

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
            console.log(data)
            localStorage.setItem('token', header);
            setToken(header);
            setUserData(data.user);
            setLoggedIn(true);
            setStatusChange(true);
            setErrorMsg(false);
        } else {
            setErrorMsg(true);
        }
    }

    useEffect(() => {
        statusChange && history.push('/account');
    });

    return (
        <nav className="nav">
        { loggedIn ?
        <div className="logged-in-container">
            <div className="titles">
                <NavLink to="/" className="logo"><h1>FanFavorite</h1></NavLink>
                <h2 className="h2-loggedin-out">All your faves in one place</h2>
            </div>
            <div className="acc-signout-container">
                <NavLink to="account"><FontAwesomeIcon className="icon-acc" title="account" icon={faUserCircle} /></NavLink>
                <NavLink to="/" onClick={() => { localStorage.clear(); setStatusChange(false); setLoggedIn(false) }} className="signout">sign out</NavLink>
            </div>
        </div>
            :
        <div className="not-logged-container">
            <div className="titles">
                <NavLink to="/" className="logo"><h1>FanFavorite</h1></NavLink>
                <h2 className="h2-loggedin-out">All your faves in one place</h2>
            </div>
            <form className="login-form" onSubmit={handleLogin}>
                <label className="login-field">
                    <input className="login-input"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </label>
                <label className="login-field">
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </label>
                <button className="button login-btn" type="submit">LOGIN</button>
                <div className="sign-forgot-error-container">
                    <p className={errorMsg ? "signin-error show-error" : "signin-error"}>Email or password incorrect</p>
                    <div className="sign-forgot-container">
                        <NavLink to="reset_password" className="signup-forgot">Forgot password?</NavLink>
                        <NavLink to="signup" className="signup-forgot">sign up</NavLink>
                    </div>
                </div>
            </form>
        </div>
        }
        </nav>
    );
}

export default NavBar;