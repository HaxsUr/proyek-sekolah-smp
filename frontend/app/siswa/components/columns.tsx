"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Siswa } from "@/types";
import { CellAction } from "./cell-action"; // Komponen untuk tombol Edit & Hapus

export const columns: ColumnDef<Siswa>[] = [
    {
        accessorKey: "nisn",
        header: "NISN",
    },
    {
        accessorKey: "nama_lengkap",
        header: "Nama Lengkap",
    },
    {
        accessorKey: "kelas",
        header: "Kelas",
    },
    {
        accessorKey: "alamat",
        header: "Alamat",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];