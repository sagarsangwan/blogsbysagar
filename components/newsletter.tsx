'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from "sonner";


export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 429) {
          toast.error ('Too many requests. Please try again later.');
        } else {
          toast.error(data.error || 'Failed to subscribe');
        }
        setIsLoading(false);
        return;
      }

      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      console.error('[v0] Newsletter error:', error);
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="border-t border-border py-16 sm:py-24">
      <div className="container max-w-4xl mx-auto px-4 sm:px-8">
        <Card className="p-8 sm:p-12 bg-muted">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to get the latest posts delivered to your inbox
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
}
