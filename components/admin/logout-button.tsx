// components/admin/logout-button.tsx
"use client";

import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react"; // Optional: icon

export function LogoutButton() {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={async () => await logout()}
      className="text-red-500 hover:text-red-600 hover:bg-red-50"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}