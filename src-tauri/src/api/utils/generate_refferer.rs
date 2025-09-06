pub fn generate_referer(model: &str) -> String {
    let model = model.to_lowercase();

    let referer = match model.as_str() {
        "anime" => "https://anilib.me/",
        "manga" => "https://mangalib.me/",
        "ranobe" => "https://ranobelib.me/",
        "slash" => "https://v1.yaoilib.net/",
        "hentai" => "https://hentailib.me/",
        _ => "https://anilib.me/",
    };

    referer.to_string()
}
