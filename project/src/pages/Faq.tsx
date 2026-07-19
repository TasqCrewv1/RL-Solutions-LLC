import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { HelpCircle, Plus, Minus, Mail } from 'lucide-react';
import { useReveal } from '../lib/hooks';
import { useSEO, buildBreadcrumbs, buildFAQSchema } from '../lib/useSEO';
import { getPageMeta } from '../lib/seo';
import PhoneNumber from '../components/PhoneNumber';

interface FaqProps {
  onContact: () => void;
}

interface QA {
  q: string;
  a: string;
}

interface FaqCategory {
  id: string;
  title: string;
  icon: typeof HelpCircle;
  questions: QA[];
}

const categories: FaqCategory[] = [
  {
    id: 'general',
    title: 'General',
    icon: HelpCircle,
    questions: [
      {
        q: 'What areas does RL Solutions serve?',
        a: "We are based in Wilmington, Delaware and proudly serve homeowners across the entire state — New Castle, Kent, and Sussex counties, from Wilmington down to the Delaware beaches. We also take on projects in neighboring Pennsylvania, primarily in Chester and Delaware Counties. Not sure if we cover your area? Call 302-402-3070 and we'll let you know — we go where the work is.",
      },
      {
        q: 'What types of projects do you take on?',
        a: 'We are a general contractor, not a specialist in one trade. We build decks and fences, remodel kitchens and bathrooms, install accessibility ramps and modifications, and handle general home repairs and remodels. If a job needs a specialist we don\'t have on staff, we\'ll tell you up front rather than take it on and struggle.',
      },
      {
        q: 'Are you licensed and insured?',
        a: 'Yes. We are fully licensed and insured on every project, and we carry general liability and workers\' compensation coverage. We are happy to send documentation before we ever pick up a tool — just ask.',
      },
      {
        q: 'How long have you been in business?',
        a: "RL Solutions has been in business since 2016.",
      },
      {
        q: 'Can I see examples of your work?',
        a: "Absolutely. Our Portfolio page has photos of recent decks, kitchens, bathrooms, fences, and accessibility projects. We can also share references from past clients in your area on request.",
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Estimates',
    icon: HelpCircle,
    questions: [
      {
        q: 'How do I get an estimate?',
        a: "Use our online estimator for a rough price range in a few minutes. For a firm quote, we come out to your property, look at the job, measure, and send you a written quote — no charge for the visit, no pressure.",
      },
      {
        q: 'Is the online estimator accurate?',
        a: "It gives you a realistic range based on regional material and labor averages for Delaware and Pennsylvania. It is not a final quote — the actual price depends on site conditions, material availability, and scope we confirm in person. Treat it as a starting point, not a contract.",
      },
      {
        q: 'How much does a deck cost?',
        a: "Pressure-treated wood runs roughly $35–$55 per square foot, composite $45–$75, and PVC $60–$95, plus railing, stairs, and any demolition. A typical 200 sq ft cedar deck with railing and steps lands in the $8,000–$15,000 range. Use the Deck Calculator for a tailored estimate.",
      },
      {
        q: 'How much does a kitchen remodel cost?',
        a: "An essential kitchen starts around $100–$175 per square foot, mid-range $175–$300, and premium $300–$500, plus appliances, an island, or a pantry if you want them. A 150 sq ft mid-range kitchen with new appliances typically runs $28,000–$55,000. Use the Kitchen Remodel Calculator for specifics.",
      },
      {
        q: 'How much does a bathroom remodel cost?',
        a: "Bathrooms start around $120–$200 per square foot for essential finishes, $200–$350 for mid-range, and $350–$600 for premium. A standard 50 sq ft mid-range bathroom with a walk-in shower and double vanity usually falls between $12,000 and $25,000. The Bathroom Calculator breaks it down.",
      },
      {
        q: 'Do you charge for quotes?',
        a: "No. On-site estimates and written quotes are free. We want you to have the information you need to decide, whether or not you hire us.",
      },
      {
        q: 'Do you offer financing?',
        a: "We do not offer in-house financing, but we accept standard payment methods and can structure deposits and progress payments to fit your budget. If you need financing, we can point you toward lenders our clients have used.",
      },
    ],
  },
  {
    id: 'process',
    title: 'Project Process',
    icon: HelpCircle,
    questions: [
      {
        q: 'What happens after I request an estimate?',
        a: "We call you within one business day to talk through the project and schedule a visit. At the visit we measure, ask questions, and take notes. Within a few days you get a written quote with the scope, materials, timeline, and total price laid out clearly.",
      },
      {
        q: 'Do you require a deposit?',
        a: "For most projects yes — the deposit amount is specified in your written quote. It covers scheduling and materials ordering. Deposits may be non-refundable for materials already ordered or work already performed, as permitted by Delaware or Pennsylvania law.",
      },
      {
        q: 'How long does a typical project take?',
        a: "It depends on scope. A deck runs one to three weeks, a kitchen two to four, a bathroom one to two, a fence a few days, and most repairs a day or less. We give you a realistic timeline in the quote and commit to it.",
      },
      {
        q: 'Do you pull permits?',
        a: "Yes, when a permit is required we pull it — most decks over 30 inches, porches, remodels involving electrical or plumbing, and many ramp projects need one. Permit fees are included in your quote. For Pennsylvania home improvement projects, our written contracts comply with the Pennsylvania Home Improvement Consumer Protection Act (HICPA), including required disclosures, scope, approximate start and completion dates, and total contract price.",
      },
      {
        q: 'Will you clean up the job site?',
        a: "Every day. We treat your house like it's ours — tools put away, debris contained, things cleaned up at the end of each work day, and a full cleanup when the project is done.",
      },
      {
        q: 'Do I need to be home during the project?',
        a: "Not usually, as long as we have access to the work area and any necessary spaces. We communicate with you throughout so you know what's happening and when. For interior work, some clients prefer to be around — that's fine too.",
      },
    ],
  },
  {
    id: 'materials',
    title: 'Materials & Workmanship',
    icon: HelpCircle,
    questions: [
      {
        q: 'What deck materials do you work with?',
        a: "Pressure-treated wood, composite, and PVC / capped polymer. Wood is budget-friendly but needs periodic sealing. Composite is low-maintenance with a 25-year warranty. PVC is premium, moisture-proof, and fade-resistant. We help you pick based on your budget and how much upkeep you want.",
      },
      {
        q: 'What fencing materials do you install?',
        a: "Wood (cedar and pressure-treated), vinyl, aluminum, and chain link. Each has different cost and maintenance trade-offs. Wood is natural but needs upkeep, vinyl and aluminum are low-maintenance, and chain link is the most economical.",
      },
      {
        q: 'Do you use hidden fasteners on decks?',
        a: "Yes, on composite and PVC decks we use hidden fastener systems for a clean surface. On wood decks we can do hidden or face-fastened depending on your preference and budget.",
      },
      {
        q: 'Can I supply my own materials or fixtures?',
        a: "Generally we prefer to source materials ourselves so we can stand behind the quality and warranty. If you have specific fixtures or materials you want to use, talk to us — we'll work with you where it makes sense, but we can't warranty items we didn't supply.",
      },
      {
        q: 'Do your decks hold up to Delaware winters?',
        a: "Yes. We seal wood decks properly and use fasteners and framing rated for our climate. The freeze-thaw cycles, humidity, and occasional coastal storm are all things we build for. Composite and PVC handle it even better with minimal upkeep.",
      },
    ],
  },
  {
    id: 'warranty',
    title: 'Warranty & Guarantees',
    icon: HelpCircle,
    questions: [
      {
        q: 'Do you offer a warranty on your work?',
        a: "Yes. We stand behind our workmanship — typical projects carry a one-year workmanship warranty, and many of our decks carry a 10-year structural warranty. Material warranties come from the manufacturer (composite decking, for example, often has a 25-year warranty). Specifics are laid out in your written quote.",
      },
      {
        q: 'What if something goes wrong after the project is done?',
        a: "Call us. If it's a workmanship issue covered by warranty, we come back and fix it at no charge. If it's a material defect, we help you work with the manufacturer. We don't disappear after the final invoice.",
      },
      {
        q: 'Are material warranties transferable if I sell my home?',
        a: "Many manufacturer warranties are transferable to a new owner, often with a fee and within a limited time. Check the specific warranty terms for your materials, or ask us — we'll point you to the right documentation.",
      },
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility Projects',
    icon: HelpCircle,
    questions: [
      {
        q: 'Do you build ADA-compliant ramps?',
        a: "Yes. We build ramps that meet ADA slope, landing, and handrail requirements — 1:12 slope ratio, landings every 12 feet of run, proper handrail height and extensions. Safe access that doesn't look like an afterthought.",
      },
      {
        q: 'What other accessibility modifications do you do?',
        a: "Grab bar installation, threshold ramps, door widening for wheelchair access, roll-in shower conversions, and threshold transitions. We can also advise on what makes sense for your specific situation.",
      },
      {
        q: 'Do accessibility ramps require a permit?',
        a: "Usually yes. Most ramp projects require a building permit, which we pull and include in your quote. Setback and zoning rules vary by municipality in Delaware and Pennsylvania, so we check local requirements before we start.",
      },
    ],
  },
  {
    id: 'legal',
    title: 'Legal & Policies',
    icon: HelpCircle,
    questions: [
      {
        q: 'What is your cancellation policy?',
        a: "You may cancel a scheduled project with written notice. Deposits may be non-refundable for materials already ordered or work already performed, as permitted by applicable Delaware or Pennsylvania law. For Pennsylvania home improvement projects, cancellation rights and required disclosures are included in your written contract per HICPA.",
      },
      {
        q: 'What laws govern your contracts?',
        a: "Our terms are governed by Delaware law. For home improvement projects located in Pennsylvania, Pennsylvania law — including the Pennsylvania Home Improvement Consumer Protection Act — applies to the extent required by statute. Disputes are resolved in New Castle County, Delaware for Delaware projects, or in the Pennsylvania county where the project is located for Pennsylvania projects, unless we agree otherwise in writing.",
      },
      {
        q: 'How do you handle my personal information?',
        a: "We collect only what we need to provide estimates and complete projects — name, contact details, project address, and scope. We don't sell your data. See our Privacy Policy for the full details, including your rights as a Delaware or Pennsylvania resident.",
      },
      {
        q: 'What is your cookie policy?',
        a: "We use strictly necessary cookies for site functionality and optional analytics and preference cookies for improvement. You can accept or reject non-essential cookies any time via our Cookie Settings tool. See the Cookie Policy for the full breakdown.",
      },
      {
        q: 'How can I file a complaint?',
        a: "We'd rather hear it from you directly first — call 302-402-3070 or email hello@rlsolutions.com and we'll work to make it right. If we can't resolve it, you have consumer protection options through the Delaware Division of Consumer Protection or the Pennsylvania Office of Attorney General's Bureau of Consumer Protection, depending on where the project is located.",
      },
    ],
  },
];

function FaqItem({ qa, isOpen, onToggle }: { qa: QA; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white transition-colors duration-300 hover:border-slate-200">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-600 text-slate-900 text-pretty">{qa.q}</span>
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-slate-50 text-slate-600 transition-colors">
          {isOpen ? <Minus size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[15px] leading-relaxed text-slate-600 text-pretty">
            {qa.a}
          </p>
        </div>
      </div>
    </div>
  );
}

function RevealSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Faq({ onContact }: FaqProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const topicParam = searchParams.get('topic');
  const initialCategory = categories.some((c) => c.id === topicParam) ? topicParam! : categories[0].id;
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [openQ, setOpenQ] = useState<string | null>(null);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setOpenQ(null);
    setSearchParams(catId === 'general' ? {} : { topic: catId });
  };

  const active = categories.find((c) => c.id === activeCategory)!;

  const meta = getPageMeta('faq');
  const breadcrumbs = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ]);
  const allFaqs = useMemo(
    () => categories.flatMap((c) => c.questions.map((q) => ({ question: q.q, answer: q.a }))),
    [],
  );
  const faqSchema = buildFAQSchema(allFaqs);
  useSEO(meta, 'faq', [breadcrumbs, faqSchema]);

  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50 pt-32 pb-16">
        <div className="container-wide">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <HelpCircle size={26} strokeWidth={1.6} />
            </span>
            <div>
              <p className="text-sm font-600 uppercase tracking-widest text-orange-600">
                Support
              </p>
              <h1 className="font-display text-4xl font-600 tracking-tight text-slate-900 text-balance sm:text-5xl">
                Frequently Asked Questions
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 text-pretty">
            Answers to the questions we hear most — about pricing, process,
            materials, warranties, and how we work in Delaware and Pennsylvania.
            Can't find what you need? Just reach out.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
              {/* Category nav */}
              <RevealSection>
                <div className="lg:sticky lg:top-28">
                  <p className="mb-4 text-xs font-600 uppercase tracking-widest text-slate-400">
                    Topics
                  </p>
                  <div className="flex flex-wrap gap-2 lg:flex-col">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-left text-sm font-600 transition-all duration-300 ${
                          activeCategory === cat.id
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <cat.icon size={18} strokeWidth={1.6} />
                        {cat.title}
                        <span
                          className={`ml-auto hidden rounded-full px-2 py-0.5 text-[11px] lg:inline ${
                            activeCategory === cat.id
                              ? 'bg-white/15 text-white/80'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {cat.questions.length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </RevealSection>

              {/* Questions */}
              <RevealSection delay={80}>
                <div>
                  <h2 className="font-display text-2xl font-600 text-slate-900">
                    {active.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {active.questions.length}{' '}
                    {active.questions.length === 1 ? 'question' : 'questions'}
                  </p>
                  <div className="mt-6 space-y-3">
                    {active.questions.map((qa) => {
                      const key = `${activeCategory}-${qa.q}`;
                      const isOpen = openQ === key;
                      return (
                        <FaqItem
                          key={key}
                          qa={qa}
                          isOpen={isOpen}
                          onToggle={() => setOpenQ(isOpen ? null : key)}
                        />
                      );
                    })}
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="bg-slate-50 py-20">
        <div className="container-wide">
          <RevealSection>
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-100 bg-white p-10 text-center shadow-sm sm:p-12">
              <h2 className="font-display text-2xl font-600 tracking-tight text-slate-900 text-balance sm:text-3xl">
                Still have questions?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 text-pretty">
                We're happy to talk through your project and answer anything we
                didn't cover here. No pressure, no obligation.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={onContact}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-600 text-white shadow-md transition-all duration-300 hover:bg-orange-600 hover:shadow-lg active:scale-95"
                >
                  <Mail size={16} /> Email us
                </button>
                <PhoneNumber
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-600 text-slate-700 ring-1 ring-slate-200 transition-all duration-300 hover:ring-slate-300 active:scale-95"
                  showIcon
                  iconSize={16}
                  iconClassName="text-orange-500"
                />
                <Link
                  to="/estimate"
                  className="text-sm font-600 text-slate-500 underline-offset-4 transition-colors hover:text-slate-900 hover:underline"
                >
                  Request an estimate
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
