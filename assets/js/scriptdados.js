// ==========================================================
// SCRIPT PRINCIPAL DE DADOS
// Sistema de visualização de horários
//
// Este arquivo substitui:
// - horarios.js
// - barrapesquisa.js
//
// Ele:
// 1. identifica a página atual;
// 2. escolhe o JSON correto;
// 3. carrega o JSON apenas UMA vez;
// 4. cria cursos, cards e modais;
// 5. controla a barra de pesquisa;
// 6. evita horários e modais duplicados.
// ==========================================================


// ==========================================================
// ELEMENTOS PRINCIPAIS
// ==========================================================

const conteudo = document.getElementById("conteudo");
const areaModais = document.getElementById("areaModais");
const mensagem = document.getElementById("mensagem");
const campoPesquisa = document.getElementById("campoPesquisa");


// ==========================================================
// VARIÁVEL QUE GUARDA TODOS OS HORÁRIOS
// ==========================================================

let todosOsDados = [];


// ==========================================================
// CORES DOS CURSOS
// ==========================================================

const coresCursos = {

    "Técnico em Administração": "info",

    "Técnico em Informática": "danger",

    "Técnico em Edificações": "success",

    "Técnico em Segurança do Trabalho": "primary",

    "Técnico em Logística": "warning",

    "Técnico em Eletromecânica": "secondary",

    "Técnico em Mecatrônica": "dark"

};


// ==========================================================
// DESCOBRE A COR DO CURSO
// ==========================================================

function obterCorCurso(curso) {

    return coresCursos[curso] || "secondary";

}


// ==========================================================
// IDENTIFICA QUAL JSON DEVE SER CARREGADO
// ==========================================================

function obterArquivoJson() {

    const paginaAtual =
        window.location.pathname.toLowerCase();


    // Página PROSUB
    if (paginaAtual.includes("prosub")) {

        return "assets/dados/horariosprosub.json";

    }


    // Página EPTNM
    if (paginaAtual.includes("eptnm")) {

        return "assets/dados/horarioseptnm.json";

    }


    // Caso padrão
    return "assets/dados/horarioseptnm.json";

}


// ==========================================================
// CARREGA OS DADOS
// ==========================================================

async function carregarHorarios() {

    const arquivoJson = obterArquivoJson();


    try {

        const response = await fetch(arquivoJson);


        if (!response.ok) {

            throw new Error(
                "Não foi possível carregar o arquivo JSON."
            );

        }


        const dados = await response.json();


        // Verifica se vieram dados
        if (!dados || dados.length === 0) {

            if (mensagem) {

                mensagem.className =
                    "alert alert-warning";

                mensagem.textContent =
                    "Nenhum horário cadastrado.";

            }

            return;

        }


        // Guarda todos os dados
        todosOsDados = dados;


        // Remove mensagem "Carregando horários..."
        if (mensagem) {

            mensagem.remove();

        }


        // Exibe os horários
        criarConteudo(todosOsDados);


        // Ativa pesquisa
        ativarBarraPesquisa();


    } catch (erro) {

        console.error(
            "Erro ao carregar horários:",
            erro
        );


        if (mensagem) {

            mensagem.className =
                "alert alert-danger";

            mensagem.innerHTML = `

                <strong>
                    Erro ao carregar os horários.
                </strong>

                <br>

                ${erro.message}

            `;

        }

    }

}


// ==========================================================
// LIMPA O CONTEÚDO DA TELA
// ==========================================================

function limparConteudo() {

    // Limpa os cards
    if (conteudo) {

        conteudo.innerHTML = "";

    }


    // Limpa também os modais
    // Isso é importante para não duplicar os modais
    if (areaModais) {

        areaModais.innerHTML = "";

    }

}


// ==========================================================
// CRIA CURSOS E CARDS
// ==========================================================

