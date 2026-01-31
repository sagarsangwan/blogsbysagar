
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Contact } from "@/drizzle/src/db/schema";

export function ContactTable({ data }: { data: Contact[] }) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message Preview</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                No messages found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium">{item.name || "N/A"}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {item.message}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">View Full</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Message from {item.name || item.email}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-bold text-muted-foreground">Sent At</h4>
                          <p>{new Date(item.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-muted-foreground">Message</h4>
                          <p className="text-sm leading-relaxed p-4 bg-muted rounded-lg italic">
                            &quot;{item.message}&quot;
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}