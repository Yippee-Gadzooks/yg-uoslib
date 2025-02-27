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
  getObject(id: string): string {
    return `Fetching object ${id} from ${this.config.baseUrl}`
  }
}
