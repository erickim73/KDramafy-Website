import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Home} from "./pages/home/home-page"
import {Login} from './pages/login/login-page';
import {SignUp} from './pages/sign-up/signup-page'
import {Onboarding} from './pages/onboarding/onboarding-page'
import {Explore} from './pages/explore/explore-page'
import Navbar  from './components/nav';


function App() {
    return (
        <div className="App">
        <Router>
            <Navbar/>
            <Routes>
                <Route path = "/" element = {<Home/>}/>
                <Route path = "/login" element = {<Login/>}/>
                <Route path = "/signup" element = {<SignUp/>}/>
                <Route path = "/onboarding" element = {<Onboarding/>}/>
                <Route path = "/explore" element = {<Explore/>}/>
            </Routes>
        </Router>
        </div>
    );
}

export default App;
