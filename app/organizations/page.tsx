import Link from "next/link";
import Image from "next/image";
import { Libre_Franklin, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-org-display",
});

const libre = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-org-sans",
});

const painPoints = [
  "A funder asked how you document mandatory training completion. You could not answer.",
  "Your orientation lives in a shared drive. Or a binder. Or someone's head.",
  "You cannot name, right now, who has completed what.",
  "Your compliance training happens when someone remembers to schedule it.",
  "Two people doing the same job got two different versions of onboarding.",
  'You have been told to "build a training program" with no budget, no team, and no platform.',
];

const stages = [
  {
    num: "Stage 01",
    title: "Onboarding Track",
    text: "Everything required before the person touches a client, a case file, or a vulnerable situation. Sequenced. Gated. Time-bound. Nobody skips mandatory reporting to get to the interesting content.",
    time: "30 Days",
  },
  {
    num: "Stage 02",
    title: "Role Deepening",
    text: "Activated automatically when onboarding is complete. No manager has to remember. This is where the learner goes deeper into the specific demands of their position. Not optional. Not remedial.",
    time: "90 Days",
  },
  {
    num: "Stage 03",
    title: "Ongoing Learning",
    text: "Quarterly required content tied to policy changes and emerging practice. Annual compliance refreshers. Anniversary triggers. The system manages the calendar so you do not have to.",
    time: "Every Year After",
  },
];

const differentiators = [
  [
    "Who built the content?",
    "Every course comes from someone with direct practice experience in the systems the training addresses. Not instructional designers who researched the topic. People who staffed the shelter, answered the crisis line, sat across from someone losing their housing. Learners know the difference immediately.",
  ],
  [
    "When was it last updated?",
    "Scheduled annual reviews plus triggered updates the moment policy, regulation, or best practice changes. When HUD releases new guidance, affected courses are flagged and updated outside the annual cycle. Your staff is training on June's reality, not last year's.",
  ],
  [
    "What does completion prove?",
    "A certificate from MSWorx Learning means the learner demonstrated competency. Knowledge checks, passing thresholds, applied assignments, scenario-based exercises drawn from real field conditions. Not that they clicked through slides. They can do the work.",
  ],
  [
    "Can you sequence it by role?",
    "Pre-built and custom learning paths sequence courses in the order that builds competency for specific roles. A new case manager gets crisis recognition, cultural humility, safety protocols, documentation, and systems navigation. In order.",
  ],
  [
    "Will my staff see our organization?",
    "Your portal carries your branding. Your logo. Your colors. Your curated catalog. Your own training materials hosted alongside MSWorx courses. One login. One dashboard. Training that feels like yours gets completed.",
  ],
  [
    "Can you prove it happened?",
    "Every supervisor pulls real-time completion reports. Leadership sees completion rates across departments, sites, and regions. Policy acknowledgments, assessment scores, certificates. All timestamped. All exportable.",
  ],
];

const bundles = [
  [
    "Frontline / Shelter",
    "teal",
    "The Core Set plus direct-service training: de-escalation, boundaries and self-protection, working with people in active crisis, and safe handoffs to services.",
  ],
  [
    "Case Manager",
    "teal",
    "The Core Set plus housing systems navigation, assessment and intake, the diversion conversation, eviction prevention, and caseload management.",
  ],
  [
    "Supervisor",
    "gold",
    "The Core Set plus supervising frontline staff, coaching and feedback, managing team burnout, and documentation and accountability oversight.",
  ],
  [
    "Program Manager",
    "gold",
    "The Core Set plus compliance and audit readiness, funder reporting and outcomes, program data and evaluation, and building team training systems.",
  ],
];

