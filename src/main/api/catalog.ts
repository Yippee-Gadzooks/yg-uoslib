import { generateRefferer, generateSiteId } from './utils'

interface Config {
  baseUrl: string
  userAgent: string
  test?: boolean
}

// siteid : name ; 1 : manga ; 2 : slash ; 3 : ranobe ; 4: hentai ; 5: anime ;

export class CatalogManager {
  private config
  constructor(config: Config) {
    this.config = config
  }
  async searchMangaObjects(
    query: string,
    fields: string[] = ['rate_avg', 'rate', 'releaseDate'],
    siteIds: number[] = [1, 2, 3, 4]
  ): Promise<string> {
    const params = [
      `q=${encodeURIComponent(query)}`,
      ...fields.map((field) => `fields[]=${encodeURIComponent(field)}`),
      ...siteIds.map((siteId) => `site_id[]=${siteId}`)
    ].join('&')

    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/manga?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en', //navigator.languages.join(','),
            'Site-Id': generateSiteId('manga'),
            'Content-Type': 'application/json',
            'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          },
          referrer: generateRefferer('manga'),
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

  async searchAnimeObjects(
    query: string,
    fields: string[] = ['rate_avg', 'rate', 'releaseDate']
  ): Promise<string> {
    const params = [
      `q=${encodeURIComponent(query)}`,
      ...fields.map((field) => `fields[]=${encodeURIComponent(field)}`)
    ].join('&')

    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/anime?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Content-Type': 'application/json',
            'Site-Id': generateSiteId('anime'),
            'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          },
          referrer: generateRefferer('anime'),
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

  async searchTeams(query: string): Promise<string> {
    const params = [`q=${encodeURIComponent(query)}`].join('&')
    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/teams?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Content-Type': 'application/json',
            'Site-Id': generateSiteId('anime'),
            'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          },
          referrer: generateRefferer('anime'),
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

  async searchCharacter(query: string): Promise<string> {
    const params = [`q=${encodeURIComponent(query)}`].join('&')
    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/character?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Content-Type': 'application/json',
            'Site-Id': generateSiteId('anime'),
            'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          },
          referrer: generateRefferer('anime'),
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

  async searchPeople(query: string): Promise<string> {
    const params = [`q=${encodeURIComponent(query)}`].join('&')
    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/people?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Content-Type': 'application/json',
            'Site-Id': generateSiteId('anime'),
            'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          },
          referrer: generateRefferer('anime'),
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

  async searchFranchise(query: string): Promise<string> {
    const params = [`q=${encodeURIComponent(query)}`].join('&')
    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/franchise?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Content-Type': 'application/json',
            'Site-Id': generateSiteId('anime'),
            'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          },
          referrer: generateRefferer('anime'),
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

  async searchPublisher(query: string): Promise<string> {
    const params = [`q=${encodeURIComponent(query)}`].join('&')
    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/publisher?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Content-Type': 'application/json',
            'Site-Id': generateSiteId('anime'),
            'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          },
          referrer: generateRefferer('anime'),
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

  async searchUser(
    query: string,
    sort_by: string = 'id',
    sort_type: string = 'asc'
  ): Promise<string> {
    const params = [
      `q=${encodeURIComponent(query)}`,
      `sort_by=${sort_by}`,
      `sort_type=${sort_type}`
    ].join('&')
    try {
      const response = await fetch(`https://${this.config.baseUrl}/api/user?${params.toString()}`, {
        credentials: 'include',
        headers: {
          'User-Agent': this.config.userAgent,
          Accept: '*/*',
          'Accept-Language': 'ru-RU,en-US,en',
          'Content-Type': 'application/json',
          'Site-Id': generateSiteId('anime'),
          'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'cross-site'
        },
        referrer: generateRefferer('anime'),
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
