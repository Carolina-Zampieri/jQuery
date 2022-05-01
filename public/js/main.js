var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);   // click é a mesma coisa que on.("click")
})

// a maneira feita acima é o atalho dessa função:
// $(document).ready(function(){   //essa função chama o que está dentro quando a página carrega
   // atualizaTamanhoFrase();
    //inicializaContadores();
    // inicializaCronometro();
    // $("#botao-reiniciar").click(reiniciaJogo);   // click é a mesma coisa que on.("click")
// })

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
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){
        var cronometroID = setInterval(function(){    // setInterval serve para chamar coisas de tanto em tanto tempo
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                campo.attr("disabled", true);
                clearInterval(cronometroID)
            }
        }, 1000);
    });
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
}





