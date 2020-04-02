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
    var carroNome = user.question('digite o modelo do carro que deseja inserir: ')
    var valor = user.questionInt('digite o valor do carro inserido: ')

    db.push({
        modelo: carroNome,
        valor: valor
    }, ()=>{
        console.log('carro adcionado com sucesso!!')
        menu()
    })
}

function mostraCarros(){
    db.on('value', snapshot =>{
       console.log(snapshot.val()) 
 
    }, ()=>{
        menu()
    }) 
}

function filtroMaiorValor(){
 var valorPesquisado = user.questionInt('digite o valor minimo para o filtro: ')   
    db.orderByChild('valor').startAt(valorPesquisado)
        .on('child_added', snapshot =>{
    console.log(snapshot.val())
}, ()=>{
    menu()
})
}

function filtroMenorValor(){
 var valorPesquisado = user.questionInt('digite o valor maximo para o filtro: ')
    db.orderByChild('valor').endAt(valorPesquisado) 
        .on('child_added', snapshot =>{
            console.log(snapshot.val())
        
        }, ()=>{
            menu()
        })


}

function filtroValorExato(){
 var valorPesquisado = user.questionInt('digite o valor exato do carro a ser pesquisado: ')
 db.orderByChild('valor').equalTo(valorPesquisado)
    .on('child_added', snapshot =>{
        console.log(snapshot.val())
    }, ()=>{
        menu()
    })

}

function sair(){
    process.exit()
}

function menu(){
    console.log('\n')
    console.log("==============================     TABELA DE CARROS ==============================")
    var interaçoes = user.question('Digite 1 para cadastrar um carro: \n digite 2 para mostrar todos os carros: \n digite 3 para filtrar os carros de maior valor: \n digite 4 para filtrar os carros de menor valor: \n digite 5 para filtrar os carros pelo valor exato: \n digite S para sair: \n ')
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
}if(interaçoes.toLocaleUpperCase() === 'S'){
    sair()
}
    
}
menu()