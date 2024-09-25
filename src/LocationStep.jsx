// LocationStep.js
import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import Spinner from "./components/Spinner";
import locationImage from "../public/images/location.svg";
import "./App.css";
import 'leaflet/dist/leaflet.css';

const mapContainerStyle = {
  width: "100%",
  height: "50%",
};

// Define the allowed country code (ISO 3166-1 alpha-2 code for Egypt is "EG")
const ALLOWED_COUNTRY_CODE = "AU";

export const LocationStep = ({ addressSelected }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get current user location using browser's geolocation API
  const getLocation = useCallback(() => {
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
  }, []);

  // Get the address using Nominatim's reverse geocoding
  const getAddress = useCallback(
    async (lat, lng) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        if (response.data) {
          const country_code = response.data.address.country_code?.toUpperCase();

          // Validate if the country is allowed
          if (country_code !== ALLOWED_COUNTRY_CODE) {
            setError(`Only locations in Australia are accepted.`);
            setAddress("");
            addressSelected("");
          } else {
            setAddress(response.data.display_name);
            setError(null); // Clear any previous errors
            addressSelected(response.data.display_name);
          }
          setLoading(false);
        } else {
          setError("Unable to retrieve address");
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    },
    [addressSelected]
  );

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getAddress(location.latitude, location.longitude);
    }
  }, [location, getAddress]);

  // Handle map clicks to update the location
  const handleMapClick = (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    setLocation({ latitude: lat, longitude: lng });
    getAddress(lat, lng);
  };

  // Redetect the user's current location
  const handleRedetectLocation = () => {
    getLocation();
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="h-[150vh] sm:h-[100vh] space-y-10">
        <h2 className="uppercase text-[#1D506A] text-left p-5 w-[90%] mx-auto font-normal font-alexandria">
          Address Detected
        </h2>
        <div className="flex flex-row items-center space-x-3 p-5 rounded-full bg-[#DDE4E6] shadow-md w-[90%] mx-auto">
          <img
            src={locationImage}
            alt="location"
            className="service-icon w-auto h-auto rounded-full transition-transform"
          />
          <p className="text-base text-[#1D506A]">{address}</p>
        </div>

        {/* Error message as alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-[90%] mx-auto mt-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() => setError(null)} // Close alert when clicking the "X"
              >
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
              </svg>
            </span>
          </div>
        )}

        <div className="h-[100%]">
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={15}
            style={mapContainerStyle}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.latitude, location.longitude]}></Marker>
            <MapEvents />
          </MapContainer>
          <button
            className="text-center w-fit mt-5 p-5 border border-[#123553] rounded-md"
            onClick={handleRedetectLocation}
          >
            Detect My Location Again
          </button>
        </div>
      </div>
    </div>
  );
};
