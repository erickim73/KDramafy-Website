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
    }, [location])


    const handleSignOut = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        navigate("/")   
    }

    const isOnboardingPage = location.pathname === "/onboarding"
    const isSignupPage = location.pathname === "/signup"
    const isLoginPage = location.pathname === "/login"

    if (isOnboardingPage || isSignupPage || isLoginPage) {
        return null
    }
    
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between transition duration-300 ease-in-out w-full bg-[black] py-4 px-3 lg:px-6 lg:py-8">
            <div className="flex items-center justify-between">
                {/* Website name */}
                <Link to="/">
                    <span className="text-2xl md:text-[29px] font-montserrat text-white font-black">
                        KDramafy
                    </span>
                </Link>
            </div>
            {/* Right elements */}
            <div className="flex">
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard">
                            <button
                                className="text-white text-sm rounded-xl font-medium font-montserrat border border-white px-2 py-2 mr-3 ml-1 mt-2 transition duration-300 ease-in-out transform hover:text-[#ffffff] hover:scale-110 sm:px-1 md:px-1"
                                style={{
                                    background: "linear-gradient(180deg, #e2e8ff00, #e2e8ff1f)",
                                    padding: "8px 16px",
                                }}
                            >
                                Dashboard
                            </button>
                        </Link>
                        
                        <button
                            onClick={handleSignOut}
                            className="text-white text-sm rounded-xl font-medium border font-montserrat border-white px-2 py-2 mt-2 transition duration-300 ease-in-out transform hover:text-[#ffffff] hover:scale-110"
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
                                className="text-white rounded-xl font-medium font-montserrat border border-white px-4 py-2 mr-4 transition duration-300 ease-in-out transform hover:text-[#ffffff] hover:scale-110 sm:px-1 md:px-1"
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
                                className="text-white rounded-xl font-medium border font-montserrat border-white px-2 py-2 mr-5 transition duration-300 ease-in-out transform hover:text-[#ffffff] hover:scale-110 sm:px-1 md:px-1"
                                style={{
                                    background: "linear-gradient(180deg, #e2e8ff00, #e2e8ff1f)",
                                    padding: "8px 16px",
                                }}
                            >
                                Login
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};