import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/AddFicList.scss';
import axios from 'axios';

const AddEpsList = () => {
    const history = useHistory();

    const { userData, setUserData, token, setListInfo} = useContext(Context);

    const [fandom, setFandom] = useState('');
    const listType = 'episodes';

    // route to list page after creation
    const [statusAdded, setStatusAdded] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleCreateList = async (e) => {
        e.preventDefault();

        const epListData = {
            fandom,
            listType,
        }

        const postListData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-auth': token
            },
            body: JSON.stringify(epListData)
        }

        const resp = await fetch('/eplists', postListData);
        const data = await resp.json();

        if (data.success) {
            setUserData(data.user);
            setListInfo(data.epList);
            localStorage.setItem('list-info', JSON.stringify(data.epList));
            setStatusAdded(true)
        }
    }

    useEffect(() => {
        statusAdded && history.push("/eplist");
    })

    return (
        <div className="form-container">
            <form className="list-form" onSubmit={handleCreateList}>
                <h2 className="h2-list">CREATE AN EPISODE LIST</h2>
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

export default AddEpsList;
