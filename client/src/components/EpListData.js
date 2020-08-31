import React, { useContext, Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/ListData.scss';
import EpItemCard from './EpItemCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheck, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';

const EpListData = () => {
    const history = useHistory();
    const { listItems, setListItems, listInfo, setListInfo, userData, setUserData, token, getUserData, sortedEps, setSortedEps } = useContext(Context);

    const [isListDeleted, setIsListDeleted] = useState(false);
    const [editListInfo, setEditListInfo] = useState(false);

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
    
    useEffect(() => {
        window.scrollTo(0, 0);

        const list = localStorage.getItem('list-info');
        if (list) {
            setListInfo(JSON.parse(list));
        };
    }, []);

    useEffect(() => {
        listInfo.epList ? setListFandom(listInfo.epList.listFandom) : setListFandom(listInfo.listFandom);
        listInfo.epList ? setListId(listInfo.epList._id) : setListId(listInfo._id);
    });

    const fetchListEps = async () => {
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'x-auth': token
            }
        };

        if (listInfo.eps) {
            listInfo.eps.map(async(epId) => {
                const request1 = await fetch('/episodes/' + epId, options);
                const response1 = await request1.json();
                response1.ep &&
                unsortedEps.push(response1.ep);
                setAllListEps(unsortedEps);
            });
        };
    };

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
    } 

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
            localStorage.setItem('list-items', JSON.stringify(data.epList.eps));
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
            listFandom: newListFandom === '' ? listFandom : newListFandom,
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
            setUserData(data.user)
            setListInfo(data.epList);
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
            setUserData(response.epLists);
            localStorage.removeItem('list-info');
            setIsListDeleted(true);
        };
    };

    useEffect(() => {
        isListDeleted && history.push('/account');
    });

    useEffect(() => {
        getUserData();
    }, [getUserData])

    useEffect(() => {
        fetchListEps();
    }, [listInfo])

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
                            <h2 className="list-h2"><span className="list-title">Favorite Episodes:</span> {listFandom}</h2>
                        </Fragment>
                        : null
                }
                <div className="list-items-container">
                    {
                        allListEps ? allListEps.map((ep, i) => {
                                return (
                                <EpItemCard key={i} ep={ep} fetchListEps={fetchListEps} />
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
                    <button className="item-btn" type="submit">ADD</button>
                </form>
            </div>
        </div>
    );
}

export default EpListData;
