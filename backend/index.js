require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Kita akan buat file ini selanjutnya

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Memungkinkan server membaca body JSON dari request

// Fungsi untuk inisialisasi tabel
const initializeDatabase = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS siswa (
                id SERIAL PRIMARY KEY,
                nisn VARCHAR(10) UNIQUE NOT NULL,
                nama_lengkap VARCHAR(100) NOT NULL,
                kelas VARCHAR(10) NOT NULL,
                alamat TEXT,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        console.log("Tabel 'siswa' berhasil disiapkan.");
    } catch (err) {
        console.error("Gagal inisialisasi database:", err);
    }
};

// Routes (Jalur API)

// GET: Mendapatkan semua data siswa
app.get('/api/siswa', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM siswa ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Menambahkan siswa baru
app.post('/api/siswa', async (req, res) => {
    const { nisn, nama_lengkap, kelas, alamat } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO siswa (nisn, nama_lengkap, kelas, alamat) VALUES ($1, $2, $3, $4) RETURNING *',
            [nisn, nama_lengkap, kelas, alamat]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: Mengupdate data siswa berdasarkan ID
app.put('/api/siswa/:id', async (req, res) => {
    const { id } = req.params;
    const { nisn, nama_lengkap, kelas, alamat } = req.body;
    try {
        const result = await db.query(
            'UPDATE siswa SET nisn = $1, nama_lengkap = $2, kelas = $3, alamat = $4 WHERE id = $5 RETURNING *',
            [nisn, nama_lengkap, kelas, alamat, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Menghapus data siswa berdasarkan ID
app.delete('/api/siswa/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM siswa WHERE id = $1', [id]);
        res.status(204).send(); // 204 No Content
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    initializeDatabase();
});