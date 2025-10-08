# API Lycées - Documentation

Cette API locale permet de récupérer les informations des lycées parisiens.

## Endpoints disponibles

### 1. Récupérer tous les lycées
```
GET /api/lycees
```

**Réponse:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nom": "Etienne Dolet",
      "type": "Public",
      "arrondissement": "20e",
      "adresse": "77 avenue Gambetta, 75020 Paris",
      "telephone": "01 43 48 12 34",
      "email": "contact@lycee-dolet.fr",
      "site_web": "http://www.lycee-dolet.fr",
      "specialites": ["Mathématiques", "Physique-Chimie", "SVT"],
      "sections": ["Générale", "Technologique"],
      "effectifs": 850,
      "taux_reussite_bac": 89
    }
  ],
  "total": 19
}
```

### 2. Récupérer un lycée par ID
```
GET /api/lycees/{id}
```

**Paramètres:**
- `id` (number): ID du lycée

**Réponse:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nom": "Etienne Dolet",
    // ... autres propriétés
  }
}
```

### 3. Rechercher des lycées avec filtres
```
GET /api/lycees/search?[paramètres]
```

**Paramètres de recherche (optionnels):**
- `nom` (string): Nom du lycée (recherche partielle)
- `type` (string): Type du lycée ("Public", "Privé", "Privé sous contrat")
- `arrondissement` (string): Arrondissement (ex: "20e")
- `specialite` (string): Spécialité (recherche partielle)
- `section` (string): Section ("Générale", "Technologique", "Professionnelle")
- `taux_min` (string): Taux de réussite minimum au bac

**Exemples d'usage:**
```
/api/lycees/search?type=Public
/api/lycees/search?arrondissement=20e&taux_min=90
/api/lycees/search?nom=charles&section=Générale
```

## Utilisation côté client

### Avec le composable useLycees()
```typescript
const { loadLycees, searchLyceesWithFilters, lycees } = useLycees()

// Charger tous les lycées
await loadLycees()

// Rechercher avec filtres
await searchLyceesWithFilters({
  type: 'Public',
  arrondissement: '20e'
})
```

### Avec $fetch directement
```typescript
// Récupérer tous les lycées
const result = await $fetch('/api/lycees')

// Rechercher
const searchResult = await $fetch('/api/lycees/search?type=Public')
```

## Types TypeScript

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

## Composants disponibles

### LyceeList
Composant pour afficher une liste de lycées avec filtres de recherche.

```vue
<LyceeList @selectLycee="handleSelectLycee" />
```

## Pages de test

- `/lycees` - Page de test avec boutons pour tester l'API
- Accédez à cette page pour vérifier que l'API fonctionne correctement

## Lycées inclus dans la base de données

1. Etienne Dolet
2. Lycée privé Charles de Foucauld
3. Lycée polyvalent Guillaume Tirel
4. Lycée polyvalent l'Initiative
5. Lycée polyvalent privé Saint Jean de Montmartre
6. Lycée privé Pascal
7. Lycée du bâtiment et des travaux publics
8. Lycée polyvalent privé Saint-Nicolas
9. Lycée privé La Rochefoucauld
10. Lycée technique privé de l'école technique supérieure du laboratoire
11. Lycée privé Charles Péguy
12. Lycée privé Sainte-Louise
13. Lycée privé L'Ecole alsacienne
14. Lycée polyvalent ESAA-Ecole Boulle
15. Lycée polyvalent Paul Poiret
16. Lycée Charlemagne
17. Lycée Claude Monet
18. Lycée privé Lucien de Hirsch
19. Lycée privé Saint-Michel de Picpus

## Notes

- Les données actuelles sont des données fictives basées sur des lycées réels
- Pour connecter à une vraie base de données, modifiez les fonctions dans `/server/api/lycees/`
- L'API supporte la recherche partielle sur le nom et les spécialités
- Tous les endpoints retournent un format JSON standardisé avec `success` et `data`