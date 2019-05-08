const express=require('express')
const bodyParser=require('body-parser')

const router=require('./router')
const app=express()

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.use('/',router)

app.listen(7000,function(){
    console.log('服务器已经启动,通过http://127.0.0.1:7000来访问')
})