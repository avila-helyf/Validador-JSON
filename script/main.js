// 1. Aqui nós "capturamos" os elementos do HTML para usar no JS
//Criamos variáveis para cada elemento que queremos interagir, usando document.querySelector() para selecioná-los pelo ID ou classe.
const botaoValidar = document.querySelector("#btn-validar");
const botaoFormatar = document.querySelector("#btn-formatar");
const botaoMinificar = document.querySelector("#btn-minificar");
const botaoLimpar = document.querySelector("#btn-limpar");
const botaoCopiar = document.querySelector("#btn-copiar");
const botaoRecuo2 = document.querySelector("#btn-recuo-2");
const botaoRecuo4 = document.querySelector("#btn-recuo-4");
const botaoBaixar = document.querySelector("#btn-baixar");
const checkboxOrdenar = document.querySelector("#chk-ordenar");
// 2. Aqui nós criamos variáveis para os campos de entrada e saída, e para o badge de status
const campoEntrada = document.querySelector(".code-input");
const campoSaida = document.querySelector(".code-output pre code");
const badgeStatus = document.querySelector(".status-badge");
const textoOriginalSaida = campoSaida.textContent;
const textoOriginal = botaoCopiar.textContent;
const textoOriginalBaixar = botaoBaixar.textContent;
let tamanhoRecuo = 2; // Começa com 2 por padrão

//função para tentar converter o texto do campo de entrada em JSON. Se der certo, retorna o objeto JSON; se der errado, retorna null.
const obterJsonValido = () => {
    try {
        return JSON.parse(campoEntrada.value);
    } catch (erro) {
        return null;
    }
};

//função para verificar se o campo de entrada está vazio. Se estiver, exibe uma mensagem de erro e retorna true; caso contrário, retorna false.
const verificaCampoVazio = (texto) => {
    if (texto.trim() === "") {
        console.log("Campo vazio!");
        campoSaida.textContent = "Necessário preenchimento.";
        badgeStatus.textContent = "Campo Vazio";
        badgeStatus.classList.add("error");
        return true; 
    }
    return false;
};

// Função para ordenar as chaves do primeiro nível de um objeto
const ordenarChavesObjeto = (objeto) => {
    const chavesOrdenadas = Object.keys(objeto).sort();
    const objetoOrdenado = {};
    
    chavesOrdenadas.forEach(chave => {
        objetoOrdenado[chave] = objeto[chave];
    });
    
    return objetoOrdenado;
};

// Aqui nós dizemos ao JS para "escutar" quando o botão VALIDAR for clicado
botaoValidar.addEventListener("click", function() {
    const textoDigitado = campoEntrada.value;
    
    // Baby Steps: Se o campo estiver vazio, nem precisamos tentar validar
    if (verificaCampoVazio(textoDigitado)) {
        return; 
    }

    const jsonValido = obterJsonValido(); 
    
    if (jsonValido === null) {
        console.log("Ops... Esse JSON está inválido ou mal formatado.");
        badgeStatus.textContent = "JSON Inválido";
        badgeStatus.classList.add("error");
        campoSaida.textContent = "Erro ao validar o JSON.";
        return;
    }

    console.log("Sucesso! O JSON é perfeitamente válido.");
    badgeStatus.textContent = "JSON Válido";
    
    // Se estava com erro antes, remove a classe e ele volta a ser verde automaticamente
    badgeStatus.classList.remove("error");
}); //  Fechado corretamente aqui!


// Aqui nós dizemos ao JS para "escutar" quando o botão FORMATAR for clicado
botaoFormatar.addEventListener("click", function() {
    const textoDigitado = campoEntrada.value;
    
    if (verificaCampoVazio(textoDigitado)) {
        return; 
    }   
    
    console.log("Formatando o JSON...");
    
    let jsonValido = obterJsonValido();

    if (jsonValido === null) {
        console.log("Ops... Esse JSON está inválido ou mal formatado.");
        campoSaida.textContent = "Erro ao formatar o JSON.";
        badgeStatus.textContent = "JSON Inválido";
        badgeStatus.classList.add("error");
        return;
    }

    // Se a caixinha estiver marcada, ordena o objeto antes de formatar
    if (checkboxOrdenar.checked) {
        jsonValido = ordenarChavesObjeto(jsonValido);
    }

    // Passamos null no replacer para garantir que as propriedades aninhadas não sumam
    const jsonFormatado = JSON.stringify(jsonValido, null, tamanhoRecuo);
    campoSaida.textContent = jsonFormatado;
    badgeStatus.textContent = "JSON Válido";
    badgeStatus.classList.remove("error");
});

