import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/SignUp.scss';


const SignUp = () => {
    const history = useHistory();
    const { userData, setUserData, setToken, loggedIn, setLoggedIn } = useContext(Context);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            const signUpData = {
                username,
                email,
                password,
            }
    
            const userData = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signUpData)
    
            }
            const resp = await fetch('/users', userData);
            const header = resp.headers.get('x-auth');
            const data = await resp.json();
            if (data.success) {
                localStorage.setItem('token', header);
                setToken(header);
                setUserData(data.user)
                setLoggedIn(true)
            } else {
                window.alert(Object.values(data.message[0]));
            }
        } else {
            window.alert('Password doesnn\'t match');
        }
    };

    useEffect(() => {
        loggedIn && history.push('/account')
    })

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignUp}>
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
                <button
                    type="submit"
                    className="button sign-btn">GO</button>
            </form>
        </div>
    )
}
export default SignUp;