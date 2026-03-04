(function () {
  const links = [
    ['index.html', 'Inicio'],
    ['nosotros.html', 'Nosotros'],
    ['programas.html', 'Programas'],
    ['voluntariado.html', 'Voluntariado'],
    ['aliados.html', 'Aliados'],
    ['contacto.html', 'Contacto'],
  ];

  function navTemplate(currentPage) {
    const navLinks = links
      .map(([href, label]) => {
        const active = href === currentPage ? 'active' : '';
        return `<li class="nav-item"><a class="nav-link ${active}" href="${href}">${label}</a></li>`;
      })
      .join('');

    return `
      <nav class="navbar navbar-expand-lg site-navbar fixed-top" aria-label="Navegación principal">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center fw-semibold" href="index.html">
            <span class="navbar-brand-mark" aria-hidden="true">CI</span>
            Casa Isis Rico
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Abrir menú">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">${navLinks}</ul>
            <a class="btn btn-brand btn-sm ms-lg-3 nav-donate-btn" href="https://providencia.org.mx/causes/altata" target="_blank" rel="noopener noreferrer">Donar ahora</a>
          </div>
        </div>
      </nav>`;
  }

  function footerTemplate() {
    const year = new Date().getFullYear();
    return `
      <footer class="site-footer py-5 mt-5">
        <div class="container">
          <div class="row g-4 align-items-start">
            <div class="col-lg-4">
              <h2 class="h5 text-white">Casa Isis Rico</h2>
              <p class="mb-3">Trabajamos para mejorar la calidad de vida de las personas adultas mayores mediante alimentación comunitaria, apoyo emocional y actividades para un envejecimiento digno y activo.</p>
              <a class="btn btn-brand" href="https://providencia.org.mx/causes/altata" target="_blank" rel="noopener noreferrer">Donar ahora</a>
            </div>
            <div class="col-sm-6 col-lg-3">
              <h3 class="h6 text-white">Navegación</h3>
              <ul class="list-unstyled mb-0">
                ${links.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}
              </ul>
            </div>
            <div class="col-sm-6 col-lg-3">
              <h3 class="h6 text-white">Contacto</h3>
              <p class="mb-1">Guadalajara, Jalisco</p>
              <p class="mb-1">contacto@isisrico.org</p>
              <p class="mb-0">+52 33 0000 0000</p>
            </div>
            <div class="col-lg-2">
              <h3 class="h6 text-white">Síguenos</h3>
              <ul class="list-unstyled mb-0 social-links">
                <li><a href="#" aria-label="Facebook">Facebook</a></li>
                <li><a href="#" aria-label="Instagram">Instagram</a></li>
                <li><a href="#" aria-label="YouTube">YouTube</a></li>
              </ul>
            </div>
          </div>
          <hr class="border-light border-opacity-25 my-4">
          <small>© ${year} Casa Isis Rico. Todos los derechos reservados.</small>
        </div>
      </footer>`;
  }

  function handleStickyNavbar() {
    const navbar = document.querySelector('.site-navbar');
    if (!navbar) return;

    const syncState = () => {
      if (window.scrollY > 24) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    syncState();
    window.addEventListener('scroll', syncState, { passive: true });
  }

  const body = document.body;
  const page = body.dataset.page;
  const navTarget = document.getElementById('site-navbar');
  const footerTarget = document.getElementById('site-footer');

  if (navTarget && page) navTarget.innerHTML = navTemplate(page);
  if (footerTarget) footerTarget.innerHTML = footerTemplate();

  handleStickyNavbar();

  if (window.AOS) {
    window.AOS.init({ duration: 700, offset: 60, once: true });
  }
})();
