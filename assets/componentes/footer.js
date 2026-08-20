const footer = `
    <footer class="container-fluid bg-danger mt-5">
        <div class="container py-5">
            <div class="row g-4">
                <!-- SOBRE O SISTEMA -->
                <div class="col-12 col-md-5">
                    <h5 class="fw-bold mb-3 text-white">
                        Sistema de Horários
                    </h5>
                    <p class="text-white mb-2">
                        Sistema online para consulta dos horários das turmas.
                    </p>

                    <p class="text-white mb-0">
                        CEEP Áureo de Oliveira Filho
                    </p>
                </div>

                <!-- LINKS -->
                <div class="col-6 col-md-3 text-white">
                    <h5 class="fw-bold mb-3">
                        Acesso rápido
                    </h5>

                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <a href="index.html"
                            class="link-light link-opacity-75-hover text-decoration-none">
                                Início
                            </a>
                        </li>

                        <li class="mb-2">
                            <a href="eptnm.html"
                            class="link-light link-opacity-75-hover text-decoration-none">
                                EPTNM
                            </a>
                        </li>

                        <li class="mb-2">
                            <a href="prosub.html"
                            class="link-light link-opacity-75-hover text-decoration-none">
                                PROSUB
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- REDES SOCIAIS -->
                <div class="col-6 col-md-3 ">
                    <h5 class="fw-bold mb-3 d-flex justify-content-end text-white">
                        Redes Sociais
                    </h5>
                    <div class="d-flex justify-content-end gap-3 ">
                        <!-- Instagram da escola -->
                        <a href="#"
                        class="text-white fs-4"
                        target="_blank"
                        title="Instagram do CEEP">
                            <i class="bi bi-instagram"></i>
                        </a>

                        <!-- Facebook da escola -->
                        <a href="#"
                        class="text-white fs-4"
                        target="_blank"
                        title="Facebook do CEEP">
                            <i class="bi bi-facebook"></i>
                        </a>

                        <!-- E-mail da escola -->
                        <a href="mailto:email@exemplo.com"
                        class="text-white fs-4"
                        title="E-mail">
                            <i class="bi bi-envelope-fill"></i>
                        </a>

                    </div>
                </div>
            </div>

            <!-- LINHA -->
           <hr class="my-4 border-light border-2 opacity-50">

            <!-- PARTE INFERIOR -->
            <div class="d-flex justify-content-between align-items-center gap-3">

                <p class="text-white mb-0 small">
                    &copy; <span id="ano"></span>

                    <span class="fw-bold text-white">
                        Almatec
                    </span>

                    <span class="mx-1">•</span>

                    Desenvolvido por
                    <span class="fw-semibold text-white">
                        Hellen Caldas
                    </span>

                    <span class="mx-1">•</span>

                    Licenciado para o CEEP Áureo de Oliveira Filho
                </p>

                <!-- REDES SOCIAIS DA DESENVOLVEDORA -->
                <div class="d-flex align-items-center gap-3">

                    <!-- LINKEDIN -->
                    <a href="#"
                    class="link-light fs-5"
                    target="_blank"
                    title="LinkedIn">
                        <i class="bi bi-linkedin"></i>
                    </a>

                    <!-- GITHUB -->
                    <a href="#"
                    class="link-light fs-5"
                    target="_blank"
                    title="GitHub">
                        <i class="bi bi-github"></i>
                    </a>

                    <!-- INSTAGRAM -->
                    <a href="#"
                    class="link-light fs-5"
                    target="_blank"
                    title="Instagram">
                        <i class="bi bi-instagram"></i>
                    </a>

                </div>

            </div>
            
            </div>
        </div>
    </footer>`;

document.getElementById("footer").innerHTML = footer;