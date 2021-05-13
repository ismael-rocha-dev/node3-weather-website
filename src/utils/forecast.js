const request = require('request')

const forecast = (lat, lon, callback) => {
    var url = 'http://api.weatherstack.com/current?access_key=a7c8dc512565e8b41fbf2625e80d88c7&query=' + lat + ',' + lon + '&units=m';
     
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to weather service', undefined);//não recebe resposta da API
        } else if (response.body.error) {
            callback('Unable to find location', undefined);//recebe resposta da API
        } else {
            //console.log(response.body.current.weather_descriptions[0] +'. The temperture is ' + data.current.temperature + '°C . It feels like ' + data.current.feelslike + '°C');
            callback(undefined, response.body)
        }

    })
}

module.exports = forecast