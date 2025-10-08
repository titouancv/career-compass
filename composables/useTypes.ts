export type ClasseLevel = 'Seconde' | 'Premiere' | 'Terminal'
export type BacType = 'Générale' | 'Technologique' | 'Professionnel'

export interface ClasseData {
  classe: ClasseLevel | null
  bacType: BacType | null
}

export interface FormData {
  classe: ClasseLevel | null
  bacType: BacType | null
  speciality: string | null
  note: string | null
}