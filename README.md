# Renaissance — Le codex français pratique de WoW: Forever

Renaissance est un site indépendant, sans compte, publicité ciblée, tracker ni cookie marketing. Il rassemble des addons, astuces, commandes, procédures de dépannage, objets RP et actualités utiles pour WoW: Forever.

## Fonctionnalités

- contenus structurés avec URL stable, tags, sources et date de vérification ;
- recherche transversale instantanée ;
- catalogue d’addons filtrable par usage et compatibilité ;
- fiche complète de Hunter's Field Guide, marquée **Natif Forever** et **Bêta** ;
- commandes copiables et presets Immersion, Performance et Cinématique ;
- dépannage progressif pour les addons, erreurs Lua et resets d’interface ;
- objets RP avec filtres et commandes `/way` quand les coordonnées sont connues ;
- favoris locaux pour les addons, astuces, commandes et objets ;
- métadonnées canonical, OpenGraph, Twitter Cards et Schema.org ;
- `robots.txt` et `sitemap.xml` générés depuis les contenus ;
- conservation des anciennes ancres `#addons`, `#astuces`, `#commandes`, `#objets-rp` et `#nouvelles`.

## Lancer et vérifier

```bash
npm start
npm run check
npm test
```

Le serveur écoute sur `PORT` ou, par défaut, sur [http://localhost:3000](http://localhost:3000).

Pour produire des URLs canonical absolues en production, définir `SITE_URL`. Sur Railway, `RAILWAY_PUBLIC_DOMAIN` est utilisé automatiquement lorsque `SITE_URL` est absent.

## Architecture

- `data.js` : contenus et modèle de données partagés entre serveur et navigateur ;
- `server.js` : serveur statique, routes propres, métadonnées, sitemap et en-têtes de sécurité ;
- `app.js` : recherche, filtres, favoris, copie et rendu des fiches ;
- `index.html`, `styles.css`, `theme.css` : structure et identité visuelle existantes.

Les informations incertaines sont affichées comme telles. Une source communautaire n’est jamais présentée comme officielle et une valeur CVar non confirmée n’est jamais inventée.

> Projet non officiel. World of Warcraft et son univers appartiennent à Blizzard Entertainment.
