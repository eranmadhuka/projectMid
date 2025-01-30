import React, { useState, useEffect, useMemo } from "react";
import DashboardLayout from "../../../components/Common/Layout/DashboardLayout";
import Breadcrumb from "../../../components/ui/Breadcrumb";
import Table from "../../../components/Dashboard/ui/Table";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const ResultPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch results on component mount
    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Retrieve token (update if you store it differently)
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Authorization token not found.");

                const response = await axios.get(`${API_URL}/api/attempt/attempts`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setResults(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch results.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);


    const columns = [
        {
            header: "Quiz Name",
            accessorKey: "quiz.title",
            cell: (info) => <span className="text-blue-600">{info.getValue()}</span>,
        },
        {
            header: "Module Name",
            accessorKey: "quiz.module.moduleName",
        },
        {
            header: "Module Code",
            accessorKey: "quiz.module.moduleCode",
        },
        {
            header: "Your Marks",
            accessorKey: "studentMarks",
        },
        {
            header: "total Marks",
            accessorKey: "totalMarks",
        },
        {
            header: "Marks %",
            accessorKey: "percentage",
            cell: (info) => <span>{info.getValue()}%</span>,
        },
        {
            header: "Status",
            accessorKey: "percentage",
            cell: (info) => {
                const percentage = info.getValue();
                const status = percentage >= 45 ? "Passed" : "Failed";
                return (
                    <span className={`font-semibold ${status === "Failed" ? "text-red-600" : "text-green-600"}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            header: "Date",
            accessorKey: "startTime",
            cell: (info) => (
                <span>
                    {new Date(info.getValue()).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </span>
            ),
        },
    ]

    // Performance Summary
    const performanceSummary = useMemo(() => {
        if (!results.length) return { totalQuizzes: 0, quizzesPassed: 0, averageScore: "0%" };

        const quizzesPassed = results.filter((r) => r.percentage >= 45).length;
        const averageScore = (
            results.reduce((sum, r) => sum + parseFloat(r.percentage), 0) / results.length
        ).toFixed(2);

        return {
            totalQuizzes: results.length,
            quizzesPassed,
            averageScore: `${averageScore}%`,
        };
    }, [results]);

    // Render loading, error, or results
    return (
        <DashboardLayout>
            <div>
                {/* Breadcrumb */}
                <Breadcrumb
                    links={[
                        { text: "Home", url: "/student/dashboard" },
                        { text: "Results", url: "/student/results" },
                    ]}
                />

                {/* Header */}
                <h1 className="text-customDark font-semibold text-2xl dark:text-gray-300 mt-5">
                    Results
                </h1>
                <p className="text-customGray text-sm">
                    View your performance and quiz results below.
                </p>

                {loading ? (
                    <p className="text-center text-blue-500 mt-5">Loading results...</p>
                ) : error ? (
                    <p className="text-center text-red-500 mt-5">{error}</p>
                ) : (
                    <>
                        {/* Results Table */}
                        <div className="relative my-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-customDark dark:text-gray-300">
                                Quiz Results
                            </h2>
                            <Table
                                data={results}
                                columns={columns}
                                title="Quiz Results"
                                placeholder="Search Results"
                            />
                        </div>

                        {/* Performance Summary */}
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg mt-6 p-6">
                            <h2 className="text-lg font-semibold text-customDark dark:text-gray-300">
                                Performance Summary
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                {/* Total Quizzes */}
                                <div className="flex flex-col items-center">
                                    <p className="text-4xl font-bold text-blue-600">
                                        {performanceSummary.totalQuizzes}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-400 mt-2">
                                        Total Quizzes Attempted
                                    </p>
                                </div>

                                {/* Passed Quizzes */}
                                <div className="flex flex-col items-center">
                                    <p className="text-4xl font-bold text-green-600">
                                        {performanceSummary.quizzesPassed}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-400 mt-2">
                                        Quizzes Passed
                                    </p>
                                </div>

                                {/* Average Score */}
                                <div className="flex flex-col items-center">
                                    <p className="text-4xl font-bold text-purple-600">
                                        {performanceSummary.averageScore}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-400 mt-2">
                                        Average Score
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ResultPage;
