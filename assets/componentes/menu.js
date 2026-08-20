const menu = `
    <section id="topo" class="py-2 bg-primary-subtle bg-gradient shadow-lg">

        <nav class="navbar navbar-expand-md">
            <div class="container-fluid px-4">

                <!-- =========================
                     CELULAR
                ========================== -->
                <div class="d-flex d-md-none w-100 justify-content-between align-items-center">

                    <!-- Botão hambúrguer -->
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menuPrincipal"
                        aria-controls="menuPrincipal"
                        aria-expanded="false"
                        aria-label="Abrir menu"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <!-- Logo -->
                    <a href="index.html" class="navbar-brand m-0">
                        <img 
                            src="assets/img/logo.png" 
                            alt="EPTEC Bahia" 
                            height="50"
                        >
                    </a>

                </div>


                <!-- =========================
                     COMPUTADOR
                ========================== -->

                <!-- Logo -->
                <a href="index.html" class="navbar-brand d-none d-md-block">
                    <img 
                        src="assets/img/logo.png" 
                        alt="EPTEC Bahia" 
                        height="50"
                    >
                </a>


                <!-- =========================
                     LINKS DO MENU
                ========================== -->

                <div 
                    class="collapse navbar-collapse"
                    id="menuPrincipal"
                >

                    <ul class="navbar-nav ms-auto gap-md-4 mt-3 mt-md-0">

                        <li class="nav-item">
                            <a 
                                class="text-dark nav-link link-primary link-opacity-75-hover fw-semibold"
                                href="index.html">
                                INÍCIO
                            </a>
                        </li>

                        <li class="nav-item">
                            <a 
                                class="text-dark nav-link link-primary link-opacity-75-hover fw-semibold"
                                href="sobre.html">
                                SOBRE
                            </a>
                        </li>

                        <li class="nav-item">
                            <a 
                                class="text-dark nav-link link-primary link-opacity-75-hover fw-semibold"
                                href="eptnm.html">
                                EPTNM
                            </a>
                        </li>

                        <li class="nav-item">
                            <a 
                                class="text-dark nav-link link-primary link-opacity-75-hover fw-semibold"
                                href="prosub.html">
                                PROSUB
                            </a>
                        </li>

                    </ul>

                </div>

            </div>
        </nav>

    </section>
`;

document.getElementById("menu").innerHTML = menu;