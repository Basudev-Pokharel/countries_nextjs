"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useDispatch, useSelector } from "react-redux";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import { renderToString } from "react-dom/server";

const page = () => {
  const countries = useSelector((state) => state.countries.countries);
  const [countriesData, setCountriesData] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  console.log(countries);
  // const map = useMap();
  let dispatch = useDispatch();

  setTimeout(() => {
    console.log("countries", countries);
  }, 4000);
  useEffect(() => {
    dispatch(fetchCountries());
    setCountriesData(countries);
  }, [dispatch]);
  console.log(countriesData);

  //Icons for map goes here
  const iconMarkup = renderToString(
    <LocationPinIcon style={{ fontSize: 40, color: "red" }} />
  );
  let CustomIcon = L.divIcon({
    html: iconMarkup,
    className: "",

    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  });
  // console.log(map);

  //Get Lat&Lon with the city name:
  useEffect(() => {
    if (countriesData.length !== 0) {
      countriesData.map((country) => {
        let data = getLatLon(country.capital[0]).then((data) => {
          let geoData = data[0];
          setCoordinates((prev) => [
            ...prev,
            { lat: geoData.lat, long: geoData.lon, name: geoData.name },
          ]);
        });
      });
    }
  }, [countriesData]);

  async function getLatLon(city) {
    let GeoData = await fetch(
      // `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
      `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
    );
    let data = await GeoData.json();

    return data;
  }
  async function getDData() {
    console.log("API DATTTTA:", await getLatLon("helsinki"));
  }
  return (
    <>
      <Box
        sx={{
          width: "900px",
          mx: "auto",
          height: "500px",
          maxHeight: "800px",
          maxWidth: "1200px",
          border: "4px solid red",
        }}
      >
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]} icon={CustomIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        <br />
        <button
          onClick={() => {
            getDData();
          }}
        >
          Get location
        </button>
      </Box>
    </>
  );
};

export default page;
