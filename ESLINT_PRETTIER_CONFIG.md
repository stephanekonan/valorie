# Configuration ESLint + Prettier

## ✅ Problème résolu

Les commentaires `/* eslint-disable prettier/prettier */` ne sont **plus nécessaires** !

## 📋 Voici comment ça fonctionne maintenant

### 1. **Prettier** (`npm run format`)

- Outil indépendant de formatage du code
- Utilise `.prettierrc` pour la configuration
- S'exécute en standalone (pas via ESLint)

### 2. **ESLint** (`npm run lint`)

- Vérification du code et des styles
- Utilise `eslint-config-prettier` pour **désactiver** les règles conflictuelles
- Ne force plus Prettier à s'exécuter via ESLint

---

## 🛠️ Fichiers de configuration

### `.prettierrc`

```json
{
  "printWidth": 100,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all"
}
```

### `eslint.config.js` (clé)

```javascript
import eslintConfigPrettier from "eslint-config-prettier";
// ... autres imports ...

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    /* ... autres configs ... */
  },
  eslintConfigPrettier, // ← Désactive les règles conflictuelles
);
```

---

## 📝 Utilisation

### Formater le repo

```bash
npm run format
```

### Vérifier les erreurs ESLint

```bash
npm run lint
```

### Formater + Lint automatiquement (Git hooks)

Tu peux ajouter un pre-commit hook avec `husky`:

```bash
npm install husky lint-staged --save-dev
npx husky install
```

---

## ✨ Avantages de cette configuration

✅ **Pas de conflits** entre les outils
✅ **Prettier** s'exécute en standalone (plus rapide)
✅ **ESLint** se concentre sur la vérification du code
✅ **Séparation des responsabilités** propre
✅ **No magic comments** (`/* eslint-disable */`) nécessaires

---

## 🚫 Ne plus jamais faire

```javascript
// ❌ ANCIENNE MÉTHODE (PLUS)
/* eslint-disable prettier/prettier */
// code...
```

La bonne pratique:

- ✅ Formater avec `npm run format`
- ✅ Linter avec `npm run lint`
