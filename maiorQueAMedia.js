/* Chute: ultima > mediaAnterior =>  variacao > 0 */

var JOGOS = 2;
var MEDIA = 1;
var ULTIMA = 0;
var INICIO = 36;
var JOGADOR_INICIAL = 12;
var j = INICIO + ULTIMA;
var falhas = 0;
var acertos = 0;
var atletasValorizados = 0;
var atletasDesvalorizados = 0;
var atletasSemVariacao = 0;
var valorizacoes = 0;
var NUM_JOGADORES = 230;
for (var i = JOGADOR_INICIAL; i < NUM_JOGADORES; i++) {
    var apelido = $($(".cartola-atletas__apelido")[i]).html();
    var time = $($(".cartola-atletas__time img")[i]).prop("alt");
    var ultima = $($(".cartola-atletas__stats__numeros")[j+ULTIMA]).html();
    var jogos = $($(".cartola-atletas__stats__numeros")[j+JOGOS]).html();
    var mediaAtual = $($(".cartola-atletas__stats__numeros")[j+MEDIA]).html();
    var preco = $($(".cartola-atletas__preco-cartoleta")[i]).html();
    var variacao = $($(".cartola-atletas__preco-media")[i]).html();
    if ($($(".cartola-atletas__preco-media")[i]).hasClass("cartola-atletas__preco-media--negativa")) {
        variacao = -variacao;
    }

    valorizacoes += parseFloat(variacao);
    var mediaAnterior = (mediaAtual * jogos - ultima)/(jogos - 1);

    if (variacao > 0) {
        atletasValorizados++;
    } else if (variacao < 0) {
        atletasDesvalorizados++;
    } else {
        atletasSemVariacao++;
    }

    if (ultima > mediaAnterior && variacao < 0) {
        console.log("Preço: " + preco);
        console.log("Média anterior: " + parseFloat(mediaAnterior).toFixed(2));
        console.log("Última: " + ultima);
        console.log("Variação de preço: " + variacao);
        console.log("Apelido: " + apelido);
        console.log("Time: " + time);
        console.log("Jogos: " + jogos);
        console.log("-----------------------------------------------------------");
        falhas++;
    }

    if (ultima > mediaAnterior && variacao > 0) {
        acertos++;
    }
    j += 3;
}
console.log("Total de falhas: " + falhas + "/" + atletasDesvalorizados);
console.log("Total de acertos: " + acertos + "/" + atletasValorizados);
console.log("Atletas sem variação: " + atletasSemVariacao);
console.log("Soma Variação: " + valorizacoes);
