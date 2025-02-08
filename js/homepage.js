async function viewlist() {
    const BASE_URL = 'https://fedassignment-6e81.restdb.io/rest/listings';
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

        const listings = await response.json();
        displayListings(listings);
    } catch (error) {
        console.error('Error fetching listings:', error);
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
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="html/viewlist.html" data-listing-id="${listing._id}">View Listing</a></div>
                </div>
            </div>
        `;

        listingsContainer.appendChild(listingElement);
    });
}

document.addEventListener('DOMContentLoaded', viewlist);

document.addEventListener('click', async function(event) {
    if (event.target.matches('.btn-outline-dark')) {
        const listingId = event.target.getAttribute('data-listing-id');
        await fetchListing(listingId);
    }
});


async function fetchListing(listingId) {
   
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