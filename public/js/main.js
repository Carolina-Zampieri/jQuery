var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);   // click é a mesma coisa que on.("click")
    atualizaPlacar();

    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });

    $('.tooltip').tooltipster({
        trigger: "custom"
    });
});

// a maneira feita acima é o atalho dessa função:
// $(document).ready(function(){   //essa função chama o que está dentro quando a página carrega
   // atualizaTamanhoFrase();
    //inicializaContadores();
    // inicializaCronometro();
    // $("#botao-reiniciar").click(reiniciaJogo);   // click é a mesma coisa que on.("click")
// })

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
    
        var qtdPalavras = conteudo.split(/\S+/).length - 1;  // /\S+/ busca por qualquer espaço vazio
        $("#contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    
    });
}

function inicializaCronometro(){
    campo.one("focus", function(){
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function(){    // setInterval serve para chamar coisas de tanto em tanto tempo
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo(){
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores(){
    campo.on("input", function(){
    var frase = $(".frase").text();
    var digitado = campo.val();
    var comparavel = frase.substr(0, digitado.length);
    if(digitado == comparavel){
        campo.addClass("borda-verde");
        campo.removeClass("borda-vermelha");
    }else{
        campo.addClass("borda-vermelha");
        campo.addClass("borda-verde");
    }
})
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
}





