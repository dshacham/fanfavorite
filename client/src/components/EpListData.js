import React, { useContext, Fragment, useEffect, useState } from 'react';
import Context from './Context';
import '../style/ListData.scss';
import EpItemCard from './EpItemCard';

const ListData = () => {
    const { listInfo, setListInfo, userData, setUserData, token, userEpisodes } = useContext(Context);

    const [fandom, setFandom] = useState('');
    const [title, setTitle] = useState('');
    const [season, setSeason] = useState('');
    const [number, setNumber] = useState('');
    const [whyFave, setWhyFave] = useState('');
    const [source, setSource] = useState('');
    
    useEffect(() => {
        window.scrollTo(0, 0);
        listInfo.epList ? setFandom(listInfo.epList.fandom) : setFandom(listInfo.fandom);

        const list = localStorage.getItem('list-info');
        if (list) {
            setListInfo(JSON.parse(list));
        }
    }, []);

    const handleAddItem = async (e) => {
        e.preventDefault();

        const epData = {
            fandom,
            title,
            season,
            number,
            whyFave,
            source
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
            setUserData(data.user.eps)
        };
    }

    return (
        <div className="list-data-container">
            {
                listInfo ?
                    <Fragment>
                        <div className="list-details">
                        <h2 className="list-h2"><span className="list-title">FANDOM:</span> {fandom}</h2>
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
            }
        </div>
    );
}

export default ListData;
