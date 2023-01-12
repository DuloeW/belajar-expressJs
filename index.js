const express = require('express');
const userRouter = require('./rooter/user')
const { send } = require('express/lib/response');

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 8012;


app.get('/', function(request, response){
    response.send('Hello world')
})



app.use(userRouter)

app.listen(port, function(){
    console.log('server is start')
})