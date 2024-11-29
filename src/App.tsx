import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from './pages/login/Login';
import SignUp from './pages/sign-up/SignUp'
import {Onboarding} from './pages/onboarding/Onboarding'
import {Explore} from './pages/explore/Explore'
import {Navbar}  from './components/nav';
import {Home} from './pages/home/Home';
import Watchlist from './pages/watchlist/Watchlist';
import axios from 'axios'
import {Toaster} from "react-hot-toast"
import { UserContextProvider } from './context/userContext';
import Main from './pages/main/Main';


axios.defaults.baseURL = "http://127.0.0.1:5000";


function App() {
    return (
        <div className="App">
        <UserContextProvider>
            <Router>
                <Navbar/>
                <Toaster position = "bottom-right" toastOptions = {{duration: 2000}}/>
                <Routes>
                    <Route path = "/" element = {<Home/>}/>
                    <Route path = "/login" element = {<Login/>}/>
                    <Route path = "/signup" element = {<SignUp/>}/>
                    <Route path = "/onboarding" element = {<Onboarding/>}/>
                    <Route path = "/explore" element = {<Explore/>}/>
                    <Route path = "/watchlist" element = {<Watchlist/>}/>
                    <Route path = "/main" element = {<Main/>}/>
                </Routes>
            </Router>
        </UserContextProvider>
        </div>
    );
}

export default App;
