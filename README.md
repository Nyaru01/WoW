# Night Agency — Codex WoW Forever

Version dédiée à la guilde Alliance Night Agency, basée sur la branche Addon du codex de Nyaru. Catalogue de 49 addons, favoris locaux, guides, talents et liens sources conservés. Identité visuelle bleu nuit, argent et or, emblème de guilde et décor original sans texte.

## Local
Node 22.19 ou ultérieur : `npm start`. Vérification : `node --test test.js`.

## Railway
Déployer la branche `night-agency`, démarrage `npm start`, contrôle `/`. PORT est fourni automatiquement. Pour conserver les votes, monter un volume sur `/data` et définir COMMUNITY_DATA_DIR=/data. Sans volume, les votes sont désactivés sur Railway. Aucune clé Discord n’est nécessaire pour ce site.

## Refonte UI/UX
Hero asymétrique, cartes RPG avec compteurs issus des données, section de guilde, recherche transversale incluant les classes, navigation au clavier, raccourci Ctrl+K et recherche de dépannage. Palette et tokens dans night-agency.css. Police Marcellus auto-hébergée (Google Fonts), interface en police système. Respect de prefers-reduced-motion.
