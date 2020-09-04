import React, { useContext, Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { isMobile } from 'react-device-detect';
import Context from './Context';
import '../style/ListData.scss';
import FicItemCard from './FicItemCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheck, faTimes, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

const FicListData = () => {
    const history = useHistory();
    const { listInfo, setListInfo, userData, setUserData, token } = useContext(Context);

    const [isListDeleted, setIsListDeleted] = useState(false);
    const [editListInfo, setEditListInfo] = useState(false);
    const [addToList, setAddToList] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);

    const [listFandom, setListFandom] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [ship, setShip] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [source, setSource] = useState('');
    const [listId, setListId] = useState('');
    
    const [newListFandom, setNewListFandom] = useState('');
    
    const hideHash = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const list = localStorage.getItem('list-info');
        if (list) {
            setListInfo(JSON.parse(list));
        }
    }, []);

    useEffect(() => {
        listInfo.ficList ? setListFandom(listInfo.ficList.listFandom) : setListFandom(listInfo.listFandom);
        listInfo.ficList ? setNewListFandom(listInfo.ficList.listFandom) : setNewListFandom(listInfo.listFandom);
        listInfo.ficList ? setListId(listInfo.ficList._id) : setListId(listInfo._id);
    }, [listInfo.ficList, listInfo.listFandom, listInfo._id]);

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
        };

        const postFicData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-auth': token
            },
            body: JSON.stringify(ficData)
        };

        const resp = await fetch('/fanfics', postFicData);
        const data = await resp.json();
        if (data.success) {
            setListInfo(data.ficList);
            localStorage.setItem('list-info', JSON.stringify(data.ficList));
            setAddToList(false);
            setIsAddButtonClicked(false);
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
            listFandom: newListFandom === listFandom ? listFandom : newListFandom,
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
            setUserData(data.user);
            setListInfo(data.ficList);
            setEditListInfo(false);
            setIsButtonClicked(false);
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
        <div className={isMobile ? "list-data-container mobile-width" : "list-data-container"}>
            <div className="list-details">
                {
                    listInfo && editListInfo ?
                        <Fragment>
                            <div className="list-edit-form">
                                <form onSubmit={handleSubmitEditList} className="list-edit-form">
                                    <div className={isMobile ? "ok-cancel-mobile" : "ok-cancel"}>
                                        {
                                            isButtonClicked ?
                                                <button className="list-save-spinner" type="submit"><FontAwesomeIcon icon={faSpinner} spin /></button>
                                            :
                                                <button type="submit" className="list-save-button" onClick={() => setIsButtonClicked(true)}><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faCheck}/></button>
                                        }
                                        <button className="list-save-button"><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faTimes} onClick={() => setEditListInfo(false)}/></button>
                                    </div>
                                    <label htmlFor="listFandom" className={isMobile ? "margin list-edit-label" : "list-edit-label"}>Fandom:
                                        <input type="text" value={newListFandom} onChange={(e) => setNewListFandom(e.target.value)} />
                                    </label>
                                </form>
                            </div>
                        </Fragment>
                    :
                    listInfo ?
                        <Fragment>
                            <div className={isMobile ? "list-edit-delete-mobile" : "list-edit-delete"}>
                                <FontAwesomeIcon className="icon-ed-de" title="edit" icon={faPencilAlt} onClick={() => setEditListInfo(true)} />
                                <FontAwesomeIcon className="icon-ed-de" title="delete" icon={faTrashAlt} onClick={(e) => {
                                    if (window.confirm(`Are you sure you want to delete item from list?`)) { deleteList(e) }
                                }} />
                            </div>
                            <h2 className={isMobile ? "list-h2-mobile" : "list-h2"}><span className="list-title">Fan Fiction List:</span> {listFandom}</h2>
                            <div className="add-to-list-top">
                                <HashLink onClick={hideHash} to="/ficlist#add-form"><FontAwesomeIcon className="icon-add" title="add" icon={faPlus} onClick={() => setAddToList(true)}/></HashLink>
                            </div>
                        </Fragment>
                        : null
                }
                <div className="list-items-container">
                    {
                        listInfo.fics && (listInfo.fics.length > 0) ? 
                            listInfo.fics.map((fic, i) => {
                                return (
                                    <FicItemCard key={i} fic={fic} />
                                )
                            })
                        :
                            <p className="no-lists">You haven't added any items.</p>
                    }
                </div>
                <div className="add-form" id="add-form">
                    {
                        addToList ?
                        <div className="item-form-container">
                            <form className={isMobile ? "item-form item-form-mobile" : "item-form"} onSubmit={handleAddItem}>
                                <h2 className="h2-item">ADD TO THE LIST</h2>
                                <label className="item-label">Title *
                                    <input className="item-input" type="text" value={title} required
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </label>
                                <label className="item-label">Ship *
                                    <input className="item-input" type="text" value={ship} required
                                        onChange={(e) => setShip(e.target.value)}
                                    />
                                </label>
                                <label className="item-label">Author *
                                    <input className="item-input" type="text" value={author} required
                                        onChange={(e) => setAuthor(e.target.value)}
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
                                <div className="save-cancel-container">
                                    {
                                        isAddButtonClicked ?
                                            <button type="submit" className="icon-spin"><FontAwesomeIcon icon={faSpinner} spin /></button>
                                        :
                                        <button type="submit" className="save-btn" onClick={() => setIsAddButtonClicked(true)}><FontAwesomeIcon className="icon-ch-ca" title="approve" icon={faCheck}/></button>
                                    }
                                    <button type="text" className="cancel-btn" onClick={() => setAddToList(false)}><FontAwesomeIcon className="icon-ch-ca" title="cancel" icon={faTimes} /></button>
                                </div>
                            </form>
                        </div>
                        :
                        <div className="add-to-list">
                            <FontAwesomeIcon className="icon-add" title="add" icon={faPlus} onClick={() => setAddToList(true)}/>
                        </div>
                    }
                </div>
            </div>
                        
            
        </div>
    );
}

export default FicListData;
