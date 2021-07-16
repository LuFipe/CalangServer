const dataBase = require('./db');
const calango = require('./model')

module.exports.CreateCadastro = (NOME, IDADE, ENDERECO, CPF, RG)=>{
		console.log("Cadastro entrou");
		const CRUDBanco = await dataBase.sync();
		console.log(CRUDBanco);
		
		const cadastrar = await calango.create(
			{
				nome: NOME,
				idade: IDADE,
				endereco: ENDERECO,
				cpf: CPF,
				rg: RG,
			}
		)
		console.log(cadastrar);
}

module.exports.BuscarCadastro = (DADO, SELETOR)=>{

	constCRUDBanco = await dataBase.sync();
	console.log(CRUDBanco);

	if(SELETOR == 'NOME'){
		const buscar = await calango.findAll(
			{
				nome : DADO
			}
		)
	}else if(SELETOR == 'IDADE'){
		const buscar = await calango.findAll(
			{
				idade : DADO
			}
		)
	}else if(SELETOR == 'ENDERECO'){
		const buscar = await calango.findAll(
			{
				endereco : DADO
			}
		)
	}else if(SELETOR == 'CPF'){
		const buscar = await calango.findAll(
			{
				cpf : DADO
			}
		)
	}else if(SELETOR == 'RG'){
		const buscar = await calango.findAll(
			{
				rg : DADO
			}
		)
	}else {
		console.log("SELETRO INVALIDO")
	}
	console.log(buscar)

}