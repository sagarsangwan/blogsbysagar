import { Hero } from "@/components/Hero";
import { NewsletterSignup } from "@/components/newsletter";


export default function Page() {
return (
    <main className="min-h-screen bg-background">
      <Hero />
      {/* <div className="container max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <BlogList />
      </div> */}
      <NewsletterSignup />
    </main>
  );

}