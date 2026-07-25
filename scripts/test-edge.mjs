import { EdgeTTS } from 'node-edge-tts';

async function main() {
  try {
    const tts = new EdgeTTS({
        voice: 'ar-SA-HamedNeural',
        lang: 'ar-SA',
        outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
        rate: '-50%' // Make it very slow
    });
    
    // We can use Arabic comma "،" to add pause, or just spaces
    const text = "جَ ، عَ ، لَ"; 
    await tts.ttsPromise(text, './test-cim.mp3');
    console.log("Success!");
  } catch (err) {
    console.error(err);
  }
}
main();
