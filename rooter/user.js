const express = require('express')
const router = express.Router()



const users = {
    response: [
        {
            id : 1,
            name: "I Putu Bayu Gelgel Wiyantara",
            class: "XI RPL",
            born: "23 - 10 - 2005"
        },
        {
            id : 2,
            name: "I Putu Bayu Gelgel Wiyantara",
            class: "XI RPL",
            born: "23 - 10 - 2005"
        },
        {
            id : 3,
            name: "I Putu Bayu Gelgel Wiyantara",
            class: "XI RPL",
            born: "23 - 10 - 2005"
        }
    ]
}


router.route('/users')
    .get(function(request, response){
        response.json(users)
    })
    .post(function(request, response) {
        users.response.push(request.body)
        response.json(request.body)
    })

router.put('/users', function(request, response){
    const test = users.response.findIndex(obj => obj.id == request.body.id)
    users.response[test].name = request.body.name;
    users.response[test].class = request.body.class;
    users.response[test].born = request.body.born;
    response.json(users.response[test])
})


router.delete('/users', function(request, response) {
    const test = users.response.findIndex(obj => obj.id == request.body.id)
    users.response.splice(test)
    response.status(200).send('Acc')
})

module.exports = router;