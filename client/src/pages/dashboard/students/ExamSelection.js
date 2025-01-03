import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout';
import Breadcrumb from '../../../components/ui/Breadcrumb';

const ExamSelection = () => {
    const [faculties, setFaculties] = useState([]);
    const [years] = useState(['Year 1', 'Year 2', 'Year 3', 'Year 4']);
    const [modules, setModules] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedQuiz, setSelectedQuiz] = useState(null); // New state for selected quiz
    const [showInstructions, setShowInstructions] = useState(false);
    const [agreedToRules, setAgreedToRules] = useState(false);
    const [step, setStep] = useState(1); // Tracks the current step
    const navigate = useNavigate();

    // Fetch faculties on component mount
    useEffect(() => {
        // Replace with your actual API call
        setFaculties([
            { id: 1, name: 'Faculty of Computing' },
            { id: 2, name: 'Faculty of Engineering' }
        ]);
    }, []);

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
        setModules([
            { id: 1, name: 'Programming Fundamentals' },
            { id: 2, name: 'Database Systems' }
        ]);
        setSelectedModule(null);
    };

    const handleModuleSelect = (module) => {
        setSelectedModule(module);
        setStep(4); // Move to Quiz Selection
        // Fetch quizzes for the selected module (replace with actual API call)
        setQuizzes([
            { id: 1, name: 'Quiz 1: Basics' },
            { id: 2, name: 'Quiz 2: Advanced Concepts' }
        ]);
        setSelectedQuiz(null);
    };

    const handleQuizSelect = (quiz) => {
        setSelectedQuiz(quiz);
        setShowInstructions(true); // Show instructions popup when a quiz is selected
    };

    const confirmStartExam = () => {
        console.log(
            `Starting exam for Faculty: ${selectedFaculty.name}, Year: ${selectedYear}, Module: ${selectedModule.name}, Quiz: ${selectedQuiz.name}`
        );
        navigate(`/student/dashboard/exam/quiz/${selectedFaculty.id}/${selectedYear}/${selectedModule.id}/${selectedQuiz.id}`);
        // navigate(`/student/quiz`);
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
            <main className='bg-gray-50 dark:bg-gray-900 px-3 md:px-8 h-auto min-h-screen'>
                <div className='px-10 mb-5 pt-5 sm:px-5'>
                    <Breadcrumb
                        links={[
                            { text: 'Home', url: '/' }
                        ]}
                    />
                    <h1 className='text-customDark font-semibold text-2xl dark:text-gray-400 mt-5'>Select Exam Details</h1>
                    <p className='text-customGray text-sm'>Select Exam Details</p>
                </div>

                {/* Faculty Selection */}
                {step === 1 && (
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-2">Select Faculty</h3>
                        <div className="space-y-2">
                            {faculties.map((faculty) => (
                                <button
                                    key={faculty.id}
                                    onClick={() => handleFacultySelect(faculty)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200
                                ${selectedFaculty?.id === faculty.id ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    {faculty.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Year Selection */}
                {step === 2 && (
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-2">Select Year</h3>
                        <div className="space-y-2">
                            {years.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => handleYearSelect(year)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200
                                ${selectedYear === year ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    {year}
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
                        <h3 className="text-xl font-semibold mb-2">Select Module</h3>
                        <div className="space-y-2">
                            {modules.map((module) => (
                                <button
                                    key={module.id}
                                    onClick={() => handleModuleSelect(module)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200
                                ${selectedModule?.id === module.id ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    {module.name}
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
                        <h3 className="text-xl font-semibold mb-2">Available Quizzes</h3>
                        <div className="space-y-2">
                            {quizzes.map((quiz) => (
                                <button
                                    key={quiz.id}
                                    onClick={() => handleQuizSelect(quiz)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200
                                ${selectedQuiz?.id === quiz.id ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    {quiz.name}
                                </button>
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

            </main>
        </DashboardLayout>
    );
};

export default ExamSelection;
