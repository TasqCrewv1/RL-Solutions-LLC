import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Quote,
  Check,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ThumbsUp,
  PencilLine,
} from 'lucide-react';
import { useReveal } from '../lib/hooks';
import { supabase } from '../lib/supabase';
import { services } from '../lib/content';
import { useSEO, buildBreadcrumbs, buildReviewSchema, buildLocalBusinessWithRating } from '../lib/useSEO';
import { getPageMeta } from '../lib/seo';

interface Testimonial {
  id: string;
  author_name: string;
  location: string | null;
  rating: number;
  project_type: string | null;
  title: string | null;
  body: string;
  would_recommend: boolean;
  created_at: string;
}

const PROJECT_TYPES = [
  ...services.map((s) => s.title),
  'Other',
];

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

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const labels = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(i)}
            className="transition-transform duration-150 active:scale-90"
            aria-label={`${i} star${i > 1 ? 's' : ''}`}
          >
            <Star
              size={40}
              strokeWidth={1.5}
              className={
                (hover || value) >= i
                  ? 'fill-orange-500 text-orange-500'
                  : 'fill-transparent text-slate-300'
              }
            />
          </button>
        ))}
      </div>
      <span className="text-sm font-500 text-slate-500 h-5">
        {(hover || value) > 0 ? labels[hover || value] : ''}
      </span>
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100';

