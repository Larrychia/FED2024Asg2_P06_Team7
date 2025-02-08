async function viewlist() {
    const BASE_URL = 'https://database-90b8.restdb.io/rest/listings';
    const API_KEY = '677b36236ad1907ce53cbff9';

    try {
        const response = await fetch(BASE_URL, {
            headers: {
                "content-type": "application/json",
                "x-apikey": API_KEY,
                "cache-control": "no-cache"
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const listings = await response.json();
        displayListings(listings);
    } catch (error) {
        console.error('Error fetching listings:', error.message);
    }
}

function displayListings(listings) {
    const listingsContainer = document.querySelector('.row-cols-2');
    
    listings.forEach(listing => {
        const listingElement = document.createElement('div');
        listingElement.classList.add('col', 'mb-5');

       
        listingElement.innerHTML = `
            <div class="card h-100">
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${listing.name}</h5>
                        <p>${listing.description}</p>
                        <p>$${listing.price}</p>
                    </div>
                </div>
                     <div class="text-center"><a class="btn btn-outline-dark mt-auto" data-listing-id="${listing._id}">Add to Cart</a></div>
            </div>
        `;
        
        listingElement.querySelector('a').addEventListener('click', () => {
            addToCart(listing);
        });

        listingsContainer.appendChild(listingElement);
    });
}


async function addToCart(listing) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('You need to be logged in to add items to your cart.');
        window.location.href = '../html/login.html';
        return;
    }

    const updatedUser = {
        ...user,
        cartitems: [...(user.transactions || []), listing]
    };

    const BASE_URL = `https://database-90b8.restdb.io/rest/login/${user._id}`;
    const API_KEY = '677b36236ad1907ce53cbff9';

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
        updateCartCount();
        alert(`${listing.name} has been added to your cart.`);
    } catch (error) {
        console.error('Error updating user transactions:', error);
        alert('An error occurred. Please try again.');
    }
}
function updateCartCount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const cartCount = user.transactions ? user.transactions.length : 0;
    document.getElementById('cartCount').innerText = cartCount;
}

document.addEventListener('DOMContentLoaded', () => {
    viewlist();
    updateCartCount();
});

