import React, { useState, useEffect, useContext, Fragment } from 'react';
import Context from './Context';
import { useHistory, Link } from 'react-router-dom';
import '../style/Account.scss';
import ListCard from './ListCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Account = () => {
    const history = useHistory();

    const { setLoggedIn, getUserData, userData, setUserData, setListInfo, token } = useContext(Context);

    const [isListClicked, setIsListClicked] = useState(false);
    // this state change fragment between info and inputs to be edited
    const [editInfo, setEditInfo] = useState(false);
    // this will be the new info inserted by the user:
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [isAccountDeleted, setIsAccountDeleted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
        getUserData();
    }, []);

    const [refresh, setRefresh] = useState(true);
    useEffect(() => {
        getUserData();
        setRefresh(false)
    }, [refresh]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // old data:
        const { username, email, password, ficLists, epsLists, fics, eps } = userData;

        const newInfo = {
            username: newUsername === '' ? username : newUsername,
            email: newEmail === '' ? email : newEmail,
            ficLists: ficLists,
            epsLists: epsLists,
            fics: fics,
            eps: eps
        };

        const newInfoAndPassword = {
            username: newUsername === '' ? username : newUsername,
            email: newEmail === '' ? email : newEmail,
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
            body: JSON.stringify(newPassword === '' ? newInfo : newInfoAndPassword)
        };

        const response = await fetch('/users', newUserData);
        const data = await response.json();

        if (data.success) {
            setUserData(data.user);
            setEditInfo(false);
        };
    };

    const deleteAccount = async (e) => {
        e.preventDefault();

        const deletedUser = {
            method: "DELETE",
            headers: {
                "x-auth": token,
                "accountId": userData._id
            },
        };

        const request = await fetch('/users', deletedUser);
        const response = await request.json();
        if (response.success) {
            setIsAccountDeleted(true);
            setLoggedIn(false);
        };
    };

    // redirect to list page
    useEffect(() => {
        isListClicked && history.push('/list');
        isAccountDeleted && history.push('/');
    });

    
    console.log(userData)

    return (
        <div className="account-container">
            <div className="personal-account slide-from-left">
                <h4 className="h4-account">ACCOUNT INFO</h4>
                {
                    editInfo ?
                        <Fragment>
                            <div className="personal-info">
                                <form onSubmit={handleSubmit} className="edit-form">
                                    <label htmlFor="username" className="edit-label edit-label-user-info">
                                        <input type="text" placeholder="New username..." onChange={(e) => setNewUsername(e.target.value)} />
                                    </label>
                                    <label htmlFor="email" className="edit-label edit-label-user-info">
                                        <input type="email" placeholder="New email..." onChange={(e) => setNewEmail(e.target.value)} />
                                    </label>
                                    <label htmlFor="password" className="edit-label edit-label-user-info">
                                        <input type="password" placeholder="New password..." onChange={(e) => setNewPassword(e.target.value)} />
                                    </label>
                                    <button type='submit' className="save-button">SAVE</button>
                                    <p className="cancel-edit" onClick={() => setEditInfo(false)}>Cancel</p>
                                    <Link to="deletedaccount" className="delete-button button-margin" onClick={(e) => {
                                        if (window.confirm(`Deleting your account will delete all of your lists. \n\nAre you sure you want to continue?`)) { localStorage.clear(); deleteAccount(e) }
                                    }}>Delete Account
                                         </Link>
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
                                <button className="edit-btn" onClick={() => setEditInfo(true)}>EDIT / CHANGE PASSWORD</button>
                                <div className="create-links">
                                    <Link to="addficlist">Create Fan Fiction List</Link>
                                    <Link to="addepslist">Create Episodes List</Link>
                                </div>
                            </div>
                        </Fragment>
                }
            </div>
            <div className="personal-lists slide-from-right">
                <div className="fic-list-container">
                    <h3 className="lists-title">Fan Fiction Lists</h3>
                    {
                        userData &&
                        userData.ficLists &&
                        userData.ficLists.length ?
                            <Fragment>
                                {userData.ficLists.map((el, i) => <ListCard key={i} setIsListClicked={setIsListClicked} setListInfo={setListInfo} el={el} />)}
                            </Fragment>
                            :
                            <Fragment>
                                <p className="no-lists">You haven't added any lists.</p>
                            </Fragment>
                    }
                </div>
                <div className="eps-list-container">
                    <h3 className="lists-title">Episodes Lists</h3>
                    {
                        userData &&
                        userData.epsLists &&
                        userData.epsLists.length ?
                            <Fragment>
                                {userData.epsLists.map((el, i) => <ListCard key={i} setIsListClicked={setIsListClicked} setListInfo={setListInfo} el={el} />)}
                            </Fragment>
                            :
                            <Fragment>
                                <p className="no-lists">You haven't added any lists.</p>
                            </Fragment>
                    }
                </div>
            </div>
        </div>
    );
};

export default Account;
