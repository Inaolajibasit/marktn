import {sanityClient} from "./client";

export async function sanityFetch<T>({query,params={}}:{query:string;params?:Record<string,unknown>}):Promise<T>{
  return sanityClient.fetch<T>(query,params,{next:{revalidate:60,tags:["sanity-content"]}});
}
