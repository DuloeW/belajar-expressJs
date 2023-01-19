const Sequelize = require('sequelize');
const sequelize = require("../db/mysql")
const { v4: uuidv4 } = require("uuid");

const Book = sequelize.define('books', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: uuidv4()
  },
  nama_penulis: {
    type: Sequelize.STRING,
    allowNull: false
  },
  judul: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tahun_rilis: {
    type: Sequelize.DATE,
    allowNull: false
  },
  kode: {
    type: Sequelize.CHAR,
    allowNull: false
  },
  gambar: {
    type: Sequelize.STRING,
    allowNull: false
  },
  deskripsi: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {

})
console.log(Book === sequelize.models.book); // true

module.exports = Book