const addOns = [
  {
    tag: "Diagnostic Engagement",
    title: "Organizational Risk Assessment",
    text: "A structured review of your workforce training posture, compliance documentation, onboarding consistency, and supervisory infrastructure. MSWorx Learning tells you what is working, what is exposing the organization to risk, and what needs to change before the next funder review, audit, or licensing visit.",
    features: [
      "Document and process audit across onboarding, compliance, and ongoing training",
      "Leadership and supervisor interviews",
      "Frontline staff experience review",
      "Compliance gap analysis mapped to funder and regulatory requirements",
      "Written findings report with prioritized recommendations",
      "Executive debrief with leadership team",
    ],
    format: "Delivered in 4-6 weeks - Pricing by organization size",
    note: "The assessment leads directly into a portal launch. Findings become the blueprint. Recommendations become the build. Assessment fees apply as credit toward implementation when the engagement continues.",
  },
  {
    tag: "In-Person Intensive",
    title: "Leadership Training Retreat",
    text: "A facilitated retreat designed for executive directors, program leaders, and supervisors who need to align on what their workforce actually needs to be prepared for. Not a workshop. A working session that produces decisions, frameworks, and a concrete training roadmap leadership can execute.",
    features: [
      "Custom agenda built from your organization's current priorities",
      "Facilitated leadership alignment on training standards",
      "Role-based competency mapping for your workforce",
      "Supervisor development and coaching framework",
      "90-day action plan with defined owners and milestones",
      "Post-retreat implementation support",
    ],
    format: "1-2 day format - On-site or hosted - Pricing by scope",
  },
];

const sectors = [
  [
    "Homelessness & Housing",
    "CoC lead agencies, shelter providers, supportive housing programs, rapid rehousing operators, coordinated entry teams, and street outreach.",
  ],
  [
    "Human & Social Services",
    "Human services agencies, food banks, case management organizations, volunteer-driven service networks, and community-based providers.",
  ],
  [
    "Specialized Support Sectors",
    "Domestic violence agencies, behavioral health providers, reentry programs, youth services, and organizations serving disproportionately affected communities.",
  ],
];

const faqs = [
  [
    "Our staff will not use another platform.",
    "Staff do not complete training that feels like a third-party vendor's website. They complete training that feels like it belongs to them. MSWorx portals carry your organization's branding. The catalog is curated to their role. The learning paths tell them exactly what to do next. Adoption is a design problem, and it has been designed into the platform.",
  ],
  [
    "We already have training.",
    "The question is not whether you have training. It is whether you can prove it happened, prove what the learner actually knows, and prove the content reflects current regulation. If your answer is a folder of PDFs and somebody's good intentions, you have materials. You do not have infrastructure.",
  ],
  [
    "Online training does not work for our population.",
    "That is true of most online training, because most online training is built for passive consumption. MSWorx Learning requires active demonstration of skill. Knowledge checks, passing thresholds, applied assignments, scenario-based exercises drawn from real field conditions. Not watch-and-click.",
  ],
  [
    "Can we host our own content on the platform?",
    "Yes. Your internal orientation, policy documents, compliance training, and organizational procedures live alongside MSWorx courses in the same portal. Staff do not navigate multiple platforms to access different training. One login. One dashboard. One support number.",
  ],
  [
    "What does implementation look like?",
    "Most portals launch in 2 to 4 weeks; larger multi-program workforces take longer depending on scope. Implementation includes portal branding, seat and bundle assignment, learning path build, loading your own content, reporting setup, and administrator training with a full handoff.",
  ],
  [
    "What happens to our data if we end the relationship?",
    "Your data is yours. At the end of any engagement, MSWorx Learning provides exported copies of all learner completion records, assessment scores, and any organization-specific content you uploaded.",
  ],
];

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={`org-eyebrow ${dark ? "org-eyebrow-dark" : ""}`}>{children}</span>;
}

