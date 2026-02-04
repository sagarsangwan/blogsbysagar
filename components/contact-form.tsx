// components/contact-form.tsx
"use client"

import { useState } from "react";
import { submitContactForm } from "@/lib/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function ContactForm() {
  const [status, setStatus] = useState<{success?: boolean; error?: string} | null>(null);

  async function handleSubmit(formData: FormData) {
    const res = await submitContactForm(formData);
    setStatus(res);
    if (res.success) {
      (document.getElementById("contact-form") as HTMLFormElement).reset();
    }
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container max-w-xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>Have a question? Drop a message below.</CardDescription>
          </CardHeader>
          <CardContent>
            {status?.success ? (
              <div className="text-green-600 font-medium">Message sent! I&aposll get back to you soon.</div>
            ) : (
              <form id="contact-form" action={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Your Name" />
                <Input name="email" type="email" placeholder="Email Address" required />
                <Textarea name="message" placeholder="How can I help?" required />
                {status?.error && <p className="text-red-500 text-sm">{status.error}</p>}
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}