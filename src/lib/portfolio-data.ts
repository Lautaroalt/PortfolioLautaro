export type Locale = "es" | "en";

export type NavItem = {
  label: string;
  href: string;
};

export type ProjectLink = {
  label: string;
  href?: string;
  comingSoon?: boolean;
};

export type ProjectItem = {
  name: string;
  category: string;
  summary: string;
  stack: string[];
  status: string;
  preview: string[];
  links: ProjectLink[];
};

export type SkillItem = {
  name: string;
  icon: string;
};

export type SkillGroup = {
  title: string;
  items: SkillItem[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

export type EducationItem = {
  title: string;
  institution: string;
  type: string;
  status?: string;
  startDate?: string;
};

type PortfolioContent = {
  localeLabel: string;
  nav: NavItem[];
  navActions: {
    downloadCv: string;
    contact: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    description: string;
    viewProjects: string;
    downloadCv: string;
    linkedin: string;
    github: string;
  };
  heroFocus: {
    title: string;
    status: string;
    stackLabel: string;
    cards: { title: string; value: string }[];
    stack: string[];
  };
  about: {
    heading: string;
    title: string;
    body: string;
  };
  projects: {
    heading: string;
    title: string;
    description: string;
    featuredPreviewLabel: string;
    featuredStats: [string, string, string];
    featured: ProjectItem & {
      bullets: string[];
    };
    items: ProjectItem[];
    comingSoon: string;
  };
  skills: {
    heading: string;
    title: string;
    description: string;
    groups: SkillGroup[];
  };
  experience: {
    heading: string;
    title: string;
    description: string;
    intro: string;
    items: ExperienceItem[];
  };
  education: {
    heading: string;
    title: string;
    description: string;
    items: EducationItem[];
  };
  contact: {
    heading: string;
    title: string;
    description: string;
    email: string;
    github: string;
    linkedin: string;
    copyEmail: string;
    copiedEmail: string;
  };
  footer: {
    left: string;
    github: string;
    linkedin: string;
  };
};

const sharedSkills: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "Node.js", icon: "nodejs" },
      { name: "REST APIs", icon: "api" },
    ],
  },
  {
    title: "Bases de datos",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "SQL Server", icon: "sqlserver" },
    ],
  },
  {
    title: "Herramientas",
    items: [
      { name: "Git", icon: "git" },
      { name: "Linux", icon: "linux" },
      { name: "Supabase", icon: "supabase" },
    ],
  },
];

