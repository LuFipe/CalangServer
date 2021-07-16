const Sequelize = require('sequelize');
const dataBase = require('./db')

const calango = dataBase.define('calango',
	{
		id:{
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		nome:{
			type: Sequelize.STRING,
			allowNull: false
		},
		idade:{
			type: Sequelize.STRING,
			allowNull: false
		},
		endereco:{
			type: Sequelize.STRING,
			allowNull: false
		},
		cpf:{
			type: Sequelize.STRING,
			allowNull: false
		},
		rg:{
			type: Sequelize.STRING,
			allowNull: false
		}
	}
)

module.exports = calango