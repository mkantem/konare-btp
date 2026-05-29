# Groupe KONARE BTP

Site vitrine statique, mobile-first, sans backend, sans base de données et sans framework. Il est prévu pour Cloudflare Pages avec:

- build command: aucun
- output directory: `/`
- framework preset: none

## Structure

```text
/
├── index.html
├── services.html
├── realisations.html
├── distance.html
├── contact.html
├── en/
│   ├── index.html
│   ├── services.html
│   ├── realisations.html
│   ├── distance.html
│   └── contact.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── img/
│   │   ├── flag-fr.svg
│   │   ├── flag-gb.svg
│   │   └── logo.svg
│   └── js/
│       └── main.js
└── README.md
```

## Remplacer les numéros WhatsApp

Le numéro principal utilisé dans les boutons est:

```text
22379010153
```

Cherchez ce numéro dans les fichiers `.html`, y compris dans le dossier `en/`, et remplacez-le par le numéro principal souhaité au format international sans `+`, par exemple:

```text
22365234149
```

Les liens utilisent ce format:

```text
https://wa.me/22379010153?text=Bonjour%20Groupe%20Konare%20BTP%2C%20je%20souhaite%20demander%20un%20devis%20pour%20un%20projet%20de%20construction.
```

Les trois contacts affichés sont:

- +223 79 01 01 53
- +223 65 23 41 49
- +223 91 56 34 79

## Remplacer le compte TikTok

Le compte utilisé actuellement est:

```text
https://www.tiktok.com/@groupekonarebtp2emecompt
```

Si le nom d’utilisateur change, remplacez `@groupekonarebtp2emecompt` dans tous les fichiers HTML, y compris dans le dossier `en/`.

## Version bilingue

Le français est la version principale du site. La version anglaise se trouve dans le dossier `en/`.

Chaque page française contient un lien vers son équivalent anglais:

- `index.html` vers `en/index.html`
- `services.html` vers `en/services.html`
- `realisations.html` vers `en/realisations.html`
- `distance.html` vers `en/distance.html`
- `contact.html` vers `en/contact.html`

Après déploiement, remplacer les valeurs `https://example.com/...` dans les balises `og:url` et `hreflang` par le vrai domaine.

## Remplacer les vidéos TikTok

Les pages `index.html` et `realisations.html` contiennent des vidéos placeholder comme:

```html
<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@groupekonarebtp2emecompt/video/7640384063487937813" data-video-id="7640384063487937813" style="max-width: 605px;min-width: 325px;">
  <section></section>
</blockquote>
```

Pour chaque vidéo:

1. Ouvrir la vidéo sur TikTok.
2. Copier l’URL, par exemple `https://www.tiktok.com/@groupekonarebtp2emecompt/video/1234567890123456789`.
3. Remplacer la valeur `cite` par cette URL.
4. Remplacer `data-video-id` par le numéro qui se trouve après `/video/`.

Le script TikTok est chargé une seule fois par `assets/js/main.js`.

## Déploiement GitHub + Cloudflare Pages

1. Créer un dépôt GitHub.
2. Envoyer tous les fichiers de ce dossier dans le dépôt.
3. Ouvrir Cloudflare Dashboard.
4. Aller dans Workers & Pages, puis Create application, puis Pages.
5. Connecter le dépôt GitHub.
6. Paramétrer le projet:
   - framework preset: none
   - build command: laisser vide
   - output directory: `/`
7. Déployer.

Après déploiement, remplacer les valeurs `og:url` dans les fichiers HTML par le vrai domaine du site.

## Mots-clés SEO inclus

- construction au Mali
- btp Mali
- entreprise de construction Mali
- construction à Bamako
- construction à distance Mali
