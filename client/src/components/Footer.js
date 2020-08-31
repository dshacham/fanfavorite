import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer>
            <div className="footer-contact">
                <Link to="/about"><FontAwesomeIcon className="icon" title="about" icon={faQuestionCircle} /></Link>
                <a href="https://twitter.com/GhostLoveSc0re" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className="icon" title="twitter" icon={faTwitter} />
                </a>
                <a href="https://tvfreakd.tumblr.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className="icon" title="tumblr" icon={faTumblr} />
                </a>
            </div>
            <p className="footer-name">&copy;FanFavorite2020</p>
        </footer>
    )
}

export default Footer;