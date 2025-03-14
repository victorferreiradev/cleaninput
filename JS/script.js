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
    let caracteresParaRemover = ['.', ',', ';', '-', '/', '?', '@', ' ', ':', '%', '$', '#', '*', '(', ')', '[', ']', '{', '}', '&', '@', '¨', '!'];

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
    // Recuperar o valor do input 
    let inputInText = document.getElementById('inputText').value;

    // Define os caracteres a serem removidos (minúsculas e maiúsculas)
    let alfabeto = [];

    // Loop para adicionar 'a' a 'z' e 'A' a 'Z'
    for (let i = 97; i <= 122; i++) {
        alfabeto.push(String.fromCharCode(i));      // Adiciona letra minúscula
        alfabeto.push(String.fromCharCode(i - 32)); // Adiciona letra maiúscula correspondente
    }

    // Remove os caracteres do texto
    for (let textToRemove of alfabeto) {
        inputInText = inputInText.replaceAll(textToRemove, ''); 
    }

    // Atualiza o valor do input com os caracteres removidos
    document.getElementById('inputText').value = inputInText;

    // Seleciona a div de saída
    copiarTexto();

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

function formatareEmCnpj() {
    // Recupera o valor do input
    let inputValor = document.getElementById('inputText').value;

    // Remove qualquer caractere que não seja número
    inputValor = inputValor.replace(/\D/g, '');

    let resultado = '';

    // Itera sobre cada caractere, pulando de 3 em 3
    for (let i = 0; i < inputValor.length; i++) {
        resultado += inputValor[i];

        // Adiciona um ponto após 2 ou 5 caracteres para o formato CNPJ
        if (i === 1 || i === 4) {
            resultado += '.';
            console.log(resultado);
        }

        // Adiciona uma barra após o oitavo caractere
        if (i === 7) {
            resultado += '/';
            console.log(resultado);

        }

        // Adiciona um hífen após o 12º caractere
        if (i === 11) {
            resultado += '-';
            console.log(resultado);

        }
    }

    // Atualiza o valor do input com a formatação
    document.getElementById('inputText').value = resultado;

    // Chama a função de copiar (presumindo que você a tenha definida)
    copiarTexto();

    // Mostra a mensagem de sucesso
    msg("Formatação feita e copiada!");

    // Limpa a mensagem de sucesso após 2 segundos (caso queira limpar o input)
    setTimeout(() => {
        document.getElementById('inputText').value = '';

    }, 10000);
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

  const info = document.getElementById("info");
  const tooltip = document.getElementById("tooltip");

  info.addEventListener("mouseenter", (event) => {
    tooltip.style.display = "block";
    tooltip.style.left = event.pageX + "px";
    tooltip.style.top = event.pageY + "px";
    tooltip.textContent = "Caracteres a serem removidos: '!','.', ',', ';', '-', '/', '?', '@', ' ', ':', '%', '$', '#', '*', '(', ')', '[', ']', '{', '}', '&', '@', '¨'";
  });

  info.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });

