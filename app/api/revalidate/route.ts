import {revalidateTag} from "next/cache";
import {NextResponse} from "next/server";
export async function POST(request:Request){if(!process.env.SANITY_REVALIDATE_SECRET)return NextResponse.json({error:"Not configured"},{status:503});if(request.headers.get("authorization")!==`Bearer ${process.env.SANITY_REVALIDATE_SECRET}`)return NextResponse.json({error:"Unauthorized"},{status:401});revalidateTag("sanity-content");return NextResponse.json({revalidated:true,now:Date.now()})}
