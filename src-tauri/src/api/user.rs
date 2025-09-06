use crate::api::config::Config;
use crate::api::utils::generate_fields::generate_fields;
use crate::api::utils::generate_request::generate_request;
use crate::api::utils::generate_url::generate_url;
use crate::api::utils::generate_user_agent::generate_user_agent;

#[derive(Clone)]
pub struct UserManager {
    config: Config,
    client: reqwest::Client,
}

// Работа с юзером, данными юзера
impl UserManager {
    pub fn new(config: &Config, client: reqwest::Client) -> Self {
        Self {
            config: config.clone(),
            client,
        }
    }

    /// Основная инфа о юзере
    pub async fn get_user(&self, user_id: u64) -> Result<String, reqwest::Error> {
        let fields = generate_fields("user");

        let url = generate_url(
            &self.config.base_url,
            "/user/{id}",
            &[("id", &user_id.to_string())],
            None,
            Some(fields.iter().map(AsRef::as_ref).collect()),
        );
        generate_request(&self.client, &url, "anime", &self.config.user_agent).await
    }

    /// Юзер статс, ну там любимые теги и тд
    pub async fn get_user_stats(&self, user_id: u64) -> Result<String, reqwest::Error> {
        let url = generate_url(
            &self.config.base_url,
            "/user/{id}/stats",
            &[("id", &user_id.to_string())],
            None,
            None,
        );
        dbg!(&url);
        generate_request(&self.client, &url, "anime", &self.config.user_agent).await
    }

    /// Буквал букмарки
    pub async fn get_user_bookmarks(
        &self,
        page: Option<u32>,
        sort_by: Option<&str>,
        sort_type: Option<&str>,
        status: u8,
        user_id: u64,
    ) -> Result<String, reqwest::Error> {
        let page = page.unwrap_or(1);
        let sort_by = sort_by.unwrap_or("name");
        let sort_type = sort_type.unwrap_or("desc");

        let url = generate_url(
            &self.config.base_url,
            "/user/{id}/bookmarks",
            &[("id", &user_id.to_string())],
            Some(vec![
                ("page", &page.to_string()),
                ("sort_by", sort_by),
                ("sort_type", sort_type),
            ]),
            None,
        );

        generate_request(&self.client, &url, "anime", &self.config.user_agent).await
    }

    /// Коменты юзера
    pub async fn get_user_comments(
        &self,
        page: Option<u32>,
        sort_by: Option<&str>,
        sort_type: Option<&str>,
        user_id: u64,
    ) -> Result<String, reqwest::Error> {
        let page = page.unwrap_or(1);
        let sort_by = sort_by.unwrap_or("name");
        let sort_type = sort_type.unwrap_or("desc");

        let url = generate_url(
            &self.config.base_url,
            "/user/{id}/comments",
            &[("id", &user_id.to_string())],
            Some(vec![
                ("page", &page.to_string()),
                ("sort_by", sort_by),
                ("sort_type", sort_type),
            ]),
            None,
        );

        generate_request(&self.client, &url, "anime", &self.config.user_agent).await
    }

    /// Друзья юзера
    pub async fn get_user_friendship(
        &self,
        page: Option<u32>,
        status: Option<u8>,
        user_id: u64,
    ) -> Result<String, reqwest::Error> {
        let page = page.unwrap_or(1);
        let status = status.unwrap_or(1);

        let url = generate_url(
            &self.config.base_url,
            "/user/{id}/friendship",
            &[("id", &user_id.to_string())],
            Some(vec![
                ("page", &page.to_string()),
                ("status", &status.to_string()),
            ]),
            None,
        );

        generate_request(&self.client, &url, "anime", &self.config.user_agent).await
    }
}
