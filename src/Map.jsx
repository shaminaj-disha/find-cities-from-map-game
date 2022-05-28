import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import icon from "./constants";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import ScorePart from "./components/Header/ScorePart";

const DEFAULT_LATITUDE = 54.5260;
const DEFAULT_LONGITUDE = 15.2551;
let latitude = DEFAULT_LATITUDE;
let longitude = DEFAULT_LONGITUDE;
let score = 1500;
let cityFound = 0;
const Map = () => {
    const [state, setState] = useState(null);
    const [position, setPosition] = useState(null);
    // const[markedlatitude, setMarkedlatitude] = useState(0);
    // const[markedlongitude, setMarkedlongitude] = useState(0);
    // console.log(position);
    // const [score, setScore] = useState(1500);
    // console.log(score);

    const [locations, setLocations] = useState();

    useEffect(() => {
        fetch('locations.json')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setLocations(data);
            })
    }, []);

    useEffect(() => {
        if (position) {
            function getDistance(origin, destination) {
                // return distance in meters
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
            // var distance = getDistance([52.370216, 4.895168], position);
            // const fixedDistance = distance.toFixed();
            // console.log(distance);

            const success = locations[0].cities.find(city => ((getDistance([(city?.position?.lat), (city?.position?.lng)], position))) <= 50);
            // console.log(success);



            // console.log(success);

            // const success = locations[0].cities.find(city => ((city?.position?.lat === position[0]) && (city?.position?.lng === position[1])));

            if (success) {
                const distance = Math.abs((getDistance([success?.position?.lat, success?.position?.lng], position)).toFixed());
                console.log(distance);
                cityFound = cityFound + 1;
                alert(`Your attempt to find ${success.name} is successful. Your distance from the city is about ${distance}. Found city: ${cityFound}`);
            }
            else if (!success && (score > 0)) {
                score = score - 500;
                console.log(score);
                alert(`Your attempt failed.`);
            }
            else {
                if (score <= 0) {
                    console.log(score);
                    alert(`Your Failed. Try again. Highest Score: ${cityFound}`);
                    score = 1500;
                }
            }
        }

    }, [locations, position]);


    // if (position) {
        // console.log(locations[0]?.cities);
        // const success = locations[0].cities.find(city => ((city?.position?.lat === position[0]) && (city?.position?.lng === position[1])));
        // var fromLatLng = L.latLng(from);
        // var toLatLng = L.latLng(to);

        // var dis = fromLatLng.distanceTo(toLatLng);
        // console.log(dis);
        // function getDistance(origin, destination) {
        //     // return distance in meters
        //     var lon1 = toRadian(origin[1]),
        //         lat1 = toRadian(origin[0]),
        //         lon2 = toRadian(destination[1]),
        //         lat2 = toRadian(destination[0]);

        //     var deltaLat = lat2 - lat1;
        //     var deltaLon = lon2 - lon1;

        //     var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
        //     var c = 2 * Math.asin(Math.sqrt(a));
        //     var EARTH_RADIUS = 6371;
        //     return c * EARTH_RADIUS;
        // }
        // function toRadian(degree) {
        //     return degree * Math.PI / 180;
        // }
        // // var distance = getDistance([52.370216, 4.895168], position);
        // // const fixedDistance = distance.toFixed();
        // // console.log(distance);

        // const success = locations[0].cities.find(city => ((getDistance([(city?.position?.lat), (city?.position?.lng)], position))) <= 50);
        // // console.log(success);



        // // console.log(success);

        // // const success = locations[0].cities.find(city => ((city?.position?.lat === position[0]) && (city?.position?.lng === position[1])));

        // if (success) {
        //     const distance = Math.abs((getDistance([success?.position?.lat, success?.position?.lng], position)).toFixed());
        //     console.log(distance);
        //     cityFound = cityFound + 1;
        //     alert(`Your attempt to find ${success.name} is successful. Your distance from the city is about ${distance}. Found city: ${cityFound}`);
        // }
        // else if (!success && (score > 0)) {
        //     score = score - 500;
        //     console.log(score);
        //     alert(`Your attempt failed.`);
        // }
        // else {
        //     if (score <= 0) {
        //         console.log(score);
        //         alert(`Your Failed. Try again. Highest Score: ${cityFound}`);
        //         score = 1500;
        //     }
        // }
    // }

    useEffect(() => {
        if (state) {
            // console.log(state);
            const { target } = state;
            target.on("click", function (e) {
                //    console.log(e);
                setPosition([e?.latlng?.lat, e?.latlng?.lng]);
                //  console.log(position);
                target.flyTo(e.latlng, target.getZoom());
            });
        }
    }, [state, position]);

    return (
        <div>
            <div>
                {locations && <h3>Find the locations for {
                    locations[0]?.cities?.map(city => <span key={city?.id}>, {city?.name} </span>)
                }</h3>}
            </div>
            <h3>Initial Point: {score}</h3>
            <h3>Highest Score: {cityFound}</h3>
            {/* <ScorePart locations={locations} /> */}
            <MapContainer
                className="leaflet-map"
                center={[latitude, longitude]}
                zoom={5}
                scrollWheelZoom={true}
                style={{ width: "100vw", height: "100vh" }}
                whenReady={(map) => {
                    //   console.log(map);
                    setState(map);
                }}
            >
                <TileLayer
                    attribution='&copy; <a https://api.maptiler.com/maps/openstreetmap/tiles.json?key=c8hghCmwOR1QMSI5cVw2</a> contributors'
                    url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=c8hghCmwOR1QMSI5cVw2"
                />
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