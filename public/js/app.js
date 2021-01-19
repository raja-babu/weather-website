
const weatherQuery=document.querySelector('form');
const search=document.querySelector('input')

const messageOne=document.querySelector('#msg1')
const messageTwo=document.querySelector('#msg2')

weatherQuery.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='Loading.....'
    messageTwo.textContent=''
    fetch('https://3000-d9850d26-64d4-44fc-a2f1-5a1ebc10bb26.ws-us03.gitpod.io/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent=data.error
            }
            else
            {
                messageOne.textContent='Location :'+ data.location
                messageTwo.textContent='Forecast :'+ data.forecast
            }
        })
    })
})