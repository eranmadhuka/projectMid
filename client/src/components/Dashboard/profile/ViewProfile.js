import React from 'react';
import {
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaCalendar,
    FaTimes,
} from 'react-icons/fa';

const ViewProfile = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    const InfoItem = ({ icon: Icon, label, value }) => (
        <div className="flex items-center gap-3 p-2">
            <Icon className="w-4 h-4 text-gray-500" />
            <div>
                <div className="text-sm text-gray-600">{label}</div>
                <div className="text-sm font-medium text-gray-900">{value || 'Not provided'}</div>
            </div>
        </div>
    );

    const formatDate = (dateString) => {
        if (!dateString) return 'Not provided';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b ">
                    <h2 className="text-xl font-bold text-gray-900">user Details</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FaTimes className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    {/* Profile Header */}
                    <div className='flex justify-between'>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative">
                                <img
                                    src={`http://localhost:5000${user.avatar}`}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                    onError={(e) => {
                                        e.target.src = '/api/placeholder/96/96';
                                    }}
                                />
                                <span
                                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white
                  ${user.isActive ? 'bg-green-400' : 'bg-red-400'}`}
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {user.firstName} {user.lastName}
                                </h3>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600 mt-1">
                                    {user.studentId}
                                </span>
                            </div>
                        </div>
                        {/* Additional Info */}
                        <div className="md:col-span-2">
                            <InfoItem
                                icon={FaCalendar}
                                label="Registration Date"
                                value={formatDate(user.createdAt)}
                            />
                            <InfoItem
                                icon={FaCalendar}
                                label="Last Login"
                                value={formatDate(user.lastLogin)}
                            />
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Personal Info */}
                        <div className="bg-gray-50 p-3 rounded">
                            <h4 className="font-semibold text-sm mb-2">Personal Information</h4>
                            <InfoItem
                                icon={FaUser}
                                label="Gender"
                                value={user.gender}
                            />
                            <InfoItem
                                icon={FaCalendar}
                                label="Date of Birth"
                                value={formatDate(user.dateOfBirth)}
                            />
                            <InfoItem
                                icon={FaPhone}
                                label="Phone"
                                value={user.phone}
                            />
                        </div>
                        {/* Location Info */}
                        <div className="bg-gray-50 p-3 rounded">
                            <h4 className="font-semibold text-sm mb-2">Location Information</h4>
                            <InfoItem
                                icon={FaMapMarkerAlt}
                                label="Address"
                                value={user.address}
                            />
                            <InfoItem
                                icon={FaMapMarkerAlt}
                                label="City"
                                value={user.city}
                            />
                            <InfoItem
                                icon={FaMapMarkerAlt}
                                label="State"
                                value={user.state}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;