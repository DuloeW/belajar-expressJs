const jsonRes = require('../setting/responseJson')
const users = [
    {
        id: 1,
        name: "I Putu Bayu Gelgel Wiyantara",
        class: "XI RPL",
        born: "23 - 10 - 2005",
      },
      {
        id: 2,
        name: "I Putu Bayu Gelgel Wiyantara",
        class: "XI RPL",
        born: "23 - 10 - 2005",
      },
      {
        id: 3,
        name: "I Putu Bayu Gelgel Wiyantara",
        class: "XI RPL",
        born: "23 - 10 - 2005",
      },
];

module.exports = {
    get: function (request, response) {
        if (users.length > 0) {
            response.json(jsonRes.index(users, request, true, ""));
        } else {
            response.json({
                status: false,
                message: "Data user masih kosong"
            })
        }
      },
    post: function (request, response) {
        const newUser = request.body;
        if(newUser.id == null) throw response.status(400).json({message: "Bad request"})
        const isExist = users.find((user) => user.id == newUser.id);
        if (isExist) {
          return response.status(400).send({ message: "User is exist!" });
        }
        users.push(newUser);
        response.json(jsonRes.index(users, request, true, "Berhasil menambahakan"));
      },
    put: function (request, response) {
        const id = request.body.id;
        const isExist = users.find(user => user.id == id)
        if(!isExist) {
            throw response.status(404).send({message: 'Id not found  '})
        }
        const test = users.filter((user) => {
          if (user.id == id) {
            user.name = request.body.name;
            user.class = request.body.class;
            user.born = request.body.born;
            return user;
          }
        });
        response.json(jsonRes.index(users, request, true, "Berhasil mengubah"));
      },
    delete: function (request, response) {
        const isExist = users.find((user) => user.id == request.params.id);
        if (!isExist) {
          return response.status(404).send({ message: "Id not found" });
        }
        const test = users.findIndex((obj) => obj.id == request.params.id);
        users.splice(test, 1);
        response.status(200).json(jsonRes.index(users, request, true, "Berhasil menghapus"));
      }
}