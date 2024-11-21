const dummyDatabase = []; // Simulasi database pengguna

const routes = [
    // Route untuk membuat akun
    {
        method: 'POST',
        path: '/register',
        handler: (request, h) => {
            const { email, password } = request.payload;

            if (!email || !password) {
                return h.response({
                    message: 'Email dan password wajib diisi',
                }).code(400);
            }

            const userExists = dummyDatabase.find((user) => user.email === email);

            if (userExists) {
                return h.response({
                    message: 'Email sudah terdaftar',
                }).code(409);
            }

            const newUser = { email, password };
            dummyDatabase.push(newUser);

            return h.response({
                message: 'Akun berhasil dibuat',
                user: { email },
            }).code(201);
        },
    },

    // Route untuk login
    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const { username, password } = request.payload;

            if (username === 'user' && password === 'password') {
                return h.response({
                    message: 'Login berhasil',
                    token: 'dummy-token',
                }).code(200);
            }

            return h.response({
                message: 'Username atau password salah',
            }).code(401);
        },
    },

    // Route lupa password
    {
        method: 'POST',
        path: '/forgot-password',
        handler: (request, h) => {
            const { email } = request.payload;

            if (!email) {
                return h.response({
                    message: 'Email wajib diisi',
                }).code(400);
            }

            const user = dummyDatabase.find((user) => user.email === email);

            if (!user) {
                return h.response({
                    message: 'Email tidak ditemukan',
                }).code(404);
            }

            // Simulasi pembuatan token reset password
            const resetToken = `reset-token-${Math.random().toString(36).substr(2, 10)}`;
            user.resetToken = resetToken;

            // Simulasi pengiriman email
            const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
            console.log(`Email reset password terkirim ke ${email} dengan URL: ${resetUrl}`);

            return h.response({
                message: 'Tautan reset password telah dikirim ke email Anda',
                resetUrl, // Hanya untuk debugging
            }).code(200);
        },
    },

    // Route reset password
    {
        method: 'POST',
        path: '/reset-password',
        handler: (request, h) => {
            const { token, newPassword } = request.payload;

            if (!token || !newPassword) {
                return h.response({
                    message: 'Token dan password baru wajib diisi',
                }).code(400);
            }

            const user = dummyDatabase.find((user) => user.resetToken === token);

            if (!user) {
                return h.response({
                    message: 'Token tidak valid atau sudah kedaluwarsa',
                }).code(404);
            }

            user.password = newPassword;
            delete user.resetToken; // Hapus token setelah digunakan

            return h.response({
                message: 'Password berhasil direset',
            }).code(200);
        },
    },

    // Route untuk Google OAuth
    {
        method: 'GET',
        path: '/auth/google',
        handler: (request, h) => {
            return h.response({
                message: 'Redirect ke Google OAuth',
                url: 'https://accounts.google.com/o/oauth2/v2/auth?client_id=GOOGLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email',
            }).code(302);
        },
    },

    // Callback untuk Google OAuth
    {
        method: 'GET',
        path: '/auth/google/callback',
        handler: (request, h) => {
            const { code } = request.query;
            return h.response({
                message: 'Login berhasil dengan Google',
                code,
            });
        },
    },

    // Route untuk Apple OAuth
    {
        method: 'GET',
        path: '/auth/apple',
        handler: (request, h) => {
            return h.response({
                message: 'Redirect ke Apple OAuth',
                url: 'https://appleid.apple.com/auth/authorize?client_id=APPLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email',
            }).code(302);
        },
    },

    // Callback untuk Apple OAuth
    {
        method: 'GET',
        path: '/auth/apple/callback',
        handler: (request, h) => {
            const { code } = request.query;
            return h.response({
                message: 'Login berhasil dengan Apple',
                code,
            });
        },
    },
];

module.exports = routes;