document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();

    const clearCartButton = document.getElementById('clearCartButton');
    clearCartButton.addEventListener('click', clearCart);
});

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = ''; // Clear the container to avoid duplicates

    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('col', 'mb-5');

        const imageUrl = '../images/image.png';

        cartItemElement.innerHTML = `
            <div class="card h-100">
                <img class="card-img-top" src="${imageUrl}" alt="${item.name}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${item.name}</h5>
                        <p>${item.description}</p>
                        <p>$${item.price}</p>
                    </div>
                </div>
                <div class="text-center">
                    <button class="btn btn-outline-danger mt-auto" data-index="${index}">Remove</button>
                </div>
            </div>
        `;

        cartItemElement.querySelector('button').addEventListener('click', () => {
            removeFromCart(index);
        });

        cartItemsContainer.appendChild(cartItemElement);
    });
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCartItems();
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;
    document.getElementById('cartCount').innerText = cartCount;
}