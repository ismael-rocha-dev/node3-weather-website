

/* fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
}) */

const weatherForm = document.querySelector('form')
const weatherInput = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    

    const place = encodeURI(weatherInput.value)

    fetch('/weather?adress=' + place).then((response)=>{
    response.json().then((data)=>{

        if(data.error){
            p1.textContent = data.error
        } else{
            p1.textContent = data.location
           const day_night = data.forecast.is_day=="yes"?"It is day":" It is night"
            p2.textContent = data.forecast.weather_descriptions + ". The temperature is " + data.forecast.temperature +"°C . It feels like " + data.forecast.feelslike + "°C. " + day_night + ". The humidity is: " + data.forecast.humidity
            console.log(data.forecast) 
        }   
        
    })
})

})



