import axios from "axios";
import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';


dotenv.config({ path: path.resolve('./config/ApiOpenAiKey.env') });

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';


if (!apiKey) {
    console.error("Brakuje klucza API w pliku .env");
    process.exit(1);
}


async function readArticle(filePath) {
    try {
        const data = await fs.readFile(filePath,  { encoding: 'utf8' });
        console.log("Artykuł odczytany pomyślnie:", filePath);
        return data;
    } catch (err) {
        console.error("Błąd przy odczycie artykułu:", err);
        throw err;
    }
}


async function writeToFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content, 'utf8');
        console.log('Plik zapisany pomyślnie:', filePath);
    } catch (err) {
        console.error("Błąd przy zapisie pliku:", err);
        throw err;
    }
}

async function generateHtmlContent(articleText) {
    const prompt = `
    Przekształć poniższy tekst artykułu na HTML. Strukturyzuj artykuł odpowiednimi tagami HTML. 
    W miejscach, gdzie odpowiednie będą ilustracje, wstaw <img src="image_placeholder.jpg" alt="Krótki opis, co ilustracja powinna przedstawiać"> i dodaj podpis za pomocą <figcaption>.
    Dodaj co najmniej trzy ilustracje rozmieszczone w kluczowych miejscach artykułu, z dopasowanymi podpisami. 
    Wynikowy HTML ma zawierać wyłącznie zawartość do wstawienia pomiędzy tagami <body> i </body>. Nie dołączaj znaczników <html>, <head> ani <body>.
`.trim();


    try {
        const response = await axios.post(apiUrl, {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt + "\n\n" + articleText }],
            max_tokens: 1500,
            temperature: 0.5
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.choices && response.data.choices[0].message) {
            console.log("HTML został wygenerowany pomyślnie");
            return response.data.choices[0].message.content.trim();
        } else {
            throw new Error('Brak odpowiedzi od OpenAI API');
        }
    } catch (err) {
        console.error('HTML został źle wygenerowany:', err.response ? err.response.data : err.message);
        return null;
    }
}

export {
    readArticle,
    writeToFile,
    generateHtmlContent
};
