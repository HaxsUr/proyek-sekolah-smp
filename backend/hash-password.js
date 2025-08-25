const bcrypt = require('bcrypt');
const saltRounds = 10;
const passwordToHash = 'AdminRahasia123'; // Ganti dengan password yang Anda inginkan

bcrypt.hash(passwordToHash, saltRounds, function(err, hash) {
    if (err) {
        console.error("Error hashing password:", err);
        return;
    }
    console.log("Password Anda:", passwordToHash);
    console.log("Simpan hash ini di database Anda:");
    console.log(hash);
});