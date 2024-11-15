import React, {useState} from "react"

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

    const KDramaForm: React.FC = () => {
        const [formData, setFormData] = useState<KDramaPreferences>({
            minYear: "2010",
            maxYear: "2024",
            minEpisodes: "6",
            maxEpisodes: "100",
            minRating: "0.0",
            maxRating: "10.0",
            minNumRatings: "0",
            maxNumRatings: "1000000",
            genres: []
        })
        const [errors, setErrors] = useState<{[field: string]: string | null}>({})

        const possibleGenres = ["Romance", "History", "Fantasy", "Comedy", "Thriller", "Mystery", "Action", "Crime", "Sport", "Horror"]

        const updateField = (field: keyof KDramaPreferences, value: any) => {
            setFormData({...formData, [field]: value})
        }

        const handleYearChange = (field: "minYear" | "maxYear", value: string) => {
            const numericValue = value === "" || !isNaN(+value) ? value : formData[field]

            updateField(field, numericValue)
        }

        const handleEpisodeChange = (field: "minEpisodes" | "maxEpisodes", value: string) => {
            const numericValue = value === "" || !isNaN(+value) ? value: formData[field]

            updateField(field, numericValue)
        }

        const handleRatingChange = (field: "minRating" | "maxRating", value: string) => {
            const numericValue = value === "" || !isNaN(+value) ? value: formData[field]

            updateField(field, numericValue)
        }

        const handleNumRatingsChange = (field: "minNumRatings" | "maxNumRatings", value: string) => {
            const numericValue = value === "" || !isNaN(+value) ? value: formData[field]

            updateField(field, numericValue)
        }


        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()

            const minYear = +formData.minYear || 0
            const maxYear = +formData.maxYear || 0
            const minEpisodes = +formData.minEpisodes || 0
            const maxEpisodes = +formData.maxEpisodes || 0
            const minRating = +formData.minRating || 0
            const maxRating = +formData.maxRating || 0
            const minNumRatings = +formData.minNumRatings || 0
            const maxNumRatings = +formData.maxNumRatings || 0


            const newErrors: { [key: string]: string | null } = {}

            if (minYear > maxYear) {
                newErrors.year = "Minimum year should be less than the maximum year.";
            }

            if (minEpisodes > maxEpisodes) {
                newErrors.episodes = "Minimum episodes should be less than the maximum episodes.";
            }

            if (minRating > maxRating) {
                newErrors.rating = "Minimum rating should be less than the maximum rating.";
            }

            if (minNumRatings > maxNumRatings) {
                newErrors.numRatings = "Minimum number of ratings should be less than the maximum number of ratings.";
            }
            
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors)
                alert ("Please fix the errors before submitting")
                return                
            } 
            console.log("Submitting data", formData)
        }

        return (
        // release year, number of episodes, rating, number of ratings, genre preference
            <form onSubmit = {handleSubmit} className = "p-8 rounded-lg shadow-lg max-w-md mx-auto">
                {/* release year */}
                <div className = "mb-4">
                    <label className = "block font-semibold mb-2"> Release Year Range </label>
                    <div className = "flex space-x-2 text-black">
                        <input type = "text" value = {formData.minYear} onChange={(e) => handleYearChange("minYear", e.target.value)} className = "w-1/2 px-2 py-1 border rounded-lg"/>
                        <input type = "text" value = {formData.maxYear} onChange={(e) => handleYearChange("maxYear", e.target.value)} className = "w-1/2 px-2 py-1 border rounded-lg"/>
                    </div>
                    {errors.year && <p className = "text-red-500 text-sm">{errors.year}</p>}
                </div>

                {/* number of episodes */}
                <div className = "mb-4">
                    <label className = "block font-semibold mb-2"> Number of Episodes </label>
                    <div className = "flex space-x-2 text-black">
                        <input type = "text" value = {formData.minEpisodes} onChange={(e) => handleEpisodeChange("minEpisodes", e.target.value)} className = "w-1/2 px-2 py-1 border rounded-lg"/>
                        <input type = "text" value = {formData.maxEpisodes} onChange={(e) => handleEpisodeChange("maxEpisodes", e.target.value)} className = "w-1/2 px-2 py-1 border rounded-lg"/>
                    </div>
                    {errors.episodes && <p className = "text-red-500 text-sm">{errors.episodes}</p>}
                </div>

                {/* rating */}
                <div className = "mb-4">
                    <label className = "block font-semibold mb-2"> Rating </label>
                    <div className = "flex space-x-2 text-black">
                        <input type = "text" value = {formData.minRating} onChange={(e) => handleRatingChange("minRating", e.target.value)} className = "w-1/2 px-2 py-1 border rounded-lg"/>
                        <input type = "text" value = {formData.maxRating} onChange={(e) => handleRatingChange("maxRating", e.target.value)} className = "w-1/2 px-2 py-1 border rounded-lg"/>
                    </div>
                    {errors.rating && <p className = "text-red-500 text-sm">{errors.rating}</p>}
                </div>

                {/* number of ratings */}
                <div className = "mb-4">
                    <label className = "block font-semibold mb-2"> Number of Ratings </label>
                    <div className = "flex space-x-2 text-black">
                        <input type = "text" value = {formData.minNumRatings} onChange={(e) => handleNumRatingsChange("minNumRatings", e.target.value)} className = "w-1/2 px-2 py-1 border rounded-lg"/>
                        <input type = "text" value = {formData.maxNumRatings} onChange={(e) => handleNumRatingsChange("maxNumRatings", e.target.value)} className = "w-1/2 px-2 py-1 border rounded-lg"/>
                    </div>
                    {errors.numRatings && <p className = "text-red-500 text-sm">{errors.numRatings}</p>}
                </div>

                {/* submit button */}
                <button type = "submit" className = "content-center ml-36 font-montserrat rounded-xl font-medium px-5 py-3 mr-4 transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b293d3]">
                    Submit
                </button>
            </form>
        )
    }
    
    return (
        <div className = "bg-[#081014] min-h-screen flex flex-col items-center  text-white p-4 relative">
            <KDramaForm/>
        </div>
    )
}