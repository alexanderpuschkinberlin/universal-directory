const axios = require("axios");

const getCoordinates = async (address) => {
  const API_KEY = "AIzaSyDbUuD8wwa9eOdyVKrYMM5ckMhdKAO6hoE";
  address = encodeURI(address);
  const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;
  console.log(API_URL);
  try {
    const res = await axios.get(API_URL);
    if (res.data && res.data.results) {
      const { lat, lng } = res.data.results[0].geometry.location;
      console.log("Address: ", res.data.results[0].geometry.location);
      return { lng: "" + lng, lat: "" + lat };
    }
  } catch (err) {
    console.log(err);
  }
  return { lng: "52.526393", lat: "13.320820" };
};

module.exports = { getCoordinates };
