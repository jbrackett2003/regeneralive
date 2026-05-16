export const metadata = {
  title: "Affiliate Disclosure · Regeneralive",
  description:
    "How affiliate links work on Regeneralive, and our editorial firewall.",
};

export default function DisclosurePage() {
  return (
    <>
      <section className="container-narrow pt-20 pb-12 md:pt-28">
        <p className="eyebrow">Plain language</p>
        <h1 className="mt-4 font-serif display-2 text-ink">
          Affiliate disclosure, privacy, and terms.
        </h1>
        <p className="mt-5 text-lg text-ink/65">
          Last updated April 2025.
        </p>
      </section>

      <section id="affiliate" className="container-narrow py-12">
        <h2 className="font-serif text-3xl text-ink">Affiliate links</h2>
        <div className="prose-editorial mt-6 text-base">
          <p>
            Regeneralive participates in affiliate marketing programs. This
            means: when you click a product link on this site and make a
            purchase from the merchant, we may earn a small commission at no
            additional cost to you.
          </p>
          <p>
            This disclosure complies with the U.S. Federal Trade Commission's
            16 CFR Part 255 — guidelines on the use of endorsements and
            testimonials in advertising.
          </p>

          <h3>What affiliate revenue does <em>not</em> change:</h3>
          <ul>
            <li>
              Whether a product appears on Regeneralive. Every product passes
              our four-question editorial test before it earns a place here.
            </li>
            <li>
              The opinions in our reviews. We have published critical things
              about brands we partner with. We have refused to publish positive
              things about brands who wanted to pay for placement.
            </li>
            <li>
              The price you pay. Affiliate commissions are paid by the merchant
              from their margins, not added to your purchase.
            </li>
          </ul>

          <h3>What it does fund:</h3>
          <ul>
            <li>The time it takes to test products properly.</li>
            <li>Independent third-party lab work where helpful.</li>
            <li>The site, the team, and the long arc of the work.</li>
          </ul>

          <h3>How to identify affiliate links</h3>
          <p>
            Every outbound product link on Regeneralive routes through{" "}
            <code>regeneralive.com/go/[product]</code>. These links carry the{" "}
            <code>rel="sponsored"</code> attribute as required by FTC and search
            engine guidelines. Inline product callouts inside articles are also
            affiliate links unless explicitly noted otherwise.
          </p>
        </div>
      </section>

      <section id="privacy" className="container-narrow py-12">
        <h2 className="font-serif text-3xl text-ink">Privacy</h2>
        <div className="prose-editorial mt-6 text-base">
          <p>
            We collect minimal data. Specifically:
          </p>
          <ul>
            <li>
              <strong>Email addresses</strong> when you subscribe to the
              newsletter. We never share or sell them. You can unsubscribe in
              one click from any email.
            </li>
            <li>
              <strong>Anonymous click events</strong> on outbound product links,
              so we can see which reviews are useful. No personal data is
              attached.
            </li>
            <li>
              <strong>Anonymous traffic analytics</strong> via a privacy-respecting
              service. No personally-identifying tracking pixels.
            </li>
          </ul>
          <p>
            We do not sell data. We do not run third-party advertising. We do
            not embed Facebook or TikTok pixels. The site is funded entirely by
            affiliate commissions and reader-supported newsletter sponsorships
            (clearly labeled when present).
          </p>
        </div>
      </section>

      <section id="terms" className="container-narrow py-12 pb-32">
        <h2 className="font-serif text-3xl text-ink">Terms of use</h2>
        <div className="prose-editorial mt-6 text-base">
          <p>
            The content on Regeneralive is for informational and editorial
            purposes only. It is not medical advice. Talk to a qualified
            healthcare provider before starting a new supplement or meaningfully
            changing your diet, especially if you are pregnant, nursing, on
            medication, or being treated for a condition.
          </p>
          <p>
            Our reviews represent our independent editorial judgment. We make
            our best effort to verify claims, but products and prices change.
            Always read the merchant's product page and label before purchasing.
          </p>
          <p>
            By using this site you agree that Regeneralive is not liable for
            any decisions you make based on its content. Buy responsibly,
            think critically, and trust your body more than any review.
          </p>
        </div>
      </section>
    </>
  );
}