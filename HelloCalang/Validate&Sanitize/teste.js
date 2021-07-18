var validar = require('./ValSan.js')

var teste = "05288866";

var objeto = validar.ValidateCpfRG(teste);

console.log("O testo passado é: "+teste+"\n\n")
console.log(`status do objeto: ${objeto.status} \nMensagem do objeto: ${objeto.mensage}`)