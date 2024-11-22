import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import {motion} from "framer-motion"

interface User {
    email: string;
    firstName: string;
    lastName: string;
}
interface KDrama{
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

interface RecommendationResponse{
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
        <div className = "bg-[#081014]">
            <h1>Explore Page</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user ? (
                <div className="text-white rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Hello {user.firstName}. Here are your recommendations.</h2>
                    {/* <p className="mb-2"><span className="font-medium">Email:</span> {user.email}</p>
                    <p className="mb-2"><span className="font-medium">First Name:</span> {user.firstName}</p>
                    <p className="mb-2"><span className="font-medium">Last Name:</span> {user.lastName}</p> */}
                </div>
            ) : (
                !error && <p>Loading...</p>
            )}
            
            <div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <h2>Recommended KDramas</h2>
                    <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-8 mr-8">
                {recommendations.length > 0 ? (
                recommendations.map((kdrama, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-xl overflow-hidden">
                                <img
                                    src={kdrama["Poster Link"]}
                                    alt={`${kdrama.Name} Poster`}
                                    className="w-full h-96 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{kdrama.Name} ({kdrama["Korean Name"]})</h3>
                                    <p className="text-sm mb-1">
                                    <span className="font-medium">Year:</span> {kdrama["Release Year"]}
                                    </p>
                                    <p className="text-sm mb-1">
                                    <span className="font-medium">Rating:</span> {kdrama.Rating} ⭐ ({kdrama["Number of Ratings"]})
                                    </p>
                                    <p className="text-sm mb-1">
                                    <span className="font-medium">Episodes:</span> {kdrama.Episodes}
                                    </p>
                                    <p className="text-sm mb-2">
                                    <span className="font-medium">Genres:</span> {kdrama.Genres}
                                    </p>
                                    <p className="text-sm line-clamp-3">{kdrama.Description}</p>
                                    <p className="text-sm mb-2 mt-2">
                                        <span className="font-medium">Streaming Services:</span> {kdrama["Streaming Services"]}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No recommendations to display.</p>
                    )}
                    </div>
                </div>
            </div>
            
            <div>
                <Link to = "/onboarding" className = "border m-5 border-black">
                    <button>
                        Onboarding
                    </button>
                </Link>
            </div>
        </div>
    )
}
