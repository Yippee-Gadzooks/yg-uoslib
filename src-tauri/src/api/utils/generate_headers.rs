use crate::api::utils::generate_site_id::generate_site_id;
use chrono::Local;
use reqwest::header::{HeaderMap, HeaderValue, ACCEPT, ACCEPT_LANGUAGE, CONTENT_TYPE, USER_AGENT};

pub fn generate_headers(model: &str, user_agent: &str) -> HeaderMap {
    let mut headers = HeaderMap::new();

    headers.insert(USER_AGENT, HeaderValue::from_str(user_agent).unwrap());
    headers.insert(ACCEPT, HeaderValue::from_static("*/*"));
    headers.insert(ACCEPT_LANGUAGE, HeaderValue::from_static("ru-RU,en-US,en"));
    headers.insert(
        "Site-Id",
        HeaderValue::from_str(&generate_site_id(model)).unwrap(),
    );
    headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));

    let tz = Local::now().offset().to_string();
    headers.insert("Client-Time-Zone", HeaderValue::from_str(&tz).unwrap());

    headers.insert("Sec-Fetch-Dest", HeaderValue::from_static("empty"));
    headers.insert("Sec-Fetch-Mode", HeaderValue::from_static("cors"));
    headers.insert("Sec-Fetch-Site", HeaderValue::from_static("cross-site"));

    headers
}
