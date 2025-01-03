import React from 'react'

import { Link } from 'react-router-dom'

import googleImg from '../assets/images/png/google.png'
import fbImg from '../assets/images/png/facebook.png'

import authImg from '../assets/images/illustration.svg'

const Register = () => {
    return (
        <>
            <div className='bg-gray-100 dark:bg-slate-800'>
                <div className='relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20'>
                    <div className='mx-auto py-10 sm:py-20 lg:py-0 flex flex-col lg:flex-row items-center justify-center'>
                        <div className='relative lg:w-2/3 hidden lg:block sm:hidden'>
                            <img src={authImg} alt="auth-img" />
                        </div>
                        <div className='lg:w-1/2 bg-white rounded-lg shadow-md dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                            <div className='p-5 space-y-4'>
                                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                                    Create your Account</h1>
                                <form action="#" class="space-y-4 md:space-y-6">
                                    <div>
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What should we call you?</label>
                                        <input type="text" name="name" id="name"
                                            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            placeholder="e.g: Ben Tennison"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                        <input type="email" name="email" id="email"
                                            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password"
                                            placeholder="••••••••"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-customBlue dark:bg-gray-700 dark:border-customBlue dark:focus:ring-customBlue dark:ring-offset-gray-800"
                                                required
                                            />
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label for="remember" class="text-customGray dark:text-gray-300">
                                                By signing up, you are creating a Flowbite account, and you agree to Flowbite’s <a href="#" className='text-customBlue'>Terms of Use</a> and <a href="#" className='text-customBlue'>Privacy Policy.</a>
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" class="w-full text-white bg-customBlue hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-customBlue dark:hover:bg-blue-900 dark:focus:ring-blue-900">Create an accoount</button>
                                    <p class="text-sm font-light text-customGray dark:text-gray-400">
                                        Already have an account? <Link to="/login" class="font-medium text-customBlue hover:underline dark:text-primary-500">Login here</Link>
                                    </p>
                                </form>

                                <div className="flex items-center mt-4 mb-4 text-gray-500">
                                    <hr className="flex-1 border-t-2 border-gray-200 dark:border-gray-500" />
                                    <span className="px-2 text-gray-300">or</span>
                                    <hr className="flex-1 border-t-2 border-gray-200 dark:border-gray-500" />
                                </div>

                                <div className='flex flex-col items-center justify-between space-y-3'>
                                    <button className='flex items-center justify-center text-customGray border border-gray-200 dark:border-gray-500 px-5 py-3 me-2 rounded-lg w-full hover:bg-gray-200 hover:dark:bg-gray-500 transition duration-200'>
                                        <img src={googleImg} alt="google" className='w-5 h-5 mr-2' />
                                        <span className='text-sm font-semibold dark:text-gray-300'>Sign up with Google</span>
                                    </button>
                                    <button className='flex items-center justify-center text-customGray border border-gray-200 dark:border-gray-500 px-5 py-3 me-2 rounded-lg w-full hover:bg-gray-200 hover:dark:bg-gray-500 transition duration-200'>
                                        <img src={fbImg} alt="google" className='w-5 h-5 mr-2' />
                                        <span className='text-sm font-semibold dark:text-gray-300'>Sign up with Facebook</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
