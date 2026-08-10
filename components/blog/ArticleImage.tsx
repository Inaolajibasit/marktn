import Image from "next/image";
import {urlFor} from "@/sanity/lib/image";
import type {SanityImage} from "@/sanity/lib/types";

export function ArticleImage({image,title,className=""}:{image?:SanityImage;title:string;className?:string}){
  if(!image?.asset)return <div className={`relative overflow-hidden bg-teal ${className}`}><div className="absolute -right-12 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-paper/25"/><div className="absolute -right-4 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full border border-rust/80"/><span className="absolute bottom-5 left-5 max-w-[70%] font-display text-2xl italic text-paper">{title}</span></div>;
  return <div className={`relative overflow-hidden bg-paper-line ${className}`}><Image src={urlFor(image).width(1400).height(900).fit("crop").url()} alt={image.alt||""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw"/></div>;
}
