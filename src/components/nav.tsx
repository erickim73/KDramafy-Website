import {Link} from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className = "relative flex w-full items-center justify-between bg-[#0f1d21] lg:py-6">
            <div className = "flex items-center">
                {/* Website name */}
                <Link to = "/"> 
                    <span className = "text-[27px] ml-2 font-montserrat text-white font-extrabold px-4 py-4">
                        KDramafy
                    </span> 
                </Link>
            </div>
            {/* Right elements */}
            <div className = "flex text-right">
                    <Link to = "/signup"> 
                        <button 
                            className = "text-white rounded-xl font-medium font-montserrat border border-white px-4 py-2 mr-4 transition duration-300 ease-in-out transform hover:text-[#ffffff] hover:scale-105"
                            style = {{
                                background: "linear-gradient(180deg, #e2e8ff00, #e2e8ff1f)", 
                                padding: "8px 16px"
                            }}
                        >
                            Sign Up
                        </button>
                    </Link>
                    <Link to = "/login"> 
                        <button 
                            className = "text-white rounded-xl font-medium border font-montserrat border-white px-4 py-2 mr-5 transition duration-300 ease-in-out transform hover:text-[#ffffff] hover:scale-105"
                            style = {{
                                background: "linear-gradient(180deg, #e2e8ff00, #e2e8ff1f)", 
                                padding: "8px 16px"
                            }}    
                        >
                            Login
                        </button>
                    </Link>    
                </div>
        </nav>
    )
}