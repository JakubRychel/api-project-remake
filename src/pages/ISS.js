import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Subpage from './Subpage';

const icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

function Map({ latitude, longitude }) {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], mapRef.current.getZoom());
    }
  }, [latitude, longitude]);

  return (
    <MapContainer center={[latitude, longitude]} zoom={4} style={{ height: '500px', width: '100%' }} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[latitude, longitude]} icon={icon}></Marker>
    </MapContainer>
  );
}

function ISS() {
  const API_URL = 'http://api.open-notify.org/iss-now.json';

  const [position, setPosition] = useState({
    latitude: '0',
    longitude: '0'
  });

  const decimalToDMS = (coordinate, type) => {
    const degrees = Math.floor(Math.abs(coordinate));
    const minutesDecimal = (Math.abs(coordinate) - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = Math.round((minutesDecimal - minutes) * 60);

    let direction = '';
    if (type === 'latitude') {
      direction = coordinate >= 0 ? 'N' : 'S';
    }
    else if (type === 'longitude') {
      direction = coordinate >= 0 ? 'E' : 'W';
    }

    return `${degrees}°${minutes}'${seconds}" ${direction}`;
  }

  useEffect(() => {
    const fetchISSPosition = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        setPosition(result.iss_position);
      }
      catch (error) {
        console.error('Error fetching ISS position:', error);
      }
    }
    fetchISSPosition();
    const interval = setInterval(fetchISSPosition, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Subpage header="Pozycja ISS">
      <div class="row">
        <div className="col-xs-12 col-md-4">
          <div><h4 className="my-3">Współrzędne geograficzne</h4></div>
          <div>
            <table className="data">
              <thead>
                <tr>
                  <th>Współrzędna</th>
                  <th>Wartość</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Szerokość</td>
                  <td>{decimalToDMS(position.latitude, 'latitude')}</td>
                </tr>
                <tr>
                  <td>Długość</td>
                  <td>{decimalToDMS(position.longitude, 'longitude')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-xs-12 col-md-8">
          <div><h4 className="my-3">Pozycja na mapie</h4></div>
          <div>
            <Map latitude={position.latitude} longitude={position.longitude} />
          </div>
        </div>
      </div>
    </Subpage>
  );
}

export default ISS;