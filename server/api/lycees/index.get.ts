import { getLyceesData } from '../../utils/lycees-data'

// @ts-ignore
export default defineEventHandler(async (event: any) => {
  // Récupérer tous les lycées
  const lycees = await getLyceesData()
  
  return {
    success: true,
    data: lycees,
    total: lycees.length
  }
})