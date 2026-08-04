"use server";

import { z } from "zod";
import { Resend } from "resend";

const ContactSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Tell us a little more about the project."),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof ContactSchema>, string>>;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(_prevState: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    budget: formData.get("budget"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof ContactSchema>;
      fieldErrors[key] = issue.message;
    }
    return { status: "error", fieldErrors, message: "Please check the form and try again." };
  }

  const { name, email, company, budget, message } = parsed.data;

  try {
    await resend.emails.send({
      from: "marktn PR <enquiries@marktnpr.com>",
      to: "hello@marktnpr.com",
      replyTo: email,
      subject: `New enquiry — ${name}${company ? ` (${company})` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company ?? "—"}\nBudget: ${budget ?? "—"}\n\n${message}`,
    });
    return { status: "success", message: "Thank you — we'll reply within two business days." };
  } catch {
    return { status: "error", message: "Something went wrong sending your message. Please email hello@marktnpr.com directly." };
  }
}
