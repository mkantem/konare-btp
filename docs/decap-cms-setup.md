# Configuration Decap CMS

Le site contient l'interface Decap CMS dans `/admin/`. Elle gere la liste partagee
des videos TikTok stockee dans `content/tiktok-videos.json`.

## Fonctionnement

- Le proprietaire ajoute les nouvelles videos en bas de la liste.
- Le site affiche automatiquement les videos actives de la plus recente a la plus ancienne.
- Les pages d'accueil affichent les 4 videos les plus recentes.
- Les pages de realisations affichent les 9 videos les plus recentes.
- Les versions francaise et anglaise utilisent la meme liste.

## GitHub

1. Creer un compte GitHub pour le proprietaire du site.
2. Ajouter ce compte comme collaborateur du depot `mkantem/konare-btp`.
3. Creer une GitHub OAuth App.
4. Utiliser `https://cms-auth.konarebtp.ml/callback` comme callback URL.

## Worker OAuth Cloudflare

Decap CMS utilise `https://cms-auth.konarebtp.ml` comme proxy OAuth. Le Worker doit
exposer les routes `/auth` et `/callback`.

Le Worker accepte uniquement `GET /auth` et `GET /callback`. Les autres routes et
methodes retournent `404`.

La documentation Decap CMS recommande un Worker leger pour ce cas d'usage :

https://decapcms.org/docs/backends-overview/#using-github-with-an-oauth-proxy

Un Worker adapte au site est disponible dans `oauth-worker/`. Il valide egalement
le parametre OAuth `state` avant d'echanger le code GitHub.

Le template Worker general reference par la documentation est :

https://github.com/sterlingwes/decap-proxy

Configurer les secrets Worker :

```text
GITHUB_OAUTH_ID
GITHUB_OAUTH_SECRET
```

Puis lancer `npx.cmd wrangler deploy` depuis `oauth-worker/` sous Windows. Le domaine personnalise
`cms-auth.konarebtp.ml` est defini dans `oauth-worker/wrangler.toml`.

## Test apres deploiement

1. Ouvrir `https://konarebtp.ml/admin/`.
2. Cliquer sur la connexion GitHub.
3. Autoriser l'application OAuth.
4. Ajouter un lien TikTok en bas de la liste et publier.
5. Verifier le commit GitHub et le deploiement Cloudflare Pages.
6. Verifier que la video apparait en premier sur les pages d'accueil et de realisations.
