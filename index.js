const express = require('express');
const userRouter = require('./rooter/user')
const bookRouter = require('./rooter/book')
const { send } = require('express/lib/response');

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
 
const port = 8000

const requestTime = function (request, response, next) {
    request.requestTime = Date.now().toFixed()
    next()
  }
  
app.use(requestTime)

app.set('view engine', 'ejs')

app.use('/assets', express.static('public'))
  
app.get('/', function(request, response){
    const kelas = {
        lokasi: 'Bali',
        tanggal: request.requestTime
    }
    response.render('pages/home', {kelas: kelas})
})

app.get('/about', function(request, response) {
    response.render('pages/about')
})

app.use(userRouter)
app.use(bookRouter)


app.listen(port, function(){
    console.log('server is start')
})
