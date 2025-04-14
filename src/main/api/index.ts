import { ObjectManager } from './object'
import { SiteManager } from './site'
import { UserManager } from './user'
import { CatalogManager } from './catalog'

import { generateUserAgent } from './utils'

const userAgent = generateUserAgent() // may be changed by real from renderer, but not now

const config = { baseUrl: 'api.cdnlibs.org', userAgent: userAgent } //api.lib.social //api2.mangalib.me

const objectManager = new ObjectManager(config)
const siteManager = new SiteManager(config)
const userManager = new UserManager(config)
const catalogManager = new CatalogManager(config)

export { objectManager, siteManager, userManager, catalogManager }
