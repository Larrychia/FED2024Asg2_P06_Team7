document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        document.getElementById('login-prompt').style.display = 'block';
        document.querySelector('.container').style.display = 'none';
        return;
    }

    document.getElementById('profile-name').innerText = user.name;
    document.getElementById('profile-email').innerText = user.email;

    document.getElementById('createListingButton').addEventListener('click', () => {
        let createListingModal = new bootstrap.Modal(document.getElementById('createListingModal'));
        createListingModal.show();
    });

    document.getElementById('createListingForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        let listingName = document.getElementById('listingName').value;
        let listingDescription = document.getElementById('listingDescription').value;
        let listingPrice = document.getElementById('listingPrice').value;
       

        let newListing = {
            name: listingName,
            description: listingDescription,
            price: listingPrice,
            owneremail: user.email
        };

        let BASE_URL = 'https://database-90b8.restdb.io/rest/listings';
        let API_KEY = '677b36236ad1907ce53cbff9';

        try {
            let response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': API_KEY,
                    "cache-control": "no-cache"
                },
                body: JSON.stringify(newListing),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            let data = await response.json();
            alert('Listing created successfully!');
            let createListingModal = bootstrap.Modal.getInstance(document.getElementById('createListingModal'));
            createListingModal.hide();
            document.getElementById('createListingForm').reset();
            fetchUserListings();
        } catch (error) {
            console.error('Error creating listing:', error);
            alert('An error occurred. Please try again.');
        }
    });

    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = '../html/login.html';
    });

fetchUserListings(); // Fetch and display the user's listings on page load
});

async function fetchUserListings() {
    let user = JSON.parse(localStorage.getItem('user'));
    let BASE_URL = 'https://database-90b8.restdb.io/rest/listings';
    let API_KEY = '677b36236ad1907ce53cbff9';

    try {
        let response = await fetch(`${BASE_URL}?q={"owneremail":"${user.email}"}`, {
            headers: {
                "content-type": "application/json",
                "x-apikey": API_KEY,
                "cache-control": "no-cache"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        let listings = await response.json();
        displayUserListings(listings);
    } catch (error) {
        console.error('Error fetching user listings:', error);
    }
}

function displayUserListings(listings) {
    let listingsContainer = document.getElementById('listingsContainer');
    listingsContainer.innerHTML = '';

    listings.forEach(listing => {
        let listingElement = document.createElement('div');
        listingElement.classList.add('col-md-4', 'mb-4');

        listingElement.innerHTML = `
            <div class="card h-100">
                
                <div class="card-body">
                    <h5 class="card-title">${listing.name}</h5>
                    <p class="card-text">${listing.description}</p>
                    <p class="card-text"><strong>Price:</strong> $${listing.price}</p>
                    <button class="btn btn-danger" onclick="deleteListing('${listing._id}')">Delete</button>
                </div>
            </div>
        `;

        listingsContainer.appendChild(listingElement);
    });
}
async function deleteListing(listingId) {
    let BASE_URL = `https://database-90b8.restdb.io/rest/listings/${listingId}`;
    let API_KEY = '677b36236ad1907ce53cbff9';

    try {
        let response = await fetch(BASE_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                "cache-control": "no-cache"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        alert('Listing deleted successfully!');
        fetchUserListings(); // Refresh the listings after deletion
    } catch (error) {
        console.error('Error deleting listing:', error);
        alert('An error occurred. Please try again.');
    }
}