import axios from 'axios';
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");  
        if (token) {
            axios
                .get('/profile', { headers: { Authorization: `Bearer ${token}` } })  // Include token in request
                .then(({ data }) => setUser(data))
                .catch((err) => console.error("Error fetching profile:", err.response?.data || err.message));  // Log errors
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}