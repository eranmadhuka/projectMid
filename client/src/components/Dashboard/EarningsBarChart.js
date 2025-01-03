import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'November', 'December'];

const EarningsBarChart = () => {

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [3, 6, 9, 2, 10, 6, 8, 4, 7, 5, 8, 3],
                backgroundColor: 'rgba(82, 95, 225, 0.9)',
                borderColor: 'black',
                borderWidth: 1
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    return (
        <>
            <div className='flex items-center justify-between mb-4'>
                <div class="flex-shrink-0">
                    <span class="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">$45,385</span>
                    <h3 class="text-base font-light text-gray-500 dark:text-gray-400">Sales this week</h3>
                </div>
            </div>
            <Bar
                options={options}
                data={data}>
            </Bar>

        </>
    );
};

export default EarningsBarChart;
