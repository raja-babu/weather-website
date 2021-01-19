const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast.js')
const geocode=require('./utils/geocode.js')

const app=express()
const port=process.env.PORT || 3000
//Define path for Express config
const dirpath=path.join(__dirname,'../public')
const viewPaths=path.join(__dirname,'../templates/views')
const partialPaths=path.join(__dirname,'../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewPaths)
hbs.registerPartials(partialPaths)

//Setup static directory to serve
app.use(express.static(dirpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Home',
        owner:'Gandhi'
    })
    
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Raja Babu',
        owner:'Gandhi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Help Page',
        owner:'Gandhi'
    })
})


// app.get('/help',(req,res)=>{
//     res.send('Help Page')
// })

// app.get('/about',(req,res)=>{
//     res.send('<title>Weather Application</title> <h1>Weather Forecast Table</h1>'
//     )
// })

 app.get('/weather',(req,res)=>{
     if(!req.query.address)
     {
        return res.send({
             error:'Please provide address'
         })
     }
    else
    {
         geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
             if(error)
             {
               return  res.send({
                     Error:error
                 })
             }
             else
             {
                forecast(latitude,longitude,(error,forecastData)=>{
                     if(error)
                     {
                         return res.send({error})
                     }
                     else
                     {
                       res.send({
                             forecast:forecastData.weather[0],                             
                             address:req.query.address,
                             location,
                       })
                     }
                 })

                
             }
         })
    }
 })

 app.get('/product',(req,res)=>{
     if(!req.query.search){
      return  res.send({
            error:'You must provide a search result'
        }) 
     }
     res.send({
         product:[],
     })
 })

app.listen(port,()=>{
    console.log('Server is up and running at port '+port)
})