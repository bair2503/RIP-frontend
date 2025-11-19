import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'

// --- Маршруты приложения ---
const router = createHashRouter([
  { path: '/', element: <HomePage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/service/:id', element: <ServiceDetailPage /> },
])

// --- Рендер приложения ---
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

// --- Регистрация Service Worker (альтернативный способ) ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    // Используем ваш существующий service worker
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((registration) => {
        console.log('✅ Service Worker зарегистрирован:', registration)
      })
      .catch((error) => {
        console.log('❌ Ошибка регистрации SW:', error)
      })
  })
}