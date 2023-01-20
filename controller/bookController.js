const { v4: uuidv4 } = require("uuid");
const Book = require("../model/bookModel");
const { Sequelize } = require("sequelize").Sequelize;

module.exports = {
  get: function (request, response) {
    let keyword = request.query.keyword;
    console.log(keyword);
    if (keyword) {
      Book.findAll({
        where: {
          judul: {
            [Sequelize.Op.like]: `%${keyword}%`,
          },
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
      Book.findAll({})
        .then((book) => {
          const books = book;
          response.render("pages/book/index", { books });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  create: function (request, response) {
    response.render("pages/book/create");
  },
  post: function (request, response) {
    const file = request.file;
    Book.create({
      id: uuidv4(),
      nama_penulis: request.body.penulis,
      judul: request.body.judul,
      tahun_rilis: request.body.tahun,
      kode: request.body.kode,
      gambar: file.originalname,
      deskripsi: request.body.deskripsi,
    }).then((book) => {
      console.log(book.get({ plain: true }));
      response.status(201).json({ msg: "Book Created Successfuly" , img: book.gambar});
    }).catch((err) => {
      console.log(err);
      response.status(500).json({ msg: err.toString()});
    })
  },
  detail: function (request, response) {
    const id = request.params.id;
    Book.findByPk(id)
      .then((book) => {
        const data = book;
        response.render("pages/book/showDetail", { book: data });
      })
      .catch((err) => {
        response.json({ message: err.toString() });
      });
  },
};
