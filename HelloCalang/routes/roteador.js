var express = require('express');
var router = express.Router();

//Get index
router.get('/',
	(req,res,next)=>{
		res.render('index');
	}
);

//Get pagina cadastro.html
router.get('/cadastro', 
	(req,res,next)=>{
		res.render('cadastro')
	}
);

//Get pagina busca.html
router.get('/busca', 
	(req,res,next)=>{
		res.render('busca');
	}
);

//Get pagina excluir.html
router.get('/excluir', 
	(req,res,next)=>{
		res.send(" EXCLUIR Not implemented yet");
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
