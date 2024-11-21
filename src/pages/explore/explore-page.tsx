import { useState, useEffect } from "react";
import axios from "axios";

interface User {
    email: string;
    firstName: string;
    lastName: string;
}

export const Explore = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const tkn = localStorage.getItem("jwt");
        if (tkn) {
            axios
                .post<User>('/profile', {}, { headers: { Authorization: `Bearer ${tkn}` } })
                .then(({ data }) => setUser(data))
                .catch((err) => {
                    console.error("Error fetching profile:", err.response?.data || err.message);
                    setError(err.response?.data?.error || "An error occurred");
                });
        } else {
            setError("No token found. Please log in.");
        }
    }, []);

    return (
        <div>
            <h1>Explore Page</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user ? (
                <div>
                    <p>Email: {user.email}</p>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                </div>
            ) : (
                !error && <p>Loading...</p>
            )}
        </div>
    );
};
