import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer>
            <p>Contact:</p>
            <div className="footer-contact">
                <a href="mailto: fanfavorite.100@gmail.com"><FontAwesomeIcon className="icon" title="email me" icon={faEnvelope} /></a>
                <a href="https://twitter.com/GhostLoveSc0re" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className="icon" title="twitter" icon={faTwitter} />
                </a>
                <a href="https://tvfreakd.tumblr.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className="icon" title="tumblr" icon={faTumblr} />
                </a>
            </div>
            <div className="name-help">
                <p className="footer-name">&copy;FanFavorite2020</p>
                <Link to="/about"><FontAwesomeIcon className="icon" title="about" icon={faQuestionCircle} /></Link>
            </div>
        </footer>
    )
}

export default Footer;