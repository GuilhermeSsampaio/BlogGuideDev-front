import React, { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { key: "all", label: "Todos" },
  { key: "frontend", label: "Frontend e Interface" },
  { key: "backend", label: "Linguagens e Plataformas" },
  { key: "database", label: "Banco de Dados e CMS" },
  { key: "ai", label: "Inteligência Artificial" },
  { key: "mobile", label: "Mobile" },
  { key: "infra", label: "DevOps e Cloud" },
  { key: "sistemas", label: "Sistemas Operacionais" },
];

const techGuides = [
  // ===== 1. FRONTEND E INTERFACE (Web Development) =====
  {
    slug: "html-css",
    name: "HTML e CSS",
    category: "frontend",
    categoryLabel: "Frontend e Interface",
    categoryColor: "#4fc3f7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description: "A fundação estrutural e estilística da web.",
  },
  {
    slug: "bootstrap",
    name: "Bootstrap",
    category: "frontend",
    categoryLabel: "Frontend e Interface",
    categoryColor: "#4fc3f7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    description: "Framework para criação rápida de layouts responsivos e padronizados.",
  },
  {
    slug: "vuejs",
    name: "Vue.js",
    category: "frontend",
    categoryLabel: "Frontend e Interface",
    categoryColor: "#4fc3f7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    description: "Framework progressivo focado em interfaces reativas e componentes.",
  },
  {
    slug: "react",
    name: "React",
    category: "frontend",
    categoryLabel: "Frontend e Interface",
    categoryColor: "#4fc3f7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "Biblioteca declarativa para construção de interfaces dinâmicas e escaláveis.",
  },
  {
    slug: "nextjs",
    name: "Next.js",
    category: "frontend",
    categoryLabel: "Frontend e Interface",
    categoryColor: "#4fc3f7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    description: "Framework full-stack baseado em React com foco em performance e SEO.",
  },
  {
    slug: "quasar",
    name: "Quasar Framework",
    category: "frontend",
    categoryLabel: "Frontend e Interface",
    categoryColor: "#4fc3f7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/quasar/quasar-original.svg",
    description: "Solução multiplataforma (Web, Mobile, Desktop) baseada em Vue.",
  },
  {
    slug: "angular",
    name: "Angular",
    category: "frontend",
    categoryLabel: "Frontend e Interface",
    categoryColor: "#4fc3f7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    description: "Framework corporativo modular de alta escala com reatividade baseada em Signals.",
  },

  // ===== 2. LINGUAGENS DE PROGRAMAÇÃO E LÓGICA (Languages & Platforms) =====
  {
    slug: "javascript-jquery",
    name: "JavaScript e jQuery",
    category: "backend",
    categoryLabel: "Linguagens e Plataformas",
    categoryColor: "#b2f2bb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    description: "Linguagem essencial da web e a biblioteca clássica para manipulação de DOM.",
  },
  {
    slug: "php",
    name: "PHP",
    category: "backend",
    categoryLabel: "Linguagens e Plataformas",
    categoryColor: "#b2f2bb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    description: "Linguagem amplamente utilizada no lado do servidor para aplicações dinâmicas.",
  },
  {
    slug: "laravel",
    name: "Laravel",
    category: "backend",
    categoryLabel: "Linguagens e Plataformas",
    categoryColor: "#b2f2bb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    description: "Framework PHP elegante que segue o padrão MVC e automatiza tarefas complexas.",
  },
  {
    slug: "python",
    name: "Python",
    category: "backend",
    categoryLabel: "Linguagens e Plataformas",
    categoryColor: "#b2f2bb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    description: "Linguagem versátil, pilar para automação e Inteligência Artificial.",
  },
  {
    slug: "java",
    name: "Java",
    category: "backend",
    categoryLabel: "Linguagens e Plataformas",
    categoryColor: "#b2f2bb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    description: "Linguagem robusta e orientada a objetos, padrão em sistemas corporativos e bancários.",
  },
  {
    slug: "c-language",
    name: "C",
    category: "backend",
    categoryLabel: "Linguagens e Plataformas",
    categoryColor: "#b2f2bb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    description: "A base da computação moderna, essencial para sistemas operacionais e alta performance.",
  },
  {
    slug: "nodejs-express",
    name: "Node.js e Express",
    category: "backend",
    categoryLabel: "Linguagens e Plataformas",
    categoryColor: "#b2f2bb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description: "Arquitetura orientada a eventos não bloqueante e camada flexível para construção de APIs escaláveis.",
  },
  {
    slug: "typescript",
    name: "TypeScript",
    category: "backend",
    categoryLabel: "Linguagens e Plataformas",
    categoryColor: "#b2f2bb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: "Verificador de tipagem estática avançada para escalabilidade e manutenibilidade de código.",
  },
  {
    slug: "cobol",
    name: "COBOL",
    category: "backend",
    categoryLabel: "Linguagens e Plataformas",
    categoryColor: "#b2f2bb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg", // Ícone genérico de fallback
    description: "Pilar de alta precisão em sistemas legados bancários com adoção crescente de modernização via IA.",
  },

  // ===== 3. PERSISTÊNCIA DE DADOS E CMS (Databases) =====
  {
    slug: "mysql-mongodb",
    name: "MySQL e MongoDB",
    category: "database",
    categoryLabel: "Banco de Dados e CMS",
    categoryColor: "#ffd54f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    description: "Banco de dados relacional (SQL) líder em integridade e transações seguras.",
  },
  {
    slug: "strapi-neondb",
    name: "Strapi e NeonDB",
    category: "database",
    categoryLabel: "Banco de Dados e CMS",
    categoryColor: "#ffd54f",
    icon: "https://cdn.simpleicons.org/strapi/4945FF",
    description: "Headless CMS em Node.js que permite gerenciar conteúdo e expor APIs rapidamente.",
  },
  {
    slug: "oracle",
    name: "Oracle",
    category: "database",
    categoryLabel: "Banco de Dados e CMS",
    categoryColor: "#ffd54f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    description: "Infraestrutura MultiCloud, provisionamento via Autonomous Database e ERP integrado por IA.",
  },

  // ===== 4. INTELIGÊNCIA ARTIFICIAL E "VIBE CODING" (AI & Machine Learning) =====
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    category: "ai",
    categoryLabel: "Inteligência Artificial",
    categoryColor: "#ffb3c6",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    description: "Assistente de IA que sugere código e documentação em tempo real no editor.",
  },
  {
    slug: "framework-agno",
    name: "Agno",
    category: "ai",
    categoryLabel: "Inteligência Artificial",
    categoryColor: "#ffb3c6",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    description: "Framework Python para construção de sistemas de múltiplos agentes de IA autônomos.",
  },
  {
    slug: "lovable-bolt",
    name: "Lovable",
    category: "ai",
    categoryLabel: "Inteligência Artificial",
    categoryColor: "#ffb3c6",
    icon: "https://lovable.dev/favicon.svg",
    description: "Ferramenta de criação de aplicações full-stack via linguagem natural e interface visual.",
  },

  // ===== 5. DESENVOLVIMENTO MOBILE (Mobile Development) =====
  {
    slug: "react-native-expo",
    name: "React Native",
    category: "mobile",
    categoryLabel: "Mobile",
    categoryColor: "#e1bee7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "Framework que permite criar apps Android e iOS usando React.",
  },
  {
    slug: "android-studio",
    name: "Android Studio",
    category: "mobile",
    categoryLabel: "Mobile",
    categoryColor: "#e1bee7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
    description: "Ambiente oficial para desenvolvimento nativo no ecossistema Google.",
  },
  {
    slug: "flutter",
    name: "Flutter",
    category: "mobile",
    categoryLabel: "Mobile",
    categoryColor: "#e1bee7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    description: "Construção de interfaces multiplataforma de alta fidelidade baseadas em Widgets e renderização autônoma.",
  },

  // ===== 6. DEVOPS, CLOUD E DEPLOY (DevOps / Infrastructure) =====
  {
    slug: "docker",
    name: "Docker",
    category: "infra",
    categoryLabel: "DevOps e Cloud",
    categoryColor: "#ffe082",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    description: "Conteinerização que garante a padronização do ambiente em qualquer máquina.",
  },
  {
    slug: "git-github",
    name: "Git e GitHub",
    category: "infra",
    categoryLabel: "DevOps e Cloud",
    categoryColor: "#ffe082",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    description: "Sistema de controle de versão e plataforma de colaboração e automação (CI/CD).",
  },
  {
    slug: "vercel",
    name: "Vercel",
    category: "infra",
    categoryLabel: "DevOps e Cloud",
    categoryColor: "#ffe082",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    description: "Plataforma cloud focada em frontends, funções serverless e Next.js.",
  },
  {
    slug: "render",
    name: "Render",
    category: "infra",
    categoryLabel: "DevOps e Cloud",
    categoryColor: "#ffe082",
    icon: "https://avatars.githubusercontent.com/u/36424661?s=200&v=4",
    description: "Hospedagem focada em processos longos, workers e tarefas agendadas.",
  },
  {
    slug: "railway",
    name: "Railway",
    category: "infra",
    categoryLabel: "DevOps e Cloud",
    categoryColor: "#ffe082",
    icon: "https://railway.app/brand/logo-light.png",
    description: "Plataforma de deploy simplificado que detecta linguagens e provisiona bancos instantaneamente.",
  },
  {
    slug: "flyio",
    name: "Fly.io",
    category: "infra",
    categoryLabel: "DevOps e Cloud",
    categoryColor: "#ffe082",
    icon: "https://fly.io/static/images/brand/brandmark.svg",
    description: "Infraestrutura baseada em MicroVMs para rodar aplicações próximas ao usuário globalmente.",
  },
  {
    slug: "aws",
    name: "Amazon Web Services (AWS)",
    category: "infra",
    categoryLabel: "DevOps e Cloud",
    categoryColor: "#ffe082",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    description: "Nuvem elástica de alta disponibilidade balizada no rígido Modelo de Responsabilidade Compartilhada.",
  },
  {
    slug: "scrum-kanban",
    name: "Scrum e Kanban",
    category: "infra",
    categoryLabel: "DevOps e Cloud",
    categoryColor: "#ffe082",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    description: "Metodologias ágeis de gestão e filosofias de fluxo, integrando cadência com o modelo híbrido Scrumban.",
  },

  // ===== 7. SISTEMAS OPERACIONAIS E AMBIENTE LOCAL (OS & Systems) =====
  {
    slug: "linux",
    name: "Linux",
    category: "sistemas",
    categoryLabel: "Sistemas Operacionais",
    categoryColor: "#b3c6ff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    description: "Sistema operacional padrão para servidores e ambiente de desenvolvimento robusto.",
  },
  {
    slug: "windows",
    name: "Windows",
    category: "sistemas",
    categoryLabel: "Sistemas Operacionais",
    categoryColor: "#b3c6ff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg",
    description: "Plataforma de desenvolvimento moderna com suporte a WSL2 (Subsystem for Linux).",
  },
  {
    slug: "macos",
    name: "macOS",
    category: "sistemas",
    categoryLabel: "Sistemas Operacionais",
    categoryColor: "#b3c6ff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
    description: "Ambiente fluido de desenvolvimento embasado na arquitetura híbrida profunda do kernel XNU e Darwin.",
  },
];

