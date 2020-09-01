import React, { useState, useEffect, useContext, Fragment } from 'react';
import '../style/AdminBoard.scss';
import Context from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const AdminUserCard = ({ el, allUsers, setAllUsers }) => {
    const { token } = useContext(Context);

    const [editInfo, setEditInfo] = useState(false);
    const [newUsername, setNewUserName] = useState('');
    const [newRole, setNewRole] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleEditUser = async (e) => {
        e.preventDefault();

        const { username, role, email, password, _id } = el;

        const newInfo = {
            username: newUsername === '' ? username : newUsername,
            role: newRole === '' ? role : newRole,
            email: newEmail === '' ? email : newEmail,
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

        const request = await fetch('/admin/' + _id, newUserData);
        const response = await request.json();
        if (response.success) {
            setEditInfo(false);
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
                                    <input type="text" placeholder={el.username} onChange={(e) => setNewUserName(e.target.value)} />
                                </label>
                                <label htmlFor="role" className="item-edit-label item-edit-label-info">
                                    <input type="text" placeholder={el.role} onChange={(e) => setNewRole(e.target.value)} />
                                </label>
                                <label htmlFor="email" className="item-edit-label item-edit-label-info">
                                    <input type="email" placeholder={el.email} onChange={(e) => setNewEmail(e.target.value)} />
                                </label>
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
                        <ul className="item-card">
                            <li className="item"><span className="category">Username: </span>{el.username}</li>
                            <li className="item"><span className="category">Role: </span>{el.role}</li>
                            <li className="item"><span className="category">Email: </span>{el.email}</li>
                            <li className="item"><span className="category">Password: </span>...</li>
                            </ul>
                        <div className="item-edit-delete">
                            <FontAwesomeIcon className="icon-ed-de" title="edit" icon={faPencilAlt} onClick={() => setEditInfo(true)} />
                            <FontAwesomeIcon className="icon-ed-de" title="delete" icon={faTrashAlt} onClick={(e) => {
                                if (window.confirm(`Are you sure you want to delete item from list?`)) { deleteUser(e) }
                            }} />
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