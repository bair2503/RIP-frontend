import type { Service, FilterParams } from '../types';
import { servicesData } from '../data/mockData';

// Единый API endpoint для всех окружений (браузер и Tauri)
const API_BASE_URL = '/api';

// Детальное логирование для Wireshark анализа
const logNetworkInfo = (url: string, method: string = 'GET') => {
  console.log('🔍 Network Analysis:');
  console.log('  - Frontend URL:', window.location.href);
  console.log('  - API Request:', `${method} ${url}`);
  console.log('  - Tauri Environment:', !!(window as any).__TAURI__);
  console.log('  - Timestamp:', new Date().toISOString());
};

export const servicesApi = {
  async getServices(filters?: FilterParams): Promise<Service[]> {
    try {
      let url = `${API_BASE_URL}/services/`;
      const queryParams = new URLSearchParams();

      // Параметры фильтрации
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

      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      logNetworkInfo(url, 'GET');
      console.log('🔄 Fetching services from proxy...');

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend response successful:', {
          count: data.length,
          environment: (window as any).__TAURI__ ? 'Tauri' : 'Browser',
          port: window.location.port
        });
        return data;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.log('⚠️ Fallback to mock data:', error);

      // Mock данные с фильтрацией
      if (filters && Object.keys(filters).some(key => filters[key as keyof FilterParams])) {
        return this.filterMockServices(servicesData, filters);
      }

      return servicesData;
    }
  },

  async getServiceById(id: number): Promise<Service> {
    try {
      const url = `${API_BASE_URL}/services/${id}/`;
      logNetworkInfo(url, 'GET');
      console.log('🔄 Fetching service details...');

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Service details loaded from backend');
        return data;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.log('⚠️ Using mock data for service details:', error);
      const service = servicesData.find(s => s.id === id);
      if (!service) {
        throw new Error(`Service with id ${id} not found`);
      }
      return service;
    }
  },

  async createOrder(orderData: any): Promise<any> {
    try {
      const url = `${API_BASE_URL}/orders/`;
      logNetworkInfo(url, 'POST');
      console.log('🔄 Creating order...');

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Order created successfully');
        return data;
      } else {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.log('⚠️ Using mock for order creation:', error);
      // Mock ответ
      return {
        id: Date.now(),
        status: 'created',
        ...orderData,
        created_date: new Date().toISOString().split('T')[0]
      };
    }
  },

  async healthCheck(): Promise<{ status: string; environment: string; port: string }> {
    try {
      const url = `${API_BASE_URL}/services/`;
      logNetworkInfo(url, 'HEAD');

      const response = await fetch(url, { method: 'HEAD' });

      if (response.ok) {
        return {
          status: 'connected',
          environment: (window as any).__TAURI__ ? 'Tauri' : 'Browser',
          port: window.location.port || '5173'
        };
      } else {
        return {
          status: 'error',
          environment: (window as any).__TAURI__ ? 'Tauri' : 'Browser',
          port: window.location.port || '5173'
        };
      }
    } catch (error) {
      return {
        status: 'disconnected',
        environment: (window as any).__TAURI__ ? 'Tauri' : 'Browser',
        port: window.location.port || '5173'
      };
    }
  },

  getConnectionInfo(): {
    environment: string;
    frontendPort: string;
    backendIP: string;
    protocol: string;
  } {
    return {
      environment: (window as any).__TAURI__ ? 'Tauri' : 'Browser',
      frontendPort: window.location.port || '3000',
      backendIP: '192.168.1.50:8000',
      protocol: window.location.protocol
    };
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
      filtered: filtered.length
    });

    return filtered;
  }
};