// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod api;
use api::Managers; //let managers = Managers::new();

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
async fn b() -> Result<String, String> {
    let managers = Managers::new();
    let manager = managers.user_manager;
    let data = manager.get_user(5899376).await.map_err(|e| e.to_string());
    data
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![calc, b])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
