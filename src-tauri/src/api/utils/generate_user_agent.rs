use rand::rng;
use rand::seq::IndexedRandom;

pub fn generate_user_agent() -> String {
    let os_list = vec![
        "Windows NT 10.0; Win64; x64",
        // "X11; Ubuntu; Linux x86_64",
    ];

    let browser_list = vec![
        "Chrome/91.0.4472.124",
        "Firefox/89.0",
        // "Safari/537.36",
        // "Edge/91.0.864.59",
        // "Opera/76.0.4017.177",
    ];

    let mut rng = rng();
    let random_os = os_list.choose(&mut rng).unwrap_or(&"Unknown OS");
    let random_browser = browser_list
        .choose(&mut rng)
        .unwrap_or(&"UnknownBrowser/0.0");

    format!(
        "Mozilla/5.0 ({}) AppleWebKit/537.36 (KHTML, like Gecko) {} Safari/537.36",
        random_os, random_browser
    )
}
