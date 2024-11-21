import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
    access_token: string;
    error?: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
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

        try {
            const response = await axios.post<LoginResponse>("/login", { email, password });

            if (response.data.error) {
                toast.error(response.data.error);
                return;
            }

            const { access_token } = response.data;
            localStorage.setItem("jwt", access_token);
            setData({ email: "", password: "" });
            toast.success("Login successful! Redirecting...");
            navigate("/explore");
        } catch (error: any) {
            if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
            console.error("Login error:", error);
        }
    };

    return (
        <div className="bg-[#081014] min-h-screen flex flex-col items-center justify-center text-white p-4">
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={loginUser} className="w-full max-w-md space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="JohnDoe@KDramafy.com"
                        value={data.email}
                        onChange={handleChange}
                        required
                        className="p-2 rounded bg-gray-800 text-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        value={data.password}
                        onChange={handleChange}
                        required
                        className="p-2 rounded bg-gray-800 text-white"
                    />
                </div>
                <button type="submit" className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
