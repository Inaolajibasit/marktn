import {NextResponse} from "next/server";
import {Resend} from "resend";
import {z} from "zod";

const schema=z.object({email:z.string().email()});
export async function POST(request:Request){try{const body=schema.safeParse(await request.json());if(!body.success)return NextResponse.json({error:"A valid email is required."},{status:400});if(!process.env.RESEND_API_KEY)return NextResponse.json({error:"Newsletter is not configured."},{status:503});const resend=new Resend(process.env.RESEND_API_KEY);const {error}=await resend.contacts.create({email:body.data.email,unsubscribed:false});if(error)return NextResponse.json({error:error.message||"Unable to subscribe."},{status:400});return NextResponse.json({ok:true})}catch{return NextResponse.json({error:"Unable to subscribe."},{status:500})}}
