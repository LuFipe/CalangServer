//Bibliotecas basicas de manipulação
var express = require('express');
var router = express.Router();
var path = require('path');
//Acessar DB pelo SEQUELIZE
const dataBase = require('../BancoDeDados/db')
const calango = require('../BancoDeDados/model')

//Auxilio para direcionamento
function Caminho(caminho){
	return path.normalize(__dirname +'/../' + caminho)
};

//Get index
router.get('/',
	(req,res,next)=>{
		res.sendFile(Caminho('FrontEnd/HTML/index.html'));
	}
);

//Get pagina cadastro.html
router.get('/cadastro', 
	(req,res,next)=>{
		res.render('cadastrar')
	}
);
//Post pagina cadastro.pug
router.post('/cadastro',
	async(req,res,next)=>{		//Acessar o DB necessita de yma função asyncrona
		var dados = {'NOME': req.body.NOME, 'IDADE': req.body.IDADE, 'ENDERECO': req.body.ENDERECO, 'CPF': req.body.CPF, 'RG': req.body.RG };
		console.log("Entrando em cadastro")
		
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

		}catch(error){ //em caso de erro
			console.log(error)
		}
		res.render('cadastro', dados);
	}
)

//Get pagina buscar.html
router.get('/busca', 
	(req,res,next)=>{
		res.render('buscar');
	}
);
//Post pagina buscar.pug
router.post('/busca', 
	async(req, res, next)=>{
		var dado
		try{
			const CRUDBanco = await dataBase.sync();
			//console.log(CRUDBanco);

			if(req.body.SELETOR == 'NOME'){
				const buscar = await calango.findAll({
					where:{
						nome : req.body.DADO
					}
				}
				)
				dado = buscar[0];

			}else if(req.body.SELETOR == 'IDADE'){
				const buscar = await calango.findAll({
					where:{
						idade : req.body.DADO
					}
				}
				)
				dado = buscar[0];

			}else if(req.body.SELETOR == 'ENDERECO'){
				const buscar = await calango.findAll({
					where:{
						endereco : req.body.DADO
					}
				}
				)
				dado = buscar[0];

			}else if(req.body.SELETOR == 'CPF'){
				const buscar = await calango.findAll({
					where:{
						cpf : req.body.DADO
					}
				}
				)
				dado = buscar[0];

			}else if(req.body.SELETOR == 'RG'){
				const buscar = await calango.findAll({
					where:{
						rg : req.body.DADO
					}
				}
				)
				dado = buscar[0];

			}else {
				console.log("SELETRO INVALIDO")
			}
			//Orginazando objeto para passar como parametro para o pug
			dado = JSON.stringify(dado)
			dado = JSON.parse(dado)
			console.log(dado)

			res.render('buscar', dado)
		}catch(error){
			console.log(error)
		}
		
	}
);

//Get pagina excluir.html
router.get('/excluir', 
	(req,res,next)=>{
		res.render('buscar');
	}
);


module.exports = router;
