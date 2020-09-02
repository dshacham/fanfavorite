import React, { useContext, useState, Fragment, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import '../style/ItemCard.scss';
import Context from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheck, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';

const FicItemCard = ({ fic }) => {
    const { listInfo, setListInfo, token } = useContext(Context);

    const [editInfo, setEditInfo] = useState(false);
    const [ficInfo, setFicInfo] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newShip, setNewShip] = useState('');
    const [newGenre, setNewGenre] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newSource, setNewSource] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchFic = async () => {
            const options = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-auth': token,
              }
            };
    
            const request1 = await fetch('/fanfics/' + fic, options);
            const response1 = await request1.json();
            if (response1.fic) {
                setFicInfo(response1.fic);
            };
          };
        fetchFic();
    }, [listInfo, fic, token]);

    const handleSubmitEdit = async (e) => {
        e.preventDefault();

        // old data:
        const { title, author, ship, genre, description, source, listId } = ficInfo;

        const newInfo = {
            title: newTitle === '' ? title : newTitle,
            author: newAuthor === '' ? author : newAuthor,
            ship: newShip === '' ? ship : newShip,
            genre: newGenre === '' ? genre : newGenre,
            description: newDescription === '' ? description : newDescription,
            source: newSource === '' ? source : newSource,
            listId
        };

        const newFicData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
            body: JSON.stringify(newInfo)
        };

        const request = await fetch('/fanfics/' + fic, newFicData);
        const response = await request.json();
        if (response.success) {
            setListInfo(response.ficList);
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

        const request = await fetch('/fanfics/' + fic, deletedItem);
        const response = await request.json();
        if (response.success) {
            setListInfo(response.ficList);
            localStorage.setItem('list-info', JSON.stringify(listInfo));
        };
    };

    // useEffect(() => {
    //     fetchFic();
    // }, []);

    

    return (
        <div className={isMobile ? "item-cards-container-mobile" : "item-cards-container-desktop"}>
            {
                editInfo ?
                    <Fragment>
                        <div className="item-edit-form">
                            <form onSubmit={handleSubmitEdit} className="item-edit-form">
                                <div className="ok-cancel">
                                    <button type="submit" className="item-save-button"><FontAwesomeIcon className="icon-ch-ca" title="approve" icon={faCheck}/></button>
                                    <button className="item-save-button"><FontAwesomeIcon className="icon-ch-ca" title="cancel" icon={faTimes} onClick={() => setEditInfo(false)}/></button>
                                </div>
                                <div className="form-fields">
                                    <label htmlFor="title" className="item-edit-label">
                                        <input type="text" placeholder={ficInfo.title} onChange={(e) => setNewTitle(e.target.value)} />
                                    </label>
                                    <label htmlFor="author" className="item-edit-label">
                                        <input type="text" placeholder={ficInfo.author} onChange={(e) => setNewAuthor(e.target.value)} />
                                    </label>
                                    <label htmlFor="ship" className="item-edit-label">
                                        <input type="text" placeholder={ficInfo.ship} onChange={(e) => setNewShip(e.target.value)} />
                                    </label>
                                    <label htmlFor="genre" className="item-edit-label">
                                        <input type="text" placeholder={ficInfo.genre} onChange={(e) => setNewGenre(e.target.value)} />
                                    </label>
                                    <label htmlFor="description" className="item-edit-label">
                                        <input type="text" placeholder={ficInfo.description} onChange={(e) => setNewDescription(e.target.value)} />
                                    </label>
                                    <label htmlFor="source" className="item-edit-label">
                                        <input type="text" placeholder={ficInfo.source} onChange={(e) => setNewSource(e.target.value)} />
                                    </label>
                                </div>
                            </form>
                        </div>
                    </Fragment>
                    :
                    ficInfo ?
                        <Fragment>
                            <ul className="item-card">
                                <li className="item"><span className="category">Title: </span>{ficInfo.title}</li>
                                <li className="item"><span className="category">Author: </span>{ficInfo.author}</li>
                                <li className="item"><span className="category">Ship: </span>{ficInfo.ship}</li>
                                <li className="item"><span className="category">Genre: </span>{ficInfo.genre}</li>
                                <li className="item"><span className="category">Description: </span>{ficInfo.description}</li>
                                <li className="item"><span className="category">Source: </span><a href={ficInfo.source} target='_blank' rel="noopener noreferrer">Link</a></li>
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

export default FicItemCard;
