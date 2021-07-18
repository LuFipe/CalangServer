module.exports.Capitalizar = (CORDA)=>{
	var cordas = CORDA.split(" ");
	
	for(var i =0; i< cordas.length; i++) cordas[i] = cordas[i].charAt(0).toUpperCase()+cordas[i].slice(1);

	CORDA = cordas.join(" ");
	return CORDA;
}

module.exports.ValidateName = (NOME)=>{
	var validacao = {
		'status': true,
		'mensage': "Nome Valido"
	}

	if(NOME.length == 0){
		validacao.status = false;
		validacao.mensage = "Nome não pode estar vazio";
		return validacao;
	}

	for(var i=0; i<NOME.length;i++){
		if( 
			!(("a" <= NOME[i])&&(NOME[i] <="z")) 
			&& !(("A" <= NOME[i])&&(NOME[i] <="Z")) 
			&& (NOME[i] != " ") 
			){

			validacao.status = false
			validacao.mensage = "Apenas letras são aceitas";
		}
	}
	return validacao;
}

module.exports.ValidateIdade = (IDADE)=>{
	var validacao = {
		'status': true,
		'mensage': "Idade Valida"
	}

	if(IDADE.length == 0){
		validacao.status = false;
		validacao.mensage = "Não aceitamos recem nascidos";
		return validacao;
	}

	for(var i=0; i<IDADE.length;i++){
		if( 
			!(("0" <= IDADE[i])&&(IDADE[i] <="9"))  
			){

			validacao.status = false
			validacao.mensage = "Apenas numeros inteiros são aceitas";
			return validacao;
		}
	}
	
	IDADE = Number(IDADE);
	if(!((18<=IDADE)&&(IDADE<=150))){
		validacao.status = false
		validacao.mensage = "Aceitamos apenas maiores de idade VIVOS";
		return validacao;
	}

	return validacao;	
}

module.exports.ValidateCpfRG = (DOC)=>{
	var validacao = {
		'status': true,
		'mensage': "RG/CPF Valida"
	}

	if(!((10 <= DOC.length)&&(DOC.length <= 14))){
		validacao.status = false;
		validacao.mensage = "Verifique se digitou todos os numeros e não colocou nenhuma pontuação";
		return validacao.status;
	}

	for(var i=0; i<DOC.length;i++){
		if( 
			!(("0" <= DOC[i])&&(DOC[i] <="9"))  
			){

			validacao.status = false
			validacao.mensage = "Apenas numeros inteiros são aceitas";
			return validacao.status;
		}
	}
	return validacao.status;	
}