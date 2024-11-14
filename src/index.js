import { readArticle, writeToFile, generateHtmlContent } from './app.js';
import path from 'path';

async function main() {
    try {
        const articlePath = path.resolve('./articles_txt/article.txt');
        const outputPath = path.resolve('./articles_html/artykul.html');

        console.log('Wczytano artykuł:', articlePath);
        const articleText = await readArticle(articlePath);

        console.log('Generowanie HTML...');
        const htmlContent = await generateHtmlContent(articleText);

        if (htmlContent) {
            console.log('Zapisywanie wygenerowanego HTML do:', outputPath);
            await writeToFile(outputPath, htmlContent);
            console.log('artykul.html został pomyślnie wygenerowany.');
        } else {
            console.error("Nie udało się wygenerować HTML.");
        }
    } catch (error) {
        console.error('Wystąpił błąd:', error.message);
    }
}

main();
