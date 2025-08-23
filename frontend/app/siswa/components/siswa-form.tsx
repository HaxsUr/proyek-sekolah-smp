"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Siswa } from "@/types";
import { toast } from "sonner"; // Import toast untuk notifikasi error

const formSchema = z.object({
    nisn: z.string().min(1, "NISN wajib diisi"),
    nama_lengkap: z.string().min(1, "Nama lengkap wajib diisi"),
    kelas: z.string().min(1, "Kelas wajib diisi"),
    alamat: z.string().optional(),
});

interface SiswaFormProps {
    initialData?: Siswa;
    // Ubah tipe onSuccess menjadi lebih spesifik
    onSuccess: (message: string) => void;
}

export const SiswaForm: React.FC<SiswaFormProps> = ({ initialData, onSuccess }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            nisn: "",
            nama_lengkap: "",
            kelas: "",
            alamat: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;

            const url = initialData
                ? `${API_URL}/api/siswa/${initialData.id}`
                : `${API_URL}/api/siswa`;
            
            const method = initialData ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!response.ok) throw new Error("Gagal menyimpan data, periksa kembali input Anda.");

            // Tentukan pesan sukses berdasarkan aksi
            const successMessage = initialData 
                ? "Data siswa berhasil diperbarui." 
                : "Data siswa baru berhasil ditambahkan.";

            onSuccess(successMessage); // Panggil callback dengan pesan yang sesuai
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            // Tampilkan notifikasi error menggunakan sonner
            toast.error("Terjadi Kesalahan", {
                description: error.message || "Tidak dapat terhubung ke server.",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* (Tidak ada perubahan di field form) */}
                <FormField
                    control={form.control}
                    name="nisn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>NISN</FormLabel>
                            <FormControl>
                                <Input placeholder="1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nama_lengkap"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                                <Input placeholder="Ramadhan" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="kelas"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kelas</FormLabel>
                            <FormControl>
                                <Input placeholder="IX A" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="alamat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alamat</FormLabel>
                            <FormControl>
                                <Input placeholder="Jl. Pendidikan No. 1" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Menyimpan..." : "Simpan"}
                </Button>
            </form>
        </Form>
    );
};