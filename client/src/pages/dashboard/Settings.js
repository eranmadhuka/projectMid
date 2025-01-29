import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Breadcrumb from '../../components/ui/Breadcrumb'
import { FaCamera } from "react-icons/fa";
import DashboardLayout from '../../components/Common/Layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
const API_URL = process.env.REACT_APP_API_URL;

const Settings = () => {
    const navigate = useNavigate();
    const { currentUser, additionalData } = useAuth();
    const [formData, setFormData] = useState('');

    // Update formData when currentUser becomes available
    useEffect(() => {
        if (currentUser) {
            setFormData({
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                gender: currentUser.gender || '',
                dateOfBirth: currentUser.dateOfBirth || '',
                address: currentUser.address || '',
                city: currentUser.city || '',
                avatar: currentUser.avatar || '',
                state: currentUser.state || '',
            });
        }
    }, [currentUser]);

    const [image, setImage] = useState(`${API_URL}${currentUser?.avatar}`);
    const [file, setFile] = useState(null); // Store the selected file for upload
    const [currentPassword, setCurrentPassword] = useState(''); // New state for current password
    const [newPassword, setNewPassword] = useState(''); // New state for new password
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('gender', formData.gender);
        data.append('dateOfBirth', formData.dateOfBirth);
        data.append('address', formData.address);
        data.append('city', formData.city);
        data.append('state', formData.state);

        if (file) {
            data.append('avatar', file);
        }

        try {
            const response = await axios.put(`${API_URL}/api/auth/update`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Show toast before navigating
            toast.success('Profile updated successfully!', { autoClose: 3000 });

            // Update formData and image with response data
            setFormData(response.data.user); // Assuming `response.data.user` contains updated user data
            setImage(`${API_URL}${response.data.user.avatar}`); // Update avatar

            // Optionally update currentUser (if it's used elsewhere)
            // Example: update `currentUser` in your `AuthContext`
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Token expired or invalid
                alert('Your login has expired. Please log in again.');
                localStorage.removeItem('token');
                window.location.href = '/login'; // Replace with your login route
            } else {
                console.error('Error updating profile:', error.response?.data || error.message);
                toast.error('Failed to update profile.');
            }
        }
    };


    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        try {
            const response = await axios.put(`${API_URL}/api/auth/change-password`, {
                currentPassword,
                newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            toast.success(response.data.message, { autoClose: 3000 });
            toast.success("Please Login again", { autoClose: 3000 });

            // Auto logout and redirect to login page
            localStorage.removeItem('token'); // Clear the token
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error('Failed to change password.');
        }
    };

    return (
        <>
            <ToastContainer />
            <DashboardLayout>
                <div>
                    <Breadcrumb
                        links={[
                            { text: 'Home', url: '/dashboard' },
                            { text: 'Settings', url: '/dashboard/settings' },
                        ]}
                    />

                    <h1 className='text-customDark font-semibold text-2xl dark:text-gray-300 mt-5'>Account Settings</h1>
                    <p className='text-customGray text-sm'>You have full control to manage your own account setting.</p>


                    <div className='mt-5 pb-6'>
                        <div className="grid gap-4 grid-cols-1">

                            <div className='p-6 bg-white rounded-xl shadow-sm dark:bg-gray-800 space-y-5'>
                                <div className="sm:col-span-1 2xl:col-span-2 border-b-2 py-3">
                                    <h2 className='text-xl text-customDark font-semibold dark:text-gray-200 mb-4'>Profile Details</h2>
                                    <span className='text-sm text-customDark font-normal dark:text-gray-200'>You have full control to manage your own account setting.</span>
                                </div>
                                <div className="sm:col-span-1 2xl:col-span-2 py-3">
                                    <h2 className='text-xl text-customDark font-semibold dark:text-gray-200 mb-4'>Your Avatar</h2>
                                    <div className='flex items-center align-top'>
                                        <div className="relative w-32 h-32">
                                            <img src={image} alt="avatar" className='rounded-full w-full h-full object-cover' />
                                            <div className='absolute bottom-0 right-0 w-9 h-9 bg-customBlue flex items-center justify-center rounded-full text-white border border-white hover:bg-indigo-500 '>
                                                <input type="file" className='absolute opacity-0 z-0 left-0 w-full h-full cursor-pointer' onChange={handleImageChange} />
                                                <FaCamera />
                                            </div>
                                        </div>
                                        <span className='text-sm text-customGray ms-3'>Allowed file types: png, jpg, jpeg.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Section */}
                            <div className='p-6 bg-white rounded-xl shadow-sm dark:bg-gray-800 space-y-5'>
                                <div className="sm:col-span-1 2xl:col-span-2 border-b-2 py-3">
                                    <h2 className='text-xl text-customDark font-semibold dark:text-gray-200 mb-4'>Personal Details</h2>
                                    <span className='text-sm text-customDark font-normal dark:text-gray-200'>Update your password from here.</span>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className='grid gap-4 xl:grid-rows-2 2xl:grid-cols-2'>
                                        <div className="sm:col-span-3 2xl:col-span-1">
                                            <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 2xl:col-span-1">
                                            <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 2xl:col-span-1">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Email Address <span className='text-xs text-red-600 font-medium'>( Can not change Email )</span>
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    autoComplete="email"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={handleChange}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 2xl:col-span-1">
                                            <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Phone Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone-number"
                                                    value={formData.phone}
                                                    autoComplete="phone-number"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 2xl:col-span-1">
                                            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Gender
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    value={formData.gender}
                                                    autoComplete="gender"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={handleChange}
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 2xl:col-span-1">
                                            <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Date of Birth
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    id="dob"
                                                    value={formData.dateOfBirth}
                                                    autoComplete="dob"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 2xl:col-span-full">
                                            <label htmlFor="street-address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Address Line
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    id="street-address"
                                                    autoComplete="street-address"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 2xl:col-span-1">
                                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    id="city"
                                                    autoComplete="given-name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 2xl:col-span-1">
                                            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                State
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={formData.state}
                                                    id="state"
                                                    autoComplete="family-name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className='w-auto px-5 py-3 mt-10 sm:mt-2 text-sm font-semibold transition duration-300 ease bg-customBlue text-white hover:cursor-pointer rounded-md hover:bg-customDark hover:text-white'>Update Profile</button>
                                    </div>
                                </form>
                            </div>

                            {/* Password Section */}
                            <div className='p-6 bg-white rounded-xl shadow-sm dark:bg-gray-800 space-y-5'>
                                <div className="sm:col-span-1 2xl:col-span-2 border-b-2 py-3">
                                    <h2 className='text-xl text-customDark font-semibold dark:text-gray-200 mb-4'>Change Password</h2>
                                    <span className='text-sm text-customDark font-normal dark:text-gray-200'>Update your password from here.</span>
                                </div>
                                <form onSubmit={handleChangePassword}>
                                    <div className='grid gap-4 xl:grid-rows-2 2xl:grid-cols-2'>
                                        <div className="sm:col-span-3 2xl:col-span-2">
                                            <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                                                Current Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="password"
                                                    name="current-password"
                                                    id="current-password"
                                                    autoComplete="current-password"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 2xl:col-span-2">
                                            <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                New Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="password"
                                                    name="new-password"
                                                    id="new-password"
                                                    autoComplete="new-password"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 2xl:col-span-2">
                                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Confirm Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="password"
                                                    name="confirm-password"
                                                    id="confirm-password"
                                                    autoComplete="new-password"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className='w-auto px-5 py-3 mt-10 sm:mt-2 text-sm font-semibold transition duration-300 ease bg-customBlue text-white hover:cursor-pointer rounded-md hover:bg-customDark hover:text-white'>Update Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Settings
