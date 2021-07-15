var express = require('express');
var router = express.Router();
var path = require('path');

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
		res.render('cadastro', dados);
	}
)

//Get pagina buscar.html
router.get('/busca', 
	(req,res,next)=>{
		res.sendFile(Caminho('/FrontEnd/HTML/buscar.html'))
	}
);
//Post pagina buscar.pug


//Get pagina excluir.html
router.get('/excluir', 
	(req,res,next)=>{
		res.render('buscar');
	}
);

//Get form data
router.post('/cadastrar',
	(req, res,next)=>{
		console.log(req.body);
		res.end();
	}
)

module.exports = router;
