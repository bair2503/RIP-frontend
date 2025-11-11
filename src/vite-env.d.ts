/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    readonly VITE_APP_NAME: string
    // добавьте другие env переменные по мере необходимости
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}