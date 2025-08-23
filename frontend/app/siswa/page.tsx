import { SiswaClient } from "./components/client"; // Komponen yang akan kita buat
import { Siswa } from "@/types"; // Tipe data yang akan kita buat

// Fungsi untuk mengambil data dari API
async function getDataSiswa(): Promise<Siswa[]> {
    try {
        // Fetch data dari API backend kita
        const res = await fetch('http://localhost:5000/api/siswa', {
          cache: 'no-store' // Penting: agar data selalu terbaru
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