pub mod catalog;
pub mod object;
pub mod site;
pub mod user;
pub mod utils;

mod config;
use config::Config;

use catalog::CatalogManager;
use object::ObjectManager;
use reqwest::Client;
use site::SiteManager;
use user::UserManager;
use utils::generate_user_agent;

pub struct Managers {
    pub object_manager: ObjectManager,
    pub site_manager: SiteManager,
    pub user_manager: UserManager,
    pub catalog_manager: CatalogManager,
}

impl Managers {
    pub fn new() -> Self {
        let user_agent = generate_user_agent::generate_user_agent();
        let config = Config {
            base_url: "api.cdnlibs.org".to_string(),
            user_agent,
        };

        let client = Client::new();

        Self {
            object_manager: ObjectManager::new(&config, client.clone()),
            site_manager: SiteManager::new(&config, client.clone()),
            user_manager: UserManager::new(&config, client.clone()),
            catalog_manager: CatalogManager::new(&config, client.clone()),
        }
    }
}
