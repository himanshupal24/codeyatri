import React, { useState, useLayoutEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();

    // Current user setup
    useLayoutEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser({});
            }
        });

        return () => unsubscribe;
    }, []);

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <NavLink to="/" className="flex items-center">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="mr-3 h-6 sm:h-9"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Code-Yatri
                        </span>
                    </NavLink>
                    <div className="flex items-center lg:order-2">
                        {currentUser?.uid ? (
                            <>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="text-white bg-indigo-500 hover:bbg-indigo-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none dark:focus:bg-indigo-500"
                                >
                                    My Dashboard
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                                >
                                    Log in
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-blue-700 font-bold'
                                            : 'text-gray-100 hover:text-blue-700'
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/courses"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-blue-700 font-bold'
                                            : 'text-gray-100 hover:text-blue-700'
                                    }
                                >
                                    Courses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-blue-700 font-bold'
                                            : 'text-gray-100 hover:text-blue-700'
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
