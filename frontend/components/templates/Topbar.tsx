import Link from 'next/link';
import { School } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Topbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <School className="h-6 w-6" />
          <span className="font-bold">SMP Cendekia</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link href="/login">
              <Button>Login Admin</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};