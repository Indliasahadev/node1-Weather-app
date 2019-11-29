//hello there its my first git project
const path = require('path');
const express = require('express');
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
// const weatherFore = require('./utils/weather-app.js')

console.log(__dirname);
console.log(path.join(__dirname,'../public'));

//const forecast = reqclearuire('/home/sahadev/Documents/College/Web/NodeJS/practice/forecast.js')
const app = express();

//For heroku : PORT from heroku and 3000 is default value 
const port = process.env.PORT || 3000

//setting path to the required directories for express config
const viewsPath = path.join(__dirname, "../templates/views")
const hbsPath = path.join(__dirname,'../templates/partials')
const publicDirectoryPath = path.join(__dirname,'../public');

//app.use to customize our server
//express.static() -> it takes path we serve up;

// hbs -> handelbars for dynamic changes in all html pages;
//setup handelbars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(hbsPath);

//setup to static dir to serve
app.use(express.static(publicDirectoryPath))

//it let us configure what the server should do when some one is try to get the resource at the specific url;
//maybe we sending back html or json
//it's for root directory;
// app.get(''/* 1st is route */, (req/*incoming request */, res/*it let us customize what we gonna send back to the requester */)/* fn to describe what we gonna do when some one access this particular route */ =>{
//     // through request we can read databases or create some html
//     // this msg will display to the browser
//     res.send('<h1>Hello Express!</h1>');//this method let us send back to the requester
// });

// //route example : 
// //app.com
// //app.com/help
// //app.com/about

// //for help 
// app.get('/help', (req,res) =>{
//     res.send([{
//         name : 'Sahadev'
//     },{
//         name : 'Sarah'
//     }]);
// })

//for dynamic
//app.get is the route handler
app.get('', (req, res) =>{
    //to render dynamic page from view 
    //don't need to provide extension
    res.render('index'/*this the file name  without extension .hbs */,{
        title : 'Weather',
        name : 'Sahadev',
    })
})

//for about
app.get('/about', (req, res) => {
    res.render('about',{
        title : 'About page',
        desc : 'Ninja',
        name : 'Chachaa'
    })
})

//for help 
app.get('/help', (req, res) =>{
    res.render('help',{
        title : 'Help Page',
        msg : 'this is a help page to provide the weather around you',
        name : 'Drac'
    })
})

//for weather app
app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error : 'Please provide a address'
        })
    }

    forecast.coordinates(req.query.address, (error, {longitude, latitude, place_name} = {}) =>{
        if(error){
            return res.send({
                error
            });
        }
        // else if (longitude === )
        //console.log(resp.latitude)
        forecast.fore([longitude, latitude],(error, {temperature, rain, summary}) =>{
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                temperature,
                rain,
                summary,
                place_name : place_name
            })
        })
    }) 
})

//for learning request
app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error : 'Provide a search term'
        })
    }

    res.send({
        product : 'DBZ'
    })
})

//for help error
app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: '404',
        name : 'Chachaa',
        errorMessage : 'Help article not found!'
    })
})
//for error 
app.get('*', (req, res) =>{
    res.render('404',{
        title : '404',
        name : 'Sahadev',
        errorMessage : 'Page not found!'
    })
})
//for about page
// app.get('/about', (req, res) =>{
//     res.send('<h1>This site is for fun :)<h1>')
// })

//to start server up ;
//common development port 3000
app.listen(port, () =>{
    //this msg will display on terminal ;
    console.log('Server is up on port ' + port);
});