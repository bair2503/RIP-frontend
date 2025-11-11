import type { Service, Order } from '../types';

export const servicesData: Service[] = [
  {
    id: 1,
    title: 'Факториал',
    description: 'Вычисление факториала числа. Факториал n! представляет собой произведение всех натуральных чисел от 1 до n.',
    category: 'Математика',
    icon: 'fa-exclamation-circle',
    created_date: '2024-01-15',
    image_url: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Факториал'
  },
  {
    id: 2,
    title: 'НОД',
    description: 'Нахождение наибольшего общего делителя (НОД) двух чисел с помощью алгоритма Евклида.',
    category: 'Числа',
    icon: 'fa-divide',
    created_date: '2024-01-16',
    image_url: 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=НОД'
  },
  {
    id: 3,
    title: 'Числа Фибоначчи',
    description: 'Вычисление n-го числа Фибоначчи или последовательности Фибоначчи.',
    category: 'Числа',
    icon: 'fa-infinity',
    created_date: '2024-01-17'
    // image_url отсутствует - будет использована иконка
  },
  {
    id: 4,
    title: 'Квадратное уравнение',
    description: 'Решение квадратного уравнения ax² + bx + c = 0 с нахождением корней.',
    category: 'Алгебра',
    icon: 'fa-superscript',
    created_date: '2024-01-18',
    image_url: 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Уравнение'
  }
];

export const ordersData: { [key: number]: Order } = {
  1: {
    id: 1,
    user_name: 'Иван Иванов',
    service: servicesData[0],
    operand: '5',
    result: '120',
    status: 'completed',
    created_date: '15.09.2025',
    get_status_display: 'Завершено'
  }
};