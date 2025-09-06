pub fn generate_site_id(model: &str) -> String {
    let model = model.to_lowercase();

    let id = match model.as_str() {
        "anime" => "5",
        "manga" => "1",
        "ranobe" => "3",
        "slash" => "2",
        "hentai" => "4",
        _ => "5",
    };

    id.to_string()
}
