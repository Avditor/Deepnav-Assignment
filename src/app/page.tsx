"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

/** --- tiny interaction: pointer-tilt + glow, no three.js --- */
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
      const px = x / r.width;  // 0..1
      const py = y / r.height; // 0..1

      // map to -15deg..15deg
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
      {/* big soft glow behind */}
      <div className="absolute -inset-10 rounded-3xl bg-cyan-400/20 blur-2xl opacity-60 md:opacity-40" />
      {/* perspective wrapper */}
      <div
        ref={ref}
        className="group relative mx-auto w-full max-w-[520px] aspect-square [perspective:1000px]"
        style={{ "--rx": "0deg", "--ry": "0deg" } as React.CSSProperties}
      >
        {/* 3D card */}
        <div
          className="
            relative h-full w-full rounded-3xl border border-white/10
            shadow-[0_24px_70px_rgba(34,211,238,.35)]
            transition-transform duration-300 will-change-transform
            [transform-style:preserve-3d]
          "
          style={{
            transform: "rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0)",
          }}
        >
          {/* shine that follows mouse */}
          <div
            className="
              pointer-events-none absolute inset-0 rounded-3xl
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
            "
            style={{
              background:
                "radial-gradient(360px 260px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.18), transparent 60%)",
            }}
          />
          {/* image */}
          <Image
            src="/glasscube.png" // change if your file name differs
            alt="Interactive glass cube"
            fill
            sizes="(min-width: 1024px) 520px, (min-width: 768px) 420px, 80vw"
            className="object-contain rounded-3xl"
            priority
          />
          {/* subtle top gloss */}
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
  const scrollToMail = () => {
    const el = document.getElementById("mail-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0A0F1A] text-white relative">
      {/* GLOBAL BACKDROP: vignette + faint grid for cohesion */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-[28vw] -left-[22vw] h-[90vw] w-[90vw] rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(14,165,233,.65), transparent 60%)",
          }}
        />
        <div
          className="absolute -top-[18vw] right-[-10vw] h-[52vw] w-[52vw] rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(closest-side, rgba(56,189,248,.35), transparent 65%)",
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          viewBox="0 0 1440 1024"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M64 0H0V64" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
            <mask id="fade">
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" />
                <stop offset="70%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </linearGradient>
              <rect width="100%" height="100%" fill="url(#grad)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fade)" />
        </svg>
      </div>

      {/* HEADER */}
      <header className="relative flex justify-center py-6">
        <nav className="flex w-full max-w-6xl items-center justify-between rounded-full bg-gradient-to-r from-[#151923] via-[#1b2430] to-[#0A0F1A] px-5 py-3 shadow-lg ring-1 ring-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Image src="/gydelogo.png" alt="GydeXP Logo" width={28} height={28} />
            <span className="text-sm font-semibold">GydeXP</span>
          </div>
          <div className="flex items-center gap-6">
            {["Tracking Studio", "About Us", "Pricing", "Experiences", "DreamXP"].map(
              (item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`text-sm font-medium transition hover:text-white/90 ${
                    idx === 0 ? "text-white font-semibold" : "text-white/70"
                  }`}
                >
                  {item}
                </a>
              )
            )}
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
            Linear helps streamline software projects, sprints, tasks and bug
            tracking. It’s built for high-performance teams.
          </p>

          <div className="mt-8 flex items-center gap-4">
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

            <button
              onClick={scrollToMail}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-white/30 transition"
              aria-label="Scroll to next section"
            >
              Scroll down
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 14a1 1 0 0 1-.7-.3l-5-5a1 1 0 1 1 1.4-1.4L10 11.6l4.3-4.3a1 1 0 0 1 1.4 1.4l-5 5a1 1 0 0 1-.7.3z" />
              </svg>
            </button>
          </div>
        </section>

        {/* Interactive cube without three.js */}
        <InteractiveCube />
      </main>

      {/* CURVED SEPARATOR */}
      <div className="relative">
        <svg className="block w-full h-16 md:h-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        <path d="M0,40 C240,100 480,0 720,40 C960,80 1200,20 1440,60 L1440,120 L0,120 Z" fill="url(#sep)"/>
        </svg>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* MAIL IMAGE SECTION (no heading/desc) */}
      <section id="mail-section" className="relative mx-auto max-w-7xl px-6 md:px-8 pb-24 pt-2 -mt-2">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(780px_360px_at_50%_0%,rgba(14,165,233,.10),transparent_65%)]" />
        <div className="relative z-10 mx-auto flex items-center justify-center">
          <Image
            src="/mailimage.png"
            alt="Mail interface"
            width={1600}
            height={1000}
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 900px, 92vw"
            className="w-full max-w-[1100px] rounded-2xl border border-white/10 shadow-[0_20px_80px_rgba(14,165,233,.25)]"
          />
        </div>
        <div className="pointer-events-none relative mt-14 h-24">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="absolute inset-x-0 top-2 h-20 bg-gradient-to-b from-transparent to-cyan-500/5 blur-2xl" />
        </div>
      </section>

      <div className="h-24 md:h-28" />
    </div>
  );
}
