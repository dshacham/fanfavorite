import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Context from './Context';
import '../style/SignUp.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
    const history = useHistory();
    const { setUserData, setToken, loggedIn, setLoggedIn } = useContext(Context);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            const signUpData = {
                username,
                email,
                password,
            };
    
            const userData = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signUpData)
            };

            const resp = await fetch('/users', userData);
            const header = resp.headers.get('x-auth');
            const data = await resp.json();
            if (data.success) {
                localStorage.setItem('token', header);
                setToken(header);
                setUserData(data.user);
                setLoggedIn(true);
                setIsButtonClicked(false);
            } else {
                window.alert(Object.values(data.message[0]));
                setIsButtonClicked(false);
            };
        } else {
            window.alert('Password doesnn\'t match');
            setIsButtonClicked(false);
        };
    };

    useEffect(() => {
        loggedIn && history.push('/account');
    });

    return (
        <div className="signup-container">
            <form className={isMobile ? "signup-form mobile-width" : "signup-form"} onSubmit={handleSignUp}>
                <h2 className="h2-signup">SIGN UP</h2>
                <label className="signup-label">Username *
                    <input
                        className="signup-input"
                        type="username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className="signup-label">Email *
                    <input
                        className="signup-input"
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="signup-label">Password *
                    <input
                    className="signup-input"
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label className="signup-label">Confirm Password *
                    <input
                    className="signup-input"
                    type="password"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                <h5 className="h5-signup"> * Required fields </h5>
                {
                    isButtonClicked ?
                        <button className="sign-btn" type="submit"><FontAwesomeIcon icon={faSpinner} spin className="spin-icon" /></button>
                    :
                        <button className="sign-btn" type="submit" onClick={() => setIsButtonClicked(true)}>GO</button>
                }
                <Link to="/" className="already-registered">Already registered?</Link>
            </form>
        </div>
    )
}
export default SignUp;