const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

try {
    require('dotenv').config({path: path.resolve(__dirname, '../api_keys/API OpenAI Key.env')});
} catch (error) {
    console.warn('Nie można wczytać pliku env');
}

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/completions';

if (!apiKey) {}
console.error("Brakuje klucza API w pliku env")
process.exit(1);

async function readArticle(filePath) {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function writeToFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content, 'utf8');
        console.log('File written successfully', filePath) ;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function generateHtmlContent(articleText) {
    const prompt = `
    Przekształć poniższy tekst artykułu do HTML, strukturyzując go odpowiednimi tagami HTML.
        Dodaj miejsca na ilustracje w odpowiednich sekcjach, używając <img src="image_placeholder.jpg" alt="Opis grafiki"> oraz podpisów.
        Kod ma zawierać wyłącznie zawartość do wstawienia pomiędzy tagami <body> i </body>.
    Tekst artykułu:
    ${articleText}
    `.trim();

    try {
        const response = await axios.post(apiUrl, {
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1500,
            temperature: 0.5
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.choices && response.data.choices[0]) {
            return response.data.choices[0].text.trim();
        } else {
            throw new Error('Brak odpowiedzi od OpenAI API');
        }
    } catch (err) {
        console.error('HTML został źle wygenerowany:', err.response ? err.response.data : err.message);
        throw err;
    }
}

async function main() {
    try {
        const articlePath = path.resolve(__dirname, '../articles/article.txt');
        const outputPath = path.resolve(__dirname, '../articles_html/artykul.html');

        console.log('Wczytano artykuł:', articlePath);
        const articleText = await readArticle(articlePath);

        console.log('Generowanie HTML...');
        const htmlContent = await generateHtmlContent(articleText);

        console.log('Zapisywanie wygenerowanego HTML do:', outputPath);
        await writeToFile(outputPath, htmlContent);

        console.log('artykul.html został pomyślnie wygenerowany.');
    } catch (error) {
        console.error('Wystąpił błąd', error.message);
    }
}

main();