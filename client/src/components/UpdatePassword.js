import React, { useState } from 'react';
import axios from 'axios';
import '../style/UpdatePassword.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheckDouble } from '@fortawesome/free-solid-svg-icons';

const UpdatePassword = ({ match }) => {
    const SERVER_URI = "https://fanfavorite.herokuapp.com";

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [form, setForm] = useState(1);

    const updatePassword = async (e) => {
        e.preventDefault();
        
        const { userId, resetToken } = match.params;
        if (password === confirmPassword && password.length >= 6) {
            setForm(2);
            try {
                const res = await axios.post(`${SERVER_URI}/reset_password/receive_new_password/${userId}/${resetToken}`, {
                    password,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                console.log(res);
                if (res.status) {
                    setForm(3);
                } else {
                    alert('Sorry, there was an issue updating your password. Please make sure it is longer than 6 characters or try again later.');
                };
    
            } catch (err) {
                console.log('this is the error: ', err)
            };
        } else {
            window.alert('Password doesn\'t match or is shorter than 6 characters');
        };
    };

    return (
        <div className="update-password">
            {
                form === 3 ?
                    <p className="submitted"><FontAwesomeIcon icon={faCheckDouble} className="check-icon" />Password updated! <br/>Please login with your new password.</p>
                :
                form === 2 ?
                    <div className="loading-message">
                        <p><FontAwesomeIcon icon={faSpinner} spin className="spin-icon" /> Updating password...</p>
                    </div>
                :
                    <form className="update-form" onSubmit={updatePassword}>
                        <label className="update-pass-label">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New password..."
                            />
                        </label>
                        <label className="update-pass-label">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Retype password..."
                            />
                        </label>
                        <button type="submit" className="update-btn">SEND</button>
                    </form>
            }
      </div>
    );
};

export default UpdatePassword;