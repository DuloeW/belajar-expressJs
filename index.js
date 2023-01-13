const express = require('express');
const { send } = require('express/lib/response');

const app = express();

const port = 8012;


app.get('/', function(request, response){
    response.send('ello world')
})

app.get('/about', function(request, response){
    response.send('About my self')
})

const user = {
    id : 182192819812,
    name: "I Putu Bayu Gelgel Wiyantara",
    class: "XI RPL",
    born: "23 - 10 - 2005"
}

app.route('/users/:id')
    .get(function(response){
        response.json(user)
    })
    .post(function(request, response) {
        response.send("Post user")
    })
    .put(function(request, response) {
        if (request.params.id == this.user.id) {
            response.json(this.user)
        }
    })
    .delete(function(request, response) {
        if (request.params.id == this.user.id) {
            response.send("Delete user")
        }
    })

app.listen(port, function(){
    console.log('server is start')
})