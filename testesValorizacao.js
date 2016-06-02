/* Funções do atleta */
    function getNome(mercado, atleta) {
        return mercado["atletas"][atleta]["apelido"];
    }

    function getClube(mercado, atleta) {
        return mercado["clubes"][getClubeId(mercado, atleta)]["nome"];
    }

    function getClubeId(mercado, atleta) {
        return mercado["atletas"][atleta]["clube_id"];
    }

    function getPosicao(mercado, atleta) {
        return mercado["posicoes"][mercado["atletas"][atleta]["posicao_id"]]["nome"];
    }

    function getUltimaPontuacao(mercado, atleta) {
        return mercado["atletas"][atleta]["pontos_num"];
    }

    function getVariacao(mercado, atleta) {
        return mercado["atletas"][atleta]["variacao_num"];
    }

    function getMedia(mercado, atleta) {
        return mercado["atletas"][atleta]["media_num"];
    }

    function getPreco(mercado, atleta) {
        return mercado["atletas"][atleta]["preco_num"];
    }

    function getPrecoAnterior(mercado, atleta) {
        return getPreco(mercado, atleta) - getVariacao(mercado, atleta);
    }

    function getMediaAnterior(mercado, atleta) {
        if (getNumJogos(mercado, atleta) == 1) {
            return 0;
        }
        return ((getMedia(mercado, atleta) * getNumJogos(mercado, atleta)
                - getUltimaPontuacao(mercado, atleta)) /(getNumJogos(mercado, atleta) - 1)).toFixed(2);
    }

    function getNumJogos(mercado, atleta) {
        return mercado["atletas"][atleta]["jogos_num"];
    }

    function ehProvavel(mercado, atleta) {
        return (7 == mercado["atletas"][atleta]["status_id"]);
    }

    function ehFavorito(mercado, atleta) {
        var favoritos = clubesFavoritosDaRodada();
        return (favoritos.indexOf(getClubeId(mercado, atleta)) != -1);
    }

    function jogaEmCasa(mercado, atleta) {
        return mercado["atletas"][atleta]["clube_id"] == mercado["atletas"][atleta]["partida"]["clube_casa_id"];
    }

    function descreveAtleta(mercado, atleta) {
        $("#principal").append("<div>"
        + "<br>*********************************************"
        + "<br>Preço Anterior:\t\t\t" + getPrecoAnterior(mercado, atleta)
        + "<br>Variação:\t\t\t" + getVariacao(mercado, atleta)
        + "<br>Preço:\t\t\t" + getPreco(mercado, atleta)
        + "<br>Jogos:\t\t\t" + getNumJogos(mercado, atleta)
        + "<br>Última:\t\t\t" + getUltimaPontuacao(mercado, atleta)
        + "<br>Média Anterior:\t\t\t" + getMediaAnterior(mercado, atleta)
        + "<br>Média Atual:\t\t\t" + getMedia(mercado, atleta)
        + "<br>Nome:\t\t\t" + getNome(mercado, atleta)
        + "<br>Posição:\t\t\t" + getPosicao(mercado, atleta)
        + "<br>Clube:\t\t\t" + getClube(mercado, atleta)
        + "<br>---------------------------------------------"
        + "</div>");
        /*console.log("*********************************************");
        console.log("Preço Anterior:\t\t\t" + getPrecoAnterior(mercado, atleta));
        console.log("Variação:\t\t\t" + getVariacao(mercado, atleta));
        console.log("Preço:\t\t\t" + getPreco(mercado, atleta));
        console.log("Jogos:\t\t\t" + getNumJogos(mercado, atleta));
        console.log("Última:\t\t\t" + getUltimaPontuacao(mercado, atleta));
        console.log("Média Anterior:\t\t\t" + getMediaAnterior(mercado, atleta));
        console.log("Média Atual:\t\t\t" + getMedia(mercado, atleta));
        console.log("Nome:\t\t\t" + getNome(mercado, atleta));
        console.log("Posição:\t\t\t" + getPosicao(mercado, atleta));
        console.log("Clube:\t\t\t" + getClube(mercado, atleta));
        console.log("---------------------------------------------");*/
    }

