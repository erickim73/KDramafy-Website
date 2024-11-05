import {Link} from "react-router-dom"

export const GetStartedButton = () => {
    return (
        <div className = "font-montserrat rounded-xl font-medium px-5 py-3 mr-4 transition duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b293d3]">
            <Link to = "/signup">
                <button>
                    Get Started
                </button>
            </Link>
        </div>
    )
}