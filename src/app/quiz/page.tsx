import { listProducts } from "@/lib/repos";
import { QuizClient } from "./quiz-client";

export const metadata = {
  title: "Goal Recommender · Find your shelf in 90 seconds",
  description:
    "Tell us your goal, your starting point, and your budget. We'll match you with three products from our editorial picks.",
};

// Convert products to a lean payload for the client
function getQuizCorpus() {
  const all = listProducts();
  return all.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    tagline: p.tagline,
    price: p.price,
    imageUrl: p.imageUrl,
    categorySlug: p.categorySlug,
    goals: p.goals,
    certifications: p.certifications,
    rating: p.rating,
    isEditorPick: p.isEditorPick,
  }));
}

export default function QuizPage() {
  const corpus = getQuizCorpus();
  return (
    <>
      <section className="container-x pt-20 pb-8 md:pt-32">
        <div className="max-w-3xl">
          <p className="eyebrow">Goal Recommender</p>
          <h1 className="mt-4 font-serif display-1 text-ink">
            Tell us where you are.{" "}
            <span className="italic text-moss">We'll meet you there.</span>
          </h1>
          <p className="mt-6 text-lg text-ink/70 leading-relaxed">
            Three quick questions. We match against the same 100-point rubric
            we use editorially, then surface the products best aligned with
            your specific goal, experience level, and budget.
          </p>
        </div>
      </section>

      <QuizClient corpus={corpus} />
    </>
  );
}