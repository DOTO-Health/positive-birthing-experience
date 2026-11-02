# Publishing on public GitHub: what must be true

Plain-language checklist, not legal advice. Status as of 2026-11-01. Items marked **BLOCKER** must be fixed before the repository is made public.

## 1. The music (BLOCKER)

None of the 15 tracks is under a Creative Commons licence (details in [audio-licences.md](audio-licences.md)).

| Tracks | Problem | What to do |
|---|---|---|
| 11 Liborio Conti tracks | His own licence "expressly forbids the resale, re-licensing, or other distribution" of the music and forbids making the files available to any third party. A public repository is distribution. | Do **not** publish the files. Either get his written permission to bundle them in an open-source app, or replace them. |
| 4 YouTube downloads (Mozart Effect, Celebration of Life, Pregnancy Music, Hypnobirthing Breathing) | Standard YouTube licence or copyrighted film music. Publishing them risks a takedown notice. | Do **not** publish. Delete them from the project when you replace them. |

**Do this now**
1. Keep every audio file out of the repository. I added a `.gitignore` that excludes `app/assets/audio/`, the raw zip and the `extracted/` folder.
2. **Never commit them even once.** Git keeps history, so a file removed later is still public in old commits. Start the repository clean. If a file was ever committed, use `git filter-repo` to erase it from history before publishing.
3. In the public app, ship the music tab empty or with the replacement tracks only. `tracks.json` lists them, and the app already shows "Licence needed".
4. For replacements, use music that is CC0 or CC BY and record each track in the attribution file (title, artist, URL, licence, date checked). Candidates are listed in [audio-licences.md](audio-licences.md).

## 2. The videos (fine, with conditions)

All 91 videos found, including your 18 shortlisted English ones, are marked CC BY on their YouTube pages ([all-cc-videos.md](all-cc-videos.md), [english-cc-videos.md](english-cc-videos.md)). To publish legally:

1. **Link, do not copy, by default.** `app/data/videos.json` already holds the YouTube links, authors and licence for 8 videos. Linking needs no licence at all.
2. **If you bundle video files**, you need the creator's original file or written permission (YouTube's terms generally forbid downloading). Store each file with a licence marker and never commit large files directly: use GitHub Releases or Git LFS.
3. **Keep these files in the repo** (all created already):
   - `LICENSES/CC-BY-4.0.txt` and `LICENSES/CC-BY-3.0.txt` (the licence text)
   - `legal/ATTRIBUTION.md` and `legal/content-licences.csv` (title, creator, URL, licence, date checked)
   - `legal/evidence/` (a licence screenshot for each of the 18)
4. **Show the credit inside the app** too (a "Credits" screen or the video card) with title, creator, link and "CC BY". CC BY requires attribution that reasonable people can find. This screen is not built yet.
5. **Get written confirmation** from each creator you actually use, and keep it in `legal/permissions/`. It protects you if the uploader later changes the licence, or if the video contains music they do not own.
6. **Archive each page** with the Internet Archive (web.archive.org/save) for a dated, independent copy.
7. **Do not relicense them.** They stay CC BY, with credit, even if the rest of your content is CC BY-SA.

## 3. Your own code and content

- **Code licence:** add a root `LICENSE` file. The PRD says MIT; the Project Charter says Apache-2.0. Pick one (Apache-2.0 includes a patent grant). **BLOCKER** until chosen.
- **Your content** (translations, learning cards, illustrations, voiceover script): label it, for example CC BY-SA 4.0 as the PRD plans, with a `LICENSES/CC-BY-SA-4.0.txt` and a note saying which folders it covers.
- **Logo (BLOCKER):** the Doto and CareMother logo in `app/assets/logo.png` is a trademark. Add a note that brand assets are excluded from the open licence, or remove the logo from the public repo.
- **Fonts:** the app loads Inter and Noto fonts from Google Fonts (SIL Open Font License). Nothing is bundled, so no extra file is needed. If you bundle the font files, add the OFL text.
- **Voice-over for the pitch video:** it came from your ElevenLabs account. Check your plan's terms before publishing that video. It is not part of the app.
- **Translations are machine drafts.** Say so in the README so nobody treats them as clinically reviewed.
- **Medical disclaimer:** state that the hydration thresholds are samples and not clinically validated (already shown in the app, repeat in the README).

## 4. Repository layout that passes review

```
LICENSE                     code licence (MIT or Apache-2.0)
LICENSES/                   CC-BY-4.0.txt, CC-BY-3.0.txt, CC-BY-SA-4.0.txt (+ any others used)
NOTICE or TRADEMARKS.md     logo and brand assets are not open-licensed
legal/ATTRIBUTION.md        third-party credits
legal/content-licences.csv  machine-readable record
legal/evidence/             licence screenshots
legal/permissions/          creator emails and consents
app/                        no audio or video files unless licensed and recorded above
README.md                   what is and is not open-licensed
```

Optional but recommended: run `reuse lint` (reuse.software) so every file has a licence marker. The Digital Public Goods Standard asks for open licences on both software and content and clear ownership, so keep this record complete.

## 5. Before you press "make public"
- [ ] No audio files anywhere in the repository or its history
- [ ] Code `LICENSE` file added
- [ ] Logo question resolved
- [ ] Attribution file complete for every third-party item used
- [ ] Licence texts present in `LICENSES/`
- [ ] Credits shown in the app for any video or music it uses
- [ ] README says what is open-licensed and what is not
- [ ] A lawyer or the Digital Public Goods Alliance has looked at it
