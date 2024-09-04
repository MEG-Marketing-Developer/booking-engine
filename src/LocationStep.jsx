// LocationStep.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import Spinner from "./components/Spinner";
import Autocomplete from "react-google-autocomplete";
import "./App.css";
import locationImage from "../public/images/location.svg";

const mapContainerStyle = {
  width: "100%",
  height: "50%",
};

export const LocationStep = ({ addressSelected, apiKey }) => {
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
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
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
      <div className="h-[150vh] sm:h-[100vh]">
        <h2 className="uppercase text-[#1D506A] text-left p-5 w-[90%] mx-auto font-normal font-alexandria">
          Address deticted
        </h2>
        <div className="flex flex-row items-center space-x-3 p-5 rounded-full bg-[#DDE4E6] shadow-md w-[90%] mx-auto">
          <img
            src={locationImage}
            alt="location"
            className="service-icon w-auto h-auto rounded-full transition-transform"
          />
          <p className="text-base text-[#1D506A]">{address}</p>
        </div>

        <div className="flex py-6">
          <Autocomplete
            apiKey={apiKey}
            onPlaceSelected={handlePlaceSelected}
            options={{
              types: ["geocode"],
            }}
            className="address-autocomplete-input  text-[#1D506A] placeholder-[#1D506A] pl-8 mb-2.5 text-xl space-x-3 p-5 rounded-full bg-[#DDE4E6] shadow-md w-[90%] mx-auto"
            placeholder="Search for a location"
          />
        </div>
        <div className="h-[100%]">
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
