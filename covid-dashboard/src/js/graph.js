import Chart from 'chart.js';
import { dataHistorical } from './table';

function addGraph() {
    const ctx = document.querySelector('#chart').getContext('2d');
    ctx.canvas.width = 400;
    ctx.canvas.height = 270;
    const chartConfig = {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
            ],
        },
        options: {
            title: {
                display: true,
                text: 'Total cases',
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 10000,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Thousand',
                    },
                }],
            },
            responsive: false,
            maintainAspectRatio: false,
        },
    };

    const chart = new Chart(ctx, chartConfig);
    const date = new Date();
    const currentDay = date.getDate();
    const data = Array(chartConfig.data.labels.length).fill(0);
    let day = 0;
    data[11] = dataHistorical.cases[`12/${currentDay - 1}/20`] / 1000;
    for (let i = 0; i < data.length - 1; i += 1) {
        if (['April', 'June', 'September', 'November'].indexOf(chartConfig.data.labels[i]) !== -1) {
            day = 30;
        } else if (chartConfig.data.labels[i] === 'February') {
            day = 28;
        } else {
            day = 31;
        }
        data[i] = dataHistorical.cases[`${i + 1}/${day}/20`] / 1000;
    }
    const user = {
        label: 'cases',
        data,
        backgroundColor: '#ffaa00',
        borderColor: 'transparent',
        borderWidth: 2,
        fill: false,
        barPercentage: 1,
        categoryPercentage: 0.5,
    };
    chartConfig.data.datasets.push(user);
    chart.update();
}

export { addGraph };
