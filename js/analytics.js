document.addEventListener('DOMContentLoaded', () => {
    let currentType = 'expense';

    const donutCtx = document.getElementById('donutChart').getContext('2d');
    const barCtx = document.getElementById('barChart').getContext('2d');

    let donutChart, barChart;

    const updateCharts = (type) => {
        const transactions = getTransactions().filter(t => t.type === type);
        const categoryData = {};

        transactions.forEach(t => {
            categoryData[t.category] = (categoryData[t.category] || 0) + parseFloat(t.amount);
        });

        const labels = Object.keys(categoryData);
        const data = Object.values(categoryData);
        const colors = [
            '#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b',
            '#10b981', '#6366f1', '#f43f5e', '#14b8a6'
        ];

        if (donutChart) donutChart.destroy();
        if (barChart) barChart.destroy();

        donutChart = new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors,
                    borderWidth: 0,
                    hoverOffset: 20
                }]
            },
            options: {
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: { family: 'Outfit', weight: 'bold' },
                            usePointStyle: true
                        }
                    }
                }
            }
        });

        barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: type.charAt(0).toUpperCase() + type.slice(1),
                    data,
                    backgroundColor: type === 'income' ? '#10b981' : '#f43f5e',
                    borderRadius: 12,
                    barThickness: 32
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { borderDash: [5, 5], color: '#e2e8f0' },
                        ticks: { font: { family: 'Outfit', weight: 'bold' } }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: 'Outfit', weight: 'bold' } }
                    }
                }
            }
        });
    };

    updateCharts(currentType);

    // Toggle logic
    document.getElementById('toggle-income').addEventListener('click', (e) => {
        currentType = 'income';
        e.target.classList.add('bg-primary-600', 'text-white', 'shadow-lg', 'shadow-primary-200');
        e.target.classList.remove('text-gray-500');
        document.getElementById('toggle-expense').classList.remove('bg-primary-600', 'text-white', 'shadow-lg', 'shadow-primary-200');
        document.getElementById('toggle-expense').classList.add('text-gray-500');
        updateCharts(currentType);
    });

    document.getElementById('toggle-expense').addEventListener('click', (e) => {
        currentType = 'expense';
        e.target.classList.add('bg-primary-600', 'text-white', 'shadow-lg', 'shadow-primary-200');
        e.target.classList.remove('text-gray-500');
        document.getElementById('toggle-income').classList.remove('bg-primary-600', 'text-white', 'shadow-lg', 'shadow-primary-200');
        document.getElementById('toggle-income').classList.add('text-gray-500');
        updateCharts(currentType);
    });
});
