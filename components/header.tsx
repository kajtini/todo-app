import { UserButton } from "@clerk/nextjs";
import { Orbit } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default async function Header() {
  return (
    <header className="sticky top-0 border-b border-border bg-background">
      <div className="px-7 max-w-7xl py-4 mx-auto flex items-center justify-between">
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <Orbit />
          Menu
        </div>
        <div className="flex items-center justify-center gap-3">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
