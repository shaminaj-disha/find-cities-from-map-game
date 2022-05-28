# Simple Map Game

[Live Website Link](https://dazzling-bubblegum-ceb81f.netlify.app/).

## Game Description

* The players will see a map. The initial location is set in Europe.

* The players have to find the mentioned country. The initial score is set to 1500 points which will decrease by the the exact value of the distance in kilometers from the nearest city on mouse click.

* When the distance is within 50km, it will be a successful find and the highest Score will be updated.

* For every click, if there is a distance, it will be reduced from the initial point.

* The game will terminate when initial points value gets to zero.


## Technologies

* React.js
* React Leaflet
* Map from Cloud Maptiler


## Improvement

* User authentication can be added

* The cities are shown in this map, could'nt find a good map api which doesn't show the cities or streets, will have to search more thoroughly

* If a city is selected it can't be selected again, a marker will be placed there as well.

* The minimum distance can be shown with a path in the map. 