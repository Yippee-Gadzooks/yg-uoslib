use crate::api::utils::generate_headers::generate_headers;
use crate::api::utils::generate_refferer::generate_referer;
use reqwest::Client;

pub async fn generate_request(
    client: &Client,
    url: &str,
    model: &str,
    user_agent: &str,
) -> Result<String, reqwest::Error> {
    let response = client
        .get(url)
        .headers(generate_headers(model, user_agent))
        .header("Referer", generate_referer(model))
        .send()
        .await?;

    if !response.status().is_success() {
        return Ok(format!(r#"{{"http": "{}"}}"#, response.status()));
    }

    Ok(response.text().await?)
}
