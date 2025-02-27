interface Config {
  baseUrl: string
  userAgent: string
  test?: boolean
}

export class CatalogManager {
  private config
  constructor(config: Config) {
    this.config = config
  }
  async getMangaObjects(query: string): Promise<string> {
    const params = [
      `q=${encodeURIComponent(query)}`,
      'fields[]=rate_avg',
      'fields[]=rate',
      'fields[]=releaseDate',
      'site_id[]=1',
      'site_id[]=2',
      'site_id[]=3',
      'site_id[]=4'
    ].join('&')
    // query = encodeURIComponent(query)
    // ?fields[]=rate_avg&fields[]=rate&fields[]=releaseDate&q=${query}&site_id[]=1&site_id[]=2&site_id[]=3&site_id[]=4
    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/manga?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en', //navigator.languages.join(','),
            //'Site-Id': '5',
            'Content-Type': 'application/json',
            'Client-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          },
          referrer: 'https://anilib.me/',
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
}
