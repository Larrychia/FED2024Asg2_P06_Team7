async function fetchListing() {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('id');
    const BASE_URL = `https://fedassignment-6e81.restdb.io/rest/listings/${listingId}`;
    const API_KEY = '67939028845908919c097e5e';

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

        const listing = await response.json();
        displayListing(listing);
    } catch (error) {
        console.error('Error fetching listing:', error);
    }
}

function displayListing(listing) {
    const listingContainer = document.querySelector('.row.gx-4.gx-lg-5.align-items-center');

    listingContainer.innerHTML = `
        <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="${listing.image}" alt="${listing.title}" /></div>
        <div class="col-md-6">
            <div class="small mb-1">SKU: ${listing.sku}</div>
            <h1 class="display-5 fw-bolder">${listing.title}</h1>
            <div class="fs-5 mb-5">
                <span class="text-decoration-line-through">$${listing.originalPrice}</span>
                <span>$${listing.price}</span>
            </div>
            <p class="lead">${listing.description}</p>
            <div class="d-flex">
                <button class="btn btn-outline-dark flex-shrink-0" type="button">
                    <i class="bi-cart-fill me-1"></i>
                    Tap to chat
                </button>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', fetchListing);