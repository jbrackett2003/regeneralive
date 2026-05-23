import { notFound } from "next/navigation";
import { getProductById, listCategories } from "@/lib/repos";
import { ProductForm } from "../../../_components/product-form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id) as any;
  if (!product) notFound();
  const categories = listCategories();

  // Convert ISO datetimes (which DB stores) into datetime-local format for inputs
  const dl = (s: string | null | undefined) =>
    s ? s.slice(0, 16) : "";

  return (
    <ProductForm
      categories={categories}
      initial={{
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        tagline: product.tagline,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        galleryUrls: product.galleryUrls || [],
        categorySlug: product.categorySlug,
        affiliateUrl: product.affiliateUrl,
        merchant: product.merchant,
        certifications: product.certifications || [],
        goals: product.goals || [],
        rating: product.rating,
        isEditorPick: product.isEditorPick,
        isFeatured: product.isFeatured,
        isHidden: product.isHidden,
        pros: product.pros || [],
        cons: product.cons || [],
        ingredients: product.ingredients || "",
        servingSize: product.servingSize || "",
        dealLabel: product.dealLabel || "",
        dealStartsAt: dl(product.dealStartsAt),
        dealEndsAt: dl(product.dealEndsAt),
      }}
    />
  );
}