import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "react-query";

const MapWithMarkers = () => {
  const { data: countriesData, status } = useQuery(
    "countriesData",
    async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();
      return data;
    }
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="min-h-[600px] h-full w-full ">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {countriesData?.map((countryData) => (
          <Marker
            key={countryData.country}
            position={[
              countryData.countryInfo.lat,
              countryData.countryInfo.long,
            ]}
          >
            <Popup>
              <div>
                <h2>{countryData.country}</h2>
                <p>Total Active Cases: {countryData.active}</p>
                <p>Total Recovered Cases: {countryData.recovered}</p>
                <p>Total Deaths: {countryData.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapWithMarkers;
