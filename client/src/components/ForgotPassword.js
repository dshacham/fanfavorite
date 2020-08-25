import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../style/ForgotPassword.scss';
import Context from './Context';

const ForgotPassword = () => {
    const { getUserData } = useContext(Context)
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const sendPasswordResetEmail = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.post('http://localhost:4000/reset_password/user/' + email, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(res)
            if (res.data.success) {
                setSubmitted(true);
            }

        } catch (err) {
            console.log('this is the error: ', err)
        }
    }

    return (
        <div className="forgotpassword">
            {
                submitted ?
                    <p className="submitted">Email sent!</p>
                :
                    <form className="reset-form" onSubmit={sendPasswordResetEmail}>
                        <label className="reset-pass-label">
                            <input
                                className="reset-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Account's email address"
                            />
                        </label>
                        <button
                            type="submit"
                            className="reset-btn" >SEND</button>
                    </form>
            }
      </div>
    );
}
export default ForgotPassword;