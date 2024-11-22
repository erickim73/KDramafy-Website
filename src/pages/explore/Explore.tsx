import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
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
    const [KDrama, setKDrama] = useState<KDrama | null> (null)
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const tkn = localStorage.getItem("jwt");
        if (tkn) {
            axios
                .post<User>('/profile', {}, { headers: { Authorization: `Bearer ${tkn}` } })
                .then(({ data }) => setUser(data))
                .catch((err) => {
                    console.error("Error fetching profile:", err.response?.data || err.message);
                    setError(err.response?.data?.error || "An error occurred");
                });
        } else {
            setError("No token found. Please log in.");
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
        <div className="bg-[#081014] min-h-screen text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
          </motion.div>
    
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center mb-4"
            >
              {error}
            </motion.p>
          )}
    
          {user ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white rounded-lg p-6 mb-6 bg-opacity-20 backdrop-filter backdrop-blur-lg mx-4"
            >
              <h1 className="text-4xl font-bold text-center mb-2">
                Hello {user.firstName}. Here are your recommendations.
              </h1>
            </motion.div>
          ) : (
            !error && <p className="text-center">Loading...</p>
          )}
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
            {recommendations.length > 0 ? (
              recommendations.map((kdrama, index) => <KDramaCard key={index} kdrama={kdrama} />)
            ) : (
              <p className="col-span-full text-center">No recommendations to display.</p>
            )}
          </div>
    
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/onboarding"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-block"
            >
              Go to Onboarding
            </Link>
          </motion.div>
        </div>
      );
}
