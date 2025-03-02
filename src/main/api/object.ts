import { generateRefferer, generateFieldsBasedOnModel, generateSiteId } from './utils'

interface Config {
  baseUrl: string
  userAgent: string
  test?: boolean
}

export class ObjectManager {
  private config
  constructor(config: Config) {
    this.config = config
  }
  async getObject(fields: string[] = [], model: string, slug_id: string): Promise<string> {
    if (fields.length === 0) {
      fields = generateFieldsBasedOnModel(model)
    }
    const params = fields.map((field) => `fields[]=${encodeURIComponent(field)}`).join('&')
    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/${model}/${slug_id}?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Site-Id': generateSiteId(model),
            'Content-Type': 'application/json',
            'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          },
          referrer: generateRefferer(model),
          method: 'GET',
          mode: 'cors'
        }
      )

      if (!response.ok) {
        return `{"http": "${response.status}"}`
      }

      const data = await response.json()
      return data
    } catch (error) {
      return `{"error": "${error}"}`
    }
  }

  async getObjectRelations(model: string, slug_id: string): Promise<string> {
    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/${model}/${slug_id}/relations`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Site-Id': generateSiteId(model),
            'Content-Type': 'application/json',
            'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          },
          referrer: generateRefferer(model),
          method: 'GET',
          mode: 'cors'
        }
      )

      if (!response.ok) {
        return `{"http": "${response.status}"}`
      }

      const data = await response.json()
      return data
    } catch (error) {
      return `{"error": "${error}"}`
    }
  }

  async getObjectSimilar(model: string, slug_id: string): Promise<string> {
    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/${model}/${slug_id}/similar`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Site-Id': generateSiteId(model),
            'Content-Type': 'application/json',
            'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          },
          referrer: generateRefferer(model),
          method: 'GET',
          mode: 'cors'
        }
      )

      if (!response.ok) {
        return `{"http": "${response.status}"}`
      }

      const data = await response.json()
      return data
    } catch (error) {
      return `{"error": "${error}"}`
    }
  }

  async getEpisodes(model: string = 'anime', slug_id: string): Promise<string> {
    const params = [`anime_id=${encodeURIComponent(slug_id)}`].join('&')
    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/episodes?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Site-Id': generateSiteId(model),
            'Content-Type': 'application/json',
            'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          },
          referrer: generateRefferer(model),
          method: 'GET',
          mode: 'cors'
        }
      )

      if (!response.ok) {
        return `{"http": "${response.status}"}`
      }

      const data = await response.json()
      return data
    } catch (error) {
      return `{"error": "${error}"}`
    }
  }

  async getEpisode(model: string = 'anime', episode: number): Promise<string> {
    try {
      const response = await fetch(`https://${this.config.baseUrl}/api/episodes/${episode}`, {
        credentials: 'include',
        headers: {
          'User-Agent': this.config.userAgent,
          Accept: '*/*',
          'Accept-Language': 'ru-RU,en-US,en',
          'Site-Id': generateSiteId(model),
          'Content-Type': 'application/json',
          'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'cross-site'
        },
        referrer: generateRefferer(model),
        method: 'GET',
        mode: 'cors'
      })

      if (!response.ok) {
        return `{"http": "${response.status}"}`
      }

      const data = await response.json()
      return data
    } catch (error) {
      return `{"error": "${error}"}`
    }
  }
}
