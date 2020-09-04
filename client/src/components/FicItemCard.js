import React, { useContext, useState, Fragment, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import '../style/ItemCard.scss';
import Context from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheck, faTimes, faSpinner, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const FicItemCard = ({ fic }) => {
    const { listInfo, setListInfo, token } = useContext(Context);

    const [ficInfo, setFicInfo] = useState('');
    const { title, author, ship, genre, description, source, listId } = ficInfo;
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newShip, setNewShip] = useState('');
    const [newGenre, setNewGenre] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newSource, setNewSource] = useState('');

    const [editInfo, setEditInfo] = useState(false);
    

    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isListExpended, setIsListExpended] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setNewTitle(title);
        setNewAuthor(author);
        setNewShip(ship);
        setNewGenre(genre);
        setNewDescription(description);
        setNewSource(source);
    }, [ficInfo]);

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

        const newInfo = {
            title: newTitle === title ? title : newTitle,
            author: newAuthor === author ? author : newAuthor,
            ship: newShip === ship ? ship : newShip,
            genre: newGenre === genre ? genre : newGenre,
            description: newDescription === description ? description : newDescription,
            source: newSource === source ? source : newSource,
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

        const request = await fetch('/fanfics/' + fic, deletedItem);
        const response = await request.json();
        if (response.success) {
            setListInfo(response.ficList);
            localStorage.setItem('list-info', JSON.stringify(listInfo));
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
                                    <button className="item-save-button"><FontAwesomeIcon className="icon-ch-ca" title="cancel" icon={faTimes} onClick={() => setEditInfo(false)}/></button>
                                </div>
                                <div className="form-fields">
                                    <label htmlFor="title" className="item-edit-label">
                                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                                    </label>
                                    <label htmlFor="author" className="item-edit-label">
                                        <input type="text" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
                                    </label>
                                    <label htmlFor="ship" className="item-edit-label">
                                        <input type="text" value={newShip} onChange={(e) => setNewShip(e.target.value)} />
                                    </label>
                                    <label htmlFor="genre" className="item-edit-label">
                                        <input type="text" value={newGenre} onChange={(e) => setNewGenre(e.target.value)} />
                                    </label>
                                    <label htmlFor="description" className="item-edit-label">
                                        <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                                    </label>
                                    <label htmlFor="source" className="item-edit-label">
                                        <input type="text" value={newSource} onChange={(e) => setNewSource(e.target.value)} />
                                    </label>
                                </div>
                            </form>
                        </div>
                    </Fragment>
                    :
                    ficInfo && isMobile ?
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
                                            <li className="item"><span className="category">Title: </span><a href={ficInfo.source} target='_blank' rel="noopener noreferrer">{ficInfo.title}</a></li>
                                            <li className="item"><span className="category">Ship: </span>{ficInfo.ship}</li>
                                            <li className="item"><span className="category">Author: </span>{ficInfo.author}</li>
                                            {
                                                ficInfo.genre ?
                                                    <li className="item"><span className="category">Genre: </span>{ficInfo.genre}</li>
                                                : null
                                            }
                                            {
                                                ficInfo.description ?
                                                    <li className="item"><span className="category">Description: </span>{ficInfo.description}</li>
                                                : null
                                            }
                                        </Fragment>
                                    :
                                        <Fragment>
                                            <li className="item"><span className="category">Title: </span><a href={ficInfo.source} target='_blank' rel="noopener noreferrer">{ficInfo.title}</a></li>
                                            <li className="item"><span className="category">Ship: </span>{ficInfo.ship}</li>
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
                    ficInfo && !isMobile ?
                        <Fragment>
                            <ul className="item-card">
                                <li className="item"><span className="category">Title: </span><a href={ficInfo.source} target='_blank' rel="noopener noreferrer">{ficInfo.title}</a></li>
                                <li className="item"><span className="category">Ship: </span>{ficInfo.ship}</li>
                                <li className="item"><span className="category">Author: </span>{ficInfo.author}</li>
                                {
                                    ficInfo.genre ?
                                        <li className="item"><span className="category">Genre: </span>{ficInfo.genre}</li>
                                    : null
                                }
                                {
                                    ficInfo.description ?
                                        <li className="item"><span className="category">Description: </span>{ficInfo.description}</li>
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

export default FicItemCard;
