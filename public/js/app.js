console.log('Javascript file is loaded!');

const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault()

    const location = searchLocation.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''

    fetch('/weather?address=' + location).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.place_name
                messageTwo.textContent = 'Temperature : ' + data.temperature
                messageThree.textContent = 'Rain possibility : ' + data.rain
                messageFour.textContent = "Humidity : " + data.humidity
            }
        })
    })

})
