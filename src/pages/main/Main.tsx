import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';

interface User {
    email: string;
    firstName: string;
    lastName: string;
}

export const Main = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);


    
    useEffect(() => {
        const tkn = localStorage.getItem("token");
        if (tkn) {
            axios
                .get<User>('/profile', { headers: { Authorization: `Bearer ${tkn}` } })
                .then(({ data }) => { 
                    setUser(data);
                    setError(null);
                })
                .catch((err) => {
                    console.error("Error fetching user profile:", err.response?.data || err.message);
                    setError(err.response?.data?.error || "Failed to fetch user profile.");
                });
        }
    }, []);
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#081014] to-[#0d1d25] text-white">
            <div className="container px-4 py-12 mx-auto space-y-8 transition-all duration-300 ease-in-out">
                {user ? (
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-6 mb-8 text-white transition-all duration-300 ease-in-out rounded-lg bg-white/5 backdrop-filter backdrop-blur-lg"
                    >
                    <h1 className="mb-2 text-4xl font-bold text-center">
                        Hello {user.firstName} {user.lastName}. Welcome to KDramafy.
                    </h1>
                    </motion.div>
                ) : (
                    !error && <p className="text-center">Loading...</p>
                )}

                <h2 className="mb-8 text-2xl font-semibold text-center transition-all duration-300 ease-in-out">
                    Welcome to KDramafy, your personalized K-Drama recommendation engine! Browse through your recommendations and learn more about each K-Drama. As you try new K-Dramas and your tastes change, be sure to update your preferences!
                </h2>
                
                <div>
                    <Link to = "/explore">
                    <button className="flex items-center justify-center w-full p-4 space-x-2 transition-all duration-300 ease-in-out bg-gray-700 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95">
                            View Your Recommendations
                        </button>
                    </Link>
                </div>

                <div>
                    <Link to = "/onboarding">
                    <button className="flex items-center justify-center w-full p-4 space-x-2 transition-all duration-300 ease-in-out bg-gray-700 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95">
                            Update Your Preferences
                        </button>
                    </Link>
                </div>
                
                <div>
                    <Link to = "/watchlist">
                    <button className="flex items-center justify-center w-full p-4 space-x-2 transition-all duration-300 ease-in-out bg-gray-700 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95">
                            View Your Watchlist
                        </button>
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default Main
