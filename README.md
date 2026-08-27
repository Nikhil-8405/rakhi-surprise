#  For My Di — A Rakhi Surprise Website

A complete 15-screen interactive Raksha Bandhan journey: magical intro, rakhi
ceremony, photo polaroids, memory timeline, secret envelopes, puzzle, quiz,
glowing thread, gift box, handwritten letter, fireworks finale & a draggable
memory wall.

## 1 · Run it locally

No build step. Either:
- double-click `index.html`, **or**
- serve the folder (recommended, so music/photos load cleanly):

```bash
cd rakhi
python3 -m http.server 8080
# open http://localhost:8080
```

## 2 · Add your photos

Use the separate folders inside **`assets/photos/`**:
- **`memories/`**: chapter 3, named `memory1.jpg … memory10.jpg`
- **`timeline/`**: chapter 4, named `timeline1.jpg … timeline4.jpg`
- **`wall/`**: final memory wall, named `wall1.jpg … wall4.jpg`


## 3 · Add music

Drop any mp3 at **`assets/music.mp3`**. The floating ♪ button controls it.
If the file is missing the site works perfectly — the button just tells you.

## 4 · Add the puzzle photo

Add one image named **`puzzlephoto.jpg`** inside **`assets/photos/`**. The
chapter 7 puzzle divides this image into 9 pieces automatically. A placeholder
pattern is used until the image is added.

## 5 · Personalize everything

Open **`js/config.js`** — the clearly marked **PERSONALIZATION AREA** at the
top. Edit: sister's name, your name, photo captions/dates, timeline memories,
flip-card messages, envelope letters, quiz questions, reasons, the final
letter, and the memory-wall notes. That's the only file you need to touch.

## 6 · Deploy free (get a shareable link)

This is a pure static site — host it free anywhere:
- **Netlify**: drag this folder onto https://app.netlify.com/drop → instant link
- **GitHub Pages**: push folder to a repo → Settings → Pages → done
- **Vercel**: `vercel` in this folder, or import the repo

## Folder structure

```
rakhi/
├── index.html
├── css/  base.css · screens.css · screens2.css
├── js/   config.js (★ edit me) · fx.js · journey.js
│         screens-a.js · screens-b.js · screens-c.js
└── assets/
    ├── music.mp3        (you add this)
    └── photos/
        ├── puzzlephoto.jpg
        ├── memories/    (chapter 3 photos)
        ├── timeline/    (chapter 4 photos)
        └── wall/        (memory wall 4 photos)
```

## Hidden easter eggs 🥚
- tap the tiny star on the first screen 3×
- poke the tied rakhi 5× (after the ceremony)
- type the word **love** anywhere
- long-press the letter signature
- tap the marigold in the footer 3×
