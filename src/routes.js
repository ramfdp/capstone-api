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

            const dummyDatabase = [];
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