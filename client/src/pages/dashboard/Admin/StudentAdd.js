import React from 'react'
import Breadcrumb from '../../../components/ui/Breadcrumb'

import { HiUserCircle } from "react-icons/hi2";
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout';

const StudentAdd = () => {
    return (
        <DashboardLayout>
            <main className='bg-gray-50 px-3 md:px-8 h-auto dark:bg-gray-900'>
                <div className='px-10 pt-5 sm:px-5'>
                    <Breadcrumb
                        links={[
                            { text: 'Home', url: '/dashboard' },
                            { text: 'Add Student', url: '/dashboard/students/add' }
                        ]}
                    />

                    <div>
                        <h1 className='text-customDark font-semibold text-2xl dark:text-gray-200 mt-5'>Add Students</h1>
                    </div>

                    <div className='relative my-4 p-6 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800'>
                        <form action="#">
                            <div className="space-y-6">
                                <div className='grid gap-4 xl:grid-rows-1 2xl:grid-cols-1'>
                                    {/* Personal Details */}
                                    <div className="border-b border-gray-900/10 pb-12 grid xl:grid-cols-2 2xl:grid-cols-3">
                                        <div className='pe-8 w-full lg:w-96'>
                                            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Personal Information</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">Use a permanent address where you can receive mail.</p>
                                        </div>

                                        <div className="grid lg:grid-cols-6 sm:grid-cols-3 gap-x-6 gap-y-8">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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

                                            <div className="sm:col-span-3">
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

                                            <div className="sm:col-span-3">
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

                                            <div className="sm:col-span-3">
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

                                            <div className="sm:col-span-3">
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

                                            <div className="sm:col-span-3">
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

                                            <div className="col-span-full">
                                                <label htmlFor="street-address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Street address
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

                                        </div>
                                    </div>
                                    {/* Profile Details */}
                                    <div className="border-b border-gray-900/10 pb-12 grid xl:grid-cols-2 2xl:grid-cols-3">
                                        <div className='pe-8 w-96'>
                                            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Profile</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">This information will be displayed publicly so be careful what you share.</p>
                                        </div>

                                        <div className="grid lg:grid-cols-6 sm:grid-cols-3 gap-x-6 gap-y-8">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="display-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    What should we call you?
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="display-name"
                                                        id="display-name"
                                                        autoComplete="display-name"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Username
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        id="username"
                                                        autoComplete="username"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Password
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        autoComplete="password"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="con-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Confirm Password
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="con-password"
                                                        id="con-password"
                                                        autoComplete="con-password"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="about" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    About
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        id="about"
                                                        name="about"
                                                        rows={3}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        defaultValue={''}
                                                    />
                                                </div>
                                                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">Write a few sentences about yourself.</p>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Photo
                                                </label>
                                                <div className="mt-2 flex items-center gap-x-3">
                                                    <HiUserCircle className="h-20 w-20 text-gray-300" aria-hidden="true" />
                                                    <div className='flex flex-col'>
                                                        <input class="block w-full text-sm text-gray-900 border p-2.5 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                                                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit button */}
                                    <div className="mt-2 flex items-center justify-center gap-x-6">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Add Student
                                        </button>
                                        <button type="reset" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </main >
        </DashboardLayout>
    )
}

export default StudentAdd
