export type SanityImage={asset?:{_ref?:string;url?:string};alt?:string;caption?:string;hotspot?:unknown;crop?:unknown};
export type Category={_id?:string;title:string;slug:string;description?:string};
export type Author={name:string;role?:string;bio?:string;image?:SanityImage};
export type PostCard={_id:string;title:string;slug:string;excerpt:string;publishedAt:string;featured?:boolean;readingTime?:number;featuredImage?:SanityImage;author?:Author;category?:Category;tags?:Category[]};
export type Post=PostCard&{body:any[];cta?:{heading?:string;copy?:string;label?:string;href?:string};seoTitle?:string;seoDescription?:string;seoImage?:SanityImage;related?:PostCard[]};
