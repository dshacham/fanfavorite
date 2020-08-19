import React from 'react';
import '../style/Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer>
            <p className="footer-name">&copy;FanFavorite2020</p>
            <div className="footer-contact">
                <a href="https://twitter.com/GhostLoveSc0re" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className="icon" title="twitter" icon={faTwitter} />
                </a>
                <a href="https://tvfreakd.tumblr.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className="icon" title="tumblr" icon={faTumblr} />
                </a>
            </div>
        </footer>
    )
}

export default Footer;