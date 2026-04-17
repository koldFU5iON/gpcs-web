import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to the most common questions about GPCS — who it's for, whether it's voluntary, how the C tier works, AI tools and team size, and what happens with bad actors.",
  alternates: { canonical: "https://gpcstandard.org/faq" },
  openGraph: {
    url: "https://gpcstandard.org/faq",
    title: "GPCS FAQ — Common Questions Answered",
    description:
      "Who fills out the form? Does a C rating mean bad? What stops studios from lying? Answers to the questions that come up most.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is GPCS for consumers or for the industry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GPCS is a B2B tool. It is designed for awards bodies, grant programmes, platforms, and publishers that need to make structural decisions about game projects — not for consumers deciding what to buy. A player seeing a GPC rating on a Steam page would be reading it out of context. The intended audience is institutions that currently rely on vague labels to draw eligibility lines.",
      },
    },
    {
      "@type": "Question",
      name: "Is participation voluntary? What stops a studio from lying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Participation is completely voluntary. No one is required to get a GPC rating. For studios that do choose to participate, the system has three verification levels: Unverified (self-reported, low credibility), Verified (public evidence checked — LinkedIn, company registry, press releases), and Audited (third-party CPA review of confidential materials). If a studio submits a false Unverified self-assessment, the rating carries no credibility and no institution should rely on it for anything consequential. The verification layer is specifically designed so that anyone who needs to act on a rating can choose a level of scrutiny appropriate to what's at stake.",
      },
    },
    {
      "@type": "Question",
      name: "Doesn't a C rating make a small studio look bad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. C is not a grade — it is a description. A C-rated project is a solo or micro-team game: exactly the kind of project that wins Independent Games Festival awards, gets Greenlit, and builds careers. The problem GPCS is solving is that right now a solo dev and a 40-person publisher-backed studio both get called 'indie,' which means the solo dev competes directly against the larger team in the same category. A C rating doesn't diminish the work — it puts it in the right company.",
      },
    },
    {
      "@type": "Question",
      name: "Why keep the AAA and indie labels if GPCS is replacing them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GPCS doesn't ban any label. 'AAA' and 'indie' are cultural shorthand and they'll keep being used in press, marketing, and conversation. What GPCS adds is a parallel layer of precision for contexts where vague labels cause real problems — grant eligibility, award categories, platform support tiers. The goal isn't to replace everyday language, it's to give institutions something more rigorous to work with when the stakes require it.",
      },
    },
    {
      "@type": "Question",
      name: "Do AI tools count toward team size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Team size counts people, not tools. A solo developer using AI generation software to produce art assets is still a team of one. GPCS measures production capacity as a function of human labour, infrastructure, and financial resources — because those are the inputs that determine what scale of project is actually achievable. A studio that replaces ten artists with a single artist and a text-to-image pipeline has meaningfully different capacity than a ten-person art department, regardless of output volume.",
      },
    },
    {
      "@type": "Question",
      name: "Who fills out the rating form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically the developer or someone on their team — a producer, studio director, or operations lead. The form asks about the project specifically, not the studio's entire business. For Unverified ratings, there's no external check. For Verified and Audited ratings, a third party reviews the answers against evidence, so accuracy matters. The form currently runs as a demo — results stay in your browser and aren't submitted anywhere.",
      },
    },
    {
      "@type": "Question",
      name: "Who is GPCS aimed at, exactly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Three main groups. Awards bodies that need structured categories — replacing vague 'indie' divisions with capacity-tiered brackets. Grant programmes that need auditable eligibility definitions — so they can say 'this programme is for B/BB projects' and enforce it. Platforms and publishers that want to route projects to the right support tier rather than treating every incoming submission the same way. Developers benefit indirectly: a credible, externally readable rating is a better signal than a press release.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when the standard reaches critical mass?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The current governance model has Devon Stanton maintaining GPCS with community proposals via GitHub Issues. Once GPCS reaches critical mass — target is 200+ classified projects and at least two implementation cycles — governance moves to an advisory board with representation from studios, publishers, platforms, awards bodies, and academic researchers. Major changes would require a supermajority vote (7 of 9). Old ratings are grandfathered with a version label, so nothing breaks when the standard evolves.",
      },
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "Is GPCS for consumers or for the industry?",
    a: (
      <>
        GPCS is a B2B tool. It is designed for awards bodies, grant programmes, platforms, and
        publishers that need to make structural decisions about game projects — not for consumers
        deciding what to buy. A player seeing a GPC rating on a Steam page would be reading it
        out of context. The intended audience is institutions that currently rely on vague labels
        to draw eligibility lines.
      </>
    ),
  },
  {
    q: "Is participation voluntary? What stops a studio from lying?",
    a: (
      <>
        Participation is completely voluntary. No one is required to get a GPC rating. For studios
        that do participate, the system has three verification levels:{" "}
        <strong className="text-gpcs-text">Unverified</strong> (self-reported, low credibility),{" "}
        <strong className="text-gpcs-text">Verified</strong> (public evidence checked — LinkedIn,
        company registry, press releases), and{" "}
        <strong className="text-gpcs-text">Audited</strong> (third-party CPA review of confidential
        materials). If a studio submits a false Unverified self-assessment, the rating carries no
        credibility and no institution should rely on it for anything consequential. The verification
        layer exists precisely so that anyone acting on a rating can choose a level of scrutiny
        appropriate to what&apos;s at stake.
      </>
    ),
  },
  {
    q: "Doesn't a C rating make a small studio look bad?",
    a: (
      <>
        No. C is not a grade — it is a description. A C-rated project is a solo or micro-team game:
        exactly the kind of project that wins Independent Games Festival awards, gets critical
        acclaim, and builds careers. The problem GPCS is solving is that right now a solo dev and
        a 40-person publisher-backed studio both get called &ldquo;indie&rdquo; — which means the
        solo dev competes directly against the larger team in the same category. A C rating
        doesn&apos;t diminish the work. It puts it in the right company.
      </>
    ),
  },
  {
    q: "Why keep the AAA and indie labels if GPCS is replacing them?",
    a: (
      <>
        GPCS doesn&apos;t ban any label. &ldquo;AAA&rdquo; and &ldquo;indie&rdquo; are cultural
        shorthand and they&apos;ll keep being used in press, marketing, and conversation. What GPCS
        adds is a parallel layer of precision for contexts where vague labels cause real problems —
        grant eligibility, award categories, platform support tiers. The goal isn&apos;t to replace
        everyday language; it&apos;s to give institutions something more rigorous to work with when
        the stakes require it.
      </>
    ),
  },
  {
    q: "Do AI tools count toward team size?",
    a: (
      <>
        No. Team size counts people, not tools. A solo developer using AI generation software to
        produce art assets is still a team of one. GPCS measures production capacity as a function
        of human labour, infrastructure, and financial resources — because those are the inputs
        that determine what scale of project is actually achievable. A studio that replaces ten
        artists with one artist and a text-to-image pipeline has meaningfully different capacity
        than a ten-person art department, regardless of output volume.
      </>
    ),
  },
  {
    q: "Who fills out the rating form?",
    a: (
      <>
        Typically the developer or someone on their team — a producer, studio director, or
        operations lead. The form asks about the project specifically, not the studio&apos;s
        entire business. For Unverified ratings, there&apos;s no external check. For Verified and
        Audited ratings, a third party reviews the answers against evidence, so accuracy matters.
        The form currently runs as a demo — results stay in your browser and aren&apos;t submitted
        anywhere.
      </>
    ),
  },
  {
    q: "Who is GPCS aimed at, exactly?",
    a: (
      <>
        Three main groups. <strong className="text-gpcs-text">Awards bodies</strong> that need
        structured categories — replacing vague &ldquo;indie&rdquo; divisions with capacity-tiered
        brackets. <strong className="text-gpcs-text">Grant programmes</strong> that need auditable
        eligibility definitions — so they can say &ldquo;this programme is for B/BB projects&rdquo;
        and enforce it. <strong className="text-gpcs-text">Platforms and publishers</strong> that
        want to route projects to the right support tier rather than treating every incoming
        submission the same way. Developers benefit indirectly: a credible, externally readable
        rating is a better signal than a press release.
      </>
    ),
  },
  {
    q: "What happens when the standard reaches critical mass?",
    a: (
      <>
        The current governance model has Devon Stanton maintaining GPCS with community proposals
        via GitHub Issues. Once GPCS reaches critical mass — the target is 200+ classified projects
        and at least two implementation cycles — governance moves to an advisory board with
        representation from studios, publishers, platforms, awards bodies, and academic researchers.
        Major changes would require a supermajority vote (7 of 9). Old ratings are grandfathered
        with a version label, so nothing breaks when the standard evolves.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <JsonLd
        data={[
          webPageSchema({
            name: "GPCS FAQ — Common Questions Answered",
            description:
              "Answers to common questions about GPCS: who it's for, how verification works, what a C rating means, AI tools and team size, and governance.",
            url: "https://gpcstandard.org/faq",
            breadcrumbs: [
              { name: "Home", url: "https://gpcstandard.org" },
              { name: "FAQ", url: "https://gpcstandard.org/faq" },
            ],
          }),
          faqSchema,
        ]}
      />

      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
          Common Questions
        </p>
        <h1 className="font-display text-4xl font-bold text-gpcs-text mb-4">
          FAQ
        </h1>
        <p className="text-gpcs-silver max-w-xl mx-auto">
          Questions that come up regularly — about who GPCS is for, how the verification
          model works, and what the ratings actually mean.
        </p>
      </div>

      {/* Q&A list */}
      <div className="space-y-6">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-gpcs-border bg-gpcs-surface p-6"
          >
            <h2 className="font-display text-lg font-semibold text-gpcs-text mb-3">
              {item.q}
            </h2>
            <p className="text-sm text-gpcs-silver leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl border border-gpcs-gold/20 bg-gpcs-gold/5 p-8 text-center">
        <h2 className="font-display text-xl font-bold text-gpcs-text mb-2">
          Still have questions?
        </h2>
        <p className="text-sm text-gpcs-silver mb-6 max-w-md mx-auto">
          The full methodology is in the specification. If something is unclear or you have
          feedback on the framework, the author welcomes it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/specification"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gpcs-gold/40 bg-gpcs-gold/10 px-5 py-3 text-sm font-semibold text-gpcs-gold hover:bg-gpcs-gold/20 transition-colors"
          >
            Read the Specification
          </Link>
          <Link
            href="/about#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gpcs-border px-5 py-3 text-sm font-medium text-gpcs-silver hover:border-gpcs-gold/30 hover:text-gpcs-text transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
