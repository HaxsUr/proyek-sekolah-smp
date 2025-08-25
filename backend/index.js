require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
// const bcrypt = require('bcrypt'); // <-- Dihapus
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES OTENTIKASI (VERSI TANPA HASH) ---

// Endpoint untuk registrasi user baru
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username dan password diperlukan.' });
    }

    try {
        // Simpan password langsung tanpa hashing
        const result = await db.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, password]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') { 
            return res.status(409).json({ error: 'Username sudah digunakan.' });
        }
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk login user
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username dan password diperlukan.' });
    }

    try {
        // 1. Cari user di database berdasarkan username
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Username atau password salah.' });
        }

        // 2. Bandingkan password yang diinput dengan password di database secara langsung
        const isMatch = (password === user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Username atau password salah.' });
        }

        // 3. Jika cocok, buat token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET || 'KATA_KUNCI_RAHASIA_DEFAULT',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- ROUTES SISWA (Tidak berubah) ---
// (Kode untuk /api/siswa Anda tetap sama di sini)
app.get('/api/siswa', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM siswa ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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

app.delete('/api/siswa/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM siswa WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