function ReviewWizard({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [rating, setRating] = useState(0);
  const [projectType, setProjectType] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const steps = ['rating', 'project', 'review', 'details'];
  const stepLabels = ['Rating', 'Project', 'Your review', 'About you'];

  const canProceed = () => {
    if (steps[step] === 'rating') return rating > 0;
    if (steps[step] === 'project') return projectType !== '';
    if (steps[step] === 'review') return body.trim().length >= 10;
    if (steps[step] === 'details') return authorName.trim().length > 0;
    return false;
  };

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setSubmitting(true);
    setError('');
    const { error: insertError } = await supabase.from('testimonials').insert({
      author_name: authorName.trim(),
      location: location.trim() || null,
      rating,
      project_type: projectType,
      title: title.trim() || null,
      body: body.trim(),
      would_recommend: wouldRecommend,
      approved: false,
    });
    setSubmitting(false);
    if (insertError) {
      setError('Something went wrong. Please try again or call us at 302-402-3070.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <Check size={32} strokeWidth={2} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-600 text-slate-900">
          Thanks — we appreciate it
        </h3>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Your review will show up here once we've taken a quick look at it.
          Thanks for taking the time to share how things went.
        </p>
        <button
          onClick={onDone}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-600 text-white transition-all duration-300 hover:bg-slate-800 active:scale-95"
        >
          Back to reviews
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-slate-100 bg-white p-8 shadow-sm sm:p-10">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs font-600 transition-colors ${
                i < step
                  ? 'bg-green-500 text-white'
                  : i === step
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {i < step ? <Check size={16} /> : i + 1}
            </div>
            <span
              className={`hidden text-xs font-600 sm:block ${
                i <= step ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              {label}
            </span>
            {i < stepLabels.length - 1 && (
              <div
                className={`h-0.5 flex-1 rounded-full transition-colors ${
                  i < step ? 'bg-green-500' : 'bg-slate-100'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      {steps[step] === 'rating' && (
        <div className="text-center">
          <h3 className="font-display text-2xl font-600 text-slate-900">
            How did it go?
          </h3>
          <p className="mt-2 text-slate-600">
            Your honest rating helps other homeowners and helps us keep doing
            better.
          </p>
          <div className="mt-8">
            <StarPicker value={rating} onChange={setRating} />
          </div>
        </div>
      )}

      {steps[step] === 'project' && (
        <div>
          <h3 className="font-display text-2xl font-600 text-slate-900">
            What did we do for you?
          </h3>
          <p className="mt-2 text-slate-600">
            This helps us sort your review.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {PROJECT_TYPES.map((pt) => (
              <button
                key={pt}
                type="button"
                onClick={() => setProjectType(pt)}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-500 transition-all ${
                  projectType === pt
                    ? 'border-orange-500 bg-orange-50 text-orange-900 ring-1 ring-orange-200'
                    : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {pt}
              </button>
            ))}
          </div>
        </div>
      )}

      {steps[step] === 'review' && (
        <div>
          <h3 className="font-display text-2xl font-600 text-slate-900">
            Tell us about it
          </h3>
          <p className="mt-2 text-slate-600">
            What stood out? The work, the crew, the communication, the result —
            whatever you'd want to know if you were hiring us.
          </p>
          <input
            type="text"
            placeholder="Headline (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${inputCls} mt-6`}
          />
          <textarea
            placeholder="Write your review..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            className={`${inputCls} mt-3 resize-none`}
          />
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <button
              type="button"
              onClick={() => setWouldRecommend(!wouldRecommend)}
              className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl transition-colors ${
                wouldRecommend
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-slate-400 ring-1 ring-slate-200'
              }`}
            >
              <ThumbsUp size={20} strokeWidth={1.8} />
            </button>
            <div>
              <p className="text-sm font-600 text-slate-900">
                Would you recommend us?
              </p>
              <p className="text-xs text-slate-500">
                {wouldRecommend ? 'Yes, I would.' : 'No recommendation indicated.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {steps[step] === 'details' && (
        <div>
          <h3 className="font-display text-2xl font-600 text-slate-900">
            How should we credit you?
          </h3>
          <p className="mt-2 text-slate-600">
            Your name shows up with your review. Location is optional.
          </p>
          <input
            type="text"
            placeholder="Your name *"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className={`${inputCls} mt-6`}
          />
          <input
            type="text"
            placeholder="City / area (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`${inputCls} mt-3`}
          />
          <div className="mt-5 rounded-xl bg-orange-50 p-4">
            <p className="text-xs leading-relaxed text-orange-800">
              By submitting, you confirm this review reflects your own
              experience, and you're okay with us displaying it on our site.
              Reviews get a quick look before they go live.
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* Nav buttons */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={back}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-600 text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowLeft size={16} /> Back
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={next}
            disabled={!canProceed()}
            className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-600 text-white shadow-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!canProceed() || submitting}
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-600 text-white shadow-sm transition-all duration-300 hover:bg-slate-800 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Check size={16} /> Submit review
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-7 transition-all duration-300 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-900/5">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={18}
              className={
                i <= t.rating
                  ? 'fill-orange-500 text-orange-500'
                  : 'fill-transparent text-slate-200'
              }
            />
          ))}
        </div>
        {t.would_recommend && (
          <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-600 text-green-700">
            <ThumbsUp size={12} /> Recommended
          </span>
        )}
      </div>
      {t.title && (
        <h3 className="mt-5 font-display text-lg font-600 text-slate-900">
          {t.title}
        </h3>
      )}
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">
        "{t.body}"
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-slate-900 font-600 text-white">
          {t.author_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-600 text-slate-900">{t.author_name}</p>
          <p className="text-sm text-slate-400">
            {t.location ? t.location : 'Delaware'}
            {t.project_type ? ` · ${t.project_type}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [writing, setWriting] = useState(false);

  const meta = getPageMeta('testimonials');
  const breadcrumbs = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Reviews', path: '/testimonials' },
  ]);

  const avg = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const reviewSchema = useMemo(() => {
    if (!reviews.length) return [];
    return buildReviewSchema(
      reviews.map((r) => ({
        author: r.author_name,
        rating: r.rating,
        text: r.body,
        date: r.created_at,
        projectType: r.project_type ?? undefined,
      })),
    );
  }, [reviews]);

  const localBusinessOverride = useMemo(() => {
    if (!reviews.length) return undefined;
    return buildLocalBusinessWithRating(
      avg,
      reviews.length,
      reviews.map((r) => ({
        author: r.author_name,
        rating: r.rating,
        text: r.body,
        date: r.created_at,
      })),
    );
  }, [reviews, avg]);

  useSEO(meta, 'testimonials', [breadcrumbs, ...reviewSchema], localBusinessOverride);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });
    if (!error && data) setReviews(data as Testimonial[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-50 pt-32 pb-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-600 uppercase tracking-widest text-orange-600">
              Client Reviews
            </p>
            <h1 className="mt-3 font-display text-4xl font-600 tracking-tight text-slate-900 text-balance sm:text-5xl lg:text-6xl">
              What Wilmington homeowners say
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 text-pretty">
              We let our work — and their words — do the talking.
            </p>
            {reviews.length > 0 && (
              <div className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-sm">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i <= Math.round(avg)
                          ? 'fill-orange-500 text-orange-500'
                          : 'fill-transparent text-slate-200'
                      }
                    />
                  ))}
                </div>
                <span className="font-display text-2xl font-700 text-slate-900">
                  {avg.toFixed(1)}
                </span>
                <span className="text-sm text-slate-500">
                  from {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Write a review CTA */}
      <section className="py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            {!writing ? (
              <RevealSection>
                <div className="flex flex-col items-center gap-6 rounded-3xl bg-slate-900 p-10 text-center sm:p-14">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-orange-400">
                    <PencilLine size={28} strokeWidth={1.6} />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-600 text-white sm:text-3xl">
                      Worked with us recently?
                    </h2>
                    <p className="mt-3 text-slate-300 leading-relaxed">
                      Take a minute to leave a review. It's quick, and it helps
                      your neighbors find someone they can trust.
                    </p>
                  </div>
                  <button
                    onClick={() => setWriting(true)}
                    className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-600 text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 active:scale-95"
                  >
                    Write a review
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </RevealSection>
            ) : (
              <RevealSection>
                <ReviewWizard onDone={() => { setWriting(false); load(); }} />
              </RevealSection>
            )}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="pb-24">
        <div className="container-wide">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="animate-spin text-slate-300" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-20 text-center">
              <Quote size={40} className="mx-auto text-slate-200" />
              <p className="mt-4 text-lg text-slate-500">
                No reviews yet. Be the first to share how it went.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((t, i) => (
                <RevealSection key={t.id} delay={(i % 3) * 80}>
                  <ReviewCard t={t} />
                </RevealSection>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link
              to="/estimate"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-600 text-slate-900 ring-1 ring-slate-300 transition-all duration-300 hover:bg-slate-50 hover:ring-slate-400"
            >
              Ready to start your project?
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
