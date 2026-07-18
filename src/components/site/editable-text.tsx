import "server-only";
import { registerBlock, getBlockValue } from "@/lib/repos";

/**
 * <EditableText id="..." defaultValue="..." />
 *
 * Renders an admin-editable string. On every render, the block's metadata
 * is upserted into the DB (so admin always sees every block), and the
 * current override value (or the default) is returned.
 *
 * Use `as="span"` (default), `"h1"`, `"p"`, etc. to wrap with a tag.
 * Pass `className` to style; passes through to the wrapper tag.
 *
 *   <EditableText
 *     id="home.hero.h1"
 *     page="home"
 *     label="Hero headline"
 *     as="h1"
 *     className="font-serif text-6xl"
 *     defaultValue="Regenerative living, simplified."
 *   />
 *
 * For HTML/Markdown blocks, pass `kind="html"` and use `<EditableBlock>`
 * which dangerouslySetsInnerHTML.
 */
type Tag =
  | "span"
  | "p"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "li"
  | "small"
  | "strong"
  | "em"
  | "button"
  | "a";

export function EditableText({
  id,
  defaultValue,
  page,
  label,
  as: Tag = "span" as Tag,
  className,
  href,
}: {
  id: string;
  defaultValue: string;
  page?: string;
  label?: string;
  as?: Tag;
  className?: string;
  href?: string;
}) {
  // Register metadata on every render (idempotent UPDATE — preserves user value)
  registerBlock({ key: id, defaultValue, kind: "text", page, label });
  const value = getBlockValue(id, defaultValue);
  const Component = Tag as any;
  if (Tag === "a" && href) {
    return (
      <Component className={className} href={href}>
        {value}
      </Component>
    );
  }
  return <Component className={className}>{value}</Component>;
}

/** Same as EditableText but renders the value as raw HTML.  */
export function EditableHTML({
  id,
  defaultValue,
  page,
  label,
  as: Tag = "div" as Tag,
  className,
}: {
  id: string;
  defaultValue: string;
  page?: string;
  label?: string;
  as?: Tag;
  className?: string;
}) {
  registerBlock({ key: id, defaultValue, kind: "html", page, label });
  const value = getBlockValue(id, defaultValue);
  const Component = Tag as any;
  return (
    <Component
      className={className}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted admin-authored HTML
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}