import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizLayout from '../../../components/Common/Layout/QuizLayout';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaFlag, FaExclamationTriangle } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

const QuizPage = () => {
    const { quizId, duration: durationParam } = useParams();
    const [questions, setQuestions] = useState([]);
    const [duration, setDuration] = useState(parseInt(durationParam, 10));
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timer, setTimer] = useState(() => {
        const savedTime = localStorage.getItem('quizTimer');
        return savedTime ? parseInt(savedTime, 10) : duration * 60;
    });
    const [answers, setAnswers] = useState({});
    const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
    const [isTimeUp, setIsTimeUp] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [totalMarks, setTotalMarks] = useState(0);

    // Fetch quiz data (questions) when the component mounts
    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/quizzes/${quizId}/questions`);
                setQuestions(response.data);
            } catch (err) {
                setError('Failed to load questions. Please try again.');
                console.error('Error fetching quiz data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [quizId]);

    // Timer logic
    useEffect(() => {
        if (loading) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    setIsTimeUp(true);
                    localStorage.removeItem('quizTimer');
                    handleSubmit();
                    return 0;
                }
                const newTime = prev - 1;
                localStorage.setItem('quizTimer', newTime);
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [loading]);

    // Handle answer selection
    const handleAnswerChange = (questionId, answer, type) => {
        if (type === 'checkbox') {
            setAnswers((prevAnswers) => {
                const currentAnswers = prevAnswers[questionId] || [];
                const updatedAnswers = currentAnswers.includes(answer)
                    ? currentAnswers.filter((a) => a !== answer)
                    : [...currentAnswers, answer];
                return { ...prevAnswers, [questionId]: updatedAnswers };
            });
        } else {
            setAnswers({ ...answers, [questionId]: answer });
        }
    };

    const toggleFlagQuestion = (questionIndex) => {
        const newFlagged = new Set(flaggedQuestions);
        if (newFlagged.has(questionIndex)) {
            newFlagged.delete(questionIndex);
        } else {
            newFlagged.add(questionIndex);
        }
        setFlaggedQuestions(newFlagged);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleNavigation = (index) => {
        setCurrentQuestionIndex(index);
    };

    const finishAttempt = () => {
        console.log('Finish Attempt', answers);
        localStorage.removeItem('quizTimer');
        navigate('/student/dashboard/results');
    };

    // Fetch total possible marks when the component mounts
    useEffect(() => {
        const fetchTotalMarks = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/quizzes/${quizId}/total-marks`);
                setTotalMarks(response.data.totalMarks);
            } catch (error) {
                console.error('Error fetching total marks:', error);
            }
        };

        fetchTotalMarks();
    }, [quizId]);

    // Calculate percentage
    const calculatePercentage = (studentMarks, totalMarks) => {
        if (totalMarks === 0) return 0;
        return ((studentMarks / totalMarks) * 100).toFixed(2);
    };

    // Handle quiz submission
    const handleSubmit = async () => {
        try {
            let studentMarks = 0;

            // Calculate total marks
            questions.forEach((question) => {
                const userAnswer = answers[question._id];

                if (question.type === 'checkbox') {
                    // For checkbox questions, compare arrays
                    if (
                        Array.isArray(userAnswer) &&
                        userAnswer.length === question.correctAnswers.length &&
                        userAnswer.every((answer) => question.correctAnswers.includes(answer))
                    ) {
                        studentMarks += question.marks;
                    }
                } else {
                    // For single answer questions, compare directly
                    if (userAnswer === question.correctAnswer) {
                        studentMarks += question.marks;
                    }
                }
            });

            const percentageMarks = calculatePercentage(studentMarks, totalMarks);

            const submitData = {
                quizId: quizId,
                answers: Object.keys(answers).map((questionId) => ({
                    question: questionId,
                    answer: answers[questionId],
                })),
                totalMarks: totalMarks,
                marks: {
                    totalMarks,
                    studentMarks,
                    percentageMarks,
                },
            };

            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/api/attempt/submit`, submitData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log('Attempt submitted successfully:', response.data);
                alert('Quiz submitted successfully!');
                localStorage.removeItem('quizTimer');
                navigate('/student/dashboard/results');
            } else {
                console.error('Failed to submit attempt:', response.data);
                alert('Failed to submit quiz. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('An error occurred while submitting the quiz. Please try again.');
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    if (loading) {
        return (
            <QuizLayout>
                <div className="flex justify-center items-center h-screen">
                    <p className="text-lg font-semibold">Loading quiz questions...</p>
                </div>
            </QuizLayout>
        );
    }

    if (!currentQuestion) {
        return (
            <QuizLayout>
                <div className="flex justify-center items-center h-screen">
                    <p className="text-lg font-semibold">No questions found for this quiz.</p>
                </div>
            </QuizLayout>
        );
    }

    return (
        <QuizLayout
            timer={formatTime(timer)}
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
        >
            {/* Header */}
            <div className="bg-blue-600 text-white py-3 px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-lg font-bold">Online Exams</h1>
                    <h2 className="text-md ml-3">Dashboard</h2>
                </div>
                <div className="flex items-center gap-4">
                    {/* <span>{user.name}</span> */}
                </div>
            </div>

            <div className="min-h-screen bg-gray-50 p-4">
                <div className="mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* Left sidebar - Question Info */}
                        <div className="lg:col-span-3 order-2 lg:order-1 bg-white rounded-lg shadow-sm">
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-4">Question Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-500">Marks</label>
                                        <p className="font-medium">{currentQuestion.marks} points</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Time Limit</label>
                                        <p className="font-medium">{currentQuestion.timeLimit}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Question Status</label>
                                        <p className="font-medium capitalize">
                                            {answers[currentQuestion._id] ? 'answered' : 'not_answered'}
                                        </p>
                                    </div>
                                    <button
                                        className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 
                                            ${flaggedQuestions.has(currentQuestionIndex)
                                                ? 'bg-red-500 text-white hover:bg-red-600'
                                                : 'border border-gray-300 hover:bg-gray-50'}`}
                                        onClick={() => toggleFlagQuestion(currentQuestionIndex)}
                                    >
                                        <FaExclamationTriangle className="w-4 h-4" />
                                        {flaggedQuestions.has(currentQuestionIndex) ? 'Unflag Question' : 'Flag for Review'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Center - Main Question Area */}
                        <div className="lg:col-span-6 order-1 lg:order-2 bg-white rounded-lg shadow-sm">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-xl font-semibold">
                                        Question {currentQuestionIndex + 1} of {questions.length}
                                    </h1>
                                    {flaggedQuestions.has(currentQuestionIndex) && (
                                        <div className="flex items-center text-red-500">
                                            <FaExclamationTriangle className="w-4 h-4 mr-1" />
                                            <span className="text-sm">Flagged for review</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <p className="text-lg">{currentQuestion.text}</p>

                                    <div className="mt-6 space-y-4">
                                        {currentQuestion?.type === 'checkbox' ? (
                                            // Checkbox Question
                                            <div className="space-y-3">
                                                {currentQuestion?.options?.map((option, index) => (
                                                    <div
                                                        key={index}
                                                        className={`p-4 border rounded-lg cursor-pointer transition-all
                        ${answers[currentQuestion._id]?.includes(index)
                                                                ? 'bg-blue-50 border-blue-500'
                                                                : 'bg-white border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        onClick={() => handleAnswerChange(currentQuestion._id, index, 'checkbox')}
                                                    >
                                                        <div className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                id={`option-${index}`}
                                                                name={`question-${currentQuestion._id}`}
                                                                value={option}
                                                                checked={answers[currentQuestion._id]?.includes(index)}
                                                                className="hidden"
                                                                onChange={() => handleAnswerChange(currentQuestion._id, index, 'checkbox')}
                                                            />
                                                            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center mr-3
                            ${answers[currentQuestion._id]?.includes(index)
                                                                    ? 'bg-blue-500 border-blue-500'
                                                                    : 'bg-white border-gray-400'
                                                                }`}
                                                            >
                                                                {answers[currentQuestion._id]?.includes(index) && (
                                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <label htmlFor={`option-${index}`} className="text-gray-700 cursor-pointer">
                                                                {option}
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            // Multiple-Choice Question
                                            <div className="space-y-3">
                                                {currentQuestion?.options?.map((option, index) => (
                                                    <div
                                                        key={index}
                                                        className={`p-4 border rounded-lg cursor-pointer transition-all
                        ${answers[currentQuestion._id] === index
                                                                ? 'bg-blue-50 border-blue-500'
                                                                : 'bg-white border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        onClick={() => handleAnswerChange(currentQuestion._id, index, 'multiple-choice')}
                                                    >
                                                        <div className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                id={`option-${index}`}
                                                                name={`question-${currentQuestion._id}`}
                                                                value={option}
                                                                checked={answers[currentQuestion._id] === index}
                                                                className="hidden"
                                                                onChange={() => handleAnswerChange(currentQuestion._id, index, 'multiple-choice')}
                                                            />
                                                            <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3
                            ${answers[currentQuestion._id] === index
                                                                    ? 'border-blue-500'
                                                                    : 'border-gray-400'
                                                                }`}
                                                            >
                                                                {answers[currentQuestion._id] === index && (
                                                                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                                                                )}
                                                            </div>
                                                            <label htmlFor={`option-${index}`} className="text-gray-700 cursor-pointer">
                                                                {option}
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button
                                            className={`flex items-center px-4 py-2 rounded-md border
                                                ${currentQuestionIndex === 0
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'hover:bg-gray-50'}`}
                                            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                                            disabled={currentQuestionIndex === 0}
                                        >
                                            <FaChevronLeft className="w-4 h-4 mr-2" />
                                            Previous
                                        </button>
                                        {currentQuestionIndex === questions.length - 1 ? (
                                            <button
                                                className="flex items-center px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                                <FaChevronRight className="w-4 h-4 ml-2" />
                                            </button>
                                        ) : (
                                            <button
                                                className={`flex items-center px-4 py-2 rounded-md bg-blue-500 text-white
                                                    ${currentQuestionIndex === questions.length - 1
                                                        ? 'bg-gray-400 cursor-not-allowed'
                                                        : 'hover:bg-blue-600'}`}
                                                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                                                disabled={currentQuestionIndex === questions.length - 1}
                                            >
                                                Next
                                                <FaChevronRight className="w-4 h-4 ml-2" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right sidebar - Navigation */}
                        <div className="lg:col-span-3 order-3 bg-white rounded-lg shadow-sm">
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-4">Quiz Navigation</h2>

                                {/* Add Timer Display */}
                                <div className="mb-4">
                                    <label className="text-sm text-gray-500">Time Remaining</label>
                                    <p className="font-medium text-lg">{formatTime(timer)}</p>
                                </div>

                                <div className="grid grid-cols-4 gap-2 mb-6">
                                    {questions.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`w-full p-2 rounded-md relative
                                                ${currentQuestionIndex === index
                                                    ? 'bg-blue-500 text-white'
                                                    : 'border hover:bg-gray-50'}
                                                ${flaggedQuestions.has(index) ? 'border-red-500' : 'border-gray-300'}`}
                                            onClick={() => handleNavigation(index)}
                                        >
                                            {flaggedQuestions.has(index) && (
                                                <FaExclamationTriangle className="w-3 h-3 absolute -top-1 -right-1 text-red-500" />
                                            )}
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm text-gray-500 mb-2">
                                        {flaggedQuestions.size} question(s) flagged for review
                                    </div>
                                    <button
                                        className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center gap-2"
                                        onClick={finishAttempt}
                                    >
                                        <FaFlag className="w-4 h-4" />
                                        Finish Attempt
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Time Up Modal */}
            {isTimeUp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <h2 className="text-lg font-bold mb-4">Time's Up!</h2>
                        <p className="mb-4">The quiz time is over. Your answers have been submitted.</p>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() => {
                                localStorage.removeItem('quizTimer');
                                navigate('/student/dashboard/results');
                            }}
                        >
                            View Results
                        </button>
                    </div>
                </div>
            )}
        </QuizLayout>
    );
};

export default QuizPage;