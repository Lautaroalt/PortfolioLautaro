"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Activity,
  AtSign,
  Braces,
  Check,
  Code2,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  FileCode2,
  GitBranch,
  Globe,
  Layers3,
  Link2,
  Server,
  Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";

import { CvButton } from "@/components/portfolio/cv-button";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { TypingText } from "@/components/portfolio/typing-text";
import { portfolioContentByLocale, type Locale } from "@/lib/portfolio-data";

const actionButtonStyles =
  "inline-flex h-11 items-center justify-center rounded-xl border border-emerald-400/18 bg-white/[0.03] px-5 text-sm font-medium text-slate-100 transition duration-300 hover:scale-105 hover:border-emerald-300/40 hover:bg-emerald-400/[0.08]";

const cardStyles =
  "rounded-2xl border border-emerald-400/10 bg-white/[0.02] shadow-[0_16px_48px_rgba(0,0,0,0.42)]";

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
  javascript: Code2,
  typescript: Braces,
  python: FileCode2,
  sql: Database,
  react: Activity,
  nextjs: Layers3,
  tailwind: Braces,
  fastapi: Server,
  nodejs: Server,
  api: Link2,
  postgresql: Database,
  sqlserver: Database,
  git: GitBranch,
  github: Link2,
  linux: Cpu,
  n8n: Workflow,
};

const skillGroupIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Lenguajes: Code2,
  Frontend: Layers3,
  Backend: Server,
  "Bases de datos": Database,
  Herramientas: Cpu,
};

