import React, { useContext, Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/ListData.scss';
import EpItemCard from './EpItemCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const ListData = () => {
    const history = useHistory();
    const { listInfo, setListInfo, setUserData, token, getUserData } = useContext(Context);

    const [isListDeleted, setIsListDeleted] = useState(false);
    const [editListInfo, setEditListInfo] = useState(false);

    const [fandom, setFandom] = useState('');
    const [title, setTitle] = useState('');
    const [season, setSeason] = useState('');
    const [number, setNumber] = useState('');
    const [whyFave, setWhyFave] = useState('');
    const [moreInfo, setMoreInfo] = useState('');
    const [listId, setListId] = useState('');

    const [newFandom, setNewFandom] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        getUserData();

        const list = localStorage.getItem('list-info');
        if (list) {
            setListInfo(JSON.parse(list));
        }
    }, []);

    useEffect(() => {
        listInfo.epList ? setFandom(listInfo.epList.fandom) : setFandom(listInfo.fandom);
        listInfo.epList ? setListId(listInfo.epList._id) : setListId(listInfo._id);
    });

    const handleAddItem = async (e) => {
        e.preventDefault();

        const epData = {
            title,
            season,
            number,
            whyFave,
            moreInfo,
            listId
        }

        const postEpData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-auth': token
            },
            body: JSON.stringify(epData)
        }

        const resp = await fetch('/episodes', postEpData);
        const data = await resp.json();
        if (data.success) {
            setListInfo(data.epList);
            localStorage.setItem('list-info', JSON.stringify(data.epList));
        };
    };

    // EDIT LiST TITLE:
    const handleSubmitEditList = async (e) => {
        e.preventDefault();

        const newListInfo = {
            fandom: newFandom === '' ? fandom : newFandom,
            listType: "episodes",
        };

        const newEpListData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
            body: JSON.stringify(newListInfo)
        };

        const response = await fetch('/eplists/' + listId, newEpListData);
        const data = await response.json();
        if (data.success) {
            setListInfo(data.epList)
            setEditListInfo(false);
        };
    };

    const deleteList = async (e) => {
        e.preventDefault();

        const deletedList = {
            method: "DELETE",
            headers: {
                "x-auth": token,
            },
        };

        const request = await fetch('/eplists/' + listId, deletedList);
        const response = await request.json();
        if (response.success) {
            setUserData(response.eps);
            localStorage.removeItem('list-info');
            setIsListDeleted(true);
        };
    };

    useEffect(() => {
        isListDeleted && history.push('/account');
    });

    return (
        <div className="list-data-container">
            <div className="list-details">
                {
                    listInfo && editListInfo ?
                        <Fragment>
                            <div className="list-edit-form">
                                <form onSubmit={handleSubmitEditList} className="list-edit-form">
                                    <div className="ok-cancel">
                                        <button type="submit" className="list-save-button"><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faCheck}/></button>
                                        <button className="list-save-button"><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faTimes} onClick={() => setEditListInfo(false)}/></button>
                                    </div>
                                    <label htmlFor="fandom" className="list-edit-label list-edit-label-info">Fandom:
                                        <input type="text" placeholder={fandom} onChange={(e) => setNewFandom(e.target.value)} />
                                    </label>
                                </form>
                            </div>
                        </Fragment>
                    :
                    listInfo ?
                        <Fragment>
                            <div className="list-edit-delete">
                                <FontAwesomeIcon className="icon-ed-de" title="edit" icon={faPencilAlt} onClick={() => setEditListInfo(true)} />
                                <FontAwesomeIcon className="icon-ed-de" title="delete" icon={faTrashAlt} onClick={(e) => {
                                    if (window.confirm(`Are you sure you want to delete item from list?`)) { deleteList(e) }
                                }} />
                            </div>
                            <h2 className="list-h2"><span className="list-title">Favorite Episodes:</span> {fandom}</h2>
                        </Fragment>
                        : null
                }
                <div className="list-items-container">
                    {
                        listInfo && listInfo.eps ? listInfo.eps.map((ep, i) => {
                            return (
                                <EpItemCard key={i} ep={ep} />
                            )
                        })
                        :
                        listInfo && listInfo.epList.eps ? listInfo.epList.eps.map((ep, i) => {
                            return (
                                <EpItemCard key={i} ep={ep} />
                            )
                        })
                        : null
                    }
                </div>
            </div>
                        
            <div className="item-form-container">
                <form className="item-form" onSubmit={handleAddItem}>
                    <h2 className="h2-item">ADD TO THE LIST</h2>
                    <label className="item-label">Title *
                        <input className="item-input" type="text" value={title} required placeholder="episode name..."
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label className="item-label">Season *
                        <input className="item-input" type="text" value={season} required placeholder="season number..."
                            onChange={(e) => setSeason(e.target.value)}
                        />
                    </label>
                    <label className="item-label">Number *
                        <input className="item-input" type="text" value={number} required placeholder="episode number..."
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </label>
                    <label className="item-label">Why is it a fave?
                        <input className="item-input" type="text" value={whyFave} placeholder="to help you remember the ep..."
                            onChange={(e) => setWhyFave(e.target.value)}
                        />
                    </label>
                    <label className="item-label">More Info
                        <input className="item-input" type="text" value={moreInfo} placeholder="imdb page for example..."
                            onChange={(e) => setMoreInfo(e.target.value)}
                        />
                    </label>
                    <h5 className="h5-item">* Required Fields</h5>
                    <button className="item-btn" type="submit">ADD</button>
                </form>
            </div>
            {/* {
                listInfo ?
                    <Fragment>
                        <div className="list-details">
                        <h2 className="list-h2"><span className="list-title">Favorite Episodes:</span> {fandom}</h2>
                        {console.log(userEpisodes)}
                            {
                                userEpisodes && userEpisodes.map((ep, i) => {
                                    return (
                                    ep.ep.fandom === fandom ?
                                            <EpItemCard key={i} ep={ep.ep} />
                                        : null
                                    )
                                })
                            }
                        </div>
                        <div className="item-form-container">
                            <form className="item-form" onSubmit={handleAddItem}>
                                <h2 className="h2-item">ADD TO THE LIST</h2>
                                <label className="item-label">Title *
                                    <input
                                        className="item-input"
                                        type="text"
                                        value={title}
                                        required
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </label>
                                <label className="item-label">Season *
                                    <input
                                        className="item-input"
                                        type="text"
                                        value={season}
                                        required
                                        onChange={(e) => setSeason(e.target.value)}
                                    />
                                </label>
                                <label className="item-label">Number *
                                    <input
                                        className="item-input"
                                        type="text"
                                        value={number}
                                        required
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                </label>
                                <label className="item-label">Why is it a fave? *
                                    <input
                                        className="item-input"
                                        type="text"
                                        value={whyFave}
                                        required
                                        onChange={(e) => setWhyFave(e.target.value)}
                                    />
                                </label>
                                <label className="item-label">Source
                                    <input
                                        className="item-input"
                                        type="text"
                                        value={source}
                                        onChange={(e) => setSource(e.target.value)}
                                    />
                                </label>
                                <h5 className="h5-item">* Required Fields</h5>
                                <button className="item-btn" type="submit">CONTINUE</button>

                            </form>
                        </div>
                    </Fragment>
                    :
                    null
            } */}
        </div>
    );
}

export default ListData;
