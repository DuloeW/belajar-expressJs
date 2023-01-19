const { v4: uuidv4 } = require("uuid");
const multer = require('multer')
const Book = require("../model/bookModel");
const path = require("path");
const { Sequelize } = require('sequelize').Sequelize


module.exports = {
  get: function (request, response) {
    let keyword = request.query.keyword;
    console.log(keyword);
    if (keyword) {
      Book.findAll({
        where: {
            judul: {
                [Sequelize.Op.like]: `%${keyword}%`,
            }
        },
      })
        .then((book) => {
          const books = book;
          response.render("pages/book/index", { books });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Book.findAll({
      })
        .then((book) => {
          const books = book;
          response.render("pages/book/index", { books });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  create: function(request, response) {
    response.render('pages/book/create')
  },
  post: function(request, response) {
    const file = request.files.file;
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext;

    file.mv(`./public/uploud/${fileName}`)
    const book = Book.build({
      id: uuidv4(),
      nama_penulis: request.body.penulis,
      judul: request.body.judul,
      tahun_rilis: request.body.tahun,
      kode: request.body.kode,
      gambar: file,
      deskripsi: request.body.deskripsi
    })

    book.save().then(book => {
      console.log(book);
      response.json({book: book}).send()
      // response.redirect('/books')
    })
  },
  detail: function(request, response) {
    const id = request.params.id;
    Book.findByPk(id).then(book => {
      const data = book;
      response.render('pages/book/showDetail', {book: data})
    }).catch(err => {
      response.json({message: err.toString()})
    })
  }
};
