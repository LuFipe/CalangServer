const dataBase = require('./db');
const calango = require('./model')


//Acessar o DB necessita de uma função asyncrona
module.exports.CadastrarDB = async(req,res,next)=>{		
	var dados = {};
	
	//Tentando syncronizar o banco de dados
	try{
		//Syncronizando o banco de dados
		const CRUDBanco = await dataBase.sync();
		console.log(CRUDBanco);
		
		//Cadastrando calango
		const cadastrar = await calango.create(
			{
				nome: req.body.NOME,
				idade: req.body.IDADE,
				endereco: req.body.ENDERECO,
				cpf: req.body.CPF,
				rg: req.body.RG,
			}
		)
		console.log(cadastrar);
		
		//Display cadastro recem criado
		const display = await calango.findAll({
			where:{ cpf : req.body.CPF 	}
		})
		dados = JSON.stringify(display[0]);
		dados = JSON.parse(dados);


	}catch(error){ //em caso de erro
		console.log(error)
	}
	res.render('cadastro', dados);
}

module.exports.FullTabela = async(req, res, next)=>{
	var dados;

	try {
		//Syncronizando o banco de dados
		const CRUDBanco = await dataBase.sync();
		console.log(CRUDBanco);

		//Lendo toda a tabela
		const tabela = await calango.findAll();
		dados = tabela;
	} 
	catch (error) {
		console.log(error)
	}
	dados  = JSON.stringify(dados);
	dados = JSON.parse(dados)
	res.render('buscar', {'dados': dados})
}

module.exports.BuscarDB = async(req, res, next)=>{
	var dados
	try{
		const CRUDBanco = await dataBase.sync();
		console.log(CRUDBanco);

		if(req.body.SELETOR == 'NOME'){
			const buscar = await calango.findAll({
				where:{	nome : req.body.DADO }
			})
			dados = buscar;
		}

		else if(req.body.SELETOR == 'IDADE'){
			const buscar = await calango.findAll({
				where:{	idade : req.body.DADO }
			})
			dados = buscar;
		}
		
		else if(req.body.SELETOR == 'ENDERECO'){
			const buscar = await calango.findAll({
				where:{	endereco : req.body.DADO }
			})
			dados = buscar;
		}
		
		else if(req.body.SELETOR == 'CPF'){
			const buscar = await calango.findAll({
				where:{	cpf : req.body.DADO	}
			})
			dados = buscar;
		}
		
		else if(req.body.SELETOR == 'RG'){
			const buscar = await calango.findAll({
				where:{	rg : req.body.DADO }
			})
			dados = buscar;

		}
		
		else {
			console.log("SELETRO INVALIDO")
		}
		//Orginazando objeto para passar como parametro para o pug
		dados = JSON.stringify(dados)
		console.log("\n\nOs dados cadastrados foram:\n"+dados+"\n\n")
		dados = JSON.parse(dados)
		console.log("Dados estao do tipo: "+typeof dados)
		res.render('buscar', {'dados': dados})
	}
	catch(error){
		console.log(error)
	}
	
}

module.exports.DeletarCadastro = async(req, res, next)=>{
	var dados;

	try{
		//Syncronizar banco de dados
		const CRUDBanco = await dataBase.sync();
		console.log(CRUDBanco);

		//Achar cadastro
		const adeus = await calango.destroy({
			where:{ cpf: req.body.CPF }
		})
		console.log("\n\nDELETADO\n\n");
		console.log(JSON.stringify(adeus));
	}
	catch(error){
		console.log(error)
	}
	res.render('index');
}

module.exports.BuscarRG = async(req, res, next)=>{
	var dados;

	try{
		const CRUDBanco = await dataBase.sync();
		console.log(CRUDBanco);

		//Display cadastro recem criado
		const display = await calango.findAll({
			where:{ cpf : req.body.CPF 	}
		})
		dados = JSON.stringify(display);
		dados = JSON.parse(dados);		
	}
	catch(error){
		console.log(error)
	}
	res.render('excluir', {'dados': dados})
}