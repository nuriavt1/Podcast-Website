// server.mjs
/*import express from 'express';
import { getTopPodcasts } from './scrapers.mjs';  // Importar la función

const app = express();
const port = 3001;

app.get('/top-podcasts', async (req, res) => {
    try {
        const topPodcasts = await getTopPodcasts();  // Llamar la función asíncrona
        res.json(topPodcasts);  // Responder con los datos
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los podcasts' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});*/

// server.mjs
import express from 'express';
import cors from 'cors';  // Importa el middleware CORS
import { getTopPodcasts } from './scrapers.mjs';

const app = express();
const port = 3001;

app.use(cors());  // Habilita CORS para todas las solicitudes

app.get('/top-podcasts', async (req, res) => {
    try {
        const topPodcasts = await getTopPodcasts();
        res.json(topPodcasts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los podcasts' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
