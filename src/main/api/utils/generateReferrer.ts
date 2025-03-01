export const generateRefferer = (model: string = 'anime'): string => {
  let refferer: string

  switch (model.toLowerCase()) {
    case 'anime':
      refferer = 'https://anilib.me/'
      break
    case 'manga':
      refferer = 'https://mangalib.me/'
      break
    case 'ranobe':
      refferer = 'https://ranobelib.me/'
      break
    case 'slash':
      refferer = 'https://v1.yaoilib.net/'
      break
    case 'hentai':
      refferer = 'https://hentailib.me/'
      break
    default:
      refferer = 'https://anilib.me/' // Default value
  }

  return refferer
}
