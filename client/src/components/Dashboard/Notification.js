import React, { useState, useRef, useEffect } from 'react';

import { IoIosNotifications } from "react-icons/io";

import Avatar from '../../assets/images/avatars/avatar1.jpg'

const Notification = () => {
    const [isOpened, setIsOpened] = useState(false);
    const notificationRef = useRef(null);

    const dropdownNotificationByn = () => {
        setIsOpened(!isOpened);
    };

    const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setIsOpened(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div ref={notificationRef} className='relative inline-block'>
                <button
                    className='flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400'
                    onClick={dropdownNotificationByn}
                >
                    <IoIosNotifications className='w-6 h-6 text-customDark dark:text-gray-400' />
                    <span
                        aria-hidden="true"
                        class="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                    ></span>
                </button>

                {/* Dropdown menu */}
                {isOpened && (
                    <div className='z-20 absolute top-full right-0 mt-1 w-96 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700'>
                        <div className='block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white'>
                            Notifications
                        </div>
                        <div className='divide-y divide-gray-100 dark:divide-gray-700'>
                            <a href='#' className='flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'>
                                <div className="flex-shrink-0">
                                    <img className="rounded-full w-11 h-11 object-cover" src={Avatar} alt="Jese image" />
                                    <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                                        <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                                            <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-full ps-3">
                                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span class="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                                    <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
                                </div>
                            </a>

                            <a href="#" class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div class="flex-shrink-0">
                                    <img class="rounded-full w-11 h-11 object-cover" src={Avatar} alt="Joseph image" />
                                    <div class="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-gray-900 border border-white rounded-full dark:border-gray-800">
                                        <svg class="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="w-full ps-3">
                                    <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span> and <span class="font-medium text-gray-900 dark:text-white">5 others</span> started following you.</div>
                                    <div class="text-xs text-blue-600 dark:text-blue-500">10 minutes ago</div>
                                </div>
                            </a>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default Notification
