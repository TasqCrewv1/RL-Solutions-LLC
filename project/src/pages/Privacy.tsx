import LegalLayout from '../components/LegalLayout';
import { useSEO, buildBreadcrumbs } from '../lib/useSEO';
import { getPageMeta } from '../lib/seo';
import PhoneNumber from '../components/PhoneNumber';

export default function Privacy() {
  const meta = getPageMeta('privacy');
  const breadcrumbs = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy' },
  ]);
  useSEO(meta, 'privacy', [breadcrumbs]);
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How RL Solutions collects, uses, and protects your information when you use our website and services."
      lastUpdated="July 17, 2026"
    >
      <p>
        RL Solutions LLC ("RL Solutions," "we," "us," or "our") respects your
        privacy. This Privacy Policy explains what personal information we
        collect, how we use it, and the choices you have. By using our website
        or requesting our services, you agree to the practices described here.
      </p>

      <h2>1. Information We Collect</h2>
      <h3>Information you provide directly</h3>
      <p>
        When you request an estimate, contact us, or submit a review, we may
        collect:
      </p>
      <ul>
        <li>Your name and contact details (phone number, email address, mailing address)</li>
        <li>Project details you share through our estimator tools or in conversation</li>
        <li>Photographs or descriptions of your property relevant to a quote</li>
        <li>Review content you choose to publish, including your display name and location</li>
      </ul>
      <h3>Information collected automatically</h3>
      <p>
        When you visit our site, we may automatically collect your IP address,
        browser type, device information, and pages visited. This data is used
        to understand how visitors use the site so we can improve it. See our
        Cookie Policy for details on how cookies are used.
      </p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To respond to estimate requests and provide quotes</li>
        <li>To schedule and perform contracted work at your property</li>
        <li>To communicate with you about your project, appointments, and follow-ups</li>
        <li>To publish testimonials you submit (with your chosen display name)</li>
        <li>To improve our website, services, and estimator accuracy</li>
        <li>To comply with legal obligations and protect against fraud</li>
      </ul>

      <h2>3. How We Share Your Information</h2>
      <p>
        We do not sell your personal information. We may share it in limited
        situations:
      </p>
      <ul>
        <li><strong>Service providers:</strong> Trusted vendors who help us operate (e.g., hosting, analytics), bound by confidentiality obligations</li>
        <li><strong>Subcontractors:</strong> When a project requires specialized trade work, we may share project details with licensed subcontractors under our direction</li>
        <li><strong>Legal compliance:</strong> If required by law, court order, or to protect our rights and safety</li>
        <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or asset sale, information may transfer with the business</li>
      </ul>

      <h2>4. Data Retention</h2>
      <p>
        We retain customer project records for as long as needed to provide
        services and honor warranties. Estimate inquiries are kept for a
        reasonable period in case you follow up. You may ask us to delete your
        contact information at any time (see Your Rights below).
      </p>

      <h2>5. Your Rights</h2>
      <p>
        If you are a resident of Delaware or Pennsylvania, you may have certain
        rights under applicable state law, including:
      </p>
      <ul>
        <li>Access the personal information we hold about you</li>
        <li>Request correction of inaccurate information</li>
        <li>Request deletion of your personal information</li>
        <li>Opt out of the sale or sharing of your personal information (we do not sell it)</li>
        <li>Withdraw consent for any processing based on consent</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at{' '}
        <a href="mailto:hello@rlsolutions.com">hello@rlsolutions.com</a> or call{' '}
        <PhoneNumber inline className="font-600 text-slate-800" />. We will respond within 30 days.
      </p>

      <h2>6. Security</h2>
      <p>
        We take reasonable technical and organizational measures to protect your
        information, including encrypted data transmission and restricted
        access controls. No method of transmission or storage is completely
        secure, but we work to protect your information using industry-standard
        practices.
      </p>

      <h2>7. Children's Privacy</h2>
      <p>
        Our services are intended for homeowners and adult property owners. We do
        not knowingly collect information from children under 13. If you believe
        a child has provided us with personal information, please contact us so
        we can remove it.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with a revised "last updated" date. Material changes
        will be noted on our homepage or communicated directly when we have your
        contact information.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        This Privacy Policy is governed by the laws of the State of Delaware.
        For personal information collected in connection with home improvement
        projects located in Pennsylvania, Pennsylvania law applies to the extent
        required by statute, including the Pennsylvania Home Improvement
        Consumer Protection Act (HICPA).
      </p>

      <h2>10. Contact Us</h2>
      <p>
        RL Solutions LLC<br />
        Wilmington, Delaware<br />
        Phone: <PhoneNumber inline className="font-600 text-slate-800" /><br />
        Email: <a href="mailto:hello@rlsolutions.com">hello@rlsolutions.com</a>
      </p>
    </LegalLayout>
  );
}
