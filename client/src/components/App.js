
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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userFanfics, setUserFanfics] = useState(null);
  const [userEpisodes, setUserEpisodes] = useState(null);
  const [listInfo, setListInfo] = useState(null);
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

  // FUNCTION FETCHING ALL THE EVENTS:
  const fetchFaves = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const allFicLists = [];

    const allEpsLists = [];

    const request1 = await fetch('/fanfics', options);
    const response1 = await request1.json();
    console.log(response1.data)
    response1.data && response1.data.fanfics.map(ficList => {
      allFicLists.push({ficList
        // fandom: ficList.fandom,
        // fics: ficList.fics,
        // author: ficList.author,
        // ship: ficList.ship,
        // genre: ficList.genre,
        // description: ficList.description,
        // source: ficList.source,
      });
    });
    setUserFanfics(allFicLists);

    const request2 = await fetch('/episodes', options);
    const response2 = await request2.json();
    response2.data && response2.data.episodes.map(epsList => {
      allFicLists.push({epsList
        // fandom: ficList.fandom,
        // fics: ficList.fics,
        // author: ficList.author,
        // ship: ficList.ship,
        // genre: ficList.genre,
        // description: ficList.description,
        // source: ficList.source,
      });
    });
    setUserEpisodes(allEpsLists);
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

    const request3 = await fetch('/users', options);
    const response3 = await request3.json();
    setUserData(response3.user);
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
  }, [userData]);

  
  console.log(userData)
  return (
    <div className="App">
      <Context.Provider value={{fetchFaves, userFanfics, setUserFanfics, userEpisodes, setUserEpisodes, listInfo, setListInfo, userData, setUserData, getUserData, token, setToken, isAdmin, setIsAdmin, loggedIn, setLoggedIn, winWidth, setWinWidth}}>
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
            {/* <Route path="/fanfics" exact component={Fanfics} />
            <Route path="/addfanfic" exact component={FanficForm} />
            <Route path="/fanfic" exact component={FanficInfo} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" component={Logout} /> */}
          </Switch>
          <Footer />
        </Router>
      </Context.Provider>
    </div>
  );
}


export default App;