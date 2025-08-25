import { LoginForm } from "./components/login-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    // Wrapper ini akan membuat form berada di tengah layar
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6 text-center">
        <div>
          <h1 className="text-3xl font-bold">Login Admin</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Masukkan kredensial Anda untuk mengakses dasbor.
          </p>
        </div>
        <LoginForm />
        {/* Tombol Kembali ditambahkan di sini */}
        <div className="mt-4">
          <Link href="/">
            <Button variant="link" className="text-gray-500">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Halaman Utama
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
