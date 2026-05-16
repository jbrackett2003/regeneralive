import { ContactForm } from "@/components/site/contact-form";
import { Mail, Inbox, Briefcase, Newspaper } from "lucide-react";

export const metadata = {
  title: "Contact · Regeneralive",
  description: "Get in touch with the Regeneralive team.",
};

const channels = [
  {
    icon: Newspaper,
    title: "Press & media",
    body: "Interview requests, quotes, expert sourcing.",
    email: "press@regeneralive.com",
  },
  {
    icon: Briefcase,
    title: "Brand partnerships",
    body: "Affiliate programs, retail partnerships, sponsorships.",
    email: "partnerships@regeneralive.com",
  },
  {
    icon: Inbox,
    title: "Reader questions",
    body: "Ask us anything. We read every email.",
    email: "hello@regeneralive.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="container-x pt-20 pb-12 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Get in touch</p>
            <h1 className="mt-4 font-serif display-1 text-ink">
              We read <span className="italic text-moss">every</span> email.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink/70 leading-relaxed">
              Press inquiries, partnership pitches, reader questions, product
              suggestions, criticism — all welcome. We respond within two
              business days.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="space-y-4">
              {channels.map((c) => (
                <a
                  key={c.title}
                  href={`mailto:${c.email}`}
                  className="group block rounded-2xl border border-ink/10 bg-bone-2/40 p-5 transition-all hover:border-moss"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-moss text-bone">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-ink">{c.title}</h3>
                      <p className="mt-0.5 text-sm text-ink/60">{c.body}</p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-moss">
                        <Mail className="h-3.5 w-3.5" /> {c.email}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="rounded-3xl border border-ink/10 bg-bone-2/40 p-8 md:p-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">Or fill out the form</p>
              <h2 className="mt-3 font-serif display-3 text-ink">
                Send us a note.
              </h2>
              <p className="mt-5 text-ink/65 leading-relaxed">
                We'll route it to the right person. Add as much detail as you'd
                like — we'd rather get a long pitch than a vague one.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}