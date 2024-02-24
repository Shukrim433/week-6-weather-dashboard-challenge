const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const MAX_DAILY_FORECAST = 5;

var searchHistoryEl = document.getElementById('search-history-div')

//get the search box (used to get the lat and lon w/ the geo weather api from user location input) and search button (to display the data in the
//weather and forecast divs using the weather api):
const searchInputEl = document.getElementById('search-box');
const searchButtonEl = document.getElementById('submit-btn');
//define the search variable to have the value of the user's location input.
//add a click event listener to the submit button so it's event handler gives the search variable a value of the user's location input and calls the
//do something function

//let keyword is used to declare 'search', so it's initially undefined. Later in the clickSearchBtn funtion, the value of search is assigned
//based on whatever location the user inputs into the search box:
let search;
function clickSearchBtn(){
   search = searchInputEl.value
   searchHistoryEl.innerHTML += `<div class="recent-searches">${search}<div>`

    doSomething() //this function is called to use the users location input to find it's lat and lon using a fetch request to the weather api
}
searchButtonEl.addEventListener('click', clickSearchBtn)

// Lookup the location to get the Lat/Lon
function doSomething() {

    var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            // Pick the First location from the results (e.g. u search london, many london GB and london CA will show up in the data array, this code below 
            //makes sure the first 'london' object in the array is chosen)
            //const location = data[0];
            var lat = data[0].lat;
            var lon = data[0].lon;

            // Get the Weather for the cached location (input the defined lat and lon variables into the query string so it searches for the weather of that
            //specific location)
            var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
            
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {

                    console.log(data);

                    // Show the Current Weather Forecast
                    
                    // Show the 5 Day Weather Forecast
                          
                    
                })
            })
}
