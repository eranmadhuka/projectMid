import React from 'react';
import { FaClipboardQuestion } from 'react-icons/fa6';

const StatusCard = ({ text, value, color }) => {
    const { light: colorLight, dark: colorDark } = color;

    const circleClass = "p-4 mr-4 rounded-full text-" + colorLight + " bg-" + colorDark + " dark:text-" + colorDark + " dark:bg-" + colorLight;

    return (
        <div className={`flex items-center p-6 bg-white rounded-lg shadow-xs dark:bg-gray-800`}>
            <div className={circleClass}>
                <FaClipboardQuestion className="w-5 h-5" />
            </div>
            <div>
                <p className="mb-2 text-base font-medium text-customGray dark:text-gray-400">
                    {text}
                </p>
                <p className="text-xl font-semibold text-customDark dark:text-gray-200">
                    {value}
                </p>
            </div>
        </div>
    );
};


export default StatusCard;