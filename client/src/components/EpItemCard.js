import React, { useContext, useState, Fragment, useEffect } from 'react';
import '../style/ItemCard.scss';
import Context from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const EpItemCard = ({ ep }) => {
    const { getUserData, userData, setUserData, setListInfo, token } = useContext(Context);

    const [editInfo, setEditInfo] = useState(false);

    const [newTitle, setNewTitle] = useState('');
    const [newSeason, setNewSeason] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newWhyFave, setNewWhyFave] = useState('');
    const [newSource, setNewSource] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
        getUserData();
    }, []);

    const handleSubmitEdit = async (e) => {
        e.preventDefault();

        // old data:
        const { fandom, title, season, number, whyFave, source, } = ep;
        
        const newInfo = {
            fandom: fandom,
            title: newTitle === '' ? title : newTitle,
            season: newSeason === '' ? season : newSeason,
            number: newNumber === '' ? number : newNumber,
            whyFave: newWhyFave === '' ? whyFave : newWhyFave,
            source: newSource === '' ? source : newSource,
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
console.log(data)
        if (data.success) {
            setListInfo(data.ep)
            setEditInfo(false);
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
            setUserData(response.eps);
        };
    };

    return (
        <div className="item-cards-container">
            {
                editInfo ?
                    <Fragment>
                        <div className="item-edit-form">
                            <form onSubmit={handleSubmitEdit} className="item-edit-form">
                                <div className="ok-cancel">
                                    <button type="submit" className="item-save-button"><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faCheck}/></button>
                                    <button className="item-save-button"><FontAwesomeIcon className="icon-ch-ca" title="edit" icon={faTimes} onClick={() => setEditInfo(false)}/></button>
                                </div>
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
                            </form>
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <ul className="item-card">
                            <li className="item"><span className="category">Title: </span>{ep.title}</li>
                            <li className="item"><span className="category">Season: </span>{ep.season}</li>
                            <li className="item"><span className="category">Number: </span>{ep.number}</li>
                            <li className="item"><span className="category">Why is it a fave?: </span>{ep.whyFave}</li>
                            {
                                ep.source ?
                            <li className="item"><span className="category">Source: </span><a href={ep.source} target='_blank' rel="noopener noreferrer">{ep.source}</a></li>
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
            }
        </div>
    )
}

export default EpItemCard;
