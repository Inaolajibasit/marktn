import Link from "next/link";
import {ArticleImage} from "@/components/blog/ArticleImage";
import {sanityFetch} from "@/sanity/lib/fetch";
import {homePostsQuery} from "@/sanity/lib/queries";
import type {PostCard} from "@/sanity/lib/types";

const formatDate=(date:string)=>new Intl.DateTimeFormat("en",{month:"short",day:"numeric",year:"numeric"}).format(new Date(date));

export async function HomeBlog(){
  const posts=await sanityFetch<PostCard[]>({query:homePostsQuery});
  if(!posts.length)return null;
  const [lead,...more]=posts;
  return <section className="bg-paper px-gutter py-section" aria-labelledby="home-blog-title">
    <div className="mx-auto max-w-content">
      <div className="flex items-end justify-between gap-6 border-b border-paper-line pb-6">
        <div><p className="eyebrow text-rust">Ideas &amp; field notes</p><h2 id="home-blog-title" className="mt-4 font-display text-display-3 italic">Latest thinking.</h2></div>
        <Link href="/blog" className="inline-flex min-h-11 items-center border-b border-rust font-mono text-caption uppercase tracking-[0.12em] transition-colors hover:text-rust">View all articles</Link>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <article className="group lg:col-span-7">
          <Link href={`/blog/${lead.slug}`} className="block" data-cursor="click">
            <ArticleImage image={lead.featuredImage} title={lead.title} className="aspect-[16/10]"/>
            <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-caption uppercase tracking-[0.08em] text-ink-40"><span className="text-rust">{lead.category?.title||"Insight"}</span><span aria-hidden>·</span><time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time>{lead.readingTime&&<><span aria-hidden>·</span><span>{lead.readingTime} min read</span></>}</div>
            <h3 className="mt-3 max-w-3xl font-display text-display-3 leading-none transition-colors duration-200 group-hover:text-rust">{lead.title}</h3>
            <p className="mt-4 max-w-2xl text-body text-ink-60">{lead.excerpt}</p>
          </Link>
        </article>

        <div className="divide-y divide-paper-line border-y border-paper-line lg:col-span-5 lg:border-t-0">
          {more.map((post,index)=><article key={post._id} className="group py-8 first:pt-0 lg:first:pt-0">
            <Link href={`/blog/${post.slug}`} className="grid min-h-44 grid-cols-[1fr_7rem] gap-6 sm:grid-cols-[1fr_10rem]" data-cursor="click">
              <div className="flex flex-col"><p className="font-mono text-caption uppercase tracking-[0.08em] text-rust">{String(index+2).padStart(2,"0")} / {post.category?.title||"Insight"}</p><h3 className="mt-4 font-display text-3xl leading-tight transition-colors duration-200 group-hover:text-rust">{post.title}</h3><time dateTime={post.publishedAt} className="mt-auto pt-5 font-mono text-caption uppercase text-ink-40">{formatDate(post.publishedAt)}</time></div>
              <ArticleImage image={post.featuredImage} title={post.title} className="aspect-[3/4] self-start"/>
            </Link>
          </article>)}
        </div>
      </div>
    </div>
  </section>
}
