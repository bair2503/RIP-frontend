import type { Service, FilterParams } from '../types';
import { servicesData } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; // Проксируется на http://127.0.0.1:8000

export const servicesApi = {
  async getServices(filters?: FilterParams): Promise<Service[]> {
    try {
      let url = `${API_BASE_URL}/services/`;

      // Добавляем параметры фильтрации, если они есть
      if (filters && (filters.search || filters.category)) {
        const queryParams = new URLSearchParams();

        if (filters.search) queryParams.append('search', filters.search);
        if (filters.category) queryParams.append('category', filters.category);

        url += `?${queryParams}`;
      }

      console.log('🔄 Fetching from backend:', url);

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend response received:', data);
        return data;
      } else {
        throw new Error(`Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      console.log('⚠️ Using mock data due to backend unavailability:', error);
      // Fallback на mock данные с фильтрацией на фронтенде
      if (filters && (filters.search || filters.category)) {
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

    return filtered;
  },

  async getServiceById(id: number): Promise<Service> {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}/`);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend service detail response:', data);
        return data;
      } else {
        throw new Error(`Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      console.log('⚠️ Using mock data for service details:', error);
      const service = servicesData.find(s => s.id === id);
      if (!service) throw new Error('Service not found');
      return service;
    }
  },

  async createOrder(orderData: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      console.log('⚠️ Using mock for order creation:', error);
      // Mock ответ для заказа
      return { id: Date.now(), status: 'created', ...orderData };
    }
  }
};