import {Link, useNavigate, useLocation} from "react-router-dom"
import { useState, useEffect } from "react"

export const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    // check if user is authenticated
    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsAuthenticated(!!token) // if token exists, user is authenticated
    }, [])

    const handleSignOut = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        navigate("/")   
    }

    const isOnboardingPage = location.pathname === "/onboarding"
    
    return (
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#091217] lg:py-6">
            <div className="flex items-center">
                {/* Website name */}
                <Link to="/">
                    <span className="text-[29px] ml-2 font-montserrat text-white font-black px-4 py-4">
                        KDramafy
                    </span>
                </Link>
            </div>
            {/* Right elements */}
            <div className="flex text-right">
                {!isOnboardingPage && (
                    isAuthenticated ? (
                        <>
                            <Link to="/watchlist">
                                <button
                                    className="text-white rounded-xl font-medium font-montserrat border border-white px-4 py-2 mr-4 transition duration-300 ease-in-out transform hover:text-[#ffffff] hover:scale-110"
                                    style={{
                                        background: "linear-gradient(180deg, #e2e8ff00, #e2e8ff1f)",
                                        padding: "8px 16px",
                                    }}
                                >
                                    Watchlist
                                </button>   
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="text-white rounded-xl font-medium border font-montserrat border-white px-4 py-2 mr-5 transition duration-300 ease-in-out transform hover:text-[#ffffff] hover:scale-110"
                                style={{
                                    background: "linear-gradient(180deg, #e2e8ff00, #e2e8ff1f)",
                                    padding: "8px 16px",
                                }}
                            >
                                Sign Out
                            </button>
                            
                        </>
                        
                        
                    ) : (
                        <>
                            <Link to="/signup">
                                <button
                                    className="text-white rounded-xl font-medium font-montserrat border border-white px-4 py-2 mr-4 transition duration-300 ease-in-out transform hover:text-[#ffffff] hover:scale-110"
                                    style={{
                                        background: "linear-gradient(180deg, #e2e8ff00, #e2e8ff1f)",
                                        padding: "8px 16px",
                                    }}
                                >
                                    Sign Up
                                </button>
                            </Link>
                            <Link to="/login">
                                <button
                                    className="text-white rounded-xl font-medium border font-montserrat border-white px-4 py-2 mr-5 transition duration-300 ease-in-out transform hover:text-[#ffffff] hover:scale-110"
                                    style={{
                                        background: "linear-gradient(180deg, #e2e8ff00, #e2e8ff1f)",
                                        padding: "8px 16px",
                                    }}
                                >
                                    Login
                                </button>
                            </Link>
                        </>
                    )
                )}
            </div>
        </nav>
    );
};