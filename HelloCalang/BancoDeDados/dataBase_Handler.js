const dataBase = require('./db');
const calango = require('./model')


//Acessar o DB necessita de uma função asyncrona
module.exports.CadastrarDB = async(req,res,next)=>{		
	var dados = {};
	
	//Tentando syncronizar o banco de dados
	try{
		console.log("Cadastro entrou");
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

module.exports.BuscarDB = async(req, res, next)=>{
	var dado
	try{
		const CRUDBanco = await dataBase.sync();
		console.log(CRUDBanco);

		if(req.body.SELETOR == 'NOME'){
			const buscar = await calango.findAll({
				where:{	nome : req.body.DADO }
			})
			dado = buscar[0];
			console.log("Os dados brutos são: \n\n")
			var dadoBruto =JSON.stringify(buscar)
			console.log(dadoBruto)
			console.log("\nO tamanho total dos dados brutos são: "+dadoBruto.length)
			console.log("\n")
			dadoBruto = JSON.parse(dadoBruto)
			console.log("Dados brutos em forma de objeto: "+ dadoBruto)
			console.log("Tamanho dos dados brutos em forma de objeto: "+ dadoBruto.length)
		}

		else if(req.body.SELETOR == 'IDADE'){
			const buscar = await calango.findAll({
				where:{	idade : req.body.DADO }
			})
			dado = buscar[0];
			console.log("Os dados brutos são: \n\n")
			var dadoBruto =JSON.stringify(buscar)
			console.log(dadoBruto)
			console.log("\nO tamanho total dos dados brutos são: "+dadoBruto.length)
			console.log("\n")
			dadoBruto = JSON.parse(dadoBruto)
			console.log("Dados brutos em forma de objeto: "+ dadoBruto)
			console.log("Tamanho dos dados brutos em forma de objeto: "+ dadoBruto.length)
		}
		
		else if(req.body.SELETOR == 'ENDERECO'){
			const buscar = await calango.findAll({
				where:{	endereco : req.body.DADO }
			})
			dado = buscar[0];
		}
		
		else if(req.body.SELETOR == 'CPF'){
			const buscar = await calango.findAll({
				where:{	cpf : req.body.DADO	}
			})
			dado = buscar[0];
		}
		
		else if(req.body.SELETOR == 'RG'){
			const buscar = await calango.findAll({
				where:{	rg : req.body.DADO }
			})
			dado = buscar[0];

		}
		
		else {
			console.log("SELETRO INVALIDO")
		}
		//Orginazando objeto para passar como parametro para o pug
		dado = JSON.stringify(dado)
		console.log("\n\nOs dados cadastrados foram:\n"+dado+"\n\n")
		dado = JSON.parse(dado)
		
		res.render('buscar', dado)
	}
	catch(error){
		console.log(error)
	}
	
}