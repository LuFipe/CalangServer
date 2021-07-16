var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./BancoDeDados/calangoCadastro.db');

module.exports.Cadastrar = (nome, data, endereco, cpf, rg)=>{
	db.run("INSERT INTO calango(nome, data, endereco, cpf, rg) VALUES('"+nome+"', '"+data+"', '"+endereco+"', '"+cpf+"', '"+rg+"');");
	db.close();
	console.log("Cadastrado");
}