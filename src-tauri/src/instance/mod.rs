mod instance;
mod dequeue;
mod worker;
mod store;

pub use instance::{*};
pub use dequeue::*;
pub use worker::*;
pub use store::*;

// TODO: Watcher for store that will cause the:
// * instance.stop, closing that one
// * opening new one, instance.start
// * so, it will do all safe and fast
#[tauri::command]
pub fn set_active_instance(instance: String) -> String {
    println!("Received instance:");
    println!("{}", instance);
    format!("{}", "ok")
}