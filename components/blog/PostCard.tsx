import Link from "next/link";
import type {PostCard as PostCardType} from "@/sanity/lib/types";
import {ArticleImage} from "./ArticleImage";

export function PostCard({post,large=false}:{post:PostCardType;large?:boolean}){return <article className="group">
  <Link href={`/blog/${post.slug}`} className="block" data-cursor="click">
    <ArticleImage image={post.featuredImage} title={post.title} className={large?"aspect-[16/9]":"aspect-[4/3]"}/>
    <div className="mt-5 flex items-center gap-3 font-mono text-caption uppercase tracking-wider text-ink-40"><span className="text-rust">{post.category?.title||"Insight"}</span><span aria-hidden>·</span><time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("en",{dateStyle:"medium"}).format(new Date(post.publishedAt))}</time></div>
    <h2 className={`${large?"text-display-3":"text-3xl"} mt-3 font-display leading-tight transition-colors group-hover:text-rust`}>{post.title}</h2>
    <p className="mt-3 max-w-2xl leading-7 text-ink-60">{post.excerpt}</p>
  </Link>
</article>}
