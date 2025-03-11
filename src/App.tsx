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
import Dashboard from './pages/dashboard/Dashboard';
import { WavyBackgroundDemo } from './pages/test/test';
import SignUpPage from './pages/sign-up/signup2';
import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";


axios.defaults.baseURL = "https://kdramafyy-753476690747.us-central1.run.app/";


function App() {
    return (
        <div className="App">
            <Router>
                <Navbar/>
                <Toaster position = "bottom-right" toastOptions = {{duration: 2000}}/>
                <Routes>
                    <Route path = "/" element = {<Home/>}/>
                    <Route 
                        path = "/login" 
                        element = {
                            <BackgroundBeamsWithCollision>
                                <Login/>
                            </BackgroundBeamsWithCollision>
                        }
                    />
                    <Route 
                            path="/signup" 
                            element={
                                <BackgroundBeamsWithCollision>
                                    <SignUp />
                                </BackgroundBeamsWithCollision>
                            } 
                        />
                    <Route path = "/onboarding" element = {<Onboarding/>}/>
                    <Route path = "/explore" element = {<Explore/>}/>
                    <Route path = "/watchlist" element = {<Watchlist/>}/>
                    <Route path = "/dashboard" element = {<Dashboard/>}/>
                    <Route path = "/test" element = {<SignUpPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
