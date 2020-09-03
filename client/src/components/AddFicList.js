import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/AddFicList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AddFicList = () => {
    const history = useHistory();

    const { userData, setUserData, token, setListInfo} = useContext(Context);

    const [listFandom, setListFandom] = useState('');
    const listType = 'fanfiction';

    const [statusAdded, setStatusAdded] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCreateList = async (e) => {
        e.preventDefault();

        const ficListData = {
            listFandom,
            listType,
            userId: userData._id
        };

        const postListData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-auth': token
            },
            body: JSON.stringify(ficListData)
        };

        const resp = await fetch('/ficlists', postListData);
        const data = await resp.json();
        if (data.success) {
            setUserData(data.user);
            setListInfo(data.ficList);
            localStorage.setItem('list-info', JSON.stringify(data.ficList));
            setStatusAdded(true);
            setIsButtonClicked(false);
        };
    };

    useEffect(() => {
        statusAdded && history.push("/ficlist");
    });

    return (
        <div className="form-container">
            <form className="list-form" onSubmit={handleCreateList}>
                <h2 className="h2-list">CREATE A FAN FICTION LIST</h2>
                <label className="list-label">Fandom *
                    <input
                        className="list-input"
                        type="text"
                        value={listFandom}
                        required
                        onChange={(e) => setListFandom(e.target.value)}
                    />
                </label>
                {
                    isButtonClicked ?
                        <button className="list-btn" type="submit"><FontAwesomeIcon icon={faSpinner} spin className="spin-icon" /></button>
                    :
                        <button className="list-btn" type="submit" onClick={() => setIsButtonClicked(true)}>CONTINUE</button>
                }
            </form>
        </div>
    )
}

export default AddFicList;
