export type ClasseLevel = 'Seconde' | 'Premiere' | 'Terminal'
export type BacType = 'Générale' | 'Technologique' | 'Professionnel'

export interface ClasseData {
  classe: ClasseLevel | null
  bacType: BacType | null
}

export interface Lycee {
  id: number
  nom: string
  type: 'Public' | 'Privé' | 'Privé sous contrat'
  arrondissement: string
  rue: string
  ville: string
  code_postal: string
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

export interface FormData {
  classe: ClasseLevel | null
  bacType: BacType | null
  speciality: string | null
  note: string | null
  lycee: Lycee | null
}