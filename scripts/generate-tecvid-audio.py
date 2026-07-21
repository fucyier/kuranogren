import asyncio
import re
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src" / "data" / "tecvid-lessons.ts"
OUTPUT = ROOT / "public" / "audio" / "tecvid"
VOICE = "ar-SA-HamedNeural"
RATE = "-35%"


def read_manifest():
    current_slug = None
    records = []
    lesson_pattern = re.compile(r'\{day:\d+,slug:"([^"]+)"')
    sample_pattern = re.compile(r'\{id:"([^"]+)",arabic:"([^"]+)"(?:,tts:"([^"]+)")?,reading:')
    for line in SOURCE.read_text(encoding="utf-8").splitlines():
        lesson_match = lesson_pattern.search(line)
        if lesson_match:
            current_slug = lesson_match.group(1)
        sample_match = sample_pattern.search(line)
        if sample_match and current_slug:
            sample_id, arabic, tts = sample_match.groups()
            records.append((current_slug, sample_id, tts or arabic.replace("۝", "")))
    return records


async def generate_one(semaphore, slug, sample_id, text):
    target = OUTPUT / slug / f"{sample_id}.mp3"
    target.parent.mkdir(parents=True, exist_ok=True)
    async with semaphore:
        communicate = edge_tts.Communicate(text=text, voice=VOICE, rate=RATE, pitch="-2Hz")
        await communicate.save(str(target))
    return target


async def main():
    records = read_manifest()
    semaphore = asyncio.Semaphore(6)
    paths = await asyncio.gather(*[generate_one(semaphore, *record) for record in records])
    too_small = [path for path in paths if path.stat().st_size < 1000]
    if too_small:
        raise RuntimeError(f"Geçersiz ses dosyaları: {too_small}")
    print(f"Generated {len(paths)} slow Arabic MP3 files.")


if __name__ == "__main__":
    asyncio.run(main())
