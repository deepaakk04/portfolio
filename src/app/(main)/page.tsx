import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import WordRotate from "@/components/magicui/word-rotate";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { GlobeIcon, DownloadIcon } from "lucide-react";
import RetroGrid from "@/components/magicui/retro-grid";
import HyperText from "@/components/magicui/hyper-text";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { ContactForm } from "@/components/contact-form";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="relative flex flex-col min-h-[100dvh] space-y-8">
      <RetroGrid className="fixed inset-0 -z-10" />
      <section id="hero">
        <div className="mx-auto w-full max-w-7xl space-y-8 flex flex-col justify-start relative">
          <div className="gap-10 flex flex-col md:flex-row items-center justify-center w-full">
            <div className="flex-col flex flex-1 space-y-6 md:text-left text-center items-center md:items-start">
              <div className="flex items-center gap-5">
                <span className="text-5xl font-bold tracking-tight sm:text-7xl xl:text-8xl/none">
                  Hi, I&apos;m
                </span>
                <HyperText
                  className="text-5xl font-bold tracking-tight sm:text-7xl xl:text-8xl/none text-primary"
                  text={DATA.name.split(" ")[0].toUpperCase()}
                  duration={1200}
                />
              </div>
              <div className="flex items-center gap-2 text-2xl md:text-4xl">
                <span>I am a</span>
                <WordRotate
                  className="font-bold text-black dark:text-white"
                  words={["Technology Consultant", "Product Manager", "Technical Project Manager", "Business Analyst"]}
                />
              </div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 text-sm md:text-lg text-muted-foreground font-medium max-w-[650px]">
                  {DATA.description.split(" | ").map((text, i) => (
                    <span key={text} className="flex items-center gap-3">
                      {i > 0 && <span className="size-1 rounded-full bg-primary/40 block"></span>}
                      <span className="text-foreground/80">{text.trim()}</span>
                    </span>
                  ))}
                </div>
              </BlurFade>
              <div className="flex flex-col md:flex-row gap-6 pt-4 pb-8">
                <ContactForm
                  trigger={
                    <ShimmerButton
                      className="w-full md:w-auto px-8 h-12 text-sm lg:text-base font-medium"
                      background="hsl(var(--foreground))"
                      shimmerColor="hsl(var(--background))"
                    >
                      <span className="z-10 text-background">Get in Touch</span>
                    </ShimmerButton>
                  }
                />
                <Link href="/resume.pdf" target="_blank" prefetch={false} className="w-full md:w-auto">
                  <ShimmerButton
                    className="w-full md:w-auto px-8 h-12 text-sm lg:text-base font-medium"
                    background="hsl(var(--foreground))"
                    shimmerColor="hsl(var(--background))"
                  >
                    <span className="flex items-center gap-2 z-10 text-background">
                      Download Resume
                      <DownloadIcon className="size-4" />
                    </span>
                  </ShimmerButton>
                </Link>
              </div>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-64 md:size-80 md:-mt-14 border-4 border-white dark:border-black shadow-2xl">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover object-[50%_40%] scale-100" />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about" className="mt-12 px-8 md:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="flex items-center w-full mb-8">
              <div className="inline-flex items-center justify-center rounded-full bg-background border-2 border-primary/20 shadow-sm px-6 py-2 transition-all hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5">
                <span className="text-lg font-bold text-foreground">About Me</span>
              </div>
              <div className="ml-4 h-[2px] flex-1 bg-primary/20" />
              <div className="size-3 rounded-full border-2 border-primary/20 bg-background" />
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans text-lg text-muted-foreground dark:prose-invert text-justify">
              <div className="not-prose flex flex-wrap items-center gap-x-1.5 mb-4 text-lg text-muted-foreground">
                <span className="leading-tight">I am a</span>
                <WordRotate
                  className="font-bold text-foreground m-0 p-0 leading-tight"
                  words={[
                    "Technology Consultant",
                    "Product Manager",
                    "Technical Project Manager",
                    "Business Analyst",
                  ]}
                />
                <span className="leading-tight">and MBA Candidate with a deep foundation in <strong className="font-bold text-foreground">Data Engineering</strong> and <strong className="font-bold text-foreground">Computer Science</strong>.</span>
              </div>
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work" className="px-8 md:px-12">
        <div className="mx-auto w-full max-w-7xl flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="space-y-2">
              <div className="flex items-center w-full mb-8">
                <div className="inline-flex items-center justify-center rounded-full bg-background border-2 border-primary/20 shadow-sm px-6 py-2 transition-all hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5">
                  <span className="text-lg font-bold text-foreground">Work Experience</span>
                </div>
                <div className="ml-4 h-[2px] flex-1 bg-primary/20" />
                <div className="size-3 rounded-full border-2 border-primary/20 bg-background" />
              </div>
              <h2 className="text-3xl font-bold mb-4">My professional journey</h2>
              <p className="text-muted-foreground">
                I&apos;ve had the privilege of working with some amazing companies and teams.
              </p>
            </div>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education" className="px-8 md:px-12">
        <div className="mx-auto w-full max-w-7xl flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <div className="space-y-2">
              <div className="flex items-center w-full mb-8">
                <div className="inline-flex items-center justify-center rounded-full bg-background border-2 border-primary/20 shadow-sm px-6 py-2 transition-all hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5">
                  <span className="text-lg font-bold text-foreground">Education</span>
                </div>
                <div className="ml-4 h-[2px] flex-1 bg-primary/20" />
                <div className="size-3 rounded-full border-2 border-primary/20 bg-background" />
              </div>
              <h2 className="text-3xl font-bold mb-4">My academic journey</h2>
              <p className="text-muted-foreground">
                A strong foundation in engineering and management that drives my problem-solving approach.
              </p>
            </div>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="leadership" className="px-8 md:px-12">
        <div className="mx-auto w-full max-w-7xl flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 8.5}>
            <div className="space-y-2">
              <div className="flex items-center w-full mb-8">
                <div className="inline-flex items-center justify-center rounded-full bg-background border-2 border-primary/20 shadow-sm px-6 py-2 transition-all hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5">
                  <span className="text-lg font-bold text-foreground">Leadership</span>
                </div>
                <div className="ml-4 h-[2px] flex-1 bg-primary/20" />
                <div className="size-3 rounded-full border-2 border-primary/20 bg-background" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Roles & Responsibilities</h2>
              <p className="text-muted-foreground">
                Positions of responsibility where I learned to lead and serve.
              </p>
            </div>
          </BlurFade>
          {DATA.leadership.map((role, id) => (
            <BlurFade
              key={role.company}
              delay={BLUR_FADE_DELAY * 9 + id * 0.05}
            >
              <ResumeCard
                key={role.company}
                logoUrl={role.logoUrl}
                altText={role.company}
                title={role.company}
                subtitle={role.title}
                href={role.href}
                badges={role.badges}
                period={`${role.start} - ${role.end ?? "Present"}`}
                description={role.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills" className="px-8 md:px-12">
        <div className="mx-auto w-full max-w-7xl flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <div className="space-y-2">
              <div className="flex items-center w-full mb-8">
                <div className="inline-flex items-center justify-center rounded-full bg-background border-2 border-primary/20 shadow-sm px-6 py-2 transition-all hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5">
                  <span className="text-lg font-bold text-foreground">Skills</span>
                </div>
                <div className="ml-4 h-[2px] flex-1 bg-primary/20" />
                <div className="size-3 rounded-full border-2 border-primary/20 bg-background" />
              </div>
              <h2 className="text-3xl font-bold mb-4">My technical arsenal</h2>
              <p className="text-muted-foreground">
                I constantly learn and adapt to new technologies to build better products.
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DATA.skillGroups.map((group) => (
                <div
                  key={group.title}
                  className="group relative rounded-xl border border-border bg-card p-5 space-y-3 shadow-sm hover:shadow-lg hover:border-foreground/20 transition-all duration-300"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {group.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-md border border-border bg-muted/60 px-2.5 py-1 text-[13px] font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="projects" className="px-4 md:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-8 py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="space-y-2">
              <div className="flex items-center w-full mb-8">
                <div className="inline-flex items-center justify-center rounded-full bg-background border-2 border-primary/20 shadow-sm px-6 py-2 transition-all hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5">
                  <span className="text-lg font-bold text-foreground">Projects</span>
                </div>
                <div className="ml-4 h-[2px] flex-1 bg-primary/20" />
                <div className="size-3 rounded-full border-2 border-primary/20 bg-background" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Check out my latest work</h2>
              <p className="text-muted-foreground">
                I&apos;ve worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
              </p>
            </div>
          </BlurFade>
          <BentoGrid className="mx-auto grid-cols-1 md:grid-cols-2 gap-6">
            {DATA.projects.map((project: any, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <BentoCard
                  name={project.title}
                  className="h-full"
                  background={
                    project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover opacity-10 transition-all duration-300 group-hover:opacity-20"
                      />
                    ) : project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-contain p-8 opacity-5 transition-all duration-300 group-hover:opacity-10"
                      />
                    ) : null
                  }
                  Icon={GlobeIcon}
                  description={project.description}
                  href={project.href || "#"}
                  cta={project.links?.[0]?.type || "View Project"}
                />
              </BlurFade>
            ))}
          </BentoGrid>
        </div>
      </section>
      <section id="competitions" className="px-4 md:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-8 py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="space-y-2">
              <div className="flex items-center w-full mb-8">
                <div className="inline-flex items-center justify-center rounded-full bg-background border-2 border-primary/20 shadow-sm px-6 py-2 transition-all hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5">
                  <span className="text-lg font-bold text-foreground">Case Competitions</span>
                </div>
                <div className="ml-4 h-[2px] flex-1 bg-primary/20" />
                <div className="size-3 rounded-full border-2 border-primary/20 bg-background" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Strategic Thinking</h2>
              <p className="text-muted-foreground">
                I actively participate in national-level case competitions to sharpen my strategic thinking and problem-solving skills. Competing against top B-schools allows me to apply business acumen to real-world challenges.
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project: any, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <footer id="contact" className="w-full pt-12 pb-4 border-t bg-muted/40">
        <div className="mx-auto w-full max-w-7xl px-8 md:px-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-5xl font-bold tracking-tight sm:text-6xl text-foreground pb-2 leading-tight">
                  Let&apos;s build something together.
                </h2>
                <p className="max-w-[600px] text-muted-foreground text-xl">
                  I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
                <Link href={`mailto:${DATA.contact.email}`} className="inline-block">
                  <ShimmerButton className="shadow-2xl" background="hsl(var(--foreground))" shimmerColor="hsl(var(--background))">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:text-black lg:text-lg">
                      Say Hello 👋
                    </span>
                  </ShimmerButton>
                </Link>
              </div>

              <div className="flex flex-col justify-end space-y-8 lg:items-end">
                <div className="flex gap-4">
                  {Object.entries(DATA.contact.social)
                    .filter(([_, social]) => social.navbar)
                    .map(([name, social]) => (
                      <Link
                        key={name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex size-12 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg"
                      >
                        <social.icon className="size-5" />
                      </Link>
                    ))}
                </div>
                <p className="text-base text-muted-foreground">
                  © {new Date().getFullYear()} {DATA.name}. All rights reserved.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </footer>
    </main >
  );
}
