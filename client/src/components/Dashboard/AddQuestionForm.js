import React, { useState, useEffect } from 'react';

import categories from '../../CATEGORIES.json';

const AddQuestionForm = () => {
    const [selectedMainCategory, setSelectedMainCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);

    const [questionData, setQuestionData] = useState({
        type: 'boolean', // Type for checkbox-type question
        difficulty: 'easy',
        question: '',
        answers: ['', '', '', ''], // Array to store the answers
        correct_answers: [], // Array to hold indices of correct answers
        correct_answer: [],
        category: {
            faculty: '',
            Year: '',
            Module: '',
        },
    });

    const handleMainCategorySelect = (category) => {
        setSelectedMainCategory(category);
        setSelectedSubCategory(null);
        setSelectedModule(null);
        setQuestionData({ ...questionData, category: { faculty: category.name } });
    };

    const handleSubCategorySelect = (subcategory) => {
        setSelectedSubCategory(subcategory);
        setSelectedModule(null);
        setQuestionData({
            ...questionData,
            category: {
                faculty: selectedMainCategory.name,
                Year: subcategory.name,
            },
        });
    };

    const handleModuleSelect = (module) => {
        setSelectedModule(module);
        setQuestionData({
            ...questionData,
            category: {
                faculty: selectedMainCategory.name,
                Year: selectedSubCategory.name,
                Module: module.name,
            },
        });
    };

    // Function to handle input changes for each answer field
    const handleAnswerInputChange = (e, index) => {
        const { value } = e.target;
        const updatedAnswers = [...questionData.answers];
        updatedAnswers[index] = value;
        setQuestionData({ ...questionData, answers: updatedAnswers });
    };

    // Function to handle the selection of the correct answer
    const handleCorrectAnswerChange = (e) => {
        const { value } = e.target;
        setQuestionData({ ...questionData, correct_answer: value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuestionData({ ...questionData, [name]: value });
    };

    const handleAnswerChange = (index, isChecked) => {
        let updatedCorrectAnswers = [...questionData.correct_answers];

        if (isChecked) {
            updatedCorrectAnswers.push(index);
        } else {
            updatedCorrectAnswers = updatedCorrectAnswers.filter((item) => item !== index);
        }

        setQuestionData({ ...questionData, correct_answers: updatedCorrectAnswers });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Submitted Question:', questionData);
        // Reset form fields after submission
        setQuestionData({
            type: 'boolean',
            difficulty: 'easy',
            question: '',
            answers: [],
            correct_answers: [],
        });
    };

    return (
        <>
            <h3 className="mb-3text-md font-semibold text-gray-900 dark:text-white">Select Faculty:</h3>
            <ul className="grid w-full gap-6 md:grid-cols-3">
                {categories.map((category) => (
                    <li key={category.id}>
                        <input
                            type="radio"
                            name='MainCategory'
                            value={category.name}
                            className="hidden peer"
                            id={category.name}
                            required
                        />
                        <label
                            for={category.name}
                            className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                            onClick={() => handleMainCategorySelect(category)}
                        >
                            <div className="block">
                                {category.name}
                            </div>
                        </label>
                    </li>
                ))}
            </ul>

            {selectedMainCategory && (
                <div className='mt-5'>
                    <h3 className="mb-3 text-md font-semibold text-gray-900 dark:text-white">Select Year:</h3>
                    <ul className="grid w-full gap-6 md:grid-cols-4">
                        {selectedMainCategory.children &&
                            selectedMainCategory.children.map((subcategory) => (
                                <li key={subcategory.id}>
                                    <input
                                        type="radio"
                                        name='subCategory'
                                        className="hidden peer"
                                        id={subcategory.name}
                                        required
                                    />
                                    <label
                                        htmlFor={subcategory.name}
                                        className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                        onClick={() => handleSubCategorySelect(subcategory)}
                                    >
                                        <div className="block">
                                            {subcategory.name}
                                        </div>
                                    </label>
                                </li>
                            ))}

                    </ul>
                </div>
            )}

            {selectedSubCategory && (
                <div className='mt-5'>
                    <h3 className="mb-3 text-md font-semibold text-gray-900 dark:text-white">Select Module:</h3>
                    {/* Module select */}
                    <select
                        onChange={handleModuleSelect}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Select Module</option>
                        {categories
                            .find(category => category.id === selectedMainCategory.id)
                            .children.find(subcategory => subcategory.id === selectedSubCategory.id)
                            .children.map((module) => (
                                <option key={module.id} value={module.name}>
                                    {module.name}
                                </option>
                            ))}
                    </select>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className='mt-5'>
                    <label
                        htmlFor="type"
                        className="mb-3 text-md font-semibold text-gray-900 dark:text-white"
                    >
                        Type:
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={questionData.type}
                        onChange={(e) => handleInputChange(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="boolean">True / False</option>
                        <option value="multipleChoice">Multiple Choice</option>
                        <option value="checkbox">Checkbox Choice</option>
                    </select>
                </div>
                <div className='mt-5'>
                    <label
                        htmlFor="difficulty"
                        className="mb-3 text-md font-semibold text-gray-900 dark:text-white"
                    >
                        Difficulty:
                    </label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={questionData.difficulty}
                        onChange={(e) => handleInputChange(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className='mt-5'>
                    <label
                        htmlFor="question"
                        className="mb-3 text-md font-semibold text-gray-900 dark:text-white"
                    >Question:</label>
                    <input
                        type="text"
                        id="question"
                        name="question"
                        value={questionData.question}
                        onChange={(e) => handleInputChange(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                {questionData.type === 'boolean' ? (
                    <div className='mt-5'>
                        <label htmlFor="correct_answer"
                            className="mb-3 text-md font-semibold text-gray-900 dark:text-white">Correct Answer:</label>
                        <select
                            id="correct_answer"
                            name="correct_answer"
                            value={questionData.correct_answer}
                            onChange={(e) => handleCorrectAnswerChange(e)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                ) : questionData.type === 'multipleChoice' ? (
                    <>
                        <div className='mt-5'>
                            <label htmlFor="answers" className="mb-3 text-md font-semibold text-gray-900 dark:text-white">
                                Answers:
                            </label>
                            {/* Input fields for entering multiple answers */}
                            {questionData.answers.map((answer, index) => (
                                <div key={index} className="mb-3">
                                    <input
                                        type="text"
                                        id={`answer_${index}`}
                                        name={`answer_${index}`}
                                        value={answer}
                                        onChange={(e) => handleAnswerInputChange(e, index)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder={`Answer ${index + 1}`}
                                        required
                                    />
                                </div>
                            ))}
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="correct_answer" className="mb-3 text-md font-semibold text-gray-900 dark:text-white">
                                Select Correct Answer:
                            </label>
                            {/* Dropdown to select correct answer */}
                            <select
                                id="correct_answer"
                                name="correct_answer"
                                value={questionData.correct_answer}
                                onChange={(e) => handleCorrectAnswerChange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            >
                                <option value="">Select Correct Answer</option>
                                {questionData.answers.map((answer, index) => (
                                    <option key={index} value={index}>
                                        {answer}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Answers as checkboxes */}
                        <div className='mt-5'>
                            <label className="mb-3 text-md font-semibold text-gray-900 dark:text-white">Answers:</label>
                            {questionData.answers.map((answer, index) => (
                                <div key={index}>
                                    {/* <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => {
                                            const updatedAnswers = [...questionData.answers];
                                            updatedAnswers[index] = e.target.value;
                                            setQuestionData({ ...questionData, answers: updatedAnswers });
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    /> */}
                                    <input
                                        type="text"
                                        id={`answer_${index}`}
                                        name={`answer_${index}`}
                                        value={answer}
                                        onChange={(e) => {
                                            const updatedAnswers = [...questionData.answers];
                                            updatedAnswers[index] = e.target.value;
                                            setQuestionData({ ...questionData, answers: updatedAnswers });
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-customBlue focus:border-customBlue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder={`Answer ${index + 1}`}
                                    />

                                    <div className="flex items-center mb-4 mt-2">
                                        <input
                                            checked={questionData.correct_answers.includes(index)}
                                            onChange={(e) => handleAnswerChange(index, e.target.checked)}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />

                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Correct Answer</label>

                                    </div>


                                </div>
                            ))}
                        </div>
                        {/* Add Answer button */}
                        {/* <button
                            type="button"
                            onClick={() =>
                                setQuestionData({
                                    ...questionData,
                                    answers: [...questionData.answers, ''], // Add a new empty answer field
                                })
                            }
                        >
                            Add Answer
                        </button> */}
                    </>
                )}



                <button type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 mt-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Question</button>
            </form>
        </>
    );
};

export default AddQuestionForm;
