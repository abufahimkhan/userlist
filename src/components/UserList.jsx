import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getData');
                setUsers(response.data.users);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedUsers = sortOption
        ? [...filteredUsers].sort((a, b) => {
            if (sortOption === 'name') {
                return a.firstName.localeCompare(b.firstName);
            } else if (sortOption === 'email') {
                return a.email.localeCompare(b.email);
            } else if (sortOption === 'company') {
                return a.company.name.localeCompare(b.company.name);
            }
        })
        : filteredUsers;

    return (
        <div className="container mx-auto p-4 max-w-[1100px]">
            <div className="header mb-4">
                <h1 className="text-3xl font-bold mb-2">Users Data</h1>
                <p className="text-gray-600 mb-2">Click Username To See Details</p>
                <div className="search-sort-container flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400"
                    />
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400"
                    >
                        <option value="">Sort by...</option>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="company">Company Name</option>
                    </select>
                    <Link to="/add-user" className="text-white bg-blue-500 rounded px-4 py-2 hover:bg-blue-600 transition duration-300">
                        Add User
                    </Link>
                </div>
            </div>
            <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {sortedUsers.map((user, index) => (
                    <div
                        key={user.id}
                        className="card border border-gray-900 rounded-lg p-4 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring focus:border-blue-300 active:scale-95"
                    >
                        <img src={user.image} alt={`Avatar of ${user.firstName}`} className="w-full mb-4 card border border-gray-400 rounded-lg" />
                        <Link to={`/user/${user.id}`} className="text-xl font-bold text-blue-500 hover:underline">
                            {user.firstName} {user.lastName} {user.id}
                        </Link>
                        <p><b>First Name:</b> {user.firstName}</p>
                        <p><b>Last Name:</b> {user.lastName}</p>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Company Name:</b> {user.company.name}</p>
                        <p><b>Address:</b> {user.address.address}, {user.address.city}, {user.address.postalCode}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
