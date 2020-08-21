import React, { useContext, Fragment, useEffect, useState } from 'react';
import Context from './Context';
import '../style/ListData.scss';
import ItemCard from './ItemCard';

const ListData = () => {
    const { listInfo, setListInfo, userData, setUserData, token, userFanfics } = useContext(Context);

    const [fandom, setFandom] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [ship, setShip] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [source, setSource] = useState('');

    
    useEffect(() => {
        window.scrollTo(0, 0);
        listInfo.ficList ? setFandom(listInfo.ficList.fandom) : setFandom(listInfo.fandom);

        const list = localStorage.getItem('list-info');
        if (list) {
            setListInfo(JSON.parse(list));
        }
    }, []);

    const handleAddItem = async (e) => {
        e.preventDefault();

        const ficData = {
            fandom,
            title,
            author,
            ship,
            genre,
            description,
            source
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
            setUserData(data.user.fics)
        };
    }

    return (
        <div className="list-data-container">
            {
                listInfo ?
                    <Fragment>
                        <div className="list-details">
                        <h2 className="list-h2"><span className="list-title">FANDOM:</span> {fandom}</h2>
                            {
                                userFanfics && userFanfics.map((fic, i) => {
                                    return (
                                    fic.fic.fandom === fandom ?
                                            <ItemCard key={i} fic={fic.fic} />
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
                                <label className="item-label">Author *
                                    <input
                                        className="item-input"
                                        type="text"
                                        value={author}
                                        required
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </label>
                                <label className="item-label">Ship *
                                    <input
                                        className="item-input"
                                        type="text"
                                        value={ship}
                                        required
                                        onChange={(e) => setShip(e.target.value)}
                                    />
                                </label>
                                <label className="item-label">Genre *
                                    <input
                                        className="item-input"
                                        type="text"
                                        value={genre}
                                        required
                                        onChange={(e) => setGenre(e.target.value)}
                                    />
                                </label>
                                <label className="item-label">Description *
                                    <input
                                        className="item-input"
                                        type="text"
                                        value={description}
                                        required
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </label>
                                <label className="item-label">Source *
                                    <input
                                        className="item-input"
                                        type="text"
                                        value={source}
                                        required
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
            }
        </div>
    );
}

export default ListData;
