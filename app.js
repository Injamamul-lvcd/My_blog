const envConf=require('dotenv').config({debug:process.env.DEBUG})

if(envConf.error){
    throw envConf.error
}

const express=require('express')
const database=require('./www/db/db')
const fs=require('fs')
const path=require('path')


const app=express()
const schemaPath='./src/model'

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const routesPath='./src/routes'
fs.readdirSync(routesPath).forEach(function(file){
    if(~file.indexOf('.js'))
    {
        let route=require(routesPath+'/'+file)
        route.setRouter(app)
    }
})

//start the Database
database.startDB(app)
