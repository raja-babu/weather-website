const request=require('request')

const getForcast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=0ea0396844b1d1eab0abf6708c63009c&query='+latitude+','+longitude

    setTimeout(()=>{
        request({url:url,json:true},(error,response)=>{
            if(error)
            {
                callback('Unable to connect',undefined)
            }
            else if(response.body.current.length===0)
            {
                callback('Wrong Latitude and Longitude',undefined)
            }
            else
            {
                callback(undefined,{
                    weather:response.body.current.weather_descriptions,
                    temp:response.body.current.temperature,
                    humidity:response.body.current.humidity
                })
            }
        })
    },2000)
}

module.exports=getForcast