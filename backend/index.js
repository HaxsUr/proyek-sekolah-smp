require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Konfigurasi CORS agar bisa menerima header otentikasi dari frontend
app.use(cors({
    origin: '*', // Di produksi, ganti dengan URL Vercel Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// --- FUNGSI BARU UNTUK OTENTIKASI ---

// Middleware untuk memverifikasi token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};

// --- ENDPOINT BARU UNTUK LOGIN ---

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Cari user di database
        const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            return res.status(400).json({ error: "Username atau password salah." });
        }

        const user = userResult.rows[0];

        // 2. Bandingkan password yang diinput dengan hash di database
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: "Username atau password salah." });
        }

        // 3. Buat Token JWT jika password cocok
        const payload = { id: user.id, username: user.username };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ accessToken });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- RUTE CRUD SISWA YANG SEKARANG DILINDUNGI ---
// Perhatikan penambahan 'authenticateToken' di setiap rute

app.get('/api/siswa', authenticateToken, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM siswa ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/siswa', authenticateToken, async (req, res) => {
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

app.put('/api/siswa/:id', authenticateToken, async (req, res) => {
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

app.delete('/api/siswa/:id', authenticateToken, async (req, res) => {
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
