import * as googleTTS from 'google-tts-api';
import fs from 'fs';

async function test(text, name) {
    const url = googleTTS.getAudioUrl(text, {
      lang: 'ar',
      slow: true,
      host: 'https://translate.google.com',
    });
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(name, Buffer.from(buffer));
    console.log(`Saved: ${name}`);
}

async function main() {
    await test("جَ", "test-cim-normal.mp3");
    await test("دْجَ", "test-cim-dj1.mp3");
    await test("دجَ", "test-cim-dj2.mp3");
}
main();
