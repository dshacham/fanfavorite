import React, { useContext } from 'react';
import '../style/ListCard.scss';
import Context from './Context';

const ListCard = ({ el, setIsListClicked }) => {
    const { setListInfo } = useContext(Context);

    return (
        <div>
            <button onClick={() => {
                setListInfo(el);
                localStorage.setItem('list-info', JSON.stringify(el));
                setIsListClicked(true);
            }} className="to-list">{el.ficList.fandom}</button>
        </div>
    )
}

export default ListCard;