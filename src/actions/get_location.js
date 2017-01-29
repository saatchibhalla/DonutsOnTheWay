import axios from 'axios';

const API_KEY = "AIzaSyAThmhGIxKib_M6l0v2Cm9NAK9OjMrNAkY";
const URL = `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`

export const FETCH_LOCATION = 'FETCH_LOCATION';

export function fetchLocation() {
  const request = axios.post(URL); //Promise

  return {
    type: FETCH_LOCATION,
    payload: request
  };
}
