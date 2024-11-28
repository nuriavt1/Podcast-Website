const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Variables de entorno (guarda estas en un archivo .env para mayor seguridad)
//const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
//const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
//const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const CLIENT_ID = 'd21f9fa9e9834547a686c4595b539595';
const CLIENT_SECRET = '224cbbce3d5943cba4229f4d40b172ad';
const REDIRECT_URI = 'https://www.citm.upc.edu/';

let accessToken = '';
let refreshToken = '';

// Paso 1: Generar la URL de autorización para obtener permisos del usuario
app.get('/login', (req, res) => {
    const scopes = encodeURIComponent('user-read-private user-read-email');
    res.redirect(
        `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
    );
});

// Paso 2: Obtener tokens de acceso y renovación con el código de autorización
app.get('/callback', async (req, res) => {
    const code = req.query.code;

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
        }),
    });

    const data = await response.json();

    if (response.ok) {
        accessToken = data.access_token;
        refreshToken = data.refresh_token;
        res.send('Autenticación exitosa. Tokens guardados.');
    } else {
        res.status(400).send('Error al obtener tokens');
    }
});

// Paso 3: Renovar el token automáticamente cuando expire
app.get('/refresh-token', async (req, res) => {
    if (!refreshToken) {
        return res.status(400).send('No hay refresh token disponible');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
    });

    const data = await response.json();

    if (response.ok) {
        accessToken = data.access_token;
        res.json({ access_token: accessToken });
    } else {
        res.status(400).send('Error al renovar el token');
    }
});

// Endpoint para obtener el token actual
app.get('/token', (req, res) => {
    if (!accessToken) {
        return res.status(400).send('No hay token de acceso disponible');
    }
    res.json({ access_token: accessToken });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en ejecución en http://localhost:${PORT}`));
