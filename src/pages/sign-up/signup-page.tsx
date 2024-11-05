import React, { useState } from "react"
import axios from "axios"
import {toast} from "react-hot-toast"
import {useNavigate} from "react-router-dom"

const SignUp: React.FC = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    interface RegisterResponse {
        error?: string
    }

    // Event handler for form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(prevData => ({ ...prevData, [name]: value }))
    }

    // Event handler for form submission
    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault()
        const {firstName, lastName, email, password} = data
        try {
            const {data} = await axios.post<RegisterResponse>('/signup', {
                firstName, lastName, email, password
            })
            if (data.error) {
                toast.error(data.error)
            } else {
                setData ({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                })
                toast.success('Login Successful. Welcome!')
                navigate("/onboarding")
            }
        } catch (error) {
            console.log(error)
        }
        // Log form data or handle it as needed
        console.log("User Data:", data)
    }

    return (
        <div>
            <h2>Sign Up</h2>

            <form onSubmit={registerUser}>
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
