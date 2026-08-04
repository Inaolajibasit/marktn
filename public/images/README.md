# Image drop-in guide

No CMS — the site reads image paths straight from `lib/content.ts`. Drop
your files into these exact paths (same name, `.jpg` or update the
extension in `lib/content.ts` if you're using `.png`/`.webp`).

/public/images/
├── hero/
│   └── campaign.jpg              # full-bleed hero background, ~1920×1080+, wide/cinematic
├── founder/
│   └── onyeka.jpg                # portrait, 4:5 aspect ratio (e.g. 1200×1500)
├── press/                        # optional outlet logos, not yet wired into a component
└── work/
    ├── dior-lagos-launch/
    │   ├── hero.jpg               # 4:5 or wider, used on card + case study hero
    │   ├── gallery-1.jpg          # 4:5, case study gallery
    │   ├── gallery-2.jpg
    │   └── gallery-3.jpg
    ├── loreal-westafrica/        (same 4 files)
    ├── culture-custodian-live/   (same 4 files)
    └── estee-lauder-accra/       (same 4 files)

If you add a new campaign, add its folder here AND a matching entry in
`lib/content.ts` (the `campaigns` array) — that file is the single source
of truth for both content and image paths.

Until real files exist, the dev server will just show broken images —
everything else (layout, animation, type) still works.
