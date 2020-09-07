import React, { useContext, Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { isMobile } from 'react-device-detect';
import Context from './Context';
import '../style/ListData.scss';
import EpItemCard from './EpItemCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheck, faTimes, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

const EpListData = () => {
    const history = useHistory();
    const { listInfo, setListInfo, userData, setUserData, token } = useContext(Context);

    const [isListDeleted, setIsListDeleted] = useState(false);
    const [editListInfo, setEditListInfo] = useState(false);
    const [addToList, setAddToList] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);

    const [listFandom, setListFandom] = useState('');
    const [title, setTitle] = useState('');
    const [season, setSeason] = useState('');
    const [number, setNumber] = useState('');
    const [whyFave, setWhyFave] = useState('');
    const [source, setSource] = useState('');
    const [listId, setListId] = useState('');

    const [newListFandom, setNewListFandom] = useState('');

    const unsortedEps = [];
    const [allListEps, setAllListEps] = useState([]);

    const hideHash = (e) => {
        e.preventDefault();
    };
    
    useEffect(() => {
        window.scrollTo(0, 0);

        const list = localStorage.getItem('list-info');
        if (list && listInfo === '') {
            setListInfo(JSON.parse(list));
        };
    }, []);

    useEffect(() => {
        listInfo && listInfo.epList ? setListFandom(listInfo.epList.listFandom) : setListFandom(listInfo.listFandom);
        listInfo && listInfo.epList ? setNewListFandom(listInfo.epList.listFandom) : setNewListFandom(listInfo.listFandom);
        listInfo && listInfo.epList ? setListId(listInfo.epList._id) : setListId(listInfo._id);
    }, [listInfo.epList, listInfo.listFandom, listInfo._id]);

    useEffect(() => {
        const fetchListEps = async () => {
            const options = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'x-auth': token
                }
            };

            if (listInfo && listInfo.eps) {
                listInfo.eps.map(async(epId) => {
                    const request1 = await fetch('/episodes/' + epId, options);
                    const response1 = await request1.json();
                    response1.ep &&
                    unsortedEps.push(response1.ep);
                    setAllListEps(unsortedEps);
                });
            };
        };
        fetchListEps();
    }, [listInfo]);

    const compare = (a, b) => {
        const seasonA = a.season;
        const seasonB = b.season;
        const numberA = a.number;
        const numberB = b.number;
        
        let comparison = 0;
        if (seasonA > seasonB) {
            comparison = 1;
        } else if (seasonA < seasonB) {
            comparison = -1;
        } else if (seasonA === seasonB && numberA > numberB) {
            comparison = 1;
        } else if (seasonA === seasonB && numberA < numberB) {
            comparison = -1;
        };
        return comparison;
    };

    if (allListEps) {
        allListEps.sort(compare);
    };

    const handleAddItem = async (e) => {
        e.preventDefault();

        const epData = {
            title,
            season,
            number,
            whyFave,
            source,
            listId,
            userId: userData._id
        };

        const postEpData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-auth': token
            },
            body: JSON.stringify(epData)
        };

        const resp = await fetch('/episodes', postEpData);
        const data = await resp.json();
        if (data.success) {
            setListInfo(data.epList);
            localStorage.setItem('list-info', JSON.stringify(data.epList));
            setAddToList(false);
            setIsAddButtonClicked(false);
            setTitle('');
            setSeason('');
            setNumber('');
            setWhyFave('');
            setSource('');
        };
    };

    // EDIT LiST TITLE:
    const handleSubmitEditList = async (e) => {
        e.preventDefault();

        const newListInfo = {
            listFandom: newListFandom === listFandom ? listFandom : newListFandom,
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
            setUserData(data.user);
            setListInfo(data.epList);
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

        const request = await fetch('/eplists/' + listId, deletedList);
        const response = await request.json();
        if (response.success) {
            setUserData(response.user);
            setListInfo(response.epList);
            localStorage.removeItem('list-info');
            setIsListDeleted(true);
        };
    };

    // useEffect(() => {
    //     getUserData();
    // }, [listInfo]);

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
                                                <button type="submit" className="list-save-spinner"><FontAwesomeIcon icon={faSpinner} spin /></button>
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
                            <h2 className={isMobile ? "list-h2-mobile" : "list-h2"}><span className="list-title">Episodes List:</span> {listFandom}</h2>
                            <div className="add-to-list-top">
                                <HashLink onClick={hideHash} to="/eplist#add-form"><FontAwesomeIcon className="icon-add" title="add" icon={faPlus} onClick={() => setAddToList(true)}/></HashLink>
                            </div>
                        </Fragment>
                        : null
                }
                <div className="list-items-container">
                    {
                        listInfo.eps && (listInfo.eps.length > 0) && allListEps ? allListEps.map((ep, i) => {
                                return (
                                <EpItemCard key={i} ep={ep} />
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
                                    <label className="item-label">Link to info
                                        <input className="item-input" type="text" value={source} placeholder="imdb page for example..."
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

export default EpListData;
