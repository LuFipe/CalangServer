const dataBase = require('./db');
const calango = require('./model');
var validador = require('../Validate&Sanitize/ValSan');

//Acessar o DB necessita de uma função asyncrona
module.exports.CadastrarDB = async(req,res,next)=>{	
	//Variaveis uteis
	var dados = 
	{
		'id':'0',
		'nome':'FULANO',
		'idade':'20',
		'endereco':'Rua',
		'cpf':'0',
		'rg':'0',
	};
	var validado=
	{
		'nome':
			{
				'status':true,
				'mensagem': "",
			},
		'idade':
			{
				'status':true,
				'mensagem': "",
			},
		'endereco':
			{
				'status':true,
				'mensagem': "",
			},
		'cpf':
			{
				'status':true,
				'existente': false,
				'mensagem': "",
			},
		'rg':
			{
				'status':true,
				'existente': false,
				'mensagem': "",
			},

	}
	var testCPF = {};
	var testRG = {};	
	//Tentando syncronizar o banco de dados
	try{
		//Syncronizando o banco de dados
		const CRUDBanco = await dataBase.sync();
		//console.log(CRUDBanco);
		
		
		//Testando existencia de RG ou CPF ja Cdastrados
		const existeCPF = await calango.findAll({
			where:{ cpf: req.body.CPF}
		})
		testCPF = JSON.stringify(existeCPF[0]);
		if(testCPF != null) {
			testCPF = JSON.parse(testCPF);
			console.log("\n\nValor de validado.cpf.existente: "+ validado.cpf.existente)
			if(req.body.CPF == testCPF.cpf) validado.cpf.existente = true;
			console.log("\n\nValor de validado.cpf.existente: "+ validado.cpf.existente)
			console.log("\nValor da expressao req.body.CPF == testCPF.cpf: "+(req.body.CPF == testCPF.cpf))
		}
		
		const existeRG = await calango.findAll({
			where:{	rg: req.body.RG	}
		})
		testRG = JSON.stringify(existeRG[0]);
		if(testRG != null){
			testRG = JSON.parse(testRG);
			console.log("\n\nValor de validado.rg.existente: "+validado.rg.existente)
			if(req.body.RG == testRG.rg) validado.rg.existente = true;
			console.log("\n\nValor de validado.rg.existente: "+validado.rg.existente)
			console.log("\nValor da expressao req.body.RG == testRG.rg: "+(req.body.RG == testRG.rg))
		}
		
		
		
		//Verificando a validade dos dados cadastrados
		validado.nome = validador.ValidateName(req.body.NOME);
		validado.idade = validador.ValidateIdade(req.body.IDADE);
		validado.endereco = validador.ValidateName(req.body.ENDERECO);
		validado.cpf.status = validador.ValidateCpfRG(req.body.CPF);
		validado.rg.status = validador.ValidateCpfRG(req.body.RG)
		
		if(!(validado.nome.status && validado.idade.status && validado.endereco.status && validado.cpf.status && validado.rg.status) || validado.rg.existente || validado.cpf.existente){
			
			console.log("\n\nChegou aqui\n\n")
			console.log(`Nome: ${validado.nome.status}\nIdade: ${validado.idade.status}\nEndereco: ${validado.endereco.status}\nCPF: ${validado.cpf.status}\nRG: ${validado.rg.status}\nCPFExistnte: ${validado.cpf.existente}\nRGExistente: ${validado.rg.existente}`)

			if(validado.nome.status) dados.nome = validador.Capitalizar(req.body.NOME);
			else dados.nome = validado.nome.mensage;

			if(validado.idade.status) dados.idade = req.body.IDADE;
			else dados.idade = validado.idade.mensage;

			if(validado.endereco.status) dados.endereco = validador.Capitalizar(req.body.ENDERECO);
			else dados.endereco = validado.endereco.mensage;

			if(validado.cpf.existente){
				dados.cpf = "CPF ja existe";
			}
			else if(validado.cpf.status){
				dados.cpf = req.body.CPF;
			}
			else dados.cpf = "Apenas numeros e entre 10 a 14 digitos";


			if(validado.rg.existente){
				dados.rg = "RG ja existe";
			}
			else if(validado.rg.status){
				dados.rg = req.body.RG;
			}
			else dados.rg = "Apenas numeros e entre 10 a 14 digitos";
			


			res.render('cadastrar',dados)

		}
		else{				
			//Cadastrando calango
			const cadastrar = await calango.create({
				nome: validador.Capitalizar(req.body.NOME),
				idade: req.body.IDADE,
				endereco: validador.Capitalizar(req.body.ENDERECO),
				cpf: req.body.CPF,
				rg: req.body.RG,
			})
			console.log(cadastrar);
			
			//Display cadastro recem criado
			const display = await calango.findAll({
				where:{ cpf : req.body.CPF 	}
			})

			dados = JSON.stringify(display[0]);
			dados = JSON.parse(dados);
	
			res.render('cadastro', dados);
		}
	}
	catch(error){ //em caso de erro
		console.log(error)
	}
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