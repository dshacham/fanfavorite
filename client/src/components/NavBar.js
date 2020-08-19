import React, { useState, useEffect, useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import Context from './Context';
import '../style/NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const history = useHistory();
    const { userData, setUserData, setToken, setLoggedIn, loggedIn } = useContext(Context);

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
            localStorage.setItem('token', header);
            setToken(header);
            setUserData(data.user);
            setLoggedIn(true);
        } else {
            setErrorMsg(true);
        }
    }

    useEffect(() => {
        loggedIn && history.push('/account');
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
                <NavLink to="/" onClick={() => { localStorage.clear(); setLoggedIn(false) }} className="signout">sign out</NavLink>
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
                {errorMsg ? <p>Email or password incorrect</p> : null}
                <button className="button login-btn" type="submit">LOGIN</button>
                <NavLink to="signup" className="signup">sign up</NavLink>
            </form>
        </div>
        }
        </nav>
    );
}

export default NavBar;