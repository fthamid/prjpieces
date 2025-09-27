# Guide de Développement - Unimatel

## 🏗️ Architecture du Projet

### Structure des Dossiers

```
prjpieces/
├── assets/                 # Ressources statiques
│   ├── css/               # Feuilles de style
│   ├── js/                # Scripts JavaScript
│   └── images/            # Images et icônes
├── components/            # Composants réutilisables
├── pages/                 # Pages de l'application
├── index.html            # Point d'entrée principal
├── README.md             # Documentation utilisateur
└── DEVELOPMENT.md        # Ce fichier
```

### Technologies

- **Frontend Framework**: Alpine.js 3.x
- **CSS Framework**: Tailwind CSS 4.x
- **Plugins Alpine.js**:
  - `@alpinejs/mask` : Masquage des champs de saisie
  - `@alpinejs/sort` : Tri des éléments
  - `@imacrayon/alpine-ajax` : Navigation AJAX

## 🚀 Démarrage Rapide

### Prérequis
- Serveur web local (recommandé) pour éviter les problèmes CORS
- Navigateur moderne supportant ES6+

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd prjpieces

# Serveur local simple avec Python
python -m http.server 8000

# Ou avec Node.js
npx serve .

# Ou avec PHP
php -S localhost:8000
```

### Structure des Pages

#### Navigation AJAX
L'application utilise Alpine AJAX pour charger les pages dynamiquement sans rechargement complet :

```html
<a href="pages/clients.html" x-target="main-content">Clients</a>
```

#### Composants Alpine.js

1. **objentete** : Gestion des en-têtes de pièces commerciales
2. **objline** : Gestion des lignes d'articles
3. **objbox** : Composant générique de boîte

## 📝 Conventions de Code

### HTML
- Utilisation de classes Tailwind CSS
- Attributs Alpine.js préfixés par `x-`
- Structure sémantique avec `<header>`, `<main>`, `<footer>`

### CSS
- Classes utilitaires Tailwind prioritaires
- CSS personnalisé dans `assets/css/styles.css`
- Variables CSS dans `:root`

### JavaScript
- Fonctions pures quand possible
- Nommage en camelCase
- Commentaires en français
- Gestion d'erreurs avec try/catch

## 🔧 Fonctionnalités Principales

### Gestion des Pièces Commerciales
- Création/modification de devis, factures, BL, avoirs
- Calculs automatiques TVA
- Gestion des lignes d'articles
- Format des nombres français (espaces comme séparateurs)

### Gestion des Clients
- CRUD complet (Create, Read, Update, Delete)
- Recherche et filtrage
- Modales pour l'édition

### Gestion des Produits
- Catalogue avec catégories
- Gestion des stocks
- Indicateurs visuels de stock

### Utilitaires
- Calculatrice intégrée
- Convertisseur de devises
- Outils de sauvegarde/export
- Informations système

## 🎨 Personnalisation

### Thème et Couleurs
Modifier les variables CSS dans `assets/css/styles.css` :

```css
:root {
    --primary: rgb(97, 95, 104);
    --primary-hover: rgb(139, 131, 163);
    --font1: 'lobster',sans-serif;
}
```

### Ajout de Nouvelles Pages
1. Créer le fichier HTML dans `pages/`
2. Ajouter le lien dans la navigation
3. Implémenter la logique Alpine.js si nécessaire

### Extension des Fonctionnalités
- Utiliser les composants Alpine.js existants
- Respecter la structure modulaire
- Documenter les nouvelles fonctions

## 🧪 Tests et Validation

### Tests Manuels
- Vérifier la responsivité sur différents écrans
- Tester la navigation AJAX
- Valider les calculs commerciaux
- Contrôler l'accessibilité

### Points de Contrôle
- [ ] Navigation fonctionnelle
- [ ] Calculs TVA corrects
- [ ] Sauvegarde des données
- [ ] Responsive design
- [ ] Performance acceptable

## 📦 Déploiement

### Préparation
1. Vérifier tous les liens relatifs
2. Optimiser les images
3. Minifier le CSS/JS si nécessaire
4. Tester en mode production

### Hébergement
- Serveur web statique suffisant
- HTTPS recommandé pour la sécurité
- Compression gzip activée

## 🔍 Débogage

### Outils de Développement
- Console navigateur pour les erreurs JavaScript
- Alpine.js DevTools (extension navigateur)
- Tailwind CSS IntelliSense

### Problèmes Courants
1. **Navigation AJAX ne fonctionne pas** : Vérifier les chemins relatifs
2. **Calculs incorrects** : Contrôler les fonctions `str2number`
3. **Styles non appliqués** : Vérifier la syntaxe Tailwind

## 🤝 Contribution

### Workflow Git
```bash
# Créer une branche feature
git checkout -b feature/nouvelle-fonctionnalite

# Développer et tester
git add .
git commit -m "feat: ajouter nouvelle fonctionnalité"

# Pousser et créer une PR
git push origin feature/nouvelle-fonctionnalite
```

### Standards de Code
- Messages de commit en français
- Code commenté pour les parties complexes
- Respect des conventions ESLint/Prettier

## 📚 Ressources Utiles

- [Alpine.js Documentation](https://alpinejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Guide des pièces commerciales françaises](https://www.economie.gouv.fr/)

## 🐛 Problèmes Connus

1. **Performance** : Grandes listes peuvent être lentes
2. **IE Support** : Non compatible avec Internet Explorer
3. **Mobile** : Quelques ajustements nécessaires pour très petits écrans

## 🔮 Roadmap

### Version 1.1
- [ ] Authentification utilisateur
- [ ] Base de données locale (IndexedDB)
- [ ] Export PDF des pièces
- [ ] Mode hors ligne

### Version 1.2
- [ ] API REST backend
- [ ] Synchronisation multi-dispositifs
- [ ] Tableaux de bord analytiques
- [ ] Notifications push