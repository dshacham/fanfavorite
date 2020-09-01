import React, { useState, useEffect, useContext, Fragment } from 'react';
import Context from './Context';
import '../style/AdminBoard.scss';
import AdminUserCard from './AdminUserCard';

const AdminBoard = () => {
    const { token } = useContext(Context);

    const [allUsers, setAllUsers] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // useEffect(() => {
    //     getUsers();
    // }, []);

    useEffect(() => {
        const getUsers = async () => {
            const options = {
              method: 'GET',
              headers: {
                'x-auth': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            };
        
            const response = await fetch('/admin', options);
            const data = await response.json();
            setAllUsers(data.users);
          };
        getUsers();
    }, [token]);
    
    return (
        <div className="admin-board">
            <div className="board-container">
                <h3 className="board-title">USERS:</h3>
                <div className="users-list">
                {
                    allUsers &&
                    allUsers.length ?
                        <Fragment>
                            {
                                allUsers.map((el, i) => <AdminUserCard className="user-card" key={i} el={el} allUsers={allUsers} setAllUsers={setAllUsers} />)
                            }
                        </Fragment>
                    : null
                }
                </div>
            </div>
        </div>
    );
};

export default AdminBoard;