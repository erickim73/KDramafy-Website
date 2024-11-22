import React, { useState } from "react"
import axios from "axios"
import {toast} from "react-hot-toast"
import {useNavigate} from "react-router-dom"

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
                localStorage.setItem("jwt", response.data.access_token);
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
        <div>
            <h2>Sign Up</h2>

            <form onSubmit={(e) => { console.log("Form submitted"); registerUser(e); }}>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={data.firstName}
                    onChange={(e) => setData({...data, firstName: e.target.value})}
                    required
                />

                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={data.lastName}
                    onChange={(e) => setData({...data, lastName: e.target.value})}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="JohnDoe@KDramafy.com"
                    value={data.email}
                    onChange={(e) => setData({...data, email: e.target.value})}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={data.password}
                    onChange={(e) => setData({...data, password: e.target.value})}
                    required
                />

                    <button type="submit">Submit</button>
                
            </form>
        </div>
    )
}

export default SignUp
