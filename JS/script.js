/**
 * CleanInput - Aplicativo para limpeza e formatação de texto
 * 
 * Este script contém todas as funções necessárias para o funcionamento
 * do aplicativo CleanInput, incluindo manipulação de texto, cópia para
 * área de transferência e controle de tema.
 */

// Tempo em milissegundos para limpar mensagens e campos (10 segundos)
const TEMPO_RESET = 10000;

// Elementos DOM globais
const inputTexto = document.getElementById('inputText');
const outputDiv = document.getElementById('output');
const themeCheckbox = document.getElementById('theme-checkbox');

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function() {
    // Configuração do título dinâmico
    const tituloOriginal = document.title;
    
    window.addEventListener("blur", () => {
        document.title = "Volte!"; // Altera o título da página quando a aba perde o foco
    });
    
    window.addEventListener("focus", () => {
        document.title = tituloOriginal; // Restaura o título original ao voltar para a aba
    });
    
    // Configuração do tema
    themeCheckbox.addEventListener('change', alternarModoEscuro);
    
    // Verifica preferência de tema do usuário
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeCheckbox.checked = true;
        document.body.classList.add('dark-mode');
    }
});

/**
 * Exibe uma mensagem temporária na área de output
 * @param {string} mensagem - Texto a ser exibido
 */
function exibirMensagem(mensagem) {
    outputDiv.innerHTML = mensagem;
    setTimeout(() => {
        outputDiv.innerText = ''; // Remove a mensagem após 10 segundos
    }, TEMPO_RESET);
}

/**
 * Limpa todos os caracteres especiais do texto, mantendo apenas letras e números
 */
function limparCaracteres() {
    const textoOriginal = inputTexto.value;
    
    // Lista de caracteres a serem removidos
    const caracteresParaRemover = ['.', ',', ';', '-', '/', '?', '@', ' ', ':', '%', '$', '#', '*', '(', ')', '[', ']', '{', '}', '&', '@', '¨', '!'];
    
    let textoLimpo = textoOriginal;
    
    // Remove cada caractere da lista
    for (let caractere of caracteresParaRemover) {
        textoLimpo = textoLimpo.split(caractere).join('');
    }
    
    inputTexto.value = textoLimpo;
    copiarTexto();
    exibirMensagem("Limpeza feita e copiada para área de transferência!");
}

/**
 * Limpa apenas caracteres de texto (letras), mantendo números e símbolos
 */
function limparApenasTexto() {
    let texto = inputTexto.value;
    
    // Remove todas as letras (maiúsculas e minúsculas)
    texto = texto.replace(/[a-zA-Z]/g, '');
    
    inputTexto.value = texto;
    copiarTexto();
    exibirMensagem('Texto removido e copiado para área de transferência!');
}

/**
 * Converte todo o texto para maiúsculas
 */
function converterParaMaiusculas() {
    const texto = inputTexto.value.toUpperCase();
    inputTexto.value = texto;
    copiarTexto();
    exibirMensagem('Texto convertido para MAIÚSCULAS e copiado!');
}

/**
 * Converte todo o texto para minúsculas
 */
function converterParaMinusculas() {
    const texto = inputTexto.value.toLowerCase();
    inputTexto.value = texto;
    copiarTexto();
    exibirMensagem('Texto convertido para minúsculas e copiado!');
}

/**
 * Copia o texto do input para a área de transferência
 */
function copiarTexto() {
    inputTexto.select();
    inputTexto.setSelectionRange(0, 99999); // Para dispositivos móveis
    
    try {
        document.execCommand('copy'); // Executa o comando de cópia
        exibirMensagem('Texto copiado para area de transferência!');

    } catch (err) {
        console.error('Falha ao copiar texto: ', err);
    }
    if (inputTexto.value === '') {
        exibirMensagem('Nenhum texto para copiar!');
    }
    
    window.getSelection().removeAllRanges(); // Remove a seleção após a cópia
}

/**
 * Formata um CNPJ no padrão 00.000.000/0000-00
 */
function formatarCNPJ() {
    let cnpj = inputTexto.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    // Aplica a formatação
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
    
    // Limita a 18 caracteres (tamanho do CNPJ formatado)
    cnpj = cnpj.substring(0, 18);
    
    inputTexto.value = cnpj;
    copiarTexto();
    exibirMensagem("CNPJ formatado e copiado!");
}

/**
 * Limpa completamente o campo de texto
 */
function limparTexto() {
    inputTexto.value = '';
    exibirMensagem("Campo limpo!");
}

/**
 * Alterna entre os temas claro e escuro
 */
function alternarModoEscuro() {
    document.body.classList.toggle('dark-mode', themeCheckbox.checked);
    localStorage.setItem('modo-escuro', themeCheckbox.checked); // Salva preferência
}

/**
 * Aumenta o tamanho da fonte em 1px
 */
function aumentarFonte() {
    ajustarTamanhoFonte(1);
}

/**
 * Diminui o tamanho da fonte em 1px
 */
function diminuirFonte() {
    ajustarTamanhoFonte(-1);
}

/**
 * Ajusta o tamanho da fonte baseado no incremento
 * @param {number} incremento - Valor a ser adicionado/subtraído do tamanho atual
 */
function ajustarTamanhoFonte(incremento) {
    const body = document.body;
    const tamanhoAtual = parseFloat(getComputedStyle(body).fontSize);
    const novoTamanho = tamanhoAtual + incremento;
    
    if (novoTamanho >= 12 && novoTamanho <= 24) {
        body.style.fontSize = novoTamanho + 'px';
        localStorage.setItem('tamanho-fonte', novoTamanho);
    }
}

// Carrega preferências salvas
function carregarPreferencias() {
    const modoEscuro = localStorage.getItem('modo-escuro') === 'true';
    if (modoEscuro) {
        themeCheckbox.checked = true;
        document.body.classList.add('dark-mode');
    }
    
    const tamanhoFonte = localStorage.getItem('tamanho-fonte');
    if (tamanhoFonte) {
        document.body.style.fontSize = tamanhoFonte + 'px';
    }
}

// Inicializa as preferências
carregarPreferencias();
