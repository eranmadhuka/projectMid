import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom';

import { MdDashboard } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { FaChartArea } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { PiBooksFill } from "react-icons/pi";

const asideNavbar = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: <MdDashboard />,
    },
    {
        name: 'Student',
        // href: '/admin/students/*',
        icon: <FaUserGraduate />,
        current: false,
        subMenu: [
            {
                name: 'Student List',
                href: '/dashboard/students/list',
            },
            {
                name: 'Add Student',
                href: '/dashboard/students/add',
            },
        ],

    },
    {
        name: 'Instructors',
        icon: <FaUserTie />,
        current: false,
        subMenu: [
            {
                name: 'Instructors List',
                href: '/dashboard/Instructors/list',
            },
            {
                name: 'Add Instructor',
                href: '/dashboard/Instructors/add',
            },
        ],
    },
    {
        name: 'Faculties',
        href: '/dashboard/faculties',
        icon: <PiBooksFill />,
    },
    {
        name: 'Question',
        icon: <BsFillPatchQuestionFill />,
        current: false,
        subMenu: [
            {
                name: 'Quiz Manager',
                href: '/dashboard/quiz/manage',
            },
            {
                name: 'Add Question',
                href: '/dashboard/quiz/add',
            },
            {
                name: 'Edit Question',
                href: '/dashboard/quize/edit',
            },
            {
                name: 'Category Mangement',
                href: '/dashboard/quiz/categories',
            },
        ],
    },
    {
        name: 'Analysis',
        icon: <FaChartArea />,
        current: false,
        subMenu: [
            {
                name: 'Question Performance',
                href: '/dashboard/quize/list',
            },
            {
                name: 'Question Difficulty',
                href: '/dashboard/quize/add',
            },
            {
                name: 'Edit Question',
                href: '/dashboard/quize/edit',
            },
            {
                name: 'Quiz Reports',
                href: '/dashboard/quize/edit',
            },
        ],
    },
    {
        name: 'Profile Setting',
        href: '/dashboard/user/settings',
        icon: <RiUserSettingsFill />,
    },
];

const Sidebar = ({ isOpen }) => {
    const location = useLocation();
    const [activeSubMenu, setActiveSubMenu] = useState(null)

    const handleSubMenuClick = (index) => {
        if (activeSubMenu === index) {
            setActiveSubMenu(null);
        } else {
            setActiveSubMenu(index);
        }
    }

    const isItemActive = (item) => {
        if (location.pathname === item.href) return true;
        if (item.subMenu) {
            return item.subMenu.some(subItem => location.pathname === subItem.href);
        }
        return false;
    };

    return (
        <>
            <aside className={`bg-white shadow-lg fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="h-full px-3 pb-4 pt-10 overflow-y-auto dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {asideNavbar.map((item, index) => {
                            const isActive = isItemActive(item);

                            return (
                                <li key={index}>
                                    <Link
                                        to={item.href || '#'}
                                        className={`flex items-center p-2 rounded-lg text-base dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-100 text-customBlue dark:text-blue-300 dark:bg-gray-700' : 'text-customGray'}`}
                                        onClick={() => handleSubMenuClick(index)}
                                    >
                                        <span
                                            className={`flex items-center p-2 rounded-lg text-base ${isActive ? 'text-customBlue dark:text-blue-300' : 'text-customGray'}`}
                                        >
                                            {item.icon}
                                        </span>
                                        <span className='flex-1 ms-2 whitespace-nowrap'>{item.name}</span>
                                        {/* Dropdown icon for items with submenus */}
                                        {item.subMenu && (
                                            <svg
                                                className="w-4 h-4 inline-block ml-1 text-gray-500 dark:text-gray-300"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        )}
                                    </Link>

                                    {/* Submenu */}
                                    {
                                        activeSubMenu === index && item.subMenu && (
                                            <div className="py-2 space-y-2">
                                                {item.subMenu.map((subItem, subIndex) => {
                                                    const isSubItemActive = location.pathname === subItem.href;

                                                    return (
                                                        <Link
                                                            key={subIndex}
                                                            to={subItem.href}
                                                            className={`flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isSubItemActive ? 'bg-gray-100 text-customBlue dark:text-blue-300 dark:bg-gray-700' : 'text-gray-900'}`}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )
                                    }
                                </li>
                            )
                        })}

                    </ul>
                </div>
            </aside >
        </>
    )
}

export default Sidebar
