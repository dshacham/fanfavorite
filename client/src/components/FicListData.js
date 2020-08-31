import React, { useContext, Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/ListData.scss';
import FicItemCard from './FicItemCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const FicListData = () => {
    const history = useHistory();
    const { listInfo, setListInfo, getUserData, userData, setUserData, token } = useContext(Context);

    const [isListDeleted, setIsListDeleted] = useState(false);
    const [editListInfo, setEditListInfo] = useState(false);

    const [listFandom, setListFandom] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [ship, setShip] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [source, setSource] = useState('');
    const [listId, setListId] = useState('');
    
    const [newListFandom, setNewListFandom] = useState('');
    
    useEffect(() => {
        window.scrollTo(0, 0);
        getUserData();

        const list = localStorage.getItem('list-info');
        if (list) {
            setListInfo(JSON.parse(list));
        }
    }, []);

    useEffect(() => {
        listInfo.ficList ? setListFandom(listInfo.ficList.listFandom) : setListFandom(listInfo.listFandom);
        listInfo.ficList ? setListId(listInfo.ficList._id) : setListId(listInfo._id);
    });

    const handleAddItem = async (e) => {
        e.preventDefault();

        const ficData = {
            title,
            author,
            ship,
            genre,
            description,
            source,
            listId,
            userId: userData._id
        }

        const postFicData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-auth': token
            },
            body: JSON.stringify(ficData)
        }

        const resp = await fetch('/fanfics', postFicData);
        const data = await resp.json();
        if (data.success) {
            setListInfo(data.ficList);
            localStorage.setItem('list-info', JSON.stringify(data.ficList));
            setTitle('');
            setAuthor('');
            setShip('');
            setGenre('');
            setDescription('');
            setSource('');
        };
    };

    // EDIT LiST TITLE:
    const handleSubmitEditList = async (e) => {
        e.preventDefault();

        const newListInfo = {
            listFandom: newListFandom === '' ? listFandom : newListFandom,
            listType: "fanfiction",
        };

        const newFicListData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
            body: JSON.stringify(newListInfo)
        };

        const response = await fetch('/ficlists/' + listId, newFicListData);
        const data = await response.json();
        if (data.success) {
            setListInfo(data.ficList)
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

        const request = await fetch('/ficlists/' + listId, deletedList);
        const response = await request.json();
        if (response.success) {
            setUserData(response.ficLists);
            localStorage.removeItem('list-info');
            setIsListDeleted(true);
        };
    };

    useEffect(() => {
        isListDeleted && history.push('/account');
    });

    return (
        <div className="list-data-container">
            <div className="list-details slide-from-left">
                {
                    listInfo && editListInfo ?
                        <Fragment>
                            <div className="list-edit-form">
                                <form onSubmit={handleSubmitEditList} className="list-edit-form">
                                    <div className="ok-cancel">
                                        <button type="submit" className="list-save-button"><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faCheck}/></button>
                                        <button className="list-save-button"><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faTimes} onClick={() => setEditListInfo(false)}/></button>
                                    </div>
                                    <label htmlFor="listFandom" className="list-edit-label list-edit-label-info">Fandom:
                                        <input type="text" placeholder={listFandom} onChange={(e) => setNewListFandom(e.target.value)} />
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
                            <h2 className="list-h2"><span className="list-title">Favorite Fan Fiction:</span> {listFandom}</h2>
                        </Fragment>
                        : null
                }
                <div className="list-items-container">
                    {
                        listInfo && listInfo.fics ? listInfo.fics.map((fic, i) => {
                            return (
                                <FicItemCard key={i} fic={fic} />
                            )
                        })
                        :
                        listInfo && listInfo.ficList.fics ? listInfo.ficList.fics.map((fic, i) => {
                            return (
                                <FicItemCard key={i} fic={fic} />
                            )
                        })
                        : null
                    }
                </div>
            </div>
                        
            <div className="item-form-container slide-from-right">
                <form className="item-form" onSubmit={handleAddItem}>
                    <h2 className="h2-item">ADD TO THE LIST</h2>
                    <label className="item-label">Title *
                        <input className="item-input" type="text" value={title} required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label className="item-label">Author *
                        <input className="item-input" type="text" value={author} required
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </label>
                    <label className="item-label">Ship *
                        <input className="item-input" type="text" value={ship} required
                            onChange={(e) => setShip(e.target.value)}
                        />
                    </label>
                    <label className="item-label">Genre
                        <input className="item-input" type="text" value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </label>
                    <label className="item-label">Description
                        <input className="item-input" type="text" value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label className="item-label">Source *
                        <input className="item-input" type="text" value={source} required
                            onChange={(e) => setSource(e.target.value)}
                        />
                    </label>
                    <h5 className="h5-item">* Required Fields</h5>
                    <button className="item-btn" type="submit">ADD</button>
                </form>
            </div>
        </div>
    );
}

export default FicListData;
