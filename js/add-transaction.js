document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const typeExpense = document.getElementById('type-expense');
    const typeIncome = document.getElementById('type-income');
    const categorySelect = document.getElementById('form-category');
    const dateInput = document.getElementById('form-date');

    let currentType = 'expense';

    // Set default date to today
    dateInput.value = new Date().toISOString().split('T')[0];

    const updateCategories = (type) => {
        const list = categories[type];
        categorySelect.innerHTML = list.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    };

    updateCategories(currentType);

    typeExpense.addEventListener('click', () => {
        currentType = 'expense';
        typeExpense.classList.add('bg-white', 'text-gray-900', 'shadow-sm');
        typeExpense.classList.remove('text-gray-500');
        typeIncome.classList.remove('bg-white', 'text-gray-900', 'shadow-sm');
        typeIncome.classList.add('text-gray-500');
        updateCategories(currentType);
    });

    typeIncome.addEventListener('click', () => {
        currentType = 'income';
        typeIncome.classList.add('bg-white', 'text-gray-900', 'shadow-sm');
        typeIncome.classList.remove('text-gray-500');
        typeExpense.classList.remove('bg-white', 'text-gray-900', 'shadow-sm');
        typeExpense.classList.add('text-gray-500');
        updateCategories(currentType);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newEntry = {
            type: currentType,
            category: categorySelect.value,
            amount: parseFloat(document.getElementById('form-amount').value),
            title: document.getElementById('form-title').value,
            description: document.getElementById('form-desc').value,
            date: dateInput.value
        };

        saveTransaction(newEntry);

        // Success animation or redirect
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Saved!';
        btn.classList.replace('bg-primary-600', 'bg-green-600');

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 800);
    });
});
