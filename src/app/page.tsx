"use client";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#0A0F1A] text-white">
      {/* background vignettes */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-[280px] -left-[220px] h-[720px] w-[720px] rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(14,165,233,.7), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_70%_0%,rgba(14,165,233,.10),transparent_60%)]" />
      </div>

      {/* header pill nav */}
      <header className="relative flex justify-center py-6">
        <nav className="flex w-full max-w-6xl items-center justify-between rounded-full bg-gradient-to-r from-[#1a1f27] via-[#1f2937] to-[#0A0F1A] px-5 py-3 shadow-lg ring-1 ring-white/10 backdrop-blur-md">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/gydelogo.png" // place the image in public/gydelogo.png
              alt="GydeXP Logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-sm font-semibold">GydeXP</span>
          </div>

          {/* Nav links */}
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

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="text-sm font-medium text-white/80 hover:text-white"
            >
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

      {/* hero section */}
      <main className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-24 pt-6 md:grid-cols-[1.1fr_0.9fr] md:px-8">
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

          <div className="mt-8">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5-5 5M6 12h12"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* right image (glass cube from /public) */}
        <div className="relative">
          <div className="absolute -inset-10 rounded-3xl bg-cyan-400/20 blur-2xl opacity-60 md:opacity-40" />
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <Image
              src="/glasscube.png"
              alt="Glass Cube"
              fill
              priority
              sizes="(min-width: 1024px) 520px, (min-width: 768px) 420px, 80vw"
              className="object-contain drop-shadow-[0_24px_70px_rgba(34,211,238,.35)]"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
