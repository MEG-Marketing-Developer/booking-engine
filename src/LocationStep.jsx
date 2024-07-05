import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './components/Spinner';
import "./App.css";
const API_KEY = 'AIzaSyC6eOUld3offrHhp5c3414PREcndXjf7Tc'; // Replace with your Google Maps API key

export const LocationStep = ({addressSelected}) => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };
  
    const getAddress = async (lat, lng) => {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`);
        if (response.data.status === 'OK') {
          setAddress(response.data.results[0].formatted_address);
          setLoading(false);
          addressSelected(response.data.results[0].formatted_address)
        } else {
          setError('Unable to retrieve address');
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getLocation();
    }, []);
  
    useEffect(() => {
      if (location.latitude && location.longitude) {
        getAddress(location.latitude, location.longitude);
      }
    }, [location]);
  
    if (loading) {
      return <Spinner />;
    }
  
    if (error) {
      return <div className="error-message">Error: {error}</div>;
    }
  
    return (
      <div>
        
          <div>
            <h3>Your Location</h3>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
            <h3>Address</h3>
            <p>{address}</p>
          </div>
        
      </div>
    );
  };
  

