// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod api;
mod api_commands;
mod instance;

use api::Managers;
use instance::set_active_instance;

#[tauri::command]
fn calc(a: i16, b: i16) -> String {
    format!(
        "Hello, {} + {} = {} ! You've been calculated from Rust!",
        a,
        b,
        a + b
    )
}

#[tauri::command]
fn user_agent(ua: String) -> String {
    println!("User-Agent from frontend: {}", ua);
    ua
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .manage(Managers::new());

    let builder = builder.invoke_handler(tauri::generate_handler![
        calc,
        user_agent,
        set_active_instance,
        // USER manager
        api_commands::get_user,
        api_commands::get_user_bookmarks,
        api_commands::get_user_comments,
        api_commands::get_user_friendship,
        api_commands::get_user_stats,
        // OBJECT manager
        api_commands::get_object,
        api_commands::get_object_episode,
        api_commands::get_object_episodes,
        api_commands::get_object_relations,
        api_commands::get_object_similar,
        // CATALOG manager
        api_commands::search_anime_objects,
        api_commands::search_character,
        api_commands::search_franchise,
        api_commands::search_manga_objects,
        api_commands::search_people,
        api_commands::search_publisher,
        api_commands::search_teams,
        api_commands::search_user,
    ]);

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
