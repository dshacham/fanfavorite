
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../style/App.scss";
import Context from "./Context";
// import Home from "./Home";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Landing from "./Landing";
import SignUp from "./SignUp";
import Account from "./Account";
import AddFicList from "./AddFicList";
import AddEpsList from "./AddEpsList";
import FicListData from "./FicListData.js"
import EpListData from "./EpListData.js"

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userFicLists, setUserFicLists] = useState('');
  const [userFanfics, setUserFanfics] = useState('');
  const [userEpLists, setUserEpLists] = useState('');
  const [userEpisodes, setUserEpisodes] = useState('');
  const [listInfo, setListInfo] = useState('');
  const [listItems, setListItems] = useState('');
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // const [navClass, setNavClass] = useState('/');

  const [winWidth, setWinWidth] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.innerWidth > 768 ?
      setWinWidth('desktop')
      :
      setWinWidth('mobile')
  }, []);

  // FETCH ALL FAVE LISTS:
  const fetchFaves = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-auth': token
      }
    };

    const allFicLists = [];
    const allFics = [];
    const allEpsLists = [];
    const allEps = [];

    const request1 = await fetch('/ficlists', options);
    const response1 = await request1.json();
    response1.ficLists && 
      response1.ficLists.map(ficList => {
        allFicLists.push({ficList});
    });
    setUserFicLists(allFicLists);

    const request2 = await fetch('/fanfics', options);
    const response2 = await request2.json();
    response2.fics && 
      response2.fics.map(fic => {
        allFics.push({fic});
    });
    setUserFanfics(allFics);

    const request3 = await fetch('/eplists', options);
    const response3 = await request3.json();
    response3.epLists &&
    response3.epLists.map(epList => {
      allEpsLists.push({epList});
    });
    setUserEpLists(allEpsLists);

    const request4 = await fetch('/episodes', options);
    const response4 = await request4.json();
    response4.eps &&
    response4.eps.map(ep => {
      allEps.push({ep});
    });
    setUserEpisodes(allEps);
  };

  // FETCH USER INFO:
  const getUserData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'x-auth': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const response = await fetch('/users', options);
    const data = await response.json();
    setUserData(data.user);
  };

  // LOAD THE USER DATA IF LOGGED IN:
  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      getUserData();
    }
  }, []);

  useEffect(() => {
    fetchFaves();
  }, []);

  useEffect(() => {
      fetchFaves();
  }, [listInfo]);

//   useEffect(() => {
//     fetchFaves();
// }, [userFanfics]);

  useEffect(() => {
    fetchFaves();
  }, [userData]);

  return (
    <div className="App">
      <Context.Provider value={{fetchFaves, userFicLists, setUserFicLists, userFanfics, setUserFanfics, userEpLists, setUserEpLists, userEpisodes, setUserEpisodes, listInfo, setListInfo, listItems, setListItems, userData, setUserData, getUserData, token, setToken, isAdmin, setIsAdmin, loggedIn, setLoggedIn, winWidth, setWinWidth}}>
        <Router>
        <NavBar />
          {/* {winWidth === 'desktop' ?
            <NavBar />
            :
            <DropDownNav />
          } */}
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/account" exact component={Account} />
            <Route path="/addficlist" exact component={AddFicList} />
            <Route path="/addepslist" exact component={AddEpsList} />
            <Route path="/ficlist" exact component={FicListData} />
            <Route path="/eplist" exact component={EpListData} />
          </Switch>
          <Footer />
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;