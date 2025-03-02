export const generateSiteId = (model: string = 'anime'): string => {
  let id: string

  switch (model.toLowerCase()) {
    case 'anime':
      id = '5'
      break
    case 'manga':
      id = '1'
      break
    case 'ranobe':
      id = '3'
      break
    case 'slash':
      id = '2'
      break
    case 'hentai':
      id = '4'
      break
    default:
      id = '5'
  }

  return id
}
