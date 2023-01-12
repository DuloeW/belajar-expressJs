const express = require('express')
const rooter = express.Router();

rooter.get('/books', function(request, response) {
    response.json()
})