import React, { useState, useEffect, useContext, Fragment } from 'react';
import Context from './Context';
import { useHistory, Link } from 'react-router-dom';
import '../style/Account.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import FicListCard from './FicListCard';
import EpListCard from './EpListCard';

const Account = () => {
    const history = useHistory();

    const { setLoggedIn, getUserData, userData, setUserData, setListInfo, token, userFicLists, userEpLists } = useContext(Context);

    const [isFicListClicked, setIsFicListClicked] = useState(false);
    const [isEpListClicked, setIsEpListClicked] = useState(false);
    // this state change fragment between info and inputs to be edited
    const [editUsername, setEditUsername] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    // this will be the new info inserted by the user:
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isAccountDeleted, setIsAccountDeleted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
        getUserData();
    }, []);

    const handleEditUsername = async (e) => {
        e.preventDefault();

        // old data:
        const { username, email, password, ficLists, epsLists, fics, eps } = userData;

        const newInfo = {
            username: newUsername,
            email: email,
            password: password,
            ficLists: ficLists,
            epsLists: epsLists,
            fics: fics,
            eps: eps
        };

        const newUserData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
            body: JSON.stringify(newInfo)
        };

        const response = await fetch('/users/username', newUserData);
        const data = await response.json();
        if (data.success) {
            setUserData(data.user);
            setEditUsername(false);
        } else {
            window.alert(Object.values(data.message[0]));
        };
    }

    const handleEditPassword = async (e) => {
        e.preventDefault();

        // old data:
        const { username, email, password, ficLists, epsLists, fics, eps } = userData;
        
        if (newPassword === confirmPassword) {
            const newInfo = {
                username: username,
                email: email,
                password: newPassword,
                ficLists: ficLists,
                epsLists: epsLists,
                fics: fics,
                eps: eps
            };

            const newUserData = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth": token
                },
                body: JSON.stringify(newInfo)
            };
        
            const response = await fetch('/users/password', newUserData);
            const data = await response.json();
            console.log(data)
            if (data.success) {
                setUserData(data.user);
                setEditPassword(false);
            } else {
                window.alert(Object.values(data.message[0]));
            };
        } else {
            window.alert('Password doesn\'t match.');
        };
    };

    const deleteAccount = async (e) => {
        e.preventDefault();

        const deletedUser = {
            method: "DELETE",
            headers: {
                "x-auth": token,
            },
        };

        const request = await fetch('/users/' + userData._id, deletedUser);
        const response = await request.json();
        console.log(response)
        if (response.success) {
            setIsAccountDeleted(true);
            setLoggedIn(false);
        };
    };

    // redirect to list page
    useEffect(() => {
        isFicListClicked && history.push("/ficlist");
        isEpListClicked && history.push("/eplist");
        isAccountDeleted && history.push("/");
    });
    
    return (
        <div className="account-container">
            <div className="personal-account slide-from-left">
                <h4 className="h4-account">ACCOUNT INFO</h4>
                {
                    editUsername ?
                        <Fragment>
                            <div className="personal-info">
                                <form onSubmit={handleEditUsername} className="edit-form">
                                    <label htmlFor="username" className="edit-label edit-label-user-info">
                                        <input type="text" placeholder="New username..." onChange={(e) => setNewUsername(e.target.value)} />
                                    </label>
                                    <button type="submit" className="save-button">SAVE</button>
                                    <p className="cancel-edit" onClick={() => setEditUsername(false)}>Cancel</p>
                                </form>
                            </div>
                        </Fragment>
                        :
                        editPassword ?
                        <Fragment>
                            <div className="personal-info">
                                <form onSubmit={handleEditPassword} className="edit-form">
                                    <label htmlFor="password" className="edit-label edit-label-user-info">
                                        <input type="password" placeholder="New password..." onChange={(e) => setNewPassword(e.target.value)} />
                                    </label>
                                    <label htmlFor="confirmPassword" className="edit-label edit-label-user-info">
                                        <input type="password" placeholder="Confirm password..." onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </label>
                                    <button type="submit" className="save-button">SAVE</button>
                                    <p className="cancel-edit" onClick={() => setEditPassword(false)}>Cancel</p>
                                </form>
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <div className="personal-info">
                                <p className="label">Username:</p>
                                <p className="info">{userData && userData.username}</p>
                                <p className="label">Email:</p>
                                <p className="info">{userData && userData.email}</p>
                                <button className="edit-btn edit-btn-one" onClick={() => setEditUsername(true)}>CHANGE USERNAME</button>
                                <button className="edit-btn" onClick={() => setEditPassword(true)}>CHANGE PASSWORD</button>
                                <p className="delete-button" onClick={(e) => {
                                        if (window.confirm(`Deleting your account will delete all of your lists. \n\nAre you sure you want to continue?`)) { localStorage.clear(); deleteAccount(e) }
                                    }}>Delete Account
                                </p>
                                <div className="create-links">
                                    <Link to="addepslist">Create Episodes List</Link>
                                    <Link to="addficlist">Create Fan Fiction List</Link>
                                </div>
                            </div>
                        </Fragment>
                }
            </div>
            <div className="personal-lists slide-from-right">
                <div className="fic-list-container">
                    <h3 className="lists-title">Fan Fiction Lists</h3>
                    <div className="list-item-title">
                    {
                        userData &&
                        userData.ficLists &&
                        userData.ficLists.length ?
                            <Fragment>
                                {
                                    userData.ficLists.map((el, i) => <FicListCard className="list-card" key={i} setIsFicListClicked={setIsFicListClicked} el={el} />)
                                }
                            </Fragment>
                        :
                            <Fragment>
                                <p className="no-lists">You haven't added any lists.</p>
                            </Fragment>
                    }
                    </div>
                </div>
                <div className="eps-list-container">
                    <h3 className="lists-title">Episodes Lists</h3>
                    <div className="list-item-title">
                        {
                            userData &&
                            userData.epsLists &&
                            userData.epsLists.length ?
                                <Fragment>
                                    {
                                        userData.epsLists.map((el, i) => <EpListCard className="list-card" key={i} setIsEpListClicked={setIsEpListClicked} el={el} />)
                                    }
                                </Fragment>
                                :
                                <Fragment>
                                    <p className="no-lists">You haven't added any lists.</p>
                                </Fragment>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
