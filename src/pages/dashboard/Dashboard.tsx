import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { Loader2, PlayCircle, Heart, Settings } from 'lucide-react'
import { WavyBackground } from "../../components/ui/wavy-background";


interface User {
  email: string
  firstName: string
  lastName: string
}

export const Dashboard = () => {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
    const tkn = localStorage.getItem("token")
    if (tkn) {
        axios
        .get<User>('/profile', { headers: { Authorization: `Bearer ${tkn}` } })
        .then(({ data }) => { 
            setUser(data)
            setError(null)
        })
        .catch((err) => {
            console.error("Error fetching user profile:", err.response?.data || err.message)
            setError(err.response?.data?.error || "Failed to fetch user profile.")
        })
    }
    }, [])

    useEffect(() => {
        // Add class to disable scrolling
        document.body.style.overflow = "hidden";

        return () => {
            // Remove class on unmount to re-enable scrolling
            document.body.style.overflow = "auto";
        };
    }, []);

    const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
    }

  return (
    <div className="min-h-screen text-white bg-[#081014]">
        <WavyBackground className="max-w-4xl pb-40 mx-auto ">
            <div className="container max-w-4xl px-4 py-16 mx-auto space-y-12 ">
                <div className = "bg-transparent rounded-2xl">
                    {user ? (
                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center rounded-2xl backdrop-filter "
                        >
                        <h1 className="mb-2 text-5xl font-bold text-center">
                            Welcome back, {user.firstName}!
                        </h1>
                        </motion.div>
                    ) : (
                        !error && (
                        <div className="flex justify-center">
                            <Loader2 className="w-8 h-8 text-indigo-300 animate-spin" />
                        </div>
                        )
                    )}
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-8"
                >
                    <h2 className="text-2xl font-semibold text-center text-indigo-100">
                    Discover, explore, and fall in love with K-Dramas tailored just for you.
                    </h2>
            
                    <div className="grid gap-6 md:grid-cols-2">
                    <Link to="/explore" className="block">
                        <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="flex items-center justify-center w-full p-4 space-x-3 text-lg font-medium transition-colors bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-900"
                        >
                        <PlayCircle className="w-6 h-6" />
                        <span>View Recommendations</span>
                        </motion.button>
                    </Link>
            
                    <Link to="/watchlist" className="block">
                        <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="flex items-center justify-center w-full p-4 space-x-3 text-lg font-medium transition-colors bg-purple-600 rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900"
                        >
                        <Heart className="w-6 h-6" />
                        <span>Your Watchlist</span>
                        </motion.button>
                    </Link>
                    </div>
                    <Link to="/onboarding" className="block">
                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="flex items-center justify-center w-full p-4 space-x-3 text-lg font-medium transition-colors rounded-xl bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-900"
                    >
                        <Settings className="w-6 h-6" />
                        <span>Update Preferences</span>
                    </motion.button>
                    </Link>
                </motion.div>
            </div>
        </WavyBackground>
    </div>
  )
}

export default Dashboard

