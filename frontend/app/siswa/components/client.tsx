"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Printer } from "lucide-react";
import { toast } from "sonner"; // <-- Ganti import ini
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
    // Hapus baris di bawah ini, karena initialData sudah cukup
    // const [data, setData] = useState<Siswa[]>(initialData); 
    const router = useRouter();
    // const { toast } = useToast(); // <-- HAPUS BARIS INI

    const handleFormSuccess = (message: string) => {
        setOpen(false); // Tutup dialog
        
        // Panggil toast dari sonner
        toast.success("Sukses!", {
            description: message,
        });

        // Refresh data dari server agar tabel terupdate
        router.refresh(); 
    };

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
            {/* Bungkus tabel dengan div untuk fitur print */}
            <div className="printable-area">
                <DataTable columns={columns} data={initialData} />
            </div>
        </>
    );
};