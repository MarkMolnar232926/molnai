import Link from "next/link";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import type { Post } from "@/data/blog";
import { formatDate } from "@/lib/format";

export function BlogCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className={`relative overflow-hidden rounded-[var(--radius-card)] ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`} style={artBackground(post.tone)}>
        <ProductArt kind={post.art} tone={post.tone} className="absolute inset-0 m-auto h-3/4 w-3/4 transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:rotate-3" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold">{post.category}</span>
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} perc olvasás
        </p>
        <h3 className={`mt-2 font-bold leading-tight ${large ? "text-h3" : "text-xl"}`}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-muted">{post.excerpt}</p>
      </div>
    </article>
  );
}
