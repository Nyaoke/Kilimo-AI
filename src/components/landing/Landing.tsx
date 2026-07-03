import Link from "next/link";
import { getConversationCount } from "@/lib/conversations";
import { isDemoMode } from "@/lib/demo";

export async function Landing() {
  const demo = isDemoMode();
  let questionCount = 0;
  try {
    questionCount = await getConversationCount();
  } catch {
    questionCount = 0;
  }

  const whatsappLink =
    process.env.NEXT_PUBLIC_WHATSAPP_LINK ?? "https://wa.me/14155238886";

  return (
    <div className="min-h-screen bg-paper text-loam">
      {demo && (
        <div className="border-b border-murram/30 bg-murram/10 px-6 py-2 text-center font-mono text-xs text-murram-dark">
          Demo mode: in-memory KB and sample conversations. Add API keys in .env.local for live Claude + Supabase.
        </div>
      )}
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero */}
        <section className="hero-saas mb-20 rounded-2xl border border-line bg-paper-2/60 px-8 py-14 shadow-[0_1px_0_0_color-mix(in_srgb,var(--line)_60%,transparent),0_24px_64px_-32px_color-mix(in_srgb,var(--loam)_12%,transparent)] md:px-12 md:py-16">
          <div className="hero-saas-grid" aria-hidden="true" />
          <div className="hero-saas-dots" aria-hidden="true" />
          <div className="hero-saas-ring" aria-hidden="true" />
          <div className="hero-saas-ring-inner" aria-hidden="true" />
          <div className="hero-saas-glow-murram" aria-hidden="true" />
          <div className="hero-saas-glow-sky" aria-hidden="true" />
          <div className="hero-saas-glow-growth" aria-hidden="true" />
          <div className="hero-saas-fade" aria-hidden="true" />

          <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line/80 bg-paper/80 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-muted backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-growth" />
            Live on WhatsApp
          </div>

          <h1 className="mb-6 font-display text-4xl font-semibold leading-tight md:text-5xl">
            A patient agronomist in every farmer&apos;s pocket.
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-muted">
            Kilimo AI answers smallholder farming questions on WhatsApp in
            English and Swahili, grounded in Kenyan agronomy sources, with every
            answer cited and every low-confidence reply handed to a person, not
            guessed at.
          </p>

          <div className="mb-8 flex flex-wrap gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-murram px-6 py-3 font-display text-sm font-medium text-paper transition-colors hover:bg-murram-dark"
            >
              Try it on WhatsApp
            </a>
            <Link
              href="/admin"
              className="rounded-md border border-line bg-paper-2 px-6 py-3 font-display text-sm font-medium text-loam transition-colors hover:border-murram"
            >
              View the dashboard
            </Link>
          </div>

          <p className="font-mono text-sm text-muted">
            {questionCount} questions answered so far
          </p>
          </div>
        </section>

        {/* Pipeline */}
        <section className="mb-20 border-t border-line pt-16">
          <h2 className="mb-10 font-display text-2xl font-semibold">
            What happens to a question
          </h2>
          <div className="grid grid-cols-4 gap-3 md:gap-6">
            {[
              { num: "01", title: "Ask", desc: "Farmer sends a question over WhatsApp in English or Swahili." },
              { num: "02", title: "Retrieve", desc: "The question is embedded and matched against 30 curated KB entries." },
              { num: "03", title: "Ground", desc: "Claude answers only from retrieved context, with source citations." },
              { num: "04", title: "Escalate", desc: "Low-confidence answers route to a human agronomist queue." },
            ].map((step) => (
              <div key={step.num} className="border-l-2 border-line pl-3 md:pl-4">
                <span className="font-mono text-xs font-medium text-murram md:text-sm">
                  {step.num}
                </span>
                <h3 className="mt-1 font-display text-sm font-semibold md:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted md:mt-2 md:text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust cards */}
        <section className="mb-20 border-t border-line pt-16">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Retrieval-grounded",
                desc: "Every answer is built from curated Kenyan agronomy sources, not model memory.",
              },
              {
                title: "Evaluated, not vibes",
                desc: "25 golden test cases run on every eval, scored by an LLM judge with a strict rubric.",
              },
              {
                title: "Human in the loop",
                desc: "Low-confidence responses escalate instead of guessing at facts that could cost a season.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-line bg-paper-2 p-6"
              >
                <h3 className="mb-2 font-display text-base font-semibold">
                  {card.title}
                </h3>
                <p className="text-sm text-muted">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founder note */}
        <section className="mb-20 border-t border-line pt-16">
          <h2 className="mb-6 font-display text-2xl font-semibold">
            Why I built this
          </h2>
          <div className="space-y-4 text-muted">
            <p>
              Most farmer chatbots are thin wrappers around a general-purpose LLM
              that will happily invent a pesticide dose when it does not know the
              answer. That is worse than useless when a wrong answer can cost a
              farmer an entire season. Kilimo AI is built the other way:
              retrieval first, citations always, and a human handoff when the
              system is not confident.
            </p>
            <p>
              This is a demo proving the architecture pattern that makes AI safe
              to point at a million smallholder farmers. A real deployment would
              need 500+ agronomist-reviewed KB entries, dual-graded evals, and
              integration with a farmer system of record.
            </p>
          </div>
        </section>

        <footer className="border-t border-line pt-8 font-mono text-xs text-muted">
          <p>Kilimo AI</p>
          <p className="mt-1">Built with Claude, Twilio, and pgvector</p>
        </footer>
      </main>
    </div>
  );
}
