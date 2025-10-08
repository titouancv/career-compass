import { getLyceesData } from '../../utils/lycees-data'

// @ts-ignore
export default defineEventHandler(async (event: any) => {
  // @ts-ignore
  const query = getQuery(event)
  
  const {
    nom,
    type,
    arrondissement,
    specialite,
    section,
    taux_min
  } = query
  
  let lycees = await getLyceesData()
  
  // Filtrer par nom si fourni
  if (nom && typeof nom === 'string') {
    lycees = lycees.filter(lycee => 
      lycee.nom.toLowerCase().includes(nom.toLowerCase())
    )
  }
  
  // Filtrer par type si fourni
  if (type && typeof type === 'string') {
    lycees = lycees.filter(lycee => lycee.type === type)
  }
  
  // Filtrer par arrondissement si fourni
  if (arrondissement && typeof arrondissement === 'string') {
    lycees = lycees.filter(lycee => lycee.arrondissement === arrondissement)
  }
  
  // Filtrer par spécialité si fournie
  if (specialite && typeof specialite === 'string') {
    lycees = lycees.filter(lycee => 
      lycee.specialites.some(spec => 
        spec.toLowerCase().includes(specialite.toLowerCase())
      )
    )
  }
  
  // Filtrer par section si fournie
  if (section && typeof section === 'string') {
    lycees = lycees.filter(lycee => 
      lycee.sections.includes(section)
    )
  }
  
  // Filtrer par taux de réussite minimum si fourni
  if (taux_min && typeof taux_min === 'string') {
    const tauxMinNum = parseInt(taux_min)
    if (!isNaN(tauxMinNum)) {
      lycees = lycees.filter(lycee => lycee.taux_reussite_bac >= tauxMinNum)
    }
  }
  
  return {
    success: true,
    data: lycees,
    total: lycees.length,
    filters: {
      nom,
      type,
      arrondissement,
      specialite,
      section,
      taux_min
    }
  }
})