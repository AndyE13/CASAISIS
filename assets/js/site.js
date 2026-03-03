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
            Casa Isis
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Abrir menú">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">${navLinks}</ul>
          </div>
        </div>
      </nav>`;
  }

  function footerTemplate() {
    const year = new Date().getFullYear();
    return `
      <footer class="site-footer py-5 mt-5">
        <div class="container">
          <div class="row g-4">
            <div class="col-md-6">
              <h2 class="h5 text-white">Casa Isis</h2>
              <p class="mb-0">Acompañamos comunidades con educación, cuidado emocional y oportunidades para transformar vidas.</p>
            </div>
            <div class="col-md-3">
              <h3 class="h6 text-white">Navegación</h3>
              <ul class="list-unstyled mb-0">
                ${links.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}
              </ul>
            </div>
            <div class="col-md-3">
              <h3 class="h6 text-white">Contacto</h3>
              <p class="mb-1">Bogotá, Colombia</p>
              <p class="mb-0">hola@casaisis.org</p>
            </div>
          </div>
          <hr class="border-light border-opacity-25 my-4">
          <small>© ${year} Casa Isis. Todos los derechos reservados.</small>
        </div>
      </footer>`;
  }

  const body = document.body;
  const page = body.dataset.page;
  const navTarget = document.getElementById('site-navbar');
  const footerTarget = document.getElementById('site-footer');

  if (navTarget && page) navTarget.innerHTML = navTemplate(page);
  if (footerTarget) footerTarget.innerHTML = footerTemplate();
})();
