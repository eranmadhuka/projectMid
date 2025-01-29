import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import { FaArrowRight } from "react-icons/fa";

const ExamSelection = () => {
    const [faculties, setFaculties] = useState([]);
    const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
    const [modules, setModules] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showInstructions, setShowInstructions] = useState(false);
    const [agreedToRules, setAgreedToRules] = useState(false);
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    // Fetch faculties on component mount
    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/faculties');
                setFaculties(response.data);
            } catch (err) {
                console.error('Error fetching faculties:', err);
            }
        };
        fetchFaculties();
    }, []);

    // Fetch modules when a year is selected
    useEffect(() => {
        if (selectedYear && selectedFaculty) {
            const fetchModules = async () => {
                try {
                    // Convert the selected year to the format stored in the database
                    const yearString = `${selectedYear}`; // e.g., "1 Year", "2 Year", etc.
                    const response = await axios.get(
                        `http://localhost:5000/api/modules/faculty/${selectedFaculty._id}/year/${yearString}`
                    );
                    setModules(response.data);
                } catch (err) {
                    console.error('Error fetching modules:', err);
                }
            };
            fetchModules();
        }
    }, [selectedYear, selectedFaculty]);

    // Fetch quizzes when a module is selected
    useEffect(() => {
        if (selectedModule) {
            const fetchQuizzes = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/quizzes/module/${selectedModule._id}`);
                    setQuizzes(response.data);
                } catch (err) {
                    console.error('Error fetching quizzes:', err);
                }
            };
            fetchQuizzes();
        }
    }, [selectedModule]);

    const handleFacultySelect = (faculty) => {
        setSelectedFaculty(faculty);
        setStep(2); // Move to Year Selection
        setModules([]);
        setSelectedYear(null);
        setSelectedModule(null);
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setStep(3); // Move to Module Selection
        setSelectedModule(null);
    };

    const handleModuleSelect = (module) => {
        setSelectedModule(module);
        setStep(4); // Move to Quiz Selection
        setSelectedQuiz(null);
    };

    const handleQuizSelect = (quiz) => {
        setSelectedQuiz(quiz);
        setShowInstructions(true); // Show instructions popup when a quiz is selected
    };

    const confirmStartExam = () => {
        navigate(`/student/dashboard/exam/quiz/${selectedQuiz._id}/${selectedQuiz.duration}`);
    };

    const goBack = () => {
        if (step === 4) {
            setStep(3); // Go back to Module Selection
            setSelectedQuiz(null);
        } else if (step === 3) {
            setStep(2); // Go back to Year Selection
            setSelectedModule(null);
        } else if (step === 2) {
            setStep(1); // Go back to Faculty Selection
            setSelectedYear(null);
        }
    };

    return (
        <DashboardLayout>
            <div>
                <Breadcrumb
                    links={[
                        { text: 'Home', url: '/' }
                    ]}
                />
            </div>

            <h1 className='text-customDark font-semibold text-2xl dark:text-gray-300 mt-5'>Select Exam Details</h1>
            <p className='text-customGray text-sm mb-6 dark:text-gray-300 mt-5'>Select Exam Details</p>

            {/* Faculty Selection */}
            {step === 1 && (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-customDark dark:text-gray-300">Select Faculty</h2>
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4 text-start">
                        {faculties.map((faculty) => (
                            <button
                                key={faculty.id}
                                onClick={() => handleFacultySelect(faculty)}
                                className={`flex items-center text-start justify-between p-4 rounded-lg transition-colors duration-200
                                ${selectedFaculty?._id === faculty.id ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                            >
                                <span className="font-medium">{faculty.name}</span>
                                <span className="material-icons"><FaArrowRight /></span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Year Selection */}
            {step === 2 && (
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-300">Select Year</h3>
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => handleYearSelect(year)}
                                className={`flex items-center text-start justify-between p-4 rounded-lg transition-colors duration-200
                                ${selectedYear === parseInt(year.split(' ')[1], 10) ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                            >
                                <span className="font-medium">{year}</span>
                                <span className="material-icons"><FaArrowRight /></span>
                            </button>
                        ))}
                    </div>
                    <button onClick={goBack} className="mt-4 text-blue-600 hover:text-blue-800">
                        &larr; Back
                    </button>
                </div>
            )}

            {/* Module Selection */}
            {step === 3 && (
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-300">Select Module</h3>
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
                        {modules.map((module) => (
                            <button
                                key={module.id}
                                onClick={() => handleModuleSelect(module)}
                                className={`flex items-center text-start justify-between p-4 rounded-lg transition-colors duration-200
                                ${selectedModule?.id === module.id ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                            >
                                <span className="font-medium">{module.moduleName}</span>
                                <span className="material-icons"><FaArrowRight /></span>
                            </button>
                        ))}
                    </div>
                    <button onClick={goBack} className="mt-4 text-blue-600 hover:text-blue-800">
                        &larr; Back
                    </button>
                </div>
            )}

            {/* Quiz Selection */}
            {step === 4 && (
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-300">Available Quizzes</h3>
                    <div className="space-y-2">
                        {quizzes.map((quiz) => (
                            <div key={quiz.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-customDark dark:text-gray-300">{quiz.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400">Duration: {quiz.duration} min</p>
                                <p className="text-gray-600 dark:text-gray-400">Questions: {quiz.questions.length}</p>
                                <button
                                    onClick={() => handleQuizSelect(quiz)}
                                    className={`mt-3 w-full text-left p-3 rounded-lg transition-colors duration-200
                                    ${selectedQuiz?.id === quiz.id ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    Select Quiz
                                </button>
                            </div>
                        ))}
                    </div>
                    <button onClick={goBack} className="mt-4 text-blue-600 hover:text-blue-800">
                        &larr; Back
                    </button>
                </div>
            )}

            {/* Instructions Popup */}
            {showInstructions && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4 text-center dark:text-gray-200">Exam Instructions</h2>
                        <div className="instructions-popup">
                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                                Please read the following instructions carefully before starting the exam:
                            </p>
                            <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Ensure you have a stable and reliable internet connection.</li>
                                <li>Read each question thoroughly before answering.</li>
                                <li>Track your time carefully; the timer will not pause.</li>
                                <li>Avoid refreshing the page during the exam.</li>
                                <li>Submit your answers before the timer runs out.</li>
                            </ul>
                            <div className="flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    checked={agreedToRules}
                                    onChange={() => setAgreedToRules(!agreedToRules)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                    I have read and agree to the exam rules and regulations.
                                </label>
                            </div>
                            <div className="mt-6 flex justify-between">
                                <button
                                    onClick={confirmStartExam}
                                    disabled={!agreedToRules}
                                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 ${!agreedToRules ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Start Exam
                                </button>
                                <button
                                    onClick={() => setShowInstructions(false)}
                                    className="w-full ml-4 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg font-medium transition duration-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default ExamSelection;