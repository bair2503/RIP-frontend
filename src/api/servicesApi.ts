import type { Service, FilterParams } from '../types';
import { servicesData } from '../data/mockData';

// Функция для определения базового URL в зависимости от среды
const getApiBaseUrl = (): string => {
  // Проверяем, работает ли приложение в Tauri
  if (typeof window !== 'undefined' && (window as any).__TAURI__) {
    // Для Tauri используем локальный IP сервера - ВАШ РЕАЛЬНЫЙ IP
    const TAURI_API_BASE = 'http://192.168.1.50:8000/api';
    console.log('🔧 Tauri environment detected, using API:', TAURI_API_BASE);
    return TAURI_API_BASE;
  }

  // Для браузера используем прокси или env переменную
  const browserApiBase = import.meta.env.VITE_API_BASE_URL || '/api';
  console.log('🌐 Browser environment, using API:', browserApiBase);
  return browserApiBase;
};

const API_BASE_URL = getApiBaseUrl();

export const servicesApi = {
  async getServices(filters?: FilterParams): Promise<Service[]> {
    try {
      let url = `${API_BASE_URL}/services/`;
      const queryParams = new URLSearchParams();

      // Добавляем параметры фильтрации, если они есть
      if (filters) {
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.category && filters.category !== 'Все') {
          queryParams.append('category', filters.category);
        }
        if (filters.minPrice) queryParams.append('min_price', filters.minPrice.toString());
        if (filters.maxPrice) queryParams.append('max_price', filters.maxPrice.toString());
        if (filters.startDate) queryParams.append('start_date', filters.startDate);
        if (filters.endDate) queryParams.append('end_date', filters.endDate);
      }

      // Добавляем query parameters если есть фильтры
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      console.log('🔄 Fetching from backend:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend response received:', {
          count: data.length,
          services: data.map((s: Service) => ({ id: s.id, title: s.title, image_url: s.image_url }))
        });
        return data;
      } else {
        throw new Error(`Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      console.log('⚠️ Using mock data due to backend unavailability:', error);

      // Fallback на mock данные с фильтрацией на фронтенде
      if (filters && Object.keys(filters).some(key => filters[key as keyof FilterParams])) {
        return this.filterMockServices(servicesData, filters);
      }

      return servicesData;
    }
  },

  filterMockServices(services: Service[], filters: FilterParams): Service[] {
    let filtered = [...services];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower) ||
        service.category.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category && filters.category !== 'Все') {
      filtered = filtered.filter(service =>
        service.category === filters.category
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(service =>
        service.price ? service.price >= filters.minPrice! : true
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(service =>
        service.price ? service.price <= filters.maxPrice! : true
      );
    }

    if (filters.startDate) {
      filtered = filtered.filter(service =>
        service.created_date ? service.created_date >= filters.startDate! : true
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(service =>
        service.created_date ? service.created_date <= filters.endDate! : true
      );
    }

    console.log('🎯 Mock filtering applied:', {
      original: services.length,
      filtered: filtered.length,
      filters
    });

    return filtered;
  },

  async getServiceById(id: number): Promise<Service> {
    try {
      const url = `${API_BASE_URL}/services/${id}/`;
      console.log('🔄 Fetching service details:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend service detail response:', {
          id: data.id,
          title: data.title,
          hasImage: !!data.image_url
        });
        return data;
      } else {
        throw new Error(`Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      console.log('⚠️ Using mock data for service details:', error);
      const service = servicesData.find(s => s.id === id);
      if (!service) {
        console.error('❌ Service not found in mock data:', id);
        throw new Error(`Service with id ${id} not found`);
      }
      console.log('🔄 Using mock service:', service.title);
      return service;
    }
  },

  async createOrder(orderData: any): Promise<any> {
    try {
      const url = `${API_BASE_URL}/orders/`;
      console.log('🔄 Creating order:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Order created successfully:', { id: data.id, status: data.status });
        return data;
      } else {
        const errorText = await response.text();
        throw new Error(`Backend responded with status: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.log('⚠️ Using mock for order creation:', error);
      // Mock ответ для заказа
      const mockOrder = {
        id: Date.now(),
        status: 'created',
        ...orderData,
        created_date: new Date().toISOString().split('T')[0]
      };
      console.log('🔄 Using mock order:', mockOrder);
      return mockOrder;
    }
  },

  // Новый метод для проверки подключения к бэкенду
  async healthCheck(): Promise<{ status: string; apiBase: string; environment: string }> {
    try {
      const url = `${API_BASE_URL}/services/`;
      console.log('🔍 Health check:', url);

      const response = await fetch(url, {
        method: 'HEAD',
      });

      if (response.ok) {
        const environment = (window as any).__TAURI__ ? 'Tauri' : 'Browser';
        console.log('✅ Backend health check: OK - Environment:', environment);
        return {
          status: 'connected',
          apiBase: API_BASE_URL,
          environment: environment
        };
      } else {
        console.log('❌ Backend health check: Failed with status', response.status);
        return {
          status: 'error',
          apiBase: API_BASE_URL,
          environment: 'Browser'
        };
      }
    } catch (error) {
      console.log('❌ Backend health check: Connection failed', error);
      return {
        status: 'disconnected',
        apiBase: API_BASE_URL,
        environment: 'Browser'
      };
    }
  },

  // Метод для получения информации о подключении (для демонстрации)
  getConnectionInfo(): { apiBase: string; environment: string; localIP: string } {
    const environment = (window as any).__TAURI__ ? 'Tauri' : 'Browser';
    return {
      apiBase: API_BASE_URL,
      environment: environment,
      localIP: '192.168.1.50' // Ваш IP для демонстрации
    };
  }
};