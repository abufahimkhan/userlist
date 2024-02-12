import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';
export default function UserForm() {
    const [newUser, setNewUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        image: '',
        company: {
            address: {
                address: '',
                city: '',
                postalCode: '',
                state: ''
            },
            name: '',
            title: ''
        }
    });

    useEffect(() => {
        setNewUser(prevState => ({
            ...prevState,
            company: {
                ...prevState.company,
                address: { ...prevState.company.address }
            }
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    const handleAddressChange = (e, field) => {
        const { value } = e.target;
        setNewUser({
            ...newUser,
            company: {
                ...newUser.company,
                address: {
                    ...newUser.company.address,
                    [field]: value
                }
            }
        });
    };

    const handleCompanyChange = (e, field) => {
        const { value } = e.target;
        setNewUser({
            ...newUser,
            company: {
                ...newUser.company,
                [field]: value
            }
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.phone || !newUser.birthDate || !newUser.company.address.address || !newUser.company.address.city || !newUser.company.address.postalCode || !newUser.company.address.state || !newUser.company.name || !newUser.company.title) {
            alert('Please fill all fields before submitting.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/addUser', newUser);
            console.log(response.data.message);
            console.log(newUser);
            setNewUser({
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                birthDate: '',
                image: '',
                company: {
                    address: {
                        address: '',
                        city: '',
                        postalCode: '',
                        state: ''
                    },
                    name: '',
                    title: ''
                }
            });
            alert('User added successfully');
            console.log(newUser);
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4 text-center">Add New User</h2>
            <Link to="/" className="block text-center text-blue-500 hover:underline">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                    User List
                    </button>
                </Link>
            <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg" onSubmit={handleFormSubmit}>

                {/* Input fields for user details */}
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    ID:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="id"
                        value={newUser.id}
                        onChange={handleInputChange}
                        placeholder="User ID"
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    First Name:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="firstName"
                        value={newUser.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Last Name:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="lastName"
                        value={newUser.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="tel"
                        name="phone"
                        value={newUser.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Birth Date:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        name="birthDate"
                        value={newUser.birthDate}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Image URL:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="image"
                        value={newUser.image}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                    />
                </label>

                {/* Address fields */}
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Company Address:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="address"
                        value={newUser.company.address.address}
                        onChange={(e) => handleAddressChange(e, "address")}
                        placeholder="Company Address"
                    />
                </label>

                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Company Name:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        value={newUser.company.name}
                        onChange={(e) => handleCompanyChange(e, "name")}
                        placeholder="Company Name"
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="title"
                        value={newUser.company.title}
                        onChange={(e) => handleCompanyChange(e, "title")}
                        placeholder="Title"
                    />
                </label>

                <label className="block text-gray-700 text-sm font-bold mb-2">
                    City:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="city"
                        value={newUser.company.address.city}
                        onChange={(e) => handleAddressChange(e, "city")}
                        placeholder="City"
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Postal Code:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="postalCode"
                        value={newUser.company.address.postalCode}
                        onChange={(e) => handleAddressChange(e, "postalCode")}
                        placeholder="Postal Code"
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    State:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="state"
                        value={newUser.company.address.state}
                        onChange={(e) => handleAddressChange(e, "state")}
                        placeholder="State"
                    />
                </label>

                {/* Submit button */}
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Submit</button>
                
            </form>
          
        </div>
    );
}
