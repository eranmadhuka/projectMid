import React from 'react';

import me from '../../assets/images/about2.jpg';

function Card() {
    return (
        <div className="w-full md:w-1/2 lg:w-2/6">
            <div className="bg-white dark:bg-gray-500 m-4 rounded-lg shadow-2xl">
                <img
                    src="https://images.unsplash.com/photo-1678595367575-b020f6ff28d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
                    alt="Post"
                    className="rounded-t-lg"
                />
                <div className="px-4 pt-2">
                    <h1 className="font-bold mt-2 text-2xl text-gray-800 dark:text-gray-300">
                        Devs Solutions
                    </h1>
                    <h3 className="text-gray-500 dark:text-gray-300">
                        {' '}
                        Showing dark and light mode with react and Tailwind css
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 my-4">
                        Building the dark and light mode modal using React and Tailwind CSS. we are going to
                        save the current theme in the LocalStoage and it will be pulled whenever the page is
                        refreshed.
                    </p>
                </div>
                <div className="px-4 pb-2">
                    <a
                        href="https://www.linkedin.com/in/emmanuel-ovuoba-929155103/overlay/background-image/"
                        target="_blank"
                        rel="nonreferrer"
                        className="flex items-center"
                    >
                        <img src={me} width="32" alt="Avatar" className="rounded-full" />
                        <div className="ml-2">
                            <p className="text-gray-500 dark:text-gray-300 text-sm">@mombo</p>
                        </div>
                    </a>
                </div>
                <div className="p-4">
                    <span className="inline-block bg-gray-300 dark:bg-gray-500 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-300 mr-2 mb-2">
                        #react
                    </span>
                    <span className="inline-block bg-gray-300 dark:bg-gray-500 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-300 mr-2 mb-2">
                        #Tailwind
                    </span>
                    <span className="inline-block bg-gray-300 dark:bg-gray-500 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-300 mr-2 mb-2">
                        #darkmode
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Card;