const bcrypt = require('bcrypt'); // <-- PERUBAHAN DI SINI

// --- TULIS PASSWORD YANG ANDA INGINKAN DI SINI ---
const passwordToHash = 'PasswordSuperAman123!';
// ----------------------------------------------------

if (!passwordToHash) {
  console.error('Error: Silakan masukkan password di dalam variabel passwordToHash.');
  process.exit(1);
}

// Proses hashing password
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(passwordToHash, salt);

console.log('--- HASHED PASSWORD (salin teks di bawah ini) ---');
console.log(hashedPassword);
console.log('-------------------------------------------------');
