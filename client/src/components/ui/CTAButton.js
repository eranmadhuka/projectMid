import React from 'react';
import { Link } from 'react-router-dom';

const CTAButton = ({ text, url, className }) => {
    return (
        <Link
            to={url}
            className={`inline-block px-6 py-3 rounded-full font-semibold text-center transition-colors duration-300 ${className}`}
        >
            {text}
        </Link>
    );
};

export default CTAButton;