// const allEmails = await db.select().from(newsletter)
import { db } from '@/drizzle/src/db'
import { newsletter, contact } from '@/drizzle/src/db/schema'
import React from 'react'
import { ContactTable } from '@/components/admin/contact-table';
import { NewsletterTable } from '@/components/admin/newsletter-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogoutButton } from '@/components/admin/logout-button';

export default async function AdminPage() {
  const contacts = await db.select().from(contact);
  const subscribers = await db.select().from(newsletter);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <LogoutButton/>
      <Tabs defaultValue="contacts" className="w-full">
        <TabsList>
          <TabsTrigger value="contacts">Contacts ({contacts.length})</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter ({subscribers.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contacts">
          <ContactTable data={contacts} />
        </TabsContent>
        
        <TabsContent value="newsletter">
          <NewsletterTable data={subscribers} />
        </TabsContent>
      </Tabs>
    </div>
  );
}