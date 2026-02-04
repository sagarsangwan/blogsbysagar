// app/actions/contact.ts
"use server";

import { db } from "@/drizzle/src/db";
import { contact } from "@/drizzle/src/db/schema";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!email || !message) {
    return { error: "Email and message are required." };
  }

  try {
    await db.insert(contact).values({
      name,
      email,
      message,
    });

    revalidatePath("/admin"); // So your admin table updates immediately
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong. Try again." };
  }
}
