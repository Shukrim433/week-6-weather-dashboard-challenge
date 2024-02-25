const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const MAX_DAILY_FORECAST = 5;

var searchHistoryEl = document.getElementById('search-history-div')
var tempSpanEl = document.getElementById('temp-span')
var windSpanEl = document.getElementById('wind-span')
var humiditySpanEl = document.getElementById('humidity-span')
var currentLocationEl = document.getElementById('current-location')
var currentDateSpanEl = document.getElementById('current-date')

//get the search box (used to get the lat and lon w/ the geo weather api from user location input) and search button (to display the data in the
//weather and forecast divs using the weather api):
const searchInputEl = document.getElementById('search-box');
const searchButtonEl = document.getElementById('submit-btn');
//define the search variable to have the value of the user's location input.
//add a click event listener to the submit button so it's event handler gives the search variable a value of the user's location input and calls the
//do something function

var savedCities = JSON.parse(localStorage.getItem('city-key')) || []
//creates an array called savedCitites if there is nothing in local storage, if savedCities array is in localstorage (under the keyy 'city-key)
//then the .forEach() method will iterate over each saved city string in the saved array and create a div with the text content (${element}) of 
//each element in the array AKA each saved city in the array
//e.g. ["london","manchester","paris","rome"]

savedCities.forEach(function(element){
    searchHistoryEl.innerHTML += `<div class="recent-searches">${element}<div>`
})
//.forEach is used to itterate over each element in a specified array and apply a function to each one.

//let keyword is used to declare 'search', so it's initially undefined. Later in the clickSearchBtn funtion, the value of search is assigned
//based on whatever location the user inputs into the search box:
let search;
function clickSearchBtn(){
   search = searchInputEl.value
   searchHistoryEl.innerHTML += `<div class="recent-searches">${search}<div>`
   savedCities.push(search) // pushes each searched city into local storage array (e.g. ["london","manchester","paris","rome"])
   localStorage.setItem('city-key' , JSON.stringify(savedCities))

    doSomething() //this function is called to use the users location input to find it's lat and lon using a fetch request to the weather api
}


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
            currentLocationEl.textContent = data[0].name

            // Get the Weather for the cached location (input the defined lat and lon variables into the query string so it searches for the weather of that
            //specific location)
            var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
            
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {

                    console.log(data);

                    // Show the Current Weather Forecast
                    humiditySpanEl.textContent = data.current.humidity
                    windSpanEl.textContent = data.current.wind_speed
                    tempSpanEl.textContent = data.current.temp
                    var currentDate = data.current.dt
                    currentDateSpanEl.textContent = dayjs.unix(currentDate).format('YYYY-MM-DD')
                    
                    //Show the 5 Day Weather Forecast
                    $('#forecast-days .forecast-day').each(function(index){// index is a parameter used 
                         
                            var unixDate = data.daily[index].dt
                            var normalDate = dayjs.unix(unixDate).format('YYYY-MM-DD')
                            $(this).children('.date').text('Date: '+ normalDate)
                            $(this).children('.temp').text('Temp: '+ data.daily[index].temp.day)
                            $(this).children('.wind').text('Wind: '+ data.daily[index].wind_speed)
                            $(this).children('.humidity').text('Humidity: ' +data.daily[index].humidity)
                        
                    })

                    //in the .each() method, the callback function can accept two parameters: index and element
                    //the value of the idex parameter will always start at 0, this represents the index position of the first element that matchhes 
                    //the specified css selector in the $() and because were using the .each() method the value of index incraments by one each time for
                    //each element with the specified css selector.
                    //SO because there are 5 elements w/ the '.forecast-day' class attribute, the value of index only goes up to 5.
                    //The daily array has 7 object elements, so by using [index] youre able to iterate through the daily array, starting from the index
                    //position 0 to 5 (day 1 to 5)
                    
                    /*if (index < 5){
                        $(this).find('.date').text(data.daily[index].dt)
                        $(this).find('.temp').children('span').text(data.daily[index].temp[0])
                        $(this).find('.wind').children('span').text(data.daily[index].wind_speed)
                        $(this).find('.humidity').children('span').text(data.daily[index].humidity)
                    }*/
                          
                    
                })
            })
}

searchButtonEl.addEventListener('click', clickSearchBtn)