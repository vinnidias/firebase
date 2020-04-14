var admin = require("firebase-admin");
var user = require('readline-sync')

var serviceAccount = require("./credenciais.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://projeto-firebase-9635c.firebaseio.com"
});

var tabelaCarros = 'Tabela de carros'
var db = admin.database().ref(tabelaCarros)


function cadastraCarro(){
    var marca = user.question('digite a marca do carro: ')
    var carroNome = user.question('digite o modelo do carro que deseja inserir: ')
    var cor = user.question('digite a cor do carro: ')
    var ano = user.questionInt('digite o ano do carro: ')
    var valor = user.questionInt('digite o valor do carro inserido: ')

    db.push({
        marca: marca,
        modelo: carroNome,
        cor: cor,
        ano: ano,
        valor: valor
    }, ()=>{
        console.log('carro adcionado com sucesso!!')
        menu()
    })
}

function mostraCarros(){
    db.on('value', snapshot =>{
       console.log(snapshot.val()) 
       menu()
    
    })
}

function filtroMaiorValor(){
 var valorPesquisado = user.questionInt('digite o valor minimo para o filtro: ')   
    db.orderByChild('valor').startAt(valorPesquisado)
        .on('child_added', snapshot =>{
            console.log(snapshot.val())
        })
        .then(()=>{
            console.log('foi')
        })
}

function filtroMenorValor(){
 var valorPesquisado = user.questionInt('digite o valor maximo para o filtro: ')
    db.orderByChild('valor').endAt(valorPesquisado) 
        .on('child_added', snapshot =>{
            console.log(snapshot.val())
            menu()
        })
    }



function filtroValorExato(){
 var valorPesquisado = user.questionInt('digite o valor exato do carro a ser pesquisado: ')
 db.orderByChild('valor').equalTo(valorPesquisado)
    .on('child_added', snapshot =>{
        console.log(snapshot.val())
        menu()
    })
}

function filtroModelo(){
    var valorPesquisado = user.question('digite o modelo do carro a ser pesquisado: ')
    db.orderByChild('modelo').equalTo(valorPesquisado)
       .on('child_added', snapshot =>{
           console.log(snapshot.val())
           menu()
       })
   }

function filtroMarca(){
    var valorPesquisado = user.question('digite a marca do carro a ser pesquisado: ')
    db.orderByChild('marca').equalTo(valorPesquisado)
       .on('child_added', snapshot =>{
           console.log(snapshot.val())
           menu()
       })
   }

   function filtroCor(){
    var valorPesquisado = user.question('digite a marca do carro a ser pesquisado: ')
    db.orderByChild('cor').equalTo(valorPesquisado)
       .on('child_added', snapshot =>{
           console.log(snapshot.val())
           menu()
       })
   }

   function filtroAno(){
    var valorPesquisado = user.questionInt('digite o ano do carro a ser pesquisado: ')
    db.orderByChild('ano').equalTo(valorPesquisado)
       .on('child_added', snapshot =>{
           console.log(snapshot.val())
           menu()
       })
   }


function sair(){
    process.exit()
}

function menu(){
    console.log('\n')
    console.log("==============================     TABELA DE CARROS ==============================")
    var interaçoes = user.question(' digite 1 para cadastrar um carro: \n digite 2 para mostrar todos os carros: \n digite 3 para filtrar os carros de maior valor: \n digite 4 para filtrar os carros de menor valor: \n digite 5 para filtrar os carros pelo valor exato: \n digite 6 para pesquisar pelo modelo: \n digite 7 para pesquisar pela cor : \n digite 8 para pesquisar pelo ano: \n digite 9 para pesquisar pela marca: \n digite S para sair: \n ')
if(interaçoes === '1'){
    cadastraCarro()
}if(interaçoes === '2'){
    mostraCarros()
}if(interaçoes === '3'){
    filtroMaiorValor()
}if(interaçoes === '4'){
    filtroMenorValor()
}if(interaçoes === '5'){
    filtroValorExato()
}if(interaçoes === '6'){
    filtroModelo()
}if(interaçoes === '7'){
    filtroCor()
}if(interaçoes === '8'){
    filtroAno()
}if(interaçoes === '9'){
    filtroMarca()
}if(interaçoes.toLocaleUpperCase === 'S'){
    sair()
}
}

menu()