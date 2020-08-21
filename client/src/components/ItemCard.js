import React, { useContext } from 'react';
import '../style/ItemCard.scss';
import Context from './Context';

const ItemCard = ({ fic }) => {

    return (
        <ul className="item-card">
            <li className="item"><span className="category">Title: </span>{fic.title}</li>
            <li className="item"><span className="category">Author: </span>{fic.author}</li>
            <li className="item"><span className="category">Ship: </span>{fic.ship}</li>
            <li className="item"><span className="category">Genre: </span>{fic.genre}</li>
            <li className="item"><span className="category">Description: </span>{fic.description}</li>
            <li className="item"><span className="category">Source: </span><a href={fic.source} target='_blank' rel="noopener noreferrer">{fic.source}</a></li>
        </ul>
    )
}

export default ItemCard;
