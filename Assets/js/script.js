$(document).ready(function() {

    // Testing that logic.js has been successfully linked to index.html.
    console.log("logic.js is linked successfully");
    const searchCity = $("#searchCity");
    const cityList = $(".cityList");
    const searchButton = $("#searchButton");
    let searchHistory = [];
    const weatherArea = $(".weatherArea");
    const forecastArea = $(".cardArea");
  
    
    $(searchButton).click(function(event) {
      event.preventDefault();
      console.log("requesting weather data...");
      
      let searchedCity = $(searchCity).val();
      let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&appid=c1a8441894f24baaa155fb383073ff34"
  
      // Push user's search into variable array
      searchHistory.push(searchedCity);
  
      if (searchedCity != "") {
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  
        // Request weather data from OpenWeatherMap API
        $.ajax({
            url: queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&appid=c1a8441894f24baaa155fb383073ff34",
            method: "GET",
            dataType: "jsonp",
          })
          .then(function(response) {
            console.log(response);
            let weatherData = show(response);
            $(weatherArea).html(weatherData);

            // Display forecast data in forecastArea
  
            let forecastData = "";

            // For each item in response...
            for (var i in response.list) {
              if (i > 0 && response.list[i].dt_txt.indexOf("12:00") > -1) { 
                // Create variable to contain forecast data
                let forecastArray = [
                  "<div class = 'col-sm-2 day float-right'>",
                  "<p>",
  
                  response.list[i].dt_txt.split(" ")[0],
                  "</p>",
                  "<img src = 'http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png'>", 
                  "<p> Temp: ",
  
                  response.list[i].main.temp,
                  " degrees</p>",
                  "<p> Humidity: ",
  
                  response.list[i].main.humidity,
                  "%</p>",
                  "</div>"
                ];
                // Add forecast Data to forecastArray
                forecastData += forecastArray.join("");
              }
            }
            // Display forecast data in forecastArea
            $(forecastArea).html(forecastData);
            $(searchCity).val("");
          });
      }
      // If the search field is empty...
      else {
        $(weatherArea).text("Search field can't be empty");
        $(forecastArea).text("Search field can't be empty");
      }
    });
    // function for showing the response data for the weather
    function show(response) {


      console.log("Showing Response: ", response);
  return "<h3 style='font-size:40px; font-weight:bold;'>" + response.city.name +   " </h3>" + 
        "<p class = 'lead'>Temp: " + response.list[0].main.temp + " degrees</p>" +
        "<p class = 'lead'>Humidity: " + response.list[0].main.humidity + " %</p>" +
        "<p class = 'lead'>Wind Speed: " + response.list[0].wind.speed + " mph</p>";
    };
    // Get searh history from local storage and display in cityList
    function showHistory() {
      let searchStorage = JSON.parse(localStorage.getItem("searchHistory"));
      $(cityList).append("<tr>").append("<td>" + searchStorage + "</td>")
    }

  
    showHistory();
  
    // Close of 'document.ready' function
  });
