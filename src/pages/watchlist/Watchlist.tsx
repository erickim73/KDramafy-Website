import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import axios from 'axios'
import {KDramaCard} from '../watchlist/KDramaCard2'

interface KDrama {
    Name: string;
    "Korean Name"?: string;
    "Release Year": number;
    "Age Rating"?: string;
    Duration?: string;
    Episodes: number;
    Seasons: number;
    Rating: number;
    "Number of Ratings": string;
    "Poster Link": string;
    Genres: string;
    Description: string;
    Stars?: string;
    "Streaming Services"?: string;
  }
  
  interface UserResponse {
    watchlist: Array<{
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        recommendations: KDrama[];
        watchlist: KDrama[];
    }>;
}

export const Watchlist = () => {
	const [watchlist, setWatchlist] = useState<KDrama[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null> (null)

    useEffect (() => {
        const fetchWatchlist = async () => {
            setLoading(true)
            setError(null)
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    throw new Error ("User not authenticated. Please log in.")
                }

                const response = await axios.get<UserResponse>("/watchlist", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                console.log("Watchlist response data:", response.data);

                const data = response.data.watchlist[0]?.watchlist || []
                setWatchlist(data)
            } catch (error: any) {
                console.error("Error fetching watchlist:", error)
                setError(error.response?.data?.error || "An error occurred while fetching watchlist")
            } finally {
                setLoading(false)
            }
        }
        fetchWatchlist()
    }, [])
  
  
    return (
        <div className="min-h-screen bg-[#081014] text-white pb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-8 text-center"
          >
            <h1 className="text-4xl font-bold">Your Watchlist</h1>
          </motion.div>
    
          {loading && <p className="text-center text-gray-300">Loading...</p>}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 text-center text-red-500"
            >
              {error}
            </motion.p>
          )}
    
          <div className="grid grid-cols-1 gap-6 px-8 md:grid-cols-2 lg:grid-cols-3">
            {watchlist.length > 0 ? (
              watchlist.map((kdrama, index) => (
                <KDramaCard key={index} kdrama={kdrama} />
              ))
            ) : (
              !loading &&
              !error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center col-span-full"
                >
                  Your watchlist is empty. Start adding your favorite K-Dramas!
                </motion.p>
              )
            )}
          </div>
        </div>
      );
    };

export default Watchlist
