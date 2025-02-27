interface Config {
  baseUrl: string
  userAgent: string
  test?: boolean
}

export class SiteManager {
  private config
  constructor(config: Config) {
    this.config = config
  }
  getSiteInfo(): string {
    return `Fetching site info from ${this.config.baseUrl}`
  }
}
