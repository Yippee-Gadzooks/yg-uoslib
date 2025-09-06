use crate::api::config::Config;
use crate::api::utils::generate_fields::generate_fields;
use crate::api::utils::generate_request::generate_request;
use crate::api::utils::generate_url::generate_url;
use crate::api::utils::generate_user_agent::generate_user_agent;

#[derive(Clone)]
pub struct ObjectManager {
    config: Config,
    client: reqwest::Client,
}

impl ObjectManager {
    pub fn new(config: &Config, client: reqwest::Client) -> Self {
        Self {
            config: config.clone(),
            client,
        }
    }

    /// Получает обьект, его информацию и так дальше, использует слаг айди и модель.
    pub async fn get_object(
        &self,
        model: String,
        slug_id: String,
    ) -> Result<String, reqwest::Error> {
        let fields = generate_fields(&model);

        let url = generate_url(
            &self.config.base_url,
            "/{model}/{id}",
            &[("model", &model), ("id", &slug_id)],
            None,
            Some(fields.iter().map(AsRef::as_ref).collect()),
        );

        generate_request(&self.client, &url, &model, &generate_user_agent()).await
    }

    /// Получает родственников обьекта (связаные тайтлы), использует слаг айди и модель.
    pub async fn get_object_relations(
        &self,
        model: String,
        slug_id: String,
    ) -> Result<String, reqwest::Error> {
        let url = generate_url(
            &self.config.base_url,
            "/{model}/{id}/relations",
            &[("model", &model), ("id", &slug_id)],
            None,
            None,
        );

        generate_request(&self.client, &url, &model, &generate_user_agent()).await
    }

    /// Получает похожих обьекта (тайтлы что похожы по тегам, любителям, смыслу и всякому такому), использует слаг айди и модель.
    pub async fn get_object_similar(
        &self,
        model: String,
        slug_id: String,
    ) -> Result<String, reqwest::Error> {
        let url = generate_url(
            &self.config.base_url,
            "/{model}/{id}/similar",
            &[("model", &model), ("id", &slug_id)],
            None,
            None,
        );

        generate_request(&self.client, &url, &model, &generate_user_agent()).await
    }

    /// Получает епизоды обьекта, использует слаг айди и модель, скорее всего аниме онли.
    pub async fn get_object_episodes(
        &self,
        model: String,
        slug_id: String,
    ) -> Result<String, reqwest::Error> {
        let url = generate_url(
            &self.config.base_url,
            "/episodes/{id}",
            &[("id", &slug_id)],
            None,
            None,
        );

        generate_request(&self.client, &url, &model, &generate_user_agent()).await
    }
    /// Получает епизод обьекта (сам список видеопотоков), использует епизоде айди и модель, скорее всего аниме онли.
    pub async fn get_object_episode(
        &self,
        model: String,
        episode: String,
    ) -> Result<String, reqwest::Error> {
        let url = generate_url(
            &self.config.base_url,
            "/episodes",
            &[],
            Some(vec![("anime_id", &episode)]),
            None,
        );

        generate_request(&self.client, &url, &model, &generate_user_agent()).await
    }
}
