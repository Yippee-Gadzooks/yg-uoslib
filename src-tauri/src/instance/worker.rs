pub struct Worker;

impl Worker {
    pub fn new() -> Self {
        Worker
    }

    pub fn download_mp4(&self, url: &str) {
        println!("Downloading mp4 from {}", url);
        // Тут будет логика скачивания
    }

    pub fn extract_sound(&self, video_path: &str) {
        println!("Extracting sound from {}", video_path);
        // Тут будет логика извлечения звука
    }

    pub fn merge_with_mkv(&self, video_path: &str, audio_path: &str, output_path: &str) {
        println!("Merging {} and {} into {}", video_path, audio_path, output_path);
        // Тут будет логика слияния файлов
    }
}
