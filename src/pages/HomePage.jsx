import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";
import Pedro from "../img/pedro.jpg";
import Guilherme from "../img/guilherme.png";

export default function HomePage() {
  return (
    <>
      <section className="hero-image-center overflow-hidden d-flex align-items-center justify-content-center home-hero-section">
        <div className="home-hero-content px-4 jersey-25-regular">
          <h1 className="home-hero-title">
            <span style={{ color: "#222" }}>Blog</span>
            <span style={{ color: "#6c2bd7" }}>Guide</span>
            <p className="home-hero-subtitle">
              Uma plataforma para desenvolvedores compartilharem conhecimento
            </p>
          </h1>
          <Link to={ROUTES.CONTEUDO} style={{ textDecoration: "none" }}>
            <button className="home-hero-btn">
              Explorar Tópicos <span className="home-hero-btn-arrow">→</span>
            </button>
          </Link>
        </div>
      </section>
      <section className="home-about-section">
        <div className="jersey-25-regular">
          <h2 className="home-about-title">Sobre o BlogGuide</h2>
        </div>
        <div className="container home-about-content">
          <p>
            O BlogGuide é uma plataforma completa de conhecimento em programação,
            criada por desenvolvedores experientes para compartilhar conhecimentos
            práticos e teóricos da área de tecnologia.
          </p>
          <p>
            Nossa missão é democratizar o acesso ao conhecimento técnico,
            oferecendo conteúdos de qualidade sobre desenvolvimento web,
            inteligência artificial, hospedagem e muito mais. Aqui você encontra
            desde conceitos básicos até técnicas avançadas.
          </p>
          <p>
            Além dos conteúdos criados por nossa equipe, contamos com um fórum
            ativo onde a comunidade pode compartilhar experiências, tirar dúvidas e
            contribuir com novos tópicos de discussão.
          </p>
        </div>
      </section>
      {/* Seção Nossa Equipe */}
      <section className="home-team-section">
        <div className="jersey-25-regular">
          <h2 className="home-team-title">Nossa Equipe</h2>
        </div>
        <div className="container home-team-cards">
          <div className="home-team-card">
            <img
              src={Guilherme}
              alt="Guilherme Sampaio"
              className="home-team-img"
            />
            <div className="jersey-25-regular">
              <h3 className="home-team-name">Guilherme Sampaio</h3>
            </div>
            <p className="home-team-desc">
              Desenvolvedor Júnior com 4 anos de experiência em React, Python
              e Back-end. Formado em Tecnico em Informática para Internet pelo IFMS, especialista em
              arquitetura de sistemas e desenvolvimento de aplicações escaláveis.
            </p>
            <a
              href="https://portfolio-guisamp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button className="home-team-btn">
                <span className="home-team-btn-icon">🔗</span> <span className="text-btn-portfolio">Ver Portfólio</span>
              </button>
            </a>
          </div>
          {/* Card Maria Santos */}
          <div className="home-team-card">
            <img
              src={Pedro}
              alt="Pedro Mota"
              className="home-team-img"
            />
            <div className="jersey-25-regular">
              <h3 className="home-team-name">Pedro Mota</h3>
            </div>
            <p className="home-team-desc">
              Especialista em Frontend com 4 anos de experiência. 
              Técnico em Informática para Internet e graduando em 
              Sistemas de Informação (UFGD), possui forte atuação 
              com React.js, CSS e Bootstrap.
            </p>
            <a
              href="https://portfolio-website-bootstrap.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button className="home-team-btn">
                <span className="home-team-btn-icon">🔗</span> <span className="text-btn-portfolio">Ver Portfólio</span>
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}