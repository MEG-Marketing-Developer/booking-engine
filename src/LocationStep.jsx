import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import Spinner from "./components/Spinner";
import "./App.css";

const API_KEY = "AIzaSyC6eOUld3offrHhp5c3414PREcndXjf7Tc"; // Replace with your Google Maps API key

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 0,
  lng: 0,
};

export const LocationStep = ({ addressSelected }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState("");
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
      setError("Geolocation is not supported by this browser.");
    }
  };

  const getAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
      );
      if (response.data.status === "OK") {
        setAddress(response.data.results[0].formatted_address);
        setLoading(false);
        addressSelected(response.data.results[0].formatted_address);
      } else {
        setError("Unable to retrieve address");
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
  
  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLocation({ latitude: lat, longitude: lng });
    await getAddress(lat, lng);
  };

  const handleRedetectLocation = () => {
    getLocation();
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div>
      <div className="h-[100vh]">
        <div className="flex py-10 justify-start space-x-3">
          <h3 className="font-bold text-xl">Address: </h3>
          <p className="text-xl">{address}</p>
        </div>
        <div className="h-[100%]">
          <LoadScript googleMapsApiKey={API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={{ lat: location.latitude, lng: location.longitude }}
              zoom={15}
              onClick={handleMapClick}
            >
              <MarkerF
                position={{ lat: location.latitude, lng: location.longitude }}
              />
            </GoogleMap>
          </LoadScript>
          <button className="text-center w-fit mt-5 p-5 border border-[#123553] rounded-md" onClick={handleRedetectLocation}>Detect My Location Again</button>
        </div>
      </div>
    </div>
  );
};
