# Renaissance — Le Grimoire de WoW: Forever

Un codex français en lecture seule consacré à WoW: Forever : addons recommandés, astuces de terrain, objets RP et nouvelles officielles.

## Fonctionnalités

- Navigation par rubrique avec liens directs et historique du navigateur, sans longue page à parcourir
- Accueil éditorial compact : patch notes synchronisées avec la rubrique Actualités, focus EllesmereUI et découverte RP
- Parcours par besoin (exploration, donjons, interface, dépannage) ouvrant directement le catalogue filtré
- Menu mobile dépliant avec toutes les rubriques, fermeture par Échap et navigation clavier
- Tri du catalogue par sélection, nom ou catégorie, compteur de plage et réinitialisation des filtres
- Favoris enregistrés localement, filtre « Mes favoris » et affichage cartes ou liste mémorisé
- Groupes de commandes repliables, avec ouverture automatique depuis un lien direct
- Accueil illustré par le mont Hyjal et sélection de démarrage compacte
- Thème pierre sombre et dorures commun à toutes les rubriques, avec Alliance et Horde représentées à l’accueil
- Notes de bêta du 24 septembre et mise à jour client du 23 septembre 2026, résumées en français avec liens Blizzard
- Catalogue de 29 addons filtrable, dont EllesmereUI avec ses liens officiels et versions Forever
- Mise en page large jusqu’à 1680 px, avec marges adaptées à l’écran
- Direction artistique de portail de jeu : panorama immersif, navigation en métal sombre, cartes illustrées et boutons encadrés
- Animations d’ambiance et de navigation désactivables, respectant la préférence système de réduction des mouvements
- Huit fiches pratiques enrichies avec durée, contexte, outil conseillé et procédure courte
- Manuel de commandes console classé par usage, avec copie en un clic et avertissements de sauvegarde
- Sélection éditoriale des trois addons indispensables pour démarrer
- Cabinet d’objets RP avec un visuel de torche original, la torche réutilisable de la bêta et la Torche de Grayson
- Rubrique Nouvelles datée, résumée et reliée aux annonces officielles de Blizzard
- Direction artistique fantasy sombre, accueil compact, raccourcis de navigation et cartes arrondies
- Interface responsive, animations adaptées aux préférences système et navigation accessible
- Serveur Node sans dépendance avec en-têtes de sécurité, cache statique et accès limité aux fichiers publics
- Signature « Créé par Nyaru » dans le pied de page

## Lancer localement

```bash
npm start
```

Le site est ensuite disponible sur `http://localhost:3000`.

## Déploiement Railway

Le dépôt contient `railway.json` et écoute automatiquement sur la variable `PORT` fournie par Railway. Il suffit de créer un service Railway depuis ce dépôt GitHub.

> Projet non officiel. World of Warcraft et son univers appartiennent à Blizzard Entertainment.

## Actualités

La rubrique est éditoriale et ne se met pas à jour automatiquement. Dernière vérification : 28 septembre 2026. Pour une mise à jour, vérifier les annonces de Blizzard, modifier les résumés et leurs dates dans `index.html`, puis publier sur la branche `Addon`.

Sources des notes de bêta :
- https://eu.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-24-september/631316
- https://eu.forums.blizzard.com/en/wow/t/beta-client-update-23-september/630815
