
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
import ListData from "./ListData.js"

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userFanfics, setUserFanfics] = useState(null);
  const [userEpisodes, setUserEpisodes] = useState(null);
  const [listInfo, setListInfo] = useState(null);
  const [listItems, setListItems] = useState(null);
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
    console.log(userData)
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
console.log(response1.ficLists)
    response1.ficLists && 
      response1.ficLists.map(ficList => {
        if (ficList.ficsToken === token) {
          allFicLists.push({ficList});
        }
        console.log(ficList)
    });
  
    setUserFanfics(allFicLists);
console.log(userFanfics)
    const request2 = await fetch('/episodes', options);
    const response2 = await request2.json();
    response2.epsLists && response1.epsLists.epsToken === token &&
    response2.epsLists.map(epsList => {
      allFicLists.push({epsList});
    });
    setUserEpisodes(allEpsLists);
  };



  useEffect(() => {
    fetchFaves();
  }, []);

  useEffect(() => {
      fetchFaves();
  }, [listInfo]);

  useEffect(() => {
    fetchFaves();
  }, [userData]);

  return (
    <div className="App">
      <Context.Provider value={{fetchFaves, userFanfics, setUserFanfics, userEpisodes, setUserEpisodes, listInfo, setListInfo, listItems, setListItems, userData, setUserData, getUserData, token, setToken, isAdmin, setIsAdmin, loggedIn, setLoggedIn, winWidth, setWinWidth}}>
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
            <Route path="/list" exact component={ListData} />
            {/* <Route path="/fanfics" exact component={Fanfics} />
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