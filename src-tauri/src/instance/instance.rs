use crate::instance::dequeue::Dequeue;
use crate::instance::worker::Worker;

use crate::instance::store::{Instance as StoreInstance, InstanceConfig, InstanceType};

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs::{self, File};
use std::path::Path;
use uuid::Uuid;
use chrono::Utc;

/// Метаданные для инстанса (записываются в metadata.yaml)
#[derive(Debug, Serialize, Deserialize)]
pub struct InstanceMetadata {
    pub id: String,
    pub created: String,
    pub version: String,
    pub status: String,
}

/// Задачи, которые можно поставить в очередь для обработки инстанса
#[derive(Debug)]
pub enum Task {
    DownloadMp4(String),
    ExtractSound(String),
    MergeWithMkv {
        video: String,
        audio: String,
        output: String,
    },
}

/// Расширенный инстанс, который оборачивает структуру из `store.rs`
/// и добавляет возможности для очереди задач и воркера.
pub struct Instance {
    /// Основные данные инстанса из store.rs
    pub store_instance: StoreInstance,

    /// Очередь задач для инстанса
    pub dequeue: Dequeue<Task>,

    /// Воркер, который выполняет задачи
    pub worker: Worker,
}

impl Instance {
    /// Создаёт новый расширенный инстанс из базового `store_instance`.
    pub fn new(store_instance: StoreInstance) -> Self {
        Self {
            store_instance,
            dequeue: Dequeue::new(),
            worker: Worker::new(),
        }
    }

    /// Инициализация инстанса, если это папка (Folder)
    ///
    /// Создаёт нужные директории, файлы и метаданные.
    /// Если инстанс не папка — ничего не делает.
    pub fn init(&self) {
        if let InstanceConfig::Folder { path } = &self.store_instance.config {
            let base_path = Path::new(path);

            let directories = [
                "global/config",
                "global/logs",
                "global/tmp",
                "data/anime",
                "data/manga",
                "data/ranobe",
                "data/extra/character",
                "data/extra/franchise",
                "data/extra/people",
                "data/extra/publisher",
                "data/extra/teams",
                "data/extra/user",
            ];

            for dir in directories {
                if let Err(e) = fs::create_dir_all(base_path.join(dir)) {
                    eprintln!("Failed to create directory {}: {}", dir, e);
                }
            }

            if let Err(e) = File::create(base_path.join(".lock")) {
                eprintln!("Failed to create .lock file: {}", e);
            }

            let metadata = InstanceMetadata {
                id: self.store_instance.id.clone(),
                created: Utc::now().to_rfc3339(),
                version: "0.0.1".into(),
                status: "ready".into(),
            };

            if let Ok(metadata_yaml) = serde_yaml::to_string(&metadata) {
                if let Err(e) = fs::write(base_path.join("metadata.yaml"), metadata_yaml) {
                    eprintln!("Failed to write metadata.yaml: {}", e);
                }
            }

            let mut main_config = HashMap::new();
            main_config.insert("test", "ok");

            if let Ok(config_yaml) = serde_yaml::to_string(&main_config) {
                if let Err(e) = fs::write(base_path.join("global/config/main.yaml"), config_yaml) {
                    eprintln!("Failed to write main.yaml: {}", e);
                }
            }

            println!("✅ Instance initialized at: {}", base_path.display());
        } else {
            println!("⚠️ Init skipped: not a folder instance");
        }
    }

    /// Проверка структуры и метаданных инстанса (текущая заглушка)
    ///
    /// Можно реализовать дополнительную логику проверки файлов и папок.
    pub fn check(&self) {
        if let InstanceConfig::Folder { path } = &self.store_instance.config {
            println!("Checking instance at path: {}", path);
            // TODO: Реализовать логику проверки структуры и метаданных
        } else {
            println!("Check skipped: not a folder instance");
        }
    }

    /// Запуск инстанса (заглушка, добавить нужную логику)
    pub fn start(&self) {
        println!("Starting instance: {}", self.store_instance.name);
        // TODO: Добавить логику запуска
    }

    /// Остановка инстанса (заглушка, добавить нужную логику)
    pub fn stop(&self) {
        println!("Stopping instance: {}", self.store_instance.name);
        // TODO: Добавить логику остановки
    }

    /// Добавление задачи в очередь
    pub fn add_task(&mut self, task: Task) {
        self.dequeue.enqueue(task);
    }

    /// Обработка следующей задачи из очереди
    pub fn process_next_task(&mut self) {
        // TODO: Переделать: Dequeue с обьектом(аниме/манга/ранобэ, еще чето: слаг_айди) и внутри него свой dequeue со своим списком действий.
        if let Some(task) = self.dequeue.dequeue() {
            match task {
                Task::DownloadMp4(url) => {
                    self.worker.download_mp4(&url);
                }
                Task::ExtractSound(video) => {
                    self.worker.extract_sound(&video);
                }
                Task::MergeWithMkv { video, audio, output } => {
                    self.worker.merge_with_mkv(&video, &audio, &output);
                }
            }
        }
    }
}

// TODO: 1. Write out "init" and "check" functions — частично сделано, нужна доработка check
// TODO: 2. Use Dequeue and Worker inside (REWRITE IT TOO) — прогресс

