import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision";

interface RegisterResponse {
    error?: string;
    access_token?: string;
}

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        // Add class to disable scrolling
        document.body.style.overflow = "hidden";

        return () => {
            // Remove class on unmount to re-enable scrolling
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const {firstName, lastName, email, password} = data

        try {
            const response = await axios.post<RegisterResponse>("/signup", { firstName, lastName, email, password});


            if (response.data.error) {
                toast.error(response.data.error);
                return;
            }

            if (response.data.access_token) {
                localStorage.setItem("token", response.data.access_token);
            }

            toast.success("Account created! Redirecting to onboarding...");
            setData({ firstName: "", lastName: "", email: "", password: "" });
            navigate("/onboarding");
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error("Signup error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        
        <BackgroundBeamsWithCollision>
            <div className="min-h-screen min-w-full bg-[#081014] flex items-center justify-center text-white p-4">
                <div className="w-full max-w-lg space-y-8">
                    <div className="text-left ">
                        <h1 className="py-4 mt-16 text-3xl font-bold tracking-tight mb-162 ">
                            Create an account with KDramafy!
                        </h1>
                    </div>
                    <form onSubmit={registerUser} className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="font-semibold text-white">First Name</label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="John"
                                        value={data.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 text-white rounded-lg bg-zinc-800 h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="font-semibold text-white">Last Name</label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Doe"
                                        value={data.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 text-white rounded-lg bg-zinc-800 h-11"
                                    />
                                </div>
                            </div>
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
                                    className="w-full px-4 text-white rounded-lg bg-zinc-800 h-11"
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
                                    className="w-full px-4 text-white rounded-lg bg-zinc-800 h-11"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full h-12 text-lg font-medium text-black transition-colors bg-white rounded-lg hover:bg-gray-200"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>
                    <div className="text-center text-gray-300">
                        Already have an account?{" "}
                        <Link to="/login" className="text-white underline">
                            Log in here
                        </Link>
                    </div>
                </div>
            </div>
        </BackgroundBeamsWithCollision>
    );
};

export default SignUp;
