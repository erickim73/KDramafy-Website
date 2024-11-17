import React, { useState } from "react"
import {useForm} from "react-hook-form"
import { motion } from "framer-motion"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"


interface KDramaPreferences {
    minYear: string;
    maxYear: string;
    minEpisodes: string;
    maxEpisodes: string;
    minRating: string;
    maxRating: string;
    minNumRatings: string;
    maxNumRatings: string
    genres: string[];
}

export const Onboarding = () => {
    

    const {register, handleSubmit, watch, setValue, formState: {errors}} = useForm<KDramaPreferences>({
        defaultValues: {
            minYear: "2010",
            maxYear: "2024",
            minEpisodes: "6",
            maxEpisodes: "100",
            minRating: "0.0",
            maxRating: "10.0",
            minNumRatings: "0",
            maxNumRatings: "1000000",
            genres: []
        }
    })

    const predefinedCategories = {
        releaseYear: {
            Classic: {minYear: "2010", maxYear: "2015"},
            Current: {minYear: "2015", maxYear: "2022"},
            New: {minYear: "2022", maxYear: "2024"},
        },
        episodes: {
            Short: {minEpisodes: "6", maxEpisodes: "12"},
            Medium: {minEpisodes: "12", maxEpisodes: "20"},
            Long: {minEpisodes: "20", maxEpisodes: "100"},
        },
        rating: {
            Medium: {minRating: "7.0", maxRating: "8.0"},
            High: {minRating: "8.0", maxRating: "10.0"},
        },
        numRatings: {
            Unknown: {minNumRatings: "0", maxNumRatings: "2000"},
            Average: {minNumRatings: "2000", maxNumRatings: "5000"},
            Popular: {minNumRatings: "5000", maxNumRatings: "575000"},
        },
    }

    const possibleGenres = ["Romance", "History", "Fantasy", "Comedy", "Thriller", "Mystery", "Action", "Crime", "Sport", "Horror"]

    const onSubmit = (data: KDramaPreferences) => {
        console.log("Submitting the data:", data)
    }

    const maxYear = watch("maxYear")
    const maxEpisodes = watch("maxEpisodes")
    const maxRating = watch("maxRating")
    const maxNumRatings = watch("maxNumRatings")

    const [selectedCards, setSelectedCards] = useState<Record<string, string[]>>({
        releaseYear: [],
        episodes: [],
        rating: [],
        numRatings: []
      })

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
        <div className = "bg-[#081014] min-h-screen flex flex-col items-center justify-center text-white p-4 relative">
            <form onSubmit = {handleSubmit(onSubmit)} className = "p-8 rounded-lg shadow-lg max-w-md mx-auto">
                {/* release year */}
                <div className = "mb-8">
                    <label className = "block font-semibold mb-2 text-xl"> Release Year Range </label>
                    {/* cards for release year */}
                    <div key="releaseYear" className="mb-4">
                        <div className="flex flex-wrap gap-2">
                        {Object.entries(predefinedCategories.releaseYear).map(([card, values]) => (
                            <motion.button
                                type="button"
                                key={card}
                                onClick={() => toggleCard("releaseYear", card, values)}
                                className={`px-4 py-2 rounded-lg ${selectedCards.releaseYear.includes(card) ? "bg-[#6a5acd]" : "bg-gray-700"} transition-transform transform`}
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.95 }} 
                            >
                                {card}
                            </motion.button>
                            ))}
                        </div>
                    </div>
                    {/* input for release year */}
                    <div className="flex space-x-4 text-black">
                        <div className="flex flex-col w-1/2">
                            <label className="text-white mb-1">Min Release Year</label>
                            <input
                                type="text"
                                {...register("minYear", {
                                    required: "Minimum Year is Required",
                                    validate: (value) =>
                                        parseInt(value) <= parseInt(watch("maxYear")) ||
                                        "Minimum Year must be less than or equal to Maximum Year",
                                })}
                                className="px-2 py-1 border rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-white mb-1">Max Release Year</label>
                            <input
                                type="text"
                                {...register("maxYear", {
                                    required: "Maximum Year is Required",
                                })}
                                className="px-2 py-1 border rounded-lg"
                            />
                        </div>
                    </div>

                    {/* error messages for release year */}
                    {errors.minYear && (<p className="text-red-500 text-sm">{errors.minYear.message}</p>)}
                    {errors.maxYear && (<p className="text-red-500 text-sm">{errors.maxYear.message}</p>)}
                </div>


                {/* number of episodes */}
                <div className = "mb-8">
                    <label className = "block font-semibold mb-2 text-xl"> Number of Episodes </label>
                    {/* cards for number of episodes */}
                    <div key="episodes" className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(predefinedCategories.episodes).map(([card, values]) => (
                                <motion.button
                                    type="button"
                                    key={card}
                                    onClick={() => toggleCard('episodes', card, values)}
                                    className={`px-4 py-2 rounded-lg ${selectedCards.episodes.includes(card) ? "bg-[#6a5acd]" : "bg-gray-700"} transition-transform transform hover:scale-105`}
                                    whileHover={{ scale: 1.1 }} 
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {card}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* input for number of episodes */}
                    <div className="flex space-x-4 text-black">
                        <div className="flex flex-col w-1/2">
                            <label className="text-white mb-1">Min Number of Episodes</label>
                            <input
                                type="text"
                                {...register("minEpisodes", {
                                    required: "Minimum Number of Episodes is Required",
                                    validate: (value) =>
                                        parseInt(value) <= parseInt(watch("maxEpisodes")) ||
                                        "Minimum Number of Episodes must be less than or equal to Maximum Number of Episodes",
                                })}
                                className="px-2 py-1 border rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-white mb-1">Max Number of Episodes</label>
                            <input
                                type="text"
                                {...register("maxEpisodes", {
                                    required: "Maximum Number of Episodes is Required",
                                })}
                                className="px-2 py-1 border rounded-lg"
                            />
                        </div>
                    </div>

                    {errors.minEpisodes && (<p className="text-red-500 text-sm">{errors.minEpisodes.message}</p>)}
                    {errors.maxEpisodes && (<p className="text-red-500 text-sm">{errors.maxEpisodes.message}</p>)}
                </div>


                {/* rating */}
                <div className = "mb-8">
                    <label className = "block font-semibold mb-2 text-xl"> Rating </label>
                    {/* cards for rating */}
                    <div key="rating" className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(predefinedCategories.rating).map(([card, values]) => (
                                <motion.button
                                    type="button"
                                    key={card}
                                    onClick={() => toggleCard('rating', card, values)}
                                    className={`px-4 py-2 rounded-lg ${selectedCards.rating.includes(card) ? "bg-[#6a5acd]" : "bg-gray-700"} transition-transform transform hover:scale-105`}
                                    whileHover={{ scale: 1.1 }} 
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {card}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                    {/* input for rating */}
                    <div className="flex space-x-4 text-black">
                        <div className="flex flex-col w-1/2">
                            <label className="text-white mb-1">Min Rating</label>
                            <input
                                type="text"
                                {...register("minRating", {
                                    required: "Minimum Rating is Required",
                                    validate: (value) =>
                                        parseInt(value) <= parseInt(watch("maxRating")) ||
                                        "Minimum Rating must be less than or equal to Maximum Rating",
                                })}
                                className="px-2 py-1 border rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-white mb-1">Max Rating</label>
                            <input
                                type="text"
                                {...register("maxRating", {
                                    required: "Maximum Number of Episodes is Required",
                                })}
                                className="px-2 py-1 border rounded-lg"
                            />
                        </div>
                    </div>
                    {errors.minRating && (<p className="text-red-500 text-sm">{errors.minRating.message}</p>)}
                    {errors.maxRating && (<p className="text-red-500 text-sm">{errors.maxRating.message}</p>)}
                </div>


                {/* number of ratings */}
                <div className = "mb-8">
                    <label className = "block font-semibold mb-2 text-xl"> Number of Ratings </label>
                    {/* cards for number of ratings */}
                    <div key="numRatings" className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(predefinedCategories.numRatings).map(([card, values]) => (
                                <motion.button
                                    type="button"
                                    key={card}
                                    onClick={() => toggleCard('numRatings', card, values)}
                                    className={`px-4 py-2 rounded-lg ${selectedCards.numRatings.includes(card) ? "bg-[#6a5acd]" : "bg-gray-700"} transition-transform transform hover:scale-105`}
                                    whileHover={{ scale: 1.1 }} 
                                    whileTap={{ scale: 0.95 }}
                            >
                                    {card}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                    {/* input for number of ratings */}
                    <div className="flex space-x-4 text-black">
                        <div className="flex flex-col w-1/2">
                            <label className="text-white mb-1">Min Number of Ratings</label>
                            <input
                                type="text"
                                {...register("minNumRatings", {
                                    required: "Min Number of Ratings is Required",
                                    validate: (value) =>
                                        parseInt(value) <= parseInt(watch("maxRating")) ||
                                        "Minimum Number of Ratings must be less than or equal to Maximum Number of Ratings",
                                })}
                                className="px-2 py-1 border rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-white mb-1">Max Number of Ratings</label>
                            <input
                                type="text"
                                {...register("maxNumRatings", {
                                    required: "Maximum Number of Ratings is Required",
                                })}
                                className="px-2 py-1 border rounded-lg"
                            />
                        </div>
                    </div>
                    {errors.minNumRatings && (<p className="text-red-500 text-sm">{errors.minNumRatings.message}</p>)}
                    {errors.maxNumRatings && (<p className="text-red-500 text-sm">{errors.maxNumRatings.message}</p>)}
                </div>

                {/* genres */}
                <div className="mb-8">
                    <label className="block font-semibold mb-2 text-xl">Genres (Select up to 3)</label>
                    <div className="flex flex-wrap gap-2">
                        {possibleGenres.map((genre) => (
                            <motion.div
                                key={genre}
                                className={`cursor-pointer rounded-lg px-4 py-2 transition-transform transform ${
                                    watch("genres").includes(genre)
                                        ? "bg-[#6a5acd] text-white scale-105"
                                        : "bg-gray-700 text-white hover:scale-105"
                                }`}
                                onClick={() => {
                                    const currentGenres = watch("genres");
                                    if (currentGenres.includes(genre)) {
                                        // If already selected, remove from the list
                                        setValue(
                                            "genres",
                                            currentGenres.filter((g) => g !== genre)
                                        );
                                    } else if (currentGenres.length < 3) {
                                        // Add to the list only if less than 3 are selected
                                        setValue("genres", [...currentGenres, genre]);
                                    }
                                }}
                            >
                                {genre}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* submit button */}
                <button type = "submit" className = "content-center ml-36 font-montserrat rounded-xl font-medium px-5 py-3 mr-4 transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b293d3]">
                    Submit
                </button>
            </form>
        </div>
    )
}