export default function PortfolioPage() {
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<Locale>("es");
  const [activeSection, setActiveSection] = useState("top");
  const year = new Date().getFullYear();
  const t = portfolioContentByLocale[lang];
  const heroTypingTexts =
    lang === "es"
      ? ["SQL", "Integracion de sistemas", "Automatizacion", "Frontend + Backend"]
      : ["SQL", "Systems Integration", "Automation", "Frontend + Backend"];
  const skillsFallbackByTitle: Record<string, { name: string; icon: string }[]> = {
    Lenguajes: [
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Python", icon: "python" },
      { name: "SQL", icon: "sql" },
    ],
    Frontend: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind", icon: "tailwind" },
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
      { name: "GitHub", icon: "github" },
      { name: "Linux", icon: "linux" },
      { name: "n8n", icon: "n8n" },
    ],
  };

  const skillsForRender = t.skills.groups.map((group) => {
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
          className="scroll-mt-28 grid min-h-[84vh] items-center gap-12 py-18 lg:grid-cols-[1fr_0.95fr] lg:gap-14"
        >
          <Reveal>
            <div className="max-w-3xl">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.25rem] lg:leading-[1.02]">
                {t.hero.headline}
              </h1>
              <p className="mt-5 text-lg font-medium text-emerald-100/90 sm:text-[1.35rem]">
                <span className="mr-2">Backend / Frontend /</span>
                <TypingText texts={heroTypingTexts} />
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
                    {t.heroFocus.cards.map((item, index) => {
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
                    {t.heroFocus.stack.map((item) => (
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

        <section className="py-8">
          <Reveal>
            <div className={`${cardStyles} p-6 sm:p-8`}>
              <SectionHeading
                eyebrow={t.valueProp.heading}
                title={t.valueProp.title}
              />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3"
              >
                {t.valueProp.items.map((item) => (
                  <motion.div
                    key={item}
                    variants={staggerItem}
                    className="rounded-xl border border-emerald-400/12 bg-white/[0.03] px-4 py-3 text-sm text-slate-200"
                  >
                    <span className="mr-3 inline-block h-2 w-2 rounded-full bg-emerald-300" />
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </section>

        <section id="projects" className="scroll-mt-28 py-16">
          <Reveal>
            <SectionHeading
              eyebrow={t.projects.heading}
              title={t.projects.title}
              description={t.projects.description}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <motion.article
              whileHover={{ y: -6, scale: 1.006 }}
              transition={{ duration: 0.24 }}
              className={`${cardStyles} group relative mt-8 overflow-hidden p-6 sm:p-8`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -left-16 top-0 h-44 w-44 rounded-full bg-emerald-400/12 blur-3xl" />
                <div className="absolute -right-20 bottom-0 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
              </div>
              <div className="grid gap-7 lg:grid-cols-[1fr_1fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-emerald-100">
                      {t.projects.featured.category}
                    </span>
                    <span className="rounded-lg border border-white/12 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                      {t.projects.featured.status}
                    </span>
                  </div>
                  <p className="mt-4 text-base leading-8 text-slate-300">
                    {t.projects.featured.summary}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {t.projects.featured.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {t.projects.featured.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/12 bg-slate-950/80 px-3 py-1.5 text-sm text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {t.projects.featured.links.map((link) =>
                      link.href ? (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className={actionButtonStyles}
                        >
                          {link.label}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      ) : (
                        <span
                          key={link.label}
                          className="inline-flex h-11 items-center rounded-xl border border-white/10 bg-white/[0.02] px-5 text-sm text-slate-400"
                        >
                          {`${link.label} (${t.projects.comingSoon.toLowerCase()})`}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-emerald-400/12 bg-black/65 p-4">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.14),transparent_42%)]" />
                  <div className="relative rounded-xl border border-emerald-400/10 bg-black/65 p-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                        {t.projects.featuredPreviewLabel}
                      </p>
                      <span className="rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-300">
                        {t.projects.featured.status}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2 md:grid-cols-3">
                      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
                          {t.projects.featuredStats[0]}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">128</p>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
                          {t.projects.featuredStats[1]}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">42</p>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
                          {t.projects.featuredStats[2]}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">19</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      {t.projects.featured.preview.map((line) => (
                        <div
                          key={line}
                          className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-slate-300"
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {t.projects.items.map((project, index) => (
              <Reveal key={project.name} delay={0.02 * (index + 1)}>
                <motion.article
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -7, scale: 1.05 }}
                  transition={{ duration: 0.22 }}
                  className={`${cardStyles} group relative h-full overflow-hidden p-5`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-300/14 blur-2xl" />
                    <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-emerald-500/12 blur-2xl" />
                  </div>
                  <div className="relative overflow-hidden rounded-xl border border-emerald-400/12 bg-black/65 p-3">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.12),transparent_50%)]" />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-[0.14em] text-emerald-100/80">
                          {project.category}
                        </p>
                        <span className="rounded-md border border-white/12 bg-white/[0.03] px-2 py-1 text-[11px] text-slate-300">
                          {project.status}
                        </span>
                      </div>
                      {index === 0 ? (
                        <div className="mt-3 h-40 rounded-lg border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-3">
                          <div className="grid h-full grid-cols-[1.2fr_0.8fr] gap-2">
                            <div className="rounded-md border border-white/10 bg-white/[0.03] p-2">
                              <div className="h-2 w-2/3 rounded bg-emerald-200/40" />
                              <div className="mt-2 grid gap-1.5">
                                <div className="h-2 rounded bg-white/10" />
                                <div className="h-2 rounded bg-white/10" />
                                <div className="h-2 w-3/4 rounded bg-white/10" />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <div className="rounded-md border border-white/10 bg-white/[0.03]" />
                              <div className="rounded-md border border-white/10 bg-white/[0.03]" />
                              <div className="rounded-md border border-white/10 bg-white/[0.03]" />
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {index === 1 ? (
                        <div className="mt-3 h-40 rounded-lg border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-3">
                          <div className="grid h-full grid-rows-[auto_1fr] gap-2">
                            <div className="rounded-md border border-white/10 bg-white/[0.03] p-2">
                              <div className="h-2 w-1/2 rounded bg-emerald-200/40" />
                              <div className="mt-2 h-2 w-full rounded bg-white/10" />
                            </div>
                            <div className="rounded-md border border-white/10 bg-white/[0.02] p-2">
                              <div className="grid h-full grid-cols-3 gap-2">
                                <div className="rounded bg-white/10" />
                                <div className="rounded bg-emerald-300/20" />
                                <div className="rounded bg-white/10" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {index === 2 ? (
                        <div className="mt-3 h-40 rounded-lg border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-3">
                          <div className="grid h-full grid-cols-2 gap-2">
                            <div className="rounded-md border border-white/10 bg-white/[0.03] p-2">
                              <div className="h-2 w-3/5 rounded bg-emerald-200/40" />
                              <div className="mt-2 grid grid-cols-2 gap-1.5">
                                <div className="h-8 rounded bg-white/10" />
                                <div className="h-8 rounded bg-white/10" />
                                <div className="col-span-2 h-10 rounded bg-white/10" />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <div className="rounded-md border border-white/10 bg-white/[0.03]" />
                              <div className="rounded-md border border-white/10 bg-white/[0.03]" />
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{project.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{project.summary}</p>
                  <div className="mt-3 space-y-1.5">
                    {project.preview.slice(0, 2).map((line) => (
                      <p key={line} className="text-xs text-slate-400">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-1 text-xs text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.links.map((link) =>
                      link.href ? (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.href.startsWith("#") ? undefined : "_blank"}
                          rel={link.href.startsWith("#") ? undefined : "noreferrer"}
                          className="inline-flex h-10 items-center rounded-lg border border-white/12 bg-white/[0.03] px-4 text-sm text-slate-100 transition hover:bg-white/[0.08]"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <span
                          key={link.label}
                          className="inline-flex h-10 items-center rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm text-slate-400"
                        >
                          {`${link.label} (${t.projects.comingSoon.toLowerCase()})`}
                        </span>
                      ),
                    )}
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </motion.div>
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
            className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-5"
          >
            {skillsForRender.map((group, index) => (
              <Reveal key={group.title} delay={0.02 * index}>
                <motion.article
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -8, scale: 1.012 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className={`${cardStyles} group relative h-full min-h-[250px] overflow-hidden p-5`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                    <div className="absolute -left-12 -top-14 h-36 w-36 rounded-full bg-emerald-400/18 blur-3xl" />
                    <div className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-emerald-500/14 blur-3xl" />
                  </div>
                  <div className="relative">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
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

                    <div className="mt-4 grid content-start gap-2.5">
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
            {t.experience.items.map((item, index) => (
              <Reveal key={item.company} delay={0.03 * index}>
                <motion.article
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -4 }}
                  className={`${cardStyles} h-full p-6`}
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item.company}</h3>
                  <p className="mt-1 text-sm text-emerald-100/90">{item.role}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {item.highlights.map((highlight) => (
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="mt-8 grid gap-4 md:grid-cols-2"
          >
            {t.education.items.map((item, index) => (
              <Reveal key={item.title} delay={0.03 * index}>
                <motion.article
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -4 }}
                  className={`${cardStyles} p-5`}
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{item.type}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{item.institution}</p>
                </motion.article>
              </Reveal>
            ))}
          </motion.div>
        </section>

        <section id="contact" className="scroll-mt-28 py-16">
          <Reveal>
            <div className={`${cardStyles} p-6 sm:p-8`}>
              <SectionHeading
                eyebrow={t.contact.heading}
                title={t.contact.title}
                description={t.contact.description}
              />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="mt-8 flex flex-col gap-3"
              >
                <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-2">
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
                </motion.div>
                <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
                  <a
                    href={`mailto:${t.contact.email}`}
                    className="inline-flex h-11 items-center rounded-xl bg-emerald-300 px-5 text-sm font-semibold text-black transition hover:bg-emerald-200"
                  >
                    {t.navActions.contact}
                  </a>
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
                  <CvButton label={t.navActions.downloadCv} className="h-11 rounded-xl px-5 py-0" />
                </motion.div>
              </motion.div>
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
