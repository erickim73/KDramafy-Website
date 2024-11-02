import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className = "bg-[#081014] min-h-screen flex flex-col items-center justify-center text-white p-4 relative">
            {/* button for slogan */}
            <button className="relative p-[2px] rounded-full bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b293d3] mb-10 -mt-32">
                <span className = "block bg-[#081014] rounded-full px-6 py-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b293d3] font-semibold">
                        Discover Your Perfect K-Drama Today
                    </span>
                </span>
            </button>

            {/* main message */}
            <div className = "text-6xl font-bold text-center font-montserrat space-y-6 mb-8 w-11/12 ">
                <div className = "text-gray-200">
                    KDramafy, a new destination
                </div>
                <div className = "bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b293d3] inline-block text-transparent bg-clip-text py-2">
                    for all K-Drama lovers
                </div>
            </div>
            
            {/* second message about KDramafy */}
            <div className = "text-lg text-center font-montserrat space-y-1 mb-6 text-gray-400">
                <div >
                    Discover Your Perfect K-Drama Match: Unlimited K-Drama
                </div>
                <div>
                     Recommendations, Custom Watchlists, and More
                </div>
            </div>

            {/* Get Started Button */}
            <div className = "font-montserrat rounded-xl font-medium px-4 py-2 mr-4 transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b293d3]">
                <Link to = "/signup">
                    <button>
                        Get Started
                    </button>
                </Link>
            </div>

            

        </div>
    )
}
