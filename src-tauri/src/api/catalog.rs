use crate::api::config::Config;
use crate::api::utils::generate_fields::generate_fields;
use crate::api::utils::generate_request::generate_request;
use crate::api::utils::generate_url::{generate_url, generate_keyed_params};
use crate::api::utils::generate_user_agent::generate_user_agent;

#[derive(Clone)]
pub struct CatalogManager {
    config: Config,
    client: reqwest::Client,
}

impl CatalogManager {
    pub fn new(config: &Config, client: reqwest::Client) -> Self {
        Self {
            config: config.clone(),
            client,
        }
    }
    // Поиск по всем манга подсайтам из списка
    pub async fn search_manga_objects(&self, query: String, site_ids: Option<Vec<&str>>) -> Result<String, reqwest::Error> {
        let site_ids = site_ids.unwrap_or(vec!["1", "2", "3", "4"]);
        let site_ids_parts = generate_keyed_params("site_ids", &site_ids);
        let mut url = generate_url(
            &self.config.base_url,
            "/manga",
            &[],
            Some(vec![
                ("q", &query),
            ]),
            Some(vec![
                "rate_avg", "rate", "releaseDate"
            ]),
        );
        url = format!("{}{}", url, site_ids_parts.join("&"));

        generate_request(&self.client, &url, "manga", &generate_user_agent()).await
    }

    // Поиск по всем аниме
    pub async fn search_anime_objects(&self, query: String) -> Result<String, reqwest::Error> {
        let url = generate_url(
            &self.config.base_url,
            "/anime",
            &[],
            Some(vec![
                ("q", &query),
            ]),
            Some(vec![
                "rate_avg", "rate", "releaseDate"
            ]),
        );

        generate_request(&self.client, &url, "anime", &generate_user_agent()).await
    }

    // Поиск по переводчикам и тд
    pub async fn search_teams(&self, query: String) -> Result<String, reqwest::Error> {
        let url = generate_url(
            &self.config.base_url,
            "/teams",
            &[],
            Some(vec![
                ("q", &query),
            ]),
            None,
        );

        generate_request(&self.client, &url, "anime", &generate_user_agent()).await
    }

    // Поиск по персонажам
    pub async fn search_character(&self, query: String) -> Result<String, reqwest::Error> {
        let url = generate_url(
            &self.config.base_url,
            "/character",
            &[],
            Some(vec![
                ("q", &query),
            ]),
            None,
        );

        generate_request(&self.client, &url, "anime", &generate_user_agent()).await
    }

    // Поиск по людям (автора)
    pub async fn search_people(&self, query: String) -> Result<String, reqwest::Error> {
        let url = generate_url(
            &self.config.base_url,
            "/people",
            &[],
            Some(vec![
                ("q", &query),
            ]),
            None,
        );

        generate_request(&self.client, &url, "anime", &generate_user_agent()).await
    }

    // Поиск по франшизам
    pub async fn search_franchise(&self, query: String) -> Result<String, reqwest::Error> {
        let url = generate_url(
            &self.config.base_url,
            "/franchise",
            &[],
            Some(vec![
                ("q", &query),
            ]),
            None,
        );

        generate_request(&self.client, &url, "anime", &generate_user_agent()).await
    }

    // Поиск по публицистам (типо студия выпуска)
    pub async fn search_publisher(&self, query: String) -> Result<String, reqwest::Error> {
        let url = generate_url(
            &self.config.base_url,
            "/publisher",
            &[],
            Some(vec![
                ("q", &query),
            ]),
            None,
        );

        generate_request(&self.client, &url, "anime", &generate_user_agent()).await
    }

    // Поиск по пользователям
    pub async fn search_user(&self, query: String, sort_by: Option<&str>, sort_type: Option<&str>) -> Result<String, reqwest::Error> {
        let sort_by = sort_by.unwrap_or("name");
        let sort_type = sort_type.unwrap_or("desc");

        let url = generate_url(
            &self.config.base_url,
            "/user",
            &[],
            Some(vec![
                ("q", &query),
                ("sort_by", sort_by),
                ("sort_type", sort_type),
            ]),
            None,
        );

        generate_request(&self.client, &url, "anime", &generate_user_agent()).await
    }

}
