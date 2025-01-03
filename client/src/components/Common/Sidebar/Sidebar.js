import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { NavLink, useLocation } from 'react-router-dom';

import { MdDashboard } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { FaChartArea } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { PiBooksFill } from "react-icons/pi";
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { PiExamFill } from "react-icons/pi";
import { FaFilePen } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { BiSupport } from "react-icons/bi";

const asideNavbar = {
    admin: [
        {
            name: 'Dashboard',
            href: '/admin/dashboard',
            icon: <MdDashboard />,
        },
        {
            name: 'Student',
            icon: <FaUserGraduate />,
            subMenu: [
                { name: 'Student List', href: '/admin/dashboard/students/list' },
                { name: 'Add Student', href: '/admin/dashboard/students/add' },
            ],
        },
        {
            name: 'Instructors',
            icon: <FaUserTie />,
            subMenu: [
                { name: 'Instructors List', href: '/admin/dashboard/Instructors/list' },
                { name: 'Add Instructor', href: '/admin/dashboard/Instructors/add' },
            ],
        },
        {
            name: 'Faculties',
            href: '/admin/dashboard/faculties',
            icon: <PiBooksFill />,
        },
        {
            name: 'Question',
            icon: <BsFillPatchQuestionFill />,
            subMenu: [
                { name: 'Quiz Manager', href: '/admin/dashboard/quiz/manage' },
                { name: 'Add Question', href: '/admin/dashboard/quiz/add' },
                { name: 'Edit Question', href: '/admin/dashboard/quize/edit' },
                { name: 'Category Management', href: '/admin/dashboard/quiz/categories' },
            ],
        },
        {
            name: 'Analysis',
            icon: <FaChartArea />,
            subMenu: [
                { name: 'Question Performance', href: '/admin/dashboard/quize/list' },
                { name: 'Question Difficulty', href: '/admin/dashboard/quize/add' },
                { name: 'Quiz Reports', href: '/admin/dashboard/quize/edit' },
            ],
        },
        {
            name: 'Profile Setting',
            href: '/admin/dashboard/user/settings',
            icon: <RiUserSettingsFill />,
        },
    ],
    instructor: [
        {
            name: 'Dashboard',
            href: '/instructor/dashboard',
            icon: <MdDashboard />,
        },
        {
            name: 'Student',
            icon: <FaUserGraduate />,
            subMenu: [
                { name: 'Student List', href: '/instructor/dashboard/students/list' },
                { name: 'Add Student', href: '/instructor/dashboard/students/add' },
            ],
        },
        // {
        //     name: 'Faculties',
        //     href: '/instructor/dashboard/faculties',
        //     icon: <PiBooksFill />,
        // },
        {
            name: 'Question',
            icon: <BsFillPatchQuestionFill />,
            subMenu: [
                { name: 'Quiz Manager', href: '/instructor/dashboard/quiz/manage' },
                { name: 'Add Question', href: '/instructor/dashboard/quiz/add' },
                { name: 'Edit Question', href: '/instructor/dashboard/quize/edit' },
                { name: 'Category Management', href: '/instructor/dashboard/quiz/categories' },
            ],
        },
        {
            name: 'Study Materials',
            href: '/instructor/dashboard/manage/study-materials',
            icon: <ImBooks />,
        },
        {
            name: 'Analysis',
            icon: <FaChartArea />,
            subMenu: [
                { name: 'Question Performance', href: '/instructor/dashboard/quize/list' },
                { name: 'Question Difficulty', href: '/instructor/dashboard/quize/add' },
                { name: 'Quiz Reports', href: '/instructor/dashboard/quize/edit' },
            ],
        },
        {
            name: 'Profile Setting',
            href: '/instructor/dashboard/user/settings',
            icon: <RiUserSettingsFill />,
        },
    ],
    student: [
        {
            name: 'Dashboard',
            href: '/student/dashboard',
            icon: <MdDashboard />,
        },
        {
            name: 'Quizzes',
            href: '/student/dashboard/exam/select',
            icon: <FaFilePen />,
        },
        {
            name: 'Results',
            href: '/student/dashboard/results',
            icon: <PiExamFill />,
        },
        {
            name: 'Study Materials',
            href: '/student/dashboard/study-materials',
            icon: <ImBooks />,
        },
        {
            name: 'Notifications',
            href: '/student/dashboard/notifications',
            icon: <IoIosNotifications />,
        },
        {
            name: 'Support',
            href: '/student/dashboard/support',
            icon: <BiSupport />,
        },
        {
            name: 'Settings',
            href: '/student/dashboard/settings',
            icon: <RiUserSettingsFill />,
        },
    ],
};

const Sidebar = ({ isSidebarOpen }) => {
    const { user } = useAuth();
    const location = useLocation();
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    if (!user) return null;

    const activeMenu = asideNavbar[user.role] || [];

    const handleSubMenuClick = (index) => {
        setActiveSubMenu(activeSubMenu === index ? null : index);
    };

    const isItemActive = (item) => {
        if (location.pathname === item.href) return true;
        if (item.subMenu) {
            return item.subMenu.some(subItem => location.pathname === subItem.href);
        }
        return false;
    };

    return (
        <>
            <aside
                className={`bg-white dark:bg-gray-800 w-64 h-screen overflow-y-auto shadow-lg fixed top-0 left-0 z-10 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Profile Section */}
                <div className="p-4 mt-20 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col items-center justify-center space-x-3">
                        <img
                            // src={user.avatar || '/default-avatar.png'}
                            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ9l2MJ63cdVi4-ncaMZBq7Oa_xWS__cG7MR8UJy7jjRbwEDm-o2bKyutI1rKzvtLTVks&usqp=CAU'}
                            alt="Profile"
                            className="w-20 h-20 rounded-full"
                        />
                        <div className='text-center mt-3'>
                            <h3 className="text-sm font-semibold dark:text-white">{user.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        {activeMenu.map((item, index) => {
                            const isActive = isItemActive(item);

                            return (
                                <li key={index}>
                                    <NavLink
                                        to={item.href || '#'}
                                        className={`flex items-center space-x-3 p-2 rounded-lg ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => item.subMenu && handleSubMenuClick(index)}
                                    >
                                        <span>{item.icon}</span>
                                        <span className='flex-1 ms-2 whitespace-nowrap'>{item.name}</span>
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
                                    </NavLink>
                                    {item.subMenu && activeSubMenu === index && (
                                        <ul className="pl-6 space-y-2">
                                            {item.subMenu.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <NavLink
                                                        to={subItem.href}
                                                        className={`block p-2 text-sm rounded-lg ${location.pathname === subItem.href ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                                                    >
                                                        {subItem.name}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => { /* Add logout logic */ }}
                        className="flex items-center space-x-3 text-red-600 hover:text-red-700 w-full p-2 rounded-lg"
                    >
                        <TbLogout2 />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
