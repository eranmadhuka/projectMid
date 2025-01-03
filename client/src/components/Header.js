import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMenu, IoMdClose } from 'react-icons/io';

import Logo from '../assets/images/logo-2.png'

import Button from './ui/Button'
import Switcher from './ui/Switcher';

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Services', href: '/services', current: true },
    { name: 'About', href: '/about', current: true },
    { name: 'Contact', href: '/contact', current: true },
];

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="bg-white mx-auto px-4 sm:px-6 lg:px-8 lg:py-10 dark:bg-slate-800">
            <header
                className={`${isScrolled ? 'fixed top-0 left-0 w-full z-50 bg-white shadow-lg dark:bg-slate-800 ' : 'absolute inset-x-0 top-0 z-50'
                    } transition-all duration-300 ease-in-out`}
            >
                <nav className="flex items-center justify-between p-3 mx-auto max-w-7xl lg:px-8" aria-label="Global">
                    {/* Logo */}
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Logo</span>
                            {/* Your logo image */}
                            <img
                                className="h-8 w-auto"
                                src={Logo}
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="flex lg:hidden">
                        <Switcher />
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <IoIosMenu className="h-6 w-6 dark:text-white" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Login Button */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <div className="flex items-center pr-3">
                            <Switcher />
                        </div>
                        <Button
                            name="Login"
                            link="/login"
                            styleType="secondBtn"
                        />
                        <Button
                            name="Register"
                            link="/register"
                            styleType="mainBtn"
                        />
                    </div>
                </nav>

                {/* Mobile Navigation Panel */}
                {mobileMenuOpen && (
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-slate-800">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <IoMdClose className="h-6 w-6 dark:text-white" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600"
                                    >
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Header;
