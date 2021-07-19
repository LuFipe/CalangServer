const Sequelize = require('sequelize');
const dataBase = require('./db')

const calango = dataBase.define('calango',
	{
		id:{
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
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
			allowNull: false,
			primaryKey: true,
			unique: true
		},
		rg:{
			type: Sequelize.STRING,
			allowNull: false,
			unitque: true
		}
	}
)

module.exports = calango