import { ChangePasswordForm } from "../_components/change-password-form";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <p className="label-mono text-ink/60">Settings</p>
        <h1 className="mt-2 font-serif text-4xl text-ink leading-none">
          Settings
        </h1>
      </div>
      <ChangePasswordForm />
      <div className="rounded-2xl border border-ink/10 bg-white p-6">
        <h3 className="font-serif text-lg text-ink mb-2">Domain</h3>
        <p className="text-sm text-ink/60">
          To use your own domain (e.g. regeneralive.com), follow the deployment
          guide. Once deployed, point your DNS A or CNAME record to your hosting
          provider.
        </p>
      </div>
      <div className="rounded-2xl border border-ink/10 bg-white p-6">
        <h3 className="font-serif text-lg text-ink mb-2">Affiliate disclosure</h3>
        <p className="text-sm text-ink/60">
          Your site already includes FTC-compliant affiliate disclosures on every product card and detail page, plus a dedicated{" "}
          <a href="/disclosure" target="_blank" className="underline">disclosure page</a>.
          This is required by law for all affiliate sites.
        </p>
      </div>
    </div>
  );
}