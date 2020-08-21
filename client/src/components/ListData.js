import React, { useContext, Fragment, useEffect } from 'react';
import Context from './Context';
import '../style/ListData.scss';

const ListData = () => {
    const { listInfo, setListInfo, listItems, setListItems } = useContext(Context);

    useEffect(() => {
        window.scrollTo(0, 0);

        const list = localStorage.getItem('list-info');
        if (list) {
            setListInfo(JSON.parse(list));
        }
    }, []);
console.log(listInfo)
    return (
        <div className="list-info-container">
            {
                listInfo ?
                    <Fragment>
                        <div className="list-details">
                        <h2 className="list-h2">FANDOM: {listInfo.fandom}</h2>
                            {/* {
                                listItems ?
                                    
                                    <ul>
                                        {listItems.map((el, i) => <li key={i}>{el.title}</li>)}
                                    </ul>
                                : null
                            } */}
                        </div>

                    </Fragment>
                    :
                    null
            }
        </div>
    );
}

export default ListData;
