let todosOsDados = [];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Detecta a página e seleciona o JSON correspondente
  const paginaAtual = window.location.pathname.toLowerCase();
  let arquivoJson = "assets/dados/horarioseptnm.json";

  if (paginaAtual.includes("prosub")) {
    arquivoJson = "assets/dados/horariosprosub.json";
  } else if (paginaAtual.includes("eptnm")) {
    arquivoJson = "assets/dados/horarioseptnm.json";
  }

  const mensagem = document.getElementById("mensagem");

  // 2. Carrega os dados do JSON
  fetch(arquivoJson)
    .then(response => {
      if (!response.ok) {
        throw new Error("Não foi possível carregar o arquivo JSON.");
      }
      return response.json();
    })
    .then(dados => {
      if (dados.length === 0) {
        if (mensagem) {
          mensagem.className = "alert alert-warning";
          mensagem.textContent = "Nenhum horário cadastrado.";
        }
        return;
      }

      if (mensagem) mensagem.remove();

      todosOsDados = dados;

      // Chama a SUA função original para preservar o design e as cores
      if (typeof criarConteudo === "function") {
        criarConteudo(todosOsDados);
      }

      // Ativa o filtro da barra de pesquisa
      ativarBarraPesquisa();
    })
    .catch(erro => {
      console.error(erro);
      if (mensagem) {
        mensagem.className = "alert alert-danger";
        mensagem.innerHTML = `
          <strong>Erro ao carregar os horários.</strong><br>
          ${erro.message}
        `;
      }
    });
});

// 3. Filtra os dados e redesenha usando o seu layout original
function ativarBarraPesquisa() {
  const input = document.querySelector('input[type="text"], input[type="search"], .pesquisa input');
  if (!input) return;

  const form = input.closest("form");
  if (form) {
    form.addEventListener("submit", e => e.preventDefault());
  }

  input.addEventListener("input", e => {
    const termo = e.target.value.toLowerCase().trim();

    // Filtra por curso, turma, turno ou modalidade
    const dadosFiltrados = todosOsDados.filter(item => {
      const curso = (item.curso || "").toLowerCase();
      const turma = (item.turma || "").toLowerCase();
      const turno = (item.turno || "").toLowerCase();
      const modalidade = (item.modalidade || "").toLowerCase();

      return curso.includes(termo) || 
             turma.includes(termo) || 
             turno.includes(termo) || 
             modalidade.includes(termo);
    });

    // Procura o container onde os cards são desenhados e limpa antes de filtrar
    const container = document.getElementById("container-horarios") || 
                      document.querySelector("#conteudo") || 
                      document.querySelector("main");

    if (container) container.innerHTML = "";

    // Chama a sua função original passando os dados filtrados
    if (typeof criarConteudo === "function") {
      criarConteudo(dadosFiltrados);
    }
  });
}