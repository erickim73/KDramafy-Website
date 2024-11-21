import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from './pages/login/Login';
import SignUp from './pages/sign-up/SignUp'
import {Onboarding} from './pages/onboarding/Onboarding'
import {Explore} from './pages/explore/explore-page'
import {Navbar}  from './components/nav';
import {Home} from './pages/home/Home';
import axios from 'axios'
import {Toaster} from "react-hot-toast"
import { UserContextProvider } from './context/userContext';


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
                </Routes>
            </Router>
        </UserContextProvider>
        </div>
    );
}

export default App;
