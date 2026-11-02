

    
    // ==========================================
    // 1. INTERACTIVE MAP SECTION 
    // ==========================================
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        
        const map = L.map('map').setView([-26.1611, 28.3283], 15); 

        L.tileLayer('https://{s}://{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="https://carto.com">CARTO</a>'
        }).addTo(map);

       L.marker([-26.2041, 28.0473]).addTo(map)
    .bindPopup('<b>NEXT LEVEL GAMING & ESPORTS ARENA</b><br>Johannesburg, Gauteng, South Africa')
    .openPopup();

            
        setTimeout(function() {
            map.invalidateSize();
        }, 100);
    }
