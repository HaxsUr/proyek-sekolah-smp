import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Selamat Datang di Portal SMP Cendekia
        </h1>
        <p className="text-gray-500 md:text-xl dark:text-gray-400">
          Membentuk generasi cerdas, berkarakter, dan siap menghadapi masa depan.
          Akses sistem informasi untuk mengelola data akademik dengan mudah.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/siswa">
           <Button size="lg">
            Lihat Data Siswa
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
       <div className="mt-16 w-full max-w-4xl p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Visi & Misi</h2>
          <div className="text-left space-y-4">
            <div>
              <h3 className="font-semibold">Visi</h3>
              <p className="text-gray-600 dark:text-gray-300">Menjadi sekolah unggul yang menghasilkan lulusan berakhlak mulia, berprestasi, dan berwawasan global.</p>
            </div>
            <div>
              <h3 className="font-semibold">Misi</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                <li>Menyelenggarakan pendidikan berkualitas yang terintegrasi dengan nilai-nilai keimanan.</li>
                <li>Mengembangkan potensi siswa secara optimal melalui kegiatan akademik dan non-akademik.</li>
                <li>Menciptakan lingkungan belajar yang kondusif, inovatif, dan menyenangkan.</li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
}