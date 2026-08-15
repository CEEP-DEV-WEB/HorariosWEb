// ==========================================
// ELEMENTOS PRINCIPAIS DA PÁGINA
// ==========================================

// Área onde os cursos e turmas serão exibidos
const conteudo = document.getElementById("conteudo");

// Área onde serão criados os modais
const areaModais = document.getElementById("areaModais");

// Mensagem inicial
const mensagem = document.getElementById("mensagem");


// ==========================================
// CORES DOS CURSOS
// ==========================================

/*
    Aqui definimos uma cor Bootstrap
    para cada curso.

    Para alterar a cor de um curso,
    basta trocar o nome da cor.

    Cores disponíveis no Bootstrap:

    primary   = azul
    secondary = cinza
    success   = verde
    danger    = vermelho
    warning   = amarelo/laranja
    info      = azul claro
    dark      = preto/cinza escuro
*/

const coresCursos = {

    "Técnico em Informática": "danger",

    "Técnico em Edificações": "success",

    "Técnico em Segurança do Trabalho": "primary",

    "Técnico em Logística": "warning",

    "Técnico em Administração": "info",

    "Técnico em Eletromecânica": "marrom",

    "Técnico em Mecatrônica": "secondary"

};

// ==========================================
// FUNÇÃO PARA DESCOBRIR A COR DO CURSO
// ==========================================

function obterCorCurso(curso) {
    /*
        Procura o curso dentro do objeto coresCursos.

        Se o curso ainda não tiver uma cor cadastrada,
        será utilizada a cor secondary (cinza).
    */
    return coresCursos[curso] || "secondary";
}


// ==========================================
// CARREGAMENTO DO JSON
// ==========================================

// Identifica a página atual pela URL para carregar o arquivo correto
const paginaAtual = window.location.pathname.toLowerCase();
let arquivoJson = "assets/dados/horarioseptnm.json";

if (paginaAtual.includes("prosub")) {
    arquivoJson = "assets/dados/horariosprosub.json";
} else if (paginaAtual.includes("eptnm")) {
    arquivoJson = "assets/dados/horarioseptnm.json";
}

// Executa apenas um fetch dinâmico
fetch(arquivoJson)
    .then(response => {
        if (!response.ok) {
            throw new Error(
                "Não foi possível carregar o arquivo JSON."
            );
        }
        return response.json();
    })
    .then(dados => {
        // Verifica se existem horários cadastrados
        if (dados.length === 0) {
            mensagem.className = "alert alert-warning";
            mensagem.textContent = "Nenhum horário cadastrado.";
            return;
        }

        // Remove a mensagem de carregamento
        if (mensagem) mensagem.remove();

        // Cria os cursos e turmas com os dados corretos
        criarConteudo(dados);
    })
    .catch(erro => {
        if (mensagem) {
            mensagem.className = "alert alert-danger";
            mensagem.innerHTML = `
                <strong>Erro ao carregar os horários.</strong><br>
                ${erro.message}
            `;
        }
        console.error(erro);
    });



// ==========================================
// CRIA OS CURSOS
// ==========================================

function criarConteudo(dados) {
    /*
        Pega os nomes dos cursos existentes
        e elimina nomes repetidos.
    */
    const cursos = [

        ...new Set(

            dados.map(item => item.curso)
        )
    ];


    // Percorre cada curso
    cursos.forEach(curso => {


        // Descobre a cor daquele curso
        const cor = obterCorCurso(curso);


        // Cria uma seção para o curso
        const blocoCurso =
            document.createElement("section");


        blocoCurso.className = "mb-5";


        /*
            TÍTULO DO CURSO

            A borda e o texto utilizam
            a cor escolhida para o curso.
        */

        blocoCurso.innerHTML = `

            <div class="
                border-start
                border-5
                border-${cor}
                ps-3
                mb-4
            ">

                <h2 class="
                    fw-bold
                    text-${cor}
                    mb-1
                ">

                    ${curso}

                </h2>

            </div>


            <div class="row g-4"></div>

        `;


        // Local onde os cards serão colocados
        const linha =
            blocoCurso.querySelector(".row");


        /*
            Seleciona somente as turmas
            pertencentes ao curso atual.
        */

        const turmasCurso = dados.filter(

            item => item.curso === curso

        );


        // Percorre as turmas do curso
        turmasCurso.forEach(item => {


            // Cria a coluna
            const coluna =
                document.createElement("div");


            /*
                RESPONSIVIDADE

                Celular:
                1 card

                Tela pequena:
                2 cards

                Tela média:
                3 cards

                Computador:
                máximo de 4 cards
            */

            coluna.className =
                "col-12 col-sm-6 col-md-4 col-lg-3";


            // ==========================================
            // CARD DA TURMA
            // ==========================================

            coluna.innerHTML = `

                <div class="
                    card
                    h-100
                    shadow-sm
                    border-${cor}
                ">


                    <!-- CABEÇALHO COLORIDO -->

                    <div class="
                        card-header
                        bg-${cor}
                        text-white
                        fw-semibold
                    ">

                        ${item.turno}

                    </div>


                    <!-- CORPO DO CARD -->

                    <div class="
                        card-body
                        d-flex
                        flex-column
                    ">


                        <!-- TURMA -->

                        <h3 class="
                            h5
                            fw-bold
                            mb-4
                        ">

                            ${item.turma}

                        </h3>


                        <!-- BOTÃO -->

                        <button

                            class="
                                btn
                                btn-outline-${cor}
                                mt-auto
                            "

                            data-bs-toggle="modal"

                            data-bs-target="#modal${item.id}">

                            Ver horário

                        </button>


                    </div>

                </div>

            `;


            // Adiciona o card à linha
            linha.appendChild(coluna);


            // Cria o modal correspondente
            criarModal(item, cor);

        });


        // Adiciona o curso à página
        conteudo.appendChild(blocoCurso);

    });

}


// ==========================================
// CRIA OS MODAIS
// ==========================================

function criarModal(item, cor) {


    areaModais.insertAdjacentHTML(

        "beforeend",

        `

        <div
            class="modal fade"

            id="modal${item.id}"

            tabindex="-1"

            aria-hidden="true">


            <div
                class="
                    modal-dialog
                    modal-xl
                    modal-dialog-centered
                ">


                <div class="modal-content">


                    <!-- CABEÇALHO COLORIDO DO MODAL -->

                    <div class="
                        modal-header
                        bg-${cor}
                        text-white
                    ">


                        <div>


                            <h5 class="modal-title">

                                ${item.curso}
                                -
                                ${item.turma}

                            </h5>


                            <small>

                                ${item.turno}

                            </small>


                        </div>


                        <!-- BOTÃO FECHAR -->

                        <button

                            type="button"

                            class="
                                btn-close
                                btn-close-white
                            "

                            data-bs-dismiss="modal"

                            aria-label="Fechar">

                        </button>


                    </div>


                    <!-- IMAGEM DO HORÁRIO -->

                    <div class="
                        modal-body
                        text-center
                    ">


                        <img

                            src="${item.horario}"

                            class="img-fluid"

                            alt="
                                Horário
                                ${item.curso}
                                ${item.turma}
                            ">


                    </div>


                </div>

            </div>

        </div>

        `

    );

}