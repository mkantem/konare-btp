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

## Version bilingue

Le français est la version principale du site. La version anglaise se trouve dans le dossier `en/`.

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
