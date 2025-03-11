import React, { useState } from "react"
import {useForm} from "react-hook-form"
import { motion } from "framer-motion"
import axios from "axios"
import { TracingBeam } from "../../components/ui/tracing-beam";

interface KDramaPreferences {
    minYear: string;
    maxYear: string;
    minEpisodes: string;
    maxEpisodes: string;
    minNumRatings: string;
    maxNumRatings: string
    genres: string[];
}

interface RecommendationsResponse {
    recommendations: any[]
}

export const Onboarding = () => {
    const [loading, setLoading] = useState(false)
    
    

    const {register, handleSubmit, watch, setValue} = useForm<KDramaPreferences>({
        defaultValues: {
            minYear: "2020",
            maxYear: "2024",
            minEpisodes: "12",
            maxEpisodes: "20",
            minNumRatings: "5000",
            maxNumRatings: "600000",
            genres: []
        }
    })

    const predefinedCategories = {
        releaseYear: {
            "Classic (2010-2015)": {minYear: "2010", maxYear: "2015"},
            "Current (2015-2022)": {minYear: "2015", maxYear: "2022"},
            "New (2022-2024)": {minYear: "2022", maxYear: "2024"},
            "Select All (2010-2024)": {minYear: "2010", maxYear: "2024"}
        },
        episodes: {
            "Short (6-12)": {minEpisodes: "6", maxEpisodes: "12"},
            "Medium (12-20)": {minEpisodes: "12", maxEpisodes: "20"},
            "Long (20-100)": {minEpisodes: "20", maxEpisodes: "100"},
            "Select All (6-100)": {minEpisodes: "6", maxEpisodes: "100"}
        },
        numRatings: {
            "Unknown (0-2,000)": {minNumRatings: "0", maxNumRatings: "2000"},
            "Average (2,000-5,000)": {minNumRatings: "2000", maxNumRatings: "5000"},
            "Popular (5,000-600,000)": {minNumRatings: "5000", maxNumRatings: "600000"},
            "Select All (0-600,000)": {minNumRatings: "0", maxNumRatings: "600000"}
        },
    }

    const possibleGenres = ["Action", "Comedy", "Fantasy", "History", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"]

 

    const [selectedCards, setSelectedCards] = useState<Record<string, string[]>>({
        releaseYear: [],
        episodes: [],
        numRatings: []
    })

    const onSubmit = async (data: KDramaPreferences) => {
        console.log("Submitting Data: ", data)

        const transformedData = {
            ...data,
            minYear: parseInt(data.minYear),
            maxYear: parseInt(data.maxYear),
            minEpisodes: parseInt(data.minEpisodes),
            maxEpisodes: parseInt(data.maxEpisodes),
            minNumRatings: parseInt(data.minNumRatings),
            maxNumRatings: parseInt(data.maxNumRatings),
        };

        const access_token = localStorage.getItem('token')
        if (!access_token) {
            alert("You must be logged in to get recommendations.")
            return
        }

        setLoading(true)
        
        try {   
            const response = await axios.post<RecommendationsResponse>(
                "https://kdramafyy-753476690747.us-central1.run.app/recommend", 
                transformedData , 
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    }
                }
            );

            console.log("Recommendations received: ", response.data)

            if (response.data.recommendations) {
                localStorage.setItem("recommendations", JSON.stringify(response.data.recommendations));
                window.location.href = "/explore";
            } else {
                console.log("No Recommendations Found")
            }
        } catch (error) {
            console.error("Error while getting recommendations: ", error)
            alert("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const toggleCard = (category: string, card: string, values: Record<string, string>) => {
        setSelectedCards((prev) => {
            const isSelected = prev[category]?.includes(card);

            if (isSelected) {
                // If already selected, unselect it by clearing the category
                return { ...prev, [category]: [] };
            } else {
                // If not selected, replace any existing selection with the new one
                return { ...prev, [category]: [card] };
            }
        });

        // Update form values with the selected card's values
        Object.entries(values).forEach(([key, value]) => {
            setValue(key as keyof KDramaPreferences, value, { shouldValidate: true });
        });
        
    };

    return (
    // release year, number of episodes, rating, number of ratings, genre preference
        <div className = "bg-[black] min-h-screen flex flex-col items-center justify-center text-white p-4 relative mb-16">
            <TracingBeam>
                <form onSubmit = {handleSubmit(onSubmit)} className = "bg-[black] w-full max-w-xl p-8 sm:p-8 mx-auto shadow-2xl rounded-2xl ">
                    <h1 className="mb-8 text-3xl font-bold text-center">K-Drama Preferences</h1>
                    {/* Release Year Range */}
                    <div className="mb-8">
                        <label className="block mb-2 text-xl font-semibold">Release Year Range</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.entries(predefinedCategories.releaseYear).map(([card, values]) => {
                            const [category, range] = card.split(' (');
                            const isStarred = card.includes("New");
                            return (
                                <motion.button
                                type="button"
                                key={card}
                                onClick={() => toggleCard("releaseYear", card, values)}
                                className={`w-full sm:w-auto px-[26px] py-2.5 rounded-lg ${
                                    selectedCards.releaseYear.includes(card)
                                    ? "bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b386e4] text-white"
                                    : "bg-gray-700 text-gray-200"
                                } relative transition-all duration-200 ease-in-out text-sm flex flex-col items-center justify-center min-w-[100px]`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                >
                                    {/* Star on top-right corner */}
                                    {isStarred && (
                                        <span className="absolute z-10 text-xs font-bold text-yellow-400 top-1 right-1">
                                            ⭐
                                        </span>
                                    )}
                                    <span className="font-semibold">{category}</span>
                                    <span className="text-xs">({range}</span>
                                </motion.button>
                            );
                            })}
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex flex-col w-1/2">
                            <label className="mb-1 text-sm">Min Year</label>
                            <input
                                type="text"
                                {...register("minYear", {
                                required: "Required",
                                validate: (value) =>
                                    parseInt(value) <= parseInt(watch("maxYear"))
                                })}
                                className="px-3 py-2 text-white bg-gray-700 rounded-lg"
                            />
                            </div>
                            <div className="flex flex-col w-1/2">
                            <label className="mb-1 text-sm">Max Year</label>
                            <input
                                type="text"
                                {...register("maxYear", { required: "Required" })}
                                className="px-3 py-2 text-white bg-gray-700 rounded-lg"
                            />
                            </div>
                        </div>
                        
                    </div>
                    {/* Number of Episodes */}
                    <div className="mb-8">
                    <label className="block mb-2 text-xl font-semibold">Number of Episodes</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(predefinedCategories.episodes).map(([card, values]) => {
                        const [categoryName, range] = card.split(' (');
                        const isStarred = card.includes("Medium");
                        return (
                            <motion.button
                            type="button"
                            key={card}
                            onClick={() => toggleCard('episodes', card, values)}
                            className={`w-full sm:w-auto px-[35px] py-2.5 rounded-lg ${
                                selectedCards.episodes.includes(card)
                                ? "bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b386e4] text-white"
                                : "bg-gray-700 text-gray-200"
                            } relative transition-all duration-200 ease-in-out text-sm flex flex-col items-center justify-center min-w-[100px]`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            >
                                {/* Star on top-right corner */}
                                {isStarred && (
                                    <span className="absolute text-xs font-bold text-yellow-400 top-1 right-1">
                                        ⭐
                                    </span>
                                )}
                                <span className="font-semibold">{categoryName}</span>
                                <span className="text-xs">({range}</span>
                            </motion.button>
                        );
                        })}
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex flex-col w-1/2">
                        <label className="mb-1 text-sm">Min Episodes</label>
                        <input
                            type="text"
                            {...register("minEpisodes", {
                            required: "Required",
                            validate: (value) =>
                                parseInt(value) <= parseInt(watch("maxEpisodes")) ||
                                "Min Year Must be Less than from Max Year",
                            })}
                            className="px-3 py-2 text-white bg-gray-700 rounded-lg"
                        />
                        </div>
                        <div className="flex flex-col w-1/2">
                        <label className="mb-1 text-sm">Max Episodes</label>
                        <input
                            type="text"
                            {...register("maxEpisodes", { required: "Required" })}
                            className="px-3 py-2 text-white bg-gray-700 rounded-lg"
                        />
                        </div>
                    </div>
                    </div>
                    {/* Number of Ratings */}
                    <div className="mb-8">
                    <label className="block mb-2 text-xl font-semibold">Number of Ratings</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(predefinedCategories.numRatings).map(([card, values]) => {
                        const [categoryName, range] = card.split(' (');
                        const isStarred = card.includes("Popular");
                        return (
                            <motion.button
                            type="button"
                            key={card}
                            onClick={() => toggleCard('numRatings', card, values)}
                            className={`w-full sm:w-auto px-[22px] py-2.5 rounded-lg ${
                                selectedCards.numRatings.includes(card)
                                ? "bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b386e4] text-white"
                                : "bg-gray-700 text-gray-200"
                            } relative transition-all duration-200 ease-in-out text-sm flex flex-col items-center justify-center min-w-[100px]`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            >
                                {/* Star on top-right corner */}
                                {isStarred && (
                                    <span className="absolute text-xs font-bold text-yellow-400 top-1 right-1">
                                        ⭐
                                    </span>
                                )}
                                <span className="font-semibold">{categoryName}</span>
                                <span className="text-xs">({range}</span>
                            </motion.button>
                        );
                        })}
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex flex-col w-1/2">
                        <label className="mb-1 text-sm">Min Ratings</label>
                        <input
                            type="text"
                            {...register("minNumRatings", {
                            required: "Required",
                            validate: (value) =>
                                parseInt(value) <= parseInt(watch("maxNumRatings")) ||
                                "Min Year Must be Less than from Max Year",
                            })}
                            className="px-3 py-2 text-white bg-gray-700 rounded-lg"
                        />
                        </div>
                        <div className="flex flex-col w-1/2">
                        <label className="mb-1 text-sm">Max Ratings</label>
                        <input
                            type="text"
                            {...register("maxNumRatings", { required: "Required" })}
                            className="px-3 py-2 text-white bg-gray-700 rounded-lg"
                        />
                        </div>
                    </div>
                    </div>
                    {/* Genres */}
                    <div className="mb-8">
                        <label className="block mb-2 text-xl font-semibold ">Genres (Select up to 3)</label>
                        <div className="grid grid-cols-3 gap-4">
                            {possibleGenres.map((genre) => (
                            <motion.div
                                key={genre}
                                className={`cursor-pointer rounded-lg px-4 py-4 text-center h-16 flex items-center justify-center transition-all duration-100 ease-in-out font-semibold ${
                                watch("genres").includes(genre)
                                    ? "bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b386e4] text-white"
                                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                }`}
                                onClick={() => {
                                    const currentGenres = watch("genres");
                                    if (currentGenres.includes(genre)) {
                                        setValue(
                                            "genres",
                                            currentGenres.filter((g) => g !== genre)
                                        );
                                    } else if (currentGenres.length < 3) {
                                        setValue("genres", [...currentGenres, genre]);
                                    }
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {genre}
                            </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="flex justify-center mb-16">
                        <motion.button
                            type="submit"
                            className={`px-8 py-3 font-bold text-white shadow-lg rounded-xl transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b386e4] flex items-center justify-center ${
                                loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={loading}
                        >
                            {loading ? (
                                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                                ) : (
                                    "Get Recommendations"
                            )}
                        </motion.button>
                    </div>
                
                </form>
            </TracingBeam>
        </div>
        
        )
    }

