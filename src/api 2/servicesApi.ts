import type { Service } from '../types';
import { servicesData } from '../data/mockData';

const API_BASE_URL = '/api';

export const servicesApi = {
  async getServices(): Promise<Service[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Backend not available');
      }
    } catch (error) {
      console.log('Using mock data due to backend unavailability');
      return servicesData;
    }
  },

  async getServiceById(id: number): Promise<Service> {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}`);
      
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Backend not available');
      }
    } catch (error) {
      const service = servicesData.find(s => s.id === id);
      if (!service) throw new Error('Service not found');
      return service;
    }
  }
};