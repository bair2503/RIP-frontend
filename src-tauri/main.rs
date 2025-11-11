use tauri::Manager;
use serde::{Deserialize, Serialize};
use local_ip_address::local_ip;

#[derive(Debug, Serialize, Deserialize)]
struct Service {
    id: i32,
    title: String,
    description: String,
    category: String,
    icon: String,
}

#[derive(Debug, Serialize)]
struct ApiConfig {
    server_ip: String,
    server_port: u16,
}

#[tauri::command]
async fn get_server_config() -> Result<ApiConfig, String> {
    match local_ip() {
        Ok(ip) => {
            println!("📡 Локальный IP сервера: {}", ip);
            Ok(ApiConfig {
                server_ip: ip.to_string(),
                server_port: 8000,
            })
        }
        Err(e) => {
            eprintln!("❌ Ошибка получения IP: {}", e);
            Err("Не удалось получить локальный IP адрес".to_string())
        }
    }
}

#[tauri::command]
async fn fetch_services(server_ip: String) -> Result<Vec<Service>, String> {
    let url = format!("http://{}:8000/api/services/", server_ip);
    println!("🔄 Запрос к API по адресу: {}", url);
    
    let client = reqwest::Client::new();
    match client.get(&url).timeout(std::time::Duration::from_secs(10)).send().await {
        Ok(response) => {
            if response.status().is_success() {
                match response.json::<Vec<Service>>().await {
                    Ok(services) => {
                        println!("✅ Успешно получено {} услуг", services.len());
                        Ok(services)
                    }
                    Err(e) => {
                        eprintln!("❌ Ошибка парсинга JSON: {}", e);
                        Err(format!("Ошибка обработки данных: {}", e))
                    }
                }
            } else {
                eprintln!("❌ HTTP ошибка: {}", response.status());
                Err(format!("HTTP ошибка: {}", response.status()))
            }
        }
        Err(e) => {
            eprintln!("❌ Ошибка сети: {}", e);
            Err(format!("Ошибка сети: {}", e))
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_server_config, fetch_services])
        .run(tauri::generate_context!())
        .expect("Ошибка запуска Tauri приложения");
}