export const portfolioContentByLocale: Record<Locale, PortfolioContent> = {
  es: {
    localeLabel: "ES",
    nav: [
      { label: "Proyectos", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Experiencia", href: "#experience" },
      { label: "Estudios", href: "#education" },
      { label: "Contacto", href: "#contact" },
    ],
    navActions: {
      downloadCv: "Descargar CV",
      contact: "Contactar",
    },
    hero: {
      headline: "Full Stack Developer para sistemas reales",
      subheadline: "Backend · Frontend · Integración de sistemas · Datos",
      description:
        "Desarrollo software para operación real: sistemas internos, paneles administrativos, gestión de datos, trazabilidad y automatización de procesos. Me enfoco en soluciones claras, usables y sostenibles para el día a día.",
      viewProjects: "Ver proyectos",
      downloadCv: "Descargar CV",
      linkedin: "Contactar",
      github: "GitHub",
    },
    heroFocus: {
      title: "Stack principal",
      status: "En uso",
      stackLabel: "Stack principal",
      cards: [
        { title: "Frontend", value: "Interfaces claras para operación" },
        { title: "Backend", value: "APIs y lógica de negocio" },
        { title: "Datos", value: "SQL y trazabilidad confiable" },
        { title: "Integración", value: "Automatización y sistemas conectados" },
      ],
      stack: ["React", "Next.js", "TypeScript", "Tailwind", "Supabase", "PostgreSQL", "FastAPI"],
    },
    about: {
      heading: "Sobre mí",
      title: "Full Stack para operación real",
      body: "Construyo producto, backend, automatizaciones y flujos de datos para sistemas que necesitan claridad, trazabilidad y uso diario.",
    },
    projects: {
      heading: "Proyectos destacados ⭐",
      title: "Sistemas reales en los que trabajo",
      description: "Sistemas reales en los que trabajo",
      featuredPreviewLabel: "Vista del producto",
      featuredStats: ["Clientes", "Vencimientos", "Tareas activas"],
      featured: {
        name: "ContableApp",
        category: "Full Stack SaaS",
        summary:
          "Sistema para centralizar clientes, vencimientos y seguimiento operativo en estudios contables. Reemplaza planillas dispersas y ordena el trabajo diario en un solo lugar.",
        stack: ["FastAPI", "Next.js", "PostgreSQL", "Tailwind", "JWT"],
        status: "En desarrollo",
        preview: [
          "Panel por cliente con vencimientos próximos",
          "Seguimiento de tareas operativas por responsable",
          "Comprobantes con estado y trazabilidad",
        ],
        bullets: [
          "Gestión de clientes y vencimientos",
          "Seguimiento de tareas por responsable",
          "Documentos con estado y trazabilidad",
          "Automatización de obligaciones mensuales",
        ],
        links: [
          { label: "Ver proyecto", comingSoon: true },
          { label: "GitHub", href: "https://github.com/Lautaroalt" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/lautaro-altamirano-827801237/" },
        ],
      },
      items: [
        {
          name: "Sistema de automatización de usuarios",
          category: "Backend",
          summary:
            "Sistema para gestionar altas, bajas y modificaciones de usuarios en herramientas internas. Reduce tareas manuales y asegura trazabilidad en cada acción.",
          stack: ["Node.js", "TypeScript", "REST API", "SQL"],
          status: "En desarrollo",
          preview: [
            "Automatización de procesos de usuarios",
            "Validaciones por etapas",
            "Registro de acciones y auditoría",
          ],
          links: [
            { label: "Ver proyecto", comingSoon: true },
            { label: "GitHub", href: "https://github.com/Lautaroalt" },
          ],
        },
        {
          name: "Sistema de gestión de clientes y tareas",
          category: "Full Stack",
          summary:
            "Aplicación para centralizar clientes, tareas y seguimiento operativo. Pensada para reemplazar planillas y mejorar la organización del trabajo diario.",
          stack: ["Next.js", "FastAPI", "PostgreSQL", "Tailwind"],
          status: "En desarrollo",
          preview: [
            "Gestión de clientes",
            "Seguimiento de tareas por estado",
            "Organización del trabajo por responsable",
          ],
          links: [
            { label: "Ver proyecto", comingSoon: true },
            { label: "GitHub", href: "https://github.com/Lautaroalt" },
          ],
        },
        {
          name: "Portfolio profesional",
          category: "Frontend",
          summary:
            "Sitio personal diseñado para mostrar proyectos y experiencia de forma clara. Enfocado en comunicar qué construyo y cómo trabajo con sistemas reales.",
          stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
          status: "En vivo",
          preview: [
            "Presentación clara para recruiters",
            "Enfoque en proyectos reales",
            "Diseño limpio y orientado a contenido",
          ],
          links: [
            { label: "Ver proyecto", href: "#top" },
            { label: "GitHub", href: "https://github.com/Lautaroalt" },
          ],
        },
      ],
      comingSoon: "Próximamente",
    },
    skills: {
      heading: "Skills & Stack",
      title: "Tecnologías con las que trabajo",
      description: "Trabajo principalmente con estas tecnologías en proyectos reales.",
      groups: sharedSkills,
    },
    experience: {
      heading: "Experiencia",
      title: "Experiencia profesional",
      description: "Experiencia en soporte, implementación, análisis de datos y mejora de procesos en entornos productivos.",
      intro: "Soporte técnico, datos, integraciones y validación funcional aplicados a sistemas en uso real.",
      items: [
        {
          company: "FOCA Software",
          role: "Help Desk IT / Implementador Técnico",
          period: "Actualidad",
          highlights: [
            "Resolución y análisis de incidencias en entornos productivos.",
            "Validación y control de datos mediante consultas SQL.",
            "Implementación y configuración de sistemas para clientes.",
            "Integración y verificación de APIs y procesos operativos.",
            "Diagnóstico de errores funcionales y técnicos.",
            "Soporte a procesos críticos de facturación, cobranzas y operación diaria.",
            "Participación en pruebas funcionales y validación de correcciones.",
            "Automatización y optimización de tareas operativas.",
          ],
        },
        {
          company: "Ruben Fraccaro Design",
          role: "Administrativo Contable",
          period: "Experiencia previa",
          highlights: [
            "Facturación y control administrativo.",
            "Gestión de proveedores, pagos y documentación.",
            "Organización y seguimiento de procesos contables.",
            "Manejo de información financiera y administrativa.",
            "Optimización de tareas operativas y control interno.",
          ],
        },
      ],
    },
    education: {
      heading: "Estudios y cursos",
      title: "Formación continua",
      description: "Capacitación orientada a desarrollo de software y mejora técnica permanente.",
      items: [
        {
          title: "Tecnicatura en Desarrollo de Software",
          institution: "Instituto Educación Superior 9023",
          type: "Educación formal",
          status: "En curso",
          startDate: "Marzo 2026",
        },
        { title: "Front End React", institution: "CoderHouse", type: "Curso", status: "Finalizado" },
        { title: "Ciberseguridad y Hacking Ético", institution: "Udemy", type: "Curso", status: "En curso" },
        { title: "Full Stack", institution: "Udemy", type: "Curso", status: "En curso" },
      ],
    },
    contact: {
      heading: "Contacto",
      title: "Disponible para oportunidades",
      description: "Si necesitás alguien que pueda trabajar con backend, frontend y datos en sistemas reales, podemos hablar.",
      email: "lautaroaltamiranoramirez@gmail.com",
      github: "https://github.com/Lautaroalt",
      linkedin: "https://www.linkedin.com/in/lautaro-altamirano-827801237/",
      copyEmail: "Copiar email",
      copiedEmail: "Email copiado",
    },
    footer: {
      left: "Lautaro Altamirano",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
  en: {
    localeLabel: "EN",
    nav: [
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Contact", href: "#contact" },
    ],
    navActions: {
      downloadCv: "Download CV",
      contact: "Contact",
    },
    hero: {
      headline: "Full Stack Developer for real systems",
      subheadline: "Backend · Frontend · Systems integration · Data",
      description:
        "I build software for real operations: internal systems, admin panels, data management, traceability, and process automation. I focus on clear, usable, and sustainable solutions for day-to-day work.",
      viewProjects: "View projects",
      downloadCv: "Download CV",
      linkedin: "Contact",
      github: "GitHub",
    },
    heroFocus: {
      title: "Main stack",
      status: "In use",
      stackLabel: "Main stack",
      cards: [
        { title: "Frontend", value: "Clear interfaces for operations" },
        { title: "Backend", value: "APIs and business logic" },
        { title: "Data", value: "SQL and reliable traceability" },
        { title: "Integration", value: "Automation and connected systems" },
      ],
      stack: ["React", "Next.js", "TypeScript", "Tailwind", "Supabase", "PostgreSQL", "FastAPI"],
    },
    about: {
      heading: "About",
      title: "Full Stack for real operations",
      body: "I build product, backend, automation, and data workflows for systems that require clarity, traceability, and daily use.",
    },
    projects: {
      heading: "Featured projects ⭐",
      title: "Real systems I work on",
      description: "Real systems I work on",
      featuredPreviewLabel: "Product preview",
      featuredStats: ["Clients", "Deadlines", "Active tasks"],
      featured: {
        name: "ContableApp",
        category: "Full Stack SaaS",
        summary:
          "System to centralize clients, deadlines, and operational follow-up for accounting firms. It replaces scattered spreadsheets and organizes daily work in one place.",
        stack: ["FastAPI", "Next.js", "PostgreSQL", "Tailwind", "JWT"],
        status: "In development",
        preview: [
          "Client dashboard with upcoming deadlines",
          "Task tracking by assignee",
          "Documents with status and traceability",
        ],
        bullets: [
          "Client and deadline management",
          "Task tracking by owner",
          "Documents with state and traceability",
          "Automation of monthly obligations",
        ],
        links: [
          { label: "View project", comingSoon: true },
          { label: "GitHub", href: "https://github.com/Lautaroalt" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/lautaro-altamirano-827801237/" },
        ],
      },
      items: [
        {
          name: "User Lifecycle Automation System",
          category: "Backend",
          summary:
            "System to organize onboarding, offboarding, and role changes across internal tools. It reduces manual work and keeps a clear trace of each request.",
          stack: ["Node.js", "TypeScript", "REST API", "SQL"],
          status: "In progress",
          preview: [
            "Step-based workflows with validation",
            "Execution history by user",
          ],
          links: [
            { label: "View project", comingSoon: true },
            { label: "GitHub", href: "https://github.com/Lautaroalt" },
          ],
        },
        {
          name: "Client and task management system",
          category: "Full Stack",
          summary:
            "Application to centralize clients, tasks, and operational follow-up. Built to replace spreadsheets and give teams a clearer view of day-to-day work.",
          stack: ["Next.js", "FastAPI", "PostgreSQL", "Tailwind"],
          status: "In progress",
          preview: [
            "Client management",
            "Task tracking by status",
            "Filters and organization by owner",
            "Clear view for day-to-day operations",
          ],
          links: [
            { label: "Project in progress", comingSoon: true },
            { label: "GitHub", href: "https://github.com/Lautaroalt" },
          ],
        },
        {
          name: "Portfolio Website",
          category: "Frontend",
          summary:
            "Portfolio designed to explain clearly what I build, which problems I solve, and how I work across frontend, backend, and data.",
          stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
          status: "Live",
          preview: [
            "Clear message for recruiters and clients",
            "Visual structure focused on real value",
          ],
          links: [
            { label: "View project", href: "#top" },
            { label: "GitHub", href: "https://github.com/Lautaroalt" },
          ],
        },
      ],
      comingSoon: "Coming soon",
    },
    skills: {
      heading: "Skills & Stack",
      title: "Technologies I work with",
      description: "I mainly work with these technologies in real projects.",
      groups: sharedSkills,
    },
    experience: {
      heading: "Experience",
      title: "Professional experience",
      description: "Experience in support, implementation, data analysis, and process improvement in production environments.",
      intro: "Technical support, data, integrations, and functional validation applied to systems in real use.",
      items: [
        {
          company: "FOCA Software",
          role: "IT Help Desk / Technical Implementer",
          period: "Present",
          highlights: [
            "Resolved and analyzed incidents in production environments.",
            "Validated and controlled data through SQL queries.",
            "Implemented and configured systems for clients.",
            "Integrated and verified APIs and operational processes.",
            "Diagnosed functional and technical errors.",
            "Supported critical billing, collections, and daily operations processes.",
            "Participated in functional testing and validation of fixes.",
            "Automated and optimized operational tasks.",
          ],
        },
        {
          company: "Ruben Fraccaro Design",
          role: "Administrative Accounting",
          period: "Previous experience",
          highlights: [
            "Handled invoicing and administrative control.",
            "Managed suppliers, payments, and documentation.",
            "Organized and tracked accounting processes.",
            "Handled financial and administrative information.",
            "Optimized operational tasks and internal control.",
          ],
        },
      ],
    },
    education: {
      heading: "Education & Courses",
      title: "Continuous learning",
      description: "Training focused on software development and technical growth.",
      items: [
        {
          title: "Software Development Degree",
          institution: "Academic training",
          type: "Formal education",
          status: "In progress",
          startDate: "March 2026",
        },
        { title: "Front End React", institution: "CoderHouse", type: "Course", status: "Completed" },
        { title: "Cybersecurity and Ethical Hacking", institution: "Udemy", type: "Course", status: "In progress" },
        { title: "Full Stack", institution: "Udemy", type: "Course", status: "In progress" },
      ],
    },
    contact: {
      heading: "Contact",
      title: "Available for opportunities",
      description: "If you need someone who can work with backend, frontend, and data in real systems, we can talk.",
      email: "lautaroaltamiranoramirez@gmail.com",
      github: "https://github.com/Lautaroalt",
      linkedin: "https://www.linkedin.com/in/lautaro-altamirano-827801237/",
      copyEmail: "Copy email",
      copiedEmail: "Email copied",
    },
    footer: {
      left: "Lautaro Altamirano",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
};
