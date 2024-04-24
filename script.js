let resetTemp = 10000;

// Inclusão do script JavaScript
document.addEventListener("DOMContentLoaded", function() {
    let docTitle = document.title;
    window.addEventListener("blur", () => {
        document.title = "Volte!";
    })
    window.addEventListener("focus", () => {
        document.title = docTitle;
    })
});

function msg(mensagem) {
    // Seleciona a div de saída
    let outputDiv = document.getElementById('output');
    // Insere a mensagem na div de saída
    outputDiv.innerHTML = mensagem;
    // Limpa a mensagem de sucesso após 2 segundos
    setTimeout(() => {
        outputDiv.innerText = '';
    }, resetTemp);
}

function removerCaracteres() {
    // Recupera o valor do input
    let inputValor = document.getElementById('inputText').value;
    // Define os caracteres a serem removidos
    let caracteresParaRemover = ['.', ',', ';', '-', '/', '?', '@', ' ', ':'];

    // Itera sobre cada caractere a ser removido
    for (let charToRemove of caracteresParaRemover) {
        // Enquanto houver ocorrências do caractere na string de entrada
        while (inputValor.includes(charToRemove)) {
            // Remove todas as ocorrências do caractere da string de entrada
            inputValor = inputValor.replace(charToRemove, '');
        }
    }

    // Atualiza o valor do input com os caracteres removidos
    document.getElementById('inputText').value = inputValor;
    copiarTexto()

    msg("Limpeza feita e copiada!");

    // Limpa a mensagem de sucesso após 2 segundos
    setTimeout(() => {
        document.getElementById('inputText').value = '';

    }, resetTemp);
}

function removerText() {
    //Recuperar o valor do input 
    let inputInText = document.getElementById('inputText').value;

    // Define os caracteres a serem removidos. (Array) 
    let alfabeto = [];

    // Loop de 'a'... 'z'
    for (let i = 97; i <= 122; i++) {
        alfabeto.push(String.fromCharCode(i)); // Converte o código ASCII para caractere e adiciona ao array
    }

    // Itera sobre cada caractere a ser removido
    for (let textToRemove of alfabeto) {
        // Enquanto houver ocorrências do caractere na string de entrada
        while (inputInText.includes(textToRemove)) {
            // Remove todas as ocorrências do caractere da string de entrada
            inputInText = inputInText.replace(textToRemove, '');
        }
    }


    // Atualiza o valor do input com os caracteres removidos
    document.getElementById('inputText').value = inputInText;
    // Seleciona a div de saída
    copiarTexto()

    msg('Texto removido!');

    // Limpa a mensagem de sucesso após 2 segundos
    setTimeout(() => {
        document.getElementById('inputText').value = '';

    }, resetTemp);

}

function upperText() {
    let inputInText = document.getElementById('inputText').value;
    let upText = inputInText.toUpperCase();
    document.getElementById('inputText').value = upText;
    copiarTexto();
    msg('Resultado:  ' + upText);

    // Limpa a mensagem de sucesso após 2 segundos
    setTimeout(() => {
        document.getElementById('inputText').value = '';

    }, resetTemp);
}

function lowerText() {
    let inputInText = document.getElementById('inputText').value;
    let lText = inputInText.toLowerCase();
    document.getElementById('inputText').value = lText;
    copiarTexto();

    msg('Resultado:  ' + lText);


    // Limpa a mensagem de sucesso após 2 segundos
    setTimeout(() => {
        document.getElementById('inputText').value = '';

    }, resetTemp);
}


function copiarTexto() {
    // Seleciona o elemento que contém o texto que você deseja copiar
    let copyText = document.getElementById('inputText');

    let texto = copyText.value;

    // Cria um copyText de área de transferência temporário
    let inputTemporario = document.createElement('textarea');
    inputTemporario.value = texto;

    // Adiciona o copyText temporário ao documento
    document.body.appendChild(inputTemporario);

    // Seleciona e copia o texto dentro do copyText temporário
    inputTemporario.select();
    document.execCommand('copy');

    // Remove o copyText temporário do documento
    document.body.removeChild(inputTemporario);

}

// Função para alternar entre os modos claro e escuro
function alternarModoEscuro() {
    const body = document.body;
    // Verifica se o modo escuro está ativado
    if (body.classList.contains('dark-mode')) {
        // Se o modo escuro estiver ativado, remove a classe 'dark-mode' e adiciona a classe 'light-mode'
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        // Se o modo escuro não estiver ativado, remove a classe 'light-mode' e adiciona a classe 'dark-mode'
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
}