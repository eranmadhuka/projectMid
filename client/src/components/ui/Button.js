import React from 'react'

import { Link } from 'react-router-dom';

const Button = ({ name, link, styleType }) => {

    let buttonStyles = '';

    if (styleType === 'mainBtn') {
        buttonStyles = ' bg-customBlue text-white';
    } else if (styleType === 'secondBtn') {
        buttonStyles = 'text-gray-600 whitespace-no-wrap border border-gray-200 focus:outline-none dark:text-white';
    }

    return (
        <>
            <Link to={link}
                className='mr-2'>
                <div className={`${buttonStyles} relative px-5 py-3 text-sm font-semibold transition duration-300 ease hover:cursor-pointer rounded-md hover:bg-customDark hover:text-white`}>
                    <span className="absolute bottom-0 left-0 h-full">
                        <svg viewBox="0 0 487 487" className="w-auto h-full opacity-100 object-stretch" xmlns="http://www.w3.org/2000/svg"><path d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" fill="#FFF" fill-rule="nonzero" fill-opacity=".1"></path></svg>
                    </span>
                    <span className="absolute top-0 right-0 w-auto h-full  ">
                        <svg viewBox="0 0 487 487" className="object-cover w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" fill="#FFF" fill-rule="nonzero" fill-opacity=".1"></path></svg>
                    </span>

                    <span className="relative font-sans font-semibold">{name}</span>
                </div>
            </Link >
        </>
    )
}

export default Button

