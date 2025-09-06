use crate::api::config::Config;

#[derive(Clone)]
pub struct SiteManager {
    config: Config,
    client: reqwest::Client,
}

// Работа с сайтом, скачивание, получение, всякие вот эти, файлы, остальное
impl SiteManager {
    pub fn new(config: &Config, client: reqwest::Client) -> Self {
        Self {
            config: config.clone(),
            client,
        }
    }

    pub fn get_site_info(&self) -> String {
        format!("Fetching site info from {}", self.config.base_url)
    }
}
