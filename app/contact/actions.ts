"use server";

import { z } from "zod";
import { Resend } from "resend";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  service: z.string().trim().max(100).optional(),
  company: z.string().trim().optional(),
  budget: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a little more about the project."),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof ContactSchema>, string>>;
};

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    service: formData.get("service") || undefined,
    company: formData.get("company") || undefined,
    budget: formData.get("budget") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof ContactSchema>;
      fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      fieldErrors,
      message: "Please check the form and try again.",
    };
  }

  const { name, email, service, company, budget, message } = parsed.data;

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Contact email is not configured: RESEND_API_KEY is missing.");
      return {
        status: "error",
        message: "Please email Info@marktn.com to start your enquiry.",
      };
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL?.trim() || "MARKTN <Info@marktn.com>",
      to: "Info@marktn.com",
      replyTo: email,
      subject: `New enquiry — ${name}${company ? ` (${company})` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service ?? "—"}\nCompany: ${company ?? "—"}\nBudget: ${budget ?? "—"}\n\n${message}`,
    });
    if (error || !data?.id) {
      console.error("Contact email was not accepted by Resend.", {
        name: error?.name ?? "missing_email_id",
        message: error?.message ?? "Resend did not return an email ID.",
      });
      return {
        status: "error",
        message:
          "We couldn’t send your enquiry. Please try again or email Info@marktn.com directly.",
      };
    }
    return {
      status: "success",
      message: "Thank you — your enquiry has been sent. We’ll be in touch.",
    };
  } catch {
    console.error("Contact email failed before Resend could confirm acceptance.");
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please email Info@marktn.com directly.",
    };
  }
}
