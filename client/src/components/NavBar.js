import React, { useState, useEffect, useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import Context from './Context';
import '../style/NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const history = useHistory();
    const { userData, setUserData, setToken, setLoggedIn, loggedIn } = useContext(Context);

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
                <p className="acc-text">Account</p>
            </div>
        </div>
            :
        <div className="not-logged-container">
            <div className="titles">
                <NavLink to="/" className="logo"><h1>FanFavorite</h1></NavLink>
                <h2 className="h2-loggedin-out">All your faves in one place</h2>
            </div>
            <div className="acc-signout-container">
                <NavLink to="signup"><FontAwesomeIcon className="icon-signup" title="sign up" icon={faUserPlus} /></NavLink>
                <p className="icon-text">sign up</p>
            </div>
        </div>
        }
        </nav>
    );
}

export default NavBar;