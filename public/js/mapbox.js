/* eslint-disable */
const locations = JSON.parse(document.getElementById("map").dataset.locations);

console.log(locations);

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2h1YmhhbWJhdHRvbyIsImEiOiJjazMyejZrcXgwbmRqM2RtamUybnRrdnlrIn0.pJs-IejTV9RU03ccae8wEA";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/shubhambattoo/ck32zmite2kr31cm7wy3kzq8u",
  logoPosition: "top-left",
  scrollZoom: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // create a marker
  const el = document.createElement("div");
  el.className = "marker";

  // add marker
  new mapboxgl.Marker({
    element: el,
    anchor: "bottom"
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // add popup
  new mapboxgl.Popup({ offset: 30 })
    .setLngLat(loc.coordinates)
    .setHTML(`<p> Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // extend the maps bounds to include the current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
