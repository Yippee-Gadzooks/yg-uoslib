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
  getUserProfile(id: string): string {
    return `Fetching user ${id} from ${this.config.baseUrl}`
  }
}
