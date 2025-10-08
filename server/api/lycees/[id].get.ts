import { getLyceesData } from '../../utils/lycees-data'

// @ts-ignore
export default defineEventHandler(async (event: any) => {
  // @ts-ignore
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    // @ts-ignore
    throw createError({
      statusCode: 400,
      statusMessage: 'ID du lycée requis'
    })
  }
  
  const lycee = await getLyceeById(parseInt(id))
  
  if (!lycee) {
    // @ts-ignore
    throw createError({
      statusCode: 404,
      statusMessage: 'Lycée non trouvé'
    })
  }
  
  return {
    success: true,
    data: lycee
  }
})

async function getLyceeById(id: number) {
  const lycees = await getLyceesData()
  return lycees.find(lycee => lycee.id === id) || null
}