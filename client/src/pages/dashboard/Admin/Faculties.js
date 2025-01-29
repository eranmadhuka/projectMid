import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import Breadcrumb from "../../../components/ui/Breadcrumb";
import Table from "../../../components/Dashboard/ui/Table";
import DashboardLayout from "../../../components/Common/Layout/DashboardLayout";
const API_URL = process.env.REACT_APP_API_URL;

const Faculties = () => {
    const [faculties, setFaculties] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFaculty, setNewFaculty] = useState({
        name: "",
        description: "",
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingFaculty, setEditingFaculty] = useState(null);

    // Fetch all faculties on component mount
    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/faculties`);
                setFaculties(response.data);
            } catch (error) {
                console.error("Error fetching faculties:", error);
                toast.error("Failed to fetch faculties");
            }
        };
        fetchFaculties();
    }, []);

    // Handle delete faculty with confirmation
    const handleDeleteFaculty = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this faculty?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${API_URL}/api/faculties/${id}`);
            setFaculties(faculties.filter((faculty) => faculty._id !== id));
            toast.success("Faculty deleted successfully");
        } catch (error) {
            console.error("Error deleting faculty:", error);
            toast.error("Failed to delete faculty");
        }
    };

    // Handle edit faculty
    const handleEditFaculty = (faculty) => {
        setEditingFaculty(faculty);
        setNewFaculty({
            name: faculty.name,
            description: faculty.description,
        });
        setIsModalOpen(true);
        setIsEditMode(true);
    };

    // Handle add faculty
    const handleAddFaculty = () => {
        setIsModalOpen(true);
    };

    // Handle form submission (add or update faculty)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                // Update existing faculty
                const response = await axios.put(
                    `${API_URL}/api/faculties/${editingFaculty._id}`,
                    newFaculty
                );
                setFaculties(
                    faculties.map((faculty) =>
                        faculty._id === editingFaculty._id ? response.data : faculty
                    )
                );
                toast.success("Faculty updated successfully");
            } else {
                // Add new faculty
                const response = await axios.post(`${API_URL}/api/faculties`, newFaculty);
                setFaculties([...faculties, response.data]);
                toast.success("Faculty added successfully");
            }

            // Reset form and close modal
            setNewFaculty({ name: "", description: "" });
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditingFaculty(null);
        } catch (error) {
            console.error("Error submitting faculty:", error);
            toast.error("Failed to submit faculty");
        }
    };

    // Table columns
    const columns = [
        {
            header: "Name",
            accessorKey: "name",
            footer: "Name",
        },
        {
            header: "Description",
            accessorKey: "description",
            footer: "Description",
        },
        {
            header: "Actions",
            accessorKey: "actions",
            footer: "Actions",
            cell: (info) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEditFaculty(info.row.original)}
                        className="bg-gray-200 hover:bg-blue-700 text-gray-500 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 font-bold p-2 rounded"
                    >
                        <RiEdit2Fill />
                    </button>
                    <button
                        onClick={() => handleDeleteFaculty(info.row.original._id)}
                        className="bg-gray-200 hover:bg-red-700 text-gray-500 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 font-bold p-2 rounded"
                    >
                        <MdDeleteForever />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <ToastContainer />
            <DashboardLayout>
                <div>
                    <Breadcrumb
                        links={[
                            { text: "Home", url: "/dashboard" },
                            { text: "Faculties" },
                        ]}
                    />
                    <div className="flex justify-between items-center">
                        <h1 className="text-gray-800 font-semibold text-2xl dark:text-gray-300 mt-5">
                            Faculty Management
                        </h1>
                        <button
                            onClick={handleAddFaculty}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Add Faculty
                        </button>
                    </div>

                    <div className="relative my-4 p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800">
                        <Table
                            data={faculties}
                            columns={columns}
                            title="Faculties List"
                            placeholder="Search Faculties"
                        />
                    </div>
                </div>

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96">
                            <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">
                                {isEditMode ? "Edit Faculty" : "Add New Faculty"}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newFaculty.name}
                                        onChange={(e) =>
                                            setNewFaculty({ ...newFaculty, name: e.target.value })
                                        }
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={newFaculty.description}
                                        onChange={(e) =>
                                            setNewFaculty({ ...newFaculty, description: e.target.value })
                                        }
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setIsEditMode(false);
                                            setEditingFaculty(null);
                                            setNewFaculty({ name: "", description: "" });
                                        }}
                                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        {isEditMode ? "Update Faculty" : "Add Faculty"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </DashboardLayout>
        </>
    );
};

export default Faculties;