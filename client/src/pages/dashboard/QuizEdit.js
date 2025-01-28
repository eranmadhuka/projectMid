import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from "../../components/ui/Breadcrumb";
import DashboardLayout from "../../components/Common/Layout/DashboardLayout";

const QuizEdit = () => {
    const [faculties, setFaculties] = useState([]);
    const [modules, setModules] = useState([]);

    const { quizId } = useParams(); // Get quizId from URL
    const navigate = useNavigate(); // Hook for navigation
    const [quiz, setQuiz] = useState({
        title: "",
        description: "",
        faculty: "",
        module: "",
        duration: "",
    });

    // Fetch quiz data on component mount
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`);
                const quizData = response.data;

                // Set the quiz state with fetched data
                setQuiz({
                    title: quizData.title,
                    description: quizData.description,
                    faculty: quizData.faculty?._id || "", // Ensure faculty ID is set
                    module: quizData.module?._id || "", // Ensure module ID is set
                    duration: quizData.duration,
                });

                // Fetch modules for the selected faculty (if faculty exists)
                if (quizData.faculty?._id) {
                    fetchModules(quizData.faculty._id);
                }
            } catch (error) {
                console.error("Error fetching quiz:", error);
                toast.error("Failed to fetch quiz");
            }
        };
        fetchQuiz();
    }, [quizId]);

    // Fetch faculties on component mount
    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/faculties");
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
            const response = await axios.get(`http://localhost:5000/api/modules/faculty/${facultyId}`);
            setModules(response.data);
        } catch (error) {
            console.error("Error fetching modules:", error);
            toast.error("Failed to fetch modules");
        }
    };

    // Handle faculty selection
    const handleFacultyChange = (e) => {
        const facultyId = e.target.value;
        setQuiz({ ...quiz, faculty: facultyId, module: "" }); // Reset module when faculty changes
        fetchModules(facultyId); // Fetch modules for the selected faculty
    };

    // Handle module selection
    const handleModuleChange = (e) => {
        const moduleId = e.target.value;
        setQuiz({ ...quiz, module: moduleId });
    };

    // Handle form submission (update quiz)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/api/quizzes/${quizId}`,
                quiz
            );
            toast.success("Quiz updated successfully");
            navigate("/admin/dashboard/quizzes"); // Redirect to quiz list after update
        } catch (error) {
            console.error("Error updating quiz:", error);
            toast.error("Failed to update quiz");
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
                            { text: "Edit Quiz" },
                        ]}
                    />
                    <div className="flex justify-between items-center">
                        <h1 className="text-gray-800 font-semibold text-2xl dark:text-gray-300 mt-5">
                            Edit Quiz
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
                                    value={quiz.title}
                                    onChange={(e) =>
                                        setQuiz({ ...quiz, title: e.target.value })
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
                                    value={quiz.description}
                                    onChange={(e) =>
                                        setQuiz({ ...quiz, description: e.target.value })
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
                                    value={quiz.faculty}
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
                                    value={quiz.module}
                                    onChange={handleModuleChange}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    required
                                    disabled={!quiz.faculty}
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
                                    value={quiz.duration}
                                    onChange={(e) =>
                                        setQuiz({ ...quiz, duration: e.target.value })
                                    }
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/dashboard/quizzes")} // Redirect to quiz list
                                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Update Quiz
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default QuizEdit;