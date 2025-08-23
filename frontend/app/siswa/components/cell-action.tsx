"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner"; // <-- Ganti import ini
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Siswa } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SiswaForm } from "./siswa-form";

interface CellActionProps {
    data: Siswa;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const router = useRouter();

    const handleSuccess = (message: string) => {
        setEditDialogOpen(false);
        toast.success("Sukses!", { description: message });
        router.refresh();
    };
    
    const onDelete = async () => {
        if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/siswa/${data.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error("Gagal menghapus data.");

            toast.success("Berhasil Dihapus", {
                description: `Data siswa "${data.nama_lengkap}" telah dihapus.`,
            });
            router.refresh();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error("Gagal Menghapus", {
                description: error.message,
            });
        }
    };

    return (
        <>
            {/* Dialog untuk Edit */}
            <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Data Siswa</DialogTitle>
                    </DialogHeader>
                    <SiswaForm initialData={data} onSuccess={handleSuccess} />
                </DialogContent>
            </Dialog>

            {/* Tombol Aksi */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Buka menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete} className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Hapus
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};