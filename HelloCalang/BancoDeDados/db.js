const Sequelize = require('sequelize');
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './BancoDeDados/cadastroCalango.sqlite',
})

module.exports = sequelize;