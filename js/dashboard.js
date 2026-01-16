document.addEventListener('DOMContentLoaded', () => {
    updateDashboardUI();
    renderChart();
});

function updateDashboardUI() {
    const totals = calculateTotals();
    const transactions = getTransactions();

    // Update stats
    document.getElementById('total-income').textContent = `$${totals.income.toLocaleString()}`;
    document.getElementById('total-expenses').textContent = `$${totals.expense.toLocaleString()}`;
    document.getElementById('total-balance').textContent = `$${totals.balance.toLocaleString()}`;

    // Update recent transactions
    const recentList = document.getElementById('recent-transactions');
    const recentItems = transactions.slice(0, 5); // Take last 5

    recentList.innerHTML = recentItems.map(t => `
        <div class="flex items-center justify-between group gap-4">
            <div class="flex items-center space-x-4 min-w-0">
                <div class="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${t.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} transition-transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        ${t.type === 'income'
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />'}
                    </svg>
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-gray-900 truncate">${t.title}</p>
                    <p class="text-xs text-gray-400 font-medium truncate">${t.category} • ${t.date}</p>
                </div>
            </div>
            <p class="font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'} flex-shrink-0">
                ${t.type === 'income' ? '+' : '-'}$${parseFloat(t.amount).toLocaleString()}
            </p>
        </div>
    `).join('');
}

function renderChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    // Gradient for the chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(14, 165, 233, 0.4)');
    gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Expenses',
                data: [1200, 1900, 1500, 2100, 1800, 2400, 2100],
                borderColor: '#0ea5e9',
                borderWidth: 4,
                fill: true,
                backgroundColor: gradient,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#0ea5e9',
                pointHoverBorderWidth: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { display: false },
                    ticks: { color: '#94a3b8', font: { weight: 'bold' } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8', font: { weight: 'bold' } }
                }
            }
        }
    });
}
