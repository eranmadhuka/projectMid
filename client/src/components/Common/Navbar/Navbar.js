import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../../assets/images/logo-2.png';
import Switcher from '../../ui/Switcher';
import Notification from '../../Dashboard/Notification';
import ToggleSidebarButton from '../Sidebar/ToggleSidebarButton';

import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";

const dropdownMenu = [
    {
        title: 'Profile',
        icon: <FaUser />,
        link: '/profile',
    },
    {
        title: 'Setting',
        icon: <IoSettings />,
        link: '/settings',
    },
    {
        title: 'Update Password',
        icon: <RiLockPasswordFill />,
        link: '/update-password',
    },
    {
        title: 'Logout',
        icon: <IoLogOut />,
        link: '/logout',
    },
];

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
    const { currentUser, additionalData, logout } = useAuth();
    const [isOpened, setIsOpened] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpened(!isOpened);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpened(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Return null if user is not available
    if (!currentUser) return null;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className='fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
            <div className='px-3 lg:px-5 lg:pl-3'>
                <div className="flex items-center justify-between">
                    <div className='flex items-center justify-start'>
                        {/* Logo */}
                        <div className="flex lg:flex-1">
                            <Link to="/dashboard" className="-m-1.5 p-1.5">
                                <span className="sr-only">Logo</span>
                                <img className="h-8 w-auto" src={Logo} alt="Logo" />
                            </Link>
                        </div>
                        {/* Sidebar Icon */}
                        <ToggleSidebarButton isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} style={{ fontSize: '2rem', color: 'red' }} />
                    </div>
                    <div className='flex items-center space-x-2'>
                        {/* Switcher */}
                        <Switcher />

                        {/* Notification */}
                        <Notification />

                        {/* Profile menu */}
                        <div className="relative inline-block text-left" ref={dropdownRef}>
                            <div>
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 dark:text-white"
                                    type="button"
                                >
                                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={`http://localhost:5000${currentUser?.avatar}`}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div className="flex flex-col items-start space-y-0 ml-2">
                                                {/* <h3 className="text-sm font-semibold dark:text-white text-left">{additionalData?.studentId || additionalData?.employeeId}</h3> */}
                                                <h3 className="text-sm font-semibold dark:text-white text-left">{currentUser?.firstName} {currentUser?.lastName}</h3>
                                                <p className="text-xs text-start text-gray-500 dark:text-gray-400 capitalize">{currentUser?.role}</p>
                                            </div>
                                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            {isOpened && (
                                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div role="none">
                                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white dark:bg-gray-800">
                                            <div className="font-medium">{currentUser?.firstName} {currentUser?.lastName}</div>
                                            <div className="truncate">{currentUser?.email}</div>
                                        </div>
                                        {dropdownMenu.map((item, index) => (
                                            <Link
                                                key={index}
                                                to={item.link}
                                                onClick={item.title === 'Logout' ? handleLogout : null}
                                                className='flex text-gray-700 px-4 py-2 text-sm hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900'
                                            >
                                                <span className='text-customGray dark:text-gray-400'>{item.icon}</span>
                                                <span className='text-customGray ms-3 dark:text-gray-400'>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
