import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../context/userContext"
import axios from "axios"

interface User {
    email: string;
    firstName: string;
    iat: number;
    lastName: string;
    id: string
}

export const Explore = () => {

    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const tkn = localStorage.getItem("jwt")
        if (tkn) {
            axios.post('/profile', {token: tkn}).then(({data}: any) => {
                
                setUser(data)
            })
        }
    }, [])

    return (
        <div>
            Explore Page
            {user !== null && JSON.stringify(user)}
        </div>
    )
}