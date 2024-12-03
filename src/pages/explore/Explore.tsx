import { useState, useEffect } from "react";
import axios from "axios";
import {motion} from "framer-motion"
import { KDramaCard } from "./KDramaCard";

interface User {
    email: string;
    firstName: string;
    lastName: string;
}
export interface KDrama{
    name: string;
    koreanName?: string;
    releaseYear: number;
    ageRating?: string;
    duration?: string;
    episodes: number;
    seasons: number;
    rating: number;
    numberOfRatings: string;
    posterLink: string;
    trailerLink?: string;
    genres: string;
    description: string;
    stars?: string;
    streamingServices?: string;
}

export interface RecommendationResponse{
    recommendations:KDrama[]
}


export const Explore = () => {
    const [user, setUser] = useState<User | null>(null);
    const [recommendations, setRecommendations] = useState<any[]>([]);
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
    

    useEffect(() => {
        const savedRecommendations = localStorage.getItem("recommendations");
        if (savedRecommendations) {
            try {
                const parsedRecommendations = JSON.parse(savedRecommendations);
                console.log("Parsed Recommendations:", parsedRecommendations);
                setRecommendations(parsedRecommendations);
                setError(null);
            } catch (err) {
                console.error("Error parsing recommendations:", err);
                setError("Failed to load recommendations.");
            }
        } else {
            setError("No recommendations found. Please complete the onboarding process.");
        }
    }, []);
    
    

    return (
        <div className="bg-[#081014] min-h-screen text-white scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-8 text-center"
          >
          </motion.div>
    
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 text-center text-red-500"
            >
              {error}
            </motion.p>
          )}
    
          {user ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 mx-4 mb-6 text-white rounded-lg bg-opacity-20 backdrop-filter backdrop-blur-lg"
            >
              <h1 className="mb-2 text-4xl font-bold text-center">
                Hello {user.firstName}. Here are your recommendations.
              </h1>
            </motion.div>
          ) : (
            !error && <p className="text-center">Loading...</p>
          )}
    
          <div className="grid grid-cols-1 gap-6 px-8 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.length > 0 ? (
              recommendations.map((kdrama, index) => <KDramaCard key={index} kdrama={kdrama} />)
            ) : (
              <p className="text-center col-span-full">No recommendations to display.</p>
            )}
          </div>
        </div>
      );
}