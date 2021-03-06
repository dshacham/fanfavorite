import React, { useContext } from 'react';
import '../style/ListCard.scss';
import Context from './Context';

const FicListCard = ({ el, setIsFicListClicked }) => {
    const { setListInfo } = useContext(Context);

    return (
        <div>
            <button onClick={() => {
                setListInfo(el);
                localStorage.setItem('list-info', JSON.stringify(el));
                setIsFicListClicked(true);
            }} className="to-list">{el.listFandom}</button>
        </div>
    )
}

export default FicListCard;