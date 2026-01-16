document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('reports-table');
    const incomeEl = document.getElementById('rep-income');
    const expenseEl = document.getElementById('rep-expense');
    const savingsEl = document.getElementById('rep-savings');
    const rateEl = document.getElementById('rep-rate');

    const updateReports = () => {
        const totals = calculateTotals();
        const transactions = getTransactions();

        incomeEl.textContent = `$${totals.income.toLocaleString()}`;
        expenseEl.textContent = `$${totals.expense.toLocaleString()}`;
        savingsEl.textContent = `$${totals.balance.toLocaleString()}`;

        const savingsRate = totals.income > 0 ? (totals.balance / totals.income) * 100 : 0;
        rateEl.textContent = `${savingsRate.toFixed(1)}%`;

        // Group by category
        const summary = {};
        transactions.forEach(t => {
            if (!summary[t.category]) {
                summary[t.category] = { actual: 0, budget: 0, type: t.type };
            }
            summary[t.category].actual += parseFloat(t.amount);
            // Simulating a budget (e.g., 10% more than actual for demo)
            summary[t.category].budget = summary[t.category].actual * 1.1;
        });

        tableBody.innerHTML = Object.keys(summary).map(cat => {
            const item = summary[cat];
            const diff = item.budget - item.actual;
            return `
                <tr>
                    <td class="px-8 py-5">
                        <div class="flex items-center space-x-3">
                            <div class="w-2 h-2 rounded-full ${item.type === 'income' ? 'bg-green-500' : 'bg-red-500'}"></div>
                            <span class="font-bold text-gray-900">${cat}</span>
                        </div>
                    </td>
                    <td class="px-8 py-5 text-right font-medium text-gray-500">$${item.budget.toFixed(2)}</td>
                    <td class="px-8 py-5 text-right font-bold text-gray-900">$${item.actual.toFixed(2)}</td>
                    <td class="px-8 py-5 text-right">
                        <span class="font-bold ${diff >= 0 ? 'text-green-600' : 'text-red-600'}">
                            ${diff >= 0 ? '+' : ''}$${diff.toFixed(2)}
                        </span>
                    </td>
                </tr>
            `;
        }).join('');
    };

    updateReports();
});
