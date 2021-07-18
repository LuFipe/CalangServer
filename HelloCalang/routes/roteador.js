//Bibliotecas basicas de manipulação
var express = require('express');
var router = express.Router();
var path = require('path');

//Acessar DB pelo SEQUELIZE
const bancoDados = require('../BancoDeDados/dataBase_Handler');

//Auxilio para direcionamento de arquivos estaticos
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
router.post('/cadastro', bancoDados.CadastrarDB);

//Get pagina buscar.html
router.get('/busca', bancoDados.FullTabela);
//Post pagina buscar.pug
router.post('/busca', bancoDados.BuscarDB);

//Get pagina excluir.html
router.get('/excluir', 
	(req,res,next)=>{
		res.render('excluir');
	}
);
router.post('/excluir',bancoDados.BuscarRG)
router.post('/confirmar_exclusao', bancoDados.DeletarCadastro)
module.exports = router;
