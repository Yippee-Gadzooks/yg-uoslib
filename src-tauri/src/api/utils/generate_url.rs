use urlencoding::encode;

/// Полноценная URL, готовая к отправке вместе с заголовками.
///
/// # Пример
///
/// ```rust
/// fn main() {
///     let url = generate_url(
///         "https://api.cdnlibs.org",
///         "/user/{id}",
///         &[("id", "5899376")],
///         Some(vec![
///             ("sort_by", "name"),
///             ("sort_type", "desc"),
///             ("status", "21"),
///         ]),
///         Some(vec![
///             "background", "roles", "points", "ban_info",
///             "gender", "created_at", "about", "teams", "premium_background_id",
///         ]),
///     );
///
///     println!("{}", url);
/// }
/// ```
///
/// Ожидаемый результат:
///
/// ```text
/// https://api.cdnlibs.org/api/user/5899376?sort_by=name&sort_type=desc&status=21&fields[]=background&fields[]=roles&fields[]=points&fields[]=ban_info&fields[]=gender&fields[]=created_at&fields[]=about&fields[]=teams&fields[]=premium_background_id
/// ```

pub fn generate_url(
    base_url: &str,
    path_template: &str,
    path_params: &[(&str, &str)],
    query_params: Option<Vec<(&str, &str)>>,
    fields: Option<Vec<&str>>,
) -> String {
    let rest_path = generate_restapi(path_template, path_params);
    let query = generate_queries(query_params, fields);

    if query.is_empty() {
        format!("https://{}{}", base_url, rest_path)
    } else {
        format!("https://{}{}?{}", base_url, rest_path, query)
    }
}

/// Часть с рестапи, и всем подобным, аргументы в ссылке.
pub fn generate_restapi(template: &str, path_params: &[(&str, &str)]) -> String {
    let mut path = template.to_string();

    for (key, value) in path_params {
        let placeholder = format!("{{{}}}", key);
        path = path.replace(&placeholder, value);
    }

    format!("/api{}", path)
}

/// Генерирует query-параметры из пар ключ-значение и списка полей
pub fn generate_queries(
    queries: Option<Vec<(&str, &str)>>,
    fields: Option<Vec<&str>>,
) -> String {
    let mut parts = Vec::new();

    // Обычные параметры типа ключ=значение
    if let Some(params) = queries {
        for (k, v) in params {
            parts.push(format!("{}={}", k, v));
        }
    }

    // Используем отдельную функцию для fields[]
    if let Some(fields_list) = fields {
        parts.extend(generate_keyed_params("fields[]", &fields_list));
    }

    parts.join("&")
}

/// Генерирует query-параметры с произвольным ключом (например, fields[] / site_id и т.п.)
pub fn generate_keyed_params(key: &str, values: &[&str]) -> Vec<String> {
    values.iter().map(|v| format!("{}={}", key, v)).collect()
}