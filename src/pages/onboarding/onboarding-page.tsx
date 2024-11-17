import React from "react"
import {useForm} from "react-hook-form"
import {Card, CardBody, CardFooter, Typography, Button} from "@material-tailwind/react";

export const Onboarding = () => {
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
            Classics: {minYear: "2010", maxYear: "2015"},
            Current: {minYear: "2016", maxYear: "2021"},
            Fresh: {minYear: "2022", maxYear: "2024"},
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
            hidden_gem: {minNumRatings: "0", maxNumRatings: "2000"},
            Average: {minNumRatings: "2000", maxNumRatings: "5000"},
            Popular: {minNumRatings: "5000", maxNumRatings: "575000"},
        },
    }

    const possibleGenres = ["Romance", "History", "Fantasy", "Comedy", "Thriller", "Mystery", "Action", "Crime", "Sport", "Horror"]

    const onSubmit = (data: KDramaPreferences) => {
        console.log("Submitting the data:", data)
    }

    const minYear = watch("minYear")
    const maxYear = watch("maxYear")
    const minEpisodes = watch("minEpisodes")
    const maxEpisodes = watch("maxEpisodes")
    const minRating = watch("minRating")
    const maxRating = watch("maxRating")
    const minNumRatings = watch("minNumRatings")
    const maxNumRatings = watch("maxNumRatings")
    const selectedGenres = watch("genres") || []

    const toggleGenre = (genre: string) => {
        const updatedGenres = selectedGenres.includes(genre) ? selectedGenres.filter((g) => g !== genre) : [...selectedGenres, genre].slice(0, 3)
        setValue("genres", updatedGenres)
    }
    

    return (
    // release year, number of episodes, rating, number of ratings, genre preference
        <div className = "bg-[#081014] min-h-screen flex flex-col items-center justify-center text-white p-4 relative">
            <form onSubmit = {handleSubmit(onSubmit)} className = "p-8 rounded-lg shadow-lg max-w-md mx-auto">
                {/* release year */}
                <div className = "mb-4">
                    <label className = "block font-semibold mb-2"> Release Year Range </label>
                    {/* input for release year */}
                    <div className = "flex space-x-2 text-black">
                        <input type = "text" {...register("minYear", {required: "Minimum Year is Required", validate: (value) => parseInt(value) <= parseInt(maxYear) || "Minimum Year must be less than or equal to Maximum Year"})} className = "w-1/2 px-2 py-1 border rounded-lg"/>
                        <input type = "text" {...register("maxYear", {required: "Maximum Year is Required"})} className = "w-1/2 px-2 py-1 border rounded-lg"/>
                    </div>

                    {/* error messages for release year */}
                    {errors.minYear && (<p className="text-red-500 text-sm">{errors.minYear.message}</p>)}
                    {errors.maxYear && (<p className="text-red-500 text-sm">{errors.maxYear.message}</p>)}
                </div>

                {/* number of episodes */}
                <div className = "mb-4">
                    <label className = "block font-semibold mb-2"> Number of Episodes </label>
                    <div className = "flex space-x-2 text-black">
                        <input type = "text" {...register("minEpisodes", {required: "Minimum Number of Episodes is Required", validate: (value) => parseInt(value) <= parseInt(maxEpisodes) || "Minimum Number of Episodes must be less than or equal to Maximum Number of Episodes"})}className = "w-1/2 px-2 py-1 border rounded-lg"/>
                        <input type = "text" {...register("maxEpisodes", {required: "Maximum Number of Episodes is Required"})}className = "w-1/2 px-2 py-1 border rounded-lg"/>
                    </div>
                    {errors.minEpisodes && (<p className="text-red-500 text-sm">{errors.minEpisodes.message}</p>)}
                    {errors.maxEpisodes && (<p className="text-red-500 text-sm">{errors.maxEpisodes.message}</p>)}
                </div>

                {/* rating */}
                <div className = "mb-4">
                    <label className = "block font-semibold mb-2"> Rating </label>
                    <div className = "flex space-x-2 text-black">
                        <input type = "text" {...register("minRating", {required: "Minimum Rating is Required", validate: (value) => parseInt(value) <= parseInt(maxRating) || "Minimum Rating must be less than or equal to Maximum Rating"})}className = "w-1/2 px-2 py-1 border rounded-lg"/>
                        <input type = "text" {...register("maxRating", {required: "Maximum Rating is Required"})}className = "w-1/2 px-2 py-1 border rounded-lg"/>
                    </div>
                    {errors.minRating && (<p className="text-red-500 text-sm">{errors.minRating.message}</p>)}
                    {errors.maxRating && (<p className="text-red-500 text-sm">{errors.maxRating.message}</p>)}
                </div>

                {/* number of ratings */}
                <div className = "mb-4">
                    <label className = "block font-semibold mb-2"> Number of Ratings </label>
                    <div className = "flex space-x-2 text-black">
                        <input type = "text" {...register("minNumRatings", {required: "Minimum Number of Ratings is Required", validate: (value) => parseInt(value) <= parseInt(maxNumRatings) || "Minimum Number of Ratings must be less than or equal to Maximum Number of Ratings"})}className = "w-1/2 px-2 py-1 border rounded-lg"/>
                        <input type = "text" {...register("maxNumRatings", {required: "Maximum Number of Ratings is Required"})}className = "w-1/2 px-2 py-1 border rounded-lg"/>
                    </div>
                    {errors.minNumRatings && (<p className="text-red-500 text-sm">{errors.minNumRatings.message}</p>)}
                    {errors.maxNumRatings && (<p className="text-red-500 text-sm">{errors.maxNumRatings.message}</p>)}
                </div>

                {/* submit button */}
                <button type = "submit" className = "content-center ml-36 font-montserrat rounded-xl font-medium px-5 py-3 mr-4 transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b293d3]">
                    Submit
                </button>
            </form>
        </div>
    )
}