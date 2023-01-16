const {v4: uuidv4} = require('uuid')
const jsonRes = require('../setting/responseJson')
const User = require('../model/userModel')
const { Sequelize } = require('sequelize').Sequelize


module.exports = {
    get: function (request, response) {
      let keyword = request.query.keyword
      if(keyword) {
        User.findAll({
          attributes: ['id', 'nama_user'],
          where: {
            nama_user: {
              [Sequelize.Op.like]: `%${keyword}%`
            }
          }
      }).then(user => {
          const users = user;
          response.render('pages/user/index', {users})
        }).catch(err => {
          console.log(err);
        })
      } else {
        User.findAll({
          attributes: ['id', 'nama_user'],
      }).then(user => {
          const users = user;
          response.render('pages/user/index', {users})
        }).catch(err => {
          console.log(err);
        })
      }
    },
    getId: function(request, response) {
      const id = request.params.id;
      User.findByPk(id).then(user => {
        const data = user
        response.render('pages/user/show', {user: data})
      }).catch(err => {
        console.log(err);
      });
    },
    create: function (request, response) {
      response.render('pages/user/create')
    },
    post: function (request, response) {
      const user = User.build({
        id: uuidv4(),
        nama_user: request.body.name,
        kelas_user: request.body.class,
        tanggal_lahir: request.body.born,
        email_user: request.body.email,
        password: request.body.password
      })

      user.save().then(user => {
        console.log(user.get({ plain: true }));
        response.redirect('/users')
      }).catch(err => {
        console.log(err);
      })
    },
    update: function(request, response) {
      const id = request.params.id;
      User.findByPk(id).then(user => {
        const data = user;
        console.log(data);
        response.render('pages/user/update', {user: data})
      })
    },
    put: function(request, response) {
      const id = request.params.id;
      console.log(request.body.name);
      User.findByPk(id).then(user => {
        user.nama_user = request.body.name
        user.kelas_user = request.body.class
        user.tanggal_lahir = request.body.born
        user.email_user = request.body.email
        user.save().then(response.redirect('/users'))
      }).catch(err => {
        console.log(`cannot find with user ${id}`);
      })
    },
    delete: function (request, response) {
      const id = request.params.id;
      User.destroy({
        where: {
          id: id
        }
      }).then(() => {
        response.redirect('/users')
      })
    }
}