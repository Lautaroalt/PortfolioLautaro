"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Activity,
  AtSign,
  BookOpen,
  Braces,
  Check,
  Copy,
  Cpu,
  Database,
  GitBranch,
  Globe,
  GraduationCap,
  Layers3,
  Link2,
  Server,
  Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";

import { CvButton } from "@/components/portfolio/cv-button";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { portfolioContentByLocale, type Locale } from "@/lib/portfolio-data";

const actionButtonStyles =
  "inline-flex h-11 items-center justify-center rounded-xl border border-emerald-400/22 bg-white/[0.04] px-5 text-sm font-medium text-slate-100 shadow-[0_10px_26px_rgba(0,0,0,0.22)] transition duration-300 hover:scale-[1.02] hover:border-emerald-300/55 hover:bg-emerald-400/[0.1] hover:shadow-[0_18px_40px_rgba(16,185,129,0.14)]";
const projectButtonBase =
  "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition";
const projectButtonPrimary =
  `${projectButtonBase} bg-emerald-300 text-black hover:bg-emerald-200`;
const projectButtonSecondary =
  `${projectButtonBase} border border-white/12 bg-white/[0.03] text-slate-100 hover:bg-white/[0.08]`;
const projectButtonMuted =
  `${projectButtonBase} border border-white/10 bg-white/[0.02] text-slate-400`;

const cardStyles =
  "rounded-2xl border border-emerald-400/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] shadow-[0_18px_50px_rgba(0,0,0,0.44)]";

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const heroSignalIcons = [Layers3, Server, Database, Workflow];

const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  typescript: Braces,
  react: Activity,
  nextjs: Layers3,
  fastapi: Server,
  nodejs: Server,
  api: Link2,
  postgresql: Database,
  sqlserver: Database,
  git: GitBranch,
  github: Link2,
  linux: Cpu,
  supabase: Database,
};

const skillGroupIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Frontend: Layers3,
  Backend: Server,
  "Bases de datos": Database,
  Herramientas: Cpu,
};

type PortfolioProject = {
  id: "servicios-maipu" | "fade" | "contableapp";
  title: string;
  subtitle: string;
  description: string;
  problem?: string;
  solution?: string;
  badge?: string;
  image?: string;
  imageAlt?: string;
  tech: string[];
  features?: string[];
  actions: {
    label: string;
    href?: string;
    variant: "primary" | "secondary" | "muted";
    external?: boolean;
  }[];
  featured: boolean;
};

