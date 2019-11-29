const forecast = require('./forecast.js');

forecast.coordinates(process.argv[2], (error, {longitude, latitude, place_name}) =>{
    if(error)
        return console.log(error);
    else if(!process.argv[2]){
        return console.log('Please provide the place name!');
    }
    //to forecast weather for given coordinates
    forecast.fore([longitude, latitude], (error, response) =>{
        if(error)
            return console.log('error : ' + error);

        console.log('Place : ' + place_name);
        //console.log('rain : ' + response.rain + '\ntemperature : ' + response.temperature);
        console.log('Summary : ' + response.summary);
    });
});