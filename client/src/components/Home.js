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
            <div className="text-logged-container">
                    <p className="text-logged">Go to your account in order <br/>to create and manage your lists</p>
                </div>
        </div>
    );
};

export default Landing;