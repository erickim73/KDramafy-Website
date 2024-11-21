import axios from 'axios';
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const tkn = localStorage.getItem("jwt");  // Retrieve JWT from localStorage
        if (tkn) {
            axios
                .post('/profile', {}, { headers: { Authorization: `Bearer ${tkn}` } })  // Include token in request
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
