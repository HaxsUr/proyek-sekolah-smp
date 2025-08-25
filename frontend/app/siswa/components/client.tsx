"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Printer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Siswa } from "@/types";
import { SiswaForm } from "./siswa-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface SiswaClientProps {
    initialData: Siswa[];
}

export const SiswaClient: React.FC<SiswaClientProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    // useEffect ini berfungsi sebagai "penjaga" halaman
    useEffect(() => {
        // Tandai bahwa komponen sudah di-mount di sisi client (browser)
        setIsClient(true);
        
        const token = localStorage.getItem('authToken');
        if (!token) {
            // Jika tidak ada "tiket masuk" (token), tendang pengguna ke halaman login
            toast.error("Akses Ditolak", { description: "Silakan login terlebih dahulu." });
            router.push('/login');
        }
    }, [router]);

    const handleFormSuccess = (message: string) => {
        setOpen(false);
        toast.success("Sukses!", {
            description: message,
        });
        router.refresh();
    };

    // Jangan render apapun sampai pengecekan selesai di browser
    if (!isClient) {
        return null; // atau tampilkan loading spinner
    }

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Data Siswa</h1>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> Cetak Data
                    </Button>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Tambah Siswa
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Tambah Siswa Baru</DialogTitle>
                            </DialogHeader>
                            <SiswaForm onSuccess={() => handleFormSuccess("Data siswa baru berhasil ditambahkan.")} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="printable-area">
                <DataTable columns={columns} data={initialData} />
            </div>
        </>
    );
};
