import { SiswaClient } from "./components/client"; // Komponen yang akan kita buat
import { Siswa } from "@/types"; // Tipe data yang akan kita buat

// Fungsi untuk mengambil data dari API
async function getDataSiswa(): Promise<Siswa[]> {
    try {
        // 1. Ambil alamat API dari environment variable
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        // Pastikan variabel ada sebelum digunakan untuk menghindari error
        if (!API_URL) {
            throw new Error("API URL tidak dikonfigurasi.");
        }

        // 2. Gunakan variabel di dalam URL fetch
        const res = await fetch(`${API_URL}/api/siswa`, {
          cache: 'no-store'
        });


        if (!res.ok) {
            throw new Error('Gagal mengambil data siswa');
        }
        return res.json();
    } catch (error) {
        console.error(error);
        return []; // Kembalikan array kosong jika error
    }
}

export default async function HalamanSiswa() {
    const data = await getDataSiswa();

    return (
        <div className="container mx-auto py-10">
            <SiswaClient initialData={data} />
        </div>
    );
}