import React from 'react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import { FaCamera } from "react-icons/fa";
import DashboardLayout from '../../components/Common/Layout/DashboardLayout';

const Settings = () => {
    return (
        <DashboardLayout>
            <main className='bg-gray-50 dark:bg-gray-900 px-3 md:px-8 h-auto min-h-screen'>
                <div className='px-10 pt-3'>
                    <Breadcrumb
                        links={[
                            { text: 'Home', url: '/dashboard' },
                            { text: 'Settings', url: '/dashboard/settings' },
                        ]}
                    />
                    <div>
                        <h1 className='text-customDark font-semibold text-2xl dark:text-gray-200 mt-5'>Account Settings</h1>
                    </div>

                    <div className='mt-5 pb-6'>
                        <div className="grid gap-4 grid-cols-1">
                            {/* Profile Section */}
                            <div className='p-6 bg-white rounded-xl shadow-sm dark:bg-gray-800 space-y-5'>
                                <div className="sm:col-span-1 2xl:col-span-2 border-b-2 py-3">
                                    <h2 className='text-xl text-customDark font-semibold dark:text-gray-200 mb-4'>Profile Details</h2>
                                    <span className='text-sm text-customDark font-normal dark:text-gray-200'>You have full control to manage your own account setting.</span>
                                </div>
                                <div className="sm:col-span-1 2xl:col-span-2 border-b-2 py-3">
                                    <h2 className='text-xl text-customDark font-semibold dark:text-gray-200 mb-4'> Your avatar</h2>
                                    <div className='flex items-center'>
                                        <div className="relative w-32 h-32">
                                            <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='rounded-full w-full h-full object-cover' />
                                            <div className='absolute bottom-0 right-0 w-9 h-9 bg-customBlue flex items-center justify-center rounded-full text-white border border-white hover:bg-indigo-500 '>
                                                <input type="file" className='absolute opacity-0 z-0 left-0 w-full h-full cursor-pointer' />
                                                <FaCamera />
                                            </div>
                                        </div>
                                        <span className='text-sm text-customGray ms-3'>Allowed file types: png, jpg, jpeg.</span>
                                    </div>
                                </div>
                                <div className="sm:col-span-1 2xl:col-span-2 border-b-2 py-3">
                                    <h2 className='text-xl text-customDark font-semibold dark:text-gray-200 mb-4'>Personal Details</h2>
                                    <form action="#">
                                        <div className='grid gap-4 xl:grid-rows-2 2xl:grid-cols-2'>
                                            <div className="sm:col-span-3 2xl:col-span-1">
                                                <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                                                    First name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                                        name="last-name"
                                                        id="last-name"
                                                        autoComplete="family-name"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3 2xl:col-span-1">
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Email Address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                                        name="phone-number"
                                                        id="phone-number"
                                                        autoComplete="phone-number"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                                        autoComplete="gender"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    >
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
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
                                                        name="dob"
                                                        id="dob"
                                                        autoComplete="dob"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                                        name="street-address"
                                                        id="street-address"
                                                        autoComplete="street-address"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                                        id="city"
                                                        autoComplete="given-name"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                                        id="state"
                                                        autoComplete="family-name"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <button className='w-auto px-5 py-3 mt-10 sm:mt-2 text-sm font-semibold transition duration-300 ease bg-customBlue text-white hover:cursor-pointer rounded-md hover:bg-customDark hover:text-white'>Update Profile</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Password Section */}
                            <div className='p-6 bg-white rounded-xl shadow-sm dark:bg-gray-800 space-y-5'>
                                <div className="sm:col-span-1 2xl:col-span-2 border-b-2 py-3">
                                    <h2 className='text-xl text-customDark font-semibold dark:text-gray-200 mb-4'>Change Password</h2>
                                    <span className='text-sm text-customDark font-normal dark:text-gray-200'>Update your password from here.</span>
                                </div>
                                <form action="">
                                    <div className='grid gap-4 xl:grid-rows-2 2xl:grid-cols-2'>
                                        <div className="sm:col-span-3 2xl:col-span-2">
                                            <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                                                Current Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 2xl:col-span-2">
                                            <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                New Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 2xl:col-span-2">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Confirm Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <button className='w-auto px-5 py-3 mt-10 sm:mt-2 text-sm font-semibold transition duration-300 ease bg-customBlue text-white hover:cursor-pointer rounded-md hover:bg-customDark hover:text-white'>Update Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    )
}

export default Settings
