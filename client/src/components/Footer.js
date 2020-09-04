import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faQuestionCircle, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer>
            <div className="to-top">
                <button className="to-top-btn" onClick={scrollTop}>
                    <FontAwesomeIcon className="icon-top" title="back to top" icon={faAngleDoubleUp} />
                </button>
            </div>
            <div className="footer-contact">
                <a href="mailto: fanfavorite.100@gmail.com"><FontAwesomeIcon className="icon" title="email me" icon={faEnvelope} /></a>
                <a href="https://twitter.com/GhostLoveSc0re" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className="icon" title="twitter" icon={faTwitter} />
                </a>
                <a href="https://tvfreakd.tumblr.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className="icon" title="tumblr" icon={faTumblr} />
                </a>
                <p className="footer-name">&copy;FanFavorite2020</p>
            </div>
            <div className="about-icon">
                <Link to="/about">
                    <FontAwesomeIcon className="icon" title="about" icon={faQuestionCircle} />
                </Link>
            </div>
        </footer>
    )
}

export default Footer;