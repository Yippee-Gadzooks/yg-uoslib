import { generateRefferer, generateFieldsBasedOnModel, generateSiteId } from './utils'

interface Config {
  baseUrl: string
  userAgent: string
  test?: boolean
}

export class UserManager {
  private config
  constructor(config: Config) {
    this.config = config
  }
  async getUser(fields: string[] = [], userId: string): Promise<string> {
    if (fields.length === 0) {
      fields = generateFieldsBasedOnModel('user')
    }
    const params = fields.map((field) => `fields[]=${encodeURIComponent(field)}`).join('&')
    console.log(params, fields, userId)
    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/user/${userId}?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Site-Id': generateSiteId('anime'),
            'Content-Type': 'application/json',
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

  async getUserStats(userId: string): Promise<string> {
    try {
      const response = await fetch(`https://${this.config.baseUrl}/api/user/${userId}/stats`, {
        credentials: 'include',
        headers: {
          'User-Agent': this.config.userAgent,
          Accept: '*/*',
          'Accept-Language': 'ru-RU,en-US,en',
          'Site-Id': generateSiteId('anime'),
          'Content-Type': 'application/json',
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

  async getUserBookmarks(
    page: number = 1,
    sort_by: string = 'name',
    sort_type: string = 'desc',
    status: number,
    user_id: number
  ): Promise<string> {
    const params = [
      `page=${encodeURIComponent(page)}`,
      `sort_by=${encodeURIComponent(sort_by)}`,
      `sort_type=${encodeURIComponent(sort_type)}`,
      `status=${encodeURIComponent(status)}`,
      `user_id=${encodeURIComponent(user_id)}`
    ].join('&')

    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/bookmarks?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Site-Id': generateSiteId('anime'),
            'Content-Type': 'application/json',
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

  async getUserComments(
    page: number = 1,
    sort_by: string = 'id',
    sort_type: string = 'desc',
    user_id: number
  ): Promise<string> {
    const params = [
      `page=${encodeURIComponent(page)}`,
      `sort_by=${encodeURIComponent(sort_by)}`,
      `sort_type=${encodeURIComponent(sort_type)}`
    ].join('&')

    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/user/${user_id}/comments?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Site-Id': generateSiteId('anime'),
            'Content-Type': 'application/json',
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

  async getUserFriendship(page: number = 1, status: number = 1, user_id: number): Promise<string> {
    const params = [
      `page=${encodeURIComponent(page)}`,
      `status=${encodeURIComponent(status)}`,
      `user_id=${encodeURIComponent(user_id)}`
    ].join('&')

    try {
      const response = await fetch(
        `https://${this.config.baseUrl}/api/friendship?${params.toString()}`,
        {
          credentials: 'include',
          headers: {
            'User-Agent': this.config.userAgent,
            Accept: '*/*',
            'Accept-Language': 'ru-RU,en-US,en',
            'Site-Id': generateSiteId('anime'),
            'Content-Type': 'application/json',
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
}