/*
function fazTudo(mercado) {
    var palpitesCertos = 0;
    var palpitesErrados = 0;
    var jogadoresAConsiderar = 0;
    var valorizados = 0;
    var desvalorizados = 0;
    var estabilizados = 0;
    var valorizacaoTotal = 0;
    $("#oi").append("<div>Jogadores que desvalorizaram, mas fizeram mais que a média</div>");
    for (var i = 0; i < mercado["atletas"].length; i++) { //
        if (getUltimaPontuacao(mercado, i) == 0 && getVariacao(mercado, i) == 0) {
            continue;
        }

        if (getNumJogos(mercado, i) < 3) continue;

        valorizacaoTotal += getVariacao(mercado, i);

        if (getVariacao(mercado, i) > 0) {
            valorizados++;
            if (getUltimaPontuacao(mercado, i) >= getMediaAnterior(mercado, i)) {
                palpitesCertos++;
            } else {
                if (getUltimaPontuacao(mercado, i) < (getPrecoAnterior(mercado, i) / 4)
                    && getUltimaPontuacao(mercado, i) < (getMediaAnterior(mercado, i) / 4)) {
                    //descreveAtleta(mercado, i);
                }
                //descreveAtleta(mercado, i);
                jogadoresAConsiderar++;
            }
        } else if (getVariacao(mercado, i) < 0) {
            desvalorizados++;
            if (getUltimaPontuacao(mercado, i) >= getMediaAnterior(mercado, i)) {
                palpitesErrados++;
                descreveAtleta(mercado, i);
            } 
        } else {
            estabilizados++;
        }
    }
    $("#oi").append("<div>Total: " + palpitesErrados + "</div>");
    console.log("Valorizados: " + valorizados);
    console.log("Desvalorizados: " + desvalorizados);
    console.log("Estabilizados: " + estabilizados);
    console.log("palpitesCertos: " + palpitesCertos + "/" + valorizados);
    console.log("palpitesErrados: " + palpitesErrados + "/" + desvalorizados);
    console.log("jogadoresAConsiderar: " + jogadoresAConsiderar + "/" + valorizados);
    console.log("valorizacaoTotal: " + valorizacaoTotal);
}
*/


// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// Os que jogam em casa mas que não é bom escalar
function clubesDeRiscoDaRodada() {
    var C = {
        "FLA": 262,
        "BOT": 263,
        "COR": 264,
        "FLU": 266,
        "PAL": 275,
        "SAO": 276,
        "SAN": 277,
        "ATLM": 282,
        "CRU": 283,
        "GRE": 284,
        "INT": 285,
        "VIT": 287,
        "SPO": 292,
        "ATLP": 293,
        "CTB": 294,
        "PON": 303,
        "CHA": 315,
        "FIG": 316,
        "AME": 327,
        "STC": 344
    }
    //return [C["PAL"], C["GRE"], C["ATLP"], C["SAN"], C["SPO"]];
    return [C["PAL"], C["FIG"]];
}

function clubesFavoritosDaRodada() {
    var C = {
        "FLA": 262,
        "BOT": 263,
        "COR": 264,
        "FLU": 266,
        "PAL": 275,
        "SAO": 276,
        "SAN": 277,
        "ATLM": 282,
        "CRU": 283,
        "GRE": 284,
        "INT": 285,
        "VIT": 287,
        "SPO": 292,
        "ATLP": 293,
        "CTB": 294,
        "PON": 303,
        "CHA": 315,
        "FIG": 316,
        "AME": 327,
        "STC": 344
    }
    //return [C["PAL"], C["GRE"], C["ATLP"], C["SAN"], C["SPO"]];
    return [C["INT"], C["COR"], C["AME"], C["FLA"]];
}

function testaCriterioDeValorizacao(mercado) {
    var erros = 0;
    var acertos = 0;
    var prejuizo = 0;
    var lucro = 0;
    var clubesDeRisco = clubesDeRiscoDaRodada();
    for (var i = 0; i < mercado["atletas"].length; i++) {
        if (1 == 1
            //&& getMediaAnterior(mercado, i) > 2
            && getMediaAnterior(mercado, i) < 4
            && getPrecoAnterior(mercado, i) < 10
            && getNumJogos(mercado, i) -1 > 2
            && (!jogaEmCasa(mercado, i) 
                || ehFavorito(mercado, i))
            && clubesDeRisco.indexOf(getClubeId(mercado, i)) == -1
            )   {
            if (getVariacao(mercado, i) > 0) {
                acertos++;
                lucro += getVariacao(mercado, i);
            } else {
                erros++;
                descreveAtleta(mercado, i);
                prejuizo += getVariacao(mercado, i);
            }
        }
    }
    $("#principal").append("<div>Erros: " + erros + "</div>");
    $("#principal").append("<div>Acertos: " + acertos + "</div>");
    $("#principal").append("<div>Lucro: " + lucro + "</div>");
    $("#principal").append("<div>prejuizo: " + prejuizo + "</div>");
}

function mostraBonsParaValorizar(mercado) {
    var posicaoRequerida = decodeURI(getUrlVars()["posicao"]);
    if (posicaoRequerida == "undefined") {
        posicaoRequerida = "Zagueiro";
    }
    $("#principal").append("<div>Bons " + posicaoRequerida + "s para valorizar:</div>");
    var clubesDeRisco = clubesDeRiscoDaRodada();
    for (var i = 0; i < mercado["atletas"].length; i++) { //
        if (ehProvavel(mercado, i) 
            && getMedia(mercado, i) < 4 
            && getPreco(mercado, i) < 11 
            && getNumJogos(mercado, i) > 2 
            && (jogaEmCasa(mercado, i) 
                || ehFavorito(mercado, i))
            && clubesDeRisco.indexOf(getClubeId(mercado, i)) == -1
            && getPosicao(mercado, i) == posicaoRequerida
            ) {
            descreveAtleta(mercado, i);
        }
    }
}
