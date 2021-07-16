var express = require('express');
var router = express.Router();
var path = require('path');
var banco = require('../BancoDeDados/dbHandler')

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
	(req,res,next)=>{
		var dados = {'NOME':req.body.NOME, 'DATA': req.body.DATA, 'ENDERECO': req.body.ENDERECO, 'CPF':req.body.CPF, 'RG': req.body.RG}
		banco.Cadastrar(req.body.NOME, req.body.DATA, req.body.ENDERECO, req.body.CPF, req.body.RG)
		res.render('cadastro', dados);
	}
)

//Get pagina buscar.html
router.get('/busca', 
	(req,res,next)=>{
		res.render('buscar')
	}
);
//Post pagina buscar.pug
router.post('/busca',
	(req, res, next)=>{
		var dados = {'dado': req.body.DADO, 'seletor': req.body.SELETOR};
		res.render('buscar',dados);
	}
)

//Get pagina excluir.html
router.get('/excluir', 
	(req,res,next)=>{
		res.render('buscar');
	}
);


module.exports = router;
