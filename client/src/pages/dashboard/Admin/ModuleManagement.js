import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import Breadcrumb from "../../../components/ui/Breadcrumb";
import Table from "../../../components/Dashboard/ui/Table";
import DashboardLayout from "../../../components/Common/Layout/DashboardLayout";

const ModuleManagement = () => {
    const [modules, setModules] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newModule, setNewModule] = useState({
        facultyId: "",
        year: "",
        moduleName: "",
        moduleCode: "",
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    const [faculties, setFaculties] = useState([]);

    // Fetch all modules and faculties on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const facultiesResponse = await axios.get("http://localhost:5000/api/faculties");
                setFaculties(facultiesResponse.data);

                const modulesResponse = await axios.get("http://localhost:5000/api/modules");
                setModules(modulesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data");
            }
        };
        fetchData();
    }, []);

    // Handle delete module with confirmation
    const handleDeleteModule = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this module?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/modules/${id}`);
            setModules(modules.filter((module) => module._id !== id));
            toast.success("Module deleted successfully");
        } catch (error) {
            console.error("Error deleting module:", error);
            toast.error("Failed to delete module");
        }
    };

    // Handle edit module
    const handleEditModule = (module) => {
        setEditingModule(module);
        setNewModule({
            facultyId: module.faculty._id,
            year: module.year,
            moduleName: module.moduleName,
            moduleCode: module.moduleCode,
        });
        setIsModalOpen(true);
        setIsEditMode(true);
    };

    // Handle add module
    const handleAddModule = () => {
        setIsModalOpen(true);
    };

    // Handle form submission (add or update module)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                // Update existing module
                const response = await axios.put(
                    `http://localhost:5000/api/modules/${editingModule._id}`,
                    newModule
                );
                setModules(
                    modules.map((module) =>
                        module._id === editingModule._id ? response.data : module
                    )
                );
                toast.success("Module updated successfully");
            } else {
                const response = await axios.post("http://localhost:5000/api/modules", newModule);

                setModules([...modules, response.data]);
                toast.success("Module added successfully");
            }

            // Reset form and close modal
            setNewModule({
                facultyId: "",
                year: "",
                moduleName: "",
                moduleCode: "",
            });
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditingModule(null);
        } catch (error) {
            console.error("Error submitting module:", error);
            toast.error("Failed to submit module");
        }
    };

    // Table columns
    const columns = [
        {
            header: "Faculty",
            accessorKey: "faculty.name",
            footer: "Faculty",
        },
        {
            header: "Year",
            accessorKey: "year",
            footer: "Year",
        },
        {
            header: "Module Name",
            accessorKey: "moduleName",
            footer: "Module Name",
        },
        {
            header: "Module Code",
            accessorKey: "moduleCode",
            footer: "Module Code",
        },
        {
            header: "Actions",
            accessorKey: "actions",
            footer: "Actions",
            cell: (info) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEditModule(info.row.original)}
                        className="bg-gray-200 hover:bg-blue-700 text-gray-500 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 font-bold p-2 rounded"
                    >
                        <RiEdit2Fill />
                    </button>
                    <button
                        onClick={() => handleDeleteModule(info.row.original._id)}
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
                            { text: "Module Management" },
                        ]}
                    />
                    <div className="flex justify-between items-center">
                        <h1 className="text-gray-800 font-semibold text-2xl dark:text-gray-300 mt-5">
                            Module Management
                        </h1>
                        <button
                            onClick={handleAddModule}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Add Module
                        </button>
                    </div>

                    <div className="relative my-4 p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800">
                        <Table
                            data={modules}
                            columns={columns}
                            title="Modules List"
                            placeholder="Search Modules"
                        />
                    </div>
                </div>

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96">
                            <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">
                                {isEditMode ? "Edit Module" : "Add New Module"}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                        Faculty
                                    </label>
                                    <select
                                        value={newModule.facultyId}
                                        onChange={(e) =>
                                            setNewModule({ ...newModule, facultyId: e.target.value })
                                        }
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                        required
                                    >
                                        <option value="">Select Faculty</option>
                                        {faculties.map((faculty) => (
                                            <option key={faculty._id} value={faculty._id}>
                                                {faculty.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                        Year
                                    </label>
                                    <select
                                        value={newModule.year}
                                        onChange={(e) =>
                                            setNewModule({ ...newModule, year: e.target.value })
                                        }
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                        required
                                    >
                                        <option value="">Select Year</option>
                                        <option value="Year 1">Year 1</option>
                                        <option value="Year 2">Year 2</option>
                                        <option value="Year 3">Year 3</option>
                                        <option value="Year 4">Year 4</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                        Module Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newModule.moduleName}
                                        onChange={(e) =>
                                            setNewModule({ ...newModule, moduleName: e.target.value })
                                        }
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                        Module Code
                                    </label>
                                    <input
                                        type="text"
                                        value={newModule.moduleCode}
                                        onChange={(e) =>
                                            setNewModule({ ...newModule, moduleCode: e.target.value })
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
                                            setEditingModule(null);
                                            setNewModule({
                                                faculty: "",
                                                year: "",
                                                moduleName: "",
                                                moduleCode: "",
                                            });
                                        }}
                                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        {isEditMode ? "Update Module" : "Add Module"}
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

export default ModuleManagement;