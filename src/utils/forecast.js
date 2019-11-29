const request = require('request');

//function to forecast weather at given co-ordinates
const fore = (coordinates, callback) =>{
    const url = 'https://api.darksky.net/forecast/6a225743b3379b0a1fa688992f421762/' + coordinates[1] + ',' + coordinates[0] + '?units=si';

    //sending request to the API
    request({url, json : true}, (error, {body})=>{
        if(error)
            return callback('Error while connecting to the weather service!');
        else if(body.error)
            return callback('Location coordinates are incorrect, please try another!');
        else{
            const temperature = body.currently.temperature;
            const summary = body.daily.summary;
            const rain = body.currently.precipProbability;
            // const forecast = 'Tempareture : ' + temperature + '\nrain : ' + rain;
            callback(undefined,{temperature,rain,summary});
        }
    });
};

//f'n to find co-ordinates of given location
const coordinates = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FoYWRldi13YXJyaW9yIiwiYSI6ImNrMWdpdDB1aDBienUzbXFwZTUyYno0OW0ifQ.ms35wi9GfQTv8vl0pg_fUg';

    request({ url/*it\'s use the var declared & defined (destructuring) above */, json : true}, (error, response) =>{
        if(error){
            return callback('Failed to connect to the weather-forecast server!');
        }else if(response.body.features.length === 0){
            return callback('location is not found!Please try another');
        }else{
            const longitude = response.body.features[0].center[0];
            const latitude = response.body.features[0].center[1];
            const place_name = response.body.features[0].place_name;
            callback('',{longitude, latitude, place_name});
        }
    });
}

module.exports = {
    fore,
    coordinates
}



