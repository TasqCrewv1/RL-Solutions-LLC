import LegalLayout from '../components/LegalLayout';
import { useSEO, buildBreadcrumbs } from '../lib/useSEO';
import { getPageMeta } from '../lib/seo';
import PhoneNumber from '../components/PhoneNumber';

export default function Terms() {
  const meta = getPageMeta('terms');
  const breadcrumbs = buildBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Terms & Conditions', path: '/terms' },
  ]);
  useSEO(meta, 'terms', [breadcrumbs]);
  return (
    <LegalLayout
      title="Terms & Conditions"
      subtitle="The terms that govern your use of the RL Solutions website and the services we provide."
      lastUpdated="July 17, 2026"
    >
      <p>
        Please read these Terms & Conditions carefully before using the RL
        Solutions LLC website or engaging our services. By accessing this site or
        requesting work, you agree to be bound by these terms.
      </p>

      <h2>1. Use of This Website</h2>
      <p>
        You may use this website for personal, non-commercial purposes including
        researching our services, requesting estimates, and reading reviews. You
        agree not to:
      </p>
      <ul>
        <li>Use the site in any way that violates applicable laws or regulations</li>
        <li>Attempt to gain unauthorized access to systems, data, or accounts</li>
        <li>Submit false, misleading, or fraudulent estimate requests</li>
        <li>Post reviews that are defamatory, abusive, or contain content you do not have the right to publish</li>
        <li>Interfere with or disrupt the site's operation, servers, or security features</li>
      </ul>

      <h2>2. Estimates and Pricing</h2>
      <p>
        The cost ranges produced by our online calculators are estimates based on
        regional averages and the information you provide. They are not a
        binding quote. A final, written quote is issued only after an on-site
        evaluation by RL Solutions. Pricing is valid for 30 days from the quote
        date unless otherwise stated.
      </p>

      <h2>3. Engaging Our Services</h2>
      <p>
        A project is considered scheduled once you accept a written quote and, if
        required, pay a deposit. The deposit amount will be specified in the
        quote. You may cancel a scheduled project with written notice. Deposits
        may be non-refundable for materials already ordered or work already
        performed, as permitted by applicable Delaware or Pennsylvania law. For
        home improvement projects located in Pennsylvania, our written contracts
        comply with the Pennsylvania Home Improvement Consumer Protection Act
        (HICPA), including required disclosures, a description of the work,
        approximate start and completion dates, and the total contract price.
      </p>

      <h2>4. Warranties</h2>
      <p>
        RL Solutions warrants its workmanship against defects for a period
        specified in your contract (typically one year from project completion).
        This warranty does not cover:
      </p>
      <ul>
        <li>Damage caused by normal wear and tear, weather, or natural events</li>
        <li>Modifications or repairs performed by anyone other than RL Solutions</li>
        <li>Materials supplied by the customer or third parties</li>
        <li>Issues arising from pre-existing structural conditions not disclosed at the time of quoting</li>
      </ul>
      <p>
        Manufacturer warranties on materials (decking, fixtures, hardware, etc.)
        are passed through to you according to the manufacturer's terms.
      </p>

      <h2>5. Payment Terms</h2>
      <p>
        Unless otherwise agreed in writing, payment is due upon project
        completion. For larger projects, a milestone payment schedule may be
        specified in the quote. Invoices not paid within 15 days of the due date
        may be subject to a late fee of 1.5% per month, to the extent permitted
        by law. We accept checks and major payment methods agreed at contract
        signing.
      </p>

      <h2>6. Reviews and User Content</h2>
      <p>
        When you submit a review, you grant RL Solutions a non-exclusive,
        royalty-free license to display, reproduce, and adapt that content on our
        website and marketing materials. You represent that the review is
        truthful, is your own opinion, and does not infringe anyone else's
        rights. We reserve the right to moderate, edit, or remove reviews at our
        discretion.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, RL Solutions LLC shall not be
        liable for any indirect, incidental, consequential, or punitive damages
        arising from your use of this website or our services. Our total
        liability for any claim related to a project shall not exceed the amount
        you paid for that specific project.
      </p>

      <h2>8. Intellectual Property</h2>
      <p>
        All content on this website — including text, graphics, logos, images,
        and the RL Solutions name — is the property of RL Solutions LLC or its
        licensors and is protected by intellectual property laws. You may not
        reproduce, distribute, or create derivative works without our written
        permission.
      </p>

      <h2>9. Third-Party Links</h2>
      <p>
        This website may contain links to third-party sites for your
        convenience. We do not control and are not responsible for the content,
        privacy practices, or accuracy of those sites. Visiting a linked site is
        at your own risk.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These terms and your use of this website are governed by the laws of the
        State of Delaware, without regard to its conflict-of-law principles.
        For service contracts for projects located in Pennsylvania, Pennsylvania
        law — including the Pennsylvania Home Improvement Consumer Protection
        Act — applies to the extent required by statute. Any dispute arising
        from a Delaware project shall be resolved in the state or federal courts
        located in New Castle County, Delaware. Any dispute arising from a
        Pennsylvania project may be resolved in the courts of the Pennsylvania
        county where the project is located, unless otherwise agreed in writing.
      </p>

      <h2>11. Changes to These Terms</h2>
      <p>
        We may revise these Terms & Conditions at any time. Updates will be
        posted here with a revised "last updated" date. Your continued use of the
        site after changes take effect constitutes acceptance of the revised
        terms.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        RL Solutions LLC<br />
        Wilmington, Delaware<br />
        Phone: <PhoneNumber inline className="font-600 text-slate-800" /><br />
        Email: <a href="mailto:hello@rlsolutions.com">hello@rlsolutions.com</a>
      </p>
    </LegalLayout>
  );
}
