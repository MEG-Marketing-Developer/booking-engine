import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import Spinner from "./components/Spinner";
import Autocomplete from "react-google-autocomplete";
import "./App.css";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Replace with your Google Maps API key

const mapContainerStyle = {
  width: "100%",
  height: "50%",
};

export const LocationStep = ({ addressSelected }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const getAddress = useCallback(
    async (lat, lng) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}&libraries=places`
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

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLocation({ latitude: lat, longitude: lng });
    await getAddress(lat, lng);
  };

  const handlePlaceSelected = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setLocation({ latitude: lat, longitude: lng });
    setAddress(place.formatted_address);
    addressSelected(place.formatted_address);
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
        <div className="flex py-2">
          <Autocomplete
            apiKey={API_KEY}
            onPlaceSelected={handlePlaceSelected}
            options={{
              types: ["geocode"],
            }}
            className="address-autocomplete-input w-full pl-3 mb-2.5 h-[50px] rounded-t-lg text-xl"
            placeholder="Search for a location"
          />
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
          <button className="text-center w-fit mt-5 p-5 border border-[#123553] rounded-md" onClick={handleRedetectLocation}>
            Detect My Location Again
          </button>
        </div>
      </div>
    </div>
  );
};
