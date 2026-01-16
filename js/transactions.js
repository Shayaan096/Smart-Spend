document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('transactions-container');
    const categoryFilter = document.getElementById('category-filter');
    const typeFilter = document.getElementById('type-filter');
    const searchInput = document.getElementById('search-input');
    const dateFilter = document.getElementById('date-filter');
    const countLabel = document.getElementById('results-count');

    // Populate category filter
    const allCategories = [...new Set([...categories.income, ...categories.expense])];
    allCategories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
    });

    const renderTransactions = () => {
        const list = getTransactions();
        const search = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const type = typeFilter.value;
        const date = dateFilter.value;

        const filtered = list.filter(t => {
            const matchesSearch = t.title.toLowerCase().includes(search) || t.description.toLowerCase().includes(search);
            const matchesCategory = !category || t.category === category;
            const matchesType = !type || t.type === type;
            const matchesDate = !date || t.date === date;
            return matchesSearch && matchesCategory && matchesType && matchesDate;
        });

        countLabel.textContent = `Showing ${filtered.length} transactions`;

        if (filtered.length === 0) {
            listContainer.innerHTML = `
                <div class="p-20 text-center">
                    <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <p class="text-gray-400 font-bold">No transactions found</p>
                    <p class="text-gray-300 text-sm">Try adjusting your filters</p>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = filtered.map(t => `
            <div class="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-colors group gap-4">
                <div class="flex items-center space-x-4 min-w-0">
                    <div class="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${t.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} transition-transform group-hover:scale-110">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            ${t.type === 'income'
                ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />'
                : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />'}
                        </svg>
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center space-x-2 flex-wrap sm:flex-nowrap">
                            <p class="font-bold text-gray-900 truncate">${t.title}</p>
                            <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 tracking-wider whitespace-nowrap">${t.category}</span>
                        </div>
                        <p class="text-xs text-gray-400 font-medium truncate max-w-[200px] md:max-w-xs">${t.description}</p>
                    </div>
                </div>
                <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center flex-shrink-0">
                    <p class="font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'} text-lg leading-none">
                        ${t.type === 'income' ? '+' : '-'}$${parseFloat(t.amount).toLocaleString()}
                    </p>
                    <p class="text-xs text-gray-400 font-bold sm:mt-1">${t.date}</p>
                </div>
            </div>
        `).join('');
    };

    [searchInput, categoryFilter, typeFilter, dateFilter].forEach(el => {
        el.addEventListener('input', renderTransactions);
    });

    renderTransactions();
});
