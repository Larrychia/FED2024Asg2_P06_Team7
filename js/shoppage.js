/*async function viewlist() {
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
    listingsContainer.innerHTML = ''; // Clear the container to avoid duplicates
    
    listings.forEach(listing => {
        const listingElement = document.createElement('div');
        listingElement.classList.add('col', 'mb-5');

        // Use default image for all listings
        const imageUrl = 'images/image.png';

        listingElement.innerHTML = `
            <div class="card h-100">
                <img class="card-img-top" src="${imageUrl}" alt="${listing.name}" />
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

function addToCart(listing) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('You need to be logged in to add items to your cart.');
        window.location.href = 'html/login.html';
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(listing);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${listing.name} has been added to your cart.`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;
    document.getElementById('cartCount').innerText = cartCount;
}

document.addEventListener('DOMContentLoaded', () => {
    viewlist();
    updateCartCount();
}); */

async function viewlist() {
    const BASE_URL = 'listing.json'; // Path to the local data.json file

    try {
        const response = await fetch(BASE_URL, {
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache"
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const listings = data.listings;
        displayListings(listings);
    } catch (error) {
        console.error('Error fetching listings:', error.message);
    }
}

function displayListings(listings) {
    const listingsContainer = document.querySelector('.row-cols-2');
    listingsContainer.innerHTML = ''; // Clear the container to avoid duplicates
    
    listings.forEach(listing => {
        const listingElement = document.createElement('div');
        listingElement.classList.add('col', 'mb-5');

        // Use default image for all listings
        const imageUrl = 'images/image.png';

        listingElement.innerHTML = `
            <div class="card h-100 listing-card">
                <img class="card-img-top" src="${imageUrl}" alt="${listing.name}" />
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

function addToCart(listing) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('You need to be logged in to add items to your cart.');
        window.location.href = 'html/login.html';
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(listing);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${listing.name} has been added to your cart.`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;
    document.getElementById('cartCount').innerText = cartCount;
}

document.addEventListener('DOMContentLoaded', () => {
    viewlist();
    updateCartCount();
});