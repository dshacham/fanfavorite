import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Context from './Context';
import '../style/Account.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheck, faTimes, faUserEdit, faUnlockAlt, faTrashAlt, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import FicListCard from './FicListCard';
import EpListCard from './EpListCard';

const Account = () => {
    const history = useHistory();
    const { setLoggedIn, userData, setUserData, setListInfo, token, userFicLists, userEpLists } = useContext(Context);

    const [isFicListClicked, setIsFicListClicked] = useState(false);
    const [isEpListClicked, setIsEpListClicked] = useState(false);
   
    const [editUsername, setEditUsername] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isAccountDeleted, setIsAccountDeleted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setListInfo('');
    }, []);

    const handleEditUsername = async (e) => {
        e.preventDefault();

        // old data:
        const { email, password, ficLists, epsLists, fics, eps } = userData;

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
        const { username, email, ficLists, epsLists, fics, eps } = userData;
        
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
            <div className="personal-account">
                {
                    editUsername ?
                        <Fragment>
                            <div className="personal-info">
                                <div className="greetings">
                                    <p className="label-name">Hello, <span className="info">{userData && userData.username}</span>!</p>
                                    <p className="label-email">{userData && userData.email}</p>
                                </div>
                                <form onSubmit={handleEditUsername} className="edit-username-form">
                                    <div className="username-labels-container">
                                        <label htmlFor="username" className="edit-label">
                                            <input type="text" placeholder="Edit username..." onChange={(e) => setNewUsername(e.target.value)} />
                                        </label>
                                    </div>
                                    <div className="save-cancel-container">
                                        <button type="submit" className="save-btn"><FontAwesomeIcon className="icon-ch-ca" title="approve" icon={faCheck}/></button>
                                        <button type="text" className="cancel-btn" onClick={() => setEditUsername(false)}><FontAwesomeIcon className="icon-ch-ca" title="cancel" icon={faTimes} /></button>
                                    </div>
                                </form>
                            </div>
                        </Fragment>
                        :
                        editPassword ?
                        <Fragment>
                            <div className="personal-info">
                                <div className="greetings">
                                    <p className="label-name">Hello, <span className="info">{userData && userData.username}</span>!</p>
                                    <p className="label-email">{userData && userData.email}</p>
                                </div>
                                <form onSubmit={handleEditPassword} className="edit-pass-form">
                                    <div className="password-labels-container">
                                        <label htmlFor="password" className="edit-label">
                                            <input type="password" className="input-pass" placeholder="New password..." onChange={(e) => setNewPassword(e.target.value)} />
                                        </label>
                                        <label htmlFor="confirmPassword" className="edit-label">
                                            <input type="password" className="input-pass" placeholder="Confirm password..." onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </label>
                                    </div>
                                    <div className="save-cancel-container">
                                        <button type="submit" className="save-btn"><FontAwesomeIcon className="icon-ch-ca" title="approve" icon={faCheck}/></button>
                                        <button type="text" className="cancel-btn" onClick={() => setEditPassword(false)}><FontAwesomeIcon className="icon-ch-ca" title="cancel" icon={faTimes} /></button>
                                    </div>
                                </form>
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            {
                                userData && userData.username ?
                                    <div className="personal-info">
                                        <Fragment>
                                            <div className="greetings">
                                                <p className="label-name">Hello, <span className="info">{userData && userData.username}</span>!</p>
                                                <p className="label-email">{userData && userData.email}</p>
                                            </div>
                                            <div className="buttons">
                                                <FontAwesomeIcon className="icon-account" title="edit username" icon={faUserEdit} onClick={() => setEditUsername(true)} />
                                                <FontAwesomeIcon className="icon-account" title="edit password" icon={faUnlockAlt} onClick={() => setEditPassword(true)} />
                                                <FontAwesomeIcon className="icon-account" title="delete account" icon={faTrashAlt} onClick={(e) => {
                                                    if (window.confirm(`Deleting your account will delete all of your lists. \n\nAre you sure you want to continue?`)) { localStorage.clear(); deleteAccount(e) }
                                                    }} />
                                                <FontAwesomeIcon className="icon-account" title="sign out" icon={faPowerOff} onClick={() => { localStorage.clear(); setLoggedIn(false); }} />
                                            </div>
                                        </Fragment>
                                    </div>
                                :
                                    <div className="loading-acc">
                                        <FontAwesomeIcon icon={faSpinner} spin className="spin-icon" />
                                    </div>
                            } 
                        </Fragment>
                }
            </div>
            <div className="personal-lists">
                <div className="fic-list-container">
                    <h3 className="lists-title">Fan Fiction Lists</h3>
                    <Link to="addficlist" className="add-list">+ ADD LIST</Link>
                    {
                        userFicLists &&
                        userFicLists.length ?
                            <Fragment>
                                <div className="list-item-title">
                                    {
                                        userFicLists.map((el, i) => <FicListCard className="list-card" key={i} setIsFicListClicked={setIsFicListClicked} el={el} />)
                                    }
                                </div>
                            </Fragment>
                        :
                        userFicLists &&
                        userFicLists.length === 0 ?
                            <Fragment>
                                <p className="no-lists">You haven't added any lists.</p>
                            </Fragment>
                        :
                        <div className="loading-details">
                            <FontAwesomeIcon icon={faSpinner} spin className="spin-icon" />
                        </div>
                    }
                </div>
                <div className="eps-list-container">
                    <h3 className="lists-title">Episodes Lists</h3>
                    <Link to="addepslist" className="add-list">+ ADD LIST</Link>
                    {
                        userEpLists &&
                        userEpLists.length ?
                            <Fragment>
                                <div className="list-item-title">
                                    {
                                        userEpLists.map((el, i) => {
                                            return (
                                                <EpListCard className="list-card" key={i} setIsEpListClicked={setIsEpListClicked} el={el} />
                                            )
                                        })
                                    }
                                </div>
                            </Fragment>
                        :
                        userEpLists &&
                        userEpLists.length === 0 ?
                            <Fragment>
                                <p className="no-lists">You haven't added any lists.</p>
                            </Fragment>
                        :
                        <div className="loading-details">
                            <FontAwesomeIcon icon={faSpinner} spin className="spin-icon" />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Account;
