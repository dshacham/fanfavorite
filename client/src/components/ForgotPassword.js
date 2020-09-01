import React, { useState } from 'react';
import axios from 'axios';
import '../style/ForgotPassword.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheckDouble } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {

    const [form, setForm] = useState(1);
    const [email, setEmail] = useState('');

    const sendPasswordResetEmail = async (e) => {
        e.preventDefault();
        setForm(2);

        try {
            const res = await axios.post('http://localhost:4000/reset_password/user/' + email, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(res);
            if (res.data.success) {
                setForm(3);
            } else {
                alert('Sorry, there was an issue sending the reset email. Please try again later.');
            }

        } catch (err) {
            console.log('this is the error: ', err);
        }
    }

    return (
        <div className="forgotpassword">
            {
                form === 3 ?
                    <p className="submitted"><FontAwesomeIcon icon={faCheckDouble} className="check-icon" />Email sent!</p>
                :
                form === 2 ?
                    <div className="loading-message">
                        <p><FontAwesomeIcon icon={faSpinner} spin className="spin-icon" /> Sending email...</p>
                    </div>
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
};

export default ForgotPassword;