import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-300">{title}</h3>
            <p className="text-customGray dark:text-gray-300">{description}</p>
        </div>
    );
};

export default FeatureCard;