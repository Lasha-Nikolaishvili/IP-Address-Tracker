async function setLocation() {
    try {
        const response = await axios.get('https://geo.ipify.org/api/v2/country,city?apiKey=at_1eQQd8woQ4THoGQtqXDVXITIAlZri&ipAddress=8.8.8.8');
        console.log(response.data.location);
        const map = L.map('map').setView([response.data.location.lat, response.data.location.lng], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    } catch (error) {
        console.error(error);
    }
}

setLocation();
// https://geo.ipify.org/api/v2/country,city?apiKey=at_1eQQd8woQ4THoGQtqXDVXITIAlZri&ipAddress=8.8.8.8