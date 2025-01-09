const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });  // Modo visible para depuración
    const page = await browser.newPage();
    await page.goto('https://www.wikipedia.org/');  // Puedes cambiar esta URL por una página diferente

    // Usamos document.evaluate como alternativa a $x
    const result = await page.evaluate(() => {
        const xpath = '//*[@id="www-wikipedia-org"]/footer/div[1]/div/div[2]';  // XPath para el primer <h1>
        const elements = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        const firstElement = elements.snapshotItem(0);
        return firstElement ? firstElement.textContent : null;
    });

    if (result) {
        console.log('Texto encontrado:', result);  // Imprime el contenido de <h1>
    } else {
        console.log('No se encontró el elemento con XPath.');
    }

    await browser.close();
})();

//scrapePodcast('https://podcastcharts.byspotify.com/es');

/*
async function waitForXPath(page, xpath, timeout = 5000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        const elements = await page.$x(xpath);
        if (elements.length > 0) {
            return elements[0];
        }
        await new Promise((r) => setTimeout(r, 100)); // Espera 100ms
    }
    throw new Error(`Timeout: Elemento con XPath ${xpath} no encontrado después de ${timeout}ms`);
}

async function scrapePodcast(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    const xpath = '/html/body/div[1]/div/div/div[2]/main/div/div[2]/div/div[1]/button/div[2]/div/div[2]/span/span[1]/span';
    const el = await waitForXPath(page, xpath);
    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue();

    console.log({ rawTxt });

    await browser.close();
}

scrapePodcast('https://podcastcharts.byspotify.com/es');*/

