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
- catalogue enrichi de 30 addons, 12 guides, 6 objets RP et 9 actualités ;
- favoris locaux pour les addons, astuces, commandes et objets ;
- compteur de sessions connectées en temps réel : plusieurs onglets du même navigateur comptent une seule fois, grâce à un cookie de session anonyme ; aucun historique ni stockage en base ;
- animations légères respectant `prefers-reduced-motion` et images WebP optimisées ;
- métadonnées canonical, OpenGraph, Twitter Cards et Schema.org ;
- `robots.txt` et `sitemap.xml` générés depuis les contenus ;
- conservation des anciennes ancres `#addons`, `#astuces`, `#commandes`, `#objets-rp` et `#nouvelles`.

## Lancer et vérifier

```bash
npm start
npm run check
npm test
npm run audit:a11y
npm run audit:lighthouse
```

L’audit d’accessibilité automatisé utilise axe sur les principales routes, en formats mobile et bureau. Lighthouse mesure Performance, Accessibilité, Bonnes pratiques, SEO, LCP, CLS, TBT et Speed Index. Chrome doit être installé ; son chemin peut être fourni avec `CHROME_PATH`.

Le serveur écoute sur `PORT` ou, par défaut, sur [http://localhost:3000](http://localhost:3000).

Pour produire des URLs canonical absolues en production, définir `SITE_URL`. Sur Railway, `RAILWAY_PUBLIC_DOMAIN` est utilisé automatiquement lorsque `SITE_URL` est absent.

## Architecture

- `data.js` : contenus et modèle de données partagés entre serveur et navigateur ;
- `server.js` : serveur statique, routes propres, métadonnées, sitemap, présence éphémère et en-têtes de sécurité ;
- `app.js` : recherche, filtres, favoris, copie et rendu des fiches ;
- `audit.js` : audits Lighthouse et axe reproductibles ;
- `scripts/optimize_images.py` : conversion reproductible des illustrations en WebP ;
- `index.html`, `styles.css`, `theme.css` : structure et identité visuelle existantes.

Les informations incertaines sont affichées comme telles. Une source communautaire n’est jamais présentée comme officielle et une valeur CVar non confirmée n’est jamais inventée.

> Projet non officiel. World of Warcraft et son univers appartiennent à Blizzard Entertainment.

## Communauté

Votes anonymes modifiables, tri par avis et signalements GitHub préremplis. La compatibilité est affichée indépendamment des votes. Voir [COMMUNITY.md](COMMUNITY.md) pour le volume Railway `/data`, la conservation des votes et le cookie fonctionnel.

## Calculateur et découverte

Le menu Talents propose les neuf classes Forever. `talents-data.js` contient les faits relevés dans les sources client, `talent-engine.js` valide les rangs, budgets et prérequis, et `talents.js` gère les builds locaux et les liens de partage. Les effets détaillés renvoient à ForeverChanges. Les illustrations de classe viennent de Blizzard en 2400 × 1400 ; les icônes restent à leur taille d’origine. Les données de bêta consultées le 30 septembre 2026 peuvent évoluer : actualiser le jeu de données et ses sources lors d’un nouveau build.

Les sélections du catalogue utilisent `?besoin=...`. Les favoris partagés utilisent `?selection=type:slug,...` : seuls des identifiants connus sont reconnus, sans remplacement des favoris du destinataire.
