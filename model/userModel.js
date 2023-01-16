const Sequelize = require('sequelize');

const sequileze = new Sequelize('belajar_express', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

sequileze
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequileze.define('user', {
  // Model attributes are defined here
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
console.log(User === sequileze.models.user); // true

module.exports = User