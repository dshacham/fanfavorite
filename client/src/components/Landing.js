import React, { useEffect } from 'react';
import '../style/Landing.scss';
import { NavLink } from 'react-router-dom';

const Landing = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className="landing">
            <img src="../../assets/images/homepage2.png" alt="register or sign in" />
        </div>
    );
};

export default Landing;