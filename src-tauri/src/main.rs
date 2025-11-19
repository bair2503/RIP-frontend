use local_ip_address::local_ip;

fn main() {
    let ip = local_ip().unwrap();
    println!("🌐 Local IP Address: {}", ip);
    println!("🚀 Tauri Application Starting...");
    println!("📡 Backend Target: http://192.168.1.50:8000");
    println!("🔧 Frontend URL: https://localhost:5173/RIP-frontend/");
    
    tauri::Builder::default()
        .setup(move |_app| {
            println!("✅ Tauri app initialized successfully");
            println!("🔗 Backend connection ready via proxy");
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("❌ Error while running Tauri application");
}