import React, { useEffect, useState } from 'react';
import '../style/Landing.scss';
import { NavLink } from 'react-router-dom';

const Landing = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className="landing">
            <img src="../../assets/images/stars-collage-small.png" alt="register or sign in" />
            <div className="all-nums-container">
                <div className="number-container">
                    <p className="number">1.</p>
                    <p className="text">Register <br/>or <br/>Login</p>
                </div>
                <div className="number-container">
                    <p className="number">2.</p>
                    <p className="text">Create <br/>lists of <br/>faves</p>
                </div>
                <div className="number-container">
                    <p className="number">3.</p>
                    <p className="text">Never <br/>lose them <br/>again!</p>
                </div>
            </div>
        </div>
    );
};

export default Landing;