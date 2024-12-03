import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

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
        <div className="min-h-screen flex items-center justify-center bg-[#081014] text-white p-4">
            <div className="w-full max-w-lg space-y-8">
                <div className="text-center"> 
                    <h1 className="mb-2 text-4xl font-bold tracking-tight">Join KDramafy!</h1>
                    <p className="text-lg text-gray-400">
                        Sign up for the world's first all-in-one K-Drama recommendation engine and portfolio tracker!
                    </p>
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
                                    className="w-full bg-[#1a1a1a] text-white h-11 rounded-lg px-4"
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
                                    className="w-full bg-[#1a1a1a] text-white h-11 rounded-lg px-4"
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
    );
};

export default SignUp;
