import React, { useState } from "react"
import axios from "axios"
import {toast} from "react-hot-toast"
import {Link, useNavigate} from "react-router-dom"




interface RegisterResponse {
    error?: string;
    access_token?: string;
}

const SignUp: React.FC = () => {
    const navigate = useNavigate();
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
        console.log("Registering user")

        const { firstName, lastName, email, password } = data;
        console.log("Form data:", data);

        try {
            const response = await axios.post<RegisterResponse>("/signup", {
                firstName,
                lastName,
                email,
                password,
            });

            console.log("Backend response:", response.data);

            if (response.data.error) {
                toast.error(response.data.error);
                return;
            }

            if (response.data.access_token) {
                localStorage.setItem("token", response.data.access_token);
            }


            toast.success("Account created! Redirecting to login...");
            setData({ firstName: "", lastName: "", email: "", password: "" });
            navigate("/onboarding");
        } catch (error: any) {
            if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
            console.error("Signup error:", error);
        }
    }; 

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#081014] text-white p-4">
            <div className="w-full max-w-xl space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">Create an account with KDramafy</h1>
                    <p className="text-lg text-gray-400">
                        Hey there, sign up for the world's first all-in-one K-Drama recommendation engine and portfolio tracker!
                    </p>
                </div>
                <form onSubmit={(e) => { console.log("Form submitted"); registerUser(e); }} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">``
                            <label className = "text-white font-montserrat">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="John"
                                value={data.firstName}
                                onChange={(e) => setData({...data, firstName: e.target.value})}
                                required
                                className="bg-[#1a1a1a] border-gray-800 text-white h-12"
                            />
                        </div>
                
                        <div className="space-y-2">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Doe"
                                value={data.lastName}
                                onChange={(e) => setData({...data, lastName: e.target.value})}
                                required
                                className="bg-[#1a1a1a] border-gray-800 text-white h-12"
                            />
                        </div>
                
                        <div className="space-y-2">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="JohnDoe@KDramafy.com"
                                value={data.email}
                                onChange={(e) => setData({...data, email: e.target.value})}
                                required
                                className="bg-[#1a1a1a] border-gray-800 text-white h-12"
                            />
                        </div>
                
                        <div className="space-y-2">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) => setData({...data, password: e.target.value})}
                                required
                                className="bg-[#1a1a1a] border-gray-800 text-white h-12"
                            />
                        </div>
                        <button className="w-full h-12 text-lg font-medium text-black bg-white hover:bg-gray-200" onClick = {registerUser} type="submit">
                            Submit
                        </button>
                    </div>
                </form>
                <div className="text-center text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-white hover:underline">
                    Login here.
                </Link>
                </div>
            </div>
                
                    
                
        </div>
    )
}

export default SignUp
