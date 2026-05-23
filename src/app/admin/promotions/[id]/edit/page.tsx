import { notFound } from "next/navigation";
import { listPromotions } from "@/lib/repos";
import { PromotionForm } from "../../../_components/promotion-form";

export const dynamic = "force-dynamic";

export default async function EditPromotionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const promo = listPromotions().find((p) => p.id === id);
  if (!promo) notFound();

  const dl = (s: string | null) => (s ? s.slice(0, 16) : "");

  return (
    <PromotionForm
      initial={{
        id: promo.id,
        label: promo.label,
        message: promo.message,
        ctaText: promo.ctaText || "",
        ctaUrl: promo.ctaUrl || "",
        startsAt: dl(promo.startsAt),
        endsAt: dl(promo.endsAt),
        isActive: promo.isActive,
      }}
    />
  );
}