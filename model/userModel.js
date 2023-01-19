const Sequelize = require('sequelize');
const sequelize = require("../db/mysql")

const User = sequelize.define('user', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  nama_user: {
    type: Sequelize.STRING,
    allowNull: false
  },
  kelas_user: {
    type: Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  tanggal_lahir: {
    type: Sequelize.DATE,
    allowNull: false
  },
  email_user: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.user); // true

module.exports = User