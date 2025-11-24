let cardsContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("#input-busca");
let todosOsDados = []; // Armazenará todos os dados do JSON

// Função principal que é chamada pelo botão "Buscar"
function iniciarBusca() {
    // 1. Pega o termo digitado pelo usuário e converte para minúsculas
    const termoBusca = inputBusca.value.toLowerCase();

    // 2. Filtra os dados com base no termo de busca
    const dadosFiltrados = todosOsDados.filter(dado => {
        const nome = dado.nome.toLowerCase();
        const descricao = dado.descricao.toLowerCase();
        // Retorna true se o nome ou a descrição incluírem o termo buscado
        return nome.includes(termoBusca) || descricao.includes(termoBusca);
    });

    // 3. Renderiza apenas os cards que passaram no filtro
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    // Limpa os cards existentes antes de renderizar os novos
    cardsContainer.innerHTML = "";

    for (let dado of dados) {
        let article = document.createElement("article");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
          <p>${dado.descricao}</p>
          <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardsContainer.appendChild(article);
    }
}

// Função para carregar os dados iniciais assim que a página carregar
async function carregarDadosIniciais() {
    let resposta = await fetch("data.json");
    todosOsDados = await resposta.json();
    renderizarCards(todosOsDados); // Mostra todos os cards inicialmente
}

// Chama a função para carregar os dados quando o script é executado
carregarDadosIniciais();