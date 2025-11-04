export interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  price?: number;
  created_date?: string;
  image_url?: string;
}

export interface OrderItem {
  serviceTitle: string;
  date: string;
  result: string;
  service?: number; // ID услуги для бэкенда
}

export interface Order {
  id: number;
  user_name: string;
  service: Service | number;
  operand: string;
  result: string;
  status: string;
  created_date: string;
  get_status_display: string;
}

export interface FilterParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
}

// Тип для создания заказа на бэкенде
export interface CreateOrderRequest {
  user_name: string;
  service: number; // ID услуги
  operand: string;
  result: string;
  status?: string;
}