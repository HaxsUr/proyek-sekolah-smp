"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // --- INI BAGIAN PENTING YANG DIPERBAIKI ---
      // Jika respons dari server tidak OK (misalnya status 401 Unauthorized),
      // maka lemparkan error dan hentikan proses login.
      if (!response.ok) {
        throw new Error(data.error || 'Login gagal. Periksa kembali username dan password.');
      }
      // -----------------------------------------

      // Kode di bawah ini HANYA akan berjalan jika response.ok bernilai true
      localStorage.setItem('authToken', data.token);
      toast.success("Login Berhasil!", { description: "Anda akan diarahkan ke dasbor siswa." });
      router.push('/siswa');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Tangkap error yang dilempar dan tampilkan notifikasinya
      toast.error("Login Gagal", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleLogin}>
        <CardHeader>
          <CardTitle>Selamat Datang Kembali</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              type="text" 
              placeholder="admin" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Masuk'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
