# Projet Next.js avec Docker

Ce projet est un [projet Next.js](https://nextjs.org/) initialisé avec [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) et configuré pour s'exécuter dans un environnement Docker.

## Prérequis

- Docker
- Link-360
- [DNS Mask url](https://allanphilipbarku.medium.com/setup-automatic-local-domains-with-dnsmasq-on-macos-ventura-b4cd460d8cb3)

## Mise en Route

Pour démarrer le serveur de développement avec Docker, exécutez DANS link-360:

```bash
docker compose up ui
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

Vous pouvez commencer à éditer la page en modifiant `app/page.tsx`. La page se met à jour automatiquement lorsque vous modifiez le fichier.
