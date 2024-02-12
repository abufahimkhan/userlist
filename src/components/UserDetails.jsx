import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user/${id}`);
                setUser(response.data);
            } catch (error) {
                console.log("Error Fetching User:", error);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (!user) {
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-xl w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-semibold mb-6 text-center">User Details</h2>
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 mb-6 ">
                    <img src={user.image} alt={`Avatar of ${user.firstName}`} className="h-60 w-60 full mx-auto md:mx-0" />
                    <div>
                        <p><b>First Name:</b> {user.firstName}</p>
                        <p><b>Last Name:</b> {user.lastName}</p>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Company Name:</b> {user.company.name}</p>
                        <p><b>Address:</b> {user.address.address}, {user.address.city}, {user.address.postalCode}</p>
                    </div>
                </div>
                <Link to="/" className="block text-center text-blue-500 hover:underline">Go Back to User List</Link>
            </div>
        </div>
    );
}
