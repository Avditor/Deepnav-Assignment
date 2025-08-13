"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import {
  PanelLeft,
  CloudOff,
  Moon,
  Users,
  Instagram,
  Youtube,
} from "lucide-react";

/* Simple inline Discord glyph */
function IconDiscord(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.369A18.06 18.06 0 0015.89 3c-.2.36-.43.85-.59 1.23a16.2 16.2 0 00-6.6 0A9.8 9.8 0 008.11 3c-1.57.27-3.05.74-4.43 1.37C1.54 7.26.97 10.02 1.1 12.73c1.86 1.39 3.66 2.24 5.41 2.8.41-.57.78-1.18 1.11-1.82-.61-.23-1.2-.5-1.76-.82.15-.11.3-.23.45-.36 3.38 1.59 7.06 1.59 10.43 0 .15.13.3.25.45.36-.56.32-1.15.6-1.76.82.33.64.7 1.25 1.11 1.82 1.76-.56 3.57-1.41 5.42-2.8.23-4.16-1.04-7.19-2.15-8.36zM9.1 12.82c-.87 0-1.58-.8-1.58-1.78s.71-1.78 1.58-1.78c.88 0 1.59.8 1.59 1.78s-.71 1.78-1.59 1.78zm5.8 0c-.87 0-1.58-.8-1.58-1.78s.71-1.78 1.58-1.78 1.59.8 1.59 1.78-.71 1.78-1.59 1.78z" />
    </svg>
  );
}

