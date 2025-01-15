// scrapers.mjs
/*import puppeteer from 'puppeteer';

export const getTopPodcasts = async () => {
    const topPodcasts = [];

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://podcastcharts.byspotify.com/es');

    // Espera hasta que los elementos carguen
    await page.waitForSelector('button div div span span span');  // Selector CSS

    // Captura múltiples elementos
    const elements = await page.$$('button div div span span span');
    for (let element of elements) {
        const text = await page.evaluate(el => el.textContent, element);
        topPodcasts.push(text);
    }

    await browser.close();

    return topPodcasts;  // Regresa los datos
};*/


import puppeteer from 'puppeteer';

export const getTopPodcasts = async () => {
    const topPodcasts = [];

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://podcastcharts.byspotify.com/es');

        // Espera hasta que los elementos estén disponibles
        await page.waitForSelector('button div div span span span', { timeout: 2000 });  // Espera hasta 5 segundos

        // Captura todos los elementos
        const elements = await page.$$('button div div span span span');
        
        // Si no se encuentran elementos, lanzar un error
        if (elements.length === 0) {
            throw new Error('No se encontraron podcasts en la página');
        }

        // Selecciona solo los elementos en índices impares (1, 3, 5, 7, ...)
        for (let i = 0; i < elements.length; i++) {
            if (i % 2 === 0) {  // Índices pares (0, 2, 4, ...)
                const text = await page.evaluate(el => el.textContent.trim(), elements[i]); // trim() para limpiar los espacios
                topPodcasts.push(text);
            }
        }

        await browser.close();

        return topPodcasts;  // Regresa la lista de podcasts

    } catch (error) {
        console.error('Error scraping top podcasts:', error.message);
        return [];  // Regresa un array vacío en caso de error
    }
};

