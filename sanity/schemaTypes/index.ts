import {defineArrayMember, defineField, defineType} from "sanity";

const required = (rule: any) => rule.required();

export const schemaTypes = [
  defineType({name:"author",title:"Authors",type:"document",fields:[
    defineField({name:"name",type:"string",validation:required}),
    defineField({name:"role",type:"string"}),
    defineField({name:"bio",type:"text",rows:3}),
    defineField({name:"image",type:"image",options:{hotspot:true},fields:[defineField({name:"alt",type:"string"})]}),
  ],preview:{select:{title:"name",subtitle:"role",media:"image"}}}),
  defineType({name:"category",title:"Categories",type:"document",fields:[
    defineField({name:"title",type:"string",validation:required}),
    defineField({name:"slug",type:"slug",options:{source:"title",maxLength:64},validation:required}),
    defineField({name:"description",type:"text",rows:3}),
  ]}),
  defineType({name:"tag",title:"Tags",type:"document",fields:[
    defineField({name:"title",type:"string",validation:required}),
    defineField({name:"slug",type:"slug",options:{source:"title",maxLength:64},validation:required}),
  ]}),
  defineType({name:"blockContent",title:"Article body",type:"array",of:[
    defineArrayMember({type:"block",styles:[{title:"Normal",value:"normal"},{title:"Heading 2",value:"h2"},{title:"Heading 3",value:"h3"},{title:"Quote",value:"blockquote"}]}),
    defineArrayMember({type:"image",options:{hotspot:true},fields:[defineField({name:"alt",type:"string",validation:required}),defineField({name:"caption",type:"string"})]}),
    defineArrayMember({name:"video",title:"Video",type:"object",fields:[defineField({name:"url",type:"url",description:"YouTube or Vimeo URL",validation:required}),defineField({name:"caption",type:"string"})],preview:{select:{title:"caption",subtitle:"url"},prepare:({title,subtitle})=>({title:title||"Video",subtitle})}}),
    defineArrayMember({name:"pullQuote",title:"Pull quote",type:"object",fields:[defineField({name:"quote",type:"text",rows:3,validation:required}),defineField({name:"attribution",type:"string"})]}),
    defineArrayMember({name:"statistic",title:"Statistic / highlight",type:"object",fields:[defineField({name:"value",type:"string",validation:required}),defineField({name:"label",type:"string",validation:required}),defineField({name:"source",type:"string"})]}),
    defineArrayMember({name:"articleCta",title:"Call to action",type:"object",fields:[defineField({name:"heading",type:"string",validation:required}),defineField({name:"copy",type:"text",rows:2}),defineField({name:"label",type:"string",validation:required}),defineField({name:"href",type:"string",validation:required})]}),
    defineArrayMember({name:"gallery",title:"Image gallery",type:"object",fields:[defineField({name:"images",type:"array",validation:(r:any)=>r.required().min(2),of:[defineArrayMember({type:"image",options:{hotspot:true},fields:[defineField({name:"alt",type:"string",validation:required}),defineField({name:"caption",type:"string"})]})]})]}),
  ]}),
  defineType({name:"post",title:"Posts",type:"document",groups:[{name:"content",title:"Content",default:true},{name:"seo",title:"SEO"}],fields:[
    defineField({name:"title",type:"string",group:"content",validation:required}),
    defineField({name:"slug",type:"slug",group:"content",options:{source:"title",maxLength:96},validation:required}),
    defineField({name:"excerpt",type:"text",rows:3,group:"content",validation:(r:any)=>r.required().max(240)}),
    defineField({name:"featuredImage",type:"image",group:"content",options:{hotspot:true},fields:[defineField({name:"alt",type:"string",validation:required}),defineField({name:"caption",type:"string"})]}),
    defineField({name:"author",type:"reference",to:[{type:"author"}],group:"content",validation:required}),
    defineField({name:"publishedAt",type:"datetime",group:"content",initialValue:()=>new Date().toISOString(),validation:required}),
    defineField({name:"category",type:"reference",to:[{type:"category"}],group:"content",validation:required}),
    defineField({name:"tags",type:"array",group:"content",of:[defineArrayMember({type:"reference",to:[{type:"tag"}]})]}),
    defineField({name:"featured",type:"boolean",group:"content",initialValue:false}),
    defineField({name:"readingTime",type:"number",group:"content",description:"Minutes. Leave empty to calculate from the article body.",validation:(r:any)=>r.min(1)}),
    defineField({name:"body",type:"blockContent",group:"content",validation:required}),
    defineField({name:"relatedArticles",type:"array",group:"content",validation:(r:any)=>r.max(3),of:[defineArrayMember({type:"reference",to:[{type:"post"}],options:{disableNew:true}})]}),
    defineField({name:"cta",title:"Topic-relevant CTA",type:"object",group:"content",fields:[defineField({name:"heading",type:"string"}),defineField({name:"copy",type:"text",rows:2}),defineField({name:"label",type:"string"}),defineField({name:"href",type:"string"})]}),
    defineField({name:"seoTitle",type:"string",group:"seo",validation:(r:any)=>r.max(60)}),
    defineField({name:"seoDescription",type:"text",rows:3,group:"seo",validation:(r:any)=>r.max(160)}),
    defineField({name:"seoImage",type:"image",group:"seo",options:{hotspot:true},fields:[defineField({name:"alt",type:"string"})]}),
  ],preview:{select:{title:"title",subtitle:"category.title",media:"featuredImage"}}}),
];
