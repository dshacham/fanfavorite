import React, { useContext, useState, Fragment, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import '../style/ItemCard.scss';
import Context from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheck, faTimes, faSpinner, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const EpItemCard = ({ ep }) => {
    const { setListInfo, token } = useContext(Context);

    const [editInfo, setEditInfo] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newSeason, setNewSeason] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newWhyFave, setNewWhyFave] = useState('');
    const [newSource, setNewSource] = useState('');

    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isListExpended, setIsListExpended] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmitEdit = async (e) => {
        e.preventDefault();

        // old data:
        const { listFandom, title, season, number, whyFave, source, listId } = ep;
        
        const newInfo = {
            listFandom: listFandom,
            title: newTitle === '' ? title : newTitle,
            season: newSeason === '' ? season : newSeason,
            number: newNumber === '' ? number : newNumber,
            whyFave: newWhyFave === '' ? whyFave : newWhyFave,
            source: newSource === '' ? source : newSource,
            listId
        };

        const newEpData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
            body: JSON.stringify(newInfo)
        };

        const response = await fetch('/episodes/' + ep._id, newEpData);
        const data = await response.json();
        if (data.success) {
            setListInfo(data.epList);
            setEditInfo(false);
            setIsButtonClicked(false);
        };
    };

    const deleteItem = async (e) => {
        e.preventDefault();

        const deletedItem = {
            method: "DELETE",
            headers: {
                "x-auth": token,
            },
        };

        const request = await fetch('/episodes/' + ep._id, deletedItem);
        const response = await request.json();
        if (response.success) {
            setListInfo(response.epList);
        };
    };

    return (
        <div className={isMobile ? "item-cards-container-mobile" : "item-cards-container-desktop"}>
            {
                editInfo ?
                    <Fragment>
                        <div className="item-edit-form">
                            <form onSubmit={handleSubmitEdit} className="item-edit-form">
                                <div className="ok-cancel">
                                    {
                                        isButtonClicked ?
                                            <button className="item-save-spinner" type="submit"><FontAwesomeIcon icon={faSpinner} spin /></button>
                                        :
                                            <button type="submit" className="item-save-button" onClick={() => setIsButtonClicked(true)}><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faCheck}/></button>
                                    }
                                    <button className="item-save-button"><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faTimes} onClick={() => setEditInfo(false)}/></button>
                                </div>
                                <div className="form-fields">
                                    <label htmlFor="title" className="item-edit-label item-edit-label-info">
                                        <input type="text" placeholder={ep.title} onChange={(e) => setNewTitle(e.target.value)} />
                                    </label>
                                    <label htmlFor="author" className="item-edit-label item-edit-label-info">
                                        <input type="text" placeholder={ep.season} onChange={(e) => setNewSeason(e.target.value)} />
                                    </label>
                                    <label htmlFor="ship" className="item-edit-label item-edit-label-info">
                                        <input type="text" placeholder={ep.number} onChange={(e) => setNewNumber(e.target.value)} />
                                    </label>
                                    <label htmlFor="genre" className="item-edit-label item-edit-label-info">
                                        <input type="text" placeholder={ep.whyFave} onChange={(e) => setNewWhyFave(e.target.value)} />
                                    </label>
                                    <label htmlFor="source" className="item-edit-label item-edit-label-info">
                                        <input type="text" placeholder={ep.source} onChange={(e) => setNewSource(e.target.value)} />
                                    </label>
                                </div>
                            </form>
                        </div>
                    </Fragment>
                    :
                    ep && isMobile ?
                        <Fragment>
                            {
                                isListExpended ?
                                    <FontAwesomeIcon className="arrow" title="collapse list" icon={faChevronUp} onClick={(e) => setIsListExpended(false)} />
                                :
                                    <FontAwesomeIcon className="arrow" title="expend list" icon={faChevronDown} onClick={(e) => setIsListExpended(true)} />
                            }
                            <ul className="item-card">
                                {
                                    isListExpended ?
                                        <Fragment>
                                            <li className="item"><span className="category">Title: </span>{ep.title}</li>
                                            <li className="item"><span className="category">Season: </span>{ep.season}</li>
                                            <li className="item"><span className="category">Number: </span>{ep.number}</li>
                                            {
                                                ep.whyFave ?
                                                    <li className="item"><span className="category">Why is it a fave?: </span>{ep.whyFave}</li>
                                                : null
                                            }
                                            {
                                                ep.source ?
                                                    <li className="item"><span className="category">Link to info: </span><a href={ep.source} target='_blank' rel="noopener noreferrer">Link</a></li>
                                                : null
                                            }
                                        </Fragment>
                                    :
                                        <Fragment>
                                            <li className="item"><span className="category">Title: </span>{ep.title}</li>
                                            <li className="item">{ep.season} x {ep.number}</li>
                                        </Fragment>
                                }
                            </ul>
                            <div className="item-edit-delete">
                                <FontAwesomeIcon className="icon-ed-de" title="edit" icon={faPencilAlt} onClick={() => setEditInfo(true)} />
                                <FontAwesomeIcon className="icon-ed-de" title="delete" icon={faTrashAlt} onClick={(e) => {
                                    if (window.confirm(`Are you sure you want to delete item from list?`)) { deleteItem(e) }
                                }} />
                            </div>
                        </Fragment>
                    :
                    ep && !isMobile ?
                        <Fragment>
                            <ul className="item-card">
                                <li className="item"><span className="category">Title: </span>{ep.title}</li>
                                <li className="item"><span className="category">Season: </span>{ep.season}</li>
                                <li className="item"><span className="category">Number: </span>{ep.number}</li>
                                {
                                    ep.whyFave ?
                                        <li className="item"><span className="category">Why is it a fave?: </span>{ep.whyFave}</li>
                                    : null
                                }
                                {
                                    ep.source ?
                                        <li className="item"><span className="category">Link to info: </span><a href={ep.source} target='_blank' rel="noopener noreferrer">Link</a></li>
                                    : null
                                }
                            </ul>
                            <div className="item-edit-delete">
                                <FontAwesomeIcon className="icon-ed-de" title="edit" icon={faPencilAlt} onClick={() => setEditInfo(true)} />
                                <FontAwesomeIcon className="icon-ed-de" title="delete" icon={faTrashAlt} onClick={(e) => {
                                    if (window.confirm(`Are you sure you want to delete item from list?`)) { deleteItem(e) }
                                }} />
                            </div>
                        </Fragment>
                    :
                        <div className="loading-details">
                            <FontAwesomeIcon icon={faSpinner} spin className="spin-icon" />
                        </div>
            }
        </div>
    )
}

export default EpItemCard;
