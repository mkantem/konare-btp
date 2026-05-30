# Groupe KONARE BTP

Site vitrine statique, mobile-first, sans backend, sans base de données et sans framework. Il est prévu pour Cloudflare Pages avec:

- build command: aucun
- output directory: `/`
- framework preset: none

## Structure

```text
/
|-- index.html
|-- admin/
|   |-- index.html
|   `-- config.yml
|-- content/
|   `-- tiktok-videos.json
|-- docs/
|   `-- decap-cms-setup.md
|-- oauth-worker/
|   |-- src/
|   |   `-- index.ts
|   |-- README.md
|   `-- wrangler.toml
|-- fr/
|   |-- index.html
|   |-- services.html
|   |-- realisations.html
|   |-- distance.html
|   |-- contact.html
|   `-- avis.html
|-- en/
|   |-- index.html
|   |-- services.html
|   |-- realisations.html
|   |-- distance.html
|   |-- contact.html
|   `-- reviews.html
|-- assets/
|   |-- css/
|   |   `-- style.css
|   |-- img/
|   |   |-- flag-fr.svg
|   |   |-- flag-gb.svg
|   |   `-- logo.svg
|   `-- js/
|       |-- main.js
|       `-- remark42.js
`-- README.md
```

## Version bilingue

La version française se trouve dans le dossier `fr/`. La version anglaise se trouve dans le dossier `en/`. Le fichier `index.html` redirige vers la version française.

## Avis clients

Les pages `fr/avis.html` et `en/reviews.html` affichent le même fil Remark42. La configuration centralisée se trouve dans `assets/js/remark42.js`.

## Administration des vidéos

L'interface Decap CMS se trouve dans `admin/`. Elle permet au propriétaire du site
d'ajouter, désactiver ou supprimer les liens TikTok stockés dans
`content/tiktok-videos.json`.

- Les pages d'accueil affichent les 4 vidéos actives les plus récentes.
- Les pages de réalisations affichent les 9 vidéos actives les plus récentes.
- Les nouvelles vidéos doivent être ajoutées en bas de la liste dans Decap CMS.

La configuration du Worker OAuth GitHub est décrite dans `docs/decap-cms-setup.md`.

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

Le domaine public configure dans les balises `og:url` et `hreflang` est `https://konarebtp.ml`.

## Mots-clés SEO inclus

- construction au Mali
- btp Mali
- entreprise de construction Mali
- construction à Bamako
- construction à distance Mali
