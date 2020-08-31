
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../style/App.scss";
import Context from "./Context";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Landing from "./Landing";
import SignUp from "./SignUp";
import Account from "./Account";
import AddFicList from "./AddFicList";
import AddEpsList from "./AddEpsList";
import FicListData from "./FicListData.js"
import EpListData from "./EpListData.js"
import ForgotPassword from "./ForgotPassword";
import UpdatePassword from "./UpdatePassword";
import AdminBoard from "./AdminBoard";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userFicLists, setUserFicLists] = useState('');
  const [userFanfics, setUserFanfics] = useState('');
  const [userEpLists, setUserEpLists] = useState('');
  const [userEpisodes, setUserEpisodes] = useState('');
  const [listInfo, setListInfo] = useState('');
  const [listItems, setListItems] = useState('');
  const [sortedEps, setSortedEps] = useState('');
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [allListEps, setAllListEps] = useState('');

  const [winWidth, setWinWidth] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
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

    const response = await fetch('/users', options);
    const data = await response.json();

    if (data.success) {
      setUserData(data.user);
      setUserEpLists(data.user.epsLists)
      setUserFicLists(data.user.ficLists)
    }
  };

  // LOAD THE USER DATA IF LOGGED IN:
  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      getUserData();
    }
  }, []);

  return (
    <div className="App">
      <Context.Provider value={{ allListEps, setAllListEps, sortedEps, setSortedEps, userFicLists, setUserFicLists, userFanfics, setUserFanfics, userEpLists, setUserEpLists, userEpisodes, setUserEpisodes, listInfo, setListInfo, listItems, setListItems, userData, setUserData, getUserData, token, setToken, isAdmin, setIsAdmin, loggedIn, setLoggedIn, winWidth, setWinWidth}}>
        <Router>
        <NavBar />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/account" exact component={Account} />
            <Route path="/admin" exact component={AdminBoard} />
            <Route path="/addficlist" exact component={AddFicList} />
            <Route path="/addepslist" exact component={AddEpsList} />
            <Route path="/ficlist" exact component={FicListData} />
            <Route path="/eplist" exact component={EpListData} />
            <Route path="/reset_password" exact component={ForgotPassword} />
            <Route path="/password/reset/:userId/:resetToken" exact component={UpdatePassword} />
          </Switch>
          <Footer />
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;