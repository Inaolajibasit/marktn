import type {Metadata} from "next";
import {BlogIndex} from "@/components/blog/BlogIndex";
import {Newsletter} from "@/components/blog/Newsletter";
import {PostCard} from "@/components/blog/PostCard";
import {sanityFetch} from "@/sanity/lib/fetch";
import {categoriesQuery,postsQuery} from "@/sanity/lib/queries";
import type {Category,PostCard as Post} from "@/sanity/lib/types";

export const metadata:Metadata={title:"Blog | marktn PR",description:"Perspectives on public relations, reputation, culture and communications from marktn PR.",alternates:{canonical:"/blog"}};
export default async function BlogPage(){const [posts,categories]=await Promise.all([sanityFetch<Post[]>({query:postsQuery}),sanityFetch<Category[]>({query:categoriesQuery})]);const featured=posts.find((p:Post)=>p.featured)||posts[0];const recent=featured?posts.filter((p:Post)=>p._id!==featured._id):posts;return <main>
  <header className="bg-teal px-gutter pb-20 pt-40 text-paper"><div className="mx-auto max-w-7xl"><p className="font-mono text-eyebrow uppercase text-rust">Ideas & field notes</p><h1 className="mt-5 max-w-5xl font-display text-display-2 italic">Clarity for brands that want to matter.</h1></div></header>
  <section className="px-gutter py-section"><div className="mx-auto max-w-7xl">{featured?<><p className="mb-6 font-mono text-eyebrow uppercase text-ink-40">Featured</p><PostCard post={featured} large/><div className="my-20 border-t border-paper-line"/><BlogIndex posts={recent} categories={categories}/></>:<div className="py-24 text-center"><h2 className="font-display text-4xl italic">The first story is taking shape.</h2><p className="mt-4 text-ink-60">Publish a post in Sanity Studio and it will appear here.</p></div>}</div></section>
  <Newsletter/>
  </main>}
