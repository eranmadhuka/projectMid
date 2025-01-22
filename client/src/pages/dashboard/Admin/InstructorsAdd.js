import React, { useState } from "react";
import axios from "axios";
import Breadcrumb from "../../../components/ui/Breadcrumb";
import { HiUserCircle } from "react-icons/hi2";
import DashboardLayout from "../../../components/Common/Layout/DashboardLayout";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const InstructorsAdd = () => {
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "instructor",
        phone: "",
        gender: "Other",
        dateOfBirth: "",
        address: "",
        city: "",
        state: "",
        avatar: null,
    });


    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            avatar: file,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object to handle file uploads
        const data = new FormData();
        data.append("firstName", formData.firstName);
        data.append("lastName", formData.lastName);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("role", formData.role);
        data.append("phone", formData.phone);
        data.append("gender", formData.gender);
        data.append("dateOfBirth", formData.dateOfBirth);
        data.append("address", formData.address);
        data.append("city", formData.city);
        data.append("state", formData.state);
        if (formData.avatar) {
            data.append("avatar", formData.avatar);
        }

        try {
            const response = await axios.post("http://localhost:5000/api/user/add", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                navigate("/admin/dashboard/Instructors/list");
                toast.success("Instructors added successfully!");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    role: "instructor",
                    phone: "",
                    gender: "Other",
                    dateOfBirth: "",
                    address: "",
                    city: "",
                    state: "",
                    avatar: null,
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding instructor.");
        }
    };

    return (
        <DashboardLayout>
            <div>
                <Breadcrumb
                    links={[
                        { text: "Home", url: "/dashboard" },
                        { text: "Add Student", url: "/dashboard/students/add" },
                    ]}
                />

                <div>
                    <h1 className="text-customDark font-semibold text-2xl dark:text-gray-300 mt-5">
                        Add Students
                    </h1>
                </div>

                <div className="relative my-4 p-6 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div className="grid gap-4 xl:grid-rows-1 2xl:grid-cols-1">
                                {/* Personal Details */}
                                <div className="border-b border-gray-900/10 pb-12 grid xl:grid-cols-2 2xl:grid-cols-3">
                                    <div className="pe-8 w-full lg:w-96">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                                            Personal Information
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                            Use a permanent address where you can receive mail.
                                        </p>
                                    </div>

                                    <div className="grid lg:grid-cols-6 sm:grid-cols-3 gap-x-6 gap-y-8">
                                        {/* First Name */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="firstName"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                First Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    id="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Last Name */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="lastName"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Last Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="email"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Email Address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="password"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Role */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="role"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Role
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    name="role"
                                                    id="role"
                                                    value="instructor"
                                                    disabled
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    <option value="student">Student</option>
                                                    <option value="instructor">Instructor</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="phone"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Phone Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Gender */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="gender"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Gender
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    name="gender"
                                                    id="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Date of Birth */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="dateOfBirth"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Date of Birth
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    id="dateOfBirth"
                                                    value={formData.dateOfBirth}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div className="col-span-full">
                                            <label
                                                htmlFor="address"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* City */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="city"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* State */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="state"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                State
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="state"
                                                    id="state"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Profile Picture */}
                                        <div className="col-span-full">
                                            <label
                                                htmlFor="avatar"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Profile Picture
                                            </label>
                                            <div className="mt-2 flex items-center gap-x-3">
                                                <HiUserCircle className="h-20 w-20 text-gray-300" aria-hidden="true" />
                                                <div className="flex flex-col">
                                                    <input
                                                        type="file"
                                                        name="avatar"
                                                        id="avatar"
                                                        onChange={handleFileChange}
                                                        className="block w-full text-sm text-gray-900 border p-2.5 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                    />
                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                                        SVG, PNG, JPG, or GIF (MAX. 800x400px).
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-2 flex items-center justify-center gap-x-6">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Student
                                    </button>
                                    <button
                                        type="reset"
                                        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default InstructorsAdd;