import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import icon from "./constants";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import './Map.css'

const DEFAULT_LATITUDE = 54.5260;
const DEFAULT_LONGITUDE = 15.2551;
const latitude = DEFAULT_LATITUDE;
const longitude = DEFAULT_LONGITUDE;
const INITIAL_SCORE = 1500;
const INITIAL_CITY = 0;
const INITIAL_DISTANCE = 0;

const Map = () => {
    // Declared States
    const [mapState, setMapState] = useState(null);
    const [position, setPosition] = useState(null);

    const [score, setScore] = useState(INITIAL_SCORE);
    const [cityFound, setCityFound] = useState(INITIAL_CITY);
    const [cityDistance, setCityDistance] = useState(INITIAL_DISTANCE);

    const [cityName, setCityName] = useState(null);
    const [locations, setLocations] = useState();

    // Function for calculating the distance
    function getDistance(origin, destination) {
        // return distance in kilometers
        var lon1 = toRadian(origin[1]),
            lat1 = toRadian(origin[0]),
            lon2 = toRadian(destination[1]),
            lat2 = toRadian(destination[0]);

        var deltaLat = lat2 - lat1;
        var deltaLon = lon2 - lon1;

        var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
        var c = 2 * Math.asin(Math.sqrt(a));
        var EARTH_RADIUS = 6371;
        return c * EARTH_RADIUS;
    }
    function toRadian(degree) {
        return degree * Math.PI / 180;
    }

    // fetch the json file from public folder
    useEffect(() => {
        fetch('locations.json')
            .then(res => res.json())
            .then(data => {
                setLocations(data);
            })
    }, []);

    // gets the position of marker on mouse click
    useEffect(() => {
        if (mapState) {
            const { target } = mapState;
            target.on("click", function (e) {
                setPosition([e?.latlng?.lat, e?.latlng?.lng]);
                console.log("position", position);
                target.flyTo(e.latlng, target.getZoom());
            });
        }
    }, [mapState, position]);

    // checks if the clicked position is within 50 km 
    useEffect(() => {

        if (position) {
            // compares clicked position with json data and finds matched object which is within 50 km from json
            const success = locations[0].cities.find(city => ((getDistance([(city?.position?.lat), (city?.position?.lng)], position))) <= 50);

            console.log('success', success);

            // If data from json matches with the clicked position then
            if (success && score > 0) {
                // calls the getDistance function and gets the distance, takes country longitude, latitude and the mouse clicked position as parameters
                const distance = Math.abs((getDistance([success?.position?.lat, success?.position?.lng], position)).toFixed());
                console.log("distance", distance);
                setCityFound(cityFound + 1);
                setScore(score - parseInt(distance));
                setCityDistance(distance);
                setCityName(success.name);
                console.log(`Your attempt to find ${success.name} is successful. Your distance from the city is about ${distance}. Found city: ${cityFound}`);
            }

            // If data from json doesn't match with the clicked position then
            else if (success === undefined && score > 0) {
                // gets distance from calling the function
                const distance = locations[0].cities.map(city => ((getDistance([(city?.position?.lat), (city?.position?.lng)], position))));
                console.log("City not found", distance, Math.min.apply(null, distance));
                setScore(score - (Math.abs(Math.min.apply(null, distance))));
                setCityDistance((Math.abs(Math.min.apply(null, distance))).toFixed());
                setCityName(null);
                console.log(score);
                console.log(`Your attempt failed.`);
            }
            // If points reduces to zero
            else {
                if (score <= 0) {
                    console.log(score);
                    alert(`Game Over. Highest Score: ${cityFound}`);
                    setCityDistance(INITIAL_DISTANCE);
                    setScore(INITIAL_SCORE);
                    setCityFound(INITIAL_CITY);
                    setCityName(null);
                }
            }
        }

    }, [locations, position]);

    return (
        <div className="map-body">
            <div className="map-header">
                {locations && <h3>Find the locations for {
                    locations[0]?.cities?.map(city => <span key={city?.id}>, {city?.name} </span>)
                }</h3>}
                <h3>Game Points: {score > 0 ? score.toFixed(0) : 0}</h3>
                <h3>City Name: {cityName}</h3>
                <h3>Distance: {cityDistance}</h3>
                <h3>Your Score: {cityFound}</h3>
            </div>

            {/* Display Map */}
            <MapContainer
                className="leaflet-map"
                center={[latitude, longitude]}
                zoom={5}
                scrollWheelZoom={true}
                style={{ width: "100vw", height: "100vh" }}
                whenReady={(map) => {
                    setMapState(map);
                }}>
                {/* Open street map from cloud.maptiler.com */}
                <TileLayer
                    attribution='&copy; <a https://api.maptiler.com/maps/openstreetmap/tiles.json?key=c8hghCmwOR1QMSI5cVw2</a> contributors'
                    url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=c8hghCmwOR1QMSI5cVw2"
                />
                {/* Marker changes with the different position values from mouse clicks */}
                {position && (
                    <Marker position={position || [latitude, longitude]} icon={icon}>
                        <Popup>You are in {position && position}</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default Map;