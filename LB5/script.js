document.addEventListener("DOMContentLoaded", getMyLocation)


const ourCoords = {
    latitude: 48.943391454671854,
    longitude: 24.731924095723915
}
let watchId = null;

function getMyLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation, displayError)
        var watchButton = document.getElementById("watch")
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    } else {
        alert("Oops, no geolocation support")
    }
}

function watchLocation(){
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}
function clearWatch(){
    if(watchId) {
        navigator.geolocation.clearWatch(watchId)
        watchId = null;
    }
}


function displayLocation(position){
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    let div = document.getElementById("location")
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`
    div.innerHTML += `(with ${position.coords.accuracy} meters accuracy)`
    let km = computeDistance(position.coords, ourCoords)
    let distance = document.getElementById("distance")
    distance.innerHTML = `You are ${km} km from the College`
}
function displayError(error){
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request times out"
    };
    const errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    let div = document.getElementById("location")
    div.innerHTML = errorMessage;
}
function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371; 

    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    let radians = (degrees * Math.PI) / 180;
    return radians;
}


const map = L.map('map').setView([48.943391454671854, 24.731924095723915], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const marker = L.marker([48.943391454671854, 24.731924095723915]).addTo(map)
    .bindPopup('Ваша поточна локація.')
    .openPopup();

marker.bindPopup('<h3>Ваше місце розташування</h3>').openPopup();

function addCurrentLocationMarker() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const timestamp = new Date(position.timestamp);

            const marker = L.marker([lat, lng]).addTo(map)
                .bindPopup(`<b>Ваше місце розташування</b><br>Координати: ${lat}, ${lng}<br>Час: ${timestamp.toLocaleTimeString()}`)
                .openPopup();

            map.setView([lat, lng], 13);
        });
    } else {
        alert("Oops, no geolocation support");
    }
}

function moveToLocation() {
    const destLat = parseFloat(document.getElementById('destinationLat').value);
    const destLng = parseFloat(document.getElementById('destinationLng').value);
    map.setView([destLat, destLng], 15);

    L.marker([destLat, destLng]).addTo(map)
        .bindPopup('Пункт призначення.')
        .openPopup();
}


