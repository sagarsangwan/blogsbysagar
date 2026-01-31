// app/actions/auth.ts
"use server";

import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  // Verify against .env variables
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return { error: "Invalid credentials" };
  }

  // Create the session
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  const session = await encrypt({ user: "admin", expires: expires });

  // Save in HTTP-only cookie
  (await cookies()).set("session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/admin"); // Send to dashboard
}
export async function logout() {
  // Clear the cookie by setting an expiration date in the past
  (await cookies()).set("session", "", {
    expires: new Date(0),
    path: "/", // Ensure it clears for the whole domain
  });

  redirect("/login");
}
