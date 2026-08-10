"use client";
import {useState} from "react";
import type {Category,PostCard as Post} from "@/sanity/lib/types";
import {PostCard} from "./PostCard";

const PAGE=6;
export function BlogIndex({posts,categories}:{posts:Post[];categories:Category[]}){const [category,setCategory]=useState("all");const [shown,setShown]=useState(PAGE);const filtered=category==="all"?posts:posts.filter(p=>p.category?.slug===category);return <>
  <div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category"><button onClick={()=>{setCategory("all");setShown(PAGE)}} className={`rounded-full border px-4 py-2 font-mono text-caption uppercase ${category==="all"?"border-ink bg-ink text-paper":"border-paper-line"}`}>All</button>{categories.map(c=><button key={c.slug} onClick={()=>{setCategory(c.slug);setShown(PAGE)}} className={`rounded-full border px-4 py-2 font-mono text-caption uppercase ${category===c.slug?"border-ink bg-ink text-paper":"border-paper-line"}`}>{c.title}</button>)}</div>
  <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">{filtered.slice(0,shown).map(p=><PostCard key={p._id} post={p}/>)}</div>
  {filtered.length>shown&&<div className="mt-16 text-center"><button onClick={()=>setShown(n=>n+PAGE)} className="border-b border-rust pb-2 font-mono text-sm uppercase tracking-widest">Load more</button></div>}
  {!filtered.length&&<p className="py-16 text-ink-60">No articles in this category yet.</p>}
  </>}
