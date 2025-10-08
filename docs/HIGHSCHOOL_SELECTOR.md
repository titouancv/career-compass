# HighSchoolSelector - Guide d'utilisation

Le composant `HighSchoolSelector` permet aux utilisateurs de sélectionner et modifier leur lycée en utilisant l'API locale des lycées parisiens.

## Fonctionnalités

### ✅ Sélection de lycée
- Interface intuitive avec recherche par nom, arrondissement
- Filtres par type (Public, Privé, Privé sous contrat)
- Affichage des informations clés (effectifs, taux de réussite, sections)

### ✅ Modification de lycée
- Bouton "Modifier le lycée" pour changer de sélection
- Possibilité d'annuler la modification
- Sauvegarde automatique de la sélection

### ✅ Affichage des détails
- Informations complètes du lycée sélectionné
- Lien vers le site web du lycée
- Sections disponibles avec badges colorés

## Utilisation

### Dans un formulaire
```vue
<template>
  <div>
    <HighSchoolSelector 
      v-model="formData.lycee"
      @lyceeSelected="onLyceeSelected"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  lycee: null
})

const onLyceeSelected = (lycee) => {
  console.log('Lycée sélectionné:', lycee)
  // Logique supplémentaire si nécessaire
}
</script>
```

### Avec une valeur initiale
```vue
<template>
  <HighSchoolSelector 
    :model-value="selectedLycee"
    @update:model-value="updateLycee"
  />
</template>

<script setup>
const selectedLycee = ref({
  id: 1,
  nom: "Lycée Charlemagne",
  // ... autres propriétés
})

const updateLycee = (lycee) => {
  selectedLycee.value = lycee
}
</script>
```

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `Lycee \| null` | `null` | Lycée actuellement sélectionné |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `Lycee \| null` | Émis quand le lycée sélectionné change |
| `lyceeSelected` | `Lycee` | Émis quand un lycée est sélectionné |

## Interface Lycee

```typescript
interface Lycee {
  id: number
  nom: string
  type: 'Public' | 'Privé' | 'Privé sous contrat'
  arrondissement: string
  adresse: string
  telephone: string
  email: string
  site_web: string
  specialites: string[]
  sections: ('Générale' | 'Technologique' | 'Professionnelle')[]
  effectifs: number
  taux_reussite_bac: number
  description?: string
  options?: string[]
  transport?: string[]
}
```

## États du composant

### 🔍 Mode sélection
- Affiché quand aucun lycée n'est sélectionné
- Interface de recherche et filtrage
- Liste des lycées disponibles

### ✅ Mode affichage
- Affiché quand un lycée est sélectionné
- Informations complètes du lycée
- Bouton pour modifier la sélection

### 🔄 Mode modification
- Activé quand l'utilisateur clique sur "Modifier"
- Même interface que le mode sélection
- Bouton "Annuler" pour revenir à l'affichage

## Fonctionnalités de recherche

### Recherche par texte
- Recherche dans le nom du lycée
- Recherche dans l'arrondissement
- Recherche dans l'adresse

### Filtres par type
- **Tous** : Affiche tous les lycées
- **Public** : Lycées publics uniquement
- **Privé** : Lycées privés uniquement
- **Privé sous contrat** : Lycées privés sous contrat

## Intégration avec l'API

Le composant utilise automatiquement l'API locale `/api/lycees` pour charger la liste des lycées. Aucune configuration supplémentaire n'est nécessaire.

### Gestion des erreurs
- Affichage d'un message d'erreur en cas de problème de chargement
- État de chargement avec spinner
- Gestion gracieuse des erreurs réseau

## Styles et apparence

Le composant utilise Tailwind CSS avec :
- Design responsive
- Animations de transition
- Badges colorés par type de lycée
- Interface cohérente avec le reste de l'application

### Couleurs des types
- **Public** : Vert (`bg-green-100 text-green-800`)
- **Privé** : Violet (`bg-purple-100 text-purple-800`)
- **Privé sous contrat** : Bleu (`bg-blue-100 text-blue-800`)

## Exemples d'usage

### Dans le formulaire principal
```vue
<!-- app.vue -->
<HighSchoolSelector 
  v-model="formData.lycee"
  @lyceeSelected="onLyceeSelected"
/>
```

### Page de test
Accédez à `/test-lycee` pour voir le composant en action avec des logs de debug.

## Dépendances

- `AppButton` - Composant bouton réutilisable
- API `/api/lycees` - API locale des lycées
- Types TypeScript depuis `../types/lycee`

## Notes techniques

- Utilise `v-model` pour la liaison bidirectionnelle
- Gestion réactive des états avec Vue 3 Composition API
- Chargement asynchrone des données au montage du composant
- Filtrage côté client pour de meilleures performances