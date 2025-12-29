// Initialisation de la carte
const map = L.map("map").setView([45.5017, -73.5673], 14); // Montréal par défaut

// Carte OpenStreetMap (gratuite)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

// Icônes simples
const greenIcon = L.circleMarker([0,0], { radius: 8, color: "green" });
const orangeIcon = L.circleMarker([0,0], { radius: 8, color: "orange" });
const redIcon = L.circleMarker([0,0], { radius: 8, color: "red" });

// Géolocalisation utilisateur
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      map.setView([lat, lon], 16);

      L.marker([lat, lon])
        .addTo(map)
        .bindPopup("📍 Vous êtes ici")
        .openPopup();

      // Exemple de zones (FAKE pour MVP)
      addZone(lat + 0.001, lon, "🟢 Stationnement probablement permis");
      addZone(lat, lon + 0.001, "🟠 À vérifier");
      addZone(lat - 0.001, lon, "🔴 Stationnement interdit");
    },
    () => alert("Impossible d'obtenir votre position.")
  );
}

function addZone(lat, lon, text) {
  let color = "green";
  if (text.includes("🟠")) color = "orange";
  if (text.includes("🔴")) color = "red";

  L.circleMarker([lat, lon], {
    radius: 10,
    color: color,
    fillOpacity: 0.7
  })
    .addTo(map)
    .bindPopup(text);
}
