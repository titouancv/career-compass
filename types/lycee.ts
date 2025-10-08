export interface Lycee {
  id: number
  nom: string
  type: string
  arrondissement: string
  rue: string
  ville: string
  code_postal: string
  telephone: string
  email: string
  site_web: string
  specialites: string[]
  sections: string[]
  effectifs: number
  taux_reussite_bac: number
}