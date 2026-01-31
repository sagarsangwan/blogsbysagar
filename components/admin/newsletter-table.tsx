
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { NewsLetter } from "@/drizzle/src/db/schema";

export function NewsletterTable({ data }: { data: NewsLetter[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sent Count</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell className="font-medium">{sub.email}</TableCell>
              <TableCell>
                <Badge variant={sub.isActive ? "default" : "destructive"}>
                  {sub.isActive ? "Active" : "Unsubscribed"}
                </Badge>
              </TableCell>
              <TableCell>{sub.sentEmailsCount}</TableCell>
              <TableCell>{new Date(sub.subscribedAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}