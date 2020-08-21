import React, { useContext } from 'react';
import '../style/ItemCard.scss';
import Context from './Context';

const EpItemCard = ({ ep }) => {

    return (
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
    )
}

export default EpItemCard;
