import { PromotionForm } from "../../_components/promotion-form";

export const dynamic = "force-dynamic";

export default function NewPromotionPage() {
  return (
    <PromotionForm
      isNew
      initial={{
        label: "",
        message: "",
        ctaText: "",
        ctaUrl: "",
        startsAt: "",
        endsAt: "",
        isActive: true,
      }}
    />
  );
}