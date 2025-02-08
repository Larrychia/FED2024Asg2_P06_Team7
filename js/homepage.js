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
        listingElement.querySelector('a').addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.setItem('listingid', listing._id);
            window.location.href = 'html/viewlist.html';
        });


        listingsContainer.appendChild(listingElement);
    });
}

document.addEventListener('DOMContentLoaded', viewlist);