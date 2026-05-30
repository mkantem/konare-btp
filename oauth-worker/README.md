# Worker OAuth Decap CMS

Ce Worker Cloudflare fournit les routes `/auth` et `/callback` utilisees par Decap
CMS pour la connexion GitHub.

## Secrets

Ne pas enregistrer les secrets GitHub dans le depot. Les ajouter avec Wrangler :

```powershell
npx.cmd wrangler secret put GITHUB_OAUTH_ID
npx.cmd wrangler secret put GITHUB_OAUTH_SECRET
```

## Deploiement

Depuis ce dossier :

```powershell
npx.cmd wrangler deploy
```

Creer la GitHub OAuth App avec :

```text
Homepage URL: https://cms-auth.konarebtp.ml
Authorization callback URL: https://cms-auth.konarebtp.ml/callback
```
