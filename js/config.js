/* ============================================================================
   ★★★  PERSONALIZATION AREA  ★★★
   This is the ONLY file you need to edit. Change the names, photos,
   messages, quiz, letter and music below — the whole website updates itself.
   ============================================================================ */

window.CONFIG = {

  /* ---- 1 · NAMES ------------------------------------------------------- */
  sisterName: "Di",            // ← your sister's name / what you call her
  myName: "[Nikhil]",       // ← YOUR name (appears under the final letter)

  /* ---- 2 · MUSIC -------------------------------------------------------- */
  music: "assets/music.mp3",   // ← drop any mp3 into the assets/ folder.
                               //   The site works perfectly even if missing.

  /* ---- 3 · PHOTOS (Screen 4 gallery + lightbox) --------------------------
     Put chapter 3 photos in assets/photos/memories/.
     Until then, cute pastel placeholder cards are shown automatically.      */
  photos: [
    { src: "assets/photos/memories/memory1.jpg",  caption: "That one random day ❤️"},
    { src: "assets/photos/memories/memory2.jpg",  caption: "Partners in crime 😂"},
    { src: "assets/photos/memories/memory3.jpg",  caption: "Childhood chaos" },
    { src: "assets/photos/memories/memory4.jpg",  caption: "Still my favourite person."},
    { src: "assets/photos/memories/memory5.jpg",  caption: "Always the foodie us 😂" },
    { src: "assets/photos/memories/memory6.jpg",  caption: "Festivals hit different with you" },
    { src: "assets/photos/memories/memory7.jpg",  caption: "You + me + zero supervision" },
    { src: "assets/photos/memories/memory8.jpg",  caption: "The selfie you hate 😂"},
    { src: "assets/photos/memories/memory9.jpg",  caption: "Home, basically" },
    { src: "assets/photos/memories/memory10.jpg", caption: "Always us ❤️" }
  ],

  /* ---- 4 · TIMELINE (Screen 5) ----------------------------------------- */
  timeline: [
    { era: "Then 👶",       title: "Our childhood chaos",      text: "Two tiny humans, one house, unlimited drama. Somewhere in there, you became my first best friend.", photo: "assets/photos/timeline/timeline1.jpg" },
    { era: "Growing up 🌱", title: "Somehow we survived each other", text: "The fights over the remote, the stolen food, the secrets kept from mom and dad. All of it.", photo: "assets/photos/timeline/timeline2.jpg" },
    { era: "The phases 🌊", title: "We grew, we changed", text: "We found different interests, different dreams, and different paths — but somehow, being together always felt just like home.", photo: "assets/photos/timeline/timeline3.jpg" },
    { era: "Now ❤️",        title: "And somehow you're still my favourite Di", text: "Older, wiser (debatable), and still the first person I want to tell everything to.", photo: "assets/photos/timeline/timeline4.jpg" }
  ],

  /* ---- 5 · UNSAID CARDS (Screen 6) — tap to flip ------------------------ */
  cards: [
    "Thank you for always being there.",
    "You've protected me more times than I'll ever admit.",
    "You've annoyed me more times than I'll admit too 😂",
    "But honestly… I don't know what I'd do without you.",
    "You'll always be one of my safest places."
  ],

  /* ---- 6 · SECRET ENVELOPES (Screen 7) -----------------------------------
     The envelope with  lock: true  stays locked until all others are open.  */
  envelopes: [
    { title: "Open when you're missing me",
      message: "Close your eyes. Remember our loudest laugh? I'm right there in it. Missing you is just love with nowhere to go — so send it my way. I'm one call away, always." },
    { title: "Open when you need a smile",
      message: "Fun fact: scientists say you're 100% my favourite sister. Okay, the scientist was me. But the data checks out. Now smile, you look weird reading this with a straight face 😂" },
    { title: "Open when you're angry at me 😂",
      message: "Whatever I did — I'm sorry. Mostly. Okay, slightly. Take a deep breath, remember I'm your favourite sibling (don't fact-check this), and call me so I can apologise properly with food." },
    { title: "Open when you want to know how much I love you",
      message: "More than all our fights combined. More than the last slice of pizza (and you KNOW what that costs me). Enough that I built you an entire website just to say it." },
    { title: "Open last ❤️", lock: true,
      message: "You opened everything else first — of course you did, you never could resist a rule. So here it is, plainly: you are the best thing our family ever gave me. Happy Raksha Bandhan, Di. I love you. Always have, always will." }
  ],

  /* ---- 7 · QUIZ (Screen 9) — every answer is 'right', it's comedy ------- */
  quiz: [
    { q: "Who is more annoying?",
      options: [ { t: "Me", r: "Correct. Self-awareness suits you." },
                 { t: "You", r: "Bold. Incorrect, but bold." },
                 { t: "Obviously you 😂", r: "The only honest answer." } ] },
    { q: "Who usually says sorry first?",
      options: [ { t: "Me (obviously)", r: "A whole tradition at this point." },
                 { t: "You", r: "In which universe? 😂" },
                 { t: "We just pretend nothing happened", r: "The family classic." } ] },
    { q: "Who steals food from whose plate?",
      options: [ { t: "You steal mine", r: "Documented. Repeatedly." },
                 { t: "I steal yours", r: "It's called sharing, look it up." },
                 { t: "Both of us 😂", r: "A balanced ecosystem." } ] },
    { q: "Who gets blamed for everything?",
      options: [ { t: "Me", r: "Correct." },
                 { t: "Also me", r: "Also correct." },
                 { t: "Definitely me", r: "Full marks." } ] }
  ],
  quizResult: { percent: 97, line: "amazing Di", twist: "The remaining 3% is your annoying side 😂" },

  /* ---- 8 · REASONS (Screen 11) — one per tap ---------------------------- */
  reasons: [
    "Because you always have my back.",
    "Because you know when something is wrong before I say a word.",
    "Because you somehow know everything 😂",
    "Because your advice is annoyingly correct.",
    "Because you laughed at my worst jokes so I wouldn't feel bad.",
    "Because home never felt like home without you in it.",
    "Because you're YOU.",
    "Because you're home. Simple as that."
  ],

  /* ---- 9 · FINAL LETTER (Screen 13) — each line appears handwritten ------
     ★ REPLACE THE MIDDLE LINES WITH YOUR OWN LETTER ★                      */
  letter: [
    "Dear Di,",
    "I wanted to make it special for you.",
    "So I built this little surprise to tell you how much you mean to me.",
    "I hope you like it, and I hope it makes you smile.",
    "You are the best sister anyone could ask for, and I am so lucky to have you in my life.",
    "Thank you for always being there for me, for making me laugh, and for being my rock.",
    "I love you more than words can say.",
    "Until then, know this: of all the siblings in all the world, I'd pick you. Every time.",
    "Happy Raksha Bandhan ❤️"
  ],
  letterSign: "Love,\n[Nikhil]",   

  /* ---- 10 · MEMORY WALL (Screen 15) — draggable scrapbook ----------------
     type: "note" or "photo" · x/y are % positions · rot is tilt in degrees  */
  wall: [
    { type: "note",  text: "you still owe me this years birthday gift & butter chakli 😂",        x: 6,  y: 4,  rot: -6 },
    { type: "photo", src: "assets/photos/wall/wall1.jpg", caption: "us, probably plotting", x: 52, y: 2,  rot: 5 },
    { type: "note",  text: "“mom loves me more” — a lie you tell yourself", x: 14, y: 30, rot: 4 },
    { type: "photo", src: "assets/photos/wall/wall2.jpg", caption: "the good old days", x: 58, y: 30, rot: -5 },
    { type: "note",  text: "our gossips > everything", x: 8,  y: 56, rot: -3 },
    { type: "photo", src: "assets/photos/wall/wall3.jpg", caption: "vacation mode ", x: 50, y: 58, rot: 6 },
    { type: "photo", src: "assets/photos/wall/wall4.jpg", caption: "always mine", x: 67, y: 78, rot: -4 },
    { type: "note",  text: "always us. always.",              x: 30, y: 80, rot: 2 }
  ]
};

/* auto-fill signature with myName if you didn't customise it */
if (CONFIG.letterSign.indexOf("[Nikhil]") !== -1) {
  CONFIG.letterSign = "Love,\n" + CONFIG.myName;
}
