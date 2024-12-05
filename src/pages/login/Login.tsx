import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision";

interface LoginResponse {
    access_token: string;
    error?: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = data;
        setIsLoading(true)

        try {
            const response = await axios.post<LoginResponse>("/login", { email, password });

            if (response.data.error) {
                toast.error(response.data.error);
                return;
            }

            const { access_token } = response.data;
            localStorage.setItem("token", access_token);
            setData({ email: "", password: "" });
            toast.success("Login successful! Redirecting...");
            navigate("/dashboard");
        } catch (error: any) {
            if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
            console.error("Login error:", error);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        // Add class to disable scrolling
        document.body.style.overflow = "hidden";

        return () => {
            // Remove class on unmount to re-enable scrolling
            document.body.style.overflow = "auto";
        };
    }, []);


    return (
        <BackgroundBeamsWithCollision>
            <div className="min-h-screen flex items-center justify-center bg-[#081014] text-white p-4">
                <div className="w-full max-w-lg space-y-8">
                    <div className="text-center">
                        <h1 className="mb-2 text-4xl font-bold tracking-tight">Welcome back to KDramafy!</h1>
            
                    </div>
                    <form onSubmit={loginUser} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="font-semibold text-white">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="johndoe@kdramafy.com"
                                    value={data.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[#1a1a1a] text-white h-11 rounded-lg px-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="font-semibold text-white">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={data.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[#1a1a1a] text-white h-11 rounded-lg px-4"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full h-12 text-lg font-medium text-black transition-colors bg-white rounded-lg hover:bg-gray-200"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <div className="text-center text-gray-300">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-white underline">
                            Sign up here!
                        </Link>
                    </div>
                </div>
            </div>
        </BackgroundBeamsWithCollision>
    );
};

export default Login;
