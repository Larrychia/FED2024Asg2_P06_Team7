document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('You need to be logged in to view your transaction history.');
        window.location.href = '../html/login.html';
        return;
    }

    const transactionHistoryContainer = document.getElementById('transactionHistory');
    if (user.transactions && user.transactions.length > 0) {
        user.transactions.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            itemElement.innerHTML = `
                <div>
                    <h5 class="mb-1">${item.name}</h5>
                    <p class="mb-1">${item.description}</p>
                    <small>Price: $${item.price}</small>
                </div>
                <img src="${item.image}" alt="${item.name}" class="img-thumbnail" style="width: 100px;">
            `;
            transactionHistoryContainer.appendChild(itemElement);
        });
    } else {
        transactionHistoryContainer.innerHTML = '<p class="text-center">No transactions found.</p>';
    }
});