export default function PortfolioPage() {
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<Locale>("es");
  const [activeSection, setActiveSection] = useState("top");
  const year = new Date().getFullYear();
  const t = portfolioContentByLocale[lang];
  const educationItems = t.education?.items ?? [];
  const [featuredEducation, ...secondaryEducation] = educationItems;
  const heroFocusCards = t.heroFocus?.cards ?? [];
  const heroFocusStack = t.heroFocus?.stack ?? [];
  const projects: PortfolioProject[] = [
    {
      id: "servicios-maipu",
      badge: lang === "es" ? "Destacado" : "Featured",
      title: "Servicios Maipú",
      subtitle:
        lang === "es"
          ? "Sistema de gestión logística y operativa"
          : "Logistics and operations management system",
      description:
        lang === "es"
          ? "Plataforma web y mobile para administrar entregas, retiros, remitos, clientes, cobros y seguimiento operativo en tiempo real."
          : "Web and mobile platform to manage deliveries, pickups, delivery notes, clients, collections, and real-time operational tracking.",
      problem:
        lang === "es"
          ? "La operación se realizaba mediante procesos manuales, seguimiento disperso y control administrativo descentralizado."
          : "Operations relied on manual processes, scattered tracking, and decentralized administrative control.",
      solution:
        lang === "es"
          ? "Plataforma web y mobile para centralizar clientes, remitos, cobros, entregas y seguimiento operativo en tiempo real."
          : "Web and mobile platform to centralize clients, delivery notes, collections, deliveries, and real-time operational tracking.",
      tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind", "Realtime", "PDF"],
      features:
        lang === "es"
          ? [
              "Gestión de clientes y deuda",
              "Asignación de trabajos",
              "Entrega y retiro de contenedores",
              "Firma digital en campo",
              "Remitos PDF",
              "Cobros y seguimiento financiero",
              "Mapa operativo",
              "Sincronización en tiempo real",
            ]
          : [
              "Client and debt management",
              "Work assignment",
              "Container delivery and pickup",
              "Field digital signature",
              "PDF delivery notes",
              "Collections and financial tracking",
              "Operations map",
              "Real-time synchronization",
            ],
      actions: [
        {
          label: lang === "es" ? "Ver proyecto" : "View project",
          href: "https://serviciosmaipu.vercel.app/",
          variant: "primary",
          external: true,
        },
      ],
      featured: true,
    },
    {
      id: "fade",
      title: "FADE",
      image: "/projects/fade-preview.jpg",
      imageAlt: "Preview de FADE",
      subtitle: lang === "es" ? "Sistema de reservas online" : "Online booking system",
      description:
        lang === "es"
          ? "Plataforma SaaS para gestión de reservas, pagos y administración multi-empresa."
          : "SaaS platform for booking management, payments, and multi-company administration.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Mercado Pago"],
      actions: [
        {
          label: lang === "es" ? "Ver proyecto" : "View project",
          href: "https://fade-app-indol.vercel.app/login",
          variant: "primary",
          external: true,
        },
      ],
      featured: false,
    },
    {
      id: "contableapp",
      badge: lang === "es" ? "En desarrollo" : "In development",
      title: "ContableApp",
      image: "/projects/contableapp-preview.jpg",
      imageAlt: "Preview de ContableApp",
      subtitle: lang === "es" ? "Plataforma contable SaaS" : "Accounting SaaS platform",
      description:
        lang === "es"
          ? "Sistema para estudios contables que centraliza clientes, vencimientos y tareas operativas."
          : "System for accounting firms that centralizes clients, deadlines, and operational tasks.",
      tech: ["FastAPI", "Next.js", "PostgreSQL"],
      actions: [
        {
          label: lang === "es" ? "En desarrollo" : "In development",
          variant: "muted",
        },
      ],
      featured: false,
    },
  ];
  const [featuredProject, ...secondaryProjects] = projects;
  const projectMetrics =
    lang === "es"
      ? [
          { value: "+10", label: "Módulos implementados" },
          { value: "2", label: "Roles de usuario" },
          { value: "Web + Mobile", label: "Plataforma responsiva" },
          { value: "Tiempo real", label: "Datos sincronizados" },
          { value: "Operación real", label: "Sistema en uso activo" },
        ]
      : [
          { value: "+10", label: "Implemented modules" },
          { value: "2", label: "User roles" },
          { value: "Web + Mobile", label: "Responsive platform" },
          { value: "Real time", label: "Synced data" },
          { value: "Real operation", label: "Active production use" },
        ];
  const experienceItems = t.experience?.items ?? [];
  const getEducationBadgeClass = (status?: string) => {
    if (!status) return "text-xs px-2 py-1 rounded-full border border-white/15 bg-white/[0.03] text-slate-300";
    const normalized = status.toLowerCase();
    if (normalized.includes("final") || normalized.includes("complete")) {
      return "text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20";
    }
    return "text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20";
  };
  const skillsFallbackByTitle: Record<string, { name: string; icon: string }[]> = {
    Frontend: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
    ],
    Backend: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "Node.js", icon: "nodejs" },
      { name: "REST APIs", icon: "api" },
    ],
    "Bases de datos": [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "SQL Server", icon: "sqlserver" },
    ],
    Herramientas: [
      { name: "Git", icon: "git" },
      { name: "Linux", icon: "linux" },
      { name: "Supabase", icon: "supabase" },
    ],
  };

  const skillGroups = t.skills?.groups ?? [];

  const skillsForRender = skillGroups.map((group) => {
    const candidate = (group as { items?: unknown; technologies?: unknown; stack?: unknown })
      .items
      ?? (group as { technologies?: unknown }).technologies
      ?? (group as { stack?: unknown }).stack;

    const normalized = Array.isArray(candidate)
      ? candidate
          .map((item) => {
            if (typeof item === "string") {
              return { name: item, icon: item.toLowerCase().replace(/\s+/g, "") };
            }

            if (
              item
              && typeof item === "object"
              && "name" in item
              && typeof (item as { name?: unknown }).name === "string"
            ) {
              const entry = item as { name: string; icon?: unknown };
              return {
                name: entry.name,
                icon:
                  typeof entry.icon === "string"
                    ? entry.icon
                    : entry.name.toLowerCase().replace(/\s+/g, ""),
              };
            }

            return null;
          })
          .filter((item): item is { name: string; icon: string } => item !== null)
      : [];

    return {
      ...group,
      items: normalized.length > 0 ? normalized : (skillsFallbackByTitle[group.title] ?? []),
    };
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const sectionIds = ["top", ...t.nav.map((item) => item.href.replace("#", ""))];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((item): item is HTMLElement => Boolean(item));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [t.nav]);

  return (
    <main className="relative overflow-hidden bg-[linear-gradient(180deg,#030303_0%,#050505_48%,#020202_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.16),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(16,185,129,0.10),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-70 [mask-image:radial-gradient(circle_at_center,black,transparent_84%)]" />

      <header className="sticky top-0 z-50 border-b border-emerald-400/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-3 sm:px-8 lg:px-10">
          <a href="#top" className="flex items-center gap-3">
            <Image
              src="/profile.jpg"
              alt="Lautaro Altamirano"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-white/10 object-cover"
            />
            <div>
              <p className="text-sm font-semibold tracking-[0.12em] text-slate-100">
                LAUTARO ALTAMIRANO
              </p>
              <p className="text-xs text-slate-500">{t.localeLabel}</p>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {t.nav.map((item) => {
              const sectionId = item.href.replace("#", "");
              const active = activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative inline-flex h-10 items-center rounded-lg px-3 text-sm transition ${
                    active ? "text-emerald-100" : "text-slate-300 hover:text-white"
                  } after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-emerald-300 after:transition-transform after:duration-300 hover:after:scale-x-100`}
                >
                  {item.label}
                  {active ? (
                    <motion.span
                      layoutId="active-nav-link"
                      className="absolute bottom-1 left-3 right-3 h-px bg-emerald-300"
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="inline-flex h-10 items-center rounded-lg border border-white/12 bg-white/[0.03] p-1">
              {(["es", "en"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLang(option)}
                  className={`h-8 rounded-md px-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition ${
                    lang === option ? "bg-white text-slate-950" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <a
              href={t.contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-white/[0.03] text-slate-200 transition hover:bg-white/[0.08]"
              aria-label="GitHub"
            >
              <Link2 className="h-4 w-4" />
            </a>
            <a
              href={t.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-white/[0.03] text-slate-200 transition hover:bg-white/[0.08]"
              aria-label="LinkedIn"
            >
              <Globe className="h-4 w-4" />
            </a>
            <CvButton label={t.navActions.downloadCv} className="hidden h-10 rounded-lg px-4 py-0 sm:inline-flex" />
            <a
              href="#contact"
              className="inline-flex h-10 items-center rounded-lg border border-white/12 bg-white/[0.03] px-4 text-sm font-medium text-white transition hover:bg-white/[0.08]"
            >
              {t.navActions.contact}
            </a>
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">
        <section
          id="top"
          className="scroll-mt-28 grid min-h-[84vh] items-center gap-12 py-8 lg:grid-cols-[1fr_0.95fr] lg:gap-14 lg:py-10"
        >
          <Reveal>
            <div className="max-w-3xl">
              <h1 className="max-w-3xl whitespace-pre-line text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.25rem] lg:leading-[1.02]">
                {t.hero.headline}
              </h1>
              <p className="mt-5 text-lg font-medium text-emerald-100/90 sm:text-[1.35rem]">
                {t.hero.subheadline}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-[1.05rem]">
                {t.hero.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                <a
                  href="#contact"
                  className={`${actionButtonStyles} bg-emerald-300 text-black shadow-[0_0_0_rgba(16,185,129,0)] hover:bg-emerald-200 hover:shadow-[0_0_34px_rgba(16,185,129,0.22)]`}
                >
                  {t.navActions.contact}
                </a>
                <CvButton label={t.hero.downloadCv} className="h-11 rounded-xl px-5 py-0" />
                <a
                  href="#projects"
                  className={actionButtonStyles}
                >
                  {t.hero.viewProjects}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto w-full max-w-[34rem] lg:ml-auto">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl border border-emerald-400/14 bg-black/75 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.62)] lg:p-5"
              >
                <div className="rounded-xl border border-emerald-400/10 bg-[linear-gradient(140deg,rgba(7,10,8,0.96),rgba(4,6,5,0.92))] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{t.heroFocus.title}</p>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300">
                      {t.heroFocus.status}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {heroFocusCards.map((item, index) => {
                      const Icon = heroSignalIcons[index] ?? Layers3;
                      return (
                      <motion.div
                        key={item.title}
                        whileHover={{ y: -2, scale: 1.02 }}
                        className="rounded-lg border border-emerald-400/10 bg-white/[0.03] p-3"
                      >
                        <Icon className="h-4 w-4 text-emerald-200" />
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-slate-400">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-200">{item.value}</p>
                      </motion.div>
                    );
                    })}
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-emerald-400/10 bg-black/55 p-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{t.heroFocus.stackLabel}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                    {heroFocusStack.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </section>

        <section id="projects" className="scroll-mt-28 py-8 lg:py-10">
          <Reveal>
            <SectionHeading
              eyebrow={t.projects.heading}
              title={t.projects.title}
              description={t.projects.description}
            />
          </Reveal>

          {featuredProject ? (
            <Reveal delay={0.08}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.24 }}
                className="relative mt-8 overflow-hidden rounded-2xl border border-emerald-300/22 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(255,255,255,0.035)_34%,rgba(245,158,11,0.07))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.46)] sm:p-8 lg:p-9"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(250,204,21,0.16),transparent_28%),radial-gradient(circle_at_12%_86%,rgba(16,185,129,0.14),transparent_34%)]" />
                <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch lg:gap-12">
                  <div className="order-2 lg:order-1">
                    <div className="flex flex-wrap items-center gap-3">
                      {featuredProject.badge ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-yellow-300/28 bg-yellow-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-yellow-100">
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 shadow-[0_0_14px_rgba(250,204,21,0.8)]" />
                          {featuredProject.badge}
                        </span>
                      ) : null}
                      <span className="rounded-full border border-emerald-300/24 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-emerald-100">
                        Web + Mobile
                      </span>
                    </div>

                    <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {featuredProject.title}
                    </h3>
                    <p className="mt-2 text-base font-medium text-emerald-100/90">
                      {featuredProject.subtitle}
                    </p>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                      {featuredProject.description}
                    </p>

                    {featuredProject.problem && featuredProject.solution ? (
                      <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-black/24 p-4">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                            {lang === "es" ? "Problema" : "Problem"}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {featuredProject.problem}
                          </p>
                        </div>
                        <div className="border-t border-white/10 pt-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                            {lang === "es" ? "Solución" : "Solution"}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {featuredProject.solution}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {featuredProject.features?.length ? (
                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {featuredProject.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-lg border border-emerald-300/14 bg-black/24 px-3 py-1.5 text-xs text-slate-200 shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {featuredProject.tech.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-wrap gap-2.5">
                      {featuredProject.actions.map((action) =>
                        action.href ? (
                          <a
                            key={action.label}
                            href={action.href}
                            target={action.external ? "_blank" : undefined}
                            rel={action.external ? "noopener noreferrer" : undefined}
                            className={
                              action.variant === "primary" ? projectButtonPrimary : projectButtonSecondary
                            }
                          >
                            {action.label}
                          </a>
                        ) : (
                          <span key={action.label} className={projectButtonMuted}>
                            {action.label}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="order-1 flex flex-col lg:order-2">
                    <div className="relative flex min-h-[320px] flex-1 overflow-hidden rounded-2xl border border-emerald-300/16 bg-[#050806] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.38)] sm:min-h-[420px] lg:min-h-[540px]">
                      <Image
                        src="/projects/serviciosmaipu-preview.jpeg"
                        alt="Preview de Servicios Maipú"
                        fill
                        className="rounded-2xl object-contain p-3"
                        sizes="(min-width: 1024px) 620px, 100vw"
                      />
                    </div>
                    <p className="mt-3 text-center text-xs font-medium text-slate-400">
                      Dashboard Mobile • Cobros • Login • Remitos PDF
                    </p>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ) : null}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="mt-6 grid gap-5 lg:grid-cols-2"
          >
            {secondaryProjects.map((project, index) => (
              <Reveal key={project.title} delay={0.02 * (index + 1)}>
                <motion.article
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22 }}
                  className="grid h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0f1a] shadow-[0_14px_36px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-emerald-300/20 hover:shadow-[0_22px_58px_rgba(0,0,0,0.38)] sm:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className="relative min-h-[210px] border-b border-white/10 bg-black/35 p-3 sm:min-h-full sm:border-b-0 sm:border-r">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        fill
                        className="object-contain p-3 transition duration-300 hover:scale-[1.01]"
                        sizes="(min-width: 1024px) 320px, 100vw"
                      />
                    ) : null}
                  </div>
                  <div className="flex min-h-[280px] flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-full border border-emerald-300/18 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-emerald-100">
                        {project.subtitle}
                      </span>
                      {project.badge ? (
                        <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] text-slate-300">
                          {project.badge}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {project.tech.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-1 text-xs text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
                      {project.actions.map((action) =>
                        action.href ? (
                          <a
                            key={action.label}
                            href={action.href}
                            target={action.external ? "_blank" : undefined}
                            rel={action.external ? "noopener noreferrer" : undefined}
                            className={action.variant === "primary" ? projectButtonPrimary : projectButtonSecondary}
                          >
                            {action.label}
                          </a>
                        ) : (
                          <span key={action.label} className={projectButtonMuted}>
                            {action.label}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </motion.div>

          <div className="mt-5 grid gap-3 rounded-2xl border border-emerald-300/14 bg-black/35 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.3)] sm:grid-cols-2 lg:grid-cols-5">
            {projectMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                <p className="text-lg font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="scroll-mt-28 py-16">
          <Reveal>
            <SectionHeading
              eyebrow={t.skills.heading}
              title={t.skills.title}
              description={t.skills.description}
            />
          </Reveal>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="mt-10 grid auto-rows-[1fr] gap-6 sm:grid-cols-2 xl:grid-cols-4"
          >
            {skillsForRender.map((group, index) => (
              <Reveal key={group.title} delay={0.02 * index} className="h-full">
                <motion.article
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -8, scale: 1.012 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className={`${cardStyles} group relative flex h-full min-h-[320px] flex-col overflow-hidden p-5 sm:p-6`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                    <div className="absolute -left-12 -top-14 h-36 w-36 rounded-full bg-emerald-400/18 blur-3xl" />
                    <div className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-emerald-500/14 blur-3xl" />
                  </div>
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/[0.03]">
                          {(() => {
                            const GroupIcon = skillGroupIcons[group.title] ?? Braces;
                            return <GroupIcon className="h-4 w-4 text-emerald-200" />;
                          })()}
                        </span>
                        <p className="text-sm font-semibold text-white">{group.title}</p>
                      </div>
                      <span className="rounded-lg border border-white/12 bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-400">
                        {group.items.length}
                      </span>
                    </div>

                    <div className="mt-5 grid flex-1 content-start gap-3">
                      {group.items.length > 0 ? group.items.map((item) => {
                        const Icon = skillIcons[item.icon] ?? Braces;
                        return (
                          <div
                            key={item.name}
                            className="group/item flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-white/[0.03] px-3 py-2.5 text-white shadow-[0_8px_22px_rgba(0,0,0,0.24)] transition duration-200 hover:scale-[1.02] hover:border-emerald-300/35 hover:bg-white/[0.06]"
                          >
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/12 bg-black/55 transition group-hover/item:border-emerald-300/35 group-hover/item:bg-emerald-400/10">
                              <Icon className="h-4 w-4 text-emerald-200 transition group-hover/item:text-emerald-100" />
                            </span>
                            <span className="text-sm text-slate-100">{item.name}</span>
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-300/70 opacity-0 transition group-hover/item:opacity-100" />
                          </div>
                        );
                      }) : (
                        <p className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-slate-400">
                          Sin tecnologÃƒÆ’Ã‚Â­as cargadas.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </motion.div>
        </section>

        <section id="experience" className="scroll-mt-28 py-16">
          <Reveal>
            <SectionHeading eyebrow={t.experience.heading} title={t.experience.title} description={t.experience.description} />
          </Reveal>
          <p className="mt-5 max-w-3xl text-sm text-slate-300">{t.experience.intro}</p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="mt-8 grid gap-4 lg:grid-cols-2"
          >
            {experienceItems.map((item, index) => (
              <Reveal key={item.company} delay={0.03 * index}>
                <motion.article
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -4 }}
                  className={`${cardStyles} h-full overflow-hidden p-6 ${
                    index === 0
                      ? "border-emerald-300/26 bg-[linear-gradient(145deg,rgba(16,185,129,0.13),rgba(255,255,255,0.035)_34%,rgba(0,0,0,0.14))]"
                      : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{item.period}</p>
                    {index === 0 ? (
                      <span className="rounded-full border border-emerald-300/24 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-100">
                        {lang === "es" ? "Experiencia actual" : "Current experience"}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item.company}</h3>
                  <p className="mt-1 text-sm text-emerald-100/90">{item.role}</p>
                  {index === 0 ? (
                    <div className="mt-4 rounded-xl border border-white/10 bg-black/24 px-4 py-3">
                      <p className="text-sm font-medium text-slate-100">
                        {lang === "es"
                          ? "+3 años trabajando con sistemas en producción"
                          : "+3 years working with production systems"}
                      </p>
                    </div>
                  ) : null}
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {item.highlights?.map((highlight) => (
                      <motion.li
                        key={highlight}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.35 }}
                        className="flex gap-2"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.article>
              </Reveal>
            ))}
          </motion.div>
        </section>

        <section id="education" className="scroll-mt-28 py-16">
          <Reveal>
            <SectionHeading
              eyebrow={t.education.heading}
              title={t.education.title}
              description={t.education.description}
            />
          </Reveal>
          <div className="relative mt-8 overflow-hidden rounded-[1.75rem]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_left_top,rgba(52,211,153,0.12),transparent_62%)]" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="relative grid gap-5"
            >
              {featuredEducation ? (
                <Reveal delay={0.02}>
                  <motion.article
                    variants={staggerItem}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="relative overflow-hidden rounded-[1.75rem] border border-emerald-400/22 bg-[linear-gradient(145deg,rgba(16,185,129,0.14),rgba(255,255,255,0.04)_36%,rgba(0,0,0,0.22))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.42)] sm:p-7"
                  >
                    <div className="relative">
                      <div className="max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-100">
                            <GraduationCap className="h-3.5 w-3.5" />
                            Formacion principal
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-300">
                            {featuredEducation.type}
                          </span>
                          {featuredEducation.status ? (
                            <span className={getEducationBadgeClass(featuredEducation.status)}>
                              {featuredEducation.status}
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-[1.85rem]">
                          {featuredEducation.title}
                        </h3>
                        <p className="mt-3 text-base leading-7 text-slate-200">
                          {featuredEducation.institution}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2.5">
                          <span className="rounded-lg border border-emerald-400/18 bg-black/25 px-3 py-1.5 text-sm text-emerald-100">
                            {featuredEducation.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </Reveal>
              ) : null}

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={staggerContainer}
                className="grid auto-rows-[1fr] gap-5 md:grid-cols-3"
              >
                {secondaryEducation.map((item, index) => (
                  <Reveal key={item.title} delay={0.03 * index} className="h-full">
                    <motion.article
                      variants={staggerItem}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      whileHover={{ y: -6, scale: 1.015 }}
                      className={`${cardStyles} relative flex h-full min-h-[230px] flex-col overflow-hidden p-5 transition-shadow duration-300 hover:border-emerald-300/30 hover:shadow-[0_18px_40px_rgba(16,185,129,0.12)] sm:p-6`}
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 hover:opacity-100" />
                      <div className="relative flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{item.type}</p>
                          <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                        </div>
                        {item.status ? (
                          <span className={`${getEducationBadgeClass(item.status)} shrink-0`}>
                            {item.status}
                          </span>
                        ) : (
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/16 bg-emerald-400/10 text-emerald-200">
                            <BookOpen className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                      <p className="relative mt-4 text-sm leading-7 text-slate-300">{item.institution}</p>
                      <div className="relative mt-auto pt-5">
                        <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                          Formacion complementaria
                        </span>
                      </div>
                    </motion.article>
                  </Reveal>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 py-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.9rem] border border-emerald-400/20 bg-[linear-gradient(145deg,rgba(16,185,129,0.14),rgba(255,255,255,0.035)_30%,rgba(0,0,0,0.18))] p-6 shadow-[0_26px_70px_rgba(0,0,0,0.5)] sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_30%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:56px_56px] opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_86%)]" />
              <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div>
                  <SectionHeading
                    eyebrow={t.contact.heading}
                    title={t.contact.title}
                    description={t.contact.description}
                  />
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/28 bg-emerald-400/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                    {lang === "es"
                      ? "Disponible para nuevas oportunidades"
                      : "Open to new opportunities"}
                  </div>
                </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                  className="flex flex-col gap-4"
              >
                  <motion.div
                    variants={staggerItem}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.22)]"
                  >
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                      Contacto directo
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <a href={`mailto:${t.contact.email}`} className={actionButtonStyles}>
                    <AtSign className="mr-2 h-4 w-4 text-emerald-200" />
                    {t.contact.email}
                  </a>
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(t.contact.email);
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 1300);
                    }}
                    className={actionButtonStyles}
                  >
                      {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                      {copied ? t.contact.copiedEmail : t.contact.copyEmail}
                    </button>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={staggerItem}
                    className="rounded-2xl border border-emerald-400/16 bg-emerald-400/10 p-5 shadow-[0_18px_44px_rgba(16,185,129,0.12)]"
                  >
                    <p className="text-sm font-medium text-emerald-50">
                      {lang === "es"
                        ? "Buscando nuevos desafíos en desarrollo de software, backend, automatización y sistemas de gestión."
                        : "Looking for new challenges in software development, backend, automation, and management systems."}
                    </p>
                    <div className="mt-5 rounded-xl border border-white/10 bg-black/24 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-100/80">
                        {lang === "es" ? "Disponible para" : "Available for"}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "Full Stack Developer Jr",
                          "Backend Developer Jr",
                          "QA Automation",
                          "Software Developer",
                        ].map((role) => (
                          <span
                            key={role}
                            className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-200"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <a
                        href={`mailto:${t.contact.email}`}
                        className="inline-flex h-11 items-center rounded-xl bg-emerald-300 px-5 text-sm font-semibold text-black shadow-[0_14px_34px_rgba(16,185,129,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-200 hover:shadow-[0_18px_40px_rgba(16,185,129,0.24)]"
                      >
                        {t.navActions.contact}
                      </a>
                      <CvButton label={t.navActions.downloadCv} className="h-11 rounded-xl px-5 py-0" />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <a
                        href={t.contact.github}
                        target="_blank"
                        rel="noreferrer"
                        className={actionButtonStyles}
                      >
                        <Link2 className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                      <a
                        href={t.contact.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className={actionButtonStyles}
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        LinkedIn
                      </a>
                    </div>
                  </motion.div>
              </motion.div>
            </div>
            </div>
          </Reveal>
        </section>

        <footer className="border-t border-white/8 py-8">
          <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>{`${year} ${t.footer.left}`}</p>
            <div className="flex items-center gap-4">
              <a
                href={t.contact.github}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-slate-300"
              >
                {t.footer.github}
              </a>
              <a
                href={t.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-slate-300"
              >
                {t.footer.linkedin}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
