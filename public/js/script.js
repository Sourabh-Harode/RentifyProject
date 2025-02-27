const vehicleList = document.getElementById('vehicle-list');

const fetchVehicles = async () => {
    const response = await fetch('http://localhost:5000/vehicles');
    const vehicles = await response.json();

    vehicleList.innerHTML = '';
    vehicles.forEach((vehicle) => {
        const vehicleCard = document.createElement('div');
        vehicleCard.innerHTML = 
            <h3>${vehicle.name}</h3>
            <p>Price: ₹${vehicle.price}/hour</p>
            <p>Location: ${vehicle.location}</p>
            <p>Time Slots: ${vehicle.timeSlots}</p>
        ;
        vehicleList.appendChild(vehicleCard);
    });
};

fetchVehicles();


// Highlight active link
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-item");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});

// Highlight the active link dynamically
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

function openVehicleDetails(vehicleId) {
    window.location.href = /vehicle-details.html?id=${vehicleId}; // Redirect to the details page
}



window.onload = function() {
    // Get vehicle ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleId = urlParams.get('id');

    // Static list of vehicles (replace with actual database/API call in a real app)
    const vehicles = [
        { id: 1, name: 'Honda City', owner: 'John Doe', location: 'New Delhi', price: 500, timeSlots: '9 AM - 6 PM', description: 'A comfortable car for city drives.', image: 'path-to-your-image/honda-city.jpg' },
        { id: 2, name: 'Royal Enfield', owner: 'Jane Doe', location: 'Bangalore', price: 200, timeSlots: '10 AM - 8 PM', description: 'A classic bike for long rides.', image: 'path-to-your-image/royal-enfield.jpg' },
        { id: 3, name: 'BMW X5', owner: 'Alice Smith', location: 'Mumbai', price: 1000, timeSlots: '9 AM - 5 PM', description: 'A luxury car for high-end experiences.', image: 'path-to-your-image/bmw-x5.jpg' },
        // Add 20 vehicles here as needed
    ];

    // Find the vehicle based on the ID
    const vehicle = vehicles.find(v => v.id == vehicleId);

    // Populate the vehicle details on the page
    if (vehicle) {
        document.getElementById('vehicle-name').innerText = vehicle.name;
        document.getElementById('vehicle-owner').innerText = vehicle.owner;
        document.getElementById('vehicle-location').innerText = vehicle.location;
        document.getElementById('vehicle-price').innerText = vehicle.price;
        document.getElementById('vehicle-time-slots').innerText = vehicle.timeSlots;
        document.getElementById('vehicle-description').innerText = vehicle.description;
        document.getElementById('vehicle-image').src = vehicle.image;
    } else {
        alert('Vehicle not found!');
    }
};





