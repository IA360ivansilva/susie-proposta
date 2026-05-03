document.addEventListener('DOMContentLoaded', () => {
    const truckGrid = document.getElementById('truck-grid');

    // Load inventory from JSON
    fetch('./trucks.json?v=1.0.1')
        .then(response => response.json())
        .then(data => {
            truckGrid.innerHTML = ''; // Clear loading message
            
            data.forEach(truck => {
                const truckCard = document.createElement('div');
                truckCard.className = 'truck-card';
                
                truckCard.innerHTML = `
                    <div class="truck-img-container">
                        <img src="${truck.image_url}" alt="${truck.name}" class="truck-image" referrerpolicy="no-referrer" onerror="this.src='https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=640'">
                    </div>
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
