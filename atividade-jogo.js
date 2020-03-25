var db = require('./bancoDeDados').database
var user = require('readline-sync')

var dadosDoUsuarioRef = db.ref('jogo') 
var idDoUsuarioRef = nome => db.ref(`jogo/${nome}`)

function mostraDados() {
    dadosDoUsuarioRef.on('value', snapshot => {
        var pontuacoes = snapshot.val()
        Object.entries(pontuacoes).forEach(([chave, pontuacao]) => console.log(' player:',pontuacao.nome, '  pontuacao:', pontuacao.pontuacao))
    })
}

function criaPontuacaoDeJogador(jogador, callback) {
    var pontuacaoUsuario = idDoUsuarioRef(jogador.nome)

    pontuacaoUsuario.set({
        nome: jogador.nome,
        pontuacao: jogador.pontuacao
    }, callback())
}

var jogador = (nome, pontuacao) => ({ nome, pontuacao })

console.clear()
console.log('========================== JOGO DE DIGITAR ==========================')

var nome = user.question('Digite seu nome: ')
var entrada = user.question('Digite o maximo de letras possiveis e pressione enter:\n')
var pontuacao = entrada.length

console.log('\n\n\n\n')
console.log('Sua pontuação final foi: ', pontuacao)

console.log('========================= OBRIGADO POR JOGAR! =========================')

criaPontuacaoDeJogador(jogador(nome, pontuacao), mostraDados)