// app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#070b12] text-white relative overflow-hidden">
      {/* soft vignette + grid lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-56 h-[600px] w-[600px] rounded-full blur-3xl opacity-40"
             style={{ background: "radial-gradient(closest-side, #0ea5e9 0%, transparent 60%)" }} />
        <div className="absolute -bottom-10 inset-x-0 h-56 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M80 0H0V80" fill="none" stroke="rgba(255,255,255,0.08)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Top Nav */}
      <header className="sticky top-0 z-20">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between rounded-full bg-white/5 backdrop-blur border border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-cyan-400" />
              <span className="text-sm font-semibold tracking-wide text-white/90">GydeXP</span>
            </div>

            <ul className="hidden md:flex items-center gap-6 text-sm text-white/70">
              <li className="hover:text-white transition">Tracking Studio</li>
              <li className="hover:text-white transition">About Us</li>
              <li className="hover:text-white transition">Pricing</li>
              <li className="hover:text-white transition">Experiences</li>
              <li className="hover:text-white transition">DreamXP</li>
              <li className="hover:text-white transition">Log In</li>
            </ul>

            <button className="ml-4 inline-flex items-center rounded-full bg-[#0ea5e9] hover:bg-[#0891b2] text-white text-sm font-medium px-4 py-2 shadow-[0_8px_30px_rgba(14,165,233,0.35)]">
              Book a Demo
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <section className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center py-12 lg:py-20">
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              The issue tracking
              <br />
              tool you’ll enjoy using.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/70 max-w-xl">
              Linear helps streamline software projects, sprints, tasks and bug tracking.
              It’s built for high-performance teams.
            </p>

            <div className="mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 transition shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
              >
                Start Your Free Trial
                <span className="inline-block h-5 w-5 rounded-full bg-black text-white grid place-items-center text-[11px]">→</span>
              </a>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            {/* glow behind image */}
            <div
              aria-hidden
              className="absolute -inset-10 rounded-3xl blur-2xl opacity-70"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(14,165,233,0.45) 0%, rgba(2,6,23,0) 65%)",
              }}
            />
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              <Image
                src="/tiles.png"
                alt="Neon blue tiles abstract"
                width={900}
                height={900}
                className="w-full h-auto drop-shadow-[0_30px_80px_rgba(14,165,233,0.45)]"
                priority
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
