# Audio licence register

Checked 2026-10-29. This is a research record, not legal advice. Items marked ⚠ block an open-licence release.

## Summary

| Group | Tracks | Licence found | Can it ship in an open (CC BY / BY-SA / DPG) release? |
|---|---|---|---|
| Liborio Conti, "Relaxing Music 432 Hz" album | Sanctuary, Floating, Blossom, Earth, Blessing, Movement, Motion, Timing, Tuning, The Deep, "Replenish" (the file saved as `relaxing-432-untitled`) | **Custom Royalty Free Music License, not Creative Commons** | ⚠ **No.** It forbids redistribution and giving the files to third parties. Written permission needed. |
| YouTube rip, Womb Harmony | Mozart Effect (1 hour) | Standard YouTube licence (no Creative Commons licence shown) | ⚠ No |
| YouTube rip, film song | Celebration of Life | Likely the Tamil film song "Celebration Of Life" (Aayirathil Oruvan), 3:36 on YouTube; your file is 3:42. Copyrighted. | ⚠ No |
| YouTube rip, source unknown | Pregnancy Music for Mother and Baby (3 h 0 min) | Source not identified, no Creative Commons licence found | ⚠ No |
| YouTube rip, source unknown | Hypnobirthing Breathing Session (4 min) | Source not identified | ⚠ No |

The four files from the "download_it_bot" are not even MP3s: they are MP4 containers with AAC audio (typical of YouTube downloads) renamed to `.mp3`.

## 1. Liborio Conti tracks

**Evidence in the files:** every one carries ID3 tags naming the artist "Free No Copyright Music by Liborio Conti", album "Relaxing Music 432 Hz" (2021), a comment "Downloaded from no-copyright-music.com" and the URL http://no-copyright-music.com.

**Licence page:** <https://www.no-copyright-music.com/license/>
**Licence PDF ("Royalty Free Music License", dated April 2023):** <https://www.no-copyright-music.com/wp-content/uploads/2023/03/LiborioContiLicense.pdf>

Key clauses, quoted from the PDF:
- Grant: "a limited right to use my musical compositions in your video or media production".
- Allowed: "You may use my music in your personal or commercial projects ... [and] in commercially monetized videos on any platform."
- **Forbidden:** "This license expressly forbids the resale, re-licensing, or other distribution of my music, either as is, or any modification thereof."
- **Forbidden:** "You may not modify, resell, sub-license, assign, transfer, otherwise make available to or permit access to any third party, my music files except as in cases expressly authorized by this license."
- No credit required, but you may not claim the music as your own, or register it in YouTube Content ID or on music platforms.
- Non-exclusive, non-transferable, "without any other warranty", with an indemnity from the user to the composer.
- The licence does not mention Creative Commons, apps or software.

**What this means:** The tracks are free to use inside your own video or media production. They cannot be placed in an open-source repository, relicensed as CC BY-SA, or handed to other facilities as files, which is exactly what the PRD's open-release plan does. It is also unclear whether a tablet app counts as a "media production".

**Options:**
1. Ask the composer in writing for permission to bundle the 11 tracks in an open-licence app (use the site's contact page: <https://www.no-copyright-music.com/contact/>). Get a signed statement and keep it with the repository.
2. Keep them in a closed Doto deployment only, and use a different library for the open release.
3. Replace them with genuinely Creative Commons tracks (see section 3).

## 2. The four YouTube downloads

- **Mozart Effect (1 hour):** length 63 min 13 s matches the Womb Harmony video "1 Hour Mozart Effect: Relaxing High-Frequency Classical Music for Unborn..." (1:03:14), <https://www.youtube.com/watch?v=DRyWVwoJJ2c>. YouTube shows no Creative Commons licence on it, so the standard YouTube licence applies. Mozart's compositions are public domain, but this recording and arrangement are the channel's.
- **Celebration of Life:** the 3:42 length is close to "Aayirathil Oruvan - Celebration Of Life" (3:36 on YouTube) and an 8D-audio remix upload. A commercial film soundtrack: not usable.
- **Pregnancy Music for Mother and Baby (3 h 0 min 19 s):** no 3-hour match found on YouTube; the nearest are 2-hour and 1.5-hour uploads from other channels. Source unidentified, and none of the candidates carry a Creative Commons licence.
- **Hypnobirthing Breathing Session (4 min 2 s):** closest match is "How to Nail Up Breathing, Hypnobirthing Breathing Techniques" by The Positive Birth Company (4:07), not confirmed. No Creative Commons licence on any candidate.

## 3. Genuinely Creative Commons music (candidates, not yet downloaded)

- Kevin MacLeod, Incompetech: **CC BY 4.0**, credit required: "Title, Kevin MacLeod (incompetech.com), Licensed under Creative Commons: By Attribution 4.0, https://creativecommons.org/licenses/by/4.0/". Source: <https://incompetech.com/music/royalty-free/faq.html>
- Free Music Archive, e.g. Pamela Yuen "Afterglow Ambient" (CC BY): <https://freemusicarchive.org/music/pamela-yuen/afterglow-ambient>
- OpenGameArt CC0 / CC-BY calm packs: <https://opengameart.org/content/indie-meditations-free-music-pack>
- Wikimedia Commons: Ranjit Makkuni, raga Kaushi Kanra (sitar and tabla), CC BY-SA 3.0, <https://commons.wikimedia.org/wiki/File:RanjitMakkuniRagaKaushiKanra.ogg>
- ⚠ Mendeley "RaagaDhvani" Carnatic flute dataset is **CC BY-ND** (no derivatives): fine to play as-is, not to edit or fade.
- Each file's own page must be checked before inclusion; a single artist's album can mix licences.
