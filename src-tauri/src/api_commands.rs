use crate::api;
use api::Managers;
use tauri::State; //let managers = Managers::new();

///
/// USER manager part
///
#[tauri::command]
pub async fn get_user(user_id: u64, managers: State<'_, Managers>) -> Result<String, String> {
    let data = managers
        .user_manager
        .get_user(user_id)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn get_user_bookmarks(
    page: Option<u32>,
    sort_by: Option<&str>,
    sort_type: Option<&str>,
    status: u8,
    user_id: u64,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .user_manager
        .get_user_bookmarks(page, sort_by, sort_type, status, user_id)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn get_user_comments(
    page: Option<u32>,
    sort_by: Option<&str>,
    sort_type: Option<&str>,
    user_id: u64,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .user_manager
        .get_user_comments(page, sort_by, sort_type, user_id)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn get_user_friendship(
    page: Option<u32>,
    status: Option<u8>,
    user_id: u64,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .user_manager
        .get_user_friendship(page, status, user_id)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn get_user_stats(user_id: u64, managers: State<'_, Managers>) -> Result<String, String> {
    let data = managers
        .user_manager
        .get_user_stats(user_id)
        .await
        .map_err(|e| e.to_string());
    data
}

///
/// OBJECT manager part
///

#[tauri::command]
pub async fn get_object(
    model: String,
    slug_id: String,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .object_manager
        .get_object(model, slug_id)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn get_object_episode(
    model: String,
    episode: String,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .object_manager
        .get_object_episode(model, episode)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn get_object_episodes(
    model: String,
    slug_id: String,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .object_manager
        .get_object_episodes(model, slug_id)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn get_object_relations(
    model: String,
    slug_id: String,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .object_manager
        .get_object_relations(model, slug_id)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn get_object_similar(
    model: String,
    slug_id: String,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .object_manager
        .get_object_similar(model, slug_id)
        .await
        .map_err(|e| e.to_string());
    data
}

///
/// CATALOG manager part
///
#[tauri::command]
pub async fn search_manga_objects(
    query: String,
    site_ids: Option<Vec<&str>>,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .catalog_manager
        .search_manga_objects(query, site_ids)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn search_anime_objects(
    query: String,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .catalog_manager
        .search_anime_objects(query)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn search_teams(query: String, managers: State<'_, Managers>) -> Result<String, String> {
    let data = managers
        .catalog_manager
        .search_teams(query)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn search_character(
    query: String,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .catalog_manager
        .search_character(query)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn search_people(query: String, managers: State<'_, Managers>) -> Result<String, String> {
    let data = managers
        .catalog_manager
        .search_people(query)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn search_franchise(
    query: String,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .catalog_manager
        .search_franchise(query)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn search_publisher(
    query: String,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .catalog_manager
        .search_publisher(query)
        .await
        .map_err(|e| e.to_string());
    data
}

#[tauri::command]
pub async fn search_user(
    query: String,
    sort_by: Option<&str>,
    sort_type: Option<&str>,
    managers: State<'_, Managers>,
) -> Result<String, String> {
    let data = managers
        .catalog_manager
        .search_user(query, sort_by, sort_type)
        .await
        .map_err(|e| e.to_string());
    data
}
