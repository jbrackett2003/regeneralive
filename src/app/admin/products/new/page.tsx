import { listCategories } from "@/lib/repos";
import { ProductForm } from "../../_components/product-form";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  const categories = listCategories();
  return (
    <ProductForm
      isNew
      categories={categories}
      initial={{
        slug: "",
        name: "",
        brand: "",
        tagline: "",
        description: "",
        price: 0,
        imageUrl: "",
        galleryUrls: [],
        categorySlug: categories[0]?.slug || "",
        affiliateUrl: "",
        merchant: "",
        certifications: [],
        goals: [],
        rating: 4.5,
        isEditorPick: false,
        isFeatured: false,
        isHidden: false,
        pros: [],
        cons: [],
        ingredients: "",
        servingSize: "",
        dealLabel: "",
        dealStartsAt: "",
        dealEndsAt: "",
      }}
    />
  );
}