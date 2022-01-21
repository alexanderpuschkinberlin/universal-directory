// Initialize and add the map
function initMap() {
  // The location of Uluru
  let lat = document.getElementById("lat").textContent;
  let lng = document.getElementById("lng").textContent;
  lat = lat ? parseFloat(lat) : 52.539386;
  lng = lng ? parseFloat(lng) : 13.413711;
  const uluru = { lat, lng };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}
