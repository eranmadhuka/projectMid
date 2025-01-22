import React from 'react';
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute font-medium top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <IoMdClose />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;