/* Interactive cube */
function InteractiveCube() {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = x / r.width;
      const py = y / r.height;
      const rotY = (px - 0.5) * 30;
      const rotX = (0.5 - py) * 22;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", rotX.toFixed(2) + "deg");
        el.style.setProperty("--ry", rotY.toFixed(2) + "deg");
        el.style.setProperty("--mx", (px * 100).toFixed(2) + "%");
        el.style.setProperty("--my", (py * 100).toFixed(2) + "%");
      });
    };
    const onLeave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [prefersReduced]);

  return (
    <div className="relative">
      <div className="absolute -inset-10 rounded-3xl bg-cyan-400/20 blur-2xl opacity-60 md:opacity-40" />
      <div
        ref={ref}
        className="group relative mx-auto w-full max-w-[520px] aspect-square [perspective:1000px]"
        style={{ "--rx": "0deg", "--ry": "0deg" } as React.CSSProperties}
      >
        <div
          className="relative h-full w-full rounded-3xl border border-white/10
            shadow-[0_24px_70px_rgba(34,211,238,.35)]
            transition-transform duration-300 will-change-transform
            [transform-style:preserve-3d]"
          style={{ transform: "rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              background:
                "radial-gradient(360px 260px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.18), transparent 60%)",
            }}
          />
          <Image
            src="/glasscube.png"
            alt="Interactive glass cube"
            fill
            sizes="(min-width: 1024px) 520px, (min-width: 768px) 420px, 80vw"
            className="object-contain rounded-3xl"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0) 40%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0A0F1A] text-white relative">
      {/* Helpers */}
      <style>{`
        /* Header logo – simple scale on hover */
        .logo-zoom img { transition: transform 220ms ease; will-change: transform; }
        .logo-zoom:hover img { transform: scale(1.18); }
        @media (prefers-reduced-motion: reduce) {
          .logo-zoom:hover img { transform: none; }
        }

        /* Section 10 – smoother horizontal wiggle on hover */
        @keyframes wiggle-smooth {
          0%   { transform: translate3d(-6px,0,0); }
          25%  { transform: translate3d(-2px,0,0); }
          50%  { transform: translate3d(6px,0,0); }
          75%  { transform: translate3d(2px,0,0); }
          100% { transform: translate3d(-6px,0,0); }
        }
        .wiggle-wrap:hover .wiggle-target {
          animation: wiggle-smooth 3.2s cubic-bezier(.45,.05,.2,.99) infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .wiggle-wrap:hover .wiggle-target { animation: none; }
        }
      `}</style>

      {/* GLOBAL BACKDROP */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-[28vw] -left-[22vw] h-[90vw] w-[90vw] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(closest-side, rgba(14,165,233,.65), transparent 60%)" }}
        />
        <div
          className="absolute -top-[18vw] right-[-10vw] h-[52vw] w-[52vw] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(closest-side, rgba(56,189,248,.35), transparent 65%)" }}
        />
      </div>

      {/* HEADER */}
      <header className="relative flex justify-center py-6">
        <nav className="flex w-full max-w-6xl items-center justify-between rounded-full bg-gradient-to-r from-[#151923] via-[#1b2430] to-[#0A0F1A] px-5 py-3 shadow-lg ring-1 ring-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="logo-zoom inline-flex">
              <Image src="/gydelogo.png" alt="GydeXP Logo" width={28} height={28} />
            </span>
            <span className="text-sm font-semibold">GydeXP</span>
          </div>
          <div className="flex items-center gap-6">
            {["Tracking Studio", "About Us", "Pricing", "Experiences", "DreamXP"].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className={`text-sm font-medium transition hover:text-white/90 ${
                  idx === 0 ? "text-white font-semibold" : "text-white/70"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm font-medium text-white/80 hover:text-white">
              Log In
            </a>
            <a
              href="#"
              className="rounded-full bg-gradient-to-r from-sky-500 to-blue-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md hover:opacity-90 transition"
            >
              Book a Demo
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <main className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-10 pt-4 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <section className="max-w-xl">
          <h1 className="text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl">
            The issue tracking
            <br />
            tool you’ll enjoy using.
          </h1>

          <p className="mt-6 text-base leading-7 text-white/70">
            Linear helps streamline software projects, sprints, tasks and bug tracking. It’s built
            for high-performance teams.
          </p>

          <div className="mt-8 flex items-center">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(14,165,233,.45)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(14,165,233,.55)]"
            >
              Start Your Free Trial
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </a>
          </div>
        </section>

        {/* Interactive cube */}
        <InteractiveCube />
      </main>

      {/* MAIL IMAGE SECTION – clean + hover glow (no grids/backplates) */}
      <section id="mail-section" className="relative mx-auto max-w-7xl px-6 md:px-8 pb-24 pt-0">
        <div className="relative z-10 mx-auto flex items-center justify-center">
          <div className="group relative w-full max-w-[968px] mt-[20%]">
            {/* soft cyan→blue glow appears only on hover */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 scale-95 blur-2xl transition-all duration-500 ease-out
                         group-hover:opacity-100 group-hover:scale-110"
              style={{
                background:
                  "radial-gradient(65% 65% at 50% 50%, rgba(56,189,248,.45) 0%, rgba(59,130,246,.38) 40%, rgba(14,165,233,.28) 70%, transparent 100%)",
                boxShadow:
                  "0 30px 120px rgba(56,189,248,.25), 0 12px 48px rgba(14,165,233,.20)",
              }}
            />
            <div className="relative w-full aspect-[8/5] transform-gpu transition-transform duration-500 group-hover:scale-[1.03]">
              <Image
                src="/mailimage.png"
                alt="Mail interface"
                fill
                sizes="(min-width:1280px) 968px, (min-width:768px) 70vw, 88vw"
                className="object-contain rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM SECTION (logos) */}
      <section className="mt-16 md:mt-24 w-full bg-black py-10 flex flex-col items-center justify-center border-t border-white/10">
        <h2
          className="text-0.5xl sm:text-0.5xl font-normal tracking-tight uppercase"
          style={{ color: "#3A89FF", fontFamily: "Inter, sans-serif" }}
        >
          POWERING THE NEXT GENERATION OF COMPANIES
        </h2>
        <div className="mt-10 flex flex-col items-center gap-8 w-full px-6">
          <Image src="/firstlinelogo.png" alt="First Line Logo" width={1920} height={300} className="object-contain w-full" />
          <Image src="/secondlinelogo.png" alt="Second Line Logo" width={1920} height={300} className="object-contain w-full" />
        </div>
      </section>

      {/* COLORED GAP EXTENSION */}
      <div style={{ backgroundColor: "#1C1D1F", height: "80px" }} />

      {/* PROFESSIONAL TOOL SECTION */}
      <section
        className="w-full py-24 md:py-28 flex flex-col items-center justify-center text-center px-6 md:px-8"
        style={{ backgroundColor: "#1C1D1F", fontFamily: "Inter, sans-serif" }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white max-w-2xl">
          An experience you’d expect from a professional tool.
        </h2>
        <p className="mt-4 text-lg sm:text-xl font-bold" style={{ color: "#A7A9BE" }}>
          Opinionated and designed for daily use.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto items-stretch [perspective:1000px] mb-24 md:mb-32">
          {[
            {
              subtitle: "Built for speed",
              desc: "Synchronized in real-time across all users. No spinners or waiting.",
              icon: (
                <div
                  className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center px-3 py-2 shadow-[0_8px_30px_rgba(255,255,255,.07)]"
                  style={{ color: "#5E6AD2", fontSize: "1.3rem", fontWeight: "bold" }}
                >
                  {"< 100ms"}
                </div>
              ),
            },
            {
              subtitle: "Keyboard first design",
              desc: "Optimized for efficiency with extensive keyboard shortcuts.",
              icon: (
                <div
                  className="h-12 w-12 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center text-2xl shadow-[0_8px_30px_rgba(255,255,255,.07)]"
                  style={{ color: "#5E6AD2" }}
                >
                  ⌘
                </div>
              ),
            },
            {
              subtitle: "For software teams",
              desc: "Created by software people for software product teams.",
              icon: (
                <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center p-2 shadow-[0_8px_30px_rgba(255,255,255,.07)]">
                  <PanelLeft color="#5E6AD2" size={32} />
                </div>
              ),
            },
            {
              subtitle: "Works offline",
              desc: "Access and make changes with or without internet access.",
              icon: (
                <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center p-2 shadow-[0_8px_30px_rgba(255,255,255,.07)]">
                  <CloudOff color="#5E6AD2" size={32} />
                </div>
              ),
            },
            {
              subtitle: "Light and dark UI",
              desc: "We have multiple themes. Use light or dark, your choice.",
              icon: (
                <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center p-2 shadow-[0_8px_30px_rgba(255,255,255,.07)]">
                  <Moon color="#5E6AD2" size={32} />
                </div>
              ),
            },
            {
              subtitle: "Multiple teams",
              desc: "Have all your teams in one shared workspace.",
              icon: (
                <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center p-2 shadow-[0_8px_30px_rgba(255,255,255,.07)]">
                  <Users color="#5E6AD2" size={32} />
                </div>
              ),
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl relative z-10 flex flex-col justify-between h-full transition-[transform,background-color] duration-300 hover:bg-[#323234] transform-gpu will-change-transform hover:[transform:rotateX(3deg)_rotateY(-2deg)_translateY(-2px)]"
              style={{ backgroundColor: "#27272A", position: "relative", isolation: "isolate", minHeight: "220px" }}
            >
              <div className="mb-3 flex justify-center">{card.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{card.subtitle}</h3>
              <p className="text-base font-medium" style={{ color: "#A7A9BE" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION FIVE */}
      <section
        id="section-five"
        className="group relative w-full overflow-hidden py-24 md:py-32 min-h-[760px] md:min-h-[820px]"
        aria-label="Section Five"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="absolute inset-x-0 -top-0.5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[72vw] md:w-[58vw] lg:w-[50vw] flex items-center justify-end overflow-visible">
          <div className="relative w-full h-[90%] max-h-[540px] md:max-h-[612px] overflow-visible">
            <div
              className="absolute inset-0 origin-right transform-gpu will-change-transform transition-transform duration-500 ease-out
                         translate-x-[7%] scale-[0.936]
                         group-hover:translate-x-[4%] group-hover:scale-[1.014]"
            >
              <Image
                src="/sectionfive.png"
                alt="Interface screenshot"
                fill
                sizes="100vw"
                className="object-contain object-right drop-shadow-[0_20px_80px_rgba(14,165,233,.25)]"
                priority
              />
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="max-w-xl min-h-[540px] md:min-h-[612px] flex flex-col justify-center">
              <h3 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                Interface,<br />streamlined.
              </h3>
              <p className="mt-6 text-base leading-7 text-white/80">
                <span className="font-semibold text-white">Robust.</span> Fast to navigate. Create
                <br />
                issues in seconds. Add priorities,
                <br />
                labels and estimates.
              </p>
              <p className="mt-5 text-base leading-7 text-white/80">
                <span className="font-semibold text-white">List and board.</span> See your issues in
                <br />
                either a list or board view.
              </p>
            </div>
            <div className="hidden md:block" />
          </div>
        </div>
      </section>

      {/* SECTION SIX */}
      <section
        id="section-six"
        className="w-full"
        style={{ backgroundColor: "#1C1D1F", fontFamily: "Inter, sans-serif" }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="pt-16 pb-8 flex flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-3 [perspective:1200px]">
              {["⌘", "K"].map((k, i) => (
                <span
                  key={i}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#353639] text-white border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,.35)] text-xl cursor-default transform-gpu will-change-transform transition-transform duration-500 hover:[transform:translateZ(120px)_scale(1.15)]"
                  aria-hidden="true"
                >
                  {k}
                </span>
              ))}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Meet your command line
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              Any action can be accessed and completed in seconds with the
              <br />
              command menu
            </p>
          </div>

          <div className="pb-24 flex justify-center">
            <div className="group relative w-full max-w-5xl aspect-[16/9] [perspective:1200px]">
              <Image
                src="/sectionsix.png"
                alt="Command menu base"
                fill
                sizes="(min-width:1280px) 960px, (min-width:768px) 80vw, 92vw"
                className="object-contain"
                priority
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div
                  className="relative w-[72%] md:w-[60%] aspect-[16/9]
                             transform-gpu transition-transform duration-500 will-change-transform
                             [transform:translateZ(0)]
                             group-hover:[transform:translateZ(64px)_scale(1.06)]
                             drop-shadow-[0_20px_60px_rgba(0,0,0,.35)]"
                >
                  <Image
                    src="/sectionsixb.png"
                    alt="Command menu overlay"
                    fill
                    sizes="(min-width:1280px) 720px, (min-width:768px) 60vw, 80vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION SEVEN */}
      <section
        id="section-seven"
        aria-label="Section Seven"
        className="relative w-full bg-black py-20 md:py-28 overflow-visible"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="group grid w-full grid-cols-1 md:grid-cols-[1.35fr_0.65fr] items-start md:items-center gap-10 md:gap-12 lg:gap-16 mb-16">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-visible mt-24 md:mt-32 mb-[5%]">
            <div className="absolute -inset-14 -z-10 opacity-0 transition-all duration-500 ease-out pointer-events-none group-hover:opacity-100 group-hover:scale-110">
              <div
                className="h-full w-full rounded-[44px] blur-[110px] mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(80% 100% at 10% 50%, rgba(99,102,241,.70) 0%, rgba(59,130,246,.60) 35%, rgba(14,165,233,.48) 70%, transparent 100%)",
                }}
              />
            </div>

            <div
              className="absolute inset-0 origin-left transform-gpu will-change-transform transition-transform duration-500 ease-out
                         -translate-x-[7%] scale-[1.41]
                         group-hover:-translate-x-[5%] group-hover:scale-[1.54]"
            >
              <Image
                src="/sectionsev.png"
                alt="Section seven visual"
                fill
                sizes="100vw"
                className="object-contain object-left w-full h-full drop-shadow-[0_36px_140px_rgba(99,102,241,.50)]"
                priority
              />
            </div>
          </div>

          <div
            className="relative z-10 px-6 md:px-0 lg:px-0 justify-self-start md:justify-self-start max-w-[560px]
                       md:-translate-x-16 lg:-translate-x-24 xl:-translate-x-28"
          >
            <h3 className="text-[26px] sm:text-[30px] md:text-[34px] font-extrabold leading-tight tracking-tight">
              Build team<br />momentum with<br />Cycles
            </h3>

            <p className="mt-5 text-sm sm:text-[15px] leading-7 text-white/80">
              <span className="font-semibold text-white">Velocity and estimates.</span>{" "}
              Track your<br />team’s workload and velocity.
            </p>

            <p className="mt-4 text-sm sm:text-[15px] leading-7 text-white/80">
              <span className="font-semibold text-white">Automated.</span>{" "}
              Cycles run on<br />an automated schedule, so you can<br />focus on your work.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION EIGHT */}
      <section
        id="section-eight"
        className="group relative w-full overflow-hidden py-24 md:py-32 min-h-[760px] md:min-h-[820px]"
        aria-label="Section Eight"
        style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#1C1D1F" }}
      >
        <div className="absolute inset-x-0 -top-0.5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[72vw] md:w-[58vw] lg:w-[50vw] flex items-center justify-end overflow-visible">
          <div className="relative w-full h-[90%] max-h-[540px] md:max-h-[612px] overflow-visible">
            <div
              className="absolute inset-0 origin-right transform-gpu will-change-transform transition-transform duration-500 ease-out
                         translate-x-[7%] scale-[0.983]
                         group-hover:translate-x-[4%] group-hover:scale-[1.065]"
            >
              <Image
                src="/sectioneight.png"
                alt="Section eight visual"
                fill
                sizes="100vw"
                className="object-contain object-right drop-shadow-[0_20px_80px_rgba(14,165,233,.25)]"
                priority
              />
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="max-w-xl min-h-[540px] md:min-h-[612px] flex flex-col justify-center">
              <h3 className="text-[30px] sm:text-[36px] md:text-[42px] font-extrabold leading-tight tracking-tight text-white">
                Set direction<br />with Roadmap
              </h3>
              <p className="mt-5 text-[15px] sm:text-[16px] leading-7 text-white/80">
                <span className="font-semibold text-white">Focus on the big picture.</span><br />
                Set milestones to tie projects to larger<br />
                company goals and motivate your<br />
                team. View all company projects in<br />
                one streamlined view and easily<br />
                identify what needs your attention.
              </p>
            </div>
            <div className="hidden md:block" />
          </div>
        </div>
      </section>

      {/* SECTION NINE */}
      <section
        id="section-nine"
        className="relative w-full bg-black py-24 md:py-32"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="mx-auto max-w-7xl space-y-12 px-6 md:px-8">
          {/* Pair 1 */}
          <div className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden ring-1 ring-white/10 [perspective:1200px]">
            <div className="bg-[#1A1C1C] h-full flex flex-col justify-center p-8 md:p-12">
              {/* PNGs pop & lift on hover */}
              <div className="mb-5 flex items-center [perspective:1000px]">
                <Image
                  src="/icona.png"
                  alt="Integration icon A"
                  width={44}
                  height={44}
                  className="object-contain transform-gpu transition-transform duration-300 hover:[transform:translateZ(24px)_scale(1.1)] hover:-translate-y-1"
                />
                <span className="mx-4 h-12 w-[3px] bg-[#27272A] rounded-full" aria-hidden="true" />
                <Image
                  src="/iconb.png"
                  alt="Integration icon B"
                  width={44}
                  height={44}
                  className="object-contain transform-gpu transition-transform duration-300 hover:[transform:translateZ(24px)_scale(1.1)] hover:-translate-y-1"
                />
                <span className="mx-4 h-12 w-[3px] bg-[#27272A] rounded-full" aria-hidden="true" />
                <Image
                  src="/iconc.png"
                  alt="Integration icon C"
                  width={44}
                  height={44}
                  className="object-contain transform-gpu transition-transform duration-300 hover:[transform:translateZ(24px)_scale(1.1)] hover:-translate-y-1"
                />
              </div>

              <h4 className="text-[20px] md:text-[22px] font-semibold text-white">
                Automate tracking with GitHub, GitLab and Sentry
              </h4>
              <p className="mt-4 text-base md:text-[17px] leading-7 text-white/65">
                Linear integrates with your pull requests<br />and Sentry issues.
              </p>
            </div>
            {/* RIGHT IMAGE pops toward viewer on hover */}
            <div className="p-0 relative">
              <div className="transform-gpu transition-transform duration-500 will-change-transform group-hover:[transform:translateZ(72px)_scale(1.04)]">
                <Image
                  src="/sectionina.png"
                  width={1600}
                  height={1000}
                  alt="Integrations preview A"
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="block w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Pair 2 */}
          <div className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden ring-1 ring-white/10 [perspective:1200px]">
            <div className="bg-[#1A1C1C] h-full flex flex-col justify-center p-8 md:p-12">
              <div className="mb-5 [perspective:1000px]">
                <Image
                  src="/icond.png"
                  alt="Figma integration icon"
                  width={44}
                  height={44}
                  className="object-contain transform-gpu transition-transform duration-300 hover:[transform:translateZ(24px)_scale(1.1)] hover:-translate-y-1"
                />
              </div>

              <h4 className="text-[20px] md:text-[22px] font-semibold text-white">
                Preview and embed full Figma designs in Linear.
              </h4>
              <p className="mt-4 text-base md:text-[17px] leading-7 text-white/65">
                Add Figma links to any issue as you work<br />on your designs.
              </p>
            </div>
            <div className="p-0 relative">
              <div className="transform-gpu transition-transform duration-500 will-change-transform group-hover:[transform:translateZ(72px)_scale(1.04)]">
                <Image
                  src="/sectioninb.png"
                  width={1600}
                  height={1000}
                  alt="Integrations preview B"
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="block w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Pair 3 */}
          <div className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden ring-1 ring-white/10 [perspective:1200px]">
            <div className="bg-[#1A1C1C] h-full flex flex-col justify-center p-8 md:p-12">
              <h4 className="text-[20px] md:text-[22px] font-semibold text-white">
                Get updates and create issues with Slack
              </h4>
              <p className="mt-4 text-base md:text-[17px] leading-7 text-white/65">
                Receive updates directly in your Slack<br />channels and create issues from discussions.
              </p>
            </div>
            <div className="p-0 relative">
              <div className="transform-gpu transition-transform duration-500 will-change-transform group-hover:[transform:translateZ(72px)_scale(1.04)]">
                <Image
                  src="/sectioninc.png"
                  width={1600}
                  height={1000}
                  alt="Integrations preview C"
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="block w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Narrow two-card row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-5 rounded-2xl bg-[#1A1C1C] ring-1 ring-white/10 p-6 min-h-[125px]">
              <Image
                src="/icone.png"
                alt="Zapier replacement icon"
                width={46}
                height={46}
                className="object-contain transform-gpu transition-transform duration-300 hover:[transform:translateZ(18px)_scale(1.06)] hover:-translate-y-1"
              />
              <div className="flex-1">
                <h5 className="text-white font-semibold text-[17px]">
                  Connect with 1000+ tools using Zapier
                </h5>
                <p className="text-white/65 text-sm mt-1">
                  Create new issues based on triggers from<br />Zapier applications.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl bg-[#1A1C1C] ring-1 ring-white/10 p-6 min-h-[125px]">
              <Image
                src="/iconf.png"
                alt="API replacement icon"
                width={46}
                height={46}
                className="object-contain transform-gpu transition-transform duration-300 hover:[transform:translateZ(18px)_scale(1.06)] hover:-translate-y-1"
              />
              <div className="flex-1">
                <h5 className="text-white font-semibold text-[17px]">
                  Custom workflows using our API
                </h5>
                <p className="text-white/65 text-sm mt-1">
                  Query and mutate data using our GraphQL API<br />to build custom workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION TEN */}
      <section
        id="section-ten"
        className="w-full py-24 md:py-28"
        style={{ backgroundColor: "#1C1D1F", fontFamily: "Inter, sans-serif" }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 text-center">
          <h2 className="group text-white text-3xl sm:text-4xl font-extrabold tracking-tight inline-flex items-center justify-center">
            Loved by people product
            <span className="ml-3 inline-block transition-transform duration-300 ease-out group-hover:scale-125 hover:scale-125">
              ❤️
            </span>
          </h2>

          {/* Smoother wiggle on hover */}
          <div className="wiggle-wrap mt-16 md:mt-20 flex justify-center">
            <Image
              src="/sectionten.png"
              alt="Section ten showcase"
              width={1600}
              height={900}
              sizes="(min-width:1280px) 1100px, (min-width:768px) 80vw, 92vw"
              className="w-full h-auto max-w-5xl object-contain wiggle-target"
              priority
            />
          </div>
        </div>
      </section>

      {/* SECTION ELEVEN */}
      <section
        id="section-eleven"
        className="relative w-full bg-[#0B0F16] py-24 md:py-32 overflow-hidden"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 w-[1200px] max-w-[95vw] h-[540px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(37,99,235,.28), rgba(2,6,23,0) 70%)" }}
        />

        <div className="relative mx-auto max-w-6xl px-6 md:px-8 text-center">
          {/* Logo above heading (pops on hover) */}
          <div className="[perspective:1000px] flex justify-center">
            <div className="transform-gpu transition-transform duration-500 hover:[transform:translateZ(36px)_scale(1.08)]">
              <Image
                src="/lunarlogo.png"
                alt="Lunar logo"
                width={56}
                height={56}
                className="rounded-xl object-contain"
                priority
              />
            </div>
          </div>

          {/* Larger heading + paragraph */}
          <h2 className="mt-6 text-white text-4xl sm:text-5xl font-extrabold tracking-tight">
            Get started with Linear today.
          </h2>
          <p className="mt-4 text-white/75 max-w-3xl mx-auto text-lg sm:text-xl">
            Linear keeps everyone aligned and working without friction. Engineers,
            designers, and peers - all collaborating in one tool.
          </p>

          {/* Columns */}
          <div className="mt-28 md:mt-40 mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-14 text-left">
            <div className="justify-self-center sm:justify-self-start">
              <h3 className="text-white font-semibold mb-5 text-lg sm:text-xl">Product</h3>
              <ul className="space-y-3 text-base sm:text-[17px] text-white/80">
                <li><a href="#" className="hover:text-white">Travel Studio</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Reviews</a></li>
              </ul>
            </div>
            <div className="justify-self-center sm:justify-self-center">
              <h3 className="text-white font-semibold mb-5 text-lg sm:text-xl">Others</h3>
              <ul className="space-y-3 text-base sm:text-[17px] text-white/80">
                <li><a href="#" className="hover:text-white">About GydeXP</a></li>
                <li><a href="#" className="hover:text-white">Experiences</a></li>
                <li><a href="#" className="hover:text-white">Dream XP</a></li>
              </ul>
            </div>
            <div className="justify-self-center sm:justify-self-end">
              <h3 className="text-white font-semibold mb-5 text-lg sm:text-xl">Connect with us</h3>
              <ul className="space-y-3 text-base sm:text-[17px] text-white/80">
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">Youtube</a></li>
                <li><a href="#" className="hover:text-white">X</a></li>
              </ul>
            </div>
          </div>

          {/* Divider + bottom bar with aligned, consistent icon sizes */}
          <div className="mt-14 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-base text-white/70">
            <span>©2025 - GydeXP</span>
            <div className="flex items-center gap-5">
              <a href="#" aria-label="Instagram" className="text-white/85 hover:text-white transition">
                <Instagram className="h-8 w-8 sm:h-10 sm:w-10 align-middle" />
              </a>
              <a href="#" aria-label="YouTube" className="text-white/85 hover:text-white transition">
                <Youtube className="h-8 w-8 sm:h-10 sm:w-10 align-middle" />
              </a>
              <a href="#" aria-label="X" className="text-white/85 hover:text-white transition">
                <span className="inline-block align-middle text-2xl sm:text-3xl font-semibold leading-none">X</span>
              </a>
              <a href="#" aria-label="Discord" className="text-white/85 hover:text-white transition">
                <IconDiscord className="h-8 w-8 sm:h-10 sm:w-10 align-middle" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="h-24 md:h-28" />
    </div>
  );
}
