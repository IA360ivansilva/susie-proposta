document.addEventListener('DOMContentLoaded', () => {
    const truckGrid = document.getElementById('truck-grid');

    // Load inventory from JSON
    fetch('./trucks.json')
        .then(response => response.json())
        .then(data => {
            truckGrid.innerHTML = ''; // Clear loading message
            
            data.forEach(truck => {
                const truckCard = document.createElement('div');
                truckCard.className = 'truck-card';
                
                truckCard.innerHTML = `
                    <img src="${truck.image_url}" alt="${truck.name}" class="truck-image" onerror="this.src='https://via.placeholder.com/640x480?text=Truck+Image'">
                    <div class="truck-info">
                        <h3 class="truck-name">${truck.name}</h3>
                        <p class="truck-price">${truck.price}</p>
                        <a href="${truck.link}" target="_blank" class="btn-view">View Details</a>
                    </div>
                `;
                
                truckGrid.appendChild(truckCard);
            });
        })
        .catch(error => {
            console.error('Error loading trucks:', error);
            truckGrid.innerHTML = '<div class="error">Error loading inventory. Please try again later.</div>';
        });
});
