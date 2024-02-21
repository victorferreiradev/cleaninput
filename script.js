function removerCaracteres() {
    // Recupera o valor do input
    var inputValor = document.getElementById('inputText').value;
    // Define os caracteres a serem removidos
    var caracteresParaRemover = ['.', ',', ';', '-', '/', '?', '@', ' '];

    // Itera sobre cada caractere a ser removido
    for (var i = 0; i < caracteresParaRemover.length; i++) {
        // Cria uma expressão regular para substituir todas as ocorrências do caractere atual
        var expressaoRegular = new RegExp('\\' + caracteresParaRemover[i], 'g');
        // Remove o caractere atual do valor do input
        inputValor = inputValor.replace(expressaoRegular, '');
    }

    // Atualiza o valor do input com os caracteres removidos
    document.getElementById('inputText').value = inputValor;


    // Seleciona a div de saída
    var outputDiv = document.getElementById('output');
    // Define a mensagem de sucesso
    var mensagem = 'Caracteres removidos com sucesso!';
    // Insere a mensagem na div de saída
    outputDiv.innerHTML = mensagem;


    setTimeout(() => {
        outputDiv.innerText = '';
    }, 20000);
}