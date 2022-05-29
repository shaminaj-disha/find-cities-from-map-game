# Find Cities In The Map Game

[Live Website Link](https://dazzling-bubblegum-ceb81f.netlify.app/)

## Game Description

* The players will see a map. The initial location is set in Europe.

* The players have to find the mentioned country. The initial score is set to 1500 points which will be decreased by the the exact value of the distance in kilometers from the nearest city on mouse click.

* When the distance is within 50km, it will be a successful find, the city name and the highest Score will be updated.

* For every click, if there is a distance, it will be deducted from the initial points.

* The game will terminate when initial points value gets to zero.


## Technologies

* React.js
* React Leaflet
* Map from Cloud Maptiler


## Improvement

* The cities are shown in this map, could not find a good map api which doesn't show the cities or streets, will have to search more thoroughly

* If a city is selected once, it can't be selected again. A marker can be placed there as well. But here in this project it is not fixed

* Also some shapes could be drawn when the mouse is clicked to draw a circle or a polygon

* The minimum distance can be shown with a path in the map

* User authentication can be added

* UI design is very basic. It can be improved

* As this code doesn't have much functionalities, I didn't structure components in a organized way. Almost all the codes are placed in only one component - `Map.jsx`. It can be organized in a better way later on, when I add more features