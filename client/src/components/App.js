
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
        'Accept': 'application/json',
        'x-auth': token
      }
    };

    const allFicLists = [];

    const allEpsLists = [];

    const request1 = await fetch('/fanfics', options);
    const response1 = await request1.json();
    response1.ficLists && response1.ficLists.map(ficList => {
      allFicLists.push({ficList});
    });
    setUserFanfics(allFicLists);

    const request2 = await fetch('/episodes', options);
    const response2 = await request2.json();
    response2.epsLists && response2.epsLists.map(epsList => {
      allFicLists.push({epsList});
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

    const response = await fetch('/users', options);
    const data = await response.json();
    console.log(data.user)
    // setUserData(data.user);
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