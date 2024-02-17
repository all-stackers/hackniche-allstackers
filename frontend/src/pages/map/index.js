import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Modal from 'react-modal';

const MapMarker = ({ text }) => <div>{text}</div>;

const GoogleMap = () => {
  // Dummy location data for Mumbai city
  const [locations] = useState([
    { name: 'Gateway of India', lat: 18.9220, lng: 72.8347 },
    { name: 'Juhu Beach', lat: 19.0883, lng: 72.8265 },
    { name: 'Marine Drive', lat: 18.9438, lng: 72.8235 },
  ]);

  // Dummy highly sold items data for Mumbai city
  const [highlySoldItems] = useState({
    'Gateway of India': [
      { name: 'Vada Pav', date: '2023-01-15' },
      { name: 'Pav Bhaji', date: '2023-02-20' },
    ],
    'Juhu Beach': [
      { name: 'Bhel Puri', date: '2023-03-10' },
      { name: 'Pani Puri', date: '2023-04-05' },
    ],
    'Marine Drive': [
      { name: 'Pav Bhaji', date: '2023-05-12' },
      { name: 'Pani Puri', date: '2023-06-18' },
    ],
  });
  const [apiKey, setApiKey] = useState("AIzaSyD4U__ddSGVEOpQY-gdy1_x9d4NBGFzH04");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setModalIsOpen(true);
  };

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: 19.0760, lng: 72.8777 }} // Mumbai's coordinates
        defaultZoom={10}
      >
        {locations.map((location, index) => (
          <MapMarker
            key={index}
            lat={location.lat}
            lng={location.lng}
            text={location.name}
            onClick={() => handleMarkerClick(location)}
          />
        ))}
      </GoogleMapReact>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Highly Sold Dishes in {selectedLocation && selectedLocation.name}</h2>
        {selectedLocation && highlySoldItems[selectedLocation.name].map((dish, index) => (
          <div key={index}>
            <p>{dish.name}</p>
            <p>Sold on: {dish.date}</p>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default GoogleMap;
