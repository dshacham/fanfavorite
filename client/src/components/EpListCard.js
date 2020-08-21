import React, { useContext } from 'react';
import '../style/ListCard.scss';
import Context from './Context';

const EpListCard = ({ el, setIsEpListClicked }) => {
    const { setListInfo } = useContext(Context);

    return (
        <div>
            <button onClick={() => {
                setListInfo(el);
                localStorage.setItem('list-info', JSON.stringify(el));
                setIsEpListClicked(true);
            }} className="to-list">{el.epList.fandom}</button>
        </div>
    )
}

export default EpListCard;