export default function ContentGuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredGuides =
    selectedCategory === "all"
      ? techGuides
      : techGuides.filter((g) => g.category === selectedCategory);

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-2 text-primary-conteudo">
        Guias técnicos curados
      </h1>
      <p className="mb-4 text-secondary-conteudo">
        Explore tecnologias essenciais com artigos objetivos, exemplos de código e recursos de aprendizado.
      </p>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`btn ${selectedCategory === cat.key ? "btn-primary" : "btn-outline-secondary"} btn-sm px-3`}
            onClick={() => setSelectedCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="row g-4">
        {filteredGuides.map((guide) => (
          <div className="col-md-6 col-lg-4" key={guide.slug}>
            <Link to={`/conteudo/${guide.slug}`} className="text-decoration-none">
              <div
                className="card h-100 shadow-sm"
                style={{ cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="card-body d-flex align-items-center gap-3">
                  <img src={guide.icon} alt={guide.name} style={{ width: 48, height: 48 }} />
                  <div>
                    <h5 className="card-title mb-1" style={{ color: "#333" }}>{guide.name}</h5>
                    <span
                      className="badge mb-2"
                      style={{ background: guide.categoryColor, color: "#222", fontSize: "0.85rem", letterSpacing: "0.8px" }}
                    >
                      {guide.categoryLabel}
                    </span>
                    <p className="card-text mb-0" style={{ fontSize: "0.97rem", color: "#666" }}>{guide.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
