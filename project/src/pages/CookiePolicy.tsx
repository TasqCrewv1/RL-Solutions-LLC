import { Link } from 'react-router-dom';
import LegalLayout from '../components/LegalLayout';
import { useSEO, buildBreadcrumbs } from '../lib/useSEO';
import { getPageMeta } from '../lib/seo';
import PhoneNumber from '../components/PhoneNumber';

export default function CookiePolicy() {
  const meta = getPageMeta('cookie-policy');
  const breadcrumbs = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
  ]);
  useSEO(meta, 'cookie-policy', [breadcrumbs]);
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="What cookies and similar technologies we use, why we use them, and how you can control them."
      lastUpdated="July 17, 2026"
    >
      <p>
        This Cookie Policy explains how RL Solutions LLC uses cookies and similar
        tracking technologies on our website. For information about how we handle
        your personal data more broadly, see our{' '}
        <Link to="/privacy" className="text-orange-600 underline underline-offset-2 hover:text-orange-700">Privacy Policy</Link>.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files placed on your device when you visit a
        website. They allow the site to remember your actions and preferences
        over time. Most browsers accept cookies automatically, but you can
        control or delete them through your browser settings.
      </p>

      <h2>2. Types of Cookies We Use</h2>

      <h3>Strictly necessary cookies</h3>
      <p>
        These cookies are essential for the website to function. They enable
        core features like navigating the site and submitting forms. The website
        cannot work properly without them. They do not require your consent.
      </p>

      <h3>Preference cookies</h3>
      <p>
        These remember choices you make (such as your cookie preferences
        themselves or region settings) to provide a more personalized
        experience. They are optional and can be disabled.
      </p>

      <h3>Analytics cookies</h3>
      <p>
        These help us understand how visitors interact with the site by
        collecting aggregated, anonymous data about page visits, session
        duration, and traffic sources. We use this to improve the site over
        time. They require your consent.
      </p>

      <h2>3. Specific Cookies We Set</h2>
      <ul>
        <li><strong>cookie_consent:</strong> Stores your cookie preference choice so we do not ask you again on every visit. Duration: 12 months.</li>
        <li><strong>session_id:</strong> Maintains your browsing session across page loads. Duration: Session (cleared when you close your browser).</li>
        <li><strong>analytics_id:</strong> An anonymous identifier used by our analytics provider to aggregate usage statistics. Duration: 24 months. Only set if you consent.</li>
      </ul>

      <h2>4. Third-Party Cookies</h2>
      <p>
        We do not allow third-party advertising or tracking cookies. Our
        analytics provider, if enabled by your consent, may set its own
        identifiers. We have configured analytics to anonymize IP addresses
        where possible.
      </p>

      <h2>5. Managing Cookies</h2>
      <p>
        You can accept or reject non-essential cookies at any time using our{' '}
        <Link to="/cookie-settings" className="text-orange-600 underline underline-offset-2 hover:text-orange-700">Cookie Settings</Link> tool. You can also
        remove cookies already on your device through your browser settings:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac">Apple Safari</a></li>
        <li><a href="https://support.microsoft.com/help/17442/microsoft-edge-delete-cookies">Microsoft Edge</a></li>
      </ul>
      <p>
        Disabling all cookies may affect website functionality — for example,
        you may not be able to submit an estimate request or save cookie
        preferences.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        If we add, remove, or change the cookies we use, we will update this
        policy and revise the "last updated" date. Any new non-essential cookie
        will require your consent before it is set.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        Questions about cookies? Email{' '}
        <a href="mailto:hello@rlsolutions.com">hello@rlsolutions.com</a> or call{' '}
        <PhoneNumber inline className="font-600 text-slate-800" />.
      </p>
    </LegalLayout>
  );
}
