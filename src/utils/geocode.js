const request = require('request')

const geocode = (adress, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?country=US&access_token=pk.eyJ1IjoiaXNtYWVsbGltYXJvY2hhMjMiLCJhIjoiY2tsOWdhMmd2MjEzOTJ1cGVkanI1M2ludSJ9.5V2BwmHjJBzP9VA5NV5BHQ&limit=1'
    
    request({ url: url, json: true }, (error, {body}={}) => {// o sinal de igual é para o valor padrão a ser desestruturado caso não seja fornecido nada
        if (error) {
            callback('Unable to connect to the service', undefined)
        }
        else if (body.features.length == 0) {
            callback('Unable to find location, try another search', undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name

            })

        }
    })   
}


module.exports = geocode