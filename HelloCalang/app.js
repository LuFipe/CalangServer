//									//
//		MODULO PRINCIPAL			//
//		PARA CRIAÇÃO DO SERVIDOR	//
//		CHAMADO POR WWW				//
//									//
var express = require('express');
var path = require('path');

//Usado pelo WWW 
var app = express();

//Use's necessarios para passar dados do FORMS por POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Setar a view
app.set('views', './views');
app.set('view engine', 'pug');

//Pegar arquivos estaticos
app.use(express.static('FrontEnd'))

//Criação das Rotas
var roteador = require('./routes/roteador');
app.use('/',roteador);
app.use(
	(req,res)=>{
		res.sendFile(path.join(__dirname+'/FrontEnd/HTML/ullnotp.html'))
	}
)

module.exports = app;
