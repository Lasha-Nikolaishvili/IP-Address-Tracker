function setMainInfo(response) {
    const ipAddr = document.querySelector('.ip-addr');
    const loc = document.querySelector('.loc');
    const timez = document.querySelector('.timez');
    const isp = document.querySelector('.isp');

    ipAddr.innerHTML = `${response.data.ip}`;
    loc.innerHTML = `${response.data.location.city}, ${response.data.location.country}, ${response.data.location.postalCode}`;
    timez.innerHTML = `UTC ${response.data.location.timezone}`;
    isp.innerHTML = `${response.data.isp}`;
}

function setupMap(response) {
    map.setView([response.data.location.lat, response.data.location.lng], 13);
        
    let icon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [35, 46],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    });
    L.marker([response.data.location.lat, response.data.location.lng], {icon: icon}).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

async function setLocation(ipAddress) {
    try {
        let response;
        if(ipAddress) {
            response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_1eQQd8woQ4THoGQtqXDVXITIAlZri&ipAddress=${ipAddress}`);
        } else {
            response = await axios.get('https://geo.ipify.org/api/v2/country,city?apiKey=at_1eQQd8woQ4THoGQtqXDVXITIAlZri');
        }
        console.log(response.data);

        setupMap(response)
        setMainInfo(response);
    } catch (error) {
        console.error(error);
    }
}

let map = L.map('map');

setLocation();

const searchBar = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    let ipAddress = searchBar.value;
    setLocation(ipAddress);
})

searchBar.addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
        let ipAddress = searchBar.value;
        setLocation(ipAddress);
    }
})