# Pour toi, Sarah — Site romantique Angular

Site web romantique et élégant créé pour Sarah, avec galerie photos/vidéos, timeline des souvenirs et lettre d'amour.

## Stack

- Angular 17 (standalone components)
- Tailwind CSS 3
- GSAP + ScrollTrigger (animations au scroll)

## Installation et lancement

```bash
# 1. Installer les dépendances
npm install

# 2. Copier les médias (voir section ci-dessous)

# 3. Lancer le serveur de développement
npm start
```

Le site sera accessible sur **http://localhost:4200**

## Ajouter tes photos et vidéos

Copie tes fichiers dans `src/assets/media/` en les renommant ainsi :

| Fichier original                                     | Nouveau nom     |
|------------------------------------------------------|-----------------|
| WhatsApp Image 2026-10-05 at 02.46.15.jpeg           | photo1.jpeg     |
| WhatsApp Image 2026-10-05 at 02.46.16.jpeg           | photo2.jpeg     |
| WhatsApp Image 2026-10-05 at 02.46.16 (1).jpeg       | photo3.jpeg     |
| WhatsApp Image 2026-10-05 at 02.46.16 (2).jpeg       | photo4.jpeg     |
| WhatsApp Video 2026-10-05 at 02.46.16.mp4            | video1.mp4      |
| WhatsApp Video 2026-10-05 at 02.46.17.mp4            | video2.mp4      |
| WhatsApp Video 2026-10-05 at 02.46.17 (1).mp4        | video3.mp4      |
| WhatsApp Video 2026-10-05 at 02.46.16 (1).mp4        | video4.mp4      |

**Commande rapide depuis le dossier `bon\` :**

```powershell
$src = "C:\Users\yaniss\Desktop\sarah_bebe\bon"
$dst = "C:\Users\yaniss\Desktop\sarah_bebe\src\assets\media"

Copy-Item "$src\WhatsApp Image 2026-10-05 at 02.46.15.jpeg"    "$dst\photo1.jpeg"
Copy-Item "$src\WhatsApp Image 2026-10-05 at 02.46.16.jpeg"    "$dst\photo2.jpeg"
Copy-Item "$src\WhatsApp Image 2026-10-05 at 02.46.16 (1).jpeg" "$dst\photo3.jpeg"
Copy-Item "$src\WhatsApp Image 2026-10-05 at 02.46.16 (2).jpeg" "$dst\photo4.jpeg"
Copy-Item "$src\WhatsApp Video 2026-10-05 at 02.46.16.mp4"     "$dst\video1.mp4"
Copy-Item "$src\WhatsApp Video 2026-10-05 at 02.46.17.mp4"     "$dst\video2.mp4"
Copy-Item "$src\WhatsApp Video 2026-10-05 at 02.46.17 (1).mp4" "$dst\video3.mp4"
Copy-Item "$src\WhatsApp Video 2026-10-05 at 02.46.16 (1).mp4" "$dst\video4.mp4"
```

## Structure du projet

```
src/
├── app/
│   ├── components/
│   │   ├── hero/           → Section d'accueil (particules dorées)
│   │   ├── timeline/       → 6 moments de la relation
│   │   ├── gallery/        → Galerie photos + vidéos avec lightbox
│   │   ├── love-letter/    → Lettre d'amour
│   │   └── footer/         → Pied de page (pluie de cœurs)
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
│   └── media/              → Tes photos et vidéos ici
├── styles.css              → Styles globaux + tokens
└── index.html
```

## Personnaliser

### Changer la date de début de la relation
Dans `src/app/components/hero/hero.component.html`, ligne :
```html
Ensemble depuis août 2026
```

### Modifier les textes de la timeline
Dans `src/app/components/timeline/timeline.component.ts`, tableau `events[]`.

### Modifier les légendes des médias
Dans `src/app/components/gallery/gallery.component.ts`, tableau `media[]`.

### Modifier la lettre d'amour
Dans `src/app/components/love-letter/love-letter.component.html`.

## Build production

```bash
npm run build
```
Les fichiers sont générés dans `dist/sarah-bebe/`.

## Ajouter un backend (pour plus tard)

Pour héberger le site en ligne avec une base de données :
- **Vercel** (gratuit) : `vercel deploy` depuis le dossier `dist/`
- **Netlify** : glisser-déposer le dossier `dist/sarah-bebe/browser/`
- Pour un backend dynamique : connecter Supabase pour stocker des messages/réactions
