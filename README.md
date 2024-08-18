# week-6-weather-dashboard-challenge

## Description

- The reason I made this webpage was to make it easier for employees to plan out their busy days from 9 in the morning to 5 in the afternoon, which is the typical working hours. To do this i created a work day scheduler which has a time slot for each hour of the day for users to enter in the tasks they want to complete during that hour and save each one. This way they can come back throughout the day to view their tasks to make sure they're done on time and the hour sections change colour every hour to indicate if each task is in the past (grey), present(red), future(green), which will help users stay on track.

## Process

- The first thing i did was create the layout of the webpage in the html file, the main components of the webpage being the search history <aside>, the weather <div> and the weather forecast <div>, all of which were in the <main> element.

- Then i added some basic css styling to these elements, including making the <aside> float:left and width:25% and the weather and weather forcast divs set to float:right and width:75%. I also used display:flex to further organise all the elements on the page.

- Next i got all the variables that i would need to access dynamically in javascript and save them under their respective variable names. (after adding the javascript starter code file to my assets folder )

- I set the value of the search variable to nothing so it was 'undefined' using the 'let'keyword, so i could define it later on in the code.

- Then i added a click event listener to the searchButtonEl and set the call back function to be the clickSearchBtn function. In the clickSearchBtn function i set the value of the search variable to 'searchInputEl.value' (which is whatever location the user inputs into the search box)

- Then i created a savedCities variable that would hold the value of an array of all the searched cities saved in local storage under the key 'city-key', if there is nothing saved in local storage under the key 'city-key' then savedCities will hold the value of an empty array.
Then i used the forEach() method on the savedCities array.The method had an anonymous callback function with the parameter of 'element' which represents each element (saved city) in the savedCities array e.g. ["london","manchester","paris","rome"]. So the .forEach() method will iterate over each saved city string in the savedCities array and create a div with the text content of each element in the array (${element}) AKA each saved city in the array.

- Then, back in the clickSearchBtn function, I added this line of code 'searchHistoryEl.innerHTML += `<div class="recent-searches">${search}<div>`' so that everytime the search button is clicked we dynamically add a div containing the value of what was searched to the searchHistoryEl div. I also pushed the search variable to the savedCities array, and then saving the savedCities array to local storage as the value under the key - 'city-key' [localStorage.setItem('city-key' , JSON.stringify(savedCities))]

- At the end of the clickSearchBtn function i called the doSomething Function, so that when the search button is clicked the API calls(fetch requests) are initiated, which will retrieve the data we need for the weather dashboard from the server.

- In the doSomething function the variable apiUrl is set to hold the open weather api with the geo end point, the search variable[the city the user searches for] and the api key. 
Then a fetch request is made to the apiUrl and a promise is returned, then the promise resolves to a response and then .json is used to convert the JSON string response returned by the server into a JavaScript object so that it can be easily manipulated and used within the JavaScript code. So the promise returned by the .then(response => response.json()) resolves to 'data', the parsed JavaScript object that represents the response body in a parsed form as a JavaScript object, so you can access and manipulate the data in javascript.
When the lat and lon are obtained, they are saved under the variables 'lat' and 'lon'.
Then in the fetch function we are able to define the apiUrl variable in the local scope. In the query string parameter of the url we set the lat and lon parameters to the defined lat and lon variables so it searches for the weather of that specific location. Then another fetch() request is sent using the new apiUrl this time and we can use this data to display the weather information.

-To show the current weather forecast in the weather <div> i set the text contents of the elements in that div using the response body returned by the server for the second fetch request. I also set the cloud icons using 'https://www.shecodes.io/athena/37844-how-to-add-weather-visuals-using-javascript-and-apis'

-To show the 5 day weather forecast in the weather forecast <div> i added a .each() method to all divs with the 'forecast-day' class attribute. The callback function in .each had the parameter of 'index'.The value of the idex parameter starts at 0, which represents the index position of the first element that matches the specified css selector '.forecast-day'. So because were using the .each meathod the value of index increases by one for each '.forecast-day' <div>. So since there are 5 '.forecast-day' <div>s the value of index goes up to 5. So what is the purpose of the index parameter incramenting to 5? I it so that we can itterate through the daily array, starting from the index position 0 to 5 (day 1 to 5) [The daily array has 7 object elements] e.g. [$(this).children('.temp').text('Temp: '+ data.daily[index].temp.day)]
I also used jquery and the 'this' keyword to set the text content of the elements in the weather forecast div. In this section i used dayjs to format the unix timestamp and display it as the date for eachday.                

- Lastly i added a click event listener to the document (specifying the .recent-searches divs as the child to listen to) and displays the weather and forecast the same way (but no saving to local storage). Because, using event delegation with $(document).on('click', '.recent-searches', ...) is typically preferred when you have dynamically added elements like the 'recent-searches' divs.

## Webpage

- This is a screenshot of the deployed application:

![image](https://github.com/user-attachments/assets/0f7b0fef-f074-4f72-b7b3-c97d5cdd3497)



- This is a link to the deployed webpage:
https://shukrim433.github.io/week-6-weather-dashboard-challenge/