export default function OrganizationsPage() {
  return (
    <main className={`${playfair.variable} ${libre.variable} org-page`}>
      <nav className="org-nav">
        <div className="org-container org-nav-inner">
          <Link href="/" className="org-logo" aria-label="MSWorx Learning home">
            <Image
              src="/msworx-logo.png"
              alt="MSWorx Learning"
              width={168}
              height={168}
              className="org-logo-image"
              priority
            />
            <span>Organization Training Portals</span>
          </Link>
          <div className="org-nav-links" aria-label="Organization page navigation">
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <Link href="/courses">Catalog</Link>
          </div>
          <div className="org-nav-actions">
            <a href="#start" className="org-nav-cta">
              Schedule Consultation
            </a>
          </div>
        </div>
      </nav>

      <header className="org-hero">
        <div className="org-container org-hero-inner">
          <span className="org-hero-eyebrow">For Organizations</span>
          <h1>
            Your workforce walked in <em>underprepared.</em>
            <br />
            They should not leave that way.
          </h1>
          <p className="org-hero-lead">
            MSWorx Learning builds branded training infrastructure for nonprofits
            and human services organizations. Your logo. Your catalog. Your
            learning paths. Completion tracking that holds up in front of a
            funder, a board, or a licensing body. Training that prepares your
            people for what the work actually demands.
          </p>
          <div className="org-hero-ctas">
            <a href="#start" className="org-btn org-btn-primary">
              Schedule a Demo
            </a>
            <a href="#pricing" className="org-btn org-btn-ghost">
              See Pricing
            </a>
          </div>
        </div>
      </header>

      <section className="org-section org-pain">
        <div className="org-container org-pain-grid">
          <div className="org-pain-copy">
            <h2>
              The problem is not your <em>people.</em> It is your infrastructure.
            </h2>
            <p>
              Your last new hire got a slightly different version of orientation
              than the one before them. It depended on who had bandwidth that
              week. Nobody can prove what was covered.
            </p>
            <p>
              Six months later, that person is in the field making decisions
              based on whatever they absorbed in their first two days.
            </p>
            <p>
              <strong>That is not onboarding. That is hope.</strong>
            </p>
            <p>
              Staff turnover in human services is not a morale problem. It is a
              preparation problem. When people leave in the first year, it is
              because nobody built the bridge between orientation and competency.
            </p>
          </div>
          <div className="org-pain-list">
            <h3>If any of these sound familiar</h3>
            <ul>
              {painPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="org-section org-infra">
        <div className="org-container org-infra-inner">
          <Eyebrow dark>What You Actually Get</Eyebrow>
          <h2>
            Training is not a project. It is <em>infrastructure.</em>
          </h2>
          <p className="org-infra-lead">
            Onboarding alone is a project. You build it, someone pays for it, it
            is done. Onboarding connected to ongoing training is a platform.
            MSWorx Learning is built as that platform. Three connected stages.
            One system. One learner record from day one through every month that
            follows.
          </p>
          <div className="org-stages">
            {stages.map((stage) => (
              <article key={stage.title} className="org-stage">
                <div className="org-stage-num">{stage.num}</div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
                <span>{stage.time}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="org-section org-diff">
        <div className="org-container">
          <div className="org-section-head">
            <Eyebrow>Why It Is Different</Eyebrow>
            <h2>
              Five questions to ask <em>any</em> training provider
            </h2>
            <p>
              If the answer to any of these is vague, the training is generic.
              Here is how MSWorx Learning answers.
            </p>
          </div>
          <div className="org-diff-grid">
            {differentiators.map(([title, text], index) => (
              <article key={title} className="org-diff-card">
                <div className="org-diff-num">{String(index + 1).padStart(2, "0")}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="org-section org-pricing" id="pricing">
        <div className="org-container">
          <div className="org-section-head">
            <Eyebrow>Investment</Eyebrow>
            <h2>
              Priced to replace a <em>broken</em> system, not add to it
            </h2>
            <p>
              Replace the cost of one failed six-month hire and you have funded
              a branded training portal for your workforce for a year. The
              platform does not add cost. It replaces the hidden cost of doing
              this work without a system.
            </p>
          </div>

          <div className="org-pricing-note">
            <Eyebrow dark>How pricing works</Eyebrow>
            <p>
              You pay for the seats you provision, by role. Each employee is
              assigned to one role bundle, and you pay that bundle&apos;s monthly
              rate per seat. A shelter with mostly frontline staff and a few case
              managers pays for exactly that mix. You are never charged for
              content a role does not use.
            </p>
          </div>

          <div className="org-bundle-grid">
            {bundles.map(([title, tone, text]) => (
              <article key={title} className={`org-bundle-card org-bundle-${tone}`}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="org-core-note">
            <p>
              <strong>Every seat includes the Core Set</strong> - crisis
              recognition, mandatory reporting, safety, cultural humility,
              documentation, and trauma-informed basics. The training every
              person in a frontline organization needs.
            </p>
            <p>
              A flat monthly platform fee covers administration and reporting,
              scaled to your size. Setup is one-time. We build a quote to your
              actual staff mix.
            </p>
            <a href="#start" className="org-btn org-btn-dark">
              Request Portal Pricing
            </a>
          </div>

          <div className="org-setup">
            <div className="org-setup-head">
              <h3>One-Time Setup</h3>
              <p>
                Every portal launch includes a one-time setup: we stand up your
                branded portal, configure it to your organization, and train your
                administrator to run it.
              </p>
            </div>
            <div className="org-setup-grid">
              <article className="org-setup-card">
                <h4>15 - 75 Seats</h4>
                <div>$1,500 one-time</div>
                <p>
                  Portal configuration and branding, seat and bundle assignment,
                  role-based learning path construction, loading of your own
                  content, reporting setup, and administrator training with
                  handoff.
                </p>
              </article>
              <article className="org-setup-card">
                <h4>76+ Seats</h4>
                <div>$2,750 one-time</div>
                <p>
                  The same full scope, scaled to a larger, multi-program
                  workforce. More configuration, more seats to assign across
                  bundles, and more content to organize at launch.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="org-section org-addons">
        <div className="org-container org-addons-inner">
          <div className="org-section-head org-section-head-dark">
            <Eyebrow dark>Deeper Engagement</Eyebrow>
            <h2>
              When the gap is <em>structural,</em> not just operational
            </h2>
            <p>
              Some organizations need more than a platform. They need someone to
              name what is actually broken, then help build what replaces it.
            </p>
          </div>
          <div className="org-addon-grid">
            {addOns.map((addon) => (
              <article key={addon.title} className="org-addon-card">
                <span>{addon.tag}</span>
                <h3>{addon.title}</h3>
                <p>{addon.text}</p>
                <ul>
                  {addon.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="org-addon-format">{addon.format}</div>
                {addon.note ? (
                  <p className="org-addon-note">
                    <strong>Built-In Next Step</strong>
                    {addon.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="org-section org-who">
        <div className="org-container">
          <div className="org-section-head">
            <h2>
              Built for the <em>frontline</em> nonprofit sector
            </h2>
            <p>
              MSWorx Learning does not serve corporations. It is built for the
              organizations doing the hardest work in the communities that need
              it most.
            </p>
          </div>
          <div className="org-who-grid">
            {sectors.map(([title, text]) => (
              <article key={title} className="org-who-card">
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="org-section org-faq" id="faq">
        <div className="org-narrow">
          <div className="org-section-head">
            <h2>
              Questions leadership <em>actually</em> asks
            </h2>
          </div>
          <div>
            {faqs.map(([question, answer]) => (
              <article key={question} className="org-faq-item">
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="org-cta" id="start">
        <div className="org-cta-inner">
          <Eyebrow dark>Start Here</Eyebrow>
          <h2>
            The next person who walks through your door deserves <em>infrastructure.</em>
          </h2>
          <p>
            Not a packet. Not a folder. Not whoever had time to orient them that
            week. Schedule a 30-minute demo and see what a branded training
            environment looks like for your organization.
          </p>
          <div className="org-cta-buttons">
            <a href="https://calendly.com/msworx/demo" className="org-btn org-btn-primary">
              Schedule a Demo
            </a>
            <a href="mailto:hello@msworx.co" className="org-btn org-btn-ghost">
              Request Pricing
            </a>
          </div>
        </div>
      </section>

      <footer className="org-footer">
        <div className="org-container org-footer-inner">
          <div>
            <div className="org-footer-brand">MSWorx Learning</div>
            <div>Michele S. Williams, LLC</div>
          </div>
          <div className="org-footer-tag">Equip. Empower. Lead.</div>
          <Link href="/">msworx.co</Link>
        </div>
      </footer>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .org-page {
          --teal: #116466;
          --teal-dark: #0b4547;
          --teal-deep: #082f31;
          --gold: #bd9227;
          --gold-soft: #d4ac48;
          --cream: #faf6ef;
          --cream-warm: #f2ebdc;
          --ink: #1a1a1a;
          --ink-soft: #3a3a3a;
          --rule: #d9cfb8;
          --white: #ffffff;
          background: var(--cream);
          color: var(--ink);
          font-family: var(--font-org-sans), -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 17px;
          line-height: 1.6;
          letter-spacing: 0;
          -webkit-font-smoothing: antialiased;
        }

        .org-page h1,
        .org-page h2,
        .org-page h3,
        .org-page h4 {
          font-family: var(--font-org-display), Georgia, serif;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .org-page em {
          color: var(--gold);
          font-style: italic;
          font-weight: 400;
        }

        .org-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .org-narrow {
          max-width: 820px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .org-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 20px 0;
          background: var(--cream);
          border-bottom: 1px solid var(--rule);
        }

        .org-nav-inner,
        .org-footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .org-logo,
        .org-footer-brand {
          font-family: var(--font-org-display), Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--teal-dark);
        }

        .org-logo {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .org-logo-image {
          width: auto;
          height: 58px;
          object-fit: contain;
        }

        .org-logo span {
          color: var(--gold);
          font-family: var(--font-org-display), Georgia, serif;
          font-size: 14px;
          font-style: italic;
          font-weight: 400;
        }

        .org-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
          margin-left: auto;
        }

        .org-nav-links a {
          color: var(--teal-deep);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .org-nav-links a:hover {
          color: var(--gold);
        }

        .org-nav-actions {
          display: flex;
          align-items: center;
        }

        .org-nav-cta,
        .org-btn {
          display: inline-block;
          border: 2px solid transparent;
          padding: 18px 36px;
          font-family: var(--font-org-sans), sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.05em;
          line-height: 1.1;
          text-align: center;
          text-transform: uppercase;
          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease;
        }

        .org-nav-cta {
          padding: 12px 24px;
          background: var(--teal);
          color: var(--white);
          font-size: 14px;
          letter-spacing: 0.03em;
        }

        .org-nav-cta:hover,
        .org-btn-dark:hover {
          background: var(--teal-dark);
          color: var(--white);
        }

        .org-btn-primary {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--teal-deep);
        }

        .org-btn-primary:hover {
          background: var(--gold-soft);
          border-color: var(--gold-soft);
          color: var(--teal-deep);
        }

        .org-btn-ghost {
          background: transparent;
          border-color: var(--cream);
          color: var(--cream);
        }

        .org-btn-ghost:hover {
          background: var(--cream);
          color: var(--teal-deep);
        }

        .org-btn-dark {
          background: var(--teal);
          border-color: var(--teal);
          color: var(--white);
        }

        .org-hero {
          position: relative;
          overflow: hidden;
          padding: 100px 0 120px;
          background: var(--teal-deep);
          color: var(--cream);
        }

        .org-hero::before,
        .org-hero::after,
        .org-infra::before,
        .org-addons::before,
        .org-cta::before {
          content: "";
          position: absolute;
          pointer-events: none;
        }

        .org-hero::before {
          top: -100px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(189, 146, 39, 0.18) 0%, transparent 60%);
        }

        .org-hero::after {
          bottom: -120px;
          left: -80px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(17, 100, 102, 0.35) 0%, transparent 65%);
        }

        .org-hero-inner,
        .org-infra-inner,
        .org-addons-inner,
        .org-cta-inner {
          position: relative;
          z-index: 1;
        }

        .org-hero-eyebrow {
          display: inline-block;
          margin-bottom: 32px;
          border-bottom: 2px solid var(--gold);
          padding-bottom: 8px;
          color: var(--gold-soft);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .org-hero h1 {
          max-width: 900px;
          margin-bottom: 32px;
          color: var(--white);
          font-size: clamp(42px, 6vw, 68px);
        }

        .org-hero h1 em,
        .org-infra h2 em,
        .org-addons h2 em,
        .org-cta h2 em {
          color: var(--gold-soft);
        }

        .org-hero-lead {
          max-width: 720px;
          margin-bottom: 48px;
          color: rgba(250, 246, 239, 0.88);
          font-size: 20px;
          line-height: 1.6;
        }

        .org-hero-ctas,
        .org-cta-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .org-section {
          padding: 120px 0;
        }

        .org-pain-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .org-pain-copy h2,
        .org-section-head h2 {
          margin-bottom: 32px;
          color: var(--teal-deep);
          font-size: clamp(34px, 4.5vw, 52px);
          line-height: 1.1;
        }

        .org-pain-copy p {
          margin-bottom: 20px;
          color: var(--ink-soft);
          font-size: 18px;
        }

        .org-pain-copy strong {
          color: var(--teal-deep);
          font-weight: 600;
        }

        .org-pain-list {
          border-left: 4px solid var(--gold);
          background: var(--white);
          padding: 48px;
          box-shadow: 0 1px 0 var(--rule);
        }

        .org-pain-list h3 {
          margin-bottom: 28px;
          border-bottom: 1px solid var(--rule);
          padding-bottom: 16px;
          color: var(--teal-deep);
          font-size: 22px;
        }

        .org-pain-list li {
          position: relative;
          border-bottom: 1px solid var(--rule);
          padding: 14px 0 14px 28px;
          color: var(--ink-soft);
          font-size: 16px;
          line-height: 1.5;
        }

        .org-pain-list li:last-child {
          border-bottom: 0;
        }

        .org-pain-list li::before {
          content: "x";
          position: absolute;
          top: 14px;
          left: 0;
          color: var(--gold);
          font-weight: 700;
        }

        .org-infra {
          position: relative;
          overflow: hidden;
          background: var(--teal);
          color: var(--cream);
        }

        .org-infra::before {
          inset: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(189, 146, 39, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(189, 146, 39, 0.06) 0%, transparent 40%);
        }

        .org-eyebrow {
          display: inline-block;
          margin-bottom: 24px;
          color: var(--gold);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .org-eyebrow-dark {
          color: var(--gold-soft);
        }

        .org-infra h2,
        .org-addons h2,
        .org-cta h2 {
          max-width: 820px;
          margin-bottom: 40px;
          color: var(--white);
          font-size: clamp(36px, 5vw, 56px);
          line-height: 1.1;
        }

        .org-infra-lead {
          max-width: 780px;
          margin-bottom: 60px;
          color: rgba(250, 246, 239, 0.92);
          font-size: 19px;
        }

        .org-stages {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          border: 1px solid rgba(250, 246, 239, 0.2);
          background: rgba(250, 246, 239, 0.2);
        }

        .org-stage {
          background: var(--teal);
          padding: 40px 32px;
        }

        .org-stage-num {
          margin-bottom: 16px;
          color: var(--gold-soft);
          font-family: var(--font-org-display), Georgia, serif;
          font-size: 14px;
          font-style: italic;
          letter-spacing: 0.1em;
        }

        .org-stage h3 {
          margin-bottom: 16px;
          color: var(--white);
          font-size: 22px;
        }

        .org-stage p {
          margin-bottom: 12px;
          color: rgba(250, 246, 239, 0.82);
          font-size: 15px;
          line-height: 1.6;
        }

        .org-stage span {
          display: block;
          margin-top: 20px;
          color: var(--gold);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .org-diff,
        .org-who {
          background: var(--cream-warm);
        }

        .org-section-head {
          max-width: 820px;
          margin: 0 auto 80px;
          text-align: center;
        }

        .org-section-head p {
          color: var(--ink-soft);
          font-size: 18px;
          line-height: 1.6;
        }

        .org-diff-grid,
        .org-bundle-grid,
        .org-setup-grid,
        .org-addon-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .org-diff-card {
          border-top: 3px solid var(--teal);
          background: var(--white);
          padding: 48px 44px;
        }

        .org-diff-card:nth-child(even) {
          border-top-color: var(--gold);
        }

        .org-diff-num {
          margin-bottom: 20px;
          color: var(--gold);
          font-family: var(--font-org-display), Georgia, serif;
          font-size: 48px;
          font-style: italic;
          line-height: 1;
          opacity: 0.85;
        }

        .org-diff-card h3,
        .org-bundle-card h3,
        .org-who-card h3,
        .org-faq-item h3 {
          margin-bottom: 16px;
          color: var(--teal-deep);
          font-size: 24px;
        }

        .org-diff-card p,
        .org-bundle-card p,
        .org-who-card p,
        .org-faq-item p {
          color: var(--ink-soft);
          font-size: 16px;
          line-height: 1.65;
        }

        .org-pricing-note {
          margin-bottom: 40px;
          background: var(--teal-deep);
          padding: 48px;
          color: var(--cream);
        }

        .org-pricing-note p {
          max-width: 760px;
          color: var(--cream);
          font-size: 19px;
          line-height: 1.6;
        }

        .org-bundle-grid {
          gap: 24px;
          margin-bottom: 40px;
        }

        .org-bundle-card {
          border: 1px solid var(--rule);
          border-top-width: 4px;
          background: var(--white);
          padding: 32px;
        }

        .org-bundle-teal {
          border-top-color: var(--teal-deep);
        }

        .org-bundle-gold {
          border-top-color: var(--gold);
        }

        .org-core-note {
          max-width: 820px;
          margin: 0 auto 56px;
          text-align: center;
        }

        .org-core-note p {
          margin-bottom: 12px;
          color: var(--ink-soft);
          font-size: 17px;
          line-height: 1.65;
        }

        .org-core-note strong {
          color: var(--teal-deep);
        }

        .org-core-note .org-btn {
          margin-top: 24px;
        }

        .org-setup {
          margin-top: 64px;
        }

        .org-setup-head {
          max-width: 680px;
          margin: 0 auto 40px;
          text-align: center;
        }

        .org-setup-head h3 {
          margin-bottom: 12px;
          color: var(--teal-deep);
          font-size: 30px;
        }

        .org-setup-head p {
          color: var(--ink-soft);
          font-size: 16px;
        }

        .org-setup-card {
          border-left: 4px solid var(--gold);
          background: var(--white);
          padding: 36px;
        }

        .org-setup-card h4 {
          margin-bottom: 8px;
          color: var(--teal-deep);
          font-size: 22px;
        }

        .org-setup-card div {
          margin-bottom: 16px;
          color: var(--gold);
          font-size: 18px;
          font-weight: 700;
        }

        .org-setup-card p {
          color: var(--ink-soft);
          font-size: 15px;
          line-height: 1.6;
        }

        .org-addons {
          position: relative;
          overflow: hidden;
          background: var(--teal-deep);
          color: var(--cream);
        }

        .org-addons::before {
          top: 50%;
          left: 50%;
          width: 800px;
          height: 800px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(189, 146, 39, 0.08) 0%, transparent 60%);
        }

        .org-section-head-dark h2 {
          color: var(--white);
        }

        .org-section-head-dark p {
          color: rgba(250, 246, 239, 0.88);
        }

        .org-addon-grid {
          gap: 40px;
        }

        .org-addon-card {
          position: relative;
          border: 1px solid rgba(250, 246, 239, 0.15);
          background: rgba(250, 246, 239, 0.04);
          padding: 52px 44px;
        }

        .org-addon-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 4px;
          background: var(--gold);
        }

        .org-addon-card > span {
          display: block;
          margin-bottom: 20px;
          color: var(--gold-soft);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .org-addon-card h3 {
          margin-bottom: 20px;
          color: var(--white);
          font-size: 28px;
        }

        .org-addon-card p,
        .org-addon-card li {
          color: rgba(250, 246, 239, 0.82);
          font-size: 16px;
          line-height: 1.65;
        }

        .org-addon-card ul {
          margin: 28px 0;
          border-top: 1px solid rgba(250, 246, 239, 0.18);
          padding-top: 24px;
        }

        .org-addon-card li {
          position: relative;
          padding: 8px 0 8px 24px;
          font-size: 15px;
        }

        .org-addon-card li::before {
          content: ">";
          position: absolute;
          left: 0;
          color: var(--gold);
        }

        .org-addon-format {
          border-top: 1px solid rgba(250, 246, 239, 0.18);
          padding-top: 20px;
          color: var(--gold-soft);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
        }

        .org-addon-note {
          margin-top: 24px;
          border-top: 1px solid rgba(250, 246, 239, 0.18);
          padding-top: 24px;
          color: var(--gold-soft) !important;
          font-size: 14px !important;
        }

        .org-addon-note strong {
          display: block;
          margin-bottom: 6px;
          color: var(--gold);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .org-who-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .org-who-card {
          background: var(--white);
          padding: 40px 32px;
          text-align: center;
        }

        .org-who-card h3 {
          font-size: 20px;
        }

        .org-who-card p {
          font-size: 15px;
          line-height: 1.6;
        }

        .org-faq-item {
          border-bottom: 1px solid var(--rule);
          padding: 32px 0;
        }

        .org-faq-item h3 {
          font-size: 22px;
        }

        .org-faq-item p {
          line-height: 1.7;
        }

        .org-cta {
          position: relative;
          overflow: hidden;
          background: var(--teal-deep);
          padding: 120px 0;
          color: var(--cream);
        }

        .org-cta::before {
          top: -150px;
          left: 50%;
          width: 600px;
          height: 600px;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(189, 146, 39, 0.15) 0%, transparent 60%);
        }

        .org-cta-inner {
          max-width: 820px;
          margin: 0 auto;
          padding: 0 32px;
          text-align: center;
        }

        .org-cta h2 {
          margin: 0 auto 28px;
          font-size: clamp(38px, 5vw, 56px);
        }

        .org-cta p {
          max-width: 680px;
          margin: 0 auto 48px;
          color: rgba(250, 246, 239, 0.88);
          font-size: 19px;
          line-height: 1.6;
        }

        .org-cta-buttons {
          justify-content: center;
        }

        .org-footer {
          background: var(--teal-deep);
          border-top: 1px solid rgba(250, 246, 239, 0.14);
          padding: 32px 0;
          color: rgba(250, 246, 239, 0.72);
          font-size: 14px;
        }

        .org-footer-brand {
          color: var(--cream);
        }

        .org-footer-tag {
          color: var(--gold-soft);
        }

        .org-footer a {
          color: rgba(250, 246, 239, 0.72);
        }

        .org-footer a:hover {
          color: var(--gold-soft);
        }

        @media (max-width: 900px) {
          .org-container,
          .org-narrow {
            padding: 0 24px;
          }

          .org-section,
          .org-hero,
          .org-cta {
            padding-top: 80px;
            padding-bottom: 80px;
          }

          .org-pain-grid,
          .org-stages,
          .org-diff-grid,
          .org-bundle-grid,
          .org-setup-grid,
          .org-addon-grid,
          .org-who-grid {
            grid-template-columns: 1fr;
          }

          .org-pain-grid {
            gap: 48px;
          }

          .org-section-head {
            margin-bottom: 48px;
          }

          .org-nav-links {
            display: none;
          }

          .org-logo span {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .org-nav-inner,
          .org-footer-inner {
            align-items: center;
            flex-direction: row;
          }

          .org-logo-image {
            height: 50px;
          }

          .org-nav-cta {
            padding: 10px 14px;
            font-size: 12px;
          }

          .org-btn {
            width: 100%;
          }

          .org-hero h1 {
            font-size: 42px;
          }

          .org-pain-list,
          .org-pricing-note,
          .org-diff-card,
          .org-addon-card {
            padding: 28px;
          }
        }
      `,
        }}
      />
    </main>
  );
}
