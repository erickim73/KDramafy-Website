import React, { useState } from "react"
import axios from 'axios'
import {toast} from "react-hot-toast"
import {useNavigate} from "react-router-dom"

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
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
    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault()
        const {email, password} = data
        try {
            const {data}: any = await axios.post('/login', {
                email, password
            })
            localStorage.setItem("jwt", data.token)
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({
                    email: "",
                    password: "",
                })
                navigate('/explore')
            }
        } catch (error) {
            
        }
        // Log form data or handle it as needed
        console.log("User Data:", data)
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={loginUser}>

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="JohnDoe@KDramafy.com"
                    value={data.email}
                    onChange={(e) => setData({...data, email: e.target.value})}                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={data.password}
                    onChange={(e) => setData({...data, password: e.target.value})}                    required
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login 
