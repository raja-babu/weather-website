const request=require('request')


const geostat=(address,callback)=>{
    const geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYXJvbWF0aWMxMjMiLCJhIjoiY2tqdnFqa3lpMGF2ZTJvbHNxc3g5a2lmdyJ9.aLzDZCMvduKlMnA0Xc7muQ'
    
    setTimeout(()=>{
        request({url:geourl,json:true},(error,response)=>{
        
            if(error)
            {
                callback('Address Not Traceable',undefined)
            }
            else if(response.body.features.length===0){
                callback('Unable to find the location',undefined)
            }
            else
            {
                callback(undefined,{
                    latitude:response.body.features[0].center[1],
                    longitude:response.body.features[0].center[0],
                    location:response.body.features[0].place_name,
                    
                })
            }
        })
    },2000)
}

module.exports=geostat