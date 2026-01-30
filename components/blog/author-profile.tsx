import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

import Link from "next/link";
import author from "../../public/images/author.jpeg"
export default function AuthorProfile() {
  return (
    <Card className="max-w-2xl min-w-sm mx-auto  bg-white">
      <div className="p-4">
        {/* Author info */}
        <CardHeader className="px-0">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="relative h-12 w-12">
                <Image
                  src={author}
                  alt="Sagar Sangwan"
                  className="rounded-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight mb-1">
                  Written by Sagar Sangwan
                </h2>
                {/* <div className="flex gap-4 text-sm text-gray-600 mb-2">
                  <span>2.6K Followers</span>
                  <span>2.3K Following</span>
                </div> */}
                <p className="text-gray-600 leading-relaxed">Code. Write. Build. Explore. 💻✍️ Software developer by day, mechanical tinkerer by night. When I’m not shipping code or writing blogs, you’ll find me trekking up a mountain, whipping up a feast, or hitting the open road on two wheels. Life is better in high gear.</p>
              </div>
            </div>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href={"https://medium.com/@sagarsangwan"}>Follow</Link>
            </Button>
          </div>
        </CardHeader>
      </div>
    </Card>
  );
}
