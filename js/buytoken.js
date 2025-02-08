document.addEventListener('DOMContentLoaded', () => {
    const tokenButtons = document.querySelectorAll('.btn-primary');

    tokenButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const tokenAmount = parseInt(button.id.replace('token', ''));
            await addTokens(tokenAmount);
        });
    });
});

async function addTokens(amount) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('You need to be logged in to buy tokens.');
        window.location.href = '../html/login.html';
        return;
    }

    const BASE_URL = `https://fedassignment-6e81.restdb.io/rest/login/${user._id}`;
    const API_KEY = '67939028845908919c097e5e';

    const updatedUser = {
        ...user,
        tokens: (user.tokens || 0) + amount
    };

    try {
        const response = await fetch(BASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                "cache-control": "no-cache"
            },
            body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert(`Successfully added ${amount} tokens to your balance.`);
    } catch (error) {
        console.error('Error updating tokens:', error);
        alert('An error occurred. Please try again.');
    }
}