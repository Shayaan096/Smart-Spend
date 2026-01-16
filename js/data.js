// In-memory data store for transactions
let transactions = [
    { id: 1, type: 'expense', category: 'Food', title: 'Lunch at Cafe', description: 'Quick lunch during work', date: '2026-01-16', amount: 15.50 },
    { id: 2, type: 'income', category: 'Salary', title: 'Monthly Salary', description: 'Full-time job salary', date: '2026-01-01', amount: 3500.00 },
    { id: 3, type: 'expense', category: 'Rent', title: 'January Rent', description: 'Monthly apartment rent', date: '2026-01-05', amount: 1200.00 },
    { id: 4, type: 'expense', category: 'Transport', title: 'Gas Refill', description: 'Full tank for the SUV', date: '2026-01-10', amount: 65.00 },
    { id: 5, type: 'income', category: 'Freelance', title: 'Website Project', description: 'Payment for client website', date: '2026-01-12', amount: 800.00 },
    { id: 6, type: 'expense', category: 'Entertainment', title: 'Netflix Subscription', description: 'Monthly streaming service', date: '2026-01-15', amount: 19.99 },
    { id: 7, type: 'expense', category: 'Food', title: 'Grocery Shopping', description: 'Weekly groceries', date: '2026-01-14', amount: 120.40 },
    { id: 8, type: 'expense', category: 'Shopping', title: 'New Shoes', description: 'Running shoes from Nike', date: '2026-01-13', amount: 89.99 },
];

// Categories configuration
const categories = {
    income: ['Salary', 'Freelance', 'Investments', 'Gift', 'Other'],
    expense: ['Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Health', 'Other']
};

// Functions to manage data
function getTransactions() {
    return JSON.parse(localStorage.getItem('smartspend_transactions')) || transactions;
}

function saveTransaction(transaction) {
    const list = getTransactions();
    transaction.id = list.length > 0 ? Math.max(...list.map(t => t.id)) + 1 : 1;
    list.unshift(transaction);
    localStorage.setItem('smartspend_transactions', JSON.stringify(list));
}

function calculateTotals() {
    const list = getTransactions();
    return list.reduce((acc, t) => {
        if (t.type === 'income') acc.income += parseFloat(t.amount);
        else acc.expense += parseFloat(t.amount);
        acc.balance = acc.income - acc.expense;
        return acc;
    }, { income: 0, expense: 0, balance: 0 });
}

// Initialize localStorage if empty
if (!localStorage.getItem('smartspend_transactions')) {
    localStorage.setItem('smartspend_transactions', JSON.stringify(transactions));
}
