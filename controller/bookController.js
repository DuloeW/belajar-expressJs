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
  post: async function (request, response) {
    const file = request.file;
    await Book.create({
      id: uuidv4(),
      nama_penulis: request.body.penulis,
      judul: request.body.judul,
      tahun_rilis: request.body.tahun,
      kode: request.body.kode,
      gambar: file.originalname,
      deskripsi: request.body.deskripsi,
    }).then((book) => {
      console.log(book.get({ plain: true }));
      response.redirect("/books")
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
  update: function(request, response) {
    Book.findByPk(request.params.id).then(book => {
      const data = book;
      response.render("pages/book/update", {book: data})
    }).catch(() => {
      response.status(404).json({message:`id ${id} not found`})
    })
  },
  put: function(request, response) {
    const id = request.params.id
    const fileGambar = request.file
    Book.findByPk(id)
    .then(book => {
      book.nama_penulis = request.body.penulis
      book.judul = request.body.judul
      book.tahun_rilis = request.body.tahun
      book.kode = request.body.kode
      book.gambar = fileGambar.originalname
      book.deskripsi = request.body.deskripsi 
      book.save().then(() => {
        response.redirect("/books")
      }).catch(err => {
        console.log("error save");
        console.log(err);
        response.status(400).json({msg: err.toString()})
      })
    }).catch(err => {
      console.log("error id not found");
      console.log(err);
      response.status(404).json({msg: err.toString()})
    })
  },
  delete: function(request, response) {
    const id = request.params.id
    Book.destroy({
      where: {
        id: id
      }
    }).then(() => {
      response.redirect('/books')
    })
  }
};
