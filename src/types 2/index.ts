export interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  created_date?: string;
  image_url?: string;
}

export interface OrderItem {
  serviceTitle: string;
  date: string;
  result: string;
}

export interface Order {
  id: number;
  user_name: string;
  service: Service;
  operand: string;
  result: string;
  status: string;
  created_date: string;
  get_status_display: string;
}

export interface FilterParams {
  search?: string;
  category?: string;
}