const path = require('path')
const hbs = require('hbs')
const express = require('express')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()//define my aplication object using express

const port = process.env.PORT || 3000

//default absolute paths for general use
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//define the static directory to serve up. the public directory will be available from the URL, so the pages can access it
app.use(express.static(publicDirectoryPath))

//set up values for express atributes, like the view engine and the path of the view directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.get('/weather', (req, res) => {

    if (!req.query.adress) {
        return res.send({ error: 'adress must be provided' })
    } 

        geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {//destructuring objects
            if (error) {
               return res.send({error:error})
            }

            forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return res.send({error})
                    }
                        //console.log(forecastData)
                        //console.log('place: ' + location + ', weather: ' + forecastData.current.weather_descriptions[0] + '. The temperture is ' + forecastData.current.temperature + '°C . It feels like ' + forecastData.current.feelslike + '°C')
                    
                    res.send({
                            adress: req.query.adress,
                            location: location,
                            forecast: forecastData.current
                    })
                    
                })
            
        })
    

    
})

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ismael Lima Rocha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ismael Lima Rocha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'this site provides information about the weather',
        name: 'Ismael Lima Rocha'
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({ error: 'You must provide a search term' })
    }
    res.send({ search: req.query.search })
})


//rotas de erro devem ser colocadas só no final, pois o * pega rotas que não foram explícitas

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404',
        name: 'Ismael Lima Rocha',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404',
        name: 'Ismael Lima Rocha',
        message: 'Page not found'
    })
})



app.listen(port, () => {
    console.log('server up on port ' + port)
})