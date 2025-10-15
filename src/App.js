import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1 className="logo">Tecnología</h1>
          <nav className="nav">
            <a href="#">Inicio</a>
            <a href="#">Características</a>
            <a href="#">Precios</a>
            <a href="#">Contacto</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h2>Impulsa tu negocio con tecnología inteligente</h2>
          <p>Soluciones digitales diseñadas para crecer contigo. Rápidas, seguras y escalables.</p>
          <div className="hero-buttons">
            <button className="btn primary">Comenzar</button>
            <button className="btn secondary">Ver Demo</button>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h3>¿Por qué elegirnos?</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <h4>⚡ Rendimiento Superior</h4>
              <p>Infraestructura optimizada para ofrecer máxima velocidad.</p>
            </div>
            <div className="feature-card">
              <h4>🔒 Seguridad Avanzada</h4>
              <p>Protección de datos con los más altos estándares.</p>
            </div>
            <div className="feature-card">
              <h4>📈 Escalable</h4>
              <p>Crece sin límites con una arquitectura modular.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Joel. Creado con excelencia.</p>
      </footer>
    </div>
  );
}

export default App;
