import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from "../../components/ui/Breadcrumb";
import DashboardLayout from "../../components/Common/Layout/DashboardLayout";
const API_URL = process.env.REACT_APP_API_URL;

const QuizAdd = ({ onClose }) => {
    const [faculties, setFaculties] = useState([]);
    const [modules, setModules] = useState([]);
    const [newQuiz, setNewQuiz] = useState({
        title: "",
        description: "",
        faculty: "",
        module: "",
        duration: "",
    });

    // Fetch faculties on component mount
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

    // Fetch modules for the selected faculty
    const fetchModules = async (facultyId) => {
        try {
            const response = await axios.get(`${API_URL}/api/modules/faculty/${facultyId}`);
            setModules(response.data);
        } catch (error) {
            console.error("Error fetching modules:", error);
            toast.error("Failed to fetch modules");
        }
    };

    // Handle faculty selection
    const handleFacultyChange = (e) => {
        const facultyId = e.target.value;
        setNewQuiz({ ...newQuiz, faculty: facultyId, module: "" });
        fetchModules(facultyId); // Fetch modules for the selected faculty
    };

    // Handle form submission (add quiz)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/quizzes`, newQuiz);
            toast.success("Quiz added successfully");

            // Reset form and close modal
            setNewQuiz({
                title: "",
                description: "",
                faculty: "",
                module: "",
                duration: "",
            });
            onClose(); // Close the form

        } catch (error) {
            console.error("Error submitting quiz:", error);
            toast.error("Failed to submit quiz");
        }
    };

    return (
        <>
            <ToastContainer />
            <DashboardLayout>
                <div>
                    <Breadcrumb
                        links={[
                            { text: "Home", url: "/dashboard" },
                            { text: "Add Quiz" },
                        ]}
                    />
                    <div className="flex justify-between items-center">
                        <h1 className="text-gray-800 font-semibold text-2xl dark:text-gray-300 mt-5">
                            Add Quiz
                        </h1>
                    </div>

                    <div className="relative my-4 p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={newQuiz.title}
                                    onChange={(e) =>
                                        setNewQuiz({ ...newQuiz, title: e.target.value })
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
                                    value={newQuiz.description}
                                    onChange={(e) =>
                                        setNewQuiz({ ...newQuiz, description: e.target.value })
                                    }
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                    Faculty
                                </label>
                                <select
                                    value={newQuiz.faculty}
                                    onChange={handleFacultyChange}
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
                                    Module
                                </label>
                                <select
                                    value={newQuiz.module}
                                    onChange={(e) =>
                                        setNewQuiz({ ...newQuiz, module: e.target.value })
                                    }
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    required
                                    disabled={!newQuiz.faculty}
                                >
                                    <option value="">Select Module</option>
                                    {modules.map((module) => (
                                        <option key={module._id} value={module._id}>
                                            {module.moduleName} ({module.moduleCode})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                    Duration (mins)
                                </label>
                                <input
                                    type="number"
                                    value={newQuiz.duration}
                                    onChange={(e) =>
                                        setNewQuiz({ ...newQuiz, duration: e.target.value })
                                    }
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Add Quiz
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default QuizAdd;