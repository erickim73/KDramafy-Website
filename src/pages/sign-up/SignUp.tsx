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
        <div className="flex items-center justify-center min-h-screen p-4 bg-[black] text-white">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center ">
                    <h1 className="text-3xl font-bold ">
                        Create an account with KDramafy!
                    </h1>
                </div>
                <form onSubmit={registerUser} className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
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
                        className="w-full text-base font-medium text-black transition-colors bg-white h-11 sm:text-lg hover:bg-gray-200 rounded-xl"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>
                <div className="pb-6 text-sm text-center text-gray-300 sm:text-base">
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
