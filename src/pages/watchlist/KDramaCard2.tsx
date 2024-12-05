import { motion } from 'framer-motion';
import {useState} from "react"
import axios from "axios";


export interface KDrama{
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

const streamingPlatformData: Record<string, { logo: string }> = {
    Netflix: {
      logo: "https://m.media-amazon.com/images/M/9516b142-0c88-4475-a39b-97c06546cdc5._V1_UX1000_CR0,0,1000,563_.png",
    },
    "Tubi": {
      logo: "https://m.media-amazon.com/images/M/827c565d-983a-4f0e-8927-d107d1f30a56._V1_UX1000_CR0,0,1000,563_.png",
    },
    "The Roku Channel": {
      logo: "https://m.media-amazon.com/images/M/c85bfc80-aca5-440e-948b-e76bbe0eae50._V1_UX1000_CR0,0,1000,563_.png",
    },
    "Prime Video": {
        logo: "https://m.media-amazon.com/images/M/75f35a85-7a6e-4f1f-bf8b-e4c8556bc4e4._V1_UX1000_CR0,0,1000,563_.png",
    },
    Hulu: {
        logo: "https://m.media-amazon.com/images/M/67022a68-fde3-4078-8bd0-0ebc72efe8ad._V1_UX1000_CR0,0,1000,563_.png",
    },
    Freevee: {
        logo: "https://m.media-amazon.com/images/M/65662a3b-47eb-4271-9830-773014309b44._V1_UX1000_CR0,0,1000,563_.png",
    }
  };

  interface WatchlistResponse {
    kdrama_name: string
    error?: string
  }


export function KDramaCard({ kdrama }: { kdrama: KDrama }) {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [isClicked, setIsClicked] = useState(false)
    
    const handleRemoveFromWatchlist = async () => {
        setLoading(true)
        setMessage(null)
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                throw new Error("User not authenticated. Please log in.");
            }
            console.log("Sending request with token:", token);
            console.log("KDrama being removed:", kdrama);
            
            const response = await axios.request<WatchlistResponse>({
                url: "/watchlist",
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    kdrama_name: kdrama.Name,
                },
            });
            

            console.log("Response Status:", response.status);
            console.log("Response Data:", response.data);
              
            if (response.status === 200) {
                setIsClicked(!isClicked)
            } else {
                setMessage(response.data.error || "Failed to remove from Watchlist");
            }
            } catch (error: any) {
                console.error("Error occured while removing from Watchlist:", error);
                setMessage( error.response?.data?.error || "An error occurred while removing from Watchlist");
            } finally {
                setLoading(false);
            }
          };
  
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden transition duration-300 transform bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:scale-105"
        >
            <img
                src={kdrama["Poster Link"]}
                alt={`${kdrama.Name} Poster`}
                className="object-cover object-center w-full h-98"
            />
            <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">{kdrama.Name} ({kdrama["Korean Name"]})</h3>
            
                <p className="mb-1 text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Year:</span> {kdrama["Release Year"]}
                </p>
                <p className="mb-1 text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Rating:</span> {kdrama.Rating} ⭐ ({kdrama["Number of Ratings"]})
                </p>
                <p className="mb-1 text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Episodes:</span> {kdrama.Episodes}
                </p>
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Genres:</span> {kdrama.Genres}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{kdrama.Description}</p>

                {/* remove from watchlist button */}
                <button
                    onClick={handleRemoveFromWatchlist}
                    className={`px-4 py-2 mt-3 rounded text-white ${isClicked ? "bg-red-400" : "bg-blue-500"} transition-colors duration-300`}
                    disabled={loading}
                >
                    {loading ? "Processing..." : isClicked ? "Removed from Watchlist" : "Remove from Watchlist"}
                </button>

                {/* Display feedback message */}
                {message && (
                    <p className="mt-2 text-sm text-gray-800 dark:text-white">{message}</p>
                )}
                
                {/* Streaming Services */}
                {kdrama["Streaming Services"] && (
                    <div className="mt-4">
                    <span className="mb-2 text-sm font-semibold text-gray-800 dark:text-white">Watch on:</span>
                    <div className="flex flex-wrap gap-4 mt-2 justify-left">
                        {kdrama["Streaming Services"].split(", ").map((service, index) => {
                        const match = service.match(/Watch on (.+?) \((https?:\/\/.+?)\)/);
                        if (match) {
                            const platform = match[1]; // Extract platform name
                            const url = match[2]; // Extract URL
                            const platformData = streamingPlatformData[platform];

                            return (
                            <a
                                key={`${platform}-${index}`}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block ml-2"
                            >
                                {platformData ? (
                                    <div className = "relative w-16 mt-2 overflow-hidden transition-shadow duration-200 rounded-md shadow-md h-9 hover:shadow-lg">
                                        <img
                                        src={platformData.logo}
                                        alt={`${platform} logo`}
                                        className="w-auto h-10 transition-transform duration-200 hover:scale-110"
                                    />
                                    </div>
                                ) : (
                                <span className="inline-block px-2 py-1 text-xs text-gray-800 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-200">
                                    {platform}
                                </span>
                                )}
                            </a>
                            );
                        }
                        return null;
                        })}
                    </div>
                </div>
                )}
        </div>
        </motion.div>
  );
}
