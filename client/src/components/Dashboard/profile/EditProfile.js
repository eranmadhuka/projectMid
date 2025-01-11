import React, { useState } from 'react';
import {
    FaTimes,
    FaCamera,
} from 'react-icons/fa';

import axios from 'axios';

const EditProfile = ({ isOpen, onClose, student, onSave }) => {
    // State to manage form data
    const [formData, setFormData] = useState({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        phone: student.phone || '',
        gender: student.gender || '',
        dateOfBirth: student.dateOfBirth || '',
        address: student.address || '',
        city: student.city || '',
        state: student.state || '',
        studentId: student.studentId || '',
        department: student.department || '',
        semester: student.semester || '',
        batch: student.batch || '',
        isActive: student.isActive || false,
        avatar: student.avatar || '', // Avatar URL
    });

    // State to manage the selected file for upload
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(student.avatar || '');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file)); // Preview the selected image
            setFormData({
                ...formData,
                avatar: file, // Update avatar in form data
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        console.log('Student ID:', student._id);

        try {
            const response = await axios.put(
                `http://localhost:5000/api/students/edit-students/${student._id}`, // Ensure student._id is correct
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Required for file uploads
                    },
                }
            );

            console.log('Student updated successfully:', response.data);
            onSave(response.data.student); // Pass updated data to the parent component
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    // Return null if modal is not open
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Edit Student Details</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FaTimes className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Modal Content */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Profile Header */}
                    <div className="flex justify-between">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative">
                                <img
                                    src={`http://localhost:5000${previewImage}`}
                                    alt={`${formData.firstName} ${formData.lastName}`}
                                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                    onError={(e) => {
                                        e.target.src = '/api/placeholder/96/96';
                                    }}
                                />
                                <label
                                    className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 flex items-center justify-center rounded-full text-white cursor-pointer"
                                    title="Change Profile Picture"
                                >
                                    <FaCamera className="w-3 h-3" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                </label>
                                <span
                                    className={`absolute top-0 left-0 w-4 h-4 rounded-full border-2 border-white
                  ${formData.isActive ? 'bg-green-400' : 'bg-red-400'}`}
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {formData.firstName} {formData.lastName}
                                </h3>
                                <p className="text-gray-500 text-sm">{formData.email}</p>
                                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600 mt-1">
                                    {formData.studentId}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className='grid gap-4 xl:grid-rows-2 2xl:grid-cols-2'>
                        {/* Personal Info */}
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
                    </div>

                    {/* Save and Cancel Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;