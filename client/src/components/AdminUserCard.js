import React, { useState, useEffect, useContext, Fragment } from 'react';
import '../style/AdminBoard.scss';
import Context from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const AdminUserCard = ({ el, allUsers, setAllUsers }) => {
    const { token } = useContext(Context);
    
    const { username, role, email, _id } = el;
    const [editInfo, setEditInfo] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [newUsername, setNewUserName] = useState(username);
    const [newRole, setNewRole] = useState(role);
    const [newEmail, setNewEmail] = useState(email);
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleEditUser = async (e) => {
        e.preventDefault();

        // const { username, role, email, _id } = el;

        const newInfo = {
            username: newUsername !== username ? newUsername : username,
            role: newRole !== role ? newRole : role,
            email: newEmail !== email ? newEmail : email,
        };

        const newUserData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
            body: JSON.stringify(newInfo)
        };

        const request = await fetch('/admin/userinfo/' + _id, newUserData);
        const response = await request.json();
        console.log(response)
        if (response.success) {
            setEditInfo(false);
            setAllUsers(response.users)
        };
    };

    const handleEditPassword = async (e) => {
        e.preventDefault();

        const { password, _id } = el;

        const newInfo = {
            password: newPassword === '' ? password : newPassword,
        };

        const newUserData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
            body: JSON.stringify(newInfo)
        };

        const request = await fetch('/admin/password/' + _id, newUserData);
        const response = await request.json();
        if (response.success) {
            setEditPassword(false);
        };
    };

    const deleteUser = async (e) => {
        e.preventDefault();

        const { _id } = el;

        const deletedUser = {
            method: "DELETE",
            headers: {
                "x-auth": token,
            },
        };

        const request = await fetch('/admin/' + _id, deletedUser);
        const response = await request.json();
        if (response.success) {
            setAllUsers(response.users);
        };
    };

    return (
        <div className="users-cards-container">
            {
                editInfo ?
                    <Fragment>
                        <div className="item-edit-form">
                            <form onSubmit={handleEditUser} className="item-edit-form">
                                <label htmlFor="username" className="item-edit-label item-edit-label-info">
                                    <input type="text" value={newUsername} onChange={(e) => setNewUserName(e.target.value)} />
                                </label>
                                <label htmlFor="role" className="item-edit-label item-edit-label-info">
                                    <input type="text" placeholder={el.role} onChange={(e) => setNewRole(e.target.value)} />
                                </label>
                                <label htmlFor="email" className="item-edit-label item-edit-label-info">
                                    <input type="email" placeholder={el.email} onChange={(e) => setNewEmail(e.target.value)} />
                                </label>
                                <div className="ok-cancel">
                                    <button type="submit" className="item-save-button"><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faCheck}/></button>
                                    <button className="item-save-button"><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faTimes} onClick={() => setEditInfo(false)}/></button>
                                </div>
                            </form>
                        </div>
                    </Fragment>
                :
                    editPassword ?
                        <Fragment>
                            <div className="item-edit-form">
                                <form onSubmit={handleEditPassword} className="item-edit-form">
                                    <label htmlFor="password" className="item-edit-label item-edit-label-info">
                                        <input type="password" placeholder="password" onChange={(e) => setNewPassword(e.target.value)} />
                                    </label>
                                    <div className="ok-cancel">
                                        <button type="submit" className="item-save-button"><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faCheck}/></button>
                                        <button className="item-save-button"><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faTimes} onClick={() => setEditInfo(false)}/></button>
                                    </div>
                                </form>
                            </div>
                        </Fragment>
                    :
                        <Fragment>
                            <div className="item-card">
                                <div className="edit-info">
                                    <p className="item"><span className="category">Username: </span>{el.username}</p>
                                    <p className="item"><span className="category">Role: </span>{el.role}</p>
                                    <p className="item"><span className="category">Email: </span>{el.email}</p>
                                    <div className="item-edit-delete">
                                        <FontAwesomeIcon className="icon-ed-de" title="edit" icon={faPencilAlt} onClick={() => setEditInfo(true)} />
                                        <FontAwesomeIcon className="icon-ed-de" title="delete" icon={faTrashAlt} onClick={(e) => {
                                            if (window.confirm(`Are you sure you want to delete item from list?`)) { deleteUser(e) }
                                        }} />
                                    </div>
                                </div>
                                <div className="edit-pass">
                                    <p className="item"><span className="category">Password: </span>...</p>
                                    <div className="item-edit-delete">
                                        <FontAwesomeIcon className="icon-ed-de" title="edit" icon={faPencilAlt} onClick={() => setEditPassword(true)} />
                                    </div>
                                </div>
                            </div>
                        </Fragment>
            }
        </div>
    )


    // const { setListInfo } = useContext(Context);

    // return (
    //     <div>
    //         <button onClick={() => {
    //             setListInfo(el);
    //             localStorage.setItem('list-info', JSON.stringify(el));
    //             setIsFicListClicked(true);
    //         }} className="to-list">{el.fandom}</button>
    //     </div>
    // )
}

export default AdminUserCard;