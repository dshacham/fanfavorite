import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/AddFicList.scss';
import axios from 'axios';

const AddFicList = () => {
    const history = useHistory();

    const { userData, setUserData, token} = useContext(Context);

    const [fandom, setFandom] = useState('');
    const listType = 'fanfiction';
    
    // route to list page after creation
    const [statusAdded, setStatusAdded] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleCreateList = async (e) => {
        e.preventDefault();

        const ficListData = {
            fandom,
            listType,
        }

        const postListData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-auth': token
            },
            body: JSON.stringify(ficListData)
        }

        const resp = await fetch('/fanfics', postListData);
        const data = await resp.json();

        console.log(data)
        if (data.success) {
            setUserData(data.user)
            localStorage.setItem('list-info', JSON.stringify(data.ficList));
            setStatusAdded(true)
        }
    }

    useEffect(() => {
        statusAdded && history.push("/list");
    })

    return (
        <div className="form-container">
            <form className="list-form" onSubmit={handleCreateList}>
                <h2 className="h2-list">CREATE A FAN FICTION LIST</h2>
                <label className="list-label">Fandom *
                    <input
                        className="list-input"
                        type="text"
                        value={fandom}
                        required
                        onChange={(e) => setFandom(e.target.value)}
                    />
                </label>
    
                <h5 className="h5-list">* Required Fields</h5>
                <button className="list-btn" type="submit">CONTINUE</button>

            </form>

        </div>
    )
}

export default AddFicList;
