use serde::{Deserialize, Serialize};
use serde_json::{from_str, to_string_pretty};
use std::{
    fs::{self, File},
    io::{Read, Write},
    path::PathBuf,
};
use uuid::Uuid;

/// Тип инстанса: либо папка, либо сервер.
/// Используется для определения поведения и конфигурации.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum InstanceType {
    Folder,
    Server,
}

/// Конфигурация инстанса.
/// Используется untagged enum для удобства сериализации/десериализации,
/// чтобы не добавлять дополнительного поля "type" в JSON.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InstanceConfig {
    /// Конфигурация для папочного инстанса
    Folder {
        path: String,
    },
    /// Конфигурация для серверного инстанса
    Server {
        host: String,
        port: u16,
        secure: bool,
        #[serde(skip_serializing_if = "Option::is_none")]
        api_prefix: Option<String>,
    },
}

/// Основная структура инстанса
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Instance {
    /// Уникальный идентификатор инстанса
    pub id: String,
    /// Человеко-читаемое имя инстанса
    pub name: String,
    /// Тип инстанса (folder или server)
    #[serde(rename = "type")]
    pub instance_type: InstanceType,
    /// Конфигурация инстанса (папка или сервер)
    pub config: InstanceConfig,
}

/// Данные хранилища всех инстансов
#[derive(Debug, Default, Serialize, Deserialize)]
pub struct InstanceStoreData {
    /// Список всех инстансов
    pub instances: Vec<Instance>,
    /// Идентификатор активного инстанса, если есть
    pub active_instance_id: Option<String>,
}

/// Структура хранилища инстансов, отвечает за сохранение и загрузку из файла.
pub struct InstanceStore {
    /// Путь до файла, где хранятся данные
    path: PathBuf,
    /// Данные хранилища в памяти
    data: InstanceStoreData,
}

// TODO: 1. Async
// TODO: 2. Multithread
// TODO: 3. Autosaving

impl InstanceStore {
    /// Создаёт новый экземпляр InstanceStore.
    /// Если файл с данными существует — загружает из него,
    /// иначе создаёт пустое хранилище.
    pub fn new() -> std::io::Result<Self> {
        let path = Self::default_path();

        let data = if path.exists() {
            let mut file = File::open(&path)?;
            let mut contents = String::new();
            file.read_to_string(&mut contents)?;
            // Если не удалось распарсить JSON — возвращаем дефолт
            from_str(&contents).unwrap_or_default()
        } else {
            InstanceStoreData::default()
        };

        Ok(Self { path, data })
    }

    /// Возвращает путь к файлу хранилища (по умолчанию "instances.json")
    fn default_path() -> PathBuf {
        PathBuf::from("instances.json")
    }

    /// Сохраняет текущие данные инстансов в файл в формате pretty JSON.
    pub fn save(&self) -> std::io::Result<()> {
        let serialized = to_string_pretty(&self.data)?;
        let mut file = File::create(&self.path)?;
        file.write_all(serialized.as_bytes())?;
        Ok(())
    }

    /// Загружает данные из файла в память, если файл существует.
    pub fn load(&mut self) -> std::io::Result<()> {
        if self.path.exists() {
            let mut file = File::open(&self.path)?;
            let mut contents = String::new();
            file.read_to_string(&mut contents)?;
            self.data = from_str(&contents).unwrap_or_default();
        }
        Ok(())
    }

    /// Добавляет новый инстанс с заданными параметрами.
    /// Генерируется новый UUID для id.
    pub fn add_instance(&mut self, name: String, instance_type: InstanceType, config: InstanceConfig) {
        let new_instance = Instance {
            id: Uuid::new_v4().to_string(),
            name,
            instance_type,
            config,
        };
        self.data.instances.push(new_instance);
    }

    /// Удаляет инстанс по id.
    /// Если удаляемый инстанс был активным — сбрасывает активный id.
    pub fn remove_instance(&mut self, id: &str) {
        self.data.instances.retain(|i| i.id != id);
        if self.data.active_instance_id.as_deref() == Some(id) {
            self.data.active_instance_id = None;
        }
    }

    /// Устанавливает активный инстанс по id.
    /// Можно передать None, чтобы снять активность.
    pub fn set_active_instance(&mut self, id: Option<String>) {
        self.data.active_instance_id = id;
    }

    /// Возвращает ссылку на активный инстанс, если он установлен.
    pub fn get_active_instance(&self) -> Option<&Instance> {
        self.data
            .active_instance_id
            .as_ref()
            .and_then(|id| self.data.instances.iter().find(|i| &i.id == id))
    }

    /// Возвращает срез всех инстансов
    pub fn list_instances(&self) -> &[Instance] {
        &self.data.instances
    }

    /// Возвращает ссылку на идентификатор активного инстанса, если он есть
    pub fn active_instance_id(&self) -> Option<&String> {
        self.data.active_instance_id.as_ref()
    }
}
