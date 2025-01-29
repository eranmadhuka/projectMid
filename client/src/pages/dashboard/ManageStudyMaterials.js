import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/Common/Layout/DashboardLayout";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Table from "../../components/Dashboard/ui/Table";
import { DateTime } from "luxon";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const ManageStudyMaterials = ({ role }) => {
    const [studyMaterials, setStudyMaterials] = useState([]);
    const [modules, setModules] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        module: "",
        moduleCode: "",
        file: null,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState(null);

    // Fetch study materials and modules from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studyMaterialsResponse, modulesResponse] = await Promise.all([
                    axios.get(`${API_URL}/api/study-materials`),
                    axios.get(`${API_URL}/api/modules`), // Fetch modules
                ]);
                setStudyMaterials(studyMaterialsResponse.data);
                setModules(modulesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data");
            }
        };
        fetchData();
    }, []);

    // Handle file upload
    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("module", formData.module);
        data.append("moduleCode", formData.moduleCode);
        if (formData.file) {
            data.append("file", formData.file);
        }

        try {
            if (isEditMode) {
                // Update existing material
                const response = await axios.put(
                    `${API_URL}/api/study-materials/${editingMaterial._id}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setStudyMaterials(
                    studyMaterials.map((material) =>
                        material._id === editingMaterial._id ? response.data : material
                    )
                );
                toast.success("Study material updated successfully");
            } else {
                // Add new material
                const response = await axios.post(`${API_URL}/api/study-materials`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setStudyMaterials([...studyMaterials, response.data]);
                toast.success("Study material added successfully");
            }

            // Reset form and close modal
            resetForm();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error submitting study material:", error);
            toast.error("Failed to submit study material");
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            module: "",
            moduleCode: "",
            file: null,
        });
        setIsEditMode(false);
        setEditingMaterial(null);
    };

    // Handle delete material
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this material?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${API_URL}/api/study-materials/${id}`);
            setStudyMaterials(studyMaterials.filter((material) => material._id !== id));
            toast.success("Study material deleted successfully");
        } catch (error) {
            console.error("Error deleting study material:", error);
            toast.error("Failed to delete study material");
        }
    };

    // Handle edit material
    const handleEdit = (material) => {
        setEditingMaterial(material);
        setFormData({
            title: material.title,
            description: material.description,
            module: material.module,
            moduleCode: material.moduleCode,
            file: null,
        });
        setIsModalOpen(true);
        setIsEditMode(true);
    };

    // Table columns
    const columns = [
        {
            header: "Title",
            accessorKey: "title",
            footer: "Title",
        },
        {
            header: "Description",
            accessorKey: "description",
            footer: "Description",
        },
        {
            header: "Module",
            accessorKey: "module",
            footer: "Module",
        },
        {
            header: "Module Code",
            accessorKey: "moduleCode",
            footer: "Module Code",
        },
        {
            header: "File",
            accessorKey: "file",
            footer: "File",
            cell: (info) => (
                <a
                    href={`${API_URL}/uploads/studyMaterials/${info.getValue()}`}
                    download
                    className="text-blue-600 hover:underline"
                >
                    Download
                </a>
            ),
        },
        {
            header: "Actions",
            accessorKey: "actions",
            footer: "Actions",
            cell: (info) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(info.row.original)}
                        className="bg-gray-200 hover:bg-blue-700 text-gray-500 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 font-bold p-2 rounded"
                    >
                        <MdEdit />
                    </button>
                    <button
                        onClick={() => handleDelete(info.row.original._id)}
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
                            { text: "Home", url: `/${role}/dashboard` },
                            { text: "Manage Study Materials", url: `/${role}/study-materials` },
                        ]}
                    />
                    <div className="flex items-center justify-between mt-5 flex-wrap">
                        <h1 className="text-xl font-semibold dark:text-gray-300">Manage Study Materials</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Add Material
                        </button>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 sm:w-3/4 lg:w-1/2">
                                <h2 className="text-lg font-semibold dark:text-gray-200">
                                    {isEditMode ? "Edit Material" : "Add Material"}
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium dark:text-gray-300">Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium dark:text-gray-300">
                                            Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium dark:text-gray-300">Module</label>
                                        <select
                                            className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            value={formData.module}
                                            onChange={(e) => {
                                                const selectedModule = modules.find((module) => module.moduleName === e.target.value);
                                                setFormData({
                                                    ...formData,
                                                    module: selectedModule.moduleName,
                                                    moduleCode: selectedModule.moduleCode,
                                                });
                                            }}
                                        >
                                            <option value="">Select Module</option>
                                            {modules.map((module) => (
                                                <option key={module._id} value={module.moduleName}>
                                                    {module.moduleName} ({module.moduleCode})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium dark:text-gray-300">File</label>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required={!isEditMode} // File is required only for new materials
                                        />
                                    </div>
                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                resetForm();
                                            }}
                                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            {isEditMode ? "Update" : "Save"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    <div className="relative my-4 p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm dark:bg-gray-800">
                        <Table
                            data={studyMaterials}
                            columns={columns}
                            title="Study Materials List"
                            placeholder="Search Study Materials"
                        />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default ManageStudyMaterials;