function criarConteudo(dados) {

    // Antes de criar novamente,
    // limpa o conteúdo existente
    limparConteudo();


    // Caso pesquisa não encontre nada
    if (!dados || dados.length === 0) {

        if (conteudo) {

            conteudo.innerHTML = `

                <div class="alert alert-warning">

                    Nenhum horário encontrado.

                </div>

            `;

        }

        return;

    }


    // Obtém cursos sem repetição
    const cursos = [

        ...new Set(

            dados.map(item => item.curso)

        )

    ];


    // Percorre cada curso
    cursos.forEach(curso => {


        // Cor correspondente
        const cor = obterCorCurso(curso);


        // Cria bloco do curso
        const blocoCurso =
            document.createElement("section");


        blocoCurso.className = "mb-5";


        // Título e linha de cards
        blocoCurso.innerHTML = `

            <div
                class="
                    border-start
                    border-5
                    border-${cor}
                    ps-3
                    mb-4
                "
            >

                <h2
                    class="
                        fw-bold
                        text-${cor}
                        mb-1
                    "
                >

                    ${curso}

                </h2>

            </div>


            <div class="row g-4"></div>

        `;


        const linha =
            blocoCurso.querySelector(".row");


        // Seleciona apenas as turmas do curso
        const turmasCurso =
            dados.filter(

                item => item.curso === curso

            );


        // Cria os cards
        turmasCurso.forEach(item => {


            const coluna =
                document.createElement("div");


            // Responsividade:
            // celular = 1 card
            // telas pequenas = 2
            // médias = 3
            // desktop = 4
            coluna.className =
                "col-12 col-sm-6 col-md-4 col-lg-3";


            coluna.innerHTML = `

                <div
                    class="
                        card
                        h-100
                        shadow-sm
                        border-${cor}
                    "
                >


                    <div
                        class="
                            card-header
                            bg-${cor}
                            text-white
                            fw-semibold
                        "
                    >

                        ${item.turno || ""}

                    </div>


                    <div
                        class="
                            card-body
                            d-flex
                            flex-column
                        "
                    >


                        <h3
                            class="
                                h5
                                fw-bold
                                mb-4
                            "
                        >

                            ${item.turma || ""}

                        </h3>


                        <button

                            class="
                                btn
                                btn-outline-${cor}
                                mt-auto
                            "

                            type="button"

                            data-bs-toggle="modal"

                            data-bs-target="#modal${item.id}"
                        >

                            Ver horário

                        </button>


                    </div>

                </div>

            `;


            // Coloca o card na linha
            linha.appendChild(coluna);


            // Cria o modal do horário
            criarModal(item, cor);

        });


        // Adiciona o curso à página
        conteudo.appendChild(blocoCurso);

    });

}


// ==========================================================
// CRIA MODAL DO HORÁRIO
// ==========================================================

function criarModal(item, cor) {

    if (!areaModais) {

        return;

    }


    areaModais.insertAdjacentHTML(

        "beforeend",

        `

        <div

            class="modal fade"

            id="modal${item.id}"

            tabindex="-1"

            aria-hidden="true"
        >


            <div

                class="
                    modal-dialog
                    modal-xl
                    modal-dialog-centered
                "
            >


                <div class="modal-content">


                    <div

                        class="
                            modal-header
                            bg-${cor}
                            text-white
                        "
                    >


                        <div>


                            <h5 class="modal-title">

                                ${item.curso || ""}
                                -
                                ${item.turma || ""}

                            </h5>


                            <small>

                                ${item.turno || ""}

                            </small>


                        </div>


                        <button

                            type="button"

                            class="
                                btn-close
                                btn-close-white
                            "

                            data-bs-dismiss="modal"

                            aria-label="Fechar"
                        >

                        </button>


                    </div>


                    <div

                        class="
                            modal-body
                            text-center
                        "
                    >


                        <img

                            src="${item.horario}"

                            class="img-fluid"

                            alt="Horário ${item.curso || ""} ${item.turma || ""}"

                        >


                    </div>


                </div>


            </div>


        </div>

        `

    );

}


// ==========================================================
// BARRA DE PESQUISA
// ==========================================================

function ativarBarraPesquisa() {

    if (!campoPesquisa) {

        return;

    }


    campoPesquisa.addEventListener(

        "input",

        function () {


            const termo =
                campoPesquisa.value
                    .toLowerCase()
                    .trim();


            // Se apagar a pesquisa,
            // volta a mostrar tudo
            if (termo === "") {

                criarConteudo(todosOsDados);

                return;

            }


            // Filtra os horários
            const dadosFiltrados =
                todosOsDados.filter(item => {


                    const curso =
                        String(
                            item.curso || ""
                        ).toLowerCase();


                    const turma =
                        String(
                            item.turma || ""
                        ).toLowerCase();


                    const turno =
                        String(
                            item.turno || ""
                        ).toLowerCase();


                    const modalidade =
                        String(
                            item.modalidade || ""
                        ).toLowerCase();


                    return (

                        curso.includes(termo) ||

                        turma.includes(termo) ||

                        turno.includes(termo) ||

                        modalidade.includes(termo)

                    );

                });


            // Redesenha somente os resultados
            criarConteudo(dadosFiltrados);

        }

    );

}


// ==========================================================
// INICIA O SISTEMA
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    carregarHorarios
);