// Aqui nós dizemos ao JS para "escutar" quando o botão MINIFICAR for clicado
botaoMinificar.addEventListener("click", function() {
    const textoDigitado = campoEntrada.value;

    if (verificaCampoVazio(textoDigitado)) {
        return; 
    }
    console.log("Minificando o JSON...");

    let jsonValido = obterJsonValido();

    if (jsonValido === null) {
        console.log("Ops... Esse JSON está inválido ou mal formatado.");
        campoSaida.textContent = "Erro ao minificar o JSON.";
        badgeStatus.textContent = "JSON Inválido";
        badgeStatus.classList.add("error");
        return;
    }

    // Se a caixinha estiver marcada, ordena o objeto antes de minificar
    if (checkboxOrdenar.checked) {
        jsonValido = ordenarChavesObjeto(jsonValido);
    }

    // Sem recuo e sem replacer para juntar tudo em uma linha só sem perdas
    const jsonMinificado = JSON.stringify(jsonValido, null);
    campoSaida.textContent = jsonMinificado;
    badgeStatus.textContent = "JSON Válido";
    badgeStatus.classList.remove("error");
});

botaoLimpar.addEventListener("click", function() {
    campoEntrada.value = "";
    campoSaida.textContent = textoOriginalSaida;
    badgeStatus.textContent = "Insira seu JSON :D";
    badgeStatus.classList.remove("error");
});

botaoCopiar.addEventListener("click", function() {
    console.log("Copiando para a área de transferência...");
    navigator.clipboard.writeText(campoSaida.textContent);
    
    // 1. Muda o texto do botão para o check imediatamente após o clique
    console.log("Texto copiado!");
    botaoCopiar.textContent = "✔️";
    
    // 2. O despertador: espera 2 segundos e volta ao texto original
    setTimeout(() => {
        botaoCopiar.textContent = textoOriginal; 
    }, 2000);
});


botaoBaixar.addEventListener("click", function() {
    // 1. Capture o texto que está na saída atualmente
    const textoParaBaixar = campoSaida.textContent;
    
    // Pequena validação: se o campo estiver vazio ou for o texto inicial padrão, você decide se deixa baixar ou coloca um aviso.
    
    // 2. Criamos o "arquivo virtual" na memória do navegador
    const blob = new Blob([textoParaBaixar], { type: "application/json" });
    
    // 3. Criamos uma URL temporária para esse arquivo
    const urlLink = URL.createObjectURL(blob);
    
    // 4. Criamos um link <a> escondido na memória
    const linkFantasma = document.createElement("a");
    linkFantasma.href = urlLink;
    linkFantasma.download = "meu-arquivo.json"; // O nome do arquivo que vai baixar
    
    // 5. Simulamos o clique do usuário para iniciar o download
    linkFantasma.click();
    
    // 6. Boa prática: limpamos a memória do navegador deletando a URL temporária
    URL.revokeObjectURL(urlLink);

    // 7. Feedback para o usuário
    botaoBaixar.textContent = "✔️";

    // 2. O despertador: espera 2 segundos e volta ao texto original
    setTimeout(() => {
        botaoBaixar.textContent = textoOriginalBaixar; 
    }, 2000);
    
    console.log("Download do arquivo JSON iniciado!");
});

botaoRecuo4.addEventListener("click", function() {
    tamanhoRecuo = 4; // Muda o valor da variável para 4
    
    botaoRecuo4.classList.add("active");    // Acende o botão 4
    botaoRecuo2.classList.remove("active"); // Apaga o botão 2
    
    console.log("O recuo atual agora é:", tamanhoRecuo);
});

botaoRecuo2.addEventListener("click", function() {
    tamanhoRecuo = 2; // Muda o valor da variável para 2
    
    botaoRecuo4.classList.remove("active");    // Apaga o botão 4
    botaoRecuo2.classList.add("active"); // Acende o botão 2
    
    console.log("O recuo atual agora é:", tamanhoRecuo);
});