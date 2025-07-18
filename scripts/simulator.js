let map;
let explosionLayers = [];

function initMap() {
  map = L.map('map').setView([36.5, 127.8], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    minZoom: 2,
    maxZoom: 18
  }).addTo(map);

  map.on('click', onMapClick);
}

function onMapClick(e) {
  const { lat, lng } = e.latlng;

  const explosion = L.circle([lat, lng], {
    radius: 30000,
    color: 'red',
    fillColor: 'red',
    fillOpacity: 0.5
  }).addTo(map);

  const radiation = L.circle([lat, lng], {
    radius: 70000,
    color: 'green',
    fillColor: 'lime',
    fillOpacity: 0.3
  }).addTo(map);

  explosionLayers.push(explosion, radiation);
}

function resetMap() {
  explosionLayers.forEach(layer => map.removeLayer(layer));
  explosionLayers = [];
}

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  document.getElementById('reset').addEventListener('click', resetMap);
});
