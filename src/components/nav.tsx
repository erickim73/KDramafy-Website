import {Link} from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className = "sticky top-0 z-50 flex w-full items-center justify-between bg-[#091217] lg:py-6">
            <div className = "flex items-center">
                {/* Website name */}
                <Link to = "/"> 
                    <span className = "text-[29px] ml-2 font-montserrat text-white font-black px-4 py-4">
                        KDramafy
                    </span> 
                </Link>
            </div>
            {/* Right elements */}
            <div className = "flex text-right">
                    <Link to = "/signup"> 
                        <button 
                            className = "text-white rounded-xl font-medium font-montserrat border border-white px-4 py-2 mr-4 transition duration-300 ease-in-out transform hover:text-[#ffffff] hover:scale-110"
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
                            className = "text-white rounded-xl font-medium border font-montserrat border-white px-4 py-2 mr-5 transition duration-300 ease-in-out transform hover:text-[#ffffff] hover:scale-110"
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